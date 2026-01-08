'use client';

import React, { useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { 
  ArrowUpRight, Check, Zap, Globe, Shield, Trophy, Target, 
  Menu, X, Play, MessageCircle, ChevronDown, Download,
  Users, Star, Clock
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useUser, UserButton } from '@clerk/nextjs';

// --- IMPORT YOUR COMPONENTS ---
import RecentUploads from './recent-uploads';
import MerchShowcase from './merch-showcase'; // Make sure this is imported!

// --- UTILS ---
function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

// --- COMPONENTS ---
const PaperTexture = () => (
  <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.4] mix-blend-multiply">
    <svg className="h-full w-full">
      <filter id="paper">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#paper)" />
    </svg>
  </div>
);

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'default',
  className, 
  onClick,
  disabled,
  ...props 
}: any) => (
  <motion.button 
    whileHover={{ scale: disabled ? 1 : 1.02 }} 
    whileTap={{ scale: disabled ? 1 : 0.98 }} 
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "group relative flex items-center justify-center gap-3 border-2 font-bold uppercase tracking-widest transition-all duration-300",
      "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
      size === 'default' && "px-8 py-5 text-lg",
      size === 'small' && "px-4 py-3 text-sm",
      variant === 'primary' && "bg-[#4A6FA5] border-[#1A1A1A] text-white hover:bg-[#4A6FA5]/90", 
      variant === 'secondary' && "bg-[#D1495B] border-[#1A1A1A] text-white hover:bg-[#D1495B]/90",
      variant === 'outline' && "bg-transparent border-[#1A1A1A] text-[#1A1A1A] hover:bg-white",
      className
    )}
    {...props}
  >
    <span className="relative z-10 flex items-center gap-2">{children}</span>
  </motion.button>
);

// --- NAVIGATION ---
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn, isLoaded, user } = useUser();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b-2 border-[#1A1A1A] bg-[#F2E8DC]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-2xl uppercase tracking-wider text-[#1A1A1A]">
          Coach Josh
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#programs" className="font-body text-sm font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#4A6FA5] transition-colors">
            Programs
          </Link>
          <Link href="/#community" className="font-body text-sm font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#4A6FA5] transition-colors">
            Community
          </Link>
          
          <Link href="/merch" className="font-body text-sm font-bold uppercase tracking-widest text-[#4A6FA5] hover:text-[#1A1A1A] transition-colors">
            Merch
          </Link>

          <Link href="/#training" className="font-body text-sm font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#4A6FA5] transition-colors">
            1-on-1
          </Link>
          
          {/* Conditional Login/User Button */}
          {!isLoaded ? (
            <div className="w-20 h-10 bg-[#1A1A1A]/10 animate-pulse border-2 border-[#1A1A1A]" />
          ) : isSignedIn ? (
            <div className="flex items-center gap-4">
              <Link 
                href="/cornerman" 
                className="font-body text-sm font-bold uppercase tracking-widest text-[#4A6FA5] hover:text-[#D1495B] transition-colors"
              >
                My Training
              </Link>
              <div className="border-2 border-[#1A1A1A] rounded-full p-0.5 bg-white">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          ) : (
            <Link href="/sign-in">
              <Button variant="outline" size="small">
                Login
              </Button>
            </Link>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden p-2 border-2 border-[#1A1A1A] bg-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t-2 border-[#1A1A1A] bg-[#F2E8DC] px-6 py-8"
        >
          <nav className="flex flex-col gap-6">
            <Link href="/#programs" className="font-display text-2xl uppercase text-[#1A1A1A]" onClick={() => setIsOpen(false)}>
              Programs
            </Link>
            <Link href="/#community" className="font-display text-2xl uppercase text-[#1A1A1A]" onClick={() => setIsOpen(false)}>
              Community
            </Link>
            <Link href="/merch" className="font-display text-2xl uppercase text-[#4A6FA5]" onClick={() => setIsOpen(false)}>
              Merch Store
            </Link>
            <Link href="/#training" className="font-display text-2xl uppercase text-[#1A1A1A]" onClick={() => setIsOpen(false)}>
              1-on-1 Training
            </Link>
            
            {isSignedIn ? (
              <div className="flex flex-col gap-4 mt-4 pt-4 border-t-2 border-[#1A1A1A]/20">
                <Link 
                  href="/cornerman" 
                  className="font-display text-2xl uppercase text-[#4A6FA5]"
                  onClick={() => setIsOpen(false)}
                >
                  My Training
                </Link>
                <div className="flex items-center gap-3">
                  <div className="border-2 border-[#1A1A1A] rounded-full p-0.5 bg-white">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                  <span className="font-body text-sm text-[#1A1A1A]/60">
                    {user?.firstName || 'Account'}
                  </span>
                </div>
              </div>
            ) : (
              <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                <Button variant="primary" className="w-full mt-4">
                  Login / Sign Up
                </Button>
              </Link>
            )}
          </nav>
        </motion.div>
      )}
    </header>
  );
};

