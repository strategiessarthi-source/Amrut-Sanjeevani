import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { MessageCircle, Phone, Mail, Send, CheckCircle2, MapPin, Clock } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { showToast, generateWhatsAppLink } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) {
      showToast('Please provide your name and mobile number');
      return;
    }
    setIsSubmitted(true);
    showToast('Enquiry received! Our wellness care team will contact you shortly.');
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-[#F7F3E8] text-[#0D1711] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.25em] text-[#3E6B45] uppercase px-4 py-1 rounded-full bg-[#3E6B45]/10 border border-[#3E6B45]/20 inline-block mb-3">
            CONNECT WITH US
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0D1711] leading-tight font-serif-luxury">
            Begin Your Wellness Journey.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#0D1711]/80 leading-relaxed">
            Reach out for order assistance, retail enquiries, or custom routine guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Methods */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Quick Card */}
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl bg-white border border-[#25D366]/30 shadow-md hover:shadow-xl transition-all flex items-center space-x-4 group cursor-pointer block"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#25D366]/15 flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform">
                <MessageCircle className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#25D366]">Instant Response</span>
                <h4 className="text-lg font-bold text-[#0D1711]">Chat on WhatsApp</h4>
                <p className="text-xs text-[#0D1711]/70 mt-0.5">Order directly or ask questions 7 days a week</p>
              </div>
            </a>

            {/* Direct Phone Call Card */}
            <a
              href="tel:+919876543210"
              className="p-6 rounded-3xl bg-white border border-[#163020]/10 shadow-md hover:shadow-xl transition-all flex items-center space-x-4 group cursor-pointer block"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#163020]/10 flex items-center justify-center text-[#163020] group-hover:scale-110 transition-transform">
                <Phone className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#163020]/60">Toll-Free Support</span>
                <h4 className="text-lg font-bold text-[#0D1711]">Call Us</h4>
                <p className="text-xs text-[#0D1711]/70 mt-0.5">+91 98765 43210 (9:00 AM – 7:00 PM IST)</p>
              </div>
            </a>

            {/* Direct Email Card */}
            <a
              href="mailto:sanjeevaniamrut@gmail.com"
              className="p-6 rounded-3xl bg-white border border-[#163020]/10 shadow-md hover:shadow-xl transition-all flex items-center space-x-4 group cursor-pointer block"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#D7A84B]/15 flex items-center justify-center text-[#D7A84B] group-hover:scale-110 transition-transform">
                <Mail className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D7A84B]">Support & Feedback</span>
                <h4 className="text-lg font-bold text-[#0D1711]">Email Us</h4>
                <p className="text-xs text-[#0D1711]/70 mt-0.5">sanjeevaniamrut@gmail.com</p>
              </div>
            </a>

            {/* Operational Info */}
            <div className="p-6 rounded-3xl bg-white/60 border border-[#163020]/10 space-y-3 text-xs text-[#0D1711]/80">
              <div className="flex items-center space-x-2.5">
                <MapPin className="w-4 h-4 text-[#3E6B45] shrink-0" />
                <span>Pristine Valley Herbal Estate, Himachal Pradesh, India</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-[#3E6B45] shrink-0" />
                <span>Express Dispatches: Monday to Saturday (Same-Day)</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#163020]/10 shadow-xl shadow-[#163020]/5">
              
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#3E6B45]/15 text-[#3E6B45] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-serif-luxury text-[#0D1711]">
                    Thank you, {formData.name}!
                  </h3>
                  <p className="text-sm text-[#0D1711]/80 max-w-md mx-auto">
                    Your enquiry has been received. Our wellness specialists will reach out via mobile / WhatsApp at <strong>{formData.mobile}</strong> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', mobile: '', email: '', message: '' });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-[#163020] text-white text-xs font-bold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-2xl font-bold font-serif-luxury text-[#0D1711] mb-2">
                    Send an Enquiry
                  </h3>
                  <p className="text-xs text-[#0D1711]/70 mb-6">
                    Fill in your details below and our team will get back to you with custom wellness recommendations or bulk enquiry quotes.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0D1711] mb-1.5 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F7F3E8]/80 border border-[#163020]/20 text-[#0D1711] text-sm focus:outline-none focus:border-[#3E6B45] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0D1711] mb-1.5 uppercase tracking-wider">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F7F3E8]/80 border border-[#163020]/20 text-[#0D1711] text-sm focus:outline-none focus:border-[#3E6B45] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0D1711] mb-1.5 uppercase tracking-wider">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F3E8]/80 border border-[#163020]/20 text-[#0D1711] text-sm focus:outline-none focus:border-[#3E6B45] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0D1711] mb-1.5 uppercase tracking-wider">
                      Your Message or Order Request
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us what you'd like to ask or if you want to place a custom order..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F3E8]/80 border border-[#163020]/20 text-[#0D1711] text-sm focus:outline-none focus:border-[#3E6B45] focus:bg-white transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#163020] hover:bg-[#0D1711] text-[#F7F3E8] font-bold text-sm tracking-wide flex items-center justify-center space-x-2 shadow-lg transition-colors cursor-pointer"
                  >
                    <span>Send Enquiry</span>
                    <Send className="w-4 h-4 text-[#E8D85B]" />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export const Footer: React.FC = () => {
  const { setActiveView, setPolicyModal, setIsTrackOrderOpen, setIsBookingOpen, generateWhatsAppLink } = useCart();

  const scrollToSection = (id: string) => {
    setActiveView('home');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer className="bg-[#163020] text-[#F7F3E8] border-t border-[#E8D85B]/15 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Left Brand Bio */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E8D85B] to-[#D7A84B] p-[2px]">
                <div className="w-full h-full bg-[#0D1711] rounded-full flex items-center justify-center text-[#E8D85B] font-bold text-sm">
                  AS
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-[0.2em] text-[#F7F3E8] uppercase leading-none">
                  AMRUT SANJEEVANI
                </h3>
                <p className="text-[11px] font-medium tracking-[0.25em] text-[#E8D85B] uppercase leading-none mt-1">
                  NATURE'S POWERFUL INGREDIENTS
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#F7F3E8]/80 max-w-sm leading-relaxed">
              A thoughtfully crafted wellness blend inspired by Lemon, Garlic, Ginger and Apple Cider Vinegar. Made for modern lifestyles and daily morning vitality.
            </p>

            <div className="pt-2">
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs font-bold px-4 py-2 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/30 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Helpline: +91 98765 43210</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#E8D85B]">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#F7F3E8]/80">
              <li>
                <button onClick={() => { setActiveView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#E8D85B] transition-colors cursor-pointer">
                  Shop Products & Bundles
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="hover:text-[#E8D85B] transition-colors cursor-pointer">
                  About Our Story
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('ingredients')} className="hover:text-[#E8D85B] transition-colors cursor-pointer">
                  4 Natural Ingredients
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('how-to-use')} className="hover:text-[#E8D85B] transition-colors cursor-pointer">
                  How To Use Daily
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('testimonials')} className="hover:text-[#E8D85B] transition-colors cursor-pointer">
                  Customer Reviews
                </button>
              </li>
              <li>
                <button onClick={() => setIsTrackOrderOpen(true)} className="hover:text-[#E8D85B] transition-colors cursor-pointer">
                  Track Your Delivery
                </button>
              </li>
              <li>
                <button onClick={() => setIsBookingOpen(true)} className="hover:text-[#E8D85B] transition-colors cursor-pointer">
                  Book Order (Manual Callback)
                </button>
              </li>
            </ul>
          </div>

          {/* Policies & Customer Care */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#E8D85B]">
              Customer Care & Policies
            </h4>
            <ul className="space-y-2 text-xs text-[#F7F3E8]/80">
              <li>
                <button onClick={() => setPolicyModal({ isOpen: true, type: 'shipping' })} className="hover:text-[#E8D85B] transition-colors cursor-pointer">
                  Shipping & Delivery Policy (2-4 Days Express)
                </button>
              </li>
              <li>
                <button onClick={() => setPolicyModal({ isOpen: true, type: 'refund' })} className="hover:text-[#E8D85B] transition-colors cursor-pointer">
                  Refund & Cancellation Policy
                </button>
              </li>
              <li>
                <button onClick={() => setPolicyModal({ isOpen: true, type: 'privacy' })} className="hover:text-[#E8D85B] transition-colors cursor-pointer">
                  Privacy Policy & Data Security
                </button>
              </li>
              <li>
                <button onClick={() => setPolicyModal({ isOpen: true, type: 'terms' })} className="hover:text-[#E8D85B] transition-colors cursor-pointer">
                  Terms of Service & Usage
                </button>
              </li>
            </ul>

            <div className="pt-3">
              <span className="text-[11px] text-[#E8D85B] block font-semibold mb-1">
                Newsletter & Wellness Insights
              </span>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-1.5 rounded-lg bg-[#0D1711] border border-white/20 text-xs text-white focus:outline-none focus:border-[#E8D85B] flex-1"
                />
                <button
                  onClick={() => alert('Thank you for subscribing to Amrut Sanjeevani insights!')}
                  className="px-3 py-1.5 rounded-lg bg-[#E8D85B] text-[#0D1711] font-bold text-xs hover:bg-[#D7A84B] transition-colors"
                >
                  Join
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright and Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/60 space-y-4 md:space-y-0">
          <div>
            © 2026 <strong>Amrut Sanjeevani</strong>. All Rights Reserved. Crafted for mindful living.
          </div>
          <div className="text-center md:text-right text-[11px] text-white/50 max-w-md">
            Amrut Sanjeevani is a natural wellness food product. These statements have not been evaluated by any regulatory medical authority.
          </div>
        </div>

      </div>
    </footer>
  );
};
