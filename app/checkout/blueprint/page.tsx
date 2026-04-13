'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BlueprintCheckoutPage() {
  const router = useRouter();
  const [error, setError] = useState(false);

  useEffect(() => {
    const startCheckout = async () => {
      try {
        const res = await fetch('/api/checkout', { method: 'POST' });
        if (res.ok) {
          const data = await res.json();
          if (data.url) {
            window.location.href = data.url;
            return;
          }
        }
        setError(true);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };

    startCheckout();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="font-display text-2xl uppercase text-white">Something went wrong.</p>
        <p className="font-body text-white/60">We couldn&apos;t start your checkout. Please try again.</p>
        <a
          href="/#programs"
          className="border-2 border-white px-6 py-3 font-display text-sm uppercase tracking-widest text-white hover:bg-white hover:text-[#0F172A] transition-colors"
        >
          Go Back
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center gap-6 px-6 text-center">
      {/* Animated pulsing logo mark */}
      <div className="relative flex items-center justify-center">
        <span className="absolute inline-flex h-16 w-16 rounded-full bg-[#2563EB] opacity-30 animate-ping" />
        <span className="relative inline-flex h-10 w-10 rounded-full bg-[#2563EB]" />
      </div>
      <p className="font-display text-2xl uppercase tracking-widest text-white">
        Preparing Your Checkout...
      </p>
      <p className="font-body text-white/50 text-sm max-w-xs">
        You&apos;ll be redirected to secure payment in a moment.
      </p>
    </div>
  );
}
