
-- ============================================================================
-- LEGACY PRODUCT
-- ============================================================================
INSERT INTO products (id, name, description, base_price, images, category, tags, featured, created_at, updated_at)
VALUES (
           'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
           'Legacy Tee',
           'The Legacy Tee - a timeless essential crafted with premium materials and exceptional attention to detail.',
           200.00,
           ARRAY['/Photos/Products/Legacy/RVN/raven-main.jpg'],
           'Essentials',
           ARRAY['tshirt', 'legacy', 'premium'],
           true,
           NOW(),
           NOW()
       ) ON CONFLICT (id) DO NOTHING;

-- Legacy - Raven (Black)
INSERT INTO product_variants (product_id, size, color, sku, price, inventory, images)
VALUES
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XXS', 'Raven', 'LEG-RVN-XXS', 200.00,10, ARRAY['/Photos/Products/Legacy/RVN/raven-main.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground19.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground20.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground21.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XS', 'Raven', 'LEG-RVN-XS', 200.00,15, ARRAY['/Photos/Products/Legacy/RVN/raven-main.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground19.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground20.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground21.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'S', 'Raven', 'LEG-RVN-S', 200.00,25, ARRAY['/Photos/Products/Legacy/RVN/raven-main.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground19.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground20.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground21.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'M', 'Raven', 'LEG-RVN-M', 200.00,30, ARRAY['/Photos/Products/Legacy/RVN/raven-main.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground19.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground20.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground21.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'L', 'Raven', 'LEG-RVN-L', 200.00,30, ARRAY['/Photos/Products/Legacy/RVN/raven-main.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground19.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground20.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground21.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XL', 'Raven', 'LEG-RVN-XL', 200.00,20, ARRAY['/Photos/Products/Legacy/RVN/raven-main.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground19.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground20.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground21.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XXL', 'Raven', 'LEG-RVN-XXL', 200.00,15, ARRAY['/Photos/Products/Legacy/RVN/raven-main.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground19.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground20.jpg', '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground21.jpg'])
    ON CONFLICT (sku) DO NOTHING;

-- Legacy - Alabaster (White)
INSERT INTO product_variants (product_id, size, color, sku, price, inventory, images)
VALUES
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XXS', 'Alabaster', 'LEG-ALB-XXS', 200.00,10, ARRAY['/Photos/Products/Legacy/ALB/alabaster-main.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground15.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground16.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground17.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground18.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XS', 'Alabaster', 'LEG-ALB-XS', 200.00,15, ARRAY['/Photos/Products/Legacy/ALB/alabaster-main.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground15.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground16.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground17.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground18.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'S', 'Alabaster', 'LEG-ALB-S', 200.00,25, ARRAY['/Photos/Products/Legacy/ALB/alabaster-main.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground15.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground16.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground17.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground18.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'M', 'Alabaster', 'LEG-ALB-M', 200.00,30, ARRAY['/Photos/Products/Legacy/ALB/alabaster-main.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground15.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground16.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground17.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground18.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'L', 'Alabaster', 'LEG-ALB-L', 200.00,30, ARRAY['/Photos/Products/Legacy/ALB/alabaster-main.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground15.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground16.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground17.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground18.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XL', 'Alabaster', 'LEG-ALB-XL', 200.00,20, ARRAY['/Photos/Products/Legacy/ALB/alabaster-main.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground15.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground16.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground17.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground18.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XXL', 'Alabaster', 'LEG-ALB-XXL', 200.00,15, ARRAY['/Photos/Products/Legacy/ALB/alabaster-main.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground15.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground16.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground17.jpg', '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground18.jpg'])
    ON CONFLICT (sku) DO NOTHING;

-- Legacy - Stone (Light Grey)
INSERT INTO product_variants (product_id, size, color, sku, price, inventory, images)
VALUES
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XXS', 'Stone', 'LEG-CHP-XXS', 200.00,10, ARRAY['/Photos/Products/Legacy/CHP/stone-main.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground39.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground40.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground41.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground42.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XS', 'Stone', 'LEG-CHP-XS', 200.00,15, ARRAY['/Photos/Products/Legacy/CHP/stone-main.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground39.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground40.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground41.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground42.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'S', 'Stone', 'LEG-CHP-S', 200.00,25, ARRAY['/Photos/Products/Legacy/CHP/stone-main.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground39.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground40.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground41.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground42.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'M', 'Stone', 'LEG-CHP-M', 200.00,30, ARRAY['/Photos/Products/Legacy/CHP/stone-main.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground39.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground40.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground41.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground42.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'L', 'Stone', 'LEG-CHP-L', 200.00,30, ARRAY['/Photos/Products/Legacy/CHP/stone-main.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground39.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground40.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground41.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground42.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XL', 'Stone', 'LEG-CHP-XL', 200.00,20, ARRAY['/Photos/Products/Legacy/CHP/stone-main.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground39.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground40.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground41.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground42.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XXL', 'Stone', 'LEG-CHP-XXL', 200.00,15, ARRAY['/Photos/Products/Legacy/CHP/stone-main.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground39.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground40.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground41.jpg', '/Photos/Products/Legacy/CHP/BTLFlatlayBlackBackground42.jpg'])
    ON CONFLICT (sku) DO NOTHING;

-- Legacy - Champagne (Beige/Tan)
INSERT INTO product_variants (product_id, size, color, sku, price, inventory, images)
VALUES
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XXS', 'Champagne', 'LEG-STN-XXS', 200.00,10, ARRAY['/Photos/Products/Legacy/STN/stone-main.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground8.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground9.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackgrountu3.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground10.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XS', 'Champagne', 'LEG-STN-XS', 200.00,15, ARRAY['/Photos/Products/Legacy/STN/stone-main.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground8.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground9.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackgrountu3.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground10.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'S', 'Champagne', 'LEG-STN-S', 200.00,25, ARRAY['/Photos/Products/Legacy/STN/stone-main.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground8.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground9.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackgrountu3.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground10.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'M', 'Champagne', 'LEG-STN-M', 200.00,30, ARRAY['/Photos/Products/Legacy/STN/stone-main.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground8.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground9.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackgrountu3.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground10.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'L', 'Champagne', 'LEG-STN-L', 200.00,30, ARRAY['/Photos/Products/Legacy/STN/stone-main.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground8.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground9.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackgrountu3.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground10.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XL', 'Champagne', 'LEG-STN-XL', 200.00,20, ARRAY['/Photos/Products/Legacy/STN/stone-main.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground8.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground9.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackgrountu3.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground10.jpg']),
    ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'XXL', 'Champagne', 'LEG-STN-XXL', 200.00,15, ARRAY['/Photos/Products/Legacy/STN/stone-main.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground8.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground9.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackgrountu3.jpg', '/Photos/Products/Legacy/STN/BTLFlatlayBlackBackground10.jpg'])
    ON CONFLICT (sku) DO NOTHING;

-- ============================================================================
-- MONOLITH PRODUCT (was previously Eternal in old seed)
-- ============================================================================
INSERT INTO products (id, name, description, base_price, images, category, tags, featured, created_at, updated_at)
VALUES (
           'b2c3d4e5-f6a7-8901-bcde-f12345678901',
           'Monolith Tee',
           'The Monolith Tee - designed to transcend trends with enduring quality and refined aesthetics.',
           200.00,
           ARRAY['/Photos/Products/Monolith/RYL/royal-main.jpg'],
           'Essentials',
           ARRAY['tshirt', 'monolith', 'premium'],
           true,
           NOW(),
           NOW()
       ) ON CONFLICT (id) DO NOTHING;

-- Monolith - Royal (Light Blue)
INSERT INTO product_variants (product_id, size, color, sku, price, inventory, images)
VALUES
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XXS', 'Royal', 'MNO-RYL-XXS', 200.00,10, ARRAY['/Photos/Products/Monolith/RYL/royal-main.jpg', '/Photos/Products/Monolith/RYL/BTLFlatlayBlackBackground31.jpg', '/Photos/Products/Monolith/RYL/BTLFlatlayBlackBackground32.jpg', '/Photos/Products/Monolith/RYL/BTLFlatlayBlackBackground33.jpg', '/Photos/Products/Monolith/RYL/BTLFlatlayBlackBackground34.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XS', 'Royal', 'MNO-RYL-XS', 200.00,15, ARRAY['/Photos/Products/Monolith/RYL/royal-main.jpg', '/Photos/Products/Monolith/RYL/BTLFlatlayBlackBackground31.jpg', '/Photos/Products/Monolith/RYL/BTLFlatlayBlackBackground32.jpg', '/Photos/Products/Monolith/RYL/BTLFlatlayBlackBackground33.jpg', '/Photos/Products/Monolith/RYL/BTLFlatlayBlackBackground34.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'S', 'Royal', 'MNO-RYL-S', 200.00,25, ARRAY['/Photos/Products/Monolith/RYL/royal-main.jpg', '/Photos/Products/Monolith/RYL/BTLFlatlayBlackBackground31.jpg', '/Photos/Products/Monolith/RYL/BTLFlatlayBlackBackground32.jpg', '/Photos/Products/Monolith/RYL/BTLFlatlayBlackBackground33.jpg', '/Photos/Products/Monolith/RYL/BTLFlatlayBlackBackground34.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'M', 'Royal', 'MNO-RYL-M', 200.00,30, ARRAY['/Photos/Products/Monolith/RYL/royal-main.jpg', '/Photos/Products/Monolith/RYL/BTLFlatlayBlackBackground31.jpg', '/Photos/Products/Monolith/RYL/BTLFlatlayBlackBackground32.jpg', '/Photos/Products/Monolith/RYL/BTLFlatlayBlackBackground33.jpg', '/Photos/Products/Monolith/RYL/BTLFlatlayBlackBackground34.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'L', 'Royal', 'MNO-RYL-L', 200.00,30, ARRAY['/Photos/Products/Monolith/RYL/royal-main.jpg', '/Photos/Products/Monolith/RYL/BTLFlatlayBlackBackground31.jpg', '/Photos/Products/Monolith/RYL/BTLFlatlayBlackBackground32.jpg', '/Photos/Products/Monolith/RYL/BTLFlatlayBlackBackground33.jpg', '/Photos/Products/Monolith/RYL/BTLFlatlayBlackBackground34.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XL', 'Royal', 'MNO-RYL-XL', 200.00,20, ARRAY['/Photos/Products/Monolith/RYL/royal-main.jpg', '/Photos/Products/Monolith/RYL/BTLFlatlayBlackBackground31.jpg', '/Photos/Products/Monolith/RYL/BTLFlatlayBlackBackground32.jpg', '/Photos/Products/Monolith/RYL/BTLFlatlayBlackBackground33.jpg', '/Photos/Products/Monolith/RYL/BTLFlatlayBlackBackground34.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XXL', 'Royal', 'MNO-RYL-XXL', 200.00,15, ARRAY['/Photos/Products/Monolith/RYL/royal-main.jpg', '/Photos/Products/Monolith/RYL/BTLFlatlayBlackBackground31.jpg', '/Photos/Products/Monolith/RYL/BTLFlatlayBlackBackground32.jpg', '/Photos/Products/Monolith/RYL/BTLFlatlayBlackBackground33.jpg', '/Photos/Products/Monolith/RYL/BTLFlatlayBlackBackground34.jpg'])
    ON CONFLICT (sku) DO NOTHING;

-- Monolith - Alabaster (White)
INSERT INTO product_variants (product_id, size, color, sku, price, inventory, images)
VALUES
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XXS', 'Alabaster', 'MNO-ALB-XXS', 200.00,10, ARRAY['/Photos/Products/Monolith/ALB/alabaster-main.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground27.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground28.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground29.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground30.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XS', 'Alabaster', 'MNO-ALB-XS', 200.00,15, ARRAY['/Photos/Products/Monolith/ALB/alabaster-main.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground27.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground28.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground29.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground30.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'S', 'Alabaster', 'MNO-ALB-S', 200.00,25, ARRAY['/Photos/Products/Monolith/ALB/alabaster-main.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground27.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground28.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground29.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground30.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'M', 'Alabaster', 'MNO-ALB-M', 200.00,30, ARRAY['/Photos/Products/Monolith/ALB/alabaster-main.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground27.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground28.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground29.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground30.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'L', 'Alabaster', 'MNO-ALB-L', 200.00,30, ARRAY['/Photos/Products/Monolith/ALB/alabaster-main.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground27.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground28.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground29.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground30.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XL', 'Alabaster', 'MNO-ALB-XL', 200.00,20, ARRAY['/Photos/Products/Monolith/ALB/alabaster-main.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground27.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground28.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground29.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground30.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XXL', 'Alabaster', 'MNO-ALB-XXL', 200.00,15, ARRAY['/Photos/Products/Monolith/ALB/alabaster-main.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground27.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground28.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground29.jpg', '/Photos/Products/Monolith/ALB/BTLFlatlayBlackBackground30.jpg'])
    ON CONFLICT (sku) DO NOTHING;

-- Monolith - Ivory (Cream)
INSERT INTO product_variants (product_id, size, color, sku, price, inventory, images)
VALUES
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XXS', 'Ivory', 'MNO-IVR-XXS', 200.00,10, ARRAY['/Photos/Products/Monolith/IVR/ivory-main.jpg', '/Photos/Products/Monolith/IVR/BTLFlatlayBlackBackground35.jpg', '/Photos/Products/Monolith/IVR/BTLFlatlayBlackBackground36.jpg', '/Photos/Products/Monolith/IVR/BTLFlatlayBlackBackground37.jpg', '/Photos/Products/Monolith/IVR/BTLFlatlayBlackBackground38.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XS', 'Ivory', 'MNO-IVR-XS', 200.00,15, ARRAY['/Photos/Products/Monolith/IVR/ivory-main.jpg', '/Photos/Products/Monolith/IVR/BTLFlatlayBlackBackground35.jpg', '/Photos/Products/Monolith/IVR/BTLFlatlayBlackBackground36.jpg', '/Photos/Products/Monolith/IVR/BTLFlatlayBlackBackground37.jpg', '/Photos/Products/Monolith/IVR/BTLFlatlayBlackBackground38.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'S', 'Ivory', 'MNO-IVR-S', 200.00,25, ARRAY['/Photos/Products/Monolith/IVR/ivory-main.jpg', '/Photos/Products/Monolith/IVR/BTLFlatlayBlackBackground35.jpg', '/Photos/Products/Monolith/IVR/BTLFlatlayBlackBackground36.jpg', '/Photos/Products/Monolith/IVR/BTLFlatlayBlackBackground37.jpg', '/Photos/Products/Monolith/IVR/BTLFlatlayBlackBackground38.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'M', 'Ivory', 'MNO-IVR-M', 200.00,30, ARRAY['/Photos/Products/Monolith/IVR/ivory-main.jpg', '/Photos/Products/Monolith/IVR/BTLFlatlayBlackBackground35.jpg', '/Photos/Products/Monolith/IVR/BTLFlatlayBlackBackground36.jpg', '/Photos/Products/Monolith/IVR/BTLFlatlayBlackBackground37.jpg', '/Photos/Products/Monolith/IVR/BTLFlatlayBlackBackground38.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'L', 'Ivory', 'MNO-IVR-L', 200.00,30, ARRAY['/Photos/Products/Monolith/IVR/ivory-main.jpg', '/Photos/Products/Monolith/IVR/BTLFlatlayBlackBackground35.jpg', '/Photos/Products/Monolith/IVR/BTLFlatlayBlackBackground36.jpg', '/Photos/Products/Monolith/IVR/BTLFlatlayBlackBackground37.jpg', '/Photos/Products/Monolith/IVR/BTLFlatlayBlackBackground38.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XL', 'Ivory', 'MNO-IVR-XL', 200.00,20, ARRAY['/Photos/Products/Monolith/IVR/ivory-main.jpg', '/Photos/Products/Monolith/IVR/BTLFlatlayBlackBackground35.jpg', '/Photos/Products/Monolith/IVR/BTLFlatlayBlackBackground36.jpg', '/Photos/Products/Monolith/IVR/BTLFlatlayBlackBackground37.jpg', '/Photos/Products/Monolith/IVR/BTLFlatlayBlackBackground38.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XXL', 'Ivory', 'MNO-IVR-XXL', 200.00,15, ARRAY['/Photos/Products/Monolith/IVR/ivory-main.jpg', '/Photos/Products/Monolith/IVR/BTLFlatlayBlackBackground35.jpg', '/Photos/Products/Monolith/IVR/BTLFlatlayBlackBackground36.jpg', '/Photos/Products/Monolith/IVR/BTLFlatlayBlackBackground37.jpg', '/Photos/Products/Monolith/IVR/BTLFlatlayBlackBackground38.jpg'])
    ON CONFLICT (sku) DO NOTHING;

-- Monolith - Raven (Black)
INSERT INTO product_variants (product_id, size, color, sku, price, inventory, images)
VALUES
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XXS', 'Raven', 'MNO-RVN-XXS', 200.00,10, ARRAY['/Photos/Products/Monolith/RVN/raven-main.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground22.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground23.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground24.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground25.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground26.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XS', 'Raven', 'MNO-RVN-XS', 200.00,15, ARRAY['/Photos/Products/Monolith/RVN/raven-main.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground22.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground23.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground24.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground25.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground26.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'S', 'Raven', 'MNO-RVN-S', 200.00,25, ARRAY['/Photos/Products/Monolith/RVN/raven-main.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground22.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground23.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground24.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground25.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground26.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'M', 'Raven', 'MNO-RVN-M', 200.00,30, ARRAY['/Photos/Products/Monolith/RVN/raven-main.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground22.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground23.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground24.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground25.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground26.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'L', 'Raven', 'MNO-RVN-L', 200.00,30, ARRAY['/Photos/Products/Monolith/RVN/raven-main.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground22.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground23.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground24.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground25.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground26.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XL', 'Raven', 'MNO-RVN-XL', 200.00,20, ARRAY['/Photos/Products/Monolith/RVN/raven-main.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground22.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground23.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground24.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground25.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground26.jpg']),
    ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'XXL', 'Raven', 'MNO-RVN-XXL', 200.00,15, ARRAY['/Photos/Products/Monolith/RVN/raven-main.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground22.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground23.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground24.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground25.jpg', '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground26.jpg'])
    ON CONFLICT (sku) DO NOTHING;

-- ============================================================================
-- ETERNAL PRODUCT (was previously Monolith in old seed)
-- ============================================================================
INSERT INTO products (id, name, description, base_price, images, category, tags, featured, created_at, updated_at)
VALUES (
           'c3d4e5f6-a7b8-9012-cdef-123456789012',
           'Eternal Tee',
           'The Eternal Tee - bold, iconic, and built to make a statement with uncompromising quality.',
           200.00,
           ARRAY['/Photos/Products/Eternal/RVN/raven-main.jpg'],
           'Essentials',
           ARRAY['tshirt', 'eternal', 'premium'],
           true,
           NOW(),
           NOW()
       ) ON CONFLICT (id) DO NOTHING;

-- Eternal - Raven (Black)
INSERT INTO product_variants (product_id, size, color, sku, price, inventory, images)
VALUES
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XXS', 'Raven', 'ETN-RVN-XXS', 200.00,10, ARRAY['/Photos/Products/Eternal/RVN/raven-main.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground43.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground44.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground45.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground46.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XS', 'Raven', 'ETN-RVN-XS', 200.00,15, ARRAY['/Photos/Products/Eternal/RVN/raven-main.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground43.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground44.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground45.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground46.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'S', 'Raven', 'ETN-RVN-S', 200.00,25, ARRAY['/Photos/Products/Eternal/RVN/raven-main.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground43.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground44.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground45.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground46.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'M', 'Raven', 'ETN-RVN-M', 200.00,30, ARRAY['/Photos/Products/Eternal/RVN/raven-main.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground43.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground44.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground45.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground46.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'L', 'Raven', 'ETN-RVN-L', 200.00,30, ARRAY['/Photos/Products/Eternal/RVN/raven-main.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground43.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground44.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground45.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground46.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XL', 'Raven', 'ETN-RVN-XL', 200.00,20, ARRAY['/Photos/Products/Eternal/RVN/raven-main.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground43.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground44.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground45.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground46.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XXL', 'Raven', 'ETN-RVN-XXL', 200.00,15, ARRAY['/Photos/Products/Eternal/RVN/raven-main.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground43.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground44.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground45.jpg', '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground46.jpg'])
    ON CONFLICT (sku) DO NOTHING;

-- Eternal - Alabaster (White)
INSERT INTO product_variants (product_id, size, color, sku, price, inventory, images)
VALUES
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XXS', 'Alabaster', 'ETN-ALB-XXS', 200.00,10, ARRAY['/Photos/Products/Eternal/ALB/alabaster-main.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground11.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground12.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground13.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground14.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XS', 'Alabaster', 'ETN-ALB-XS', 200.00,15, ARRAY['/Photos/Products/Eternal/ALB/alabaster-main.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground11.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground12.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground13.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground14.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'S', 'Alabaster', 'ETN-ALB-S', 200.00,25, ARRAY['/Photos/Products/Eternal/ALB/alabaster-main.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground11.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground12.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground13.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground14.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'M', 'Alabaster', 'ETN-ALB-M', 200.00,30, ARRAY['/Photos/Products/Eternal/ALB/alabaster-main.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground11.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground12.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground13.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground14.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'L', 'Alabaster', 'ETN-ALB-L', 200.00,30, ARRAY['/Photos/Products/Eternal/ALB/alabaster-main.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground11.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground12.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground13.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground14.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XL', 'Alabaster', 'ETN-ALB-XL', 200.00,20, ARRAY['/Photos/Products/Eternal/ALB/alabaster-main.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground11.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground12.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground13.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground14.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XXL', 'Alabaster', 'ETN-ALB-XXL', 200.00,15, ARRAY['/Photos/Products/Eternal/ALB/alabaster-main.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground11.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground12.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground13.jpg', '/Photos/Products/Eternal/ALB/BTLFlatlayBlackBackground14.jpg'])
    ON CONFLICT (sku) DO NOTHING;

-- Eternal - Chocolate (Brown)
INSERT INTO product_variants (product_id, size, color, sku, price, inventory, images)
VALUES
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XXS', 'Chocolate', 'ETN-CHC-XXS', 200.00,10, ARRAY['/Photos/Products/Eternal/CHC/chocolate-main.jpg', '/Photos/Products/Eternal/CHC/BTLFlatlayBlackBackground5.jpg', '/Photos/Products/Eternal/CHC/BTLFlatlayBlackBackgroundtu1.jpg', '/Photos/Products/Eternal/CHC/BTLFlatlayBlackBackgroundtu2.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XS', 'Chocolate', 'ETN-CHC-XS', 200.00,15, ARRAY['/Photos/Products/Eternal/CHC/chocolate-main.jpg', '/Photos/Products/Eternal/CHC/BTLFlatlayBlackBackground5.jpg', '/Photos/Products/Eternal/CHC/BTLFlatlayBlackBackgroundtu1.jpg', '/Photos/Products/Eternal/CHC/BTLFlatlayBlackBackgroundtu2.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'S', 'Chocola te', 'ETN-CHC-S', 200.00,25, ARRAY['/Photos/Products/Eternal/CHC/chocolate-main.jpg', '/Photos/Products/Eternal/CHC/BTLFlatlayBlackBackground5.jpg', '/Photos/Products/Eternal/CHC/BTLFlatlayBlackBackgroundtu1.jpg', '/Photos/Products/Eternal/CHC/BTLFlatlayBlackBackgroundtu2.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'M', 'Chocolate', 'ETN-CHC-M', 200.00,30, ARRAY['/Photos/Products/Eternal/CHC/chocolate-main.jpg', '/Photos/Products/Eternal/CHC/BTLFlatlayBlackBackground5.jpg', '/Photos/Products/Eternal/CHC/BTLFlatlayBlackBackgroundtu1.jpg', '/Photos/Products/Eternal/CHC/BTLFlatlayBlackBackgroundtu2.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'L', 'Chocolate', 'ETN-CHC-L', 200.00,30, ARRAY['/Photos/Products/Eternal/CHC/chocolate-main.jpg', '/Photos/Products/Eternal/CHC/BTLFlatlayBlackBackground5.jpg', '/Photos/Products/Eternal/CHC/BTLFlatlayBlackBackgroundtu1.jpg', '/Photos/Products/Eternal/CHC/BTLFlatlayBlackBackgroundtu2.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XL', 'Chocolate', 'ETN-CHC-XL', 200.00,20, ARRAY['/Photos/Products/Eternal/CHC/chocolate-main.jpg', '/Photos/Products/Eternal/CHC/BTLFlatlayBlackBackground5.jpg', '/Photos/Products/Eternal/CHC/BTLFlatlayBlackBackgroundtu1.jpg', '/Photos/Products/Eternal/CHC/BTLFlatlayBlackBackgroundtu2.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XXL', 'Chocolate', 'ETN-CHC-XXL', 200.00,15, ARRAY['/Photos/Products/Eternal/CHC/chocolate-main.jpg', '/Photos/Products/Eternal/CHC/BTLFlatlayBlackBackground5.jpg', '/Photos/Products/Eternal/CHC/BTLFlatlayBlackBackgroundtu1.jpg', '/Photos/Products/Eternal/CHC/BTLFlatlayBlackBackgroundtu2.jpg'])
    ON CONFLICT (sku) DO NOTHING;

-- Eternal - Granite (Navy)
INSERT INTO product_variants (product_id, size, color, sku, price, inventory, images)
VALUES
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XXS', 'Granite', 'ETN-GRN-XXS', 200.00,10, ARRAY['/Photos/Products/Eternal/GRN/granite-main.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground1.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground2.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground3.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground47.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground48.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XS', 'Granite', 'ETN-GRN-XS', 200.00,15, ARRAY['/Photos/Products/Eternal/GRN/granite-main.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground1.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground2.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground3.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground47.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground48.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'S', 'Granite', 'ETN-GRN-S', 200.00,25, ARRAY['/Photos/Products/Eternal/GRN/granite-main.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground1.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground2.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground3.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground47.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground48.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'M', 'Granite', 'ETN-GRN-M', 200.00,30, ARRAY['/Photos/Products/Eternal/GRN/granite-main.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground1.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground2.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground3.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground47.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground48.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'L', 'Granite', 'ETN-GRN-L', 200.00,30, ARRAY['/Photos/Products/Eternal/GRN/granite-main.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground1.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground2.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground3.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground47.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground48.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XL', 'Granite', 'ETN-GRN-XL', 200.00,20, ARRAY['/Photos/Products/Eternal/GRN/granite-main.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground1.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground2.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground3.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground47.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground48.jpg']),
    ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'XXL', 'Granite', 'ETN-GRN-XXL', 200.00,15, ARRAY['/Photos/Products/Eternal/GRN/granite-main.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground1.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground2.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground3.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground47.jpg', '/Photos/Products/Eternal/GRN/BTLFlatlayBlackBackground48.jpg'])
    ON CONFLICT (sku) DO NOTHING;