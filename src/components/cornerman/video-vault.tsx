'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Play, Clock, ChevronLeft, ChevronRight,
  Zap, Trophy, Target, Download, Heart, Sparkles, CheckCircle2, RotateCcw
} from 'lucide-react';
import VideoPlayer from '@/components/video-player';
import DiscordWidget from '@/components/cornerman/discord-widget';
import { VIDEOS, Video } from '@/lib/cornerman-data';

// Helper to reconstruct categories with icons
const CATEGORIES = [
  { id: 'all', name: 'All Videos', icon: <Zap size={16} />, count: VIDEOS.length },
  { id: 'favorites', name: 'My Favorites', icon: <Heart size={16} />, count: 0 }, // Will be updated dynamically
  { id: 'technique', name: 'Technique', icon: <Target size={16} />, count: VIDEOS.filter(v => v.category === 'technique').length },
  { id: 'fight-iq', name: 'Fight IQ', icon: <Trophy size={16} />, count: VIDEOS.filter(v => v.category === 'fight-iq').length },
  { id: 'drills', name: 'Drills', icon: <Clock size={16} />, count: VIDEOS.filter(v => v.category === 'drills').length },
  { id: 'conditioning', name: 'Conditioning', icon: <Zap size={16} />, count: VIDEOS.filter(v => v.category === 'conditioning').length },
];

interface WatchProgress {
  [videoId: string]: {
    currentTime: number;
    completed: boolean;
  };
}

