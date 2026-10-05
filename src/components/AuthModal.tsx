import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import {
  X,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  LogOut,
  ShoppingBag,
  Clock,
  Award,
  PhoneCall
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    user,
    isAuthenticated,
    isAuthModalOpen,
    setIsAuthModalOpen,
    authView,
    setAuthView,
    login,
    loginWithGoogle,
    signup,
    requestPasswordReset,
    logout,
    leads
  } = useAuth();

  const { orders, addToCart, setIsTrackOrderOpen, setActiveView, showToast } = useCart();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Status & Validation
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  // Real-time validations
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isPasswordLengthValid = password.length >= 8;
  const doPasswordsMatch = authView === 'signup' ? password === confirmPassword : true;

  const getPasswordStrength = () => {
    if (!password) return { label: 'Empty', color: 'bg-white/20', percent: 0 };
    if (password.length < 6) return { label: 'Too Short', color: 'bg-rose-500', percent: 25 };
    if (password.length < 8) return { label: 'Weak (8 min)', color: 'bg-amber-500', percent: 50 };
    const hasNumberOrSymbol = /[\d!@#$%^&*]/.test(password);
    const hasUpperAndLower = /(?=.*[a-z])(?=.*[A-Z])/.test(password);
    if (hasNumberOrSymbol && hasUpperAndLower && password.length >= 10) {
      return { label: 'Strong & Secure', color: 'bg-emerald-400', percent: 100 };
    }
    return { label: 'Good', color: 'bg-[#E8D85B]', percent: 75 };
  };

  const handleResetForm = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsGoogleLoading(true);

    try {
      const res = await loginWithGoogle();
      setIsGoogleLoading(false);

      if (res.success) {
        showToast('Signed in with Google! Welcome to Amrut Sanjeevani.');
        setSuccessMessage('Google authentication verified successfully.');
        setTimeout(() => {
          setIsAuthModalOpen(false);
        }, 600);
      } else {
        setErrorMessage(res.error || 'Google sign-in could not be completed.');
      }
    } catch {
      setIsGoogleLoading(false);
      setErrorMessage('Unable to connect to Google account service. Please try again.');
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!isEmailValid) {
      setErrorMessage('Please provide a valid email address (e.g. name@domain.com).');
      return;
    }
    if (!isPasswordLengthValid) {
      setErrorMessage('Password must be at least 8 characters.');
      return;
    }

    setIsLoading(true);
    const res = await login(email, password);
    setIsLoading(false);

    if (res.success) {
      showToast('Welcome back to Amrut Sanjeevani!');
      setSuccessMessage('Signed in successfully.');
      setTimeout(() => {
        setIsAuthModalOpen(false);
      }, 500);
    } else {
      setErrorMessage(res.error || 'Authentication failed. Please verify your credentials.');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!name.trim() || name.trim().length < 2) {
      setErrorMessage('Please provide your full name (at least 2 letters).');
      return;
    }
    if (!isEmailValid) {
      setErrorMessage('Please provide a valid email format.');
      return;
    }
    if (!isPasswordLengthValid) {
      setErrorMessage('Password must be at least 8 characters in length.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-type your confirm password.');
      return;
    }

    setIsLoading(true);
    const res = await signup(name, email, password);
    setIsLoading(false);

    if (res.success) {
      showToast('Account created! 100 Welcome Points awarded.');
      setSuccessMessage('Account registered successfully!');
      setTimeout(() => {
        setIsAuthModalOpen(false);
      }, 600);
    } else {
      setErrorMessage(res.error || 'Sign up failed.');
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!isEmailValid) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    const res = await requestPasswordReset(email);
    setIsLoading(false);

    if (res.success) {
      setSuccessMessage(res.message || 'Password reset instructions have been dispatched.');
    } else {
      setErrorMessage(res.error || 'Could not send reset instructions.');
    }
  };

  // Quick fill demo account for convenience
  const handleDemoFill = () => {
    setEmail('ananya@example.com');
    setPassword('wellness2026');
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-lg bg-[#0D1711] border border-[#E8D85B]/30 rounded-3xl p-6 sm:p-8 text-[#F7F3E8] shadow-2xl overflow-hidden my-6"
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-gradient-to-b from-[#E8D85B]/20 to-transparent blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F3E8] transition-colors cursor-pointer z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LOGGED IN VIEW: PROFILE & ORDER HISTORY */}
        {isAuthenticated && user ? (
          <div className="space-y-6">
            <div className="flex items-center space-x-4 border-b border-white/10 pb-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E8D85B] to-[#D7A84B] text-[#0D1711] font-bold text-xl flex items-center justify-center shadow-lg shadow-[#E8D85B]/20 shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-bold font-serif-luxury text-white truncate">
                    {user.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#E8D85B]/15 text-[#E8D85B] border border-[#E8D85B]/30 flex items-center space-x-1">
                    <Award className="w-3 h-3" />
                    <span>{user.tier} Member</span>
                  </span>
                </div>
                <p className="text-xs text-white/60 truncate mt-0.5">{user.email}</p>
                <p className="text-[11px] text-[#E8D85B]/80 mt-1">
                  Wellness Member since {user.memberSince} • <strong>{user.loyaltyPoints}</strong> reward points
                </p>
              </div>
            </div>

            {/* Account Quick Stats */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3.5 rounded-2xl bg-[#163020]/60 border border-white/10">
                <span className="text-[10px] uppercase tracking-wider text-white/60 font-semibold block">Total Orders</span>
                <span className="text-lg font-bold text-white font-mono">{orders.length}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#163020]/60 border border-white/10">
                <span className="text-[10px] uppercase tracking-wider text-white/60 font-semibold block">Scheduled Inquiries</span>
                <span className="text-lg font-bold text-[#E8D85B] font-mono">{leads.length}</span>
              </div>
            </div>

            {/* Orders Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white/80">
                  Recent Orders & Delivery
                </h4>
                <button
                  onClick={() => {
                    setIsAuthModalOpen(false);
                    setActiveView('shop');
                  }}
                  className="text-xs text-[#E8D85B] hover:underline cursor-pointer"
                >
                  Shop Now →
                </button>
              </div>

              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {orders.length === 0 ? (
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center text-xs text-white/60 space-y-2">
                    <p>No orders recorded in this session yet.</p>
                    <button
                      onClick={() => {
                        setIsAuthModalOpen(false);
                        setActiveView('shop');
                      }}
                      className="px-4 py-1.5 rounded-full bg-[#E8D85B] text-[#0D1711] font-bold text-xs"
                    >
                      Explore Products
                    </button>
                  </div>
                ) : (
                  orders.slice(0, 3).map((ord) => (
                    <div key={ord.orderId} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[#E8D85B] font-bold">#{ord.orderId}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                          {ord.orderStatus}
                        </span>
                      </div>
                      <div className="text-white/70 text-[11px]">
                        {ord.items.map((it) => `${it.quantity}x ${it.productName}`).join(', ')}
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[11px]">
                        <span className="font-bold text-white">₹{ord.total}</span>
                        <button
                          onClick={() => {
                            setIsAuthModalOpen(false);
                            setIsTrackOrderOpen(true);
                          }}
                          className="text-[#E8D85B] underline cursor-pointer"
                        >
                          Track Package
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Logout Action */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-white/50">Protected by Amrut Sanjeevani Purity Guarantee</span>
              <button
                onClick={() => {
                  logout();
                  showToast('You have been signed out.');
                }}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-rose-950 hover:text-rose-300 border border-white/10 text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          /* AUTHENTICATION FORMS: SIGN IN, SIGN UP, FORGOT PASSWORD */
          <div>
            {/* Header */}
            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E8D85B] bg-[#E8D85B]/10 px-3 py-1 rounded-full border border-[#E8D85B]/20">
                WELLNESS ACCOUNT PORTAL
              </span>
              <h2 className="text-2xl font-bold font-serif-luxury text-[#F7F3E8] mt-2">
                {authView === 'signin' && 'Sign In to Your Account'}
                {authView === 'signup' && 'Create Your Wellness Account'}
                {authView === 'forgot' && 'Reset Your Password'}
              </h2>
              <p className="text-xs text-white/70 mt-1">
                {authView === 'signin' && 'Access your order tracking, exclusive discounts, and saved delivery preferences.'}
                {authView === 'signup' && 'Join Amrut Sanjeevani for express ordering and 100 bonus wellness points.'}
                {authView === 'forgot' && 'Enter your registered email and we will dispatch recovery instructions.'}
              </p>
            </div>

            {/* Feedback Alerts */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mb-4 p-3 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-200 text-xs flex items-start space-x-2"
                >
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}

              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mb-4 p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs flex items-start space-x-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{successMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* TAB SELECTOR: SIGN IN / CREATE ACCOUNT */}
            {authView !== 'forgot' && (
              <div className="grid grid-cols-2 p-1 rounded-2xl bg-white/5 border border-white/10 mb-5">
                <button
                  type="button"
                  onClick={() => {
                    setAuthView('signin');
                    handleResetForm();
                  }}
                  className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    authView === 'signin'
                      ? 'bg-gradient-to-r from-[#E8D85B] via-[#D7A84B] to-[#E8D85B] text-[#0D1711] shadow-md shadow-[#E8D85B]/20'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthView('signup');
                    handleResetForm();
                  }}
                  className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    authView === 'signup'
                      ? 'bg-gradient-to-r from-[#E8D85B] via-[#D7A84B] to-[#E8D85B] text-[#0D1711] shadow-md shadow-[#E8D85B]/20'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Create Account
                </button>
              </div>
            )}

            {/* GOOGLE SOCIAL LOGIN BUTTON & CLEAN "OR" DIVIDER */}
            {authView !== 'forgot' && (
              <div className="mb-4">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading || isLoading}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#163020]/90 hover:bg-[#1a3a27] border border-[#E8D85B]/35 hover:border-[#E8D85B] text-[#F7F3E8] font-semibold text-xs flex items-center justify-center space-x-3 transition-all duration-200 cursor-pointer shadow-md shadow-black/40 group hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  {isGoogleLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#E8D85B]/30 border-t-[#E8D85B] rounded-full animate-spin" />
                      <span className="text-[#E8D85B] font-semibold">Connecting with Google...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span>Continue with Google</span>
                    </>
                  )}
                </button>

                {/* Clean OR Divider */}
                <div className="relative flex items-center justify-center my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/15" />
                  </div>
                  <div className="relative px-3 bg-[#0D1711] text-[10px] uppercase font-bold tracking-widest text-white/50">
                    OR
                  </div>
                </div>
              </div>
            )}

            {/* FORM: SIGN IN */}
            {authView === 'signin' && (
              <form onSubmit={handleSignIn} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border text-xs text-white placeholder-white/40 focus:outline-none transition-colors ${
                        email && !isEmailValid
                          ? 'border-rose-500/80 focus:border-rose-400'
                          : 'border-white/20 focus:border-[#E8D85B] focus:ring-1 focus:ring-[#E8D85B]/40'
                      }`}
                    />
                  </div>
                  {email && !isEmailValid && (
                    <p className="text-[10px] text-rose-400 mt-1">Please enter a valid email format.</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-white/80 uppercase tracking-wider">
                      Password *
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthView('forgot');
                        handleResetForm();
                      }}
                      className="text-xs text-[#E8D85B] hover:underline cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="At least 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/20 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#E8D85B] focus:ring-1 focus:ring-[#E8D85B]/40 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between text-xs text-white/70 pt-1">
                  <label className="flex items-center space-x-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded accent-[#E8D85B] w-3.5 h-3.5"
                    />
                    <span>Remember my session</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleDemoFill}
                    className="text-[11px] text-[#E8D85B]/80 hover:text-[#E8D85B] underline cursor-pointer"
                    title="Fill test credentials"
                  >
                    Use Demo Account
                  </button>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E8D85B] via-[#D7A84B] to-[#E8D85B] text-[#0D1711] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#E8D85B]/20 hover:scale-[1.01] transition-transform cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-2 mt-2"
                >
                  <span>{isLoading ? 'Signing In...' : 'Sign In To Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Bottom Toggle */}
                <p className="text-center text-xs text-white/60 pt-2">
                  Don't have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthView('signup');
                      handleResetForm();
                    }}
                    className="text-[#E8D85B] font-bold underline cursor-pointer hover:text-white"
                  >
                    Create Account
                  </button>
                </p>
              </form>
            )}

            {/* FORM: CREATE ACCOUNT */}
            {authView === 'signup' && (
              <form onSubmit={handleSignUp} className="space-y-3.5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Ramesh Gupta"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#E8D85B] focus:ring-1 focus:ring-[#E8D85B]/40"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border text-xs text-white placeholder-white/40 focus:outline-none transition-colors ${
                        email && !isEmailValid
                          ? 'border-rose-500/80 focus:border-rose-400'
                          : 'border-white/20 focus:border-[#E8D85B] focus:ring-1 focus:ring-[#E8D85B]/40'
                      }`}
                    />
                  </div>
                  {email && !isEmailValid && (
                    <p className="text-[10px] text-rose-400 mt-1">Please enter a valid email format.</p>
                  )}
                </div>

                {/* Password with Strength Meter */}
                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                    Create Password * (Min 8 Characters)
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Minimum 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/20 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#E8D85B] focus:ring-1 focus:ring-[#E8D85B]/40"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Strength Bar */}
                  {password && (
                    <div className="mt-1.5 space-y-1">
                      <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${getPasswordStrength().color}`}
                          style={{ width: `${getPasswordStrength().percent}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-white/60">
                        Strength: <strong className="text-white">{getPasswordStrength().label}</strong>
                      </span>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border text-xs text-white placeholder-white/40 focus:outline-none transition-colors ${
                        confirmPassword && confirmPassword !== password
                          ? 'border-rose-500/80 focus:border-rose-400'
                          : 'border-white/20 focus:border-[#E8D85B] focus:ring-1 focus:ring-[#E8D85B]/40'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {confirmPassword && confirmPassword !== password && (
                    <p className="text-[10px] text-rose-400 mt-1">Passwords do not match.</p>
                  )}
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E8D85B] via-[#D7A84B] to-[#E8D85B] text-[#0D1711] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#E8D85B]/20 hover:scale-[1.01] transition-transform cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-2 mt-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isLoading ? 'Creating Account...' : 'Complete Registration'}</span>
                </button>

                <p className="text-center text-xs text-white/60 pt-2">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthView('signin');
                      handleResetForm();
                    }}
                    className="text-[#E8D85B] font-bold underline cursor-pointer hover:text-white"
                  >
                    Sign In
                  </button>
                </p>
              </form>
            )}

            {/* FORM: FORGOT PASSWORD */}
            {authView === 'forgot' && (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">
                    Your Registered Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#E8D85B] focus:ring-1 focus:ring-[#E8D85B]/40"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E8D85B] via-[#D7A84B] to-[#E8D85B] text-[#0D1711] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#E8D85B]/20 hover:scale-[1.01] transition-transform cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  <span>{isLoading ? 'Dispatching...' : 'Send Recovery Link'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthView('signin');
                      handleResetForm();
                    }}
                    className="text-xs text-white/70 hover:text-[#E8D85B] transition-colors cursor-pointer"
                  >
                    ← Back to Sign In
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};
