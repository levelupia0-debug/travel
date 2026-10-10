/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface HowItWorksProps {
  onBookClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onBookClick }) => {
  const steps = [
    {
      number: '01',
      title: 'Explore',
      subtitle: 'Identify Requirements',
      description:
        'Discover curated destinations, examine consular requirements, and identify the visa stream tailored to your itinerary.',
    },
    {
      number: '02',
      title: 'Book',
      subtitle: 'Reserve Private Session',
      description:
        'Select your preferred agency office (New York, Washington D.C., Miami, Los Angeles) and reserve an available consultation slot.',
    },
    {
      number: '03',
      title: 'Meet',
      subtitle: 'In-Person Consultation',
      description:
        'Meet your dedicated advisor at our agency office or through private encrypted video to audit all supporting documentation.',
    },
    {
      number: '04',
      title: 'Move Forward',
      subtitle: 'Harmonized Dossier',
      description:
        'Receive your audited document binder, sworn certified translations, and submission schedule with total peace of mind.',
    },
  ];

  return (
    <section id="how-it-works" className="py-32 px-6 md:px-12 bg-[#F5F2EB] border-t border-[#D6D1C7]">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-24">
          <div className="md:w-1/2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#A8A29E] block mb-4">
              The Protocol
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-[#2C2A26] leading-tight">
              A quiet, personal path <br /> to departure.
            </h2>
          </div>
          <div className="md:w-1/2 max-w-xl">
            <p className="text-lg text-[#5D5A53] font-light leading-relaxed">
              We replace bureaucratic ambiguity with thoughtful in-person guidance. Every step is anchored in real availability and verified consular protocols.
            </p>
          </div>
        </div>

        {/* 4 Steps Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="p-8 bg-[#FAF8F5] border border-[#D6D1C7]/60 flex flex-col justify-between min-h-[300px]"
            >
              <div>
                <span className="text-3xl font-serif text-[#A8A29E] font-light block mb-8">
                  {step.number}
                </span>
                <h3 className="text-2xl font-serif text-[#2C2A26] font-normal mb-2">
                  {step.title}
                </h3>
                <span className="text-[11px] font-mono text-[#8B734B] uppercase tracking-wider block mb-4">
                  {step.subtitle}
                </span>
                <p className="text-xs text-[#5D5A53] font-light leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-6 border-t border-[#E6E1D6] mt-6 text-[10px] font-mono uppercase tracking-widest text-[#A8A29E]">
                Phase {step.number}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-12 border-t border-[#D6D1C7] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-serif text-[#2C2A26]">
              Ready to review your upcoming international journey?
            </h3>
            <p className="text-xs text-[#78716C] mt-1 font-light">
              Reserve your private meeting suite with an accredited advisor.
            </p>
          </div>
          <button
            onClick={onBookClick}
            className="py-4 px-8 bg-[#2C2A26] hover:bg-[#1C1917] text-[#FAF8F5] uppercase tracking-widest text-xs font-medium transition-colors shrink-0"
          >
            Schedule Consultation
          </button>
        </div>
      </div>
    </section>
  );
};
