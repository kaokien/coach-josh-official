'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Activity, Flame, Calendar } from 'lucide-react';

interface UserStats {
  sessionsCompleted: number;
  streakDays: number;
  lastActiveDate: string;
  totalMinutes: number;
}

const DEFAULT_STATS: UserStats = {
  sessionsCompleted: 0,
  streakDays: 0,
  lastActiveDate: '',
  totalMinutes: 0
};

// Animation variants for staggered card entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24
    }
  }
};

export default function ProgressDashboard() {
  // Lazy initializer for localStorage to avoid setState in useEffect
  const [stats] = useState<UserStats>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cornerman_stats');
      return saved ? JSON.parse(saved) : DEFAULT_STATS;
    }
    return DEFAULT_STATS;
  });

  // Helper to get Fighter Level based on sessions
  const getLevel = (sessions: number) => {
    if (sessions < 5) return { name: 'Prospect', color: 'text-gray-500' };
    if (sessions < 20) return { name: 'Contender', color: 'text-[#4A6FA5]' };
    if (sessions < 50) return { name: 'Champion', color: 'text-yellow-600' };
    return { name: 'Legend', color: 'text-red-600' };
  };

  const level = getLevel(stats.sessionsCompleted);

  return (
    <div className="bg-white border-b-2 border-[#1A1A1A] px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          {/* Card 1: Level */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -2, boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
            className="bg-[#F2E8DC]/30 border-2 border-[#1A1A1A] p-4 flex flex-col items-center justify-center text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors hover:bg-[#F2E8DC]/50"
          >
            <Trophy size={24} className="mb-2 text-[#1A1A1A]" />
            <span className="text-xs uppercase font-bold text-[#1A1A1A]/50 tracking-widest">Rank</span>
            <span className={`font-display text-xl uppercase ${level.color}`}>{level.name}</span>
          </motion.div>

          {/* Card 2: Streak */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -2, boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
            className="bg-[#F2E8DC]/30 border-2 border-[#1A1A1A] p-4 flex flex-col items-center justify-center text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors hover:bg-[#F2E8DC]/50"
          >
            <Flame size={24} className="mb-2 text-[#D1495B]" />
            <span className="text-xs uppercase font-bold text-[#1A1A1A]/50 tracking-widest">Streak</span>
            <span className="font-display text-xl uppercase text-[#1A1A1A]">{stats.streakDays} Days</span>
          </motion.div>

          {/* Card 3: Sessions */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -2, boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
            className="bg-[#F2E8DC]/30 border-2 border-[#1A1A1A] p-4 flex flex-col items-center justify-center text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors hover:bg-[#F2E8DC]/50"
          >
            <Activity size={24} className="mb-2 text-[#4A6FA5]" />
            <span className="text-xs uppercase font-bold text-[#1A1A1A]/50 tracking-widest">Sessions</span>
            <span className="font-display text-xl uppercase text-[#1A1A1A]">{stats.sessionsCompleted}</span>
          </motion.div>

          {/* Card 4: Date */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -2, boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
            className="bg-[#F2E8DC]/30 border-2 border-[#1A1A1A] p-4 flex flex-col items-center justify-center text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors hover:bg-[#F2E8DC]/50"
          >
            <Calendar size={24} className="mb-2 text-[#1A1A1A]" />
            <span className="text-xs uppercase font-bold text-[#1A1A1A]/50 tracking-widest">Active</span>
            <span className="font-display text-xl uppercase text-[#1A1A1A]">{stats.lastActiveDate ? 'Today' : 'N/A'}</span>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}

// Utility to update stats (can be called when a video ends)
export const updateStats = (minutes: number = 0) => {
  const saved = localStorage.getItem('cornerman_stats');
  let stats = saved ? JSON.parse(saved) : { sessionsCompleted: 0, streakDays: 0, lastActiveDate: '', totalMinutes: 0 };

  const today = new Date().toISOString().split('T')[0];

  // Update streak if new day
  if (stats.lastActiveDate !== today) {
    // Check if consecutive (simplified: if last active was yesterday)
    // For MVP we just increment if not today
    stats.streakDays += 1;
    stats.lastActiveDate = today;
  }

  stats.sessionsCompleted += 1;
  stats.totalMinutes += minutes;

  localStorage.setItem('cornerman_stats', JSON.stringify(stats));
  // Dispatch event so dashboard updates in real-time
  window.dispatchEvent(new Event('storage'));
};
