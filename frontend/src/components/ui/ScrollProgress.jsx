import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin saffron progress bar fixed to the top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[3px] z-[90] origin-left bg-gradient-to-r from-orange-500 via-amber-400 to-red-500 shadow-[0_0_12px_rgba(249,115,22,0.6)]"
      style={{ scaleX }}
    />
  );
}
