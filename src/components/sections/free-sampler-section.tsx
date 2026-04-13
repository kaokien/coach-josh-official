import React from 'react';
import { Youtube, Play, ArrowUpRight } from 'lucide-react';


export function FreeSamplerSection() {
  return (
    <section id="free" className="relative border-t-2 border-[#0F172A] bg-[#0F172A] px-6 py-24 md:px-12">
      <div className="mx-auto max-w-4xl text-center">
        <div className="animate-fade-in-up">
          <div className="mb-6 inline-flex items-center gap-2 border-2 border-[#DC2626] bg-[#DC2626]/20 px-4 py-2 font-display text-sm font-bold uppercase tracking-widest text-[#DC2626]">
            <Youtube size={16} /> Free Training
          </div>

          <h2 className="font-display text-5xl md:text-7xl uppercase text-white leading-none">
            The Warm-Up<br />
            <span className="text-[#2563EB]">Champions Use</span>
          </h2>

          <p className="font-body mt-6 text-xl text-white/80 max-w-2xl mx-auto">
            The complete boxing warm-up routine used by elite fighters — based on the legendary Soviet-style boxing system. Watch it free on YouTube.
          </p>

          {/* Video Embed */}
          <div className="mt-10 mx-auto max-w-3xl border-4 border-[#0F172A] shadow-[8px_8px_0px_0px_rgba(37,99,235,1)] overflow-hidden">
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/M4uyfBR7H1I?rel=0"
                title="The Warm-Up Routine Champions Use (Boxing Fundamentals 101)"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <a
            href="https://www.youtube.com/watch?v=M4uyfBR7H1I"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 border-2 border-white bg-[#DC2626] px-8 py-4 font-display text-lg uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:bg-[#DC2626]/80 hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <Play size={20} /> Watch on YouTube <ArrowUpRight size={18} />
          </a>

          <p className="font-body mt-4 text-sm text-white/50">
            12K subscribers • Boxing Fundamentals 101
          </p>
        </div>
      </div>
    </section>
  );
}