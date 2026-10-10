/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { Calendar, Menu, X, Phone, Compass } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onBookClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    if (currentView.type !== 'home') {
      onNavigate({ type: 'home' });
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || currentView.type !== 'home'
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-[#D6D1C7]/70 py-3.5'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Typographical Wordmark */}
        <button
          onClick={() => scrollTo('destinations')}
          className="text-left group flex flex-col focus:outline-none shrink-0"
        >
          <span
            className={`text-base font-serif tracking-[0.22em] font-normal transition-colors ${
              isScrolled ? 'text-[#2C2A26]' : 'text-[#FAF8F5]'
            }`}
          >
            LEVEL<span className="font-light opacity-80">FLIGHT</span>
          </span>
          <span
            className={`text-[9px] font-mono tracking-[0.25em] uppercase transition-colors ${
              isScrolled ? 'text-[#8B734B]' : 'text-[#EAE5D9]/80'
            }`}
          >
            Consular Advisory
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm">
          <button
            onClick={() => scrollTo('destinations')}
            className={`transition-colors font-medium tracking-wide ${
              isScrolled
                ? 'text-[#2C2A26] hover:text-[#8B734B]'
                : 'text-[#FAF8F5] hover:text-[#EAE5D9] drop-shadow-sm'
            }`}
          >
            Destinations
          </button>
          <button
            onClick={() => scrollTo('services')}
            className={`transition-colors font-medium tracking-wide ${
              isScrolled
                ? 'text-[#2C2A26] hover:text-[#8B734B]'
                : 'text-[#FAF8F5] hover:text-[#EAE5D9] drop-shadow-sm'
            }`}
          >
            Visa & Services
          </button>
          <button
            onClick={() => scrollTo('how-it-works')}
            className={`transition-colors font-medium tracking-wide ${
              isScrolled
                ? 'text-[#2C2A26] hover:text-[#8B734B]'
                : 'text-[#FAF8F5] hover:text-[#EAE5D9] drop-shadow-sm'
            }`}
          >
            How It Works
          </button>
          <button
            onClick={() => scrollTo('about')}
            className={`transition-colors font-medium tracking-wide ${
              isScrolled
                ? 'text-[#2C2A26] hover:text-[#8B734B]'
                : 'text-[#FAF8F5] hover:text-[#EAE5D9] drop-shadow-sm'
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => scrollTo('offices')}
            className={`transition-colors font-medium tracking-wide ${
              isScrolled
                ? 'text-[#2C2A26] hover:text-[#8B734B]'
                : 'text-[#FAF8F5] hover:text-[#EAE5D9] drop-shadow-sm'
            }`}
          >
            Advisory & Contact
          </button>
          <button
            onClick={() => scrollTo('faq')}
            className={`transition-colors font-medium tracking-wide ${
              isScrolled
                ? 'text-[#2C2A26] hover:text-[#8B734B]'
                : 'text-[#FAF8F5] hover:text-[#EAE5D9] drop-shadow-sm'
            }`}
          >
            FAQ
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Book Consultation CTA */}
          <button
            onClick={onBookClick}
            className={`px-6 py-2.5 text-xs font-medium uppercase tracking-widest transition-all duration-300 flex items-center gap-2 active:scale-95 ${
              isScrolled
                ? 'bg-[#2C2A26] hover:bg-[#1C1917] text-[#FAF8F5] shadow-sm'
                : 'border border-[#FAF8F5]/80 hover:bg-[#FAF8F5] text-[#FAF8F5] hover:text-[#2C2A26] backdrop-blur-sm'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Book Consultation
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center justify-end w-full gap-2">
          <button
            onClick={onBookClick}
            className={`p-2 text-xs font-medium transition-colors ${
              isScrolled
                ? 'bg-[#2C2A26] text-[#FAF8F5]'
                : 'border border-[#FAF8F5]/80 text-[#FAF8F5]'
            }`}
            aria-label="Book appointment"
          >
            <Calendar className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 transition-colors ${
              isScrolled ? 'text-navy-900 hover:text-gold-600' : 'text-ivory-100 hover:text-gold-300'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-[#FAF8F5] text-[#2C2A26] border-t border-[#D6D1C7] px-6 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-3 text-sm font-medium">
            <button
              onClick={() => scrollTo('destinations')}
              className="text-left py-2 hover:text-[#8B734B] transition-colors border-b border-[#E6E1D6]"
            >
              Destinations
            </button>
            <button
              onClick={() => scrollTo('services')}
              className="text-left py-2 hover:text-[#8B734B] transition-colors border-b border-[#E6E1D6]"
            >
              Visa & Services
            </button>
            <button
              onClick={() => scrollTo('how-it-works')}
              className="text-left py-2 hover:text-[#8B734B] transition-colors border-b border-[#E6E1D6]"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="text-left py-2 hover:text-[#8B734B] transition-colors border-b border-[#E6E1D6]"
            >
              About Us
            </button>
            <button
              onClick={() => scrollTo('offices')}
              className="text-left py-2 hover:text-[#8B734B] transition-colors border-b border-[#E6E1D6]"
            >
              Advisory & Contact
            </button>
            <button
              onClick={() => scrollTo('faq')}
              className="text-left py-2 hover:text-[#8B734B] transition-colors border-b border-[#E6E1D6]"
            >
              FAQ
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full py-3.5 bg-[#2C2A26] hover:bg-[#1C1917] text-[#FAF8F5] text-xs font-medium uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Schedule Agency Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
