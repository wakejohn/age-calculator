import React from 'react';
import { EXAMPLE_PRESETS } from '../data/calculatorData';
import { ExamplePreset } from '../types';
import { Sparkles, Calendar, ArrowRight, Play } from 'lucide-react';

interface ExampleCalculationsProps {
  onSelectExample: (preset: ExamplePreset) => void;
}

export const ExampleCalculations: React.FC<ExampleCalculationsProps> = ({ onSelectExample }) => {
  return (
    <section id="examples-section" className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-semibold border border-violet-100 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Scenarios</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 tracking-tight">
          Example Calculations
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-1">
          Click any example below to load its exact dates directly into the Age Calculator.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {EXAMPLE_PRESETS.map(example => (
          <div
            key={example.id}
            onClick={() => onSelectExample(example)}
            className="group cursor-pointer bg-slate-50 hover:bg-indigo-50/50 p-5 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-600 bg-indigo-100/80 px-2 py-0.5 rounded-full">
                  {example.category}
                </span>
                <Play className="w-3.5 h-3.5 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0.5" />
              </div>

              <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                {example.title}
              </h3>

              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                {example.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>DOB: {example.dateOfBirth}</span>
              <span className="text-indigo-600 font-semibold group-hover:underline flex items-center gap-1">
                Try <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
