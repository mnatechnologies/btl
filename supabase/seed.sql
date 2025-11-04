-- Seed data for D1 product and variants
-- Insert D1 product
INSERT INTO products (id, name, description, base_price, images, category, tags, featured, created_at, updated_at)
VALUES (
           'e8f0a3e0-9b1f-4c5d-8e7a-2b3c4d5e6f7a',
           'D1 Essential Tee',
           'Premium quality essential t-shirt available in multiple colors and sizes. Built to last with exceptional craftsmanship and timeless style.',
           220.00,
           ARRAY['/images/d1-product.jpg'],
           'Essentials',
           ARRAY['tshirt', 'essential', 'premium'],
           true,
           NOW(),
           NOW()
       ) ON CONFLICT (id) DO NOTHING;

-- Insert D1 Black variants (7 sizes)
INSERT INTO product_variants (product_id, size, color, sku, price, inventory, images)
VALUES
    ('e8f0a3e0-9b1f-4c5d-8e7a-2b3c4d5e6f7a', 'XXS', 'Black', 'D1-BLK-XXS', 220.00, 10, ARRAY['/images/Flat lay retouched/black-shirt-front.jpg', '/images/Flat lay retouched/black-shirt-back.jpg', '/images/Flat lay retouched/black-shirt-bottom.jpg', '/images/Flat lay retouched/black-shirt-neck-front.jpg', '/images/Flat lay retouched/black-shirt-sleeve.jpg']),
    ('e8f0a3e0-9b1f-4c5d-8e7a-2b3c4d5e6f7a', 'XS', 'Black', 'D1-BLK-XS', 220.00, 15, ARRAY['/images/Flat lay retouched/black-shirt-front.jpg', '/images/Flat lay retouched/black-shirt-back.jpg', '/images/Flat lay retouched/black-shirt-bottom.jpg', '/images/Flat lay retouched/black-shirt-neck-front.jpg', '/images/Flat lay retouched/black-shirt-sleeve.jpg']),
    ('e8f0a3e0-9b1f-4c5d-8e7a-2b3c4d5e6f7a', 'S', 'Black', 'D1-BLK-S', 220.00, 25, ARRAY['/images/Flat lay retouched/black-shirt-front.jpg', '/images/Flat lay retouched/black-shirt-back.jpg', '/images/Flat lay retouched/black-shirt-bottom.jpg', '/images/Flat lay retouched/black-shirt-neck-front.jpg', '/images/Flat lay retouched/black-shirt-sleeve.jpg']),
    ('e8f0a3e0-9b1f-4c5d-8e7a-2b3c4d5e6f7a', 'M', 'Black', 'D1-BLK-M', 220.00, 30, ARRAY['/images/Flat lay retouched/black-shirt-front.jpg', '/images/Flat lay retouched/black-shirt-back.jpg', '/images/Flat lay retouched/black-shirt-bottom.jpg', '/images/Flat lay retouched/black-shirt-neck-front.jpg', '/images/Flat lay retouched/black-shirt-sleeve.jpg']),
    ('e8f0a3e0-9b1f-4c5d-8e7a-2b3c4d5e6f7a', 'L', 'Black', 'D1-BLK-L', 220.00, 30, ARRAY['/images/Flat lay retouched/black-shirt-front.jpg', '/images/Flat lay retouched/black-shirt-back.jpg', '/images/Flat lay retouched/black-shirt-bottom.jpg', '/images/Flat lay retouched/black-shirt-neck-front.jpg', '/images/Flat lay retouched/black-shirt-sleeve.jpg']),
    ('e8f0a3e0-9b1f-4c5d-8e7a-2b3c4d5e6f7a', 'XL', 'Black', 'D1-BLK-XL', 220.00, 20, ARRAY['/images/Flat lay retouched/black-shirt-front.jpg', '/images/Flat lay retouched/black-shirt-back.jpg', '/images/Flat lay retouched/black-shirt-bottom.jpg', '/images/Flat lay retouched/black-shirt-neck-front.jpg', '/images/Flat lay retouched/black-shirt-sleeve.jpg']),
    ('e8f0a3e0-9b1f-4c5d-8e7a-2b3c4d5e6f7a', 'XXL', 'Black', 'D1-BLK-XXL', 220.00, 15, ARRAY['/images/Flat lay retouched/black-shirt-front.jpg', '/images/Flat lay retouched/black-shirt-back.jpg', '/images/Flat lay retouched/black-shirt-bottom.jpg', '/images/Flat lay retouched/black-shirt-neck-front.jpg', '/images/Flat lay retouched/black-shirt-sleeve.jpg'])
    ON CONFLICT (sku) DO NOTHING;

