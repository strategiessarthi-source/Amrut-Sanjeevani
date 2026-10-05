import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Truck, 
  User, 
  ShieldCheck, 
  Sparkles, 
  MessageCircle, 
  ArrowRight,
  Leaf,
  PhoneCall
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    cartCount, 
    setIsCartOpen, 
    activeView, 
    setActiveView, 
    setIsSearchOpen, 
    setIsTrackOrderOpen, 
    setIsAccountOpen, 
    setIsBookingOpen,
    setIsAdminOpen,
    generateWhatsAppLink 
  } = useCart();
  
  const { user, isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    if (activeView !== 'home') {
      setActiveView('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Top Notification Announcement Bar */}
      <div className="bg-gradient-to-r from-[#163020] via-[#24482F] to-[#163020] border-b border-[#E8D85B]/15 text-[#F7F3E8] py-2 px-4 text-xs font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="flex h-2 w-2 rounded-full bg-[#E8D85B] animate-pulse"></span>
            <span className="text-[#E8D85B] font-semibold">Special Launch Offer:</span>
            <span className="hidden sm:inline">Use code <span className="underline font-bold text-white">WELLNESS10</span> for 10% Off + Free Delivery across India</span>
            <span className="sm:hidden">10% Off with code WELLNESS10</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsTrackOrderOpen(true)}
              className="flex items-center space-x-1 text-xs text-[#F7F3E8]/80 hover:text-[#E8D85B] transition-colors cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Track Order</span>
            </button>
            <span className="text-white/20 hidden md:inline">|</span>
            <button
              onClick={() => setIsAccountOpen(true)}
              className="flex items-center space-x-1.5 text-xs text-[#F7F3E8] hover:text-[#E8D85B] transition-colors cursor-pointer"
            >
              {isAuthenticated && user ? (
                <>
                  <span className="w-4 h-4 rounded-full bg-[#E8D85B] text-[#0D1711] font-bold text-[9px] flex items-center justify-center shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="font-semibold text-[#E8D85B]">Hi, {user.name.split(' ')[0]}</span>
                </>
              ) : (
                <>
                  <User className="w-3.5 h-3.5 text-[#E8D85B]" />
                  <span>Sign In / My Account</span>
                </>
              )}
            </button>
            <span className="text-white/20 hidden md:inline">|</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-[11px] text-[#E8D85B]/70 hover:text-[#E8D85B] underline"
            >
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* Main Glass Navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav shadow-2xl py-3 border-b border-white/10'
            : 'glass-nav py-4 border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => {
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center space-x-3.5 group cursor-pointer text-left"
          >
            <div className="w-10 h-10 rounded-full honey-gradient p-[2px] shadow-lg shadow-[#E8D85B]/15 transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#0D1711] rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-[#E8D85B]" />
              </div>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl sm:text-2xl font-bold tracking-tighter serif-text text-white">
                AMRUT
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.4em] uppercase opacity-70 text-[#E8D85B]">
                Sanjeevani
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-[11px] uppercase tracking-widest font-semibold opacity-85">
            <button
              onClick={() => {
                setActiveView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`transition-colors cursor-pointer ${
                activeView === 'home'
                  ? 'text-[#E8D85B] font-bold border-b border-[#E8D85B] pb-0.5'
                  : 'hover:text-[#E8D85B]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-[#E8D85B] transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('ingredients')}
              className="hover:text-[#E8D85B] transition-colors cursor-pointer"
            >
              Ingredients
            </button>
            <button
              onClick={() => scrollToSection('why-us')}
              className="hover:text-[#E8D85B] transition-colors cursor-pointer"
            >
              Benefits
            </button>
            <button
              onClick={() => {
                setActiveView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`transition-colors cursor-pointer ${
                activeView === 'shop'
                  ? 'text-[#E8D85B] font-bold border-b border-[#E8D85B] pb-0.5'
                  : 'hover:text-[#E8D85B]'
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => scrollToSection('how-to-use')}
              className="hover:text-[#E8D85B] transition-colors cursor-pointer"
            >
              How To Use
            </button>
            <button
              onClick={() => scrollToSection('consultation')}
              className="text-[#E8D85B] hover:text-white transition-colors cursor-pointer flex items-center space-x-1 font-bold"
            >
              <Sparkles className="w-3 h-3 text-[#E8D85B]" />
              <span>Consultation</span>
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="hover:text-[#E8D85B] transition-colors cursor-pointer"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="hover:text-[#E8D85B] transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Right Action Icons & CTAs */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Search Icon Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-white/80 hover:text-[#E8D85B] transition-colors cursor-pointer"
              title="Search website & ingredients"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Shopping Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 text-white/80 hover:text-[#E8D85B] transition-colors cursor-pointer"
              title="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#E8D85B] text-[#0D1711] text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Order Booking / Callback Button */}
            <button
              onClick={() => setIsBookingOpen(true)}
              className="hidden sm:inline-flex items-center text-[10px] uppercase tracking-wider font-semibold px-3.5 py-2 rounded-full border border-white/20 text-white/90 hover:border-[#E8D85B] hover:text-[#E8D85B] transition-all cursor-pointer"
            >
              Book Callback
            </button>

            {/* Main Shop / Order Now Primary Button with honey-gradient */}
            <button
              onClick={() => {
                setActiveView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="honey-gradient text-[#0D1711] px-5 sm:px-6 py-2.5 rounded-full text-[11px] font-bold tracking-widest uppercase hover:scale-105 transition-transform shadow-lg shadow-[#E8D85B]/20 cursor-pointer flex items-center space-x-1.5"
            >
              <span>Order Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 text-white/80 hover:text-[#E8D85B] transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#0D1711]/95 backdrop-blur-2xl border-b border-white/10 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <button
                onClick={() => {
                  setActiveView('home');
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left px-3 py-2 rounded-lg bg-white/5 text-[#E8D85B] font-medium"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setActiveView('shop');
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left px-3 py-2 rounded-lg bg-[#E8D85B]/15 text-[#E8D85B] font-semibold"
              >
                Shop Products
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-left px-3 py-2 rounded-lg hover:bg-white/5 text-white/80"
              >
                About Brand
              </button>
              <button
                onClick={() => scrollToSection('ingredients')}
                className="text-left px-3 py-2 rounded-lg hover:bg-white/5 text-white/80"
              >
                4 Ingredients
              </button>
              <button
                onClick={() => scrollToSection('why-us')}
                className="text-left px-3 py-2 rounded-lg hover:bg-white/5 text-white/80"
              >
                Key Benefits
              </button>
              <button
                onClick={() => scrollToSection('how-to-use')}
                className="text-left px-3 py-2 rounded-lg hover:bg-white/5 text-white/80"
              >
                How To Use
              </button>
              <button
                onClick={() => scrollToSection('consultation')}
                className="text-left px-3 py-2 rounded-lg bg-[#E8D85B]/10 text-[#E8D85B] font-semibold flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Free Consultation</span>
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="text-left px-3 py-2 rounded-lg hover:bg-white/5 text-white/80"
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left px-3 py-2 rounded-lg hover:bg-white/5 text-white/80"
              >
                Contact
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAccountOpen(true);
                }}
                className="text-left px-3 py-2 rounded-lg hover:bg-white/5 text-white/80 flex items-center space-x-1.5"
              >
                <User className="w-3.5 h-3.5 text-[#E8D85B]" />
                <span>{isAuthenticated && user ? `Hi, ${user.name.split(' ')[0]}` : 'My Account / Sign In'}</span>
              </button>
            </div>

            <div className="pt-2 border-t border-white/10 flex flex-col space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsBookingOpen(true);
                }}
                className="w-full py-2.5 rounded-lg border border-[#E8D85B]/40 text-[#E8D85B] text-center font-medium text-sm"
              >
                Book Order (Manual Confirmation)
              </button>
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-lg bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] flex items-center justify-center space-x-2 text-sm font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
