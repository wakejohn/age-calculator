import { ExamplePreset, FAQItem, RelatedTool } from '../types';

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How does the Age Calculator calculate age?',
    answer: 'The Age Calculator calculates age by taking your Date of Birth and subtracting it from either today’s date or a selected target date. It uses standard calendar arithmetic that accounts for varying month lengths (28, 29, 30, or 31 days) and leap years directly in your browser without rounding errors.'
  },
  {
    id: 'faq-2',
    question: 'Can I calculate my age on a specific date?',
    answer: 'Yes! You can calculate your age on any past or future date by setting the "Calculate As Of" date field. This is useful for finding out how old you were on a specific historical milestone or how old you will be on a future date like retirement or graduation.'
  },
  {
    id: 'faq-3',
    question: 'How are leap years handled?',
    answer: 'Leap years add a 366th day (February 29) every 4 years. Our algorithm checks every year in the range between your birth date and the target date to ensure February 29 is included when appropriate. For individuals born on February 29, birthdays in non-leap years default to February 28 or March 1 depending on calendar conventions.'
  },
  {
    id: 'faq-4',
    question: 'Can I calculate my age in days?',
    answer: 'Yes. In addition to years, months, and days, the calculator instantly calculates your total cumulative age in days (as well as total weeks, total hours, total minutes, and total seconds lived).'
  },
  {
    id: 'faq-5',
    question: 'Can I calculate my age in months?',
    answer: 'Yes. The result breakdown displays both your exact age in years + months + days, as well as the total cumulative number of months lived (for example, 30 years and 6 months equals 366 total months).'
  },
  {
    id: 'faq-6',
    question: 'How accurate is the Age Calculator?',
    answer: 'The Age Calculator is 100% accurate down to the second. It processes real calendar dates using exact month durations and leap year rules rather than rough averages like 365 or 30.4375 days per month.'
  },
  {
    id: 'faq-7',
    question: 'How do I calculate age manually?',
    answer: 'To calculate age manually, subtract your birth year from the current year. Next, check if your birthday has occurred this year yet; if not, subtract 1 year. For exact months and days, subtract days first (borrowing days from the previous month if needed), then subtract months (borrowing 12 months from the year if needed).'
  },
  {
    id: 'faq-8',
    question: 'Can I calculate the number of days until my next birthday?',
    answer: 'Yes. The result panel automatically features a dedicated "Next Birthday Countdown" showing the exact date, day of the week, total days remaining, and a breakdown of remaining months and days until your next birthday.'
  }
];

export const EXAMPLE_PRESETS: ExamplePreset[] = [
  {
    id: 'ex-1',
    title: 'Standard Birthday',
    description: 'Calculate age for someone born on May 15, 1995 as of today.',
    dateOfBirth: '1995-05-15',
    calculateAsOf: new Date().toISOString().split('T')[0],
    category: 'birthday'
  },
  {
    id: 'ex-2',
    title: 'Leap Year Birthday',
    description: 'Born on Feb 29, 2000 (Leap Day) - calculate age on a non-leap year date.',
    dateOfBirth: '2000-02-29',
    calculateAsOf: '2025-08-10',
    category: 'leap-year'
  },
  {
    id: 'ex-3',
    title: 'Historical Custom Date',
    description: 'Calculate age of someone born in 1969 as of the Y2K Millennium (Jan 1, 2000).',
    dateOfBirth: '1969-07-20',
    calculateAsOf: '2000-01-01',
    category: 'custom-date'
  },
  {
    id: 'ex-4',
    title: 'Newborn Infant Age',
    description: 'Calculate exact weeks and days for an infant born 3 weeks ago.',
    dateOfBirth: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    calculateAsOf: new Date().toISOString().split('T')[0],
    category: 'milestone'
  }
];

export const RELATED_TOOLS: RelatedTool[] = [
  {
    id: 'tool-birthday',
    title: 'Birthday Calculator',
    description: 'Find your day of birth, age milestones (like 10,000 days alive), and famous people who share your birthday.',
    iconName: 'Cake',
    badge: 'Coming Soon'
  },
  {
    id: 'tool-diff',
    title: 'Date Difference Calculator',
    description: 'Calculate the exact interval in years, months, and days between any two custom calendar dates.',
    iconName: 'CalendarRange',
    badge: 'Preview Mode'
  },
  {
    id: 'tool-days',
    title: 'Days Between Dates Calculator',
    description: 'Count business workdays, weekend days, and holidays between two dates.',
    iconName: 'Clock',
    badge: 'Coming Soon'
  }
];
