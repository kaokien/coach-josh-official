'use client';

import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import mux from 'mux-embed';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Settings, Loader2 } from 'lucide-react';

interface VideoPlayerProps {
  playbackId: string;
  title?: string;
  autoPlay?: boolean;
  muted?: boolean;
  poster?: string;
  onEnded?: () => void;
  onProgress?: (progress: number) => void;
  className?: string;
  userId?: string;
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
  userId,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // State
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

  // Mux stream URL
  const src = `https://stream.mux.com/${playbackId}.m3u8`;
  
  // Mux thumbnail URL (optional)
  const thumbnailUrl = poster || `https://image.mux.com/${playbackId}/thumbnail.jpg?time=0`;

  // Mux environment key
  const MUX_ENV_KEY = process.env.NEXT_PUBLIC_MUX_ENV_KEY || '9i5tt0g1ct4nmgm85acadeil7';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const initTime = mux.utils.now();

    // Initialize HLS
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari - native HLS support
      video.src = src;
      
      // Initialize Mux Data for Safari
      mux.monitor(video, {
        debug: false,
        data: {
          env_key: MUX_ENV_KEY,
          player_name: 'Coach Josh Player',
          player_init_time: initTime,
          video_id: playbackId,
          video_title: title,
          viewer_user_id: userId || 'anonymous',
        },
      });
    } else if (Hls.isSupported()) {
      // Other browsers - use hls.js
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
      });
      
      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(video);

      // Initialize Mux Data with HLS.js
      mux.monitor(video, {
        debug: false,
        hlsjs: hls,
        Hls: Hls,
        data: {
          env_key: MUX_ENV_KEY,
          player_name: 'Coach Josh Player',
          player_init_time: initTime,
          video_id: playbackId,
          video_title: title,
          viewer_user_id: userId || 'anonymous',
        },
      });

      // HLS event handlers
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        if (autoPlay) {
          video.play().catch(() => {
            // Autoplay was prevented
            setIsPlaying(false);
          });
        }
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.error('Network error');
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.error('Media error');
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

    // Cleanup
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [playbackId, src, title, userId, autoPlay, MUX_ENV_KEY]);

  // Video event handlers
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
        const progress = (video.currentTime / video.duration) * 100;
        onProgress?.(progress);
      }
    };
    
    const handleDurationChange = () => {
      setDuration(video.duration);
    };
    
    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const bufferedPercent = (bufferedEnd / video.duration) * 100;
        setBuffered(bufferedPercent);
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

  // Fullscreen handling
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Hide controls after inactivity
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

  // Controls
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const progress = progressRef.current;
    if (!video || !progress) return;

    const rect = progress.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    video.muted = newVolume === 0;
  };

  // Format time
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Error state
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
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        playsInline
        poster={thumbnailUrl}
        onClick={togglePlay}
      />

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1A1A1A]/50">
          <Loader2 className="w-12 h-12 text-[#4A6FA5] animate-spin" />
        </div>
      )}

      {/* Play Button Overlay (when paused) */}
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

      {/* Controls Overlay */}
      <div 
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress Bar */}
        <div 
          ref={progressRef}
          className="relative h-1 mx-4 mb-2 cursor-pointer group/progress"
          onClick={handleProgressClick}
        >
          {/* Buffered */}
          <div 
            className="absolute inset-y-0 left-0 bg-white/30"
            style={{ width: `${buffered}%` }}
          />
          {/* Progress */}
          <div 
            className="absolute inset-y-0 left-0 bg-[#4A6FA5]"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
          {/* Hover indicator */}
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/progress:opacity-100 transition-opacity" />
          {/* Scrubber */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover/progress:opacity-100 transition-opacity"
            style={{ left: `calc(${(currentTime / duration) * 100}% - 6px)` }}
          />
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between px-4 pb-4">
          <div className="flex items-center gap-4">
            {/* Play/Pause */}
            <button 
              onClick={togglePlay}
              className="text-white hover:text-[#4A6FA5] transition-colors"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>

            {/* Volume */}
            <div className="flex items-center gap-2 group/volume">
              <button 
                onClick={toggleMute}
                className="text-white hover:text-[#4A6FA5] transition-colors"
              >
                {isMuted || volume === 0 ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-0 group-hover/volume:w-20 transition-all duration-200 accent-[#4A6FA5] cursor-pointer"
              />
            </div>

            {/* Time */}
            <div className="font-body text-sm text-white">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Title (optional) */}
            {title && (
              <span className="hidden md:block font-body text-sm text-white/60 max-w-xs truncate">
                {title}
              </span>
            )}

            {/* Fullscreen */}
            <button 
              onClick={toggleFullscreen}
              className="text-white hover:text-[#4A6FA5] transition-colors"
            >
              {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Title Overlay (top) */}
      {title && (
        <div 
          className={`absolute inset-x-0 top-0 bg-gradient-to-b from-[#1A1A1A]/80 to-transparent p-4 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h3 className="font-display text-lg text-white uppercase truncate">{title}</h3>
        </div>
      )}
    </div>
  );
}
