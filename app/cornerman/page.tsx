// app/cornerman/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Lock, Clock, ChevronLeft, Check, 
  MessageCircle, Download, ChevronRight, 
  Star, Zap, Trophy, Target, Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useUser, UserButton } from "@clerk/nextjs";
import VideoPlayer from '@/components/video-player';
import BreathworkTimer from '@/components/BreathworkTimer';

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

const LoadingSpinner = () => (
  <div className="flex items-center justify-center gap-3">
    <Loader2 className="h-6 w-6 animate-spin text-[#4A6FA5]" />
    <span className="font-display text-lg uppercase">Loading...</span>
  </div>
);

// --- TYPES ---
interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  muxPlaybackId: string;
  order: number;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
}

// --- VIDEO DATA ---
const VIDEOS: Video[] = [
  { 
    id: '1', 
    title: "The Perfect Uppercut Mechanics", 
    description: "Learn the proper weight transfer and hip rotation for devastating uppercuts. We'll break down the common mistakes and how to fix them.",
    duration: "12:40", 
    category: "technique", 
    muxPlaybackId: "yb2L3z3Z4IKQH02HYkf9xPToVYkOC85WA",
    order: 1
  },
  { 
    id: '2', 
    title: "Sparring Analysis: Keeping Range", 
    description: "Film study session breaking down how to control distance and when to engage.",
    duration: "24:10", 
    category: "fight-iq", 
    muxPlaybackId: "yb2L3z3Z4IKQH02HYkf9xPToVYkOC85WA",
    order: 2
  },
  { 
    id: '3', 
    title: "Heavy Bag: Power Generation", 
    description: "A complete heavy bag workout focused on generating power from the ground up.",
    duration: "15:00", 
    category: "drills", 
    muxPlaybackId: "yb2L3z3Z4IKQH02HYkf9xPToVYkOC85WA",
    order: 3
  },
  { 
    id: '4', 
    title: "Defensive Head Movement Routine", 
    description: "Daily drills to improve your slips, rolls, and pull-backs.",
    duration: "18:30", 
    category: "technique", 
    muxPlaybackId: "yb2L3z3Z4IKQH02HYkf9xPToVYkOC85WA",
    order: 4
  },
  { 
    id: '5', 
    title: "Southpaw Strategy Guide", 
    description: "How to fight southpaws and how to fight AS a southpaw.",
    duration: "21:00", 
    category: "fight-iq", 
    muxPlaybackId: "yb2L3z3Z4IKQH02HYkf9xPToVYkOC85WA",
    order: 5
  },
  { 
    id: '6', 
    title: "Conditioning for Championship Rounds", 
    description: "Build the gas tank to keep throwing in rounds 10-12.",
    duration: "45:00", 
    category: "conditioning", 
    muxPlaybackId: "yb2L3z3Z4IKQH02HYkf9xPToVYkOC85WA",
    order: 6
  },
];

const CATEGORIES: Category[] = [
  { id: 'all', name: 'All Videos', icon: <Zap size={16} />, count: VIDEOS.length },
  { id: 'technique', name: 'Technique', icon: <Target size={16} />, count: VIDEOS.filter(v => v.category === 'technique').length },
  { id: 'fight-iq', name: 'Fight IQ', icon: <Trophy size={16} />, count: VIDEOS.filter(v => v.category === 'fight-iq').length },
  { id: 'drills', name: 'Drills', icon: <Clock size={16} />, count: VIDEOS.filter(v => v.category === 'drills').length },
  { id: 'conditioning', name: 'Conditioning', icon: <Zap size={16} />, count: VIDEOS.filter(v => v.category === 'conditioning').length },
];