const Marquee = ({ text }: { text: string }) => (
  <div className="relative flex w-full overflow-hidden border-y-2 border-[#1A1A1A] bg-[#4A6FA5] py-4 text-white">
    <div className="flex animate-marquee whitespace-nowrap">
      {[...Array(10)].map((_, i) => <span key={i} className="mx-8 text-4xl font-display uppercase">{text}</span>)}
    </div>
  </div>
);

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

const BookingModal = ({ isOpen, onClose, bookingUrl }: { isOpen: boolean; onClose: () => void; bookingUrl: string }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#1A1A1A]/80 backdrop-blur-sm p-4">
      <div className="absolute inset-0" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative h-[80vh] w-full max-w-4xl overflow-hidden border-4 border-[#1A1A1A] bg-[#F2E8DC] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
      >
        <div className="flex items-center justify-between border-b-4 border-[#1A1A1A] bg-[#4A6FA5] px-6 py-4">
          <div className="font-display text-2xl text-white uppercase tracking-wider">Select Your Round</div>
          <button onClick={onClose} className="text-white hover:text-[#1A1A1A] font-bold font-body">CLOSE [X]</button>
        </div>
        <iframe src={bookingUrl} width="100%" height="100%" frameBorder="0" className="h-full w-full bg-white"></iframe>
      </motion.div>
    </div>
  );
};

