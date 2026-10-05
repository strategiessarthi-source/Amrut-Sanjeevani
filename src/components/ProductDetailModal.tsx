import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Star, 
  Minus, 
  Plus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  ChevronDown, 
  Check, 
  Droplets, 
  MessageCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProductModal, setSelectedProductModal, addToCart, buyNow, generateWhatsAppLink } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openTab, setOpenTab] = useState<'desc' | 'ingredients' | 'usage' | 'storage' | 'shipping'>('desc');
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  if (!selectedProductModal) return null;
  const prod = selectedProductModal;

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus('✓ Express Delivery available to ' + pincode + ' in 2–3 Business Days. Free Delivery applied!');
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian PIN code.');
    }
  };

  const images = prod.gallery && prod.gallery.length > 0 ? prod.gallery : [prod.image];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-[#0D1711] border border-[#E8D85B]/30 rounded-3xl p-6 sm:p-8 text-[#F7F3E8] shadow-2xl overflow-hidden my-8 max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductModal(null)}
          className="absolute top-6 right-6 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F3E8] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#163020]/50 border border-white/10 flex items-center justify-center p-2">
              <img
                src={images[selectedImageIndex] || prod.image}
                alt={prod.name}
                className="w-full h-full object-cover filter drop-shadow-2xl transition-transform duration-500 hover:scale-105 rounded-xl"
                referrerPolicy="no-referrer"
              />
              {prod.badge && (
                <span className="absolute top-4 left-4 bg-gradient-to-r from-[#E8D85B] to-[#D7A84B] text-[#0D1711] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {prod.badge}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      selectedImageIndex === i
                        ? 'border-[#E8D85B] scale-105'
                        : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details, Pricing & Purchase Actions */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <span className="text-[11px] font-bold tracking-widest text-[#E8D85B] uppercase">
                {prod.tagline}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#F7F3E8] mt-1">
                {prod.name}
              </h2>
              <p className="text-xs text-white/60 mt-0.5">
                Net Quantity: <strong>{prod.netQuantity}</strong> • {prod.servings}
              </p>
            </div>

            {/* Reviews */}
            <div className="flex items-center space-x-2">
              <div className="flex text-[#E8D85B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#E8D85B]" />
                ))}
              </div>
              <span className="text-xs font-bold text-white/90">
                {prod.rating} / 5.0
              </span>
              <span className="text-xs text-white/50">
                ({prod.reviewCount} verified customer reviews)
              </span>
            </div>

            {/* Price Box */}
            <div className="flex items-baseline space-x-3 p-4 rounded-2xl bg-[#163020] border border-white/10">
              <span className="text-3xl font-black text-[#E8D85B]">
                ₹{prod.price}
              </span>
              <span className="text-base text-white/50 line-through">
                ₹{prod.originalPrice}
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full ml-auto">
                Save ₹{prod.originalPrice - prod.price} (33% Off)
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-white/80 uppercase tracking-wider">
                Select Quantity:
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 bg-white/5 border border-white/15 rounded-xl px-3 py-1.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-white/70 hover:text-white p-1 cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-base font-bold text-[#E8D85B] w-6 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-white/70 hover:text-white p-1 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-xs text-white/60">
                  Total: <strong>₹{prod.price * quantity}</strong>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => addToCart(prod, quantity)}
                  className="py-3.5 px-4 rounded-xl glass-panel border border-white/20 hover:border-[#E8D85B]/50 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#E8D85B]" />
                  <span>ADD TO CART</span>
                </button>
                <button
                  onClick={() => buyNow(prod, quantity)}
                  className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#E8D85B] via-[#D7A84B] to-[#E8D85B] text-[#0D1711] font-bold text-xs hover:scale-[1.02] transition-transform flex items-center justify-center space-x-2 shadow-lg shadow-[#E8D85B]/20 cursor-pointer"
                >
                  <span>BUY NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Order via WhatsApp direct button */}
              <a
                href={generateWhatsAppLink(prod, quantity)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] font-semibold text-xs flex items-center justify-center space-x-2 hover:bg-[#25D366]/25 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order this item on WhatsApp</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-white/70 text-center">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <span>Secure Checkout</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <Truck className="w-4 h-4 text-[#E8D85B] mx-auto mb-1" />
                <span>Fast Dispatch</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <MessageCircle className="w-4 h-4 text-[#25D366] mx-auto mb-1" />
                <span>WhatsApp Care</span>
              </div>
            </div>

            {/* Pincode Check */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <form onSubmit={handleCheckPincode} className="flex space-x-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter Delivery Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-[#0D1711] border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8D85B]"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-white/15 hover:bg-[#E8D85B] hover:text-[#0D1711] text-xs font-semibold transition-colors"
                >
                  Check
                </button>
              </form>
              {pincodeStatus && (
                <p className={`text-[11px] mt-2 ${pincodeStatus.startsWith('✓') ? 'text-emerald-400' : 'text-red-400'}`}>
                  {pincodeStatus}
                </p>
              )}
            </div>

            {/* Collapsible Info Tabs */}
            <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
              
              {/* Product Description */}
              <div className="border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenTab(openTab === 'desc' ? ('' as any) : 'desc')}
                  className="w-full p-3 text-left font-bold text-white flex justify-between items-center hover:bg-white/5"
                >
                  <span>Product Description & Purity</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openTab === 'desc' ? 'rotate-180 text-[#E8D85B]' : ''}`} />
                </button>
                {openTab === 'desc' && (
                  <div className="p-3 pt-0 text-white/80 leading-relaxed space-y-2 border-t border-white/5">
                    <p>{prod.detailedDescription}</p>
                    <ul className="space-y-1 mt-2">
                      {prod.keyHighlights.map((h, i) => (
                        <li key={i} className="flex items-center space-x-1.5 text-white/90">
                          <Check className="w-3.5 h-3.5 text-[#E8D85B]" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Composition */}
              <div className="border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenTab(openTab === 'ingredients' ? ('' as any) : 'ingredients')}
                  className="w-full p-3 text-left font-bold text-white flex justify-between items-center hover:bg-white/5"
                >
                  <span>Four Botanical Ingredients (25% Each)</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openTab === 'ingredients' ? 'rotate-180 text-[#E8D85B]' : ''}`} />
                </button>
                {openTab === 'ingredients' && (
                  <div className="p-3 pt-0 text-white/80 space-y-2 border-t border-white/5">
                    {prod.composition.map((c, i) => (
                      <div key={i} className="flex justify-between items-start border-b border-white/5 pb-1">
                        <div>
                          <span className="font-semibold text-[#E8D85B]">{c.name}</span>
                          <p className="text-[11px] text-white/60">{c.role}</p>
                        </div>
                        <span className="font-bold text-white">{c.percentage}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* How to Use */}
              <div className="border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenTab(openTab === 'usage' ? ('' as any) : 'usage')}
                  className="w-full p-3 text-left font-bold text-white flex justify-between items-center hover:bg-white/5"
                >
                  <span>How To Use & Daily Serving</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openTab === 'usage' ? 'rotate-180 text-[#E8D85B]' : ''}`} />
                </button>
                {openTab === 'usage' && (
                  <div className="p-3 pt-0 text-white/80 leading-relaxed border-t border-white/5">
                    <p>{prod.usageDirections}</p>
                  </div>
                )}
              </div>

              {/* Storage */}
              <div className="border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenTab(openTab === 'storage' ? ('' as any) : 'storage')}
                  className="w-full p-3 text-left font-bold text-white flex justify-between items-center hover:bg-white/5"
                >
                  <span>Storage & Handling</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openTab === 'storage' ? 'rotate-180 text-[#E8D85B]' : ''}`} />
                </button>
                {openTab === 'storage' && (
                  <div className="p-3 pt-0 text-white/80 leading-relaxed border-t border-white/5">
                    <p>{prod.storageInfo}</p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

      </motion.div>
    </div>
  );
};
