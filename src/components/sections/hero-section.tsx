'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Download, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Hero video is loaded ONLY after the page has fully rendered (window.load).
 * This prevents the 6MB+ MP4 from competing with the LCP element for bandwidth.
 */
function DeferredVideoBackground() {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Wait for window.load (all critical resources done), then add a small buffer
    const startVideo = () => {
      // Additional 1s delay after load to ensure LCP is measured
      setTimeout(() => setShowVideo(true), 1000);
    };

    if (document.readyState === 'complete') {
      startVideo();
    } else {
      window.addEventListener('load', startVideo);
      return () => window.removeEventListener('load', startVideo);
    }
  }, []);

  return (
    <div className="absolute inset-0 z-0 h-full w-full overflow-hidden border-b-2 border-[#1A1A1A]">
      <div className="absolute inset-0 z-10 bg-[#4A6FA5]/20 mix-blend-multiply" />
      <div className="absolute inset-0 z-10 bg-[#F2E8DC]/80 mix-blend-screen opacity-50" />

      {/* Poster image — loads instantly, serves as LCP-friendly background */}
      <Image
        src="/hero-poster.webp"
        alt=""
        fill
        priority
        className="object-cover grayscale contrast-125 sepia-[0.3]"
        sizes="100vw"
      />

      {/* Video — injected ONLY after page load to avoid bandwidth contention */}
      {showVideo && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover grayscale contrast-125 sepia-[0.3] animate-hero-fade-in"
        >
          <source src="https://cdn.jwplayer.com/videos/uYbXkdXO-IihQ47zp.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[90vh] flex-col justify-between overflow-hidden px-6 pt-32 pb-12 md:px-12">
      <DeferredVideoBackground />

      <div className="relative z-30 mt-12">
        <div className="animate-hero-fade-in">
          <h1 className="font-display text-[12vw] md:text-[10vw] leading-[0.85] tracking-tighter text-[#1A1A1A] drop-shadow-[0_4px_4px_rgba(255,255,255,0.5)]">
            <span className="block mb-4 md:mb-8 text-[6vw] md:text-[4vw]">
              COACH JOSH OFFICIAL
            </span>
            FIGHT IQ <br />
            <span className="text-[#4A6FA5] text-stroke-white">UNLOCKED</span>
          </h1>
        </div>

        <div className="animate-hero-fade-in-delayed flex flex-col gap-6 mt-8">
          <div className="inline-flex items-center gap-2 border-2 border-[#1A1A1A] bg-[#D1495B] px-4 py-2 font-display text-sm font-bold uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-fit">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse"></span>
            Certified Boxing Coach
          </div>

          <p className="font-body text-xl md:text-2xl font-bold text-[#1A1A1A] max-w-2xl leading-relaxed bg-[#F2E8DC]/80 backdrop-blur-sm p-2 border-l-4 border-[#4A6FA5]">
            Stop throwing arm punches. Master the slip, the shift, and the science of striking. Technical drills from the 100M+ view social media archive.
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <Link href="#free">
              <Button variant="default">
                Get Free Week <Download size={18} />
              </Button>
            </Link>
            <Link href="#programs">
              <Button variant="outline">
                View Programs <ArrowUpRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-30 mt-12 flex flex-wrap gap-12 border-t-2 border-[#1A1A1A] pt-8">
        <div>
          <div className="font-display text-5xl text-[#4A6FA5]">100M+</div>
          <div className="font-body text-xs font-bold uppercase tracking-widest text-[#1A1A1A]">Social Media Views</div>
        </div>
        <div>
          <div className="font-display text-5xl text-[#4A6FA5]">100+</div>
          <div className="font-body text-xs font-bold uppercase tracking-widest text-[#1A1A1A]">Fighters Trained</div>
        </div>
        <div>
          <div className="font-display text-5xl text-[#4A6FA5]">4.9★</div>
          <div className="font-body text-xs font-bold uppercase tracking-widest text-[#1A1A1A]">Average Rating</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