export default function CornerManPage() {
  const { user, isLoaded } = useUser();
  
  // State
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  const [checkingSubscription, setCheckingSubscription] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'videos' | 'breathwork'>('videos');
  
  // Check subscription status
  useEffect(() => {
    const checkSubscription = async () => {
      if (!user) {
        setCheckingSubscription(false);
        return;
      }
      
      try {
        const res = await fetch('/api/check-subscription');
        const data = await res.json();
        setIsSubscribed(data.isSubscribed);
        
        if (data.isSubscribed && VIDEOS.length > 0) {
          setActiveVideo(VIDEOS[0]);
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
        setIsSubscribed(false);
      } finally {
        setCheckingSubscription(false);
      }
    };
    
    if (isLoaded) {
      checkSubscription();
    }
  }, [user, isLoaded]);

  // Filter videos
  const filteredVideos = activeCategory === 'all' 
    ? VIDEOS 
    : VIDEOS.filter(v => v.category === activeCategory);

  // Checkout handler
  const handleCheckout = async () => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          priceId: process.env.NEXT_PUBLIC_STRIPE_CORNERMAN_PRICE_ID || 'price_1SmNmRGa2N5PNf9Kxdwj6l6d',
          mode: 'subscription',
          successPath: '/cornerman'
        }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  // Play next video
  const playNextVideo = () => {
    if (!activeVideo) return;
    const currentIndex = filteredVideos.findIndex(v => v.id === activeVideo.id);
    const nextIndex = (currentIndex + 1) % filteredVideos.length;
    setActiveVideo(filteredVideos[nextIndex]);
  };

  // Loading state
  if (!isLoaded || checkingSubscription) {
    return (
      <div className="min-h-screen bg-[#F2E8DC] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-[#F2E8DC] flex items-center justify-center p-4">
        <PaperTexture />
        <div className="text-center max-w-md">
          <div className="mb-6 h-20 w-20 mx-auto rounded-full bg-[#1A1A1A] flex items-center justify-center text-white">
            <Lock size={40} />
          </div>
          <h1 className="font-display text-4xl text-[#1A1A1A] mb-4 uppercase">Members Only</h1>
          <p className="font-body text-[#1A1A1A]/80 mb-8">
            Sign in to access the Corner Man vault.
          </p>
          <Link 
            href="/sign-in?redirect_url=/cornerman"
            className="inline-block w-full bg-[#4A6FA5] border-2 border-[#1A1A1A] text-white font-display text-xl uppercase py-4 hover:bg-[#4A6FA5]/90 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            Sign In
          </Link>
          <Link href="/" className="block mt-4 font-body text-sm text-[#1A1A1A]/60 hover:text-[#4A6FA5]">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F2E8DC] text-[#1A1A1A]">
      <PaperTexture />

      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b-2 border-[#1A1A1A] bg-[#F2E8DC] px-4 md:px-6 py-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 font-body text-sm font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#4A6FA5] transition-colors">
            <ChevronLeft size={16} /> Home
          </Link>
          <span className="hidden md:block text-[#1A1A1A]/30">|</span>
          <div className="hidden md:block font-display text-xl text-[#4A6FA5] uppercase tracking-tighter">
            CORNER MAN <span className="text-[#1A1A1A]/50 text-sm font-body ml-1">VAULT</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {isSubscribed && (
            <a 
              href="https://discord.gg/YOUR_INVITE" 
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2 border-2 border-[#1A1A1A] bg-white font-body text-sm font-bold hover:bg-[#4A6FA5] hover:text-white transition-colors"
            >
              <MessageCircle size={16} />
              Discord
            </a>
          )}
          
          <div className="border-2 border-[#1A1A1A] rounded-full p-0.5 bg-white">
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8"
                }
              }}
            />
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      {isSubscribed && (
        <div className="border-b-2 border-[#1A1A1A] bg-white px-4 md:px-6 flex gap-1">
          <button
            onClick={() => setActiveTab('videos')}
            className={`
              px-6 py-3 font-display text-sm uppercase tracking-wider transition-colors relative
              ${activeTab === 'videos' 
                ? 'text-[#4A6FA5] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-[#4A6FA5]' 
                : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
              }
            `}
          >
            Video Vault
          </button>
          <button
            onClick={() => setActiveTab('breathwork')}
            className={`
              px-6 py-3 font-display text-sm uppercase tracking-wider transition-colors relative
              ${activeTab === 'breathwork' 
                ? 'text-[#4A6FA5] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-[#4A6FA5]' 
                : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
              }
            `}
          >
            Breathwork
          </button>
        </div>
      )}

      {/* Paywall */}
      {!isSubscribed ? (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg w-full"
          >
            <div className="mb-6 h-20 w-20 mx-auto rounded-full bg-[#4A6FA5] flex items-center justify-center text-white">
              <Trophy size={40} />
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl text-[#1A1A1A] mb-4 uppercase">
              Welcome, {user?.firstName || 'Fighter'}
            </h1>
            <p className="font-body text-[#1A1A1A]/80 text-lg mb-8">
              Your account is ready. Activate your membership to unlock the full video vault.
            </p>

            <div className="p-8 border-4 border-[#1A1A1A] bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <div className="mb-6 inline-flex items-center gap-2 border-2 border-[#D1495B] bg-[#D1495B]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#D1495B]">
                <Star size={12} /> Most Popular
              </div>
              
              <h3 className="font-display text-3xl text-[#1A1A1A] mb-2 uppercase">Corner Man VIP</h3>
              <div className="flex items-baseline justify-center gap-2 mb-6">
                <span className="font-display text-5xl text-[#4A6FA5]">$29</span>
                <span className="font-body text-[#1A1A1A]/60">/month</span>
              </div>
              
              <ul className="text-left space-y-3 mb-8 font-body text-sm">
                {[
                  'Full Video Library (50+ lessons)',
                  'Weekly New Content',
                  'Fight IQ Breakdowns',
                  'Private Discord Community',
                  'Monthly Live Q&A',
                  'Cancel Anytime'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check size={16} className="text-[#4A6FA5] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={handleCheckout}
                className="w-full bg-[#4A6FA5] border-2 border-[#1A1A1A] text-white font-display text-xl uppercase py-4 hover:bg-[#D1495B] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                Start Membership
              </button>
            </div>
          </motion.div>
        </div>
      ) : (
        /* Unlocked Dashboard with Tabs */
        activeTab === 'videos' ? (
          <div className="flex min-h-[calc(100vh-130px)]">
            {/* Sidebar - Desktop */}
            <aside className={`
              ${sidebarOpen ? 'w-64' : 'w-16'} 
              border-r-2 border-[#1A1A1A] bg-white transition-all duration-300 overflow-hidden flex-shrink-0
              hidden md:block
            `}>
              <div className="p-4">
                {sidebarOpen ? (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-display text-lg uppercase">Categories</h3>
                      <button 
                        onClick={() => setSidebarOpen(false)}
                        className="p-1 hover:bg-[#F2E8DC] transition-colors"
                      >
                        <ChevronLeft size={20} />
                      </button>
                    </div>
                    
                    <nav className="space-y-1">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setActiveCategory(cat.id)}
                          className={`
                            w-full flex items-center gap-3 px-3 py-2 font-body text-sm text-left transition-all
                            ${activeCategory === cat.id 
                              ? 'bg-[#4A6FA5]/10 border-l-4 border-[#4A6FA5] text-[#4A6FA5] font-bold' 
                              : 'hover:bg-[#F2E8DC] border-l-4 border-transparent'
                            }
                          `}
                        >
                          {cat.icon}
                          <span className="flex-1">{cat.name}</span>
                          <span className="text-xs opacity-50">{cat.count}</span>
                        </button>
                      ))}
                    </nav>
                    
                    {/* Quick Links */}
                    <div className="mt-8 pt-6 border-t border-[#1A1A1A]/10">
                      <h4 className="font-display text-xs uppercase text-[#1A1A1A]/50 mb-3">Resources</h4>
                      <div className="space-y-1">
                        <a 
                          href="/assets/blueprint.pdf" 
                          download
                          className="flex items-center gap-2 px-3 py-2 font-body text-sm hover:bg-[#F2E8DC] transition-colors"
                        >
                          <Download size={16} />
                          Blueprint PDF
                        </a>
                        <a 
                          href="https://discord.gg/YOUR_INVITE" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 font-body text-sm hover:bg-[#F2E8DC] transition-colors"
                        >
                          <MessageCircle size={16} />
                          Discord
                        </a>
                      </div>
                    </div>
                  </>
                ) : (
                  <button 
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 hover:bg-[#F2E8DC] transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                )}
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              {/* Video Player */}
              <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
                {activeVideo ? (
                  <motion.div
                    key={activeVideo.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Video Player Component */}
                    <div className="border-4 border-[#1A1A1A] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                      <VideoPlayer
                        playbackId={activeVideo.muxPlaybackId}
                        title={activeVideo.title}
                        onEnded={playNextVideo}
                      />
                    </div>
                    
                    {/* Video Info */}
                    <div className="mt-6">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <span className="inline-block mb-2 border border-[#4A6FA5] bg-[#4A6FA5]/10 px-2 py-1 text-xs font-bold uppercase tracking-widest text-[#4A6FA5]">
                            {activeVideo.category}
                          </span>
                          <h1 className="font-display text-2xl md:text-4xl uppercase text-[#1A1A1A]">
                            {activeVideo.title}
                          </h1>
                          <p className="font-body text-sm text-[#1A1A1A]/60 mt-1 flex items-center gap-2">
                            <Clock size={14} />
                            {activeVideo.duration}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-6 border-l-4 border-[#4A6FA5] bg-white p-6">
                        <h3 className="font-display text-xl uppercase text-[#1A1A1A] mb-2">About This Lesson</h3>
                        <p className="font-body text-[#1A1A1A]/80 leading-relaxed">
                          {activeVideo.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex items-center justify-center h-64 border-4 border-dashed border-[#1A1A1A]/20">
                    <p className="font-body text-[#1A1A1A]/50">Select a video to start watching</p>
                  </div>
                )}
              </div>

              {/* Playlist */}
              <div className="w-full lg:w-96 border-t-2 lg:border-t-0 lg:border-l-2 border-[#1A1A1A] bg-white flex flex-col">
                <div className="p-4 border-b-2 border-[#1A1A1A] bg-[#F2E8DC] flex-shrink-0">
                  <h3 className="font-display text-lg uppercase">
                    {activeCategory === 'all' ? 'All Videos' : CATEGORIES.find(c => c.id === activeCategory)?.name}
                  </h3>
                  <p className="font-body text-xs text-[#1A1A1A]/60 mt-1">
                    {filteredVideos.length} videos
                  </p>
                </div>
                
                {/* Mobile Category Pills */}
                <div className="md:hidden p-4 border-b border-[#1A1A1A]/10 overflow-x-auto flex-shrink-0">
                  <div className="flex gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`
                          whitespace-nowrap px-3 py-1 font-body text-xs border-2 transition-colors
                          ${activeCategory === cat.id 
                            ? 'bg-[#4A6FA5] border-[#1A1A1A] text-white' 
                            : 'bg-white border-[#1A1A1A]/20 hover:border-[#1A1A1A]'
                          }
                        `}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Video List */}
                <div className="flex-1 overflow-y-auto">
                  {filteredVideos.map((video, index) => (
                    <motion.button
                      key={video.id}
                      onClick={() => setActiveVideo(video)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`
                        w-full flex items-start gap-4 p-4 text-left border-b border-[#1A1A1A]/10 transition-all
                        ${activeVideo?.id === video.id 
                          ? 'bg-[#4A6FA5]/10 border-l-4 border-l-[#4A6FA5]' 
                          : 'hover:bg-[#F2E8DC] border-l-4 border-l-transparent'
                        }
                      `}
                    >
                      {/* Thumbnail */}
                      <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden border border-[#1A1A1A] bg-[#1A1A1A]">
                        <img 
                          src={`https://image.mux.com/${video.muxPlaybackId}/thumbnail.jpg?width=200&time=5`}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                          <Play size={20} className="text-white" />
                        </div>
                        <div className="absolute bottom-1 right-1 bg-[#1A1A1A]/90 px-1 text-[10px] text-white font-body">
                          {video.duration}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className={`
                          font-body text-sm font-bold line-clamp-2
                          ${activeVideo?.id === video.id ? 'text-[#4A6FA5]' : 'text-[#1A1A1A]'}
                        `}>
                          {video.title}
                        </h4>
                        <div className="mt-1 flex items-center gap-2 text-xs text-[#1A1A1A]/50 font-body capitalize">
                          {video.category.replace('-', ' ')}
                        </div>
                      </div>
                      
                      {activeVideo?.id === video.id && (
                        <div className="flex-shrink-0 self-center">
                          <div className="h-2 w-2 rounded-full bg-[#4A6FA5] animate-pulse" />
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Breathwork Tab */
          <div className="min-h-[calc(100vh-130px)] p-4 md:p-8 flex items-center justify-center">
            <BreathworkTimer />
          </div>
        )
      )}
    </main>
  );
}
