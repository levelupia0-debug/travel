/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { Destination } from '../types';

interface DestinationDetailProps {
  destination: Destination;
  onBack: () => void;
  onBookAppointment: (destName: string) => void;
}

export const DestinationDetail: React.FC<DestinationDetailProps> = ({
  destination,
  onBack,
  onBookAppointment,
}) => {
  const [activeImage, setActiveImage] = useState<string>(destination.imageUrl);

  return (
    <div className="pt-28 min-h-screen bg-[#F5F2EB] animate-fade-in-up">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pb-24">
        {/* Back navigation */}
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#A8A29E] hover:text-[#2C2A26] transition-colors mb-12"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Destinations
        </button>

        {/* Two-Column Aura Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column: Gallery */}
          <div className="flex flex-col gap-6">
            <div className="w-full aspect-[4/5] bg-[#EBE7DE] overflow-hidden">
              <img
                src={activeImage}
                alt={destination.name}
                className="w-full h-full object-cover sepia-[0.05]"
              />
            </div>

            {destination.gallery && destination.gallery.length > 1 && (
              <div className="flex gap-4">
                {destination.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-24 aspect-[4/5] bg-[#EBE7DE] overflow-hidden border transition-all ${
                      activeImage === img
                        ? 'border-[#2C2A26] opacity-100'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Editorial Dossier Details */}
          <div className="flex flex-col max-w-xl">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#A8A29E] mb-3">
              {destination.region} · {destination.country}
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-[#2C2A26] mb-3 font-normal">
              {destination.name}
            </h1>
            <span className="text-sm font-mono text-[#8B734B] uppercase tracking-wider mb-8 block">
              {destination.advisoryFee}
            </span>

            <p className="text-[#5D5A53] leading-relaxed font-light text-base md:text-lg mb-8 border-b border-[#D6D1C7] pb-8">
              {destination.overview}
            </p>

            {/* Supported Visa Categories */}
            <div className="mb-8 border-b border-[#D6D1C7] pb-8">
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#78716C] mb-4">
                Supported Visa Streams
              </h2>
              <ul className="space-y-3">
                {destination.visaTypes.map((type, idx) => (
                  <li key={idx} className="text-sm text-[#2C2A26] font-light flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-[#8B734B] rounded-full shrink-0" />
                    <span>{type}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Document Checklist */}
            <div className="mb-10 border-b border-[#D6D1C7] pb-8">
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#78716C] mb-4">
                Required In-Person Dossier Checklist
              </h2>
              <ul className="space-y-3">
                {destination.documentChecklist.map((doc, idx) => (
                  <li key={idx} className="text-xs text-[#5D5A53] font-light leading-relaxed flex items-start gap-3">
                    <span className="text-[#A8A29E] font-mono shrink-0">·</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Book CTA */}
            <div>
              <button
                onClick={() => onBookAppointment(destination.name)}
                className="w-full py-5 bg-[#2C2A26] hover:bg-[#1C1917] text-[#FAF8F5] uppercase tracking-widest text-xs font-medium transition-colors shadow-sm"
              >
                Schedule Consultation for {destination.name}
              </button>
              <p className="text-[11px] text-center text-[#A8A29E] font-mono mt-3">
                Private meeting suite reserved at your chosen agency office
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
