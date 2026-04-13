'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] bg-[#FFFFFF] border-b-4 border-[#0F172A] overflow-hidden px-6 pt-28 pb-0 md:px-12">

      {/* Brutalist background grid lines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg,#0F172A 0px,#0F172A 1px,transparent 1px,transparent 80px),repeating-linear-gradient(90deg,#0F172A 0px,#0F172A 1px,transparent 1px,transparent 80px)' }}
      />

      <div className="relative z-10 mx-auto max-w-7xl flex flex-col lg:flex-row items-end gap-12 lg:gap-0">

        {/* ── LEFT: TEXT COLUMN ── */}
        <div className="flex-1 flex flex-col gap-6 pb-16 lg:pb-24">

          {/* Live badge */}
          <div className="inline-flex w-fit items-center gap-2 border-2 border-[#0F172A] bg-[#DC2626] px-4 py-2 font-display text-sm font-bold uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
            Certified Boxing Coach
          </div>

          {/* Headline */}
          <div>
            <p className="font-display text-sm md:text-base uppercase tracking-[0.3em] text-[#0F172A]/50 mb-2">Coach Josh Official</p>
            <h1 className="font-display text-[14vw] sm:text-[10vw] lg:text-[8vw] leading-[0.85] tracking-tighter text-[#0F172A]">
              FIGHT IQ<br />
              <span className="text-[#2563EB]">UNLOCKED</span>
            </h1>
          </div>

          {/* Sub-copy */}
          <p className="font-body text-lg md:text-xl font-bold text-[#0F172A]/70 max-w-lg leading-relaxed border-l-4 border-[#2563EB] pl-4">
            Stop throwing arm punches. Master the slip, the shift, and the science of striking. Technical drills from the 150M+ view social media archive.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mt-2">
            <Link href="#programs">
              <Button variant="default">GET THE COURSE &rarr;</Button>
            </Link>
            <Link href="#free">
              <Button variant="outline">Start Free &darr;</Button>
            </Link>
          </div>

          {/* Stats bar */}
          <div className="mt-4 flex flex-wrap gap-8 border-t-2 border-[#0F172A] pt-6">
            <div>
              <div className="font-display text-4xl md:text-5xl text-[#2563EB]">200+</div>
              <div className="font-body text-[10px] font-bold uppercase tracking-widest text-[#0F172A]">Athletes Trained</div>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl text-[#2563EB]">150M+</div>
              <div className="font-body text-[10px] font-bold uppercase tracking-widest text-[#0F172A]">Social Media Views</div>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl text-[#2563EB]">37+</div>
              <div className="font-body text-[10px] font-bold uppercase tracking-widest text-[#0F172A]">Google Reviews</div>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl text-[#2563EB]">6+</div>
              <div className="font-body text-[10px] font-bold uppercase tracking-widest text-[#0F172A]">Years Coaching</div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: IMAGE FRAME ── */}
        <div className="relative lg:w-[420px] xl:w-[480px] shrink-0 self-end">
          {/* Red accent stripe behind the image */}
          <div className="absolute -top-4 -right-4 w-full h-full bg-[#DC2626] z-0" />

          {/* Neon bottom bar */}
          <div className="absolute -bottom-0 left-0 right-4 h-2 bg-[#CCFF00] z-20" />

          {/* Image */}
          <div className="relative z-10 border-4 border-[#0F172A] overflow-hidden" style={{ aspectRatio: '3/4' }}>
            <Image
              src="/coach-josh-hero.webp"
              alt="Coach Josh — Certified Boxing Coach"
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-cover object-top"
              priority
            />
            {/* Subtle blue tint overlay */}
            <div className="absolute inset-0 bg-[#2563EB]/10 mix-blend-multiply pointer-events-none" />
          </div>

          {/* Floating badge */}
          <div className="absolute -left-6 top-12 z-20 border-2 border-[#0F172A] bg-[#0F172A] px-4 py-2 text-white font-display text-sm uppercase tracking-wider shadow-[4px_4px_0px_0px_#DC2626]">
            Est. 2020
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
