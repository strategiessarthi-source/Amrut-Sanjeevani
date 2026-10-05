import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { X, Calendar, Phone, CheckCircle2, MessageCircle, Send, ShoppingBag } from 'lucide-react';

export const OrderBookingModal: React.FC = () => {
  const { isBookingOpen, setIsBookingOpen, showToast, generateWhatsAppLink } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    productId: 'as-single-500',
    quantity: 1,
    city: '',
    address: '',
    contactPreference: 'whatsapp' as 'whatsapp' | 'call' | 'email',
    notes: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isBookingOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.mobile || !formData.city) {
      showToast('Please provide your name, mobile number and city');
      return;
    }
    setIsSuccess(true);
    showToast('Your Amrut Sanjeevani booking has been recorded!');
  };

  const selectedProduct = PRODUCTS.find((p) => p.id === formData.productId) || PRODUCTS[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-[#0D1711] border border-[#E8D85B]/30 rounded-3xl p-6 sm:p-8 text-[#F7F3E8] shadow-2xl overflow-hidden my-8"
      >
        {/* Close */}
        <button
          onClick={() => setIsBookingOpen(false)}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F3E8] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#E8D85B]/20 text-[#E8D85B] flex items-center justify-center mx-auto border border-[#E8D85B]/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-serif-luxury text-[#F7F3E8]">
              Booking Reserved, {formData.fullName}!
            </h3>
            <p className="text-xs text-white/70 max-w-md mx-auto leading-relaxed">
              We have recorded your booking for <strong>{formData.quantity}x {selectedProduct.name}</strong>. Our wellness concierge will connect with you via {formData.contactPreference.toUpperCase()} at <strong>{formData.mobile}</strong> to confirm dispatch details.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <a
                href={generateWhatsAppLink(selectedProduct, formData.quantity, `Hello, I just submitted an order booking for ${formData.fullName} in ${formData.city}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-[#25D366] text-black font-bold text-xs flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm Instantly via WhatsApp</span>
              </a>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setIsBookingOpen(false);
                }}
                className="px-6 py-2.5 rounded-full bg-white/10 text-white font-semibold text-xs hover:bg-white/20 cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E8D85B] bg-[#E8D85B]/10 px-3 py-1 rounded-full border border-[#E8D85B]/20">
                MANUAL ORDER BOOKING
              </span>
              <h2 className="text-2xl font-bold font-serif-luxury text-[#F7F3E8] mt-2">
                Book Your Amrut Sanjeevani Package
              </h2>
              <p className="text-xs text-white/70 mt-0.5">
                Prefer to order with phone assistance or direct callback? Reserve below and our team will handle everything.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Sen"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-xs text-white focus:outline-none focus:border-[#E8D85B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-xs text-white focus:outline-none focus:border-[#E8D85B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                  Select Product Pack
                </label>
                <select
                  value={formData.productId}
                  onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#163020] border border-white/20 text-xs text-white focus:outline-none focus:border-[#E8D85B]"
                >
                  {PRODUCTS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (₹{p.price})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                  Quantity
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-xs text-white focus:outline-none focus:border-[#E8D85B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                  City / Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pune / Mumbai"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-xs text-white focus:outline-none focus:border-[#E8D85B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                  Preferred Contact Method
                </label>
                <select
                  value={formData.contactPreference}
                  onChange={(e) => setFormData({ ...formData, contactPreference: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#163020] border border-white/20 text-xs text-white focus:outline-none focus:border-[#E8D85B]"
                >
                  <option value="whatsapp">WhatsApp Message</option>
                  <option value="call">Direct Phone Call</option>
                  <option value="email">Email</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                Delivery Address & Notes
              </label>
              <textarea
                rows={2}
                placeholder="Enter complete shipping address or any specific instructions..."
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-xs text-white focus:outline-none focus:border-[#E8D85B] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#E8D85B] via-[#D7A84B] to-[#E8D85B] text-[#0D1711] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#E8D85B]/20 hover:scale-[1.01] transition-transform cursor-pointer"
            >
              Confirm My Order Booking
            </button>
          </form>
        )}

      </motion.div>
    </div>
  );
};

export const AccountModal: React.FC = () => {
  const { isAccountOpen, setIsAccountOpen, orders, addToCart, setIsTrackOrderOpen, setActiveView } = useCart();

  if (!isAccountOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl bg-[#0D1711] border border-[#E8D85B]/30 rounded-3xl p-6 sm:p-8 text-[#F7F3E8] shadow-2xl overflow-hidden my-8"
      >
        {/* Close */}
        <button
          onClick={() => setIsAccountOpen(false)}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F3E8] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pb-6 border-b border-white/10 mb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#E8D85B] bg-[#E8D85B]/10 px-3 py-1 rounded-full border border-[#E8D85B]/20">
            CUSTOMER PORTAL
          </span>
          <h2 className="text-2xl font-bold font-serif-luxury text-[#F7F3E8] mt-2">
            Your Wellness Account & Orders
          </h2>
          <p className="text-xs text-white/70 mt-0.5">
            View past orders, track active dispatches, and quick reorder your daily morning blend.
          </p>
        </div>

        {/* Orders List */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {orders.length === 0 ? (
            <div className="text-center py-12 text-xs text-white/50 space-y-3">
              <p>No orders placed yet in this session.</p>
              <button
                onClick={() => {
                  setIsAccountOpen(false);
                  setActiveView('shop');
                }}
                className="px-5 py-2 rounded-full bg-[#E8D85B] text-[#0D1711] font-bold text-xs cursor-pointer"
              >
                Shop Now
              </button>
            </div>
          ) : (
            orders.map((ord) => (
              <div key={ord.orderId} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs border-b border-white/5 pb-2">
                  <div>
                    <span className="font-bold text-[#E8D85B] font-mono">#{ord.orderId}</span>
                    <span className="text-white/50 ml-2">({ord.orderDate})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                      {ord.orderStatus}
                    </span>
                    <span className="font-bold text-white">₹{ord.total}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {ord.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs text-white/80">
                      <span>{item.quantity}x {item.productName} ({item.netQuantity})</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                  <span className="text-white/50 text-[11px]">Est. Delivery: {ord.estimatedDeliveryDate}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setIsAccountOpen(false);
                        setIsTrackOrderOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
                    >
                      Track Package
                    </button>
                    <button
                      onClick={() => {
                        const firstProduct = PRODUCTS.find((p) => p.id === ord.items[0]?.productId) || PRODUCTS[0];
                        addToCart(firstProduct, 1);
                        setIsAccountOpen(false);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#E8D85B] text-[#0D1711] text-xs font-bold cursor-pointer"
                    >
                      Reorder
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </motion.div>
    </div>
  );
};
