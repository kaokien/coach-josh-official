'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

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
  'Recovery Breathing': { inhale: 3, hold: 0, exhale: 6, rest: 2 },
  'Power Breathing': { inhale: 2, hold: 2, exhale: 2, rest: 0 },
};

const PHASE_ORDER: Phase[] = ['inhale', 'hold', 'exhale', 'rest'];

const PHASE_COLORS = {
  inhale: '#4A6FA5',
  hold: '#5A7FB5',
  exhale: '#6A8FC5',
  rest: '#3A5F95',
};

const PHASE_LABELS = {
  inhale: 'Breathe In',
  hold: 'Hold',
  exhale: 'Breathe Out',
  rest: 'Rest',
};

export default function BreathworkTimer() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<Phase>('inhale');
  const [countdown, setCountdown] = useState(4);
  const [pattern, setPattern] = useState('Box Breathing');
  const [rounds, setRounds] = useState(0);

  const currentPattern = BOXING_BREATHING_PATTERNS[pattern];

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Move to next phase
          const currentPhaseIndex = PHASE_ORDER.indexOf(phase);
          let nextPhaseIndex = (currentPhaseIndex + 1) % PHASE_ORDER.length;
          let nextPhase = PHASE_ORDER[nextPhaseIndex];

          // Skip phases with 0 duration
          while (currentPattern[nextPhase] === 0) {
            nextPhaseIndex = (nextPhaseIndex + 1) % PHASE_ORDER.length;
            nextPhase = PHASE_ORDER[nextPhaseIndex];
          }

          // Increment round when we complete a full cycle
          if (nextPhase === 'inhale') {
            setRounds((r) => r + 1);
          }

          setPhase(nextPhase);
          return currentPattern[nextPhase];
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase, currentPattern]);

  const handleStart = () => {
    if (!isActive) {
      // Reset to start of pattern
      setPhase('inhale');
      setCountdown(currentPattern.inhale);
      setRounds(0);
    }
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('inhale');
    setCountdown(currentPattern.inhale);
    setRounds(0);
  };

  const handlePatternChange = (newPattern: string) => {
    setPattern(newPattern);
    setIsActive(false);
    setPhase('inhale');
    setCountdown(BOXING_BREATHING_PATTERNS[newPattern].inhale);
    setRounds(0);
  };

  // Calculate scale for animation
  const scale = phase === 'inhale' ? 1 : phase === 'exhale' ? 0.5 : phase === 'hold' ? 1 : 0.5;

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-[#1A1A1A] rounded-lg p-8 text-center">
          <h1 className="font-display text-4xl text-white mb-2">Boxing Breathwork</h1>
          <p className="font-body text-white/60 mb-8">
            Breathing exercises for fighters
          </p>

          {/* Pattern Selector */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {Object.keys(BOXING_BREATHING_PATTERNS).map((p) => (
              <button
                key={p}
                onClick={() => handlePatternChange(p)}
                className={`px-4 py-2 rounded-lg font-body text-sm transition-colors ${
                  pattern === p
                    ? 'bg-[#4A6FA5] text-white'
                    : 'bg-[#2A2A2A] text-white/60 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Rounds Counter */}
          <div className="mb-6">
            <p className="font-body text-white/60 text-sm">Rounds Completed</p>
            <p className="font-display text-3xl text-white">{rounds}</p>
          </div>

          {/* Animated breathing circle */}
          <div className="relative w-80 h-80 mx-auto mb-8">
            <div
              className="absolute inset-0 rounded-full transition-all duration-[3000ms] ease-in-out"
              style={{
                backgroundColor: PHASE_COLORS[phase],
                transform: `scale(${scale})`,
                boxShadow: `0 0 60px ${PHASE_COLORS[phase]}99`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="font-display text-7xl text-white mb-2 font-bold">
                  {countdown}
                </p>
                <p className="font-body text-xl text-white/90 uppercase tracking-wide">
                  {PHASE_LABELS[phase]}
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleStart}
              className="flex items-center gap-2 px-8 py-4 bg-[#4A6FA5] text-white rounded-lg font-body text-lg hover:bg-[#5A7FB5] transition-colors"
            >
              {isActive ? (
                <>
                  <Pause size={20} /> Pause
                </>
              ) : (
                <>
                  <Play size={20} /> Start
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              className="px-8 py-4 bg-[#2A2A2A] text-white rounded-lg font-body text-lg hover:bg-[#3A3A3A] transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Pattern Info */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="font-body text-white/60 text-sm mb-2">Pattern Timing</p>
            <div className="flex justify-center gap-4 text-sm">
              {currentPattern.inhale > 0 && (
                <span className="text-white/80">
                  Inhale: {currentPattern.inhale}s
                </span>
              )}
              {currentPattern.hold > 0 && (
                <span className="text-white/80">
                  Hold: {currentPattern.hold}s
                </span>
              )}
              {currentPattern.exhale > 0 && (
                <span className="text-white/80">
                  Exhale: {currentPattern.exhale}s
                </span>
              )}
              {currentPattern.rest > 0 && (
                <span className="text-white/80">
                  Rest: {currentPattern.rest}s
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
