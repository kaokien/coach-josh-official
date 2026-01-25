'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, CheckCircle2, Circle, Clock, Zap, Brain, Wind,
  ChevronRight, Trophy, Calendar, Flame, Target
} from 'lucide-react';
import WorkoutItemModal from './workout-item-modal';

// Workout item types
type WorkoutType = 'video' | 'audio' | 'breathwork' | 'rest';

interface WorkoutItem {
  id: string;
  title: string;
  type: WorkoutType;
  duration: string;
  description: string;
  resourceId?: string; // Link to video/audio ID
}

interface DailyWorkout {
  day: number;
  title: string;
  focus: string;
  items: WorkoutItem[];
  restDay?: boolean;
}

interface Program {
  id: string;
  name: string;
  description: string;
  weeks: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  dailyWorkouts: DailyWorkout[];
}

// Sample 4-week program
const FIGHTER_FUNDAMENTALS: Program = {
  id: 'fighter-fundamentals',
  name: 'Fighter Fundamentals',
  description: '4-week program to build your boxing foundation. Perfect for beginners or as a reset.',
  weeks: 4,
  level: 'Beginner',
  dailyWorkouts: [
    {
      day: 1,
      title: 'Technique Tuesday',
      focus: 'Stance & Jab',
      items: [
        { id: '1-1', title: 'Warm-Up: Jump Rope', type: 'audio', duration: '5:00', description: 'Light rope work to get loose' },
        { id: '1-2', title: 'Shadow Boxing: Fundamentals', type: 'audio', duration: '15:00', description: 'Focus on stance and basic movement', resourceId: '1' },
        { id: '1-3', title: 'The Perfect Uppercut Mechanics', type: 'video', duration: '12:40', description: 'Watch and study technique', resourceId: '1' },
        { id: '1-4', title: 'Box Breathing', type: 'breathwork', duration: '5:00', description: '5 cycles to center yourself' },
      ]
    },
    {
      day: 2,
      title: 'Power Wednesday',
      focus: 'Heavy Bag Work',
      items: [
        { id: '2-1', title: 'Dynamic Stretching', type: 'rest', duration: '5:00', description: 'Prepare your body' },
        { id: '2-2', title: 'Heavy Bag: Power Punches', type: 'audio', duration: '20:00', description: 'Focus on power generation', resourceId: '3' },
        { id: '2-3', title: 'Heavy Bag: Power Generation', type: 'video', duration: '15:00', description: 'Study proper technique', resourceId: '3' },
        { id: '2-4', title: 'Recovery Breathing', type: 'breathwork', duration: '5:00', description: 'Cool down with 4-7-8 pattern' },
      ]
    },
    {
      day: 3,
      title: 'Rest Day',
      focus: 'Active Recovery',
      restDay: true,
      items: [
        { id: '3-1', title: 'Light Stretching', type: 'rest', duration: '10:00', description: 'Gentle mobility work' },
        { id: '3-2', title: 'Pre-Fight Visualization', type: 'audio', duration: '10:00', description: 'Mental training', resourceId: '10' },
        { id: '3-3', title: 'Recovery Breathing', type: 'breathwork', duration: '10:00', description: 'Deep recovery work' },
      ]
    },
    {
      day: 4,
      title: 'Fight IQ Thursday',
      focus: 'Distance & Timing',
      items: [
        { id: '4-1', title: 'Shadow Boxing: Pro Rounds', type: 'audio', duration: '30:00', description: 'Advanced combinations', resourceId: '2' },
        { id: '4-2', title: 'Sparring Analysis: Keeping Range', type: 'video', duration: '24:10', description: 'Study distance control', resourceId: '2' },
        { id: '4-3', title: 'Power Breathing', type: 'breathwork', duration: '5:00', description: 'Energize for finish' },
      ]
    },
    {
      day: 5,
      title: 'Conditioning Friday',
      focus: 'Cardio & Endurance',
      items: [
        { id: '5-1', title: 'Roadwork: 5K Pace', type: 'audio', duration: '25:00', description: 'Build your gas tank', resourceId: '6' },
        { id: '5-2', title: 'Tabata Burnout', type: 'audio', duration: '16:00', description: 'Finish strong', resourceId: '9' },
        { id: '5-3', title: 'Post-Training Recovery', type: 'audio', duration: '20:00', description: 'Cool down properly', resourceId: '12' },
      ]
    },
    {
      day: 6,
      title: 'Skill Saturday',
      focus: 'Defense & Head Movement',
      items: [
        { id: '6-1', title: 'Defensive Head Movement Routine', type: 'video', duration: '18:30', description: 'Learn slips and rolls', resourceId: '4' },
        { id: '6-2', title: 'Shadow Boxing: Fundamentals', type: 'audio', duration: '15:00', description: 'Apply with new skills', resourceId: '1' },
        { id: '6-3', title: 'Corner Break Breathing', type: 'breathwork', duration: '5:00', description: 'Recover like between rounds' },
      ]
    },
    {
      day: 7,
      title: 'Rest Day',
      focus: 'Complete Recovery',
      restDay: true,
      items: [
        { id: '7-1', title: 'Post-Training Recovery', type: 'audio', duration: '20:00', description: 'Full body recovery', resourceId: '12' },
        { id: '7-2', title: 'Box Breathing', type: 'breathwork', duration: '10:00', description: '10 cycles for deep reset' },
      ]
    },
  ]
};

