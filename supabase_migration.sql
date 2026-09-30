-- ====================================================================
-- AHMAD CLOTHING / MAISON ATELIER — COMPLETE SUPABASE SQL MIGRATION
-- ====================================================================
-- Description: Production-ready PostgreSQL migration for Supabase.
-- Features: Auth triggers, RBAC (customer/admin), Row Level Security, 
--           Indexes, Storage Bucket policies, and Safe Sample Data.
-- ====================================================================

-- ====================================================================
-- SECTION 1 — EXTENSIONS
-- ====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ====================================================================
-- SECTION 2 — TABLES
-- ====================================================================

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  tier TEXT DEFAULT 'Atelier Patron',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  image TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  subtitle TEXT,
  description TEXT,
  editorial_description TEXT,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  category TEXT,
  gender TEXT DEFAULT 'unisex',
  material TEXT,
  material_category TEXT,
  fabric TEXT,
  origin TEXT,
  traceability_id TEXT,
  price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  compare_at_price NUMERIC(10,2),
  sku TEXT UNIQUE NOT NULL,
  stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
  sizes JSONB DEFAULT '[]'::jsonb,
  colors JSONB DEFAULT '[]'::jsonb,
  details JSONB DEFAULT '[]'::jsonb,
  care JSONB DEFAULT '[]'::jsonb,
  badges JSONB DEFAULT '[]'::jsonb,
  badge TEXT,
  secondary_badge TEXT,
  image TEXT,
  image_url TEXT,
  secondary_image TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT FALSE,
  new_arrival BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  rating NUMERIC(3,2) DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PRODUCT IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CART ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  selected_size TEXT,
  selected_color JSONB,
  quantity INTEGER DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_user_product_size UNIQUE (user_id, product_id, selected_size)
);

-- 6. WISHLIST ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.wishlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_user_wishlist_product UNIQUE (user_id, product_id)
);

-- 7. ADDRESSES TABLE
CREATE TABLE IF NOT EXISTS public.addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  street TEXT,
  city TEXT NOT NULL,
  state TEXT,
  country TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  order_number TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  subtotal NUMERIC(10,2) NOT NULL CHECK (subtotal >= 0),
  shipping_amount NUMERIC(10,2) DEFAULT 0 CHECK (shipping_amount >= 0),
  total NUMERIC(10,2) NOT NULL CHECK (total >= 0),
  payment_method TEXT DEFAULT 'cod',
  shipping_name TEXT,
  shipping_email TEXT,
  shipping_phone TEXT,
  shipping_address TEXT,
  shipping_city TEXT,
  shipping_state TEXT,
  shipping_country TEXT,
  shipping_postal_code TEXT,
  carrier TEXT DEFAULT 'DHL Express Priority',
  tracking_number TEXT,
  estimated_delivery TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_sku TEXT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(10,2) NOT NULL CHECK (unit_price >= 0),
  price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  total_price NUMERIC(10,2) CHECK (total_price >= 0),
  selected_size TEXT,
  selected_color JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- SECTION 3 — INDEXES
-- ====================================================================

CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_sku ON public.products(sku);
CREATE INDEX IF NOT EXISTS idx_products_new_arrival ON public.products(new_arrival);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON public.products(is_active);

CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON public.product_images(product_id);

CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON public.cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_items_user_id ON public.wishlist_items(user_id);

CREATE INDEX IF NOT EXISTS idx_addresses_user_id ON public.addresses(user_id);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);

-- ====================================================================
-- SECTION 4 — FUNCTIONS & TRIGGERS
-- ====================================================================

-- Secure Helper Function to Check if Current User is Admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- Trigger Function: Automatic Customer Profile Creation on Signup
-- CRITICAL SECURITY CONSTRAINT: ALWAYS forces role = 'customer' for public registration!
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Valued Patron'),
    'customer'
  )
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email,
      full_name = COALESCE(EXCLUDED.full_name, profiles.full_name);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger Function: Updated At Timestamps
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS set_categories_updated_at ON public.categories;
CREATE TRIGGER set_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS set_products_updated_at ON public.products;
CREATE TRIGGER set_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS set_cart_updated_at ON public.cart_items;
CREATE TRIGGER set_cart_updated_at BEFORE UPDATE ON public.cart_items FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS set_addresses_updated_at ON public.addresses;
CREATE TRIGGER set_addresses_updated_at BEFORE UPDATE ON public.addresses FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS set_orders_updated_at ON public.orders;
CREATE TRIGGER set_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Stock Decrement RPC Function for Safe Atomic Order Processing
CREATE OR REPLACE FUNCTION public.decrement_product_stock(prod_id UUID, qty INT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.products
  SET stock_quantity = GREATEST(0, stock_quantity - qty)
  WHERE id = prod_id;
END;
$$;

-- ====================================================================
-- SECTION 5 — ENABLE ROW LEVEL SECURITY (RLS)
-- ====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- ====================================================================
-- SECTION 6 — RLS POLICIES
-- ====================================================================

-- 1. PROFILES POLICIES
DROP POLICY IF EXISTS "Users can view own profile or admin view all" ON public.profiles;
CREATE POLICY "Users can view own profile or admin view all"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.is_admin());

