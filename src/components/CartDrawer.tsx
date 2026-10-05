import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Truck, 
  ShieldCheck, 
  MessageCircle,
  Sparkles
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartCount,
    subtotal,
    discount,
    shipping,
    total,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    couponCode,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setActiveView,
    generateWhatsAppLink
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon) return;
    const res = applyCoupon(inputCoupon);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError(null);
      setInputCoupon('');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isCartOpen) return null;

  const freeShippingThreshold = 799;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-screen max-w-md bg-[#0D1711] border-l border-white/10 text-[#F7F3E8] shadow-2xl flex flex-col justify-between"
        >
          {/* Cart Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#E8D85B]" />
              <h2 className="text-lg font-bold font-serif-luxury text-[#F7F3E8]">
                Your Wellness Cart ({cartCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-[#163020] border-b border-white/10 text-xs">
            {subtotal >= freeShippingThreshold ? (
              <div className="flex items-center space-x-2 text-[#E8D85B] font-semibold">
                <Truck className="w-4 h-4" />
                <span>🎉 Congratulations! You have unlocked FREE Express Delivery.</span>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex justify-between text-white/80">
                  <span>Add <strong>₹{freeShippingThreshold - subtotal}</strong> more for Free Delivery</span>
                  <span>{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#0D1711] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#E8D85B] to-[#D7A84B] transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto text-white/40">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold font-serif-luxury text-white/90">
                  Your cart is currently empty
                </h3>
                <p className="text-xs text-white/60 max-w-xs mx-auto">
                  Experience the daily vitality of Lemon, Garlic, Ginger and Apple Cider Vinegar.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActiveView('shop');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#E8D85B] text-[#0D1711] font-bold text-xs hover:scale-105 transition-transform"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="glass-panel p-4 rounded-2xl border border-white/10 flex space-x-4 items-center"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-xl border border-white/10 shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-[#F7F3E8] truncate font-serif-luxury">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-[#E8D85B] font-medium">
                      {item.product.netQuantity}
                    </p>
                    <div className="text-xs font-bold text-white/90 mt-1">
                      ₹{item.product.price}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3 mt-2">
                      <div className="flex items-center space-x-2 bg-[#0D1711] border border-white/20 rounded-lg px-2 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="text-white/70 hover:text-white p-0.5 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#E8D85B] w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="text-white/70 hover:text-white p-0.5 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-400/80 hover:text-red-400 text-xs p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#0D1711]/90 backdrop-blur-md space-y-4">
              
              {/* Coupon Code Section */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#163020] border border-[#E8D85B]/30 text-xs">
                  <div className="flex items-center space-x-2 text-[#E8D85B]">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon <strong>{appliedCoupon}</strong> Applied (-₹{discount})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-400 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. WELLNESS10)"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8D85B] uppercase"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-white/15 hover:bg-[#E8D85B] hover:text-[#0D1711] text-xs font-bold transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[10px] text-red-400">{couponError}</p>
                  )}
                </form>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-white/80 pt-2 border-t border-white/10">
                <div className="flex justify-between">
                  <span>Product Subtotal</span>
                  <span className="font-semibold text-white">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#E8D85B]">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{shipping === 0 ? <span className="text-emerald-400 font-semibold">FREE</span> : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#F7F3E8] pt-2 border-t border-white/10">
                  <span>Estimated Total</span>
                  <span className="text-base text-[#E8D85B]">₹{total}</span>
                </div>
              </div>

              {/* Primary Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#E8D85B] via-[#D7A84B] to-[#E8D85B] text-[#0D1711] font-bold text-sm tracking-wide shadow-lg shadow-[#E8D85B]/20 hover:scale-[1.02] transition-transform flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>PROCEED TO CHECKOUT • ₹{total}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* WhatsApp Quick Order from Cart */}
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] font-semibold text-xs flex items-center justify-center space-x-2 hover:bg-[#25D366]/30 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order this Cart on WhatsApp</span>
              </a>

              <div className="flex items-center justify-center space-x-4 text-[10px] text-white/50 pt-1">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>100% Secure Checkout</span>
                </span>
                <span>•</span>
                <span>Fast Dispatch</span>
              </div>

            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export const ShopView: React.FC = () => {
  const { addToCart, buyNow, setSelectedProductModal } = useCart();
  const [filter, setFilter] = useState<'all' | 'single' | 'bundle'>('all');
  const [quantities, setQuantities] = useState<Record<string, number>>({
    'as-single-500': 1,
    'as-duo-pack': 1,
    'as-family-trio': 1
  });

  const handleQtyChange = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  const filteredProducts = PRODUCTS.filter((p: any) => {
    if (filter === 'single') return p.id === 'as-single-500';
    if (filter === 'bundle') return p.id !== 'as-single-500';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0D1711] text-[#F7F3E8] pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Shop Hero */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-[0.25em] text-[#E8D85B] uppercase px-4 py-1 rounded-full border border-[#E8D85B]/20 bg-[#E8D85B]/5 inline-block mb-3">
            OFFICIAL AMRUT SANJEEVANI SHOP
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#F7F3E8] leading-tight font-serif-luxury">
            Shop Amrut Sanjeevani
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#F7F3E8]/80 leading-relaxed">
            Choose the product option that fits your everyday wellness routine. All packs feature our signature cold-macerated blend in amber glass bottles.
          </p>

          {/* Filter Tabs */}
          <div className="flex items-center justify-center space-x-3 mt-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#E8D85B] text-[#0D1711] shadow-lg shadow-[#E8D85B]/20'
                  : 'glass-panel text-white/80 hover:text-white'
              }`}
            >
              All Options ({PRODUCTS.length})
            </button>
            <button
              onClick={() => setFilter('single')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                filter === 'single'
                  ? 'bg-[#E8D85B] text-[#0D1711] shadow-lg shadow-[#E8D85B]/20'
                  : 'glass-panel text-white/80 hover:text-white'
              }`}
            >
              Single Bottle (500ml)
            </button>
            <button
              onClick={() => setFilter('bundle')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                filter === 'bundle'
                  ? 'bg-[#E8D85B] text-[#0D1711] shadow-lg shadow-[#E8D85B]/20'
                  : 'glass-panel text-white/80 hover:text-white'
              }`}
            >
              Multi-Packs & Bundles
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProducts.map((prod: any) => {
            const currentQty = quantities[prod.id] || 1;
            return (
              <div
                key={prod.id}
                className="glass-panel rounded-3xl border border-white/10 hover:border-[#E8D85B]/40 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl group hover:shadow-2xl hover:shadow-[#E8D85B]/10 relative"
              >
                {prod.badge && (
                  <span className="absolute top-6 right-6 bg-gradient-to-r from-[#E8D85B] to-[#D7A84B] text-[#0D1711] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {prod.badge}
                  </span>
                )}

                <div>
                  {/* Image Container */}
                  <div
                    onClick={() => setSelectedProductModal(prod)}
                    className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-[#0D1711] p-1 flex items-center justify-center cursor-pointer group-hover:shadow-2xl group-hover:shadow-[#E8D85B]/15 transition-all duration-300 border border-white/5 group-hover:border-[#E8D85B]/30"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-700 rounded-xl"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    <div className="absolute bottom-3 text-[10px] uppercase font-bold text-[#E8D85B] bg-[#0D1711]/90 px-3 py-1 rounded-full border border-[#E8D85B]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                      Explore Product
                    </div>
                  </div>

                  <span className="text-xs text-[#E8D85B] font-semibold uppercase tracking-wider block mb-1">
                    {prod.tagline}
                  </span>
                  <h3
                    onClick={() => setSelectedProductModal(prod)}
                    className="text-xl sm:text-2xl font-bold text-[#F7F3E8] font-serif-luxury cursor-pointer hover:text-[#E8D85B] transition-colors"
                  >
                    {prod.name}
                  </h3>
                  <p className="text-xs text-white/60 mt-1">
                    Net Quantity: <strong>{prod.netQuantity}</strong> • {prod.servings}
                  </p>

                  <p className="text-xs text-white/80 mt-3 line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>

                  {/* Price Row */}
                  <div className="mt-6 flex items-baseline space-x-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#E8D85B]">
                      ₹{prod.price}
                    </span>
                    <span className="text-sm text-white/50 line-through">
                      ₹{prod.originalPrice}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full ml-auto">
                      Save ₹{prod.originalPrice - prod.price}
                    </span>
                  </div>
                </div>

                {/* Quantity & CTA Actions */}
                <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
                  
                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between bg-[#0D1711] border border-white/15 rounded-xl p-1.5">
                    <span className="text-xs text-white/70 pl-2">Select Quantity:</span>
                    <div className="flex items-center space-x-3 pr-1">
                      <button
                        onClick={() => handleQtyChange(prod.id, -1)}
                        className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-bold text-[#E8D85B] w-4 text-center">
                        {currentQty}
                      </span>
                      <button
                        onClick={() => handleQtyChange(prod.id, 1)}
                        className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => addToCart(prod, currentQty)}
                      className="py-3 px-3 rounded-xl glass-panel border border-white/20 hover:border-[#E8D85B]/50 text-white font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#E8D85B]" />
                      <span>ADD TO CART</span>
                    </button>
                    <button
                      onClick={() => buyNow(prod, currentQty)}
                      className="py-3 px-3 rounded-xl bg-gradient-to-r from-[#E8D85B] via-[#D7A84B] to-[#E8D85B] text-[#0D1711] font-bold text-xs hover:scale-105 transition-transform flex items-center justify-center space-x-1.5 shadow-md shadow-[#E8D85B]/20 cursor-pointer"
                    >
                      <span>BUY NOW</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Value Trust Features Bar */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <span className="text-2xl mb-2 block">🚚</span>
            <h4 className="text-sm font-bold text-[#F7F3E8]">Free Priority Shipping</h4>
            <p className="text-xs text-white/70 mt-1">Dispatched within 24 hours in cushioned eco-pack boxes.</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <span className="text-2xl mb-2 block">🌿</span>
            <h4 className="text-sm font-bold text-[#F7F3E8]">100% Clean Formulation</h4>
            <p className="text-xs text-white/70 mt-1">No refined sugars, chemical stabilizers, or synthetic extracts.</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <span className="text-2xl mb-2 block">💬</span>
            <h4 className="text-sm font-bold text-[#F7F3E8]">Dedicated WhatsApp Care</h4>
            <p className="text-xs text-white/70 mt-1">Direct access to our wellness support team for questions & reorders.</p>
          </div>
        </div>

      </div>
    </div>
  );
};
