export interface CartOrderItem {
  id: string
  sku: string
  image: string
  price: number
  title: string
  quantity: number
}

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
  status: 'created' | 'paid' | 'fulfilled' | 'shipped' | 'cancelled'
  total_cents: number
  customer_email: string | null
  tracking_number: string | null
  items: CartOrderItem[] // Changed from unknown to CartOrderItem[]
  created_at: string
  updated_at: string
  shipping_name: string | null
  shipping_phone: string | null
  shipping_address_line1: string | null
  shipping_address_line2: string | null
  shipping_suburb: string | null
  shipping_state: string | null
  shipping_postcode: string | null
  shipping_country: string | null
  auspost_shipment_id: string | null
  auspost_consignment_id: string | null
}