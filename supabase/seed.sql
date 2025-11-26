-- BTL Products Seed Data
-- Products: Legacy, Eternal, Monolith
-- Sizes: XXS, XS, S, M, L, XL, XXL

-- ============================================================================
-- LEGACY PRODUCT
-- ============================================================================
INSERT INTO products (id, name, description, base_price, images, category, tags, featured, created_at, updated_at)
VALUES (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Legacy Tee',
    'The Legacy Tee - a timeless essential crafted with premium materials and exceptional attention to detail.',
    220.00,
    ARRAY['/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground19.jpg'],
    'Essentials',
    ARRAY['tshirt', 'legacy', 'premium'],
    true,
    NOW(),
    NOW()
) ON CONFLICT (id) DO NOTHING;

-- Legacy - Raven (Black)
INSERT INTO product_variants (product_id, size, color, sku, price, inventory, images)
VALUES
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XXS', 'Raven', 'LEG-RVN-XXS', 220.00, 10, ARRAY['/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground19.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground20.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground21.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XS', 'Raven', 'LEG-RVN-XS', 220.00, 15, ARRAY['/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground19.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground20.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground21.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'S', 'Raven', 'LEG-RVN-S', 220.00, 25, ARRAY['/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground19.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground20.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground21.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'M', 'Raven', 'LEG-RVN-M', 220.00, 30, ARRAY['/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground19.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground20.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground21.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'L', 'Raven', 'LEG-RVN-L', 220.00, 30, ARRAY['/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground19.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground20.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground21.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XL', 'Raven', 'LEG-RVN-XL', 220.00, 20, ARRAY['/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground19.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground20.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground21.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XXL', 'Raven', 'LEG-RVN-XXL', 220.00, 15, ARRAY['/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground19.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground20.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground21.jpg'])
ON CONFLICT (sku) DO NOTHING;

-- Legacy - Alabaster (White)
INSERT INTO product_variants (product_id, size, color, sku, price, inventory, images)
VALUES
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XXS', 'Alabaster', 'LEG-ALB-XXS', 220.00, 10, ARRAY['/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground15.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground16.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground17.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground18.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XS', 'Alabaster', 'LEG-ALB-XS', 220.00, 15, ARRAY['/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground15.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground16.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground17.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground18.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'S', 'Alabaster', 'LEG-ALB-S', 220.00, 25, ARRAY['/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground15.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground16.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground17.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground18.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'M', 'Alabaster', 'LEG-ALB-M', 220.00, 30, ARRAY['/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground15.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground16.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground17.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground18.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'L', 'Alabaster', 'LEG-ALB-L', 220.00, 30, ARRAY['/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground15.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground16.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground17.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground18.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XL', 'Alabaster', 'LEG-ALB-XL', 220.00, 20, ARRAY['/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground15.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground16.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground17.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground18.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XXL', 'Alabaster', 'LEG-ALB-XXL', 220.00, 15, ARRAY['/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground15.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground16.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground17.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground18.jpg'])
ON CONFLICT (sku) DO NOTHING;

-- Legacy - Stone (Light Grey)
INSERT INTO product_variants (product_id, size, color, sku, price, inventory, images)
VALUES
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XXS', 'Stone', 'LEG-STN-XXS', 220.00, 10, ARRAY['/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground39.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground40.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground41.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground42.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XS', 'Stone', 'LEG-STN-XS', 220.00, 15, ARRAY['/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground39.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground40.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground41.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground42.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'S', 'Stone', 'LEG-STN-S', 220.00, 25, ARRAY['/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground39.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground40.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground41.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground42.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'M', 'Stone', 'LEG-STN-M', 220.00, 30, ARRAY['/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground39.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground40.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground41.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground42.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'L', 'Stone', 'LEG-STN-L', 220.00, 30, ARRAY['/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground39.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground40.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground41.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground42.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XL', 'Stone', 'LEG-STN-XL', 220.00, 20, ARRAY['/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground39.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground40.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground41.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground42.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XXL', 'Stone', 'LEG-STN-XXL', 220.00, 15, ARRAY['/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground39.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground40.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground41.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground42.jpg'])
ON CONFLICT (sku) DO NOTHING;

-- Legacy - Champagne (Beige)
INSERT INTO product_variants (product_id, size, color, sku, price, inventory, images)
VALUES
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XXS', 'Champagne', 'LEG-CHP-XXS', 220.00, 10, ARRAY['/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground9.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground10.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackgroundtu3.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackgroundtu4.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XS', 'Champagne', 'LEG-CHP-XS', 220.00, 15, ARRAY['/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground9.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground10.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackgroundtu3.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackgroundtu4.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'S', 'Champagne', 'LEG-CHP-S', 220.00, 25, ARRAY['/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground9.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground10.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackgroundtu3.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackgroundtu4.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'M', 'Champagne', 'LEG-CHP-M', 220.00, 30, ARRAY['/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground9.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground10.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackgroundtu3.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackgroundtu4.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'L', 'Champagne', 'LEG-CHP-L', 220.00, 30, ARRAY['/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground9.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground10.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackgroundtu3.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackgroundtu4.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XL', 'Champagne', 'LEG-CHP-XL', 220.00, 20, ARRAY['/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground9.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground10.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackgroundtu3.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackgroundtu4.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XXL', 'Champagne', 'LEG-CHP-XXL', 220.00, 15, ARRAY['/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground9.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground10.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackgroundtu3.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackgroundtu4.jpg'])
ON CONFLICT (sku) DO NOTHING;

-- ============================================================================
-- ETERNAL PRODUCT
-- ============================================================================
INSERT INTO products (id, name, description, base_price, images, category, tags, featured, created_at, updated_at)
VALUES (
    'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    'Eternal Tee',
    'The Eternal Tee - designed to transcend trends with enduring quality and refined aesthetics.',
    220.00,
    ARRAY['/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground22.jpg'],
    'Essentials',
    ARRAY['tshirt', 'eternal', 'premium'],
    true,
    NOW(),
    NOW()
) ON CONFLICT (id) DO NOTHING;

-- Eternal - Raven (Black)
INSERT INTO product_variants (product_id, size, color, sku, price, inventory, images)
VALUES
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XXS', 'Raven', 'ETN-RVN-XXS', 220.00, 10, ARRAY['/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground22.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground23.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground24.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground25.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground26.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XS', 'Raven', 'ETN-RVN-XS', 220.00, 15, ARRAY['/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground22.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground23.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground24.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground25.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground26.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'S', 'Raven', 'ETN-RVN-S', 220.00, 25, ARRAY['/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground22.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground23.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground24.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground25.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground26.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'M', 'Raven', 'ETN-RVN-M', 220.00, 30, ARRAY['/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground22.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground23.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground24.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground25.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground26.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'L', 'Raven', 'ETN-RVN-L', 220.00, 30, ARRAY['/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground22.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground23.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground24.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground25.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground26.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XL', 'Raven', 'ETN-RVN-XL', 220.00, 20, ARRAY['/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground22.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground23.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground24.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground25.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground26.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XXL', 'Raven', 'ETN-RVN-XXL', 220.00, 15, ARRAY['/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground22.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground23.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground24.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground25.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground26.jpg'])
ON CONFLICT (sku) DO NOTHING;

-- Eternal - Alabaster (White)
INSERT INTO product_variants (product_id, size, color, sku, price, inventory, images)
VALUES
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XXS', 'Alabaster', 'ETN-ALB-XXS', 220.00, 10, ARRAY['/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground27.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground28.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground29.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground30.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XS', 'Alabaster', 'ETN-ALB-XS', 220.00, 15, ARRAY['/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground27.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground28.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground29.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground30.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'S', 'Alabaster', 'ETN-ALB-S', 220.00, 25, ARRAY['/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground27.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground28.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground29.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground30.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'M', 'Alabaster', 'ETN-ALB-M', 220.00, 30, ARRAY['/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground27.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground28.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground29.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground30.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'L', 'Alabaster', 'ETN-ALB-L', 220.00, 30, ARRAY['/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground27.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground28.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground29.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground30.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XL', 'Alabaster', 'ETN-ALB-XL', 220.00, 20, ARRAY['/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground27.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground28.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground29.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground30.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XXL', 'Alabaster', 'ETN-ALB-XXL', 220.00, 15, ARRAY['/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground27.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground28.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground29.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground30.jpg'])
ON CONFLICT (sku) DO NOTHING;

-- Eternal - Royal (Light Blue)
INSERT INTO product_variants (product_id, size, color, sku, price, inventory, images)
VALUES
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XXS', 'Royal', 'ETN-RYL-XXS', 220.00, 10, ARRAY['/Photos/Products/Eternal/RYL/BTLFlatlayBlackBackground31.jpg', '/Photos/Products/Eternal/RYL/BTLFlatlayBlackBackground32.jpg', '/Photos/Products/Eternal/RYL/BTLFlatlayBlackBackground33.jpg', '/Photos/Products/Eternal/RYL/BTLFlatlayBlackBackground34.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XS', 'Royal', 'ETN-RYL-XS', 220.00, 15, ARRAY['/Photos/Products/Eternal/RYL/BTLFlatlayBlackBackground31.jpg', '/Photos/Products/Eternal/RYL/BTLFlatlayBlackBackground32.jpg', '/Photos/Products/Eternal/RYL/BTLFlatlayBlackBackground33.jpg', '/Photos/Products/Eternal/RYL/BTLFlatlayBlackBackground34.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'S', 'Royal', 'ETN-RYL-S', 220.00, 25, ARRAY['/Photos/Products/Eternal/RYL/BTLFlatlayBlackBackground31.jpg', '/Photos/Products/Eternal/RYL/BTLFlatlayBlackBackground32.jpg', '/Photos/Products/Eternal/RYL/BTLFlatlayBlackBackground33.jpg', '/Photos/Products/Eternal/RYL/BTLFlatlayBlackBackground34.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'M', 'Royal', 'ETN-RYL-M', 220.00, 30, ARRAY['/Photos/Products/Eternal/RYL/BTLFlatlayBlackBackground31.jpg', '/Photos/Products/Eternal/RYL/BTLFlatlayBlackBackground32.jpg', '/Photos/Products/Eternal/RYL/BTLFlatlayBlackBackground33.jpg', '/Photos/Products/Eternal/RYL/BTLFlatlayBlackBackground34.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'L', 'Royal', 'ETN-RYL-L', 220.00, 30, ARRAY['/Photos/Products/Eternal/RYL/BTLFlatlayBlackBackground31.jpg', '/Photos/Products/Eternal/RYL/BTLFlatlayBlackBackground32.jpg', '/Photos/Products/Eternal/RYL/BTLFlatlayBlackBackground33.jpg', '/Photos/Products/Eternal/RYL/BTLFlatlayBlackBackground34.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XL', 'Royal', 'ETN-RYL-XL', 220.00, 20, ARRAY['/Photos/Products/Eternal/RYL/BTLFlatlayBlackBackground31.jpg', '/Photos/Products/Eternal/RYL/BTLFlatlayBlackBackground32.jpg', '/Photos/Products/Eternal/RYL/BTLFlatlayBlackBackground33.jpg', '/Photos/Products/Eternal/RYL/BTLFlatlayBlackBackground34.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XXL', 'Royal', 'ETN-RYL-XXL', 220.00, 15, ARRAY['/Photos/Products/Eternal/RYL/BTLFlatlayBlackBackground31.jpg', '/Photos/Products/Eternal/RYL/BTLFlatlayBlackBackground32.jpg', '/Photos/Products/Eternal/RYL/BTLFlatlayBlackBackground33.jpg', '/Photos/Products/Eternal/RYL/BTLFlatlayBlackBackground34.jpg'])
ON CONFLICT (sku) DO NOTHING;

-- Eternal - Ivory (Cream)
INSERT INTO product_variants (product_id, size, color, sku, price, inventory, images)
VALUES
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XXS', 'Ivory', 'ETN-IVR-XXS', 220.00, 10, ARRAY['/Photos/Products/Eternal/IVR/BTLFlatlayBlackBackground35.jpg', '/Photos/Products/Eternal/IVR/BTLFlatlayBlackBackground36.jpg', '/Photos/Products/Eternal/IVR/BTLFlatlayBlackBackground37.jpg', '/Photos/Products/Eternal/IVR/BTLFlatlayBlackBackground38.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XS', 'Ivory', 'ETN-IVR-XS', 220.00, 15, ARRAY['/Photos/Products/Eternal/IVR/BTLFlatlayBlackBackground35.jpg', '/Photos/Products/Eternal/IVR/BTLFlatlayBlackBackground36.jpg', '/Photos/Products/Eternal/IVR/BTLFlatlayBlackBackground37.jpg', '/Photos/Products/Eternal/IVR/BTLFlatlayBlackBackground38.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'S', 'Ivory', 'ETN-IVR-S', 220.00, 25, ARRAY['/Photos/Products/Eternal/IVR/BTLFlatlayBlackBackground35.jpg', '/Photos/Products/Eternal/IVR/BTLFlatlayBlackBackground36.jpg', '/Photos/Products/Eternal/IVR/BTLFlatlayBlackBackground37.jpg', '/Photos/Products/Eternal/IVR/BTLFlatlayBlackBackground38.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'M', 'Ivory', 'ETN-IVR-M', 220.00, 30, ARRAY['/Photos/Products/Eternal/IVR/BTLFlatlayBlackBackground35.jpg', '/Photos/Products/Eternal/IVR/BTLFlatlayBlackBackground36.jpg', '/Photos/Products/Eternal/IVR/BTLFlatlayBlackBackground37.jpg', '/Photos/Products/Eternal/IVR/BTLFlatlayBlackBackground38.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'L', 'Ivory', 'ETN-IVR-L', 220.00, 30, ARRAY['/Photos/Products/Eternal/IVR/BTLFlatlayBlackBackground35.jpg', '/Photos/Products/Eternal/IVR/BTLFlatlayBlackBackground36.jpg', '/Photos/Products/Eternal/IVR/BTLFlatlayBlackBackground37.jpg', '/Photos/Products/Eternal/IVR/BTLFlatlayBlackBackground38.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XL', 'Ivory', 'ETN-IVR-XL', 220.00, 20, ARRAY['/Photos/Products/Eternal/IVR/BTLFlatlayBlackBackground35.jpg', '/Photos/Products/Eternal/IVR/BTLFlatlayBlackBackground36.jpg', '/Photos/Products/Eternal/IVR/BTLFlatlayBlackBackground37.jpg', '/Photos/Products/Eternal/IVR/BTLFlatlayBlackBackground38.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XXL', 'Ivory', 'ETN-IVR-XXL', 220.00, 15, ARRAY['/Photos/Products/Eternal/IVR/BTLFlatlayBlackBackground35.jpg', '/Photos/Products/Eternal/IVR/BTLFlatlayBlackBackground36.jpg', '/Photos/Products/Eternal/IVR/BTLFlatlayBlackBackground37.jpg', '/Photos/Products/Eternal/IVR/BTLFlatlayBlackBackground38.jpg'])
ON CONFLICT (sku) DO NOTHING;

-- ============================================================================
-- MONOLITH PRODUCT
-- ============================================================================
INSERT INTO products (id, name, description, base_price, images, category, tags, featured, created_at, updated_at)
VALUES (
    'c3d4e5f6-a7b8-9012-cdef-123456789012',
    'Monolith Tee',
    'The Monolith Tee - bold, iconic, and built to make a statement with uncompromising quality.',
    220.00,
    ARRAY['/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground43.jpg'],
    'Essentials',
    ARRAY['tshirt', 'monolith', 'premium'],
    true,
    NOW(),
    NOW()
) ON CONFLICT (id) DO NOTHING;

-- Monolith - Raven (Black)
INSERT INTO product_variants (product_id, size, color, sku, price, inventory, images)
VALUES
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XXS', 'Raven', 'MNO-RVN-XXS', 220.00, 10, ARRAY['/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground43.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground44.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground45.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground46.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XS', 'Raven', 'MNO-RVN-XS', 220.00, 15, ARRAY['/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground43.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground44.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground45.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground46.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'S', 'Raven', 'MNO-RVN-S', 220.00, 25, ARRAY['/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground43.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground44.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground45.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground46.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'M', 'Raven', 'MNO-RVN-M', 220.00, 30, ARRAY['/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground43.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground44.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground45.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground46.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'L', 'Raven', 'MNO-RVN-L', 220.00, 30, ARRAY['/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground43.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground44.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground45.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground46.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XL', 'Raven', 'MNO-RVN-XL', 220.00, 20, ARRAY['/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground43.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground44.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground45.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground46.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XXL', 'Raven', 'MNO-RVN-XXL', 220.00, 15, ARRAY['/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground43.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground44.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground45.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground46.jpg'])
ON CONFLICT (sku) DO NOTHING;

-- Monolith - Alabaster (White)
INSERT INTO product_variants (product_id, size, color, sku, price, inventory, images)
VALUES
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XXS', 'Alabaster', 'MNO-ALB-XXS', 220.00, 10, ARRAY['/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground11.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground12.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground13.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground14.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XS', 'Alabaster', 'MNO-ALB-XS', 220.00, 15, ARRAY['/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground11.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground12.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground13.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground14.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'S', 'Alabaster', 'MNO-ALB-S', 220.00, 25, ARRAY['/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground11.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground12.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground13.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground14.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'M', 'Alabaster', 'MNO-ALB-M', 220.00, 30, ARRAY['/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground11.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground12.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground13.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground14.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'L', 'Alabaster', 'MNO-ALB-L', 220.00, 30, ARRAY['/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground11.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground12.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground13.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground14.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XL', 'Alabaster', 'MNO-ALB-XL', 220.00, 20, ARRAY['/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground11.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground12.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground13.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground14.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XXL', 'Alabaster', 'MNO-ALB-XXL', 220.00, 15, ARRAY['/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground11.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground12.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground13.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground14.jpg'])
ON CONFLICT (sku) DO NOTHING;

-- Monolith - Chocolate (Brown)
INSERT INTO product_variants (product_id, size, color, sku, price, inventory, images)
VALUES
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XXS', 'Chocolate', 'MNO-CHC-XXS', 220.00, 10, ARRAY['/Photos/Products/Monolith/CHC/BTLFlatlayBlackBackground5.jpg', '/Photos/Products/Monolith/CHC/BTLFlatlayBlackBackgroundtu1.jpg', '/Photos/Products/Monolith/CHC/BTLFlatlayBlackBackgroundtu2.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XS', 'Chocolate', 'MNO-CHC-XS', 220.00, 15, ARRAY['/Photos/Products/Monolith/CHC/BTLFlatlayBlackBackground5.jpg', '/Photos/Products/Monolith/CHC/BTLFlatlayBlackBackgroundtu1.jpg', '/Photos/Products/Monolith/CHC/BTLFlatlayBlackBackgroundtu2.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'S', 'Chocolate', 'MNO-CHC-S', 220.00, 25, ARRAY['/Photos/Products/Monolith/CHC/BTLFlatlayBlackBackground5.jpg', '/Photos/Products/Monolith/CHC/BTLFlatlayBlackBackgroundtu1.jpg', '/Photos/Products/Monolith/CHC/BTLFlatlayBlackBackgroundtu2.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'M', 'Chocolate', 'MNO-CHC-M', 220.00, 30, ARRAY['/Photos/Products/Monolith/CHC/BTLFlatlayBlackBackground5.jpg', '/Photos/Products/Monolith/CHC/BTLFlatlayBlackBackgroundtu1.jpg', '/Photos/Products/Monolith/CHC/BTLFlatlayBlackBackgroundtu2.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'L', 'Chocolate', 'MNO-CHC-L', 220.00, 30, ARRAY['/Photos/Products/Monolith/CHC/BTLFlatlayBlackBackground5.jpg', '/Photos/Products/Monolith/CHC/BTLFlatlayBlackBackgroundtu1.jpg', '/Photos/Products/Monolith/CHC/BTLFlatlayBlackBackgroundtu2.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XL', 'Chocolate', 'MNO-CHC-XL', 220.00, 20, ARRAY['/Photos/Products/Monolith/CHC/BTLFlatlayBlackBackground5.jpg', '/Photos/Products/Monolith/CHC/BTLFlatlayBlackBackgroundtu1.jpg', '/Photos/Products/Monolith/CHC/BTLFlatlayBlackBackgroundtu2.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XXL', 'Chocolate', 'MNO-CHC-XXL', 220.00, 15, ARRAY['/Photos/Products/Monolith/CHC/BTLFlatlayBlackBackground5.jpg', '/Photos/Products/Monolith/CHC/BTLFlatlayBlackBackgroundtu1.jpg', '/Photos/Products/Monolith/CHC/BTLFlatlayBlackBackgroundtu2.jpg'])
ON CONFLICT (sku) DO NOTHING;

-- Monolith - Admiral (Navy)
INSERT INTO product_variants (product_id, size, color, sku, price, inventory, images)
VALUES
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XXS', 'Admiral', 'MNO-ADM-XXS', 220.00, 10, ARRAY['/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground1.jpg', '/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground2.jpg', '/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground3.jpg', '/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground47.jpg', '/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground48.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XS', 'Admiral', 'MNO-ADM-XS', 220.00, 15, ARRAY['/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground1.jpg', '/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground2.jpg', '/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground3.jpg', '/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground47.jpg', '/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground48.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'S', 'Admiral', 'MNO-ADM-S', 220.00, 25, ARRAY['/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground1.jpg', '/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground2.jpg', '/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground3.jpg', '/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground47.jpg', '/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground48.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'M', 'Admiral', 'MNO-ADM-M', 220.00, 30, ARRAY['/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground1.jpg', '/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground2.jpg', '/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground3.jpg', '/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground47.jpg', '/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground48.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'L', 'Admiral', 'MNO-ADM-L', 220.00, 30, ARRAY['/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground1.jpg', '/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground2.jpg', '/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground3.jpg', '/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground47.jpg', '/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground48.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XL', 'Admiral', 'MNO-ADM-XL', 220.00, 20, ARRAY['/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground1.jpg', '/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground2.jpg', '/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground3.jpg', '/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground47.jpg', '/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground48.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XXL', 'Admiral', 'MNO-ADM-XXL', 220.00, 15, ARRAY['/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground1.jpg', '/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground2.jpg', '/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground3.jpg', '/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground47.jpg', '/Photos/Products/Monolith/ADM/BTLFlatlayBlackBackground48.jpg'])
ON CONFLICT (sku) DO NOTHING;
