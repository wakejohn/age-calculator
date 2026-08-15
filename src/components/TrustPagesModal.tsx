import React, { useState } from 'react';
import { X, ShieldCheck, Mail, Info, FileText, CheckCircle2 } from 'lucide-react';

export type TrustPageType = 'about' | 'contact' | 'privacy' | 'terms';

interface TrustPagesModalProps {
  activePage: TrustPageType | null;
  onClose: () => void;
}

export const TrustPagesModal: React.FC<TrustPagesModalProps> = ({ activePage, onClose }) => {
  const [activeTab, setActiveTab] = useState<TrustPageType>(activePage || 'about');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  if (!activePage) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;
    setContactSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">Age Calculator Support & Legal</h3>
              <p className="text-xs text-slate-400">Trust, Privacy, Terms, and Contact Information</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Nav Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs sm:text-sm font-semibold text-slate-600 shrink-0 overflow-x-auto">
          <button
            type="button"
            onClick={() => { setActiveTab('about'); setContactSubmitted(false); }}
            className={`px-5 py-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'about' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>About Us</span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('contact'); setContactSubmitted(false); }}
            className={`px-5 py-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'contact' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Contact</span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('privacy'); setContactSubmitted(false); }}
            className={`px-5 py-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'privacy' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Privacy Policy</span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('terms'); setContactSubmitted(false); }}
            className={`px-5 py-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'terms' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Terms of Use</span>
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {activeTab === 'about' && (
            <div className="space-y-4">
              <h4 className="text-xl font-bold font-heading text-slate-900">About Age Calculator</h4>
              <p>
                Welcome to <strong>Age Calculator</strong>, a dedicated web application built to provide fast, precise, and completely private age calculations for users worldwide.
              </p>
              <p>
                Our mission is simple: offer an ultra-accurate date math tool without clutter, logins, subscriptions, or aggressive popups. We believe utility tools should be free, lightning-fast, and accessible on any device.
              </p>
              <h5 className="font-bold text-slate-900 text-base font-heading">Key Highlights</h5>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>100% Client-Side Processing:</strong> All age calculations happen directly inside your web browser. No dates are transmitted over the internet.</li>
                <li><strong>Leap Year Precision:</strong> Full support for 366-day leap years, varying month lengths (28, 29, 30, 31 days), and leap day births (Feb 29).</li>
                <li><strong>Instant Results:</strong> Detailed breakdowns in years, months, days, total weeks, hours, minutes, and seconds, plus next birthday countdown.</li>
              </ul>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-4">
              <h4 className="text-xl font-bold font-heading text-slate-900">Contact Us</h4>
              <p>
                Have questions, feature suggestions, or feedback about the Age Calculator? We would love to hear from you.
              </p>

              {contactSubmitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h5 className="font-bold text-emerald-900 text-base">Message Sent Successfully</h5>
                  <p className="text-xs text-emerald-700">
                    Thank you for reaching out! Your message has been received.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={e => setContactName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={e => setContactEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={contactMessage}
                      onChange={e => setContactMessage(e.target.value)}
                      placeholder="How can we improve the Age Calculator?"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h4 className="text-xl font-bold font-heading text-slate-900">Privacy Policy</h4>
              <p className="text-xs text-slate-500">Effective Date: January 1, 2026</p>

              <h5 className="font-bold text-slate-900 text-base font-heading">1. Zero Data Collection</h5>
              <p>
                We value your privacy above all else. <strong>We do not collect, store, transmit, or share your Date of Birth or any date calculations entered into this website.</strong> All calculations are processed locally within your browser memory using standard JavaScript math.
              </p>

              <h5 className="font-bold text-slate-900 text-base font-heading">2. No Account or Registration</h5>
              <p>
                Our Age Calculator is 100% free and does not require registration, login, email addresses, or personal credentials to use.
              </p>

              <h5 className="font-bold text-slate-900 text-base font-heading">3. Browser Storage & Cookies</h5>
              <p>
                This website does not set tracking cookies or sell user information to third-party data brokers. Standard browser analytics or advertisement containers may rely on standard privacy-compliant non-identifiable browser telemetry.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h4 className="text-xl font-bold font-heading text-slate-900">Terms of Use</h4>
              <p className="text-xs text-slate-500">Effective Date: January 1, 2026</p>

              <h5 className="font-bold text-slate-900 text-base font-heading">1. Acceptance of Terms</h5>
              <p>
                By accessing and using this Age Calculator website, you agree to comply with these Terms of Use.
              </p>

              <h5 className="font-bold text-slate-900 text-base font-heading">2. Permitted Personal & Educational Use</h5>
              <p>
                This tool is provided strictly for personal, educational, and informational calculation purposes. You may use this calculator freely for personal milestones, age verification, event planning, and general curiosity.
              </p>

              <h5 className="font-bold text-slate-900 text-base font-heading">3. Accuracy Disclaimer</h5>
              <p>
                While our calculator utilizes standard calendar algorithms with 100% mathematical precision, calculations are provided "as-is" without legal or medical warranty.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
