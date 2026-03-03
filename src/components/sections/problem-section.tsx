'use client';

import React from 'react';
import { XCircle, AlertTriangle, MonitorPlay } from 'lucide-react';

const ProblemSection = () => {
  return (
    <section className="relative px-6 py-24 md:px-12 bg-[#DC2626] border-y-4 border-[#0F172A]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <div className="inline-block bg-[#0F172A] px-4 py-1 mb-4 transform -rotate-2">
            <span className="font-display text-white text-lg tracking-widest uppercase">The Harsh Truth</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl uppercase leading-none text-white drop-shadow-[4px_4px_0px_rgba(26,26,26,1)]">
            Why You're Not Improving
          </h2>
          <p className="mt-6 text-xl md:text-2xl font-bold text-[#0F172A] max-w-2xl mx-auto bg-white/10 backdrop-blur-sm p-4 border-2 border-[#0F172A]">
            You're training hard, sweating buckets, but your sparring partner still tags you at will. Here's why.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-[#FFFFFF] border-4 border-[#0F172A] p-6 shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] relative overflow-hidden group hover:translate-y-1 transition-transform">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <MonitorPlay size={120} />
            </div>
            <div className="bg-[#0F172A] w-12 h-12 flex items-center justify-center mb-4">
              <MonitorPlay className="text-white" size={24} />
            </div>
            <h3 className="font-display text-2xl uppercase mb-3 text-[#0F172A]">YouTube University</h3>
            <p className="font-body text-[#0F172A]/80 font-medium">
              You're watching random "cool move" tutorials without understanding the mechanics or context. It's like trying to build a house by collecting random bricks.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#FFFFFF] border-4 border-[#0F172A] p-6 shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] relative overflow-hidden group hover:translate-y-1 transition-transform">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <XCircle size={120} />
            </div>
            <div className="bg-[#0F172A] w-12 h-12 flex items-center justify-center mb-4">
              <XCircle className="text-white" size={24} />
            </div>
            <h3 className="font-display text-2xl uppercase mb-3 text-[#0F172A]">Zero Feedback</h3>
            <p className="font-body text-[#0F172A]/80 font-medium">
              You're drilling "bad habits" into your muscle memory. Without correction, you're not practicing—you're just making your mistakes permanent.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#FFFFFF] border-4 border-[#0F172A] p-6 shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] relative overflow-hidden group hover:translate-y-1 transition-transform">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <AlertTriangle size={120} />
            </div>
            <div className="bg-[#0F172A] w-12 h-12 flex items-center justify-center mb-4">
              <AlertTriangle className="text-white" size={24} />
            </div>
            <h3 className="font-display text-2xl uppercase mb-3 text-[#0F172A]">Cardio Boxing</h3>
            <p className="font-body text-[#0F172A]/80 font-medium">
              Your local gym teaches you how to burn calories, not how to fight. Hitting the bag hard doesn't mean you can land a punch on a moving target.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
