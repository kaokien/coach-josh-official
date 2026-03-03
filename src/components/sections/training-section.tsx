'use client';

import React from 'react';
import Link from 'next/link';
import { Check, ArrowUpRight } from 'lucide-react';

const TrainingSection = () => {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const daysLeft = daysInMonth - today.getDate();
  // Simple logic to show "scarcity" based on days left in month
  const spotsLeft = Math.max(1, Math.floor((daysLeft / daysInMonth) * 8));

  return (
    <section id="training" className="border-t-2 border-[#0F172A] bg-white px-6 py-32 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 lg:flex-row">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 font-display text-[#DC2626] font-bold uppercase tracking-widest text-sm">
            <div className="h-3 w-3 rounded-full bg-[#DC2626] animate-pulse"></div>
            Only {spotsLeft} Spots Left This Month
          </div>
          <h2 className="font-display text-6xl md:text-7xl uppercase text-[#0F172A] leading-none">
            Train <br /> In Person
          </h2>
          <p className="font-body mt-6 text-xl text-[#0F172A]/80">
            Based in Hamden, CT? Train at Bashta&apos;s Martial Arts. Group classes, private 1-on-1 sessions, and open sparring — all with Coach Josh.
          </p>
          <ul className="mt-8 space-y-3 font-body">
            {['Group boxing classes', 'Private 1-on-1 sessions', 'Open sparring sessions', 'Book online via GymDesk'].map(i => (
              <li key={i} className="flex items-center gap-3 text-[#0F172A]/80">
                <Check size={16} className="text-[#2563EB]" />{i}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative group">
          <div className="absolute top-2 left-2 h-full w-full rounded-lg bg-[#0F172A]"></div>
          <Link
            href="/train"
            className="relative flex items-center gap-4 border-2 border-[#0F172A] bg-[#FFFFFF] px-12 py-8 transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:bg-white"
          >
            <div className="text-left">
              <div className="font-display text-3xl text-[#0F172A] uppercase">View Schedule</div>
              <div className="font-body text-sm font-bold text-[#2563EB]">CoachJoshOfficial × Bashta&apos;s Gym</div>
            </div>
            <ArrowUpRight size={32} className="text-[#0F172A]" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrainingSection;
