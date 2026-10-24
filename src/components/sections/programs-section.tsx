'use client';

import React, { useState } from 'react';
import { Target, Trophy, Check, Shield, Crown, Video, ArrowUpRight, Zap, Loader2, BookOpen, Flame, Users } from 'lucide-react';
import { useClerk, useAuth, useUser } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';

const BOOKING_LINK =
  'https://calendly.com/coachjoshofficial-playersclubllc';

const ProgramsSection = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const hasAccess = !!(user?.publicMetadata?.hasBlueprintAccess);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const handleBlueprintCheckout = async () => {
    if (!isSignedIn) {
      openSignIn({ forceRedirectUrl: '/checkout/blueprint' });
      return;
    }
    
    setIsCheckoutLoading(true);
    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        }
      } else {
        console.error("Checkout route failed");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  return (
    <section id="programs" className="relative px-6 py-28 md:px-12 bg-[#FFFFFF]">
      {/* ─── SECTION HEADER ─── */}
      <div className="text-center mb-16">
        <div className="mb-4 inline-flex items-center gap-2 border border-[#0F172A] bg-[#FFFFFF] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#0F172A] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <Crown size={14} className="text-[#2563EB]" /> 1-on-1 Online Coaching
        </div>
        <h2 className="font-display text-5xl md:text-7xl uppercase text-[#0F172A]">
          Coaching Tiers
        </h2>
        <p className="font-body mt-4 text-lg text-[#0F172A]/70 max-w-2xl mx-auto">
          Personalized guidance directly from Coach Josh. Pick the tier that matches your current training pace and goals.
        </p>
      </div>

      {/* ─── 3 COACHING TIERS GRID ─── */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">

        {/* Tier 1: Tune Up - $150/mo */}
        <div className="group relative flex flex-col justify-between border-4 border-[#0F172A] bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover-lift">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 border border-[#0F172A] bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#0F172A]">
              <Target size={12} className="text-[#2563EB]" /> Beginner Tier
            </div>
            <h3 className="font-display text-4xl md:text-5xl uppercase text-[#0F172A]">
              Tune Up
            </h3>
            <p className="font-body mt-4 text-[#0F172A]/80 leading-relaxed text-sm">
              Monthly coaching for athletes who want expert direction without full-time coaching. Includes one monthly call, training guidance, and messaging support.
            </p>
            <ul className="mt-8 space-y-3 font-body">
              {[
                '1 Coaching Call / Month',
                'Custom Training Guidance & Direction',
                'Direct Messaging Support',
                'Form & Technique Assessment',
                'Fight IQ & Strategy Check-Ins',
              ].map((i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold text-[#0F172A]">
                  <Check size={16} className="text-[#2563EB] stroke-[3px] flex-shrink-0" />{i}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-10 pt-6 border-t-2 border-[#0F172A]/10">
            <div className="mb-6 flex items-baseline gap-2">
              <span className="font-display text-5xl text-[#2563EB]">$150</span>
              <span className="font-body font-bold text-[#0F172A]/60">/month</span>
            </div>
            <a
              href="https://buy.stripe.com/eVq28q51463A6VY0dbfw401"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex w-full items-center justify-center gap-3 border-2 border-[#0F172A] bg-[#0F172A] px-6 py-4 font-display text-base font-bold uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-[#2563EB] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              Get Started <ArrowUpRight size={18} />
            </a>
          </div>
        </div>

        {/* Tier 2: Online Development - $300/mo (Featured) */}
        <div className="relative flex flex-col justify-between border-4 border-[#0F172A] bg-[#2563EB] p-8 text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover-lift">
          <div className="absolute right-[-4px] top-[-24px] border-2 border-[#0F172A] bg-[#DC2626] px-4 py-2 font-display text-lg text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            MOST POPULAR
          </div>
          <div>
            <div className="mb-6 inline-flex items-center gap-2 border border-white bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
              <Trophy size={12} /> Middle Tier
            </div>
            <h3 className="font-display text-4xl md:text-5xl uppercase text-white">
              Online Development
            </h3>
            <p className="font-body mt-4 text-white/90 leading-relaxed text-sm">
              Personalized coaching for athletes ready to train consistently and make real progress. Includes 2 coaching calls per month, custom training plan, weekly accountability, video and technique review, and direct messaging support.
            </p>
            <ul className="mt-8 space-y-3 font-body">
              {[
                '2 Coaching Calls / Month',
                'Fully Custom Training Plan',
                'Weekly Accountability & Check-Ins',
                'Video & Technique Review',
                'Direct Messaging Support',
                'Habit & Routine Tracking',
              ].map((i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold text-white">
                  <Check size={16} className="text-white stroke-[3px] flex-shrink-0" />{i}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-10 pt-6 border-t-2 border-white/20">
            <div className="mb-6 flex items-baseline gap-2">
              <span className="font-display text-5xl text-white">$300</span>
              <span className="font-body font-bold text-white/70">/month</span>
            </div>
            <a
              href="https://buy.stripe.com/8x2aEWdxAcrYa8a9NLfw402"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex w-full items-center justify-center gap-3 border-2 border-white bg-white px-6 py-4 font-display text-base font-bold uppercase tracking-widest text-[#2563EB] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] transition-all hover:bg-[#0F172A] hover:text-white hover:border-[#0F172A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]"
            >
              Get Started <ArrowUpRight size={18} />
            </a>
          </div>
        </div>

        {/* Tier 3: Top Tier - $500/mo */}
        <div className="relative flex flex-col justify-between border-4 border-[#0F172A] bg-[#0F172A] p-8 text-white shadow-[8px_8px_0px_0px_#2563EB] hover-lift">
          <div className="absolute right-[-4px] top-[-24px] border-2 border-[#0F172A] bg-[#0F172A] px-4 py-2 font-display text-lg text-[#2563EB] shadow-[4px_4px_0px_0px_#2563EB]">
            <span className="flex items-center gap-2"><Crown size={16} /> HIGH-TOUCH</span>
          </div>
          <div>
            <div className="mb-6 inline-flex items-center gap-2 border border-white/30 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white/80">
              <Crown size={12} className="text-[#2563EB]" /> Top Tier
            </div>
            <h3 className="font-display text-4xl md:text-5xl uppercase text-white">
              Elite 1:1 Tier
            </h3>
            <p className="font-body mt-4 text-white/80 leading-relaxed text-sm">
              High-touch one-on-one coaching for athletes who want maximum support and accountability. Includes weekly coaching calls, fully customized training, frequent video and technique breakdowns, weekly progress tracking, and priority messaging support.
            </p>
            <ul className="mt-8 space-y-3 font-body">
              {[
                'Weekly Coaching Calls (4 Calls / Mo)',
                'Fully Customized Training & Camp',
                'Frequent Video & Technique Breakdowns',
                'Weekly Progress Tracking & Metrics',
                'Priority Messaging Support',
                'Full Access to Boxing Blueprints',
              ].map((i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold text-white">
                  <Check size={16} className="text-[#2563EB] stroke-[3px] flex-shrink-0" />{i}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-10 pt-6 border-t-2 border-white/10">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#CCFF00] animate-pulse" />
              <span className="font-body text-xs font-bold uppercase tracking-widest text-[#CCFF00]">Limited Availability</span>
            </div>
            <div className="mb-6 flex items-baseline gap-2">
              <span className="font-display text-5xl text-[#2563EB]">$500</span>
              <span className="font-body font-bold text-white/50">/month</span>
            </div>
            <a
              href="https://buy.stripe.com/9B614malo4Zw4NQgc9fw403"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex w-full items-center justify-center gap-3 border-2 border-[#2563EB] bg-[#2563EB] px-6 py-4 font-display text-base font-bold uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] transition-all hover:bg-white hover:text-[#0F172A] hover:border-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]"
            >
              Join Top Tier <ArrowUpRight size={18} />
            </a>
          </div>
        </div>

      </div>

      {/* ─── SELF-PACED DIGITAL BLUEPRINTS SECTION ─── */}
      <div className="mt-28 pt-20 border-t-4 border-[#0F172A]">
        <div className="text-center mb-14">
          <div className="mb-4 inline-flex items-center gap-2 border border-[#0F172A] bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#0F172A] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <BookOpen size={14} className="text-[#2563EB]" /> Self-Paced Training
          </div>
          <h3 className="font-display text-4xl md:text-6xl uppercase text-[#0F172A]">
            Digital Blueprints
          </h3>
          <p className="font-body mt-3 text-base md:text-lg text-[#0F172A]/70 max-w-xl mx-auto">
            Train on your own schedule with lifetime access to Coach Josh&apos;s proven fundamentals curriculums and follow-along routines.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">

          {/* Blueprint 1: Striking Blueprint - $49 */}
          <div className="group relative flex flex-col justify-between border-4 border-[#0F172A] bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover-lift">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 border border-[#0F172A] bg-[#FFFFFF] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#0F172A]">
                <Target size={12} className="text-[#2563EB]" /> Digital Guide
              </div>
              <h4 className="font-display text-3xl md:text-4xl uppercase text-[#0F172A]">
                Striking Blueprint
              </h4>
              <p className="font-body mt-4 text-[#0F172A]/80 leading-relaxed text-sm">
                The complete technical manual. Generate power from the floor, fix your uppercut, and master distance and angles.
              </p>
              <ul className="mt-6 space-y-2.5 font-body">
                {[
                  'Footwork Drills & Angles',
                  'Heavy Bag Workouts',
                  'Defensive Head Movement',
                  'Strength Program (4x/week)',
                  'Printable Workout Logs',
                ].map((i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-[#0F172A]">
                    <Check size={16} className="text-[#2563EB] stroke-[3px] flex-shrink-0" />{i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 pt-6 border-t-2 border-[#0F172A]/10">
              <div className="mb-5 flex items-baseline gap-2">
                <span className="font-display text-4xl text-[#2563EB]">$49</span>
                <span className="font-body font-bold text-[#0F172A]/60">one-time</span>
              </div>
              {hasAccess ? (
                <a
                  href="/blueprint"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#0F172A] text-white font-display text-sm uppercase tracking-widest px-6 py-3.5 border-2 border-[#0F172A] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  Read Now <BookOpen size={18} className="ml-2" />
                </a>
              ) : (
                <Button
                  variant="default"
                  className="w-full bg-[#0F172A] text-white hover:bg-[#2563EB] hover:text-white py-6 font-display text-base uppercase tracking-wider"
                  onClick={handleBlueprintCheckout}
                  disabled={isCheckoutLoading}
                >
                  {isCheckoutLoading ? (
                    <>Processing... <Loader2 size={18} className="ml-2 animate-spin" /></>
                  ) : (
                    <>Get Instant Access <Shield size={18} className="ml-2" /></>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Blueprint 2: Boxing Blueprint Video Course - $97 (was $197) */}
          <div className="relative flex flex-col justify-between border-4 border-[#0F172A] bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover-lift">
            <div className="absolute right-[-4px] top-[-20px] border-2 border-[#0F172A] bg-[#DC2626] px-3 py-1 font-display text-sm text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              SALE · 50% OFF
            </div>
            <div>
              <div className="mb-6 inline-flex items-center gap-2 border border-[#0F172A] bg-[#2563EB] px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
                <Video size={12} /> Video Course
              </div>
              <h4 className="font-display text-3xl md:text-4xl uppercase text-[#0F172A]">
                Boxing Blueprint
              </h4>
              <p className="font-body mt-4 text-[#0F172A]/80 leading-relaxed text-sm">
                The complete fundamentals course. 4 deep-dive modules covering striking mechanics, conditioning circuits, defense, and footwork progressions.
              </p>
              <ul className="mt-6 space-y-2.5 font-body">
                {[
                  'Everything in Striking Blueprint',
                  '4 Deep-Dive Video Modules',
                  'Bag Work & Solo Mitt Drills',
                  'Elite Conditioning Circuits',
                  'Lifetime Streaming Access',
                ].map((i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-[#0F172A]">
                    <Check size={16} className="text-[#2563EB] stroke-[3px] flex-shrink-0" />{i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 pt-6 border-t-2 border-[#0F172A]/10">
              <div className="mb-5 flex items-baseline gap-2">
                <span className="font-display text-2xl text-[#0F172A]/40 line-through decoration-[#DC2626] decoration-2">$197</span>
                <span className="font-display text-4xl text-[#2563EB]">$97</span>
                <span className="font-body font-bold text-[#0F172A]/60">one-time</span>
              </div>
              <a
                href="https://coachjosh1.gumroad.com/l/opdee"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex w-full items-center justify-center gap-2 border-2 border-[#0F172A] bg-[#2563EB] px-6 py-3.5 font-display text-base font-bold uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-[#0F172A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Get The Course <ArrowUpRight size={18} />
              </a>
            </div>
          </div>

          {/* Blueprint 3: Partner Drills - $30 */}
          <div className="relative flex flex-col justify-between border-4 border-[#0F172A] bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover-lift">
            <div className="absolute right-[-4px] top-[-20px] border-2 border-[#0F172A] bg-[#CCFF00] px-3 py-1 font-display text-sm font-bold text-[#0F172A] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              NEW
            </div>
            <div>
              <div className="mb-6 inline-flex items-center gap-2 border border-[#0F172A] bg-[#FFFFFF] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#0F172A]">
                <Users size={12} className="text-[#2563EB]" /> 2-Person Follow-Along
              </div>
              <h4 className="font-display text-3xl md:text-4xl uppercase text-[#0F172A]">
                Partner Drills
              </h4>
              <div className="font-body text-xs font-bold uppercase tracking-wider text-[#2563EB] mt-1">
                Train Together, Fight Smarter · ~20 Min
              </div>
              <p className="font-body mt-4 text-[#0F172A]/80 leading-relaxed text-sm">
                Hitting a bag teaches you to punch. A partner teaches you to box. Controlled 2-person slip-and-counter drills, partner mobility, and combo rhythm.
              </p>
              <ul className="mt-6 space-y-2.5 font-body">
                {[
                  '2-Person Interactive Drills',
                  'Slip & Counter Reaction Work',
                  'Partner Mobility & Guard Flow',
                  'Combo Timing & Rhythm',
                  'Lifetime Streaming Access',
                ].map((i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-[#0F172A]">
                    <Check size={16} className="text-[#2563EB] stroke-[3px] flex-shrink-0" />{i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 pt-6 border-t-2 border-[#0F172A]/10">
              <div className="mb-5 flex items-baseline gap-2">
                <span className="font-display text-4xl text-[#2563EB]">$30</span>
                <span className="font-body font-bold text-[#0F172A]/60">lifetime access</span>
              </div>
              <a
                href="https://coachjosh1.gumroad.com/l/cayuxl"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex w-full items-center justify-center gap-2 border-2 border-[#0F172A] bg-[#0F172A] px-6 py-3.5 font-display text-base font-bold uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-[#2563EB] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Grab Partner Drills <ArrowUpRight size={18} />
              </a>
            </div>
          </div>

          {/* Blueprint 4: Home Shadow Boxing Routine - $30 */}
          <div className="relative flex flex-col justify-between border-4 border-[#0F172A] bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover-lift">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 border border-[#0F172A] bg-[#FFFFFF] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#0F172A]">
                <Flame size={12} className="text-[#2563EB]" /> Solo Follow-Along
              </div>
              <h4 className="font-display text-3xl md:text-4xl uppercase text-[#0F172A]">
                Home Shadow Boxing
              </h4>
              <div className="font-body text-xs font-bold uppercase tracking-wider text-[#2563EB] mt-1">
                Solo Workout · 22 Min (1080p)
              </div>
              <p className="font-body mt-4 text-[#0F172A]/80 leading-relaxed text-sm">
                Develop sharp, fluid boxing movement from your living room. Full follow-along class covering stance, punch mechanics, footwork, and flow with no gear needed.
              </p>
              <ul className="mt-6 space-y-2.5 font-body">
                {[
                  '22-Minute Follow-Along Class',
                  'Zero Gear or Equipment Needed',
                  'Stance & Punch Mechanics',
                  'Footwork, Rhythm & Flow',
                  'Lifetime Streaming Access',
                ].map((i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-[#0F172A]">
                    <Check size={16} className="text-[#2563EB] stroke-[3px] flex-shrink-0" />{i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 pt-6 border-t-2 border-[#0F172A]/10">
              <div className="mb-5 flex items-baseline gap-2">
                <span className="font-display text-4xl text-[#2563EB]">$30</span>
                <span className="font-body font-bold text-[#0F172A]/60">lifetime access</span>
              </div>
              <a
                href="https://coachjosh1.gumroad.com/l/ujrfqt"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex w-full items-center justify-center gap-2 border-2 border-[#0F172A] bg-[#0F172A] px-6 py-3.5 font-display text-base font-bold uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-[#2563EB] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Train At Home <ArrowUpRight size={18} />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ─── 1:1 PRIVATE SESSION CTA ─── */}
      <div className="mx-auto mt-16 max-w-3xl">
        <div className="relative border-4 border-[#0F172A] bg-white p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center gap-8">
          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center border-2 border-[#0F172A] bg-[#FFFFFF]">
            <Video size={36} className="text-[#2563EB]" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-display text-2xl md:text-3xl uppercase text-[#0F172A]">
              1:1 Private Session
            </h3>
            <p className="font-body mt-2 text-[#0F172A]/70 text-sm leading-relaxed">
              Not ready for a monthly commitment? Book a single 45-minute live online private session with Coach Josh.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 flex-shrink-0">
            <div className="flex items-baseline gap-1">
              <span className="font-display text-4xl text-[#0F172A]">$100</span>
              <span className="font-body text-sm font-bold text-[#0F172A]/50">/session</span>
            </div>
            <a
              href={BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border-2 border-[#0F172A] bg-[#0F172A] px-6 py-3 font-display text-sm font-bold uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_#2563EB] transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#2563EB]"
            >
              Book Now <Zap size={16} />
            </a>
          </div>
        </div>
      </div>

    </section>
  );
};

export default ProgramsSection;
