import { auth, currentUser } from '@clerk/nextjs/server';
import BoxingEbook from '@/components/BoxingEbook';
import { InteractiveFX } from '@/components/ebook';
import { hasBluprintAccess } from '@/lib/lemonsqueezy';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Boxing Blueprint | Coach Josh Official',
  description: 'Master the fundamentals of boxing with this comprehensive training guide. Learn proper technique, conditioning, and fight IQ from Coach Josh.',
  openGraph: {
    title: 'Boxing Blueprint | Coach Josh Official',
    description: 'Master the fundamentals of boxing with this comprehensive training guide.',
    type: 'website',
  },
};

// Waitlist gate for authenticated users who haven't purchased yet
function BlueprintWaitlist() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div
          className="bg-[#F2E8DC] border-4 border-[#1A1A1A] p-8"
          style={{ boxShadow: '12px 12px 0px 0px rgba(0,0,0,1)' }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#D1495B] w-12 h-12 flex items-center justify-center">
              <span className="text-2xl">🥊</span>
            </div>
            <div>
              <h1 className="font-display text-2xl uppercase text-[#1A1A1A] tracking-tight">
                Boxing Blueprint
              </h1>
              <p className="font-body text-xs text-[#D1495B] uppercase">
                Premium Training Guide — $49
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-1 bg-[#1A1A1A] mb-6" />

          {/* Content */}
          <div className="font-body text-[#1A1A1A] mb-6 space-y-4">
            <p>
              The Boxing Blueprint is currently in development. Join the waitlist to be
              the first to know when it&apos;s ready.
            </p>
            <div className="bg-[#050505] text-[#CCFF00] p-4 border-2 border-[#CCFF00]">
              <strong>⚡ WHAT YOU&apos;LL GET:</strong>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• 11 chapters of fight science</li>
                <li>• Footwork drills & angles</li>
                <li>• Heavy bag workouts</li>
                <li>• 4-week strength program</li>
                <li>• Printable workout logs</li>
              </ul>
            </div>
          </div>

          {/* CTA — link back to programs section waitlist */}
          <a
            href="/#programs"
            className="block w-full bg-[#4A6FA5] text-white font-display text-center py-4 uppercase tracking-wide border-2 border-[#1A1A1A] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform"
            style={{ boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' }}
          >
            Join Waitlist
          </a>

          <p className="font-body text-center text-xs text-[#1A1A1A]/60 mt-4">
            We&apos;ll notify you when the Blueprint is available for purchase.
          </p>
        </div>
      </div>
    </div>
  );
}


export default async function BlueprintPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const { userId } = await auth();
  const { success } = await searchParams;

  // Middleware ensures userId is present, but guard just in case
  if (!userId) {
    return <BlueprintWaitlist />;
  }

  // Check if user has purchased the Blueprint via Lemon Squeezy
  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;
  const hasPurchased = await hasBluprintAccess(userId, email);

  // Not purchased — show waitlist (purchase flow paused pending LS approval)
  if (!hasPurchased) {
    return <BlueprintWaitlist />;
  }

  // User has paid — show the content (with optional confetti on first visit)
  return (
    <InteractiveFX>
      <BoxingEbook success={success === 'true'} />
    </InteractiveFX>
  );
}
