import React from 'react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { ArrowRight, ShoppingBag, Sparkles, Star, ShieldCheck, Heart } from 'lucide-react';

export const HeroProductReveal: React.FC = () => {
  const { addToCart, buyNow, setSelectedProductModal, setActiveView } = useCart();
  const product = PRODUCTS[0];
  const [selectedVariantId, setSelectedVariantId] = React.useState<string>('500g');

  const activeVariant = product.variants
    ? product.variants.find((v) => v.id === selectedVariantId) || product.variants[0]
    : null;

  const currentPrice = activeVariant ? activeVariant.price : product.price;
  const currentOriginalPrice = activeVariant ? activeVariant.originalPrice : product.originalPrice;
  const currentNetQuantity = activeVariant ? activeVariant.netQuantity : product.netQuantity;
  const currentServings = activeVariant ? activeVariant.servings : product.servings;

  const variantConfiguredProduct = activeVariant ? {
    ...product,
    id: `${product.id}-${activeVariant.id}`,
    name: `${product.name} (${activeVariant.label})`,
    netQuantity: activeVariant.netQuantity,
    servings: activeVariant.servings,
    price: activeVariant.price,
    originalPrice: activeVariant.originalPrice,
    selectedVariantId: activeVariant.id,
  } : product;

  return (
    <section id="product-reveal" className="relative py-20 md:py-32 bg-[#0D1711] overflow-hidden border-t border-white/5">
      {/* Glow Backlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#163020] via-[#E8D85B]/15 to-[#3E6B45]/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.25em] text-[#E8D85B] uppercase px-4 py-1 rounded-full border border-[#E8D85B]/20 bg-[#E8D85B]/5 inline-block mb-3"
          >
            THE SIGNATURE BLEND
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold text-[#F7F3E8] tracking-tight font-serif-luxury"
          >
            Four Powerful Natural Ingredients.<br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#E8D85B] to-[#D7A84B] bg-clip-text text-transparent">
              One Thoughtful Blend.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#F7F3E8]/75"
          >
            Sun-ripened Lemon, aged Himalayan Garlic, mountain Ginger, and raw fermented Apple Cider Vinegar come together in harmonic daily balance.
          </motion.p>
        </div>

        {/* 3D Orbiting Product Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Feature Specs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-6 order-2 lg:order-1"
          >
            <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-[#E8D85B]/30 transition-colors">
              <span className="text-[#E8D85B] text-xs font-bold tracking-wider uppercase">01 • Purity</span>
              <h4 className="text-base font-semibold text-[#F7F3E8] mt-1">Cold Macerated</h4>
              <p className="text-xs text-[#F7F3E8]/70 mt-1 leading-relaxed">
                Raw extraction without excessive heat to protect delicate plant enzymes and polyphenols.
              </p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-[#E8D85B]/30 transition-colors">
              <span className="text-[#E8D85B] text-xs font-bold tracking-wider uppercase">02 • Balance</span>
              <h4 className="text-base font-semibold text-[#F7F3E8] mt-1">Mother of Vinegar</h4>
              <p className="text-xs text-[#F7F3E8]/70 mt-1 leading-relaxed">
                Unfiltered fermented apple cider vinegar naturally rich in beneficial enzymes and living cultures.
              </p>
            </div>
          </motion.div>

          {/* Center Product Visual with Orbiting Satellite Badges */}
          <div className="lg:col-span-6 relative flex items-center justify-center order-1 lg:order-2 py-8">
            {/* Center Glowing Ring */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-[#E8D85B]/20 animate-pulse-glow pointer-events-none" />
            <div className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full border border-dashed border-[#D7A84B]/15 pointer-events-none" />

            {/* Orbiting Satellite Elements */}
            {/* Lemon Badge */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 left-4 sm:left-12 z-20 glass-panel px-3 py-2 rounded-full border border-[#E8D85B]/40 flex items-center space-x-2 shadow-lg"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8D85B] animate-ping" />
              <span className="text-xs font-semibold text-[#E8D85B]">Fresh Lemon (25%)</span>
            </motion.div>

            {/* Garlic Badge */}
            <motion.div
              animate={{ y: [8, -12, 8] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-2 right-4 sm:right-12 z-20 glass-panel px-3 py-2 rounded-full border border-white/30 flex items-center space-x-2 shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-white" />
              <span className="text-xs font-semibold text-[#F7F3E8]">Aged Garlic (25%)</span>
            </motion.div>

            {/* Ginger Badge */}
            <motion.div
              animate={{ y: [-8, 12, -8] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 left-4 sm:left-12 z-20 glass-panel px-3 py-2 rounded-full border border-[#D7A84B]/40 flex items-center space-x-2 shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-[#D7A84B]" />
              <span className="text-xs font-semibold text-[#D7A84B]">Mountain Ginger (25%)</span>
            </motion.div>

            {/* ACV Badge */}
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 right-4 sm:right-12 z-20 glass-panel px-3 py-2 rounded-full border border-[#D7A84B]/40 flex items-center space-x-2 shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-[#E8D85B]" />
              <span className="text-xs font-semibold text-[#E8D85B]">Raw ACV (25%)</span>
            </motion.div>

            {/* The Main Center Product Card / Bottle Showcase */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-64 sm:w-80 rounded-3xl p-6 glass-panel border border-[#E8D85B]/30 shadow-2xl shadow-[#163020] text-center flex flex-col items-center cursor-pointer group"
              onClick={() => setSelectedProductModal(variantConfiguredProduct)}
            >
              <div className="absolute top-4 right-4 bg-[#E8D85B] text-[#0D1711] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Signature
              </div>

              {/* Product Bottle Image with Soft Spotlight */}
              <div className="relative w-48 h-64 sm:w-56 sm:h-72 my-2 rounded-2xl overflow-hidden flex items-center justify-center border border-white/10 shadow-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-700 rounded-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#F7F3E8] font-serif-luxury mt-2">
                {product.name}
              </h3>
              <p className="text-xs text-[#E8D85B] font-medium tracking-wide">
                Net Vol: {currentNetQuantity} • {currentServings.split('(')[0].trim()}
              </p>

              {/* Rating */}
              <div className="flex items-center space-x-1.5 mt-2">
                <div className="flex text-[#E8D85B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#E8D85B]" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-white/80">4.9/5 ({product.reviewCount})</span>
              </div>

              {/* Weight / Size Variant Quick Selector */}
              {product.variants && (
                <div className="w-full mt-3 grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
                  {product.variants.map((v: any) => {
                    const isSelected = activeVariant?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVariantId(v.id);
                        }}
                        className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#E8D85B] text-[#0D1711] shadow-sm'
                            : 'text-white/70 hover:text-white'
                        }`}
                      >
                        {v.label} (₹{v.price})
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Price & Action */}
              <div className="w-full mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="text-left">
                  <span className="text-xs text-white/50 line-through mr-1.5">₹{currentOriginalPrice}</span>
                  <span className="text-lg font-extrabold text-[#E8D85B]">₹{currentPrice}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(variantConfiguredProduct);
                  }}
                  className="p-2.5 rounded-full bg-gradient-to-r from-[#E8D85B] to-[#D7A84B] text-[#0D1711] font-bold hover:scale-110 transition-transform shadow-md cursor-pointer"
                  title="Add to Cart"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Feature Specs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-6 order-3"
          >
            <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-[#E8D85B]/30 transition-colors">
              <span className="text-[#E8D85B] text-xs font-bold tracking-wider uppercase">03 • Integrity</span>
              <h4 className="text-base font-semibold text-[#F7F3E8] mt-1">Zero Additives</h4>
              <p className="text-xs text-[#F7F3E8]/70 mt-1 leading-relaxed">
                No refined sugars, artificial coloring, synthetic essences, or chemical preservatives.
              </p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-[#E8D85B]/30 transition-colors">
              <span className="text-[#E8D85B] text-xs font-bold tracking-wider uppercase">04 • Routine</span>
              <h4 className="text-base font-semibold text-[#F7F3E8] mt-1">Effortless Morning</h4>
              <p className="text-xs text-[#F7F3E8]/70 mt-1 leading-relaxed">
                Just 15ml in warm water. A refreshing ritual to begin each productive morning with clarity.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA Actions */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => buyNow(product)}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E8D85B] via-[#D7A84B] to-[#E8D85B] text-[#0D1711] font-bold text-sm tracking-wide shadow-lg shadow-[#E8D85B]/20 hover:scale-105 transition-transform cursor-pointer"
          >
            Order Amrut Sanjeevani • ₹{product.price}
          </button>
          <button
            onClick={() => {
              setActiveView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3.5 rounded-full glass-panel border border-white/20 text-[#F7F3E8] hover:text-[#E8D85B] font-semibold text-sm transition-colors cursor-pointer"
          >
            View All Packs & Bundles →
          </button>
        </div>
      </div>
    </section>
  );
};
