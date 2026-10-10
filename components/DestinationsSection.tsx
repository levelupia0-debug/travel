/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo } from 'react';
import { Destination } from '../types';
import { DESTINATIONS } from '../constants';

interface DestinationsSectionProps {
  onSelectDestination: (destination: Destination) => void;
  onBookForDestination: (destName: string) => void;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  onSelectDestination,
  onBookForDestination,
}) => {
  const [activeRegion, setActiveRegion] = useState('All');

  const regions = ['All', 'Europe', 'Asia', 'North America', 'Middle East', 'Oceania'];

  const filteredDestinations = useMemo(() => {
    if (activeRegion === 'All') return DESTINATIONS;
    return DESTINATIONS.filter((d) => d.region === activeRegion);
  }, [activeRegion]);

  return (
    <section id="destinations" className="py-32 px-6 md:px-12 bg-[#F5F2EB]">
      <div className="max-w-[1800px] mx-auto">
        {/* Header Area */}
        <div className="flex flex-col items-center text-center mb-24 space-y-8">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#A8A29E]">
            Global Portfolio
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-[#2C2A26] leading-tight">
            Curated Destinations
          </h2>
          <p className="max-w-xl text-[#5D5A53] font-light text-base md:text-lg leading-relaxed">
            Consular guidelines, required document audits, and entry advisory for distinguished international travel.
          </p>

          {/* Minimal Underlined Filter */}
          <div className="flex flex-wrap justify-center gap-8 pt-4 border-t border-[#D6D1C7]/50 w-full max-w-2xl">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setActiveRegion(reg)}
                className={`text-xs uppercase tracking-widest pb-1 border-b transition-all duration-300 ${
                  activeRegion === reg
                    ? 'border-[#2C2A26] text-[#2C2A26]'
                    : 'border-transparent text-[#A8A29E] hover:text-[#2C2A26]'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {/* Large Grid matching Aura ProductGrid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
          {filteredDestinations.map((destination) => (
            <div
              key={destination.id}
              className="group flex flex-col gap-6 cursor-pointer"
              onClick={() => onSelectDestination(destination)}
            >
              {/* Aspect 4:5 image container */}
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#EBE7DE]">
                <img
                  src={destination.imageUrl}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105 sepia-[0.08]"
                  loading="lazy"
                />

                {/* Minimalist Quick View Badge on Hover */}
                <div className="absolute inset-0 bg-[#2C2A26]/0 group-hover:bg-[#2C2A26]/10 transition-colors duration-500 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0">
                    <span className="bg-white/95 backdrop-blur text-[#2C2A26] px-6 py-3 rounded-full text-xs uppercase tracking-widest font-medium shadow-sm">
                      View Dossier
                    </span>
                  </div>
                </div>

                {destination.isPopular && (
                  <div className="absolute top-4 right-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#2C2A26] bg-[#F5F2EB]/90 backdrop-blur px-3 py-1">
                      Priority Advisory
                    </span>
                  </div>
                )}
              </div>

              {/* Centered Editorial Typography */}
              <div className="text-center">
                <h3 className="text-2xl font-serif font-medium text-[#2C2A26] mb-1 group-hover:opacity-70 transition-opacity">
                  {destination.name}
                </h3>
                <p className="text-sm font-light text-[#5D5A53] mb-2 tracking-wide">
                  {destination.region} · {destination.country}
                </p>
                <span className="text-xs text-[#A8A29E] uppercase tracking-widest block font-light">
                  {destination.advisoryFee}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Consular Discretion Notice */}
        <div className="mt-28 pt-8 border-t border-[#D6D1C7] text-center max-w-3xl mx-auto">
          <p className="text-xs text-[#78716C] font-light leading-relaxed">
            Consular decisions are rendered solely by government embassies and authorized biometric centers. LevelFlight provides institutional file auditing and advisory support.
          </p>
        </div>
      </div>
    </section>
  );
};
