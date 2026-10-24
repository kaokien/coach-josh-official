'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Crown,
  Target,
  Trophy,
  Video,
  Calendar,
  DollarSign,
  Users,
  Mail,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowUpRight,
  Search,
  Filter,
  Plus,
  ExternalLink,
  MessageSquare,
  FileText,
  Send,
  Eye,
  X,
  Play,
  Sparkles,
  Shield,
  RefreshCw,
  ChevronRight
} from 'lucide-react';

// Athlete Data Interface
interface Athlete {
  id: string;
  name: string;
  email: string;
  instagram: string;
  timezone: string;
  tier: 'elite' | 'dev' | 'tuneup';
  tierName: string;
  monthlyAmount: number;
  startDate: string;
  nextBillingDate: string;
  nextCallDate: string;
  status: 'active' | 'review_needed' | 'call_scheduled';
  primaryGoal: string;
  footageReview: {
    hasPending: boolean;
    videoUrl?: string;
    title?: string;
    submittedDate?: string;
  };
  notes: Array<{
    date: string;
    text: string;
    type: 'technique' | 'camp' | 'call';
  }>;
}

// Initial Mock Athletes (Real-world representation of Coach Josh's 1:1 roster)
const INITIAL_ATHLETES: Athlete[] = [
  {
    id: 'ath_1',
    name: 'Marcus Vance',
    email: 'marcus.vance88@gmail.com',
    instagram: '@marcusv_boxing',
    timezone: 'EST (New York)',
    tier: 'elite',
    tierName: 'Elite 1:1 Tier',
    monthlyAmount: 500,
    startDate: 'Sep 15, 2026',
    nextBillingDate: 'Nov 15, 2026',
    nextCallDate: 'Tomorrow, 2:00 PM EST',
    status: 'review_needed',
    primaryGoal: 'Amateur bout prep (152 lbs). Soviet shift footwork and counter-punching off high guard.',
    footageReview: {
      hasPending: true,
      videoUrl: 'https://www.youtube.com/watch?v=M4uyfBR7H1I',
      title: 'Sparring Round 3 - Inside Angle Slip',
      submittedDate: 'Yesterday at 8:40 PM',
    },
    notes: [
      {
        date: 'Oct 22, 2026',
        text: 'Marcus is dropping his right hand when throwing the left hook. Prescribed Soviet 1-2 slip drill with lead hook to body.',
        type: 'technique',
      },
      {
        date: 'Oct 15, 2026',
        text: 'Call #4: Condition is peaking. 5 rounds of high-intensity bag intervals assigned 3x/week.',
        type: 'call',
      },
    ],
  },
  {
    id: 'ath_2',
    name: 'Tariq Al-Mansoor',
    email: 'tariq.box@outlook.com',
    instagram: '@tariq_strikes',
    timezone: 'GMT (London)',
    tier: 'elite',
    tierName: 'Elite 1:1 Tier',
    monthlyAmount: 500,
    startDate: 'Oct 01, 2026',
    nextBillingDate: 'Nov 01, 2026',
    nextCallDate: 'Thursday, 11:30 AM EST',
    status: 'call_scheduled',
    primaryGoal: 'Fixing telegraph on straight right hand. Increasing punch output without gassing.',
    footageReview: {
      hasPending: false,
    },
    notes: [
      {
        date: 'Oct 18, 2026',
        text: 'Film breakdown completed: Elbow flaring out on the straight right. Told him to rotate fist later in the trajectory.',
        type: 'technique',
      },
    ],
  },
  {
    id: 'ath_3',
    name: 'Elena Rostova',
    email: 'elena.rostova@icloud.com',
    instagram: '@elena_fightfit',
    timezone: 'PST (Los Angeles)',
    tier: 'elite',
    tierName: 'Elite 1:1 Tier',
    monthlyAmount: 500,
    startDate: 'Aug 20, 2026',
    nextBillingDate: 'Nov 20, 2026',
    nextCallDate: 'Friday, 4:00 PM EST',
    status: 'review_needed',
    primaryGoal: 'Mastering head movement off the bag and learning how to set traps against aggressive pressure fighters.',
    footageReview: {
      hasPending: true,
      videoUrl: 'https://www.youtube.com/watch?v=M4uyfBR7H1I',
      title: 'Heavy Bag Rhythm & Head Slip Drill',
      submittedDate: 'Today at 9:15 AM',
    },
    notes: [
      {
        date: 'Oct 14, 2026',
        text: 'Great head movement progress. Still needs to roll under counters rather than backing straight up in a line.',
        type: 'technique',
      },
    ],
  },
  {
    id: 'ath_4',
    name: 'Dominic Cruz Jr.',
    email: 'dcruz.athlete@gmail.com',
    instagram: '@domcruz_striking',
    timezone: 'CST (Chicago)',
    tier: 'dev',
    tierName: 'Online Development',
    monthlyAmount: 300,
    startDate: 'Sep 05, 2026',
    nextBillingDate: 'Nov 05, 2026',
    nextCallDate: 'Next Mon, 1:00 PM EST',
    status: 'active',
    primaryGoal: 'Building fluid 4-punch combinations and mastering distance management off the jab.',
    footageReview: {
      hasPending: false,
    },
    notes: [
      {
        date: 'Oct 09, 2026',
        text: 'Bi-weekly call #2: Jab distance improved by 6 inches. Working on the pendulum bounce step.',
        type: 'call',
      },
    ],
  },
  {
    id: 'ath_5',
    name: 'Liam Gallagher',
    email: 'liam.g.boxing@gmail.com',
    instagram: '@liamg_box',
    timezone: 'EST (Boston)',
    tier: 'dev',
    tierName: 'Online Development',
    monthlyAmount: 300,
    startDate: 'Oct 10, 2026',
    nextBillingDate: 'Nov 10, 2026',
    nextCallDate: 'Oct 30, 3:30 PM EST',
    status: 'review_needed',
    primaryGoal: 'Footwork agility and stopping heavy lunging when throwing the rear cross.',
    footageReview: {
      hasPending: true,
      videoUrl: 'https://www.youtube.com/watch?v=M4uyfBR7H1I',
      title: 'Shadowboxing Footwork Routine (Living Room)',
      submittedDate: 'Oct 23 at 4:10 PM',
    },
    notes: [
      {
        date: 'Oct 12, 2026',
        text: 'Intake call complete. Assigned 20-min Home Shadowboxing routine as baseline conditioning.',
        type: 'camp',
      },
    ],
  },
  {
    id: 'ath_6',
    name: 'Darius Miller',
    email: 'darius.miller@yahoo.com',
    instagram: '@miller_fightclub',
    timezone: 'CST (Houston)',
    tier: 'tuneup',
    tierName: 'Tune Up Coaching',
    monthlyAmount: 150,
    startDate: 'Sep 28, 2026',
    nextBillingDate: 'Oct 28, 2026',
    nextCallDate: 'Nov 02, 12:00 PM EST',
    status: 'active',
    primaryGoal: 'Monthly check-in on bag fundamentals, wrist conditioning, and jab snap.',
    footageReview: {
      hasPending: false,
    },
    notes: [
      {
        date: 'Sep 29, 2026',
        text: 'Monthly check-in: wrist wrap technique corrected. Provided bag punch sequence for week 1-4.',
        type: 'technique',
      },
    ],
  },
];

