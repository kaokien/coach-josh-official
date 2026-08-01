import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Target, Globe, Trophy, Quote, Instagram, Youtube, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Coach Josh | Coach Josh Official',
  description: 'Meet Coach Josh — professional boxing coach and creator with 150M+ views. Learn about his training philosophy, background, and approach to building fighters from the ground up.',
  openGraph: {
    title: 'About Coach Josh | Boxing Coach & Creator',
    description: 'Professional boxing coach with 150M+ views. Mechanics over muscle. Fundamentals-first training.',
    images: ['/og-image.jpg'],
  },
};

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.53a8.27 8.27 0 0 0 4.76 1.5v-3.4a4.85 4.85 0 0 1-1-.06z" />
  </svg>
);

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "@id": "https://www.coachjoshofficial.com/#coach"
    },
    "name": "About Coach Josh",
    "url": "https://www.coachjoshofficial.com/about"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-[#FFFFFF] text-[#0F172A]">

        {/* ═══════════ HERO BANNER ═══════════ */}
        <section className="relative bg-[#0F172A] border-b-4 border-[#2563EB] overflow-hidden">
          {/* Brutalist grid background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg,#fff 0px,#fff 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#fff 0px,#fff 1px,transparent 1px,transparent 60px)',
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
            {/* Back nav */}
            <div className="pt-6 pb-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors font-body text-sm uppercase tracking-wider"
              >
                <ChevronLeft size={16} />
                Back to Home
              </Link>
            </div>

            {/* Two-column hero */}
            <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16 pb-0">

              {/* Left: Text */}
              <div className="flex-1 py-8 lg:py-16">
                <div className="mb-6 inline-flex items-center gap-2 border-2 border-white/20 bg-[#DC2626] px-4 py-2 font-display text-sm font-bold uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
                  <Trophy size={16} /> The Coach
                </div>

                <h1 className="font-display text-[12vw] sm:text-[8vw] lg:text-[5.5vw] leading-[0.85] tracking-tighter text-white mb-6">
                  MEET<br />
                  <span className="text-[#2563EB]">COACH JOSH</span>
                </h1>

                <p className="font-body text-lg md:text-xl text-white/60 max-w-lg leading-relaxed border-l-4 border-[#2563EB] pl-4">
                  Professional boxing coach and creator with 150M+ views teaching the science of striking.
                </p>
              </div>

              {/* Right: Image frame — brutalist offset */}
              <div className="relative w-full lg:w-[380px] xl:w-[420px] shrink-0 lg:self-end">
                {/* Red accent stripe behind */}
                <div className="absolute -top-3 -right-3 lg:-top-4 lg:-right-4 w-full h-full bg-[#DC2626] z-0" />

                {/* Neon bottom edge */}
                <div className="absolute bottom-0 left-0 right-3 lg:right-4 h-2 bg-[#CCFF00] z-20" />

                <div className="relative z-10 border-4 border-[#0F172A] overflow-hidden h-[320px] sm:h-[400px] lg:h-auto lg:[aspect-ratio:3/4]">
                  <Image
                    src="/coach-josh-hero.webp"
                    alt="Coach Josh — Professional Boxing Coach"
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover object-top"
                    priority
                  />
                  <div className="absolute inset-0 bg-[#2563EB]/10 mix-blend-multiply pointer-events-none" />
                </div>

                {/* Floating badge */}
                <div className="absolute -left-4 lg:-left-6 top-8 lg:top-12 z-20 border-2 border-[#0F172A] bg-[#0F172A] px-4 py-2 text-white font-display text-sm uppercase tracking-wider shadow-[4px_4px_0px_0px_#DC2626]">
                  Est. 2020
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ═══════════ STATS MARQUEE ═══════════ */}
        <div className="border-b-2 border-[#0F172A] bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x-2 divide-[#0F172A]">
            {[
              { value: '150M+', label: 'Total Views' },
              { value: '174K+', label: 'Combined Community' },
              { value: '6+', label: 'Years Training' },
              { value: '60+', label: 'Video Lessons' },
            ].map((stat) => (
              <div key={stat.label} className="px-6 py-8 text-center">
                <p className="font-display text-4xl md:text-5xl text-[#2563EB]">{stat.value}</p>
                <p className="font-body text-[10px] font-bold uppercase tracking-widest text-[#0F172A]/50 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════ STORY + PHILOSOPHY ═══════════ */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left: The Story — 7 columns */}
            <div className="lg:col-span-7 flex flex-col gap-8">

              {/* Opening quote */}
              <div className="relative border-l-8 border-[#2563EB] bg-white p-8 border-y-2 border-r-2 border-[#0F172A]/10">
                <Quote className="absolute top-4 left-4 h-8 w-8 text-[#2563EB]/20 rotate-180" />
                <p className="font-display text-2xl md:text-3xl uppercase text-[#0F172A] leading-tight relative z-10">
                  &ldquo;You need someone in your corner who has been where you are and knows the path forward.&rdquo;
                </p>
              </div>

              {/* Narrative */}
              <div className="space-y-5 font-body text-lg text-[#0F172A]/80 leading-relaxed">
                <p>
                  <span className="font-bold text-[#0F172A]">Boxing isn&apos;t just a sport.</span> It&apos;s a way of life.
                </p>
                <p>
                  I&apos;ve traveled, exposed myself to different styles, and learned from coaches with{' '}
                  <span className="bg-[#DC2626]/20 px-1 font-bold text-[#A8314A]">World Championship experience</span>.
                  I have over six years of training in elite gyms, taking in everything I could.
                </p>
                <p>
                  I&apos;ve seen what works for pressure fighters and what works for technicians. My experience comes from the shared knowledge of many people who pushed me to apply what I know in the ring.
                </p>
                <p className="font-bold text-[#0F172A]">
                  The habits, focus, and confidence you will develop here show up in your work, your relationships, and the way you face challenges outside the gym.
                </p>
              </div>
            </div>

            {/* Right: Philosophy cards — 5 columns */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:pt-2">
              {/* Card 1: Philosophy */}
              <div className="border-2 border-[#0F172A] bg-white p-8 shadow-[4px_4px_0px_0px_#0F172A] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#0F172A] transition-all">
                <div className="mb-4 inline-flex items-center justify-center h-10 w-10 border-2 border-[#0F172A] bg-[#2563EB] text-white">
                  <Target size={20} />
                </div>
                <h3 className="font-display text-xl uppercase text-[#0F172A] mb-3">My Philosophy</h3>
                <p className="font-body text-sm text-[#0F172A]/70 leading-relaxed">
                  Mechanics over muscle. We build from the ground up — stance, balance, timing, then power. The fundamentals aren&apos;t boring. They&apos;re everything.
                </p>
              </div>

              {/* Card 2: Ambition */}
              <div className="border-2 border-[#0F172A] bg-[#0F172A] p-8 text-white shadow-[4px_4px_0px_0px_#2563EB] hover:translate-y-[-2px] transition-all">
                <div className="mb-4 inline-flex items-center justify-center h-10 w-10 border-2 border-white bg-[#DC2626] text-white">
                  <Globe size={20} />
                </div>
                <h3 className="font-display text-xl uppercase text-white mb-3">The Ambition</h3>
                <p className="font-body text-sm text-white/70 leading-relaxed">
                  To create the most technical, supportive boxing community on the planet. Real feedback, real growth, no ego.
                </p>
              </div>

              {/* Card 3: What You Get (digital product angle) */}
              <div className="border-2 border-[#0F172A] bg-[#2563EB] p-8 text-white shadow-[4px_4px_0px_0px_#0F172A] hover:translate-y-[-2px] transition-all">
                <h3 className="font-display text-xl uppercase text-white mb-3">What You Get</h3>
                <ul className="font-body text-sm text-white/80 leading-relaxed space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-[#CCFF00]" />
                    The Striking Blueprint — 11-chapter training manual
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-[#CCFF00]" />
                    60+ structured video lessons
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-[#CCFF00]" />
                    VIP Discord community access
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-[#CCFF00]" />
                    Direct feedback on your technique
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* ═══════════ SOCIAL LINKS ═══════════ */}
        <section className="border-t-2 border-[#0F172A] bg-[#0F172A]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
            <h2 className="font-display text-3xl md:text-4xl uppercase text-white mb-8">
              Follow the <span className="text-[#2563EB]">Work</span>
            </h2>

            <div className="grid sm:grid-cols-3 gap-0 border-2 border-white/20">
              {[
                {
                  icon: <TikTokIcon className="h-6 w-6" />,
                  platform: 'TikTok',
                  handle: '@coachjoshofficial',
                  url: 'https://www.tiktok.com/@coachjoshofficial',
                },
                {
                  icon: <Instagram size={24} />,
                  platform: 'Instagram',
                  handle: '@coachjoshofficial',
                  url: 'https://www.instagram.com/coachjoshofficial',
                },
                {
                  icon: <Youtube size={24} />,
                  platform: 'YouTube',
                  handle: '@coachjoshofficial',
                  url: 'https://www.youtube.com/@coachjoshofficial',
                },
              ].map((social, i) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-6 text-white hover:bg-[#2563EB] transition-colors group ${
                    i < 2 ? 'sm:border-r-2 border-b-2 sm:border-b-0 border-white/20' : ''
                  }`}
                >
                  <div className="h-12 w-12 border-2 border-white/30 flex items-center justify-center group-hover:border-white/60 transition-colors">
                    {social.icon}
                  </div>
                  <div>
                    <p className="font-display uppercase text-sm tracking-wider">{social.platform}</p>
                    <p className="font-body text-xs text-white/40 group-hover:text-white/70 transition-colors">{social.handle}</p>
                  </div>
                  <ArrowRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ CTA ═══════════ */}
        <section className="border-t-4 border-[#CCFF00] bg-[#FFFFFF]">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <p className="font-body text-sm uppercase tracking-[0.3em] text-[#0F172A]/40 mb-4">Ready to train?</p>
            <h2 className="font-display text-4xl md:text-6xl uppercase text-[#0F172A] mb-8">
              Start the <span className="text-[#2563EB]">Blueprint</span>
            </h2>
            <Link
              href="/blueprint"
              className="inline-block px-10 py-5 bg-[#0F172A] text-white font-display uppercase text-lg tracking-wider border-2 border-[#0F172A] shadow-[6px_6px_0px_0px_#2563EB] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
            >
              Get Started →
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
