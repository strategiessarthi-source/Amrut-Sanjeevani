import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useAuth, COUNTRY_CODES, validateEmail, validateMobile } from '../context/AuthContext';
import { PRODUCTS } from '../data/products';
import { AuthModal } from './AuthModal';
import {
  X,
  Calendar,
  Phone,
  CheckCircle2,
  MessageCircle,
  Send,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  PhoneCall,
  Clock,
  AlertCircle
} from 'lucide-react';

export const OrderBookingModal: React.FC = () => {
  const { isBookingOpen, setIsBookingOpen, showToast, generateWhatsAppLink } = useCart();
  const { submitLead } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [mobile, setMobile] = useState('');
  const [productId, setProductId] = useState('as-single-500');
  const [quantity, setQuantity] = useState(1);
  const [city, setCity] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('Morning (9 AM - 12 PM IST)');
  const [notes, setNotes] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  if (!isBookingOpen) return null;

  const selectedCountry = COUNTRY_CODES.find((c) => c.code === countryCode) || COUNTRY_CODES[0];
  const rawDigits = mobile.replace(/\D/g, '');
  const isMobileValid = validateMobile(rawDigits, selectedCountry.digits);
  const isEmailValid = email ? validateEmail(email) : false;
  const selectedProduct = PRODUCTS.find((p) => p.id === productId || p.variants?.some((v) => `${p.id}-${v.id}` === productId)) || PRODUCTS[0];

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.replace(/\D/g, '').slice(0, selectedCountry.digits);
    setMobile(clean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage('Please provide your full name (minimum 2 characters).');
      return;
    }
    if (!email.trim() || !validateEmail(email)) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!isMobileValid) {
      setErrorMessage(`Please enter a valid ${selectedCountry.digits}-digit mobile number for ${selectedCountry.country}.`);
      return;
    }

    setIsLoading(true);
    try {
      const res = await submitLead({
        name: fullName.trim(),
        email: email.trim(),
        countryCode,
        mobile: rawDigits,
        wellnessGoal: `Product Booking: ${quantity}x ${selectedProduct.name}`,
        preferredTime: preferredSlot,
        notes: `City: ${city || 'Not specified'}. Notes: ${notes}`
      });

      setIsLoading(false);
      setReferenceId(res.leadId);
      setIsSuccess(true);
      showToast('Callback consultation request received!');
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Unable to schedule callback. Please try again.');
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setIsBookingOpen(false);
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl bg-[#0D1711] border border-[#E8D85B]/30 rounded-3xl p-6 sm:p-8 text-[#F7F3E8] shadow-2xl overflow-hidden my-6"
      >
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-gradient-to-b from-[#E8D85B]/15 to-transparent blur-2xl pointer-events-none" />

        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F3E8] transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#E8D85B] bg-[#E8D85B]/10 px-3 py-1 rounded-full border border-[#E8D85B]/20">
                Callback Requested • Ref #{referenceId}
              </span>
              <h3 className="text-2xl font-bold font-serif-luxury text-[#F7F3E8] pt-2">
                Callback Scheduled, {fullName}!
              </h3>
              <p className="text-xs text-white/70 max-w-md mx-auto leading-relaxed">
                We have registered your inquiry for <strong>{quantity}x {selectedProduct.name}</strong>. Our senior Ayurvedic advisor will call you at <strong className="text-white font-mono">{countryCode} {rawDigits}</strong> during your requested window.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <a
                href={generateWhatsAppLink(
                  selectedProduct,
                  quantity,
                  `Hello, I requested a callback for ${quantity}x ${selectedProduct.name} (Ref #${referenceId}) for ${fullName}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#25D366] text-[#0D1711] font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-[#25D366]/20 hover:scale-[1.02] transition-transform"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm Instantly via WhatsApp</span>
              </a>
              <button
                onClick={handleClose}
                className="px-6 py-3 rounded-full bg-white/10 text-white font-semibold text-xs hover:bg-white/20 cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E8D85B] bg-[#E8D85B]/10 px-3 py-1 rounded-full border border-[#E8D85B]/20">
                WELLNESS CONCIERGE & CALLBACK
              </span>
              <h2 className="text-2xl font-bold font-serif-luxury text-[#F7F3E8] mt-2">
                Request a Callback or Book Order
              </h2>
              <p className="text-xs text-white/70 mt-1">
                Prefer personal telephone assistance or need clarification on dosage? Leave your details below and our Ayurvedic specialists will connect with you.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-200 text-xs flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Full Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Sen"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#E8D85B] focus:ring-1 focus:ring-[#E8D85B]/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. ananya@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl bg-white/5 border text-xs text-white placeholder-white/40 focus:outline-none transition-colors ${
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

            {/* Mobile with Country Selector */}
            <div>
              <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                Phone Number * ({selectedCountry.digits}-Digit for {selectedCountry.country})
              </label>
              <div className="flex rounded-xl overflow-hidden border border-white/20 focus-within:border-[#E8D85B] focus-within:ring-1 focus-within:ring-[#E8D85B]/50 transition-colors bg-white/5">
                <div className="relative bg-[#163020] border-r border-white/15 shrink-0">
                  <select
                    value={countryCode}
                    onChange={(e) => {
                      setCountryCode(e.target.value);
                      setMobile('');
                    }}
                    className="h-full px-3 py-2.5 bg-transparent text-xs text-white font-semibold focus:outline-none cursor-pointer pr-7 appearance-none"
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

                <input
                  type="tel"
                  required
                  placeholder={`Enter ${selectedCountry.digits}-digit mobile number (e.g. 9876543210)`}
                  value={mobile}
                  onChange={handleMobileChange}
                  className="flex-1 px-4 py-2.5 bg-transparent text-xs text-white placeholder-white/40 focus:outline-none font-mono"
                />

                <div className="flex items-center px-3 text-[11px] font-mono text-white/50">
                  <span className={rawDigits.length === selectedCountry.digits ? 'text-emerald-400 font-bold' : ''}>
                    {rawDigits.length}/{selectedCountry.digits}
                  </span>
                </div>
              </div>
              {mobile && !isMobileValid && (
                <p className="text-[10px] text-amber-300 mt-1">
                  Requires {selectedCountry.digits} digits (currently {rawDigits.length}).
                </p>
              )}
            </div>

            {/* Product selection & Callback timing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                  Interested Package
                </label>
                <select
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#163020] border border-white/20 text-xs text-white focus:outline-none focus:border-[#E8D85B] cursor-pointer"
                >
                  {PRODUCTS.map((p) => {
                    if (p.variants && p.variants.length > 0) {
                      return p.variants.map((v) => (
                        <option key={`${p.id}-${v.id}`} value={`${p.id}-${v.id}`}>
                          {p.name} - {v.label} ({v.sublabel}) — ₹{v.price}
                        </option>
                      ));
                    }
                    return (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.netQuantity}) — ₹{p.price}
                      </option>
                    );
                  })}
                  <option value="custom">General Inquiry / Not Sure Yet</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                  Preferred Callback Time
                </label>
                <select
                  value={preferredSlot}
                  onChange={(e) => setPreferredSlot(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#163020] border border-white/20 text-xs text-white focus:outline-none focus:border-[#E8D85B] cursor-pointer"
                >
                  <option value="Morning (9 AM - 12 PM IST)">Morning (9 AM - 12 PM IST)</option>
                  <option value="Afternoon (12 PM - 4 PM IST)">Afternoon (12 PM - 4 PM IST)</option>
                  <option value="Evening (4 PM - 8 PM IST)">Evening (4 PM - 8 PM IST)</option>
                  <option value="Urgent (Next Available Advisor)">Urgent (Next Available Advisor)</option>
                </select>
              </div>
            </div>

            {/* City & Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                  City / Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pune, Bangalore, Delhi"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#E8D85B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                  Quantity (If ordering)
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-xs text-white focus:outline-none focus:border-[#E8D85B]"
                />
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#E8D85B] via-[#D7A84B] to-[#E8D85B] text-[#0D1711] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#E8D85B]/20 hover:scale-[1.01] transition-transform cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-60"
            >
              <PhoneCall className="w-4 h-4 text-[#0D1711]" />
              <span>{isLoading ? 'Booking Your Slot...' : 'Get Callback'}</span>
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

// Re-export AccountModal pointing to our unified AuthModal
export const AccountModal: React.FC = () => {
  const { isAccountOpen, setIsAccountOpen } = useCart();
  const { setIsAuthModalOpen } = useAuth();

  React.useEffect(() => {
    if (isAccountOpen) {
      setIsAuthModalOpen(true);
      setIsAccountOpen(false);
    }
  }, [isAccountOpen, setIsAccountOpen, setIsAuthModalOpen]);

  return <AuthModal />;
};
