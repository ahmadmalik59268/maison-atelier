export interface ProductColor {
  name: string;
  hex: string;
  border?: boolean;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  sizePurchased: string;
  fitFeedback: 'True to Size' | 'Slightly Large' | 'Slightly Small';
}

export type ProductCategory = 'outerwear' | 'knitwear' | 'dresses' | 'accessories' | 'tailoring' | string;
export type ProductGender = 'women' | 'men' | 'unisex';
export type MaterialCategory = 'wool' | 'cashmere' | 'silk' | 'linen' | 'alpaca' | 'leather';

export interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  category: ProductCategory;
  gender: ProductGender;
  price: number;
  compare_at_price?: number;
  originalPrice?: number;
  sku: string;
  stock_quantity: number;
  rating: number;
  reviewsCount: number;
  fabric: string;
  material: string;
  materialCategory?: MaterialCategory;
  origin: string;
  traceabilityId: string;
  description: string;
  editorialDescription?: string;
  details: string[];
  care: string[] | string;
  lining?: string;
  colors: ProductColor[];
  sizes: string[];
  badge?: 'New' | 'Bestseller' | 'Exclusive' | 'New Season' | 'Eco-Wool' | 'Limited Edition' | string;
  badgeType?: 'new' | 'exclusive' | 'season' | 'eco';
  secondaryBadge?: string;
  image: string;
  secondaryImage?: string;
  images: string[];
  featured?: boolean;
  new_arrival?: boolean;
  created_at?: string;
  reviews?: Review[];
}

export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount?: number;
}

export interface CartItem {
  id: string; // unique cart entry id (productId-size-color)
  productId: string;
  name: string;
  price: number;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
  image: string;
  fabric: string;
  maxStock?: number;
}

export interface LookbookLook {
  id: string;
  number?: string;
  lookNumber?: string;
  title: string;
  season?: string;
  palette?: string;
  silhouette?: string;
  featuredSilhouette?: string;
  textile?: string;
  image: string;
  model?: string;
  description?: string;
  editorialDescription?: string;
  quote?: string;
  fabricDetails?: string;
  relatedProductId?: string;
  featuredProductIds?: string[];
}

export interface Boutique {
  id: string;
  name?: string;
  city: string;
  district?: string;
  address: string;
  hours: string;
  phone: string;
  salonServices?: string[];
  headTailor?: string;
  image?: string;
}

export interface StylePreset {
  id: string;
  name: string;
  occasion: string;
  description: string;
  itemIds: string[];
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to USD
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderTimelineStep {
  title: string;
  location: string;
  timestamp: string;
  completed: boolean;
  active: boolean;
  description: string;
}

export interface Address {
  id: string;
  fullName: string;
  street: string;
  city: string;
  state?: string;
  country: string;
  postalCode: string;
  phone?: string;
  isDefault?: boolean;
}

export interface OrderRecord {
  id: string;
  date: string;
  total: number;
  subtotal: number;
  shipping: number;
  shippingFee?: number;
  discount: number;
  currency: CurrencyCode;
  items: CartItem[];
  status: OrderStatus;
  paymentMethod: 'card' | 'cod' | 'applepay' | string;
  carrier: string;
  trackingNumber: string;
  estimatedDelivery: string;
  customerEmail: string;
  shippingAddress: Address;
  timeline?: OrderTimelineStep[];
}

export interface UserMeasurements {
  height?: string;
  chest?: string;
  waist?: string;
  hips?: string;
  shoulder?: string;
  unit?: 'cm' | 'in';
  heightCm?: number;
  bustChestCm?: number;
  waistCm?: number;
  hipCm?: number;
  preferredFit?: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  tier?: string;
  preferredCurrency?: CurrencyCode | string;
  joinedDate?: string;
  measurements?: UserMeasurements;
  addresses?: Address[];
}
