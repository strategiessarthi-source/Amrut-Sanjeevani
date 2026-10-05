import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gingerImg from '../assets/images/ginger_root_fresh_1791181242743.jpg';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  MessageCircle, 
  ShoppingBag, 
  ChevronDown, 
  CheckCircle2,
  Droplets,
  Leaf
} from 'lucide-react';

const ROTATING_WORDS = [
  "Made for Your Everyday.",
  "Modern Lifestyle Blend.",
  "Everyday Vitality.",
  "Pure Plant Harmony."
];

export const HeroSection: React.FC = () => {
  const { setActiveView, buyNow, setSelectedProductModal, generateWhatsAppLink } = useCart();
  const [wordIndex, setWordIndex] = useState(0);
  const mainProduct = PRODUCTS[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 3400);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#0D1711] text-white pt-8 pb-0">
      {/* Background Ambient Ingredients & Glowing Stages */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Central Product Stage */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] md:w-[750px] h-[550px] md:h-[750px] product-stage -z-10 opacity-70" />

        {/* Ambient Blurred Floating Bokeh & Shapes */}
        <div className="absolute top-20 left-12 md:left-24 floating-ingredient opacity-30 lemon-glow">
          <div className="w-24 h-24 md:w-36 md:h-36 rounded-full border-[6px] md:border-[8px] border-[#E8D85B] border-dashed rotate-45" />
        </div>
        <div className="absolute bottom-40 right-12 md:right-28 floating-ingredient opacity-25">
          <div className="w-36 md:w-52 h-24 md:h-32 bg-[#5A5A40] rounded-full filter blur-2xl" />
        </div>
        <div className="absolute top-1/2 left-8 md:left-20 floating-ingredient opacity-40">
          <div className="w-10 h-10 md:w-14 md:h-14 bg-white/40 rounded-full blur-[1px]" />
          <div className="w-6 h-6 md:w-8 md:h-8 bg-[#E8D85B]/50 rounded-full mt-2 ml-6 blur-[1px]" />
        </div>

        {/* Floating Interactive Ingredient Bubbles */}
        {/* Lemon Slice - Top Left */}
        <motion.div
          animate={{
            y: [-12, 14, -12],
            rotate: [0, 6, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-14 left-4 sm:left-16 md:left-28 z-10 pointer-events-auto opacity-75 hover:opacity-100 transition-opacity"
        >
          <div className="relative group cursor-pointer" onClick={() => scrollToSection('ingredients')}>
            <div className="w-16 h-16 sm:w-22 sm:h-22 md:w-28 md:h-28 rounded-full border border-[#E8D85B]/40 bg-[#0D1711]/70 backdrop-blur-md p-1.5 shadow-xl shadow-[#E8D85B]/20 flex items-center justify-center lemon-glow">
              <img
                src="https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=300&q=80"
                alt="Fresh Lemon"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="hidden sm:block absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] tracking-widest uppercase text-[#E8D85B] bg-[#0D1711]/90 px-2 py-0.5 rounded-full border border-[#E8D85B]/30">
              Fresh Lemon
            </div>
          </div>
        </motion.div>

        {/* Mountain Ginger - Top Right */}
        <motion.div
          animate={{
            y: [14, -14, 14],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 right-4 sm:right-16 md:right-32 z-10 pointer-events-auto opacity-75 hover:opacity-100 transition-opacity"
        >
          <div className="relative group cursor-pointer" onClick={() => scrollToSection('ingredients')}>
            <div className="w-16 h-16 sm:w-22 sm:h-22 md:w-28 md:h-28 rounded-full border border-[#D7A84B]/50 hover:border-[#E8D85B] bg-[#0D1711]/80 backdrop-blur-md p-1.5 shadow-2xl shadow-[#D7A84B]/30 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
              <img
                src={gingerImg}
                alt="High-Altitude Mountain Ginger Root"
                className="w-full h-full object-cover rounded-full drop-shadow-md"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="hidden sm:block absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] tracking-widest uppercase text-[#D7A84B] group-hover:text-[#E8D85B] bg-[#0D1711]/90 px-2 py-0.5 rounded-full border border-[#D7A84B]/30 transition-colors">
              Mountain Ginger Root
            </div>
          </div>
        </motion.div>

        {/* Aged Garlic - Bottom Left */}
        <motion.div
          animate={{
            y: [-10, 15, -10],
            rotate: [0, -4, 0],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-32 left-6 sm:left-20 md:left-36 z-10 pointer-events-auto opacity-65 hover:opacity-100 transition-opacity"
        >
          <div className="relative group cursor-pointer" onClick={() => scrollToSection('ingredients')}>
            <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border border-white/25 bg-[#0D1711]/70 backdrop-blur-md p-1 shadow-lg flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=300&q=80"
                alt="Aged Garlic"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="hidden sm:block absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] tracking-widest uppercase text-white/80 bg-[#0D1711]/90 px-2 py-0.5 rounded-full border border-white/20">
              Cinematic Garlic
            </div>
          </div>
        </motion.div>

        {/* ACV with Mother - Bottom Right */}
        <motion.div
          animate={{
            y: [15, -12, 15],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 7.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-36 right-6 sm:right-20 md:right-40 z-10 pointer-events-auto opacity-70 hover:opacity-100 transition-opacity"
        >
          <div className="relative group cursor-pointer" onClick={() => scrollToSection('ingredients')}>
            <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border border-[#D7A84B]/40 bg-[#0D1711]/70 backdrop-blur-md p-1 shadow-xl shadow-[#D7A84B]/15 flex items-center justify-center">
              <img
                src="/src/assets/images/apple cider vinegar.jpg"
                alt="Raw Apple Cider Vinegar Jar"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="hidden sm:block absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] tracking-widest uppercase text-[#D7A84B] bg-[#0D1711]/90 px-2 py-0.5 rounded-full border border-[#D7A84B]/30">
              Golden ACV
            </div>
          </div>
        </motion.div>

        {/* Floating Particles Overlay */}
        <div className="absolute top-[20%] left-[80%] w-1.5 h-1.5 bg-[#E8D85B] rounded-full opacity-60 animate-pulse" />
        <div className="absolute top-[60%] left-[15%] w-2 h-2 bg-white rounded-full opacity-30 animate-pulse" />
        <div className="absolute top-[40%] left-[30%] w-1 h-1 bg-[#D7A84B] rounded-full opacity-80" />
        <div className="absolute bottom-[18%] left-[50%] w-1.5 h-1.5 bg-[#E8D85B] rounded-full opacity-40 animate-pulse" />
      </div>

      {/* Main Center Content Container */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex-1 flex flex-col items-center justify-center my-auto pt-6 pb-8">
        {/* Eyebrow with flanking subtle golden divider lines */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 flex items-center justify-center space-x-3"
        >
          <div className="h-[1px] w-6 sm:w-10 bg-[#E8D85B] opacity-50" />
          <span className="text-[10px] sm:text-[11px] tracking-[0.45em] text-[#E8D85B] font-semibold uppercase">
            Nature • Wellness • Everyday Balance
          </span>
          <div className="h-[1px] w-6 sm:w-10 bg-[#E8D85B] opacity-50" />
        </motion.div>

        {/* Large Immersive Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-6"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] serif-text font-light tracking-tight text-white mb-2">
            Nature’s <span className="text-[#E8D85B]">Goodness.</span>
          </h1>
          <div className="min-h-12 sm:min-h-16 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="text-2xl sm:text-4xl md:text-5xl font-light italic serif-text text-white/90"
              >
                {ROTATING_WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Subtitle Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm sm:text-base md:text-lg opacity-70 font-light leading-relaxed mb-8 max-w-xl mx-auto text-[#F7F3E8]"
        >
          A thoughtfully crafted blend inspired by the natural goodness of{' '}
          <span className="text-[#E8D85B] font-normal">Lemon</span>,{' '}
          <span className="text-white font-normal">Garlic</span>,{' '}
          <span className="text-[#D7A84B] font-normal">Ginger</span> and{' '}
          <span className="text-[#D7A84B] font-normal">Apple Cider Vinegar</span> — designed to complement your modern wellness routine.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md"
        >
          {/* Primary Button */}
          <button
            onClick={() => {
              setActiveView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto bg-white text-[#0D1711] px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#E8D85B] hover:scale-105 transition-all shadow-xl cursor-pointer"
          >
            Explore Amrut Sanjeevani
          </button>

          {/* Secondary Button */}
          <button
            onClick={() => scrollToSection('ingredients')}
            className="w-full sm:w-auto border border-white/30 text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-white/10 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Discover Ingredients</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </div>

      {/* Bottom Bar / Ingredient Quick Look from Theme */}
      <div className="h-20 sm:h-24 glass-nav mt-auto flex items-center px-6 sm:px-12 justify-between z-30 border-t border-white/10">
        <div className="flex space-x-6 sm:space-x-12 overflow-x-auto py-2">
          <div className="flex flex-col shrink-0">
            <span className="text-[9px] uppercase tracking-tighter opacity-40 text-white">Ingredient 01</span>
            <span className="text-xs sm:text-sm serif-text italic text-[#E8D85B]">Fresh Lemon</span>
          </div>
          <div className="flex flex-col shrink-0">
            <span className="text-[9px] uppercase tracking-tighter opacity-40 text-white">Ingredient 02</span>
            <span className="text-xs sm:text-sm serif-text italic text-white/90">Cinematic Garlic</span>
          </div>
          <div className="flex flex-col shrink-0">
            <span className="text-[9px] uppercase tracking-tighter opacity-40 text-white">Ingredient 03</span>
            <span className="text-xs sm:text-sm serif-text italic text-[#D7A84B]">Earthy Ginger</span>
          </div>
          <div className="flex flex-col shrink-0">
            <span className="text-[9px] uppercase tracking-tighter opacity-40 text-white">Ingredient 04</span>
            <span className="text-xs sm:text-sm serif-text italic text-[#D7A84B]">Golden ACV</span>
          </div>
        </div>

        <div 
          onClick={() => scrollToSection('product-reveal')}
          className="flex flex-col items-end cursor-pointer group shrink-0 pl-4"
        >
          <span className="text-[9px] sm:text-[10px] tracking-widest opacity-60 uppercase mb-1 group-hover:text-[#E8D85B] group-hover:opacity-100 transition-all">
            Scroll to Discover
          </span>
          <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 border-b-2 border-r-2 border-[#E8D85B] rotate-45 mb-1 group-hover:translate-y-0.5 transition-transform" />
        </div>
      </div>
    </section>
  );
};

