'use client';

import { useUser, UserButton } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { Loader2, ChevronLeft, Crown } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import CornerManSalesPage from '@/components/sales/corner-man-sales-page';
import StreakBanner from '@/components/cornerman/streak-banner';
import TodaysWorkout from '@/components/cornerman/todays-workout';
import { VideoCardSkeleton, AudioCardSkeleton, StatCardSkeleton, ChatMessageSkeleton } from '@/components/cornerman/skeletons';
import { checkBypassStatus } from '../admin/bypass/actions';

// Dynamic imports for code splitting - heavy tab components
const VideoVault = dynamic(() => import('@/components/cornerman/video-vault'), {
  loading: () => <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"><VideoCardSkeleton /><VideoCardSkeleton /><VideoCardSkeleton /></div>,
});
const AudioCorner = dynamic(() => import('@/components/cornerman/audio-corner'), {
  loading: () => <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"><AudioCardSkeleton /><AudioCardSkeleton /><AudioCardSkeleton /></div>,
});
const BreathworkTimer = dynamic(() => import('@/components/BreathworkTimer'), {
  loading: () => <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin" /></div>,
});
const WorkoutBuilder = dynamic(() => import('@/components/cornerman/workout-builder'), {
  loading: () => <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin" /></div>,
});
const AnalyticsDashboard = dynamic(() => import('@/components/cornerman/analytics-dashboard'), {
  loading: () => <div className="grid grid-cols-2 md:grid-cols-4 gap-4"><StatCardSkeleton /><StatCardSkeleton /><StatCardSkeleton /><StatCardSkeleton /></div>,
});
const ChatInterface = dynamic(() => import('@/components/cornerman/chat-interface'), {
  loading: () => <div className="space-y-4 p-4"><ChatMessageSkeleton /><ChatMessageSkeleton /></div>,
});

// ProgressDashboard is lightweight, keep static
import ProgressDashboard from '@/components/cornerman/progress-dashboard';

// Tabs configuration
const TABS = [
  { id: 'videos', label: 'Video Vault' },
  { id: 'audio', label: 'Audio Corner' },
  { id: 'breathwork', label: 'Breathwork' },
  { id: 'training', label: 'Training Plan' },
  { id: 'stats', label: 'My Stats' },
  { id: 'cornerman', label: 'Digital Coach' },
];

