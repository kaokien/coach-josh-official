import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white border-2 border-[#0F172A] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {/* 404 Display */}
          <div className="mb-6">
            <span className="font-display text-8xl text-[#0F172A] block leading-none">404</span>
            <span className="font-display text-xl uppercase text-[#2563EB]">Page Not Found</span>
          </div>

          <p className="font-body text-[#0F172A]/60 mb-8">
            Looks like this page slipped past our defense. Let&apos;s get you back in the ring.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 bg-[#0F172A] text-white font-display uppercase py-3 px-6 border-2 border-[#0F172A] hover:bg-[#2563EB] transition-colors"
            >
              <Home size={18} />
              Home
            </Link>

            <Link
              href="/cornerman"
              className="flex-1 flex items-center justify-center gap-2 bg-white text-[#0F172A] font-display uppercase py-3 px-6 border-2 border-[#0F172A] hover:bg-[#FFFFFF] transition-colors"
            >
              <Search size={18} />
              Corner Man
            </Link>
          </div>
        </div>

        <p className="mt-6 font-body text-sm text-[#0F172A]/40">
          Looking for training content? Head to{' '}
          <Link href="/cornerman" className="text-[#2563EB] hover:underline">
            Corner Man VIP
          </Link>
        </p>
      </div>
    </div>
  );
}
