import React, { useState } from 'react';
import { RELATED_TOOLS } from '../data/calculatorData';
import { Cake, CalendarRange, Clock, ArrowRight, Sparkles, Calculator } from 'lucide-react';
import { getDaysInMonth } from '../utils/ageCalculator';

export const RelatedCalculations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // Quick Inline Date Difference state
  const [startDate, setStartDate] = useState('2026-01-01');
  const [endDate, setEndDate] = useState('2026-08-10');
  const [diffResult, setDiffResult] = useState<string | null>(null);

  const calculateDateDiff = () => {
    if (!startDate || !endDate) return;
    const d1 = new Date(startDate);
    const d2 = new Date(endDate);
    const diffMs = Math.abs(d2.getTime() - d1.getTime());
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;
    setDiffResult(`${totalDays} Total Days (${weeks} weeks, ${remainingDays} days)`);
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Cake': return <Cake className="w-5 h-5 text-indigo-600" />;
      case 'CalendarRange': return <CalendarRange className="w-5 h-5 text-indigo-600" />;
      case 'Clock': return <Clock className="w-5 h-5 text-indigo-600" />;
      default: return <Calculator className="w-5 h-5 text-indigo-600" />;
    }
  };

  return (
    <section id="related-section" className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>More Date & Time Utilities</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 tracking-tight">
          Related Calculations & Tools
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-1">
          Explore additional specialized calculators for date intervals, birthdays, and workdays.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {RELATED_TOOLS.map(tool => (
          <div
            key={tool.id}
            className="p-6 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200/80 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-200/60 flex items-center justify-center">
                  {renderIcon(tool.iconName)}
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                  {tool.badge}
                </span>
              </div>

              <h3 className="text-lg font-bold font-heading text-slate-900">
                {tool.title}
              </h3>

              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {tool.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/60">
              {tool.id === 'tool-diff' ? (
                <button
                  type="button"
                  onClick={() => setActiveTab(activeTab === 'diff' ? null : 'diff')}
                  className="w-full text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center justify-center gap-1 py-1"
                >
                  {activeTab === 'diff' ? 'Hide Quick Tool' : 'Try Quick Difference Tool'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="text-xs text-slate-400 font-medium block text-center">
                  Integrated into Age Calculator
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Quick Date Difference Drawer */}
      {activeTab === 'diff' && (
        <div className="mt-4 p-6 bg-indigo-50/70 rounded-2xl border border-indigo-100 animate-fadeIn space-y-4">
          <h4 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
            <CalendarRange className="w-5 h-5 text-indigo-600" />
            Quick Date Difference Tool
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={calculateDateDiff}
              className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
            >
              Calculate Difference
            </button>
            {diffResult && (
              <div className="text-sm font-semibold text-indigo-900">
                Result: <span className="font-bold text-indigo-700">{diffResult}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
