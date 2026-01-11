-- PostgreSQL Data Insertion Script for Timeless E-commerce
-- This script populates the database with initial data from the JSON structure

-- Insert Categories
INSERT INTO categories (id, name, slug, description, is_active) VALUES
    (uuid_generate_v4(), 'Casual', 'casual', 'Comfortable and stylish pieces for daily wear', true),
    (uuid_generate_v4(), 'Winter', 'winter', 'Warm clothing and accessories for cold weather', true),
    (uuid_generate_v4(), 'Formal', 'formal', 'Sophisticated clothing for business and special occasions', true),
    (uuid_generate_v4(), 'Accessories', 'accessories', 'Fashion accessories to complement any outfit', true),
    (uuid_generate_v4(), 'Summer', 'summer', 'Light and breathable clothing for warm weather', true),
    (uuid_generate_v4(), 'Street Style', 'street-style', 'Urban-inspired fashion for modern city life', true),
    (uuid_generate_v4(), 'Vietnamese Style', 'vietnamese-style', 'Traditional and modern Vietnamese fashion', true);

-- Insert Brands
INSERT INTO brands (id, name, slug, is_active) VALUES
    (uuid_generate_v4(), 'Timeless', 'timeless', true),
    (uuid_generate_v4(), 'Heritage', 'heritage', true),
    (uuid_generate_v4(), 'Aurum Tailoring', 'aurum', true),
    (uuid_generate_v4(), 'Aurum Timepieces', 'aurum-time', true),
    (uuid_generate_v4(), 'Coastal', 'coastal', true),
    (uuid_generate_v4(), 'Urban Edge', 'urban-edge', true),
    (uuid_generate_v4(), 'Saigon Heritage', 'saigon-heritage', true),
    (uuid_generate_v4(), 'Craftsmen Co.', 'craftsmen', true),
    (uuid_generate_v4(), 'Professional', 'professional', true),
    (uuid_generate_v4(), 'Nordic', 'nordic', true),
    (uuid_generate_v4(), 'Executive', 'executive', true),
    (uuid_generate_v4(), 'Vintage Co.', 'vintage-co', true),
    (uuid_generate_v4(), 'Bloom', 'bloom', true),
    (uuid_generate_v4(), 'Metro', 'metro', true),
    (uuid_generate_v4(), 'Gentleman', 'gentleman', true),
    (uuid_generate_v4(), 'EcoWear', 'ecowear', true),
    (uuid_generate_v4(), 'Huế Crafts', 'hue-crafts', true),
    (uuid_generate_v4(), 'Arctic Pro', 'arctic-pro', true),
    (uuid_generate_v4(), 'Denim Dreams', 'denim-dreams', true),
    (uuid_generate_v4(), 'Future Gear', 'future-gear', true);

-- Insert Colors
INSERT INTO colors (id, name, hex) VALUES
    (uuid_generate_v4(), 'White', '#FFFFFF'),
    (uuid_generate_v4(), 'Black', '#000000'),
    (uuid_generate_v4(), 'Navy', '#1F3A93'),
    (uuid_generate_v4(), 'Olive', '#556B2F'),
    (uuid_generate_v4(), 'Charcoal', '#333333'),
    (uuid_generate_v4(), 'Silver', '#C0C0C0'),
    (uuid_generate_v4(), 'Gold', '#D4AF37'),
    (uuid_generate_v4(), 'Light Blue', '#ADD8E6'),
    (uuid_generate_v4(), 'Cream', '#F5F5DC'),
    (uuid_generate_v4(), 'Sage Green', '#9CAF88'),
    (uuid_generate_v4(), 'Khaki', '#C3B091'),
    (uuid_generate_v4(), 'Olive Drab', '#6B8E23'),
    (uuid_generate_v4(), 'Lotus Pink', '#FFB6C1'),
    (uuid_generate_v4(), 'Royal Blue', '#4169E1'),
    (uuid_generate_v4(), 'Ivory', '#FFFFF0'),
    (uuid_generate_v4(), 'Tan', '#D2B48C'),
    (uuid_generate_v4(), 'Dark Brown', '#654321'),
    (uuid_generate_v4(), 'Grey', '#808080'),
    (uuid_generate_v4(), 'Burgundy', '#800020'),
    (uuid_generate_v4(), 'Camel', '#C19A6B'),
    (uuid_generate_v4(), 'Coral Pink', '#FF7F7F'),
    (uuid_generate_v4(), 'Sky Blue', '#87CEEB'),
    (uuid_generate_v4(), 'Mint Green', '#98FB98'),
    (uuid_generate_v4(), 'Dark Blue', '#00008B'),
    (uuid_generate_v4(), 'Forest Green', '#228B22'),
    (uuid_generate_v4(), 'Natural', '#F5E6D3');

