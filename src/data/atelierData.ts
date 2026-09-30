import {
  Product,
  LookbookLook,
  Boutique,
  CurrencyConfig,
  OrderRecord,
  CategoryInfo,
  UserProfile,
  StylePreset,
} from '../types';

export const CURRENCIES: Record<string, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rate: 1.0 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79 },
  JPY: { code: 'JPY', symbol: '¥', rate: 154.5 },
};

export const ATELIER_CATEGORIES: CategoryInfo[] = [
  {
    id: 'outerwear',
    name: 'Outerwear',
    slug: 'outerwear',
    description: 'Sculptural trench coats, double-faced wool overcoats, and architectural blazers.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80',
    itemCount: 8,
  },
  {
    id: 'knitwear',
    name: 'Knitwear',
    slug: 'knitwear',
    description: 'Gauge 18 pure Mongolian cashmere, heavy rib cardigans, and suri alpaca turtlenecks.',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80',
    itemCount: 6,
  },
  {
    id: 'dresses',
    name: 'Dresses & Evening',
    slug: 'dresses',
    description: 'Bias-cut mulberry silk slip dresses, column evening gowns, and draped evening tailoring.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80',
    itemCount: 5,
  },
  {
    id: 'tailoring',
    name: 'Tailoring & Trousers',
    slug: 'tailoring',
    description: 'High-waisted pleated trousers, double-breasted tuxedo suits, and relaxed French linen suits.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
    itemCount: 7,
  },
  {
    id: 'accessories',
    name: 'Leather Goods & Objects',
    slug: 'accessories',
    description: 'Vegetable-tanned Tuscan leather pochettes, sculptural buckle belts, and cashmere wraps.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
    itemCount: 4,
  },
];

