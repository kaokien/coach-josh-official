'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Play, Pause, FastForward, Rewind, CheckCircle2,
  Wind, Clock, Zap, Video
} from 'lucide-react';
import { getAudioById, getVideoById, AudioWorkout, Video as VideoType } from '@/lib/cornerman-data';
import VideoPlayer from '@/components/video-player';
import { SPRING, EASING } from '@/lib/motion';

// WorkoutItem type (matches workout-builder.tsx)
interface WorkoutItem {
  id: string;
  title: string;
  type: 'video' | 'audio' | 'breathwork' | 'rest';
  duration: string;
  description: string;
  resourceId?: string;
}

interface WorkoutItemModalProps {
  item: WorkoutItem;
  onComplete: () => void;
  onClose: () => void;
}

// Type icons and colors
const TYPE_CONFIG = {
  video: { icon: Video, color: 'bg-blue-500', label: 'VIDEO' },
  audio: { icon: Zap, color: 'bg-orange-500', label: 'AUDIO' },
  breathwork: { icon: Wind, color: 'bg-purple-500', label: 'BREATHWORK' },
  rest: { icon: Clock, color: 'bg-gray-400', label: 'REST' },
};

export default function WorkoutItemModal({ item, onComplete, onClose }: WorkoutItemModalProps) {
  const config = TYPE_CONFIG[item.type];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={SPRING.snappy}
          className="relative w-full max-w-2xl bg-white border-2 border-[#1A1A1A] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b-2 border-[#1A1A1A] bg-[#F2E8DC]">
            <div className="flex items-center gap-3">
              <span className={`p-2 ${config.color} text-white`}>
                <config.icon size={20} />
              </span>
              <div>
                <span className="text-xs font-bold uppercase text-[#1A1A1A]/50">
                  {config.label} • {item.duration}
                </span>
                <h3 className="font-display text-lg uppercase">{item.title}</h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 border-2 border-[#1A1A1A] bg-white hover:bg-[#F2E8DC] transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {item.type === 'audio' && (
              <AudioPlayer
                item={item}
                onComplete={onComplete}
              />
            )}
            {item.type === 'video' && (
              <VideoPlayerWrapper
                item={item}
                onComplete={onComplete}
              />
            )}
            {item.type === 'breathwork' && (
              <BreathworkPlayer
                item={item}
                onComplete={onComplete}
              />
            )}
            {item.type === 'rest' && (
              <RestTimer
                item={item}
                onComplete={onComplete}
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ============ AUDIO PLAYER ============
function AudioPlayer({ item, onComplete }: { item: WorkoutItem; onComplete: () => void }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Get audio data from resourceId
  const audioData = item.resourceId ? getAudioById(item.resourceId) : null;
  const audioUrl = audioData?.audioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

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

  const handleEnded = () => {
    setIsPlaying(false);
    onComplete();
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
    <div className="space-y-6">
      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={handleEnded}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
      />

      <p className="text-center text-[#1A1A1A]/60 font-body">{item.description}</p>

      {/* Progress Bar */}
      <div>
        <div className="relative">
          <div className="h-3 bg-[#1A1A1A]/10 border border-[#1A1A1A]/20">
            <div
              className="h-full bg-orange-500 transition-all duration-100"
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
        <div className="flex justify-between mt-2 font-mono text-xs text-[#1A1A1A]/60">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => { if (audioRef.current) audioRef.current.currentTime -= 10 }}
          className="p-3 border-2 border-[#1A1A1A] bg-white hover:bg-[#F2E8DC] transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          aria-label="Rewind 10s"
        >
          <Rewind size={20} />
        </button>
        <button
          onClick={togglePlay}
          className="p-4 border-2 border-[#1A1A1A] bg-[#D1495B] text-white hover:bg-[#B01C33] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
        </button>
        <button
          onClick={() => { if (audioRef.current) audioRef.current.currentTime += 10 }}
          className="p-3 border-2 border-[#1A1A1A] bg-white hover:bg-[#F2E8DC] transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          aria-label="Forward 10s"
        >
          <FastForward size={20} />
        </button>
      </div>

      {/* Manual Complete */}
      <button
        onClick={onComplete}
        className="w-full py-3 border-2 border-[#1A1A1A] bg-[#7FB069] text-white font-display uppercase text-sm hover:bg-[#6A9956] transition-colors flex items-center justify-center gap-2"
      >
        <CheckCircle2 size={18} />
        Mark Complete
      </button>
    </div>
  );
}

// ============ VIDEO PLAYER ============
function VideoPlayerWrapper({ item, onComplete }: { item: WorkoutItem; onComplete: () => void }) {
  const videoData = item.resourceId ? getVideoById(item.resourceId) : null;
  const playbackId = videoData?.muxPlaybackId || 'yb2L3z3Z4IKQH02HYkf9xPToVYkOC85WA';

  return (
    <div className="space-y-4">
      <p className="text-center text-[#1A1A1A]/60 font-body">{item.description}</p>

      <div className="border-2 border-[#1A1A1A]">
        <VideoPlayer
          playbackId={playbackId}
          title={item.title}
          onEnded={onComplete}
        />
      </div>

      <button
        onClick={onComplete}
        className="w-full py-3 border-2 border-[#1A1A1A] bg-[#7FB069] text-white font-display uppercase text-sm hover:bg-[#6A9956] transition-colors flex items-center justify-center gap-2"
      >
        <CheckCircle2 size={18} />
        Mark Complete
      </button>
    </div>
  );
}

// ============ BREATHWORK PLAYER ============
function BreathworkPlayer({ item, onComplete }: { item: WorkoutItem; onComplete: () => void }) {
  const [phase, setPhase] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Parse duration to get target cycles (5 min = 5 cycles roughly)
  const durationMins = parseInt(item.duration.split(':')[0]) || 5;
  const targetCycles = Math.max(durationMins, 5);

  useEffect(() => {
    if (!isRunning) return;

    const phases: ('inhale' | 'hold' | 'exhale')[] = ['inhale', 'hold', 'exhale'];
    let currentPhaseIndex = 0;

    const interval = setInterval(() => {
      if (currentPhaseIndex >= phases.length) {
        currentPhaseIndex = 0;
        setCyclesCompleted(prev => {
          const newCount = prev + 1;
          if (newCount >= targetCycles) {
            setIsRunning(false);
            onComplete();
          }
          return newCount;
        });
      }
      setPhase(phases[currentPhaseIndex]);
      currentPhaseIndex++;
    }, 4000); // 4 seconds per phase

    return () => clearInterval(interval);
  }, [isRunning, targetCycles, onComplete]);

  const phaseColors = {
    idle: 'bg-[#1A1A1A]/10',
    inhale: 'bg-blue-500',
    hold: 'bg-purple-500',
    exhale: 'bg-green-500',
  };

  const phaseLabels = {
    idle: 'READY',
    inhale: 'INHALE',
    hold: 'HOLD',
    exhale: 'EXHALE',
  };

  return (
    <div className="space-y-6 text-center">
      <p className="text-[#1A1A1A]/60 font-body">{item.description}</p>

      {/* Breathing Circle */}
      <motion.div
        animate={{
          scale: phase === 'inhale' ? 1.3 : phase === 'exhale' ? 0.8 : 1,
        }}
        transition={{ duration: 3.5, ease: EASING.standard }}
        className={`mx-auto w-40 h-40 rounded-full border-4 border-[#1A1A1A] flex items-center justify-center ${phaseColors[phase]} transition-colors`}
      >
        <span className="font-display text-2xl uppercase text-white drop-shadow-lg">
          {phaseLabels[phase]}
        </span>
      </motion.div>

      {/* Progress */}
      <div className="font-mono text-lg">
        Cycle {cyclesCompleted} / {targetCycles}
      </div>

      {/* Start/Stop */}
      {!isRunning ? (
        <button
          onClick={() => { setIsRunning(true); setPhase('inhale'); }}
          className="px-8 py-3 border-2 border-[#1A1A1A] bg-[#4A6FA5] text-white font-display uppercase hover:bg-[#3A5F95] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          Start Breathing
        </button>
      ) : (
        <button
          onClick={() => { setIsRunning(false); setPhase('idle'); }}
          className="px-8 py-3 border-2 border-[#1A1A1A] bg-[#D1495B] text-white font-display uppercase hover:bg-[#B01C33] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          Stop
        </button>
      )}

      <button
        onClick={onComplete}
        className="w-full py-3 border-2 border-[#1A1A1A] bg-[#7FB069] text-white font-display uppercase text-sm hover:bg-[#6A9956] transition-colors flex items-center justify-center gap-2"
      >
        <CheckCircle2 size={18} />
        Mark Complete
      </button>
    </div>
  );
}

// ============ REST TIMER ============
function RestTimer({ item, onComplete }: { item: WorkoutItem; onComplete: () => void }) {
  const [timeRemaining, setTimeRemaining] = useState(() => {
    const [mins, secs] = item.duration.split(':').map(Number);
    return (mins || 0) * 60 + (secs || 0);
  });
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 text-center">
      <p className="text-[#1A1A1A]/60 font-body">{item.description}</p>

      {/* Timer Display */}
      <div className="font-display text-6xl text-[#1A1A1A]">
        {formatTime(timeRemaining)}
      </div>

      {/* Start/Stop */}
      {!isRunning ? (
        <button
          onClick={() => setIsRunning(true)}
          className="px-8 py-3 border-2 border-[#1A1A1A] bg-[#4A6FA5] text-white font-display uppercase hover:bg-[#3A5F95] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          Start Timer
        </button>
      ) : (
        <button
          onClick={() => setIsRunning(false)}
          className="px-8 py-3 border-2 border-[#1A1A1A] bg-[#D1495B] text-white font-display uppercase hover:bg-[#B01C33] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          Pause
        </button>
      )}

      <button
        onClick={onComplete}
        className="w-full py-3 border-2 border-[#1A1A1A] bg-[#7FB069] text-white font-display uppercase text-sm hover:bg-[#6A9956] transition-colors flex items-center justify-center gap-2"
      >
        <CheckCircle2 size={18} />
        Mark Complete
      </button>
    </div>
  );
}
