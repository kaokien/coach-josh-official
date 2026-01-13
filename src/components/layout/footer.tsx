'use client';

import React from 'react';
import Link from 'next/link';

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
            <a href="https://instagram.com/@coachjosh" target="_blank" rel="noopener noreferrer" className="h-10 w-10 border-2 border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#1A1A1A] transition-colors">
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

export default Footer;
