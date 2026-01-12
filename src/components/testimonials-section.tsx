'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Play, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

// --- ASSET IMPORTS ---
// If you have these files, uncomment these lines and remove the string placeholders below.
// import transformation8WeeksBefore from "@/assets/transformation-8weeks-before.jpg";
// import transformation8WeeksAfter from "@/assets/transformation-8weeks-after.jpg";
// import transformation12WeeksBefore from "@/assets/transformation-12weeks-before.jpg";
// import transformation12WeeksAfter from "@/assets/transformation-12weeks-after.jpg";
// import transformation10WeeksBefore from "@/assets/transformation-10weeks-before.jpg";
// import transformation10WeeksAfter from "@/assets/transformation-10weeks-after.jpg";

export default function TestimonialsSection() {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [showAllTransformations, setShowAllTransformations] = useState(false);

  // --- DATA CONFIG ---
  const testimonials = [
    {
      id: 1,
      name: "Marcus J.",
      result: "Lost 30lbs",
      videoUrl: "", // Paste your MP4 link here
      thumbnail: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&q=80",
    },
    {
      id: 2,
      name: "David R.",
      result: "1st Win",
      videoUrl: "",
      thumbnail: "https://images.unsplash.com/photo-1517438322307-e67111335449?w=400&q=80",
    },
    {
      id: 3,
      name: "James T.",
      result: "Technique",
      videoUrl: "",
      thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80",
    },
    {
      id: 4,
      name: "Chris M.",
      result: "Confidence",
      videoUrl: "",
      thumbnail: "https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?w=400&q=80",
    },
    {
      id: 5,
      name: "Alex K.",
      result: "Skills Up",
      videoUrl: "",
      thumbnail: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&q=80",
    },
  ];

  const transformations = [
    {
      id: 1,
      duration: "12 WEEKS",
      // Replace these strings with your imported variables (e.g., beforeImage: transformation12WeeksBefore)
      beforeImage: "https://coach-josh-official.s3.us-east-2.amazonaws.com/transformation-12weeks-before.jpg",
      afterImage: "https://coach-josh-official.s3.us-east-2.amazonaws.com/transformation-12weeks-after.jpg",
      hidden: false,
    },
    {
      id: 2,
      duration: "8 WEEKS",
      beforeImage: "https://coach-josh-official.s3.us-east-2.amazonaws.com/transformation-8weeks-before.jpg",
      afterImage: "https://coach-josh-official.s3.us-east-2.amazonaws.com/transformation-8weeks-after.jpg",
      hidden: false,
    },
    {
      id: 3,
      duration: "10 WEEKS",
      beforeImage: "https://coach-josh-official.s3.us-east-2.amazonaws.com/transformation-10weeks-before.jpg",
      afterImage: "https://coach-josh-official.s3.us-east-2.amazonaws.com/transformation-10weeks-after.jpg",
      hidden: false,
    },
    {
      id: 4,
      duration: "6 WEEKS",
      beforeImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
      afterImage: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80",
      hidden: true,
    },
    {
      id: 5,
      duration: "14 WEEKS",
      beforeImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
      afterImage: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80",
      hidden: true,
    },
  ];

  const visibleTransformations = showAllTransformations
    ? transformations
    : transformations.filter((t) => !t.hidden);

  return (
    <section className="border-t-2 border-[#1A1A1A] bg-[#F2E8DC] px-6 py-24 md:px-12">
      <div className="mx-auto max-w-[1400px]">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <div className="mb-4 inline-flex items-center gap-2 border-2 border-[#1A1A1A] bg-white px-4 py-1 font-display text-sm font-bold uppercase tracking-widest text-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A]">
            <Star size={16} className="text-[#D1495B] fill-[#D1495B]" /> Real Results
          </div>
          <h2 className="font-display text-5xl md:text-7xl uppercase text-[#1A1A1A]">
            What Fighters Say
          </h2>
        </div>

        {/* --- VIDEO GRID --- */}
        <div className="mb-24">
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0 scrollbar-hide">
            {testimonials.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex-shrink-0 w-[80vw] sm:w-[45vw] lg:w-auto snap-center group cursor-pointer"
                onClick={() => setPlayingId(item.id)}
              >
                <div className="relative aspect-[9/16] border-4 border-[#1A1A1A] bg-[#1A1A1A] shadow-[8px_8px_0px_0px_#1A1A1A] hover:shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-300 overflow-hidden">
                  
                  {playingId === item.id && item.videoUrl ? (
                    <video
                      autoPlay
                      controls
                      playsInline
                      className="h-full w-full object-cover"
                    >
                      <source src={item.videoUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <>
                      <div className="absolute inset-0">
                        {/* Using standard img for compatibility, swap to Next <Image> if preferred */}
                        <img 
                          src={item.thumbnail} 
                          alt={item.name} 
                          className="h-full w-full object-cover grayscale contrast-125 transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-[#4A6FA5]/30 mix-blend-multiply group-hover:bg-transparent transition-colors" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-90" />
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="flex h-16 w-16 items-center justify-center border-2 border-[#1A1A1A] bg-[#D1495B] text-white shadow-[4px_4px_0px_0px_#1A1A1A] transition-transform group-hover:scale-110">
                          <Play size={32} fill="currentColor" />
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 w-full p-4 pointer-events-none">
                         <h3 className="font-display text-2xl text-white uppercase tracking-wide">{item.name}</h3>
                         <div className="font-body text-xs font-bold text-[#D1495B] bg-white px-2 py-1 inline-block border border-[#1A1A1A] uppercase tracking-widest mt-1">
                            {item.result}
                         </div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-center font-body text-xs font-bold uppercase tracking-widest text-[#1A1A1A]/40 mt-6 lg:hidden">
            Swipe to view more →
          </p>
        </div>

        {/* --- TRANSFORMATIONS --- */}
        <div className="border-t-2 border-[#1A1A1A]/10 pt-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl uppercase text-[#1A1A1A]">
              Body <span className="text-[#D1495B]">Transformations</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visibleTransformations.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-white border-4 border-[#1A1A1A] shadow-[12px_12px_0px_0px_#1A1A1A]"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="border-2 border-[#1A1A1A] bg-white px-4 py-2 font-display text-xl font-bold uppercase text-[#1A1A1A] shadow-[4px_4px_0px_0px_#4A6FA5]">
                    {item.duration}
                  </div>
                </div>

                <div className="flex h-[400px] w-full">
                  {/* Before */}
                  <div className="relative w-1/2 border-r-2 border-[#1A1A1A] overflow-hidden group">
                    <div className="absolute top-4 left-4 z-10 bg-[#1A1A1A] px-2 py-1 font-body text-xs font-bold text-white uppercase tracking-widest">Before</div>
                    <div className="relative h-full w-full">
                        {typeof item.beforeImage === 'string' ? (
                            <img src={item.beforeImage} alt="Before" className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110" />
                        ) : (
                            <Image src={item.beforeImage} alt="Before" fill className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110" />
                        )}
                    </div>
                  </div>

                  {/* After */}
                  <div className="relative w-1/2 overflow-hidden group">
                     <div className="absolute top-4 right-4 z-10 bg-[#D1495B] px-2 py-1 font-body text-xs font-bold text-white uppercase tracking-widest">After</div>
                     <div className="relative h-full w-full">
                        {typeof item.afterImage === 'string' ? (
                            <img src={item.afterImage} alt="After" className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110" />
                        ) : (
                            <Image src={item.afterImage} alt="After" fill className="object-cover transition-all duration-500 group-hover:scale-110" />
                        )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
             <button 
                onClick={() => setShowAllTransformations(!showAllTransformations)}
                className="group relative inline-flex items-center justify-center gap-3 border-2 border-[#1A1A1A] bg-transparent px-8 py-4 font-bold uppercase tracking-widest text-[#1A1A1A] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-white hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
             >
                {showAllTransformations ? 'Show Less' : 'See More Results'} <ArrowUpRight size={18} />
             </button>
          </div>
        </div>

      </div>
    </section>
  );
}
