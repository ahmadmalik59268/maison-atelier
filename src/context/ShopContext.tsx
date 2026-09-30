import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Product,
  CartItem,
  ProductColor,
  CategoryInfo,
  CurrencyCode,
  UserProfile,
  OrderRecord,
  OrderStatus,
  Review,
  Address,
  UserMeasurements,
} from '../types';
import {
  ATELIER_PRODUCTS,
  ATELIER_CATEGORIES,
  CURRENCIES,
  DEMO_USER,
  DEMO_ADMIN_USER,
  DEMO_ORDERS,
} from '../data/atelierData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

export interface AuthResult {
  success: boolean;
  role?: 'customer' | 'admin';
  error?: string;
}

export interface ShopContextType {
  // Products & Categories
  products: Product[];
  categories: CategoryInfo[];
  getProductById: (id: string) => Product | undefined;
  getProductBySlug: (slug: string) => Product | undefined;
  addProduct: (product: Omit<Product, 'id'>) => Promise<Product>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addCategory: (category: CategoryInfo) => Promise<void>;
  updateStock: (productId: string, newStock: number) => Promise<void>;
  addReview: (productId: string, review: Review) => void;

  // Cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotalUsd: number;
  addToCart: (product: Product, size: string, color: ProductColor, quantity?: number) => void;
  updateCartQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Wishlist
  wishlistIds: Set<string>;
  wishlistProducts: Product[];
  wishlistCount: number;
  toggleWishlist: (productOrId: Product | string) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlisted: (productId: string) => boolean;
  moveToCartFromWishlist: (product: Product) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  // User / Auth
  user: UserProfile | null;
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isAuthLoading: boolean;
  login: (email: string, passwordOrRole?: string, targetRole?: 'customer' | 'admin') => Promise<AuthResult>;
  register: (param1: string | { fullName: string; email: string; password?: string }, email?: string, password?: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  loginAsDemoCustomer: () => void;
  loginAsAdmin: () => void;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  updateMeasurements: (measurements: UserMeasurements) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (addressId: string) => void;

  // Orders
  orders: OrderRecord[];
  placeOrder: (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    shippingAddress: Address;
    paymentMethod: 'card' | 'cod' | 'applepay' | string;
    items: CartItem[];
    subtotal?: number;
    shipping?: number;
    discount?: number;
    total?: number;
  }) => Promise<OrderRecord>;
  getOrderById: (orderId: string) => OrderRecord | undefined;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;

  // Currency
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (priceUsd: number) => string;
  convertPrice: (priceUsd: number) => number;

