/**
 * Integration tests for POST /api/webhooks/lemonsqueezy
 *
 * Tests the Lemon Squeezy webhook handler including
 * signature verification, event processing, and error handling.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMockNextRequest, parseJsonResponse, generateHmacSignature } from '../helpers';
import { createLemonSqueezyWebhookPayload } from '../fixtures';

// ── Mocks ───────────────────────────────────────────────────────────────

const mockVerifyWebhookSignature = vi.fn();
vi.mock('@/lib/lemonsqueezy', () => ({
  verifyWebhookSignature: (...args: unknown[]) => mockVerifyWebhookSignature(...args),
}));

import { POST } from '../../../app/api/webhooks/lemonsqueezy/route';

describe('POST /api/webhooks/lemonsqueezy', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 401 when signature is missing', async () => {
    mockVerifyWebhookSignature.mockResolvedValue(false);

    const payload = createLemonSqueezyWebhookPayload();
    const body = JSON.stringify(payload);
    const request = createMockNextRequest('POST', '/api/webhooks/lemonsqueezy', {
      body,
    });

    const { status, data } = await parseJsonResponse(await POST(request));

    expect(status).toBe(401);
    expect(data).toEqual({ error: 'Invalid signature' });
  });

  it('returns 401 when signature is invalid', async () => {
    mockVerifyWebhookSignature.mockResolvedValue(false);

    const payload = createLemonSqueezyWebhookPayload();
    const body = JSON.stringify(payload);
    const request = createMockNextRequest('POST', '/api/webhooks/lemonsqueezy', {
      body,
      headers: { 'x-signature': 'invalid-signature' },
    });

    const { status, data } = await parseJsonResponse(await POST(request));

    expect(status).toBe(401);
    expect(data).toEqual({ error: 'Invalid signature' });
  });

  it('processes order_created event with valid signature', async () => {
    mockVerifyWebhookSignature.mockResolvedValue(true);
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => { });

    const payload = createLemonSqueezyWebhookPayload('order_created');
    const body = JSON.stringify(payload);
    const request = createMockNextRequest('POST', '/api/webhooks/lemonsqueezy', {
      body,
      headers: { 'x-signature': 'valid-sig' },
    });

    const { status, data } = await parseJsonResponse(await POST(request));

    expect(status).toBe(200);
    expect(data).toEqual({ received: true });

    // Verify it logged the order
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('[LS Webhook] Received: order_created'),
    );

    consoleSpy.mockRestore();
  });

  it('handles unknown event types gracefully', async () => {
    mockVerifyWebhookSignature.mockResolvedValue(true);
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => { });

    const payload = createLemonSqueezyWebhookPayload('subscription_updated');
    const body = JSON.stringify(payload);
    const request = createMockNextRequest('POST', '/api/webhooks/lemonsqueezy', {
      body,
      headers: { 'x-signature': 'valid-sig' },
    });

    const { status, data } = await parseJsonResponse(await POST(request));

    expect(status).toBe(200);
    expect(data).toEqual({ received: true });

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Unhandled event: subscription_updated'),
    );

    consoleSpy.mockRestore();
  });

  it('returns 500 when body is malformed JSON', async () => {
    mockVerifyWebhookSignature.mockResolvedValue(true);
    vi.spyOn(console, 'error').mockImplementation(() => { });

    const request = createMockNextRequest('POST', '/api/webhooks/lemonsqueezy', {
      body: 'not valid json {{{',
      headers: { 'x-signature': 'valid-sig' },
    });

    const { status, data } = await parseJsonResponse(await POST(request));

    expect(status).toBe(500);
    expect(data).toEqual({ error: 'Webhook error' });
  });

  it('passes raw body and signature to verifyWebhookSignature', async () => {
    mockVerifyWebhookSignature.mockResolvedValue(true);

    const payload = createLemonSqueezyWebhookPayload();
    const body = JSON.stringify(payload);
    const sig = 'test-signature-abc';

    const request = createMockNextRequest('POST', '/api/webhooks/lemonsqueezy', {
      body,
      headers: { 'x-signature': sig },
    });

    await POST(request);

    expect(mockVerifyWebhookSignature).toHaveBeenCalledWith(body, sig);
  });
});
