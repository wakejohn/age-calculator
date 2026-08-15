import React, { useState } from 'react';
import { FAQ_DATA } from '../data/calculatorData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq-section" className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100 mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 tracking-tight">
          Common Questions About Age Calculations
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-1">
          Everything you need to know about exact age math, calendar algorithms, and privacy.
        </p>
      </div>

      <div className="space-y-3">
        {FAQ_DATA.map(item => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="border border-slate-200 rounded-xl overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggleFAQ(item.id)}
                className="w-full text-left px-5 py-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between gap-4 font-semibold text-slate-900 text-sm sm:text-base transition-colors"
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-indigo-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 py-4 bg-white border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed animate-fadeIn">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
