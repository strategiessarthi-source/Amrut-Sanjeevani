import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, OrderStatus } from '../types';
import { PRODUCTS } from '../data/products';

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  discount: number;
  couponCode: string;
  appliedCoupon: string | null;
  shipping: number;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  buyNow: (product: Product, quantity?: number) => void;
  
  // Navigation & Modals State
  activeView: 'home' | 'shop' | 'checkout' | 'confirmation';
  setActiveView: (view: 'home' | 'shop' | 'checkout' | 'confirmation') => void;
  selectedProductModal: Product | null;
  setSelectedProductModal: (prod: Product | null) => void;
  isTrackOrderOpen: boolean;
  setIsTrackOrderOpen: (open: boolean) => void;
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  policyModal: { isOpen: boolean; type: 'privacy' | 'terms' | 'shipping' | 'refund' };
  setPolicyModal: (modal: { isOpen: boolean; type: 'privacy' | 'terms' | 'shipping' | 'refund' }) => void;
  
  // Orders State
  orders: Order[];
  currentPlacedOrder: Order | null;
  setCurrentPlacedOrder: (order: Order | null) => void;
  createOrder: (orderData: Omit<Order, 'orderId' | 'orderDate' | 'estimatedDeliveryDate' | 'orderStatus' | 'trackingNumber'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrderByQuery: (query: string) => Order | undefined;
  
  // Toast Alert
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // WhatsApp generator
  generateWhatsAppLink: (product?: Product, qty?: number, customNote?: string) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'amrut_sanjeevani_cart';
const ORDERS_STORAGE_KEY = 'amrut_sanjeevani_orders';

const INITIAL_ORDERS: Order[] = [
  {
    orderId: 'AS-2026-84920',
    customerName: 'Rahul Mehra',
    mobileNumber: '+91 98765 43210',
    email: 'rahul.mehra@example.com',
    address: {
      house: 'B-402, Lotus Orchid Greens',
      street: 'Koramangala 4th Block',
      landmark: 'Near Sony World Junction',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560034'
    },
    items: [
      {
        productId: 'as-duo-pack',
        productName: 'Amrut Sanjeevani Duo Wellness Pack',
        netQuantity: '2 x 500 ml',
        quantity: 1,
        price: 1599
      }
    ],
    subtotal: 1599,
    discount: 160,
    shipping: 0,
    total: 1439,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    orderDate: '2026-08-24 09:30 AM',
    estimatedDeliveryDate: '2026-08-28',
    trackingNumber: 'DELHIVERY-AS84920-IN'
  },
  {
    orderId: 'AS-2026-91204',
    customerName: 'Kavita Sundaram',
    mobileNumber: '+91 99887 76655',
    email: 'kavita.s@example.com',
    address: {
      house: 'Villa 12, Gulmohar Enclave',
      street: 'Banjara Hills Road No. 10',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500034'
    },
    items: [
      {
        productId: 'as-single-500',
        productName: 'Amrut Sanjeevani Original Blend',
        netQuantity: '500 ml',
        quantity: 2,
        price: 899
      }
    ],
    subtotal: 1798,
    discount: 0,
    shipping: 0,
    total: 1798,
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    orderDate: '2026-08-20 04:15 PM',
    estimatedDeliveryDate: '2026-08-23',
    trackingNumber: 'BLUEDART-AS91204-IN'
  }
];

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load Cart from LocalStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    // Default cart with 1 single bottle so user immediately sees live state
    return [
      {
        product: PRODUCTS[0],
        quantity: 1
      }
    ];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_ORDERS;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('WELLNESS10');
  const [activeView, setActiveView] = useState<'home' | 'shop' | 'checkout' | 'confirmation'>('home');
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [policyModal, setPolicyModal] = useState<{ isOpen: boolean; type: 'privacy' | 'terms' | 'shipping' | 'refund' }>({
    isOpen: false,
    type: 'privacy'
  });
  const [currentPlacedOrder, setCurrentPlacedOrder] = useState<Order | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Discount calculation
  let discount = 0;
  if (appliedCoupon === 'WELLNESS10') {
    discount = Math.round(subtotal * 0.1);
  } else if (appliedCoupon === 'AMRUT15' && subtotal >= 1500) {
    discount = Math.round(subtotal * 0.15);
  }

  // Free shipping above 799
  const shipping = subtotal > 799 || subtotal === 0 ? 0 : 79;
  const total = Math.max(0, subtotal - discount + shipping);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`✓ Added ${product.name} (${quantity}) to cart`);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Removed product from cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'WELLNESS10') {
      setAppliedCoupon('WELLNESS10');
      setCouponCode('WELLNESS10');
      showToast('🎉 Coupon WELLNESS10 applied: 10% Off!');
      return { success: true, message: '10% discount applied!' };
    }
    if (clean === 'AMRUT15') {
      if (subtotal < 1500) {
        return { success: false, message: 'AMRUT15 requires a minimum order of ₹1,500' };
      }
      setAppliedCoupon('AMRUT15');
      setCouponCode('AMRUT15');
      showToast('🎉 Coupon AMRUT15 applied: 15% Off!');
      return { success: true, message: '15% discount applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try WELLNESS10 or AMRUT15' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    showToast('Coupon removed');
  };

  const buyNow = (product: Product, quantity = 1) => {
    addToCart(product, quantity);
    setSelectedProductModal(null);
    setIsCartOpen(false);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const createOrder = (orderData: Omit<Order, 'orderId' | 'orderDate' | 'estimatedDeliveryDate' | 'orderStatus' | 'trackingNumber'>): Order => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newId = `AS-2026-${randomNum}`;
    const now = new Date();
    const est = new Date();
    est.setDate(now.getDate() + 3);

    const fullOrder: Order = {
      ...orderData,
      orderId: newId,
      orderDate: now.toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }),
      estimatedDeliveryDate: est.toLocaleDateString('en-IN', {
        dateStyle: 'medium'
      }),
      orderStatus: 'Confirmed',
      trackingNumber: `EXPRESS-${newId}-IN`
    };

    setOrders((prev) => [fullOrder, ...prev]);
    setCurrentPlacedOrder(fullOrder);
    clearCart();
    setActiveView('confirmation');
    return fullOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, orderStatus: status } : o))
    );
  };

  const getOrderByQuery = (query: string): Order | undefined => {
    const clean = query.trim().toUpperCase();
    return orders.find(
      (o) =>
        o.orderId.toUpperCase() === clean ||
        o.mobileNumber.replace(/\D/g, '').includes(clean.replace(/\D/g, '')) ||
        (o.trackingNumber && o.trackingNumber.toUpperCase() === clean)
    );
  };

  const generateWhatsAppLink = (product?: Product, qty = 1, customNote?: string): string => {
    const phone = '919876543210';
    let message = `Hello Amrut Sanjeevani Team,\n\n`;
    if (product) {
      message += `I would like to order:\nProduct: ${product.name} (${product.netQuantity})\nQuantity: ${qty}\nPrice: ₹${product.price * qty}\n\n`;
    } else if (cart.length > 0) {
      message += `I would like to place an order for my cart:\n`;
      cart.forEach((item, idx) => {
        message += `${idx + 1}. ${item.product.name} (${item.product.netQuantity}) x ${item.quantity} = ₹${item.product.price * item.quantity}\n`;
      });
      message += `Total Amount: ₹${total}\n\n`;
    } else {
      message += `I would like to know more about ordering Amrut Sanjeevani.\n\n`;
    }
    if (customNote) {
      message += `Note: ${customNote}\n\n`;
    }
    message += `Please share the order confirmation and delivery details.`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        discount,
        couponCode,
        appliedCoupon,
        shipping,
        total,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        buyNow,
        activeView,
        setActiveView,
        selectedProductModal,
        setSelectedProductModal,
        isTrackOrderOpen,
        setIsTrackOrderOpen,
        isBookingOpen,
        setIsBookingOpen,
        isAccountOpen,
        setIsAccountOpen,
        isAdminOpen,
        setIsAdminOpen,
        isSearchOpen,
        setIsSearchOpen,
        policyModal,
        setPolicyModal,
        orders,
        currentPlacedOrder,
        setCurrentPlacedOrder,
        createOrder,
        updateOrderStatus,
        getOrderByQuery,
        toastMessage,
        showToast,
        generateWhatsAppLink
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
