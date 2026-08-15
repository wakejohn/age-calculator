import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from './components/Header';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultSection } from './components/ResultSection';
import { HowItWorks } from './components/HowItWorks';
import { EducationalContent } from './components/EducationalContent';
import { ExampleCalculations } from './components/ExampleCalculations';
import { FAQSection } from './components/FAQSection';
import { RelatedCalculations } from './components/RelatedCalculations';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { AdSpace } from './components/AdSpace';
import { TrustPagesModal, TrustPageType } from './components/TrustPagesModal';

import { AgeInputs, AgeResult, ValidationResult, ExamplePreset } from './types';
import {
  calculateAge,
  validateAgeInputs,
  getTodayDateString,
  getCurrentTimeString,
  formatNumber,
} from './utils/ageCalculator';
import { injectStructuredData } from './utils/seo';
import { FAQ_DATA } from './data/calculatorData';

export default function App() {
  const [inputs, setInputs] = useState<AgeInputs>(() => ({
    dateOfBirth: '2000-01-01',
    timeOfBirth: '00:00',
    calculateAsOf: getTodayDateString(),
    calculateAsOfTime: getCurrentTimeString(),
    includeTime: false,
    isLiveTicking: false,
  }));

  const [validation, setValidation] = useState<ValidationResult>({ isValid: true });
  const [result, setResult] = useState<AgeResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeTrustPage, setActiveTrustPage] = useState<TrustPageType | null>(null);
  const [highlightTrigger, setHighlightTrigger] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Inject JSON-LD Schema for SEO on mount
  useEffect(() => {
    injectStructuredData(FAQ_DATA);
  }, []);

  // Show Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Perform Calculation
  const handleCalculate = useCallback((isUserAction = false) => {
    const val = validateAgeInputs(inputs);
    setValidation(val);

    if (!val.isValid) {
      setResult(null);
      return;
    }

    const calculated = calculateAge(inputs);
    setResult(calculated);

    if (isUserAction) {
      setHighlightTrigger(Date.now());
      setTimeout(() => {
        const el = document.getElementById('result-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  }, [inputs]);

  const handleUserCalculate = useCallback(() => {
    handleCalculate(true);
  }, [handleCalculate]);

  // Run calculation automatically on load or when inputs change
  useEffect(() => {
    handleCalculate(false);
  }, [handleCalculate]);

  // Real-time ticking timer effect when live mode enabled
  useEffect(() => {
    if (inputs.isLiveTicking && result) {
      timerRef.current = setInterval(() => {
        // Update calculateAsOf time to current second if calculate as of is today
        if (inputs.calculateAsOf === getTodayDateString()) {
          setInputs(prev => ({
            ...prev,
            calculateAsOfTime: getCurrentTimeString(),
          }));
        }
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [inputs.isLiveTicking, inputs.calculateAsOf, result]);

  // Reset Handler
  const handleReset = () => {
    setInputs({
      dateOfBirth: '',
      timeOfBirth: '00:00',
      calculateAsOf: getTodayDateString(),
      calculateAsOfTime: getCurrentTimeString(),
      includeTime: false,
      isLiveTicking: false,
    });
    setValidation({ isValid: true });
    setResult(null);
    setCopied(false);
    setShared(false);
  };

  // Select Example Preset
  const handleSelectExample = (preset: ExamplePreset) => {
    setInputs(prev => ({
      ...prev,
      dateOfBirth: preset.dateOfBirth,
      calculateAsOf: preset.calculateAsOf,
    }));
    scrollToSection('calculator-section');
  };

  // Copy Result Summary
  const handleCopyResult = () => {
    if (!result) return;
    const text = `Age:
${result.years} Years, ${result.months} Months, ${result.days} Days

Total Months:
${formatNumber(result.totalMonths)}

Total Weeks:
${formatNumber(result.totalWeeks)}

Total Days:
${formatNumber(result.totalDays)}

Next Birthday:
${result.nextBirthdayFormatted}

Days Until Next Birthday:
${result.daysUntilNextBirthday}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('Calculation result copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  // Share Result
  const handleShareResult = async () => {
    if (!result) return;
    const shareData = {
      title: 'Age Calculation Result',
      text: `I am ${result.years} years, ${result.months} months, and ${result.days} days old (${formatNumber(result.totalDays)} total days lived)! Calculate yours free:`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShared(true);
        setTimeout(() => setShared(false), 2500);
      } catch {
        navigator.clipboard.writeText(window.location.href);
        showToast('App link copied to clipboard!');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      showToast('App share link copied to clipboard!');
      setTimeout(() => setShared(false), 2500);
    }
  };

  // Scroll Helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Header / Navbar */}
      <Header onScrollToSection={scrollToSection} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        {/* Page Hero Header Title */}
        <section className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100/80 text-indigo-800 text-xs font-bold border border-indigo-200 shadow-sm">
            <span>✨ 100% Free • Fast • Precise Calendar Math</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight leading-tight">
            Online Age Calculator
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Calculate your exact age in years, months, days, total hours, minutes, and seconds. Complete with leap year precision and next birthday countdown.
          </p>
        </section>

        {/* Top AdSpace Placement Container */}
        <AdSpace slotId="top-banner-slot" />

        {/* Core Calculator Inputs Card */}
        <div id="calculator-section">
          <CalculatorForm
            inputs={inputs}
            setInputs={setInputs}
            validation={validation}
            onCalculate={handleUserCalculate}
            onReset={handleReset}
            onCopyResult={handleCopyResult}
            onShareResult={handleShareResult}
            copied={copied}
            shared={shared}
            isCalculated={!!result}
          />
        </div>

        {/* Results Section */}
        {result && (
          <ResultSection
            result={result}
            isLiveTicking={inputs.isLiveTicking}
            highlightTrigger={highlightTrigger}
          />
        )}

        {/* Mid-Page AdSpace Placement Container */}
        <AdSpace slotId="mid-content-slot" />

        {/* Comprehensive Educational SEO Content Sections 1 - 8 */}
        <EducationalContent />

        {/* How It Works Quick Visual Section */}
        <div id="how-it-works-section">
          <HowItWorks />
        </div>

        {/* Example Calculations Section 9 */}
        <div id="examples-section">
          <ExampleCalculations onSelectExample={handleSelectExample} />
        </div>

        {/* FAQ Section 10 */}
        <div id="faq-section">
          <FAQSection />
        </div>

        {/* Related Useful Calculations Section 11 */}
        <div id="related-section">
          <RelatedCalculations />
        </div>

        {/* Bottom AdSpace Placement Container */}
        <AdSpace slotId="bottom-content-slot" />
      </main>

      {/* Footer */}
      <Footer 
        onScrollToSection={scrollToSection} 
        onOpenTrustPage={page => setActiveTrustPage(page)} 
      />

      {/* Trust Pages Modal (About, Contact, Privacy, Terms) */}
      <TrustPagesModal 
        activePage={activeTrustPage} 
        onClose={() => setActiveTrustPage(null)} 
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} />
    </div>
  );
}
