'use client';

import React from 'react';
import { Shield, TrendingUp, Users } from 'lucide-react';

const BenefitsSection = () => {
  return (
    <section className="relative px-6 py-24 md:px-12 bg-[#0F172A] border-t-8 border-[#DC2626]">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-4xl md:text-6xl uppercase leading-none text-white mb-8">
              More Than Just <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DC2626] to-[#2563EB]">Punching</span>
            </h2>
            <p className="text-xl font-body text-[#FFFFFF]/80 leading-relaxed mb-8">
              True fighters are built in the mind first. My program doesn't just teach you how to fight in the ring—it teaches you how to fight in life.
            </p>

            <div className="space-y-8">
              <div className="group">
                <h3 className="font-display text-2xl uppercase text-white mb-2 flex items-center gap-3">
                  <Shield className="text-[#DC2626]" /> Unbreakable Discipline
                </h3>
                <p className="font-body text-[#FFFFFF]/60 pl-9 border-l-2 border-[#DC2626]/30 group-hover:border-[#DC2626] transition-colors">
                  Learn to show up when you don't feel like it. That's the secret to success in boxing, business, and everything else.
                </p>
              </div>

              <div className="group">
                <h3 className="font-display text-2xl uppercase text-white mb-2 flex items-center gap-3">
                  <TrendingUp className="text-[#DC2626]" /> Mental Toughness
                </h3>
                <p className="font-body text-[#FFFFFF]/60 pl-9 border-l-2 border-[#DC2626]/30 group-hover:border-[#DC2626] transition-colors">
                  Get comfortable being uncomfortable. The roadwork, the drills, the grind—it all builds a callus over your mind.
                </p>
              </div>

              <div className="group">
                <h3 className="font-display text-2xl uppercase text-white mb-2 flex items-center gap-3">
                  <Users className="text-[#DC2626]" /> Brotherhood
                </h3>
                <p className="font-body text-[#FFFFFF]/60 pl-9 border-l-2 border-[#DC2626]/30 group-hover:border-[#DC2626] transition-colors">
                  You're not alone. Join a community of savages who are all chasing the same goal: becoming the best version of themselves.
                </p>
              </div>
            </div>
          </div>

          <div className="relative h-full min-h-[400px]">
            <div className="absolute inset-0 border-4 border-[#FFFFFF] transform translate-x-4 translate-y-4"></div>
            <div className="absolute inset-0 bg-[#DC2626] opacity-20 transform -translate-x-4 -translate-y-4"></div>
            <div className="relative h-full bg-[url('/training-bg.jpg')] bg-cover bg-center border-4 border-[#0F172A] grayscale contrast-125 flex items-end p-6">
              <div className="bg-[#0F172A] p-4 border-2 border-[#FFFFFF]">
                <p className="font-display text-white text-lg uppercase tracking-widest">
                  "The fight is won or lost far away from witnesses - behind the lines, in the gym, and out there on the road."
                </p>
                <p className="font-body text-[#DC2626] font-bold mt-2">— Muhammad Ali</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
