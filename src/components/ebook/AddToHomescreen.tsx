'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share, Smartphone } from 'lucide-react';

const STORAGE_KEY = 'blueprint-a2hs-dismissed';
const AUTO_DISMISS_MS = 10000; // 10 seconds

type Platform = 'ios' | 'android' | null;

function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return null;
  const ua = navigator.userAgent;

  // Already in standalone (installed as PWA) — don't show
  if (window.matchMedia('(display-mode: standalone)').matches) return null;
  // @ts-ignore — iOS Safari specific
  if ((navigator as any).standalone === true) return null;

  if (/iPad|iPhone|iPod/.test(ua)) return 'ios';
  if (/Android/.test(ua)) return 'android';
  return null;
}

export default function AddToHomescreen() {
  const [visible, setVisible] = useState(false);
  const [platform, setPlatform] = useState<Platform>(null);

  useEffect(() => {
    // Don't show if already dismissed
    if (localStorage.getItem(STORAGE_KEY)) return;

    const detected = detectPlatform();
    if (!detected) return;

    // Small delay so the page loads first
    const showTimer = setTimeout(() => {
      setPlatform(detected);
      setVisible(true);
    }, 2000);

    return () => clearTimeout(showTimer);
  }, []);

  // Auto-dismiss timer
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      handleDismiss();
    }, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [visible]);

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  return (
    <AnimatePresence>
      {visible && platform && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 z-50 no-print"
        >
          <div
            className="relative overflow-hidden"
            style={{
              background: '#0F172A',
              border: '2px solid #DC2626',
              boxShadow: '0 -4px 20px rgba(0,0,0,0.3), 4px 4px 0 #DC2626',
            }}
          >
            {/* Auto-dismiss progress bar */}
            <motion.div
              className="absolute top-0 left-0 h-[3px]"
              style={{ background: '#CCFF00' }}
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: AUTO_DISMISS_MS / 1000, ease: 'linear' }}
            />

            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 p-2 text-white/50 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Dismiss"
            >
              <X size={18} />
            </button>

            <div className="p-4 pr-12 flex items-start gap-3">
              <div
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg"
                style={{ background: '#DC2626' }}
              >
                <Smartphone size={20} className="text-white" />
              </div>

              <div>
                <div className="font-display text-sm uppercase tracking-wider text-white mb-1">
                  Add to Home Screen
                </div>
                <p className="font-body text-xs text-white/70 leading-relaxed">
                  {platform === 'ios' ? (
                    <>
                      Tap <Share size={12} className="inline-block mx-0.5 text-[#CCFF00]" /> then{' '}
                      <span className="text-[#CCFF00] font-bold">&quot;Add to Home Screen&quot;</span> for
                      a full-screen app experience.
                    </>
                  ) : (
                    <>
                      Tap the <span className="text-[#CCFF00] font-bold">⋮ menu</span> then{' '}
                      <span className="text-[#CCFF00] font-bold">&quot;Add to Home Screen&quot;</span> for
                      a full-screen app experience.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
