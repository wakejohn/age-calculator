import React from 'react';
import { Calendar, ShieldCheck, Sparkles, Clock } from 'lucide-react';

interface HeaderProps {
  onScrollToSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onScrollToSection }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => onScrollToSection('calculator-section')} 
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="font-heading font-bold text-xl tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              Age Calculator
            </span>
            <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
              100% Free
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button 
            onClick={() => onScrollToSection('calculator-section')} 
            className="hover:text-indigo-600 transition-colors py-1"
          >
            Calculator
          </button>
          <button 
            onClick={() => onScrollToSection('how-it-works-section')} 
            className="hover:text-indigo-600 transition-colors py-1"
          >
            How It Works
          </button>
          <button 
            onClick={() => onScrollToSection('examples-section')} 
            className="hover:text-indigo-600 transition-colors py-1"
          >
            Examples
          </button>
          <button 
            onClick={() => onScrollToSection('faq-section')} 
            className="hover:text-indigo-600 transition-colors py-1"
          >
            FAQ
          </button>
          <button 
            onClick={() => onScrollToSection('related-section')} 
            className="hover:text-indigo-600 transition-colors py-1"
          >
            Related Tools
          </button>
        </nav>

        {/* Header Right Action & Privacy Badge */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Browser-Based & Private</span>
          </div>

          <button
            onClick={() => onScrollToSection('calculator-section')}
            className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm shadow-indigo-600/20 transition-all flex items-center gap-1.5"
          >
            <Clock className="w-4 h-4" />
            <span>Calculate Now</span>
          </button>
        </div>
      </div>
    </header>
  );
};