const PROGRAMS: Program[] = [FIGHTER_FUNDAMENTALS];

// Icon mapping
const TYPE_ICONS = {
  video: <Play size={16} />,
  audio: <Zap size={16} />,
  breathwork: <Wind size={16} />,
  rest: <Brain size={16} />,
};

const TYPE_COLORS = {
  video: 'bg-blue-500',
  audio: 'bg-orange-500',
  breathwork: 'bg-purple-500',
  rest: 'bg-gray-400',
};

interface WorkoutProgress {
  programId: string;
  currentWeek: number;
  currentDay: number;
  completedItems: Set<string>;
  startDate: string;
}

export default function WorkoutBuilder() {
  const [selectedProgram] = useState<Program>(PROGRAMS[0]);
  const [currentDay, setCurrentDay] = useState(1);
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [currentWeek, setCurrentWeek] = useState(1);
  const [activeItem, setActiveItem] = useState<WorkoutItem | null>(null);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('workoutProgress');
    if (saved) {
      const progress: WorkoutProgress = JSON.parse(saved);
      if (progress.programId === selectedProgram.id) {
        setCurrentWeek(progress.currentWeek);
        setCurrentDay(progress.currentDay);
        setCompletedItems(new Set(progress.completedItems));
      }
    }
  }, [selectedProgram.id]);

  // Save progress
  const saveProgress = (items: Set<string>, day: number, week: number) => {
    const progress: WorkoutProgress = {
      programId: selectedProgram.id,
      currentWeek: week,
      currentDay: day,
      completedItems: items as unknown as Set<string>,
      startDate: new Date().toISOString(),
    };
    localStorage.setItem('workoutProgress', JSON.stringify({
      ...progress,
      completedItems: [...items]
    }));
  };

  // Toggle item completion
  const toggleItem = (itemId: string) => {
    const updated = new Set(completedItems);
    if (updated.has(itemId)) {
      updated.delete(itemId);
    } else {
      updated.add(itemId);
    }
    setCompletedItems(updated);
    saveProgress(updated, currentDay, currentWeek);
  };

  // Get current day's workout
  const todayWorkout = selectedProgram.dailyWorkouts.find(d => d.day === currentDay);

  // Calculate daily completion
  const getDayCompletion = (day: DailyWorkout): number => {
    const completed = day.items.filter(item => completedItems.has(item.id)).length;
    return Math.round((completed / day.items.length) * 100);
  };

  // Calculate overall progress
  const totalItems = selectedProgram.dailyWorkouts.reduce((acc, day) => acc + day.items.length, 0);
  const completedTotal = [...completedItems].filter(id =>
    selectedProgram.dailyWorkouts.some(day => day.items.some(item => item.id === id))
  ).length;
  const overallProgress = Math.round((completedTotal / totalItems) * 100);

  // Navigate to next day
  const goToNextDay = () => {
    if (currentDay < 7) {
      setCurrentDay(currentDay + 1);
    } else if (currentWeek < selectedProgram.weeks) {
      setCurrentWeek(currentWeek + 1);
      setCurrentDay(1);
    }
    saveProgress(completedItems, currentDay + 1, currentWeek);
  };

  // Handle starting a workout item
  const handleStartItem = (item: WorkoutItem) => {
    setActiveItem(item);
  };

  // Handle completing a workout item from modal
  const handleItemComplete = (itemId: string) => {
    const updated = new Set(completedItems);
    updated.add(itemId);
    setCompletedItems(updated);
    saveProgress(updated, currentDay, currentWeek);
    setActiveItem(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Program Header */}
      <div className="bg-[#1A1A1A] text-white p-6 border-2 border-[#1A1A1A] mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#4A6FA5]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-[#4A6FA5] px-3 py-1 text-xs font-bold uppercase">{selectedProgram.level}</span>
            <span className="text-white/50 text-sm">{selectedProgram.weeks} Weeks</span>
          </div>
          <h2 className="font-display text-3xl uppercase mb-2">{selectedProgram.name}</h2>
          <p className="font-body text-white/70 max-w-xl">{selectedProgram.description}</p>

          {/* Progress bar */}
          <div className="mt-4 flex items-center gap-4">
            <div className="flex-1 bg-white/10 h-4 border border-white/20 overflow-hidden">
              <motion.div
                className="h-full bg-[#4A6FA5]"
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="font-mono text-sm font-bold">{overallProgress}%</span>
          </div>

          {/* Week/Day indicator */}
          <div className="mt-4 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-white/50" />
              <span>Week {currentWeek} of {selectedProgram.weeks}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target size={16} className="text-white/50" />
              <span>Day {currentDay} of 7</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame size={16} className="text-orange-400" />
              <span>{completedTotal} items completed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Day Selector */}
        <div className="lg:col-span-1">
          <div className="bg-white border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="bg-[#F2E8DC] p-4 border-b-2 border-[#1A1A1A]">
              <h3 className="font-display text-lg uppercase">Week {currentWeek} Schedule</h3>
            </div>
            <div className="p-2">
              {selectedProgram.dailyWorkouts.map((day) => {
                const completion = getDayCompletion(day);
                const isActive = day.day === currentDay;

                return (
                  <button
                    key={day.day}
                    onClick={() => setCurrentDay(day.day)}
                    className={`w-full text-left p-3 border-2 mb-2 transition-all ${isActive
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                      : 'bg-white border-transparent hover:border-[#1A1A1A]/20'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-bold uppercase ${isActive ? 'text-white/60' : 'text-[#1A1A1A]/50'}`}>
                        Day {day.day}
                      </span>
                      {completion === 100 && (
                        <CheckCircle2 size={16} className="text-green-500" />
                      )}
                    </div>
                    <h4 className={`font-display uppercase text-sm ${day.restDay ? 'text-[#7FB069]' : ''}`}>
                      {day.title}
                    </h4>
                    <p className={`text-xs ${isActive ? 'text-white/50' : 'text-[#1A1A1A]/50'}`}>
                      {day.focus}
                    </p>
                    {/* Mini progress */}
                    {completion > 0 && completion < 100 && (
                      <div className="mt-2 h-2 bg-black/10 border border-black/20 overflow-hidden">
                        <div className="h-full bg-[#4A6FA5]" style={{ width: `${completion}%` }} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Today's Workout */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {todayWorkout && (
              <motion.div
                key={todayWorkout.day}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white border-2 border-[#1A1A1A] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                {/* Day Header */}
                <div className={`p-6 border-b-2 border-[#1A1A1A] ${todayWorkout.restDay ? 'bg-[#7FB069]/10' : 'bg-[#F2E8DC]'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase text-[#1A1A1A]/50">Day {todayWorkout.day}</span>
                      <h2 className="font-display text-2xl uppercase">{todayWorkout.title}</h2>
                      <p className="font-body text-[#1A1A1A]/60">{todayWorkout.focus}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-sm text-[#1A1A1A]/60">
                        <Clock size={16} />
                        <span>
                          {todayWorkout.items.reduce((acc, item) => {
                            const [mins] = item.duration.split(':').map(Number);
                            return acc + mins;
                          }, 0)} min total
                        </span>
                      </div>
                      <div className="mt-1 font-mono text-lg font-bold text-[#4A6FA5]">
                        {getDayCompletion(todayWorkout)}% done
                      </div>
                    </div>
                  </div>
                </div>

                {/* Workout Items */}
                <div className="p-4 space-y-3">
                  {todayWorkout.items.map((item, index) => {
                    const isCompleted = completedItems.has(item.id);

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 border-2 border-[#1A1A1A] transition-all ${isCompleted ? 'bg-[#7FB069]/10' : 'bg-white'
                          }`}
                      >
                        <div className="flex items-start gap-4">
                          {/* Completion Toggle */}
                          <button
                            onClick={() => toggleItem(item.id)}
                            className="flex-shrink-0 mt-1"
                          >
                            {isCompleted ? (
                              <CheckCircle2 size={24} className="text-[#7FB069]" />
                            ) : (
                              <Circle size={24} className="text-[#1A1A1A]/30 hover:text-[#1A1A1A]" />
                            )}
                          </button>

                          {/* Item Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`p-1 ${TYPE_COLORS[item.type]} text-white`}>
                                {TYPE_ICONS[item.type]}
                              </span>
                              <span className="text-xs font-bold uppercase text-[#1A1A1A]/50">
                                {item.type}
                              </span>
                              <span className="text-xs font-mono text-[#1A1A1A]/50">
                                {item.duration}
                              </span>
                            </div>
                            <h4 className={`font-display uppercase ${isCompleted ? 'line-through text-[#1A1A1A]/50' : ''}`}>
                              {item.title}
                            </h4>
                            <p className="text-sm text-[#1A1A1A]/60 mt-1">
                              {item.description}
                            </p>
                          </div>

                          {/* Start Button */}
                          {!isCompleted && (
                            <button
                              onClick={() => handleStartItem(item)}
                              className="flex-shrink-0 flex items-center gap-1 px-3 py-2 bg-[#4A6FA5] text-white text-xs font-bold uppercase hover:bg-[#3A5F95] transition-colors"
                            >
                              Start
                              <ChevronRight size={14} />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Day Footer */}
                <div className="p-4 border-t-2 border-[#1A1A1A]/10 flex items-center justify-between">
                  <div className="text-sm text-[#1A1A1A]/50">
                    {getDayCompletion(todayWorkout) === 100 ? (
                      <span className="flex items-center gap-2 text-[#7FB069]">
                        <Trophy size={16} />
                        Day Complete! Great work!
                      </span>
                    ) : (
                      <span>Complete all items to finish the day</span>
                    )}
                  </div>

                  {currentDay < 7 && getDayCompletion(todayWorkout) === 100 && (
                    <button
                      onClick={goToNextDay}
                      className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] text-white font-display uppercase text-sm hover:bg-[#2A2A2A] transition-colors"
                    >
                      Next Day
                      <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Workout Item Modal */}
      {activeItem && (
        <WorkoutItemModal
          item={activeItem}
          onComplete={() => handleItemComplete(activeItem.id)}
          onClose={() => setActiveItem(null)}
        />
      )}
    </div>
  );
}
