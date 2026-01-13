'use client';

import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';

const SuccessModal = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A1A]/90 backdrop-blur-md">
      <div className="max-w-md w-full border-4 border-[#1A1A1A] bg-[#F2E8DC] p-8 text-center shadow-[8px_8px_0px_0px_#4A6FA5]">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#1A1A1A] bg-[#4A6FA5] text-white">
          <Check size={32} />
        </div>
        <h2 className="font-display text-5xl text-[#1A1A1A] mb-2">YOU'RE IN.</h2>
        <p className="font-body text-[#1A1A1A] mb-8">Here is your Striking Blueprint PDF.</p>
        <a 
          href="/assets/guide.pdf" 
          download 
          className="block w-full border-2 border-[#1A1A1A] bg-[#4A6FA5] py-4 font-display text-xl text-white hover:bg-[#D1495B] transition-colors shadow-[4px_4px_0px_0px_#000]"
        >
          DOWNLOAD NOW
        </a>
        <Link href="/" className="mt-4 block font-body text-sm text-[#1A1A1A] underline hover:text-[#4A6FA5]">
          Close Window
        </Link>
      </div>
    </div>
  );
};

export default SuccessModal;
