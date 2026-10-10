/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { AGENCY_OFFICES } from '../constants';

interface OfficesAndContactProps {
  onBookOffice: (officeId: string) => void;
}

export const OfficesAndContact: React.FC<OfficesAndContactProps> = ({ onBookOffice }) => {
  const [selectedOffice, setSelectedOffice] = useState(AGENCY_OFFICES[0]);

  return (
    <section id="offices" className="py-32 px-6 md:px-12 bg-[#F5F2EB] border-t border-[#D6D1C7]">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-24">
          <div className="md:w-1/2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#A8A29E] block mb-4">
              Physical Presence
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-[#2C2A26] leading-tight">
              Our Advisory Offices
            </h2>
          </div>
          <div className="md:w-1/2 max-w-xl">
            <p className="text-lg text-[#5D5A53] font-light leading-relaxed">
              We welcome clients in confidential, private meeting suites located in prime metropolitan hubs. All consultations are conducted by scheduled appointment.
            </p>
          </div>
        </div>

        {/* City Filter Tabs */}
        <div className="flex flex-wrap gap-8 pb-4 mb-16 border-b border-[#D6D1C7]">
          {AGENCY_OFFICES.map((office) => (
            <button
              key={office.id}
              onClick={() => setSelectedOffice(office)}
              className={`text-sm uppercase tracking-widest pb-3 border-b-2 transition-all duration-300 ${
                selectedOffice.id === office.id
                  ? 'border-[#2C2A26] text-[#2C2A26] font-medium'
                  : 'border-transparent text-[#A8A29E] hover:text-[#2C2A26]'
              }`}
            >
              {office.city} ({office.country})
            </button>
          ))}
        </div>

        {/* Selected Office Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-[#FAF8F5] p-10 md:p-16 border border-[#D6D1C7]/60">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#8B734B] block mb-2">
                Executive Agency Suite
              </span>
              <h3 className="text-3xl md:text-4xl font-serif text-[#2C2A26] font-normal">
                {selectedOffice.name}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs pt-6 border-t border-[#E6E1D6]">
              <div className="space-y-1.5">
                <span className="font-mono uppercase text-[#A8A29E] block text-[10px]">
                  Physical Address
                </span>
                <p className="text-[#2C2A26] text-sm font-medium leading-relaxed">
                  {selectedOffice.address}
                </p>
                <p className="text-[#78716C] font-light">
                  {selectedOffice.transit}
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="font-mono uppercase text-[#A8A29E] block text-[10px]">
                  Hours & Access
                </span>
                <p className="text-[#2C2A26] font-mono text-xs leading-relaxed">
                  {selectedOffice.hours}
                </p>
                <p className="text-[#78716C] font-light">
                  Private suites / By prior reservation
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="font-mono uppercase text-[#A8A29E] block text-[10px]">
                  Direct Telephone
                </span>
                <p className="text-[#2C2A26] font-mono text-sm">
                  {selectedOffice.phone}
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="font-mono uppercase text-[#A8A29E] block text-[10px]">
                  Direct Correspondence
                </span>
                <p className="text-[#2C2A26] font-mono text-xs">
                  {selectedOffice.email}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E6E1D6]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#A8A29E] block mb-3">
                Resident Advisory Specialists
              </span>
              <div className="space-y-2">
                {selectedOffice.advisors.map((adv, idx) => (
                  <div key={idx} className="text-xs text-[#2C2A26] font-light flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-[#8B734B] rounded-full shrink-0" />
                    <span>{adv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between bg-[#EBE7DE] p-8 md:p-12 border border-[#D6D1C7] h-full space-y-8">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#78716C] block mb-3">
                Advisory Protocol
              </span>
              <h4 className="text-2xl font-serif text-[#2C2A26] mb-4">
                Schedule a Visit in {selectedOffice.city}
              </h4>
              <p className="text-xs text-[#5D5A53] font-light leading-relaxed mb-6">
                Each consultation is conducted in a private executive suite with dedicated time to inspect original certificates, passport stamps, and visa eligibility criteria.
              </p>
            </div>

            <button
              onClick={() => onBookOffice(selectedOffice.id)}
              className="w-full py-5 bg-[#2C2A26] hover:bg-[#1C1917] text-[#FAF8F5] uppercase tracking-widest text-xs font-medium transition-colors text-center"
            >
              Reserve Suite in {selectedOffice.city}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
