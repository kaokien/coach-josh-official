'use client';

import React from 'react';
import CountUp from 'react-countup';

interface CountUpStatProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
}

export default function CountUpStat({ end, suffix = "", prefix = "", duration = 2.5, decimals = 0 }: CountUpStatProps) {
  return (
    <CountUp 
      start={0} 
      end={end} 
      duration={duration} 
      suffix={suffix} 
      prefix={prefix}
      decimals={decimals}
      enableScrollSpy={true}
      scrollSpyOnce={true}
    />
  );
}
