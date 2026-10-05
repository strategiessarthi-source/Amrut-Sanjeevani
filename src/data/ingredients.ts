import { Ingredient } from '../types';

export const INGREDIENTS: Ingredient[] = [
  {
    id: 'lemon',
    name: 'Sun-Ripened Lemon',
    subtitle: 'Bright, Refreshing & Citrus Vitality',
    shortDesc: 'Bright, refreshing and naturally rich in citrus character, bioflavonoids, and crisp natural zest.',
    longDesc: 'Our lemons are hand-harvested at peak morning ripeness and cold-pressed to preserve volatile aromatic oils and natural citrus bioflavonoids. Lemon provides the signature invigorating top note of Amrut Sanjeevani, waking up the senses with clean, crisp refreshment.',
    accentColor: '#E8D85B',
    keyBenefits: [
      'Natural source of plant bioflavonoids',
      'Crisp, refreshing taste that invigorates morning hydration',
      'Promotes saliva and digestive enzyme readiness',
      'Naturally alkalizing post-metabolic balance'
    ],
    bioactives: 'Citric Acid, Vitamin C Complex, Limonene & Hesperidin Bioflavonoids',
    origin: 'Pristine Orchards of Northern Hill Valleys',
    character: 'Zesty, Crisp, Citrus-forward',
    image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=900&q=80',
    iconType: 'lemon'
  },
  {
    id: 'garlic',
    name: 'Aged Mountain Garlic',
    subtitle: 'Timeless Botanical Strength & Character',
    shortDesc: 'A well-known natural ingredient used across generations, celebrated for its unique botanical purity.',
    longDesc: 'Carefully sourced and gently cold-macerated to retain allicin-precursor alliin without aggressive harshness. In Amrut Sanjeevani, garlic is smoothly unified with lemon and apple cider vinegar to create a harmonized, palatable daily botanical tonic.',
    accentColor: '#FFFFFF',
    keyBenefits: [
      'Generational staple for daily natural fortitude',
      'Contains organic sulfur compounds including Allicin and Ajoene',
      'Supports natural cardiovascular lifestyle balance',
      'Micro-filtered to maintain a smooth, pleasant finish'
    ],
    bioactives: 'Allicin, S-allyl cysteine (SAC), Diallyl Disulfide',
    origin: 'Mineral-Rich High Altitude Soils',
    character: 'Earthy, Pungent, Grounding',
    image: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=900&q=80',
    iconType: 'garlic'
  },
  {
    id: 'ginger',
    name: 'High-Altitude Ginger Root',
    subtitle: 'Bold Warmth & Rooted Goodness',
    shortDesc: 'Known for its bold natural character and long-standing place in mindful everyday morning routines.',
    longDesc: 'Fresh mountain ginger roots are washed, finely crushed, and slow-extracted to yield aromatic gingerols and shogaols. Its gentle internal warmth complements the brisk acidity of vinegar, producing a deeply comforting tactile sensation.',
    accentColor: '#D7A84B',
    keyBenefits: [
      'Delivers comforting internal warmth and digestive ease',
      'Rich in bioactive Gingerols and essential aromatic terpenes',
      'Ideal companion for brisk morning routines',
      'Supports smooth nutrient assimilation'
    ],
    bioactives: '6-Gingerol, 6-Shogaol, Zingiberene Terpenes',
    origin: 'Sub-Himalayan Rainforest Belts',
    character: 'Spicy, Warm, Aromatic',
    image: '/src/assets/images/ginger_root_fresh_1791181242743.jpg',
    iconType: 'ginger'
  },
  {
    id: 'apple-cider-vinegar',
    name: 'Raw Apple Cider Vinegar',
    subtitle: 'Naturally Fermented With "The Mother"',
    shortDesc: 'A naturally distinctive ingredient that seamlessly ties this carefully crafted blend together.',
    longDesc: 'Crafted from 100% whole crisp Himalayan apples through slow, two-stage natural fermentation. Unfiltered, unpasteurized, and rich in strand-like probiotic "Mother" culture, it provides clean organic acetic acid that unifies the four botanicals into a smooth, shelf-stable elixir.',
    accentColor: '#D7A84B',
    keyBenefits: [
      'Unpasteurized with live mother culture enzymes',
      'Contains 5% natural organic acetic acid for digestive harmony',
      'Assists daily metabolic and glycemic lifestyle balance',
      'Smooth amber finish with refined fruit undertones'
    ],
    bioactives: 'Natural Acetic Acid, Malic Acid, Polyphenols & Living Enzymes',
    origin: 'Orchards of Himachal Valley',
    character: 'Crisp, Tangy, Golden Amber',
    image: '/src/assets/images/apple cider vinegar.jpg',
    iconType: 'vinegar'
  }
];

export interface StoryScene {
  id: string;
  ingredient: string;
  tagline: string;
  heading: string;
  description: string;
  bgGradient: string;
  image: string;
  accent: string;
}

export const STORY_SCENES: StoryScene[] = [
  {
    id: 'scene-lemon',
    ingredient: 'Sun-Drenched Citrus',
    tagline: 'Scene 01 • The Orchard',
    heading: 'Freshness From Nature.',
    description: 'Every morning begins in sun-warmed citrus groves where cold-pressed lemon juices are extracted at their peak, bursting with clean aroma and natural zest.',
    bgGradient: 'from-[#0D1711] via-[#163020] to-[#25422D]',
    image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=1200&q=80',
    accent: '#E8D85B'
  },
  {
    id: 'scene-ginger',
    ingredient: 'Mountain Ginger',
    tagline: 'Scene 02 • The Highlands',
    heading: 'Rooted In Natural Goodness.',
    description: 'Deep within mineral-dense mountain soils, slow-growing ginger roots concentrate pungent gingerols that impart soothing inner warmth to every single drop.',
    bgGradient: 'from-[#14120B] via-[#241E11] to-[#362C16]',
    image: '/src/assets/images/ginger_root_fresh_1791181242743.jpg',
    accent: '#D7A84B'
  },
  {
    id: 'scene-garlic',
    ingredient: 'Pristine Garlic',
    tagline: 'Scene 03 • The Botanical Herb',
    heading: 'Nature\'s Timeless Ingredient.',
    description: 'Revered across historic wellness traditions, pristine garlic cloves are gently aged and micro-filtered, maintaining active compounds while ensuring an impeccably smooth finish.',
    bgGradient: 'from-[#0D1711] via-[#192B1E] to-[#1F3A28]',
    image: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=1200&q=80',
    accent: '#F7F3E8'
  },
  {
    id: 'scene-acv',
    ingredient: 'Raw Apple Cider Vinegar',
    tagline: 'Scene 04 • The Golden Ferment',
    heading: 'Naturally Crafted. Beautifully Balanced.',
    description: 'Fermented whole orchard apples mature in oak vats, forming the cloudy "Mother" of enzymes that harmonizes all four ingredients into Amrut Sanjeevani.',
    bgGradient: 'from-[#19150B] via-[#2D2311] to-[#3B2E15]',
    image: '/src/assets/images/apple cider vinegar.jpg',
    accent: '#D7A84B'
  }
];
