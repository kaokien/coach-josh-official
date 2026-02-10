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
  const [clicks, setClicks] = useState<{ x: number; y: number; id: number }[]>([]);

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

  // Global Click Effect (Shockwave)
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Add a click effect
      const id = Date.now();
      setClicks(prev => [...prev.slice(-4), { x: e.pageX, y: e.pageY, id }]); // Keep last 5

      // Cleanup after animation
      setTimeout(() => {
        setClicks(prev => prev.filter(c => c.id !== id));
      }, 600);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <InteractiveContext.Provider value={{ playImpact, playComplete, isMuted, toggleMute }}>
      {children}

      {/* Floating Mute Toggle */}
      <button
        onClick={toggleMute}
        className="fixed bottom-6 left-6 z-50 p-3 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 no-print"
        style={{
          background: isMuted ? '#1A1A1A' : '#D1495B',
          color: '#F2E8DC',
          border: '2px solid #1A1A1A'
        }}
        aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* Visual Click Effects Layer */}
      <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
        <AnimatePresence>
          {clicks.map(click => (
            <motion.div
              key={click.id}
              initial={{ opacity: 0.8, scale: 0 }}
              animate={{ opacity: 0, scale: 2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                position: 'absolute',
                left: click.x - 25, // Center the 50px circle
                top: click.y - 25,
                width: 50,
                height: 50,
                borderRadius: '50%',
                border: '2px solid #D1495B', // Red accent
                backgroundColor: 'rgba(209, 73, 91, 0.1)',
              }}
            />
          ))}
        </AnimatePresence>
      </div>
    </InteractiveContext.Provider>
  );
}
