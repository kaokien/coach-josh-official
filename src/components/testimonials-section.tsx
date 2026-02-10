// Server Component — pure JSX + next/image, no hooks or browser APIs

import React from 'react';
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
  ];

  return (
    <section className="border-t-2 border-[#1A1A1A] bg-[#F2E8DC] px-6 py-24 md:px-12">
      <div className="mx-auto max-w-[1400px]">




        {/* --- TRANSFORMATIONS --- */}
        <div className="border-t-2 border-[#1A1A1A]/10 pt-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl uppercase text-[#1A1A1A]">
              Body <span className="text-[#D1495B]">Transformations</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {transformations.map((item, index) => (
              <div
                key={item.id}
                className="relative bg-white border-4 border-[#1A1A1A] shadow-[12px_12px_0px_0px_#1A1A1A] animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
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
                      <Image
                        src={item.beforeImage}
                        alt="Before"
                        fill
                        className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  </div>

                  {/* After */}
                  <div className="relative w-1/2 overflow-hidden group">
                    <div className="absolute top-4 right-4 z-10 bg-[#D1495B] px-2 py-1 font-body text-xs font-bold text-white uppercase tracking-widest">After</div>
                    <div className="relative h-full w-full">
                      <Image
                        src={item.afterImage}
                        alt="After"
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
