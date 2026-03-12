-- =====================================================
-- FRIENDLY FARE SUPER MARKET — Supabase Database Setup
-- Run this in: Supabase Dashboard > SQL Editor > New Query
-- =====================================================

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  brand text,
  category text NOT NULL,
  description text,
  nutritional_info text,
  price numeric NOT NULL,
  mrp numeric NOT NULL,
  discount_pct numeric GENERATED ALWAYS AS (ROUND(((mrp - price) / mrp) * 100)) STORED,
  stock_qty integer NOT NULL DEFAULT 0,
  branch text NOT NULL DEFAULT 'Both' CHECK (branch IN ('Branch 1','Branch 2','Both')),
  is_featured boolean DEFAULT false,
  is_veg boolean DEFAULT true,
  is_active boolean DEFAULT true,
  is_ramzan_offer boolean DEFAULT false,
  ramzan_price numeric,
  tags text[] DEFAULT '{}',
  image_urls text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  branch text NOT NULL,
  delivery_address text,
  customer_lat numeric,
  customer_lng numeric,
  maps_link text,
  items jsonb NOT NULL DEFAULT '[]',
  subtotal numeric NOT NULL DEFAULT 0,
  grand_total numeric NOT NULL DEFAULT 0,
  payment_method text NOT NULL DEFAULT 'COD' CHECK (payment_method IN ('COD','UPI','Bank')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','packed','dispatched','delivered','cancelled')),
  delivery_boy text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 3. Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 4. Enable Row Level Security (but allow all for now via anon key)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow public to READ active products
CREATE POLICY "Public can read active products" ON products FOR SELECT USING (is_active = true);

-- Allow anyone to INSERT orders (customers placing orders)
CREATE POLICY "Anyone can place orders" ON orders FOR INSERT WITH CHECK (true);

-- Allow anyone to READ orders (admin needs this)
CREATE POLICY "Anyone can read orders" ON orders FOR SELECT USING (true);

-- Allow anyone to UPDATE orders (admin updating status)
CREATE POLICY "Anyone can update orders" ON orders FOR UPDATE USING (true);

-- Allow admin to do everything on products
CREATE POLICY "Admin full access to products" ON products FOR ALL USING (true);

-- 5. STORAGE BUCKET for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true)
ON CONFLICT DO NOTHING;

-- Allow public uploads and reads for product images
CREATE POLICY "Public can upload product images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images');
CREATE POLICY "Public can read product images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Public can delete product images" ON storage.objects FOR DELETE USING (bucket_id = 'product-images');

-- 6. SEED DATA — Sample products to get started
INSERT INTO products (name, brand, category, description, price, mrp, stock_qty, branch, is_featured, is_veg, is_active, is_ramzan_offer, tags) VALUES
('Fresh Bananas (1 Dozen)', 'Farm Fresh', 'Fruits & Vegetables', 'Farm-fresh bananas, perfectly ripe and sweet.', 45, 60, 100, 'Both', true, true, true, false, ARRAY['fresh','fruit']),
('Amul Taza Milk 1L', 'Amul', 'Dairy & Eggs', 'Fresh toned milk, pasteurized and homogenized.', 54, 58, 200, 'Both', true, true, true, false, ARRAY['dairy','milk']),
('India Gate Basmati Rice 5kg', 'India Gate', 'Rice & Grains', 'Premium aged basmati rice with extra-long grains.', 425, 520, 50, 'Both', true, true, true, false, ARRAY['rice','basmati']),
('MDH Biryani Masala 50g', 'MDH', 'Spices & Masala', 'Authentic Hyderabadi biryani masala blend.', 65, 75, 80, 'Both', true, true, true, false, ARRAY['spices','masala']),
('Premium Ajwa Dates 500g', 'Haramain', 'Dry Fruits & Nuts', 'Premium Ajwa dates imported from Madinah.', 399, 550, 40, 'Both', true, true, true, true, ARRAY['dates','ramzan']),
('Bambino Vermicelli 900g', 'Bambino', 'Rice & Grains', 'Golden-roasted vermicelli for Sheer Khurma.', 85, 110, 60, 'Both', false, true, true, true, ARRAY['vermicelli','ramzan']),
('Rooh Afza Rose Sharbat 750ml', 'Hamdard', 'Beverages', 'Iconic rose-flavoured drink concentrate.', 145, 180, 90, 'Both', true, true, true, true, ARRAY['sharbat','ramzan']),
('Britannia Bread 400g', 'Britannia', 'Bakery & Bread', 'Soft fresh white sandwich bread.', 42, 48, 120, 'Both', true, true, true, false, ARRAY['bread','bakery']);

-- Update ramzan prices
UPDATE products SET ramzan_price = 349 WHERE name = 'Premium Ajwa Dates 500g';
UPDATE products SET ramzan_price = 75 WHERE name = 'Bambino Vermicelli 900g';
UPDATE products SET ramzan_price = 125 WHERE name = 'Rooh Afza Rose Sharbat 750ml';

SELECT 'Setup complete! ' || COUNT(*) || ' products added.' as result FROM products;
