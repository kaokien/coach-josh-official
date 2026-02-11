import { auth, currentUser } from '@clerk/nextjs/server';
import BoxingEbook from '@/components/BoxingEbook';
import { InteractiveFX } from '@/components/ebook';
import { hasBluprintAccess } from '@/lib/lemonsqueezy';
import BlueprintSalesPage from '@/components/sales/blueprint-sales-page';
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

export default async function BlueprintPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const { userId } = await auth();
  const { success } = await searchParams;

  // 1. If not logged in, show Sales Page (Waitlist Mode)
  if (!userId) {
    return <BlueprintSalesPage />;
  }

  // 2. Check Purchase Status
  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;
  const hasPurchased = await hasBluprintAccess(userId, email);

  // 3. If logged in but NOT purchased, show Sales Page
  if (!hasPurchased) {
    return <BlueprintSalesPage />;
  }

  // 4. User has paid — show the content
  return (
    <InteractiveFX>
      <BoxingEbook success={success === 'true'} />
    </InteractiveFX>
  );
}
