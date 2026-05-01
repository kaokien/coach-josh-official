'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface InteractiveContextType {
  playImpact: () => void;
  playComplete: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

// --- Context (Default checks allow safe removal) ---
const InteractiveContext = createContext<InteractiveContextType>({
  playImpact: () => { },
  playComplete: () => { },
  isMuted: false,
  toggleMute: () => { },
});

export const useInteractive = () => useContext(InteractiveContext);

// --- Component ---
export function InteractiveFX({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);

  // Audio Refs
  const audioImpact = useRef<HTMLAudioElement | null>(null);
  const audioBell = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio
  useEffect(() => {
    // Only on client
    audioImpact.current = new Audio('/sounds/punch.mp3');
    audioBell.current = new Audio('/sounds/bell.mp3');

    // Preload
    audioImpact.current.load();
    audioBell.current.load();
  }, []);

  const playImpact = useCallback(() => {
    if (isMuted || !audioImpact.current) return;
    audioImpact.current.currentTime = 0;
    audioImpact.current.volume = 0.6; // Not too loud
    audioImpact.current.play().catch(() => { });
  }, [isMuted]);

  const playComplete = useCallback(() => {
    if (isMuted || !audioBell.current) return;
    audioBell.current.currentTime = 0;
    audioBell.current.volume = 0.5;
    audioBell.current.play().catch(() => { });
  }, [isMuted]);

  const toggleMute = () => setIsMuted(prev => !prev);

  // Auto-hide mute button: show briefly on scroll-up, hide after idle
  const [showMute, setShowMute] = useState(false);
  const lastScrollYRef = useRef(0);
  const muteTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollYRef.current;

      // Show on scroll-up or near top
      if (delta < -5 || scrollY < 100) {
        setShowMute(true);

        // Auto-hide after 3 seconds of no scrolling
        if (muteTimerRef.current) clearTimeout(muteTimerRef.current);
        muteTimerRef.current = setTimeout(() => {
          setShowMute(false);
        }, 3000);
      } else if (delta > 10) {
        setShowMute(false);
      }

      lastScrollYRef.current = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (muteTimerRef.current) clearTimeout(muteTimerRef.current);
    };
  }, []);

  return (
    <InteractiveContext.Provider value={{ playImpact, playComplete, isMuted, toggleMute }}>
      {children}

      {/* Auto-hiding Mute Toggle */}
      <AnimatePresence>
        {showMute && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.7, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMute}
            className="fixed bottom-6 left-6 z-40 p-3 rounded-full shadow-lg no-print min-h-[44px] min-w-[44px] flex items-center justify-center"
            style={{
              background: isMuted ? '#0F172A' : '#DC2626',
              color: '#FFFFFF',
              border: '2px solid #0F172A'
            }}
            aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </motion.button>
        )}
      </AnimatePresence>
    </InteractiveContext.Provider>
  );
}
