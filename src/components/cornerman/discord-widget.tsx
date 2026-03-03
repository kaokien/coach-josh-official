'use client';

import React, { useEffect, useState } from 'react';
import { MessageCircle, Users, ExternalLink, Loader2 } from 'lucide-react';

interface DiscordMember {
  id: string;
  username: string;
  avatar_url: string;
  status: string;
}

interface DiscordData {
  id: string;
  name: string;
  instant_invite: string;
  presence_count: number;
  members: DiscordMember[];
}

export default function DiscordWidget() {
  const [data, setData] = useState<DiscordData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDiscordData = async () => {
      try {
        const res = await fetch('https://discord.com/api/guilds/1458606495548571736/widget.json');
        if (!res.ok) throw new Error('Failed to fetch');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscordData();
    // Refresh every 60 seconds
    const interval = setInterval(fetchDiscordData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    // Fallback if API fails (e.g. strict CORS or rate limit)
    return (
      <a
        href="https://discord.gg/8GD7v2TrWN"
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-[#5865F2] text-white p-4 border-2 border-[#0F172A] hover:opacity-90 transition-opacity"
      >
        <div className="flex items-center justify-between">
          <span className="font-display uppercase text-sm">Join the Community</span>
          <MessageCircle size={20} />
        </div>
      </a>
    );
  }

  if (loading) {
    return (
      <div className="h-40 border-2 border-[#0F172A] bg-[#FFFFFF]/30 flex items-center justify-center">
        <Loader2 className="animate-spin text-[#0F172A]/50" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="border-2 border-[#0F172A] bg-white shadow-[4px_4px_0px_0px_rgba(88,101,242,1)]">
      {/* Header */}
      <div className="bg-[#5865F2] p-3 border-b-2 border-[#0F172A] flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <MessageCircle size={18} fill="currentColor" />
          <span className="font-display text-sm uppercase tracking-wide">The Gym Floor</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold bg-[#0F172A]/20 px-2 py-0.5 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          {data.presence_count} Online
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <p className="font-body text-xs text-[#0F172A]/60 mb-3 uppercase tracking-widest font-bold">
          Live Fighters
        </p>

        {/* Avatar Pile */}
        <div className="flex -space-x-3 overflow-hidden py-1 mb-4">
          {data.members.slice(0, 5).map((member) => (
            <div key={member.id} className="relative group">
              <img
                src={member.avatar_url}
                alt={member.username}
                className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 object-cover relative z-10 transition-transform hover:scale-110 hover:z-20"
                title={member.username}
              />
              <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white z-20 
                 ${member.status === 'online' ? 'bg-green-500' :
                  member.status === 'idle' ? 'bg-yellow-500' :
                    member.status === 'dnd' ? 'bg-red-500' : 'bg-gray-500'}`}
              />
            </div>
          ))}
          {data.members.length > 5 && (
            <div className="w-8 h-8 rounded-full border-2 border-white bg-[#0F172A] text-white flex items-center justify-center text-[10px] font-bold relative z-10">
              +{data.presence_count - 5}
            </div>
          )}
        </div>

        {/* Join Button */}
        <a
          href={data.instant_invite || "https://discord.gg/8GD7v2TrWN"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2 bg-[#0F172A] text-white font-display text-xs uppercase hover:bg-[#5865F2] transition-colors"
        >
          <span>Enter the Gym</span>
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}
