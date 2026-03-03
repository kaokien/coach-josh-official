'use client';

import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#2563EB] mx-auto mb-4" />
        <p className="font-display text-lg uppercase animate-pulse text-[#0F172A]">
          Loading Sign In...
        </p>
      </div>
    </div>
  );
}
