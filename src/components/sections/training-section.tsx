'use client';

import React from 'react';
import { Check, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assumes utility exists

interface TrainingSectionProps {
  onOpenBooking: () => void;
}

const TrainingSection = ({ onOpenBooking }: TrainingSectionProps) => {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const daysLeft = daysInMonth - today.getDate();
  // Simple logic to show "scarcity" based on days left in month
  const spotsLeft = Math.max(1, Math.floor((daysLeft / daysInMonth) * 8));

  return (
    <section id="training" className="border-t-2 border-[#1A1A1A] bg-white px-6 py-32 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 lg:flex-row">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 font-display text-[#D1495B] font-bold uppercase tracking-widest text-sm">
                <div className="h-3 w-3 rounded-full bg-[#D1495B] animate-pulse"></div>
                Only {spotsLeft} Spots Left This Month
            </div>
            <h2 className="font-display text-6xl md:text-7xl uppercase text-[#1A1A1A] leading-none">
              Train <br/> In Person
            </h2>
            <p className="font-body mt-6 text-xl text-[#1A1A1A]/80">
              Based in New Haven, CT? Book a 1-on-1 private session. Mitts, sparring strategy, and film study. Real coaching, real results.
            </p>
            <ul className="mt-8 space-y-3 font-body">
              {['Pad work & technique refinement', 'Sparring strategy session', 'Film breakdown of your fights', 'Custom training plan'].map(i => (
                <li key={i} className="flex items-center gap-3 text-[#1A1A1A]/80">
                  <Check size={16} className="text-[#4A6FA5]" />{i}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative group">
            <div className="absolute top-2 left-2 h-full w-full rounded-lg bg-[#1A1A1A]"></div>
            <button 
              onClick={onOpenBooking}
              className="relative flex items-center gap-4 border-2 border-[#1A1A1A] bg-[#F2E8DC] px-12 py-8 transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:bg-white"
            >
              <div className="text-left">
                <div className="font-display text-3xl text-[#1A1A1A] uppercase">Book Session</div>
                <div className="font-body text-sm font-bold text-[#4A6FA5]">$150 / Hour</div>
              </div>
              <ArrowUpRight size={32} className="text-[#1A1A1A]" />
            </button>
          </div>
       </div>
    </section>
  );
};

export default TrainingSection;
