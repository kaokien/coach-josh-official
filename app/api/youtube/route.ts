import { NextResponse } from 'next/server'

export const runtime = 'edge'
export const revalidate = 3600 // Cache for 1 hour

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

    // Step 3: Get latest 6 videos
    const videosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=6&key=${API_KEY}`
    )

    const videosData = await videosRes.json()

    // Step 4: Get video statistics
    const videoIds = videosData.items
      ?.map((item: any) => item.snippet.resourceId.videoId)
      .join(',')

    const statsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${API_KEY}`
    )

    const statsData = await statsRes.json()

    // Step 5: Combine and format
    const videos = videosData.items?.map((item: any, index: number) => {
      const videoId = item.snippet.resourceId.videoId
      const stats = statsData.items?.[index]

      return {
        id: videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.maxres?.url || 
                   item.snippet.thumbnails.high?.url || 
                   item.snippet.thumbnails.medium.url,
        publishedAt: item.snippet.publishedAt,
        duration: stats?.contentDetails?.duration || 'PT0S',
        viewCount: stats?.statistics?.viewCount || '0',
      }
    }) || []

    return NextResponse.json({ videos }, {
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
