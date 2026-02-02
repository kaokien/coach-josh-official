/**
 * Motion Design Tokens
 * Apple Human Interface-inspired timing and easing
 */

// Easing curves (Apple's standard curves)
export const EASING = {
  // Standard easing - most common
  standard: [0.4, 0, 0.2, 1] as const,
  // Decelerate - entering elements
  decelerate: [0, 0, 0.2, 1] as const,
  // Accelerate - exiting elements  
  accelerate: [0.4, 0, 1, 1] as const,
  // Sharp - quick feedback
  sharp: [0.4, 0, 0.6, 1] as const,
};

// Duration tokens
export const DURATION = {
  instant: 0.1,    // Micro-interactions
  fast: 0.15,      // Button feedback
  normal: 0.3,     // Standard transitions
  slow: 0.5,       // Page transitions
  emphasis: 0.7,   // Celebration moments
};

// Spring configurations
export const SPRING = {
  // Snappy - UI elements
  snappy: {
    type: 'spring' as const,
    damping: 25,
    stiffness: 300, // Apple standard: slightly softer than original 400
  },
  // Bouncy - celebrations
  bouncy: {
    type: 'spring' as const,
    damping: 15,
    stiffness: 200,
  },
  // Gentle - organic movements
  gentle: {
    type: 'spring' as const,
    damping: 30,
    stiffness: 150,
  },
};

// Pre-built Framer Motion transitions
export const TRANSITIONS = {
  // Fast feedback (buttons, toggles)
  fast: {
    duration: DURATION.fast,
    ease: EASING.standard,
  },
  // Normal state changes
  normal: {
    duration: DURATION.normal,
    ease: EASING.standard,
  },
  // Slow, deliberate (page-level)
  slow: {
    duration: DURATION.slow,
    ease: EASING.decelerate,
  },
  // Spring-based for modals/overlays
  spring: SPRING.snappy,
  // Celebration moments
  celebration: {
    ...SPRING.bouncy,
    delay: 0.2,
  },
};

// Stagger configurations for lists
export const STAGGER = {
  fast: 0.03,
  normal: 0.05,
  slow: 0.1,
};

// Animation variants for common patterns
export const VARIANTS = {
  // Fade in from below
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  },
  // Scale in (for modals, celebrations)
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  // Stagger container
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: STAGGER.normal,
      },
    },
  },
};

// Haptic feedback (re-exported from dedicated engine)
import { triggerHaptic } from './haptics';

export const HAPTICS = {
  light: () => triggerHaptic('light'),
  medium: () => triggerHaptic('medium'),
  success: () => triggerHaptic('success'),
  error: () => triggerHaptic('error'),
};
