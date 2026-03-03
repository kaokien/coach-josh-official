'use client';

import { useEffect } from 'react';
import { AlertTriangle, RotateCcw, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function CornermanError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Cornerman error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white border-2 border-[#0F172A] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="w-16 h-16 mx-auto mb-6 bg-[#DC2626] text-white flex items-center justify-center border-2 border-[#0F172A]">
            <AlertTriangle size={32} />
          </div>

          <h1 className="font-display text-3xl uppercase text-[#0F172A] mb-2">
            Training Error
          </h1>
          <p className="font-body text-sm text-[#2563EB] uppercase tracking-wider mb-4">
            Corner Man Vault
          </p>

          <p className="font-body text-[#0F172A]/60 mb-8">
            Something went wrong loading your training content. Your progress is safe.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={reset}
              className="flex-1 flex items-center justify-center gap-2 bg-[#2563EB] text-white font-display uppercase py-3 px-6 border-2 border-[#0F172A] hover:bg-[#3A5F95] transition-colors"
            >
              <RotateCcw size={18} />
              Retry
            </button>

            <Link
              href="/cornerman"
              className="flex-1 flex items-center justify-center gap-2 bg-white text-[#0F172A] font-display uppercase py-3 px-6 border-2 border-[#0F172A] hover:bg-[#FFFFFF] transition-colors"
            >
              <ChevronLeft size={18} />
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
