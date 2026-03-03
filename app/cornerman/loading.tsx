'use client';

import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#0F172A] mx-auto mb-4" />
        <p className="font-display text-xl uppercase animate-pulse text-[#0F172A]">
          Loading Corner Man...
        </p>
      </div>
    </div>
  );
}
