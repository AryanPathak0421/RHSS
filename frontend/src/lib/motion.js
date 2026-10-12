/** Shared Framer Motion variants & easings used across sections. */

export const EASE_OUT = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT = [0.65, 0, 0.35, 1];

export const VIEWPORT = { once: true, amount: 0.2, margin: '0px 0px -80px 0px' };

export const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT, delay: i * 0.08 },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

export const slideLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE_OUT } },
};

export const slideRight = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE_OUT } },
};

export const stagger = (staggerChildren = 0.1, delayChildren = 0.05) => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

export const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const modalPanel = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: EASE_OUT } },
  exit: { opacity: 0, y: 16, scale: 0.97, transition: { duration: 0.2, ease: EASE_IN_OUT } },
};

export const hoverLift = {
  whileHover: { y: -6, transition: { duration: 0.3, ease: EASE_OUT } },
  whileTap: { scale: 0.985 },
};
