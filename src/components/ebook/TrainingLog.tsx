'use client';

import React, { useState } from 'react';
import { ClipboardList, Printer, Check, Copy, Zap, Timer, Target, Dumbbell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const rawColors = {
  cream: '#FFFFFF',
  red: '#DC2626',
  ink: '#0F172A',
  vanta: '#050505',
  blue: '#2563EB',
  neon: '#CCFF00',
};

const WORKOUT_TEMPLATE = `🥊 BOXING BLUEPRINT: DAILY TRAINING LOG
------------------------------------------
Date: ______________
Week: [ ] 1  [ ] 2  [ ] 3  [ ] 4

[ ] WARM-UP (10 MINS)
    - Lateral Movement
    - Joint Mobility
    - Heart Rate Elevation

[ ] SHADOWBOXING (3 ROUNDS)
    - Rd 1: Movement Only
    - Rd 2: Straight Punches
    - Rd 3: Full Integration

[ ] HEAVY BAG WORK (6 ROUNDS)
    - Rd 1-2: The Jab (Foundation)
    - Rd 3-4: Jab-Cross (1-2)
    - Rd 5-6: Full Combinations

[ ] CONDITIONING (15 MINS)
    - Jump Rope (3 mins)
    - Agility Drills (5 mins)
    - Bodyweight Circuit (7 mins)

[ ] CORE TRAINING (3.5 MINS)
    - Flutter Kicks
    - Scissor Kicks
    - Feet Circles
    - Russian Twists

NOTES / PROGRESS:
__________________________________________
`;

interface RoundCardProps {
  number: string | number;
  title: string;
  focus: string;
  duration?: string;
  accent?: 'red' | 'ink' | 'blue';
}

const RoundCard = ({ number, title, focus, duration, accent = 'ink' }: RoundCardProps) => (
  <div
    className="bg-white border-2 border-[#0F172A] mb-3 flex items-stretch transition-transform hover:-translate-y-1"
    style={{ boxShadow: '4px 4px 0px 0px #0F172A' }}
  >
    <div
      className="w-12 flex items-center justify-center font-display text-lg shrink-0"
      style={{
        background: accent === 'red' ? rawColors.red : accent === 'blue' ? rawColors.blue : rawColors.ink,
        color: '#fff'
      }}
    >
      {number}
    </div>
    <div className="p-3 flex-1">
      <div className="flex justify-between items-start mb-1">
        <h4 className="font-display text-xs md:text-sm uppercase tracking-tight text-[#0F172A]">{title}</h4>
        {duration && <span className="text-[10px] bg-[#FFFFFF] px-1 font-mono">{duration}</span>}
      </div>
      <p className="text-[10px] md:text-xs text-[#0F172A]/60 font-body leading-tight">
        {focus}
      </p>
    </div>
  </div>
);

export default function TrainingLog() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(WORKOUT_TEMPLATE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="my-16 no-print">
      <div
        className="bg-[#FFFFFF] border-4 border-[#0F172A] overflow-hidden"
        style={{ boxShadow: '16px 16px 0px 0px rgba(0,0,0,1)' }}
      >
        {/* TOP STATUS BAR */}
        <div className="bg-[#0F172A] p-4 flex flex-wrap items-center justify-between gap-4 border-b-4 border-[#0F172A]">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Timer size={20} className="text-[#DC2626]" />
              <div className="text-white">
                <p className="text-[10px] uppercase tracking-widest opacity-50 font-display leading-none mb-1">Total Time</p>
                <p className="font-display text-lg leading-none">1H 15M</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={20} className="text-[#CCFF00]" />
              <div className="text-white">
                <p className="text-[10px] uppercase tracking-widest opacity-50 font-display leading-none mb-1">Intensity</p>
                <p className="font-display text-lg leading-none">HIGH</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-6 py-2 bg-[#DC2626] text-white font-display text-xs uppercase tracking-widest border-2 border-white transition-all hover:bg-[#CCFF00] hover:text-[#0F172A] active:translate-y-1"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'COPIED TO CLIPBOARD' : 'COPY TO NOTES'}
            </button>
            <button
              onClick={() => window.print()}
              className="hidden md:flex items-center gap-2 px-6 py-2 bg-white text-[#0F172A] font-display text-xs uppercase tracking-widest border-2 border-[#0F172A] transition-all hover:bg-[#FFFFFF] active:translate-y-1"
            >
              <Printer size={14} />
              PRINT WORKSHEET
            </button>
          </div>
        </div>

        {/* WORKOUT DASHBOARD GRID */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* COLUMN 1: SHADOWBOXING */}
            <div>
              <div className="flex items-center gap-2 mb-6 border-b-2 border-[#0F172A] pb-2">
                <Target size={18} className="text-[#DC2626]" />
                <h3 className="font-display text-xl uppercase tracking-tighter">Shadowboxing</h3>
              </div>
              <RoundCard number="1" title="Movement & Flow" duration="3:00" focus="Focus on footwork, chin tucked, hands up. Non-stop movement." accent="red" />
              <RoundCard number="2" title="The Foundation" duration="3:00" focus="Jabs and 1-2s. Tight technique. Snap your punches back." accent="red" />
              <RoundCard number="3" title="Full Integration" duration="3:00" focus="Add hooks, uppercuts, slips and rolls. Maintain high intensity." accent="red" />
            </div>

            {/* COLUMN 2: HEAVY BAG */}
            <div>
              <div className="flex items-center gap-2 mb-6 border-b-2 border-[#0F172A] pb-2">
                <Dumbbell size={18} className="text-[#0F172A]" />
                <h3 className="font-display text-xl uppercase tracking-tighter">Heavy Bag</h3>
              </div>
              <div className="grid grid-cols-1 gap-1">
                <RoundCard number="1-2" title="The Jab System" duration="6:00" focus="Double jabs, step jabs, body jabs. Establish the range." />
                <RoundCard number="3-4" title="Power Combinations" duration="6:00" focus="The 1-2-3. Sit on your punches. Rotate hips fully." />
                <RoundCard number="5-6" title="The Deep Waters" duration="6:00" focus="Volume and Pressure. Non-stop output for final rounds." />
              </div>
            </div>

            {/* COLUMN 3: CONDITIONING */}
            <div className="bg-[#0F172A] p-5 text-white flex flex-col justify-between" style={{ boxShadow: '8px 8px 0px 0px #DC2626' }}>
              <div>
                <h3 className="font-display text-2xl uppercase tracking-tighter mb-4 text-[#CCFF00]">Conditioning</h3>
                <ul className="font-body text-xs space-y-4">
                  <li className="flex gap-3">
                    <span className="text-[#DC2626] font-display">01</span>
                    <span><strong>JUMP ROPE (10 MINS)</strong><br /><span className="opacity-60 italic">Consistent rhythm. Double unders for advanced.</span></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#DC2626] font-display">02</span>
                    <span><strong>METABOLIC CIRCUIT</strong><br /><span className="opacity-60 italic">Burpees, Squat Jumps, Mountain Climbers. 3 Sets.</span></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#DC2626] font-display">03</span>
                    <span><strong>CORE STABILITY</strong><br /><span className="opacity-60 italic">Complete the full 3.5 min Core Routine from Ch 9.</span></span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-white/20 text-center">
                <p className="font-display text-xs tracking-widest text-[#DC2626]">STAY PATIENT. STAY DISCIPLINED.</p>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM DECORATION */}
        <div className="h-2 bg-[#CCFF00]" />
      </div>

      {/* PRINT-ONLY VERSION (Styled for A4 paper) */}
      <div className="hidden print:block fixed inset-0 bg-white z-[9999] p-10 font-mono text-black">
        <div className="border-4 border-black p-8">
          <div className="flex justify-between items-end border-b-4 border-black pb-4 mb-8">
            <h1 className="text-4xl font-black uppercase">Training Log</h1>
            <div className="text-right">
              <p>DATE: ________________</p>
              <p>WEEK: [ ] 1  [ ] 2  [ ] 3  [ ] 4</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold bg-black text-white px-2 py-1 mb-4">BOXING DRILLES</h3>
              <div className="space-y-4">
                <div className="border-b-2 border-black pb-2">[ ] RD 1-3 SHADOWBOX (Theme: ________________)</div>
                <div className="border-b-2 border-black pb-2">[ ] RD 1-2 BAG (Jab Focus)</div>
                <div className="border-b-2 border-black pb-2">[ ] RD 3-4 BAG (Power Combos)</div>
                <div className="border-b-2 border-black pb-2">[ ] RD 5-6 BAG (Pressure)</div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold bg-black text-white px-2 py-1 mb-4">CONDITIONING</h3>
              <div className="space-y-4">
                <div className="border-b-2 border-black pb-2">[ ] JUMP ROPE (10 MINS)</div>
                <div className="border-b-2 border-black pb-2">[ ] CIRCUIT (3 SETS)</div>
                <div className="border-b-2 border-black pb-2">[ ] CORE (FULL ROUTINE)</div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-bold bg-black text-white px-2 py-1 mb-4">NOTES / PROGRESS</h3>
            <div className="h-32 border-2 border-black" />
          </div>

          <p className="mt-10 text-center text-xs italic">BOXING BLUEPRINT BY COACH JOSH OFFICALLY. PRINTED FROM COACHJOSHOFFICIAL.COM</p>
        </div>
      </div>
    </div>
  );
}
