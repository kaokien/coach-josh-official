'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowUpRight, Dumbbell, Video, BookOpen, Check } from 'lucide-react';

import Navigation from '@/components/layout/navigation';
import Footer from '@/components/layout/footer';
import Marquee from '@/components/ui/marquee';
import PaperTexture from '@/components/ui/paper-texture';
import { Button } from '@/components/ui/button';

const BOOKING_LINK =
  'https://calendly.com/mais-joshua/training-session?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=ccff00';

// ─────────────────────────────────────────────
// GymDesk Schedule Embed
// ─────────────────────────────────────────────
function GymDeskSchedule() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;

    // Check if script already exists
    const existing = document.querySelector('script[src="https://app.gymdesk.com/js/widgets.js"]');
    if (existing) {
      scriptLoaded.current = true;
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://app.gymdesk.com/js/widgets.js';
    script.async = true;
    script.onload = () => {
      scriptLoaded.current = true;
    };
    document.body.appendChild(script);

    return () => {
      // Don't remove on cleanup — GymDesk may need it persistent
    };
  }, []);

  return (
    <div ref={containerRef} className="gymdesk-schedule-container">
      {/* GymDesk widgets.js will auto-discover and render schedule widgets */}
      <div
        className="gymdesk-schedule"
        data-gym-id="bashtas-martial-arts"
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// Hero Section
// ─────────────────────────────────────────────
function TrainHero() {
  return (
    <section className="relative min-h-[75vh] flex items-end overflow-hidden border-b-2 border-[#1A1A1A] bg-[#1A1A1A]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1600&q=80"
          alt="Boxing gym interior"
          fill
          className="object-cover"
          style={{ filter: 'grayscale(100%) contrast(1.25) sepia(0.3)' }}
          priority
        />
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(74,111,165,0.2) 0%, rgba(26,26,26,0.9) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-16 pt-32 md:px-12">
        {/* Co-branding badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <span className="font-display text-sm md:text-base font-bold uppercase tracking-[0.2em] text-[#4A6FA5] border-b-2 border-[#4A6FA5]/40 pb-2 inline-block">
            CoachJoshOfficial × Bashta&apos;s Gym
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-[0.85] tracking-tighter text-white"
        >
          Train<br />In Person
        </motion.h1>

        {/* Red accent line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="h-1 bg-[#D1495B] mt-6"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="font-body text-lg text-[#F2E8DC] max-w-xl mt-8 border-l-4 border-[#4A6FA5] pl-4 py-2 bg-[#1A1A1A]/60 backdrop-blur-sm"
        >
          Real coaching at Bashta&apos;s Martial Arts in Hamden, CT. Group classes, private sessions, and open sparring.
        </motion.p>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap gap-3 mt-6"
        >
          <span className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.15em] text-white bg-[#D1495B] px-4 py-2 border-2 border-[#1A1A1A] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <MapPin size={14} /> Hamden, CT
          </span>
          <span className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.15em] text-[#1A1A1A] bg-[#F2E8DC] px-4 py-2 border-2 border-[#1A1A1A] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <Clock size={14} /> Group & Private Sessions
          </span>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// About / Instructors Section
// ─────────────────────────────────────────────
function AboutSection() {
  const instructors = [
    {
      name: 'Coach Josh',
      role: 'Boxing • Striking Science • Fight IQ',
      description:
        'Certified boxing coach with 100M+ social media views. Creator of the Striking Blueprint. Master the slip, the shift, and the science of striking.',
      icon: '🥊',
    },
    {
      name: 'Bashta',
      role: 'Martial Arts • Self Defense',
      description:
        'Founder of Bashta\'s Martial Arts. Decades of experience in martial arts instruction and self-defense training.',
      icon: '🥋',
    },
  ];

  return (
    <section className="border-b-2 border-[#1A1A1A] bg-[#F2E8DC] px-6 py-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#1A1A1A] border-b-4 border-[#1A1A1A] pb-4 mb-8 inline-block">
            Your Coaches
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          {instructors.map((instructor, i) => (
            <motion.div
              key={instructor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="border-2 border-[#1A1A1A] bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
            >
              <div className="text-3xl mb-3">{instructor.icon}</div>
              <h3 className="font-display text-xl font-bold uppercase text-[#1A1A1A]">
                {instructor.name}
              </h3>
              <p className="font-body text-sm text-[#4A6FA5] font-bold uppercase tracking-wider mt-1">
                {instructor.role}
              </p>
              <p className="font-body text-sm text-[#1A1A1A]/70 mt-3 leading-relaxed">
                {instructor.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Schedule Section (with GymDesk embed)
// ─────────────────────────────────────────────
function ScheduleSection() {
  return (
    <section className="border-b-2 border-[#1A1A1A] bg-white px-6 py-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#1A1A1A] border-b-4 border-[#1A1A1A] pb-4 mb-4 inline-block">
            Class Schedule
          </h2>
          <p className="font-body text-[#1A1A1A]/60 mb-8 max-w-lg">
            View available classes and book your spot. Schedule powered by GymDesk.
          </p>
        </motion.div>

        {/* GymDesk Embed Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-2 border-[#1A1A1A] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#F2E8DC] p-4 md:p-8 min-h-[400px]"
        >
          <GymDeskSchedule />

          {/* Fallback / Direct link */}
          <div className="mt-6 text-center">
            <a
              href="https://bashtas-martial-arts.gymdesk.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-[#4A6FA5] hover:text-[#1A1A1A] underline underline-offset-4 transition-colors"
            >
              View full schedule on GymDesk →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Private Session CTA
// ─────────────────────────────────────────────
function PrivateSessionCTA() {
  return (
    <section className="border-b-2 border-[#1A1A1A] bg-[#1A1A1A] px-6 py-20 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 lg:flex-row">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 font-display text-[#D1495B] font-bold uppercase tracking-widest text-sm">
            <div className="h-3 w-3 rounded-full bg-[#D1495B] animate-pulse" />
            Limited Availability
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold uppercase text-white leading-none">
            Private<br />1-on-1
          </h2>
          <p className="font-body mt-6 text-lg text-white/70">
            Want personalized coaching? Book a private session with Coach Josh. Pad work, sparring strategy, film study, and a custom training plan.
          </p>
          <ul className="mt-6 space-y-3 font-body text-white/60">
            {[
              'Pad work & technique refinement',
              'Sparring strategy session',
              'Film breakdown of your fights',
              'Custom training plan',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <Check size={16} className="text-[#4A6FA5] flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <a
          href={BOOKING_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
        >
          <div className="absolute top-2 left-2 h-full w-full bg-white/10" />
          <div className="relative flex items-center gap-4 border-2 border-white bg-[#F2E8DC] px-12 py-8 transition-transform hover:-translate-x-1 hover:-translate-y-1">
            <div className="text-left">
              <div className="font-display text-3xl text-[#1A1A1A] uppercase">Book Session</div>
              <div className="font-body text-sm font-bold text-[#4A6FA5]">$150 / Hour</div>
            </div>
            <ArrowUpRight size={32} className="text-[#1A1A1A]" />
          </div>
        </a>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Digital Upsell — "Can't make it in person?"
// ─────────────────────────────────────────────
function DigitalUpsell() {
  const programs = [
    {
      name: 'Striking Blueprint',
      price: '$49',
      priceNote: 'one-time',
      description: 'The complete striking system. 8 weeks of structured drills, film study, and fight IQ.',
      href: '/blueprint',
      icon: <BookOpen size={24} />,
    },
    {
      name: 'Corner Man VIP',
      price: '$29.99/mo',
      priceNote: 'or $299.99/yr',
      description: 'Monthly live coaching calls, exclusive drills library, and direct Q&A with Coach Josh.',
      href: '/cornerman',
      icon: <Video size={24} />,
    },
  ];

  return (
    <section className="border-b-2 border-[#1A1A1A] bg-[#F2E8DC] px-6 py-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="font-display text-sm font-bold uppercase tracking-[0.15em] text-[#4A6FA5]">
            Can&apos;t Make It In Person?
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#1A1A1A] mt-3">
            Train Digitally
          </h2>
          <p className="font-body text-[#1A1A1A]/60 mt-4 max-w-lg mx-auto">
            Get the same coaching methodology from anywhere in the world. Start with the Blueprint, level up with Corner Man.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {programs.map((program, i) => (
            <motion.div
              key={program.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Link
                href={program.href}
                className="block border-2 border-[#1A1A1A] bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-[#4A6FA5]">{program.icon}</div>
                  <ArrowUpRight size={20} className="text-[#1A1A1A]/30 group-hover:text-[#4A6FA5] transition-colors" />
                </div>
                <h3 className="font-display text-xl font-bold uppercase text-[#1A1A1A]">
                  {program.name}
                </h3>
                <div className="font-body text-sm font-bold text-[#4A6FA5] mt-1">
                  {program.price} <span className="text-[#1A1A1A]/40 font-normal">{program.priceNote}</span>
                </div>
                <p className="font-body text-sm text-[#1A1A1A]/60 mt-3 leading-relaxed">
                  {program.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Main Page Component
// ─────────────────────────────────────────────
export default function TrainPage() {
  return (
    <main className="relative min-h-screen bg-[#F2E8DC] font-sans text-[#1A1A1A] selection:bg-[#4A6FA5] selection:text-white">
      <PaperTexture />
      <Navigation />

      <TrainHero />
      <Marquee text="COACHJOSHOFFICIAL × BASHTA'S GYM • HAND SPEED • FOOTWORK • POWER • DEFENSE • " />
      <AboutSection />
      <ScheduleSection />
      <PrivateSessionCTA />
      <DigitalUpsell />

      <Footer />
    </main>
  );
}
