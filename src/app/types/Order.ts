// Database order type matching Supabase schema
export interface DatabaseOrder {
  id: string
  stripe_session_id: string | null
  status: 'created' | 'paid' | 'fulfilled' | 'shipped' | 'cancelled'
  total_cents: number
  customer_email: string | null
  tracking_number: string | null
  items: unknown 
  created_at: string
  updated_at: string
}

