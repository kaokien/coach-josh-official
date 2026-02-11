/**
 * Integration tests for GET /api/youtube
 *
 * Tests the YouTube video feed endpoint that chains multiple
 * YouTube Data API calls (search → channels → playlistItems → videos).
 * Uses MSW to intercept all YouTube API requests.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { server, http, HttpResponse } from '../setup.integration';
import { parseJsonResponse } from '../helpers';
import {
  createYouTubeSearchResponse,
  createYouTubeChannelResponse,
  createYouTubePlaylistResponse,
  createYouTubeStatsResponse,
} from '../fixtures';

import { GET } from '../../../app/api/youtube/route';

const YT_BASE = 'https://www.googleapis.com/youtube/v3';

function setupYouTubeHandlers(options: {
  searchResponse?: ReturnType<typeof createYouTubeSearchResponse>;
  channelResponse?: ReturnType<typeof createYouTubeChannelResponse>;
  playlistResponse?: ReturnType<typeof createYouTubePlaylistResponse>;
  statsResponse?: ReturnType<typeof createYouTubeStatsResponse>;
} = {}) {
  server.use(
    http.get(`${YT_BASE}/search`, () =>
      HttpResponse.json(options.searchResponse ?? createYouTubeSearchResponse()),
    ),
    http.get(`${YT_BASE}/channels`, () =>
      HttpResponse.json(options.channelResponse ?? createYouTubeChannelResponse()),
    ),
    http.get(`${YT_BASE}/playlistItems`, () =>
      HttpResponse.json(options.playlistResponse ?? createYouTubePlaylistResponse()),
    ),
    http.get(`${YT_BASE}/videos`, () =>
      HttpResponse.json(options.statsResponse ?? createYouTubeStatsResponse()),
    ),
  );
}

describe('GET /api/youtube', () => {
  const originalApiKey = process.env.YOUTUBE_API_KEY;

  beforeEach(() => {
    server.resetHandlers();
    process.env.YOUTUBE_API_KEY = 'test-youtube-api-key';
  });

  afterEach(() => {
    process.env.YOUTUBE_API_KEY = originalApiKey;
  });

  it('returns 500 when YOUTUBE_API_KEY is not set', async () => {
    delete process.env.YOUTUBE_API_KEY;

    const { status, data } = await parseJsonResponse(await GET());

    expect(status).toBe(500);
    expect(data).toEqual({ error: 'YouTube API not configured' });
  });

  it('returns videos from YouTube API on success', async () => {
    setupYouTubeHandlers();

    const { status, data } = await parseJsonResponse(await GET());

    expect(status).toBe(200);
    expect(data.videos).toBeDefined();
    expect(Array.isArray(data.videos)).toBe(true);
  });

  it('filters out videos shorter than 60 seconds', async () => {
    setupYouTubeHandlers();

    const { data } = await parseJsonResponse(await GET());
    const videos = data.videos as Array<{ id: string }>;

    // vid3 is 45s, should be filtered out
    const videoIds = videos.map((v) => v.id);
    expect(videoIds).not.toContain('vid3');
  });

  it('limits results to 4 videos maximum', async () => {
    setupYouTubeHandlers();

    const { data } = await parseJsonResponse(await GET());
    const videos = data.videos as unknown[];

    expect(videos.length).toBeLessThanOrEqual(4);
  });

  it('does not include durationInSeconds in response', async () => {
    setupYouTubeHandlers();

    const { data } = await parseJsonResponse(await GET());
    const videos = data.videos as Array<Record<string, unknown>>;

    for (const video of videos) {
      expect(video).not.toHaveProperty('durationInSeconds');
    }
  });

  it('includes correct video properties in response', async () => {
    setupYouTubeHandlers();

    const { data } = await parseJsonResponse(await GET());
    const videos = data.videos as Array<Record<string, unknown>>;

    if (videos.length > 0) {
      const video = videos[0];
      expect(video).toHaveProperty('id');
      expect(video).toHaveProperty('title');
      expect(video).toHaveProperty('description');
      expect(video).toHaveProperty('date');
      expect(video).toHaveProperty('thumbnail');
      expect(video).toHaveProperty('link');
      expect(video.link).toContain('https://www.youtube.com/watch?v=');
    }
  });

  it('returns 500 when YouTube search API fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => { });

    server.use(
      http.get(`${YT_BASE}/search`, () =>
        HttpResponse.json({ error: 'API quota exceeded' }, { status: 403 }),
      ),
    );

    const { status, data } = await parseJsonResponse(await GET());

    expect(status).toBe(500);
    expect(data.error).toBeDefined();
  });

  it('returns 500 when channel is not found', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => { });

    server.use(
      http.get(`${YT_BASE}/search`, () =>
        HttpResponse.json({ items: [] }),
      ),
    );

    const { status, data } = await parseJsonResponse(await GET());

    expect(status).toBe(500);
    expect(data.error).toBe('Channel not found');
  });

  it('sets Cache-Control headers on successful response', async () => {
    setupYouTubeHandlers();

    const response = await GET();

    expect(response.headers.get('Cache-Control')).toContain('s-maxage=3600');
  });
});