export default function AdminDashboardPage() {
  const [athletes, setAthletes] = useState<Athlete[]>(INITIAL_ATHLETES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<'all' | 'elite' | 'dev' | 'tuneup'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'review_needed' | 'call_scheduled'>('all');
  const [activeTab, setActiveTab] = useState<'athletes' | 'onboarding_email' | 'campaigns'>('athletes');
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // Financial & Roster Stats
  const stats = useMemo(() => {
    const totalMRR = athletes.reduce((acc, a) => acc + a.monthlyAmount, 0);
    const eliteCount = athletes.filter((a) => a.tier === 'elite').length;
    const devCount = athletes.filter((a) => a.tier === 'dev').length;
    const tuneUpCount = athletes.filter((a) => a.tier === 'tuneup').length;
    const pendingReviews = athletes.filter((a) => a.footageReview.hasPending).length;

    return {
      mrr: totalMRR,
      totalAthletes: athletes.length,
      eliteCount,
      devCount,
      tuneUpCount,
      pendingReviews,
    };
  }, [athletes]);

  // Filtered Athletes
  const filteredAthletes = useMemo(() => {
    return athletes.filter((a) => {
      const matchesSearch =
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.primaryGoal.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTier = selectedTier === 'all' || a.tier === selectedTier;
      const matchesStatus =
        selectedStatus === 'all' ||
        (selectedStatus === 'review_needed' && a.footageReview.hasPending) ||
        (selectedStatus === 'call_scheduled' && a.status === 'call_scheduled');

      return matchesSearch && matchesTier && matchesStatus;
    });
  }, [athletes, searchQuery, selectedTier, selectedStatus]);

  // Add Note to Selected Athlete
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim() || !selectedAthlete) return;

    const newNote = {
      date: 'Today, Just Now',
      text: newNoteText.trim(),
      type: 'technique' as const,
    };

    const updated = athletes.map((a) => {
      if (a.id === selectedAthlete.id) {
        return {
          ...a,
          notes: [newNote, ...a.notes],
        };
      }
      return a;
    });

    setAthletes(updated);
    setSelectedAthlete((prev) => (prev ? { ...prev, notes: [newNote, ...prev.notes] } : null));
    setNewNoteText('');
  };

  const handleCopyLink = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A] pb-24">
      {/* ═══════════ TOP COMMAND BAR ═══════════ */}
      <header className="border-b-4 border-[#0F172A] bg-[#0F172A] text-white px-6 py-4 sticky top-0 z-30 shadow-[0_4px_0_0_rgba(0,0,0,0.15)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 border-2 border-white bg-[#2563EB] flex items-center justify-center font-display text-xl text-white shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]">
              CJ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl uppercase tracking-wider text-white">
                  Coach Josh Official
                </h1>
                <span className="font-body text-[10px] font-bold uppercase tracking-widest bg-[#CCFF00] text-[#0F172A] px-2 py-0.5 border border-[#0F172A]">
                  Fighter HQ Admin
                </span>
              </div>
              <p className="font-body text-xs text-white/60">
                1:1 Coaching Portal · Athlete Roster &amp; Automated Pipeline
              </p>
            </div>
          </div>

          {/* Real-time Status Badge & Quick Links */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-1.5 font-body text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-[#CCFF00] animate-pulse" />
              <span>Stripe Live Webhook: Active</span>
            </div>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 border-2 border-white bg-white px-3 py-1.5 font-display text-xs uppercase tracking-wider text-[#0F172A] hover:bg-[#CCFF00] transition-colors"
            >
              Public Site <ExternalLink size={13} />
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-8">
        {/* ═══════════ NAVIGATION TABS ═══════════ */}
        <div className="flex border-b-2 border-[#0F172A] mb-8 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('athletes')}
            className={`font-display text-base uppercase tracking-wider px-6 py-3 border-t-2 border-x-2 border-[#0F172A] transition-all flex items-center gap-2 ${
              activeTab === 'athletes'
                ? 'bg-white text-[#0F172A] shadow-[4px_-4px_0px_0px_rgba(0,0,0,1)] -mb-[2px] font-bold'
                : 'bg-[#E2E8F0] text-[#0F172A]/60 hover:bg-white/60'
            }`}
          >
            <Users size={18} className="text-[#2563EB]" />
            Active Athletes ({athletes.length})
          </button>

          <button
            onClick={() => setActiveTab('onboarding_email')}
            className={`font-display text-base uppercase tracking-wider px-6 py-3 border-t-2 border-x-2 border-[#0F172A] transition-all flex items-center gap-2 ${
              activeTab === 'onboarding_email'
                ? 'bg-white text-[#0F172A] shadow-[4px_-4px_0px_0px_rgba(0,0,0,1)] -mb-[2px] font-bold'
                : 'bg-[#E2E8F0] text-[#0F172A]/60 hover:bg-white/60'
            }`}
          >
            <Mail size={18} className="text-[#DC2626]" />
            $500 Onboarding Email Simulator
          </button>

          <button
            onClick={() => setActiveTab('campaigns')}
            className={`font-display text-base uppercase tracking-wider px-6 py-3 border-t-2 border-x-2 border-[#0F172A] transition-all flex items-center gap-2 ${
              activeTab === 'campaigns'
                ? 'bg-white text-[#0F172A] shadow-[4px_-4px_0px_0px_rgba(0,0,0,1)] -mb-[2px] font-bold'
                : 'bg-[#E2E8F0] text-[#0F172A]/60 hover:bg-white/60'
            }`}
          >
            <Send size={18} className="text-[#2563EB]" />
            Email Broadcasts &amp; Campaigns
          </button>
        </div>

        {/* ═══════════ TAB 1: ATHLETES MANAGEMENT ═══════════ */}
        {activeTab === 'athletes' && (
          <div className="space-y-8">
            {/* Executive Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Metric 1: Monthly Recurring Revenue */}
              <div className="border-4 border-[#0F172A] bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs font-bold uppercase tracking-wider text-[#0F172A]/60">
                    Monthly Revenue (MRR)
                  </span>
                  <div className="h-8 w-8 bg-[#CCFF00] border border-[#0F172A] flex items-center justify-center">
                    <DollarSign size={18} className="text-[#0F172A]" />
                  </div>
                </div>
                <div className="font-display text-4xl text-[#0F172A] mt-3">
                  ${stats.mrr.toLocaleString()}
                  <span className="font-body text-xs text-[#0F172A]/60 font-bold ml-1">/mo</span>
                </div>
                <div className="font-body text-xs font-bold text-[#16A34A] mt-2 flex items-center gap-1">
                  &uarr; +22% vs previous month
                </div>
              </div>

              {/* Metric 2: Active 1:1 Athletes */}
              <div className="border-4 border-[#0F172A] bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs font-bold uppercase tracking-wider text-[#0F172A]/60">
                    Active Fighters
                  </span>
                  <div className="h-8 w-8 bg-[#2563EB] text-white border border-[#0F172A] flex items-center justify-center">
                    <Users size={18} />
                  </div>
                </div>
                <div className="font-display text-4xl text-[#2563EB] mt-3">
                  {stats.totalAthletes}
                  <span className="font-body text-xs text-[#0F172A]/60 font-bold ml-1">athletes</span>
                </div>
                <div className="font-body text-xs text-[#0F172A]/70 mt-2">
                  {stats.eliteCount} Elite · {stats.devCount} Dev · {stats.tuneUpCount} Tune-Up
                </div>
              </div>

              {/* Metric 3: Pending Film Reviews */}
              <div className="border-4 border-[#0F172A] bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs font-bold uppercase tracking-wider text-[#0F172A]/60">
                    Footage Reviews Due
                  </span>
                  <div className="h-8 w-8 bg-[#DC2626] text-white border border-[#0F172A] flex items-center justify-center">
                    <Video size={18} />
                  </div>
                </div>
                <div className="font-display text-4xl text-[#DC2626] mt-3">
                  {stats.pendingReviews}
                  <span className="font-body text-xs text-[#0F172A]/60 font-bold ml-1">pending</span>
                </div>
                <div className="font-body text-xs font-bold text-[#DC2626] mt-2">
                  Requires video technique breakdown
                </div>
              </div>

              {/* Metric 4: Calls Scheduled */}
              <div className="border-4 border-[#0F172A] bg-[#0F172A] text-white p-6 shadow-[6px_6px_0px_0px_#2563EB]">
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs font-bold uppercase tracking-wider text-white/70">
                    Calls This Week
                  </span>
                  <div className="h-8 w-8 bg-white text-[#0F172A] border border-white flex items-center justify-center">
                    <Calendar size={18} />
                  </div>
                </div>
                <div className="font-display text-4xl text-[#CCFF00] mt-3">
                  5 Calls
                </div>
                <div className="font-body text-xs text-white/80 mt-2">
                  Next: Tomorrow, 2:00 PM EST (Marcus V.)
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="border-4 border-[#0F172A] bg-white p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search input */}
              <div className="relative w-full md:w-80">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0F172A]/40" />
                <input
                  type="text"
                  placeholder="Search athlete, email, goal..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-[#0F172A] font-body text-sm placeholder:text-[#0F172A]/40 focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              {/* Tier Filters */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <span className="font-body text-xs font-bold text-[#0F172A]/50 uppercase tracking-widest mr-1">
                  Tier:
                </span>
                {(['all', 'elite', 'dev', 'tuneup'] as const).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setSelectedTier(tier)}
                    className={`font-body text-xs font-bold uppercase px-3 py-1.5 border-2 border-[#0F172A] transition-all ${
                      selectedTier === tier
                        ? 'bg-[#0F172A] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                        : 'bg-white text-[#0F172A] hover:bg-[#F1F5F9]'
                    }`}
                  >
                    {tier === 'all'
                      ? 'All'
                      : tier === 'elite'
                      ? '$500 Elite'
                      : tier === 'dev'
                      ? '$300 Dev'
                      : '$150 Tune-Up'}
                  </button>
                ))}
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <span className="font-body text-xs font-bold text-[#0F172A]/50 uppercase tracking-widest mr-1">
                  Filter:
                </span>
                <button
                  onClick={() =>
                    setSelectedStatus(selectedStatus === 'review_needed' ? 'all' : 'review_needed')
                  }
                  className={`font-body text-xs font-bold uppercase px-3 py-1.5 border-2 border-[#0F172A] transition-all flex items-center gap-1.5 ${
                    selectedStatus === 'review_needed'
                      ? 'bg-[#DC2626] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                      : 'bg-white text-[#DC2626] hover:bg-red-50'
                  }`}
                >
                  <AlertCircle size={14} /> Review Needed
                </button>
              </div>
            </div>

            {/* Athlete Roster Grid / Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAthletes.map((athlete) => (
                <div
                  key={athlete.id}
                  className={`relative border-4 border-[#0F172A] bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover-lift flex flex-col justify-between cursor-pointer transition-all ${
                    selectedAthlete?.id === athlete.id ? 'ring-4 ring-[#2563EB]' : ''
                  }`}
                  onClick={() => setSelectedAthlete(athlete)}
                >
                  <div>
                    {/* Header badge & Price tag */}
                    <div className="flex items-start justify-between gap-2 mb-4">
                      <span
                        className={`font-body text-[10px] font-bold uppercase px-2.5 py-1 border border-[#0F172A] ${
                          athlete.tier === 'elite'
                            ? 'bg-[#0F172A] text-white'
                            : athlete.tier === 'dev'
                            ? 'bg-[#2563EB] text-white'
                            : 'bg-white text-[#0F172A]'
                        }`}
                      >
                        {athlete.tierName}
                      </span>
                      <div className="font-display text-2xl text-[#0F172A]">
                        ${athlete.monthlyAmount}
                        <span className="font-body text-xs text-[#0F172A]/50 font-normal">/mo</span>
                      </div>
                    </div>

                    {/* Athlete Name & Social */}
                    <h3 className="font-display text-2xl uppercase text-[#0F172A] leading-tight">
                      {athlete.name}
                    </h3>
                    <div className="font-body text-xs text-[#2563EB] font-bold mt-0.5">
                      {athlete.instagram} · {athlete.timezone}
                    </div>
                    <div className="font-body text-xs text-[#0F172A]/60 mt-0.5">
                      {athlete.email}
                    </div>

                    {/* Primary Goal / Focus */}
                    <div className="mt-4 p-3 bg-[#F8FAFC] border-2 border-[#0F172A]/10 text-xs font-body text-[#0F172A]/80 leading-relaxed">
                      <span className="font-bold text-[#0F172A] block mb-1 uppercase tracking-wider text-[10px]">
                        Fight Camp Focus:
                      </span>
                      {athlete.primaryGoal}
                    </div>

                    {/* Next Call or Video Badge */}
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-body font-bold text-[#0F172A]">
                        <Calendar size={14} className="text-[#2563EB] shrink-0" />
                        <span>Next Call:</span>
                        <span className="text-[#2563EB]">{athlete.nextCallDate}</span>
                      </div>

                      {athlete.footageReview.hasPending ? (
                        <div className="flex items-center gap-2 text-xs font-body font-bold text-[#DC2626] bg-red-50 border border-red-200 p-2">
                          <Video size={14} className="shrink-0 animate-pulse" />
                          <span className="truncate">Film: {athlete.footageReview.title}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-xs font-body text-[#0F172A]/50 p-1">
                          <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                          <span>Footage reviews up to date</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer Button */}
                  <div className="mt-6 pt-4 border-t-2 border-[#0F172A]/10 flex items-center justify-between">
                    <span className="font-body text-[11px] font-bold uppercase text-[#0F172A]/50">
                      Notes: {athlete.notes.length}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAthlete(athlete);
                      }}
                      className="font-display text-xs uppercase tracking-wider bg-[#0F172A] text-white px-3 py-1.5 border border-[#0F172A] hover:bg-[#2563EB] transition-colors flex items-center gap-1"
                    >
                      Open Fighter Hub <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════ TAB 2: $500 ONBOARDING EMAIL SIMULATOR ═══════════ */}
        {activeTab === 'onboarding_email' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Controls & Flow Explainer */}
            <div className="lg:col-span-5 space-y-6">
              <div className="border-4 border-[#0F172A] bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="mb-4 inline-flex items-center gap-2 border border-[#0F172A] bg-[#CCFF00] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#0F172A]">
                  <Sparkles size={14} /> Automated VIP Workflow
                </div>
                <h3 className="font-display text-2xl uppercase text-[#0F172A]">
                  How the $500/mo Athlete Gets Onboarded
                </h3>
                <p className="font-body text-xs text-[#0F172A]/80 mt-2 leading-relaxed">
                  As soon as an athlete completes checkout via your Stripe Payment Link, the webhook immediately executes this 4-step sequence:
                </p>

                <ol className="mt-4 space-y-3 font-body text-xs">
                  <li className="flex items-start gap-2.5">
                    <span className="h-5 w-5 bg-[#0F172A] text-white font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                    <div>
                      <strong className="text-[#0F172A]">Instant VIP Welcome Email:</strong> Sent in &lt;60s with custom Calendly link &amp; intake questionnaire.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="h-5 w-5 bg-[#0F172A] text-white font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                    <div>
                      <strong className="text-[#0F172A]">Coach Josh Notification:</strong> Email &amp; SMS ping to your phone alerting you of a new $500 fighter.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="h-5 w-5 bg-[#0F172A] text-white font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                    <div>
                      <strong className="text-[#0F172A]">Fighter Roster Auto-Entry:</strong> Card generated in this dashboard with their initial metadata.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="h-5 w-5 bg-[#0F172A] text-white font-bold text-[10px] flex items-center justify-center shrink-0">4</span>
                    <div>
                      <strong className="text-[#0F172A]">Weekly Accountability Engine:</strong> Automated check-in reminders sent every Sunday before their call.
                    </div>
                  </li>
                </ol>
              </div>

              {/* Action Buttons */}
              <div className="border-4 border-[#0F172A] bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-3">
                <button
                  onClick={() => handleCopyLink('https://calendly.com/coachjoshofficial/vip-elite-call')}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#0F172A] text-white font-display text-sm uppercase tracking-wider py-3.5 border-2 border-[#0F172A] shadow-[4px_4px_0px_0px_#2563EB] hover:bg-[#2563EB] transition-colors"
                >
                  {isCopied ? 'Copied VIP Calendly Link!' : 'Copy Secret VIP Calendly Link'}
                </button>

                <p className="font-body text-[11px] text-[#0F172A]/50 text-center">
                  Only paying athletes receive this hidden weekly booking link.
                </p>
              </div>
            </div>

            {/* Right Live Email Template Preview */}
            <div className="lg:col-span-7">
              <div className="border-4 border-[#0F172A] bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                {/* Email Client Header Chrome */}
                <div className="bg-[#0F172A] text-white px-5 py-3 flex items-center justify-between border-b-2 border-[#0F172A]">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500 inline-block" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500 inline-block" />
                    <span className="h-3 w-3 rounded-full bg-green-500 inline-block" />
                    <span className="font-body text-xs text-white/60 ml-2">Inbox Preview · HTML Responsive</span>
                  </div>
                  <span className="font-body text-[10px] font-bold uppercase tracking-widest text-[#CCFF00]">
                    Sent via Resend / Kit
                  </span>
                </div>

                {/* Email Metadata Strip */}
                <div className="p-4 bg-[#F8FAFC] border-b-2 border-[#0F172A]/10 font-body text-xs space-y-1.5">
                  <div>
                    <span className="text-[#0F172A]/50 font-bold uppercase tracking-wider">From: </span>
                    <span className="text-[#0F172A] font-bold">Coach Josh &lt;coachjoshofficial@playersclubllc.com&gt;</span>
                  </div>
                  <div>
                    <span className="text-[#0F172A]/50 font-bold uppercase tracking-wider">To: </span>
                    <span className="text-[#0F172A]">Marcus Vance &lt;marcus.vance88@gmail.com&gt;</span>
                  </div>
                  <div>
                    <span className="text-[#0F172A]/50 font-bold uppercase tracking-wider">Subject: </span>
                    <span className="text-[#0F172A] font-bold">Welcome to Elite 1:1 Coaching: Step 1 Schedule Your Onboarding Call</span>
                  </div>
                </div>

                {/* Email Body Content */}
                <div className="p-8 md:p-10 space-y-6 font-body text-sm text-[#0F172A] leading-relaxed">
                  <div className="border-b-2 border-[#0F172A] pb-4 flex items-center justify-between">
                    <div className="font-display text-2xl uppercase tracking-wider text-[#0F172A]">
                      Coach Josh Official
                    </div>
                    <span className="font-body text-[10px] font-bold uppercase bg-[#0F172A] text-white px-2 py-0.5">
                      Elite 1:1 Tier
                    </span>
                  </div>

                  <p className="font-bold text-base">
                    Marcus, welcome to the Elite 1:1 Coaching team.
                  </p>

                  <p>
                    You made the right decision. We aren&apos;t throwing arm punches or doing aimless cardio. We are breaking down mechanics from the floor up, building true fight IQ, and training you like a championship athlete.
                  </p>

                  <div className="border-2 border-[#0F172A] bg-[#F8FAFC] p-5 space-y-3">
                    <h4 className="font-display text-lg uppercase text-[#0F172A]">
                      Immediate Action Items (Next 24 Hours):
                    </h4>
                    
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</div>
                      <div>
                        <strong>Book Your Strategy &amp; Assessment Call:</strong><br />
                        <span className="text-xs text-[#0F172A]/70">Use this private link to pick your weekly 1-on-1 slot:</span><br />
                        <a href="#" className="font-bold text-[#2563EB] underline text-xs">Book Week 1 Call on Calendly &rarr;</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</div>
                      <div>
                        <strong>Complete The Fighter Intake Form:</strong><br />
                        <span className="text-xs text-[#0F172A]/70">Give me your injury history, training schedule, and target weight class:</span><br />
                        <a href="#" className="font-bold text-[#2563EB] underline text-xs">Fill Out 3-Min Intake Questionnaire &rarr;</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</div>
                      <div>
                        <strong>Submit Your Baseline Film:</strong><br />
                        <span className="text-xs text-[#0F172A]/70">Upload 1-2 rounds of shadowboxing or bag work to our private portal so I can review it before our first call.</span>
                      </div>
                    </div>
                  </div>

                  <p>
                    You now have direct priority access to my personal Telegram/WhatsApp. If you have questions before our call, reply directly to this email.
                  </p>

                  <div className="pt-4 border-t border-[#0F172A]/10">
                    <p className="font-bold">Let&apos;s get to work,</p>
                    <p className="font-display text-xl uppercase tracking-wider text-[#0F172A] mt-1">Coach Josh</p>
                    <p className="text-xs text-[#0F172A]/60">Head Coach &amp; Founder · Coach Josh Boxing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════ TAB 3: BROADCAST CAMPAIGNS ═══════════ */}
        {activeTab === 'campaigns' && (
          <div className="border-4 border-[#0F172A] bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b-2 border-[#0F172A] pb-4">
              <div>
                <h3 className="font-display text-3xl uppercase text-[#0F172A]">
                  Email Campaign Launcher
                </h3>
                <p className="font-body text-xs text-[#0F172A]/60 mt-1">
                  Send targeted announcements to your 435K+ subscriber &amp; customer database.
                </p>
              </div>
              <span className="font-display text-lg text-[#2563EB] bg-blue-50 border border-[#2563EB] px-3 py-1">
                435,000+ Total Audience
              </span>
            </div>

            {/* Campaign Config */}
            <div className="space-y-4 font-body text-sm">
              <div>
                <label className="font-bold text-xs uppercase tracking-wider text-[#0F172A] block mb-1.5">
                  Select Target Audience Segment:
                </label>
                <select className="w-full border-2 border-[#0F172A] p-3 font-body bg-white focus:outline-none focus:border-[#2563EB]">
                  <option>All Subscribers (435,000+ Fighters &amp; Fans)</option>
                  <option>Digital Blueprint Customers (1,420 Paid Users)</option>
                  <option>Active 1:1 Coaching Athletes (14 Fighters)</option>
                  <option>In-Person Hamden Gym Inquiries (420 Contacts)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-xs uppercase tracking-wider text-[#0F172A] block mb-1.5">
                  Email Subject Line:
                </label>
                <input
                  type="text"
                  defaultValue="NEW: Controlled 2-Person Partner Drills is Live (Train Together)"
                  className="w-full border-2 border-[#0F172A] p-3 font-body focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="font-bold text-xs uppercase tracking-wider text-[#0F172A] block mb-1.5">
                  Broadcast Message Preview:
                </label>
                <textarea
                  rows={6}
                  defaultValue={`Hitting a bag teaches you to punch. A partner teaches you to box.\n\nWe just launched the complete 2-person follow-along routine on Gumroad for $30. Slip counters, rhythm drills, and partner defense.\n\nGrab lifetime access here: https://coachjosh1.gumroad.com/l/cayuxl\n\nCoach Josh`}
                  className="w-full border-2 border-[#0F172A] p-3 font-body focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  className="flex-1 bg-[#0F172A] text-white font-display text-base uppercase tracking-wider py-4 border-2 border-[#0F172A] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#2563EB] hover:border-[#2563EB] transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={18} /> Schedule &amp; Send Broadcast
                </button>
                <button
                  type="button"
                  className="bg-white text-[#0F172A] font-display text-base uppercase tracking-wider px-6 py-4 border-2 border-[#0F172A] hover:bg-slate-100 transition-colors"
                >
                  Send Test to Myself
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ═══════════ ATHLETE DETAIL DRAWER / SLIDE-OVER ═══════════ */}
      {selectedAthlete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-2xl bg-white h-full border-l-4 border-[#0F172A] shadow-[-12px_0px_0px_0px_rgba(0,0,0,1)] overflow-y-auto flex flex-col justify-between">
            {/* Drawer Header */}
            <div>
              <div className="p-6 bg-[#0F172A] text-white flex items-center justify-between sticky top-0 z-10 border-b-2 border-white/20">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-2xl uppercase tracking-wider">
                      {selectedAthlete.name}
                    </span>
                    <span className="font-body text-[10px] font-bold uppercase bg-[#CCFF00] text-[#0F172A] px-2 py-0.5">
                      {selectedAthlete.tierName}
                    </span>
                  </div>
                  <p className="font-body text-xs text-white/70 mt-1">
                    {selectedAthlete.email} · {selectedAthlete.instagram}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedAthlete(null)}
                  className="h-10 w-10 border-2 border-white bg-white/10 hover:bg-white hover:text-[#0F172A] transition-colors flex items-center justify-center text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Billing & Call Summary Box */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-[#F8FAFC] border-2 border-[#0F172A]">
                  <div>
                    <span className="font-body text-[10px] font-bold uppercase text-[#0F172A]/50 block">
                      Monthly Investment
                    </span>
                    <span className="font-display text-2xl text-[#2563EB]">
                      ${selectedAthlete.monthlyAmount}/mo
                    </span>
                  </div>
                  <div>
                    <span className="font-body text-[10px] font-bold uppercase text-[#0F172A]/50 block">
                      Next 1:1 Call
                    </span>
                    <span className="font-body text-xs font-bold text-[#0F172A] block mt-1">
                      {selectedAthlete.nextCallDate}
                    </span>
                  </div>
                  <div>
                    <span className="font-body text-[10px] font-bold uppercase text-[#0F172A]/50 block">
                      Member Since
                    </span>
                    <span className="font-body text-xs text-[#0F172A]/80 block mt-1">
                      {selectedAthlete.startDate}
                    </span>
                  </div>
                </div>

                {/* Video Review Alert (If Pending) */}
                {selectedAthlete.footageReview.hasPending && (
                  <div className="border-3 border-[#DC2626] bg-red-50 p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-bold text-[#DC2626] uppercase">
                        <Video size={18} /> Footage Waiting For Your Breakdown
                      </div>
                      <span className="font-body text-[10px] text-[#DC2626] font-bold">
                        {selectedAthlete.footageReview.submittedDate}
                      </span>
                    </div>
                    <div className="font-display text-lg text-[#0F172A]">
                      {selectedAthlete.footageReview.title}
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={selectedAthlete.footageReview.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-[#DC2626] text-white font-display text-xs uppercase tracking-wider px-4 py-2 hover:bg-red-700 transition-colors"
                      >
                        <Play size={14} /> Watch Footage <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                )}

                {/* Primary Goal & Bio */}
                <div>
                  <h4 className="font-display text-lg uppercase text-[#0F172A] mb-2 flex items-center gap-2">
                    <Target size={18} className="text-[#2563EB]" /> Athlete Goals &amp; Camp Targets
                  </h4>
                  <div className="p-4 border-2 border-[#0F172A]/10 bg-[#FFFFFF] font-body text-sm text-[#0F172A]/80 leading-relaxed">
                    {selectedAthlete.primaryGoal}
                  </div>
                </div>

                {/* Training Notes History */}
                <div>
                  <h4 className="font-display text-lg uppercase text-[#0F172A] mb-3 flex items-center gap-2">
                    <FileText size={18} className="text-[#2563EB]" /> Coach Notes &amp; Technique History
                  </h4>

                  {/* Add Note Input Form */}
                  <form onSubmit={handleAddNote} className="mb-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Log technique note, homework drill, or call summary..."
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                        className="flex-1 border-2 border-[#0F172A] px-3 py-2 font-body text-xs focus:outline-none focus:border-[#2563EB]"
                      />
                      <button
                        type="submit"
                        className="bg-[#0F172A] text-white font-display text-xs uppercase px-4 py-2 hover:bg-[#2563EB] transition-colors shrink-0"
                      >
                        Log Note
                      </button>
                    </div>
                  </form>

                  {/* Notes Feed */}
                  <div className="space-y-3">
                    {selectedAthlete.notes.map((note, idx) => (
                      <div
                        key={idx}
                        className="p-3 border-2 border-[#0F172A]/10 bg-[#F8FAFC] font-body text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between text-[#0F172A]/50 text-[10px] font-bold uppercase tracking-wider">
                          <span>{note.date}</span>
                          <span className="bg-white px-1.5 py-0.5 border border-[#0F172A]/20">
                            {note.type}
                          </span>
                        </div>
                        <p className="text-[#0F172A]/90 leading-relaxed">{note.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-6 bg-[#F8FAFC] border-t-2 border-[#0F172A] flex flex-wrap gap-3">
              <a
                href={`mailto:${selectedAthlete.email}?subject=Coach%20Josh%20-%20Technique%20Breakdown`}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#2563EB] text-white font-display text-xs uppercase tracking-wider py-3 border-2 border-[#0F172A] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#1d4ed8] transition-colors"
              >
                <Mail size={14} /> Send Athlete Email
              </a>
              <button
                onClick={() => setSelectedAthlete(null)}
                className="bg-white text-[#0F172A] font-display text-xs uppercase tracking-wider px-5 py-3 border-2 border-[#0F172A] hover:bg-slate-100 transition-colors"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
