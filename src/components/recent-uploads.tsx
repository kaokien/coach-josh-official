'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Play, Clock, Loader2 } from 'lucide-react';

// --- CONFIGURATION ---
const CHANNEL_ID = 'UCe-lK7UElFXOtMfUIvbHVAg'; // Your ID (saved for later)

interface Video {
  id: string;
  title: string;
  description: string;
  date: string;
  thumbnail: string;
  link: string;
}

// 🥊 TEST DATA: Matchroom Boxing Examples
// This simulates what the API would return so you can see the design.
const TEST_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'ANTHONY JOSHUA vs FRANCIS NGANNOU | Full Fight Highlights',
    description: 'Watch the explosive highlights from the heavyweight showdown in Riyadh.',
    date: 'Mar 9, 2024',
    thumbnail: 'https://img.youtube.com/vi/h2e8jGjYgW8/maxresdefault.jpg',
    link: 'https://www.youtube.com/watch?v=h2e8jGjYgW8'
  },
  {
    id: '2',
    title: 'Eddie Hearn: "Fury vs Usyk is the BIGGEST fight in history"',
    description: 'Matchroom promoter Eddie Hearn breaks down the undisputed clash.',
    date: 'Feb 14, 2024',
    thumbnail: 'https://img.youtube.com/vi/_b8R3tQXQ_Q/maxresdefault.jpg',
    link: 'https://www.youtube.com/watch?v=_b8R3tQXQ_Q'
  },
  {
    id: '3',
    title: 'FULL FIGHT! Canelo Alvarez vs Dmitry Bivol',
    description: 'Relive the masterclass performance from Dmitry Bivol against the P4P king.',
    date: 'May 7, 2022',
    thumbnail: 'https://img.youtube.com/vi/8Q1_tJ1_1Xk/maxresdefault.jpg',
    link: 'https://www.youtube.com/watch?v=8Q1_tJ1_1Xk'
  },
  {
    id: '4',
    title: 'Katie Taylor vs Chantelle Cameron II: Face Off',
    description: 'The tension builds as the undisputed champions meet again in Dublin.',
    date: 'Nov 24, 2023',
    thumbnail: 'https://img.youtube.com/vi/qX1_1Xk_1Xk/maxresdefault.jpg',
    link: 'https://www.youtube.com/watch?v=qX1_1Xk_1Xk'
  }
];

export default function RecentUploads() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // SIMULATE API CALL
    // In a real app, this would be your fetch(). 
    // For now, we set it directly to show the UI.
    setTimeout(() => {
      setVideos(TEST_VIDEOS);
      setLoading(false);
    }, 800); // Small delay to show the loading spinner effect
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
            href={`https://youtube.com/channel/${CHANNEL_ID}`}
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
                    onError={(e) => {
                        // Fallback in case YouTube blocks image
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
