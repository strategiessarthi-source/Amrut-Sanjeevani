import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'as-single-500',
    name: 'Amrut Sanjeevani Original Blend',
    tagline: 'Natural Daily Wellness Blend',
    description: 'A thoughtfully crafted blend of fresh lemon, aged garlic, mountain ginger, and raw apple cider vinegar.',
    detailedDescription: 'Amrut Sanjeevani Original Blend brings together four time-honored ingredients in precise harmonic balance. Crafted without added refined sugars, artificial preservatives, or chemical thickeners, it delivers a crisp, invigorating morning wellness ritual designed for the modern rhythm of life.',
    netQuantity: '500 ml',
    servings: '30 - 35 Servings (1 Month Supply)',
    price: 899,
    originalPrice: 1199,
    rating: 4.9,
    reviewCount: 342,
    inStock: true,
    stockCount: 84,
    badge: 'Most Popular',
    isPopular: true,
    image: '/product-jar.jpg',
    gallery: [
      '/product-jar.jpg',
      'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=900&q=80',
      '/src/assets/images/apple cider vinegar.jpg',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80'
    ],
    keyHighlights: [
      '100% Pure Plant Ingredients',
      'Cold-Blended for Enzyme Vitality',
      'No Added Sugar, Artificial Flavors or Preservatives',
      'Glass-Bottled for Premium Purity and Freshness',
      'Batch-Tested for Active Bioactive Consistency'
    ],
    composition: [
      { name: 'Pure Lemon Juice (Cold-Pressed)', percentage: '25%', role: 'Rich in citrus bioflavonoids & refreshing brightness' },
      { name: 'Crushed Mountain Ginger Extract', percentage: '25%', role: 'Warm aromatic character & soothing comfort' },
      { name: 'Raw Garlic Essence (Micro-filtered)', percentage: '25%', role: 'Allicin compounds & generational natural tradition' },
      { name: 'Raw Apple Cider Vinegar (with The Mother)', percentage: '25%', role: 'Distinctive acetic richness & digestive harmony' }
    ],
    usageDirections: 'Dilute 15ml (approx. 1 tablespoon) in a glass of lukewarm water (150ml) every morning on an empty stomach. Stir well and consume immediately.',
    storageInfo: 'Store in a cool, dry place away from direct sunlight. Refrigerate after opening and consume within 45 days for optimal freshness.'
  },
  {
    id: 'as-duo-pack',
    name: 'Amrut Sanjeevani Duo Wellness Pack',
    tagline: 'Twin Pack for Consistent Everyday Balance',
    description: 'Two 500ml bottles of our signature blend. Ideal for couples or ensuring uninterrupted 60-day daily routines.',
    detailedDescription: 'Consistency is the cornerstone of daily vitality. The Duo Pack provides a complete 2-month continuous supply of Amrut Sanjeevani, ensuring your daily morning wellness ceremony remains effortless and sustained.',
    netQuantity: '2 x 500 ml (1000 ml Total)',
    servings: '60 - 70 Servings (2 Months Supply)',
    price: 1599,
    originalPrice: 2398,
    rating: 4.95,
    reviewCount: 528,
    inStock: true,
    stockCount: 45,
    badge: 'Best Value • Save ₹799',
    isPopular: false,
    image: '/product-duo-jars.jpg',
    gallery: [
      '/product-duo-jars.jpg',
      '/product-jar.jpg',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=900&q=80'
    ],
    keyHighlights: [
      'Save 33% on Bundle Price',
      'Free Priority Insured Shipping',
      'Complimentary Wooden Measuring Spoon',
      'Guaranteed Fresh Current Batch Dispatch'
    ],
    composition: [
      { name: 'Cold-Pressed Lemon Extract', percentage: '25%', role: 'Bright citrus vitality' },
      { name: 'Pure Ginger Root Essence', percentage: '25%', role: 'Warm stimulating notes' },
      { name: 'Aged Himalayan Garlic', percentage: '25%', role: 'Purifying traditional foundation' },
      { name: 'Unfiltered Raw Apple Cider Vinegar', percentage: '25%', role: 'Active microbial harmony' }
    ],
    usageDirections: 'Take 15ml with 150ml of warm water once daily before your morning meal.',
    storageInfo: 'Keep sealed bottles in a cool, dark cabinet. Refrigerate individual bottle after breaking seal.'
  },
  {
    id: 'as-family-trio',
    name: 'Amrut Sanjeevani Family Health Trio',
    tagline: '3-Month Comprehensive Family Routine',
    description: 'Three 500ml glass bottles packed securely with our bespoke wellness guide and precision wooden measuring flask.',
    detailedDescription: 'Designed for households that share a passion for mindful living and clean nutrition. The Family Trio delivers three bottles of Amrut Sanjeevani to nourish the entire household with daily plant-powered morning hydration.',
    netQuantity: '3 x 500 ml (1500 ml Total)',
    servings: '90 - 100 Servings',
    price: 2249,
    originalPrice: 3597,
    rating: 5.0,
    reviewCount: 219,
    inStock: true,
    stockCount: 30,
    badge: 'Ultimate Family Pack',
    isPopular: false,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=900&q=80'
    ],
    keyHighlights: [
      'Maximum Savings per Milliliter',
      'Complimentary Routine Diary & Guidebook',
      'Dedicated WhatsApp Priority Support',
      'Eco-Friendly Cushioned Gift Packaging'
    ],
    composition: [
      { name: 'Fresh Lemon Juice', percentage: '25%', role: 'Natural organic acidity' },
      { name: 'High-Altitude Ginger', percentage: '25%', role: 'Zesty gingerol richness' },
      { name: 'Fresh Garlic Cloves (Refined)', percentage: '25%', role: 'Natural sulphur compounds' },
      { name: 'Fermented Raw Apple Cider Vinegar', percentage: '25%', role: 'Mother culture enzymes' }
    ],
    usageDirections: 'Serve 10-15ml in lukewarm water for adults once daily before breakfast.',
    storageInfo: 'Store unsealed bottle in refrigerator. Keep unopened bottles in a dry pantry.'
  }
];
