import React from 'react';
import { Metadata } from 'next';
import { Mail, CheckCircle2, TrendingUp, Users, Target, Video, ShieldCheck, Trophy, ArrowUpRight } from 'lucide-react';
import Navigation from '@/components/layout/navigation';
import Footer from '@/components/layout/footer';
import PaperTexture from '@/components/ui/paper-texture';
import FAQItem from './faq-item';
import CountUpStat from './count-up-stat';

export const metadata: Metadata = {
  title: 'Partner with Coach Josh | UGC & Sponsorships',
  description: 'Tap into 150M+ views and a highly engaged combat sports and fitness audience. Work with Coach Josh for authentic UGC, sponsorships, and paid media.',
  openGraph: {
    title: 'Partner with Coach Josh | UGC & Sponsorships',
    description: 'Authentic Reach. Hard-Hitting Results. Partner with Coach Josh.',
    images: ['/og-image.jpg'],
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "name": "Coach Josh",
      "jobTitle": "Professional Boxing Coach & Creator",
      "url": "https://www.coachjoshofficial.com",
      "sameAs": [
        "https://www.tiktok.com/@coachjoshofficial",
        "https://www.instagram.com/coachjoshofficial",
        "https://www.youtube.com/@coachjoshofficial"
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do packages include usage rights?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, standard packages include 30-day organic usage. Paid media usage is negotiable based on the scope of the campaign."
          }
        },
        {
          "@type": "Question",
          "name": "What is the standard turnaround time?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Typically 5-7 business days from product receipt and brief approval."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer revisions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "One round of minor editing revisions is included in all standard packages."
          }
        },
        {
          "@type": "Question",
          "name": "Can we run whitelisted ads?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, whitelisting access (Spark Ads, Partnership Ads) is available as an add-on."
          }
        }
      ]
    }
  ]
};

const StatsBar = () => (
  <div className="w-full overflow-hidden border-y-2 border-[#1A1A1A] bg-[#1A1A1A] py-3">
    <div className="flex animate-marquee whitespace-nowrap font-body text-xs sm:text-sm font-bold text-[#F2E8DC] uppercase tracking-widest">
      <span className="mx-4">150M+ TOTAL VIEWS</span> • 
      <span className="mx-4">6+ YEARS EXP.</span> • 
      <span className="mx-4">51.9K TIKTOK</span> • 
      <span className="mx-4">51.1K IG</span> • 
      <span className="mx-4">13.3K YOUTUBE</span> • 
      <span className="mx-4">2.9M TIKTOK LIKES</span> •
      {/* Duplicate for infinite effect */}
      <span className="mx-4">150M+ TOTAL VIEWS</span> • 
      <span className="mx-4">6+ YEARS EXP.</span> • 
      <span className="mx-4">51.9K TIKTOK</span> • 
      <span className="mx-4">51.1K IG</span> • 
      <span className="mx-4">13.3K YOUTUBE</span> • 
      <span className="mx-4">2.9M TIKTOK LIKES</span>
    </div>
  </div>
);

const CtaButton = ({ className = "" }: { className?: string }) => (
  <a 
    href="mailto:coachjoshofficial@playersclubllc.com?subject=Partnership%20Inquiry"
    className={`inline-flex items-center justify-center border-2 border-[#1A1A1A] bg-[#D1495B] px-6 py-3 font-display text-lg font-bold uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_#1A1A1A] transition-all hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none ${className}`}
  >
    <Mail className="mr-3 h-5 w-5" />
    Book a Collab Call
  </a>
);

