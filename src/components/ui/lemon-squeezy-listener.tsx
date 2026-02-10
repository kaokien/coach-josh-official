'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Lemon Squeezy integration component for Next.js.
 *
 * Does two things:
 * 1. Re-initializes lemon.js after client-side navigation so overlay
 *    checkout links (.lemonsqueezy-button) work correctly.
 * 2. Listens for the Checkout.Success event from the LS overlay iframe
 *    and redirects to /blueprint?success=true.
 */
export default function LemonSqueezyListener() {
  const router = useRouter();

  // Re-initialize LemonSqueezy after client-side navigation
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;

    // lemon.js exposes this function to re-scan the DOM for .lemonsqueezy-button links
    if (typeof win.createLemonSqueezy === 'function') {
      win.createLemonSqueezy();
    } else {
      // If lemon.js hasn't loaded yet, wait for it
      const onLoad = () => {
        if (typeof win.createLemonSqueezy === 'function') {
          win.createLemonSqueezy();
        }
      };
      window.addEventListener('load', onLoad);
      return () => window.removeEventListener('load', onLoad);
    }
  }, []);

  // Listen for Checkout.Success from the LS overlay
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;

    // Method 1: Setup via LemonSqueezy.Setup (if available)
    function setupEvents() {
      if (win.LemonSqueezy) {
        win.LemonSqueezy.Setup({
          eventHandler: (event: { event: string }) => {
            if (event?.event === 'Checkout.Success') {
              // Hard navigate so the server re-checks purchase status
              window.location.href = '/blueprint?success=true';
            }
          },
        });
      }
    }

    // Try immediately, retry after a short delay for script loading
    setupEvents();
    const timer = setTimeout(setupEvents, 2000);

    // Method 2: Listen for postMessage from the overlay iframe
    function handleMessage(event: MessageEvent) {
      if (typeof event.data === 'string') {
        try {
          const data = JSON.parse(event.data);
          if (data?.event === 'Checkout.Success') {
            window.location.href = '/blueprint?success=true';
          }
        } catch {
          // Not JSON — ignore
        }
      }
      if (event.data?.event === 'Checkout.Success') {
        window.location.href = '/blueprint?success=true';
      }
    }

    window.addEventListener('message', handleMessage);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('message', handleMessage);
    };
  }, [router]);

  return null;
}