export const ATELIER_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Double-Faced Camel Wool Overcoat',
    slug: 'double-faced-camel-wool-overcoat',
    subtitle: '100% Virgin Italian Wool • Hand-Stitched Edges',
    category: 'outerwear',
    gender: 'women',
    price: 1850,
    compare_at_price: 2150,
    originalPrice: 2150,
    sku: 'MA-OC-001',
    stock_quantity: 8,
    rating: 4.9,
    reviewsCount: 18,
    fabric: '100% Virgin Biellese Wool',
    material: 'Virgin Wool',
    materialCategory: 'wool',
    origin: 'Handmade in Paris Atelier',
    traceabilityId: 'FR-ATELIER-2025-081',
    description: 'An enduring monument to Parisian tailoring. Hand-crafted from un-dyed pure camel wool with hand-finished pick stitching along the peak lapels.',
    editorialDescription: 'An architectural silhouette designed to drape with authority. Structured shoulders yield to a relaxed waist cinched by an optional self-tie belt.',
    details: [
      'Unlined double-face construction with hand-sewn interior seams',
      'Real horn double buttons with hand-wound silk thread shanks',
      'Deep welt storm pockets with cupro interior lining',
      'Includes padded hanger and cedar garment protector dossier'
    ],
    care: [
      'Specialist luxury dry clean only',
      'Store on provided contoured cedar hanger',
      'Steam gently from reverse side'
    ],
    lining: '100% Breathable Cupro',
    colors: [
      { name: 'Pure Camel', hex: '#C49A6C' },
      { name: 'Noir Black', hex: '#1C1B1F' },
      { name: 'Alabaster Ivory', hex: '#F0EDE6', border: true }
    ],
    sizes: ['34 FR', '36 FR', '38 FR', '40 FR', '42 FR'],
    badge: 'New Season',
    badgeType: 'season',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80'
    ],
    featured: true,
    new_arrival: true,
  },
  {
    id: 'prod-002',
    name: 'Mongolian Cashmere Turtleneck',
    slug: 'mongolian-cashmere-turtleneck',
    subtitle: 'Gauge 18 Pure Cashmere • Steppe Origin',
    category: 'knitwear',
    gender: 'women',
    price: 780,
    sku: 'MA-KW-002',
    stock_quantity: 14,
    rating: 5.0,
    reviewsCount: 32,
    fabric: '100% Grade-A Mongolian Cashmere',
    material: 'Mongolian Cashmere',
    materialCategory: 'cashmere',
    origin: 'Knitted in Biella, Italy',
    traceabilityId: 'IT-KNIT-2025-412',
    description: 'Featherlight yet profoundly insulating. Spun from 15.2-micron white cashmere fibers carefully combed during spring molting in the Alashan region.',
    editorialDescription: 'A sublime second-skin foundation designed to slip effortlessly under structured tailoring or billow over high-waisted silk trousers.',
    details: [
      'Seamless 3D-knit torso construction for frictionless draping',
      'Reinforced ribbed neck band that retains tension over seasons',
      'Hand-linked cuffs and hem'
    ],
    care: [
      'Hand wash in cold water using neutral wool shampoo',
      'Dry flat on absorbent towel away from direct heat',
      'Store folded with lavender sachets; never hang'
    ],
    colors: [
      { name: 'Oatmeal Heather', hex: '#D8D2C4' },
      { name: 'Charcoal Slate', hex: '#3E3F42' },
      { name: 'Ecru Chalk', hex: '#FAF7EE', border: true }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'Exclusive',
    badgeType: 'exclusive',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1000&q=80'
    ],
    featured: true,
    new_arrival: false,
  },
  {
    id: 'prod-003',
    name: 'Mulberry Silk Bias-Cut Column Slip',
    slug: 'mulberry-silk-bias-cut-column-slip',
    subtitle: '30mm Heavy Silk Charmeuse • Liquid Drape',
    category: 'dresses',
    gender: 'women',
    price: 1250,
    sku: 'MA-DR-003',
    stock_quantity: 6,
    rating: 4.8,
    reviewsCount: 11,
    fabric: '100% Organic Mulberry Silk Charmeuse',
    material: 'Mulberry Silk',
    materialCategory: 'silk',
    origin: 'Cut & Draped in Lyon Atelier',
    traceabilityId: 'FR-LYON-2025-009',
    description: 'Cut on a true 45-degree bias to embrace the contours of the body with liquid cadence. Finished with French seams and delicate rolled silk edges.',
    editorialDescription: 'The pinnacle of minimalist gala elegance. Glows with a quiet, pearlescent luster in candlelight and movement.',
    details: [
      'Double-lined silk bust panel for opaque confidence',
      'Low-cut architectural back with hand-tied spaghetti cords',
      'Self-faced hemline that moves fluidly with stride'
    ],
    care: [
      'Delicate dry clean only',
      'Cool iron on reverse with protective pressing cloth'
    ],
    colors: [
      { name: 'Champagne Pearl', hex: '#EBE5D6', border: true },
      { name: 'Midnight Onyx', hex: '#0F1015' },
      { name: 'Sienna Rust', hex: '#8B4513' }
    ],
    sizes: ['34 FR', '36 FR', '38 FR', '40 FR'],
    badge: 'Limited Edition',
    badgeType: 'new',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80'
    ],
    featured: true,
    new_arrival: true,
  },
  {
    id: 'prod-004',
    name: 'Suri Alpaca Grand Studio Coat',
    slug: 'suri-alpaca-grand-studio-coat',
    subtitle: 'Rare High-Luster Suri Fiber • Hand-Brushed Nap',
    category: 'outerwear',
    gender: 'men',
    price: 2400,
    compare_at_price: 2800,
    originalPrice: 2800,
    sku: 'MA-MN-004',
    stock_quantity: 4,
    rating: 5.0,
    reviewsCount: 8,
    fabric: '85% Peruvian Suri Alpaca, 15% Virgin Wool',
    material: 'Suri Alpaca',
    materialCategory: 'alpaca',
    origin: 'Hand-Tailored in Milan, Italy',
    traceabilityId: 'IT-MIL-2025-901',
    description: 'Renowned for its rare, dreadlock-like fibers with natural silken sheen. Warmer than traditional wool yet breathtakingly lightweight on the shoulders.',
    editorialDescription: 'A statement overcoat cut with bold, relaxed lapels and a deep back vent for cinematic movement.',
    details: [
      'Fully canvassed floating horsehair chest piece',
      'Custom horn toggle and hidden horn button closure',
      'Interior glove and document pockets lined in silk twill'
    ],
    care: [
      'Specialist fur & wool dry clean only',
      'Brush regularly in direction of fiber nap with natural bristle brush'
    ],
    colors: [
      { name: 'Espresso Mink', hex: '#3B2F2F' },
      { name: 'Chalk White', hex: '#FDFBF7', border: true }
    ],
    sizes: ['46 EU', '48 EU', '50 EU', '52 EU', '54 EU'],
    badge: 'Exclusive',
    badgeType: 'exclusive',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80'
    ],
    featured: true,
    new_arrival: false,
  },
  {
    id: 'prod-005',
    name: 'French Flax Pleated Wide Trousers',
    slug: 'french-flax-pleated-wide-trousers',
    subtitle: 'Normandy Grown Flax • Deep Double Reverse Pleats',
    category: 'tailoring',
    gender: 'women',
    price: 620,
    sku: 'MA-TR-005',
    stock_quantity: 15,
    rating: 4.7,
    reviewsCount: 22,
    fabric: '100% Normandy Dew-Retted French Flax Linen',
    material: 'French Flax',
    materialCategory: 'linen',
    origin: 'Crafted in Normandy, France',
    traceabilityId: 'FR-NORM-2025-502',
    description: 'High-waisted trousers with dramatic double reverse pleats that billow with structural serenity. Pre-washed for a soft, broken-in patina that improves with age.',
    editorialDescription: 'The definitive summer tailoring anchor. Perfect with unbuttoned silk shirts or structured knit vests.',
    details: [
      'Extended tab closure with mother-of-pearl buttons',
      'Curved waistband with internal curtain construction',
      'Deep French pockets and welt back pocket'
    ],
    care: [
      'Machine wash gentle cold or hand wash',
      'Air dry and iron while damp for crisp pleats'
    ],
    colors: [
      { name: 'Raw Ecru', hex: '#E6DFC8', border: true },
      { name: 'Ink Navy', hex: '#1B2430' }
    ],
    sizes: ['34 FR', '36 FR', '38 FR', '40 FR', '42 FR'],
    badge: 'Eco-Wool',
    badgeType: 'eco',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=1000&q=80'
    ],
    featured: false,
    new_arrival: true,
  },
  {
    id: 'prod-006',
    name: 'Tuscan Saddle Leather Pochette',
    slug: 'tuscan-saddle-leather-pochette',
    subtitle: 'Full-Grain Vegetable Tanned • Hand Burnished Wax',
    category: 'accessories',
    gender: 'unisex',
    price: 890,
    sku: 'MA-AC-006',
    stock_quantity: 11,
    rating: 5.0,
    reviewsCount: 15,
    fabric: '100% Certified Tuscan Vegetable-Tanned Leather',
    material: 'Tuscan Leather',
    materialCategory: 'leather',
    origin: 'Ponte a Egola, Tuscany, Italy',
    traceabilityId: 'IT-TUSC-2025-773',
    description: 'Hand-sculpted from 3.5mm thick vegetable-tanned shoulder leather using organic tree bark extracts. Waxed and edge-burnished by second-generation Florentine artisans.',
    editorialDescription: 'A tactile objet d’art designed to acquire a rich, golden amber patina over decades of patron ownership.',
    details: [
      'Magnetic horn tab closure with brushed antique brass hardware',
      'Includes detachable leather cross-body lanyard',
      'Individual registration serial number heat-stamped under flap'
    ],
    care: [
      'Condition twice annually with natural beeswax balm',
      'Protect from prolonged moisture exposure'
    ],
    colors: [
      { name: 'Cognac Saddle', hex: '#9A5B2D' },
      { name: 'Noir Waxed', hex: '#171717' }
    ],
    sizes: ['One Size (24cm x 16cm x 7cm)'],
    badge: 'Bestseller',
    badgeType: 'exclusive',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80'
    ],
    featured: true,
    new_arrival: false,
  }
];

