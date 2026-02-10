'use client';

import React, { useState } from 'react';
import { Target, Trophy, Check, Shield, Crown, Video, ArrowUpRight, Zap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import WaitlistModal from '@/components/ui/waitlist-modal';

const BOOKING_LINK =
  'https://calendly.com/mais-joshua/training-session?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=ccff00';

const ProgramsSection = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <section id="programs" className="relative px-6 py-32 md:px-12 bg-[#F2E8DC]">
      <div className="text-center mb-16">
        <h2 className="font-display text-5xl md:text-7xl uppercase text-[#1A1A1A]">
          Choose Your Path
        </h2>
        <p className="font-body mt-4 text-lg text-[#1A1A1A]/60 max-w-2xl mx-auto">
          From self-study guides to elite 1-on-1 coaching — there&apos;s a program for every level.
        </p>
      </div>

      {/* ─── MAIN 3-COLUMN GRID ─── */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">

        {/* Card 1: Striking Blueprint — $49 */}
        <div
          className="relative flex flex-col justify-between border-4 border-[#1A1A1A] bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover-lift"
        >
          <div>
            <div className="mb-6 inline-flex items-center gap-2 border border-[#1A1A1A] bg-[#F2E8DC] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#1A1A1A]">
              <Target size={12} className="text-[#4A6FA5]" /> Digital Guide
            </div>
            <h3 className="font-display text-4xl md:text-5xl uppercase text-[#1A1A1A]">
              Striking Blueprint
            </h3>
            <p className="font-body mt-4 text-[#1A1A1A]/80">
              The complete technical breakdown. Generate power from the floor, fix your uppercut, and master distance.
            </p>
            <ul className="mt-8 space-y-3 font-body">
              {[
                'Footwork Drills & Angles',
                'Heavy Bag Workouts',
                'Defensive Head Movement',
                'Strength Program (4x/week)',
                'Printable Workout Logs',
              ].map((i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold text-[#1A1A1A]">
                  <Check size={16} className="text-[#4A6FA5] stroke-[3px] flex-shrink-0" />{i}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-12 pt-8 border-t-2 border-[#1A1A1A]/10">
            <div className="mb-6 flex items-baseline gap-2">
              <span className="font-display text-5xl text-[#4A6FA5]">$49</span>
              <span className="font-body font-bold text-[#1A1A1A]/60">one-time</span>
            </div>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setIsWaitlistOpen(true)}
            >
              Join Waitlist <Shield size={18} />
            </Button>
          </div>
        </div>

        {/* Card 2: Corner Man — $29.99/mo */}
        <div
          className="relative flex flex-col justify-between border-4 border-[#1A1A1A] bg-[#4A6FA5] p-8 text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover-lift"
        >
          <div className="absolute right-[-4px] top-[-24px] border-2 border-[#1A1A1A] bg-[#D1495B] px-4 py-2 font-display text-lg text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            MOST POPULAR
          </div>
          <div>
            <div className="mb-6 inline-flex items-center gap-2 border border-white bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
              <Trophy size={12} /> Community + Coaching
            </div>
            <h3 className="font-display text-4xl md:text-5xl uppercase text-white">Corner Man</h3>
            <p className="font-body mt-4 text-white/90">
              I&apos;m in your corner. Upload your sparring or bag work, and I&apos;ll break down exactly what you&apos;re doing wrong.
            </p>
            <ul className="mt-8 space-y-3 font-body">
              {[
                'Everything in Blueprint',
                'Weekly Video Form Analysis',
                'Live Fight IQ Breakdowns',
                'Private Discord Community',
                'Monthly Live Q&A Calls',
              ].map((i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold text-white">
                  <Check size={16} className="text-white stroke-[3px] flex-shrink-0" />{i}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-12 pt-8 border-t-2 border-white/20">
            <div className="mb-2 flex items-baseline gap-2">
              <span className="font-display text-5xl text-white">$29.99</span>
              <span className="font-body font-bold text-white/60">/month</span>
            </div>
            <p className="font-body text-xs text-white/50 mb-6">
              or $299.99/year (save ~17%)
            </p>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setIsWaitlistOpen(true)}
            >
              Join Waitlist <Shield size={18} />
            </Button>
          </div>
        </div>

        {/* Card 3: ELITE 1:1 Coaching — $497/mo */}
        <div
          className="relative flex flex-col justify-between border-4 border-[#1A1A1A] bg-[#1A1A1A] p-8 text-white shadow-[8px_8px_0px_0px_#4A6FA5] hover-lift"
        >
          <div className="absolute right-[-4px] top-[-24px] border-2 border-[#1A1A1A] bg-[#1A1A1A] px-4 py-2 font-display text-lg text-[#4A6FA5] shadow-[4px_4px_0px_0px_#4A6FA5]">
            <span className="flex items-center gap-2"><Crown size={16} /> PREMIUM</span>
          </div>
          <div>
            <div className="mb-6 inline-flex items-center gap-2 border border-white/30 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white/80">
              <Crown size={12} className="text-[#4A6FA5]" /> Elite 1:1
            </div>
            <h3 className="font-display text-4xl md:text-5xl uppercase text-white">
              Elite<br />Coaching
            </h3>
            <p className="font-body mt-4 text-white/80">
              Premium coaching with direct access to Josh. Custom programming, unlimited form checks, and everything in Corner Man.
            </p>
            <ul className="mt-8 space-y-3 font-body">
              {[
                'Everything in Corner Man',
                '2–4 Private Calls / Month',
                'Custom Training Program',
                'Unlimited Form Checks',
                'Direct Access to Josh',
              ].map((i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold text-white">
                  <Check size={16} className="text-[#4A6FA5] stroke-[3px] flex-shrink-0" />{i}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-12 pt-8 border-t-2 border-white/10">
            <div className="mb-6 flex items-baseline gap-2">
              <span className="font-display text-5xl text-[#4A6FA5]">$497</span>
              <span className="font-body font-bold text-white/50">/month</span>
            </div>
            <a
              href={BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex w-full items-center justify-center gap-3 border-2 border-[#4A6FA5] bg-[#4A6FA5] px-8 py-4 font-display text-lg font-bold uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]"
            >
              Apply Now <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* ─── 1:1 PRIVATE SESSION CTA ─── */}
      <div
        className="mx-auto mt-16 max-w-3xl animate-fade-in-up"
      >
        <div className="relative border-4 border-[#1A1A1A] bg-white p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center gap-8">
          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center border-2 border-[#1A1A1A] bg-[#F2E8DC]">
            <Video size={36} className="text-[#4A6FA5]" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-display text-2xl md:text-3xl uppercase text-[#1A1A1A]">
              1:1 Private Session
            </h3>
            <p className="font-body mt-2 text-[#1A1A1A]/70">
              Not ready for a monthly commitment? Book a single 45-minute online private with Coach Josh.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 flex-shrink-0">
            <div className="flex items-baseline gap-1">
              <span className="font-display text-4xl text-[#1A1A1A]">$100</span>
              <span className="font-body text-sm font-bold text-[#1A1A1A]/50">/session</span>
            </div>
            <a
              href={BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border-2 border-[#1A1A1A] bg-[#1A1A1A] px-6 py-3 font-display text-sm font-bold uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_#4A6FA5] transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#4A6FA5]"
            >
              Book Now <Zap size={16} />
            </a>
          </div>
        </div>
      </div>

      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />
    </section>
  );
};

export default ProgramsSection;
