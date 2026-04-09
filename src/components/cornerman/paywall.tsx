'use client';

import { Trophy, Star, Check, Lock, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const GUMROAD_URL = 'https://coachjosh1.gumroad.com/l/opdee';

interface PaywallProps {
  userFirstName?: string | null;
  onCheckout: () => void;
}

export default function Paywall({ userFirstName, onCheckout }: PaywallProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full"
      >
        <div className="mb-6 h-20 w-20 mx-auto rounded-full bg-[#2563EB] flex items-center justify-center text-white">
          <Trophy size={40} />
        </div>

        <h1 className="font-display text-4xl md:text-5xl text-[#0F172A] mb-4 uppercase">
          Welcome, {userFirstName || 'Fighter'}
        </h1>
        <p className="font-body text-[#0F172A]/80 text-lg mb-8">
          Your account is ready. Unlock the full training vault and start building your skills.
        </p>

        <div className="p-8 border-4 border-[#0F172A] bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <div className="mb-6 inline-flex items-center gap-2 border-2 border-[#DC2626] bg-[#DC2626]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#DC2626]">
            <Star size={12} /> Most Popular
          </div>

          <h3 className="font-display text-3xl text-[#0F172A] mb-2 uppercase">Boxing Blueprint</h3>
          <div className="flex items-baseline justify-center gap-2 mb-6">
            <span className="font-display text-5xl text-[#2563EB]">$197</span>
            <span className="font-body text-[#0F172A]/60">one-time</span>
          </div>

          <ul className="text-left space-y-3 mb-8 font-body text-sm">
            {[
              '60+ Video Lessons',
              'Full Striking System',
              'Fight IQ Breakdowns',
              'Private Discord Community',
              'Lifetime Access'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <Check size={16} className="text-[#2563EB] flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <a
            href={GUMROAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[#2563EB] border-2 border-[#0F172A] text-white font-display text-xl uppercase py-4 hover:bg-[#1d4ed8] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center"
          >
            Get The Course <ArrowUpRight size={18} className="inline ml-2" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export function SignInGate() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center p-4">
      <div className="text-center max-w-md relative z-10">
        <div className="mb-6 h-20 w-20 mx-auto rounded-full bg-[#0F172A] flex items-center justify-center text-white">
          <Lock size={40} />
        </div>
        <h1 className="font-display text-4xl text-[#0F172A] mb-4 uppercase">Members Only</h1>
        <p className="font-body text-[#0F172A]/80 mb-8">
          Sign in to access the Corner Man vault.
        </p>
        <Link
          href="/sign-in?redirect_url=/cornerman"
          className="inline-block w-full bg-[#2563EB] border-2 border-[#0F172A] text-white font-display text-xl uppercase py-4 hover:bg-[#2563EB]/90 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          Sign In
        </Link>
        <Link href="/" className="block mt-4 font-body text-sm text-[#0F172A]/60 hover:text-[#2563EB]">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