-- Insert D1 White variants (7 sizes)
INSERT INTO product_variants (product_id, size, color, sku, price, inventory, images)
VALUES
    ('e8f0a3e0-9b1f-4c5d-8e7a-2b3c4d5e6f7a', 'XXS', 'White', 'D1-WHT-XXS', 220.00, 10, ARRAY['/images/Flat lay retouched/white-shirt-front.jpg', '/images/Flat lay retouched/white-shirt-back.jpg', '/images/Flat lay retouched/white-shirt-bottom.jpg', '/images/Flat lay retouched/white-shirt-neck-.jpg', '/images/Flat lay retouched/white-shirt-sleeve.jpg']),
    ('e8f0a3e0-9b1f-4c5d-8e7a-2b3c4d5e6f7a', 'XS', 'White', 'D1-WHT-XS', 220.00, 15, ARRAY['/images/Flat lay retouched/white-shirt-front.jpg', '/images/Flat lay retouched/white-shirt-back.jpg', '/images/Flat lay retouched/white-shirt-bottom.jpg', '/images/Flat lay retouched/white-shirt-neck-.jpg', '/images/Flat lay retouched/white-shirt-sleeve.jpg']),
    ('e8f0a3e0-9b1f-4c5d-8e7a-2b3c4d5e6f7a', 'S', 'White', 'D1-WHT-S', 220.00, 25, ARRAY['/images/Flat lay retouched/white-shirt-front.jpg', '/images/Flat lay retouched/white-shirt-back.jpg', '/images/Flat lay retouched/white-shirt-bottom.jpg', '/images/Flat lay retouched/white-shirt-neck-.jpg', '/images/Flat lay retouched/white-shirt-sleeve.jpg']),
    ('e8f0a3e0-9b1f-4c5d-8e7a-2b3c4d5e6f7a', 'M', 'White', 'D1-WHT-M', 220.00, 30, ARRAY['/images/Flat lay retouched/white-shirt-front.jpg', '/images/Flat lay retouched/white-shirt-back.jpg', '/images/Flat lay retouched/white-shirt-bottom.jpg', '/images/Flat lay retouched/white-shirt-neck-.jpg', '/images/Flat lay retouched/white-shirt-sleeve.jpg']),
    ('e8f0a3e0-9b1f-4c5d-8e7a-2b3c4d5e6f7a', 'L', 'White', 'D1-WHT-L', 220.00, 30, ARRAY['/images/Flat lay retouched/white-shirt-front.jpg', '/images/Flat lay retouched/white-shirt-back.jpg', '/images/Flat lay retouched/white-shirt-bottom.jpg', '/images/Flat lay retouched/white-shirt-neck-.jpg', '/images/Flat lay retouched/white-shirt-sleeve.jpg']),
    ('e8f0a3e0-9b1f-4c5d-8e7a-2b3c4d5e6f7a', 'XL', 'White', 'D1-WHT-XL', 220.00, 20, ARRAY['/images/Flat lay retouched/white-shirt-front.jpg', '/images/Flat lay retouched/white-shirt-back.jpg', '/images/Flat lay retouched/white-shirt-bottom.jpg', '/images/Flat lay retouched/white-shirt-neck-.jpg', '/images/Flat lay retouched/white-shirt-sleeve.jpg']),
    ('e8f0a3e0-9b1f-4c5d-8e7a-2b3c4d5e6f7a', 'XXL', 'White', 'D1-WHT-XXL', 220.00, 15, ARRAY['/images/Flat lay retouched/white-shirt-front.jpg', '/images/Flat lay retouched/white-shirt-back.jpg', '/images/Flat lay retouched/white-shirt-bottom.jpg', '/images/Flat lay retouched/white-shirt-neck-.jpg', '/images/Flat lay retouched/white-shirt-sleeve.jpg'])
    ON CONFLICT (sku) DO NOTHING;

