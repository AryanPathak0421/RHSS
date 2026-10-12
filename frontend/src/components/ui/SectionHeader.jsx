import React from 'react';
import { motion } from 'framer-motion';
import { stagger, staggerItem, VIEWPORT } from '../../lib/motion';

/**
 * Unified, animated section header.
 * tone="light" for light sections, tone="dark" for dark sections.
 */
export default function SectionHeader({
  icon: Icon,
  badge,
  title,
  highlight,
  intro,
  tone = 'light',
  align = 'center',
  className = '',
}) {
  const isDark = tone === 'dark';
  const alignCls = align === 'left' ? 'text-left items-start' : 'text-center items-center mx-auto';

  return (
    <motion.div
      className={`flex flex-col max-w-3xl ${alignCls} ${className}`}
      variants={stagger(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {badge && (
        <motion.div
          variants={staggerItem}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] mb-4 border ${
            isDark
              ? 'bg-amber-500/10 border-amber-400/30 text-amber-300'
              : 'bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-950/50 dark:border-orange-800/50 dark:text-orange-300'
          }`}
        >
          {Icon && <Icon className="w-3.5 h-3.5" />}
          <span>{badge}</span>
        </motion.div>
      )}

      <motion.h2
        variants={staggerItem}
        className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading leading-[1.15] ${
          isDark ? 'text-white' : 'text-slate-900 dark:text-white'
        }`}
      >
        {title}{' '}
        {highlight && (
          <span className={isDark ? 'text-gradient-saffron' : 'text-gradient-saffron-dark dark:text-gradient-saffron'}>
            {highlight}
          </span>
        )}
      </motion.h2>

      <motion.div variants={staggerItem} className={`divider-saffron ${align === 'left' ? 'ml-0' : ''}`} />

      {intro && (
        <motion.p
          variants={staggerItem}
          className={`mt-5 text-base sm:text-lg leading-relaxed font-sans ${
            isDark ? 'text-slate-300' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          {intro}
        </motion.p>
      )}
    </motion.div>
  );
}
