'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, FastForward, Rewind, Volume2, Filter, Sparkles, CheckCircle2 } from 'lucide-react';
import { AUDIO_WORKOUTS, AudioWorkout } from '@/lib/cornerman-data';
import { updateStats } from '@/components/cornerman/progress-dashboard';

type CategoryFilter = 'All' | 'Technique' | 'Conditioning' | 'Mindset';

export default function AudioCorner() {
  const [activeWorkout, setActiveWorkout] = useState<AudioWorkout | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('All');
  // Lazy initializer for localStorage to avoid setState in useEffect
  const [completedWorkouts, setCompletedWorkouts] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('completedAudioWorkouts');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    }
    return new Set();
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Save completed workouts to localStorage
  const markComplete = (workoutId: string) => {
    const updated = new Set(completedWorkouts);
    updated.add(workoutId);
    setCompletedWorkouts(updated);
    localStorage.setItem('completedAudioWorkouts', JSON.stringify([...updated]));
  };

  // Filter workouts by category
  const filteredWorkouts = categoryFilter === 'All'
    ? AUDIO_WORKOUTS
    : AUDIO_WORKOUTS.filter(w => w.category === categoryFilter);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleWorkoutSelect = (workout: AudioWorkout) => {
    setActiveWorkout(workout);
    setIsPlaying(true);
    setCurrentTime(0);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log('Autoplay prevent or error', e));
      }
    }, 100);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (activeWorkout) {
      markComplete(activeWorkout.id);
      updateStats(parseInt(activeWorkout.duration || '0'));
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Playlist */}
      <div className="lg:col-span-1 space-y-4">
        <div className="flex items-center justify-between border-b-2 border-black pb-2">
          <h3 className="font-display text-2xl uppercase text-[#1A1A1A]">Audio Workouts</h3>
          <span className="font-mono text-sm text-[#1A1A1A]/60">{AUDIO_WORKOUTS.length} sessions</span>
        </div>

        {/* Category Filters */}
        <div className="flex flex-nowrap gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
          {(['All', 'Technique', 'Conditioning', 'Mindset'] as CategoryFilter[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`flex-shrink-0 px-2 py-1 text-[10px] font-bold uppercase tracking-wide border-2 border-[#1A1A1A] transition-all ${categoryFilter === cat
                ? 'bg-[#1A1A1A] text-white'
                : 'bg-white text-[#1A1A1A] hover:bg-[#F2E8DC]'
                }`}
            >
              <Filter size={12} className="inline-block mr-1" />
              {cat}
            </button>
          ))}
        </div>

        {/* Mobile Mini Player - Shows below filters when workout is active */}
        {activeWorkout && (
          <div className="lg:hidden bg-[#1A1A1A] border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {/* Audio Element for Mobile */}
            <audio
              ref={audioRef}
              src={activeWorkout.audioUrl}
              onEnded={handleEnded}
              onPause={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            />

            {/* Workout Info */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1 min-w-0 mr-3">
                <p className="text-[10px] font-mono uppercase tracking-wider text-white/50 mb-0.5">
                  Now Playing
                </p>
                <h4 className="font-display text-sm uppercase text-white truncate">
                  {activeWorkout.title}
                </h4>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 border border-white/30 uppercase ${activeWorkout.color} text-white`}>
                {activeWorkout.level}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="relative">
                <div className="h-2 bg-white/10 border border-white/20">
                  <div
                    className={`h-full ${activeWorkout.color} transition-all duration-100`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <div className="flex justify-between mt-1 font-mono text-[10px] text-white/50">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => { if (audioRef.current) audioRef.current.currentTime -= 10 }}
                className="p-2 border-2 border-white/30 bg-transparent text-white hover:bg-white/10 transition-colors"
                aria-label="Rewind 10s"
              >
                <Rewind size={18} />
              </button>
              <button
                onClick={togglePlay}
                className="p-3 border-2 border-white bg-[#D1495B] text-white hover:bg-[#B01C33] transition-colors"
              >
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-0.5" />}
              </button>
              <button
                onClick={() => { if (audioRef.current) audioRef.current.currentTime += 10 }}
                className="p-2 border-2 border-white/30 bg-transparent text-white hover:bg-white/10 transition-colors"
                aria-label="Forward 10s"
              >
                <FastForward size={18} />
              </button>
            </div>

            {/* Completed indicator */}
            {completedWorkouts.has(activeWorkout.id) && (
              <div className="flex items-center justify-center gap-2 text-green-400 mt-3 pt-2 border-t border-white/10">
                <CheckCircle2 size={14} />
                <span className="font-body text-xs font-bold uppercase">Completed</span>
              </div>
            )}
          </div>
        )}

        {/* Workout List */}
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
          <AnimatePresence mode="popLayout">
            {filteredWorkouts.map((workout, index) => (
              <motion.button
                key={workout.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.03,
                  layout: { type: "spring" as const, stiffness: 300, damping: 30 }
                }}
                onClick={() => handleWorkoutSelect(workout)}
                className={`w-full text-left p-4 border-2 border-black transition-all relative ${activeWorkout?.id === workout.id
                  ? 'bg-[#1A1A1A] text-white shadow-none translate-x-[2px] translate-y-[2px]'
                  : 'bg-white hover:bg-[#F2E8DC] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                  }`}
              >
                {/* New Badge */}
                {workout.isNew && (
                  <div className="absolute -top-2 -right-2 bg-[#D1495B] text-white text-[10px] font-bold px-2 py-0.5 border border-black flex items-center gap-1">
                    <Sparkles size={10} />
                    NEW
                  </div>
                )}

                {/* Completed Badge */}
                {completedWorkouts.has(workout.id) && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle2 size={18} className={activeWorkout?.id === workout.id ? 'text-green-400' : 'text-green-600'} />
                  </div>
                )}

                <div className="flex justify-between items-start mb-1 pr-6">
                  <span className={`text-xs font-bold px-2 py-0.5 border border-black uppercase ${activeWorkout?.id === workout.id ? 'bg-white text-[#1A1A1A]' : workout.color + ' text-white'
                    }`}>
                    {workout.level}
                  </span>
                  <span className="font-mono text-xs font-bold">{workout.duration}</span>
                </div>
                <h4 className="font-display text-lg leading-tight mb-1 uppercase">{workout.title}</h4>
                <p className={`text-xs ${activeWorkout?.id === workout.id ? 'text-gray-300' : 'text-gray-600'}`}>
                  {workout.description}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className={`text-[10px] font-mono uppercase tracking-wider ${activeWorkout?.id === workout.id ? 'text-white/50' : 'text-[#1A1A1A]/50'}`}>
                    {workout.category} • {workout.subcategory}
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Player - Hidden on mobile since we have mini player */}
      <div className="hidden lg:!block lg:col-span-2">
        <div className="sticky top-24">
          <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden min-h-[500px] flex flex-col justify-center">
            {activeWorkout ? (
              <div className="relative z-10 w-full max-w-2xl mx-auto">
                <div className={`absolute top-0 left-0 w-full h-2 ${activeWorkout.color} opacity-20`} />

                <div className="flex flex-col items-center text-center mb-8">
                  <span className="text-sm font-black tracking-[0.2em] uppercase text-[#1A1A1A]/50 mb-3">
                    {activeWorkout.category} • {activeWorkout.subcategory}
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl uppercase mb-4 text-[#1A1A1A] leading-none">
                    {activeWorkout.title}
                  </h2>
                  <div className="flex items-center justify-center gap-4 text-xs md:text-sm font-bold font-mono border-2 border-[#1A1A1A] px-4 py-2 bg-[#F2E8DC] uppercase">
                    <span>Level: {activeWorkout.level}</span>
                    <span className="text-[#1A1A1A]/30">|</span>
                    <span>Duration: {activeWorkout.duration}</span>
                  </div>
                </div>

                {/* Audio Element */}
                <audio
                  ref={audioRef}
                  src={activeWorkout.audioUrl}
                  onEnded={handleEnded}
                  onPause={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                />

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="relative">
                    {/* Track background */}
                    <div className="h-3 bg-[#1A1A1A]/10 border border-[#1A1A1A]/20 rounded-none">
                      {/* Progress fill */}
                      <div
                        className={`h-full ${activeWorkout.color} transition-all duration-100`}
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    {/* Seek input overlay */}
                    <input
                      type="range"
                      min="0"
                      max={duration || 100}
                      value={currentTime}
                      onChange={handleSeek}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between mt-2 font-mono text-xs text-[#1A1A1A]/60">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-6 mb-8">
                  <button
                    onClick={() => { if (audioRef.current) audioRef.current.currentTime -= 10 }}
                    className="p-4 border-2 border-[#1A1A1A] bg-white hover:bg-[#F2E8DC] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                    aria-label="Rewind 10s"
                  >
                    <Rewind size={24} />
                  </button>
                  <button
                    onClick={togglePlay}
                    className="p-6 border-2 border-[#1A1A1A] bg-[#D1495B] text-white hover:bg-[#B01C33] transition-colors shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                  >
                    {isPlaying ? <Pause size={40} fill="currentColor" /> : <Play size={40} fill="currentColor" className="ml-1" />}
                  </button>
                  <button
                    onClick={() => { if (audioRef.current) audioRef.current.currentTime += 10 }}
                    className="p-4 border-2 border-[#1A1A1A] bg-white hover:bg-[#F2E8DC] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                    aria-label="Forward 10s"
                  >
                    <FastForward size={24} />
                  </button>
                </div>

                {/* Completed indicator */}
                {completedWorkouts.has(activeWorkout.id) && (
                  <div className="flex items-center justify-center gap-2 text-green-600 mb-4">
                    <CheckCircle2 size={20} />
                    <span className="font-body text-sm font-bold uppercase">Completed</span>
                  </div>
                )}

                <div className="text-center border-t-2 border-[#1A1A1A]/10 pt-6">
                  <p className="text-sm text-[#1A1A1A]/60 italic font-mono">&quot;Listen to the instructions. Visualize the opponent. Don&apos;t just go through the motions.&quot;</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-[#1A1A1A]/30">
                <Volume2 size={80} className="mb-6 opacity-50" />
                <p className="font-display text-2xl uppercase">Select a workout to begin</p>
                <p className="font-body text-sm mt-2 max-w-xs text-center opacity-70">Choose a session from the list to start your audio-guided training.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
