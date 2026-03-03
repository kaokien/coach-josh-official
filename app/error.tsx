'use client';

import { useEffect } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white border-2 border-[#0F172A] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="w-16 h-16 mx-auto mb-6 bg-[#DC2626] text-white flex items-center justify-center border-2 border-[#0F172A]">
            <AlertTriangle size={32} />
          </div>

          <h1 className="font-display text-3xl uppercase text-[#0F172A] mb-4">
            Something Went Wrong
          </h1>

          <p className="font-body text-[#0F172A]/60 mb-8">
            We hit an unexpected error. Don&apos;t worry, your progress is saved.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={reset}
              className="flex-1 flex items-center justify-center gap-2 bg-[#0F172A] text-white font-display uppercase py-3 px-6 border-2 border-[#0F172A] hover:bg-[#2563EB] transition-colors"
            >
              <RotateCcw size={18} />
              Try Again
            </button>

            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 bg-white text-[#0F172A] font-display uppercase py-3 px-6 border-2 border-[#0F172A] hover:bg-[#FFFFFF] transition-colors"
            >
              <Home size={18} />
              Go Home
            </Link>
          </div>
        </div>

        {error.digest && (
          <p className="mt-4 font-mono text-xs text-[#0F172A]/30">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