-- Insert Sizes
INSERT INTO sizes (id, name, value, category) VALUES
    (uuid_generate_v4(), 'Extra Small', 'XS', 'clothing'),
    (uuid_generate_v4(), 'Small', 'S', 'clothing'),
    (uuid_generate_v4(), 'Medium', 'M', 'clothing'),
    (uuid_generate_v4(), 'Large', 'L', 'clothing'),
    (uuid_generate_v4(), 'Extra Large', 'XL', 'clothing'),
    (uuid_generate_v4(), 'XXL', 'XXL', 'clothing'),
    (uuid_generate_v4(), '38R', '38R', 'clothing'),
    (uuid_generate_v4(), '40R', '40R', 'clothing'),
    (uuid_generate_v4(), '42R', '42R', 'clothing'),
    (uuid_generate_v4(), '36R', '36R', 'clothing'),
    (uuid_generate_v4(), '28', '28', 'clothing'),
    (uuid_generate_v4(), '30', '30', 'clothing'),
    (uuid_generate_v4(), '32', '32', 'clothing'),
    (uuid_generate_v4(), '34', '34', 'clothing'),
    (uuid_generate_v4(), '25', '25', 'clothing'),
    (uuid_generate_v4(), '26', '26', 'clothing'),
    (uuid_generate_v4(), '27', '27', 'clothing'),
    (uuid_generate_v4(), '29', '29', 'clothing'),
    (uuid_generate_v4(), '14.5', '14.5', 'clothing'),
    (uuid_generate_v4(), '15', '15', 'clothing'),
    (uuid_generate_v4(), '15.5', '15.5', 'clothing'),
    (uuid_generate_v4(), '16', '16', 'clothing'),
    (uuid_generate_v4(), '7', '7', 'shoes'),
    (uuid_generate_v4(), '8', '8', 'shoes'),
    (uuid_generate_v4(), '9', '9', 'shoes'),
    (uuid_generate_v4(), '10', '10', 'shoes'),
    (uuid_generate_v4(), '11', '11', 'shoes'),
    (uuid_generate_v4(), 'Small', 'S', 'accessories'),
    (uuid_generate_v4(), 'Medium', 'M', 'accessories'),
    (uuid_generate_v4(), 'Large', 'L', 'accessories');

