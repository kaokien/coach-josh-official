/**
 * Integration test setup
 *
 * Configures MSW server, sets required environment variables,
 * and provides global lifecycle hooks for integration tests.
 */
import { afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';

// ── MSW server shared across all integration tests ──────────────────────
export const server = setupServer();

beforeAll(() => {
  // Set test environment variables
  process.env.YOUTUBE_API_KEY = 'test-youtube-api-key';
  process.env.YOUTUBE_CHANNEL_HANDLE = 'TestChannel';
  process.env.CONVERTKIT_API_KEY = 'test-convertkit-key';
  process.env.CONVERTKIT_FORM_ID = '12345';
  process.env.LEMON_SQUEEZY_API_KEY = 'test-ls-api-key';
  process.env.LEMON_SQUEEZY_STORE_ID = '99999';
  process.env.NEXT_PUBLIC_LEMON_SQUEEZY_PRODUCT_ID = '794615';
  process.env.LEMON_SQUEEZY_WEBHOOK_SECRET = 'test-webhook-secret';
  process.env.OPENAI_API_KEY = 'test-openai-key';

  server.listen({ onUnhandledRequest: 'warn' });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

export { http, HttpResponse };