export default function CornerManPage() {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState('videos');

  // Subscription state
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  const [checkingSubscription, setCheckingSubscription] = useState(true);


  useEffect(() => {
    if (isLoaded) {
      checkBypassStatus().then((hasBypass) => {
        if (hasBypass) {
          setIsSubscribed(true);
        } else {
          // Corner Man is waitlist-only for now — no active subscriptions
          setIsSubscribed(false);
        }
        setCheckingSubscription(false);
      });
    }
  }, [user, isLoaded]);

  // 1. Loading State
  if (!isLoaded || checkingSubscription) {
    return (
      <div className="min-h-screen bg-[#F2E8DC] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#1A1A1A] mx-auto mb-4" />
          <p className="font-display text-xl uppercase animate-pulse">Loading Corner Man...</p>
        </div>
      </div>
    );
  }

  // 2. Not Logged In OR Not Subscribed -> Show Sales Page
  if (!user || !isSubscribed) {
    return <CornerManSalesPage />;
  }


  // Navigation handler for Today's Workout
  const handleWorkoutSelect = (type: string, _id?: string) => {
    // Switch to the appropriate tab immediately
    if (type === 'video') setActiveTab('videos');
    else if (type === 'audio') setActiveTab('audio');
    else if (type === 'breathwork') setActiveTab('breathwork');
    else if (type === 'training') setActiveTab('training');

    // Scroll to content area for better UX
    setTimeout(() => {
      const content = document.getElementById('main-content');
      content?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // 4. Authorized Content
  return (
    <div className="min-h-screen bg-[#F2E8DC]">
      {/* Branded Header */}
      <header className="sticky top-0 z-50 bg-[#1A1A1A] border-b-4 border-[#4A6FA5]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Left: Logo + Navigation */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors font-body text-sm uppercase tracking-wider"
            >
              <ChevronLeft size={16} />
              Home
            </Link>
            <div className="h-6 w-px bg-white/20" />
            <div className="flex items-center gap-3">
              <span className="text-2xl">🥊</span>
              <div>
                <h1 className="font-display text-xl uppercase text-white tracking-wide">
                  Coach Josh
                </h1>
                <p className="font-body text-xs text-white/50 uppercase tracking-widest -mt-1">
                  Corner Man Vault
                </p>
              </div>
            </div>
          </div>

          {/* Right: VIP Badge + User */}
          <div className="flex items-center gap-4">
            {/* VIP Badge */}
            <div className="hidden sm:flex items-center gap-2 bg-[#4A6FA5] px-3 py-1.5 border border-white/20">
              <Crown size={14} className="text-yellow-400" />
              <span className="font-display text-xs uppercase text-white tracking-wider">
                VIP Member
              </span>
            </div>

            {/* Welcome Text (hidden on mobile) */}
            <span className="hidden md:block font-body text-sm text-white/70">
              Welcome, <span className="text-white font-bold">{user.firstName || 'Fighter'}</span>
            </span>

            {/* Clerk User Button */}
            <div className="border-2 border-white/30 rounded-full p-0.5 hover:border-[#4A6FA5] transition-colors">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9"
                  }
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Streak Banner */}
      <StreakBanner />

      <main id="main-content" role="main" className="max-w-7xl mx-auto px-4 py-8">

        {/* Today's Workout Recommendation */}
        <TodaysWorkout onSelectWorkout={handleWorkoutSelect} />

        {/* Tab Navigation - Horizontal Scroll on Mobile */}
        <div className="relative mb-8 border-b-2 border-[#1A1A1A]/10 pb-6">

          <div
            role="tablist"
            aria-label="Corner Man sections"
            className="mobile-nav-scroll gap-3 sm:gap-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
            onKeyDown={(e) => {
              const currentIndex = TABS.findIndex(tab => tab.id === activeTab);
              if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % TABS.length;
                setActiveTab(TABS[nextIndex].id);
                document.getElementById(`tab-${TABS[nextIndex].id}`)?.focus();
              } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = (currentIndex - 1 + TABS.length) % TABS.length;
                setActiveTab(TABS[prevIndex].id);
                document.getElementById(`tab-${TABS[prevIndex].id}`)?.focus();
              } else if (e.key === 'Home') {
                e.preventDefault();
                setActiveTab(TABS[0].id);
                document.getElementById(`tab-${TABS[0].id}`)?.focus();
              } else if (e.key === 'End') {
                e.preventDefault();
                setActiveTab(TABS[TABS.length - 1].id);
                document.getElementById(`tab-${TABS[TABS.length - 1].id}`)?.focus();
              }
            }}
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`tabpanel-${tab.id}`}
                tabIndex={activeTab === tab.id ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                className={`font-display text-base sm:text-xl uppercase px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-[#1A1A1A] transition-all duration-200 whitespace-nowrap flex-shrink-0 sm:flex-shrink focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A6FA5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F2E8DC] ${activeTab === tab.id
                  ? 'bg-[#1A1A1A] text-white shadow-none translate-x-[2px] translate-y-[2px]'
                  : 'bg-white text-[#1A1A1A] hover:bg-[#F2E8DC] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div
          id={`tabpanel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          tabIndex={0}
          className="animate-in fade-in slide-in-from-bottom-4 duration-500 focus:outline-none"
        >

          {activeTab === 'videos' && <VideoVault />}

          {activeTab === 'audio' && <AudioCorner />}

          {activeTab === 'breathwork' && (
            <div className="flex items-center justify-center min-h-[calc(100vh-300px)]">
              <BreathworkTimer />
            </div>
          )}

          {activeTab === 'training' && <WorkoutBuilder />}

          {activeTab === 'stats' && <AnalyticsDashboard />}

          {activeTab === 'cornerman' && (
            <div className="max-w-5xl mx-auto">
              <div className="bg-white border-2 border-[#1A1A1A] p-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="bg-[#1A1A1A] p-4 flex items-center justify-between">
                  <h2 className="font-display text-2xl uppercase text-white flex items-center gap-2">
                    <span>🥊</span> Digital Cornerman
                  </h2>
                  <span className="text-white/60 font-mono text-xs uppercase">Your Digital Corner Man</span>
                </div>
                <div className="h-[600px]">
                  <ChatInterface />
                </div>
              </div>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}