-- Insert Materials
INSERT INTO materials (id, name, description, properties) VALUES
    (uuid_generate_v4(), '100% Cotton', 'Pure cotton fabric', '["Breathable", "Soft", "Natural"]'),
    (uuid_generate_v4(), 'Polyester Shell', 'Synthetic outer material', '["Water-resistant", "Durable", "Lightweight"]'),
    (uuid_generate_v4(), 'Synthetic Insulation', 'Artificial insulating material', '["Warm", "Lightweight", "Quick-dry"]'),
    (uuid_generate_v4(), 'Wool Blend', 'Mixed wool fabric', '["Breathable", "Wrinkle-resistant", "Warm"]'),
    (uuid_generate_v4(), 'Stainless Steel', 'Corrosion-resistant metal', '["Durable", "Corrosion-resistant", "Premium"]'),
    (uuid_generate_v4(), 'Leather Strap', 'Genuine leather', '["Comfortable", "Premium", "Durable"]'),
    (uuid_generate_v4(), '100% Linen', 'Natural linen fiber', '["Breathable", "Natural", "Lightweight"]'),
    (uuid_generate_v4(), 'Cotton Canvas', 'Heavy cotton fabric', '["Durable", "Comfortable", "Structured"]'),
    (uuid_generate_v4(), 'Silk Blend', 'Mixed silk fabric', '["Luxurious", "Breathable", "Elegant"]'),
    (uuid_generate_v4(), 'Full Grain Leather', 'Premium leather', '["Durable", "Ages beautifully", "Natural"]'),
    (uuid_generate_v4(), 'Cotton Blend', 'Mixed cotton fabric', '["Wrinkle-resistant", "Comfortable", "Structured"]'),
    (uuid_generate_v4(), 'Cashmere Wool Blend', 'Luxury wool mix', '["Soft", "Warm", "Lightweight"]'),
    (uuid_generate_v4(), 'Egyptian Cotton', 'Premium cotton variety', '["Breathable", "Wrinkle-resistant", "Premium"]'),
    (uuid_generate_v4(), '100% Cotton Denim', 'Traditional denim fabric', '["Durable", "Classic", "Comfortable"]'),
    (uuid_generate_v4(), 'Cotton Voile', 'Lightweight cotton fabric', '["Lightweight", "Breathable", "Soft"]'),
    (uuid_generate_v4(), 'Synthetic Leather', 'Artificial leather', '["Durable", "Easy to clean", "Comfortable"]'),
    (uuid_generate_v4(), 'Rubber Sole', 'Synthetic rubber', '["Non-slip", "Shock-absorbing", "Flexible"]'),
    (uuid_generate_v4(), '100% Silk', 'Pure silk fabric', '["Luxurious", "Smooth", "Elegant"]'),
    (uuid_generate_v4(), 'Bamboo Fiber', 'Eco-friendly fiber', '["Antibacterial", "Moisture-wicking", "Eco-friendly"]'),
    (uuid_generate_v4(), 'Palm Leaves', 'Natural palm material', '["Natural", "Lightweight", "Sun protection"]'),
    (uuid_generate_v4(), 'Merino Wool Blend', 'Premium wool mix', '["Insulating", "Moisture-wicking", "Odor-resistant"]'),
    (uuid_generate_v4(), 'Stretch Denim', 'Flexible denim fabric', '["Flexible", "Comfortable", "Durable"]'),
    (uuid_generate_v4(), 'Technical Nylon', 'High-performance synthetic', '["Water-resistant", "Lightweight", "Durable"]');

-- Insert Vendors (simplified with basic address data)
INSERT INTO vendors (id, name, slug, email, rating, review_count, total_products, total_sales, is_verified, is_active, commission) VALUES
    (uuid_generate_v4(), 'Timeless', 'timeless', 'vendor@timeless.com', 4.8, 1250, 50, 10000, true, true, 15),
    (uuid_generate_v4(), 'Heritage Goods', 'heritage-goods', 'sales@heritage.com', 4.7, 640, 120, 54000, true, true, 12),
    (uuid_generate_v4(), 'Aurum Collective', 'aurum-collective', 'hello@aurum.com', 4.9, 310, 85, 32000, true, true, 10),
    (uuid_generate_v4(), 'Aurum Watches', 'aurum-watches', 'support@aurumwatches.com', 4.6, 980, 210, 150000, true, true, 14),
    (uuid_generate_v4(), 'Coastal Apparel', 'coastal-apparel', 'info@coastal.com', 4.5, 420, 80, 25000, true, true, 12),
    (uuid_generate_v4(), 'Urban Edge Co.', 'urban-edge-co', 'sales@urbanedge.com', 4.4, 380, 95, 18000, true, true, 15),
    (uuid_generate_v4(), 'Saigon Heritage', 'saigon-heritage', 'orders@saigonheritage.vn', 4.8, 230, 45, 35000, true, true, 8),
    (uuid_generate_v4(), 'Craftsmen Co.', 'craftsmen-co', 'info@craftsmenco.com', 4.6, 512, 65, 42000, true, true, 18),
    (uuid_generate_v4(), 'Professional Wear', 'professional-wear', 'support@professionalwear.com', 4.5, 890, 120, 67000, true, true, 16),
    (uuid_generate_v4(), 'Nordic Textiles', 'nordic-textiles', 'contact@nordictextiles.com', 4.7, 654, 88, 38000, true, true, 14);

