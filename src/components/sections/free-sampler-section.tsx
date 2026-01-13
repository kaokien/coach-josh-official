'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Check, Target, Zap, Shield, Clock, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assumes utility exists

// Reusing Button Logic locally
const SubmitButton = ({ children, disabled, className, ...props }: any) => (
  <motion.button
    whileHover={{ scale: disabled ? 1 : 1.02 }}
    whileTap={{ scale: disabled ? 1 : 0.98 }}
    disabled={disabled}
    className={cn(
      "group relative flex items-center justify-center gap-3 border-2 border-[#1A1A1A] font-bold uppercase tracking-widest transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-8 py-5 text-lg bg-[#D1495B] text-white hover:bg-[#D1495B]/90 disabled:opacity-50 disabled:cursor-not-allowed",
      className
    )}
    {...props}
  >
    <span className="relative z-10 flex items-center gap-2">{children}</span>
  </motion.button>
);

// ✅ FIXED: Correct Named Export Syntax
export function FreeSamplerSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'free_sampler' }),
      });
      
      if (res.ok) {
        setSuccess(true);
        
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="free" className="relative border-t-2 border-[#1A1A1A] bg-[#1A1A1A] px-6 py-24 md:px-12">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-6 inline-flex items-center gap-2 border-2 border-[#4A6FA5] bg-[#4A6FA5]/20 px-4 py-2 font-display text-sm font-bold uppercase tracking-widest text-[#4A6FA5]">
            <Download size={16} /> Free Download
          </div>
          
          <h2 className="font-display text-5xl md:text-7xl uppercase text-white leading-none">
            Get Week 1<br />
            <span className="text-[#4A6FA5]">Free</span>
          </h2>
          
          <p className="font-body mt-6 text-xl text-white/80 max-w-2xl mx-auto">
            Try the Fighter's 4X Blueprint — completely free. Get the full Week 1 program with all 4 training days, warm-up protocol, and exercise guides.
          </p>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            {[
              { icon: Target, text: 'Day 1: Lower Body Power' },
              { icon: Zap, text: 'Day 2: Upper Body Rotation' },
              { icon: Shield, text: 'Day 3: Posterior Chain' },
              { icon: Clock, text: 'Day 4: Conditioning' },
            ].map((item, i) => (
              <div key={i} className="border-2 border-white/20 bg-white/5 p-4">
                <item.icon size={24} className="text-[#4A6FA5] mb-2" />
                <div className="font-body text-sm text-white/80">{item.text}</div>
              </div>
            ))}
          </div>
          
          {success ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-12 border-4 border-[#4A6FA5] bg-[#4A6FA5]/20 p-8"
            >
              <div className="flex items-center justify-center gap-3 text-[#4A6FA5]">
                <Check size={32} />
                <span className="font-display text-3xl uppercase">You're In!</span>
              </div>
              <p className="font-body mt-4 text-white/80">Check your email for the download link.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-12 flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 border-2 border-white bg-white/10 px-6 py-5 font-body text-white placeholder:text-white/50 focus:outline-none focus:border-[#4A6FA5]"
              />
              <SubmitButton 
                type="submit" 
                disabled={loading}
                className="whitespace-nowrap"
              >
                {loading ? 'Sending...' : 'Get Free Week'} <ArrowUpRight size={18} />
              </SubmitButton>
            </form>
          )}
          
          <p className="font-body mt-4 text-sm text-white/50">
            No spam. Unsubscribe anytime. We'll also send you training tips.
          </p>
        </motion.div>
      </div>
    </section>
  );
}