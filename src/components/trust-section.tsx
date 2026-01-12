'use client';
import React from 'react';
import { Target, Globe, Trophy, Quote } from 'lucide-react';
import Image from 'next/image';

const COACH_IMAGE_URL = "https://coach-josh-official.s3.us-east-2.amazonaws.com/coach-josh.jpg";

export default function TrustSection() {
  return (
    // CHANGED: bg-white -> bg-[#F2E8DC]
    <section className="border-t-2 border-[#1A1A1A] bg-[#F2E8DC] px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-20">
          {/* CHANGED: bg-[#F2E8DC] -> bg-white (to pop against the tan background) */}
          <div className="mb-4 inline-flex items-center gap-2 border-2 border-[#1A1A1A] bg-white px-4 py-1 font-display text-sm font-bold uppercase tracking-widest text-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A]">
            <Trophy size={16} className="text-[#D1495B]" /> The Coach
          </div>
          <h2 className="font-display text-5xl md:text-7xl uppercase text-[#1A1A1A]">
            Meet <span className="text-[#4A6FA5]">Coach Josh</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* --- LEFT COLUMN: IMAGE & STATS (5 Cols) --- */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Image Card */}
            <div className="relative border-4 border-[#1A1A1A] bg-[#1A1A1A] shadow-[12px_12px_0px_0px_#1A1A1A]">
              <div className="relative aspect-[3/4] w-full grayscale contrast-125 hover:grayscale-0 transition-all duration-500">
                <Image
                  src={COACH_IMAGE_URL}
                  alt="Coach Josh"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-[#4A6FA5]/20 mix-blend-multiply pointer-events-none" />
              </div>
              
              {/* Badge */}
              <div className="absolute -bottom-6 -right-6 border-2 border-[#1A1A1A] bg-[#D1495B] px-6 py-3 font-display text-xl text-white shadow-[4px_4px_0px_0px_#1A1A1A]">
                Est. 2018
              </div>
            </div>

            {/* Stats Grid */}
            {/* CHANGED: bg-[#F2E8DC] -> bg-white (so it stands out) */}
            <div className="grid grid-cols-3 gap-4 border-2 border-[#1A1A1A] bg-white p-4 shadow-[8px_8px_0px_0px_#1A1A1A]">
              <div className="text-center">
                <div className="font-display text-3xl md:text-4xl text-[#1A1A1A]">50M+</div>
                <div className="font-body text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/60">Views</div>
              </div>
              <div className="text-center border-l-2 border-[#1A1A1A]/20">
                <div className="font-display text-3xl md:text-4xl text-[#1A1A1A]">10+</div>
                <div className="font-body text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/60">Gyms</div>
              </div>
              <div className="text-center border-l-2 border-[#1A1A1A]/20">
                <div className="font-display text-3xl md:text-4xl text-[#1A1A1A]">250+</div>
                <div className="font-body text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/60">Athletes</div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: STORY & PHILOSOPHY (7 Cols) --- */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Opening Hook */}
            {/* CHANGED: bg-[#F2E8DC]/50 -> bg-white (for readability) */}
            <div className="relative border-l-8 border-[#4A6FA5] bg-white p-8 border-y-2 border-r-2 border-[#1A1A1A]/10">
              <Quote className="absolute top-4 left-4 h-8 w-8 text-[#4A6FA5]/20 rotate-180" />
              <p className="font-display text-2xl md:text-3xl uppercase text-[#1A1A1A] leading-tight relative z-10">
                "You need someone in your corner who has been where you are and knows the path forward."
              </p>
            </div>

            {/* The Story */}
            <div className="space-y-6 font-body text-lg text-[#1A1A1A]/80 leading-relaxed">
              <p>
                <span className="font-bold text-[#1A1A1A]">Boxing isn't just a sport.</span> It's a way of life.
              </p>
              <p>
                I've traveled, exposed myself to different styles, and learned from coaches with <span className="bg-[#D1495B]/20 px-1 font-bold text-[#D1495B]">World Championship experience</span>. I have over six years of training in elite gyms, taking in everything I could. 
              </p>
              <p>
                I've seen what works for pressure fighters and what works for technicians. My experience comes from the shared knowledge of many people who pushed me to apply what I know in the ring.
              </p>
              <p className="font-bold text-[#1A1A1A]">
                The habits, focus, and confidence you will develop here show up in your work, your relationships, and the way you face challenges outside the gym.
              </p>
            </div>

            {/* Philosophy Cards */}
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              {/* Card 1 */}
              <div className="border-2 border-[#1A1A1A] bg-white p-6 shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#1A1A1A] transition-all">
                <div className="mb-4 inline-flex items-center justify-center h-10 w-10 border-2 border-[#1A1A1A] bg-[#4A6FA5] text-white">
                  <Target size={20} />
                </div>
                <h4 className="font-display text-xl uppercase text-[#1A1A1A] mb-2">My Philosophy</h4>
                <p className="font-body text-sm text-[#1A1A1A]/70 leading-relaxed">
                  Mechanics over muscle. We build from the ground up—stance, balance, timing, then power. The fundamentals aren't boring. They're everything.
                </p>
              </div>
              {/* Card 2 */}
              <div className="border-2 border-[#1A1A1A] bg-[#1A1A1A] p-6 text-white shadow-[4px_4px_0px_0px_#4A6FA5] hover:translate-y-[-2px] transition-all">
                <div className="mb-4 inline-flex items-center justify-center h-10 w-10 border-2 border-white bg-[#D1495B] text-white">
                  <Globe size={20} />
                </div>
                <h4 className="font-display text-xl uppercase text-white mb-2">The Ambition</h4>
                <p className="font-body text-sm text-white/70 leading-relaxed">
                  To create the most technical, supportive boxing community on the planet. Real feedback, real growth, no ego.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
