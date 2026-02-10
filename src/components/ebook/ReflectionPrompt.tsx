'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface ReflectionPromptProps {
  prompt: string;
  chapterId: string;
}

export default function ReflectionPrompt({ prompt, chapterId }: ReflectionPromptProps) {
  const [isOpen, setIsOpen] = useState(false);
  const storageKey = `reflection-${chapterId}`;

  return (
    <div className="my-8 no-print">
      <motion.div
        className="border-2 border-[#1A1A1A] bg-[#F2E8DC] overflow-hidden"
        style={{ boxShadow: isOpen ? '6px 6px 0px 0px #1A1A1A' : '4px 4px 0px 0px #1A1A1A' }}
        animate={{ y: isOpen ? -2 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Header - Always Visible */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 hover:bg-[#1A1A1A]/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="bg-[#4A6FA5] w-8 h-8 flex items-center justify-center">
              <MessageCircle size={16} className="text-white" />
            </div>
            <span className="font-display text-sm uppercase tracking-widest text-[#1A1A1A]">
              Reflect Before Moving On
            </span>
          </div>
          {isOpen ? (
            <ChevronUp size={20} className="text-[#1A1A1A]" />
          ) : (
            <ChevronDown size={20} className="text-[#1A1A1A]" />
          )}
        </button>

        {/* Content - Collapsible */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="px-4 pb-4 border-t-2 border-[#1A1A1A]/10 pt-4">
                <p className="font-body text-lg text-[#1A1A1A] italic leading-relaxed">
                  "{prompt}"
                </p>
                <p className="font-body text-xs text-[#1A1A1A]/50 mt-3 uppercase tracking-wide">
                  Take a moment. No rush.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// Prompts for each chapter - keys match sectionId in BoxingEbook.tsx
export const CHAPTER_PROMPTS: Record<string, string> = {
  'introduction': "What's the #1 thing you want to improve in your boxing over the next 4 weeks?",
  'injury-prevention': "Do you currently skip warm-ups? Be honest—how often?",
  'when-you-feel-lost': "When training gets hard, what's your first instinct—push through or step back?",
  'weekly-structure': "How many days per week can you realistically commit to training?",
  'warm-up-routine': "Record yourself shadowboxing for 30 seconds. Is your chin tucked? Hands up?",
  'conditioning': "How many rounds can you go at full intensity before gassing out?",
  'shadowboxing': "Pick ONE 3-punch combo. Can you throw it without thinking?",
  'heavy-bag-work': "Are you rotating your hips fully, or are you arm-punching?",
  'core-training': "When was the last time you trained core? Be specific.",
  'plyometrics': "What's your instinct when a punch is coming? Do you freeze, or do you slip?",
  'next-steps': "What's ONE bad habit you're going to eliminate this month?",
  'training-log': "Did you actually log your last session, or did you skip it?",
};