export default function VideoVault() {
  const [activeVideo, setActiveVideo] = useState<Video | null>(VIDEOS[0]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [watchProgress, setWatchProgress] = useState<WatchProgress>({});

  // Load favorites and watch progress from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('videoFavorites');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
    const savedProgress = localStorage.getItem('videoWatchProgress');
    if (savedProgress) {
      setWatchProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Toggle favorite
  const toggleFavorite = (videoId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = new Set(favorites);
    if (updated.has(videoId)) {
      updated.delete(videoId);
    } else {
      updated.add(videoId);
    }
    setFavorites(updated);
    localStorage.setItem('videoFavorites', JSON.stringify([...updated]));
  };

  // Save watch progress
  const saveProgress = (videoId: string, currentTime: number, completed: boolean = false) => {
    const updated = {
      ...watchProgress,
      [videoId]: { currentTime, completed }
    };
    setWatchProgress(updated);
    localStorage.setItem('videoWatchProgress', JSON.stringify(updated));
  };

  // Get progress percentage for a video
  const getProgressPercentage = (video: Video): number => {
    const progress = watchProgress[video.id];
    if (!progress) return 0;
    if (progress.completed) return 100;
    return Math.min((progress.currentTime / video.durationSeconds) * 100, 100);
  };

  // Filter videos
  const getFilteredVideos = () => {
    if (activeCategory === 'favorites') {
      return VIDEOS.filter(v => favorites.has(v.id));
    }
    if (activeCategory === 'all') {
      return VIDEOS;
    }
    return VIDEOS.filter(v => v.category === activeCategory);
  };

  const filteredVideos = getFilteredVideos();

  // Update categories with dynamic favorite count
  const categoriesWithCounts = CATEGORIES.map(cat => {
    if (cat.id === 'favorites') {
      return { ...cat, count: favorites.size };
    }
    return cat;
  });

  // Play next video
  const playNextVideo = () => {
    if (!activeVideo) return;
    const currentIndex = filteredVideos.findIndex(v => v.id === activeVideo.id);
    const nextIndex = (currentIndex + 1) % filteredVideos.length;
    setActiveVideo(filteredVideos[nextIndex]);
  };

  // Handle video end
  const handleVideoEnd = () => {
    if (activeVideo) {
      saveProgress(activeVideo.id, activeVideo.durationSeconds, true);
    }
    playNextVideo();
  };

  // Format time for display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex min-h-[calc(100vh-130px)]">
      {/* Sidebar - Desktop */}
      <aside className={`
        ${sidebarOpen ? 'w-64' : 'w-16'} 
        border-r-2 border-[#1A1A1A] bg-white transition-all duration-300 overflow-hidden flex-shrink-0
        hidden md:block
      `}>
        <div className="p-4">
          {sidebarOpen ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-lg uppercase">Categories</h3>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 hover:bg-[#F2E8DC] transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
              </div>

              <nav className="space-y-1">
                {categoriesWithCounts.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2 font-body text-sm text-left transition-all
                      ${activeCategory === cat.id
                        ? 'bg-[#4A6FA5]/10 border-l-4 border-[#4A6FA5] text-[#4A6FA5] font-bold'
                        : 'hover:bg-[#F2E8DC] border-l-4 border-transparent'
                      }
                      ${cat.id === 'favorites' ? 'text-[#D1495B]' : ''}
                    `}
                  >
                    {cat.id === 'favorites' ? <Heart size={16} className={favorites.size > 0 ? 'fill-[#D1495B]' : ''} /> : cat.icon}
                    <span className="flex-1">{cat.name}</span>
                    <span className="text-xs opacity-50">{cat.count}</span>
                  </button>
                ))}
              </nav>

              {/* Quick Links */}
              <div className="mt-8 pt-6 border-t border-[#1A1A1A]/10">
                <h4 className="font-display text-xs uppercase text-[#1A1A1A]/50 mb-3">Resources</h4>
                <div className="space-y-1">
                  <a
                    href="/assets/blueprint.pdf"
                    download
                    className="flex items-center gap-2 px-3 py-2 font-body text-sm hover:bg-[#F2E8DC] transition-colors"
                  >
                    <Download size={16} />
                    Blueprint PDF
                  </a>
                </div>
              </div>

              {/* Discord Widget */}
              <div className="px-4 pb-6 mt-6">
                <DiscordWidget />
              </div>
            </>
          ) : (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-[#F2E8DC] transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Video Player */}
        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {activeVideo ? (
            <motion.div
              key={activeVideo.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Video Player Component */}
              <div className="border-4 border-[#1A1A1A] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
                {activeVideo.isNew && (
                  <div className="absolute top-4 left-4 z-10 bg-[#D1495B] text-white text-xs font-bold px-3 py-1 border border-black flex items-center gap-1">
                    <Sparkles size={12} />
                    NEW
                  </div>
                )}
                <VideoPlayer
                  playbackId={activeVideo.muxPlaybackId}
                  title={activeVideo.title}
                  onEnded={handleVideoEnd}
                />
              </div>

              {/* Video Info */}
              <div className="mt-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-block border border-[#4A6FA5] bg-[#4A6FA5]/10 px-2 py-1 text-xs font-bold uppercase tracking-widest text-[#4A6FA5]">
                        {activeVideo.category}
                      </span>
                      {watchProgress[activeVideo.id]?.completed && (
                        <span className="inline-flex items-center gap-1 text-green-600 text-xs font-bold uppercase">
                          <CheckCircle2 size={14} />
                          Watched
                        </span>
                      )}
                    </div>
                    <h1 className="font-display text-2xl md:text-4xl uppercase text-[#1A1A1A]">
                      {activeVideo.title}
                    </h1>
                    <p className="font-body text-sm text-[#1A1A1A]/60 mt-1 flex items-center gap-2">
                      <Clock size={14} />
                      {activeVideo.duration}
                      {watchProgress[activeVideo.id] && !watchProgress[activeVideo.id].completed && (
                        <span className="flex items-center gap-1 text-[#4A6FA5]">
                          <RotateCcw size={12} />
                          Continue from {formatTime(watchProgress[activeVideo.id].currentTime)}
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(activeVideo.id)}
                    className={`flex items-center gap-2 px-4 py-2 border-2 border-[#1A1A1A] font-display uppercase text-sm transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] ${favorites.has(activeVideo.id)
                      ? 'bg-[#D1495B] text-white'
                      : 'bg-white text-[#1A1A1A] hover:bg-[#F2E8DC]'
                      }`}
                  >
                    <Heart size={16} className={favorites.has(activeVideo.id) ? 'fill-white' : ''} />
                    {favorites.has(activeVideo.id) ? 'Favorited' : 'Add to Favorites'}
                  </button>
                </div>

                <div className="mt-6 border-l-4 border-[#4A6FA5] bg-white p-6">
                  <h3 className="font-display text-xl uppercase text-[#1A1A1A] mb-2">About This Lesson</h3>
                  <p className="font-body text-[#1A1A1A]/80 leading-relaxed">
                    {activeVideo.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-64 border-4 border-dashed border-[#1A1A1A]/20">
              <p className="font-body text-[#1A1A1A]/50">Select a video to start watching</p>
            </div>
          )}
        </div>

        {/* Playlist */}
        <div className="w-full lg:w-96 border-t-2 lg:border-t-0 lg:border-l-2 border-[#1A1A1A] bg-white flex flex-col">
          <div className="p-4 border-b-2 border-[#1A1A1A] bg-[#F2E8DC] flex-shrink-0">
            <h3 className="font-display text-lg uppercase">
              {activeCategory === 'all' ? 'All Videos' : categoriesWithCounts.find(c => c.id === activeCategory)?.name}
            </h3>
            <p className="font-body text-xs text-[#1A1A1A]/60 mt-1">
              {filteredVideos.length} videos
            </p>
          </div>

          {/* Mobile Category Pills */}
          <div className="md:hidden p-4 border-b border-[#1A1A1A]/10 overflow-x-auto flex-shrink-0">
            <div className="flex gap-2">
              {categoriesWithCounts.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    whitespace-nowrap px-3 py-1 font-body text-xs border-2 transition-colors flex items-center gap-1
                    ${activeCategory === cat.id
                      ? 'bg-[#4A6FA5] border-[#1A1A1A] text-white'
                      : 'bg-white border-[#1A1A1A]/20 hover:border-[#1A1A1A]'
                    }
                    ${cat.id === 'favorites' ? 'text-[#D1495B]' : ''}
                  `}
                >
                  {cat.id === 'favorites' && <Heart size={12} className={favorites.size > 0 ? 'fill-current' : ''} />}
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Video List */}
          <div className="flex-1 overflow-y-auto">
            {filteredVideos.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-[#1A1A1A]/40">
                <Heart size={32} className="mb-2" />
                <p className="font-body text-sm">Your favorites collection is empty</p>
                <p className="font-body text-xs">Heart a video to save it here</p>
              </div>
            ) : (
              filteredVideos.map((video, index) => {
                const progress = getProgressPercentage(video);
                const isCompleted = watchProgress[video.id]?.completed;

                return (
                  <motion.div
                    key={video.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveVideo(video)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveVideo(video); }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`
                      w-full flex items-start gap-4 p-4 text-left border-b border-[#1A1A1A]/10 transition-all relative cursor-pointer
                      ${activeVideo?.id === video.id
                        ? 'bg-[#4A6FA5]/10 border-l-4 border-l-[#4A6FA5]'
                        : 'hover:bg-[#F2E8DC] border-l-4 border-l-transparent'
                      }
                    `}
                  >
                    {/* NEW badge */}
                    {video.isNew && (
                      <div className="absolute -top-1 -left-1 bg-[#D1495B] text-white text-[8px] font-bold px-1.5 py-0.5 z-10">
                        NEW
                      </div>
                    )}

                    {/* Thumbnail */}
                    <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden border border-[#1A1A1A] bg-[#1A1A1A]">
                      <img
                        src={`https://image.mux.com/${video.muxPlaybackId}/thumbnail.jpg?width=200&time=5`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                        <Play size={20} className="text-white" />
                      </div>
                      <div className="absolute bottom-1 right-1 bg-[#1A1A1A]/90 px-1 text-[10px] text-white font-body">
                        {video.duration}
                      </div>

                      {/* Progress bar overlay */}
                      {progress > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
                          <div
                            className={`h-full ${isCompleted ? 'bg-green-500' : 'bg-[#4A6FA5]'}`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className={`
                        font-body text-sm font-bold line-clamp-2
                        ${activeVideo?.id === video.id ? 'text-[#4A6FA5]' : 'text-[#1A1A1A]'}
                      `}>
                        {video.title}
                      </h4>
                      <div className="mt-1 flex items-center gap-2 text-xs text-[#1A1A1A]/50 font-body capitalize">
                        {video.category.replace('-', ' ')}
                        {isCompleted && (
                          <CheckCircle2 size={12} className="text-green-600" />
                        )}
                      </div>
                    </div>

                    {/* Favorite button - using div to avoid nested button hydration error */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={(e) => toggleFavorite(video.id, e)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleFavorite(video.id); }}
                      className="flex-shrink-0 p-1 hover:bg-[#F2E8DC] rounded transition-colors cursor-pointer"
                    >
                      <Heart
                        size={16}
                        className={favorites.has(video.id) ? 'fill-[#D1495B] text-[#D1495B]' : 'text-[#1A1A1A]/30'}
                      />
                    </div>

                    {activeVideo?.id === video.id && (
                      <div className="flex-shrink-0 self-center">
                        <div className="h-2 w-2 rounded-full bg-[#4A6FA5] animate-pulse" />
                      </div>
                    )}
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
