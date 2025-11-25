
-- Add columns for AusPost shipment data
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS auspost_shipment_id TEXT,
ADD COLUMN IF NOT EXISTS auspost_consignment_id TEXT,
ADD COLUMN IF NOT EXISTS shipping_name TEXT,
ADD COLUMN IF NOT EXISTS shipping_phone TEXT,
ADD COLUMN IF NOT EXISTS shipping_address_line1 TEXT,
ADD COLUMN IF NOT EXISTS shipping_address_line2 TEXT,
ADD COLUMN IF NOT EXISTS shipping_suburb TEXT,
ADD COLUMN IF NOT EXISTS shipping_state TEXT,
ADD COLUMN IF NOT EXISTS shipping_postcode TEXT,
ADD COLUMN IF NOT EXISTS shipping_country TEXT DEFAULT 'AU';

-- Add index on auspost_shipment_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_orders_auspost_shipment_id ON orders(auspost_shipment_id);

-- Add index on tracking_number for faster lookups
CREATE INDEX IF NOT EXISTS idx_orders_tracking_number ON orders(tracking_number);

-- Add comment to document the new columns
COMMENT ON COLUMN orders.auspost_shipment_id IS 'Australia Post shipment ID from their API';
COMMENT ON COLUMN orders.auspost_consignment_id IS 'Australia Post consignment ID for tracking';
COMMENT ON COLUMN orders.shipping_name IS 'Customer name for shipping label';
COMMENT ON COLUMN orders.shipping_phone IS 'Customer phone for delivery';
COMMENT ON COLUMN orders.shipping_address_line1 IS 'Shipping address line 1';
COMMENT ON COLUMN orders.shipping_address_line2 IS 'Shipping address line 2 (optional)';
COMMENT ON COLUMN orders.shipping_suburb IS 'Shipping suburb/city';
COMMENT ON COLUMN orders.shipping_state IS 'Shipping state (NSW, VIC, QLD, etc.)';
COMMENT ON COLUMN orders.shipping_postcode IS 'Shipping postcode';
COMMENT ON COLUMN orders.shipping_country IS 'Shipping country code (default: AU)';
