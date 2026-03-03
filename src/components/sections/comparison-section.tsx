'use client';

import React from 'react';
import { Check, X, Minus } from 'lucide-react';

const ComparisonSection = () => {
  return (
    <section className="relative px-4 py-24 md:px-12 bg-[#F5F5DC]">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl uppercase leading-none text-[#0F172A] mb-4">
            Why Other Methods Fail
          </h2>
          <p className="font-body text-xl text-[#0F172A]/80 max-w-2xl mx-auto">
            Stop wasting time with methods that don't translate to real fighting skill.
          </p>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto pb-8">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr>
                <th className="p-4 md:p-6 bg-transparent"></th>
                <th className="p-4 md:p-6 bg-white border-4 border-[#0F172A] text-center w-1/4 md:w-1/3 shadow-[8px_8px_0px_0px_rgba(26,26,26,0.1)]">
                  <div className="font-display text-xl uppercase text-[#0F172A]/50">YouTube</div>
                </th>
                <th className="p-4 md:p-6 bg-white border-4 border-[#0F172A] text-center w-1/4 md:w-1/3 shadow-[8px_8px_0px_0px_rgba(26,26,26,0.1)]">
                  <div className="font-display text-xl uppercase text-[#0F172A]/50">Local Gym</div>
                </th>
                <th className="p-4 md:p-6 bg-[#0F172A] border-4 border-[#0F172A] text-center w-1/3 md:w-1/3 relative shadow-[8px_8px_0px_0px_#2563EB] transform scale-105 origin-bottom z-10">
                  <div className="absolute top-0 left-0 w-full -mt-8 flex justify-center">
                    <span className="bg-[#2563EB] text-white text-xs font-bold uppercase px-3 py-1 tracking-widest border-2 border-[#0F172A]">Best Value</span>
                  </div>
                  <div className="font-display text-2xl uppercase text-white">Coach Josh</div>
                </th>
              </tr>
            </thead>
            <tbody className="font-body font-bold text-[#0F172A]">
              {/* Row 1 */}
              <tr>
                <td className="p-4 md:p-6 border-b-2 border-[#0F172A]/10 text-lg">Structured Curriculum</td>
                <td className="p-4 md:p-6 border-b-2 border-[#0F172A]/10 text-center bg-white border-r-2 border-l-2"><X className="mx-auto text-red-500 opacity-50" /></td>
                <td className="p-4 md:p-6 border-b-2 border-[#0F172A]/10 text-center bg-white border-r-2"><Minus className="mx-auto text-yellow-500" /></td>
                <td className="p-4 md:p-6 border-b-2 border-[#0F172A] text-center bg-[#FFFFFF] border-r-4 border-l-4"><Check className="mx-auto text-[#2563EB] stroke-[3px]" /></td>
              </tr>
              {/* Row 2 */}
              <tr>
                <td className="p-4 md:p-6 border-b-2 border-[#0F172A]/10 text-lg">Video Analysis</td>
                <td className="p-4 md:p-6 border-b-2 border-[#0F172A]/10 text-center bg-white border-r-2 border-l-2"><X className="mx-auto text-red-500 opacity-50" /></td>
                <td className="p-4 md:p-6 border-b-2 border-[#0F172A]/10 text-center bg-white border-r-2"><X className="mx-auto text-red-500 opacity-50" /></td>
                <td className="p-4 md:p-6 border-b-2 border-[#0F172A] text-center bg-[#FFFFFF] border-r-4 border-l-4"><Check className="mx-auto text-[#2563EB] stroke-[3px]" /></td>
              </tr>
              {/* Row 3 */}
              <tr>
                <td className="p-4 md:p-6 border-b-2 border-[#0F172A]/10 text-lg">Fight IQ Breakdown</td>
                <td className="p-4 md:p-6 border-b-2 border-[#0F172A]/10 text-center bg-white border-r-2 border-l-2"><X className="mx-auto text-red-500 opacity-50" /></td>
                <td className="p-4 md:p-6 border-b-2 border-[#0F172A]/10 text-center bg-white border-r-2"><Minus className="mx-auto text-yellow-500" /></td>
                <td className="p-4 md:p-6 border-b-2 border-[#0F172A] text-center bg-[#FFFFFF] border-r-4 border-l-4"><Check className="mx-auto text-[#2563EB] stroke-[3px]" /></td>
              </tr>
              {/* Row 4 */}
              <tr>
                <td className="p-4 md:p-6 border-b-2 border-[#0F172A]/10 text-lg">Community Access</td>
                <td className="p-4 md:p-6 border-b-2 border-[#0F172A]/10 text-center bg-white border-r-2 border-l-2"><Check className="mx-auto text-green-500 opacity-50" /></td>
                <td className="p-4 md:p-6 border-b-2 border-[#0F172A]/10 text-center bg-white border-r-2"><Check className="mx-auto text-green-500 opacity-50" /></td>
                <td className="p-4 md:p-6 border-b-2 border-[#0F172A] text-center bg-[#FFFFFF] border-r-4 border-l-4"><Check className="mx-auto text-[#2563EB] stroke-[3px]" /></td>
              </tr>
              {/* Row 5 */}
              <tr>
                <td className="p-4 md:p-6 text-lg font-display uppercase">Cost</td>
                <td className="p-4 md:p-6 text-center bg-white border-r-2 border-l-2 border-b-2 border-[#0F172A]">Free (but costly in time)</td>
                <td className="p-4 md:p-6 text-center bg-white border-r-2 border-b-2 border-[#0F172A]">$150-200/mo</td>
                <td className="p-4 md:p-6 text-center bg-[#FFFFFF] border-r-4 border-l-4 border-b-4 border-[#0F172A] text-[#0F172A]">$30/mo</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Stacked View */}
        <div className="md:hidden space-y-8">
          {[
            {
              title: "Structured Curriculum",
              youtube: false,
              gym: "partial",
              josh: true
            },
            {
              title: "Video Analysis",
              youtube: false,
              gym: false,
              josh: true
            },
            {
              title: "Fight IQ Breakdown",
              youtube: false,
              gym: "partial",
              josh: true
            },
            {
              title: "Community Access",
              youtube: true,
              gym: true,
              josh: true
            }
          ].map((item, i) => (
            <div key={i} className="bg-white border-4 border-[#0F172A] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-display text-2xl uppercase mb-4 text-center border-b-2 border-[#0F172A] pb-2">{item.title}</h3>
              <div className="space-y-3 font-bold">
                <div className="flex justify-between items-center opacity-50">
                  <span>YouTube</span>
                  {item.youtube ? <Check className="text-green-500" /> : <X className="text-red-500" />}
                </div>
                <div className="flex justify-between items-center opacity-50">
                  <span>Local Gym</span>
                  {item.gym === 'partial' ? <Minus className="text-yellow-500" /> : (item.gym ? <Check className="text-green-500" /> : <X className="text-red-500" />)}
                </div>
                <div className="flex justify-between items-center bg-[#0F172A] text-[#FFFFFF] p-2 -mx-2">
                  <span className="uppercase tracking-widest text-sm">Coach Josh</span>
                  <Check className="text-[#2563EB] stroke-[3px]" />
                </div>
              </div>
            </div>
          ))}

          {/* Cost Card Mobile */}
          <div className="bg-[#0F172A] text-[#FFFFFF] border-4 border-[#0F172A] p-6 text-center shadow-[4px_4px_0px_0px_#2563EB]">
            <h3 className="font-display text-2xl uppercase mb-4 text-[#2563EB]">Cost Comparison</h3>
            <div className="space-y-4">
              <div>
                <div className="text-xs uppercase opacity-50">YouTube</div>
                <div className="font-bold">Free (Time Cost)</div>
              </div>
              <div>
                <div className="text-xs uppercase opacity-50">Local Gym</div>
                <div className="font-bold">$150-200/mo</div>
              </div>
              <div className="border-t-2 border-[#2563EB] pt-4 mt-4">
                <div className="text-xs uppercase text-[#2563EB] font-bold">Coach Josh</div>
                <div className="font-display text-4xl mt-1">$30/mo</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
