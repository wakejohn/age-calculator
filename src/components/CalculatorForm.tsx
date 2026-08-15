import React from 'react';
import { Calendar, RotateCcw, Copy, Share2, Calculator, Clock, AlertCircle, Sparkles, Check } from 'lucide-react';
import { AgeInputs, ValidationResult } from '../types';
import { getTodayDateString, getCurrentTimeString } from '../utils/ageCalculator';

interface CalculatorFormProps {
  inputs: AgeInputs;
  setInputs: React.Dispatch<React.SetStateAction<AgeInputs>>;
  validation: ValidationResult;
  onCalculate: () => void;
  onReset: () => void;
  onCopyResult: () => void;
  onShareResult: () => void;
  copied: boolean;
  shared: boolean;
  isCalculated: boolean;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  inputs,
  setInputs,
  validation,
  onCalculate,
  onReset,
  onCopyResult,
  onShareResult,
  copied,
  shared,
  isCalculated,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleApplyQuickPreset = (yearsAgo: number) => {
    const today = new Date();
    const dob = new Date(today.getFullYear() - yearsAgo, today.getMonth(), today.getDate());
    const dobStr = dob.toISOString().split('T')[0];
    
    setInputs(prev => ({
      ...prev,
      dateOfBirth: dobStr,
      calculateAsOf: getTodayDateString(),
    }));
  };

  return (
    <div id="calculator-section" className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-6 sm:p-8 relative transition-all">
      <form onSubmit={(e) => { e.preventDefault(); onCalculate(); }}>
        {/* Card Top Title & Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
            <Calculator className="w-6 h-6 text-indigo-600" />
            Enter Date of Birth & Target Date
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Fill in your birthday and click Calculate to get your exact age breakdown.
          </p>
        </div>

        {/* Live Ticking Toggle */}
        <label className="inline-flex items-center gap-2.5 cursor-pointer bg-slate-50 hover:bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 transition-colors self-start sm:self-center">
          <input
            type="checkbox"
            name="isLiveTicking"
            checked={inputs.isLiveTicking}
            onChange={handleInputChange}
            className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
          />
          <Clock className={`w-3.5 h-3.5 ${inputs.isLiveTicking ? 'text-indigo-600 animate-pulse' : 'text-slate-400'}`} />
          <span>Real-time Ticking Clock</span>
        </label>
      </div>

      {/* Inputs Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Date of Birth Input */}
        <div className="space-y-2">
          <label htmlFor="dob-input" className="block text-sm font-semibold text-slate-800 flex items-center justify-between">
            <span>Date of Birth <span className="text-rose-500">*</span></span>
            <span className="text-xs font-normal text-slate-500">YYYY-MM-DD</span>
          </label>
          <div className="relative">
            <input
              id="dob-input"
              type="date"
              name="dateOfBirth"
              value={inputs.dateOfBirth}
              onChange={handleInputChange}
              aria-invalid={!!validation.dobError}
              aria-describedby={validation.dobError ? 'dob-error' : undefined}
              className={`w-full px-4 py-3 bg-slate-50 border ${
                validation.dobError ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-300 focus:ring-indigo-500'
              } rounded-xl text-slate-900 text-base font-medium focus:outline-none focus:ring-2 focus:bg-white transition-all`}
            />
          </div>
          {validation.dobError && (
            <p id="dob-error" role="alert" className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{validation.dobError}</span>
            </p>
          )}
        </div>

        {/* Calculate As Of Date Input */}
        <div className="space-y-2">
          <label htmlFor="as-of-input" className="block text-sm font-semibold text-slate-800 flex items-center justify-between">
            <span>Calculate As Of Date <span className="text-rose-500">*</span></span>
            <span className="text-xs font-normal text-slate-500">Default: Today</span>
          </label>
          <div className="relative">
            <input
              id="as-of-input"
              type="date"
              name="calculateAsOf"
              value={inputs.calculateAsOf}
              onChange={handleInputChange}
              aria-invalid={!!validation.asOfError}
              aria-describedby={validation.asOfError ? 'as-of-error' : undefined}
              className={`w-full px-4 py-3 bg-slate-50 border ${
                validation.asOfError ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-300 focus:ring-indigo-500'
              } rounded-xl text-slate-900 text-base font-medium focus:outline-none focus:ring-2 focus:bg-white transition-all`}
            />
          </div>
          {validation.asOfError && (
            <p id="as-of-error" role="alert" className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{validation.asOfError}</span>
            </p>
          )}
        </div>
      </div>

      {/* Advanced Time Inputs Toggle */}
      <div className="mt-4">
        <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
          <input
            type="checkbox"
            name="includeTime"
            checked={inputs.includeTime}
            onChange={handleInputChange}
            className="w-3.5 h-3.5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
          />
          <span>Include exact time of birth (hours & minutes) for high precision</span>
        </label>

        {inputs.includeTime && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3 p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 animate-fadeIn">
            <div>
              <label htmlFor="time-of-birth" className="block text-xs font-semibold text-slate-700 mb-1">
                Time of Birth (24h or AM/PM)
              </label>
              <input
                id="time-of-birth"
                type="time"
                name="timeOfBirth"
                value={inputs.timeOfBirth || '00:00'}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label htmlFor="as-of-time" className="block text-xs font-semibold text-slate-700 mb-1">
                Target Date Time
              </label>
              <input
                id="as-of-time"
                type="time"
                name="calculateAsOfTime"
                value={inputs.calculateAsOfTime || '12:00'}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Quick Preset Buttons */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
          Quick Shortcuts:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleApplyQuickPreset(18)}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            18 Years Ago
          </button>
          <button
            type="button"
            onClick={() => handleApplyQuickPreset(21)}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            21 Years Ago
          </button>
          <button
            type="button"
            onClick={() => handleApplyQuickPreset(30)}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            30 Years Ago
          </button>
          <button
            type="button"
            onClick={() => handleApplyQuickPreset(50)}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            50 Years Ago
          </button>
          <button
            type="button"
            onClick={() => setInputs(prev => ({ ...prev, dateOfBirth: '2000-01-01' }))}
            className="px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
          >
            Born Jan 1, 2000
          </button>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
        <div className="flex flex-wrap items-center gap-3">
          <button
            id="btn-calculate"
            type="submit"
            className="px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
          >
            <Calculator className="w-5 h-5" />
            <span>Calculate Age</span>
          </button>

          <button
            id="btn-reset"
            type="button"
            onClick={onReset}
            className="px-4 py-3.5 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>

        {/* Secondary Actions: Copy & Share */}
        <div className="flex items-center gap-2">
          <button
            id="btn-copy"
            type="button"
            onClick={onCopyResult}
            disabled={!isCalculated}
            title="Copy age calculation summary to clipboard"
            className={`px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border transition-all flex items-center gap-1.5 ${
              !isCalculated
                ? 'opacity-50 cursor-not-allowed bg-slate-50 border-slate-200 text-slate-400'
                : copied
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400'
            }`}
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Result'}</span>
          </button>

          <button
            id="btn-share"
            type="button"
            onClick={onShareResult}
            disabled={!isCalculated}
            title="Share calculation link"
            className={`px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border transition-all flex items-center gap-1.5 ${
              !isCalculated
                ? 'opacity-50 cursor-not-allowed bg-slate-50 border-slate-200 text-slate-400'
                : shared
                ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>{shared ? 'Shared!' : 'Share'}</span>
          </button>
        </div>
      </div>
    </form>
  </div>
  );
};
