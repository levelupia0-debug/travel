/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="bg-[#EBE7DE] border-t border-[#D6D1C7]">
      {/* Introduction / Story */}
      <div className="py-32 px-6 md:px-12 max-w-[1800px] mx-auto flex flex-col md:flex-row items-start gap-16 md:gap-32">
        <div className="md:w-1/3">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#78716C] block mb-4">
            Our Purpose
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-[#2C2A26] leading-tight">
            Grounded in precision, <br /> dedicated to clarity.
          </h2>
        </div>
        <div className="md:w-2/3 max-w-2xl">
          <p className="text-lg md:text-xl text-[#5D5A53] font-light leading-relaxed mb-8">
            LevelFlight was founded on a simple conviction: preparing for international travel should never feel opaque or overwhelming. In an era of shifting global immigration policies, a single missing document can jeopardize months of planning.
          </p>
          <p className="text-lg md:text-xl text-[#5D5A53] font-light leading-relaxed mb-8">
            We provide private, accredited consular file audits and personalized advisory. Rather than automated shortcuts, we work directly with each traveler through dedicated private video sessions and comprehensive document audits.
          </p>
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600"
            alt="Advisory Meeting Suite"
            className="w-full h-[400px] object-cover grayscale contrast-[0.9] brightness-105 mt-12"
          />
          <p className="text-sm font-medium uppercase tracking-widest text-[#A8A29E] mt-4">
            LevelFlight Private Advisory & Consultation Desk
          </p>
        </div>
      </div>

      {/* Dual Full-bleed Philosophy Blocks matching Aura */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
        <div className="relative h-[400px] lg:h-auto overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600"
            alt="Horizon view"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center p-12 lg:p-24 bg-[#D6D1C7]">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#5D5A53] mb-6">
            Institutional Rigor
          </span>
          <h3 className="text-4xl md:text-5xl font-serif mb-8 text-[#2C2A26] leading-tight">
            Zero ambiguity, <br /> complete compliance.
          </h3>
          <p className="text-lg text-[#5D5A53] font-light leading-relaxed max-w-md">
            Sovereign embassies demand impeccable evidence. We audit every financial certificate, employer attestation, and itinerary line to ensure strict consular alignment before submission.
          </p>
        </div>
      </div>
    </section>
  );
};
