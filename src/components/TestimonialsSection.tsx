import React from 'react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data/testimonials';
import { PRODUCTS } from '../data/products';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const TestimonialsSection: React.FC = () => {
  const { setActiveView } = useCart();

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-[#0D1711] text-[#F7F3E8] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.25em] text-[#E8D85B] uppercase px-4 py-1 rounded-full border border-[#E8D85B]/20 bg-[#E8D85B]/5 inline-block mb-3">
            VERIFIED VOICES
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F7F3E8] leading-tight font-serif-luxury">
            Real Experiences. Real Routines.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#F7F3E8]/80 leading-relaxed">
            Read how mindful individuals across India have integrated Amrut Sanjeevani into their morning daily habits.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-[#E8D85B]/30 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#E8D85B]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#E8D85B]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#E8D85B]/30" />
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-base text-[#F7F3E8]/85 italic leading-relaxed">
                  "{t.review}"
                </p>
              </div>

              {/* User Profile Info */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center space-x-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-[#E8D85B]/40"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-1.5">
                    <h4 className="text-sm font-bold text-[#F7F3E8]">{t.name}</h4>
                    <CheckCircle className="w-3.5 h-3.5 text-[#E8D85B]" title="Verified Purchase" />
                  </div>
                  <p className="text-xs text-[#E8D85B] font-medium">{t.city} • <span className="text-white/60">{t.role}</span></p>
                  <p className="text-[10px] text-white/40">{t.duration}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer Note */}
        <div className="mt-12 text-center text-xs text-white/50">
          * Individual experiences may vary. Reviews represent personal perspectives and are not intended as medical claims.
        </div>

        {/* CTA to Shop */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              setActiveView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E8D85B] via-[#D7A84B] to-[#E8D85B] text-[#0D1711] font-bold text-sm shadow-lg shadow-[#E8D85B]/20 hover:scale-105 transition-transform cursor-pointer"
          >
            Start Your Wellness Routine Today
          </button>
        </div>

      </div>
    </section>
  );
};

export const ProductShowcaseSection: React.FC = () => {
  const { addToCart, buyNow, setSelectedProductModal, setActiveView } = useCart();
  const [selectedPackIndex, setSelectedPackIndex] = React.useState(0);
  const products = PRODUCTS;
  const currentProduct = products[selectedPackIndex];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-[#0D1711] via-[#163020] to-[#0D1711] text-[#F7F3E8] relative overflow-hidden border-t border-white/5">
      {/* Center Spotlight Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#E8D85B]/15 via-[#3E6B45]/20 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.25em] text-[#E8D85B] uppercase px-4 py-1 rounded-full border border-[#E8D85B]/20 bg-[#E8D85B]/5 inline-block mb-3">
            PRODUCT COLLECTION
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F7F3E8] leading-tight font-serif-luxury">
            Nature, Brought Together.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#F7F3E8]/80 leading-relaxed">
            Choose the ideal bottle configuration for your personal routine or family wellness pantry.
          </p>
        </div>

        {/* Pack Selector Tabs */}
        <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-10">
          {products.map((p: any, i: number) => (
            <button
              key={p.id}
              onClick={() => setSelectedPackIndex(i)}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedPackIndex === i
                  ? 'bg-[#E8D85B] text-[#0D1711] shadow-lg shadow-[#E8D85B]/20 scale-105'
                  : 'glass-panel text-white/80 hover:text-white'
              }`}
            >
              {p.netQuantity} {p.badge ? `• ${p.badge}` : ''}
            </button>
          ))}
        </div>

        {/* Main Showcase Split Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center glass-panel p-6 sm:p-10 rounded-3xl border border-[#E8D85B]/30 shadow-2xl">
          
          {/* Left: Product Image & Orbiting Particles */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            <div className="relative w-64 sm:w-80 aspect-square flex items-center justify-center">
              <div className="absolute inset-0 bg-[#E8D85B]/10 rounded-full blur-2xl" />
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] hover:scale-105 transition-transform duration-500 rounded-2xl"
              />
            </div>
            <p className="text-xs text-[#E8D85B] font-medium mt-4">
              ✓ 100% Recyclable Amber Glass Packaging
            </p>
          </div>

          {/* Right: Product Details & Purchase Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              {currentProduct.badge && (
                <span className="text-[10px] font-bold uppercase tracking-widest bg-[#E8D85B] text-[#0D1711] px-3 py-1 rounded-full mb-3 inline-block">
                  {currentProduct.badge}
                </span>
              )}
              <h3 className="text-2xl sm:text-4xl font-bold text-[#F7F3E8] font-serif-luxury">
                {currentProduct.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#E8D85B] font-medium mt-1">
                {currentProduct.servings}
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#F7F3E8]/80 leading-relaxed">
              {currentProduct.detailedDescription}
            </p>

            {/* Highlights */}
            <div className="space-y-2">
              {currentProduct.keyHighlights.map((h: string, i: number) => (
                <div key={i} className="flex items-center space-x-2 text-xs sm:text-sm text-[#F7F3E8]/90">
                  <span className="text-[#E8D85B] font-bold">✓</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* Pricing Section */}
            <div className="pt-4 border-t border-white/10 flex items-baseline space-x-3">
              <span className="text-3xl sm:text-4xl font-black text-[#E8D85B]">
                ₹{currentProduct.price}
              </span>
              <span className="text-base sm:text-lg text-white/50 line-through">
                ₹{currentProduct.originalPrice}
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                Save ₹{currentProduct.originalPrice - currentProduct.price}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => buyNow(currentProduct)}
                className="flex-1 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#E8D85B] via-[#D7A84B] to-[#E8D85B] text-[#0D1711] font-bold text-sm hover:scale-105 transition-transform shadow-lg shadow-[#E8D85B]/20 text-center cursor-pointer"
              >
                Buy Now (Instant Checkout)
              </button>
              <button
                onClick={() => addToCart(currentProduct)}
                className="py-3.5 px-6 rounded-full glass-panel border border-white/20 hover:border-[#E8D85B]/50 text-[#F7F3E8] font-semibold text-sm transition-colors text-center cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
