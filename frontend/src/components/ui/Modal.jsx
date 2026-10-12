import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { modalBackdrop, modalPanel } from '../../lib/motion';
import { useSmoothScroll } from '../../lib/SmoothScroll';

/**
 * Accessible, animated modal.
 * - Backdrop + panel animations via Framer Motion (AnimatePresence)
 * - Locks Lenis scrolling while open
 * - Closes on Escape / backdrop click
 */
export default function Modal({
  isOpen,
  onClose,
  children,
  size = 'md',
  align = 'center',
  className = '',
  showClose = true,
  labelledBy,
}) {
  const { stop, start } = useSmoothScroll();

  useEffect(() => {
    if (!isOpen) return;
    stop();
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      start();
    };
  }, [isOpen, onClose, stop, start]);

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-6xl',
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          className={`fixed inset-0 z-[100] bg-slate-950/75 backdrop-blur-md flex justify-center p-4 ${
            align === 'top' ? 'items-start pt-20' : 'items-center'
          }`}
          variants={modalBackdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          onMouseDown={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelledBy}
        >
          <motion.div
            key="panel"
            data-lenis-prevent
            className={`relative w-full ${sizes[size] || sizes.md} max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-amber-500/30 shadow-2xl shadow-black/40 ${className}`}
            variants={modalPanel}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {showClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-orange-100 dark:hover:bg-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
