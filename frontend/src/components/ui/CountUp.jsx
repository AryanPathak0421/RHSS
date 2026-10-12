import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP-driven number counter that animates when scrolled into view.
 * Accepts strings like "50,000+" / "500+" / "10+" and preserves prefix/suffix.
 * Non-numeric values (e.g. dates) are rendered as-is.
 */
export default function CountUp({ value, duration = 2, className = '', locale = 'en-IN' }) {
  const ref = useRef(null);
  const str = String(value ?? '');
  const match = str.match(/^([^\d]*)([\d,.]+)([^\d]*)$/);
  const numeric = match ? Number(match[2].replace(/,/g, '')) : NaN;
  const prefix = match ? match[1] : '';
  const suffix = match ? match[3] : '';
  const isAnimatable = Number.isFinite(numeric) && numeric > 0;

  useEffect(() => {
    if (!isAnimatable || !ref.current) return;
    const el = ref.current;
    const obj = { n: 0 };
    const format = (n) => `${prefix}${Math.round(n).toLocaleString(locale)}${suffix}`;
    el.textContent = format(0);

    const tween = gsap.to(obj, {
      n: numeric,
      duration,
      ease: 'power3.out',
      onUpdate: () => { el.textContent = format(obj.n); },
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [isAnimatable, numeric, prefix, suffix, duration, locale]);

  if (!isAnimatable) return <span className={className}>{str}</span>;
  return <span ref={ref} className={`tabular-nums ${className}`}>{str}</span>;
}
