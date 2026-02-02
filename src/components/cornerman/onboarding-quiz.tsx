'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Dumbbell, Brain, Trophy, ChevronRight, Check } from 'lucide-react';
import { triggerHaptic } from '@/lib/haptics';

interface OnboardingQuizProps {
  userName?: string | null;
  onComplete: (goal: string) => void;
}

const GOALS = [
  {
    id: 'technique',
    title: 'Master Technique',
    description: 'Focus on proper form, combinations, and fight IQ',
    icon: Target,
    recommendation: 'We\'ll prioritize video lessons and technique breakdowns.',
  },
  {
    id: 'conditioning',
    title: 'Get Fight Fit',
    description: 'Build endurance, power, and combat cardio',
    icon: Dumbbell,
    recommendation: 'Audio workouts and training plans are your best friends.',
  },
  {
    id: 'mental',
    title: 'Mental Edge',
    description: 'Develop focus, calm nerves, and pre-fight mindset',
    icon: Brain,
    recommendation: 'Breathwork and AI Coach will be your go-to tools.',
  },
  {
    id: 'compete',
    title: 'Competition Prep',
    description: 'Train like a pro fighter preparing for a bout',
    icon: Trophy,
    recommendation: 'Full structured training plans with all modules combined.',
  },
];

export default function OnboardingQuiz({ userName, onComplete }: OnboardingQuizProps) {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const handleContinue = () => {
    if (selectedGoal) {
      // Save goal to localStorage
      localStorage.setItem('userGoal', selectedGoal);
      localStorage.setItem('onboardingComplete', 'true');

      // Unified haptic feedback
      triggerHaptic('medium');

      onComplete(selectedGoal);
    }
  };

  const selectedGoalData = GOALS.find(g => g.id === selectedGoal);

  return (
    <div className="min-h-screen bg-[#F2E8DC] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full"
      >
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#4A6FA5] rounded-full flex items-center justify-center">
                  <span className="text-3xl">🥊</span>
                </div>
                <h1 className="font-display text-3xl md:text-4xl uppercase text-[#1A1A1A] mb-2">
                  Welcome{userName ? `, ${userName}` : ''}!
                </h1>
                <p className="font-body text-[#1A1A1A]/60">
                  Let&apos;s personalize your training experience.
                </p>
              </div>

              {/* Goals */}
              <div className="space-y-3 mb-8">
                <p className="font-display text-sm uppercase text-[#1A1A1A]/50 tracking-widest">
                  What&apos;s your main goal?
                </p>
                {GOALS.map((goal) => {
                  const Icon = goal.icon;
                  const isSelected = selectedGoal === goal.id;
                  return (
                    <button
                      key={goal.id}
                      onClick={() => setSelectedGoal(goal.id)}
                      className={`w-full text-left p-4 border-2 transition-all flex items-center gap-4 ${isSelected
                        ? 'border-[#4A6FA5] bg-[#4A6FA5]/10 shadow-[4px_4px_0px_0px_rgba(74,111,165,1)]'
                        : 'border-[#1A1A1A]/20 bg-white hover:border-[#1A1A1A]/40'
                        }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-[#4A6FA5] text-white' : 'bg-[#1A1A1A]/10 text-[#1A1A1A]'
                        }`}>
                        <Icon size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-lg uppercase text-[#1A1A1A]">
                          {goal.title}
                        </h3>
                        <p className="font-body text-sm text-[#1A1A1A]/60">
                          {goal.description}
                        </p>
                      </div>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 rounded-full bg-[#4A6FA5] text-white flex items-center justify-center"
                        >
                          <Check size={14} />
                        </motion.div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Continue Button */}
              <button
                onClick={() => selectedGoal && setStep(2)}
                disabled={!selectedGoal}
                className={`w-full font-display text-xl uppercase py-4 border-2 border-[#1A1A1A] transition-all flex items-center justify-center gap-2 ${selectedGoal
                  ? 'bg-[#1A1A1A] text-white hover:bg-[#4A6FA5] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]'
                  : 'bg-[#1A1A1A]/10 text-[#1A1A1A]/40 cursor-not-allowed'
                  }`}
              >
                Continue
                <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {step === 2 && selectedGoalData && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#4A6FA5] to-[#7FB069] rounded-full flex items-center justify-center"
              >
                <selectedGoalData.icon size={40} className="text-white" />
              </motion.div>

              <h2 className="font-display text-3xl uppercase text-[#1A1A1A] mb-2">
                Perfect!
              </h2>
              <p className="font-body text-lg text-[#1A1A1A]/80 mb-4">
                Your goal: <span className="font-bold">{selectedGoalData.title}</span>
              </p>
              <p className="font-body text-[#1A1A1A]/60 mb-8 max-w-md mx-auto">
                {selectedGoalData.recommendation}
              </p>

              <div className="bg-[#1A1A1A] text-white p-6 border-2 border-[#1A1A1A] mb-6">
                <p className="font-display uppercase text-sm text-white/60 mb-2">Your Personalized Plan</p>
                <p className="font-display text-2xl uppercase">4-Week {selectedGoalData.title} Program</p>
              </div>

              <button
                onClick={handleContinue}
                className="w-full bg-[#4A6FA5] text-white font-display text-xl uppercase py-4 border-2 border-[#1A1A1A] hover:bg-[#3A5F95] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                Start Training
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
