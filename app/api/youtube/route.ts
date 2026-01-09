// app/api/youtube/route.ts
import { NextResponse } from 'next/server'

export const runtime = 'edge'
export const revalidate = 3600 // Cache for 1 hour

// Helper: Convert ISO 8601 duration to seconds
function parseDuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return 0
  
  const hours = parseInt(match[1] || '0')
  const minutes = parseInt(match[2] || '0')
  const seconds = parseInt(match[3] || '0')
  
  return hours * 3600 + minutes * 60 + seconds
}

export async function GET() {
  const API_KEY = process.env.YOUTUBE_API_KEY
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID

  if (!API_KEY || !CHANNEL_ID) {
    return NextResponse.json(
      { error: 'YouTube API not configured' },
      { status: 500 }
    )
  }

  try {
    // Step 1: Get channel's uploads playlist
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`
    )

    if (!channelRes.ok) {
      throw new Error('Failed to fetch channel')
    }

    const channelData = await channelRes.json()
    const uploadsPlaylistId = 
      channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads

    if (!uploadsPlaylistId) {
      throw new Error('No uploads found')
    }

    // Step 2: Get more videos than we need (to account for filtered Shorts)
    // Fetch 15 videos, filter out Shorts, keep top 4 full videos
    const videosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=15&key=${API_KEY}`
    )

    if (!videosRes.ok) {
      throw new Error('Failed to fetch videos')
    }

    const videosData = await videosRes.json()

    // Step 3: Get video durations
    const videoIds = videosData.items
      ?.map((item: any) => item.snippet.resourceId.videoId)
      .join(',')

    const statsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${API_KEY}`
    )

    const statsData = await statsRes.json()

    // Step 4: Filter out Shorts (videos under 61 seconds) and format
    const allVideos = videosData.items?.map((item: any, index: number) => {
      const videoId = item.snippet.resourceId.videoId
      const stats = statsData.items?.[index]
      const duration = stats?.contentDetails?.duration || 'PT0S'
      const durationInSeconds = parseDuration(duration)

      const publishedDate = new Date(item.snippet.publishedAt)

      return {
        id: videoId,
        title: item.snippet.title,
        description: item.snippet.description || '',
        date: publishedDate.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        thumbnail: item.snippet.thumbnails.maxresdefault?.url || 
                   item.snippet.thumbnails.high?.url || 
                   item.snippet.thumbnails.medium.url,
        link: `https://www.youtube.com/watch?v=${videoId}`,
        durationInSeconds, // Include for filtering
      }
    }) || []

    // Filter out Shorts (< 61 seconds) and take first 4
    const fullVideos = allVideos
      .filter(video => video.durationInSeconds > 60)
      .slice(0, 4)
      .map(({ durationInSeconds, ...video }) => video) // Remove duration from response

    return NextResponse.json({ videos: fullVideos }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error: any) {
    console.error('YouTube API error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch videos' },
      { status: 500 }
    )
  }
}
