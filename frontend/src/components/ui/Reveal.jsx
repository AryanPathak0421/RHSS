import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, fadeIn, scaleIn, slideLeft, slideRight, stagger, staggerItem, VIEWPORT } from '../../lib/motion';

const VARIANTS = { fadeUp, fadeIn, scaleIn, slideLeft, slideRight };

/**
 * Scroll-triggered reveal wrapper (Framer Motion whileInView).
 *
 * <Reveal variant="fadeUp" delay={1}>...</Reveal>
 * <Reveal.Group stagger={0.1}> <Reveal.Item/> ... </Reveal.Group>
 */
export default function Reveal({
  as = 'div',
  variant = 'fadeUp',
  delay = 0,
  className = '',
  children,
  viewport = VIEWPORT,
  ...rest
}) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      variants={VARIANTS[variant] || fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      custom={delay}
      {...rest}
    >
      {children}
    </Comp>
  );
}

Reveal.Group = function RevealGroup({ as = 'div', className = '', stagger: s = 0.1, delayChildren = 0.05, children, viewport = VIEWPORT, ...rest }) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      variants={stagger(s, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      {...rest}
    >
      {children}
    </Comp>
  );
};

Reveal.Item = function RevealItem({ as = 'div', className = '', children, ...rest }) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp className={className} variants={staggerItem} {...rest}>
      {children}
    </Comp>
  );
};
