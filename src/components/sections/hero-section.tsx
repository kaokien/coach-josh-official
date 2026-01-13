'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Download, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assumes utility exists

// Local Component: Video Background
const VideoBackground = () => (
  <div className="absolute inset-0 z-0 h-full w-full overflow-hidden border-b-2 border-[#1A1A1A]">
    <div className="absolute inset-0 z-10 bg-[#4A6FA5]/20 mix-blend-multiply" />
    <div className="absolute inset-0 z-10 bg-[#F2E8DC]/80 mix-blend-screen opacity-50" />
    <video
      autoPlay
      loop
      muted
      playsInline
      className="h-full w-full object-cover grayscale contrast-125 sepia-[0.3]"
    >
      <source src="https://cdn.jwplayer.com/videos/uYbXkdXO-IihQ47zp.mp4" type="video/mp4" />
    </video>
  </div>
);

// Local Component: Button (can be imported from ui/button if you standardize it later)
const HeroButton = ({ children, variant = 'primary', className, ...props }: any) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={cn(
      "group relative flex items-center justify-center gap-3 border-2 font-bold uppercase tracking-widest transition-all duration-300 px-8 py-5 text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
      variant === 'primary' && "bg-[#4A6FA5] border-[#1A1A1A] text-white hover:bg-[#4A6FA5]/90",
      variant === 'outline' && "bg-transparent border-[#1A1A1A] text-[#1A1A1A] hover:bg-white",
      className
    )}
    {...props}
  >
    <span className="relative z-10 flex items-center gap-2">{children}</span>
  </motion.button>
);

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[90vh] flex-col justify-between overflow-hidden px-6 pt-32 pb-12 md:px-12">
      <VideoBackground />

      <div className="relative z-30 mt-12">
        <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="font-display text-[12vw] md:text-[10vw] leading-[0.85] tracking-tighter text-[#1A1A1A] drop-shadow-[0_4px_4px_rgba(255,255,255,0.5)]">
            <span className="block mb-4 md:mb-8 text-[6vw] md:text-[4vw]">
              COACH JOSH OFFICIAL
            </span>
            FIGHT IQ <br />
            <span className="text-[#4A6FA5] text-stroke-white">UNLOCKED</span>
          </h1>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-col gap-6 mt-8">
          <div className="inline-flex items-center gap-2 border-2 border-[#1A1A1A] bg-[#D1495B] px-4 py-2 font-display text-sm font-bold uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-fit">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse"></span>
            Certified Boxing Coach
          </div>
          
          <p className="font-body text-xl md:text-2xl font-bold text-[#1A1A1A] max-w-2xl leading-relaxed bg-[#F2E8DC]/80 backdrop-blur-sm p-2 border-l-4 border-[#4A6FA5]">
            Stop throwing arm punches. Master the slip, the shift, and the science of striking. Technical drills from the 50M+ view TikTok archive.
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <Link href="#free">
              <HeroButton variant="primary">
                Get Free Week <Download size={18} />
              </HeroButton>
            </Link>
            <Link href="#programs">
              <HeroButton variant="outline">
                View Programs <ArrowUpRight size={18} />
              </HeroButton>
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="relative z-30 mt-12 flex flex-wrap gap-12 border-t-2 border-[#1A1A1A] pt-8">
        <div>
            <div className="font-display text-5xl text-[#4A6FA5]">50M+</div>
            <div className="font-body text-xs font-bold uppercase tracking-widest text-[#1A1A1A]">TikTok Views</div>
        </div>
        <div>
            <div className="font-display text-5xl text-[#4A6FA5]">100+</div>
            <div className="font-body text-xs font-bold uppercase tracking-widest text-[#1A1A1A]">Fighters Trained</div>
        </div>
        <div>
            <div className="font-display text-5xl text-[#4A6FA5]">4.9★</div>
            <div className="font-body text-xs font-bold uppercase tracking-widest text-[#1A1A1A]">Average Rating</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
