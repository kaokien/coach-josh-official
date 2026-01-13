'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Trophy, Check, ArrowUpRight, Shield } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils'; // Assumes utility exists

// Reusing Button Logic locally to avoid circular deps if you haven't made a global button yet
const ProgramButton = ({ children, variant = 'primary', className, ...props }: any) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={cn(
      "group relative flex items-center justify-center gap-3 border-2 font-bold uppercase tracking-widest transition-all duration-300 px-8 py-5 text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed",
      variant === 'primary' && "bg-[#4A6FA5] border-[#1A1A1A] text-white hover:bg-[#4A6FA5]/90",
      variant === 'outline' && "bg-transparent border-[#1A1A1A] text-[#1A1A1A] hover:bg-white",
      "w-full", // Force full width for cards
      className
    )}
    {...props}
  >
    <span className="relative z-10 flex items-center gap-2">{children}</span>
  </motion.button>
);

const ProgramsSection = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (priceId: string, mode: 'payment' | 'subscription', path: string = '') => {
    setLoading(priceId);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, mode, successPath: path }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url; else setLoading(null);
    } catch (e) {
      console.error(e);
      setLoading(null);
    }
  };

  return (
    <section id="programs" className="relative px-6 py-32 md:px-12 bg-[#F2E8DC]">
      <div className="text-center mb-16">
        <h2 className="font-display text-5xl md:text-7xl uppercase text-[#1A1A1A]">
          Choose Your Path
        </h2>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Card 1: Striking Blueprint */}
        <motion.div whileHover={{ y: -10 }} className="relative flex flex-col justify-between border-4 border-[#1A1A1A] bg-white p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 border border-[#1A1A1A] bg-[#F2E8DC] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#1A1A1A]">
              <Target size={12} className="text-[#4A6FA5]" /> Digital Guide
            </div>
            <h2 className="font-display text-5xl md:text-6xl uppercase text-[#1A1A1A]">Striking Blueprint</h2>
            <p className="font-body mt-4 text-lg text-[#1A1A1A]/80">
              The complete technical breakdown. Generate power from the floor, fix your uppercut, and master distance.
            </p>
            <ul className="mt-8 space-y-4 font-body">
              {['Footwork Drills & Angles', 'Heavy Bag Workouts', 'Defensive Head Movement', 'Strength Program (4x/week)', 'Printable Workout Logs'].map(i => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold text-[#1A1A1A]">
                  <Check size={16} className="text-[#4A6FA5] stroke-[3px]" />{i}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-12 pt-8 border-t-2 border-[#1A1A1A]/10">
            <div className="mb-6 flex items-baseline gap-2">
                <span className="font-display text-6xl text-[#4A6FA5]">$49</span>
                <span className="font-body font-bold text-[#1A1A1A]/60">one-time</span>
            </div>
            <ProgramButton
              variant="outline"
              onClick={() => handleCheckout('price_1SmNmGGa2N5PNf9K1XyVzvEF', 'payment')}
              disabled={loading === 'price_1SmNmGGa2N5PNf9K1XyVzvEF'}
            >
              {loading === 'price_1SmNmGGa2N5PNf9K1XyVzvEF' ? 'Processing...' : 'Get Blueprint'} <ArrowUpRight size={18} />
            </ProgramButton>
          </div>
        </motion.div>

        {/* Card 2: Corner Man */}
        <motion.div whileHover={{ y: -10 }} className="relative flex flex-col justify-between border-4 border-[#1A1A1A] bg-[#4A6FA5] p-8 text-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <div className="absolute right-[-4px] top-[-24px] border-2 border-[#1A1A1A] bg-[#D1495B] px-4 py-2 font-display text-xl text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            MOST POPULAR
          </div>
          <div>
            <div className="mb-6 inline-flex items-center gap-2 border border-white bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
              <Trophy size={12} /> Elite Training
            </div>
            <h2 className="font-display text-5xl md:text-6xl uppercase text-white">Corner Man</h2>
            <p className="font-body mt-4 text-lg font-bold text-white/90">
              I'm in your corner. Upload your sparring or bag work, and I'll break down exactly what you're doing wrong.
            </p>
            <ul className="mt-8 space-y-4 font-body">
              {['Everything in Blueprint', 'Weekly Video Form Analysis', 'Live Fight IQ Breakdowns', 'Private Discord Community', 'Monthly Live Q&A Calls'].map(i => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold text-white">
                  <Check size={16} className="text-white stroke-[3px]" />{i}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-12 pt-8 border-t-2 border-white/20">
            <div className="mb-6 flex items-baseline gap-2">
                <span className="font-display text-6xl text-white">$29</span>
                <span className="font-body font-bold text-white/60">/month</span>
            </div>
            <Link href="/cornerman" className="block w-full">
              <ProgramButton variant="primary" className="bg-white text-[#4A6FA5] border-transparent hover:bg-[#F2E8DC]">
                Join Corner Man <Shield size={18} />
              </ProgramButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgramsSection;
