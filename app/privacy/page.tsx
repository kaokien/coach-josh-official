import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Coach Josh Official',
  description: 'Privacy Policy for Coach Josh Official boxing training platform. Learn how we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F2E8DC]">
      {/* Header */}
      <div className="bg-[#1A1A1A] border-b-4 border-[#4A6FA5]">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-body text-sm uppercase tracking-wider mb-4">
            <ChevronLeft size={16} />
            Back to Home
          </Link>
          <h1 className="font-display text-4xl md:text-5xl uppercase text-white">Privacy Policy</h1>
          <p className="font-body text-white/60 mt-2">Last updated: January 2026</p>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white border-2 border-[#1A1A1A] p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="prose prose-lg max-w-none font-body">
            <h2 className="font-display uppercase text-xl mt-0">Information We Collect</h2>
            <p className="text-[#1A1A1A]/80">
              When you use Coach Josh Official, we collect:
            </p>
            <ul className="text-[#1A1A1A]/80">
              <li><strong>Account Information:</strong> Name, email address, and profile picture (via Clerk authentication)</li>
              <li><strong>Payment Information:</strong> Processed securely through Stripe; we do not store credit card details</li>
              <li><strong>Usage Data:</strong> Videos watched, workouts completed, progress metrics</li>
              <li><strong>Device Information:</strong> Browser type, device type, and IP address</li>
            </ul>

            <h2 className="font-display uppercase text-xl">How We Use Your Information</h2>
            <p className="text-[#1A1A1A]/80">
              We use your information to:
            </p>
            <ul className="text-[#1A1A1A]/80">
              <li>Provide and personalize the Service</li>
              <li>Process payments and manage your subscription</li>
              <li>Track your training progress</li>
              <li>Send important updates about your account</li>
              <li>Improve our content and user experience</li>
            </ul>

            <h2 className="font-display uppercase text-xl">Data Storage</h2>
            <p className="text-[#1A1A1A]/80">
              Your data is stored securely using industry-standard encryption. We use:
            </p>
            <ul className="text-[#1A1A1A]/80">
              <li><strong>Clerk:</strong> For authentication and user management</li>
              <li><strong>Stripe:</strong> For secure payment processing</li>
              <li><strong>Vercel:</strong> For hosting and application delivery</li>
            </ul>

            <h2 className="font-display uppercase text-xl">Third-Party Services</h2>
            <p className="text-[#1A1A1A]/80">
              We integrate with third-party services that have their own privacy policies:
            </p>
            <ul className="text-[#1A1A1A]/80">
              <li>Clerk (authentication)</li>
              <li>Stripe (payments)</li>
              <li>Mux (video delivery)</li>
              <li>OpenAI (AI coaching)</li>
              <li>Discord (community)</li>
            </ul>

            <h2 className="font-display uppercase text-xl">Cookies</h2>
            <p className="text-[#1A1A1A]/80">
              We use cookies and local storage to:
            </p>
            <ul className="text-[#1A1A1A]/80">
              <li>Keep you signed in</li>
              <li>Remember your preferences</li>
              <li>Track workout progress locally</li>
              <li>Analyze site usage</li>
            </ul>

            <h2 className="font-display uppercase text-xl">Your Rights</h2>
            <p className="text-[#1A1A1A]/80">
              You have the right to:
            </p>
            <ul className="text-[#1A1A1A]/80">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and data</li>
              <li>Export your data</li>
              <li>Opt out of marketing communications</li>
            </ul>

            <h2 className="font-display uppercase text-xl">Data Retention</h2>
            <p className="text-[#1A1A1A]/80">
              We retain your data for as long as your account is active. Upon account deletion, we remove personal data within 30 days, except where required by law.
            </p>

            <h2 className="font-display uppercase text-xl">Children&apos;s Privacy</h2>
            <p className="text-[#1A1A1A]/80">
              Our Service is not intended for users under 18 years of age. We do not knowingly collect personal information from minors.
            </p>

            <h2 className="font-display uppercase text-xl">Changes to This Policy</h2>
            <p className="text-[#1A1A1A]/80">
              We may update this Privacy Policy from time to time. We will notify you of significant changes via email or through the Service.
            </p>

            <h2 className="font-display uppercase text-xl">Contact Us</h2>
            <p className="text-[#1A1A1A]/80">
              For privacy-related questions or requests, contact us at{' '}
              <a href="mailto:privacy@coachjosh.com" className="text-[#4A6FA5] hover:underline">privacy@coachjosh.com</a>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
