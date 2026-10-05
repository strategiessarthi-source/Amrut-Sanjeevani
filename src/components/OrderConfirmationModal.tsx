import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  MapPin, 
  MessageCircle, 
  ArrowRight, 
  X, 
  Copy, 
  Clock,
  Sparkles
} from 'lucide-react';

export const OrderConfirmationModal: React.FC = () => {
  const { 
    currentPlacedOrder,
    activeView,
    setIsTrackOrderOpen, 
    setActiveView, 
    showToast,
    generateWhatsAppLink 
  } = useCart();

  const isOpen = activeView === 'confirmation' && !!currentPlacedOrder;

  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#E8D85B', '#3E6B45', '#D7A84B', '#F7F3E8']
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [isOpen]);

  if (!isOpen || !currentPlacedOrder) return null;
  const order = currentPlacedOrder;

  const copyOrderId = () => {
    navigator.clipboard.writeText(order.orderId);
    showToast('Order ID copied to clipboard!');
  };

  const handleTrack = () => {
    setActiveView('home');
    setIsTrackOrderOpen(true);
  };

  const handleContinueShopping = () => {
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl bg-[#0D1711] border border-[#E8D85B]/40 rounded-3xl p-6 sm:p-8 text-[#F7F3E8] shadow-2xl overflow-hidden my-8"
      >
        {/* Close */}
        <button
          onClick={() => setActiveView('home')}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F3E8] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Success Badge */}
        <div className="text-center space-y-3 pb-6 border-b border-white/10">
          <div className="w-16 h-16 rounded-full bg-[#E8D85B]/20 text-[#E8D85B] flex items-center justify-center mx-auto border border-[#E8D85B]/40 shadow-lg shadow-[#E8D85B]/10">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8D85B] block">
            ORDER SUCCESSFULLY PLACED
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#F7F3E8]">
            Thank You, {order.customerName}!
          </h2>
          <p className="text-xs text-white/70 max-w-md mx-auto">
            Your Amrut Sanjeevani wellness package has been booked. A confirmation notification has been logged for dispatch.
          </p>
        </div>

        {/* Order ID & Date Box */}
        <div className="my-6 p-4 rounded-2xl bg-[#163020] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-white/60 block">Order Reference Number:</span>
            <div className="flex items-center space-x-2 mt-0.5">
              <span className="text-base font-black text-[#E8D85B] font-mono">
                #{order.orderId}
              </span>
              <button
                onClick={copyOrderId}
                className="p-1 rounded bg-white/10 hover:bg-white/20 text-white/80 transition-colors cursor-pointer"
                title="Copy Order ID"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="text-white/60 block">Payment Method & Status:</span>
            <span className="font-bold text-white uppercase mt-0.5 inline-block">
              {order.paymentMethod} • <span className="text-emerald-400">{order.paymentStatus}</span>
            </span>
          </div>
        </div>

        {/* Ordered Items Summary */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white/80">
            Items in This Order
          </h4>
          <div className="space-y-2 max-h-36 overflow-y-auto">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 text-xs">
                <div>
                  <span className="font-bold text-white block">{item.productName}</span>
                  <span className="text-[10px] text-white/60">Qty: {item.quantity} • {item.netQuantity}</span>
                </div>
                <span className="font-bold text-[#E8D85B]">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Details */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs mb-6">
          <div className="flex items-center space-x-2 text-[#E8D85B] font-bold">
            <MapPin className="w-4 h-4" />
            <span>Shipping Destination</span>
          </div>
          <p className="text-white/80 leading-relaxed">
            {order.address.house ? `${order.address.house}, ` : ''}
            {order.address.street}, {order.address.landmark ? `${order.address.landmark}, ` : ''}
            {order.address.city}, {order.address.state} - {order.address.pincode}
          </p>
          <div className="flex items-center space-x-2 text-[11px] text-white/60 pt-1">
            <Truck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tracking Reference: {order.trackingNumber} • Expected Delivery: {order.estimatedDeliveryDate}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleTrack}
              className="py-3 px-4 rounded-full bg-[#E8D85B] text-[#0D1711] font-bold text-xs hover:scale-105 transition-transform flex items-center justify-center space-x-2 shadow-lg shadow-[#E8D85B]/20 cursor-pointer"
            >
              <Package className="w-4 h-4" />
              <span>Track Live Delivery Status</span>
            </button>
            <a
              href={generateWhatsAppLink(undefined, 1, `Hello Amrut Sanjeevani Team, my order #${order.orderId} was placed for ₹${order.total}. Could you please share the tracking updates?`)}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-full bg-[#25D366] text-black font-bold text-xs hover:scale-105 transition-transform flex items-center justify-center space-x-2 shadow-md cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Order to WhatsApp</span>
            </a>
          </div>

          <button
            onClick={handleContinueShopping}
            className="w-full py-2.5 text-center text-xs text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            ← Return to Amrut Sanjeevani Store
          </button>
        </div>

      </motion.div>
    </div>
  );
};