const FreeSamplerSection = () => {
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
        window.open('/assets/free-sampler.pdf', '_blank');
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
              <Button 
                type="submit" 
                variant="secondary" 
                disabled={loading}
                className="whitespace-nowrap"
              >
                {loading ? 'Sending...' : 'Get Free Week'} <ArrowUpRight size={18} />
              </Button>
            </form>
          )}
          
          <p className="font-body mt-4 text-sm text-white/50">
            No spam. Unsubscribe anytime. We'll also send you training tips.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Coach Josh's technique drills completely changed my jab. I went from arm punching to generating real power from my legs.",
      name: "Marcus T.",
      role: "Amateur Fighter",
      avatar: "/avatars/marcus.jpg"
    },
    {
      quote: "The Corner Man program is like having a coach in your pocket. The video breakdowns showed me flaws I never knew I had.",
      name: "Sarah K.",
      role: "Fitness Boxer",
      avatar: "/avatars/sarah.jpg"
    },
    {
      quote: "I've watched hundreds of boxing videos on YouTube. Coach Josh is the first one who actually explains the WHY behind technique.",
      name: "David R.",
      role: "MMA Hobbyist",
      avatar: "/avatars/david.jpg"
    },
  ];

  return (
    <section className="border-t-2 border-[#1A1A1A] bg-[#F2E8DC] px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="mb-4 inline-flex items-center gap-2 font-display text-[#4A6FA5] font-bold uppercase tracking-widest text-sm">
            <Star size={16} /> Real Results
          </div>
          <h2 className="font-display text-5xl md:text-7xl uppercase text-[#1A1A1A]">
            What Fighters Say
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border-4 border-[#1A1A1A] bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="fill-[#4A6FA5] text-[#4A6FA5]" />
                ))}
              </div>
              <p className="font-body text-lg text-[#1A1A1A]/80 leading-relaxed">
                "{t.quote}"
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full border-2 border-[#1A1A1A] bg-[#4A6FA5]/20 flex items-center justify-center">
                  <span className="font-display text-lg text-[#4A6FA5]">{t.name[0]}</span>
                </div>
                <div>
                  <div className="font-display text-lg text-[#1A1A1A]">{t.name}</div>
                  <div className="font-body text-sm text-[#1A1A1A]/60">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CommunitySection = () => {
  return (
    <section id="community" className="border-t-2 border-[#1A1A1A] bg-[#4A6FA5] px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <div className="mb-6 inline-flex items-center gap-2 border-2 border-white bg-white/20 px-4 py-2 font-display text-sm font-bold uppercase tracking-widest text-white">
              <MessageCircle size={16} /> Discord Community
            </div>
            <h2 className="font-display text-5xl md:text-6xl uppercase text-white leading-none">
              Join 500+<br />Fighters
            </h2>
            <p className="font-body mt-6 text-xl text-white/90">
              Get feedback on your technique, share wins, and connect with other fighters training with Coach Josh.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                'Post form check videos for feedback',
                'Weekly live Q&A sessions',
                'Exclusive training tips & drills',
                'Accountability & motivation',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-body text-white">
                  <Check size={20} className="text-white" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-12">
              <a 
                href="https://discord.gg/a2xUbWC664" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button 
                  variant="outline" 
                  className="bg-white text-[#4A6FA5] border-white hover:bg-[#F2E8DC]"
                >
                  Join Discord (Free) <ArrowUpRight size={18} />
                </Button>
              </a>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-md">
            <div className="border-4 border-[#1A1A1A] bg-[#2C2F33] rounded-lg overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <div className="bg-[#23272A] px-4 py-3 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#4A6FA5] flex items-center justify-center">
                  <span className="font-display text-white text-sm">CJ</span>
                </div>
                <div>
                  <div className="font-display text-white text-sm">Coach Josh Official</div>
                  <div className="text-xs text-green-400 flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-green-400"></span>
                    532 online
                  </div>
                </div>
              </div>
              
              <div className="p-4 space-y-2">
                {[
                  { name: '# announcements', unread: false },
                  { name: '# form-checks', unread: true },
                  { name: '# workout-check-ins', unread: true },
                  { name: '# wins-and-prs', unread: false },
                  { name: '# ask-coach-josh', unread: true },
                ].map((channel, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "px-3 py-2 rounded text-sm font-body",
                      channel.unread ? "text-white bg-white/10" : "text-white/60"
                    )}
                  >
                    {channel.name}
                    {channel.unread && (
                      <span className="ml-2 h-2 w-2 rounded-full bg-[#D1495B] inline-block"></span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    {
      q: "Will the strength training make me slow?",
      a: "No. Lifting slowly makes you slow. We train with 'Compensatory Acceleration' — even if the weight is heavy, you try to move it as fast as possible. This teaches your nervous system to fire quickly."
    },
    {
      q: "I'm a complete beginner. Is this for me?",
      a: "The programs work best if you have at least 6 months of basic gym experience. If you're brand new to training, start with the free Week 1 sampler to see if it's a good fit."
    },
    {
      q: "What equipment do I need?",
      a: "For the digital programs, you'll need access to a gym with barbells, dumbbells, a pull-up bar, and ideally a heavy bag. Home alternatives are provided for most exercises."
    },
    {
      q: "How is Corner Man different from the Blueprint?",
      a: "The Striking Blueprint is a one-time PDF purchase with the full technique breakdown. Corner Man ($29/mo) includes personalized video feedback on YOUR technique, plus access to the community and weekly live sessions."
    },
    {
      q: "Can I cancel my subscription anytime?",
      a: "Yes. Cancel anytime with one click. No contracts, no hassle. You'll keep access until the end of your billing period."
    },
  ];

  return (
    <section className="border-t-2 border-[#1A1A1A] bg-white px-6 py-24 md:px-12">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-6xl uppercase text-[#1A1A1A]">
            Questions?
          </h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={false}
              className="border-2 border-[#1A1A1A] bg-[#F2E8DC]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-display text-xl text-[#1A1A1A]">{faq.q}</span>
                <ChevronDown 
                  size={24} 
                  className={cn(
                    "text-[#4A6FA5] transition-transform",
                    openIndex === i && "rotate-180"
                  )} 
                />
              </button>
              
              <motion.div
                initial={false}
                animate={{ 
                  height: openIndex === i ? 'auto' : 0,
                  opacity: openIndex === i ? 1 : 0
                }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 font-body text-[#1A1A1A]/80 leading-relaxed">
                  {faq.a}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="border-t-2 border-[#1A1A1A] bg-[#1A1A1A]">
    <div className="mx-auto max-w-7xl px-6 py-16 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <h3 className="font-display text-4xl uppercase tracking-wider text-white">Coach Josh Official</h3>
          <p className="font-body mt-4 text-white/60 max-w-md">
            Stop throwing arm punches. Master the slip, the shift, and the science of striking.
          </p>
          <div className="mt-6 flex gap-4">
            <a href="https://tiktok.com/@coachjosh" target="_blank" rel="noopener noreferrer" className="h-10 w-10 border-2 border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#1A1A1A] transition-colors">
              <span className="font-display text-sm">TT</span>
            </a>
            <a href="https://instagram.com/coachjosh" target="_blank" rel="noopener noreferrer" className="h-10 w-10 border-2 border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#1A1A1A] transition-colors">
              <span className="font-display text-sm">IG</span>
            </a>
            <a href="https://youtube.com/@coachjosh" target="_blank" rel="noopener noreferrer" className="h-10 w-10 border-2 border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#1A1A1A] transition-colors">
              <span className="font-display text-sm">YT</span>
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="font-display text-lg uppercase text-white mb-4">Programs</h4>
          <ul className="space-y-2 font-body text-white/60">
            <li><Link href="#free" className="hover:text-white transition-colors">Free Week 1</Link></li>
            <li><Link href="#programs" className="hover:text-white transition-colors">Striking Blueprint</Link></li>
            <li><Link href="/cornerman" className="hover:text-white transition-colors">Corner Man VIP</Link></li>
            <li><Link href="#training" className="hover:text-white transition-colors">1-on-1 Training</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-display text-lg uppercase text-white mb-4">Support</h4>
          <ul className="space-y-2 font-body text-white/60">
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/refunds" className="hover:text-white transition-colors">Refund Policy</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="mt-16 pt-8 border-t border-white/10 text-center">
        <p className="font-body text-sm text-white/40">© 2026 Coach Josh Official. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const searchParams = useSearchParams();
  const showDownload = searchParams.get('success');
  
  const [loading, setLoading] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  const BOOKING_LINK = "https://calendly.com/mais-joshua/training-session?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=ccff00"; 

  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const daysLeft = daysInMonth - today.getDate();
  const spotsLeft = Math.max(1, Math.floor((daysLeft / daysInMonth) * 8));

  const handleCheckout = async (priceId: string, mode: 'payment' | 'subscription', path: string = '') => {
    setLoading(priceId);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, mode, successPath: path }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url; else setLoading(null);
    } catch (e) { console.error(e); setLoading(null); }
  };

  if (showDownload) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A1A]/90 backdrop-blur-md">
        <div className="max-w-md w-full border-4 border-[#1A1A1A] bg-[#F2E8DC] p-8 text-center shadow-[8px_8px_0px_0px_#4A6FA5]">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#1A1A1A] bg-[#4A6FA5] text-white">
            <Check size={32} />
          </div>
          <h2 className="font-display text-5xl text-[#1A1A1A] mb-2">YOU'RE IN.</h2>
          <p className="font-body text-[#1A1A1A] mb-8">Here is your Striking Blueprint PDF.</p>
          <a href="/assets/guide.pdf" download className="block w-full border-2 border-[#1A1A1A] bg-[#4A6FA5] py-4 font-display text-xl text-white hover:bg-[#D1495B] transition-colors shadow-[4px_4px_0px_0px_#000]">DOWNLOAD NOW</a>
          <Link href="/" className="mt-4 block font-body text-sm text-[#1A1A1A] underline hover:text-[#4A6FA5]">Close Window</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#F2E8DC] font-sans text-[#1A1A1A] selection:bg-[#4A6FA5] selection:text-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Courier+Prime:wght@400;700&display=swap');
        .font-display { font-family: 'Oswald', sans-serif; }
        .font-body { font-family: 'Courier Prime', monospace; }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 20s linear infinite; }
      `}</style>
      
      <PaperTexture />
      <Navigation />
      
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
             <p className="font-body max-w-xl text-xl font-bold text-[#1A1A1A] bg-[#F2E8DC]/80 p-2 border-l-4 border-[#4A6FA5]">
              Stop throwing arm punches. Master the slip, the shift, and the science of striking. Technical drills from the 50M+ view TikTok archive.
             </p>
             
             <div className="flex flex-wrap gap-4 mt-4">
               <Link href="#free">
                 <Button variant="primary">
                   Get Free Week <Download size={18} />
                 </Button>
               </Link>
               <Link href="#programs">
                 <Button variant="outline">
                   View Programs <ArrowUpRight size={18} />
                 </Button>
               </Link>
             </div>
          </motion.div>
        </div>

        <div className="relative z-30 mt-12 flex flex-wrap gap-12 border-t-2 border-[#1A1A1A] pt-8">
          <div><div className="font-display text-5xl text-[#4A6FA5]">50M+</div><div className="font-body text-xs font-bold uppercase tracking-widest text-[#1A1A1A]">TikTok Views</div></div>
          <div><div className="font-display text-5xl text-[#4A6FA5]">100+</div><div className="font-body text-xs font-bold uppercase tracking-widest text-[#1A1A1A]">Fighters Trained</div></div>
          <div><div className="font-display text-5xl text-[#4A6FA5]">4.9★</div><div className="font-body text-xs font-bold uppercase tracking-widest text-[#1A1A1A]">Average Rating</div></div>
        </div>
      </section>

      <Marquee text="HAND SPEED • FOOTWORK • POWER • DEFENSE • SLIP • ROLL • " />

      {/* FREE SAMPLER */}
      <FreeSamplerSection />

      {/* RECENT UPLOADS */}
      <RecentUploads />

      {/* PRODUCTS */}
      <section id="programs" className="relative px-6 py-32 md:px-12 bg-[#F2E8DC]">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-7xl uppercase text-[#1A1A1A]">
            Choose Your Path
          </h2>
        </div>
        
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Card 1 */}
          <motion.div whileHover={{ y: -10 }} className="relative flex flex-col justify-between border-4 border-[#1A1A1A] bg-white p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 border border-[#1A1A1A] bg-[#F2E8DC] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#1A1A1A]">
                <Target size={12} className="text-[#4A6FA5]" /> Digital Guide
              </div>
              <h2 className="font-display text-5xl md:text-6xl uppercase text-[#1A1A1A]">Striking Blueprint</h2>
              <p className="font-body mt-4 text-lg text-[#1A1A1A]/80">
                The complete technical breakdown. Generate power from the floor, fix your uppercut, and master distance.
              </p>
              <ul className="mt-8 space-y-4 font-body">
                {['Footwork Drills & Angles', 'Heavy Bag Workouts', 'Defensive Head Movement', 'Strength Program (4x/week)', 'Printable Workout Logs'].map(i => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-[#1A1A1A]">
                    <Check size={16} className="text-[#4A6FA5] stroke-[3px]"/>{i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-12 pt-8 border-t-2 border-[#1A1A1A]/10">
              <div className="mb-6 flex items-baseline gap-2"><span className="font-display text-6xl text-[#4A6FA5]">$49</span><span className="font-body font-bold text-[#1A1A1A]/60">one-time</span></div>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => handleCheckout('price_1SmNmGGa2N5PNf9K1XyVzvEF', 'payment')}
                disabled={loading === 'price_1SmNmGGa2N5PNf9K1XyVzvEF'}
              >
{loading === 'price_1SmNmGGa2N5PNf9K1XyVzvEF' ? 'Processing...' : 'Get Blueprint'} <ArrowUpRight size={18} />
              </Button>
            </div>
          </motion.div>

          {/* Card 2 - Corner Man */}
          <motion.div whileHover={{ y: -10 }} className="relative flex flex-col justify-between border-4 border-[#1A1A1A] bg-[#4A6FA5] p-8 text-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <div className="absolute right-[-4px] top-[-24px] border-2 border-[#1A1A1A] bg-[#D1495B] px-4 py-2 font-display text-xl text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              MOST POPULAR
            </div>
            <div>
              <div className="mb-6 inline-flex items-center gap-2 border border-white bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
                <Trophy size={12} /> Elite Training
              </div>
              <h2 className="font-display text-5xl md:text-6xl uppercase text-white">Corner Man</h2>
              <p className="font-body mt-4 text-lg font-bold text-white/90">
                I'm in your corner. Upload your sparring or bag work, and I'll break down exactly what you're doing wrong.
              </p>
              <ul className="mt-8 space-y-4 font-body">
                {['Everything in Blueprint', 'Weekly Video Form Analysis', 'Live Fight IQ Breakdowns', 'Private Discord Community', 'Monthly Live Q&A Calls'].map(i => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-white">
                    <Check size={16} className="text-white stroke-[3px]" />{i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-12 pt-8 border-t-2 border-white/20">
              <div className="mb-6 flex items-baseline gap-2"><span className="font-display text-6xl text-white">$29</span><span className="font-body font-bold text-white/60">/month</span></div>
              <Link href="/cornerman" className="block w-full">
                <Button 
                  variant="primary" 
                  className="w-full bg-white text-[#4A6FA5] border-transparent hover:bg-[#F2E8DC]"
                >
                   Join Corner Man <Shield size={18} />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* COMMUNITY */}
      <CommunitySection />

      {/* PRIVATE TRAINING */}
      <section id="training" className="border-t-2 border-[#1A1A1A] bg-white px-6 py-32 md:px-12">
         <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 lg:flex-row">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 font-display text-[#D1495B] font-bold uppercase tracking-widest text-sm">
                 <div className="h-3 w-3 rounded-full bg-[#D1495B] animate-pulse"></div>
                 Only {spotsLeft} Spots Left This Month
              </div>
              <h2 className="font-display text-6xl md:text-7xl uppercase text-[#1A1A1A] leading-none">
                Train <br/> In Person
              </h2>
              <p className="font-body mt-6 text-xl text-[#1A1A1A]/80">
                Based in New Haven, CT? Book a 1-on-1 private session. Mitts, sparring strategy, and film study. Real coaching, real results.
              </p>
              <ul className="mt-8 space-y-3 font-body">
                {['Pad work & technique refinement', 'Sparring strategy session', 'Film breakdown of your fights', 'Custom training plan'].map(i => (
                  <li key={i} className="flex items-center gap-3 text-[#1A1A1A]/80">
                    <Check size={16} className="text-[#4A6FA5]" />{i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative group">
              <div className="absolute top-2 left-2 h-full w-full rounded-lg bg-[#1A1A1A]"></div>
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="relative flex items-center gap-4 border-2 border-[#1A1A1A] bg-[#F2E8DC] px-12 py-8 transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:bg-white"
              >
                <div className="text-left">
                  <div className="font-display text-3xl text-[#1A1A1A] uppercase">Book Session</div>
                  <div className="font-body text-sm font-bold text-[#4A6FA5]">$150 / Hour</div>
                </div>
                <ArrowUpRight size={32} className="text-[#1A1A1A]" />
              </button>
            </div>
         </div>
      </section>

      <FAQSection />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} bookingUrl={BOOKING_LINK} />
      <Footer />
    </main>
  );
}

