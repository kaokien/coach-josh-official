'use client';

import React from 'react';
import { Target, Brain, Zap } from 'lucide-react';

const MethodologySection = () => {
  return (
    <section className="relative px-6 py-24 md:px-12 bg-[#F2E8DC]">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-[#4A6FA5] px-4 py-1 mb-4 transform rotate-1">
              <span className="font-display text-white text-lg tracking-widest uppercase">The Solution</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl uppercase leading-none text-[#1A1A1A] mb-6">
              The <span className="text-[#4A6FA5]">Fight IQ</span> System
            </h2>
            <p className="text-xl font-body font-bold text-[#1A1A1A]/80 leading-relaxed mb-8">
              Boxing isn't just about being fast or strong. It's about being smart. My system builds "Fight IQ"—the ability to see, predict, and react before your opponent even moves.
            </p>

            <div className="space-y-6">
              {/* Pillar 1 */}
              <div className="flex gap-4">
                <div className="bg-[#1A1A1A] p-3 h-fit border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#4A6FA5]">
                  <Zap className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-display text-2xl uppercase text-[#1A1A1A]">1. Mechanics</h3>
                  <p className="font-body text-[#1A1A1A]/70">
                    Master the kinetic chain. Learn to generate maximum power with minimum effort by using your body correctly, not just swinging your arms.
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="flex gap-4">
                <div className="bg-[#1A1A1A] p-3 h-fit border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#4A6FA5]">
                  <Brain className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-display text-2xl uppercase text-[#1A1A1A]">2. Strategy</h3>
                  <p className="font-body text-[#1A1A1A]/70">
                    Stop guessing. Learn the "why" behind every move. Control the ring, set traps, and dictate the pace of the fight.
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="flex gap-4">
                <div className="bg-[#1A1A1A] p-3 h-fit border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#4A6FA5]">
                  <Target className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-display text-2xl uppercase text-[#1A1A1A]">3. Mentality</h3>
                  <p className="font-body text-[#1A1A1A]/70">
                    Build bulletproof confidence. Train your mind to stay calm under pressure so you never freeze when the punches start flying.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Abstract visual representation of the system */}
            <div className="aspect-square bg-[#1A1A1A] p-8 border-4 border-[#1A1A1A] shadow-[12px_12px_0px_0px_rgba(209,73,91,1)]">
              <div className="h-full w-full border-4 border-white/20 p-8 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20"></div>
                <div className="text-center z-10">
                  <div className="font-display text-[120px] leading-none text-white opacity-90">IQ</div>
                  <div className="font-display text-2xl text-[#4A6FA5] uppercase tracking-[0.5em] bg-white px-2 mt-4">Unlocked</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
