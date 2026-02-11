'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronUp, Menu, X, BookOpen, Target, Dumbbell, Heart, AlertTriangle, Zap, Award, Printer, ImageIcon, Check, ClipboardList } from 'lucide-react';
import Image from 'next/image';
import { TRANSITIONS, EASING } from '@/lib/motion';
import confetti from 'canvas-confetti';
import CountUp from 'react-countup';
import { ImageLightbox, SectionCheckbox, useCompletedSections, HighlightedTerm, CompletionCertificate, VideoLink, useInteractive, TrainingLog, ReflectionPrompt, CHAPTER_PROMPTS } from './ebook';

// Design tokens
const rawColors = {
  cream: '#F2E8DC',
  red: '#D1495B',
  ink: '#1A1A1A',
  vanta: '#050505',
  blue: '#4A6FA5',
  neon: '#CCFF00',
  white: '#FFFFFF',
};

// Chapter data with word counts for read time estimation (~200 words/min)
const chapters = [
  { id: 'introduction', title: 'INTRODUCTION', icon: BookOpen, wordCount: 180 },
  { id: 'injury-prevention', title: 'INJURY PREVENTION', icon: AlertTriangle, wordCount: 250 },
  { id: 'when-you-feel-lost', title: 'WHEN YOU FEEL LOST', icon: Target, wordCount: 220 },
  { id: 'weekly-structure', title: 'WEEKLY STRUCTURE', icon: Dumbbell, wordCount: 200 },
  { id: 'warm-up-routine', title: 'WARM-UP ROUTINE', icon: Zap, wordCount: 350 },
  { id: 'conditioning', title: 'CONDITIONING', icon: Heart, wordCount: 280 },
  { id: 'shadowboxing', title: 'SHADOWBOXING', icon: Award, wordCount: 150 },
  { id: 'heavy-bag-work', title: 'HEAVY BAG WORK', icon: Target, wordCount: 320 },
  { id: 'core-training', title: 'CORE TRAINING', icon: Dumbbell, wordCount: 200 },
  { id: 'plyometrics', title: 'PLYOMETRICS', icon: Zap, wordCount: 180 },
  { id: 'next-steps', title: 'NEXT STEPS', icon: Award, wordCount: 220 }
];

// Calculate read time in minutes
const getReadTime = (wordCount: number) => Math.max(1, Math.ceil(wordCount / 200));

// Image data for lightbox
const imageData = [
  { id: 'FIG-1', title: 'The Home Base Stance', description: 'Full body or upper body shot. Feet shoulder-width, knees bent, chin tucked, hands touching cheekbones, elbows touching ribs.', src: '/images/ebook/home_base2.jpeg' },
  { id: 'FIG-2a', title: "The Boxer's Step — Starting Position", description: 'Feet shoulder-width apart in the stance. This is your base before any movement.', src: '/images/ebook/boxer_step_1.jpeg' },
  { id: 'FIG-2b', title: "The Boxer's Step — The Step", description: 'Lead foot steps forward. Push off the back foot to initiate the movement.', src: '/images/ebook/boxer_step_2.jpeg' },
  { id: 'FIG-2c', title: "The Boxer's Step — The Slide", description: 'Rear foot slides up to restore original stance width. The gap between your feet never changes.', src: '/images/ebook/boxer_step_3.jpeg' },
  { id: 'FIG-3', title: 'The No-Cross Rule', description: 'Action shot of lateral movement showing open space between legs.', src: '/images/ebook/no_cross_zone.jpeg' },
  { id: 'FIG-4', title: 'The Kinetic Chain', description: 'Freeze frame of rear-hand punch showing hip rotation and foot pivot.', src: '/images/ebook/hip_rotation.jpeg' },
  { id: 'FIG-5', title: 'Wrist Alignment', description: 'Close-up of fist showing straight line from knuckles to elbow.', src: '/images/ebook/wrist_alignment.jpeg' },
  { id: 'FIG-6', title: 'Core Safety (Flutter Kicks)', description: 'Boxer performing flutter kicks with lower back pressed to floor.', src: '/images/ebook/flutter_kick.jpeg' }
];

// ============================================
// REUSABLE COMPONENTS
// ============================================

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedSection = ({ children, className = '' }: AnimatedSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: EASING.decelerate }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section = ({ title, children }: SectionProps) => (
  <AnimatedSection>
    <div
      className="blueprint-section mb-8"
      style={{
        background: rawColors.cream,
        padding: 24,
        border: `3px solid ${rawColors.ink}`,
        boxShadow: `8px 8px 0 ${rawColors.ink}`
      }}
    >
      <h3 className="font-display text-xl md:text-2xl uppercase tracking-tight mb-4" style={{ color: rawColors.red }}>{title}</h3>
      <div className="font-body text-sm md:text-base leading-relaxed" style={{ color: rawColors.ink }}>{children}</div>
    </div>
  </AnimatedSection>
);

interface KeyPointProps {
  children: React.ReactNode;
}

const KeyPoint = ({ children }: KeyPointProps) => (
  <div
    className="font-body text-sm my-4 p-4"
    style={{ background: rawColors.vanta, color: rawColors.neon, border: `2px solid ${rawColors.neon}` }}
  >
    <strong>⚡ KEY POINT:</strong> {children}
  </div>
);

interface RuleProps {
  num: number;
  title: string;
  children: React.ReactNode;
}

const Rule = ({ num, title, children }: RuleProps) => (
  <div className="mb-5 pl-4" style={{ borderLeft: `4px solid ${rawColors.red}` }}>
    <div className="font-display text-base mb-1" style={{ color: rawColors.red }}>{num}. {title}</div>
    <div className="font-body text-sm leading-relaxed" style={{ color: rawColors.ink }}>{children}</div>
  </div>
);

// Image placeholder component for instructional images
// Image placeholder component for instructional images
interface ImageSlotProps {
  id: string;
  title: string;
  description: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  src?: string;
  imageSrc?: string;
  onClick?: () => void;
}

const ImageSlot = ({ id, title, description, aspectRatio = 'landscape', src, imageSrc, onClick }: ImageSlotProps) => {
  // Use src or imageSrc (handle both for safety)
  const actualSrc = src || imageSrc;
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const aspectClasses = {
    landscape: 'aspect-video',
    portrait: 'aspect-[3/4]',
    square: 'aspect-square'
  };

  // Check for reduced motion preference after hydration
  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  return (
    <AnimatedSection>
      <figure className="my-8">
        <motion.div
          className={`relative ${aspectClasses[aspectRatio]} w-full overflow-hidden cursor-pointer`}
          style={{
            background: rawColors.vanta,
            border: `3px solid ${rawColors.ink}`,
            boxShadow: isHovered ? `10px 10px 0 ${rawColors.ink}` : `6px 6px 0 ${rawColors.ink}`,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onClick}
          whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          role="button"
          aria-label={`View ${title} in full screen`}
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') onClick?.(); }}
        >
          {actualSrc ? (
            <>
              {/* Shimmer skeleton */}
              {!isLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 animate-pulse" />
              )}
              <Image
                src={actualSrc}
                alt={title}
                fill
                className={`object-cover transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${isHovered ? 'scale-105' : 'scale-100'}`}
                sizes="(max-width: 768px) 100vw, 800px"
                onLoad={() => setIsLoaded(true)}
                loading="lazy"
              />
            </>
          ) : (
            <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}>
              <ImageIcon size={48} color={rawColors.red} className="mb-4 opacity-60" />
              <p className="font-display text-sm uppercase tracking-wide text-white/60 mb-2">
                Image: {title}
              </p>
              <p className="font-body text-xs text-white/40 max-w-md">
                {description}
              </p>
              <p className="font-body text-[10px] text-amber-400/60 mt-3 uppercase tracking-wider">
                Click to view
              </p>
            </div>
          )}
        </motion.div>
        <figcaption
          className="font-body text-xs mt-3 text-center uppercase tracking-wider"
          style={{ color: rawColors.ink }}
        >
          <span className="font-display" style={{ color: rawColors.red }}>{id}:</span> {title}
        </figcaption>
      </figure>
    </AnimatedSection>
  );
};


