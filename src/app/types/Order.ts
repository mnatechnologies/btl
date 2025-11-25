
export interface DatabaseOrder {
  id: number
  stripe_session_id: string | null
  status: 'created' | 'paid' | 'fulfilled' | 'shipped' | 'cancelled'
  total_cents: number
  customer_email: string | null
  tracking_number: string | null
  items: unknown 
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
  // Australia Post fields
  auspost_shipment_id: string | null
  auspost_consignment_id: string | null
}

