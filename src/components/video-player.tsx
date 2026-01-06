'use client';

import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Loader2 } from 'lucide-react';

interface VideoPlayerProps {
  playbackId: string;
  title?: string;
  autoPlay?: boolean;
  muted?: boolean;
  poster?: string;
  onEnded?: () => void;
  onProgress?: (progress: number) => void;
  className?: string;
}

export default function VideoPlayer({
  playbackId,
  title = 'Video',
  autoPlay = false,
  muted = false,
  poster,
  onEnded,
  onProgress,
  className = '',
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const src = `https://stream.mux.com/${playbackId}.m3u8`;
  const thumbnailUrl = poster || `https://image.mux.com/${playbackId}/thumbnail.jpg?time=0`;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari - native HLS support
      video.src = src;
    } else if (Hls.isSupported()) {
      // Other browsers - use hls.js
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      
      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        if (autoPlay) {
          video.play().catch(() => setIsPlaying(false));
        }
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              setError('Failed to load video');
              hls.destroy();
              break;
          }
        }
      });
    } else {
      setError('Your browser does not support video playback');
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [playbackId, src, autoPlay]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => setIsLoading(false);
    const handleCanPlay = () => setIsLoading(false);
    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.duration) {
        onProgress?.((video.currentTime / video.duration) * 100);
      }
    };
    
    const handleDurationChange = () => setDuration(video.duration);
    
    const handleProgress = () => {
      if (video.buffered.length > 0) {
        setBuffered((video.buffered.end(video.buffered.length - 1) / video.duration) * 100);
      }
    };

    const handleVolumeChange = () => {
      setVolume(video.volume);
      setIsMuted(video.muted);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('volumechange', handleVolumeChange);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [onEnded, onProgress]);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      if (isPlaying) {
        timeout = setTimeout(() => setShowControls(false), 3000);
      }
    };

    const container = containerRef.current;
    container?.addEventListener('mousemove', handleMouseMove);
    container?.addEventListener('touchstart', handleMouseMove);

    return () => {
      clearTimeout(timeout);
      container?.removeEventListener('mousemove', handleMouseMove);
      container?.removeEventListener('touchstart', handleMouseMove);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    isPlaying ? video.pause() : video.play();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) video.muted = !video.muted;
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    isFullscreen ? document.exitFullscreen() : container.requestFullscreen();
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const progress = progressRef.current;
    if (!video || !progress) return;
    const rect = progress.getBoundingClientRect();
    video.currentTime = ((e.clientX - rect.left) / rect.width) * video.duration;
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (error) {
    return (
      <div className={`relative aspect-video bg-[#1A1A1A] flex items-center justify-center ${className}`}>
        <div className="text-center text-white p-8">
          <p className="font-display text-xl mb-4">Unable to Load Video</p>
          <p className="font-body text-sm text-white/60">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`relative aspect-video bg-[#1A1A1A] overflow-hidden group ${className}`}
      onDoubleClick={toggleFullscreen}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        playsInline
        poster={thumbnailUrl}
        onClick={togglePlay}
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1A1A1A]/50">
          <Loader2 className="w-12 h-12 text-[#4A6FA5] animate-spin" />
        </div>
      )}

      {!isPlaying && !isLoading && (
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={togglePlay}
        >
          <div className="h-20 w-20 rounded-full border-4 border-white bg-[#4A6FA5] flex items-center justify-center shadow-[0_0_30px_rgba(74,111,165,0.5)] hover:scale-110 transition-transform">
            <Play size={36} fill="white" className="text-white ml-1" />
          </div>
        </div>
      )}

      <div 
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div 
          ref={progressRef}
          className="relative h-1 mx-4 mb-2 cursor-pointer group/progress"
          onClick={handleProgressClick}
        >
          <div className="absolute inset-y-0 left-0 bg-white/30" style={{ width: `${buffered}%` }} />
          <div className="absolute inset-y-0 left-0 bg-[#4A6FA5]" style={{ width: `${(currentTime / duration) * 100}%` }} />
        </div>

        <div className="flex items-center justify-between px-4 pb-4">
          <div className="flex items-center gap-4">
            <button onClick={togglePlay} className="text-white hover:text-[#4A6FA5] transition-colors">
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button onClick={toggleMute} className="text-white hover:text-[#4A6FA5] transition-colors">
              {isMuted || volume === 0 ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
            <div className="font-body text-sm text-white">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <button onClick={toggleFullscreen} className="text-white hover:text-[#4A6FA5] transition-colors">
            {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
}
