'use client';

import React from 'react';
import { Check, X, Minus } from 'lucide-react';

const ComparisonSection = () => {
  return (
    <section className="relative px-4 py-24 md:px-12 bg-[#F5F5DC]">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl uppercase leading-none text-[#1A1A1A] mb-4">
            Why Other Methods Fail
          </h2>
          <p className="font-body text-xl text-[#1A1A1A]/80 max-w-2xl mx-auto">
            Stop wasting time with methods that don't translate to real fighting skill.
          </p>
        </div>

        <div className="overflow-x-auto pb-8">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr>
                <th className="p-4 md:p-6 bg-transparent"></th>
                <th className="p-4 md:p-6 bg-white border-4 border-[#1A1A1A] text-center w-1/4 md:w-1/3 shadow-[8px_8px_0px_0px_rgba(26,26,26,0.1)]">
                  <div className="font-display text-xl uppercase text-[#1A1A1A]/50">YouTube</div>
                </th>
                <th className="p-4 md:p-6 bg-white border-4 border-[#1A1A1A] text-center w-1/4 md:w-1/3 shadow-[8px_8px_0px_0px_rgba(26,26,26,0.1)]">
                  <div className="font-display text-xl uppercase text-[#1A1A1A]/50">Local Gym</div>
                </th>
                <th className="p-4 md:p-6 bg-[#1A1A1A] border-4 border-[#1A1A1A] text-center w-1/3 md:w-1/3 relative shadow-[8px_8px_0px_0px_#4A6FA5] transform scale-105 origin-bottom z-10">
                  <div className="absolute top-0 left-0 w-full -mt-8 flex justify-center">
                    <span className="bg-[#4A6FA5] text-white text-xs font-bold uppercase px-3 py-1 tracking-widest border-2 border-[#1A1A1A]">Best Value</span>
                  </div>
                  <div className="font-display text-2xl uppercase text-white">Coach Josh</div>
                </th>
              </tr>
            </thead>
            <tbody className="font-body font-bold text-[#1A1A1A]">
              {/* Row 1 */}
              <tr>
                <td className="p-4 md:p-6 border-b-2 border-[#1A1A1A]/10 text-lg">Structured Curriculum</td>
                <td className="p-4 md:p-6 border-b-2 border-[#1A1A1A]/10 text-center bg-white border-r-2 border-l-2"><X className="mx-auto text-red-500 opacity-50" /></td>
                <td className="p-4 md:p-6 border-b-2 border-[#1A1A1A]/10 text-center bg-white border-r-2"><Minus className="mx-auto text-yellow-500" /></td>
                <td className="p-4 md:p-6 border-b-2 border-[#1A1A1A] text-center bg-[#F2E8DC] border-r-4 border-l-4"><Check className="mx-auto text-[#4A6FA5] stroke-[3px]" /></td>
              </tr>
              {/* Row 2 */}
              <tr>
                <td className="p-4 md:p-6 border-b-2 border-[#1A1A1A]/10 text-lg">Video Analysis</td>
                <td className="p-4 md:p-6 border-b-2 border-[#1A1A1A]/10 text-center bg-white border-r-2 border-l-2"><X className="mx-auto text-red-500 opacity-50" /></td>
                <td className="p-4 md:p-6 border-b-2 border-[#1A1A1A]/10 text-center bg-white border-r-2"><X className="mx-auto text-red-500 opacity-50" /></td>
                <td className="p-4 md:p-6 border-b-2 border-[#1A1A1A] text-center bg-[#F2E8DC] border-r-4 border-l-4"><Check className="mx-auto text-[#4A6FA5] stroke-[3px]" /></td>
              </tr>
              {/* Row 3 */}
              <tr>
                <td className="p-4 md:p-6 border-b-2 border-[#1A1A1A]/10 text-lg">Fight IQ Breakdown</td>
                <td className="p-4 md:p-6 border-b-2 border-[#1A1A1A]/10 text-center bg-white border-r-2 border-l-2"><X className="mx-auto text-red-500 opacity-50" /></td>
                <td className="p-4 md:p-6 border-b-2 border-[#1A1A1A]/10 text-center bg-white border-r-2"><Minus className="mx-auto text-yellow-500" /></td>
                <td className="p-4 md:p-6 border-b-2 border-[#1A1A1A] text-center bg-[#F2E8DC] border-r-4 border-l-4"><Check className="mx-auto text-[#4A6FA5] stroke-[3px]" /></td>
              </tr>
              {/* Row 4 */}
              <tr>
                <td className="p-4 md:p-6 border-b-2 border-[#1A1A1A]/10 text-lg">Community Access</td>
                <td className="p-4 md:p-6 border-b-2 border-[#1A1A1A]/10 text-center bg-white border-r-2 border-l-2"><Check className="mx-auto text-green-500 opacity-50" /></td>
                <td className="p-4 md:p-6 border-b-2 border-[#1A1A1A]/10 text-center bg-white border-r-2"><Check className="mx-auto text-green-500 opacity-50" /></td>
                <td className="p-4 md:p-6 border-b-2 border-[#1A1A1A] text-center bg-[#F2E8DC] border-r-4 border-l-4"><Check className="mx-auto text-[#4A6FA5] stroke-[3px]" /></td>
              </tr>
              {/* Row 5 */}
              <tr>
                <td className="p-4 md:p-6 text-lg font-display uppercase">Cost</td>
                <td className="p-4 md:p-6 text-center bg-white border-r-2 border-l-2 border-b-2 border-[#1A1A1A]">Free (but costly in time)</td>
                <td className="p-4 md:p-6 text-center bg-white border-r-2 border-b-2 border-[#1A1A1A]">$150-200/mo</td>
                <td className="p-4 md:p-6 text-center bg-[#F2E8DC] border-r-4 border-l-4 border-b-4 border-[#1A1A1A] text-[#1A1A1A]">$30/mo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
