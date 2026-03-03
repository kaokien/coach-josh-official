'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Dumbbell, Wind, Headphones, Video, ChevronRight } from 'lucide-react';
import { AUDIO_WORKOUTS, type AudioWorkout } from '@/lib/cornerman-data';

interface TodaysWorkoutProps {
  onSelectWorkout?: (type: string, id?: string) => void;
}

interface WorkoutRecommendation {
  type: 'video' | 'audio' | 'breathwork' | 'training';
  title: string;
  subtitle: string;
  duration: string;
  icon: React.ReactNode;
  color: string;
  id?: string;
}

export default function TodaysWorkout({ onSelectWorkout }: TodaysWorkoutProps) {
  const [recommendation, setRecommendation] = useState<WorkoutRecommendation | null>(null);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    // Get recommendation based on day and user history
    const workoutProgress = localStorage.getItem('workoutProgress');
    const completedAudio = localStorage.getItem('completedAudioWorkouts');
    const breathworkSessions = localStorage.getItem('breathworkSessions');

    const dayOfWeek = new Date().getDay(); // 0-6
    const hour24 = new Date().getHours();

    // Priority logic:
    // 1. Morning (6-10am): Breathwork for mental prep
    // 2. Midday (10am-2pm): Training plan
    // 3. Afternoon (2-6pm): Video technique
    // 4. Evening (6-10pm): Audio workout or light breathwork

    let rec: WorkoutRecommendation;

    if (hour24 >= 6 && hour24 < 10) {
      // Morning: Breathwork
      const sessionsCount = breathworkSessions ? parseInt(breathworkSessions, 10) : 0;
      rec = {
        type: 'breathwork',
        title: sessionsCount === 0 ? 'Start Your Day Right' : 'Morning Focus',
        subtitle: sessionsCount === 0 ? 'Try your first breathwork session' : 'Box breathing for mental clarity',
        duration: '5 min',
        icon: <Wind size={24} />,
        color: 'from-blue-500 to-cyan-400',
      };
    } else if (hour24 >= 10 && hour24 < 14) {
      // Midday: Training plan - find next incomplete item
      const wp = workoutProgress ? JSON.parse(workoutProgress) : null;
      const currentWeek = wp?.currentWeek || 1;
      const currentDay = wp?.currentDay || 1;
      const completedItems: string[] = wp?.completedItems || [];

      // Training plan day titles for context
      const dayTitles: Record<number, string> = {
        1: 'Technique Tuesday',
        2: 'Power Wednesday',
        3: 'Rest Day',
        4: 'Fight IQ Thursday',
        5: 'Conditioning Friday',
        6: 'Skill Saturday',
        7: 'Rest Day',
      };

      // Find first incomplete item from current day's workout
      // This is a simplified version - in production, import the actual FIGHTER_FUNDAMENTALS
      const dayTitle = dayTitles[currentDay] || `Day ${currentDay}`;

      rec = {
        type: 'training',
        title: dayTitle,
        subtitle: `Week ${currentWeek}, Day ${currentDay} • ${completedItems.length > 0 ? 'In Progress' : 'Ready to Start'}`,
        duration: '30-45 min',
        icon: <Dumbbell size={24} />,
        color: 'from-green-500 to-emerald-400',
      };
    } else if (hour24 >= 14 && hour24 < 18) {
      // Afternoon: Video technique
      rec = {
        type: 'video',
        title: 'Sharpen Your Skills',
        subtitle: 'Watch a new technique breakdown',
        duration: '10-15 min',
        icon: <Video size={24} />,
        color: 'from-purple-500 to-pink-400',
      };
    } else {
      // Evening: Audio workout
      const completed = completedAudio ? JSON.parse(completedAudio) : [];
      const incompleteWorkout = AUDIO_WORKOUTS.find(w => !completed.includes(w.id));
      rec = {
        type: 'audio',
        title: incompleteWorkout?.title || 'Evening Workout',
        subtitle: incompleteWorkout?.category || 'Audio-guided boxing session',
        duration: incompleteWorkout?.duration || '20 min',
        icon: <Headphones size={24} />,
        color: 'from-orange-500 to-red-400',
        id: incompleteWorkout?.id,
      };
    }

    setRecommendation(rec);
  }, []);

  if (!recommendation) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-body text-sm text-[#0F172A]/60 uppercase tracking-wider">{greeting}</p>
          <h2 className="font-display text-2xl uppercase text-[#0F172A]">Today&apos;s Workout</h2>
        </div>
      </div>

      <button
        onClick={() => onSelectWorkout?.(recommendation.type, recommendation.id)}
        className="w-full text-left group"
      >
        <div className={`bg-gradient-to-r ${recommendation.color} p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none`}>
          <div className="bg-[#0F172A] p-6 flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white flex-shrink-0">
              {recommendation.icon}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-display text-xl uppercase text-white mb-1 truncate">
                {recommendation.title}
              </h3>
              <p className="font-body text-sm text-white/60 truncate">
                {recommendation.subtitle}
              </p>
              <div className="flex items-center gap-4 mt-2 text-white/40 text-xs">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {recommendation.duration}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-white">
              <span className="font-display uppercase text-sm hidden sm:block">Start</span>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Play size={20} fill="white" />
              </div>
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  );
}