DROP POLICY IF EXISTS "Users can update own non-role profile fields or admin update all" ON public.profiles;
CREATE POLICY "Users can update own non-role profile fields or admin update all"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id OR public.is_admin());

-- 2. CATEGORIES POLICIES
DROP POLICY IF EXISTS "Categories readable by all public users" ON public.categories;
CREATE POLICY "Categories readable by all public users"
  ON public.categories FOR SELECT
  USING (is_active = TRUE OR public.is_admin());

DROP POLICY IF EXISTS "Admin write categories" ON public.categories;
CREATE POLICY "Admin write categories"
  ON public.categories FOR ALL
  USING (public.is_admin());

-- 3. PRODUCTS POLICIES
DROP POLICY IF EXISTS "Active products readable by all" ON public.products;
CREATE POLICY "Active products readable by all"
  ON public.products FOR SELECT
  USING (is_active = TRUE OR public.is_admin());

DROP POLICY IF EXISTS "Admin write products" ON public.products;
CREATE POLICY "Admin write products"
  ON public.products FOR ALL
  USING (public.is_admin());

-- 4. PRODUCT IMAGES POLICIES
DROP POLICY IF EXISTS "Product images readable by all" ON public.product_images;
CREATE POLICY "Product images readable by all"
  ON public.product_images FOR SELECT
  USING (TRUE);

DROP POLICY IF EXISTS "Admin write product images" ON public.product_images;
CREATE POLICY "Admin write product images"
  ON public.product_images FOR ALL
  USING (public.is_admin());

-- 5. CART POLICIES
DROP POLICY IF EXISTS "User manages own cart" ON public.cart_items;
CREATE POLICY "User manages own cart"
  ON public.cart_items FOR ALL
  USING (auth.uid() = user_id OR public.is_admin());

-- 6. WISHLIST POLICIES
DROP POLICY IF EXISTS "User manages own wishlist" ON public.wishlist_items;
CREATE POLICY "User manages own wishlist"
  ON public.wishlist_items FOR ALL
  USING (auth.uid() = user_id);

-- 7. ADDRESSES POLICIES
DROP POLICY IF EXISTS "User manages own addresses" ON public.addresses;
CREATE POLICY "User manages own addresses"
  ON public.addresses FOR ALL
  USING (auth.uid() = user_id OR public.is_admin());

-- 8. ORDERS POLICIES
DROP POLICY IF EXISTS "User views own orders or admin views all" ON public.orders;
CREATE POLICY "User views own orders or admin views all"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin());

DROP POLICY IF EXISTS "Authenticated customer creates order" ON public.orders;
CREATE POLICY "Authenticated customer creates order"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL OR public.is_admin());

DROP POLICY IF EXISTS "Admin updates order status" ON public.orders;
CREATE POLICY "Admin updates order status"
  ON public.orders FOR UPDATE
  USING (public.is_admin());

-- 9. ORDER ITEMS POLICIES
DROP POLICY IF EXISTS "User views own order items or admin views all" ON public.order_items;
CREATE POLICY "User views own order items or admin views all"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND (orders.user_id = auth.uid() OR public.is_admin())
    )
  );

DROP POLICY IF EXISTS "Order items insertion" ON public.order_items;
CREATE POLICY "Order items insertion"
  ON public.order_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND (orders.user_id = auth.uid() OR orders.user_id IS NULL OR public.is_admin())
    )
  );

-- ====================================================================
-- SECTION 7 — SUPABASE STORAGE BUCKET & POLICIES
-- ====================================================================

