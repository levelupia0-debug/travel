/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Video, FileCheck, Shield, Clock, Send, ArrowRight } from 'lucide-react';
import { AGENCY_OFFICES } from '../constants';

interface OfficesAndContactProps {
  onBookOffice: (officeId: string) => void;
}

export const OfficesAndContact: React.FC<OfficesAndContactProps> = ({ onBookOffice }) => {
  const [selectedOffice, setSelectedOffice] = useState(AGENCY_OFFICES[0]);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('contact@levelup-ecosystem.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="offices" className="py-32 px-6 md:px-12 bg-[#F5F2EB] border-t border-[#D6D1C7]">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-20">
          <div className="md:w-1/2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#8B734B] block mb-4">
              Private Advisory & Contact
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-[#2C2A26] leading-tight font-normal">
              Direct Advisory Desks
            </h2>
          </div>
          <div className="md:w-1/2 max-w-xl">
            <p className="text-lg text-[#5D5A53] font-light leading-relaxed">
              LevelFlight operates as an accredited, confidential travel advisory and consular document auditing service. We consult directly via secure video sessions and private correspondence, ensuring total transparency and zero intermediaries.
            </p>
          </div>
        </div>

        {/* Advisory Desk Selector Tabs */}
        <div className="flex flex-wrap gap-8 pb-4 mb-14 border-b border-[#D6D1C7]">
          {AGENCY_OFFICES.map((desk) => (
            <button
              key={desk.id}
              onClick={() => setSelectedOffice(desk)}
              className={`text-xs md:text-sm uppercase tracking-widest pb-3 border-b-2 transition-all duration-300 ${
                selectedOffice.id === desk.id
                  ? 'border-[#2C2A26] text-[#2C2A26] font-medium'
                  : 'border-transparent text-[#A8A29E] hover:text-[#2C2A26]'
              }`}
            >
              {desk.name}
            </button>
          ))}
        </div>

        {/* Selected Desk Details & Direct Contact Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Main Desk Details */}
          <div className="lg:col-span-7 bg-[#FAF8F5] p-8 md:p-14 border border-[#D6D1C7]/70 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#8B734B] block mb-2">
                  Specialized Advisory Division
                </span>
                <h3 className="text-3xl md:text-4xl font-serif text-[#2C2A26] font-normal">
                  {selectedOffice.name}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs pt-6 border-t border-[#E6E1D6]">
                <div className="space-y-1.5">
                  <span className="font-mono uppercase text-[#A8A29E] block text-[10px]">
                    Consultation Channel
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
                    Coverage & Hours
                  </span>
                  <p className="text-[#2C2A26] font-mono text-xs leading-relaxed">
                    {selectedOffice.hours}
                  </p>
                  <p className="text-[#78716C] font-light">
                    Private scheduled sessions
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="font-mono uppercase text-[#A8A29E] block text-[10px]">
                    Direct Correspondence
                  </span>
                  <p className="text-[#2C2A26] font-mono text-sm">
                    {selectedOffice.email}
                  </p>
                  <p className="text-[#78716C] font-light">
                    Direct advisor triage
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="font-mono uppercase text-[#A8A29E] block text-[10px]">
                    Response Commitment
                  </span>
                  <p className="text-[#2C2A26] font-mono text-xs leading-relaxed">
                    Under 24 business hours
                  </p>
                  <p className="text-[#78716C] font-light">
                    Official file docket confirmation
                  </p>
                </div>
              </div>

              {/* Assigned Specialists */}
              <div className="pt-6 border-t border-[#E6E1D6]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A8A29E] block mb-3">
                  Resident Senior Advisors
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

            <div className="pt-8 border-t border-[#E6E1D6]">
              <button
                onClick={() => onBookOffice(selectedOffice.id)}
                className="w-full sm:w-auto px-8 py-4 bg-[#2C2A26] hover:bg-[#1C1917] text-[#FAF8F5] uppercase tracking-widest text-xs font-medium transition-colors inline-flex items-center justify-center gap-2"
              >
                <span>Schedule Consultation on this Desk</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Direct Communication & Contact Card */}
          <div className="lg:col-span-5 bg-[#EBE7DE] p-8 md:p-12 border border-[#D6D1C7] flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#78716C] block mb-3">
                  Direct Inquiries
                </span>
                <h4 className="text-2xl md:text-3xl font-serif text-[#2C2A26] mb-3">
                  Need Personalized Assistance?
                </h4>
                <p className="text-xs text-[#5D5A53] font-light leading-relaxed">
                  Have a specific question regarding international entry policies, visa streams, or dossier requirements? Reach our senior advisory desk directly.
                </p>
              </div>

              {/* Direct Mail Box */}
              <div className="p-5 bg-[#FAF8F5] border border-[#D6D1C7] space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8B734B] block">
                  Official Contact Address
                </span>
                <a
                  href="mailto:contact@levelup-ecosystem.com"
                  className="font-mono text-sm text-[#2C2A26] hover:text-[#8B734B] font-medium block break-all transition-colors"
                >
                  contact@levelup-ecosystem.com
                </a>
                <div className="flex items-center justify-between pt-2 border-t border-[#E6E1D6] text-[11px] text-[#78716C]">
                  <span>Platform: levelup-ecosystem.com</span>
                  <button
                    onClick={handleCopyEmail}
                    className="text-[#2C2A26] hover:underline font-mono text-[10px] uppercase tracking-wider"
                  >
                    {copiedEmail ? 'Copied ✓' : 'Copy Email'}
                  </button>
                </div>
              </div>

              {/* Service Commitments */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-[#5D5A53] font-light">
                  <Shield className="w-4 h-4 text-[#8B734B] shrink-0 mt-0.5" />
                  <span>Strict confidentiality & non-disclosure of personal applicant records.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#5D5A53] font-light">
                  <Clock className="w-4 h-4 text-[#8B734B] shrink-0 mt-0.5" />
                  <span>All scheduled appointments guaranteed with a dedicated advisor.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#5D5A53] font-light">
                  <Video className="w-4 h-4 text-[#8B734B] shrink-0 mt-0.5" />
                  <span>Private encrypted video links issued immediately upon reservation.</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#D6D1C7]/80">
              <a
                href="mailto:contact@levelup-ecosystem.com?subject=Travel%20Advisory%20Inquiry"
                className="w-full py-4 border border-[#2C2A26] hover:bg-[#2C2A26] hover:text-[#FAF8F5] text-[#2C2A26] uppercase tracking-widest text-xs font-medium transition-colors text-center block"
              >
                Send Direct Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
