import { auth, currentUser } from '@clerk/nextjs/server';
import BoxingEbook from '@/components/BoxingEbook';
import { InteractiveFX } from '@/components/ebook';
import { hasBlueprintAccess } from '@/lib/stripe';
import BlueprintSalesPage from '@/components/sales/blueprint-sales-page';
import { checkBypassStatus } from '../admin/bypass/actions';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Striking Blueprint | Coach Josh Official',
  description: 'Master the fundamentals of boxing with this comprehensive training guide. Learn proper technique, conditioning, and fight IQ from Coach Josh.',
  openGraph: {
    title: 'Striking Blueprint | Coach Josh Official',
    description: 'Master the fundamentals of boxing with this comprehensive training guide.',
    type: 'website',
  },
};

export default async function BlueprintPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const { success } = await searchParams;

  // 1. Admin bypass — checked FIRST, overrides everything
  const hasBypass = await checkBypassStatus();
  if (hasBypass) {
    return (
      <InteractiveFX>
        <BoxingEbook success={success === 'true'} />
      </InteractiveFX>
    );
  }

  // 2. If not logged in, show Sales Page
  const { userId } = await auth();
  if (!userId) {
    return <BlueprintSalesPage />;
  }

  // 3. Check access — Clerk metadata (set by webhook) OR direct Stripe lookup
  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;

  // Fast path: webhook already marked this user as having access in Clerk
  const clerkHasAccess = !!(user?.publicMetadata?.hasBlueprintAccess);

  // Fallback: direct Stripe session lookup (handles edge cases / promo codes)
  const stripeHasAccess = clerkHasAccess ? true : await hasBlueprintAccess(email);

  // 4. Neither check passed — show Sales Page
  if (!stripeHasAccess) {
    return <BlueprintSalesPage />;
  }

  // 5. Paid user — show the book
  return (
    <InteractiveFX>
      <BoxingEbook success={success === 'true'} />
    </InteractiveFX>
  );
}