export const LOOKBOOK_LOOKS: LookbookLook[] = [
  {
    id: 'look-01',
    lookNumber: 'Look 01',
    number: '01',
    title: 'The Monastic Overcoat in Biellese Wool',
    season: 'Winter / Spring 2026',
    palette: 'Raw Camel & Chalk White',
    silhouette: 'Sculpted Dramatic Shoulder',
    featuredSilhouette: 'Sculpted Dramatic Shoulder',
    textile: 'Double-faced virgin wool & raw flax',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85',
    model: 'Saskia de Brauw',
    description: 'Presented at the Grand Palais Salon d’Honneur. Heavy unlined camel wool draped without buttons, held by architectural tension.',
    editorialDescription: 'Presented at the Grand Palais Salon d’Honneur. Heavy unlined camel wool draped without buttons, held by architectural tension.',
    quote: 'We sought to strip away the ornamental to reveal the raw majesty of undisturbed Italian wool.',
    fabricDetails: '100% Virgin Biellese Wool',
    relatedProductId: 'prod-001',
    featuredProductIds: ['prod-001', 'prod-005']
  },
  {
    id: 'look-02',
    lookNumber: 'Look 02',
    number: '02',
    title: 'Liquid Charmeuse & Andean Suri Alpaca',
    season: 'Winter / Spring 2026',
    palette: 'Champagne Pearl & Espresso Mink',
    silhouette: 'Bias-cut column silhouette',
    featuredSilhouette: 'Bias-cut column silhouette',
    textile: '30mm silk charmeuse & high-luster Suri alpaca',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=85',
    model: 'Vittoria Ceretti',
    description: 'A study in tactile polarity. The cool, slippery drape of Lyon silk juxtaposed against the cloud-like density of brushed Suri alpaca.',
    editorialDescription: 'A study in tactile polarity. The cool, slippery drape of Lyon silk juxtaposed against the cloud-like density of brushed Suri alpaca.',
    quote: 'Silk responds to light; alpaca captures the air.',
    fabricDetails: '30mm Silk Charmeuse & Suri Alpaca',
    relatedProductId: 'prod-003',
    featuredProductIds: ['prod-003', 'prod-004']
  },
  {
    id: 'look-03',
    lookNumber: 'Look 03',
    number: '03',
    title: 'Alashan Cashmere & Double-Reverse Pleats',
    season: 'Autumn / Winter 2025',
    palette: 'Oatmeal Heather & Normandy Grey',
    silhouette: 'Oversized knit with wide-leg tailoring',
    featuredSilhouette: 'Oversized knit with wide-leg tailoring',
    textile: 'Gauge-18 Cashmere & Normandy Flax Linen',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=85',
    model: 'Mona Tougaard',
    description: 'Effortless daytime authority. The turtleneck is engineered with dropped shoulder seams that cascade naturally over wide-leg trousers.',
    editorialDescription: 'Effortless daytime authority. The turtleneck is engineered with dropped shoulder seams that cascade naturally over wide-leg trousers.',
    quote: 'Comfort when taken to its highest refinement becomes the purest luxury.',
    fabricDetails: 'Grade-A Mongolian Cashmere & French Flax',
    relatedProductId: 'prod-002',
    featuredProductIds: ['prod-002', 'prod-005']
  }
];

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: 'preset-01',
    name: 'The Winter Gala Salon',
    occasion: 'Evening Soirée / Opera',
    description: 'A striking pairing of the Mulberry Silk Slip Dress draped under the Grand Suri Alpaca Studio Coat, completed with the Tuscan Saddle Pochette.',
    itemIds: ['prod-003', 'prod-004', 'prod-006'],
  },
  {
    id: 'preset-02',
    name: 'The Normandy Travel Capsule',
    occasion: 'Metropolitan Journey / Weekend Atelier',
    description: 'Double-Faced Camel Wool Overcoat worn atop the Grade-A Mongolian Cashmere Turtleneck and French Flax Pleated Trousers.',
    itemIds: ['prod-001', 'prod-002', 'prod-005'],
  },
  {
    id: 'preset-03',
    name: 'The Modern Monastic Look',
    occasion: 'Contemporary Exhibition / Private Viewing',
    description: 'Suri Alpaca Studio Coat over French Flax Trousers, accented with the Tuscan Pochette.',
    itemIds: ['prod-004', 'prod-005', 'prod-006'],
  }
];

