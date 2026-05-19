'use client';

import React, { useState } from 'react';
import { Target, Trophy, Check, Shield, Crown, Video, ArrowUpRight, Zap, Loader2, BookOpen } from 'lucide-react';
import { useClerk, useAuth, useUser } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';
import { PopupButton } from '@typeform/embed-react';


const BOOKING_LINK =
  'https://calendly.com/mais-joshua/training-session?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=ccff00';

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
    <section id="programs" className="relative px-6 py-32 md:px-12 bg-[#FFFFFF]">
      <div className="text-center mb-16">
        <h2 className="font-display text-5xl md:text-7xl uppercase text-[#0F172A]">
          Choose Your Path
        </h2>
        <p className="font-body mt-4 text-lg text-[#0F172A]/60 max-w-2xl mx-auto">
          From self-study guides to elite 1-on-1 coaching — there&apos;s a program for every level.
        </p>
      </div>

      {/* ─── MAIN 3-COLUMN GRID ─── */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">

        {/* Card 1: Striking Blueprint — $49 */}
        <div
          className="group relative flex flex-col justify-between border-4 border-[#0F172A] bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-[#2563EB] hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
        >
          <div>
            <div className="mb-6 inline-flex items-center gap-2 border border-[#0F172A] bg-[#FFFFFF] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#0F172A] transition-colors group-hover:bg-white/10 group-hover:text-white group-hover:border-white">
              <Target size={12} className="text-[#2563EB] transition-colors group-hover:text-white" /> Digital Guide
            </div>
            <h3 className="font-display text-4xl md:text-5xl uppercase text-[#0F172A] transition-colors group-hover:text-white">
              Striking Blueprint
            </h3>
            <p className="font-body mt-4 text-[#0F172A]/80 transition-colors group-hover:text-white/90">
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
                <li key={i} className="flex items-center gap-3 text-sm font-bold text-[#0F172A] transition-colors group-hover:text-white">
                  <Check size={16} className="text-[#2563EB] stroke-[3px] flex-shrink-0 transition-colors group-hover:text-white" />{i}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-12 pt-8 border-t-2 border-[#0F172A]/10 transition-colors group-hover:border-white/20">
            <div className="mb-6 flex items-baseline gap-2">
              <span className="font-display text-5xl text-[#2563EB] transition-colors group-hover:text-white">$49</span>
              <span className="font-body font-bold text-[#0F172A]/60 transition-colors group-hover:text-white/60">one-time</span>
            </div>
            {hasAccess ? (
              <a
                href="/blueprint"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0F172A] text-white font-display text-sm uppercase tracking-widest px-6 py-3 border-2 border-[#0F172A] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                Read Now <BookOpen size={18} className="ml-2" />
              </a>
            ) : (
              <Button
                variant="default"
                className="w-full bg-[#0F172A] text-white hover:bg-[#2563EB] hover:text-white"
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

        {/* Card 2: Blueprint Video Course — $97 */}
        <div
          className="relative flex flex-col justify-between border-4 border-[#0F172A] bg-[#2563EB] p-8 text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover-lift"
        >
          <div className="absolute right-[-4px] top-[-24px] border-2 border-[#0F172A] bg-[#DC2626] px-4 py-2 font-display text-lg text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            MOST POPULAR
          </div>
          <div>
            <div className="mb-6 inline-flex items-center gap-2 border border-white bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
              <Trophy size={12} /> Video Course
            </div>
            <h3 className="font-display text-4xl md:text-5xl uppercase text-white">Boxing Blueprint</h3>
            <p className="font-body mt-4 text-white/90">
              The complete fundamentals course. 4 deep-dive modules covering striking mechanics, conditioning circuits, defense, and footwork progressions.
            </p>
            <ul className="mt-8 space-y-3 font-body">
              {[
                'Everything in Striking Blueprint',
                '4 Deep-Dive Modules',
                'Step-by-Step Fundamentals',
                'Bag Work & Mitt Drills',
                'Elite Conditioning Circuits',
                'Defense & Footwork Progressions',
              ].map((i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold text-white">
                  <Check size={16} className="text-white stroke-[3px] flex-shrink-0" />{i}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-12 pt-8 border-t-2 border-white/20">
            <div className="mb-6 flex items-baseline gap-2">
              <span className="font-display text-5xl text-white">$97</span>
              <span className="font-body font-bold text-white/60">one-time</span>
            </div>
            <a
              href="https://coachjosh1.gumroad.com/l/opdee"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex w-full items-center justify-center gap-3 border-2 border-white bg-white px-8 py-4 font-display text-lg font-bold uppercase tracking-widest text-[#2563EB] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]"
            >
              Get The Course <ArrowUpRight size={18} />
            </a>
          </div>
        </div>

        {/* Card 3: ELITE 1:1 Coaching — $497/mo */}
        <div
          className="relative flex flex-col justify-between border-4 border-[#0F172A] bg-[#0F172A] p-8 text-white shadow-[8px_8px_0px_0px_#2563EB] hover-lift"
        >
          <div className="absolute right-[-4px] top-[-24px] border-2 border-[#0F172A] bg-[#0F172A] px-4 py-2 font-display text-lg text-[#2563EB] shadow-[4px_4px_0px_0px_#2563EB]">
            <span className="flex items-center gap-2"><Crown size={16} /> PREMIUM</span>
          </div>
          <div>
            <div className="mb-6 inline-flex items-center gap-2 border border-white/30 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white/80">
              <Crown size={12} className="text-[#2563EB]" /> Elite 1:1
            </div>
            <h3 className="font-display text-4xl md:text-5xl uppercase text-white">
              Elite<br />Coaching
            </h3>
            <p className="font-body mt-4 text-white/80">
              Premium coaching with direct access to Josh. Custom programming, unlimited form checks, and everything in the Striking & Boxing Blueprints.
            </p>
            <ul className="mt-8 space-y-3 font-body">
              {[
                'Everything in the Striking Blueprint',
                '2–4 Private Calls / Month',
                'Custom Training Program',
                'Direct Access to Josh',
              ].map((i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold text-white">
                  <Check size={16} className="text-[#2563EB] stroke-[3px] flex-shrink-0" />{i}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-12 pt-8 border-t-2 border-white/10">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#CCFF00] animate-pulse" />
              <span className="font-body text-xs font-bold uppercase tracking-widest text-[#CCFF00]">Limited Availability</span>
            </div>
            <div className="mb-6 flex items-baseline gap-2">
              <span className="font-display text-5xl text-[#2563EB]">$497</span>
              <span className="font-body font-bold text-white/50">/month</span>
            </div>
            <PopupButton
              id="kBg1xSHF"
              className="group relative inline-flex w-full items-center justify-center gap-3 border-2 border-[#2563EB] bg-[#2563EB] px-8 py-4 font-display text-lg font-bold uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]"
            >
              Apply Now <ArrowUpRight size={18} />
            </PopupButton>
            <p className="mt-3 text-center font-body text-xs text-white/40">
              Fill out a short application — Josh reviews every one personally.
            </p>
          </div>
        </div>
      </div>

      {/* ─── 1:1 PRIVATE SESSION CTA ─── */}
      <div
        className="mx-auto mt-16 max-w-3xl animate-fade-in-up"
      >
        <div className="relative border-4 border-[#0F172A] bg-white p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center gap-8">
          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center border-2 border-[#0F172A] bg-[#FFFFFF]">
            <Video size={36} className="text-[#2563EB]" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-display text-2xl md:text-3xl uppercase text-[#0F172A]">
              1:1 Private Session
            </h3>
            <p className="font-body mt-2 text-[#0F172A]/70">
              Not ready for a monthly commitment? Book a single 45-minute online private with Coach Josh.
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
