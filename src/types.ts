export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  detailedDescription: string;
  netQuantity: string;
  servings: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  badge?: string;
  isPopular?: boolean;
  image: string;
  gallery: string[];
  keyHighlights: string[];
  composition: {
    name: string;
    percentage: string;
    role: string;
  }[];
  usageDirections: string;
  storageInfo: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'New' | 'Confirmed' | 'Processing' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  orderId: string;
  customerName: string;
  mobileNumber: string;
  email: string;
  address: {
    house: string;
    street: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
  };
  deliveryNotes?: string;
  items: {
    productId: string;
    productName: string;
    netQuantity: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD';
  paymentStatus: 'Paid' | 'Pending' | 'COD_Verified';
  orderStatus: OrderStatus;
  orderDate: string;
  estimatedDeliveryDate: string;
  trackingNumber?: string;
}

export interface Ingredient {
  id: string;
  name: string;
  subtitle: string;
  shortDesc: string;
  longDesc: string;
  accentColor: string;
  keyBenefits: string[];
  bioactives: string;
  origin: string;
  character: string;
  image: string;
  iconType: 'lemon' | 'garlic' | 'ginger' | 'vinegar';
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  role: string;
  review: string;
  rating: number;
  avatar: string;
  duration: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'General' | 'Ingredients' | 'Usage' | 'Ordering & Shipping';
}
