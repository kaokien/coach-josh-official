'use client';

import React from 'react';
import { MessageCircle, Check, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Simple button wrapper
const DiscordButton = ({ className, children, ...props }: any) => (
  <button className={cn("group relative flex items-center justify-center gap-3 border-2 border-white font-bold uppercase tracking-widest transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] px-8 py-5 text-lg bg-white text-[#4A6FA5] hover:bg-[#F2E8DC]", className)} {...props}>
     <span className="relative z-10 flex items-center gap-2">{children}</span>
  </button>
);

const CommunitySection = () => {
  return (
    <section id="community" className="border-t-2 border-[#1A1A1A] bg-[#4A6FA5] px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <div className="mb-6 inline-flex items-center gap-2 border-2 border-white bg-white/20 px-4 py-2 font-display text-sm font-bold uppercase tracking-widest text-white">
              <MessageCircle size={16} /> Discord Community
            </div>
            <h2 className="font-display text-5xl md:text-6xl uppercase text-white leading-none">
              Join 500+<br />Fighters
            </h2>
            <p className="font-body mt-6 text-xl text-white/90">
              Get feedback on your technique, share wins, and connect with other fighters training with Coach Josh.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                'Post form check videos for feedback',
                'Weekly live Q&A sessions',
                'Exclusive training tips & drills',
                'Accountability & motivation',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-body text-white">
                  <Check size={20} className="text-white" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-12">
              <a 
                href="https://discord.gg/a2xUbWC664" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <DiscordButton>
                  Join Discord (Free) <ArrowUpRight size={18} />
                </DiscordButton>
              </a>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-md">
            <div className="border-4 border-[#1A1A1A] bg-[#2C2F33] rounded-lg overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <div className="bg-[#23272A] px-4 py-3 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#4A6FA5] flex items-center justify-center">
                  <span className="font-display text-white text-sm">CJ</span>
                </div>
                <div>
                  <div className="font-display text-white text-sm">Coach Josh Official</div>
                  <div className="text-xs text-green-400 flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-green-400"></span>
                    532 online
                  </div>
                </div>
              </div>
              
              <div className="p-4 space-y-2">
                {[
                  { name: '# announcements', unread: false },
                  { name: '# form-checks', unread: true },
                  { name: '# workout-check-ins', unread: true },
                  { name: '# wins-and-prs', unread: false },
                  { name: '# ask-coach-josh', unread: true },
                ].map((channel, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "px-3 py-2 rounded text-sm font-body",
                      channel.unread ? "text-white bg-white/10" : "text-white/60"
                    )}
                  >
                    {channel.name}
                    {channel.unread && (
                      <span className="ml-2 h-2 w-2 rounded-full bg-[#D1495B] inline-block"></span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
