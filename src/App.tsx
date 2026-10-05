/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HeroProductReveal } from './components/HeroProductReveal';
import { AboutSection } from './components/AboutSection';
import { IngredientsSection, IngredientImmersiveSection } from './components/IngredientsSection';
import { WhySection, HowToUseSection, LifestyleSection } from './components/WhySection';
import { TestimonialsSection, ProductShowcaseSection } from './components/TestimonialsSection';
import { LeadCaptureSection } from './components/LeadCaptureSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection, Footer } from './components/ContactSection';
import { CartDrawer, ShopView } from './components/CartDrawer';
import { CheckoutView } from './components/CheckoutView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { OrderConfirmationModal, TrackOrderModal } from './components/OrderConfirmationModal';
import { OrderBookingModal, AccountModal } from './components/OrderBookingModal';
import { AdminOrdersModal, SearchModal, PolicyModal, FloatingActions } from './components/AdminOrdersModal';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const ToastNotification: React.FC = () => {
  const { toastMessage } = useCart();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-[#163020] border border-[#E8D85B]/40 text-[#F7F3E8] text-xs font-semibold shadow-2xl flex items-center space-x-2.5 backdrop-blur-md"
        >
          <CheckCircle2 className="w-4 h-4 text-[#E8D85B]" />
          <span>{toastMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MainAppContent: React.FC = () => {
  const { activeView } = useCart();

  return (
    <div className="min-h-screen bg-[#0D1711] text-[#F7F3E8] font-sans antialiased selection:bg-[#E8D85B] selection:text-[#0D1711]">
      <Navbar />

      {/* Main View Router */}
      <main>
        {activeView === 'home' && (
          <>
            <HeroSection />
            <HeroProductReveal />
            <AboutSection />
            <IngredientsSection />
            <IngredientImmersiveSection />
            <WhySection />
            <HowToUseSection />
            <LifestyleSection />
            <TestimonialsSection />
            <ProductShowcaseSection />
            <LeadCaptureSection />
            <FaqSection />
            <ContactSection />
          </>
        )}

        {activeView === 'shop' && <ShopView />}

        {activeView === 'checkout' && <CheckoutView />}
      </main>

      <Footer />

      {/* Global Modals & Overlays */}
      <CartDrawer />
      <ProductDetailModal />
      <OrderConfirmationModal />
      <TrackOrderModal />
      <OrderBookingModal />
      <AccountModal />
      <AdminOrdersModal />
      <SearchModal />
      <PolicyModal />
      <FloatingActions />
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainAppContent />
      </CartProvider>
    </AuthProvider>
  );
}