export const BOUTIQUES: Boutique[] = [
  {
    id: 'boutique-paris',
    name: 'Maison Atelier Flagship & Haute Salons',
    city: 'Paris',
    district: '1er Arrondissement',
    address: '24 Rue Saint-Honoré, 75001 Paris, France',
    hours: 'Mon – Sat: 10:00 – 19:30 • Sun: By Appointment',
    phone: '+33 1 42 68 00 00',
    salonServices: ['Haute Couture Fittings', 'Private Dressing Salons', 'Bespoke Alteration Concierge'],
    headTailor: 'Maître Henriette de Montmirail',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'boutique-london',
    name: 'Maison Atelier Mayfair Salon',
    city: 'London',
    district: 'Mayfair',
    address: '14 New Bond Street, Mayfair, London W1S 3PF, United Kingdom',
    hours: 'Mon – Sat: 10:00 – 19:00 • Sun: 12:00 – 18:00',
    phone: '+44 20 7946 0912',
    salonServices: ['Savile Row Custom Canvasing', 'VIP Champagne Fitting Rooms'],
    headTailor: 'Master Arthur Pendelton',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'boutique-ny',
    name: 'Maison Atelier Madison Salon',
    city: 'New York',
    district: 'Upper East Side',
    address: '740 Madison Avenue, New York, NY 10065, USA',
    hours: 'Mon – Sat: 10:00 – 18:30 • Sun: 12:00 – 17:00',
    phone: '+1 212 555 0198',
    salonServices: ['Same-Day White Glove Courier Delivery', 'Private Styling Appointments'],
    headTailor: 'Madame Claire Vance',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1200&q=80',
  },
];

