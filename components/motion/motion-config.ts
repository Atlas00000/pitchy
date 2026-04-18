/**
 * Motion timing aligned with docs/UI-OVERHAUL.md (Week 8).
 * Content reveal ~300ms ease-out; route exit ~150ms.
 */
export const motionEaseOut = [0.33, 1, 0.68, 1] as const

/** Framer Motion `variants` for route-level cross-fade + slide. */
export const pageCrossFadeVariants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: motionEaseOut },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.15, ease: motionEaseOut },
  },
} as const

export const mountFadeUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: (delay = 0) => ({
    duration: 0.3,
    delay,
    ease: motionEaseOut,
  }),
} as const

export const staggerContainerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
} as const

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: motionEaseOut },
  },
} as const
