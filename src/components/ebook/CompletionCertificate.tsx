'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2, Award, Trophy } from 'lucide-react';
import { useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface CompletionCertificateProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  completionDate: Date;
}

const rawColors = {
  cream: '#FFFFFF',
  red: '#DC2626',
  ink: '#0F172A',
  vanta: '#050505',
  gold: '#FFD700',
  neon: '#CCFF00',
};

export default function CompletionCertificate({
  isOpen,
  onClose,
  userName = 'Fighter',
  completionDate,
}: CompletionCertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  // Trigger celebration confetti
  const celebrate = useCallback(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#DC2626', '#FFD700', '#CCFF00', '#2563EB'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#DC2626', '#FFD700', '#CCFF00', '#2563EB'],
      });
    }, 250);
  }, []);

  // Handle download as image
  const handleDownload = useCallback(async () => {
    if (!certificateRef.current) return;

    try {
      // Use html2canvas dynamically imported
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(certificateRef.current, {
        backgroundColor: rawColors.vanta,
        scale: 2,
      });

      const link = document.createElement('a');
      link.download = `boxing-blueprint-certificate-${completionDate.toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to download certificate:', error);
      // Fallback: just alert
      alert('Certificate download coming soon! Screenshot this page to save.');
    }
  }, [completionDate]);

  // Handle share (if supported)
  const handleShare = useCallback(async () => {
    const shareText = `I completed Coach Josh's Striking Blueprint! 🥊 ${window.location.href}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Striking Blueprint Certificate',
          text: `I completed Coach Josh's Striking Blueprint! 🥊`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else if (navigator.clipboard?.writeText) {
      // Fallback: copy to clipboard (only works in secure contexts)
      try {
        await navigator.clipboard.writeText(shareText);
        alert('Link copied to clipboard!');
      } catch (error) {
        alert('Share your achievement: ' + shareText);
      }
    } else {
      // Final fallback: show text to copy manually
      alert('Share your achievement: ' + shareText);
    }
  }, []);

  // Trigger confetti when opening
  const onAnimationComplete = useCallback(() => {
    if (isOpen) celebrate();
  }, [isOpen, celebrate]);

  const formattedDate = completionDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.9)' }}
          onClick={onClose}
        >
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            onAnimationComplete={onAnimationComplete}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 p-2 text-white/60 hover:text-white transition-colors"
              aria-label="Close certificate"
            >
              <X size={24} />
            </button>

            {/* Certificate */}
            <div
              ref={certificateRef}
              className="relative overflow-hidden"
              style={{
                background: rawColors.vanta,
                border: `4px solid ${rawColors.gold}`,
                boxShadow: `0 0 60px ${rawColors.gold}40, inset 0 0 60px ${rawColors.gold}10`,
              }}
            >
              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-16 h-16 border-l-4 border-t-4" style={{ borderColor: rawColors.gold }} />
              <div className="absolute top-0 right-0 w-16 h-16 border-r-4 border-t-4" style={{ borderColor: rawColors.gold }} />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-l-4 border-b-4" style={{ borderColor: rawColors.gold }} />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-r-4 border-b-4" style={{ borderColor: rawColors.gold }} />

              <div className="p-8 md:p-12 text-center">
                {/* Trophy icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
                  className="flex justify-center mb-6"
                >
                  <div
                    className="w-20 h-20 flex items-center justify-center rounded-full"
                    style={{ background: `linear-gradient(135deg, ${rawColors.gold}, #FFA500)` }}
                  >
                    <Trophy size={40} color={rawColors.vanta} />
                  </div>
                </motion.div>

                {/* Header */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div
                    className="font-display text-sm tracking-[0.3em] mb-2"
                    style={{ color: rawColors.gold }}
                  >
                    CERTIFICATE OF COMPLETION
                  </div>
                  <div
                    className="font-display text-3xl md:text-4xl mb-1"
                    style={{ color: rawColors.cream }}
                  >
                    BOXING BLUEPRINT
                  </div>
                  <div
                    className="font-body text-xs tracking-wider"
                    style={{ color: rawColors.red }}
                  >
                    BEGINNER FUNDAMENTALS PROGRAM
                  </div>
                </motion.div>

                {/* Divider */}
                <div
                  className="my-6 h-px mx-auto w-3/4"
                  style={{ background: `linear-gradient(to right, transparent, ${rawColors.gold}, transparent)` }}
                />

                {/* Recipient */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div
                    className="font-body text-sm mb-2"
                    style={{ color: rawColors.cream + '80' }}
                  >
                    This certifies that
                  </div>
                  <div
                    className="font-display text-2xl md:text-3xl mb-2"
                    style={{ color: rawColors.neon }}
                  >
                    {userName}
                  </div>
                  <div
                    className="font-body text-sm"
                    style={{ color: rawColors.cream + '80' }}
                  >
                    has successfully completed all 11 chapters of the
                    <br />
                    <span style={{ color: rawColors.cream }}>Striking Blueprint Training Program</span>
                  </div>
                </motion.div>

                {/* Date */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6"
                >
                  <div
                    className="font-body text-xs tracking-wider"
                    style={{ color: rawColors.cream + '60' }}
                  >
                    COMPLETED ON
                  </div>
                  <div
                    className="font-display text-lg"
                    style={{ color: rawColors.gold }}
                  >
                    {formattedDate}
                  </div>
                </motion.div>

                {/* Signature area */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-8 pt-4"
                  style={{ borderTop: `1px solid ${rawColors.gold}40` }}
                >
                  <div
                    className="font-display text-xl italic mb-1"
                    style={{ color: rawColors.cream }}
                  >
                    Coach Josh
                  </div>
                  <div
                    className="font-body text-[10px] tracking-wider"
                    style={{ color: rawColors.red }}
                  >
                    COACHJOSHOFFICIAL
                  </div>
                </motion.div>

                {/* Boxing gloves icon */}
                <div className="mt-6 text-4xl">🥊</div>
              </div>
            </div>

            {/* Action buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-3 mt-4 justify-center"
            >
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 font-display text-sm uppercase tracking-wider transition-all hover:scale-105"
                style={{
                  background: rawColors.gold,
                  color: rawColors.vanta,
                  border: `2px solid ${rawColors.gold}`,
                }}
              >
                <Download size={16} />
                Download
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-6 py-3 font-display text-sm uppercase tracking-wider transition-all hover:scale-105"
                style={{
                  background: 'transparent',
                  color: rawColors.cream,
                  border: `2px solid ${rawColors.cream}`,
                }}
              >
                <Share2 size={16} />
                Share
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
