/**
 * Shared test fixtures / data factories for integration tests.
 */

// ── Clerk Auth Fixtures ─────────────────────────────────────────────────

export function createMockClerkAuth(overrides: Record<string, unknown> = {}) {
  return {
    userId: 'user_test_123',
    sessionId: 'sess_test_456',
    ...overrides,
  };
}

export function createMockUser(overrides: Record<string, unknown> = {}) {
  return {
    id: 'user_test_123',
    emailAddresses: [
      {
        emailAddress: 'test@example.com',
        id: 'email_1',
      },
    ],
    firstName: 'Test',
    lastName: 'User',
    ...overrides,
  };
}

// ── Chat Fixtures ───────────────────────────────────────────────────────

export function createChatMessages() {
  return [
    { role: 'user', content: 'How do I throw a jab?' },
    { role: 'assistant', content: 'Keep your guard up and extend from the shoulder.' },
    { role: 'user', content: 'What about footwork?' },
  ];
}

export function createChatMessagesWithParts() {
  return [
    {
      role: 'user',
      content: '',
      parts: [
        { type: 'step-start' },
        { type: 'text', text: 'How do I throw a cross?' },
      ],
    },
  ];
}

// ── Lemon Squeezy Fixtures ─────────────────────────────────────────────

export function createLemonSqueezyOrder(overrides: Record<string, unknown> = {}) {
  return {
    id: 'order_123',
    type: 'orders',
    attributes: {
      status: 'paid',
      user_email: 'test@example.com',
      first_order_item: {
        product_id: 794615,
        meta: {
          custom_data: {
            clerk_id: 'user_test_123',
          },
        },
      },
      meta: {
        custom_data: {
          clerk_id: 'user_test_123',
        },
      },
      ...overrides,
    },
  };
}

export function createLemonSqueezyWebhookPayload(
  eventName = 'order_created',
  overrides: Record<string, unknown> = {},
) {
  return {
    meta: {
      event_name: eventName,
      custom_data: {
        clerk_id: 'user_test_123',
      },
    },
    data: {
      id: 'order_456',
      attributes: {
        status: 'paid',
        user_email: 'test@example.com',
        ...overrides,
      },
    },
  };
}

export function createLemonSqueezyOrdersResponse(orders: unknown[] = []) {
  return {
    data: orders,
    meta: {
      page: {
        lastCursor: null,
        hasMore: false,
      },
    },
  };
}

// ── YouTube API Fixtures ────────────────────────────────────────────────

export function createYouTubeSearchResponse(channelId = 'UC_test_channel') {
  return {
    items: [
      {
        id: { channelId },
      },
    ],
  };
}

export function createYouTubeChannelResponse(uploadsPlaylistId = 'UU_test_uploads') {
  return {
    items: [
      {
        contentDetails: {
          relatedPlaylists: {
            uploads: uploadsPlaylistId,
          },
        },
      },
    ],
  };
}

export function createYouTubePlaylistResponse(
  videos: Array<{ id: string; title: string; publishedAt: string }> = [],
) {
  const defaultVideos = videos.length
    ? videos
    : [
      { id: 'vid1', title: 'Boxing Basics', publishedAt: '2024-01-15T10:00:00Z' },
      { id: 'vid2', title: 'Jab Tutorial', publishedAt: '2024-01-10T10:00:00Z' },
      { id: 'vid3', title: 'Quick Tip', publishedAt: '2024-01-05T10:00:00Z' },
      { id: 'vid4', title: 'Footwork Drill', publishedAt: '2024-01-01T10:00:00Z' },
      { id: 'vid5', title: 'Combo Guide', publishedAt: '2023-12-28T10:00:00Z' },
    ];

  return {
    items: defaultVideos.map((v) => ({
      snippet: {
        resourceId: { videoId: v.id },
        title: v.title,
        description: `Description for ${v.title}`,
        publishedAt: v.publishedAt,
        thumbnails: {
          medium: { url: `https://img.youtube.com/vi/${v.id}/mqdefault.jpg` },
          high: { url: `https://img.youtube.com/vi/${v.id}/hqdefault.jpg` },
        },
      },
    })),
  };
}

export function createYouTubeStatsResponse(
  videosDurations: Array<{ id: string; duration: string }> = [],
) {
  const defaults = videosDurations.length
    ? videosDurations
    : [
      { id: 'vid1', duration: 'PT10M30S' }, // 630s — included
      { id: 'vid2', duration: 'PT5M15S' },  // 315s — included
      { id: 'vid3', duration: 'PT45S' },     // 45s  — filtered out (< 60s)
      { id: 'vid4', duration: 'PT8M0S' },    // 480s — included
      { id: 'vid5', duration: 'PT12M0S' },   // 720s — included
    ];

  return {
    items: defaults.map((v) => ({
      id: v.id,
      contentDetails: {
        duration: v.duration,
      },
    })),
  };
}
