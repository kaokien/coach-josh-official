'use client';

import CountUp from 'react-countup';
import { motion } from 'framer-motion';

interface GradientProgressBarProps {
  progress: number; // 0-100
  showPercentage?: boolean;
  height?: number;
  className?: string;
}

export default function GradientProgressBar({
  progress,
  showPercentage = false,
  height = 4,
  className = '',
}: GradientProgressBarProps) {
  // Clamp progress between 0-100
  const clampedProgress = Math.min(100, Math.max(0, progress));

  // Calculate gradient color based on progress (amber-500 → emerald-500)
  // amber-500: #f59e0b, emerald-500: #10b981
  const getGradientColor = (p: number) => {
    const amberR = 245, amberG = 158, amberB = 11;
    const emeraldR = 16, emeraldG = 185, emeraldB = 129;

    const ratio = p / 100;
    const r = Math.round(amberR + (emeraldR - amberR) * ratio);
    const g = Math.round(amberG + (emeraldG - amberG) * ratio);
    const b = Math.round(amberB + (emeraldB - amberB) * ratio);

    return `rgb(${r}, ${g}, ${b})`;
  };

  const currentColor = getGradientColor(clampedProgress);

  return (
    <div className={`relative ${className}`}>
      {/* Background track */}
      <div
        className="w-full bg-zinc-800 overflow-hidden"
        style={{ height }}
      >
        {/* Progress fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="h-full transition-all duration-500 ease-out"
          style={{
            background: `linear-gradient(to right, #f59e0b, ${currentColor})`,
          }}
        />
      </div>

      {/* Percentage display */}
      {showPercentage && (
        <div
          className="font-display text-xs mt-1"
          style={{ color: currentColor }}
        >
          <CountUp
            start={0}
            end={Math.round(clampedProgress)}
            duration={0.5}
            preserveValue
            suffix="%"
          />
        </div>
      )}
    </div>
  );
}

// Completion badge for header
interface CompletionBadgeProps {
  completed: number;
  total: number;
}

export function CompletionBadge({ completed, total }: CompletionBadgeProps) {
  const progress = total > 0 ? (completed / total) * 100 : 0;
  const circumference = 2 * Math.PI * 14; // radius = 14
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex items-center gap-2">
      {/* Circular progress */}
      <div className="relative w-8 h-8">
        <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
          {/* Background circle */}
          <circle
            cx="18"
            cy="18"
            r="14"
            fill="none"
            stroke="#374151"
            strokeWidth="3"
          />
          {/* Progress circle */}
          <motion.circle
            cx="18"
            cy="18"
            r="14"
            fill="none"
            stroke={progress === 100 ? '#10b981' : '#f59e0b'}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-[10px] text-white">
            {completed}
          </span>
        </div>
      </div>

      {/* Text label */}
      <span className="font-body text-xs text-gray-400 hidden sm:inline">
        {completed}/{total} chapters
      </span>
    </div>
  );
}