-- Insert Collections
INSERT INTO collections (id, name, description, slug, image, is_active) VALUES
    (uuid_generate_v4(), 'Casual Everyday', 'Comfortable and stylish pieces for daily wear. From basic tees to versatile jeans, everything you need for a relaxed yet put-together look.', 'casual-everyday', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop', true),
    (uuid_generate_v4(), 'Formal Excellence', 'Sophisticated formal wear for business meetings, special occasions, and professional events. Tailored to perfection.', 'formal-excellence', 'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=800&auto=format&fit=crop', true),
    (uuid_generate_v4(), 'Premium Accessories', 'Luxury accessories that elevate any outfit. From timepieces to leather goods, discover pieces that make a statement.', 'premium-accessories', 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&auto=format&fit=crop', true),
    (uuid_generate_v4(), 'Winter Warmth', 'Stay warm and stylish during the colder months. Our winter collection features cozy layers and weather-resistant outerwear.', 'winter-warmth', 'https://images.unsplash.com/photo-1706765779494-2705542ebe74?w=800&auto=format&fit=crop', true),
    (uuid_generate_v4(), 'Street Style Culture', 'Urban-inspired fashion for the modern city dweller. Bold designs, functional details, and contemporary aesthetics.', 'street-style-culture', 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&auto=format&fit=crop', true),
    (uuid_generate_v4(), 'Summer Breeze', 'Light, breathable pieces perfect for warm weather. From flowing dresses to linen shirts, embrace the sunshine in style.', 'summer-breeze', 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop', true),
    (uuid_generate_v4(), 'Vietnamese Heritage', 'Celebrate Vietnamese culture with our traditional and modern interpretations of classic Vietnamese fashion. Timeless elegance meets contemporary comfort.', 'vietnamese-heritage', 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&auto=format&fit=crop', true);

-- Note: This is a simplified seed script. For production, you would need to:
-- 1. Insert all products with proper foreign key relationships
-- 2. Insert product images, sizes, colors, and materials relationships
-- 3. Set up proper vendor addresses
-- 4. Create junction table entries for product_sizes, product_colors, etc.
-- 5. Set up collection_products relationships

-- Example of how to insert a complete product (you would repeat this for all 20 products):
/*
-- Get the UUIDs for related entities first
WITH 
    casual_cat AS (SELECT id FROM categories WHERE slug = 'casual' LIMIT 1),
    timeless_brand AS (SELECT id FROM brands WHERE slug = 'timeless' LIMIT 1),
    timeless_vendor AS (SELECT id FROM vendors WHERE slug = 'timeless' LIMIT 1)
INSERT INTO products (
    id, name, description, price, original_price, 
    category_id, brand_id, vendor_id,
    care, features, stock, is_on_sale, sale_percentage,
    rating, review_count, sku, tags, is_active
) 
SELECT 
    uuid_generate_v4(),
    'Essential Cotton T-Shirt',
    'Premium cotton t-shirt with minimalist design',
    29.99,
    39.99,
    casual_cat.id,
    timeless_brand.id,
    timeless_vendor.id,
    '["Machine wash cold", "Tumble dry low"]',
    '["Pre-shrunk", "Side-seamed"]',
    50,
    true,
    25,
    4.5,
    128,
    'TS-001',
    '["essential", "cotton", "basic", "casual"]',
    true
FROM casual_cat, timeless_brand, timeless_vendor;
*/