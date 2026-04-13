// Server Component — pure JSX, no hooks or browser APIs
import React from 'react';
import { Target, Globe, Trophy, Quote } from 'lucide-react';

export default function TrustSection() {
  return (
    <section className="border-t-2 border-[#0F172A] bg-[#FFFFFF] px-6 py-20 md:px-12">
      <div className="mx-auto max-w-7xl">

        {/* --- HEADER --- */}
        <div className="mb-14">
          <div className="mb-4 inline-flex items-center gap-2 border-2 border-[#0F172A] bg-white px-4 py-1 font-display text-sm font-bold uppercase tracking-widest text-[#0F172A] shadow-[4px_4px_0px_0px_#0F172A]">
            <Trophy size={16} className="text-[#DC2626]" /> The Coach
          </div>
          <h2 className="font-display text-5xl md:text-7xl uppercase text-[#0F172A]">
            Meet <span className="text-[#2563EB]">Coach Josh</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* --- LEFT: QUOTE + STORY --- */}
          <div className="lg:col-span-7 flex flex-col gap-8">

            {/* Opening Hook */}
            <div className="relative border-l-8 border-[#2563EB] bg-white p-8 border-y-2 border-r-2 border-[#0F172A]/10">
              <Quote className="absolute top-4 left-4 h-8 w-8 text-[#2563EB]/20 rotate-180" />
              <p className="font-display text-2xl md:text-3xl uppercase text-[#0F172A] leading-tight relative z-10">
                &ldquo;You need someone in your corner who has been where you are and knows the path forward.&rdquo;
              </p>
            </div>

            {/* The Story */}
            <div className="space-y-5 font-body text-lg text-[#0F172A]/80 leading-relaxed">
              <p>
                <span className="font-bold text-[#0F172A]">Boxing isn&apos;t just a sport.</span> It&apos;s a way of life.
              </p>
              <p>
                I&apos;ve traveled, exposed myself to different styles, and learned from coaches with{' '}
                <span className="bg-[#DC2626]/20 px-1 font-bold text-[#A8314A]">World Championship experience</span>.
                I have over six years of training in elite gyms, taking in everything I could.
              </p>
              <p>
                I&apos;ve seen what works for pressure fighters and what works for technicians. My experience comes from the shared knowledge of many people who pushed me to apply what I know in the ring.
              </p>
              <p className="font-bold text-[#0F172A]">
                The habits, focus, and confidence you will develop here show up in your work, your relationships, and the way you face challenges outside the gym.
              </p>
            </div>
          </div>

          {/* --- RIGHT: PHILOSOPHY CARDS --- */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:pt-2">
            {/* Card 1 */}
            <div className="border-2 border-[#0F172A] bg-white p-8 shadow-[4px_4px_0px_0px_#0F172A] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#0F172A] transition-all">
              <div className="mb-4 inline-flex items-center justify-center h-10 w-10 border-2 border-[#0F172A] bg-[#2563EB] text-white">
                <Target size={20} />
              </div>
              <h3 className="font-display text-xl uppercase text-[#0F172A] mb-3">My Philosophy</h3>
              <p className="font-body text-sm text-[#0F172A]/70 leading-relaxed">
                Mechanics over muscle. We build from the ground up — stance, balance, timing, then power. The fundamentals aren&apos;t boring. They&apos;re everything.
              </p>
            </div>

            {/* Card 2 */}
            <div className="border-2 border-[#0F172A] bg-[#0F172A] p-8 text-white shadow-[4px_4px_0px_0px_#2563EB] hover:translate-y-[-2px] transition-all">
              <div className="mb-4 inline-flex items-center justify-center h-10 w-10 border-2 border-white bg-[#DC2626] text-white">
                <Globe size={20} />
              </div>
              <h3 className="font-display text-xl uppercase text-white mb-3">The Ambition</h3>
              <p className="font-body text-sm text-white/70 leading-relaxed">
                To create the most technical, supportive boxing community on the planet. Real feedback, real growth, no ego.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
