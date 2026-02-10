'use client';

import { motion } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';

interface VideoLinkProps {
  title: string;
  url: string;
  description?: string;
}

const rawColors = {
  cream: '#F2E8DC',
  red: '#D1495B',
  ink: '#1A1A1A',
  vanta: '#050505',
  instagram: '#E1306C',
  neon: '#CCFF00',
};

export default function VideoLink({ title, url, description }: VideoLinkProps) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 p-3 my-3 transition-all"
      style={{
        background: rawColors.vanta,
        border: `2px solid ${rawColors.instagram}`,
        boxShadow: `4px 4px 0 ${rawColors.ink}`,
      }}
      whileHover={{
        x: 4,
        boxShadow: `6px 6px 0 ${rawColors.ink}`,
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Play icon */}
      <div
        className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full transition-transform group-hover:scale-110"
        style={{
          background: `linear-gradient(135deg, ${rawColors.instagram}, #833AB4)`,
        }}
      >
        <Play size={18} color="white" fill="white" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className="font-display text-sm uppercase tracking-wide truncate"
            style={{ color: rawColors.cream }}
          >
            {title}
          </span>
          <ExternalLink
            size={12}
            className="flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity"
            color={rawColors.cream}
          />
        </div>
        {description && (
          <span
            className="font-body text-xs truncate block"
            style={{ color: rawColors.cream + '80' }}
          >
            {description}
          </span>
        )}
        <span
          className="font-body text-[10px] uppercase tracking-wider"
          style={{ color: rawColors.instagram }}
        >
          Watch on Instagram
        </span>
      </div>
    </motion.a>
  );
}