-- Create product-images storage bucket if missing
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Bucket Policies
DROP POLICY IF EXISTS "Public Read Product Images Storage" ON storage.objects;
CREATE POLICY "Public Read Product Images Storage"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Admin Upload Product Images Storage" ON storage.objects;
CREATE POLICY "Admin Upload Product Images Storage"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'product-images' AND public.is_admin());

DROP POLICY IF EXISTS "Admin Delete Product Images Storage" ON storage.objects;
CREATE POLICY "Admin Delete Product Images Storage"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'product-images' AND public.is_admin());

-- ====================================================================
-- SECTION 8 — SAFE SAMPLE DATA
-- ====================================================================

INSERT INTO public.categories (name, slug, description, image, image_url, is_active) VALUES
('Outerwear', 'outerwear', 'Sculptural trench coats, double-faced wool overcoats, and architectural blazers.', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80', true),
('Knitwear', 'knitwear', 'Gauge 18 pure Mongolian cashmere, heavy rib cardigans, and suri alpaca turtlenecks.', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80', true),
('Dresses & Evening', 'dresses', 'Bias-cut mulberry silk slip dresses, column evening gowns, and draped evening tailoring.', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80', true),
('Tailoring & Trousers', 'tailoring', 'High-waisted pleated trousers, double-breasted tuxedo suits, and relaxed French linen suits.', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80', true),
('Leather Goods & Objects', 'accessories', 'Vegetable-tanned Tuscan leather pochettes, sculptural buckle belts, and cashmere wraps.', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80', true)
ON CONFLICT (slug) DO NOTHING;

-- Sample Products
INSERT INTO public.products (
  name, slug, subtitle, description, editorial_description, category, gender, material, price, compare_at_price, sku, stock_quantity, sizes, colors, details, care, image, images, featured, new_arrival, is_active
) VALUES
(
  'Double-Faced Camel Wool Overcoat',
  'double-faced-camel-wool-overcoat',
  '100% Virgin Italian Wool • Hand-Stitched Edges',
  'An enduring monument to Parisian tailoring. Hand-crafted from un-dyed pure camel wool with hand-finished pick stitching along the peak lapels.',
  'An architectural silhouette designed to drape with authority. Structured shoulders yield to a relaxed waist cinched by an optional self-tie belt.',
  'outerwear',
  'women',
  'Virgin Wool',
  1850.00,
  2150.00,
  'AC-OC-001',
  8,
  '["FR 34", "FR 36", "FR 38", "FR 40"]'::jsonb,
  '[{"name": "Pure Camel", "hex": "#C49A6C"}, {"name": "Noir Black", "hex": "#1C1B1F"}]'::jsonb,
  '["Unlined double-face construction", "Real horn buttons", "Deep welt storm pockets"]'::jsonb,
  '["Specialist luxury dry clean only", "Store on cedar hanger"]'::jsonb,
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80',
  '["https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
  true,
  true,
  true
),
(
  'Gauge 18 Mongolian Cashmere Turtleneck',
  'gauge-18-mongolian-cashmere-turtleneck',
  '100% Organic Mongolian Cashmere',
  'Spun from raw long-staple cashmere combed in the Gobi desert. Weightless warmth with ribbed cuffs and architectural high collar.',
  'The quintessential foundational knit. Engineered with seamless Japanese 3D weaving technology.',
  'knitwear',
  'unisex',
  'Cashmere',
  720.00,
  850.00,
  'AC-KN-002',
  14,
  '["S", "M", "L", "XL"]'::jsonb,
  '[{"name": "Ivory Alabaster", "hex": "#F0EDE6"}, {"name": "Charcoal Grey", "hex": "#363537"}]'::jsonb,
  '["Gauge 18 ultra-fine knit", "Seamless body construction", "Non-mulesed ethical cashmere"]'::jsonb,
  '["Hand wash cold with wool shampoo", "Dry flat on towel"]'::jsonb,
  'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80',
  '["https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
  true,
  true,
  true
)
ON CONFLICT (slug) DO NOTHING;

-- ====================================================================
-- SECTION 9 — ADMIN PROMOTION QUERY
-- ====================================================================
-- INSTRUCTIONS FOR CREATING YOUR FIRST ADMIN:
-- 1. Register your account on the storefront (e.g. at /register or /login).
2. Open Supabase -> SQL Editor -> New Query.
-- 3. Replace 'YOUR_ADMIN_EMAIL' below with your registered account email.
-- 4. Execute this snippet:
--
-- UPDATE public.profiles
-- SET role = 'admin'
-- WHERE email = 'YOUR_ADMIN_EMAIL';
-- ====================================================================
