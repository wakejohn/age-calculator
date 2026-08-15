export interface AgeInputs {
  dateOfBirth: string; // YYYY-MM-DD
  timeOfBirth?: string; // HH:mm
  calculateAsOf: string; // YYYY-MM-DD
  calculateAsOfTime?: string; // HH:mm
  includeTime: boolean;
  isLiveTicking: boolean;
}

export interface AgeResult {
  // Main exact breakdown
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;

  // Cumulative totals
  totalMonths: number;
  totalWeeks: number;
  remainingDaysInWeek: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;

  // Next Birthday stats
  nextBirthdayDate: Date;
  nextBirthdayFormatted: string;
  nextBirthdayDayOfWeek: string;
  daysUntilNextBirthday: number;
  monthsUntilNextBirthday: number;
  remainingDaysUntilNextBirthday: number;
  turningAge: number;
  progressToNextBirthdayPercent: number;
  isBirthdayToday?: boolean;

  // Personal Fun Facts & Details
  dayOfWeekBorn: string;
  isLeapYearBirth: boolean;
  zodiacSign: string;
  zodiacSymbol: string;
  chineseZodiac: string;
  birthstone: string;
  
  // Estimates
  heartbeatsEstimate: number;
  breathsEstimate: number;
  sleepHoursEstimate: number;
}

export interface ValidationResult {
  isValid: boolean;
  dobError?: string;
  asOfError?: string;
}

export interface ExamplePreset {
  id: string;
  title: string;
  description: string;
  dateOfBirth: string;
  calculateAsOf: string;
  category: 'birthday' | 'leap-year' | 'custom-date' | 'milestone';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface RelatedTool {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge: string;
}
