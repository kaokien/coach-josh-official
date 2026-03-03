'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Trophy, Target, X, Sparkles } from 'lucide-react';
import { triggerHaptic } from '@/lib/haptics';
import { SPRING, VARIANTS } from '@/lib/motion';

interface StreakBannerProps {
  className?: string;
}

export default function StreakBanner({ className }: StreakBannerProps) {
  const [streakDays, setStreakDays] = useState(0);
  const [showMilestone, setShowMilestone] = useState(false);
  const [milestoneReached, setMilestoneReached] = useState<number | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Load streak from localStorage
    const loadStreak = () => {
      const stats = localStorage.getItem('cornerman_stats');
      if (stats) {
        const parsed = JSON.parse(stats);
        const streak = parsed.streakDays || 0;
        setStreakDays(streak);

        // Check for milestones (7, 14, 30, 60, 100 days)
        const milestones = [7, 14, 30, 60, 100];
        const lastCelebrated = localStorage.getItem('lastCelebratedMilestone');
        const lastMilestone = lastCelebrated ? parseInt(lastCelebrated, 10) : 0;

        for (const m of milestones) {
          if (streak >= m && m > lastMilestone) {
            setMilestoneReached(m);
            setShowMilestone(true);
            localStorage.setItem('lastCelebratedMilestone', m.toString());

            setMilestoneReached(m);
            setShowMilestone(true);
            localStorage.setItem('lastCelebratedMilestone', m.toString());

            // Unified celebration haptic
            triggerHaptic('success');
            break;
          }
        }
      }
    };

    loadStreak();
  }, []);

  const getStreakMessage = () => {
    if (streakDays === 0) return "Start your streak today!";
    if (streakDays === 1) return "Day 1 - Let's build momentum!";
    if (streakDays < 7) return `${streakDays} day streak - Keep grinding!`;
    if (streakDays < 14) return `${streakDays} days - Week warrior! 🔥`;
    if (streakDays < 30) return `${streakDays} days - Unstoppable! 💪`;
    return `${streakDays} days - Champion mindset! 🏆`;
  };

  const getStreakColor = () => {
    if (streakDays >= 30) return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    if (streakDays >= 14) return 'bg-gradient-to-r from-orange-500 to-red-500';
    if (streakDays >= 7) return 'bg-gradient-to-r from-red-500 to-pink-500';
    return 'bg-[#2563EB]';
  };

  if (dismissed) return null;

  return (
    <>
      {/* Streak Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${getStreakColor()} text-white px-4 py-3 flex items-center ${streakDays === 0 ? 'justify-between' : 'justify-start gap-4'} ${className}`}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Flame size={20} className="animate-pulse" />
            <span className="font-display text-2xl">{streakDays}</span>
          </div>
          <span className="font-body text-sm opacity-90">{getStreakMessage()}</span>
        </div>

        {streakDays === 0 && (
          <button
            onClick={() => setDismissed(true)}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </motion.div>

      {/* Milestone Celebration Modal */}
      <AnimatePresence>
        {showMilestone && milestoneReached && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
            onClick={() => setShowMilestone(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 15, stiffness: 200 }}
              className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-1 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[#0F172A] p-8 text-center">
                <motion.div
                  initial={{ rotate: -10 }}
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ repeat: 2, duration: 0.5 }}
                >
                  <Trophy size={64} className="text-yellow-400 mx-auto mb-4" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="font-display text-4xl text-white uppercase mb-2">
                    {milestoneReached} Day Streak!
                  </h2>
                  <p className="font-body text-white/70 mb-6">
                    {milestoneReached >= 30
                      ? "You're in the top 5% of fighters. Elite status!"
                      : milestoneReached >= 14
                        ? "Two weeks of dedication. You're building real habits!"
                        : "One week down! Your commitment is paying off."}
                  </p>

                  <div className="flex items-center justify-center gap-2 text-yellow-400 mb-6">
                    <Sparkles size={16} />
                    <span className="font-display uppercase text-sm">Achievement Unlocked</span>
                    <Sparkles size={16} />
                  </div>

                  <button
                    onClick={() => setShowMilestone(false)}
                    className="w-full bg-yellow-500 text-[#0F172A] font-display uppercase py-3 hover:bg-yellow-400 transition-colors"
                  >
                    Keep Training
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
