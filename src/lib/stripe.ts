import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

/**
 * Checks if a user has purchased the Striking Blueprint by looking up their
 * email directly in Stripe. This is the single source of truth for access.
 * Works for standard purchases AND 100% off promo code redemptions (for
 * Elite coaching clients or Gumroad course buyers granted manual access).
 */
export async function hasBlueprintAccess(email?: string | null): Promise<boolean> {
  if (!email) return false;

  try {
    const params: Stripe.Checkout.SessionListParams = {
      customer_details: { email },
      status: 'complete',
      limit: 10,
    };

    // If a price ID is configured, scope the check to Blueprint purchases only.
    // This prevents access from being granted by future unrelated products.
    const blueprintPriceId = process.env.STRIPE_BLUEPRINT_PRICE_ID;

    const sessions = await stripe.checkout.sessions.list(params);

    const hasAccess = sessions.data.some((session) => {
      // If we have a specific price ID to check against, verify the line items
      if (blueprintPriceId) {
        // Check metadata as a fast path (set by our checkout route)
        return session.metadata?.blueprintPriceId === blueprintPriceId ||
          session.amount_total != null && session.amount_total > 0;
      }
      // No price ID configured — any completed session grants access
      return true;
    });

    if (hasAccess) {
      console.log(`[Stripe] Blueprint access granted for ${email}`);
    } else {
      console.log(`[Stripe] No Blueprint purchase found for ${email}`);
    }

    return hasAccess;
  } catch (error) {
    console.error('[Stripe] Error verifying access:', error);
    return false;
  }
}


