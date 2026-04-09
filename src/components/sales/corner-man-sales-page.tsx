'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Play, Headphones, Crown, Check, ArrowUpRight } from 'lucide-react';
import { SignInButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';

const GUMROAD_URL = 'https://coachjosh1.gumroad.com/l/opdee';

const CornerManSalesPage = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0F172A] font-body selection:bg-[#2563EB] selection:text-white">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b-8 border-[#0F172A]">
        {/* Member Login (Only if NOT signed in) */}
        {!isSignedIn && (
          <div className="absolute top-6 right-6 z-30">
            <SignInButton mode="modal">
              <button className="font-display uppercase text-sm text-[#0F172A] hover:text-[#2563EB] font-bold border-b-2 border-transparent hover:border-[#2563EB] transition-all">
                Member Sign In
              </button>
            </SignInButton>
          </div>
        )}

        {/* Background Texture */}
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#2563EB 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#2563EB] text-white border-2 border-[#0F172A] font-bold px-6 py-2 uppercase tracking-widest text-sm mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Crown size={16} className="text-yellow-400" />
              Complete Video Course
            </div>

            <h1 className="font-display text-5xl md:text-8xl uppercase leading-[0.85] tracking-tighter mb-8 text-[#0F172A]">
              The Boxing <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#2c4e80]">Blueprint</span>
            </h1>

            <p className="font-body text-xl md:text-2xl text-[#0F172A]/80 max-w-2xl mx-auto leading-relaxed">
              60+ video lessons. Master striking mechanics, footwork, defense, and fight IQ — with lifetime access and a private Discord community.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <a
              href={GUMROAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#2563EB] border-2 border-[#0F172A] text-white text-xl px-12 py-6 font-display uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300"
            >
              Get The Course — $197 <ArrowUpRight size={20} />
            </a>
            <p className="text-xs font-bold uppercase tracking-widest text-[#0F172A]/50">
              One-Time Payment • Lifetime Access
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- VALUE STACK --- */}
      <section className="py-24 px-6 bg-[#0F172A] text-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="space-y-6 text-center md:text-left">
              <div className="bg-[#2563EB] w-16 h-16 flex items-center justify-center border-2 border-[#FFFFFF] shadow-[4px_4px_0px_0px_#FFFFFF]">
                <Play size={32} className="text-white" />
              </div>
              <h3 className="font-display text-3xl uppercase">60+ Video Lessons</h3>
              <p className="opacity-70 leading-relaxed">
                Complete striking system from stance to combinations. Every technique broken down step-by-step with slow-motion demonstrations and drills.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-6 text-center md:text-left">
              <div className="bg-[#DC2626] w-16 h-16 flex items-center justify-center border-2 border-[#FFFFFF] shadow-[4px_4px_0px_0px_#FFFFFF]">
                <Users size={32} className="text-white" />
              </div>
              <h3 className="font-display text-3xl uppercase">Discord Community</h3>
              <p className="opacity-70 leading-relaxed">
                Your purchase unlocks access to the private Discord community. Connect with other students, discuss the course, and get feedback on your progress.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="space-y-6 text-center md:text-left">
              <div className="bg-[#fbbf24] w-16 h-16 flex items-center justify-center border-2 border-[#FFFFFF] shadow-[4px_4px_0px_0px_#FFFFFF]">
                <Headphones size={32} className="text-[#0F172A]" />
              </div>
              <h3 className="font-display text-3xl uppercase">Lifetime Access</h3>
              <p className="opacity-70 leading-relaxed">
                Pay once, own it forever. Go at your own pace with unlimited rewatches. New content updates included at no extra cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRICING CARD --- */}
      <section className="py-24 px-6 bg-[#FFFFFF]">
        <div className="max-w-md mx-auto relative group">
          <div className="absolute inset-0 bg-[#0F172A] translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300" />
          <div className="relative bg-white border-4 border-[#0F172A] p-12 text-center">
            <div className="inline-block bg-[#0F172A] text-white px-3 py-1 text-xs font-bold uppercase tracking-widest mb-6">
              One-Time Purchase
            </div>
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span className="font-display text-6xl text-[#0F172A]">$197</span>
              <span className="font-body text-[#0F172A]/50 font-bold uppercase">one-time</span>
            </div>

            <div className="h-px w-full bg-[#0F172A]/10 my-8" />

            <ul className="text-left space-y-4 mb-8">
              {[
                "60+ Premium Video Lessons",
                "Private Discord Community",
                "Lifetime Access",
                "Fight IQ Breakdowns",
                "PDF Training Logs"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-bold text-[#0F172A]/80">
                  <Check size={20} className="text-[#2563EB]" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href={GUMROAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#2563EB] border-2 border-[#0F172A] text-white font-display text-xl uppercase py-4 hover:bg-[#1d4ed8] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center"
            >
              Get The Course
            </a>

            <p className="mt-4 text-xs font-bold text-[#0F172A]/40 uppercase">
              Processed securely through Gumroad
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CornerManSalesPage;
