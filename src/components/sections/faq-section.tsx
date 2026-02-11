'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-4 border-[#1A1A1A] bg-white shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] mb-6 transition-all hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] rounded-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none transition-colors hover:bg-gray-50 bg-[#FBFBFB]"
      >
        <span className="font-display text-xl md:text-2xl uppercase text-[#1A1A1A] pr-6 tracking-wide w-[90%]">{question}</span>
        <div className={`bg-[#1A1A1A] text-white p-2 rounded-none flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          {isOpen ? <Minus size={20} strokeWidth={3} /> : <Plus size={20} strokeWidth={3} />}
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 border-t-4 border-[#1A1A1A]' : 'max-h-0 opacity-0 border-t-0'}`}
      >
        <div className="px-6 py-6 font-body text-lg text-[#1A1A1A]/80 leading-relaxed bg-white">
          {answer}
        </div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      question: "Do I need any equipment?",
      answer: "No. You can start with zero equipment. Shadowboxing is the foundation of all movement. As you progress, a heavy bag or slip bag can help, but they aren't required to build elite mechanics."
    },
    {
      question: "I've never boxed before. Is this for me?",
      answer: "Yes. In fact, it's better if you're a beginner because you don't have bad habits to unlearn. We build your fundamentals from the ground up, the right way."
    },
    {
      question: "How is this different from YouTube tutorials?",
      answer: "YouTube gives you random moves without context. My program gives you a structured system—Step 1 leads to Step 2. Plus, you join a community for feedback, so you know you're doing it right."
    },
    {
      question: "What if I can't keep up with the schedule?",
      answer: "The program is self-paced. You have lifetime access to the materials. Train on your own time, but stay consistent."
    },
    {
      question: "Is there a refund policy?",
      answer: "We stand by our training. If you do the work and don't see results, reach out to us."
    }
  ];

  return (
    <section className="relative px-6 py-24 md:px-12 bg-[#F2E8DC] border-t-8 border-[#1A1A1A]">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <div className="inline-block bg-[#1A1A1A] px-4 py-1 mb-4 transform -rotate-1">
            <span className="font-display text-white text-lg tracking-widest uppercase">Answers</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.85] text-[#1A1A1A] drop-shadow-[4px_4px_0px_rgba(255,255,255,1)]">
            Frequently Asked<br />Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
