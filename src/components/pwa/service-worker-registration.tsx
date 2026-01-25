'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Register service worker after page load
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('[PWA] Service Worker registered:', registration.scope);

            // Check for updates periodically
            setInterval(() => {
              registration.update();
            }, 60 * 60 * 1000); // Every hour
          })
          .catch((error) => {
            console.log('[PWA] Service Worker registration failed:', error);
          });
      });
    }
  }, []);

  return null;
}
