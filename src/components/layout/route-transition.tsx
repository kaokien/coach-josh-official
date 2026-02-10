'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { EASING, DURATION } from '@/lib/motion';

/**
 * RouteTransition
 * Wraps page content to provide smooth, Apple-style transitions between routes.
 * This eliminates the "jittery/instant" feel of Next.js navigation.
 */
export default function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          duration: DURATION.normal,
          ease: EASING.standard,
        }}
        className="min-h-screen flex flex-col"
      >
        <div id="main-content" className="flex-1 flex flex-col">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
