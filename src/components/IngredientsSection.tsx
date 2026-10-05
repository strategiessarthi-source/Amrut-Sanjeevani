import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { INGREDIENTS } from '../data/ingredients';
import { Ingredient } from '../types';
import { Sparkles, ArrowRight, X, Check, Droplets, Info } from 'lucide-react';

export const IngredientsSection: React.FC = () => {
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);

  return (
    <section id="ingredients" className="py-20 md:py-32 bg-gradient-to-b from-[#0D1711] via-[#163020] to-[#0D1711] text-[#F7F3E8] relative overflow-hidden">
      {/* Background Ambient Aura */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#E8D85B]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-[#3E6B45]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.25em] text-[#E8D85B] uppercase px-4 py-1 rounded-full border border-[#E8D85B]/20 bg-[#E8D85B]/5 inline-block mb-3">
            THE BOTANICAL QUAD
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F7F3E8] leading-tight font-serif-luxury">
            Powered by Nature's Finest Ingredients.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#F7F3E8]/80 leading-relaxed">
            Every bottle contains an exact harmony of four powerhouse natural ingredients — thoughtfully chosen to support daily balance and clean vitality.
          </p>
        </div>

        {/* 4 Interactive Large Ingredient Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INGREDIENTS.map((ingredient, idx) => (
            <motion.div
              key={ingredient.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedIngredient(ingredient)}
              className="group relative rounded-3xl glass-panel border border-white/10 hover:border-[#E8D85B]/50 p-6 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#E8D85B]/10 cursor-pointer overflow-hidden"
            >
              {/* Card Top Pill */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E8D85B] bg-[#E8D85B]/10 px-3 py-1 rounded-full border border-[#E8D85B]/20">
                  0{idx + 1} • {ingredient.character.split(',')[0]}
                </span>
                <span className="text-xs text-[#F7F3E8]/50 group-hover:text-[#E8D85B] transition-colors">
                  <Info className="w-4 h-4" />
                </span>
              </div>

              {/* Ingredient Visual with Parallax Glow */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-[#0D1711] flex items-center justify-center p-3 group-hover:bg-[#163020]/80 transition-colors shadow-inner shadow-black/50 border border-white/5">
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2 filter drop-shadow-lg"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1711] via-transparent to-transparent opacity-60" />
              </div>

              {/* Title & Short Description */}
              <div>
                <h3 className="text-xl font-bold text-[#F7F3E8] font-serif-luxury group-hover:text-[#E8D85B] transition-colors">
                  {ingredient.name}
                </h3>
                <p className="text-xs text-[#E8D85B] font-medium tracking-wide mt-0.5">
                  {ingredient.subtitle}
                </p>
                <p className="text-xs text-[#F7F3E8]/75 mt-3 line-clamp-3 leading-relaxed">
                  {ingredient.shortDesc}
                </p>
              </div>

              {/* Card Footer Action */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#E8D85B] group-hover:text-white transition-colors">
                <span>View Science & Origin</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Deep Ingredient Science Modal */}
        <AnimatePresence>
          {selectedIngredient && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-[#0D1711] border border-[#E8D85B]/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-[#F7F3E8]"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedIngredient(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F3E8] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Content */}
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="w-full sm:w-48 aspect-square rounded-2xl overflow-hidden shrink-0 border border-white/20 bg-[#0D1711] flex items-center justify-center p-2 shadow-inner">
                    <img
                      src={selectedIngredient.image}
                      alt={selectedIngredient.name}
                      className="w-full h-full object-cover rounded-xl"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#E8D85B] bg-[#E8D85B]/10 px-3 py-1 rounded-full border border-[#E8D85B]/30">
                        {selectedIngredient.origin}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#F7F3E8] mt-2">
                        {selectedIngredient.name}
                      </h3>
                      <p className="text-xs text-[#E8D85B] font-medium">
                        {selectedIngredient.subtitle}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#F7F3E8]/85 leading-relaxed">
                      {selectedIngredient.longDesc}
                    </p>

                    {/* Bioactives */}
                    <div className="bg-[#163020] p-3 rounded-xl border border-white/10">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#E8D85B] block">
                        Key Bioactive Compounds
                      </span>
                      <span className="text-xs font-semibold text-white/90">
                        {selectedIngredient.bioactives}
                      </span>
                    </div>

                    {/* Key Daily Benefits */}
                    <div>
                      <span className="text-xs font-bold text-white/90 uppercase tracking-wider block mb-2">
                        Wellness Contribution
                      </span>
                      <ul className="space-y-1.5">
                        {selectedIngredient.keyBenefits.map((b, i) => (
                          <li key={i} className="flex items-start space-x-2 text-xs text-[#F7F3E8]/80">
                            <Check className="w-3.5 h-3.5 text-[#E8D85B] shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                  <button
                    onClick={() => setSelectedIngredient(null)}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E8D85B] to-[#D7A84B] text-[#0D1711] font-bold text-xs hover:scale-105 transition-transform cursor-pointer"
                  >
                    Close Ingredient Insight
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export const IngredientImmersiveSection: React.FC = () => {
  const [activeScene, setActiveScene] = useState(0);

  const scenes = [
    {
      ingredient: 'Lemon Grove',
      tagline: 'Scene 01 • Citrus Grove',
      title: 'Freshness From Nature.',
      desc: 'Sun-drenched citrus orchards where every lemon is cold-pressed at morning peak for pure, unfiltered morning brightness.',
      image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=1200&q=80',
      accent: '#E8D85B'
    },
    {
      ingredient: 'Mountain Ginger',
      tagline: 'Scene 02 • Highland Harvest',
      title: 'Rooted In Natural Goodness.',
      desc: 'Slow-grown mountain roots carrying aromatic gingerols that bring soothing warmth and internal vitality to your daily routine.',
      image: '/src/assets/images/ginger_root_fresh_1791181242743.jpg',
      accent: '#D7A84B'
    },
    {
      ingredient: 'Pristine Garlic',
      tagline: 'Scene 03 • Botanical Heritage',
      title: 'Nature\'s Timeless Ingredient.',
      desc: 'Macerated and aged to cultivate allicin compounds, micro-filtered to produce a gentle, silky, non-abrasive finish.',
      image: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=1200&q=80',
      accent: '#FFFFFF'
    },
    {
      ingredient: 'Raw ACV',
      tagline: 'Scene 04 • Golden Amber World',
      title: 'Naturally Crafted. Beautifully Balanced.',
      desc: 'Unfiltered apple cider vinegar aged with living mother enzymes, binding all four elements into a balanced everyday elixir.',
      image: '/src/assets/images/apple cider vinegar.jpg',
      accent: '#E8D85B'
    }
  ];

  const current = scenes[activeScene];

  return (
    <section className="py-20 bg-[#0D1711] text-[#F7F3E8] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Selector Tabs */}
        <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-8 overflow-x-auto pb-2">
          {scenes.map((scene, i) => (
            <button
              key={i}
              onClick={() => setActiveScene(i)}
              className={`px-4 sm:px-6 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                activeScene === i
                  ? 'bg-gradient-to-r from-[#E8D85B] to-[#D7A84B] text-[#0D1711] font-bold shadow-lg shadow-[#E8D85B]/20'
                  : 'glass-panel text-white/70 hover:text-white'
              }`}
            >
              {scene.ingredient}
            </button>
          ))}
        </div>

        {/* Immersive Visual Showcase Canvas */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-16/9 md:aspect-21/9 max-h-[550px] shadow-2xl flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScene}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0D1711] via-[#0D1711]/70 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Left Text Content */}
          <div className="relative z-10 p-6 sm:p-12 md:p-16 max-w-xl space-y-4">
            <span className="text-xs font-bold tracking-[0.25em] text-[#E8D85B] uppercase px-3 py-1 rounded-full bg-[#0D1711]/80 border border-[#E8D85B]/30 inline-block">
              {current.tagline}
            </span>
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif-luxury text-[#F7F3E8] leading-tight">
              {current.title}
            </h3>
            <p className="text-xs sm:text-base text-[#F7F3E8]/80 leading-relaxed">
              {current.desc}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
