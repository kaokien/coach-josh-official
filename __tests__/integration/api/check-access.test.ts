/**
 * Integration tests for GET /api/check-access
 *
 * Tests the Blueprint access-check endpoint that queries
 * Clerk auth and Lemon Squeezy order status.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { parseJsonResponse } from '../helpers';

// ── Mocks ───────────────────────────────────────────────────────────────

const mockAuth = vi.fn();
const mockCurrentUser = vi.fn();
vi.mock('@clerk/nextjs/server', () => ({
  auth: () => mockAuth(),
  currentUser: () => mockCurrentUser(),
}));

const mockHasBluprintAccess = vi.fn();
vi.mock('@/lib/lemonsqueezy', () => ({
  hasBluprintAccess: (...args: unknown[]) => mockHasBluprintAccess(...args),
}));

import { GET } from '../../../app/api/check-access/route';

describe('GET /api/check-access', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns { hasAccess: false, reason: "not_authenticated" } when not signed in', async () => {
    mockAuth.mockResolvedValue({ userId: null });

    const { status, data } = await parseJsonResponse(await GET());

    expect(status).toBe(200);
    expect(data).toEqual({ hasAccess: false, reason: 'not_authenticated' });
  });

  it('returns { hasAccess: true } when user has a valid purchase', async () => {
    mockAuth.mockResolvedValue({ userId: 'user_test_123' });
    mockCurrentUser.mockResolvedValue({
      emailAddresses: [{ emailAddress: 'test@example.com' }],
    });
    mockHasBluprintAccess.mockResolvedValue(true);

    const { status, data } = await parseJsonResponse(await GET());

    expect(status).toBe(200);
    expect(data).toEqual({ hasAccess: true });
    expect(mockHasBluprintAccess).toHaveBeenCalledWith('user_test_123', 'test@example.com');
  });

  it('returns { hasAccess: false } when user has no purchase', async () => {
    mockAuth.mockResolvedValue({ userId: 'user_test_123' });
    mockCurrentUser.mockResolvedValue({
      emailAddresses: [{ emailAddress: 'test@example.com' }],
    });
    mockHasBluprintAccess.mockResolvedValue(false);

    const { status, data } = await parseJsonResponse(await GET());

    expect(status).toBe(200);
    expect(data).toEqual({ hasAccess: false });
  });

  it('returns 500 with reason "error" when an exception occurs', async () => {
    mockAuth.mockResolvedValue({ userId: 'user_test_123' });
    mockCurrentUser.mockRejectedValue(new Error('Clerk API down'));

    const { status, data } = await parseJsonResponse(await GET());

    expect(status).toBe(500);
    expect(data).toEqual({ hasAccess: false, reason: 'error' });
  });

  it('handles user with no email addresses', async () => {
    mockAuth.mockResolvedValue({ userId: 'user_test_123' });
    mockCurrentUser.mockResolvedValue({
      emailAddresses: [],
    });
    mockHasBluprintAccess.mockResolvedValue(false);

    const { status, data } = await parseJsonResponse(await GET());

    expect(status).toBe(200);
    expect(data).toEqual({ hasAccess: false });
    // Should call with undefined email
    expect(mockHasBluprintAccess).toHaveBeenCalledWith('user_test_123', undefined);
  });
});
