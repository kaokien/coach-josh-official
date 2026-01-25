'use client';

import { Trophy, Star, Check, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
        <div className="mb-6 h-20 w-20 mx-auto rounded-full bg-[#4A6FA5] flex items-center justify-center text-white">
          <Trophy size={40} />
        </div>

        <h1 className="font-display text-4xl md:text-5xl text-[#1A1A1A] mb-4 uppercase">
          Welcome, {userFirstName || 'Fighter'}
        </h1>
        <p className="font-body text-[#1A1A1A]/80 text-lg mb-8">
          Your account is ready. Unlock the full training vault and start building your skills.
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
              'No commitment'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <Check size={16} className="text-[#4A6FA5] flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={onCheckout}
            className="w-full bg-[#4A6FA5] border-2 border-[#1A1A1A] text-white font-display text-xl uppercase py-4 hover:bg-[#D1495B] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            Unlock Training
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export function SignInGate() {
  return (
    <div className="min-h-screen bg-[#F2E8DC] flex items-center justify-center p-4">
      <div className="text-center max-w-md relative z-10">
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
  )
}
