'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  ExternalLink,
  Zap,
  Trophy,
  Shield,
  Instagram,
  Youtube,
  Mail,
  Dumbbell,
  Crown,
  LucideIcon,
  Flame,
  MapPin,
  Video,
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- UTILS ---
function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

// --- ICONS ---
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.03 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.35-1.17 1.09-1.07 1.93.03.58.49 1.15 1.07 1.25.74.22 1.56.04 2.16-.42.61-.44 1.05-1.19 1.05-1.95.03-5.83.01-11.66.01-17.5h4.04z" />
  </svg>
);

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
  </svg>
);

// --- COMPONENTS ---
const PaperTexture = () => (
  <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.3] mix-blend-multiply">
    <svg className="h-full w-full">
      <filter id="paper">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#paper)" />
    </svg>
  </div>
);

type IconComponent = LucideIcon | React.ComponentType<{ className?: string; size?: number }>;

const LinkButton = ({
  children,
  href,
  variant = 'default',
  icon: Icon,
  subtext,
  badge,
  noNewTab,
}: {
  children: React.ReactNode;
  href: string;
  variant?: 'default' | 'primary' | 'accent' | 'outline' | 'tiktok' | 'instagram' | 'youtube' | 'discord' | 'dark';
  icon?: IconComponent;
  subtext?: string;
  badge?: string;
  noNewTab?: boolean;
}) => {
  const isExternal = href.startsWith('http') || href.startsWith('mailto');

  const baseStyles = "relative group flex w-full items-center justify-between border-2 border-[#0F172A] px-5 py-4 transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none";

  const variants = {
    default: "bg-white text-[#0F172A] hover:bg-[#FFFFFF]",
    primary: "bg-[#2563EB] text-white hover:bg-[#3D5E8C]",
    accent: "bg-[#DC2626] text-white hover:bg-[#B83A4B]",
    outline: "bg-transparent text-[#0F172A] hover:bg-white/60",
    dark: "bg-[#0F172A] text-white hover:bg-[#333]",
    tiktok: "bg-[#000000] text-white hover:bg-[#0F172A]",
    instagram: "bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] text-white hover:opacity-90",
    youtube: "bg-[#FF0000] text-white hover:bg-[#CC0000]",
    discord: "bg-[#5865F2] text-white hover:bg-[#4752C4]",
  };

  const iconBg = ['primary', 'accent', 'dark', 'tiktok', 'discord'].includes(variant)
    ? "bg-white/15 text-white border-white/20"
    : variant === 'instagram'
      ? "bg-white/20 text-white border-white/20"
      : variant === 'youtube'
        ? "bg-white/20 text-white border-white/20"
        : "bg-[#FFFFFF] text-[#0F172A] border-[#0F172A]";

  const content = (
    <>
      <div className="flex items-center gap-4">
        {Icon && (
          <div className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center border-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)]",
            iconBg
          )}>
            <Icon size={18} className="w-[18px] h-[18px]" />
          </div>
        )}
        <div className="text-left min-w-0">
          <div className="font-display text-base uppercase tracking-wider leading-tight">{children}</div>
          {subtext && <div className="font-body text-[11px] font-bold opacity-70 mt-0.5 leading-tight">{subtext}</div>}
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {badge && (
          <span className="font-body text-[10px] font-bold uppercase bg-[#CCFF00] text-[#0F172A] px-2 py-0.5 border border-[#0F172A]">
            {badge}
          </span>
        )}
        <ExternalLink size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
      </div>
    </>
  );

  if (isExternal) {
    return (
      <a href={href} target={noNewTab || href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" className={cn(baseStyles, variants[variant])}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(baseStyles, variants[variant])}>
      {content}
    </Link>
  );
};

// Social icon (compact row)
const SocialIcon = ({
  href,
  icon: Icon,
  label,
  hoverColor,
}: {
  href: string;
  icon: IconComponent;
  label: string;
  hoverColor: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className={cn(
      "group flex h-12 w-12 items-center justify-center border-2 border-[#0F172A] bg-white text-[#0F172A] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]",
      hoverColor
    )}
  >
    <Icon size={20} className="w-5 h-5" />
  </a>
);

// --- MAIN PAGE ---
export default function LinksPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } }
  };

  return (
    <main className="relative min-h-screen w-full bg-[#FFFFFF] px-4 py-10 font-sans selection:bg-[#2563EB] selection:text-white flex flex-col items-center">
      <PaperTexture />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-md space-y-3"
      >
        {/* ─── HEADER ─── */}
        <motion.div variants={item} className="text-center mb-6">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#0F172A] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <Image src="https://ugc.production.linktr.ee/be347d5a-4172-4598-b34d-491936b0903f_IMG-5129.jpeg?io=true&size=avatar-v3_0" alt="Coach Josh" width={96} height={96} className="object-cover w-full h-full" />
          </div>
          <h1 className="font-display text-4xl uppercase tracking-wider text-[#0F172A]">Coach Josh</h1>
          <p className="font-body text-sm font-bold text-[#0F172A]/50 mt-1">Professional Boxing Coach • CT Based</p>

          {/* Compact social row — right under the bio */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <SocialIcon href="https://www.tiktok.com/@coachjoshofficial" icon={TikTokIcon} label="TikTok" hoverColor="hover:bg-black hover:text-white" />
            <SocialIcon href="https://instagram.com/coachjoshofficial" icon={Instagram} label="Instagram" hoverColor="hover:bg-[#E1306C] hover:text-white" />
            <SocialIcon href="https://youtube.com/@coachjoshofficial?si=6dbXONGnIDN8VNuV" icon={Youtube} label="YouTube" hoverColor="hover:bg-[#FF0000] hover:text-white" />
            <SocialIcon href="https://discord.com/invite/3GWkKcAjx2" icon={DiscordIcon} label="Discord" hoverColor="hover:bg-[#5865F2] hover:text-white" />
          </div>
        </motion.div>

        {/* ─── STATUS STRIP ─── */}
        <motion.div variants={item} className="w-full overflow-hidden border-2 border-[#0F172A] bg-[#0F172A] py-2 mb-2">
          <div className="font-body text-[11px] text-[#CCFF00] text-center uppercase tracking-[0.25em] flex items-center justify-center gap-2">
            <Flame size={12} className="animate-pulse" />
            Now Accepting Training Applications
            <Flame size={12} className="animate-pulse" />
          </div>
        </motion.div>

        {/* ─── SECTION: FREE RESOURCES (lowest barrier → highest engagement) ─── */}
        <motion.div variants={item} className="pt-2">
          <div className="font-body text-[10px] font-bold text-[#0F172A]/40 uppercase tracking-[0.2em] mb-2 px-1">Free Resources</div>
          <div className="space-y-3">
            <LinkButton
              href="https://discord.gg/ejqX7qNr"
              variant="discord"
              icon={DiscordIcon}
              subtext="Join 400+ fighters training together"
              badge="Free"
            >
              Training Discord
            </LinkButton>

            <LinkButton
              href="https://www.youtube.com/watch?v=M4uyfBR7H1I"
              variant="youtube"
              icon={Youtube}
              subtext="The Warm-Up Routine Champions Use • Free"
              badge="Free"
            >
              Boxing Warm-Up Video
            </LinkButton>
          </div>
        </motion.div>

        {/* ─── SECTION: PROGRAMS ─── */}
        <motion.div variants={item} className="pt-4">
          <div className="font-body text-[10px] font-bold text-[#0F172A]/40 uppercase tracking-[0.2em] mb-2 px-1">Programs</div>
          <div className="space-y-3">
            <LinkButton
              href="https://www.coachjoshofficial.com/#programs"
              variant="default"
              icon={Trophy}
              subtext="Interactive PDF eBook • 11 chapters • $49"
            >
              Striking Blueprint
            </LinkButton>

            <LinkButton
              href="https://coachjosh1.gumroad.com/l/opdee"
              variant="primary"
              icon={Video}
              subtext="4-Part video course • Boxing fundamentals • $197"
              badge="New"
            >
              Boxing Blueprint Video Course
            </LinkButton>

            <LinkButton
              href="https://calendly.com/mais-joshua/training-session?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=ccff00"
              variant="dark"
              icon={Crown}
              subtext="Includes Blueprint + Video Course • $497/mo"
              badge="Premium"
            >
              Elite 1:1 Coaching
            </LinkButton>
          </div>
        </motion.div>

        {/* ─── SECTION: GYM ─── */}
        <motion.div variants={item} className="pt-4">
          <div className="font-body text-[10px] font-bold text-[#0F172A]/40 uppercase tracking-[0.2em] mb-2 px-1">In-Person</div>
          <div className="space-y-3">
            <LinkButton
              href="https://coachjoshboxing.com"
              variant="accent"
              icon={MapPin}
              subtext="Hamden, CT • 55 Connolly Pkwy"
              noNewTab
            >
              Coach Josh Boxing Gym
            </LinkButton>
          </div>
        </motion.div>

        {/* ─── SECTION: COACHING & BUSINESS ─── */}
        <motion.div variants={item} className="pt-4">
          <div className="font-body text-[10px] font-bold text-[#0F172A]/40 uppercase tracking-[0.2em] mb-2 px-1">Coaching & Business</div>
          <div className="space-y-3">
            <LinkButton
              href="https://calendly.com/mais-joshua/training-session?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=ccff00"
              variant="dark"
              icon={Dumbbell}
              subtext="Online & in-person sessions available"
            >
              Level Up: Coaching
            </LinkButton>

            <LinkButton
              href="mailto:coachjoshofficial@playersclubllc.com"
              variant="outline"
              icon={Mail}
              subtext="coachjoshofficial@playersclubllc.com"
            >
              Partnerships & Collabs
            </LinkButton>
          </div>
        </motion.div>

        {/* ─── FOOTER ─── */}
        <motion.div variants={item} className="pt-8 pb-4 text-center">
          <Link href="/" className="font-body text-[11px] font-bold text-[#0F172A]/30 hover:text-[#2563EB] transition-colors uppercase tracking-wider">
            © 2026 Coach Josh Official
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
