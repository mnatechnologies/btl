-- Migration: Update Legacy Tee pricing from $200 to $110
-- Date: 2026-02-05

-- Update base price for Legacy product
UPDATE products
SET base_price = 110.00, updated_at = NOW()
WHERE id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

-- Update all Legacy variant prices
UPDATE product_variants
SET price = 110.00
WHERE product_id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
