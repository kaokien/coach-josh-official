'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Play, Clock, Loader2, AlertCircle } from 'lucide-react';

// --- CONFIGURATION ---
const API_KEY = 'AIzaSyDIHxttdN_P4bvJCoOnjtmeSR5IwRKXBAE'; 
// I removed the trailing slash '/' from the ID below:
const CHANNEL_ID = 'UCe-lK7UElFXOtMfUIvbHVAg'; 

interface Video {
  id: string;
  title: string;
  description: string;
  date: string;
  thumbnail: string;
  link: string;
}

export default function RecentUploads() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // 1. Fetch most recent videos from channel
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=4&type=video`
        );
        
        const data = await response.json();

        if (!response.ok) {
          console.error('YouTube API Error:', data);
          throw new Error('Failed to fetch');
        }

        // 2. Format the data
        const formattedVideos = data.items.map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          date: new Date(item.snippet.publishedAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          }),
          thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium.url,
          link: `https://www.youtube.com/watch?v=${item.id.videoId}`
        }));

        setVideos(formattedVideos);
      } catch (err) {
        setError(true);
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
        ) : error ? (
          <div className="flex h-40 items-center justify-center text-[#1A1A1A]/50 font-body text-sm">
            <AlertCircle size={16} className="mr-2" /> Unable to load videos.
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
                <div className="relative aspect-video w-full overflow-hidden border-b-2 border-[#1A1A1A]">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
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
