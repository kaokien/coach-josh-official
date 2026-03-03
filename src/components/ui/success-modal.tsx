'use client';

import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';

const SuccessModal = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/90 backdrop-blur-md">
      <div className="max-w-md w-full border-4 border-[#0F172A] bg-[#FFFFFF] p-8 text-center shadow-[8px_8px_0px_0px_#2563EB]">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#0F172A] bg-[#2563EB] text-white">
          <Check size={32} />
        </div>
        <h2 className="font-display text-5xl text-[#0F172A] mb-2">YOU'RE IN.</h2>
        <p className="font-body text-[#0F172A] mb-8">Here is your Striking Blueprint PDF.</p>
        <a 
          href="/assets/guide.pdf" 
          download 
          className="block w-full border-2 border-[#0F172A] bg-[#2563EB] py-4 font-display text-xl text-white hover:bg-[#DC2626] transition-colors shadow-[4px_4px_0px_0px_#000]"
        >
          DOWNLOAD NOW
        </a>
        <Link href="/" className="mt-4 block font-body text-sm text-[#0F172A] underline hover:text-[#2563EB]">
          Close Window
        </Link>
      </div>
    </div>
  );
};

export default SuccessModal;
