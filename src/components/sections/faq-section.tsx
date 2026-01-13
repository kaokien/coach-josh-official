'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils'; // Ensure you have this utility or defined locally

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Will the strength training make me slow?",
      a: "No. Lifting slowly makes you slow. We train with 'Compensatory Acceleration' — even if the weight is heavy, you try to move it as fast as possible. This teaches your nervous system to fire quickly."
    },
    {
      q: "I'm a complete beginner. Is this for me?",
      a: "The programs work best if you have at least 6 months of basic gym experience. If you're brand new to training, start with the free Week 1 sampler to see if it's a good fit."
    },
    {
      q: "What equipment do I need?",
      a: "For the digital programs, you'll need access to a gym with barbells, dumbbells, a pull-up bar, and ideally a heavy bag. Home alternatives are provided for most exercises."
    },
    {
      q: "How is Corner Man different from the Blueprint?",
      a: "The Striking Blueprint is a one-time PDF purchase with the full technique breakdown. Corner Man ($29/mo) includes personalized video feedback on YOUR technique, plus access to the community and weekly live sessions."
    },
    {
      q: "Can I cancel my subscription anytime?",
      a: "Yes. Cancel anytime with one click. No contracts, no hassle. You'll keep access until the end of your billing period."
    },
  ];

  return (
    <section className="border-t-2 border-[#1A1A1A] bg-white px-6 py-24 md:px-12">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-6xl uppercase text-[#1A1A1A]">
            Questions?
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={false}
              className="border-2 border-[#1A1A1A] bg-[#F2E8DC]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-display text-xl text-[#1A1A1A]">{faq.q}</span>
                <ChevronDown
                  size={24}
                  className={cn(
                    "text-[#4A6FA5] transition-transform",
                    openIndex === i && "rotate-180"
                  )}
                />
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === i ? 'auto' : 0,
                  opacity: openIndex === i ? 1 : 0
                }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 font-body text-[#1A1A1A]/80 leading-relaxed">
                  {faq.a}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
