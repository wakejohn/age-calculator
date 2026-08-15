import React from 'react';
import { AgeResult } from '../types';
import { formatNumber } from '../utils/ageCalculator';
import { Calendar, Clock, Cake, Sparkles, Heart, Activity, Moon, Gift, Star, Award, Check } from 'lucide-react';

interface ResultSectionProps {
  result: AgeResult;
  isLiveTicking: boolean;
  highlightTrigger?: number;
}

export const ResultSection: React.FC<ResultSectionProps> = ({ result, isLiveTicking, highlightTrigger }) => {
  const [isHighlighted, setIsHighlighted] = React.useState(false);

  React.useEffect(() => {
    if (highlightTrigger && highlightTrigger > 0) {
      setIsHighlighted(true);
      const timer = setTimeout(() => {
        setIsHighlighted(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [highlightTrigger]);

  return (
    <div id="result-section" className="space-y-6 scroll-mt-20 transition-all duration-500">
      {/* Primary Age Result Hero Banner */}
      <div
        className={`bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl border transition-all duration-700 relative overflow-hidden ${
          isHighlighted
            ? 'ring-4 ring-indigo-400 border-indigo-300 shadow-2xl shadow-indigo-500/40 scale-[1.01]'
            : 'border-indigo-700/30 shadow-indigo-950/20'
        }`}
      >
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {result.isBirthdayToday && (
          <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-400 text-slate-950 text-xs sm:text-sm font-bold rounded-full shadow-lg shadow-amber-400/20 animate-bounce">
            <Gift className="w-4 h-4 fill-slate-950" />
            <span>🎉 Happy Birthday! Today is your birthday!</span>
          </div>
        )}

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Your Age Result is Ready</span>
              </span>
              {isLiveTicking && (
                <span className="px-2.5 py-1 text-[10px] bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 rounded-full flex items-center gap-1.5 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Live Seconds Ticking
                </span>
              )}
            </div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading tracking-tight mt-2 text-white">
              <span className="text-indigo-200">Your Age Is: </span>
              <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-indigo-300">
                {result.years} Years, {result.months} Months, {result.days} Days
              </span>
            </h3>

            {(result.hours > 0 || result.minutes > 0 || result.seconds > 0) && (
              <p className="text-sm sm:text-base text-indigo-200 mt-2 font-mono flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>Exact Time: {result.hours} Hours, {result.minutes} Minutes, {result.seconds} Seconds</span>
              </p>
            )}
          </div>

          {/* Turning Age Milestone Pill */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 shrink-0 text-center sm:text-left">
            <span className="text-xs text-indigo-200 block font-medium">Born On</span>
            <span className="text-lg font-bold text-white block mt-0.5">{result.dayOfWeekBorn}</span>
            <span className="text-xs text-indigo-300/80 block mt-1">
              {result.isLeapYearBirth ? '✨ Born in a Leap Year' : 'Regular Calendar Year'}
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Cumulative Calculations */}
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {/* Total Months */}
          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Total Months</span>
            <span className="text-xl sm:text-2xl font-bold font-heading text-slate-900 block mt-1">
              {formatNumber(result.totalMonths)}
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Months Lived</span>
          </div>

          {/* Total Weeks */}
          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Total Weeks</span>
            <span className="text-xl sm:text-2xl font-bold font-heading text-slate-900 block mt-1">
              {formatNumber(result.totalWeeks)}
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              + {result.remainingDaysInWeek} {result.remainingDaysInWeek === 1 ? 'day' : 'days'}
            </span>
          </div>

          {/* Total Days */}
          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Total Days</span>
            <span className="text-xl sm:text-2xl font-bold font-heading text-indigo-600 block mt-1">
              {formatNumber(result.totalDays)}
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Full Days</span>
          </div>

          {/* Total Hours */}
          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Total Hours</span>
            <span className="text-xl sm:text-2xl font-bold font-heading text-slate-900 block mt-1">
              {formatNumber(result.totalHours)}
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Hours Lived</span>
          </div>

          {/* Total Minutes */}
          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Total Minutes</span>
            <span className="text-xl sm:text-2xl font-bold font-heading text-slate-900 block mt-1">
              {formatNumber(result.totalMinutes)}
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Minutes Lived</span>
          </div>

          {/* Total Seconds */}
          <div className="bg-white rounded-xl p-4 border border-indigo-200 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider block flex items-center justify-between">
              <span>Total Seconds</span>
              {isLiveTicking && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>}
            </span>
            <span className="text-xl sm:text-2xl font-bold font-heading font-mono text-slate-900 block mt-1">
              {formatNumber(result.totalSeconds)}
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              {isLiveTicking ? 'Live updating' : 'Seconds Lived'}
            </span>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 mt-2 italic px-1">
          * Note: Hour, minute, and second totals are mathematically derived from calendar date differences (defaulting to 00:00 midnight) unless exact birth time is enabled above.
        </p>
      </div>

      {/* Two Column Section: Next Birthday & Fun Personal Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Next Birthday Countdown Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-lg shadow-slate-200/40 relative flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
                <Cake className="w-5 h-5 text-indigo-600" />
                Next Birthday Countdown
              </h4>
              <span className="px-2.5 py-1 text-xs font-semibold bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                Turning Age {result.turningAge}
              </span>
            </div>

            <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200/60">
              <span className="text-xs text-slate-500 block font-medium">Next Birthday Date</span>
              <span className="text-lg font-bold text-slate-900 block mt-0.5">{result.nextBirthdayFormatted}</span>
              <span className="text-xs text-slate-500 block mt-1">
                Occurs on a <strong className="text-slate-800">{result.nextBirthdayDayOfWeek}</strong>
              </span>
            </div>

            {/* Countdown Big Metric */}
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold font-heading text-indigo-600">
                {result.daysUntilNextBirthday}
              </span>
              <span className="text-sm font-semibold text-slate-600">
                Days Remaining Until Birthday
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-1">
              Equivalent to <strong className="text-slate-800">{result.monthsUntilNextBirthday} months, {result.remainingDaysUntilNextBirthday} days</strong>.
            </p>

            {/* Progress Bar */}
            <div className="mt-5 space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-slate-600">
                <span>Progress through Age {result.years}</span>
                <span>{result.progressToNextBirthdayPercent}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${result.progressToNextBirthdayPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
            <Gift className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>Mark your calendar for {result.nextBirthdayDayOfWeek}!</span>
          </div>
        </div>

        {/* Fun Personal Stats & Milestones Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-lg shadow-slate-200/40 flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
              <Star className="w-5 h-5 text-indigo-600" />
              Astrological & Personal Stats
            </h4>

            <div className="grid grid-cols-2 gap-3 mt-4">
              {/* Western Zodiac */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xl font-bold">
                  {result.zodiacSymbol}
                </div>
                <div>
                  <span className="text-[11px] font-medium text-slate-500 block">Western Zodiac</span>
                  <span className="text-sm font-bold text-slate-900 block">{result.zodiacSign}</span>
                </div>
              </div>

              {/* Chinese Zodiac */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl font-bold">
                  🐉
                </div>
                <div>
                  <span className="text-[11px] font-medium text-slate-500 block">Chinese Zodiac</span>
                  <span className="text-xs font-bold text-slate-900 block truncate">{result.chineseZodiac}</span>
                </div>
              </div>

              {/* Birthstone */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center text-xl font-bold">
                  💎
                </div>
                <div>
                  <span className="text-[11px] font-medium text-slate-500 block">Birthstone</span>
                  <span className="text-sm font-bold text-slate-900 block">{result.birthstone}</span>
                </div>
              </div>

              {/* Day Born */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-xl font-bold">
                  📅
                </div>
                <div>
                  <span className="text-[11px] font-medium text-slate-500 block">Day Born</span>
                  <span className="text-sm font-bold text-slate-900 block">{result.dayOfWeekBorn}</span>
                </div>
              </div>
            </div>

            {/* Estimates Breakdown */}
            <div className="mt-4 pt-3 space-y-2 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  Estimated Heartbeats:
                </span>
                <span className="font-semibold text-slate-900 font-mono">
                  ~{formatNumber(result.heartbeatsEstimate)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-sky-500" />
                  Estimated Breaths:
                </span>
                <span className="font-semibold text-slate-900 font-mono">
                  ~{formatNumber(result.breathsEstimate)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5 text-indigo-500" />
                  Estimated Sleep Hours:
                </span>
                <span className="font-semibold text-slate-900 font-mono">
                  ~{formatNumber(result.sleepHoursEstimate)} hrs
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 text-[11px] text-slate-400">
            *Estimates based on average adult biological baselines (~75 bpm heartbeat, 16 breaths/min, 8 hrs sleep/day).
          </div>
        </div>
      </div>
    </div>
  );
};
