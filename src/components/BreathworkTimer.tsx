'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { triggerHaptic } from '@/lib/haptics';
import { EASING, DURATION } from '@/lib/motion';

type Phase = 'inhale' | 'hold' | 'exhale' | 'rest';

interface BreathingPattern {
  inhale: number;
  hold: number;
  exhale: number;
  rest: number;
}

const BOXING_BREATHING_PATTERNS: Record<string, BreathingPattern> = {
  'Box Breathing': { inhale: 4, hold: 4, exhale: 4, rest: 4 },
  'Pre-Fight (4-7-8)': { inhale: 4, hold: 7, exhale: 8, rest: 0 },
  'Recovery': { inhale: 3, hold: 0, exhale: 6, rest: 2 },
  'Power': { inhale: 2, hold: 2, exhale: 2, rest: 0 },
  'Corner Break': { inhale: 5, hold: 5, exhale: 5, rest: 5 },
};

const PHASE_ORDER: Phase[] = ['inhale', 'hold', 'exhale', 'rest'];

const PHASE_CONFIG = {
  inhale: { label: 'Inhale', color: '#2563EB', scale: 1.2 },
  hold: { label: 'Hold', color: '#DC2626', scale: 1.25 },
  exhale: { label: 'Exhale', color: '#7FB069', scale: 0.8 },
  rest: { label: 'Rest', color: '#0F172A', scale: 0.8 },
};

// Audio frequencies for phase transitions
const PHASE_FREQUENCIES = {
  inhale: 523.25, // C5
  hold: 659.25,   // E5
  exhale: 783.99, // G5
  rest: 440,      // A4
};

