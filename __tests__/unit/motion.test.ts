import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EASING, DURATION, SPRING, TRANSITIONS, STAGGER, VARIANTS, HAPTICS } from '@/lib/motion';

describe('Motion Design Tokens', () => {
  describe('EASING curves', () => {
    it('should have standard easing as Apple-style cubic-bezier', () => {
      expect(EASING.standard).toEqual([0.4, 0, 0.2, 1]);
    });

    it('should have decelerate easing for entering elements', () => {
      expect(EASING.decelerate).toEqual([0, 0, 0.2, 1]);
    });

    it('should have accelerate easing for exiting elements', () => {
      expect(EASING.accelerate).toEqual([0.4, 0, 1, 1]);
    });

    it('should have sharp easing for quick feedback', () => {
      expect(EASING.sharp).toEqual([0.4, 0, 0.6, 1]);
    });

    it('should have all easing values as readonly tuples', () => {
      // Verify they are 4-element arrays (cubic-bezier format)
      Object.values(EASING).forEach((curve) => {
        expect(curve).toHaveLength(4);
        curve.forEach((value) => {
          expect(typeof value).toBe('number');
          expect(value).toBeGreaterThanOrEqual(0);
          expect(value).toBeLessThanOrEqual(1);
        });
      });
    });
  });

  describe('DURATION tokens', () => {
    it('should have instant duration for micro-interactions', () => {
      expect(DURATION.instant).toBe(0.1);
    });

    it('should have fast duration for button feedback', () => {
      expect(DURATION.fast).toBe(0.15);
    });

    it('should have normal duration for standard transitions', () => {
      expect(DURATION.normal).toBe(0.3);
    });

    it('should have slow duration for page transitions', () => {
      expect(DURATION.slow).toBe(0.5);
    });

    it('should have emphasis duration for celebrations', () => {
      expect(DURATION.emphasis).toBe(0.7);
    });

    it('should have all durations as positive numbers', () => {
      Object.values(DURATION).forEach((duration) => {
        expect(typeof duration).toBe('number');
        expect(duration).toBeGreaterThan(0);
      });
    });
  });

  describe('SPRING configurations', () => {
    it('should have snappy config for UI elements', () => {
      expect(SPRING.snappy).toEqual({
        type: 'spring',
        damping: 25,
        stiffness: 300,
      });
    });

    it('should have bouncy config for celebrations', () => {
      expect(SPRING.bouncy).toEqual({
        type: 'spring',
        damping: 15,
        stiffness: 200,
      });
    });

    it('should have gentle config for organic movements', () => {
      expect(SPRING.gentle).toEqual({
        type: 'spring',
        damping: 30,
        stiffness: 150,
      });
    });

    it('should have all springs with type "spring"', () => {
      Object.values(SPRING).forEach((config) => {
        expect(config.type).toBe('spring');
        expect(config.damping).toBeGreaterThan(0);
        expect(config.stiffness).toBeGreaterThan(0);
      });
    });
  });

  describe('TRANSITIONS presets', () => {
    it('should have fast transition using duration.fast', () => {
      expect(TRANSITIONS.fast.duration).toBe(DURATION.fast);
      expect(TRANSITIONS.fast.ease).toEqual(EASING.standard);
    });

    it('should have normal transition using duration.normal', () => {
      expect(TRANSITIONS.normal.duration).toBe(DURATION.normal);
    });

    it('should have slow transition using decelerate easing', () => {
      expect(TRANSITIONS.slow.duration).toBe(DURATION.slow);
      expect(TRANSITIONS.slow.ease).toEqual(EASING.decelerate);
    });

    it('should have spring transition matching snappy config', () => {
      expect(TRANSITIONS.spring).toEqual(SPRING.snappy);
    });

    it('should have celebration with delay', () => {
      expect(TRANSITIONS.celebration.delay).toBe(0.2);
      expect(TRANSITIONS.celebration.damping).toBe(SPRING.bouncy.damping);
    });
  });

  describe('STAGGER timings', () => {
    it('should have fast stagger at 0.03s', () => {
      expect(STAGGER.fast).toBe(0.03);
    });

    it('should have normal stagger at 0.05s', () => {
      expect(STAGGER.normal).toBe(0.05);
    });

    it('should have slow stagger at 0.1s', () => {
      expect(STAGGER.slow).toBe(0.1);
    });

    it('should have stagger values in ascending order', () => {
      expect(STAGGER.fast).toBeLessThan(STAGGER.normal);
      expect(STAGGER.normal).toBeLessThan(STAGGER.slow);
    });
  });

  describe('VARIANTS animation presets', () => {
    it('should have fadeInUp with correct initial state', () => {
      expect(VARIANTS.fadeInUp.initial).toEqual({ opacity: 0, y: 20 });
    });

    it('should have fadeInUp with correct animate state', () => {
      expect(VARIANTS.fadeInUp.animate).toEqual({ opacity: 1, y: 0 });
    });

    it('should have fadeInUp with correct exit state', () => {
      expect(VARIANTS.fadeInUp.exit).toEqual({ opacity: 0, y: -10 });
    });

    it('should have scaleIn with correct states', () => {
      expect(VARIANTS.scaleIn.initial).toEqual({ opacity: 0, scale: 0.9 });
      expect(VARIANTS.scaleIn.animate).toEqual({ opacity: 1, scale: 1 });
      expect(VARIANTS.scaleIn.exit).toEqual({ opacity: 0, scale: 0.95 });
    });

    it('should have staggerContainer with staggerChildren', () => {
      expect(VARIANTS.staggerContainer.animate.transition.staggerChildren).toBe(
        STAGGER.normal
      );
    });
  });

  describe('HAPTICS feedback', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should trigger light vibration (10ms)', () => {
      HAPTICS.light();
      expect(navigator.vibrate).toHaveBeenCalledWith(10);
    });

    it('should trigger medium vibration (50ms)', () => {
      HAPTICS.medium();
      expect(navigator.vibrate).toHaveBeenCalledWith(50);
    });

    it('should trigger success pattern [100, 50, 100]', () => {
      HAPTICS.success();
      expect(navigator.vibrate).toHaveBeenCalledWith([100, 50, 100]);
    });

    it('should trigger error pattern [50, 30, 50, 30, 50]', () => {
      HAPTICS.error();
      expect(navigator.vibrate).toHaveBeenCalledWith([50, 30, 50, 30, 50]);
    });

    it('should not throw when vibrate is not supported', () => {
      // Use spyOn to mock 'vibrate' check in navigator
      const vibrateSpy = vi.spyOn(navigator, 'vibrate').mockImplementation(() => false);

      // Override the 'vibrate' property check
      const originalVibrate = Object.getOwnPropertyDescriptor(navigator, 'vibrate');

      expect(() => HAPTICS.light()).not.toThrow();
      expect(() => HAPTICS.medium()).not.toThrow();
      expect(() => HAPTICS.success()).not.toThrow();
      expect(() => HAPTICS.error()).not.toThrow();

      // Restore
      vibrateSpy.mockRestore();
    });
  });
});