  // Toast Notifications
  toasts: ToastItem[];
  toastMessage: string | null;
  showToast: (msg: string) => void;
  addToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Global UI Modals / Drawers
  quickViewProduct: Product | null;
  setQuickViewProduct: (prod: Product | null) => void;
  openQuickView: (prod: Product) => void;
  closeQuickView: () => void;
  isStyleStudioOpen: boolean;
  setIsStyleStudioOpen: (open: boolean) => void;
  isOrderTrackingOpen: boolean;
  setIsOrderTrackingOpen: (open: boolean) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  PRODUCTS: 'ahmad_clothing_products_v4',
  CATEGORIES: 'ahmad_clothing_categories_v4',
  CART: 'ahmad_clothing_cart_v4',
  WISHLIST: 'ahmad_clothing_wishlist_v4',
  USER: 'ahmad_clothing_user_v4',
  ORDERS: 'ahmad_clothing_orders_v4',
  CURRENCY: 'ahmad_clothing_currency_v4',
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State initialization
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : ATELIER_PRODUCTS;
    } catch {
      return ATELIER_PRODUCTS;
    }
  });

  const [categories, setCategories] = useState<CategoryInfo[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CATEGORIES);
      return saved ? JSON.parse(saved) : ATELIER_CATEGORIES;
    } catch {
      return ATELIER_CATEGORIES;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.WISHLIST);
      return saved ? new Set(JSON.parse(saved)) : new Set([ATELIER_PRODUCTS[0]?.id || 'prod-001']);
    } catch {
      return new Set();
    }
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : DEMO_USER;
    } catch {
      return DEMO_USER;
    }
  });

  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : DEMO_ORDERS;
    } catch {
      return DEMO_ORDERS;
    }
  });

  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENCY) as CurrencyCode;
      return saved && CURRENCIES[saved] ? saved : 'USD';
    } catch {
      return 'USD';
    }
  });

  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isStyleStudioOpen, setIsStyleStudioOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Toast System
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setToastMessage(message);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const showToast = (msg: string) => addToast(msg, 'info');

  // Persistence Effects
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.WISHLIST, JSON.stringify(Array.from(wishlistIds)));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [orders]);

  // ====================================================================
  // SUPABASE INITIALIZATION & DATA SYNC
  // ====================================================================

  const fetchUserProfileFromSupabase = useCallback(async (userId: string, email: string): Promise<UserProfile | null> => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.warn('Error fetching profile from Supabase:', error.message);
      }

      if (profile) {
        return {
          id: profile.id,
          fullName: profile.full_name || 'Valued Client',
          email: profile.email || email,
          phone: profile.phone || '',
          role: (profile.role === 'admin' ? 'admin' : 'customer') as 'customer' | 'admin',
          tier: profile.tier || 'Atelier Patron',
          joinedDate: profile.created_at ? new Date(profile.created_at).toLocaleDateString() : '2026',
        };
      } else {
        // Fallback default customer profile
        const newProfile: UserProfile = {
          id: userId,
          fullName: 'Valued Client',
          email: email,
          role: 'customer',
          tier: 'Atelier Patron',
          joinedDate: '2026',
        };
        return newProfile;
      }
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
      return null;
    }
  }, []);

  // Fetch Products & Categories from Supabase if configured
  const fetchProductsAndCategories = useCallback(async () => {
    if (!isSupabaseConfigured()) return;

    try {
      // 1. Categories
      const { data: catData } = await supabase.from('categories').select('*');
      if (catData && catData.length > 0) {
        const mappedCategories: CategoryInfo[] = catData.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description || '',
          image: c.image || '',
        }));
        setCategories(mappedCategories);
      }

      // 2. Products
      const { data: prodData } = await supabase.from('products').select('*');
      if (prodData && prodData.length > 0) {
        const mappedProducts: Product[] = prodData.map((p) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          subtitle: p.subtitle || '',
          category: p.category || 'outerwear',
          gender: p.gender || 'women',
          price: Number(p.price) || 0,
          compare_at_price: p.compare_at_price ? Number(p.compare_at_price) : undefined,
          sku: p.sku || `AC-${p.id.slice(0, 5)}`,
          stock_quantity: p.stock_quantity ?? 10,
          rating: Number(p.rating) || 5.0,
          reviewsCount: p.reviews_count || 12,
          fabric: p.fabric || 'Haute Tailored Fiber',
          material: p.material || 'Noble Blend',
          origin: p.origin || 'Ahmad Clothing Atelier',
          traceabilityId: p.traceability_id || `AC-${p.id.slice(0, 4)}`,
          description: p.description || '',
          editorialDescription: p.editorial_description || '',
          details: Array.isArray(p.details) ? p.details : [],
          care: Array.isArray(p.care) ? p.care : [p.care || 'Specialist dry clean'],
          colors: Array.isArray(p.colors) ? p.colors : [{ name: 'Classic Noir', hex: '#1C1B1F' }],
          sizes: Array.isArray(p.sizes) ? p.sizes : ['S', 'M', 'L'],
          badge: p.badge || undefined,
          secondaryBadge: p.secondary_badge || undefined,
          image: p.image || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80',
          secondaryImage: p.secondary_image || undefined,
          images: Array.isArray(p.images) && p.images.length > 0 ? p.images : [p.image || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80'],
          featured: p.featured ?? false,
          new_arrival: p.new_arrival ?? false,
        }));
        setProducts(mappedProducts);
      }
    } catch (err) {
      console.warn('Error syncing with Supabase database:', err);
    }
  }, []);

  // Fetch Orders for user or admin
  const fetchOrders = useCallback(async (userId?: string, role?: string) => {
    if (!isSupabaseConfigured()) return;

    try {
      let query = supabase.from('orders').select('*, order_items(*)');
      if (role !== 'admin' && userId) {
        query = query.eq('user_id', userId);
      }

      const { data: ordersData, error } = await query;
      if (error) {
        console.warn('Error fetching orders:', error.message);
        return;
      }

      if (ordersData && ordersData.length > 0) {
        const mappedOrders: OrderRecord[] = ordersData.map((o) => ({
          id: o.id,
          date: new Date(o.created_at).toLocaleDateString(),
          total: Number(o.total),
          subtotal: Number(o.subtotal),
          shipping: Number(o.shipping_amount),
          discount: 0,
          currency: 'USD',
          status: o.status as OrderStatus,
          paymentMethod: o.payment_method || 'cod',
          carrier: o.carrier || 'DHL Express Priority',
          trackingNumber: o.tracking_number || o.order_number,
          estimatedDelivery: o.estimated_delivery || '3 - 5 Business Days',
          customerEmail: o.shipping_email || '',
          shippingAddress: {
            id: `addr-${o.id}`,
            fullName: o.shipping_name || '',
            street: o.shipping_address || '',
            city: o.shipping_city || '',
            state: o.shipping_state || '',
            country: o.shipping_country || '',
            postalCode: o.shipping_postal_code || '',
            phone: o.shipping_phone || '',
          },
          items: Array.isArray(o.order_items)
            ? o.order_items.map((item: any) => ({
                id: item.id,
                productId: item.product_id || '',
                name: item.product_name,
                price: Number(item.price),
                selectedColor: item.selected_color || { name: 'Noir', hex: '#18181B' },
                selectedSize: item.selected_size || 'M',
                quantity: item.quantity,
                image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80',
                fabric: 'Noble Fabric',
              }))
            : [],
        }));
        setOrders(mappedOrders);
      }
    } catch (err) {
      console.warn('Error fetching orders:', err);
    }
  }, []);

  // Initialize Session
  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      if (!isSupabaseConfigured()) {
        setIsAuthLoading(false);
        return;
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session && session.user) {
          const profile = await fetchUserProfileFromSupabase(session.user.id, session.user.email || '');
          if (isMounted) {
            setUser(profile);
            if (profile) {
              fetchOrders(profile.id, profile.role);
            }
          }
        } else {
          if (isMounted) setUser(null);
        }
      } catch (err) {
        console.warn('Error checking session:', err);
      } finally {
        if (isMounted) setIsAuthLoading(false);
      }
    };

    initAuth();
    fetchProductsAndCategories();

    if (isSupabaseConfigured()) {
      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          const profile = await fetchUserProfileFromSupabase(session.user.id, session.user.email || '');
          if (isMounted) {
            setUser(profile);
            if (profile) {
              fetchOrders(profile.id, profile.role);
            }
          }
        } else {
          if (isMounted) {
            setUser(null);
          }
        }
      });

      return () => {
        isMounted = false;
        authListener.subscription.unsubscribe();
      };
    }
  }, [fetchUserProfileFromSupabase, fetchProductsAndCategories, fetchOrders]);

  // ====================================================================
  // AUTH METHODS
  // ====================================================================

  const login = async (
    email: string,
    passwordOrRole?: string,
    targetRole?: 'customer' | 'admin'
  ): Promise<AuthResult> => {
    setIsAuthLoading(true);

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: passwordOrRole || '',
        });

        if (error || !data.user) {
          setIsAuthLoading(false);
          const msg = error?.message || 'Authentication failed';
          if (msg.toLowerCase().includes('email not confirmed')) {
            return {
              success: false,
              error: 'Email not confirmed: Please check your inbox for the confirmation link, OR turn off "Confirm email" in Supabase Dashboard -> Authentication -> Providers -> Email.',
            };
          }
          return { success: false, error: msg };
        }

        const profile = await fetchUserProfileFromSupabase(data.user.id, data.user.email || '');
        setIsAuthLoading(false);

        if (!profile) {
          return { success: false, error: 'User profile not found' };
        }

        if (targetRole === 'admin' && profile.role !== 'admin') {
          return { success: false, role: 'customer', error: 'Access Denied: You do not have admin permissions.' };
        }

        setUser(profile);
        fetchOrders(profile.id, profile.role);
        return { success: true, role: profile.role };
      } catch (err: any) {
        setIsAuthLoading(false);
        return { success: false, error: err.message || 'Network error during sign in' };
      }
    } else {
      // Demo Mode Fallback
      setIsAuthLoading(false);
      const matchedDemo = email.includes('admin') || passwordOrRole === 'admin' ? DEMO_ADMIN_USER : DEMO_USER;
      if (targetRole === 'admin' && matchedDemo.role !== 'admin') {
        return { success: false, role: 'customer', error: 'Access Denied: Admin role required.' };
      }

      const loggedInUser: UserProfile = {
        ...matchedDemo,
        email: email,
        fullName: matchedDemo.fullName || 'Valued Patron',
      };
      setUser(loggedInUser);
      return { success: true, role: loggedInUser.role };
    }
  };

  const register = async (
    param1: string | { fullName: string; email: string; password?: string },
    emailParam?: string,
    passwordParam?: string
  ): Promise<AuthResult> => {
    let fullName = '';
    let email = '';
    let password = '';

    if (typeof param1 === 'object') {
      fullName = param1.fullName;
      email = param1.email;
      password = param1.password || '';
    } else {
      fullName = param1;
      email = emailParam || '';
      password = passwordParam || '';
    }

    setIsAuthLoading(true);

    if (isSupabaseConfigured()) {
      try {
        // ALWAYS FORCE 'customer' ROLE! Public signup MUST NEVER allow choosing admin role!
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            data: {
              full_name: fullName.trim(),
            },
          },
        });

        if (error || !data.user) {
          setIsAuthLoading(false);
          return { success: false, error: error?.message || 'Registration failed' };
        }

        // Insert into profiles table with role = 'customer'
        await supabase.from('profiles').upsert({
          id: data.user.id,
          email: email.trim(),
          full_name: fullName.trim(),
          role: 'customer', // HARDCODED SECURITY CONSTRAINT!
        });

        const newProfile: UserProfile = {
          id: data.user.id,
          fullName: fullName.trim(),
          email: email.trim(),
          role: 'customer',
          tier: 'Atelier Patron',
          joinedDate: new Date().toLocaleDateString(),
        };

        setUser(newProfile);
        setIsAuthLoading(false);
        return { success: true, role: 'customer' };
      } catch (err: any) {
        setIsAuthLoading(false);
        return { success: false, error: err.message || 'Registration error' };
      }
    } else {
      setIsAuthLoading(false);
      const newProfile: UserProfile = {
        id: `user-${Date.now()}`,
        fullName: fullName || 'New Patron',
        email: email || 'patron@ahmadclothing.com',
        role: 'customer',
        tier: 'Atelier Patron',
        joinedDate: new Date().toLocaleDateString(),
      };
      setUser(newProfile);
      return { success: true, role: 'customer' };
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setCart([]);
    addToast('You have been signed out from Ahmad Clothing.', 'info');
  };

  const loginAsDemoCustomer = () => {
    setUser(DEMO_USER);
    addToast('Logged in as Demo Customer', 'success');
  };

  const loginAsAdmin = () => {
    setUser(DEMO_ADMIN_USER);
    addToast('Logged in as Admin Concierge', 'success');
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;

    const updated = { ...user, ...updates };
    setUser(updated);

    if (isSupabaseConfigured()) {
      await supabase
        .from('profiles')
        .update({
          full_name: updates.fullName,
          phone: updates.phone,
        })
        .eq('id', user.id);
    }

    addToast('Profile dossier updated successfully.', 'success');
  };

  const updateUserProfile = updateProfile;

  const updateMeasurements = (measurements: UserMeasurements) => {
    if (!user) return;
    setUser({ ...user, measurements });
    addToast('Bespoke measurement profile saved.', 'success');
  };

  const addAddress = (addressData: Omit<Address, 'id'>) => {
    if (!user) return;
    const newAddr: Address = {
      ...addressData,
      id: `addr-${Date.now()}`,
    };
    const currentAddresses = user.addresses || [];
    setUser({
      ...user,
      addresses: [...currentAddresses, newAddr],
    });
    addToast('Delivery address saved to profile.', 'success');
  };

  const removeAddress = (addressId: string) => {
    if (!user) return;
    const currentAddresses = user.addresses || [];
    setUser({
      ...user,
      addresses: currentAddresses.filter((a) => a.id !== addressId),
    });
    addToast('Address removed.', 'info');
  };

  // ====================================================================
  // PRODUCT & CATEGORY MANAGEMENT
  // ====================================================================

  const getProductById = (id: string) => products.find((p) => p.id === id);
  const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);

  const addProduct = async (prodData: Omit<Product, 'id'>): Promise<Product> => {
    const newId = `prod-${Date.now()}`;
    const newProduct: Product = {
      ...prodData,
      id: newId,
    };

    setProducts((prev) => [newProduct, ...prev]);

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('products').insert({
          name: prodData.name,
          slug: prodData.slug,
          subtitle: prodData.subtitle,
          description: prodData.description,
          category: prodData.category,
          gender: prodData.gender,
          material: prodData.material,
          price: prodData.price,
          compare_at_price: prodData.compare_at_price,
          sku: prodData.sku,
          stock_quantity: prodData.stock_quantity,
          sizes: prodData.sizes,
          colors: prodData.colors,
          image: prodData.image,
          images: prodData.images,
          featured: prodData.featured,
          new_arrival: prodData.new_arrival,
        });
      } catch (err) {
        console.error('Error inserting product into Supabase:', err);
      }
    }

    addToast(`Added product "${prodData.name}" to catalog`, 'success');
    return newProduct;
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );

    if (isSupabaseConfigured()) {
      try {
        await supabase
          .from('products')
          .update({
            name: updates.name,
            price: updates.price,
            stock_quantity: updates.stock_quantity,
            category: updates.category,
            description: updates.description,
            image: updates.image,
          })
          .eq('id', id);
      } catch (err) {
        console.error('Error updating product in Supabase:', err);
      }
    }

    addToast('Product updated successfully', 'success');
  };

  const deleteProduct = async (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('products').delete().eq('id', id);
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    }

    addToast('Product removed from catalog', 'info');
  };

  const addCategory = async (category: CategoryInfo) => {
    setCategories((prev) => [...prev, category]);

    if (isSupabaseConfigured()) {
      await supabase.from('categories').insert({
        name: category.name,
        slug: category.slug,
        description: category.description,
        image: category.image,
      });
    }

    addToast(`Category "${category.name}" added`, 'success');
  };

  const updateStock = async (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock_quantity: newStock } : p))
    );

    if (isSupabaseConfigured()) {
      await supabase
        .from('products')
        .update({ stock_quantity: newStock })
        .eq('id', productId);
    }

    addToast(`Inventory stock updated to ${newStock}`, 'success');
  };

  const addReview = (productId: string, review: Review) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedReviews = [review, ...(p.reviews || [])];
          const newRating = Number(
            (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
          );
          return {
            ...p,
            reviews: updatedReviews,
            reviewsCount: updatedReviews.length,
            rating: newRating,
          };
        }
        return p;
      })
    );
    addToast('Thank you! Your testimonial has been recorded.', 'success');
  };

  // ====================================================================
  // CART OPERATIONS
  // ====================================================================

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotalUsd = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const addToCart = (product: Product, size: string, color: ProductColor, quantity = 1) => {
    const cartItemId = `${product.id}-${size}-${color.name}`;

    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === cartItemId);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stock_quantity || 99);
        return prevCart.map((i) => (i.id === cartItemId ? { ...i, quantity: newQty } : i));
      } else {
        return [
          ...prevCart,
          {
            id: cartItemId,
            productId: product.id,
            name: product.name,
            price: product.price,
            selectedColor: color,
            selectedSize: size,
            quantity: Math.min(quantity, product.stock_quantity || 99),
            image: product.images[0] || product.image,
            fabric: product.fabric,
            maxStock: product.stock_quantity,
          },
        ];
      }
    });

    setIsCartOpen(true);
    addToast(`Added "${product.name}" (${size}) to Shopping Bag`, 'success');
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            const max = item.maxStock || 99;
            return { ...item, quantity: Math.min(newQty, max) };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    addToast('Item removed from bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // ====================================================================
  // WISHLIST OPERATIONS
  // ====================================================================

  const toggleWishlist = (productOrId: Product | string) => {
    const id = typeof productOrId === 'string' ? productOrId : productOrId.id;
    const prod = typeof productOrId === 'object' ? productOrId : getProductById(id);

    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        addToast(`Removed "${prod?.name || 'Garment'}" from Wishlist`, 'info');
      } else {
        next.add(id);
        addToast(`Saved "${prod?.name || 'Garment'}" to Wishlist`, 'success');
      }
      return next;
    });
  };

  const isInWishlist = (productId: string) => wishlistIds.has(productId);
  const isWishlisted = isInWishlist;

  const wishlistProducts = products.filter((p) => wishlistIds.has(p.id));
  const wishlistCount = wishlistIds.size;

  const moveToCartFromWishlist = (product: Product) => {
    const size = product.sizes[0] || 'M';
    const color = product.colors[0] || { name: 'Noir', hex: '#18181B' };
    addToCart(product, size, color, 1);
    setWishlistIds((prev) => {
      const next = new Set(prev);
      next.delete(product.id);
      return next;
    });
  };

  // ====================================================================
  // CHECKOUT & ORDERS
  // ====================================================================

  const placeOrder = async (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    shippingAddress: Address;
    paymentMethod: 'card' | 'cod' | 'applepay' | string;
    items: CartItem[];
    subtotal?: number;
    shipping?: number;
    discount?: number;
    total?: number;
  }): Promise<OrderRecord> => {
    const subtotal = orderData.subtotal ?? cartSubtotalUsd;
    const shipping = orderData.shipping ?? (subtotal >= 250 ? 0 : 35);
    const total = orderData.total ?? subtotal + shipping;

    const orderNumber = `AC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrderId = `ord-${Date.now()}`;

    const newOrder: OrderRecord = {
      id: newOrderId,
      date: new Date().toLocaleDateString(),
      subtotal,
      shipping,
      discount: 0,
      total,
      currency: 'USD',
      items: orderData.items,
      status: 'pending',
      paymentMethod: orderData.paymentMethod,
      carrier: 'DHL Express Priority',
      trackingNumber: orderNumber,
      estimatedDelivery: '3 - 5 Business Days',
      customerEmail: orderData.customerEmail,
      shippingAddress: orderData.shippingAddress,
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Update Stock in state
    orderData.items.forEach((item) => {
      setProducts((prevProds) =>
        prevProds.map((p) => {
          if (p.id === item.productId) {
            return {
              ...p,
              stock_quantity: Math.max(0, p.stock_quantity - item.quantity),
            };
          }
          return p;
        })
      );
    });

    if (isSupabaseConfigured()) {
      try {
        // Insert order record into database
        const { data: dbOrder, error: orderErr } = await supabase
          .from('orders')
          .insert({
            user_id: user?.id || null,
            order_number: orderNumber,
            status: 'pending',
            subtotal,
            shipping_amount: shipping,
            total,
            payment_method: orderData.paymentMethod,
            shipping_name: orderData.customerName,
            shipping_email: orderData.customerEmail,
            shipping_phone: orderData.customerPhone || orderData.shippingAddress.phone,
            shipping_address: orderData.shippingAddress.street,
            shipping_city: orderData.shippingAddress.city,
            shipping_state: orderData.shippingAddress.state,
            shipping_country: orderData.shippingAddress.country,
            shipping_postal_code: orderData.shippingAddress.postalCode,
            tracking_number: orderNumber,
          })
          .select()
          .single();

        if (!orderErr && dbOrder) {
          // Insert order items
          const orderItemsPayload = orderData.items.map((i) => ({
            order_id: dbOrder.id,
            product_id: i.productId.startsWith('prod-') ? null : i.productId,
            product_name: i.name,
            price: i.price,
            quantity: i.quantity,
            selected_size: i.selectedSize,
            selected_color: i.selectedColor,
          }));

          await supabase.from('order_items').insert(orderItemsPayload);

          // Decrement stock in Supabase products
          for (const item of orderData.items) {
            if (!item.productId.startsWith('prod-')) {
              try {
                await supabase.rpc('decrement_product_stock', {
                  prod_id: item.productId,
                  qty: item.quantity,
                });
              } catch {
                await supabase
                  .from('products')
                  .update({ stock_quantity: Math.max(0, (item.maxStock || 10) - item.quantity) })
                  .eq('id', item.productId);
              }
            }
          }
        }
      } catch (err) {
        console.error('Error writing order to Supabase:', err);
      }
    }

    clearCart();
    addToast(`Order ${orderNumber} placed successfully!`, 'success');
    return newOrder;
  };

  const getOrderById = (orderId: string) =>
    orders.find((o) => o.id === orderId || o.trackingNumber === orderId);

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );

    if (isSupabaseConfigured()) {
      await supabase
        .from('orders')
        .update({ status: status.toLowerCase() })
        .eq('id', orderId);
    }

    addToast(`Order ${orderId} status updated to ${status}`, 'success');
  };

  // ====================================================================
  // CURRENCY & PRICING
  // ====================================================================

  const setCurrency = (code: CurrencyCode) => {
    if (CURRENCIES[code]) {
      setCurrencyState(code);
      localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENCY, code);
      addToast(`Currency switched to ${code}`, 'info');
    }
  };

  const convertPrice = (priceUsd: number) => {
    const rate = CURRENCIES[currency]?.rate || 1;
    return Math.round(priceUsd * rate);
  };

  const formatPrice = (priceUsd: number) => {
    const curr = CURRENCIES[currency] || CURRENCIES.USD;
    const amount = Math.round(priceUsd * curr.rate);
    return `${curr.symbol}${amount.toLocaleString()}`;
  };

  // Global Quick View Modals
  const openQuickView = (prod: Product) => setQuickViewProduct(prod);
  const closeQuickView = () => setQuickViewProduct(null);

  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        getProductById,
        getProductBySlug,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateStock,
        addReview,

        cart,
        cartCount,
        cartSubtotalUsd,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,

        wishlistIds,
        wishlistProducts,
        wishlistCount,
        toggleWishlist,
        isInWishlist,
        isWishlisted,
        moveToCartFromWishlist,
        isWishlistOpen,
        setIsWishlistOpen,

        user,
        currentUser: user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isAuthLoading,
        login,
        register,
        logout,
        loginAsDemoCustomer,
        loginAsAdmin,
        updateProfile,
        updateUserProfile,
        updateMeasurements,
        addAddress,
        removeAddress,

        orders,
        placeOrder,
        getOrderById,
        updateOrderStatus,

        currency,
        setCurrency,
        formatPrice,
        convertPrice,

        toasts,
        toastMessage,
        showToast,
        addToast,
        removeToast,

        quickViewProduct,
        setQuickViewProduct,
        openQuickView,
        closeQuickView,
        isStyleStudioOpen,
        setIsStyleStudioOpen,
        isOrderTrackingOpen,
        setIsOrderTrackingOpen,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
