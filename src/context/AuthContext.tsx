import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, LeadCapture, CountryCodeOption } from '../types';

export const COUNTRY_CODES: CountryCodeOption[] = [
  { code: '+91', country: 'India', flag: '🇮🇳', digits: 10 },
  { code: '+1', country: 'USA/Canada', flag: '🇺🇸', digits: 10 },
  { code: '+44', country: 'UK', flag: '🇬🇧', digits: 10 },
  { code: '+971', country: 'UAE', flag: '🇦🇪', digits: 9 },
  { code: '+65', country: 'Singapore', flag: '🇸🇬', digits: 8 },
  { code: '+61', country: 'Australia', flag: '🇦🇺', digits: 9 },
];

export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

export const validateMobile = (mobile: string, digits: number = 10): boolean => {
  const cleaned = mobile.replace(/\D/g, '');
  return cleaned.length === digits;
};

interface StoredUserAccount {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // Stored in client localStorage
  memberSince: string;
  loyaltyPoints: number;
  tier: 'Silver' | 'Gold' | 'Platinum';
  savedPhone?: string;
  savedCity?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authView: 'signin' | 'signup' | 'forgot' | 'profile';
  setAuthView: (view: 'signin' | 'signup' | 'forgot' | 'profile') => void;
  
  // Auth Operations
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;

