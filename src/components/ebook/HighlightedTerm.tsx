'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface HighlightedTermProps {
  children: string;
  color?: 'amber' | 'yellow' | 'red';
}

export default function HighlightedTerm({
  children,
  color = 'amber'
}: HighlightedTermProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  const colorClasses = {
    amber: 'bg-amber-300/70 hover:bg-amber-300/90',
    yellow: 'bg-yellow-200/70 hover:bg-yellow-200/90',
    red: 'bg-red-200/60 hover:bg-red-200/80',
  };

  // Respect reduced motion
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.span
      ref={ref}
      initial={prefersReducedMotion ? {} : { backgroundSize: '0% 100%' }}
      animate={isInView ? { backgroundSize: '100% 100%' } : {}}
      onAnimationComplete={() => setHasAnimated(true)}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
      className={`
        inline-block px-1.5 py-0.5 mx-0.5
        rounded-md font-semibold
        ${colorClasses[color]}
        cursor-default
        transition-colors duration-200
      `}
      style={{
        backgroundImage: hasAnimated
          ? undefined
          : 'linear-gradient(to right, rgba(251, 191, 36, 0.7), rgba(251, 191, 36, 0.7))',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
      }}
      title={`Boxing term: ${children}`}
    >
      {children}
    </motion.span>
  );
}

// Utility function to wrap terms in content
export function highlightTerms(text: string, terms: string[]): React.ReactNode[] {
  const regex = new RegExp(`\\b(${terms.join('|')})\\b`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (terms.some(term => term.toLowerCase() === part.toLowerCase())) {
      return <HighlightedTerm key={index}>{part}</HighlightedTerm>;
    }
    return part;
  });
}

// Boxing terms to highlight
export const BOXING_TERMS = [
  'jab',
  'cross',
  'hook',
  'uppercut',
  'stance',
  'footwork',
  'kinetic chain',
  'hip rotation',
  'bob and weave',
  'slip',
  'pivot',
  'guard',
];
