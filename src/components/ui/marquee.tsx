'use client';

import React from 'react';

export default function Marquee({ text }: { text: string }) {
  return (
    <div className="relative flex w-full overflow-hidden border-y-2 border-[#0F172A] bg-[#2563EB] py-4 text-white">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="mx-8 text-4xl font-display uppercase">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}