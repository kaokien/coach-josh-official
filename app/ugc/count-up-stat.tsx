'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CountUpStatProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
}

export default function CountUpStat({
  end,
  suffix = "",
  prefix = "",
  duration = 1.2,
  decimals = 0
}: CountUpStatProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          observer.disconnect();

          let startTime: number | null = null;
          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            // Ease-out quad curve for snappy, smooth decelerating animation
            const easeOut = 1 - (1 - progress) * (1 - progress);
            
            setValue(easeOut * end);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setValue(end);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [end, duration]);

  const formatted = `${prefix}${value.toFixed(decimals)}${suffix}`;

  return <span ref={ref}>{formatted}</span>;
}
