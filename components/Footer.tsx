/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavClick: (targetId: string) => void;
  onBookClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onBookClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2C2A26] text-[#F5F2EB] border-t border-[#44403C]">
      {/* Top Banner CTA */}
      <div className="border-b border-[#44403C] py-20 px-6 md:px-12">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#A8A29E] block mb-3">
              Consultation Advisory · United States
            </span>
            <h3 className="text-3xl md:text-5xl font-serif text-[#F5F2EB] font-normal leading-tight">
              Begin your journey with clarity.
            </h3>
            <p className="text-[#A8A29E] text-sm font-light mt-2">
              Private consultation suites available in New York, Washington D.C., Miami, and Los Angeles.
            </p>
          </div>

          <button
            onClick={onBookClick}
            className="px-8 py-5 bg-[#F5F2EB] hover:bg-white text-[#2C2A26] text-xs font-medium uppercase tracking-widest transition-colors shrink-0 shadow-sm"
          >
            Schedule Consultation
          </button>
        </div>
      </div>

      {/* Main Directory Grid */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-xs">
        {/* Col 1 */}
        <div className="space-y-4">
          <span className="text-lg font-serif tracking-widest uppercase block text-[#F5F2EB]">
            LEVEL<span className="font-light text-[#A8A29E] ml-1">FLIGHT</span>
          </span>
          <p className="text-[#A8A29E] font-light leading-relaxed">
            Consular document auditing, passport compliance, and international travel guidance for distinguished travelers across the United States.
          </p>
          <p className="text-xs font-mono text-[#EAE5D9]">
            contact@levelup-ecosystem.com
          </p>
        </div>

        {/* Col 2 */}
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#A8A29E] block">
            Navigation
          </span>
          <ul className="space-y-2.5 text-[#F5F2EB] font-light">
            <li>
              <button
                onClick={() => onNavClick('destinations')}
                className="hover:text-[#D6D1C7] transition-colors"
              >
                Destinations Portfolio
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavClick('services')}
                className="hover:text-[#D6D1C7] transition-colors"
              >
                Visa & Advisory Services
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavClick('how-it-works')}
                className="hover:text-[#D6D1C7] transition-colors"
              >
                The Protocol
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavClick('about')}
                className="hover:text-[#D6D1C7] transition-colors"
              >
                Our Purpose
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavClick('offices')}
                className="hover:text-[#D6D1C7] transition-colors"
              >
                United States Offices
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavClick('faq')}
                className="hover:text-[#D6D1C7] transition-colors"
              >
                FAQ & Policies
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: US Agency Offices */}
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#A8A29E] block">
            United States Offices
          </span>
          <div className="space-y-3 text-[#A8A29E] font-light">
            <div>
              <strong className="text-[#F5F2EB] block font-normal">New York — Fifth Avenue</strong>
              <span>650 Fifth Avenue, 28th Fl, New York, NY 10019</span>
            </div>
            <div>
              <strong className="text-[#F5F2EB] block font-normal">Washington — Embassy Row</strong>
              <span>1700 K Street NW, Suite 1100, Washington, DC 20006</span>
            </div>
            <div>
              <strong className="text-[#F5F2EB] block font-normal">Miami — Brickell Avenue</strong>
              <span>1101 Brickell Ave, South Tower, Miami, FL 33131</span>
            </div>
            <div>
              <strong className="text-[#F5F2EB] block font-normal">Los Angeles — Beverly Hills</strong>
              <span>9454 Wilshire Blvd, Suite 700, Beverly Hills, CA 90212</span>
            </div>
          </div>
        </div>

        {/* Col 4: Central Contacts */}
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#A8A29E] block">
            Central Reception
          </span>
          <div className="space-y-2 text-[#A8A29E] font-mono">
            <p className="text-sm text-[#F5F2EB]">+1 (212) 890-4420</p>
            <p>contact@levelup-ecosystem.com</p>
            <p>advisory@levelup-ecosystem.com</p>
            <p className="text-[11px] font-sans pt-2 text-[#78716C]">
              Reception open Mon – Fri 09:00 to 18:30 EST. Consultations by scheduled appointment.
            </p>
          </div>
        </div>
      </div>

      {/* Sovereign Notice & Copyright */}
      <div className="border-t border-[#44403C] py-8 px-6 md:px-12 text-[11px] text-[#A8A29E] font-light">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-center md:text-left max-w-3xl">
            LevelFlight is an accredited independent travel advisory and documentation preparation agency. We do not issue visas or make entry decisions; sovereign consulates and immigration departments retain sole authority.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#F5F2EB] transition-colors uppercase font-mono tracking-widest shrink-0"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Clear Template Banner Notice as requested */}
      <div className="border-t border-[#383533] py-4 px-6 md:px-12 text-center text-[11px] text-[#C4BDAF] bg-[#1E1C1A] font-mono tracking-wider">
        WEBSITE TEMPLATE — Powered by LevelUp Ecosystem (<a href="mailto:contact@levelup-ecosystem.com" className="underline hover:text-white transition-colors">contact@levelup-ecosystem.com</a>) · All rights reserved
      </div>
    </footer>
  );
};
