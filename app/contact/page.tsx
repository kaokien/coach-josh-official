import { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MessageCircle, ChevronLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact | Coach Josh Official',
  description: 'Get in touch with Coach Josh for questions about training programs, VIP membership, or general inquiries.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Header */}
      <div className="bg-[#0F172A] border-b-4 border-[#2563EB]">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-body text-sm uppercase tracking-wider mb-4">
            <ChevronLeft size={16} />
            Back to Home
          </Link>
          <h1 className="font-display text-4xl md:text-5xl uppercase text-white">Contact Us</h1>
          <p className="font-body text-white/60 mt-2">Got questions? We&apos;ve got answers.</p>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Options */}
          <div className="space-y-6">
            <div className="bg-white border-2 border-[#0F172A] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-[#2563EB] text-white">
                  <Mail size={24} />
                </div>
                <h2 className="font-display text-xl uppercase">Email Support</h2>
              </div>
              <p className="font-body text-[#0F172A]/70 mb-4">
                For billing questions, technical issues, or general inquiries.
              </p>
              <a
                href="mailto:support@coachjosh.com"
                className="inline-block font-display uppercase text-[#2563EB] hover:underline"
              >
                support@coachjosh.com
              </a>
            </div>

            <div className="bg-white border-2 border-[#0F172A] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-[#7FB069] text-white">
                  <MessageCircle size={24} />
                </div>
                <h2 className="font-display text-xl uppercase">Discord Community</h2>
              </div>
              <p className="font-body text-[#0F172A]/70 mb-4">
                Join our VIP Discord for real-time help from Coach Josh and the community.
              </p>
              <a
                href="https://discord.gg/8GD7v2TrWN"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-[#0F172A] text-white font-display uppercase text-sm hover:bg-[#2A2A2A] transition-colors border-2 border-[#0F172A] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                Join Discord
              </a>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white border-2 border-[#0F172A] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-display text-xl uppercase mb-6 border-b-2 border-[#0F172A] pb-4">Common Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-display uppercase text-sm">How do I cancel my subscription?</h3>
                <p className="font-body text-sm text-[#0F172A]/70 mt-1">
                  You can cancel anytime from your account settings. Email us if you need help.
                </p>
              </div>
              <div>
                <h3 className="font-display uppercase text-sm">Can I get a refund?</h3>
                <p className="font-body text-sm text-[#0F172A]/70 mt-1">
                  Yes! See our <Link href="/refunds" className="text-[#2563EB] hover:underline">Refund Policy</Link> for details.
                </p>
              </div>
              <div>
                <h3 className="font-display uppercase text-sm">How do I access the VIP content?</h3>
                <p className="font-body text-sm text-[#0F172A]/70 mt-1">
                  After subscribing, log in and visit the <Link href="/cornerman" className="text-[#2563EB] hover:underline">Corner Man</Link> section.
                </p>
              </div>
              <div>
                <h3 className="font-display uppercase text-sm">Response time?</h3>
                <p className="font-body text-sm text-[#0F172A]/70 mt-1">
                  We typically respond within 24-48 hours. Discord is faster for quick questions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
