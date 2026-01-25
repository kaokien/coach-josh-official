'use client';

import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F2E8DC] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#4A6FA5] mx-auto mb-4" />
        <p className="font-display text-lg uppercase animate-pulse text-[#1A1A1A]">
          Loading Sign Up...
        </p>
      </div>
    </div>
  );
}
