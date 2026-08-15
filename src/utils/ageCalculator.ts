import { AgeInputs, AgeResult, ValidationResult } from '../types';

/**
 * Returns number of days in a given month of a specific year.
 * @param year full year (e.g. 2026)
 * @param month 0-indexed month (0 = Jan, 11 = Dec)
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Checks if a given year is a leap year.
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Validates year, month, and day numeric values.
 */
export function isValidDateParts(year: number, month: number, day: number): boolean {
  if (isNaN(year) || isNaN(month) || isNaN(day)) return false;
  if (year < 1 || year > 9999) return false;
  if (month < 1 || month > 12) return false;
  const maxDays = getDaysInMonth(year, month - 1);
  if (day < 1 || day > maxDays) return false;
  return true;
}

/**
 * Adds full months to a date, clamping day to max days in target month.
 */
export function addMonthsClamped(date: Date, monthsToAdd: number, originalTargetDay: number): Date {
  const y = date.getFullYear();
  const m = date.getMonth();

  const totalMonths = m + monthsToAdd;
  const newY = y + Math.floor(totalMonths / 12);
  const newM = ((totalMonths % 12) + 12) % 12;

  const maxDays = getDaysInMonth(newY, newM);
  const newD = Math.min(originalTargetDay, maxDays);

  return new Date(newY, newM, newD, date.getHours(), date.getMinutes(), date.getSeconds());
}

/**
 * Adds full years to a date, clamping Feb 29 to Feb 28 in non-leap target year.
 */
export function addYearsClamped(date: Date, yearsToAdd: number, originalTargetDay: number): Date {
  const newY = date.getFullYear() + yearsToAdd;
  const m = date.getMonth();
  const maxDays = getDaysInMonth(newY, m);
  const newD = Math.min(originalTargetDay, maxDays);

  return new Date(newY, m, newD, date.getHours(), date.getMinutes(), date.getSeconds());
}

/**
 * Validates the inputs provided to the age calculator.
 */
export function validateAgeInputs(inputs: AgeInputs): ValidationResult {
  if (!inputs.dateOfBirth || inputs.dateOfBirth.trim() === '') {
    return {
      isValid: false,
      dobError: 'Please select or enter a valid Date of Birth.',
    };
  }

  if (!inputs.calculateAsOf || inputs.calculateAsOf.trim() === '') {
    return {
      isValid: false,
      asOfError: 'Please select or enter a valid "Calculate As Of" date.',
    };
  }

  const dobParts = inputs.dateOfBirth.split('-').map(Number);
  if (dobParts.length !== 3 || !isValidDateParts(dobParts[0], dobParts[1], dobParts[2])) {
    return {
      isValid: false,
      dobError: 'The Date of Birth entered is invalid.',
    };
  }

  const asOfParts = inputs.calculateAsOf.split('-').map(Number);
  if (asOfParts.length !== 3 || !isValidDateParts(asOfParts[0], asOfParts[1], asOfParts[2])) {
    return {
      isValid: false,
      asOfError: 'The "Calculate As Of" date entered is invalid.',
    };
  }

  const dobTimeStr = inputs.includeTime && inputs.timeOfBirth ? inputs.timeOfBirth : '00:00';
  const asOfTimeStr = inputs.includeTime && inputs.calculateAsOfTime ? inputs.calculateAsOfTime : '00:00';

  const [dobY, dobM, dobD] = dobParts;
  const [dobH, dobMin] = dobTimeStr.split(':').map(Number);

  const [asOfY, asOfM, asOfD] = asOfParts;
  const [asOfH, asOfMin] = asOfTimeStr.split(':').map(Number);

  const dobDate = new Date(dobY, dobM - 1, dobD, dobH, dobMin, 0);
  const asOfDate = new Date(asOfY, asOfM - 1, asOfD, asOfH, asOfMin, 0);

  if (isNaN(dobDate.getTime())) {
    return {
      isValid: false,
      dobError: 'The Date of Birth entered is invalid.',
    };
  }

  if (isNaN(asOfDate.getTime())) {
    return {
      isValid: false,
      asOfError: 'The "Calculate As Of" date entered is invalid.',
    };
  }

  const now = new Date();
  // Allow 1 day tolerance for timezone differences
  if (dobDate.getTime() > now.getTime() + 86400000) {
    return {
      isValid: false,
      dobError: 'Date of Birth cannot be in the future.',
    };
  }

  if (asOfDate.getTime() < dobDate.getTime()) {
    return {
      isValid: false,
      asOfError: '"Calculate As Of" date cannot be earlier than your Date of Birth.',
    };
  }

  return { isValid: true };
}