export default function BreathworkTimer() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<Phase>('inhale');
  const [countdown, setCountdown] = useState(4);
  const [pattern, setPattern] = useState('Box Breathing');
  const [rounds, setRounds] = useState(0);
  const [targetRounds, setTargetRounds] = useState(5);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [sessionComplete, setSessionComplete] = useState(false);
  // Lazy initializer for localStorage to avoid setState in useEffect
  const [totalSessions, setTotalSessions] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('breathworkSessions');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  const currentPattern = BOXING_BREATHING_PATTERNS[pattern];

  // Keep screen awake during active workout sessions
  useEffect(() => {
    const requestWakeLock = async () => {
      if (isActive && 'wakeLock' in navigator) {
        try {
          wakeLockRef.current = await navigator.wakeLock.request('screen');
        } catch {
          // Wake lock not supported or denied
        }
      }
    };

    requestWakeLock();

    return () => {
      wakeLockRef.current?.release();
      wakeLockRef.current = null;
    };
  }, [isActive]);

  // Play audio cue on phase transition
  const playPhaseCue = useCallback((newPhase: Phase) => {
    if (!audioEnabled) return;

    try {
      // Create audio context on demand (required for browser autoplay policies)
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Create oscillator for the tone
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.value = PHASE_FREQUENCIES[newPhase];

      // Gentle fade in/out
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.3);

      // Haptic feedback for mobile devices
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
    } catch {
      // Audio not supported or blocked - just continue silently
    }
  }, [audioEnabled]);

  // Save session on completion
  const completeSession = useCallback(() => {
    const newTotal = totalSessions + 1;
    setTotalSessions(newTotal);
    localStorage.setItem('breathworkSessions', newTotal.toString());
    setSessionComplete(true);

    // Celebration haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]); // Success pattern
    }
  }, [totalSessions]);

  // Web Worker reference for precision timing
  const timerWorkerRef = useRef<Worker | null>(null);

  // Initialize Web Worker
  useEffect(() => {
    timerWorkerRef.current = new Worker('/workers/timer-worker.js');

    timerWorkerRef.current.onmessage = (e) => {
      const { type, remainingSeconds } = e.data;

      if (type === 'SECOND' && remainingSeconds !== undefined) {
        setCountdown(remainingSeconds);
      }

      if (type === 'COMPLETE') {
        // Phase complete - transition to next
        handlePhaseComplete();
      }
    };

    return () => {
      timerWorkerRef.current?.terminate();
    };
  }, []);

  // Handle phase completion - extracted for Web Worker callback
  const handlePhaseComplete = useCallback(() => {
    let nextPhaseIndex = (PHASE_ORDER.indexOf(phase) + 1) % PHASE_ORDER.length;
    let nextPhase = PHASE_ORDER[nextPhaseIndex];

    // Skip phases with 0 duration
    while (currentPattern[nextPhase] === 0) {
      nextPhaseIndex = (nextPhaseIndex + 1) % PHASE_ORDER.length;
      nextPhase = PHASE_ORDER[nextPhaseIndex];
    }

    // Cycle complete
    if (nextPhase === 'inhale') {
      const newRounds = rounds + 1;
      setRounds(newRounds);

      // Check if target reached
      if (newRounds >= targetRounds) {
        setIsActive(false);
        timerWorkerRef.current?.postMessage({ type: 'STOP' });
        completeSession();
        return;
      }
    }

    // Play audio cue
    playPhaseCue(nextPhase);
    setPhase(nextPhase);

    // Haptic impact for phase transition
    triggerHaptic(nextPhase === 'inhale' ? 'medium' : 'light');

    // Start next phase on worker
    const nextDuration = currentPattern[nextPhase];
    setCountdown(nextDuration);
    timerWorkerRef.current?.postMessage({
      type: 'START',
      payload: { durationMs: nextDuration * 1000 }
    });
  }, [phase, currentPattern, rounds, targetRounds, playPhaseCue, completeSession]);

  // Start/stop worker when isActive changes
  useEffect(() => {
    if (isActive && timerWorkerRef.current) {
      timerWorkerRef.current.postMessage({
        type: 'START',
        payload: { durationMs: countdown * 1000 }
      });
    } else if (!isActive && timerWorkerRef.current) {
      timerWorkerRef.current.postMessage({ type: 'PAUSE' });
    }
  }, [isActive]);


  const handleStart = () => {
    if (sessionComplete) {
      // Reset if session was completed
      handleReset();
    }
    if (!isActive && countdown === currentPattern.inhale) {
      playPhaseCue('inhale');
      triggerHaptic('medium');
    }
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('inhale');
    setCountdown(currentPattern.inhale);
    setRounds(0);
    setSessionComplete(false);
  };

  const handlePatternChange = (newPattern: string) => {
    setPattern(newPattern);
    setIsActive(false);
    setPhase('inhale');
    setCountdown(BOXING_BREATHING_PATTERNS[newPattern].inhale);
    setRounds(0);
    setSessionComplete(false);
  };

  // Format pattern display
  const formatPattern = (p: BreathingPattern) => {
    const parts = [];
    if (p.inhale > 0) parts.push(p.inhale);
    if (p.hold > 0) parts.push(p.hold);
    if (p.exhale > 0) parts.push(p.exhale);
    if (p.rest > 0) parts.push(p.rest);
    return parts.join('-');
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      <div className="bg-[#0F172A] border-2 border-white/10 rounded-sm p-8 md:p-12 relative overflow-hidden">
        {/* Background Texture/Noise */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

        {/* Session Complete Overlay */}
        <AnimatePresence>
          {sessionComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 bg-[#0F172A]/95 flex flex-col items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="text-center"
              >
                <Trophy size={64} className="text-yellow-400 mx-auto mb-4" />
                <h3 className="font-display text-3xl text-white uppercase mb-2">Session Complete!</h3>
                <p className="text-white/60 font-body mb-2">
                  You completed {targetRounds} cycles of {pattern}
                </p>
                <p className="text-white/40 font-mono text-sm mb-6">
                  Total sessions: {totalSessions}
                </p>
                <button
                  onClick={handleReset}
                  className="bg-[#2563EB] text-white font-display uppercase px-8 py-3 hover:bg-[#5A7FB5] transition-colors"
                >
                  Start New Session
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">

          {/* Visualizer Side */}
          <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
            <div className="relative flex items-center justify-center">
              {/* Static Outer Ring */}
              <div className="absolute inset-0 border-[1px] border-white/10 rounded-full w-80 h-80" />

              {/* Progress ring showing rounds */}
              <svg className="absolute w-80 h-80" viewBox="0 0 320 320">
                <circle
                  cx="160"
                  cy="160"
                  r="155"
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="2"
                />
                <circle
                  cx="160"
                  cy="160"
                  r="155"
                  fill="none"
                  stroke={PHASE_CONFIG[phase].color}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${(rounds / targetRounds) * 973} 973`}
                  transform="rotate(-90 160 160)"
                  className="transition-all duration-500"
                />
              </svg>

              {/* Animated Breathing Circle */}
              <motion.div
                animate={{
                  scale: PHASE_CONFIG[phase].scale,
                  borderColor: PHASE_CONFIG[phase].color,
                  boxShadow: isActive
                    ? `0 0 40px ${PHASE_CONFIG[phase].color}40`
                    : 'none'
                }}
                transition={{
                  duration: currentPattern[phase],
                  // Phase-specific easing for natural breath rhythm
                  ease: phase === 'inhale'
                    ? EASING.accelerate
                    : phase === 'exhale'
                      ? EASING.decelerate
                      : EASING.standard
                }}
                className="w-48 h-48 rounded-full border-4 flex items-center justify-center relative bg-[#0F172A]"
              >
                <AnimatePresence mode='popLayout'>
                  <motion.div
                    key={phase + countdown}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center absolute"
                  >
                    <span className="font-display text-6xl text-white block">
                      {countdown}
                    </span>
                    <span
                      className="font-body text-xs uppercase tracking-[0.2em]"
                      style={{ color: PHASE_CONFIG[phase].color }}
                    >
                      {PHASE_CONFIG[phase].label}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 text-center w-full max-w-sm">
              <div>
                <p className="font-body text-xs text-white/40 uppercase tracking-widest mb-1">Cycle</p>
                <p className="font-display text-2xl text-white">{rounds}<span className="text-white/30">/{targetRounds}</span></p>
              </div>
              <div>
                <p className="font-body text-xs text-white/40 uppercase tracking-widest mb-1">Pattern</p>
                <p className="font-display text-2xl text-white">{formatPattern(currentPattern)}</p>
              </div>
              <div>
                <p className="font-body text-xs text-white/40 uppercase tracking-widest mb-1">Sessions</p>
                <p className="font-display text-2xl text-white">{totalSessions}</p>
              </div>
            </div>
          </div>

          {/* Controls Side */}
          <div className="flex-1 w-full space-y-6">
            <div>
              <h2 className="font-display text-3xl text-white uppercase mb-2">Focus Logic</h2>
              <p className="font-body text-white/60 leading-relaxed">
                Control your breath, control the ring. Select a pattern to regulate your nervous system.
              </p>
            </div>

            {/* Target Rounds Selector */}
            <div className="space-y-2">
              <label className="font-body text-sm text-white/70 uppercase tracking-widest font-medium">Target Cycles</label>
              <div className="flex gap-2">
                {[3, 5, 10, 15].map((num) => (
                  <button
                    key={num}
                    onClick={() => { setTargetRounds(num); if (!isActive) handleReset(); }}
                    className={cn(
                      "flex-1 py-2 border-2 font-display text-lg transition-all",
                      targetRounds === num
                        ? "border-[#2563EB] bg-[#2563EB]/20 text-white"
                        : "border-white/20 text-white/70 hover:border-white/40 hover:text-white"
                    )}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {Object.keys(BOXING_BREATHING_PATTERNS).map((p) => (
                <button
                  key={p}
                  onClick={() => handlePatternChange(p)}
                  className={cn(
                    "w-full text-left px-6 py-4 border-2 transition-all duration-300 flex items-center justify-between group",
                    pattern === p
                      ? "border-[#2563EB] bg-[#2563EB]/10"
                      : "border-white/10 hover:border-white/30 bg-transparent"
                  )}
                >
                  <div>
                    <span className={cn(
                      "font-body text-sm uppercase tracking-widest font-bold block",
                      pattern === p ? "text-white" : "text-white/60 group-hover:text-white"
                    )}>
                      {p}
                    </span>
                    <span className="font-mono text-xs text-white/30">
                      {formatPattern(BOXING_BREATHING_PATTERNS[p])}
                    </span>
                  </div>
                  {pattern === p && (
                    <span className="w-2 h-2 rounded-full bg-[#2563EB] shadow-[0_0_10px_#2563EB]" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleStart}
                className="flex-1 bg-[#FFFFFF] text-[#0F172A] font-display uppercase tracking-wider py-4 text-xl hover:bg-white transition-colors flex items-center justify-center gap-2"
              >
                {isActive ? <Pause size={20} /> : <Play size={20} />}
                {isActive ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={handleReset}
                className="bg-transparent border-2 border-white/20 text-white p-4 hover:border-white hover:bg-white/5 transition-all"
                aria-label="Reset"
              >
                <RotateCcw size={20} />
              </button>
              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={cn(
                  "border-2 p-4 transition-all",
                  audioEnabled
                    ? "border-[#2563EB] bg-[#2563EB]/10 text-[#2563EB]"
                    : "border-white/20 text-white/50"
                )}
                aria-label={audioEnabled ? "Mute audio cues" : "Enable audio cues"}
              >
                {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
