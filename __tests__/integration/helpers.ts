/**
 * Utility helpers for integration tests.
 */
import { NextRequest } from 'next/server';

/**
 * Build a standard `Request` object for testing API route handlers.
 */
export function createMockRequest(
  method: string,
  url: string,
  options: {
    body?: unknown;
    headers?: Record<string, string>;
  } = {},
): Request {
  const init: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  if (options.body !== undefined) {
    init.body = typeof options.body === 'string' ? options.body : JSON.stringify(options.body);
  }

  return new Request(`http://localhost:3000${url}`, init);
}

/**
 * Build a `NextRequest` object for testing API route handlers that use NextRequest.
 */
export function createMockNextRequest(
  method: string,
  url: string,
  options: {
    body?: string;
    headers?: Record<string, string>;
  } = {},
): NextRequest {
  const init: RequestInit = {
    method,
    headers: {
      ...options.headers,
    },
  };

  if (options.body !== undefined) {
    init.body = options.body;
  }

  return new NextRequest(`http://localhost:3000${url}`, init as any);
}

/**
 * Generate a valid HMAC-SHA256 signature for webhook testing.
 */
export async function generateHmacSignature(
  body: string,
  secret: string,
): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(body));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Parse a NextResponse / Response to JSON.
 */
export async function parseJsonResponse(response: Response): Promise<{
  status: number;
  data: Record<string, unknown>;
}> {
  const data = await response.json();
  return {
    status: response.status,
    data,
  };
}
