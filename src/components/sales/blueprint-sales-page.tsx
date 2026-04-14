'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, BookOpen, Target, Dumbbell, Heart, Zap, Award, AlertTriangle, ClipboardList, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const chapters = [
  { icon: BookOpen, title: 'Introduction', desc: 'Beginner boxing fundamentals built on real gym training' },
  { icon: AlertTriangle, title: 'Injury Prevention', desc: 'Protect yourself before you train' },
  { icon: Target, title: 'When You Feel Lost', desc: 'How to push through plateaus and stay consistent' },
  { icon: Dumbbell, title: 'Weekly Structure', desc: 'A real training schedule you can follow' },
  { icon: Zap, title: 'Warm-Up Routine', desc: 'The exact warm-up used before every session' },
  { icon: Heart, title: 'Conditioning', desc: 'Build the gas tank that outlasts your opponent' },
  { icon: Award, title: 'Shadowboxing', desc: 'Develop timing, rhythm, and fight IQ solo' },
  { icon: Target, title: 'Heavy Bag Work', desc: 'Structured rounds for power and technique' },
  { icon: Dumbbell, title: 'Core Training', desc: 'Boxing-specific core strength protocols' },
  { icon: Zap, title: 'Plyometrics', desc: 'Explosive power for snap and speed' },
  { icon: Award, title: 'Next Steps', desc: 'Where to go after completing the blueprint' },
  { icon: ClipboardList, title: 'Training Log', desc: 'Track your progress with an interactive log' },
];

const BlueprintSalesPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
          return;
        }
      }
      console.error('Checkout failed');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#FFFFFF] font-body selection:bg-[#DC2626] selection:text-white">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b-8 border-[#DC2626]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent z-10" />
          <div className="w-full h-full bg-[#0F172A]" />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-[#DC2626] text-white font-bold px-4 py-1 uppercase tracking-widest text-sm mb-6 transform -rotate-2">
              Coach Josh Official
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.9] tracking-tighter mb-6">
              Striking<br /><span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-[#999]">Blueprint</span>
            </h1>
            <p className="font-body text-xl md:text-2xl text-[#FFFFFF]/80 max-w-2xl mx-auto leading-relaxed">
              The complete beginner boxing system. <span className="text-[#DC2626] font-bold">12 chapters</span> of real gym training — stance, footwork, conditioning, heavy bag work, and fight IQ — structured the way real coaches teach.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <Button
              onClick={handleCheckout}
              disabled={isLoading}
              className="bg-[#DC2626] hover:bg-[#A13442] text-white text-xl px-12 py-8 uppercase tracking-widest disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Get Instant Access — $49'}
            </Button>
            <p className="text-sm opacity-60 uppercase tracking-widest">
              One-time payment • Lifetime access • Read on any device
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- WHAT YOU GET --- */}
      <section className="bg-[#0F172A] py-16 border-b-2 border-[#333]">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '12', label: 'Chapters' },
            { value: '60+', label: 'Techniques' },
            { value: '∞', label: 'Lifetime Access' },
            { value: '📱', label: 'Mobile Ready' },
          ].map((stat, i) => (
            <div key={i}>
              <div className="font-display text-3xl md:text-4xl text-[#DC2626]">{stat.value}</div>
              <div className="font-body text-sm text-[#FFFFFF]/60 uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FULL CURRICULUM --- */}
      <section className="py-24 px-6 bg-[#FFFFFF] text-[#0F172A]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl uppercase leading-none text-[#0F172A] mb-4">
            What's Inside<br /><span className="text-[#DC2626]">The Blueprint</span>
          </h2>
          <p className="text-lg text-[#0F172A]/70 leading-relaxed mb-12 max-w-2xl">
            This isn't random drills from the internet. It's a structured 12-chapter system designed the way real boxing gyms teach — simple movements, clear structure, repetition with purpose.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {chapters.map((ch, i) => (
              <div key={i} className="flex items-start gap-4 bg-white p-4 border-2 border-[#0F172A] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="bg-[#DC2626] text-white p-2 rounded-sm flex-shrink-0 mt-0.5">
                  <ch.icon size={18} />
                </div>
                <div>
                  <span className="font-display text-sm uppercase tracking-wide block">Ch. {i + 1}: {ch.title}</span>
                  <span className="font-body text-sm text-[#0F172A]/60">{ch.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              onClick={handleCheckout}
              disabled={isLoading}
              className="bg-[#0F172A] hover:bg-[#0F172A]/90 text-white text-lg px-10 py-6 uppercase tracking-widest disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Get Instant Access — $49'}
            </Button>
          </div>
        </div>
      </section>

      {/* --- PRICE & OFFER --- */}
      <section className="py-24 px-6 bg-[#050505] text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="font-display text-4xl md:text-6xl uppercase text-white">
            Start Training<br /><span className="text-[#DC2626]">Like A Fighter</span>
          </h2>
          <p className="text-xl text-[#FFFFFF]/60 max-w-2xl mx-auto">
            One purchase. No subscriptions. No upsells. Just the complete system.
          </p>

          <div className="bg-[#0F172A] border border-[#333] p-12 max-w-2xl mx-auto relative overflow-hidden group hover:border-[#DC2626] transition-colors">
            <div className="text-5xl md:text-6xl font-display text-white mb-2">
              $49
            </div>
            <p className="text-[#FFFFFF]/40 uppercase tracking-widest text-sm mb-8">One-time payment • Lifetime Access</p>

            <ul className="text-left space-y-3 mb-8 text-[#FFFFFF]/80 max-w-sm mx-auto">
              <li className="flex gap-3"><Check className="text-[#DC2626] flex-shrink-0 mt-0.5" /> 12-chapter interactive digital ebook</li>
              <li className="flex gap-3"><Check className="text-[#DC2626] flex-shrink-0 mt-0.5" /> Video demonstrations via Instagram</li>
              <li className="flex gap-3"><Check className="text-[#DC2626] flex-shrink-0 mt-0.5" /> Built-in training log & progress tracker</li>
              <li className="flex gap-3"><Check className="text-[#DC2626] flex-shrink-0 mt-0.5" /> Download as PDF anytime</li>
              <li className="flex gap-3"><Check className="text-[#DC2626] flex-shrink-0 mt-0.5" /> Access on phone, tablet, or desktop</li>
            </ul>

            <Button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full bg-[#DC2626] hover:bg-[#A13442] py-6 text-xl uppercase tracking-widest disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Get Instant Access'}
            </Button>

            <div className="flex items-center justify-center gap-2 mt-4 text-[#FFFFFF]/30">
              <Shield size={14} />
              <span className="text-xs uppercase tracking-wider">Secure checkout via Stripe</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="py-12 bg-[#DC2626] text-center">
        <p className="font-display text-[#050505] text-xl uppercase">
          Built by a real coach. For real fighters.
        </p>
      </section>
    </div>
  );
};

export default BlueprintSalesPage;
