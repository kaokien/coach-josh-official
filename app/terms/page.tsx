import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | Coach Josh Official',
  description: 'Terms of Service for Coach Josh Official boxing training platform and VIP membership.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Header */}
      <div className="bg-[#0F172A] border-b-4 border-[#2563EB]">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-body text-sm uppercase tracking-wider mb-4">
            <ChevronLeft size={16} />
            Back to Home
          </Link>
          <h1 className="font-display text-4xl md:text-5xl uppercase text-white">Terms of Service</h1>
          <p className="font-body text-white/60 mt-2">Last updated: January 2026</p>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white border-2 border-[#0F172A] p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="prose prose-lg max-w-none font-body">
            <h2 className="font-display uppercase text-xl mt-0">1. Acceptance of Terms</h2>
            <p className="text-[#0F172A]/80">
              By accessing and using Coach Josh Official (&quot;the Service&quot;), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>

            <h2 className="font-display uppercase text-xl">2. Description of Service</h2>
            <p className="text-[#0F172A]/80">
              Coach Josh Official provides online boxing training content, including but not limited to:
            </p>
            <ul className="text-[#0F172A]/80">
              <li>Video tutorials and technique breakdowns</li>
              <li>Audio-guided workout sessions</li>
              <li>Breathwork and mental training exercises</li>
              <li>AI-powered coaching assistance</li>
              <li>Community access via Discord</li>
            </ul>

            <h2 className="font-display uppercase text-xl">3. Subscription and Billing</h2>
            <p className="text-[#0F172A]/80">
              VIP membership is billed on a recurring monthly basis. You authorize us to charge your payment method on file for each billing cycle until you cancel. Prices are subject to change with 30 days notice.
            </p>

            <h2 className="font-display uppercase text-xl">4. User Responsibilities</h2>
            <p className="text-[#0F172A]/80">
              You agree to:
            </p>
            <ul className="text-[#0F172A]/80">
              <li>Provide accurate account information</li>
              <li>Not share your login credentials</li>
              <li>Not redistribute or resell our content</li>
              <li>Use the Service at your own risk</li>
              <li>Consult a physician before starting any exercise program</li>
            </ul>

            <h2 className="font-display uppercase text-xl">5. Health Disclaimer</h2>
            <p className="text-[#0F172A]/80">
              The content provided is for educational purposes only and is not a substitute for professional medical advice. Boxing and combat sports carry inherent risks of injury. By using this Service, you acknowledge these risks and take full responsibility for your physical health and safety.
            </p>

            <h2 className="font-display uppercase text-xl">6. Intellectual Property</h2>
            <p className="text-[#0F172A]/80">
              All content, including videos, audio, text, graphics, and software, is the property of Coach Josh Official and is protected by copyright laws. Unauthorized reproduction or distribution is prohibited.
            </p>

            <h2 className="font-display uppercase text-xl">7. Termination</h2>
            <p className="text-[#0F172A]/80">
              We reserve the right to terminate or suspend your account at our discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users.
            </p>

            <h2 className="font-display uppercase text-xl">8. Limitation of Liability</h2>
            <p className="text-[#0F172A]/80">
              Coach Josh Official shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.
            </p>

            <h2 className="font-display uppercase text-xl">9. Changes to Terms</h2>
            <p className="text-[#0F172A]/80">
              We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the new Terms.
            </p>

            <h2 className="font-display uppercase text-xl">10. Contact</h2>
            <p className="text-[#0F172A]/80">
              For questions about these Terms, please contact us at{' '}
              <a href="mailto:legal@coachjosh.com" className="text-[#2563EB] hover:underline">legal@coachjosh.com</a>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
