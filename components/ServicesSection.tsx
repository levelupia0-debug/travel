/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { SERVICES } from '../constants';

interface ServicesSectionProps {
  onBookService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onBookService }) => {
  return (
    <section id="services" className="bg-[#EBE7DE] py-32 px-6 md:px-12 border-t border-[#D6D1C7]">
      <div className="max-w-[1800px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-28">
          <div className="md:w-1/2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#78716C] block mb-4">
              Advisory Capabilities
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-[#2C2A26] leading-tight">
              Rigorous preparation, <br /> seamless journeys.
            </h2>
          </div>
          <div className="md:w-1/2 max-w-xl">
            <p className="text-lg text-[#5D5A53] font-light leading-relaxed">
              Every international application is examined with institutional rigor. Our advisors eliminate omissions, verify supporting certificates, and prepare you for official consular appointments.
            </p>
          </div>
        </div>

        {/* Services Editorial List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="bg-[#F5F2EB] p-10 flex flex-col justify-between border border-[#D6D1C7]/60 transition-all duration-300 hover:border-[#2C2A26]"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#A8A29E] pb-4 mb-6 border-b border-[#D6D1C7]">
                  <span>0{index + 1}</span>
                  <span>{service.duration}</span>
                </div>

                <h3 className="text-2xl font-serif text-[#2C2A26] font-normal mb-3">
                  {service.title}
                </h3>
                <p className="text-xs font-mono text-[#8B734B] uppercase tracking-wider mb-6">
                  {service.subtitle}
                </p>
                <p className="text-sm text-[#5D5A53] font-light leading-relaxed mb-8">
                  {service.description}
                </p>

                <div className="space-y-2 mb-8">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#78716C] block">
                    Deliverables:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#5D5A53] font-light">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#A8A29E]">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-[#D6D1C7]">
                <button
                  onClick={() => onBookService(service.title)}
                  className="text-xs font-medium uppercase tracking-widest text-[#2C2A26] hover:text-[#8B734B] transition-colors underline underline-offset-8"
                >
                  Schedule Consultation →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
