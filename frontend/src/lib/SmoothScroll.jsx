import React, { createContext, useContext, useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScrollContext = createContext({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

/**
 * Wraps the app with a Lenis smooth-scroll instance that is wired into
 * GSAP's ticker + ScrollTrigger so both animation systems share one clock.
 */
export function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      duration: prefersReduced ? 0 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReduced,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
      anchors: true,
    });
    lenisRef.current = lenis;

    // Keep ScrollTrigger in sync with Lenis scroll position
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker (time is in seconds)
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((target, options = {}) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset: -72, duration: 1.4, ...options });
    } else if (typeof target === 'string') {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    } else if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    } else {
      target?.scrollIntoView?.({ behavior: 'smooth' });
    }
  }, []);

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef, scrollTo, stop, start }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export const useSmoothScroll = () => useContext(SmoothScrollContext);
