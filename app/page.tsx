// app/page.tsx
import { Suspense } from 'react';
import LandingPage from '@/components/landing-page'; // Check if this path needs src/
import MerchShowcase from '@/components/merch-showcase'; // Adjust path based on where you saved it

export const metadata = {
  title: 'Coach Josh Official | Boxing Training & Fight IQ',
  description: 'Master the slip, the shift, and the science of striking. Technical drills from the 50M+ view TikTok coach. Online programs & 1-on-1 training.',
  openGraph: {
    title: 'Coach Josh Official | Boxing Training',
    description: 'Stop throwing arm punches. Master the science of striking.',
    images: ['/og-image.jpg'],
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F2E8DC]" />}>
      <main className="flex flex-col min-h-screen">
        {/* Main Content */}
        <LandingPage />
        
        {/* Merchandise Section */}
        <MerchShowcase />
      </main>
    </Suspense>
  );
}