/**
 * Computes exact age breakdown and comprehensive statistics.
 */
export function calculateAge(inputs: AgeInputs): AgeResult {
  const [dobY, dobM, dobD] = inputs.dateOfBirth.split('-').map(Number);
  const [asOfY, asOfM, asOfD] = inputs.calculateAsOf.split('-').map(Number);

  const dobTimeStr = inputs.includeTime && inputs.timeOfBirth ? inputs.timeOfBirth : '00:00';
  const asOfTimeStr = inputs.includeTime && inputs.calculateAsOfTime ? inputs.calculateAsOfTime : '00:00';

  const [dobH, dobMin] = dobTimeStr.split(':').map(Number);
  const [asOfH, asOfMin] = asOfTimeStr.split(':').map(Number);

  const dobDate = new Date(dobY, dobM - 1, dobD, dobH, dobMin, 0);
  const asOfDate = new Date(asOfY, asOfM - 1, asOfD, asOfH, asOfMin, 0);

  const originalBirthDay = dobD;

  // 1. Calculate Full Years
  let candidateYears = asOfY - dobY;
  let workingDate = addYearsClamped(dobDate, candidateYears, originalBirthDay);

  if (workingDate.getTime() > asOfDate.getTime()) {
    candidateYears -= 1;
    workingDate = addYearsClamped(dobDate, candidateYears, originalBirthDay);
  }
  const year = Math.max(0, candidateYears);

  // 2. Calculate Full Months from workingDate
  let month = 0;
  while (true) {
    const nextMonthDate = addMonthsClamped(workingDate, 1, originalBirthDay);
    if (nextMonthDate.getTime() <= asOfDate.getTime()) {
      month += 1;
      workingDate = nextMonthDate;
    } else {
      break;
    }
  }

  // 3. Calculate Days, Hours, Minutes, Seconds from remaining time
  const remainingDiffMs = Math.max(0, asOfDate.getTime() - workingDate.getTime());
  const day = Math.floor(remainingDiffMs / (1000 * 60 * 60 * 24));
  const remMsAfterDays = remainingDiffMs % (1000 * 60 * 60 * 24);

  const hr = Math.floor(remMsAfterDays / (1000 * 60 * 60));
  const remMsAfterHours = remMsAfterDays % (1000 * 60 * 60);

  const min = Math.floor(remMsAfterHours / (1000 * 60));
  const sec = Math.floor((remMsAfterHours % (1000 * 60)) / 1000);

  // 4. Cumulative Total Calculations
  const diffMs = Math.max(0, asOfDate.getTime() - dobDate.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  const totalWeeks = Math.floor(totalDays / 7);
  const remainingDaysInWeek = totalDays % 7;
  const totalMonths = year * 12 + month;

  // 5. Next Birthday Calculation
  let targetBdayYear = asOfY;
  let targetBdayDay = (dobM === 2 && dobD === 29)
    ? (isLeapYear(targetBdayYear) ? 29 : 28)
    : dobD;

  let nextBdayDate = new Date(targetBdayYear, dobM - 1, targetBdayDay, dobH, dobMin, 0);

  // Check if birthday on target date is today
  const isBirthdayToday = (
    asOfY === targetBdayYear &&
    asOfM === dobM &&
    asOfD === targetBdayDay
  );

  // If next birthday date is strictly earlier than target date (or today), roll to next year
  if (nextBdayDate.getTime() < asOfDate.getTime() || isBirthdayToday) {
    targetBdayYear = asOfY + 1;
    targetBdayDay = (dobM === 2 && dobD === 29)
      ? (isLeapYear(targetBdayYear) ? 29 : 28)
      : dobD;
    nextBdayDate = new Date(targetBdayYear, dobM - 1, targetBdayDay, dobH, dobMin, 0);
  }

  const msToNextBday = Math.max(0, nextBdayDate.getTime() - asOfDate.getTime());
  const daysUntilNextBirthday = isBirthdayToday ? 0 : Math.max(0, Math.ceil(msToNextBday / (1000 * 60 * 60 * 24)));

  // Calculate breakdown for months & days until next birthday
  let tempBdayWorking = new Date(asOfDate.getTime());
  let monthsUntilNextBirthday = 0;
  while (!isBirthdayToday) {
    const nextM = addMonthsClamped(tempBdayWorking, 1, targetBdayDay);
    if (nextM.getTime() <= nextBdayDate.getTime()) {
      monthsUntilNextBirthday += 1;
      tempBdayWorking = nextM;
    } else {
      break;
    }
  }
  const remainingDaysUntilNextBirthday = isBirthdayToday
    ? 0
    : Math.max(0, Math.floor((nextBdayDate.getTime() - tempBdayWorking.getTime()) / (1000 * 60 * 60 * 24)));

  const turningAge = isBirthdayToday ? year : year + 1;

  // Progress through current age cycle
  let lastBdayYear = targetBdayYear - 1;
  let lastBdayDay = (dobM === 2 && dobD === 29)
    ? (isLeapYear(lastBdayYear) ? 29 : 28)
    : dobD;
  const lastBdayDate = new Date(lastBdayYear, dobM - 1, lastBdayDay, dobH, dobMin, 0);

  const totalBdayCycleMs = nextBdayDate.getTime() - lastBdayDate.getTime();
  const elapsedInCycleMs = asOfDate.getTime() - lastBdayDate.getTime();
  const progressToNextBirthdayPercent = Math.min(
    100,
    Math.max(0, Math.round((elapsedInCycleMs / totalBdayCycleMs) * 100))
  );

  // Personal metadata
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeekBorn = daysOfWeek[dobDate.getDay()];
  const isLeapYearBirth = isLeapYear(dobY);

  const nextBirthdayFormatted = nextBdayDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const nextBirthdayDayOfWeek = daysOfWeek[nextBdayDate.getDay()];

  const { sign: zodiacSign, symbol: zodiacSymbol } = getZodiacSign(dobM, dobD);
  const chineseZodiac = getChineseZodiac(dobY);
  const birthstone = getBirthstone(dobM);

  // Estimates
  const heartbeatsEstimate = totalMinutes * 75; // average 75 bpm
  const breathsEstimate = totalMinutes * 16; // average 16 breaths/min
  const sleepHoursEstimate = Math.round(totalDays * 8); // average 8 hours/day

  return {
    years: year,
    months: month,
    days: day,
    hours: hr,
    minutes: min,
    seconds: sec,

    totalMonths,
    totalWeeks,
    remainingDaysInWeek,
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds,

    nextBirthdayDate: nextBdayDate,
    nextBirthdayFormatted,
    nextBirthdayDayOfWeek,
    daysUntilNextBirthday,
    monthsUntilNextBirthday,
    remainingDaysUntilNextBirthday,
    turningAge,
    progressToNextBirthdayPercent,
    isBirthdayToday,

    dayOfWeekBorn,
    isLeapYearBirth,
    zodiacSign,
    zodiacSymbol,
    chineseZodiac,
    birthstone,

    heartbeatsEstimate,
    breathsEstimate,
    sleepHoursEstimate,
  };
}

/**
 * Returns Western Zodiac Sign and Unicode Symbol.
 */
function getZodiacSign(month: number, day: number): { sign: string; symbol: string } {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { sign: 'Aries', symbol: '♈' };
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { sign: 'Taurus', symbol: '♉' };
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { sign: 'Gemini', symbol: '♊' };
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { sign: 'Cancer', symbol: '♋' };
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { sign: 'Leo', symbol: '♌' };
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { sign: 'Virgo', symbol: '♍' };
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { sign: 'Libra', symbol: '♎' };
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { sign: 'Scorpio', symbol: '♏' };
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { sign: 'Sagittarius', symbol: '♐' };
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { sign: 'Capricorn', symbol: '♑' };
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { sign: 'Aquarius', symbol: '♒' };
  return { sign: 'Pisces', symbol: '♓' };
}

/**
 * Returns Chinese Zodiac animal based on birth year.
 */
function getChineseZodiac(year: number): string {
  const animals = [
    'Monkey 🐒', 'Rooster 🐓', 'Dog 🐕', 'Pig 🐖',
    'Rat 🐀', 'Ox 🐂', 'Tiger 🐅', 'Rabbit 🐇',
    'Dragon 🐉', 'Snake 🐍', 'Horse 🐎', 'Goat 🐐'
  ];
  return animals[year % 12];
}

/**
 * Returns traditional birthstone for the birth month.
 */
function getBirthstone(month: number): string {
  const stones = [
    'Garnet', 'Amethyst', 'Aquamarine', 'Diamond',
    'Emerald', 'Pearl', 'Ruby', 'Peridot',
    'Sapphire', 'Opal', 'Topaz', 'Turquoise'
  ];
  return stones[month - 1] || 'Quartz';
}

/**
 * Formats standard numbers with commas for clean readability (e.g., 1,234,567).
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Returns today's date in YYYY-MM-DD local format.
 */
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Returns current time in HH:mm local format.
 */
export function getCurrentTimeString(): string {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}
