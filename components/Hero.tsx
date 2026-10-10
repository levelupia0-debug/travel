/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Calendar, Compass } from 'lucide-react';

interface HeroProps {
  onBookAppointment: () => void;
  onExploreDestinations: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onBookAppointment,
  onExploreDestinations,
}) => {
  return (
    <section className="relative w-full h-screen min-h-[720px] overflow-hidden bg-[#2C2A26]">
      {/* Real High-Resolution Architectural & Prestige Metropolitan Landscape */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&q=85&w=2400"
          alt="International travel and global architecture"
          className="w-full h-full object-cover brightness-[0.78] contrast-[1.08]"
        />
        {/* Soft elegant vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C2A26] via-[#2C2A26]/40 to-black/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col justify-center items-center text-center">
        <div className="max-w-3xl space-y-6 animate-fade-in-up">
          <div className="inline-block">
            <span className="text-[11px] font-mono uppercase tracking-[0.28em] text-[#EAE5D9]/90 drop-shadow-sm">
              Consular & International Travel Advisory · United States
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-normal text-[#FAF8F5] tracking-tight leading-[1.05] drop-shadow-sm">
            Travel, <span className="italic font-light text-[#EAE5D9]">elevated.</span>
          </h1>

          <p className="max-w-xl mx-auto text-base sm:text-lg text-[#FAF8F5]/90 font-light leading-relaxed">
            Private travel consultation and consular visa advisory across New York, Washington D.C., Miami, and Los Angeles.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onBookAppointment}
              className="w-full sm:w-auto px-8 py-4 bg-[#FAF8F5] hover:bg-white text-[#2C2A26] font-medium text-xs tracking-widest uppercase transition-all duration-200 shadow-md flex items-center justify-center gap-2 active:scale-95"
            >
              <Calendar className="w-4 h-4 text-[#8B734B]" />
              <span>Book Appointment</span>
            </button>

            <button
              onClick={onExploreDestinations}
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 text-[#FAF8F5] border border-white/50 font-medium text-xs tracking-widest uppercase transition-all duration-200 backdrop-blur-sm flex items-center justify-center gap-2 active:scale-95"
            >
              <Compass className="w-4 h-4 text-[#FAF8F5]" />
              <span>Explore Destinations</span>
            </button>
          </div>
        </div>

        {/* Quiet Bottom Metric & Accreditation Strip */}
        <div className="absolute bottom-8 left-6 right-6 hidden md:flex items-center justify-center gap-8 text-xs text-[#EAE5D9]/75 font-mono uppercase tracking-wider border-t border-white/15 pt-5 max-w-4xl mx-auto">
          <span>4 Agency Suites</span>
          <span aria-hidden="true" className="text-white/40">·</span>
          <span>In-Person & Encrypted Video</span>
          <span aria-hidden="true" className="text-white/40">·</span>
          <span>Consular Dossier Auditing</span>
          <span aria-hidden="true" className="text-white/40">·</span>
          <span>Accredited US Advisors</span>
        </div>
      </div>
    </section>
  );
};
