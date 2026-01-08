'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Play, Clock, Loader2 } from 'lucide-react';

// --- CONFIGURATION ---
// No API Key needed for this method!
const CHANNEL_ID = 'UCe-lK7UElFXOtMfUIvbHVAg'; 

interface Video {
  id: string;
  title: string;
  description: string;
  date: string;
  thumbnail: string;
  link: string;
}

// --- FALLBACK DATA ---
// If the automatic fetch fails, these videos will show instead.
// Update these manually every few weeks as a backup.
const FALLBACK_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'How to Control the Heavy Bag',
    description: 'How to dominate orthodox fighters using the outside foot angle.',
    date: 'Recent Upload',
    thumbnail: 'https://i.ytimg.com/vi/Eao9YqviGc0/hqdefault.jpg?sqp=-oaymwE9CNACELwBSFryq4qpAy8IARUAAAAAGAElAADIQj0AgKJDeAHwAQH4Af4JgALQBYoCDAgAEAEYUiBiKGUwDw==&rs=AOn4CLAlNB5rvVan_XZTyS8TRSznURpSOA', // Replace ID
    link: 'https://www.youtube.com/watch?v=Eao9YqviGc0'
  },
  {
    id: '2',
    title: 'Heavy Bag Rhythm Drills',
    description: 'Stop pushing the bag. Learn to snap your punches.',
    date: 'Recent Upload',
    thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_2/maxresdefault.jpg',
    link: 'https://www.youtube.com/@Coachjoshofficial/videos'
  },
  {
    id: '3',
    title: 'The Dempsey Roll EXPLAINED',
    description: 'Mastering the figure-8 motion for maximum power.',
    date: 'Recent Upload',
    thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_3/maxresdefault.jpg',
    link: 'https://www.youtube.com/@Coachjoshofficial/videos'
  },
  {
    id: '4',
    title: 'Conditioning for 12 Rounds',
    description: 'The exact roadwork and interval routine used by pros.',
    date: 'Recent Upload',
    thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_4/maxresdefault.jpg',
    link: 'https://www.youtube.com/@Coachjoshofficial/videos'
  }
];

export default function RecentUploads() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Use rss2json to convert YouTube XML feed to JSON (No API Key needed)
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
        
        const data = await response.json();

        if (data.status !== 'ok') throw new Error('Failed to fetch RSS');

        const formattedVideos = data.items.slice(0, 4).map((item: any) => {
          // Extract Video ID from link (guid is usually "yt:video:ID")
          const videoId = item.guid.split(':')[2];
          
          return {
            id: videoId,
            title: item.title,
            description: 'Watch the full breakdown on YouTube.', // RSS doesn't give good descriptions, so we use a generic one
            date: new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            // Construct high-res thumbnail manually because RSS gives low-res
            thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            link: item.link
          };
        });

        setVideos(formattedVideos);
      } catch (err) {
        console.warn('Could not fetch recent videos, using fallback data.', err);
        setVideos(FALLBACK_VIDEOS); // Fallback to manual list if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <section className="w-full bg-[#F2E8DC] py-16 px-6 md:px-12 border-t-2 border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 border border-[#1A1A1A] bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#1A1A1A]">
               <Play size={12} className="text-[#4A6FA5]" /> Fresh Content
            </div>
            <h2 className="font-display text-4xl uppercase text-[#1A1A1A]">
              Latest Uploads
            </h2>
          </div>
          <a 
            href={`https://youtube.com/channel/${CHANNEL_ID}`}
            target="_blank"
            rel="noreferrer"
            className="font-body text-sm font-bold text-[#4A6FA5] hover:text-[#1A1A1A] transition-colors flex items-center gap-2"
          >
            View Channel <ExternalLink size={14} />
          </a>
        </div>

        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <Loader2 className="animate-spin text-[#1A1A1A]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
              <a 
                key={video.id} 
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col bg-white border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden border-b-2 border-[#1A1A1A] bg-gray-200">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    // Add error handler to fallback to a generic image if maxres doesn't exist
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 bg-[#4A6FA5]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white border-2 border-[#1A1A1A] p-3 rounded-full">
                      <Play size={24} className="text-[#1A1A1A] fill-[#1A1A1A]" />
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-display text-lg leading-tight text-[#1A1A1A] line-clamp-2 mb-2 group-hover:text-[#4A6FA5] transition-colors">
                      {video.title}
                    </h3>
                    <p className="font-body text-xs text-[#1A1A1A]/60 line-clamp-2 mb-4">
                      {video.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1A1A1A]/40 font-body pt-3 border-t border-[#1A1A1A]/10">
                    <Clock size={12} />
                    <span>{video.date}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
