/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { FAQ_ITEMS } from '../constants';

export const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0].id);

  const categories = ['All', 'Appointments', 'Visa Requirements', 'Fees & Policies'];

  const filteredFaqs =
    activeCategory === 'All'
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((f) => f.category === activeCategory);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faq" className="py-32 px-6 md:px-12 bg-[#F5F2EB] border-t border-[#D6D1C7]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#A8A29E] block">
            Clarity & Policies
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#2C2A26] font-normal">
            Frequently Inquired
          </h2>
          <p className="text-[#5D5A53] text-sm md:text-base font-light max-w-lg mx-auto">
            Essential details regarding appointment booking, dossier verification, and consular jurisdiction.
          </p>
        </div>

        {/* Minimal Category tabs */}
        <div className="flex flex-wrap justify-center gap-6 pb-6 mb-12 border-b border-[#D6D1C7]/60">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs uppercase tracking-widest pb-1 border-b transition-all duration-300 ${
                activeCategory === cat
                  ? 'border-[#2C2A26] text-[#2C2A26] font-medium'
                  : 'border-transparent text-[#A8A29E] hover:text-[#2C2A26]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Hairline Accordion */}
        <div className="divide-y divide-[#D6D1C7]">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div key={faq.id} className="py-8 transition-colors">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left flex items-start justify-between gap-6 group"
                  aria-expanded={isOpen}
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#8B734B] block mb-2">
                      {faq.category}
                    </span>
                    <h3 className="text-xl font-serif text-[#2C2A26] group-hover:opacity-75 transition-opacity font-normal">
                      {faq.question}
                    </h3>
                  </div>
                  <span className="text-2xl font-light text-[#A8A29E] group-hover:text-[#2C2A26] transition-colors shrink-0">
                    {isOpen ? '—' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="pt-6 pr-12 text-sm text-[#5D5A53] font-light leading-relaxed animate-fade-in-up">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
