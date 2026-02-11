/**
 * Integration tests for POST /api/chat
 *
 * Tests the AI chat endpoint that uses OpenAI via the AI SDK,
 * protected by Clerk authentication.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMockRequest } from '../helpers';
import { createChatMessages, createChatMessagesWithParts } from '../fixtures';

// ── Mocks ───────────────────────────────────────────────────────────────

// Mock Clerk auth
const mockAuth = vi.fn();
vi.mock('@clerk/nextjs/server', () => ({
  auth: () => mockAuth(),
}));

// Mock the AI SDK streamText
const mockStreamText = vi.fn();
vi.mock('ai', () => ({
  streamText: (...args: unknown[]) => mockStreamText(...args),
}));

// Mock the OpenAI provider
vi.mock('@ai-sdk/openai', () => ({
  openai: vi.fn((model: string) => ({ modelId: model })),
}));

// Import route handler AFTER mocks are set up
import { POST } from '../../../app/api/chat/route';

describe('POST /api/chat', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 401 when user is not authenticated', async () => {
    mockAuth.mockResolvedValue({ userId: null });

    const request = createMockRequest('POST', '/api/chat', {
      body: { messages: createChatMessages() },
    });

    const response = await POST(request);

    expect(response.status).toBe(401);
    const text = await response.text();
    expect(text).toBe('Unauthorized');
  });

  it('calls streamText and returns streaming response when authenticated', async () => {
    mockAuth.mockResolvedValue({ userId: 'user_test_123' });

    const mockResponse = new Response('streamed data', { status: 200 });
    mockStreamText.mockReturnValue({
      toUIMessageStreamResponse: () => mockResponse,
    });

    const messages = createChatMessages();
    const request = createMockRequest('POST', '/api/chat', {
      body: { messages },
    });

    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(mockStreamText).toHaveBeenCalledOnce();

    // Verify system prompt was included
    const call = mockStreamText.mock.calls[0][0];
    expect(call.messages[0].role).toBe('system');
    expect(call.messages[0].content).toContain('Coach Josh');
  });

  it('extracts text from message parts when content is empty', async () => {
    mockAuth.mockResolvedValue({ userId: 'user_test_123' });

    const mockResponse = new Response('ok', { status: 200 });
    mockStreamText.mockReturnValue({
      toUIMessageStreamResponse: () => mockResponse,
    });

    const messages = createChatMessagesWithParts();
    const request = createMockRequest('POST', '/api/chat', {
      body: { messages },
    });

    await POST(request);

    expect(mockStreamText).toHaveBeenCalledOnce();
    const call = mockStreamText.mock.calls[0][0];
    // The user message should have extracted text from parts
    const userMsg = call.messages.find(
      (m: { role: string }) => m.role === 'user',
    );
    expect(userMsg?.content).toBe('How do I throw a cross?');
  });

  it('limits messages to last 5', async () => {
    mockAuth.mockResolvedValue({ userId: 'user_test_123' });

    const mockResponse = new Response('ok', { status: 200 });
    mockStreamText.mockReturnValue({
      toUIMessageStreamResponse: () => mockResponse,
    });

    // Create 8 messages (more than the 5-message limit)
    const messages = Array.from({ length: 8 }, (_, i) => ({
      role: i % 2 === 0 ? 'user' : 'assistant',
      content: `Message ${i}`,
    }));

    const request = createMockRequest('POST', '/api/chat', {
      body: { messages },
    });

    await POST(request);

    const call = mockStreamText.mock.calls[0][0];
    // System message + last 5 user messages = 6 total
    expect(call.messages).toHaveLength(6);
  });

  it('handles empty messages array gracefully', async () => {
    mockAuth.mockResolvedValue({ userId: 'user_test_123' });

    const mockResponse = new Response('ok', { status: 200 });
    mockStreamText.mockReturnValue({
      toUIMessageStreamResponse: () => mockResponse,
    });

    const request = createMockRequest('POST', '/api/chat', {
      body: { messages: [] },
    });

    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(mockStreamText).toHaveBeenCalledOnce();
  });

  it('uses gpt-4o-mini model with temperature 0.7', async () => {
    mockAuth.mockResolvedValue({ userId: 'user_test_123' });

    const mockResponse = new Response('ok', { status: 200 });
    mockStreamText.mockReturnValue({
      toUIMessageStreamResponse: () => mockResponse,
    });

    const request = createMockRequest('POST', '/api/chat', {
      body: { messages: createChatMessages() },
    });

    await POST(request);

    const call = mockStreamText.mock.calls[0][0];
    expect(call.model).toEqual({ modelId: 'gpt-4o-mini' });
    expect(call.temperature).toBe(0.7);
  });
});