export const DEMO_USER: UserProfile = {
  id: 'patron-881',
  fullName: 'Lady Elena Vane',
  email: 'elena.vane@patron.atelier.com',
  phone: '+1 (555) 234-5678',
  role: 'customer',
  tier: 'Haute Circle',
  joinedDate: 'October 2024',
  measurements: {
    height: "5'9\"",
    chest: '35 in',
    waist: '26 in',
    hips: '36.5 in',
    shoulder: '15 in',
    unit: 'in',
    heightCm: 175,
    bustChestCm: 89,
    waistCm: 66,
    hipCm: 93,
    preferredFit: 'Architectural Oversized',
  },
  addresses: [
    {
      id: 'addr-01',
      fullName: 'Lady Elena Vane',
      street: '742 Evergreen Terrace, Penthouse B',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      postalCode: '10021',
      phone: '+1 (555) 234-5678',
      isDefault: true,
    },
  ],
};

export const DEMO_ADMIN_USER: UserProfile = {
  id: 'admin-001',
  fullName: 'Maison Concierge Administrator',
  email: 'concierge@maison-atelier.com',
  phone: '+33 1 42 68 00 01',
  role: 'admin',
  tier: 'Private Salon VIP',
  joinedDate: 'January 2024',
  addresses: [
    {
      id: 'addr-admin-01',
      fullName: 'Atelier Head Office',
      street: '24 Rue Saint-Honoré',
      city: 'Paris',
      country: 'France',
      postalCode: '75001',
      phone: '+33 1 42 68 00 00',
      isDefault: true,
    },
  ],
};

export const DEMO_USERS: UserProfile[] = [
  DEMO_USER,
  DEMO_ADMIN_USER,
  {
    id: 'patron-882',
    fullName: 'Baron Julian Sterling',
    email: 'julian.sterling@house.com',
    phone: '+44 20 7946 0888',
    role: 'customer',
    tier: 'Patron Guild',
    joinedDate: 'November 2024',
    measurements: {
      height: "6'1\"",
      chest: '42 in',
      waist: '32 in',
      hips: '40 in',
      unit: 'in',
    },
    addresses: [
      {
        id: 'addr-02',
        fullName: 'Baron Julian Sterling',
        street: '18 Grosvenor Square',
        city: 'London',
        country: 'United Kingdom',
        postalCode: 'W1K 6LD',
        phone: '+44 20 7946 0888',
        isDefault: true,
      }
    ]
  }
];

export const DEMO_ORDERS: OrderRecord[] = [
  {
    id: 'MA-2025-0891',
    date: '2025-02-14',
    total: 2630,
    subtotal: 2630,
    shipping: 0,
    shippingFee: 0,
    discount: 0,
    currency: 'USD',
    status: 'shipped',
    carrier: 'DHL Global Express Air',
    trackingNumber: 'MA-AWB-98442-FR',
    estimatedDelivery: '3 Business Days (Feb 18)',
    customerEmail: 'elena.vane@patron.atelier.com',
    paymentMethod: 'card',
    shippingAddress: {
      id: 'addr-01',
      fullName: 'Lady Elena Vane',
      street: '742 Evergreen Terrace, Penthouse B',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      postalCode: '10021',
      phone: '+1 (555) 234-5678',
      isDefault: true,
    },
    items: [
      {
        id: 'prod-001-38 FR-Pure Camel',
        productId: 'prod-001',
        name: 'Double-Faced Camel Wool Overcoat',
        price: 1850,
        selectedColor: { name: 'Pure Camel', hex: '#C49A6C' },
        selectedSize: '38 FR',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80',
        fabric: '100% Virgin Biellese Wool',
      },
      {
        id: 'prod-002-S-Oatmeal Heather',
        productId: 'prod-002',
        name: 'Mongolian Cashmere Turtleneck',
        price: 780,
        selectedColor: { name: 'Oatmeal Heather', hex: '#D8D2C4' },
        selectedSize: 'S',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80',
        fabric: '100% Grade-A Mongolian Cashmere',
      }
    ],
    timeline: [
      {
        title: 'Manifest Created',
        location: 'Paris Atelier, France',
        timestamp: 'Feb 14, 09:30 CET',
        completed: true,
        active: false,
        description: 'Garments inspected and sealed in cedar protective dossier.',
      },
      {
        title: 'Transferred to Air Express',
        location: 'Charles de Gaulle Airport (CDG)',
        timestamp: 'Feb 14, 17:45 CET',
        completed: true,
        active: true,
        description: 'Flight AF006 en route to JFK International.',
      }
    ]
  }
];
