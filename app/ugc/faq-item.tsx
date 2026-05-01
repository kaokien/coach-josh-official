'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-4 border-[#1A1A1A] bg-white shadow-[4px_4px_0px_0px_#1A1A1A] mb-6 transition-all hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#1A1A1A] rounded-none">
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
}
