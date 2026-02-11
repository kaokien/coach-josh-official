'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Layout
import Navigation from '@/components/layout/navigation';
import Footer from '@/components/layout/footer';

// Sections
import HeroSection from '@/components/sections/hero-section';
import TrustSection from '@/components/sections/trust-section';
import { FreeSamplerSection } from '@/components/sections/free-sampler-section';
import RecentUploads from '@/components/recent-uploads';
import ProgramsSection from '@/components/sections/programs-section';
import TestimonialsSection from '@/components/testimonials-section';

import CommunitySection from '@/components/sections/community-section';
import TrainingSection from '@/components/sections/training-section';
import FAQSection from '@/components/sections/faq-section';
import ProblemSection from '@/components/sections/problem-section';
import MethodologySection from '@/components/sections/methodology-section';
import ComparisonSection from '@/components/sections/comparison-section';
import BenefitsSection from '@/components/sections/benefits-section';

// UI
import BookingModal from '@/components/ui/booking-modal';
import SuccessModal from '@/components/ui/success-modal';
import PaperTexture from '@/components/ui/paper-texture';
import Marquee from '@/components/ui/marquee';

// --- Configuration & Constants ---

const BOOKING_LINK = "https://calendly.com/mais-joshua/training-session?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=ccff00";

// --- Main Content Component ---
// Separated to allow Suspense wrapping
function LandingPageContent() {
  const searchParams = useSearchParams();
  const showDownload = searchParams.get('success');
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // 1. Success State (Early Return)
  if (showDownload) {
    return <SuccessModal />;
  }

  // 2. Main Page Layout
  return (
    <main
      className="relative min-h-screen bg-[#F2E8DC] font-sans text-[#1A1A1A] selection:bg-[#4A6FA5] selection:text-white"
    >


      <PaperTexture />
      <Navigation />

      <HeroSection />

      <Marquee text="HAND SPEED • FOOTWORK • POWER • DEFENSE • SLIP • ROLL • " />

      {/* Funnel: Authority -> Problem -> Solution -> Comparison */}
      <ProblemSection />
      <MethodologySection />
      <ComparisonSection />

      {/* Funnel: Proof -> Offer -> Benefits */}
      <TestimonialsSection />
      <ProgramsSection />
      <BenefitsSection />
      <CommunitySection />

      {/* High Ticket & Lead Gen */}
      <TrustSection />
      <TrainingSection onOpenBooking={() => setIsBookingOpen(true)} />
      <FreeSamplerSection />

      <FAQSection />

      <RecentUploads />
      <Footer />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        bookingUrl={BOOKING_LINK}
      />
    </main>
  );
}

// --- Exported Page Component ---
// Wraps content in Suspense to handle useSearchParams safely
export default function LandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F2E8DC]" />}>
      <LandingPageContent />
    </Suspense>
  );
}
