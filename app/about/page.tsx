import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, Target, Globe, Trophy, Quote, Instagram, Youtube } from 'lucide-react';

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
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Header */}
      <div className="bg-[#0F172A] border-b-4 border-[#2563EB]">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-body text-sm uppercase tracking-wider mb-4">
            <ChevronLeft size={16} />
            Back to Home
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 border-2 border-white/20 bg-white/10 px-4 py-1 font-display text-sm font-bold uppercase tracking-widest text-white">
            <Trophy size={16} className="text-[#DC2626]" /> The Coach
          </div>
          <h1 className="font-display text-5xl md:text-7xl uppercase text-white">
            Meet <span className="text-[#2563EB]">Coach Josh</span>
          </h1>
          <p className="font-body text-white/60 mt-3 text-lg max-w-xl">
            Professional boxing coach. Creator. 150M+ views teaching the science of striking.
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">

        {/* Opening Quote */}
        <div className="relative border-l-8 border-[#2563EB] bg-white p-8 border-y-2 border-r-2 border-[#0F172A]/10 mb-12">
          <Quote className="absolute top-4 left-4 h-8 w-8 text-[#2563EB]/20 rotate-180" />
          <p className="font-display text-2xl md:text-3xl uppercase text-[#0F172A] leading-tight relative z-10">
            &ldquo;You need someone in your corner who has been where you are and knows the path forward.&rdquo;
          </p>
        </div>

        {/* The Story */}
        <div className="bg-white border-2 border-[#0F172A] p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8">
          <h2 className="font-display uppercase text-xl mb-6 border-b-2 border-[#0F172A] pb-4">The Story</h2>
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

        {/* Philosophy Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="border-2 border-[#0F172A] bg-white p-8 shadow-[4px_4px_0px_0px_#0F172A]">
            <div className="mb-4 inline-flex items-center justify-center h-10 w-10 border-2 border-[#0F172A] bg-[#2563EB] text-white">
              <Target size={20} />
            </div>
            <h3 className="font-display text-xl uppercase text-[#0F172A] mb-3">My Philosophy</h3>
            <p className="font-body text-sm text-[#0F172A]/70 leading-relaxed">
              Mechanics over muscle. We build from the ground up — stance, balance, timing, then power. The fundamentals aren&apos;t boring. They&apos;re everything.
            </p>
          </div>

          <div className="border-2 border-[#0F172A] bg-[#0F172A] p-8 text-white shadow-[4px_4px_0px_0px_#2563EB]">
            <div className="mb-4 inline-flex items-center justify-center h-10 w-10 border-2 border-white bg-[#DC2626] text-white">
              <Globe size={20} />
            </div>
            <h3 className="font-display text-xl uppercase text-white mb-3">The Ambition</h3>
            <p className="font-body text-sm text-white/70 leading-relaxed">
              To create the most technical, supportive boxing community on the planet. Real feedback, real growth, no ego.
            </p>
          </div>
        </div>

        {/* Social Proof Stats */}
        <div className="border-2 border-[#0F172A] bg-[#0F172A] p-8 shadow-[4px_4px_0px_0px_#2563EB] mb-12">
          <h2 className="font-display uppercase text-xl text-white mb-6 text-center">By The Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="font-display text-3xl md:text-4xl text-[#2563EB]">150M+</p>
              <p className="font-body text-sm text-white/60 uppercase tracking-wider mt-1">Total Views</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl text-[#DC2626]">6+</p>
              <p className="font-body text-sm text-white/60 uppercase tracking-wider mt-1">Years Training</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl text-[#7FB069]">60+</p>
              <p className="font-body text-sm text-white/60 uppercase tracking-wider mt-1">Video Lessons</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl text-white">11</p>
              <p className="font-body text-sm text-white/60 uppercase tracking-wider mt-1">Blueprint Chapters</p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-2 border-[#0F172A] bg-white p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8">
          <h2 className="font-display uppercase text-xl mb-6 border-b-2 border-[#0F172A] pb-4">Follow the Work</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <a
              href="https://www.tiktok.com/@coachjoshofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border-2 border-[#0F172A] hover:bg-[#0F172A] hover:text-white transition-colors group"
            >
              <TikTokIcon className="h-6 w-6" />
              <div>
                <p className="font-display uppercase text-sm">TikTok</p>
                <p className="font-body text-xs text-[#0F172A]/50 group-hover:text-white/50">@coachjoshofficial</p>
              </div>
            </a>
            <a
              href="https://www.instagram.com/coachjoshofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border-2 border-[#0F172A] hover:bg-[#0F172A] hover:text-white transition-colors group"
            >
              <Instagram size={24} />
              <div>
                <p className="font-display uppercase text-sm">Instagram</p>
                <p className="font-body text-xs text-[#0F172A]/50 group-hover:text-white/50">@coachjoshofficial</p>
              </div>
            </a>
            <a
              href="https://www.youtube.com/@coachjoshofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border-2 border-[#0F172A] hover:bg-[#0F172A] hover:text-white transition-colors group"
            >
              <Youtube size={24} />
              <div>
                <p className="font-display uppercase text-sm">YouTube</p>
                <p className="font-body text-xs text-[#0F172A]/50 group-hover:text-white/50">@coachjoshofficial</p>
              </div>
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-8">
          <Link
            href="/blueprint"
            className="inline-block px-8 py-4 bg-[#2563EB] text-white font-display uppercase text-lg border-2 border-[#0F172A] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            Start Training →
          </Link>
        </div>
      </main>
    </div>
    </>
  );
}