-- Insert D1 Light Grey variants (7 sizes)
INSERT INTO product_variants (product_id, size, color, sku, price, inventory, images)
VALUES
    ('e8f0a3e0-9b1f-4c5d-8e7a-2b3c4d5e6f7a', 'XXS', 'Light Grey', 'D1-LGR-XXS', 220.00, 10, ARRAY['/images/Flat lay retouched/grey-shirt-front.jpg', '/images/Flat lay retouched/grey-shirt-back.jpg', '/images/Flat lay retouched/grey-shirt-bottom.jpg', '/images/Flat lay retouched/grey-shirt-neck-.jpg', '/images/Flat lay retouched/grey-shirt-sleeeve2.jpg']),
    ('e8f0a3e0-9b1f-4c5d-8e7a-2b3c4d5e6f7a', 'XS', 'Light Grey', 'D1-LGR-XS', 220.00, 15, ARRAY['/images/Flat lay retouched/grey-shirt-front.jpg', '/images/Flat lay retouched/grey-shirt-back.jpg', '/images/Flat lay retouched/grey-shirt-bottom.jpg', '/images/Flat lay retouched/grey-shirt-neck-.jpg', '/images/Flat lay retouched/grey-shirt-sleeeve2.jpg']),
    ('e8f0a3e0-9b1f-4c5d-8e7a-2b3c4d5e6f7a', 'S', 'Light Grey', 'D1-LGR-S', 220.00, 25, ARRAY['/images/Flat lay retouched/grey-shirt-front.jpg', '/images/Flat lay retouched/grey-shirt-back.jpg', '/images/Flat lay retouched/grey-shirt-bottom.jpg', '/images/Flat lay retouched/grey-shirt-neck-.jpg', '/images/Flat lay retouched/grey-shirt-sleeeve2.jpg']),
    ('e8f0a3e0-9b1f-4c5d-8e7a-2b3c4d5e6f7a', 'M', 'Light Grey', 'D1-LGR-M', 220.00, 30, ARRAY['/images/Flat lay retouched/grey-shirt-front.jpg', '/images/Flat lay retouched/grey-shirt-back.jpg', '/images/Flat lay retouched/grey-shirt-bottom.jpg', '/images/Flat lay retouched/grey-shirt-neck-.jpg', '/images/Flat lay retouched/grey-shirt-sleeeve2.jpg']),
    ('e8f0a3e0-9b1f-4c5d-8e7a-2b3c4d5e6f7a', 'L', 'Light Grey', 'D1-LGR-L', 220.00, 30, ARRAY['/images/Flat lay retouched/grey-shirt-front.jpg', '/images/Flat lay retouched/grey-shirt-back.jpg', '/images/Flat lay retouched/grey-shirt-bottom.jpg', '/images/Flat lay retouched/grey-shirt-neck-.jpg', '/images/Flat lay retouched/grey-shirt-sleeeve2.jpg']),
    ('e8f0a3e0-9b1f-4c5d-8e7a-2b3c4d5e6f7a', 'XL', 'Light Grey', 'D1-LGR-XL', 220.00, 20, ARRAY['/images/Flat lay retouched/grey-shirt-front.jpg', '/images/Flat lay retouched/grey-shirt-back.jpg', '/images/Flat lay retouched/grey-shirt-bottom.jpg', '/images/Flat lay retouched/grey-shirt-neck-.jpg', '/images/Flat lay retouched/grey-shirt-sleeeve2.jpg']),
    ('e8f0a3e0-9b1f-4c5d-8e7a-2b3c4d5e6f7a', 'XXL', 'Light Grey', 'D1-LGR-XXL', 220.00, 15, ARRAY['/images/d1-lightgrey-xxl.jpg'])
    ON CONFLICT (sku) DO NOTHING;

