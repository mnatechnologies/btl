export interface OrderItem {
  id: number
  order_id: number
  product_variant_id: number
  quantity: number
  price_cents: number
  created_at: string
  product_variants?: {
    id: number
    sku: string
    color: string
    size: string
    inventory: number
    products?: {
      name: string
      slug: string
    }
  }
}

export interface DatabaseOrder {
  id: number
  stripe_session_id: string | null
  customer_email: string | null
  total_cents: number
  status: string
  tracking_number: string | ''
  shipping_name: string | null
  shipping_address_line1: string | null
  shipping_address_line2: string | null
  shipping_suburb: string | null
  shipping_state: string | null
  shipping_postcode: string | null
  shipping_country: string | null
  shipping_phone: string | null
  created_at: string
  updated_at: string
  items?: OrderItem[]
}