export const TrackOrderModal: React.FC = () => {
  const { isTrackOrderOpen, setIsTrackOrderOpen, orders, getOrderByQuery, showToast } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<any>(null);

  useEffect(() => {
    if (orders.length > 0 && !searchedOrder) {
      setSearchedOrder(orders[0]);
    }
  }, [orders, searchedOrder]);

  if (!isTrackOrderOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const found = getOrderByQuery(searchQuery);

    if (found) {
      setSearchedOrder(found);
    } else {
      showToast('No active order found with that ID or mobile number.');
    }
  };

  const steps = [
    { title: 'Order Received', desc: 'Order details verified & recorded', status: 'completed' },
    { title: 'Order Confirmed', desc: 'Payment authorized & inventory reserved', status: 'completed' },
    { title: 'Packed in Glass Protection', desc: 'Eco-cushioned and sealed', status: 'active' },
    { title: 'Shipped via Express Air', desc: 'In transit with courier partner', status: 'pending' },
    { title: 'Delivered', desc: 'Out for morning doorstep delivery', status: 'pending' }
  ];

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
          onClick={() => setIsTrackOrderOpen(false)}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F3E8] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#E8D85B] bg-[#E8D85B]/10 px-3 py-1 rounded-full border border-[#E8D85B]/20">
            DISPATCH TRACKER
          </span>
          <h2 className="text-2xl font-bold font-serif-luxury text-[#F7F3E8] mt-2">
            Track Your Amrut Sanjeevani Package
          </h2>
          <p className="text-xs text-white/70 mt-0.5">
            Enter your Order ID (e.g., AS-2026-84920) or registered 10-digit mobile number.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex space-x-2 mb-6">
          <input
            type="text"
            placeholder="Enter Order ID or Mobile Number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-xs text-white focus:outline-none focus:border-[#E8D85B]"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#E8D85B] text-[#0D1711] font-bold text-xs hover:scale-105 transition-transform cursor-pointer"
          >
            Track Order
          </button>
        </form>

        {/* Active Order Details */}
        {searchedOrder ? (
          <div className="space-y-6">
            {/* Summary Box */}
            <div className="p-4 rounded-2xl bg-[#163020] border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
              <div>
                <span className="text-white/60">Tracking Order:</span>
                <span className="font-bold text-[#E8D85B] font-mono ml-2">#{searchedOrder.orderId}</span>
                <span className="text-white/40 ml-2">({searchedOrder.customerName})</span>
              </div>
              <div className="text-emerald-400 font-semibold flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Estimated Arrival: {searchedOrder.estimatedDeliveryDate}</span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
              {steps.map((st, idx) => {
                const isDone = st.status === 'completed';
                const isActive = st.status === 'active';
                return (
                  <div key={idx} className="relative flex items-start space-x-4">
                    <div
                      className={`w-5 h-5 rounded-full -ml-6 flex items-center justify-center text-[10px] font-bold z-10 ${
                        isDone
                          ? 'bg-emerald-400 text-black'
                          : isActive
                          ? 'bg-[#E8D85B] text-black ring-4 ring-[#E8D85B]/20'
                          : 'bg-white/10 text-white/40'
                      }`}
                    >
                      {isDone ? '✓' : idx + 1}
                    </div>
                    <div className="flex-1 -mt-0.5">
                      <h4 className={`text-sm font-bold ${isActive ? 'text-[#E8D85B]' : isDone ? 'text-white' : 'text-white/40'}`}>
                        {st.title}
                      </h4>
                      <p className="text-xs text-white/60">{st.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Partner Details */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-white/60">Logistics Partner:</span>
                <span className="font-semibold text-white">Blue Dart Air Express</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Tracking / AWB Number:</span>
                <span className="font-mono text-[#E8D85B]">{searchedOrder.trackingNumber}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-xs text-white/50">
            Enter an order ID to view real-time tracking information.
          </div>
        )}

      </motion.div>
    </div>
  );
};