-- Insert D1 Beige variants (7 sizes)
INSERT INTO product_variants (product_id, size, color, sku, price, inventory, images)
VALUES
    ('e8f0a3e0-9b1f-4c5d-8e7a-2b3c4d5e6f7a', 'XXS', 'Beige', 'D1-BEG-XXS', 220.00, 10, ARRAY['/images/Flat lay retouched/offwhite-shirt-front.jpg', '/images/Flat lay retouched/offwhite-shirt-back.jpg', '/images/Flat lay retouched/offwhite-shirt-bottom.jpg', '/images/Flat lay retouched/offwhite-shirt-neck-.jpg', '/images/Flat lay retouched/offwhite-shirt-sleeve.jpg']),
    ('e8f0a3e0-9b1f-4c5d-8e7a-2b3c4d5e6f7a', 'XS', 'Beige', 'D1-BEG-XS', 220.00, 15, ARRAY['/images/Flat lay retouched/offwhite-shirt-front.jpg', '/images/Flat lay retouched/offwhite-shirt-back.jpg', '/images/Flat lay retouched/offwhite-shirt-bottom.jpg', '/images/Flat lay retouched/offwhite-shirt-neck-.jpg', '/images/Flat lay retouched/offwhite-shirt-sleeve.jpg']),
    ('e8f0a3e0-9b1f-4c5d-8e7a-2b3c4d5e6f7a', 'S', 'Beige', 'D1-BEG-S', 220.00, 25, ARRAY['/images/Flat lay retouched/offwhite-shirt-front.jpg', '/images/Flat lay retouched/offwhite-shirt-back.jpg', '/images/Flat lay retouched/offwhite-shirt-bottom.jpg', '/images/Flat lay retouched/offwhite-shirt-neck-.jpg', '/images/Flat lay retouched/offwhite-shirt-sleeve.jpg']),
    ('e8f0a3e0-9b1f-4c5d-8e7a-2b3c4d5e6f7a', 'M', 'Beige', 'D1-BEG-M', 220.00, 30, ARRAY['/images/Flat lay retouched/offwhite-shirt-front.jpg', '/images/Flat lay retouched/offwhite-shirt-back.jpg', '/images/Flat lay retouched/offwhite-shirt-bottom.jpg', '/images/Flat lay retouched/offwhite-shirt-neck-.jpg', '/images/Flat lay retouched/offwhite-shirt-sleeve.jpg']),
    ('e8f0a3e0-9b1f-4c5d-8e7a-2b3c4d5e6f7a', 'L', 'Beige', 'D1-BEG-L', 220.00, 30, ARRAY['/images/Flat lay retouched/offwhite-shirt-front.jpg', '/images/Flat lay retouched/offwhite-shirt-back.jpg', '/images/Flat lay retouched/offwhite-shirt-bottom.jpg', '/images/Flat lay retouched/offwhite-shirt-neck-.jpg', '/images/Flat lay retouched/offwhite-shirt-sleeve.jpg']),
    ('e8f0a3e0-9b1f-4c5d-8e7a-2b3c4d5e6f7a', 'XL', 'Beige', 'D1-BEG-XL', 220.00, 20, ARRAY['/images/Flat lay retouched/offwhite-shirt-front.jpg', '/images/Flat lay retouched/offwhite-shirt-back.jpg', '/images/Flat lay retouched/offwhite-shirt-bottom.jpg', '/images/Flat lay retouched/offwhite-shirt-neck-.jpg', '/images/Flat lay retouched/offwhite-shirt-sleeve.jpg']),
    ('e8f0a3e0-9b1f-4c5d-8e7a-2b3c4d5e6f7a', 'XXL', 'Beige', 'D1-BEG-XXL', 220.00, 15, ARRAY['/images/Flat lay retouched/offwhite-shirt-front.jpg', '/images/Flat lay retouched/offwhite-shirt-back.jpg', '/images/Flat lay retouched/offwhite-shirt-bottom.jpg', '/images/Flat lay retouched/offwhite-shirt-neck-.jpg', '/images/Flat lay retouched/offwhite-shirt-sleeve.jpg'])
    ON CONFLICT (sku) DO NOTHING;

