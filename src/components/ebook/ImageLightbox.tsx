'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useCallback } from 'react';

interface ImageData {
  id: string;
  title: string;
  description: string;
  imageSrc?: string;
}

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: ImageData[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export default function ImageLightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate
}: ImageLightboxProps) {
  const currentImage = images[currentIndex];

  const handlePrev = useCallback(() => {
    onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
  }, [currentIndex, images.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close lightbox"
          >
            <X size={24} className="text-white" />
          </button>

          {/* Navigation - Previous */}
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-4 z-50 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={32} className="text-white" />
          </button>

          {/* Image container */}
          <motion.div
            key={currentImage.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-[90vw] max-h-[80vh] w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {currentImage.imageSrc ? (
              <div className="relative w-full h-[70vh]">
                <Image
                  src={currentImage.imageSrc}
                  alt={currentImage.title}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              </div>
            ) : (
              <div className="w-full max-w-2xl aspect-video bg-zinc-900 border-2 border-zinc-700 flex flex-col items-center justify-center p-8">
                <p className="text-white/60 font-display text-xl uppercase mb-2">
                  {currentImage.id}: {currentImage.title}
                </p>
                <p className="text-white/40 text-center text-sm max-w-md">
                  {currentImage.description}
                </p>
              </div>
            )}

            {/* Caption */}
            <div className="mt-4 text-center">
              <p className="text-white font-display text-lg uppercase tracking-wide">
                <span className="text-amber-400">{currentImage.id}</span> — {currentImage.title}
              </p>
              <p className="text-white/60 text-sm mt-1">
                {currentIndex + 1} of {images.length}
              </p>
            </div>
          </motion.div>

          {/* Navigation - Next */}
          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-4 z-50 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={32} className="text-white" />
          </button>

          {/* Thumbnail strip */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((img, idx) => (
              <button
                key={img.id}
                onClick={(e) => { e.stopPropagation(); onNavigate(idx); }}
                className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex
                    ? 'bg-amber-400 scale-125'
                    : 'bg-white/30 hover:bg-white/50'
                  }`}
                aria-label={`View ${img.title}`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
