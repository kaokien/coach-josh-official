import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { hasBluprintAccess } from '@/lib/lemonsqueezy';

/**
 * GET /api/check-access
 *
 * Checks if the authenticated user has purchased the Boxing Blueprint
 * via Lemon Squeezy. Returns { hasAccess: boolean }.
 */
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ hasAccess: false, reason: 'not_authenticated' });
    }

    const user = await currentUser();
    const email = user?.emailAddresses?.[0]?.emailAddress;

    const hasAccess = await hasBluprintAccess(userId, email);

    return NextResponse.json({ hasAccess });
  } catch (error: unknown) {
    console.error(
      'Access check error:',
      error instanceof Error ? error.message : 'Unknown error',
    );
    return NextResponse.json({ hasAccess: false, reason: 'error' }, { status: 500 });
  }
}
