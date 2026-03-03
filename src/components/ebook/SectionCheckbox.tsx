'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { InteractiveFX, useInteractive } from './InteractiveFX';
import confetti from 'canvas-confetti';

interface SectionCheckboxProps {
  sectionId: string;
  sectionTitle: string;
  onCompletionChange?: (completed: boolean) => void;
}

export default function SectionCheckbox({
  sectionId,
  sectionTitle,
  onCompletionChange
}: SectionCheckboxProps) {
  const { playImpact } = useInteractive();
  const storageKey = `boxing-blueprint-section-${sectionId}`;
  const [isCompleted, setIsCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(storageKey);
    if (stored === 'true') {
      setIsCompleted(true);
    }
  }, [storageKey]);

  const handleToggle = () => {
    const newValue = !isCompleted;
    setIsCompleted(newValue);
    localStorage.setItem(storageKey, String(newValue));
    onCompletionChange?.(newValue);

    // Trigger confetti on completion
    if (newValue) {
      playImpact(); // Play punch sound
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#DC2626', '#CCFF00', '#2563EB'],
      });
    }
  };

  // Respect reduced motion
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 p-4 border-2 border-dashed rounded-lg transition-all duration-300"
      style={{
        borderColor: isCompleted ? '#10b981' : '#374151',
        backgroundColor: isCompleted ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
      }}
    >
      <label className="flex items-center gap-3 cursor-pointer select-none">
        <motion.div
          whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
          className={`
            w-7 h-7 rounded-md border-2 flex items-center justify-center
            transition-all duration-200
            ${isCompleted
              ? 'bg-emerald-500 border-emerald-500'
              : 'bg-transparent border-gray-500 hover:border-gray-400'
            }
          `}
          role="checkbox"
          aria-checked={isCompleted}
          aria-label={`Mark ${sectionTitle} as completed`}
        >
          {isCompleted && (
            <motion.div
              initial={prefersReducedMotion ? {} : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <Check size={18} className="text-white" strokeWidth={3} />
            </motion.div>
          )}
        </motion.div>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleToggle}
          className="sr-only"
        />
        <span className={`
          font-body text-sm transition-colors
          ${isCompleted ? 'text-emerald-400' : 'text-gray-400'}
        `}>
          I&apos;ve completed this section
        </span>
      </label>
    </motion.div>
  );
}

// Hook to get all completed sections
export function useCompletedSections(sectionIds: string[]) {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const completedSet = new Set<string>();
    sectionIds.forEach(id => {
      if (localStorage.getItem(`boxing-blueprint-section-${id}`) === 'true') {
        completedSet.add(id);
      }
    });
    setCompleted(completedSet);
  }, [sectionIds]);

  const refresh = () => {
    const completedSet = new Set<string>();
    sectionIds.forEach(id => {
      if (localStorage.getItem(`boxing-blueprint-section-${id}`) === 'true') {
        completedSet.add(id);
      }
    });
    setCompleted(completedSet);
  };

  return { completed, count: completed.size, total: sectionIds.length, refresh, mounted };
}
