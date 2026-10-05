import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS } from '../data/testimonials';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { generateWhatsAppLink } = useCart();

  const categories = ['All', 'General', 'Ingredients', 'Usage', 'Ordering & Shipping'];

  const filteredFaqs = activeCategory === 'All'
    ? FAQS
    : FAQS.filter((f) => f.category === activeCategory);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-20 md:py-32 bg-[#0D1711] text-[#F7F3E8] relative overflow-hidden border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-[0.25em] text-[#E8D85B] uppercase px-4 py-1 rounded-full border border-[#E8D85B]/20 bg-[#E8D85B]/5 inline-block mb-3">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F7F3E8] leading-tight font-serif-luxury">
            Clear Answers for Your Journey.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#F7F3E8]/80 leading-relaxed">
            Everything you need to know about Amrut Sanjeevani, our pure ingredients, daily serving, and shipping.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#E8D85B] text-[#0D1711] font-bold shadow-md shadow-[#E8D85B]/20'
                  : 'glass-panel text-white/70 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl glass-panel border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between space-x-4 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <span className="text-base sm:text-lg font-bold text-[#F7F3E8] font-serif-luxury">
                    {faq.question}
                  </span>
                  <div
                    className={`p-1.5 rounded-full bg-white/5 text-[#E8D85B] transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#E8D85B]/20' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#F7F3E8]/80 border-t border-white/5 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Need Help WhatsApp Prompt */}
        <div className="mt-12 p-6 rounded-2xl glass-panel border border-[#E8D85B]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-base font-bold text-[#F7F3E8]">Have more specific questions?</h4>
            <p className="text-xs text-[#F7F3E8]/75">Our wellness care team is available on WhatsApp for direct assistance.</p>
          </div>
          <a
            href={generateWhatsAppLink(undefined, 1, 'I have a question regarding Amrut Sanjeevani ingredients and usage.')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs flex items-center space-x-2 transition-transform hover:scale-105 shadow-md shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
