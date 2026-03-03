'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, FastForward, Rewind, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  url: string;
  title: string;
  duration?: string;
  onEnded?: () => void;
}

export default function AudioPlayer({ url, title, duration, onEnded }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTimeDisplay, setCurrentTimeDisplay] = useState(0);
  const [durationDisplay, setDurationDisplay] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevUrlRef = useRef(url);

  // Handle URL changes via effect that only runs when url changes
  useEffect(() => {
    if (prevUrlRef.current !== url) {
      prevUrlRef.current = url;
      setIsPlaying(false);
      setProgress(0);
      setCurrentTimeDisplay(0);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.load();
      }
    }
  }, [url]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration;
    setProgress((current / total) * 100);
    setCurrentTimeDisplay(current);
    setDurationDisplay(total);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const seekTime = (Number(e.target.value) / 100) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
    setProgress(Number(e.target.value));
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-[#0F172A] p-6 border-2 border-[#0F172A] text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display text-xl uppercase tracking-wider">{title}</h3>
          <p className="font-body text-sm text-white/60 uppercase tracking-widest">Audio Guided Workout</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs uppercase font-bold text-red-500">Live Session</span>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => {
          setIsPlaying(false);
          onEnded?.();
        }}
      />

      {/* Progress Bar */}
      <div className="mb-4">
        <input
          type="range"
          min="0"
          max="100"
          value={progress || 0}
          onChange={handleSeek}
          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
        />
        <div className="flex justify-between text-xs font-mono mt-1 text-white/50">
          <span>{formatTime(currentTimeDisplay)}</span>
          <span>{duration || formatTime(durationDisplay)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              if (audioRef.current) audioRef.current.currentTime -= 10;
            }}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <Rewind size={20} />
          </button>

          <button
            onClick={togglePlay}
            className="w-12 h-12 bg-white text-[#0F172A] flex items-center justify-center rounded-full hover:bg-[#2563EB] hover:text-white transition-colors"
          >
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
          </button>

          <button
            onClick={() => {
              if (audioRef.current) audioRef.current.currentTime += 10;
            }}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <FastForward size={20} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={toggleMute} className="text-white/80 hover:text-white">
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <div className="w-24 hidden sm:block">
            {/* Volume slider could go here */}
            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white w-full" style={{ width: isMuted ? '0%' : '100%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
