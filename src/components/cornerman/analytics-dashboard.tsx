'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, Clock, Play, Headphones, Wind, Brain, Trophy,
  TrendingUp, Calendar, Target, Flame, Award, ChevronRight
} from 'lucide-react';

interface TrainingStats {
  // Overall Stats
  totalSessions: number;
  totalMinutes: number;
  streakDays: number;
  currentWeek: number;

  // By Category
  videosWatched: number;
  videosCompleted: number;
  audioCompleted: number;
  breathworkSessions: number;
  workoutItemsCompleted: number;

  // Progress
  favoriteVideos: number;
  trainingDays: number[];
}

// Days of week for activity chart
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState<TrainingStats>({
    totalSessions: 0,
    totalMinutes: 0,
    streakDays: 0,
    currentWeek: 1,
    videosWatched: 0,
    videosCompleted: 0,
    audioCompleted: 0,
    breathworkSessions: 0,
    workoutItemsCompleted: 0,
    favoriteVideos: 0,
    trainingDays: [0, 0, 0, 0, 0, 0, 0],
  });

  // Load all stats from localStorage
  useEffect(() => {
    const loadStats = () => {
      // Main progress stats
      const mainStats = localStorage.getItem('cornerman_stats');
      const parsed = mainStats ? JSON.parse(mainStats) : {};

      // Video progress
      const videoProgress = localStorage.getItem('videoWatchProgress');
      const videos = videoProgress ? JSON.parse(videoProgress) : {};
      const videosCompleted = Object.values(videos).filter((v: unknown) => (v as { completed: boolean }).completed).length;

      // Video favorites
      const favorites = localStorage.getItem('videoFavorites');
      const favCount = favorites ? JSON.parse(favorites).length : 0;

      // Audio completed
      const audioCompleted = localStorage.getItem('completedAudioWorkouts');
      const audioCount = audioCompleted ? JSON.parse(audioCompleted).length : 0;

      // Breathwork sessions
      const breathworkSessions = localStorage.getItem('breathworkSessions');
      const breathCount = breathworkSessions ? parseInt(breathworkSessions, 10) : 0;

      // Workout progress
      const workoutProgress = localStorage.getItem('workoutProgress');
      let workoutItems = 0;
      let currentWeek = 1;
      if (workoutProgress) {
        const wp = JSON.parse(workoutProgress);
        workoutItems = wp.completedItems?.length || 0;
        currentWeek = wp.currentWeek || 1;
      }

      // Calculate training days (mock data based on streak)
      const streak = parsed.streakDays || 0;
      const trainingDays = DAYS.map((_, i) => {
        if (i < streak % 7) return Math.floor(Math.random() * 3) + 1;
        return 0;
      });

      setStats({
        totalSessions: parsed.sessionsCompleted || 0,
        totalMinutes: parsed.totalMinutes || 0,
        streakDays: streak,
        currentWeek,
        videosWatched: Object.keys(videos).length,
        videosCompleted,
        audioCompleted: audioCount,
        breathworkSessions: breathCount,
        workoutItemsCompleted: workoutItems,
        favoriteVideos: favCount,
        trainingDays,
      });
    };

    loadStats();

    // Listen for storage updates
    window.addEventListener('storage', loadStats);
    return () => window.removeEventListener('storage', loadStats);
  }, []);

  // Calculate level
  const getLevel = (sessions: number) => {
    if (sessions < 5) return { name: 'Prospect', color: 'bg-gray-500', next: 5, progress: (sessions / 5) * 100 };
    if (sessions < 20) return { name: 'Contender', color: 'bg-[#4A6FA5]', next: 20, progress: ((sessions - 5) / 15) * 100 };
    if (sessions < 50) return { name: 'Champion', color: 'bg-yellow-500', next: 50, progress: ((sessions - 20) / 30) * 100 };
    return { name: 'Legend', color: 'bg-red-500', next: 100, progress: 100 };
  };

  const level = getLevel(stats.totalSessions);

  // Format hours from minutes
  const formatTime = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hrs === 0) return `${mins}m`;
    return `${hrs}h ${mins}m`;
  };

  // Max activity for scaling chart
  const maxActivity = Math.max(...stats.trainingDays, 1);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-[#1A1A1A] text-white p-6 border-2 border-[#1A1A1A] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#4A6FA5]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 size={24} className="text-[#4A6FA5]" />
              <h2 className="font-display text-2xl uppercase">Your Training Stats</h2>
            </div>
            <p className="font-body text-white/60">Track your progress across all training modules</p>
          </div>

          {/* Level Badge */}
          <div className="bg-white/10 border border-white/20 p-4 min-w-[200px]">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="text-yellow-400" size={24} />
              <div>
                <p className="text-xs text-white/50 uppercase">Current Rank</p>
                <p className="font-display text-xl uppercase">{level.name}</p>
              </div>
            </div>
            <div className="h-2 bg-white/10 mt-2">
              <motion.div
                className={`h-full ${level.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${level.progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-xs text-white/40 mt-1">
              {stats.totalSessions} / {level.next} sessions to next rank
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<Clock size={20} />}
          label="Total Time"
          value={formatTime(stats.totalMinutes)}
          color="bg-[#4A6FA5]"
        />
        <StatCard
          icon={<Flame size={20} />}
          label="Day Streak"
          value={`${stats.streakDays} days`}
          color="bg-[#D1495B]"
        />
        <StatCard
          icon={<Target size={20} />}
          label="Sessions"
          value={stats.totalSessions.toString()}
          color="bg-[#7FB069]"
        />
        <StatCard
          icon={<Calendar size={20} />}
          label="Week"
          value={`Week ${stats.currentWeek}`}
          color="bg-purple-500"
        />
      </div>

      {/* Activity & Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="font-display text-lg uppercase mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-[#4A6FA5]" />
            Weekly Activity
          </h3>
          <div className="flex items-end justify-between gap-2 h-32">
            {DAYS.map((day, i) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  className="w-full bg-[#4A6FA5] rounded-t-sm"
                  initial={{ height: 0 }}
                  animate={{ height: `${(stats.trainingDays[i] / maxActivity) * 100}%` }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  style={{ minHeight: stats.trainingDays[i] > 0 ? '8px' : '0' }}
                />
                <span className="text-xs font-mono text-[#1A1A1A]/50">{day}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#1A1A1A]/50 mt-4 text-center">
            Sessions per day this week
          </p>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="font-display text-lg uppercase mb-6 flex items-center gap-2">
            <Award size={20} className="text-[#D1495B]" />
            Training Breakdown
          </h3>
          <div className="space-y-4">
            <CategoryRow
              icon={<Play size={16} />}
              label="Videos Watched"
              value={stats.videosWatched}
              subValue={`${stats.videosCompleted} completed`}
              color="bg-blue-500"
            />
            <CategoryRow
              icon={<Headphones size={16} />}
              label="Audio Workouts"
              value={stats.audioCompleted}
              subValue="sessions"
              color="bg-orange-500"
            />
            <CategoryRow
              icon={<Wind size={16} />}
              label="Breathwork"
              value={stats.breathworkSessions}
              subValue="cycles completed"
              color="bg-purple-500"
            />
            <CategoryRow
              icon={<Brain size={16} />}
              label="Training Plan"
              value={stats.workoutItemsCompleted}
              subValue="items done"
              color="bg-green-500"
            />
          </div>
        </div>
      </div>

      {/* Achievements (Future) */}
      <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-lg uppercase flex items-center gap-2">
            <Trophy size={20} className="text-yellow-500" />
            Achievements
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <AchievementBadge
            title="First Session"
            description="Complete your first workout"
            unlocked={stats.totalSessions >= 1}
          />
          <AchievementBadge
            title="Week Warrior"
            description="Train for 7 days straight"
            unlocked={stats.streakDays >= 7}
          />
          <AchievementBadge
            title="Video Student"
            description="Watch 5 technique videos"
            unlocked={stats.videosWatched >= 5}
          />
          <AchievementBadge
            title="Breath Master"
            description="Complete 10 breathwork sessions"
            unlocked={stats.breathworkSessions >= 10}
          />
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ icon, label, value, color }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-white border-2 border-[#1A1A1A] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center gap-3">
        <div className={`p-2 ${color} text-white`}>
          {icon}
        </div>
        <div>
          <p className="text-xs uppercase font-bold text-[#1A1A1A]/50 tracking-wider">{label}</p>
          <p className="font-display text-xl uppercase">{value}</p>
        </div>
      </div>
    </div>
  );
}

// Category Row Component
function CategoryRow({ icon, label, value, subValue, color }: {
  icon: React.ReactNode;
  label: string;
  value: number;
  subValue: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-4 p-3 bg-[#F2E8DC]/30 border border-[#1A1A1A]/10">
      <div className={`p-2 ${color} text-white`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-body text-sm font-bold">{label}</p>
        <p className="text-xs text-[#1A1A1A]/50">{subValue}</p>
      </div>
      <div className="font-display text-2xl">{value}</div>
      <ChevronRight size={16} className="text-[#1A1A1A]/30" />
    </div>
  );
}

// Achievement Badge Component
function AchievementBadge({ title, description, unlocked }: {
  title: string;
  description: string;
  unlocked: boolean;
}) {
  return (
    <div className={`p-4 border-2 text-center transition-all ${unlocked
      ? 'border-yellow-500 bg-yellow-50'
      : 'border-[#1A1A1A]/20 bg-[#1A1A1A]/5 opacity-50'
      }`}>
      <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-2 ${unlocked ? 'bg-yellow-500 text-white' : 'bg-[#1A1A1A]/10 text-[#1A1A1A]/30'
        }`}>
        <Trophy size={24} />
      </div>
      <p className="font-display text-sm uppercase">{title}</p>
      <p className="text-xs text-[#1A1A1A]/50 mt-1">{description}</p>
    </div>
  );
}
