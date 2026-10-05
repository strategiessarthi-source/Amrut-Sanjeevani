import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { 
  ShieldCheck, 
  Truck, 
  ArrowLeft, 
  CreditCard, 
  QrCode, 
  CheckCircle2, 
  ShoppingBag, 
  Tag, 
  Lock,
  MessageCircle
} from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    subtotal,
    discount,
    shipping,
    total,
    appliedCoupon,
    createOrder,
    setActiveView,
    generateWhatsAppLink,
    showToast
  } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    flatNo: '',
    street: '',
    landmark: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    deliveryNotes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card'>('UPI');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', exp: '', cvv: '', name: '' });
  const [isProcessing, setIsProcessing] = useState(false);

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
    'Uttarakhand', 'West Bengal', 'Delhi NCR', 'Chandigarh'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.mobile || !formData.street || !formData.city || !formData.pincode) {
      showToast('Please fill in all required delivery fields.');
      return;
    }

    if (formData.pincode.length !== 6 || !/^\d+$/.test(formData.pincode)) {
      showToast('Please enter a valid 6-digit Indian PIN code.');
      return;
    }

    setIsProcessing(true);

    // Simulate fast realistic gateway authorization
    setTimeout(() => {
      const orderPayload = {
        customerName: formData.fullName,
        mobileNumber: formData.mobile,
        email: formData.email || `${formData.mobile}@amrutsanjeevani.com`,
        address: {
          house: formData.flatNo,
          street: formData.street,
          landmark: formData.landmark,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        },
        deliveryNotes: formData.deliveryNotes,
        items: cart.map((c) => ({
          productId: c.product.id,
          productName: c.product.name,
          netQuantity: c.product.netQuantity,
          quantity: c.quantity,
          price: c.product.price
        })),
        subtotal,
        discount,
        shipping,
        total,
        paymentMethod,
        paymentStatus: 'Paid' as const
      };

      const created = createOrder(orderPayload);
      setIsProcessing(false);
      showToast(`Order #${created.orderId} confirmed successfully!`);
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0D1711] text-[#F7F3E8] py-20 flex items-center justify-center">
        <div className="text-center max-w-md p-8 glass-panel rounded-3xl border border-white/10 space-y-4">
          <ShoppingBag className="w-12 h-12 text-[#E8D85B] mx-auto" />
          <h2 className="text-2xl font-bold font-serif-luxury text-[#F7F3E8]">
            Your Cart is Empty
          </h2>
          <p className="text-xs text-white/70">
            Please add an Amrut Sanjeevani product to your cart before proceeding to checkout.
          </p>
          <button
            onClick={() => setActiveView('shop')}
            className="px-6 py-3 rounded-full bg-[#E8D85B] text-[#0D1711] font-bold text-xs hover:scale-105 transition-transform"
          >
            Explore Product Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D1711] text-[#F7F3E8] pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Checkout Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveView('shop')}
            className="flex items-center space-x-2 text-xs font-semibold text-white/70 hover:text-[#E8D85B] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Shop</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold font-serif-luxury text-[#F7F3E8]">
              Secure Checkout
            </h1>
            <p className="text-[11px] text-[#E8D85B] tracking-wider uppercase">
              256-Bit Encrypted Payment
            </p>
          </div>

          <div className="flex items-center space-x-1 text-emerald-400 text-xs font-medium">
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">SSL Verified</span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Customer & Delivery Address & Payment Selection */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Customer Contact */}
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
                <div className="flex items-center space-x-2 pb-3 border-b border-white/10">
                  <span className="w-6 h-6 rounded-full bg-[#E8D85B] text-[#0D1711] flex items-center justify-center text-xs font-bold">1</span>
                  <h3 className="text-lg font-bold font-serif-luxury text-[#F7F3E8]">
                    Contact Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Ramesh Patel"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8D85B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                      Mobile Number (WhatsApp Enabled) *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8D85B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                    Email Address (For Invoice & Dispatch Tracking)
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. ramesh.patel@gmail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8D85B]"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
                <div className="flex items-center space-x-2 pb-3 border-b border-white/10">
                  <span className="w-6 h-6 rounded-full bg-[#E8D85B] text-[#0D1711] flex items-center justify-center text-xs font-bold">2</span>
                  <h3 className="text-lg font-bold font-serif-luxury text-[#F7F3E8]">
                    Shipping & Delivery Address
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                      Flat / House No. / Building
                    </label>
                    <input
                      type="text"
                      name="flatNo"
                      placeholder="e.g. Flat 402, Green Meadows"
                      value={formData.flatNo}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8D85B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                      Street / Area / Colony *
                    </label>
                    <input
                      type="text"
                      name="street"
                      required
                      placeholder="e.g. 12th Main, Indiranagar"
                      value={formData.street}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8D85B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                      Landmark
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      placeholder="e.g. Near Metro Station"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8D85B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="e.g. Bengaluru"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8D85B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      maxLength={6}
                      required
                      placeholder="e.g. 560038"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8D85B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                    State / Union Territory *
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#0D1711] border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8D85B]"
                  >
                    {indianStates.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                    Special Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    name="deliveryNotes"
                    placeholder="e.g. Please leave at door / Call before arriving"
                    value={formData.deliveryNotes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8D85B]"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
                <div className="flex items-center space-x-2 pb-3 border-b border-white/10">
                  <span className="w-6 h-6 rounded-full bg-[#E8D85B] text-[#0D1711] flex items-center justify-center text-xs font-bold">3</span>
                  <h3 className="text-lg font-bold font-serif-luxury text-[#F7F3E8]">
                    Choose Payment Method
                  </h3>
                </div>

                {/* Method Options: UPI / QR and Cards Only */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* UPI */}
                  <div
                    onClick={() => setPaymentMethod('UPI')}
                    className={`p-5 rounded-2xl border cursor-pointer text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                      paymentMethod === 'UPI'
                        ? 'bg-[#163020] border-[#E8D85B] text-white shadow-xl shadow-[#E8D85B]/10 scale-[1.01]'
                        : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <QrCode className="w-7 h-7 text-[#E8D85B] mb-1" />
                    <span className="text-sm font-bold block text-[#F7F3E8]">UPI / QR</span>
                    <span className="text-[11px] text-white/60">GPay, PhonePe, Paytm & any UPI App</span>
                  </div>

                  {/* Cards */}
                  <div
                    onClick={() => setPaymentMethod('Card')}
                    className={`p-5 rounded-2xl border cursor-pointer text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                      paymentMethod === 'Card'
                        ? 'bg-[#163020] border-[#E8D85B] text-white shadow-xl shadow-[#E8D85B]/10 scale-[1.01]'
                        : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <CreditCard className="w-7 h-7 text-[#E8D85B] mb-1" />
                    <span className="text-sm font-bold block text-[#F7F3E8]">Credit / Debit Cards</span>
                    <span className="text-[11px] text-white/60">Visa, Mastercard, RuPay & Amex</span>
                  </div>

                </div>

                {/* Sub-inputs based on payment choice */}
                {paymentMethod === 'UPI' && (
                  <div className="p-4 rounded-2xl bg-[#163020]/60 border border-[#E8D85B]/20 space-y-2 text-xs">
                    <label className="font-bold text-white uppercase tracking-wider block">
                      Enter UPI ID / VPA
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. yourname@oksbi / mobile@paytm"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0D1711] border border-white/20 text-white focus:outline-none focus:border-[#E8D85B]"
                    />
                    <span className="text-[11px] text-[#E8D85B] block">
                      ✓ Instant authorization prompt will be sent to your UPI App upon clicking Place Order.
                    </span>
                  </div>
                )}

                {paymentMethod === 'Card' && (
                  <div className="p-4 rounded-2xl bg-[#163020]/60 border border-[#E8D85B]/20 space-y-3 text-xs">
                    <div>
                      <label className="font-bold text-white block mb-1">Card Number</label>
                      <input
                        type="text"
                        placeholder="•••• •••• •••• ••••"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-[#0D1711] border border-white/20 text-white focus:outline-none focus:border-[#E8D85B]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-white block mb-1">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardDetails.exp}
                          onChange={(e) => setCardDetails({ ...cardDetails, exp: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl bg-[#0D1711] border border-white/20 text-white focus:outline-none focus:border-[#E8D85B]"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-white block mb-1">CVV</label>
                        <input
                          type="password"
                          maxLength={4}
                          placeholder="•••"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl bg-[#0D1711] border border-white/20 text-white focus:outline-none focus:border-[#E8D85B]"
                        />
                      </div>
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* Right Column: Order Summary & Place Order CTA */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#E8D85B]/30 shadow-2xl space-y-6 sticky top-24">
                <h3 className="text-lg font-bold font-serif-luxury text-[#F7F3E8] pb-3 border-b border-white/10">
                  Order Summary ({cart.length} item{cart.length > 1 ? 's' : ''})
                </h3>

                {/* Items in Checkout */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-3 text-xs">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-cover border border-white/10 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white truncate">{item.product.name}</h4>
                        <p className="text-[11px] text-[#E8D85B]">Qty: {item.quantity} × ₹{item.product.price}</p>
                      </div>
                      <span className="font-bold text-white">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-2 pt-4 border-t border-white/10 text-xs text-white/80">
                  <div className="flex justify-between">
                    <span>Product Subtotal</span>
                    <span className="font-semibold text-white">₹{subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#E8D85B]">
                      <span>Coupon Discount ({appliedCoupon})</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Express Delivery</span>
                    <span>{shipping === 0 ? <span className="text-emerald-400 font-bold">FREE</span> : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-white/10">
                    <span>Total Amount</span>
                    <span className="text-2xl font-black text-[#E8D85B]">₹{total}</span>
                  </div>
                </div>

                {/* Place Order CTA */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#E8D85B] via-[#D7A84B] to-[#E8D85B] text-[#0D1711] font-extrabold text-sm tracking-wider shadow-xl shadow-[#E8D85B]/20 hover:scale-[1.02] transition-transform flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span className="flex items-center space-x-2">
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Authorizing Secure Order...</span>
                    </span>
                  ) : (
                    <span>CONFIRM & PLACE ORDER • ₹{total}</span>
                  )}
                </button>

                {/* Alternative WhatsApp Checkout */}
                <a
                  href={generateWhatsAppLink(undefined, 1, `Hello, I would like to place an order for Amrut Sanjeevani to ${formData.city || 'my address'}. Total: ₹${total}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] font-semibold text-xs flex items-center justify-center space-x-2 hover:bg-[#25D366]/30 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order Directly on WhatsApp</span>
                </a>

                {/* Trust Badges */}
                <div className="pt-2 text-[11px] text-white/50 space-y-1 text-center">
                  <p>🔒 256-bit Secure Gateway Encryption</p>
                  <p>📦 Glass bottle safe packaging guarantee</p>
                </div>

              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
