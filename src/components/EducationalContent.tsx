import React from 'react';
import { Calculator, Clock, Calendar, HelpCircle, CheckCircle2, BookOpen, Layers } from 'lucide-react';

export const EducationalContent: React.FC = () => {
  return (
    <div className="space-y-12 text-slate-800 leading-relaxed">
      {/* 1. What Is an Age Calculator? */}
      <section id="what-is-age-calculator" className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 text-indigo-600 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Core Concept</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 tracking-tight">
          What Is an Age Calculator?
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          An <strong>Age Calculator</strong> is an online digital utility designed to determine the precise interval of time elapsed between an individual's Date of Birth (DOB) and a specific target date (such as today's date).
        </p>
        <p className="text-sm sm:text-base text-slate-600">
          While traditional age counting typically expresses age in whole years (e.g., "I am 28 years old"), a modern Age Calculator provides a complete time breakdown in <strong>years, months, days, total weeks, hours, minutes, and seconds</strong>. It serves as an essential tool for personal milestones, legal verification, medical documentation, school enrollment, and official administrative planning.
        </p>
      </section>

      {/* 2. How Does an Age Calculator Work? */}
      <section id="how-does-it-work" className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 text-indigo-600 font-bold text-xs uppercase tracking-wider">
          <Calculator className="w-4 h-4" />
          <span>Algorithm & Execution</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 tracking-tight">
          How Does an Age Calculator Work?
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          An Age Calculator operates by executing standard calendar subtraction between two timestamp points in history. Rather than using simplified averages (such as assuming every month has 30.4375 days or every year has 365 days), a precise calculator follows localized calendar rules:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <h3 className="font-bold text-slate-900 text-sm font-heading mb-1">Exact Month Lengths</h3>
            <p className="text-xs text-slate-600">
              Factors in whether a month has 28, 29, 30, or 31 days during calendar borrowing operations.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <h3 className="font-bold text-slate-900 text-sm font-heading mb-1">Leap Year Adjustments</h3>
            <p className="text-xs text-slate-600">
              Detects leap years containing February 29 (366 days) across the date range.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <h3 className="font-bold text-slate-900 text-sm font-heading mb-1">Client-Side Computation</h3>
            <p className="text-xs text-slate-600">
              Executes date math instantaneously inside your browser engine without sending data to servers.
            </p>
          </div>
        </div>
      </section>

      {/* 3. How Age Is Calculated */}
      <section id="how-age-is-calculated" className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 text-indigo-600 font-bold text-xs uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Math Breakdown</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 tracking-tight">
          How Age Is Calculated
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          In Western calendar standards (Gregorian calendar), age increases on your birthday each year. When calculating exact age down to months and days, subtraction occurs sequentially:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-700">
          <li><strong>Step 1 (Day Subtraction):</strong> Compare target day with birth day. If target day is smaller, borrow days from the previous month.</li>
          <li><strong>Step 2 (Month Subtraction):</strong> Compare target month with birth month. If target month is smaller, borrow 12 months from the target year.</li>
          <li><strong>Step 3 (Year Subtraction):</strong> Subtract birth year from adjusted target year.</li>
        </ol>
      </section>

      {/* 4. Age in Years, Months, and Days */}
      <section id="age-in-years-months-days" className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 tracking-tight">
          Age in Years, Months, and Days
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          The <strong>Years, Months, and Days</strong> format is the primary universal expression of human age. It reflects human lifecycle stages cleanly:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700">
          <li><strong>Years:</strong> Full annual cycles completed since birth.</li>
          <li><strong>Months:</strong> Additional complete calendar months elapsed since your last birthday.</li>
          <li><strong>Days:</strong> Remaining days passed since your monthly birthday anniversary.</li>
        </ul>
      </section>

      {/* 5. Age in Months */}
      <section id="age-in-months" className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 tracking-tight">
          Age in Months
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Calculating total age strictly in cumulative months is particularly important for pediatric healthcare, infant development tracking, and early childhood milestone benchmarks.
        </p>
        <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs sm:text-sm text-indigo-950 font-mono">
          Total Months = (Years × 12) + Remaining Months
        </div>
        <p className="text-xs text-slate-500">
          Example: An adult aged 25 years and 4 months has lived a total of <strong>304 months</strong>.
        </p>
      </section>

      {/* 6. Age in Weeks */}
      <section id="age-in-weeks" className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 tracking-tight">
          Age in Weeks
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Measuring age in total weeks provides a consistent 7-day cyclical metric. It is widely used in pregnancy progress tracking, fitness training blocks, and life progress mapping.
        </p>
        <p className="text-xs sm:text-sm text-slate-700">
          Because a standard calendar year has 52 weeks plus 1 day (or 2 days in a leap year), multiplying age in years by 52 yields a quick estimate, but our calculator computes total exact days divided by 7 for 100% accuracy.
        </p>
      </section>

      {/* 7. Age in Days */}
      <section id="age-in-days" className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 tracking-tight">
          Age in Days
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Your total age in days counts every single 24-hour sun cycle lived since the day you were born. Reaching milestones in total days—such as <strong>10,000 days alive</strong> (around 27 years and 4 months)—has become a popular personal celebration event.
        </p>
      </section>

      {/* 8. How to Calculate Age Manually */}
      <section id="how-to-calculate-manually" className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 text-indigo-600 font-bold text-xs uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>Manual Step-by-Step Guide</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 tracking-tight">
          How to Calculate Age Manually
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          To calculate your age manually without a digital tool, follow this simple example:
        </p>
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-3 font-mono text-slate-800">
          <p><strong>Scenario:</strong> Birth Date = October 15, 1998 | Target Date = August 10, 2026</p>
          <hr className="border-slate-200" />
          <p>1. Target Date: Year 2026, Month 8 (August), Day 10</p>
          <p>2. Birth Date: Year 1998, Month 10 (October), Day 15</p>
          <p>3. Days: 10 - 15 is negative, so borrow 1 month (July has 31 days) → (10 + 31) - 15 = <strong>26 Days</strong></p>
          <p>4. Months: Adjusted target month is 7. 7 - 10 is negative, so borrow 1 year (12 months) → (7 + 12) - 10 = <strong>9 Months</strong></p>
          <p>5. Years: Adjusted target year is 2025. 2025 - 1998 = <strong>27 Years</strong></p>
          <p className="text-indigo-700 font-bold"><strong>Final Result:</strong> 27 Years, 9 Months, 26 Days</p>
        </div>
      </section>
    </div>
  );
};
