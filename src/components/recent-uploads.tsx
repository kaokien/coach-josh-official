// app/api/youtube/route.ts
import { NextResponse } from 'next/server'

export const runtime = 'edge'
export const revalidate = 3600 // Cache for 1 hour

// Add this interface
interface VideoWithDuration {
  id: string
  title: string
  description: string
  date: string
  thumbnail: string
  link: string
  durationInSeconds: number
}

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
  const CHANNEL_HANDLE = process.env.YOUTUBE_CHANNEL_HANDLE || 'Coachjoshofficial'

  if (!API_KEY) {
    return NextResponse.json(
      { error: 'YouTube API not configured' },
      { status: 500 }
    )
  }

  try {
    // Step 1: Search for channel by handle
    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${CHANNEL_HANDLE}&type=channel&maxResults=1&key=${API_KEY}`
    )

    if (!searchRes.ok) {
      throw new Error('Failed to find channel')
    }

    const searchData = await searchRes.json()
    const channelId = searchData.items?.[0]?.id?.channelId

    if (!channelId) {
      throw new Error('Channel not found')
    }

    // Step 2: Get channel's uploads playlist
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${API_KEY}`
    )

    const channelData = await channelRes.json()
    const uploadsPlaylistId = 
      channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads

    if (!uploadsPlaylistId) {
      throw new Error('No uploads found')
    }

    // Step 3: Get more videos (to filter shorts and still have 4)
    const videosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=15&key=${API_KEY}`
    )

    const videosData = await videosRes.json()

    // Step 4: Get video statistics and duration
    const videoIds = videosData.items
      ?.map((item: any) => item.snippet.resourceId.videoId)
      .join(',')

    const statsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${API_KEY}`
    )

    const statsData = await statsRes.json()

    // Step 5: Map videos with duration in seconds (with explicit type)
    const allVideos: VideoWithDuration[] = videosData.items?.map((item: any, index: number) => {
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
        thumbnail: item.snippet.thumbnails.maxres?.url || 
                   item.snippet.thumbnails.high?.url || 
                   item.snippet.thumbnails.medium.url,
        link: `https://www.youtube.com/watch?v=${videoId}`,
        durationInSeconds,
      }
    }) || []

    // Step 6: Filter out Shorts (≤60 seconds) and take first 4
    const fullVideos = allVideos
      .filter((v: VideoWithDuration) => v.durationInSeconds > 60)
      .slice(0, 4)
      .map(({ durationInSeconds, ...rest }) => rest)

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