  // Lead Capture Operations
  leads: LeadCapture[];
  submitLead: (lead: {
    name: string;
    email: string;
    countryCode: string;
    mobile: string;
    wellnessGoal: string;
    preferredTime: string;
    notes?: string;
  }) => Promise<{ success: boolean; leadId: string; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_USER_KEY = 'amrut_sanjeevani_user_session';
const REGISTERED_USERS_KEY = 'amrut_sanjeevani_registered_accounts';
const LEADS_STORAGE_KEY = 'amrut_sanjeevani_leads';

const DEFAULT_ACCOUNTS: StoredUserAccount[] = [
  {
    id: 'usr-demo-01',
    name: 'Ananya Sharma',
    email: 'ananya@example.com',
    passwordHash: 'wellness2026',
    memberSince: 'January 2026',
    loyaltyPoints: 350,
    tier: 'Gold',
    savedPhone: '+91 98765 43210',
    savedCity: 'Mumbai'
  },
  {
    id: 'usr-member-02',
    name: 'Dr. Vikram Malhotra',
    email: 'vikram.m@example.com',
    passwordHash: 'ayurveda123',
    memberSince: 'March 2026',
    loyaltyPoints: 620,
    tier: 'Platinum',
    savedPhone: '+91 99887 76655',
    savedCity: 'Bengaluru'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<'signin' | 'signup' | 'forgot' | 'profile'>('signin');
  const [leads, setLeads] = useState<LeadCapture[]>(() => {
    try {
      const stored = localStorage.getItem(LEADS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Ensure initial registered accounts exist in storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(REGISTERED_USERS_KEY);
      if (!stored) {
        localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(DEFAULT_ACCOUNTS));
      }
    } catch (e) {
      console.warn('Storage unavailable', e);
    }
  }, []);

  const getRegisteredUsers = (): StoredUserAccount[] => {
    try {
      const stored = localStorage.getItem(REGISTERED_USERS_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_ACCOUNTS;
    } catch {
      return DEFAULT_ACCOUNTS;
    }
  };

  const saveRegisteredUsers = (users: StoredUserAccount[]) => {
    try {
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
    } catch (e) {
      console.warn('Failed saving users to storage', e);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const trimmedEmail = email.trim().toLowerCase();
    
    if (!trimmedEmail) {
      return { success: false, error: 'Please enter your email address.' };
    }
    if (!validateEmail(trimmedEmail)) {
      return { success: false, error: 'Please enter a valid email format (e.g. name@domain.com).' };
    }
    if (!password) {
      return { success: false, error: 'Please enter your password.' };
    }
    if (password.length < 8) {
      return { success: false, error: 'Password must be at least 8 characters long.' };
    }

    const accounts = getRegisteredUsers();
    const existing = accounts.find((acc) => acc.email.toLowerCase() === trimmedEmail);

    if (!existing) {
      return { 
        success: false, 
        error: 'No account found with this email. Please check your spelling or click "Create Account".' 
      };
    }

    if (existing.passwordHash !== password) {
      return { 
        success: false, 
        error: 'Incorrect password. Click "Forgot Password?" below if you need to reset it.' 
      };
    }

    // Success
    const profile: UserProfile = {
      id: existing.id,
      name: existing.name,
      email: existing.email,
      memberSince: existing.memberSince,
      loyaltyPoints: existing.loyaltyPoints,
      tier: existing.tier,
      savedPhone: existing.savedPhone,
      savedCity: existing.savedCity,
    };

    setUser(profile);
    try {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn(e);
    }

    return { success: true };
  };

  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName || trimmedName.length < 2) {
      return { success: false, error: 'Please enter your full name (minimum 2 characters).' };
    }
    if (!trimmedEmail) {
      return { success: false, error: 'Please enter your email address.' };
    }
    if (!validateEmail(trimmedEmail)) {
      return { success: false, error: 'Please enter a valid email format (e.g. name@domain.com).' };
    }
    if (!password || password.length < 8) {
      return { success: false, error: 'Password must be at least 8 characters long.' };
    }

    const accounts = getRegisteredUsers();
    if (accounts.some((acc) => acc.email.toLowerCase() === trimmedEmail)) {
      return { success: false, error: 'An account with this email already exists. Please Sign In instead.' };
    }

    const now = new Date();
    const monthYear = now.toLocaleString('default', { month: 'long', year: 'numeric' });

    const newAccount: StoredUserAccount = {
      id: `usr-${Date.now().toString(36)}`,
      name: trimmedName,
      email: trimmedEmail,
      passwordHash: password,
      memberSince: monthYear,
      loyaltyPoints: 100, // 100 bonus welcome points
      tier: 'Silver',
    };

    const updated = [newAccount, ...accounts];
    saveRegisteredUsers(updated);

    const profile: UserProfile = {
      id: newAccount.id,
      name: newAccount.name,
      email: newAccount.email,
      memberSince: newAccount.memberSince,
      loyaltyPoints: newAccount.loyaltyPoints,
      tier: newAccount.tier,
    };

    setUser(profile);
    try {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn(e);
    }

    return { success: true };
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    // Simulated realistic Google Auth handshake
    await new Promise((resolve) => setTimeout(resolve, 600));

    const googleUser: UserProfile = {
      id: `usr-google-${Date.now().toString(36)}`,
      name: 'Pooja Deshmukh',
      email: 'sanjeevaniamrut@gmail.com',
      memberSince: new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
      loyaltyPoints: 150,
      tier: 'Gold',
      savedPhone: '+91 98765 43210',
      savedCity: 'Pune'
    };

    setUser(googleUser);
    try {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(googleUser));
    } catch (e) {
      console.warn(e);
    }

    return { success: true };
  };

  const requestPasswordReset = async (email: string): Promise<{ success: boolean; message?: string; error?: string }> => {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      return { success: false, error: 'Please enter the email address linked to your account.' };
    }
    if (!validateEmail(trimmedEmail)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    const accounts = getRegisteredUsers();
    const exists = accounts.some((acc) => acc.email.toLowerCase() === trimmedEmail);

    // Provide friendly, secure guidance
    if (exists) {
      return {
        success: true,
        message: `Password reset instructions have been dispatched to ${trimmedEmail}. Please check your inbox (and spam folder) within the next 5 minutes.`
      };
    } else {
      return {
        success: true,
        message: `If an account is associated with ${trimmedEmail}, a password recovery link has been dispatched.`
      };
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(AUTH_USER_KEY);
    } catch (e) {
      console.warn(e);
    }
    setAuthView('signin');
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    try {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }

    // Also sync to registered accounts list
    const accounts = getRegisteredUsers();
    const synced = accounts.map((acc) => {
      if (acc.id === user.id) {
        return {
          ...acc,
          name: updates.name ?? acc.name,
          savedPhone: updates.savedPhone ?? acc.savedPhone,
          savedCity: updates.savedCity ?? acc.savedCity,
        };
      }
      return acc;
    });
    saveRegisteredUsers(synced);
  };

  const submitLead = async (leadData: {
    name: string;
    email: string;
    countryCode: string;
    mobile: string;
    wellnessGoal: string;
    preferredTime: string;
    notes?: string;
  }): Promise<{ success: boolean; leadId: string; message: string }> => {
    const countryConfig = COUNTRY_CODES.find((c) => c.code === leadData.countryCode) || COUNTRY_CODES[0];
    const rawDigits = leadData.mobile.replace(/\D/g, '');

    if (!leadData.name.trim()) {
      throw new Error('Please enter your full name.');
    }
    if (!leadData.email.trim() || !validateEmail(leadData.email)) {
      throw new Error('Please enter a valid email address.');
    }
    if (!validateMobile(rawDigits, countryConfig.digits)) {
      throw new Error(`Please enter a valid ${countryConfig.digits}-digit mobile number for ${countryConfig.country}.`);
    }

    const leadId = `LEAD-${Date.now().toString().slice(-6)}`;
    const newLead: LeadCapture = {
      id: leadId,
      name: leadData.name.trim(),
      email: leadData.email.trim().toLowerCase(),
      countryCode: leadData.countryCode,
      mobile: rawDigits,
      wellnessGoal: leadData.wellnessGoal,
      preferredTime: leadData.preferredTime,
      notes: leadData.notes?.trim(),
      createdAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      status: 'Pending Callback'
    };

    const updated = [newLead, ...leads];
    setLeads(updated);
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }

    return {
      success: true,
      leadId,
      message: `Callback scheduled! Reference ID: #${leadId}. An expert advisor will call you at ${leadData.countryCode} ${rawDigits}.`
    };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authView,
        setAuthView,
        login,
        loginWithGoogle,
        signup,
        requestPasswordReset,
        logout,
        updateProfile,
        leads,
        submitLead,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
