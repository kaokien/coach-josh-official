/**
 * Haptic Feedback Engine
 * Unified tactile patterns for the Coach Josh platform.
 * These patterns are designed to feel intentional and premium.
 */

export type HapticType =
  | 'light'    // Subtle tap for micro-interactions/buttons
  | 'medium'   // Distinct feedback for state changes
  | 'heavy'    // Strong impact for physical actions
  | 'success'  // Double-tap or rising pattern for achievements
  | 'warning'  // Jittery pattern for alerts
  | 'error';    // Intense pattern for failures

const PATTERNS: Record<HapticType, number | number[]> = {
  light: 10,
  medium: 30,
  heavy: 60,
  success: [10, 30, 10, 40], // Tactile "heartbeat" or rising feel
  warning: [50, 50, 50],
  error: [100, 50, 100, 50, 100],
};

/**
 * Trigger haptic feedback with a specific pattern.
 * Safely checks for navigator support and user gesture requirements.
 */
export function triggerHaptic(type: HapticType = 'light') {
  if (typeof window === 'undefined') return;
  if (!('vibrate' in navigator)) {
    // Falls back silently on desktop/unsupported browsers
    return;
  }

  try {
    const pattern = PATTERNS[type];
    navigator.vibrate(pattern);
  } catch (error) {
    console.warn('Haptic feedback failed:', error);
  }
}

// React Hook for haptic-enabled handlers
export function useHaptic() {
  return {
    triggerHaptic,
    hapticHandlers: {
      onMouseDown: () => triggerHaptic('light'),
      onTouchStart: () => triggerHaptic('light'),
    }
  };
}
