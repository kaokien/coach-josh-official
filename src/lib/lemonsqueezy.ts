/**
 * Lemon Squeezy helpers for the Boxing Blueprint product.
 *
 * Uses the LS REST API to verify whether a given Clerk user
 * has purchased the Blueprint (product 794615).
 */

const LS_API_BASE = 'https://api.lemonsqueezy.com/v1';

function headers() {
  return {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
    Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
  };
}

/* ------------------------------------------------------------------ */
/*  Public helpers                                                     */
/* ------------------------------------------------------------------ */

/**
 * Check if a Clerk user has purchased the Boxing Blueprint.
 *
 * Strategy:
 * 1. Try email-based lookup first (fast path — works for non-Apple users)
 * 2. Fall back to fetching ALL store orders and matching by clerk_id
 *    embedded in meta.custom_data (handles Apple "Hide My Email" relay)
 */
export async function hasBluprintAccess(
  clerkId: string,
  email?: string | null,
): Promise<boolean> {
  try {
    const storeId = process.env.LEMON_SQUEEZY_STORE_ID;
    const productId = Number(process.env.NEXT_PUBLIC_LEMON_SQUEEZY_PRODUCT_ID);

    console.log('[LS] Checking access for:', { clerkId, email, storeId, productId });

    // ── Fast path: lookup by email ────────────────────────────────────
    if (email) {
      const emailMatch = await findPaidOrder(storeId!, productId, { email });
      if (emailMatch) {
        console.log('[LS] ✅ Access granted via email match');
        return true;
      }
    }

    // ── Fallback: lookup by clerk_id in custom_data ──────────────────
    // Needed when Clerk email ≠ LS purchase email (e.g. Apple relay)
    const clerkMatch = await findPaidOrder(storeId!, productId, { clerkId });
    if (clerkMatch) {
      console.log('[LS] ✅ Access granted via clerk_id match');
      return true;
    }

    console.log('[LS] ❌ No matching paid order found');
    return false;
  } catch (err) {
    console.error('[LS] Access check error:', err);
    return false;
  }
}

/**
 * Search LS orders for a paid Blueprint purchase.
 *
 * @param match.email    — filter API by user_email (fast)
 * @param match.clerkId  — scan ALL store orders checking custom_data (slower)
 */
async function findPaidOrder(
  storeId: string,
  productId: number,
  match: { email?: string; clerkId?: string },
): Promise<boolean> {
  const url = new URL(`${LS_API_BASE}/orders`);
  url.searchParams.set('filter[store_id]', storeId);

  // If we have an email, filter by it (LS supports this filter)
  if (match.email) {
    url.searchParams.set('filter[user_email]', match.email);
  }

  let cursor: string | null = null;

  // Paginate through results
  do {
    const pageUrl = new URL(url.toString());
    if (cursor) pageUrl.searchParams.set('page[after]', cursor);

    console.log('[LS] Fetching:', pageUrl.toString());

    const res = await fetch(pageUrl.toString(), {
      headers: headers(),
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      console.error('[LS] Failed to fetch orders:', res.status, await res.text());
      return false;
    }

    const json = await res.json();
    const orders = json.data ?? [];

    console.log('[LS] Page returned', orders.length, 'orders');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const order of orders as any[]) {
      const attrs = order.attributes;

      // Must be a paid order for the Blueprint product
      if (attrs.status !== 'paid') continue;
      if (attrs.first_order_item?.product_id !== productId) continue;

      // If matching by email, any paid Blueprint order is a hit
      if (match.email) {
        return true;
      }

      // If matching by clerkId, check meta.custom_data
      if (match.clerkId) {
        const customClerkId =
          attrs.meta?.custom_data?.clerk_id ??
          attrs.first_order_item?.meta?.custom_data?.clerk_id;

        if (customClerkId === match.clerkId) {
          return true;
        }
      }
    }

    // Next page?
    cursor = json.meta?.page?.lastCursor ?? null;
    if (!json.meta?.page?.hasMore) cursor = null;
  } while (cursor);

  return false;
}

/**
 * Build an overlay-compatible checkout URL for the Boxing Blueprint.
 * Embeds clerk_id and email into LS custom_data so the webhook / order
 * can link back to the Clerk user.
 */
export function buildCheckoutUrl(clerkId: string, email?: string | null): string {
  const base =
    'https://coachjoshofficial.lemonsqueezy.com/checkout/buy/f613fa5e-edb4-4297-97ae-bcc5203e4ec7';

  const url = new URL(base);
  url.searchParams.set('checkout[custom][clerk_id]', clerkId);
  if (email) {
    url.searchParams.set('checkout[email]', email);
  }
  url.searchParams.set('embed', '1'); // overlay mode

  return url.toString();
}

/* ------------------------------------------------------------------ */
/*  Webhook signature verification                                     */
/* ------------------------------------------------------------------ */

export async function verifyWebhookSignature(
  rawBody: string,
  signature: string,
): Promise<boolean> {
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    console.error('[LS] Missing LEMON_SQUEEZY_WEBHOOK_SECRET');
    return false;
  }

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );

  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(rawBody));
  const digest = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return digest === signature;
}
