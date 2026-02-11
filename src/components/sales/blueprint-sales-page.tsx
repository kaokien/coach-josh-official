'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Check, Shield, Star, Trophy, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WaitlistModal from '@/components/ui/waitlist-modal';
import Image from 'next/image';
import ComparisonSection from '@/components/sections/comparison-section';

const BlueprintSalesPage = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const openWaitlist = () => setIsWaitlistOpen(true);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F2E8DC] font-body selection:bg-[#D1495B] selection:text-white">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden border-b-8 border-[#D1495B]">
        {/* Background (Placeholder for Video) */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-10" />
          {/* Replace with actual video/image */}
          <div className="w-full h-full bg-[#1A1A1A] grayscale opacity-50" />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-[#D1495B] text-white font-bold px-4 py-1 uppercase tracking-widest text-sm mb-6 transform -rotate-2">
              The Official System
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.9] tracking-tighter mb-6">
              Master The <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-[#999]">Sweet Science</span>
            </h1>
            <p className="font-body text-xl md:text-2xl text-[#F2E8DC]/80 max-w-2xl mx-auto leading-relaxed">
              Stop guessing. Start training. The complete step-by-step blueprint to build <span className="text-[#D1495B] font-bold">Elite Striking Mechanics</span> from home.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <Button
              onClick={openWaitlist}
              className="bg-[#D1495B] hover:bg-[#A13442] text-white text-xl px-12 py-8 uppercase tracking-widest"
            >
              Start Training Now
            </Button>
            <p className="text-sm opacity-60 uppercase tracking-widest mt-4 md:mt-0">
              *Limited Enrollment Opening Soon
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- TRUST / SOCIAL PROOF --- */}
      <section className="bg-[#1A1A1A] py-12 border-b-2 border-[#333]">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Reusing logos or adding stats */}
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6" />
            <span className="font-display text-xl">10k+ Students</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-6 h-6" />
            <span className="font-display text-xl">5-Star Rated</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6" />
            <span className="font-display text-xl">Proven Results</span>
          </div>
        </div>
      </section>

      {/* --- CURRICULUM PREVIEW --- */}
      <section className="py-24 px-6 bg-[#F2E8DC] text-[#1A1A1A]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="font-display text-5xl md:text-6xl uppercase leading-none text-[#1A1A1A]">
              What's Inside<br /><span className="text-[#D1495B]">The Blueprint?</span>
            </h2>
            <p className="text-lg text-[#1A1A1A]/80 leading-relaxed">
              This isn't just a collection of random drills. It's a structured 11-chapter system designed to take you from beginner to advanced striker.
            </p>

            <div className="space-y-4">
              {[
                "Strategic Footwork & Angles",
                "Kinetic Chain Power Generation",
                "Defensive Head Movement (Slip, Roll, Pull)",
                "Counter-Punching IQ",
                "Heavy Bag Conditioning Protocols"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white p-4 border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="bg-[#D1495B] text-white p-1 rounded-sm">
                    <Check size={20} />
                  </div>
                  <span className="font-bold uppercase tracking-wide">{item}</span>
                </div>
              ))}
            </div>

            <Button onClick={openWaitlist} variant="outline" className="w-[12px] md:w-auto mt-6">
              View Full Curriculum
            </Button>
          </div>

          {/* Stacked Cards Visual */}
          <div className="relative h-[600px] w-full hidden md:block">
            <div className="absolute top-0 right-0 w-3/4 h-full bg-[#1A1A1A] rotate-3 border-4 border-[#1A1A1A]" />
            <div className="absolute top-4 right-4 w-3/4 h-full bg-[#D1495B] -rotate-3 border-4 border-[#1A1A1A]" />
            <div className="absolute top-8 right-8 w-3/4 h-full bg-white rotate-0 border-4 border-[#1A1A1A] flex items-center justify-center overflow-hidden">
              {/* Placeholder for Course Interface Image */}
              <div className="text-[#1A1A1A]/20 font-display text-4xl uppercase p-12 text-center">
                Review Course Interface
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- COMPARISON SECTION --- */}
      <div className="bg-[#F5F5DC] text-[#1A1A1A]">
        <ComparisonSection />
      </div>

      {/* --- PRICE & OFFER --- */}
      <section className="py-24 px-6 bg-[#050505] text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="font-display text-4xl md:text-6xl uppercase text-white">
            Stop Training Like A <span className="text-[#D1495B]">Novice</span>
          </h2>
          <p className="text-xl text-[#F2E8DC]/60 max-w-2xl mx-auto">
            Join the waitlist today to secure the launch price and get exclusive bonuses.
          </p>

          <div className="bg-[#1A1A1A] border border-[#333] p-12 max-w-2xl mx-auto relative overflow-hidden group hover:border-[#D1495B] transition-colors">
            <div className="absolute top-0 right-0 bg-[#D1495B] text-white text-xs font-bold px-3 py-1 uppercase">
              Launch Offer
            </div>

            <div className="text-5xl md:text-6xl font-display text-white mb-2">
              $49<span className="text-xl text-[#F2E8DC]/50 align-top ml-2 line-through">$97</span>
            </div>
            <p className="text-[#F2E8DC]/40 uppercase tracking-widest text-sm mb-8">One-time payment • Lifetime Access</p>

            <ul className="text-left space-y-3 mb-8 text-[#F2E8DC]/80 max-w-xs mx-auto">
              <li className="flex gap-3"><Check className="text-[#D1495B]" /> Complete Video Course</li>
              <li className="flex gap-3"><Check className="text-[#D1495B]" /> PDF Training Logs</li>
              <li className="flex gap-3"><Check className="text-[#D1495B]" /> Mobile Access</li>
            </ul>

            <Button
              onClick={openWaitlist}
              className="w-full bg-[#D1495B] hover:bg-[#A13442] py-6 text-xl uppercase tracking-widest"
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="py-12 bg-[#D1495B] text-center">
        <p className="font-display text-[#050505] text-xl uppercase">
          Don't Miss The Drop
        </p>
      </section>

      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </div>
  );
};

export default BlueprintSalesPage;
