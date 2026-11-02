'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Instagram,
  Youtube,
  Facebook,
  MapPin,
  BookOpen,
  ShoppingBag,
  Mail,
  ArrowUpRight,
  Play,
  Globe,
  Sparkles,
} from 'lucide-react';

// --- BRAND SOCIAL ICONS ---
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

// --- SIMPLIFIED COURSE CARD (Thumbnail + Title + Description + Price + Buy Now) ---
const CourseCard = ({
  href,
  title,
  description,
  price,
  thumbnail,
  ctaText = 'Buy now',
}: {
  href: string;
  title: string;
  description: string;
  price: string;
  thumbnail: string;
  ctaText?: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-4 sm:gap-5 rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)] transition-all duration-200 hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
  >
    {/* Square B&W Thumbnail */}
    <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-xl bg-slate-900">
      <Image
        src={thumbnail}
        alt={title}
        fill
        sizes="(max-width: 640px) 96px, 112px"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>

    {/* Course Info + Price + Clear Buy Now Button */}
    <div className="flex flex-1 min-w-0 flex-col justify-between">
      <div>
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#0F172A] leading-snug">
          {title}
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-3.5 flex items-center justify-between gap-3">
        <span className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-[#0F172A] leading-none">
          {price}
        </span>

        <span className="inline-flex items-center justify-center rounded-lg bg-[#0047FF] px-5 sm:px-6 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-[#0039CC]">
          {ctaText}
        </span>
      </div>
    </div>
  </a>
);

// --- CLEAN 1:1 COACHING CARD ---
const CoachingTierCard = ({
  href,
  title,
  cadence,
  description,
  price,
  popular,
}: {
  href: string;
  title: string;
  cadence: string;
  description: string;
  price: string;
  popular?: boolean;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`group flex flex-col justify-between rounded-2xl border p-4 sm:p-5 transition-all duration-200 ${
      popular
        ? 'border-[#0047FF]/30 bg-white shadow-[0_4px_16px_rgba(0,71,255,0.07)] hover:border-[#0047FF]/60'
        : 'border-slate-200/90 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.04)] hover:border-slate-300'
    }`}
  >
    <div>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#0F172A]">
          {title}
        </h3>
        <span
          className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
            popular
              ? 'bg-[#0047FF]/10 text-[#0047FF]'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          {cadence}
        </span>
      </div>
      <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>

    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
      <div className="flex items-baseline gap-1">
        <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0F172A]">
          {price}
        </span>
        <span className="text-xs font-medium text-slate-400">/month</span>
      </div>

      <span className="inline-flex items-center justify-center rounded-lg bg-[#0F172A] px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-colors group-hover:bg-[#0047FF]">
        Apply now
      </span>
    </div>
  </a>
);

// --- COMPACT RESOURCE ROW ---
const ResourceLink = ({
  href,
  title,
  subtitle,
  icon: Icon,
  internal,
}: {
  href: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  internal?: boolean;
}) => {
  const inner = (
    <>
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#0F172A] transition-colors group-hover:bg-[#0047FF]/10 group-hover:text-[#0047FF]">
          <Icon size={18} />
        </div>
        <div className="min-w-0">
          <div className="text-sm sm:text-base font-semibold text-[#0F172A] leading-snug">
            {title}
          </div>
          <div className="text-xs text-slate-500 mt-0.5 leading-snug">
            {subtitle}
          </div>
        </div>
      </div>
      <ArrowUpRight
        size={16}
        className="shrink-0 text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0047FF]"
      />
    </>
  );

  const classes =
    'group flex items-center justify-between gap-3 rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-4 shadow-[0_2px_8px_rgba(15,23,42,0.03)] transition-all duration-200 hover:border-slate-300 hover:shadow-[0_4px_14px_rgba(15,23,42,0.06)]';

  if (internal) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel="noopener noreferrer"
      className={classes}
    >
      {inner}
    </a>
  );
};

