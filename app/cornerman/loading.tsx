'use client';

import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F2E8DC] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#1A1A1A] mx-auto mb-4" />
        <p className="font-display text-xl uppercase animate-pulse text-[#1A1A1A]">
          Loading Corner Man...
        </p>
      </div>
    </div>
  );
}
