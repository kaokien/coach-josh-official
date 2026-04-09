import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2026-03-25.dahlia',
});

/**
 * Checks if a user has access to the Blueprint by looking up their email in Stripe.
 * We look for any completed checkout session associated with this email.
 * This handles both standard purchases and 100% off promo code checkouts.
 */
export async function hasBlueprintAccess(email?: string | null): Promise<boolean> {
  if (!email) return false;

  try {
    const sessions = await stripe.checkout.sessions.list({
      customer_details: { email },
      status: 'complete',
      limit: 10,
    });

    // If they have at least one completed checkout session, grant access.
    // In the future, you can filter this down to a specific Price ID if you add more products.
    if (sessions.data.length > 0) {
      console.log(`[Stripe] Access granted for ${email}`);
      return true;
    }

    console.log(`[Stripe] No completed purchases found for ${email}`);
    return false;
  } catch (error) {
    console.error('[Stripe] Error verifying access:', error);
    return false;
  }
}
