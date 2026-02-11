/**
 * Integration tests for lib/lemonsqueezy.ts
 *
 * Tests the Lemon Squeezy helper functions:
 * - hasBluprintAccess: email-based and clerk_id-based purchase lookup
 * - verifyWebhookSignature: HMAC-SHA256 signature verification
 * - buildCheckoutUrl: checkout URL construction
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { server, http, HttpResponse } from '../setup.integration';
import { generateHmacSignature } from '../helpers';
import {
  createLemonSqueezyOrder,
  createLemonSqueezyOrdersResponse,
} from '../fixtures';

import {
  hasBluprintAccess,
  verifyWebhookSignature,
  buildCheckoutUrl,
} from '../../../src/lib/lemonsqueezy';

const LS_ORDERS_URL = 'https://api.lemonsqueezy.com/v1/orders';

describe('lib/lemonsqueezy', () => {
  beforeEach(() => {
    server.resetHandlers();
  });

  // ── hasBluprintAccess ─────────────────────────────────────────────────

  describe('hasBluprintAccess', () => {
    it('returns true when email matches a paid order', async () => {
      const order = createLemonSqueezyOrder();
      server.use(
        http.get(LS_ORDERS_URL, () =>
          HttpResponse.json(createLemonSqueezyOrdersResponse([order])),
        ),
      );

      const result = await hasBluprintAccess('user_test_123', 'test@example.com');
      expect(result).toBe(true);
    });

    it('returns true when clerk_id matches via custom_data fallback', async () => {
      // First call (email filter) returns no orders
      // Second call (all orders) returns matching clerk_id
      let callCount = 0;
      const order = createLemonSqueezyOrder();

      server.use(
        http.get(LS_ORDERS_URL, ({ request }: { request: Request }) => {
          const url = new URL(request.url);
          const emailFilter = url.searchParams.get('filter[user_email]');

          if (emailFilter) {
            // Email-based lookup: no match
            return HttpResponse.json(createLemonSqueezyOrdersResponse([]));
          }
          // Clerk ID-based lookup: match
          callCount++;
          return HttpResponse.json(createLemonSqueezyOrdersResponse([order]));
        }),
      );

      const result = await hasBluprintAccess('user_test_123', 'nomatch@example.com');
      expect(result).toBe(true);
    });

    it('returns false when no matching orders exist', async () => {
      server.use(
        http.get(LS_ORDERS_URL, () =>
          HttpResponse.json(createLemonSqueezyOrdersResponse([])),
        ),
      );

      const result = await hasBluprintAccess('user_unknown', 'nobody@example.com');
      expect(result).toBe(false);
    });

    it('returns false when the LS API returns an error', async () => {
      server.use(
        http.get(LS_ORDERS_URL, () =>
          HttpResponse.json({ error: 'Unauthorized' }, { status: 401 }),
        ),
      );

      const result = await hasBluprintAccess('user_test_123', 'test@example.com');
      expect(result).toBe(false);
    });

    it('skips unpaid orders', async () => {
      const unpaidOrder = createLemonSqueezyOrder({ status: 'pending' });
      server.use(
        http.get(LS_ORDERS_URL, () =>
          HttpResponse.json(createLemonSqueezyOrdersResponse([unpaidOrder])),
        ),
      );

      const result = await hasBluprintAccess('user_test_123', 'test@example.com');
      expect(result).toBe(false);
    });

    it('returns false without email when clerk_id does not match', async () => {
      const order = createLemonSqueezyOrder();
      server.use(
        http.get(LS_ORDERS_URL, () =>
          HttpResponse.json(createLemonSqueezyOrdersResponse([order])),
        ),
      );

      // Different clerk ID
      const result = await hasBluprintAccess('user_different_999');
      expect(result).toBe(false);
    });
  });

  // ── verifyWebhookSignature ────────────────────────────────────────────

  describe('verifyWebhookSignature', () => {
    it('returns true for a valid HMAC-SHA256 signature', async () => {
      const body = '{"test": "data"}';
      const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!;
      const validSig = await generateHmacSignature(body, secret);

      const result = await verifyWebhookSignature(body, validSig);
      expect(result).toBe(true);
    });

    it('returns false for an invalid signature', async () => {
      const body = '{"test": "data"}';
      const result = await verifyWebhookSignature(body, 'invalid-sig');
      expect(result).toBe(false);
    });

    it('returns false when webhook secret is missing', async () => {
      const originalSecret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
      delete process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

      const result = await verifyWebhookSignature('body', 'sig');
      expect(result).toBe(false);

      process.env.LEMON_SQUEEZY_WEBHOOK_SECRET = originalSecret;
    });
  });

  // ── buildCheckoutUrl ──────────────────────────────────────────────────

  describe('buildCheckoutUrl', () => {
    it('includes clerk_id and embed=1 params', () => {
      const url = buildCheckoutUrl('user_abc123');
      const parsed = new URL(url);

      expect(parsed.searchParams.get('checkout[custom][clerk_id]')).toBe('user_abc123');
      expect(parsed.searchParams.get('embed')).toBe('1');
    });

    it('includes email when provided', () => {
      const url = buildCheckoutUrl('user_abc123', 'test@example.com');
      const parsed = new URL(url);

      expect(parsed.searchParams.get('checkout[email]')).toBe('test@example.com');
    });

    it('omits email param when email is null', () => {
      const url = buildCheckoutUrl('user_abc123', null);
      const parsed = new URL(url);

      expect(parsed.searchParams.has('checkout[email]')).toBe(false);
    });

    it('points to the correct Lemon Squeezy checkout base URL', () => {
      const url = buildCheckoutUrl('user_abc123');
      expect(url).toContain('coachjoshofficial.lemonsqueezy.com/checkout');
    });
  });
});
