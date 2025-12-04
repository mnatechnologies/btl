
CREATE OR REPLACE FUNCTION deduct_inventory(
  p_sku TEXT,
  p_quantity INTEGER
)
RETURNS TABLE(
  success BOOLEAN,
  new_inventory INTEGER,
  message TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_current_inventory INTEGER;
  v_new_inventory INTEGER;
BEGIN
  -- Lock the row for update to prevent race conditions
  SELECT inventory INTO v_current_inventory
  FROM product_variants
  WHERE sku = p_sku
  FOR UPDATE;

  -- Check if variant exists
  IF NOT FOUND THEN
    RETURN QUERY SELECT FALSE, 0, 'Variant not found';
    RETURN;
  END IF;

  -- Check if sufficient inventory available
  IF v_current_inventory < p_quantity THEN
    RETURN QUERY SELECT FALSE, v_current_inventory, 'Insufficient inventory';
    RETURN;
  END IF;

  -- Calculate new inventory
  v_new_inventory := v_current_inventory - p_quantity;

  -- Update inventory atomically
  UPDATE product_variants
  SET inventory = v_new_inventory,
      updated_at = NOW()
  WHERE sku = p_sku;

  -- Return success with new inventory
  RETURN QUERY SELECT TRUE, v_new_inventory, 'Inventory updated';
END;
$$;

-- Add comment
COMMENT ON FUNCTION deduct_inventory IS 'Atomically deduct inventory for a product variant, preventing race conditions';