export default function UGCPage() {
  return (
    <main className="relative min-h-screen bg-white font-sans text-[#1A1A1A] selection:bg-[#4A6FA5] selection:text-white pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <PaperTexture />
      <Navigation />

      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-24 md:px-12 flex flex-col items-center text-center z-10 mx-auto">
        <div className="mb-4 inline-flex items-center gap-2 border-2 border-[#1A1A1A] bg-white px-4 py-1 font-display text-sm font-bold uppercase tracking-widest text-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A]">
          <Trophy size={16} className="text-[#D1495B]" /> Brands & Partnerships
        </div>
        <h1 className="font-display text-[12vw] md:text-[8vw] uppercase leading-[0.85] tracking-tighter text-[#1A1A1A] drop-shadow-[0_4px_4px_rgba(0,0,0,0.1)] mb-6">
          Authentic Reach. <br/>
          <span className="text-[#4A6FA5]">Hard-Hitting Results.</span>
        </h1>
        <p className="font-body text-xl md:text-2xl font-bold text-[#1A1A1A] max-w-2xl leading-relaxed bg-white/80 backdrop-blur-sm p-2 border-l-4 border-[#D1495B] mx-auto mb-10 text-left">
          Partner with Coach Josh to get your brand in front of a highly engaged, action-taking combat sports and fitness audience. 
        </p>
        <CtaButton />
      </section>

      {/* Stats Bar */}
      <StatsBar />

      {/* The Digital Footprint */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
        <div className="border-4 border-[#1A1A1A] bg-white shadow-[12px_12px_0px_0px_#1A1A1A] p-8 md:p-16">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-7xl uppercase text-[#1A1A1A]">
              The Digital <span className="text-[#4A6FA5]">Footprint</span>
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 border-b-2 border-[#1A1A1A]/20 pb-16 mb-16">
             <div className="text-center">
               <div className="font-display text-6xl md:text-7xl text-[#D1495B]"><CountUpStat end={116} suffix="K+" /></div>
               <div className="font-body text-sm font-bold uppercase tracking-widest text-[#1A1A1A]/60 mt-2">Combined Followers</div>
             </div>
             <div className="text-center md:border-l-2 md:border-[#1A1A1A]/20 md:pl-24">
               <div className="font-display text-6xl md:text-7xl text-[#4A6FA5]"><CountUpStat end={150} suffix="M+" /></div>
               <div className="font-body text-sm font-bold uppercase tracking-widest text-[#1A1A1A]/60 mt-2">Total Organic Views</div>
             </div>
             <div className="text-center md:border-l-2 md:border-[#1A1A1A]/20 md:pl-24">
               <div className="font-display text-6xl md:text-7xl text-[#1A1A1A]"><CountUpStat end={3} suffix="M+" /></div>
               <div className="font-body text-sm font-bold uppercase tracking-widest text-[#1A1A1A]/60 mt-2">Total Engagements</div>
             </div>
          </div>

          {/* Platform Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="border-2 border-[#1A1A1A] p-8 text-center bg-white shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#1A1A1A] transition-all">
                <div className="mb-4 inline-flex items-center justify-center h-12 w-12 border-2 border-[#1A1A1A] bg-[#1A1A1A] text-white">
                  <span className="font-display font-bold text-xl">TT</span>
                </div>
                <div className="font-display text-2xl uppercase mb-1 text-[#1A1A1A]">TikTok</div>
                <div className="font-body text-lg font-bold text-[#D1495B]">51.9K Followers</div>
                <div className="font-body text-xs font-bold uppercase tracking-widest text-[#1A1A1A]/50 mt-2">2.9M Likes</div>
             </div>
             <div className="border-2 border-[#1A1A1A] p-8 text-center bg-white shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#1A1A1A] transition-all">
                <div className="mb-4 inline-flex items-center justify-center h-12 w-12 border-2 border-[#1A1A1A] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 text-white">
                  <span className="font-display font-bold text-xl">IG</span>
                </div>
                <div className="font-display text-2xl uppercase mb-1 text-[#1A1A1A]">Instagram</div>
                <div className="font-body text-lg font-bold text-[#4A6FA5]">51.1K Followers</div>
                <div className="font-body text-xs font-bold uppercase tracking-widest text-[#1A1A1A]/50 mt-2">1,684 Posts</div>
             </div>
             <div className="border-2 border-[#1A1A1A] p-8 text-center bg-white shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#1A1A1A] transition-all">
                <div className="mb-4 inline-flex items-center justify-center h-12 w-12 border-2 border-[#1A1A1A] bg-red-600 text-white">
                  <span className="font-display font-bold text-xl">YT</span>
                </div>
                <div className="font-display text-2xl uppercase mb-1 text-[#1A1A1A]">YouTube</div>
                <div className="font-body text-lg font-bold text-[#1A1A1A]"><CountUpStat end={13.6} decimals={1} suffix="K Subs" /></div>
                <div className="font-body text-xs font-bold uppercase tracking-widest text-[#1A1A1A]/50 mt-2">12.8M Yearly Views</div>
             </div>
          </div>
        </div>
      </section>

      {/* Audience Demographics */}
      <section className="border-t-2 border-[#1A1A1A] bg-[#F2E8DC] px-6 py-24 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="font-display text-5xl md:text-7xl uppercase text-[#1A1A1A]">
              Audience <span className="text-[#D1495B]">Demographics</span>
            </h2>
            <p className="font-body text-lg font-bold text-[#4A6FA5] mt-4 uppercase tracking-widest">A highly targeted, purchasing-power demographic.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Gender */}
            <div className="border-4 border-[#1A1A1A] bg-white p-8 shadow-[8px_8px_0px_0px_#1A1A1A] hover:translate-y-[-4px] transition-transform">
               <h3 className="font-display text-3xl uppercase tracking-wider mb-6 text-[#1A1A1A] border-b-2 border-[#1A1A1A]/20 pb-4">Gender</h3>
               <div className="flex items-end gap-4 mb-2">
                 <div className="font-display text-6xl text-[#4A6FA5]"><CountUpStat end={84} suffix="%" /></div>
                 <div className="font-body text-xl font-bold uppercase tracking-widest text-[#1A1A1A] mb-2">Male</div>
               </div>
               <div className="w-full bg-[#1A1A1A]/10 h-4 mb-4">
                 <div className="bg-[#4A6FA5] h-4" style={{ width: '84%' }}></div>
               </div>
               <div className="flex justify-between font-body text-xs font-bold text-[#1A1A1A]/60 uppercase tracking-widest">
                 <span>Female: 14%</span>
                 <span>Other: 2%</span>
               </div>
            </div>

            {/* Age */}
            <div className="border-4 border-[#1A1A1A] bg-white p-8 shadow-[8px_8px_0px_0px_#1A1A1A] hover:translate-y-[-4px] transition-transform">
               <h3 className="font-display text-3xl uppercase tracking-wider mb-6 text-[#1A1A1A] border-b-2 border-[#1A1A1A]/20 pb-4">Age Range</h3>
               <div className="flex items-end gap-4 mb-2">
                 <div className="font-display text-6xl text-[#D1495B]"><CountUpStat end={73} suffix="%" /></div>
                 <div className="font-body text-xl font-bold uppercase tracking-widest text-[#1A1A1A] mb-2">Ages 18-34</div>
               </div>
               <div className="space-y-3 mt-6">
                 <div>
                   <div className="flex justify-between font-body text-xs font-bold text-[#1A1A1A]/80 uppercase tracking-widest mb-1">
                     <span>18-24</span>
                     <span>37%</span>
                   </div>
                   <div className="w-full bg-[#1A1A1A]/10 h-2"><div className="bg-[#D1495B] h-2" style={{ width: '37%' }}></div></div>
                 </div>
                 <div>
                   <div className="flex justify-between font-body text-xs font-bold text-[#1A1A1A]/80 uppercase tracking-widest mb-1">
                     <span>25-34</span>
                     <span>36%</span>
                   </div>
                   <div className="w-full bg-[#1A1A1A]/10 h-2"><div className="bg-[#D1495B] h-2 opacity-80" style={{ width: '36%' }}></div></div>
                 </div>
               </div>
            </div>

            {/* Top Geographies */}
            <div className="border-4 border-[#1A1A1A] bg-white p-8 shadow-[8px_8px_0px_0px_#1A1A1A] hover:translate-y-[-4px] transition-transform">
               <h3 className="font-display text-3xl uppercase tracking-wider mb-6 text-[#1A1A1A] border-b-2 border-[#1A1A1A]/20 pb-4">Top Regions</h3>
               <div className="flex items-end gap-4 mb-2">
                 <div className="font-display text-6xl text-[#1A1A1A]"><CountUpStat end={46} suffix="%" /></div>
                 <div className="font-body text-xl font-bold uppercase tracking-widest text-[#1A1A1A] mb-2">USA</div>
               </div>
               <ul className="space-y-4 mt-6">
                 <li className="flex justify-between items-center font-body text-sm font-bold text-[#1A1A1A] uppercase tracking-widest">
                   <div className="flex items-center gap-3"><span className="w-2 h-2 bg-[#1A1A1A]"></span> United Kingdom</div>
                   <span>6%</span>
                 </li>
                 <li className="flex justify-between items-center font-body text-sm font-bold text-[#1A1A1A] uppercase tracking-widest">
                   <div className="flex items-center gap-3"><span className="w-2 h-2 bg-[#1A1A1A] opacity-80"></span> Canada</div>
                   <span>6%</span>
                 </li>
                 <li className="flex justify-between items-center font-body text-sm font-bold text-[#1A1A1A] uppercase tracking-widest">
                   <div className="flex items-center gap-3"><span className="w-2 h-2 bg-[#1A1A1A] opacity-60"></span> Australia</div>
                   <span>6%</span>
                 </li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Brands Choose Josh */}
      <section className="border-t-2 border-[#1A1A1A] bg-[#1A1A1A] text-white px-6 py-24 md:px-12 relative z-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="font-display text-5xl md:text-7xl uppercase text-white">
              Why Brands <span className="text-[#D1495B]">Win</span>
            </h2>
            <p className="font-body text-lg font-bold text-[#4A6FA5] mt-4 uppercase tracking-widest">Beyond vanity metrics. Real influence.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck className="h-6 w-6" />,
                title: "High-Trust Authority",
                desc: "6+ years of professional coaching experience gives unparalleled credibility to product recommendations and reviews."
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: "Hyper-Engaged Audience",
                desc: "A dedicated following of fighters, athletes, and fitness enthusiasts who take action and buy what works."
              },
              {
                icon: <Video className="h-6 w-6" />,
                title: "High-Quality Production",
                desc: "Crisp audio, professional lighting, and dynamic editing tailored to the hooks that stop the scroll."
              }
            ].map((item, i) => (
              <div key={i} className="border-2 border-white/20 bg-white/5 p-8 hover:bg-white/10 transition-colors">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center border-2 border-white bg-[#D1495B] text-white">
                  {item.icon}
                </div>
                <h3 className="font-display text-2xl uppercase tracking-wider mb-4 text-white">{item.title}</h3>
                <p className="font-body text-sm font-bold opacity-80 leading-relaxed text-white/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study: CES Boxing */}
      <section className="border-t-2 border-[#1A1A1A] bg-white px-6 py-24 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="mb-4 inline-flex items-center gap-2 border-2 border-[#1A1A1A] bg-white px-4 py-1 font-display text-sm font-bold uppercase tracking-widest text-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A]">
              Featured Case Study
            </div>
            <h2 className="font-display text-5xl md:text-7xl uppercase text-[#1A1A1A] mb-8">
              CES Boxing <span className="text-[#4A6FA5]">Campaign</span>
            </h2>
            
            <div className="relative border-l-8 border-[#D1495B] bg-white p-8 border-y-2 border-r-2 border-[#1A1A1A]/10 mb-8">
              <p className="font-body text-lg font-bold text-[#1A1A1A]/80 leading-relaxed">
                Partnered with CES Boxing to drive awareness and ticket hype for their recent fight night. Through a strategic mix of immersive ringside reels, fight breakdowns, and behind-the-scenes interviews, we captured the raw energy of the event and delivered massive organic reach.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border-2 border-[#1A1A1A] bg-white p-4 shadow-[4px_4px_0px_0px_#1A1A1A]">
                <div className="font-display text-4xl text-[#1A1A1A]"><CountUpStat end={428} suffix="K+" /></div>
                <div className="font-body text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/60">Organic Views</div>
              </div>
              <div className="border-2 border-[#1A1A1A] bg-white p-4 shadow-[4px_4px_0px_0px_#1A1A1A]">
                <div className="font-display text-4xl text-[#1A1A1A]"><CountUpStat end={21} /></div>
                <div className="font-body text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/60">Reels Delivered</div>
              </div>
              <div className="border-2 border-[#1A1A1A] bg-white p-4 shadow-[4px_4px_0px_0px_#1A1A1A]">
                <div className="font-display text-4xl text-[#1A1A1A]"><CountUpStat end={160} suffix="K+" /></div>
                <div className="font-body text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/60">Top Video Views</div>
              </div>
              <div className="border-2 border-[#1A1A1A] bg-white p-4 shadow-[4px_4px_0px_0px_#1A1A1A]">
                <div className="font-display text-4xl text-[#1A1A1A]"><CountUpStat end={100} suffix="%" /></div>
                <div className="font-body text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/60">Target Demo Match</div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-sm lg:max-w-md flex justify-center">
             <div className="relative w-full aspect-[4/5] bg-white border-4 border-[#1A1A1A] shadow-[12px_12px_0px_0px_#1A1A1A] overflow-hidden transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
               <iframe 
                  src="https://www.instagram.com/reel/DXSktwDj69_/embed"
                  className="w-full h-full border-0"
                  scrolling="no"
                  allowTransparency={true}
                  allowFullScreen={true}
               />
               <div className="absolute -bottom-4 -right-4 bg-[#D1495B] text-white font-display text-xl uppercase px-6 py-3 border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] z-10 pointer-events-none">
                 160k+ Views
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Portfolio Embeds */}
      <section className="border-t-2 border-[#1A1A1A] bg-[#4A6FA5] px-6 py-24 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="font-display text-5xl md:text-7xl uppercase text-white drop-shadow-[4px_4px_0px_rgba(26,26,26,1)]">
              Recent High-Performers
            </h2>
            <p className="font-body text-lg font-bold text-white/80 mt-4 uppercase tracking-widest">Examples of hooks, editing, and pacing.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: 'DP-nRgKjdFb', badge: '1M+ Views' },
              { id: 'DTWXvZajTAu', badge: '1M+ Views' },
              { id: 'DSSpgJgDp38', badge: '1M+ Views' },
              { id: 'DVwW5wLDtca', badge: 'Product Review' }
            ].map((video, i) => (
              <div key={video.id} className="aspect-[4/5] bg-white border-4 border-[#1A1A1A] shadow-[8px_8px_0px_0px_#1A1A1A] relative flex flex-col items-center justify-center group overflow-hidden hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_#1A1A1A] transition-all duration-300">
                <iframe 
                  src={`https://www.instagram.com/reel/${video.id}/embed`}
                  className="absolute inset-0 w-full h-full border-0"
                  scrolling="no"
                  allowTransparency={true}
                  allowFullScreen={true}
                />
                <div className="absolute top-2 right-2 bg-[#D1495B] text-white font-display text-sm uppercase px-3 py-1 border-2 border-[#1A1A1A] pointer-events-none z-10">
                  {video.badge}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Process */}
      <section className="border-t-2 border-[#1A1A1A] bg-white px-6 py-24 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="font-display text-5xl md:text-7xl uppercase text-[#1A1A1A]">
              How We <span className="text-[#D1495B]">Work</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Strategy & Concept",
                desc: "We align on your campaign goals, target audience, hooks, and USPs. I provide a brief or adapt yours to fit my audience perfectly."
              },
              {
                step: "02",
                title: "Production & Review",
                desc: "I script, shoot, and edit high-quality assets. You review the first draft, and we make one round of included revisions if needed."
              },
              {
                step: "03",
                title: "Launch & Scale",
                desc: "Final deliverables are sent over optimized for native platform performance. If whitelisting is included, access is granted to scale."
              }
            ].map((process, i) => (
              <div key={i} className="border-4 border-[#1A1A1A] bg-white p-8 shadow-[8px_8px_0px_0px_#1A1A1A] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_#1A1A1A] transition-all">
                <div className="font-display text-6xl text-[#1A1A1A]/10 mb-4">{process.step}</div>
                <h3 className="font-display text-3xl uppercase text-[#1A1A1A] mb-4">{process.title}</h3>
                <p className="font-body text-base text-[#1A1A1A]/80 leading-relaxed">{process.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t-2 border-[#1A1A1A] bg-white px-6 py-24 md:px-12 relative z-10">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <div className="inline-block bg-[#1A1A1A] px-4 py-1 mb-4 transform -rotate-1">
              <span className="font-display text-white text-lg tracking-widest uppercase">Answers</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.85] text-[#1A1A1A] drop-shadow-[4px_4px_0px_rgba(0,0,0,0.05)]">
              Partnership<br />FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Do packages include usage rights?",
                answer: "Yes, standard packages include 30-day organic usage. Paid media usage is negotiable based on the scope of the campaign."
              },
              {
                question: "What is the standard turnaround time?",
                answer: "Typically 5-7 business days from product receipt and brief approval."
              },
              {
                question: "Do you offer revisions?",
                answer: "One round of minor editing revisions is included in all standard packages."
              },
              {
                question: "Can we run whitelisted ads?",
                answer: "Yes, whitelisting access (Spark Ads, Partnership Ads) is available as an add-on."
              }
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t-2 border-[#1A1A1A] bg-[#1A1A1A] text-white px-6 py-32 text-center relative z-10">
        <h2 className="font-display text-6xl md:text-8xl uppercase text-white mb-12 drop-shadow-[4px_4px_0px_rgba(74,111,165,1)]">
          Ready to Build?
        </h2>
        <CtaButton className="bg-[#4A6FA5]" />
        <p className="font-body text-sm font-bold text-white/50 mt-8 uppercase tracking-widest">
          Or email directly at <a href="mailto:coachjoshofficial@playersclubllc.com" className="text-white hover:text-[#D1495B] underline">coachjoshofficial@playersclubllc.com</a>
        </p>
        <p className="font-body text-xs font-bold text-white/30 mt-16">
          *All paid partnerships adhere to FTC disclosure guidelines.
        </p>
      </section>

    </main>
  );
}
