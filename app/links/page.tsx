'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  ExternalLink,
  Zap,
  Trophy,
  Instagram,
  Youtube,
  Crown,
  LucideIcon,
  Flame,
  MapPin,
  Video,
  ArrowRight,
  BookOpen,
  ShoppingBag,
  Tv,
  Mail,
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
type IconComponent = LucideIcon | React.ComponentType<{ className?: string; size?: number }>;

const LinkButton = ({
  children,
  href,
  variant = 'default',
  icon: Icon,
  subtext,
  badge,
  noNewTab,
  featured,
}: {
  children: React.ReactNode;
  href: string;
  variant?: 'default' | 'primary' | 'accent' | 'outline' | 'tiktok' | 'instagram' | 'youtube' | 'discord' | 'dark';
  icon?: IconComponent;
  subtext?: string;
  badge?: string;
  noNewTab?: boolean;
  featured?: boolean;
}) => {
  const isExternal = href.startsWith('http') || href.startsWith('mailto');

  const baseStyles = "relative group flex w-full items-center justify-between border-2 border-[#0F172A] px-5 py-4 transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none";

  const variants = {
    default: "bg-white text-[#0F172A]",
    primary: "bg-[#2563EB] text-white hover:bg-[#1d4ed8]",
    accent: "bg-[#DC2626] text-white hover:bg-[#b91c1c]",
    outline: "bg-transparent text-[#0F172A] hover:bg-white/60",
    dark: "bg-[#0F172A] text-white hover:bg-[#1e293b]",
    tiktok: "bg-[#000000] text-white hover:bg-[#0F172A]",
    instagram: "bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] text-white hover:opacity-90",
    youtube: "bg-[#FF0000] text-white hover:bg-[#CC0000]",
    discord: "bg-[#5865F2] text-white hover:bg-[#4752C4]",
  };

  const iconBg = ['primary', 'accent', 'dark', 'tiktok', 'discord'].includes(variant)
    ? "bg-white/15 text-white border-white/20"
    : variant === 'instagram' || variant === 'youtube'
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
        {/* Design spell: arrow slides in on hover instead of static external link icon */}
        <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
      </div>
    </>
  );

  // Featured links get a subtle pulsing border glow (design spell: attention magnet)
  const featuredClass = featured
    ? "ring-2 ring-[#CCFF00]/50 ring-offset-1 ring-offset-white animate-[glow_2s_ease-in-out_infinite]"
    : "";

  if (isExternal) {
    return (
      <a href={href} target={noNewTab || href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" className={cn(baseStyles, variants[variant], featuredClass)}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(baseStyles, variants[variant], featuredClass)}>
      {content}
    </Link>
  );
};

// Social icon with hover scale (design spell: playful micro-interaction)
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
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    whileHover={{ scale: 1.1, rotate: -3 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 15 }}
    className={cn(
      "group flex h-11 w-11 items-center justify-center border-2 border-[#0F172A] bg-white text-[#0F172A] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-colors duration-200",
      hoverColor
    )}
  >
    <Icon size={18} className="w-[18px] h-[18px]" />
  </motion.a>
);

