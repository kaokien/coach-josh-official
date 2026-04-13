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
    <section className="border-t-2 border-[#0F172A] bg-[#FFFFFF] px-6 py-24 md:px-12">
      <div className="mx-auto max-w-[1400px]">




        {/* --- GOOGLE REVIEWS --- */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <div className="mb-4 inline-flex items-center gap-2 border-2 border-[#0F172A] bg-white px-4 py-1 font-display text-sm font-bold uppercase tracking-widest text-[#0F172A] shadow-[4px_4px_0px_0px_#0F172A]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="inline-block">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              37 Google Reviews · 5.0 ★
            </div>
            <h2 className="font-display text-4xl md:text-5xl uppercase text-[#0F172A]">
              What <span className="text-[#DC2626]">Students Say</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                initials: "OG",
                bg: "#0F172A",
                text: "He's motivating, technique driven, and his workouts are also fun.",
                name: "Google Reviewer",
              },
              {
                initials: "A",
                bg: "#DC2626",
                text: "Great boxing gym with a solid atmosphere and quality training.",
                name: "Google Reviewer",
              },
              {
                initials: "J",
                bg: "#2563EB",
                text: "A true gentleman, the kind of man who is welcome at my dinner table.",
                name: "Google Reviewer",
              },
            ].map((review, i) => (
              <div
                key={i}
                className="border-2 border-[#0F172A] bg-white p-6 shadow-[6px_6px_0px_0px_#0F172A] flex flex-col gap-4"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {[1,2,3,4,5].map((s) => (
                    <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="#FBBC05">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="font-body text-[#0F172A]/80 leading-relaxed flex-1">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Reviewer */}
                <div className="flex items-center gap-3 pt-2 border-t-2 border-[#0F172A]/10">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold text-white"
                    style={{ background: review.bg }}
                  >
                    {review.initials}
                  </div>
                  <div>
                    <div className="font-body text-xs font-bold text-[#0F172A]">{review.name}</div>
                    <div className="font-body text-[10px] text-[#0F172A]/40 flex items-center gap-1">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Google
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="https://maps.app.goo.gl/WjuigDBxv9MeaDk99"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-[#0F172A] bg-white px-6 py-3 font-display text-sm uppercase tracking-widest text-[#0F172A] shadow-[4px_4px_0px_0px_#0F172A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#0F172A] transition-all"
            >
              View All 37 Google Reviews ↗
            </a>
          </div>
        </div>

        {/* --- TRANSFORMATIONS --- */}

        <div className="border-t-2 border-[#0F172A]/10 pt-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl uppercase text-[#0F172A]">
              Body <span className="text-[#DC2626]">Transformations</span>
            </h2>
          </div>

          {/* Mobile: Horizontal Scroll | Desktop: Grid */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-6 px-6 md:grid md:grid-cols-3 md:gap-8 md:pb-0 md:mx-0 md:px-0 scrollbar-hide">
            {transformations.map((item, index) => (
              <div
                key={item.id}
                className="relative min-w-[85vw] snap-center bg-white border-4 border-[#0F172A] shadow-[8px_8px_0px_0px_#0F172A] md:min-w-0 md:shadow-[12px_12px_0px_0px_#0F172A] animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="border-2 border-[#0F172A] bg-white px-4 py-2 font-display text-xl font-bold uppercase text-[#0F172A] shadow-[4px_4px_0px_0px_#2563EB]">
                    {item.duration}
                  </div>
                </div>

                <div className="flex h-[400px] w-full">
                  {/* Before */}
                  <div className="relative w-1/2 border-r-2 border-[#0F172A] overflow-hidden group">
                    <div className="absolute top-4 left-4 z-10 bg-[#0F172A] px-2 py-1 font-body text-xs font-bold text-white uppercase tracking-widest">Before</div>
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
                    <div className="absolute top-4 right-4 z-10 bg-[#DC2626] px-2 py-1 font-body text-xs font-bold text-white uppercase tracking-widest">After</div>
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
