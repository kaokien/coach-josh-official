'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink, Zap, Trophy, Shield, Star, Instagram, Youtube, Video } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- UTILS ---
function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

// --- ICONS (Custom TikTok SVG) ---
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.03 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.35-1.17 1.09-1.07 1.93.03.58.49 1.15 1.07 1.25.74.22 1.56.04 2.16-.42.61-.44 1.05-1.19 1.05-1.95.03-5.83.01-11.66.01-17.5h4.04z" />
  </svg>
);

// --- COMPONENTS ---
const PaperTexture = () => (
  <div className=\"pointer-events-none fixed inset-0 z-50 opacity-[0.4] mix-blend-multiply\">
    <svg className=\"h-full w-full\">
      <filter id=\"paper\">
        <feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\" />
        <feColorMatrix type=\"saturate\" values=\"0\" />
      </filter>
      <rect width=\"100%\" height=\"100%\" filter=\"url(#paper)\" />
    </svg>
  </div>
);

const LinkButton = ({ 
  children, 
  href, 
  variant = 'default',
  icon: Icon,
  subtext
}: { 
  children: React.ReactNode; 
  href: string; 
  variant?: 'default' | 'primary' | 'outline' | 'tiktok' | 'instagram' | 'youtube';
  icon?: any;
  subtext?: string;
}) => {
  const isExternal = href.startsWith('http');
  
  const baseStyles = "relative group flex w-full items-center justify-between border-2 border-[#1A1A1A] px-6 py-4 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]";
  
  const variants = {
    default: "bg-white text-[#1A1A1A] hover:bg-[#F2E8DC]",
    primary: "bg-[#4A6FA5] text-white hover:bg-[#4A6FA5]/90",
    outline: "bg-transparent text-[#1A1A1A] hover:bg-white",
    tiktok: "bg-[#000000] text-white hover:bg-[#222]",
    instagram: "bg-[#E1306C] text-white hover:bg-[#C13584]",
    youtube: "bg-[#FF0000] text-white hover:bg-[#CC0000]",
  };

  const Content = () => (
    <>
      <div className="flex items-center gap-4">
        {Icon && (
          <div className={cn(
            "flex h-10 w-10 items-center justify-center border-2 border-[#1A1A1A] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
            variant === 'primary' ? "bg-[#1A1A1A] text-white" : "bg-white text-[#1A1A1A]"
          )}>
            <Icon size={20} />
          </div>
        )}
        <div className="text-left">
          <div className="font-display text-lg uppercase tracking-wider leading-none">{children}</div>
          {subtext && <div className="font-body text-xs font-bold opacity-80 mt-1">{subtext}</div>}
        </div>
      </div>
      <ExternalLink size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" />
    </>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn(baseStyles, variants[variant])}>
        <Content />
      </a>
    );
  }

  return (
    <Link href={href} className={cn(baseStyles, variants[variant])}>
      <Content />
    </Link>
  );
};

// --- MAIN PAGE ---
export default function LinksPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <main className="relative min-h-screen w-full bg-[#F2E8DC] px-4 py-12 font-sans selection:bg-[#4A6FA5] selection:text-white flex flex-col items-center justify-center">
      {/* GLOBAL FONTS (Just in case) */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Courier+Prime:wght@400;700&display=swap');
        .font-display { font-family: 'Oswald', sans-serif; }
        .font-body { font-family: 'Courier Prime', monospace; }
      `}</style>
      
      <PaperTexture />

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-md space-y-4"
      >
        {/* HEADER */}
        <motion.div variants={item} className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#1A1A1A] bg-[#4A6FA5] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="font-display text-3xl text-white">CJ</span>
          </div>
          <h1 className="font-display text-4xl uppercase tracking-wider text-[#1A1A1A]">Coach Josh</h1>
          <p className="font-body text-sm font-bold text-[#1A1A1A]/60">Fight IQ • Boxing • Performance</p>
        </motion.div>

        {/* MARQUEE STRIP */}
        <motion.div variants={item} className="w-full overflow-hidden border-2 border-[#1A1A1A] bg-[#1A1A1A] py-2 mb-8">
           <div className="font-body text-xs text-white text-center uppercase tracking-[0.2em] animate-pulse">
              Open for Training Applications
           </div>
        </motion.div>

        {/* PRIMARY LINKS */}
        <motion.div variants={item} className="space-y-4">
          <LinkButton 
            href="/cornerman" 
            variant="primary" 
            icon={Shield} 
            subtext="Join the VIP Team • $29/mo"
          >
            Corner Man
          </LinkButton>
          
          <LinkButton 
            href="/#programs" 
            variant="default" 
            icon={Trophy} 
            subtext="Digital Guide • One-time"
          >
            Striking Blueprint
          </LinkButton>

          <LinkButton 
            href="/#free" 
            variant="outline" 
            icon={Zap} 
            subtext="Download PDF"
          >
            Free Week 1 Sampler
          </LinkButton>
        </motion.div>

        {/* DIVIDER */}
        <motion.div variants={item} className="py-4 flex items-center gap-4">
          <div className="h-[2px] flex-1 bg-[#1A1A1A]/10"></div>
          <span className="font-display text-sm text-[#1A1A1A]/40 uppercase">Socials</span>
          <div className="h-[2px] flex-1 bg-[#1A1A1A]/10"></div>
        </motion.div>

        {/* SOCIAL LINKS */}
        <motion.div variants={item} className="space-y-3">
          <LinkButton 
            href="https://www.tiktok.com/@coachjoshofficial" 
            variant="tiktok" 
            icon={TikTokIcon}
          >
            TikTok
          </LinkButton>
          
          <LinkButton 
            href="https://instagram.com/coachjoshofficial" 
            variant="instagram" 
            icon={Instagram}
          >
            Instagram
          </LinkButton>
          
          <LinkButton 
            href="https://youtube.com/@Coachjoshofficial" 
            variant="youtube" 
            icon={Youtube}
          >
            YouTube
          </LinkButton>
        </motion.div>

        {/* FOOTER */}
        <motion.div variants={item} className="pt-8 text-center">
          <Link href="/" className="font-body text-xs font-bold text-[#1A1A1A]/40 hover:text-[#4A6FA5] transition-colors">
            © 2026 COACH JOSH OFFICIAL
          </Link>
        </motion.div>

      </motion.div>
    </main>
  );
}