// --- MAIN PAGE ---
export default function LinksPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    show: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const }
    }
  };

  // Header entrance — slides down from above
  const headerAnim = {
    hidden: { opacity: 0, y: -30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } }
  };

  return (
    <main className="relative min-h-screen w-full bg-[#FFFFFF] font-sans selection:bg-[#2563EB] selection:text-white flex flex-col items-center">
      <noscript>
        <style>{`.links-container, .links-header { opacity: 1 !important; transform: none !important; }`}</style>
      </noscript>

      {/* Custom keyframes for featured glow */}
      <style jsx global>{`
        @keyframes glow {
          0%, 100% { box-shadow: 4px 4px 0px 0px rgba(0,0,0,1), 0 0 0 2px rgba(204,255,0,0.3); }
          50% { box-shadow: 4px 4px 0px 0px rgba(0,0,0,1), 0 0 0 4px rgba(204,255,0,0.6); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Brutalist grid background */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,#0F172A 0px,#0F172A 1px,transparent 1px,transparent 80px),repeating-linear-gradient(90deg,#0F172A 0px,#0F172A 1px,transparent 1px,transparent 80px)',
        }}
      />

      {/* ═══════════ HEADER CARD ═══════════ */}
      <motion.div
        variants={headerAnim}
        initial="hidden"
        animate="show"
        className="links-header w-full bg-[#0F172A] border-b-4 border-[#2563EB]"
      >
        <div className="max-w-md mx-auto px-4 py-8">
          <div className="flex items-center gap-5">
            {/* Avatar — brutalist square with red accent */}
            <div className="relative shrink-0">
              <div className="absolute -top-1.5 -right-1.5 w-full h-full bg-[#DC2626] z-0" />
              <div className="relative z-10 h-20 w-20 border-3 border-[#0F172A] overflow-hidden">
                <Image
                  src="/coach-josh-avatar.jpg"
                  alt="Coach Josh"
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Name + bio — left-aligned */}
            <div>
              <h1 className="font-display text-2xl uppercase tracking-wider text-white leading-none">Coach Josh</h1>
              <p className="font-body text-xs font-bold text-white/40 mt-1 uppercase tracking-widest">Boxing Coach · Creator · CT</p>
              {/* Social row */}
              <div className="flex items-center gap-2 mt-3">
                <SocialIcon href="https://www.tiktok.com/@coachjoshofficial" icon={TikTokIcon} label="TikTok" hoverColor="hover:bg-black hover:text-white hover:border-white/40" />
                <SocialIcon href="https://instagram.com/coachjoshofficial" icon={Instagram} label="Instagram" hoverColor="hover:bg-[#E1306C] hover:text-white hover:border-white/40" />
                <SocialIcon href="https://youtube.com/@coachjoshofficial?si=6dbXONGnIDN8VNuV" icon={Youtube} label="YouTube" hoverColor="hover:bg-[#FF0000] hover:text-white hover:border-white/40" />
                <SocialIcon href="https://discord.gg/Vhygw7DpVM" icon={DiscordIcon} label="Discord" hoverColor="hover:bg-[#5865F2] hover:text-white hover:border-white/40" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ═══════════ LINKS CONTAINER ═══════════ */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="links-container relative z-10 w-full max-w-md px-4 py-6 space-y-3"
      >

        {/* ─── BUSINESS INQUIRIES ─── */}
        <motion.div variants={item}>
          <a
            href="mailto:COACHJOSHOFFICIAL@PLAYERSCLUBLLC.COM"
            className="group flex items-center gap-3 w-full border-2 border-[#0F172A] bg-[#0F172A] px-5 py-4 transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 bg-white/15 text-white border-white/20 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)]">
              <Mail size={18} />
            </div>
            <div className="text-left">
              <div className="font-display text-sm uppercase tracking-wider text-white leading-tight">Business Inquiries</div>
              <div className="font-body text-xs font-bold text-[#CCFF00] mt-0.5 tracking-wide">COACHJOSHOFFICIAL@PLAYERSCLUBLLC.COM</div>
            </div>
          </a>
        </motion.div>

        {/* ─── SECTION: FLAGSHIP PRODUCT (Above the fold) ─── */}
        <motion.div variants={item} className="pt-2">
          <div className="font-body text-[10px] font-bold text-[#0F172A]/40 uppercase tracking-[0.2em] mb-2 px-1">Flagship Program</div>
          <div className="space-y-3">
            <LinkButton
              href="https://coachjosh1.gumroad.com/l/opdee"
              variant="primary"
              icon={Video}
              badge="New"
              featured
            >
              Boxing Blueprint Video Course
            </LinkButton>
          </div>
        </motion.div>

        {/* ─── SECTION: ONLINE COACHING ─── */}
        <motion.div variants={item} className="pt-4">
          <div className="font-body text-[10px] font-bold text-[#0F172A]/40 uppercase tracking-[0.2em] mb-2 px-1">Online Coaching</div>
          <div className="space-y-3">
            <LinkButton
              href="https://form.typeform.com/to/kBg1xSHF"
              variant="dark"
              icon={Crown}
              badge="Premium"
            >
              Online Coaching
            </LinkButton>
          </div>
        </motion.div>

        {/* ─── SECTION: BOXING WIKI ─── */}
        <motion.div variants={item} className="pt-4">
          <div className="font-body text-[10px] font-bold text-[#0F172A]/40 uppercase tracking-[0.2em] mb-2 px-1">Boxing Wiki</div>
          <div className="space-y-3">
            <LinkButton
              href="https://boxingwiki.org/?utm_source=coachjosh&utm_medium=link-in-bio&utm_campaign=free_resources"
              variant="dark"
              icon={BookOpen}
              badge="New"
              featured
            >
              BoxingWiki — Free Boxing Encyclopedia (BETA)
            </LinkButton>
          </div>
        </motion.div>

          {/* ─── SECTION: JOSH'S PICKS (Affiliate — FTC Compliant) ─── */}
        <motion.div variants={item} className="pt-4">
          <div className="font-body text-[10px] font-bold text-[#0F172A]/40 uppercase tracking-[0.2em] mb-2 px-1">Josh&apos;s Picks</div>
          <div className="space-y-3">
            <LinkButton
              href="https://leadboxing.com/?utm_source=coachjosh&utm_medium=link-in-bio&utm_campaign=gear"
              variant="accent"
              icon={ShoppingBag}
              badge="Affiliate"
              featured
            >
              Lead Boxing — My Go-To Gear
            </LinkButton>

            <LinkButton
              href="https://www.dazn.com/en-US/welcome?app_clickref=1100lD9P4W3k&utm_source=affiliate&utm_medium=coachjoshofficial&utm_campaign=campaign&utm_term=term&utm_content=1100l430856%7C1100lD9P4W3k%7Ccoachjoshofficial&gad_source=7&dclid=CNXzutzHoJUDFZoQaAgdR6M9SA&fbclid=PAVERFWASpCIhleHRuA2FlbQIxMABzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAadtAPE4RArIvFO_q-KicU-vXyQhOvzuZy0Tf_9C8tjT5PUA-Lz1yB1V_H7iHQ_aem_6A8bf0aPun89LhFt9_o_Hw"
              variant="dark"
              icon={Tv}
              badge="Affiliate"
            >
              DAZN — Watch Live Boxing
            </LinkButton>
          </div>
          <p className="font-body text-xs text-[#0F172A]/60 mt-3 px-1 leading-relaxed">
            These are affiliate links — I may earn a commission at no extra cost to you. It directly supports the free content I create. Thank you! 🥊
          </p>
        </motion.div>

        {/* ─── SECTION: PROVEN COLLABORATIONS ─── */}
        <motion.div variants={item} className="pt-4">
          <div className="font-body text-[10px] font-bold text-[#0F172A]/40 uppercase tracking-[0.2em] mb-2 px-1">Proven Collaborations</div>
          <div className="space-y-3">
            <LinkButton
              href="/ugc"
              variant="outline"
              icon={Zap}
            >
              Proven Collaborations
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
            >
              Striking Blueprint
            </LinkButton>
          </div>
        </motion.div>

        {/* ─── SECTION: FREE RESOURCES ─── */}
        <motion.div variants={item} className="pt-4">
          <div className="font-body text-[10px] font-bold text-[#0F172A]/40 uppercase tracking-[0.2em] mb-2 px-1">Free Resources</div>
          <div className="space-y-3">
            <LinkButton
              href="https://discord.gg/Vhygw7DpVM"
              variant="discord"
              icon={DiscordIcon}
              badge="Free"
            >
              Training Discord
            </LinkButton>

            <LinkButton
              href="https://www.youtube.com/watch?v=M4uyfBR7H1I"
              variant="youtube"
              icon={Youtube}
              badge="Free"
            >
              Boxing Warm-Up Video
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
              noNewTab
            >
              Coach Josh Boxing Gym
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
