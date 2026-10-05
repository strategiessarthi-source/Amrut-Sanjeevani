import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth, COUNTRY_CODES, validateEmail, validateMobile } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
  PhoneCall,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  MessageCircle,
  ShieldCheck,
  HeartPulse,
  Leaf,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export const LeadCaptureSection: React.FC = () => {
  const { submitLead } = useAuth();
  const { showToast, generateWhatsAppLink } = useCart();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [mobile, setMobile] = useState('');
  const [wellnessGoal, setWellnessGoal] = useState('Heart Health & Cholesterol Balance');
  const [preferredTime, setPreferredTime] = useState('Morning (9:00 AM - 12:00 PM IST)');
  const [notes, setNotes] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

  const selectedCountry = COUNTRY_CODES.find((c) => c.code === countryCode) || COUNTRY_CODES[0];
  const rawDigits = mobile.replace(/\D/g, '');
  const isMobileValid = validateMobile(rawDigits, selectedCountry.digits);
  const isEmailValid = email ? validateEmail(email) : false;

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const clean = e.target.value.replace(/\D/g, '').slice(0, selectedCountry.digits);
    setMobile(clean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim() || name.trim().length < 2) {
      setErrorMessage('Please enter your full name (minimum 2 characters).');
      return;
    }
    if (!email.trim() || !validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!isMobileValid) {
      setErrorMessage(`Please enter a valid ${selectedCountry.digits}-digit mobile number for ${selectedCountry.country}.`);
      return;
    }

    setIsLoading(true);
    try {
      const res = await submitLead({
        name,
        email,
        countryCode,
        mobile: rawDigits,
        wellnessGoal,
        preferredTime,
        notes,
      });

      setIsLoading(false);
      setSubmittedLeadId(res.leadId);
      showToast('Callback consultation request confirmed!');
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Unable to schedule callback. Please try again or chat via WhatsApp.');
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMobile('');
    setNotes('');
    setSubmittedLeadId(null);
    setErrorMessage(null);
  };

  return (
    <section id="consultation" className="py-20 md:py-28 bg-gradient-to-b from-[#0D1711] via-[#122318] to-[#0D1711] relative overflow-hidden border-t border-b border-[#E8D85B]/15">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#E8D85B]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#163020]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#E8D85B]/10 border border-[#E8D85B]/25 text-[#E8D85B] text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AYURVEDIC WELLNESS DESK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-white tracking-tight leading-tight">
            Book a Free Wellness Consultation
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-white/75 leading-relaxed max-w-2xl mx-auto">
            Not sure how to incorporate Amrut Sanjeevani into your daily routine? Speak directly with our certified lifestyle nutrition advisors. No obligations.
          </p>
        </div>

        {/* Form Container Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-[#0D1711]/90 border border-[#E8D85B]/30 shadow-2xl p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden">
            
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E8D85B] to-transparent" />

            {submittedLeadId ? (
              /* SUCCESS STATE */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-950/50">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#E8D85B] bg-[#E8D85B]/10 px-3 py-1 rounded-full border border-[#E8D85B]/20">
                    Booking Confirmed • Reference #{submittedLeadId}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-white pt-2">
                    We Look Forward to Speaking With You, {name}!
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 max-w-lg mx-auto leading-relaxed">
                    Our lead botanical specialist will call you at{' '}
                    <strong className="text-white font-mono">{countryCode} {rawDigits}</strong> during your selected slot ({preferredTime}).
                  </p>
                </div>

                {/* Benefits / Confirmation Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto text-left pt-2 text-xs">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start space-x-2.5">
                    <HeartPulse className="w-4 h-4 text-[#E8D85B] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">Custom Dosage</span>
                      <span className="text-[11px] text-white/60">Tailored to your health goals</span>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start space-x-2.5">
                    <Clock className="w-4 h-4 text-[#E8D85B] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">Quick 10-Min Call</span>
                      <span className="text-[11px] text-white/60">Focused, actionable guidance</span>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start space-x-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#E8D85B] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">100% Free</span>
                      <span className="text-[11px] text-white/60">Zero sales pressure</span>
                    </div>
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={generateWhatsAppLink(
                      undefined,
                      1,
                      `Hello Amrut Sanjeevani team, I just booked a wellness consultation (Ref #${submittedLeadId}) for ${name}. Could we connect?`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-[#0D1711] font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-[#25D366]/20 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Connect Instantly on WhatsApp</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Schedule Another Consultation
                  </button>
                </div>
              </motion.div>
            ) : (
              /* INPUT FORM */
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Form Subheader with Benefits */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10 text-xs text-white/70">
                  <span className="flex items-center space-x-1.5">
                    <Leaf className="w-4 h-4 text-[#E8D85B]" />
                    <span>Personalized 1-on-1 Guidance</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <Clock className="w-4 h-4 text-[#E8D85B]" />
                    <span>Callback within 30–60 Minutes</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#E8D85B]" />
                    <span>Strict Privacy Guarantee</span>
                  </span>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-200 text-xs flex items-start space-x-2 animate-fadeIn">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs font-bold text-white/90 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aarav Mehta"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#E8D85B] focus:ring-1 focus:ring-[#E8D85B]/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/90 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. aarav@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-xs text-white placeholder-white/40 focus:outline-none transition-all ${
                        email && !isEmailValid
                          ? 'border-rose-500/80 focus:border-rose-400'
                          : 'border-white/20 focus:border-[#E8D85B] focus:ring-1 focus:ring-[#E8D85B]/50'
                      }`}
                    />
                    {email && !isEmailValid && (
                      <p className="text-[10px] text-rose-400 mt-1">Please enter a valid email format.</p>
                    )}
                  </div>
                </div>

                {/* Row 2: Country Code & Mobile Number (10 digits for India) */}
                <div>
                  <label className="block text-xs font-bold text-white/90 uppercase tracking-wider mb-1.5">
                    Phone / Mobile Number * ({selectedCountry.digits}-Digit for {selectedCountry.country})
                  </label>
                  <div className="flex rounded-xl overflow-hidden border border-white/20 focus-within:border-[#E8D85B] focus-within:ring-1 focus-within:ring-[#E8D85B]/50 transition-all bg-white/5">
                    {/* Country Code Dropdown */}
                    <div className="relative bg-[#163020] border-r border-white/15 shrink-0">
                      <select
                        value={countryCode}
                        onChange={(e) => {
                          setCountryCode(e.target.value);
                          setMobile('');
                        }}
                        className="h-full px-3 py-3 bg-transparent text-xs text-white font-semibold focus:outline-none cursor-pointer pr-7 appearance-none"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code} className="bg-[#0D1711] text-white">
                            {c.flag} {c.code} ({c.country})
                          </option>
                        ))}
                      </select>
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 text-[10px] pointer-events-none">
                        ▼
                      </span>
                    </div>

                    {/* Digits Input */}
                    <input
                      type="tel"
                      required
                      placeholder={`Enter ${selectedCountry.digits}-digit mobile number (e.g. 9876543210)`}
                      value={mobile}
                      onChange={handleMobileChange}
                      className="flex-1 px-4 py-3 bg-transparent text-xs text-white placeholder-white/40 focus:outline-none font-mono"
                    />

                    {/* Realtime Digit Counter badge */}
                    <div className="flex items-center px-3 text-[11px] font-mono text-white/50">
                      <span className={rawDigits.length === selectedCountry.digits ? 'text-emerald-400 font-bold' : ''}>
                        {rawDigits.length}/{selectedCountry.digits}
                      </span>
                    </div>
                  </div>
                  {mobile && !isMobileValid && (
                    <p className="text-[10px] text-amber-300 mt-1">
                      {selectedCountry.country} requires exactly {selectedCountry.digits} digits (currently {rawDigits.length}).
                    </p>
                  )}
                </div>

                {/* Row 3: Wellness Goal & Preferred Callback Window */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs font-bold text-white/90 uppercase tracking-wider mb-1.5">
                      Primary Wellness Goal
                    </label>
                    <select
                      value={wellnessGoal}
                      onChange={(e) => setWellnessGoal(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#163020] border border-white/20 text-xs text-white focus:outline-none focus:border-[#E8D85B] cursor-pointer"
                    >
                      <option value="Heart Health & Cholesterol Balance">Heart Health & Cholesterol Balance</option>
                      <option value="Acid Reflux, Bloating & Digestion">Acid Reflux, Bloating & Digestion</option>
                      <option value="Natural Detox & Morning Vitality">Natural Detox & Morning Vitality</option>
                      <option value="Weight Wellness & Metabolism Support">Weight Wellness & Metabolism Support</option>
                      <option value="Senior Daily Immunity & Joint Warmth">Senior Daily Immunity & Joint Warmth</option>
                      <option value="Bulk Family Pack / Corporate Enquiry">Bulk Family Pack / Corporate Enquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/90 uppercase tracking-wider mb-1.5">
                      Preferred Callback Window
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#163020] border border-white/20 text-xs text-white focus:outline-none focus:border-[#E8D85B] cursor-pointer"
                    >
                      <option value="Morning (9:00 AM - 12:00 PM IST)">Morning (9:00 AM - 12:00 PM IST)</option>
                      <option value="Afternoon (12:00 PM - 4:00 PM IST)">Afternoon (12:00 PM - 4:00 PM IST)</option>
                      <option value="Evening (4:00 PM - 8:00 PM IST)">Evening (4:00 PM - 8:00 PM IST)</option>
                      <option value="Instant (Next available advisor)">Instant (Next available advisor)</option>
                    </select>
                  </div>
                </div>

                {/* Optional Note */}
                <div>
                  <label className="block text-xs font-bold text-white/90 uppercase tracking-wider mb-1.5">
                    Specific Health Question or Note (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Any specific questions regarding ingredients, medication timing, or taste?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#E8D85B] resize-none"
                  />
                </div>

                {/* CTA Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#E8D85B] via-[#D7A84B] to-[#E8D85B] text-[#0D1711] font-bold text-xs uppercase tracking-widest hover:scale-[1.01] transition-transform shadow-xl shadow-[#E8D85B]/25 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-60"
                >
                  <PhoneCall className="w-4 h-4 text-[#0D1711]" />
                  <span>{isLoading ? 'Reserving Callback Slot...' : 'Book Free Consultation'}</span>
                  <ArrowRight className="w-4 h-4 text-[#0D1711]" />
                </button>

                <p className="text-center text-[11px] text-white/50">
                  By clicking "Book Free Consultation", you agree to receive a 1-on-1 callback from an Amrut Sanjeevani health consultant. No spam guaranteed.
                </p>

              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};
