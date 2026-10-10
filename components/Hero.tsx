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
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#2C2A26]">
      {/* Real High-Resolution Cinematic Photograph */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=85&w=2400"
          alt="International travel in flight"
          className="w-full h-full object-cover brightness-[0.85] contrast-[1.05]"
        />
        {/* Soft elegant vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C2A26]/80 via-transparent to-black/35" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col justify-center items-center text-center">
        <div className="max-w-3xl space-y-6 animate-fade-in-up">
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
      </div>
    </section>
  );
};
