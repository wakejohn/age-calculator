import React from 'react';
import { Calendar, HelpCircle, ArrowRight, CheckCircle2, Shield, Calculator, Clock } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works-section" className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100 mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Calculation Methodology</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 tracking-tight">
          How Does the Age Calculator Work?
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-3xl">
          Calculating exact age requires more than simply dividing total days by 365. Because standard months vary between 28, 29, 30, and 31 days, and leap years occur every four years, our calculator uses rigorous calendar math for 100% precision.
        </p>
      </div>

      {/* Difference Between Age Units Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Age in Years */}
        <div className="p-5 bg-slate-50 rounded-xl border border-slate-200/70 hover:border-indigo-200 transition-all">
          <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm mb-3">
            01
          </div>
          <h3 className="text-base font-bold text-slate-900 font-heading">Age in Years</h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            Represents the total number of full solar revolutions around the sun completed between your Date of Birth and the target date.
          </p>
        </div>

        {/* Age in Months */}
        <div className="p-5 bg-slate-50 rounded-xl border border-slate-200/70 hover:border-indigo-200 transition-all">
          <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm mb-3">
            02
          </div>
          <h3 className="text-base font-bold text-slate-900 font-heading">Age in Months</h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            Calculated by counting full calendar months passed since your birth date. If the day of the target month is prior to your birthday, the prior month is borrowed.
          </p>
        </div>

        {/* Age in Weeks */}
        <div className="p-5 bg-slate-50 rounded-xl border border-slate-200/70 hover:border-indigo-200 transition-all">
          <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm mb-3">
            03
          </div>
          <h3 className="text-base font-bold text-slate-900 font-heading">Age in Weeks</h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            The total number of 7-day cycles lived. Total days are divided by 7, leaving the exact remaining days in the current week.
          </p>
        </div>

        {/* Age in Days */}
        <div className="p-5 bg-slate-50 rounded-xl border border-slate-200/70 hover:border-indigo-200 transition-all">
          <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm mb-3">
            04
          </div>
          <h3 className="text-base font-bold text-slate-900 font-heading">Age in Days & Seconds</h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            The cumulative total of 24-hour periods elapsed. Total days are multiplied by 24 for hours, 60 for minutes, and 60 for seconds.
          </p>
        </div>
      </div>

      {/* Step by Step Algorithm Explanation */}
      <div className="bg-indigo-50/60 rounded-xl p-6 border border-indigo-100">
        <h3 className="text-lg font-bold font-heading text-slate-900 flex items-center gap-2 mb-3">
          <CheckCircle2 className="w-5 h-5 text-indigo-600" />
          The Precise Calendar Subtraction Algorithm
        </h3>
        <ol className="space-y-3 text-xs sm:text-sm text-slate-700">
          <li className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
            <span>
              <strong>Subtract Days First:</strong> If the target day is smaller than the birth day, we borrow the exact number of days from the preceding month (e.g. 28/29 for Feb, 30 for Apr, 31 for Jan).
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
            <span>
              <strong>Subtract Months Second:</strong> If the target month is smaller than the birth month, we borrow 12 months from the target year and decrement the year.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
            <span>
              <strong>Subtract Years Last:</strong> Finally, we subtract the birth year from the adjusted target year to obtain the exact age in years, months, and days.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">4</span>
            <span>
              <strong>Leap Year Handling:</strong> For individuals born on February 29 (Leap Day), birthdays in non-leap target years are observed on February 28 according to standard mathematical guidelines.
            </span>
          </li>
        </ol>
      </div>
    </section>
  );
};
