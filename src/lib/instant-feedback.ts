/**
 * Instant Feedback Utilities
 * Netflix/Instagram-tier interaction feedback
 */

// Haptic feedback for instant tactile response
export function hapticFeedback(type: 'light' | 'medium' | 'success' = 'light') {
  if (!('vibrate' in navigator)) return;

  const patterns = {
    light: 10,
    medium: 25,
    success: [50, 30, 50],
  };

  navigator.vibrate(patterns[type]);
}

// Instant scale animation on tap (use with Framer Motion)
export const tapAnimation = {
  whileTap: { scale: 0.97 },
  transition: { duration: 0.1 },
};

// Instant highlight animation for buttons
export const buttonAnimation = {
  whileTap: { scale: 0.95 },
  whileHover: { scale: 1.02 },
  transition: { type: 'spring', stiffness: 400, damping: 25 },
};

// Prefetch utility - call on hover/focus
export function prefetchData(fetcher: () => Promise<void>) {
  // Use requestIdleCallback for non-blocking prefetch
  if ('requestIdleCallback' in window) {
    (window as Window & typeof globalThis & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(() => fetcher());
  } else {
    setTimeout(fetcher, 100);
  }
}

// Optimistic state update helper
export function createOptimisticUpdate<T>(
  currentState: T,
  updateFn: (state: T) => T,
  rollbackFn: (state: T) => T
) {
  return {
    optimisticState: updateFn(currentState),
    rollback: () => rollbackFn(currentState),
  };
}

// CSS class for instant tap feedback
export const INSTANT_TAP_CLASS = `
  active:scale-[0.97]
  active:opacity-90
  transition-transform
  duration-75
`;
