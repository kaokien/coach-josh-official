'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('cookie_notice_dismissed');
    if (!dismissed) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem('cookie_notice_dismissed', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="mx-auto max-w-7xl px-4 pb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 border-2 border-[#0F172A] bg-[#0F172A] px-5 py-4 shadow-[4px_4px_0px_0px_#2563EB]">
          <p className="font-body text-sm text-white/80 flex-1">
            This site uses essential cookies for login and analytics to improve your experience.{' '}
            <Link href="/privacy" className="text-[#2563EB] hover:underline">
              Privacy Policy
            </Link>
          </p>
          <button
            onClick={dismiss}
            className="shrink-0 border-2 border-white/20 bg-white/10 px-5 py-2 font-display text-xs uppercase tracking-widest text-white hover:bg-white hover:text-[#0F172A] transition-all"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
