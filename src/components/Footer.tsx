import React from 'react';
import { Calendar, ShieldCheck, ArrowUp } from 'lucide-react';
import { TrustPageType } from './TrustPagesModal';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenTrustPage: (page: TrustPageType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToSection, onOpenTrustPage }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 mt-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="font-heading font-bold text-xl text-white">Age Calculator</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Fast, free, and precise online Age Calculator. Calculate exact age in years, months, days, total hours, minutes, and seconds with leap year accuracy.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-full w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Client-Side Private • No DOB data saved or transmitted</span>
            </div>
          </div>

          {/* Calculator Features Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-heading">
              Navigation & Guide
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onScrollToSection('calculator-section')} className="hover:text-white transition-colors">
                  Date of Birth Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('what-is-age-calculator')} className="hover:text-white transition-colors">
                  What Is an Age Calculator?
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('how-does-it-work')} className="hover:text-white transition-colors">
                  How Does It Work?
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('how-to-calculate-manually')} className="hover:text-white transition-colors">
                  Manual Calculation Guide
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('faq-section')} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Legal Information */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-heading">
              Trust & Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onOpenTrustPage('about')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onOpenTrustPage('contact')} className="hover:text-white transition-colors">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => onOpenTrustPage('privacy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenTrustPage('terms')} className="hover:text-white transition-colors">
                  Terms of Use
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('related-section')} className="hover:text-white transition-colors">
                  Related Date Tools
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Age Calculator App. Free for everyone. All calculations stay in your browser.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