export default function LinksPage() {
  return (
    <main className="min-h-screen w-full bg-[#F8FAFC] text-[#0F172A] selection:bg-[#0047FF] selection:text-white flex flex-col items-center">
      <div className="w-full max-w-md px-4 pt-8 pb-16 sm:pt-10">
        {/* ═══════════ COMPACT BRAND HEADER ═══════════ */}
        <header className="text-center">
          <div className="inline-flex flex-col items-center">
            <span className="text-sm sm:text-base font-extrabold uppercase tracking-[0.18em] text-[#0F172A]">
              COACH JOSH
            </span>
            <span className="mt-1.5 h-1 w-12 rounded-full bg-[#B8F200]" />
          </div>

          <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
            Boxing courses
          </h1>
          <p className="mt-1.5 text-sm sm:text-base text-slate-500">
            Instant access. Lifetime access.
          </p>

          {/* Compact Social Proof & Icons */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500">
            <span className="font-medium text-slate-600">
              435K+ Followers · 150M+ Views
            </span>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-2.5 text-slate-500">
              <a
                href="https://www.tiktok.com/@coachjoshofficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="hover:text-[#0F172A] transition-colors"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/coachjoshofficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-[#E1306C] transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://youtube.com/@coachjoshofficial?si=6dbXONGnIDN8VNuV"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-[#FF0000] transition-colors"
              >
                <Youtube size={16} />
              </a>
              <a
                href="https://www.facebook.com/share/1FFdkDPKzM/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-[#1877F2] transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://discord.gg/Vhygw7DpVM"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="hover:text-[#5865F2] transition-colors"
              >
                <DiscordIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </header>

        {/* ═══════════ 1. COURSES FIRST (TOP PRIORITY) ═══════════ */}
        <section className="mt-7 space-y-3.5" aria-label="Boxing Courses">
          <CourseCard
            href="https://coachjosh1.gumroad.com/l/opdee"
            title="Boxing Blueprint"
            description="Master the fundamentals. 4 complete modules."
            price="$97"
            thumbnail="/images/courses/boxing-blueprint.jpg"
            ctaText="Buy now"
          />

          <CourseCard
            href="https://coachjosh1.gumroad.com/l/cayuxl"
            title="Partner Drills"
            description="20-minute follow-along workout for two."
            price="$30"
            thumbnail="/images/courses/partner-drills.jpg"
            ctaText="Buy now"
          />

          <CourseCard
            href="https://coachjosh1.gumroad.com/l/ujrfqt"
            title="Home Shadow Boxing"
            description="22-minute workout. No equipment needed."
            price="$30"
            thumbnail="/images/courses/shadow-boxing.jpg"
            ctaText="Buy now"
          />
        </section>

        {/* ═══════════ 2. 1-ON-1 ONLINE COACHING ═══════════ */}
        <section className="mt-10" aria-label="1-on-1 Online Coaching">
          <div className="mb-3 px-1">
            <h2 className="text-base font-bold text-[#0F172A]">
              1-on-1 Online Coaching
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Personal training plans, live coaching calls, and video review.
            </p>
          </div>

          <div className="space-y-3">
            <CoachingTierCard
              href="https://buy.stripe.com/eVq28q51463A6VY0dbfw401"
              title="Tune Up Coaching"
              cadence="1 Call / Month"
              description="Expert monthly direction with one 1-on-1 call, training guidance, and messaging support."
              price="$150"
            />

            <CoachingTierCard
              href="https://buy.stripe.com/8x2aEWdxAcrYa8a9NLfw402"
              title="Online Development"
              cadence="2 Calls / Month"
              description="Custom training plan, bi-weekly coaching calls, technique video review, and direct messaging."
              price="$300"
              popular
            />

            <CoachingTierCard
              href="https://buy.stripe.com/9B614malo4Zw4NQgc9fw403"
              title="Elite 1:1 Coaching"
              cadence="Weekly Calls"
              description="High-touch weekly coaching calls, full camp customization, frequent film breakdowns, and priority access."
              price="$500"
            />
          </div>
        </section>

        {/* ═══════════ 3. OFFICIAL SPONSOR (LEAD BOXING ONLY) ═══════════ */}
        <section className="mt-10" aria-label="Recommended Gear">
          <div className="mb-3 px-1">
            <h2 className="text-base font-bold text-[#0F172A]">
              Recommended Gear
            </h2>
          </div>

          <ResourceLink
            href="https://leadboxing.com/?utm_source=coachjosh&utm_medium=link-in-bio&utm_campaign=gear"
            title="Lead Boxing Gear"
            subtitle="Coach Josh's go-to training gloves, mitts, and sparring equipment."
            icon={ShoppingBag}
          />
        </section>

        {/* ═══════════ 4. FREE RESOURCES & GYM ═══════════ */}
        <section className="mt-10" aria-label="Resources and Training">
          <div className="mb-3 px-1">
            <h2 className="text-base font-bold text-[#0F172A]">
              Free Resources &amp; In-Person
            </h2>
          </div>

          <div className="space-y-2.5">
            <ResourceLink
              href="https://www.youtube.com/watch?v=M4uyfBR7H1I"
              title="Free Boxing Warm-Up Routine"
              subtitle="Follow-along pre-session mobility and joint activation."
              icon={Play}
            />

            <ResourceLink
              href="https://discord.gg/Vhygw7DpVM"
              title="Free Training Discord"
              subtitle="Community film reviews and daily training accountability."
              icon={Sparkles}
            />

            <ResourceLink
              href="https://boxingwiki.org/?utm_source=coachjosh&utm_medium=link-in-bio&utm_campaign=free_resources"
              title="BoxingWiki Encyclopedia"
              subtitle="Interactive guide to boxing styles, legends, and techniques."
              icon={BookOpen}
            />

            <ResourceLink
              href="https://coachjoshboxing.com"
              title="Coach Josh Boxing Gym (Hamden, CT)"
              subtitle="Train in person with group classes and private sessions."
              icon={MapPin}
            />

            <ResourceLink
              href="https://www.coachjoshofficial.com/#programs"
              title="Full Website &amp; Curriculum"
              subtitle="Explore all programs, student results, and training systems."
              icon={Globe}
            />
          </div>
        </section>

        {/* ═══════════ 5. BUSINESS INQUIRIES (MOVED BELOW COURSES) ═══════════ */}
        <section className="mt-10" aria-label="Business and Partnerships">
          <div className="mb-3 px-1">
            <h2 className="text-base font-bold text-[#0F172A]">
              Business &amp; Brand Inquiries
            </h2>
          </div>

          <div className="space-y-2.5">
            <ResourceLink
              href="mailto:COACHJOSHOFFICIAL@PLAYERSCLUBLLC.COM"
              title="Contact for Partnerships"
              subtitle="COACHJOSHOFFICIAL@PLAYERSCLUBLLC.COM"
              icon={Mail}
            />

            <ResourceLink
              href="/ugc"
              title="Brand Collaborations &amp; Media Kit"
              subtitle="435K+ followers · 150M+ organic views · Audience metrics"
              icon={Sparkles}
              internal
            />
          </div>
        </section>

        {/* ═══════════ MINIMAL FOOTER BAR ═══════════ */}
        <footer className="mt-12 pt-6 border-t border-slate-200 flex items-center justify-around text-xs font-medium text-slate-500">
          <a
            href="mailto:COACHJOSHOFFICIAL@PLAYERSCLUBLLC.COM"
            className="hover:text-[#0F172A] transition-colors"
          >
            Contact
          </a>
          <a
            href="https://instagram.com/coachjoshofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0F172A] transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://youtube.com/@coachjoshofficial?si=6dbXONGnIDN8VNuV"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0F172A] transition-colors"
          >
            YouTube
          </a>
          <a
            href="https://www.tiktok.com/@coachjoshofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0F172A] transition-colors"
          >
            TikTok
          </a>
        </footer>
      </div>
    </main>
  );
}
