import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Refund Policy | Coach Josh Official',
  description: 'Refund Policy for Coach Josh Official digital products and VIP membership. 7-day money-back guarantee on all purchases. No questions asked.',
};

export default function RefundsPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Header */}
      <div className="bg-[#0F172A] border-b-4 border-[#2563EB]">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-body text-sm uppercase tracking-wider mb-4">
            <ChevronLeft size={16} />
            Back to Home
          </Link>
          <h1 className="font-display text-4xl md:text-5xl uppercase text-white">Refund Policy</h1>
          <p className="font-body text-white/60 mt-2">Your satisfaction is our priority</p>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Guarantee Banner */}
        <div className="bg-[#7FB069] border-2 border-[#0F172A] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8 text-center">
          <h2 className="font-display text-2xl uppercase text-white mb-2">7-Day Money-Back Guarantee</h2>
          <p className="font-body text-white/90">
            Not satisfied? Get a full refund within 7 days of your first payment. No questions asked.
          </p>
        </div>

        <div className="bg-white border-2 border-[#0F172A] p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="prose prose-lg max-w-none font-body">
            <h2 className="font-display uppercase text-xl mt-0">Our Commitment</h2>
            <p className="text-[#0F172A]/80">
              We&apos;re confident that Coach Josh Official will help you level up your boxing game. But we understand that every fighter is different. That&apos;s why we offer a straightforward refund policy.
            </p>

            <h2 className="font-display uppercase text-xl">Eligibility for Refund</h2>
            <div className="space-y-3 not-prose">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-[#7FB069] flex-shrink-0 mt-1" size={20} />
                <p className="text-[#0F172A]/80">
                  <strong>First-time subscribers</strong> can request a full refund within 7 days of their initial payment.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-[#7FB069] flex-shrink-0 mt-1" size={20} />
                <p className="text-[#0F172A]/80">
                  <strong>Technical issues</strong> preventing access to content may qualify for partial or full refunds on a case-by-case basis.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-[#7FB069] flex-shrink-0 mt-1" size={20} />
                <p className="text-[#0F172A]/80">
                  <strong>Billing errors</strong> will be refunded immediately upon verification.
                </p>
              </div>
            </div>

            <h2 className="font-display uppercase text-xl">How to Request a Refund</h2>
            <p className="text-[#0F172A]/80">
              To request a refund:
            </p>
            <ol className="text-[#0F172A]/80">
              <li>Email <a href="mailto:coachjoshofficial@playersclubllc.com" className="text-[#2563EB] hover:underline">coachjoshofficial@playersclubllc.com</a> with the subject line &quot;Refund Request&quot;</li>
              <li>Include your account email address</li>
              <li>Briefly explain why you&apos;re requesting a refund (optional but helpful)</li>
            </ol>
            <p className="text-[#0F172A]/80">
              Refunds are typically processed within 5-7 business days. The funds will be returned to your original payment method.
            </p>

            <h2 className="font-display uppercase text-xl">Non-Refundable Items</h2>
            <ul className="text-[#0F172A]/80">
              <li>Subscription payments after the 7-day trial period</li>
              <li>Physical merchandise (unless defective)</li>
              <li>One-on-one coaching sessions already completed</li>
            </ul>

            <h2 className="font-display uppercase text-xl">Cancellation</h2>
            <p className="text-[#0F172A]/80">
              You can cancel your subscription at any time. When you cancel:
            </p>
            <ul className="text-[#0F172A]/80">
              <li>You&apos;ll retain access until the end of your current billing period</li>
              <li>No further charges will be made</li>
              <li>You can resubscribe anytime</li>
            </ul>
            <p className="text-[#0F172A]/80">
              To cancel, go to your account settings or email us.
            </p>

            <h2 className="font-display uppercase text-xl">Questions?</h2>
            <p className="text-[#0F172A]/80">
              If you have any questions about our refund policy, please <Link href="/contact" className="text-[#2563EB] hover:underline">contact us</Link>. We&apos;re here to help.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
