'use client';

import React from 'react';

const PaperTexture = () => (
  <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.4] mix-blend-multiply">
    <svg className="h-full w-full">
      <filter id="paper">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#paper)" />
    </svg>
  </div>
);

export default PaperTexture;
