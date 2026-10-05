import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { INGREDIENTS } from '../data/ingredients';
import { FAQS } from '../data/testimonials';
import { OrderStatus } from '../types';
import { useAuth } from '../context/AuthContext';
import { X, ShieldCheck, DollarSign, Package, User, Phone, MapPin, Search, PhoneCall, Mail, MessageCircle } from 'lucide-react';

export const AdminOrdersModal: React.FC = () => {
  const { isAdminOpen, setIsAdminOpen, orders, updateOrderStatus, generateWhatsAppLink } = useCart();
  const { leads } = useAuth();
  const [activeTab, setActiveTab] = useState<'orders' | 'leads'>('orders');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isAdminOpen) return null;

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = filterStatus === 'all' || o.orderStatus === filterStatus;
    const matchesSearch =
      o.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.mobileNumber.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const statuses: OrderStatus[] = [
    'New',
    'Confirmed',
    'Processing',
    'Packed',
    'Shipped',
    'Delivered',
    'Cancelled'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-5xl bg-[#0D1711] border border-[#E8D85B]/40 rounded-3xl p-6 sm:p-8 text-[#F7F3E8] shadow-2xl overflow-hidden my-8"
      >
        {/* Close */}
        <button
          onClick={() => setIsAdminOpen(false)}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F3E8] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-[#E8D85B]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#E8D85B]">
                ADMIN CONTROL CENTER
              </span>
            </div>
            <h2 className="text-2xl font-bold font-serif-luxury text-[#F7F3E8] mt-1">
              Order Dispatch & Operations Hub
            </h2>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center space-x-4 text-xs">
            <div className="p-3 rounded-2xl bg-[#163020] border border-white/10 text-right">
              <span className="text-white/60 block">Total Orders:</span>
              <span className="text-lg font-bold text-white">{orders.length}</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#163020] border border-[#E8D85B]/30 text-right">
              <span className="text-white/60 block">Total Gross:</span>
              <span className="text-lg font-black text-[#E8D85B]">₹{totalRevenue}</span>
            </div>
          </div>
        </div>

        {/* Hub Tabs: Orders vs Callback Leads */}
        <div className="flex border-b border-white/10 mb-6">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 flex items-center space-x-2 ${
              activeTab === 'orders'
                ? 'border-[#E8D85B] text-[#E8D85B]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Customer Orders ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 flex items-center space-x-2 ${
              activeTab === 'leads'
                ? 'border-[#E8D85B] text-[#E8D85B]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            <span>Consultation & Callback Leads ({leads.length})</span>
          </button>
        </div>

        {activeTab === 'leads' ? (
          /* LEADS VIEW */
          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
            {leads.length === 0 ? (
              <div className="text-center py-12 text-xs text-white/50 space-y-2 bg-white/5 rounded-2xl p-6">
                <p>No consultation or callback inquiries captured yet.</p>
                <p className="text-[11px] text-white/40">Inquiries submitted via the consultation section or Book Callback modal will appear here instantly.</p>
              </div>
            ) : (
              leads.map((lead) => (
                <div key={lead.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2 text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[#E8D85B] font-bold">#{lead.id}</span>
                      <span className="text-white/50 text-[11px]">• {lead.createdAt}</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-950/80 text-amber-300 border border-amber-500/30">
                      {lead.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-white/50 text-[11px] block">Customer:</span>
                      <span className="font-bold text-white text-sm">{lead.name}</span>
                      <p className="text-[#E8D85B] font-mono mt-0.5">{lead.countryCode} {lead.mobile}</p>
                      <p className="text-white/60 text-[11px]">{lead.email}</p>
                    </div>

                    <div>
                      <span className="text-white/50 text-[11px] block">Health Goal / Package:</span>
                      <span className="text-white font-medium block mt-0.5">{lead.wellnessGoal}</span>
                      <span className="text-white/50 text-[11px] mt-1 block">Slot: {lead.preferredTime}</span>
                    </div>

                    <div className="flex flex-col justify-between items-start sm:items-end">
                      {lead.notes && (
                        <p className="text-[11px] text-white/70 italic line-clamp-2 bg-black/30 p-2 rounded-lg border border-white/5 mb-2">
                          "{lead.notes}"
                        </p>
                      )}
                      <a
                        href={`https://wa.me/${lead.countryCode.replace(/\D/g, '')}${lead.mobile}?text=${encodeURIComponent(
                          `Hello ${lead.name}, this is Amrut Sanjeevani wellness desk regarding your consultation inquiry (#${lead.id}). How may we assist your routine?`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-[#25D366] text-[#0D1711] font-bold text-xs flex items-center space-x-1.5 hover:scale-105 transition-transform"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          /* ORDERS VIEW */
          <>
            {/* Controls: Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-white/40 absolute left-3 top-3.5" />
                <input
                  type="text"
                  placeholder="Search by Order ID, Name, or Mobile..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8D85B]"
                />
              </div>

              <div className="flex space-x-2 overflow-x-auto pb-1">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold uppercase transition-all whitespace-nowrap ${
                    filterStatus === 'all' ? 'bg-[#E8D85B] text-[#0D1711]' : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  All ({orders.length})
                </button>
                {statuses.map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold uppercase transition-all whitespace-nowrap ${
                      filterStatus === s ? 'bg-[#E8D85B] text-[#0D1711]' : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table / Cards */}
            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12 text-xs text-white/40">
                  No orders found matching the filter criteria.
                </div>
              ) : (
                filteredOrders.map((ord) => (
                  <div key={ord.orderId} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs border-b border-white/5 pb-2">
                      <div className="flex items-center space-x-3">
                        <span className="font-black text-[#E8D85B] font-mono text-sm">#{ord.orderId}</span>
                        <span className="text-white/50">{ord.orderDate}</span>
                      </div>

                      {/* Status Switcher Dropdown */}
                      <div className="flex items-center space-x-2">
                        <span className="text-white/60 text-[11px]">Update Status:</span>
                        <select
                          value={ord.orderStatus}
                          onChange={(e) => updateOrderStatus(ord.orderId, e.target.value as OrderStatus)}
                          className="px-2.5 py-1 rounded-lg bg-[#163020] border border-[#E8D85B]/40 text-xs font-bold text-[#E8D85B] focus:outline-none"
                        >
                          {statuses.map((st) => (
                            <option key={st} value={st}>
                              {st.toUpperCase()}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-white/50 block">Customer:</span>
                        <span className="font-bold text-white">{ord.customerName}</span>
                        <p className="text-white/70">{ord.mobileNumber}</p>
                      </div>

                      <div>
                        <span className="text-white/50 block">Delivery To:</span>
                        <p className="text-white/80 line-clamp-2">
                          {ord.address.city}, {ord.address.state} - {ord.address.pincode}
                        </p>
                      </div>

                      <div>
                        <span className="text-white/50 block">Amount & Payment:</span>
                        <span className="font-bold text-[#E8D85B]">₹{ord.total}</span>
                        <span className="text-white/60 ml-2 uppercase">({ord.paymentMethod} • {ord.paymentStatus})</span>
                      </div>
                    </div>

                    {/* Items preview */}
                    <div className="pt-2 border-t border-white/5 flex flex-wrap gap-2 text-[11px] text-white/70">
                      {ord.items.map((it, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-[#163020] border border-white/10">
                          {it.quantity}x {it.productName} ({it.netQuantity})
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

      </motion.div>
    </div>
  );
};

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setSelectedProductModal } = useCart();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedProducts = q ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) : [];
  const matchedIngredients = q ? INGREDIENTS.filter((i) => i.name.toLowerCase().includes(q) || i.shortDesc.toLowerCase().includes(q)) : [];
  const matchedFaqs = q ? FAQS.filter((f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)) : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-start justify-center p-4 pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="relative w-full max-w-2xl bg-[#0D1711] border border-[#E8D85B]/30 rounded-3xl p-6 sm:p-8 text-[#F7F3E8] shadow-2xl overflow-hidden"
      >
        {/* Close */}
        <button
          onClick={() => setIsSearchOpen(false)}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F3E8] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold font-serif-luxury text-[#F7F3E8] mb-4">
          Search Amrut Sanjeevani
        </h3>

        {/* Input */}
        <div className="relative mb-6">
          <Search className="w-5 h-5 text-white/50 absolute left-4 top-3.5" />
          <input
            type="text"
            autoFocus
            placeholder="Search lemon, garlic, ginger, ACV, packs, daily usage..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/5 border border-white/20 text-sm text-white focus:outline-none focus:border-[#E8D85B]"
          />
        </div>

        {/* Results */}
        <div className="space-y-4 max-h-96 overflow-y-auto pr-1 text-xs">
          {query.length === 0 ? (
            <div className="space-y-2">
              <span className="text-white/50 block">Popular Searches:</span>
              <div className="flex flex-wrap gap-2">
                {['Duo Pack', 'Lemon Extract', 'Garlic Benefits', 'Morning Routine', 'Family Pack', 'Shipping Policy'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-white/80 border border-white/10"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Matched Products */}
              {matchedProducts.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[#E8D85B] font-bold uppercase tracking-wider block">Products</span>
                  {matchedProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setSelectedProductModal(p);
                        setIsSearchOpen(false);
                      }}
                      className="p-3 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded object-cover" />
                        <div>
                          <span className="font-bold text-white block">{p.name}</span>
                          <span className="text-white/60">{p.netQuantity}</span>
                        </div>
                      </div>
                      <span className="font-bold text-[#E8D85B]">₹{p.price}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Matched Ingredients */}
              {matchedIngredients.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[#E8D85B] font-bold uppercase tracking-wider block">Botanical Ingredients</span>
                  {matchedIngredients.map((ing) => (
                    <div key={ing.id} className="p-3 rounded-xl bg-white/5 space-y-1">
                      <span className="font-bold text-white">{ing.name} ({ing.subtitle})</span>
                      <p className="text-white/70">{ing.shortDesc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Matched FAQs */}
              {matchedFaqs.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[#E8D85B] font-bold uppercase tracking-wider block">Help & FAQs</span>
                  {matchedFaqs.map((f, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/5 space-y-1">
                      <span className="font-bold text-white">{f.question}</span>
                      <p className="text-white/70">{f.answer}</p>
                    </div>
                  ))}
                </div>
              )}

              {matchedProducts.length === 0 && matchedIngredients.length === 0 && matchedFaqs.length === 0 && (
                <div className="text-center py-8 text-white/50">
                  No direct results found for "{query}".
                </div>
              )}
            </>
          )}
        </div>

      </motion.div>
    </div>
  );
};

export const PolicyModal: React.FC = () => {
  const { policyModal, setPolicyModal } = useCart();

  if (!policyModal.isOpen) return null;

  const content: Record<string, { title: string; body: string[] }> = {
    privacy: {
      title: 'Privacy Policy & Data Security',
      body: [
        'At Amrut Sanjeevani, your personal data and privacy are paramount. We never sell, rent, or trade your contact or delivery information to any third party.',
        'Personal data collected during checkout (name, mobile number, delivery address, email) is strictly utilized to facilitate package dispatch, logistics tracking, and customer support communications.',
        'Payment details are processed through encrypted, PCI-DSS certified gateway protocols. We do not store credit/debit card numbers or bank credentials on our servers.'
      ]
    },
    terms: {
      title: 'Terms of Service & Product Usage',
      body: [
        'Amrut Sanjeevani is a wellness food formulation created with 100% natural botanical ingredients. It is designed to complement balanced daily nutrition and healthy lifestyle routines.',
        'Product statements have not been evaluated by drug authorities. Amrut Sanjeevani is not intended to diagnose, cure, treat, or prevent any illness.',
        'Customers are advised to adhere to the recommended serving sizes on the bottle packaging. Individuals with specific dietary sensitivities, pregnant or nursing mothers, or those on prescribed medications should consult their physician before starting any new dietary routine.'
      ]
    },
    shipping: {
      title: 'Shipping & Delivery Policy',
      body: [
        'All orders received before 3:00 PM IST are packed and dispatched on the same business day in tamper-evident, shock-cushioned eco packaging.',
        'Estimated delivery timelines: Metro cities (2–3 business days), Non-metro cities & towns (3–5 business days). Express priority air freight is utilized for all orders.',
        'We offer FREE standard express shipping across India on all orders above ₹799. Real-time courier tracking links are provided via SMS / WhatsApp upon dispatch.'
      ]
    },
    refund: {
      title: 'Refund & Return Policy',
      body: [
        'Because Amrut Sanjeevani is a perishable natural consumable product, opened bottles cannot be returned for hygiene and food safety reasons.',
        'If your package arrives physically damaged or with a broken seal during transit, please contact our support helpline within 48 hours with a photo of the package for an immediate free replacement or full refund.'
      ]
    }
  };

  const current = content[policyModal.type] || content.privacy;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-[#0D1711] border border-[#E8D85B]/30 rounded-3xl p-6 sm:p-8 text-[#F7F3E8] shadow-2xl overflow-hidden my-8"
      >
        <button
          onClick={() => setPolicyModal({ isOpen: false, type: 'privacy' })}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F3E8] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-2xl font-bold font-serif-luxury text-[#F7F3E8] mb-4">
          {current.title}
        </h3>

        <div className="space-y-3 text-xs sm:text-sm text-white/80 leading-relaxed border-t border-white/10 pt-4">
          {current.body.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={() => setPolicyModal({ isOpen: false, type: 'privacy' })}
            className="px-6 py-2.5 rounded-full bg-[#E8D85B] text-[#0D1711] font-bold text-xs hover:scale-105 transition-transform cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export const FloatingActions: React.FC = () => {
  const { cartCount, setIsCartOpen, generateWhatsAppLink } = useCart();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3 items-end">
      
      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsCartOpen(true)}
          className="px-4 py-3 rounded-full bg-gradient-to-r from-[#E8D85B] to-[#D7A84B] text-[#0D1711] font-bold text-xs shadow-2xl shadow-[#E8D85B]/30 flex items-center space-x-2 hover:scale-105 transition-transform cursor-pointer border border-white/20"
        >
          <span>View Cart</span>
          <span className="w-5 h-5 rounded-full bg-[#0D1711] text-[#E8D85B] flex items-center justify-center text-[10px]">
            {cartCount}
          </span>
        </motion.button>
      )}

      {/* Floating WhatsApp Live Button */}
      <a
        href={generateWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black shadow-2xl shadow-green-500/30 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer border border-white/20 group"
      >
        <span className="text-2xl">💬</span>
      </a>

    </div>
  );
};
