'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Play, Clock, Loader2 } from 'lucide-react';

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
    // Fetch real YouTube data
    fetch('/api/youtube')
      .then(res => res.json())
      .then(data => {
        if (data.videos) {
          setVideos(data.videos);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load videos:', err);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <section className="w-full bg-[#F2E8DC] py-16 px-6 md:px-12 border-t-2 border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
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
            href="https://www.youtube.com/@Coachjoshofficial"
            target="_blank"
            rel="noreferrer"
            className="font-body text-sm font-bold text-[#4A6FA5] hover:text-[#1A1A1A] transition-colors flex items-center gap-2"
          >
            View Channel <ExternalLink size={14} />
          </a>
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <Loader2 className="animate-spin text-[#1A1A1A]" size={32} />
          </div>
        ) : error ? (
          <div className="text-center py-12 border-2 border-[#1A1A1A] bg-white">
            <p className="font-body text-[#1A1A1A]/60">
              Unable to load videos.{' '}
              <a 
                href="https://www.youtube.com/@Coachjoshofficial" 
                target="_blank" 
                rel="noreferrer"
                className="text-[#4A6FA5] underline"
              >
                Visit channel →
              </a>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
              <a 
                key={video.id} 
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col bg-white border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden border-b-2 border-[#1A1A1A] bg-gray-200 pointer-events-none">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    unoptimized
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/1A1A1A/FFF?text=Video';
                    }}
                  />
                  <div className="absolute inset-0 bg-[#4A6FA5]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white border-2 border-[#1A1A1A] p-3 rounded-full">
                      <Play size={24} className="text-[#1A1A1A] fill-[#1A1A1A]" />
                    </div>
                  </div>
                </div>

                {/* Text Info */}
                <div className="p-4 flex flex-col flex-1 justify-between pointer-events-none">
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
