/**
 * Integration tests for POST /api/subscribe
 *
 * Tests the ConvertKit email subscription endpoint.
 * Uses MSW to intercept calls to the ConvertKit API.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { server, http, HttpResponse } from '../setup.integration';
import { createMockRequest, parseJsonResponse } from '../helpers';

import { POST } from '../../../app/api/subscribe/route';

const CONVERTKIT_URL = 'https://api.convertkit.com/v3/forms/12345/subscribe';

describe('POST /api/subscribe', () => {
  beforeEach(() => {
    server.resetHandlers();
  });

  it('returns 400 when email is missing', async () => {
    const request = createMockRequest('POST', '/api/subscribe', {
      body: {},
    });

    const { status, data } = await parseJsonResponse(await POST(request));

    expect(status).toBe(400);
    expect(data).toEqual({ error: 'Email is required' });
  });

  it('returns 400 when email is empty string', async () => {
    const request = createMockRequest('POST', '/api/subscribe', {
      body: { email: '' },
    });

    const { status, data } = await parseJsonResponse(await POST(request));

    expect(status).toBe(400);
    expect(data).toEqual({ error: 'Email is required' });
  });

  it('returns success when ConvertKit accepts the subscription', async () => {
    server.use(
      http.post(CONVERTKIT_URL, () => {
        return HttpResponse.json({
          subscription: { id: 1, subscriber: { email: 'test@example.com' } },
        });
      }),
    );

    const request = createMockRequest('POST', '/api/subscribe', {
      body: { email: 'test@example.com' },
    });

    const { status, data } = await parseJsonResponse(await POST(request));

    expect(status).toBe(200);
    expect(data).toEqual({ success: true });
  });

  it('returns 500 when ConvertKit API returns an error', async () => {
    server.use(
      http.post(CONVERTKIT_URL, () => {
        return HttpResponse.json(
          { error: { message: 'Invalid API key' } },
          { status: 401 },
        );
      }),
    );

    const request = createMockRequest('POST', '/api/subscribe', {
      body: { email: 'test@example.com' },
    });

    const { status, data } = await parseJsonResponse(await POST(request));

    expect(status).toBe(500);
    expect(data).toEqual({ error: 'Internal Server Error' });
  });

  it('returns 500 when ConvertKit API is unreachable', async () => {
    server.use(
      http.post(CONVERTKIT_URL, () => {
        return HttpResponse.error();
      }),
    );

    const request = createMockRequest('POST', '/api/subscribe', {
      body: { email: 'test@example.com' },
    });

    const { status, data } = await parseJsonResponse(await POST(request));

    expect(status).toBe(500);
    expect(data).toEqual({ error: 'Internal Server Error' });
  });

  it('forwards the correct payload to ConvertKit', async () => {
    let capturedBody: Record<string, unknown> | null = null;

    server.use(
      http.post(CONVERTKIT_URL, async ({ request }: { request: Request }) => {
        capturedBody = (await request.json()) as Record<string, unknown>;
        return HttpResponse.json({ subscription: { id: 1 } });
      }),
    );

    const request = createMockRequest('POST', '/api/subscribe', {
      body: { email: 'user@example.com' },
    });

    await POST(request);

    expect(capturedBody).toEqual({
      api_key: 'test-convertkit-key',
      email: 'user@example.com',
    });
  });
});
