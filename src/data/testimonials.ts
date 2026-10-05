import { Testimonial, FaqItem } from '../types';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Ananya Sharma',
    city: 'Bengaluru',
    role: 'Design Director & Marathoner',
    review: 'Making mindful choices became significantly easier when I started creating a more consistent wellness routine. The morning lemon and ginger kick has completely replaced my grogginess.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    duration: 'Using for 4 months'
  },
  {
    id: 't-2',
    name: 'Rajesh Nair',
    city: 'Mumbai',
    role: 'Financial Analyst & Father',
    review: 'I was hesitant about garlic in a wellness drink, but the balance with cold-pressed lemon and apple cider vinegar is remarkably smooth and light. It feels clean and truly invigorating.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    duration: 'Using for 6 months'
  },
  {
    id: 't-3',
    name: 'Priya Mukherjee',
    city: 'Pune',
    role: 'Yoga Instructor',
    review: 'Amrut Sanjeevani has become a treasured staple in our morning student community. Natural, glass-bottled, and without artificial syrup thickeners. Exactly what mindful living should feel like.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    duration: 'Using for 8 months'
  },
  {
    id: 't-4',
    name: 'Vikramaditya Rao',
    city: 'Hyderabad',
    role: 'Tech Entrepreneur',
    review: 'Between back-to-back meetings and high-pace schedules, taking one tablespoon in warm water at 7 AM keeps my gut feeling comfortable and light throughout the day.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    duration: 'Using for 3 months'
  },
  {
    id: 't-5',
    name: 'Meera Deshmukh',
    city: 'New Delhi',
    role: 'Architect',
    review: 'The quality of packaging, the prompt delivery, and the crisp taste make it an absolute pleasure to maintain as a continuous habit. The Duo Pack is my regular reorder.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    duration: 'Using for 5 months'
  }
];

export const FAQS: FaqItem[] = [
  {
    category: 'General',
    question: 'What is Amrut Sanjeevani?',
    answer: 'Amrut Sanjeevani is a premium natural wellness blend thoughtfully formulated from four classic natural ingredients: cold-pressed lemon juice, aged garlic extract, fresh mountain ginger, and raw apple cider vinegar containing "the mother". It is designed to be a simple, clean addition to your everyday morning wellness routine.'
  },
  {
    category: 'Ingredients',
    question: 'What ingredients are used and are there any preservatives?',
    answer: 'Amrut Sanjeevani contains 100% natural plant-derived ingredients: Fresh Lemon Juice (25%), Mountain Ginger Extract (25%), Macerated Garlic (25%), and Raw Apple Cider Vinegar (25%). We do not add refined sugars, artificial coloring, synthetic flavors, or chemical stabilizers.'
  },
  {
    category: 'Usage',
    question: 'How should I use Amrut Sanjeevani daily?',
    answer: 'Shake the bottle well before use. Mix 10ml to 15ml (approximately one tablespoon) of Amrut Sanjeevani into a glass of lukewarm water (150ml - 200ml). Consume it first thing in the morning on an empty stomach. You may follow with your regular breakfast 20-30 minutes later.'
  },
  {
    category: 'Usage',
    question: 'How should it be stored?',
    answer: 'Unopened bottles should be stored in a cool, dry place away from direct sunlight. After breaking the protective tamper-evident seal, keep the bottle refrigerated and consume within 45 to 60 days to experience peak flavor and enzyme vitality.'
  },
  {
    category: 'General',
    question: 'Who should consult a healthcare professional before use?',
    answer: 'While Amrut Sanjeevani is made from whole food ingredients commonly used in culinary traditions, pregnant or lactating women, individuals with severe gastric ulcers, those on prescription blood thinners, or anyone undergoing medical treatment should consult their physician or healthcare provider prior to introducing any concentrated botanical tonic.'
  },
  {
    category: 'Ordering & Shipping',
    question: 'Where can I purchase Amrut Sanjeevani and how long does delivery take?',
    answer: 'You can order Amrut Sanjeevani directly through our official online shop, book a callback order, or place a quick order via WhatsApp. We ship across India within 2 to 4 business days via insured express couriers with real-time tracking.'
  },
  {
    category: 'Ordering & Shipping',
    question: 'What payment options are supported?',
    answer: 'We support all major payment methods including Instant UPI (Google Pay, PhonePe, Paytm, BHIM), Credit & Debit Cards (Visa, MasterCard, RuPay), Net Banking across 50+ banks, and Cash on Delivery (COD) for eligible pincodes.'
  }
];
