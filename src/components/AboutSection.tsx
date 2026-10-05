import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { Sparkles, ArrowRight, Play, RotateCcw, Check, Droplets, Leaf } from 'lucide-react';

const INFUSION_STEPS = [
  {
    step: 1,
    title: 'Cold-Pressed Sun Lemon',
    role: 'Citrus Vitality & Clean Zest',
    desc: 'Pure cold-extracted lemon juice brings clean citrus bioflavonoids and an invigorating morning top-note.',
    color: '#E8D85B',
    img: 'https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=600&q=80',
    tag: 'Step 01 • Fresh Lemon Juice'
  },
  {
    step: 2,
    title: 'Mountain Ginger Root',
    role: 'Aromatic Warmth & Comfort',
    desc: 'Fine-macerated mountain ginger releases rich aromatic gingerols that deliver comforting digestive warmth.',
    color: '#D7A84B',
    img: '/src/assets/images/ginger_root_fresh_1791181242743.jpg',
    tag: 'Step 02 • Crushed Ginger Extract'
  },
  {
    step: 3,
    title: 'Aged Himalayan Garlic',
    role: 'Traditional Botanical Strength',
    desc: 'Carefully aged cloves provide organic sulfur compounds, micro-filtered for silky smoothness.',
    color: '#E2E8F0',
    img: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=600&q=80',
    tag: 'Step 03 • Macerated Garlic'
  },
  {
    step: 4,
    title: 'Raw Apple Cider Vinegar',
    role: 'Enzyme-Rich Living Mother',
    desc: 'Naturally fermented unpasteurized ACV harmonizes all elements with 5% organic acetic acid.',
    color: '#D7A84B',
    img: '/src/assets/images/apple cider vinegar.jpg',
    tag: 'Step 04 • Unfiltered ACV'
  },
  {
    step: 5,
    title: 'Amrut Sanjeevani Elixir',
    role: 'One Harmonious Daily Tonic',
    desc: 'Four nature-inspired elements unite in golden perfection, creating a single convenient morning blend.',
    color: '#3E6B45',
    img: '/src/assets/images/complete_blend_elixir_1791221963162.jpg',
    tag: 'Step 05 • The Complete Blend'
  }
];

export const AboutSection: React.FC = () => {
  const { setActiveView } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % INFUSION_STEPS.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const currentInfo = INFUSION_STEPS[activeStep];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-20 md:py-32 bg-[#F7F3E8] text-[#0D1711] relative overflow-hidden">
      {/* Decorative Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8D85B]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3E6B45]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Brand Story Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#163020]/10 border border-[#163020]/15 text-[#163020] text-xs font-bold tracking-[0.2em] uppercase">
              <Leaf className="w-3.5 h-3.5 text-[#3E6B45]" />
              <span>OUR PHILOSOPHY</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0D1711] leading-[1.15] font-serif-luxury">
              Wellness Starts With Everyday Choices.
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#0D1711]/80 leading-relaxed font-normal">
              <p>
                Modern life can often feel busy and demanding. Between tight schedules and digital overload, building mindful routines and choosing ingredients inspired by nature can be a simple way to support a balanced lifestyle.
              </p>
              <p>
                <strong>Amrut Sanjeevani</strong> brings together carefully selected natural ingredients — fresh lemon, garlic, ginger, and raw apple cider vinegar — in one convenient, scientifically pure blend.
              </p>
            </div>

            {/* Core Values Bullet List */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center space-x-2 text-sm text-[#0D1711]/90 font-medium">
                <span className="w-5 h-5 rounded-full bg-[#3E6B45]/15 flex items-center justify-center text-[#3E6B45]">✓</span>
                <span>100% Whole Botanicals</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-[#0D1711]/90 font-medium">
                <span className="w-5 h-5 rounded-full bg-[#3E6B45]/15 flex items-center justify-center text-[#3E6B45]">✓</span>
                <span>No Artificial Flavors</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-[#0D1711]/90 font-medium">
                <span className="w-5 h-5 rounded-full bg-[#3E6B45]/15 flex items-center justify-center text-[#3E6B45]">✓</span>
                <span>Lab-Tested Purity</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-[#0D1711]/90 font-medium">
                <span className="w-5 h-5 rounded-full bg-[#3E6B45]/15 flex items-center justify-center text-[#3E6B45]">✓</span>
                <span>Glass Bottled</span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToSection('ingredients')}
                className="px-6 py-3.5 rounded-full bg-[#163020] text-[#F7F3E8] font-bold text-sm hover:bg-[#0D1711] transition-colors flex items-center space-x-2 shadow-lg cursor-pointer"
              >
                <span>Discover the 4 Ingredients</span>
                <ArrowRight className="w-4 h-4 text-[#E8D85B]" />
              </button>
              <button
                onClick={() => {
                  setActiveView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-full border border-[#163020]/30 text-[#163020] font-semibold text-sm hover:bg-[#163020]/5 transition-colors cursor-pointer"
              >
                Explore Shop →
              </button>
            </div>
          </div>

          {/* Right Column: Cinematic 5-Step Jar Blend Experience */}
          <div className="lg:col-span-6">
            <div className="bg-white/80 backdrop-blur-xl border border-[#163020]/10 rounded-3xl p-6 sm:p-8 shadow-xl shadow-[#163020]/5">
              
              {/* Stepper Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#163020]/10">
                <div>
                  <span className="text-[11px] font-bold tracking-widest text-[#3E6B45] uppercase">
                    THE BLENDING JOURNEY
                  </span>
                  <h3 className="text-lg font-bold text-[#0D1711] font-serif-luxury">
                    How Amrut Sanjeevani is Crafted
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                      isAutoPlaying
                        ? 'bg-[#3E6B45]/10 text-[#3E6B45]'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{isAutoPlaying ? 'Auto Playing' : 'Paused'}</span>
                  </button>
                </div>
              </div>

              {/* Visual Card with Active Blend Step */}
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#0D1711] shadow-inner mb-6 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={currentInfo.img}
                      alt={currentInfo.title}
                      className="w-full h-full object-cover opacity-85"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1711] via-[#0D1711]/30 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Floating Step Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                  <span className="text-[10px] uppercase tracking-widest bg-[#E8D85B] text-[#0D1711] font-bold px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                    {currentInfo.tag}
                  </span>
                  <h4 className="text-xl font-bold font-serif-luxury text-[#F7F3E8]">
                    {currentInfo.title}
                  </h4>
                  <p className="text-xs text-[#F7F3E8]/80 mt-1 line-clamp-2">
                    {currentInfo.desc}
                  </p>
                </div>
              </div>

              {/* Step Navigation Dots / Indicators */}
              <div className="grid grid-cols-5 gap-2">
                {INFUSION_STEPS.map((step, idx) => (
                  <button
                    key={step.step}
                    onClick={() => {
                      setActiveStep(idx);
                      setIsAutoPlaying(false);
                    }}
                    className={`py-2 px-1 rounded-xl text-center transition-all cursor-pointer ${
                      activeStep === idx
                        ? 'bg-[#163020] text-white shadow-md'
                        : 'bg-[#163020]/5 text-[#0D1711]/70 hover:bg-[#163020]/10'
                    }`}
                  >
                    <span className="block text-[10px] font-bold uppercase tracking-wider">
                      0{step.step}
                    </span>
                    <span className="block text-xs font-semibold truncate">
                      {step.step === 5 ? 'Blend' : step.title.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