// Chapter header component
interface ChapterHeaderProps {
  id: string;
  number: number;
  title: string;
  icon: React.ElementType;
}

const ChapterHeader = ({ id, number, title, icon: Icon }: ChapterHeaderProps) => (
  <div
    id={id}
    className="chapter-header scroll-mt-24 py-6 px-6 mb-8 flex items-center gap-4"
    style={{ background: rawColors.red }}
  >
    <div
      className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14"
      style={{ background: rawColors.vanta }}
    >
      <span className="font-display text-xl md:text-2xl" style={{ color: rawColors.neon }}>{number}</span>
    </div>
    <div className="flex items-center gap-3 flex-1">
      <Icon size={24} color={rawColors.cream} className="hidden sm:block" />
      <h2 className="font-display text-xl md:text-2xl uppercase tracking-tight" style={{ color: rawColors.cream }}>
        {title}
      </h2>
    </div>
  </div>
);

// ============================================
// MAIN COMPONENT
// ============================================

export default function BoxingEbook({ success = false }: { success?: boolean }) {
  const { playComplete } = useInteractive();
  const [tocOpen, setTocOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState('introduction');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const scrollTopTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Completion certificate state
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateDate, setCertificateDate] = useState<Date>(new Date());

  // Chapter progress tracking
  const [chapterProgress, setChapterProgress] = useState<Record<string, number>>({});


  // Completion tracking
  const chapterIds = useMemo(() => chapters.map(ch => ch.id), []);
  const { completed: completedSections, count: completedCount, refresh: refreshCompleted, mounted } = useCompletedSections(chapterIds);

  // Handle Celebration on first mount if coming from success redirect
  useEffect(() => {
    if (mounted && success) {
      // Small delay to ensure they see the page first
      setTimeout(() => {
        playComplete();
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#D1495B', '#4A6FA5', '#CCFF00', '#F2E8DC']
        });
      }, 1000);
    }
  }, [mounted, success, playComplete]);


  // Calculate gradient color based on progress (amber-500 → emerald-500)
  const getGradientColor = useCallback((progress: number) => {
    const amberR = 245, amberG = 158, amberB = 11;
    const emeraldR = 16, emeraldG = 185, emeraldB = 129;
    const ratio = progress / 100;
    const r = Math.round(amberR + (emeraldR - amberR) * ratio);
    const g = Math.round(amberG + (emeraldG - amberG) * ratio);
    const b = Math.round(amberB + (emeraldB - amberB) * ratio);
    return `rgb(${r}, ${g}, ${b})`;
  }, []);

  // Track scroll progress, active chapter, and chapter-level progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadProgress(progress);

      // Show scroll-to-top button and auto-hide after 3 seconds
      if (scrollTop > 500) {
        setShowScrollTop(true);

        // Clear any existing timeout
        if (scrollTopTimeoutRef.current) {
          clearTimeout(scrollTopTimeoutRef.current);
        }

        // Set new timeout to hide after 3 seconds of no scrolling
        scrollTopTimeoutRef.current = setTimeout(() => {
          setShowScrollTop(false);
        }, 3000);
      } else {
        setShowScrollTop(false);
      }

      // Update active chapter and chapter progress
      const chapterElements = chapters.map(ch => document.getElementById(ch.id));
      const newChapterProgress: Record<string, number> = {};

      for (let i = 0; i < chapterElements.length; i++) {
        const el = chapterElements[i];
        const nextEl = chapterElements[i + 1];

        if (el) {
          const chapterTop = el.getBoundingClientRect().top;
          const nextTop = nextEl ? nextEl.getBoundingClientRect().top : docHeight;
          const viewportHeight = window.innerHeight;

          // Calculate how much of this chapter has been viewed
          if (chapterTop <= 0 && nextTop > 0) {
            const chapterHeight = nextTop - chapterTop;
            const viewedHeight = Math.min(-chapterTop, chapterHeight);
            newChapterProgress[chapters[i].id] = Math.min(100, (viewedHeight / chapterHeight) * 100);
          } else if (chapterTop > viewportHeight) {
            newChapterProgress[chapters[i].id] = 0;
          } else if (nextTop <= 0) {
            newChapterProgress[chapters[i].id] = 100;
          }

          if (chapterTop <= 150) {
            setActiveChapter(chapters[i].id);
          }
        }
      }

      setChapterProgress(newChapterProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Cleanup timeout on unmount
      if (scrollTopTimeoutRef.current) {
        clearTimeout(scrollTopTimeoutRef.current);
      }
    };
  }, []);

  // Check for 100% completion and show certificate
  useEffect(() => {
    if (mounted && completedCount === chapters.length) {
      // Set the completion date and show certificate after a brief delay
      setCertificateDate(new Date());
      setTimeout(() => {
        playComplete(); // Play bell sound
        setShowCertificate(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFD700', '#D1495B', '#FFFFFF']
        });
      }, 500);
    }
  }, [completedCount, mounted]);

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setTocOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  const openLightbox = (imageId: string) => {
    const index = imageData.findIndex(img => img.id === imageId);
    if (index >= 0) {
      setLightboxIndex(index);
      setLightboxOpen(true);
    }
  };

  const handleCompletionChange = () => {
    refreshCompleted();
  };

  // Progress bar gradient style
  const progressGradient = `linear-gradient(to right, #f59e0b, ${getGradientColor(readProgress)})`;


  return (
    <div className="blueprint-container min-h-screen" style={{ background: rawColors.cream }}>
      {/* Progress Bar with Gradient */}
      <motion.div
        className="fixed top-0 left-0 h-1 z-50 no-print"
        initial={{ width: 0 }}
        animate={{ width: `${readProgress}%` }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{ background: progressGradient }}
      />

      {/* Sticky Header */}
      <header
        className="sticky top-0 z-40 no-print"
        style={{
          background: rawColors.ink,
          borderBottom: `4px solid ${rawColors.red}`
        }}
      >
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center" style={{ background: rawColors.red }}>
              <span className="text-xl">🥊</span>
            </div>
            <div>
              <div className="font-display text-base md:text-lg tracking-tight" style={{ color: rawColors.cream }}>
                BOXING BLUEPRINT
              </div>
              <div className="font-body text-[10px] uppercase tracking-wider" style={{ color: rawColors.red }}>
                Coach Josh Official
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Completion Badge */}
            {mounted && (
              <div className="hidden sm:flex items-center gap-2 mr-2">
                <div className="relative w-8 h-8">
                  <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#374151" strokeWidth="3" />
                    <motion.circle
                      cx="18" cy="18" r="14" fill="none"
                      stroke={completedCount === chapters.length ? '#10b981' : '#f59e0b'}
                      strokeWidth="3" strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 14}
                      initial={{ strokeDashoffset: 2 * Math.PI * 14 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 14 - (completedCount / chapters.length) * 2 * Math.PI * 14 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-[10px] text-white">{completedCount}</span>
                  </div>
                </div>
                <span className="font-body text-[10px] text-gray-400">{completedCount}/{chapters.length}</span>
              </div>
            )}
            <motion.button
              onClick={handlePrint}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-display text-xs uppercase px-3 py-2 hidden sm:flex items-center gap-2"
              style={{ background: rawColors.blue, border: `2px solid ${rawColors.cream}`, color: rawColors.cream }}
            >
              <Printer size={14} />
              PDF
            </motion.button>
            <button
              onClick={() => setTocOpen(!tocOpen)}
              className="p-2"
              style={{ color: rawColors.cream }}
              aria-label={tocOpen ? 'Close menu' : 'Open menu'}
            >
              {tocOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile TOC Overlay */}
      {tocOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed inset-0 z-30 pt-20 overflow-y-auto no-print"
          style={{ background: rawColors.vanta }}
        >
          <nav className="p-6">
            <div className="font-display text-sm mb-4 uppercase tracking-wider" style={{ color: rawColors.red }}>
              Chapters
            </div>
            {chapters.map((ch, index) => {
              const Icon = ch.icon;
              const isActive = activeChapter === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => scrollToChapter(ch.id)}
                  className="w-full flex items-center gap-3 p-4 mb-2 text-left transition-all"
                  style={{
                    background: isActive ? rawColors.red : rawColors.ink,
                    border: `2px solid ${rawColors.ink}`,
                    color: rawColors.cream,
                    boxShadow: isActive ? `4px 4px 0 ${rawColors.neon}` : 'none'
                  }}
                >
                  <span className="font-display text-sm" style={{ color: isActive ? rawColors.cream : rawColors.red }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <Icon size={16} color={isActive ? rawColors.cream : rawColors.red} />
                  <span className="font-display text-sm uppercase">{ch.title}</span>
                </button>
              );
            })}
          </nav>
        </motion.div>
      )}

      {/* Desktop Sidebar TOC */}
      <aside className="hidden lg:block fixed left-0 top-20 bottom-0 w-72 overflow-y-auto p-4 no-print" style={{ background: rawColors.vanta }}>
        <div className="font-display text-xs mb-4 uppercase tracking-wider" style={{ color: rawColors.red }}>
          Table of Contents
        </div>
        <nav>
          {chapters.map((ch, index) => {
            const isActive = activeChapter === ch.id;
            const isCompleted = completedSections.has(ch.id);
            const progress = chapterProgress[ch.id] || 0;
            const readTime = getReadTime(ch.wordCount);

            return (
              <div key={ch.id} className="mb-2">
                <button
                  onClick={() => scrollToChapter(ch.id)}
                  className="w-full text-left py-2 px-3 font-body text-xs transition-all flex items-start gap-2 relative rounded-lg"
                  style={{
                    background: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                    color: isActive ? rawColors.cream : rawColors.cream + '99',
                    boxShadow: isActive ? '0 0 15px rgba(59, 130, 246, 0.2)' : 'none',
                  }}
                  aria-label={`${ch.title} - ${readTime} min read`}
                >
                  {/* Active indicator pill */}
                  <div
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                    style={{ background: rawColors.neon }}
                  />

                  <span className="font-display ml-2 flex-shrink-0" style={{ color: isActive ? rawColors.neon : rawColors.red }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="truncate">{ch.title}</span>
                      {isCompleted && (
                        <Check size={12} className="text-emerald-400 flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-gray-500">{readTime} min</span>
                      {/* Mini progress bar */}
                      <div className="flex-1 h-0.5 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.3 }}
                          style={{
                            background: progress === 100
                              ? '#10b981'
                              : `linear-gradient(to right, #f59e0b, ${getGradientColor(progress)})`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </nav>

        {/* Overall Progress indicator */}
        <div className="mt-6 pt-4 border-t" style={{ borderColor: rawColors.ink }}>
          <div className="font-body text-xs mb-2" style={{ color: rawColors.cream + '60' }}>
            Reading Progress
          </div>
          <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: rawColors.ink }}>
            <motion.div
              className="h-full"
              initial={{ width: 0 }}
              animate={{ width: `${readProgress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ background: progressGradient }}
            />
          </div>
          <div className="font-display text-sm mt-2 flex items-baseline gap-1" style={{ color: getGradientColor(readProgress) }}>
            <CountUp
              start={0}
              end={Math.round(readProgress)}
              duration={0.5}
              preserveValue
            />
            <span className="text-xs">%</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 pb-24">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">

          {/* ============================================ 
              CHAPTER 1: INTRODUCTION 
              ============================================ */}
          <ChapterHeader id="introduction" number={1} title="Introduction" icon={BookOpen} />

          <Section title="BEGINNER BOXING FUNDAMENTALS">
            <p className="text-lg mb-4">A practical guide built on real boxing.</p>
            <p className="mb-4">Boxing rewards fundamentals done correctly, over time. This guide exists because most beginners never get a clear foundation. They jump between workouts, drills, and advice that looks impressive but doesn&apos;t build real skill.</p>
            <KeyPoint>This program is built the way real gyms teach boxing. Simple movements. Clear structure. Repetition with purpose.</KeyPoint>
          </Section>

          <Section title="WHAT BOXING ACTUALLY IS">
            <p className="mb-4">Boxing is not just punching. It is balance, <HighlightedTerm>footwork</HighlightedTerm>, timing, breathing, and control under fatigue. Punches only work when those pieces are in place.</p>
            <p>Fighters with strong fundamentals always look sharper than people doing harder workouts with poor mechanics. Rushing ahead usually leads to stalled progress or injury.</p>
          </Section>

          <Section title="EXPECTED RESULTS">
            <div className="grid gap-4 mb-4">
              <div className="p-4" style={{ background: rawColors.blue, color: '#fff' }}>
                <strong>3 DAYS/WEEK:</strong> Improved conditioning, coordination, and overall movement quality
              </div>
              <div className="p-4" style={{ background: rawColors.red, color: '#fff' }}>
                <strong>5-6 DAYS/WEEK:</strong> Sharper technique, stronger endurance, visible physical changes
              </div>
            </div>
            <KeyPoint>Results come from consistency, not variety.</KeyPoint>
          </Section>

          <ReflectionPrompt chapterId="introduction" prompt={CHAPTER_PROMPTS['introduction']} />

          <SectionCheckbox
            sectionId="introduction"
            sectionTitle="Introduction"
            onCompletionChange={handleCompletionChange}
          />

          {/* ============================================ 
              CHAPTER 2: INJURY PREVENTION 
              ============================================ */}
          <ChapterHeader id="injury-prevention" number={2} title="Injury Prevention" icon={AlertTriangle} />

          <Section title="READ THIS BEFORE YOU TRAIN">
            <p className="mb-4">Training boxing will be demanding on your body, but most injuries can be easily avoided. These injuries often come from rushing past your skill level, poor mechanics, and ignoring early warning signs.</p>
            <KeyPoint>Technique breaks before the body does.</KeyPoint>
          </Section>

          <Section title="THE BIG THREE: INJURY PREVENTION">
            <Rule num={1} title="PROPER WARM-UP (NON-NEGOTIABLE)">
              Skipping the warm-up is the fastest way to get injured. It prepares your joints, reinforces correct movement patterns, improves coordination, and conditions your brain to reduce sloppy mechanics later.
              <div className="p-3 mt-3 text-center font-bold" style={{ background: rawColors.red, color: '#fff' }}>
                IF YOU DO NOT WARM UP — DO NOT TRAIN
              </div>
            </Rule>
            <Rule num={2} title="POSTURE, BALANCE & STANCE">
              Most boxing injuries are overuse and positioning injuries, not impact injuries.
              <div className="mt-3">
                • Feet shoulder-width apart<br />
                • Knees slightly bent<br />
                • Hips under shoulders<br />
                • Chin tucked, spine long<br />
                • Shoulders relaxed, not shrugged
              </div>
            </Rule>
            <Rule num={3} title="FATIGUE MANAGEMENT">
              Fatigue is not the enemy — chaotic, uncontrolled movements caused by fatigue IS.
              <div className="mt-3">You should feel: Worked, Challenged, Capable of returning the next day</div>
            </Rule>
          </Section>

          {/* IMAGE SLOT: Wrist Alignment */}
          <ImageSlot
            id="FIG-5"
            title="Wrist Alignment"
            description="Close-up of the fist making contact. There must be a straight line from the knuckles to the elbow. No bending at the wrist."
            aspectRatio="landscape"
            imageSrc="/images/ebook/wrist_alignment.jpeg"
            onClick={() => openLightbox('FIG-5')}
          />

          <Section title="ACCEPTABLE VS NOT ACCEPTABLE PAIN">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4" style={{ background: rawColors.neon, color: rawColors.ink }}>
                <strong>✓ ACCEPTABLE:</strong><br />
                • Muscular fatigue<br />
                • Mild soreness (24-48hrs)<br />
                • General tiredness
              </div>
              <div className="p-4" style={{ background: rawColors.red, color: '#fff' }}>
                <strong>✗ NOT ACCEPTABLE:</strong><br />
                • Sharp pain<br />
                • Joint pain<br />
                • Tingling/numbness<br />
                • Headaches after training
              </div>
            </div>
          </Section>

          <ReflectionPrompt chapterId="injury-prevention" prompt={CHAPTER_PROMPTS['injury-prevention']} />

          <SectionCheckbox
            sectionId="injury-prevention"
            sectionTitle="Injury Prevention"
            onCompletionChange={handleCompletionChange}
          />

          {/* ============================================ 
              CHAPTER 3: WHEN YOU FEEL LOST 
              ============================================ */}
          <ChapterHeader id="when-you-feel-lost" number={3} title="When You Feel Lost" icon={Target} />

          <Section title="WHEN YOU FEEL LOST">
            <p className="mb-4">Feeling lost is normal when first starting. Boxing has many moving parts and technical issues most people have never trained. With practice, these movements will become automatic.</p>
          </Section>

          <Section title="THE ONLY 3 THINGS TO FOCUS ON FIRST">
            <Rule num={1} title="STANCE & BALANCE">
              If your stance breaks, everything breaks. Your punches won&apos;t land clean, your defense won&apos;t work, you&apos;ll gas out faster, and your footwork will betray you.
            </Rule>
            <Rule num={2} title="BREATHING & RELAXATION">
              Most beginners tense their shoulders, clench their jaw, and hold their breath. That alone will ruin your endurance and technique. If you fix nothing else, fix your breathing.
            </Rule>
            <Rule num={3} title="REPEAT THE BASICS WITH INTENT">
              Progress comes from doing the same simple work better, not from adding new drills.
            </Rule>
          </Section>

          {/* IMAGE SLOT: Home Base Stance */}
          <ImageSlot
            id="FIG-1"
            title="The Home Base Stance"
            description="Full body or upper body shot. Feet shoulder-width, knees bent, chin tucked, hands touching cheekbones, elbows touching ribs."
            aspectRatio="portrait"
            imageSrc="/images/ebook/home_base2.jpeg"
            onClick={() => openLightbox('FIG-1')}
          />

          <Section title="YOUR HOME BASE">
            <KeyPoint>When you freeze or feel sloppy, return to this:</KeyPoint>
            <div className="p-5 mt-4" style={{ background: rawColors.vanta, color: rawColors.cream }}>
              <div className="font-display text-lg mb-3" style={{ color: rawColors.red }}>DEFAULT COMBOS:</div>
              <div className="mb-4">• Jab → Jab-Cross → Jab-Cross-Hook</div>
              <div className="font-display text-lg mb-3" style={{ color: rawColors.red }}>AFTER EACH COMBO:</div>
              <div>• Step out • Pivot • Slip • Roll</div>
            </div>
          </Section>

          <Section title="RESET IN 10 SECONDS">
            <div className="p-4" style={{ background: rawColors.blue, color: '#fff' }}>
              1. Feet back to stance width<br />
              2. Hands to cheeks, elbows on ribcage<br />
              3. Chin tucked<br />
              4. Shoulders relaxed<br />
              5. Inhale through nose, exhale through mouth
            </div>
          </Section>

          <ReflectionPrompt chapterId="when-you-feel-lost" prompt={CHAPTER_PROMPTS['when-you-feel-lost']} />

          <SectionCheckbox
            sectionId="when-you-feel-lost"
            sectionTitle="When You Feel Lost"
            onCompletionChange={handleCompletionChange}
          />

          {/* ============================================ 
              CHAPTER 4: WEEKLY STRUCTURE 
              ============================================ */}
          <ChapterHeader id="weekly-structure" number={4} title="Weekly Structure" icon={Dumbbell} />

          <Section title="WEEKLY TRAINING SPLIT">
            <p className="mb-4">Training rotates between two main types of sessions. This keeps progress consistent without random workouts or guesswork.</p>
          </Section>

          <Section title="DAY A — TECHNICAL EMPHASIS">
            <div className="p-4 mb-4" style={{ background: rawColors.blue, color: '#fff' }}>
              <strong>FOCUS:</strong> Clean movement, Precision, Control
            </div>
            <div>
              • Warm-up<br />
              • Shadowboxing (technical rounds)<br />
              • Bag work (form-focused)<br />
              • Light conditioning
            </div>
            <div className="mt-3 italic">This is where skill is built.</div>
          </Section>

          <Section title="DAY B — CONDITIONING EMPHASIS">
            <div className="p-4 mb-4" style={{ background: rawColors.red, color: '#fff' }}>
              <strong>FOCUS:</strong> Endurance, Output, Mental toughness
            </div>
            <div>
              • Warm-up<br />
              • Plyometrics or boxing circuits<br />
              • Bag work (conditioning rounds)<br />
              • Core work
            </div>
            <div className="mt-3 italic">This is where conditioning is earned.</div>
          </Section>

          <Section title="EXAMPLE LAYOUTS">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4" style={{ border: `2px solid ${rawColors.ink}` }}>
                <div className="font-display mb-2" style={{ color: rawColors.red }}>3 DAYS/WEEK</div>
                Day 1: Day A<br />
                Day 2: Day B<br />
                Day 3: Day A
              </div>
              <div className="p-4" style={{ border: `2px solid ${rawColors.ink}` }}>
                <div className="font-display mb-2" style={{ color: rawColors.red }}>5-6 DAYS/WEEK</div>
                Day 1: A | Day 2: B<br />
                Day 3: A | Day 4: B<br />
                Day 5: A | Day 6: Recovery
              </div>
            </div>
          </Section>

          <Section title="PROGRESSION RULES">
            <KeyPoint>Do not change exercises to progress. Improve how you perform them.</KeyPoint>
            <div className="mt-4">
              <strong>PROGRESS IN THIS ORDER:</strong><br />
              1. Technique Quality → 2. Round Duration → 3. Work Rate → 4. Reduced Rest
            </div>
          </Section>

          <ReflectionPrompt chapterId="weekly-structure" prompt={CHAPTER_PROMPTS['weekly-structure']} />

          <SectionCheckbox
            sectionId="weekly-structure"
            sectionTitle="Weekly Structure"
            onCompletionChange={handleCompletionChange}
          />

          {/* ============================================ 
              CHAPTER 5: WARM-UP ROUTINE 
              ============================================ */}
          <ChapterHeader id="warm-up-routine" number={5} title="Warm-Up Routine" icon={Zap} />

          <Section title="WARM-UP (MANDATORY)">
            <p>This warm-up prepares your joints, coordination, footwork, breathing, and punching mechanics. Skipping it leads to sloppy movement and higher injury risk.</p>
            <KeyPoint>Boxers warm up while moving. All steps should be small, controlled, and deliberate.</KeyPoint>
          </Section>

          {/* IMAGE SLOTS: Boxer's Step (3-image sequence) */}
          <ImageSlot
            id="FIG-2a"
            title="The Boxer's Step — Starting Position"
            description="Feet shoulder-width apart in the stance. This is your base before any movement."
            aspectRatio="portrait"
            imageSrc="/images/ebook/boxer_step_1.jpeg"
            onClick={() => openLightbox('FIG-2a')}
          />
          <ImageSlot
            id="FIG-2b"
            title="The Boxer's Step — The Step"
            description="Lead foot steps forward. Push off the back foot to initiate the movement."
            aspectRatio="portrait"
            imageSrc="/images/ebook/boxer_step_2.jpeg"
            onClick={() => openLightbox('FIG-2b')}
          />
          <ImageSlot
            id="FIG-2c"
            title="The Boxer's Step — The Slide"
            description="Rear foot slides up to restore original stance width. The gap between your feet never changes."
            aspectRatio="portrait"
            imageSrc="/images/ebook/boxer_step_3.jpeg"
            onClick={() => openLightbox('FIG-2c')}
          />

          {/* IMAGE SLOT: No-Cross Rule */}
          <ImageSlot
            id="FIG-3"
            title="The No-Cross Rule (Lateral Movement)"
            description="Action shot of the boxer moving sideways. Highlight the open space between the legs to prove they are not crossing."
            aspectRatio="landscape"
            imageSrc="/images/ebook/no_cross_zone.jpeg"
            onClick={() => openLightbox('FIG-3')}
          />

          <Section title="FULL WARM-UP ROUTINE">
            {[
              { time: '2 min', name: 'Jogging & Direction Change', desc: '1 min forward, 1 min backward' },
              { time: '2 min', name: 'Lateral Movement', desc: 'Hands on cheekbones, elbows tight' },
              { time: '1 min', name: 'Dynamic Leg Activation', desc: '30s butt kicks, 30s high knees' },
              { time: '1 min', name: 'Upper Body Mobility', desc: 'Arm circles forward and backward' },
              { time: '1 min', name: 'Bob and Weave', desc: '30s forward, 30s backward' },
              { time: '1 min', name: 'Slip Drills', desc: 'Alternate sides each slip' },
              { time: '1 min', name: 'Advancing Punches', desc: 'Left punch → right foot steps' },
              { time: '1 min', name: 'Retreating Punches', desc: 'Same hand, same foot steps back' },
              { time: '1 min', name: 'Straight Punches + Slips', desc: 'Advancing with defensive movement' },
              { time: '2 min', name: 'Uppercuts', desc: '1 min advancing, 1 min retreating' },
              { time: '2 min', name: 'Hook and Roll', desc: 'Rolling hooks with bob and weaves' },
              { time: '1.5 min', name: 'Final Push', desc: '1 min jog + 3×10-second sprints' }
            ].map((item, i) => (
              <div key={i} className="flex py-3" style={{ borderBottom: `1px solid ${rawColors.ink}` }}>
                <div className="font-display w-16" style={{ color: rawColors.red }}>{item.time}</div>
                <div className="flex-1">
                  <strong>{item.name}</strong><br />
                  <span className="text-xs opacity-60">{item.desc}</span>
                </div>
              </div>
            ))}
          </Section>

          {/* VIDEO LINKS: Warm-Up Videos */}
          <Section title="📹 WARM-UP VIDEO DEMONSTRATIONS">
            <p className="mb-4 text-sm opacity-80">Watch these technique videos to ensure proper form:</p>
            <VideoLink
              title="Lateral Movement"
              url="https://www.instagram.com/reel/DTarTqhDrPp/?igsh=MTJrbWt5NXppZGQ1eQ=="
              description="Proper side-to-side movement technique"
            />
            <VideoLink
              title="Bob and Weave Movement"
              url="https://www.instagram.com/reel/DUJD04gjk0y/?igsh=N2Z4bzRnajczZnB1"
              description="Defensive head movement drill"
            />
            <VideoLink
              title="Slip Drills"
              url="https://www.instagram.com/reel/DTQwrs_ASAu/?igsh=NnY1bGYxc3RsZmdm"
              description="Alternating side slips"
            />
            <VideoLink
              title="Punching While Advancing"
              url="https://www.instagram.com/reel/DTavPKFDti7/?igsh=MWdzdjJpdjgyY2d1Nw=="
              description="Forward movement with punches"
            />
            <VideoLink
              title="Punching While Retreating"
              url="https://www.instagram.com/reel/DTQwaGagSpI/?igsh=azU1bXB4M2Y1eTRu"
              description="Backward movement with punches"
            />
            <VideoLink
              title="Advancing Straight Punches With Slips"
              url="https://www.instagram.com/reel/DTA4_JyDqjy/?igsh=MXBoZGFtOWp0eG5vdQ=="
              description="Combining offense and defense"
            />
            <VideoLink
              title="Hook and Roll Work"
              url="https://www.instagram.com/reel/DTGGqB3DsVn/?igsh=MXR2MHBjZWg5M29z"
              description="Rolling hooks with bob and weaves"
            />
          </Section>

          {/* IMAGE SLOT: Kinetic Chain */}
          <ImageSlot
            id="FIG-4"
            title="The Kinetic Chain (Hip Rotation on Cross)"
            description="Freeze frame of a rear-hand punch (Cross). Focus on the rear foot. The heel must be off the ground and the foot twisted/pivoted."
            aspectRatio="landscape"
            imageSrc="/images/ebook/hip_rotation.jpeg"
            onClick={() => openLightbox('FIG-4')}
          />

          <ReflectionPrompt chapterId="warm-up-routine" prompt={CHAPTER_PROMPTS['warm-up-routine']} />

          <SectionCheckbox
            sectionId="warm-up-routine"
            sectionTitle="Warm-Up Routine"
            onCompletionChange={handleCompletionChange}
          />

          {/* ============================================ 
              CHAPTER 6: CONDITIONING 
              ============================================ */}
          <ChapterHeader id="conditioning" number={6} title="Conditioning" icon={Heart} />

          <Section title="CONDITIONING (ENGINE DEVELOPMENT)">
            <p>The goal is to stay effective while tired, not just survive the workout. This section improves endurance, coordination under fatigue, breathing control, and mental composure.</p>
          </Section>

          <Section title="COORDINATION-FOCUSED (DAY A)">
            <p className="mb-4">Select any 2 exercises per session:</p>
            {[
              { name: 'Spin + Shadowbox Drill', desc: 'Point at ceiling, spin 30s each direction, 30s shadowbox' },
              { name: 'Tennis Ball Dribble', desc: 'Maintain stance, dribble in center, pendulum footwork - 3 min' },
              { name: 'Tennis Ball Punch & Catch', desc: 'Bounce and catch while throwing punches - 3 min' },
              { name: 'Agility Footwork Patterns', desc: 'Ladder spacing, precision and posture - 3 min' }
            ].map((item, i) => (
              <div key={i} className="p-3 mb-2" style={{ background: rawColors.blue, color: '#fff' }}>
                <strong>{i + 1}. {item.name}</strong><br />{item.desc}
              </div>
            ))}
          </Section>

          <Section title="CARDIO-FOCUSED (DAY B)">
            <p className="mb-4">Select any 2 exercises per session:</p>
            {[
              { name: 'Squat Variations', desc: '1 min max reps — bodyweight → jump squats → burpee squats' },
              { name: 'Opposite Punch Jump Switches', desc: 'Jump-switch stance with every punch - 3 min' },
              { name: 'Ice Skaters', desc: 'Explosive lateral leaps, controlled landing' },
              { name: 'Clapping Push-Ups', desc: '3 rounds to technical failure' }
            ].map((item, i) => (
              <div key={i} className="p-3 mb-2" style={{ background: rawColors.red, color: '#fff' }}>
                <strong>{i + 1}. {item.name}</strong><br />{item.desc}
              </div>
            ))}
          </Section>

          <Section title="JUMP ROPE (MANDATORY)">
            <div className="p-5 text-center" style={{ background: rawColors.vanta, color: rawColors.neon }}>
              <div className="font-display text-2xl">2 × 3-MINUTE ROUNDS</div>
              <div className="mt-3">Small jumps • Relaxed shoulders • Stay on balls of feet</div>
            </div>
            <VideoLink
              title="Jump Rope Beginner Guide"
              url="https://www.instagram.com/reel/DTQvbx-Ad11/?igsh=MXJ3aDY1aXFveWtncA=="
              description="Master the fundamentals of jump rope"
            />
          </Section>

          {/* VIDEO LINKS: Conditioning Videos */}
          <Section title="📹 CONDITIONING VIDEO DEMONSTRATIONS">
            <VideoLink
              title="Agility Footwork Patterns"
              url="https://www.instagram.com/reel/DSGTppDjmhF/?igsh=bjluOXd5ZnBrdW5k"
              description="Ladder spacing and precision footwork"
            />
          </Section>

          <ReflectionPrompt chapterId="conditioning" prompt={CHAPTER_PROMPTS['conditioning']} />

          <SectionCheckbox
            sectionId="conditioning"
            sectionTitle="Conditioning"
            onCompletionChange={handleCompletionChange}
          />

          {/* ============================================ 
              THE KINETIC CHAIN (Educational Block)
              ============================================ */}
          <Section title="THE KINETIC CHAIN">
            <p className="mb-4">The fundamentals of boxing are built around the Kinetic Chain. This chain starts from the feet, travels through the legs and hips, engages the core and back, moves through the shoulders, and finally transfers force through the arm and fist.</p>
            <p className="mb-4">The goal of every punch is to generate maximum power by moving energy efficiently through this full-body chain. Mastering this sequence is the foundation of the sweet science of boxing.</p>
            <div className="p-4 text-center font-display text-sm uppercase tracking-widest" style={{ background: rawColors.ink, color: rawColors.neon }}>
              Feet → Legs → Hips → Core → Shoulders → Arm → Fist
            </div>
          </Section>

          {/* ============================================ 
              CHAPTER 7: SHADOWBOXING 
              ============================================ */}
          <ChapterHeader id="shadowboxing" number={7} title="Shadowboxing" icon={Award} />

          <Section title="SHADOWBOXING (REQUIRED)">
            <p className="mb-4">Shadowboxing is one of the most important tools in boxing. Use a mirror if possible. If not, record yourself and review honestly.</p>
            <KeyPoint>If you don&apos;t have a heavy bag, add 4 additional shadowboxing rounds.</KeyPoint>
          </Section>

          <Section title="SHADOWBOXING STRUCTURE">
            <div className="p-5" style={{ background: rawColors.vanta, color: rawColors.cream }}>
              <div className="mb-5">
                <div className="font-display text-lg" style={{ color: rawColors.red }}>ROUND 1 — MOVEMENT ONLY (3 MIN)</div>
                <div className="mt-2">Advancing • Retreating • Slips • Bob and weave • Pivots • Shifts</div>
              </div>
              <div className="mb-5">
                <div className="font-display text-lg" style={{ color: rawColors.blue }}>ROUND 2 — STATIONARY PUNCHING (3 MIN)</div>
                <div className="mt-2">Clean technique • Proper rotation • Balance</div>
              </div>
              <div>
                <div className="font-display text-lg" style={{ color: rawColors.neon }}>ROUND 3 — FULL INTEGRATION (3 MIN)</div>
                <div className="mt-2">Punching with movement • Stay relaxed • Maintain control</div>
              </div>
            </div>
            <div className="font-display text-center mt-4" style={{ color: rawColors.red }}>
              COMPLETE AT LEAST 3× PER WEEK
            </div>
          </Section>

          {/* VIDEO LINK: Shadowboxing Demo */}
          <Section title="📹 SHADOWBOXING VIDEO DEMONSTRATION">
            <VideoLink
              title="Round 3 - Full Integration Demo"
              url="https://www.instagram.com/reel/DTA45xqDglm/?igsh=YW8wYXNhNWtkOTV4"
              description="Watch the complete integration round"
            />
          </Section>

          <ReflectionPrompt chapterId="shadowboxing" prompt={CHAPTER_PROMPTS['shadowboxing']} />

          <SectionCheckbox
            sectionId="shadowboxing"
            sectionTitle="Shadowboxing"
            onCompletionChange={handleCompletionChange}
          />

          {/* ============================================ 
              CHAPTER 8: HEAVY BAG WORK 
              ============================================ */}
          <ChapterHeader id="heavy-bag-work" number={8} title="Heavy Bag Work" icon={Target} />

          <Section title="HEAVY BAG WORK">
            <p className="mb-2 italic">(Skip if no bag available)</p>
            <p>The heavy bag is where technique meets conditioning. Every round has a purpose.</p>
            <div className="flex gap-4 mt-4">
              <div className="flex-1 p-3 text-center" style={{ background: rawColors.red, color: '#fff' }}>
                <strong>6 ROUNDS</strong>
              </div>
              <div className="flex-1 p-3 text-center" style={{ background: rawColors.ink, color: '#fff' }}>
                <strong>3 MIN EACH</strong>
              </div>
              <div className="flex-1 p-3 text-center" style={{ background: rawColors.blue, color: '#fff' }}>
                <strong>30-60s REST</strong>
              </div>
            </div>
          </Section>

          <Section title="ROUND BREAKDOWN">
            {[
              { num: 1, name: 'JAB VARIATIONS', desc: 'Speed jabs, power jabs, doubles/triples, head and body' },
              { num: 2, name: 'JAB-CROSS VARIATIONS', desc: 'Jab-cross, double jab-cross, body variations, movement' },
              { num: 3, name: 'FREE COMBINATIONS', desc: 'Mix head and body, add defense and pivots, flow not chaos' },
              { num: 4, name: 'FREE COMBOS (WITH INTENT)', desc: 'Set punches up, angle after combos, punch → move → reset' },
              { num: 5, name: 'POWER & SPEED INTERVALS', desc: '15s nonstop punches / 15s squats — repeat full round' },
              { num: 6, name: 'POWER & SPEED (REPEAT)', desc: 'Mental test — maintain posture, keep form, finish strong' }
            ].map((r, i) => (
              <div key={i} className="flex mb-3" style={{ border: `2px solid ${rawColors.ink}` }}>
                <div className="font-display text-2xl p-4 flex items-center justify-center w-14" style={{ background: rawColors.red, color: '#fff' }}>{r.num}</div>
                <div className="p-3 flex-1">
                  <strong style={{ color: rawColors.ink }}>{r.name}</strong><br />
                  <span className="text-xs">{r.desc}</span>
                </div>
              </div>
            ))}
          </Section>

          <Section title="WEEKLY PROGRESSION">
            <div className="grid grid-cols-2 gap-3">
              {[
                { weeks: '1-2', focus: 'Foundation & Control', pct: '60-70%' },
                { weeks: '3-4', focus: 'Volume & Flow', pct: 'Higher output' },
                { weeks: '5-6', focus: 'Power Development', pct: '80-90%' },
                { weeks: '7+', focus: 'Fight Conditioning', pct: 'Full intensity' }
              ].map((p, i) => (
                <div key={i} className="p-3" style={{ background: i === 3 ? rawColors.red : rawColors.ink, color: '#fff' }}>
                  <div className="font-display">WEEKS {p.weeks}</div>
                  <div className="text-xs">{p.focus}</div>
                  <div className="text-xs" style={{ color: rawColors.neon }}>{p.pct}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* VIDEO LINKS: Heavy Bag Videos */}
          <Section title="📹 HEAVY BAG VIDEO DEMONSTRATIONS">
            <p className="mb-4 text-sm opacity-80">Watch technique demonstrations for bag work:</p>
            <VideoLink
              title="Jab-Cross Variations (Part 1)"
              url="https://www.instagram.com/reel/DS5N5dijpHx/?igsh=MTI2NXJkaXlocWRxYg=="
              description="Round 2 bag work fundamentals"
            />
            <VideoLink
              title="Jab-Cross Variations (Part 2)"
              url="https://www.instagram.com/reel/DTatHcejsml/?igsh=YzB3NnNtajFtc3Nu"
              description="Advanced jab-cross combinations"
            />
          </Section>

          <ReflectionPrompt chapterId="heavy-bag-work" prompt={CHAPTER_PROMPTS['heavy-bag-work']} />

          <SectionCheckbox
            sectionId="heavy-bag-work"
            sectionTitle="Heavy Bag Work"
            onCompletionChange={handleCompletionChange}
          />

          {/* ============================================ 
              CHAPTER 9: CORE TRAINING 
              ============================================ */}
          <ChapterHeader id="core-training" number={9} title="Core Training" icon={Dumbbell} />

          <Section title="ABS & CORE TRAINING">
            <p className="mb-4">Core work is non-negotiable in boxing. Your core is responsible for balance, rotation, punch stability, and injury prevention.</p>
            <KeyPoint>Performed after EVERY training session.</KeyPoint>
          </Section>

          {/* IMAGE SLOT: Core Safety - Flutter Kicks */}
          <ImageSlot
            id="FIG-6"
            title="Core Safety (Flutter Kicks)"
            description="Boxer lying on their back performing kicks. The camera angle must show the lower back is pressed flat against the floor (no arching)."
            aspectRatio="landscape"
            imageSrc="/images/ebook/flutter_kick.jpeg"
            onClick={() => openLightbox('FIG-6')}
          />

          <Section title="CORE ROUTINE">
            <p className="mb-4">Complete all exercises back-to-back with minimal rest:</p>
            {[
              { name: 'Flutter Kicks', time: '30s', focus: 'Lower back pressed to floor, small controlled kicks' },
              { name: 'Scissor Kicks', time: '30s', focus: 'Controlled leg crossing, core tight, no swinging' },
              { name: 'Feet Circles (Clockwise)', time: '30s', focus: 'Slow, controlled, engage lower abs' },
              { name: 'Feet Circles (Counter)', time: '30s', focus: 'Same movement, opposite direction' },
              { name: 'Mountain Climbers', time: '30s', focus: 'Fast but controlled, hips low, core engaged' },
              { name: 'Hands-to-Ankle Twists', time: '30s', focus: 'Controlled rotation, side-to-side reach' },
              { name: 'Boxing (Russian) Twists', time: '30s', focus: 'Rotation from torso, stay balanced' }
            ].map((ex, i) => (
              <div key={i} className="flex items-center py-2" style={{ borderBottom: `1px solid ${rawColors.ink}` }}>
                <div className="font-display px-2 py-1 mr-3" style={{ background: rawColors.red, color: '#fff' }}>{ex.time}</div>
                <div>
                  <strong>{ex.name}</strong><br />
                  <span className="text-xs opacity-60">{ex.focus}</span>
                </div>
              </div>
            ))}
            <div className="p-4 mt-4 text-center" style={{ background: rawColors.vanta, color: rawColors.neon }}>
              <strong>TOTAL TIME: ~3.5 MINUTES</strong>
            </div>
          </Section>

          {/* VIDEO LINKS: Core Training Videos */}
          <Section title="📹 CORE TRAINING VIDEO DEMONSTRATIONS">
            <p className="mb-4 text-sm opacity-80">Watch proper form for each exercise:</p>
            <VideoLink
              title="Flutter Kicks"
              url="https://www.instagram.com/reel/DSkmQLxjm6y/?igsh=MXZic2JmYjEyb3hoZw=="
              description="Keep lower back pressed to floor"
            />
            <VideoLink
              title="Scissor Kicks"
              url="https://www.instagram.com/reel/DTIy7umDmOo/?igsh=MXBkaDZsanFlb3dwag=="
              description="Controlled leg crossing technique"
            />
            <VideoLink
              title="Feet Circles (Both Directions)"
              url="https://www.instagram.com/reel/DSkmQLxjm6y/?igsh=MXZic2JmYjEyb3hoZw=="
              description="Slow, controlled circular movements"
            />
            <VideoLink
              title="Hands-to-Ankle Twists"
              url="https://www.instagram.com/reel/DSkmQLxjm6y/?igsh=MXZic2JmYjEyb3hoZw=="
              description="Controlled rotation with core engagement"
            />
          </Section>

          <ReflectionPrompt chapterId="core-training" prompt={CHAPTER_PROMPTS['core-training']} />

          <SectionCheckbox
            sectionId="core-training"
            sectionTitle="Core Training"
            onCompletionChange={handleCompletionChange}
          />

          {/* ============================================ 
              CHAPTER 10: PLYOMETRICS 
              ============================================ */}
          <ChapterHeader id="plyometrics" number={10} title="Plyometrics" icon={Zap} />

          <Section title="PLYOMETRICS & EXPLOSIVE CONDITIONING">
            <p className="mb-4 italic">(Optional — Intermediate & Advanced)</p>
            <p>Plyometrics develop explosiveness, speed, and elastic strength. This is what turns clean technique into snap.</p>
            <KeyPoint>Do not rush into plyometrics. If technique, balance, and conditioning aren&apos;t solid yet, wait.</KeyPoint>
          </Section>

          <Section title="WHEN TO ADD PLYOMETRICS">
            <div className="p-4" style={{ background: rawColors.blue, color: '#fff' }}>
              You may begin ONLY if ALL are true:<br /><br />
              ✓ Trained consistently 4-6 weeks<br />
              ✓ Can complete full sessions without gassing<br />
              ✓ Joints feel healthy and stable<br />
              ✓ Technique stays clean while fatigued
            </div>
          </Section>

          <Section title="EXERCISE SELECTION">
            <p className="mb-4">Choose 3-4 exercises per session. 2-3 sessions/week max.</p>
            {[
              { name: 'Squat Jumps', sets: '3', reps: '6–10', focus: 'Explode up, land soft, reset fully' },
              { name: 'Lunge Jumps', sets: '3', reps: '6–8/leg', focus: 'Explosive switching, upright torso' },
              { name: 'Broad Jumps', sets: '3', reps: '5–6', focus: 'Horizontal power, full hip extension' },
              { name: 'Skater Jumps', sets: '3', reps: '8–10', focus: 'Side-to-side explosiveness' },
              { name: 'Med Ball Slams', sets: '3', reps: '8–12', focus: 'Full-body power, core engagement' }
            ].map((ex, i) => (
              <div key={i} className="flex mb-3" style={{ background: rawColors.ink, color: '#fff' }}>
                <div className="font-display p-3 w-28 flex flex-col items-center justify-center" style={{ background: rawColors.red }}>
                  <span className="text-lg font-bold">{ex.sets} × {ex.reps}</span>
                </div>
                <div className="p-3 flex-1">
                  <strong>{ex.name}</strong><br />
                  <span className="text-xs opacity-80">{ex.focus}</span>
                </div>
              </div>
            ))}
          </Section>

          <ReflectionPrompt chapterId="plyometrics" prompt={CHAPTER_PROMPTS['plyometrics']} />

          <SectionCheckbox
            sectionId="plyometrics"
            sectionTitle="Plyometrics"
            onCompletionChange={handleCompletionChange}
          />

          {/* ============================================ 
              CHAPTER 11: NEXT STEPS 
              ============================================ */}
          <ChapterHeader id="next-steps" number={11} title="Next Steps" icon={Award} />

          <Section title="WHERE DO YOU GO FROM HERE?">
            <p className="mb-4">If you have followed this program consistently for several months, you should feel more confident in your movement, conditioning, and overall understanding of boxing.</p>
            <div className="p-4 mb-4" style={{ background: rawColors.neon, color: rawColors.ink }}>
              ✓ Movement feels more natural<br />
              ✓ Conditioning noticeably improved<br />
              ✓ You understand what you&apos;re doing and WHY
            </div>
            <p>That alone puts you ahead of most people. This is not the end — it is the foundation.</p>
          </Section>

          <Section title="WHAT THIS PROGRAM CANNOT DO">
            <p className="mb-4">Boxing exists in two worlds: physical and mental. This program builds the physical side.</p>
            <p>What it cannot fully replicate is the pressure, fear, and adrenaline of facing another person. Learning to stay calm, make decisions, and trust your skills under pressure comes with time, exposure, and mental toughness.</p>
          </Section>

          <Section title="IF YOU WANT TO GO FURTHER">
            <div className="p-5" style={{ background: rawColors.vanta, color: rawColors.cream }}>
              <div className="pb-4 mb-4" style={{ borderBottom: `1px solid ${rawColors.red}` }}>
                <div className="font-display mb-1" style={{ color: rawColors.red }}>1-ON-1 COACHING</div>
                Personalized guidance, accountability, and direct feedback
              </div>
              <div className="pb-4 mb-4" style={{ borderBottom: `1px solid ${rawColors.red}` }}>
                <div className="font-display mb-1" style={{ color: rawColors.red }}>FULL BOXING BLUEPRINT (60+ VIDEOS)</div>
                Complete breakdown of fundamentals, drills, conditioning, technique
              </div>
              <div>
                <div className="font-display mb-1" style={{ color: rawColors.red }}>COACHJOSHOFFICIAL DISCORD</div>
                Post clips, get feedback, train alongside like-minded boxers
              </div>
            </div>
          </Section>

          <Section title="FINAL NOTE">
            <div className="text-center p-5">
              <div className="font-display text-2xl md:text-3xl mb-4" style={{ color: rawColors.red }}>STAY PATIENT. STAY DISCIPLINED.</div>
              <p className="mb-4">Progress compounds when the work is done consistently.</p>
              <div className="italic">I&apos;ll be in your corner when you&apos;re ready.<br />Good luck with your training.</div>
            </div>
          </Section>

          <ReflectionPrompt chapterId="next-steps" prompt={CHAPTER_PROMPTS['next-steps']} />

          <SectionCheckbox
            sectionId="next-steps"
            sectionTitle="Next Steps"
            onCompletionChange={handleCompletionChange}
          />

          {/* ============================================ 
              BONUS: TRAINING LOG 
              ============================================ */}
          <ChapterHeader id="training-log" number={12} title="Training Log" icon={ClipboardList} />

          <TrainingLog />


        </div>
      </main>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="z-40 p-4 no-print"
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              left: 'auto',
              background: rawColors.red,
              border: `2px solid ${rawColors.ink}`,
              boxShadow: `4px 4px 0 ${rawColors.ink}`,
              color: rawColors.cream
            }}
            aria-label="Scroll to top"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Image Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={imageData}
        currentIndex={lightboxIndex}
        onNavigate={setLightboxIndex}
      />

      {/* Completion Certificate */}
      <CompletionCertificate
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
        completionDate={certificateDate}
      />
    </div>
  );
}
