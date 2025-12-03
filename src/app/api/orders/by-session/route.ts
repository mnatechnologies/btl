import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseServer'

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get('session_id')
    const email = req.nextUrl.searchParams.get('email')

    // Validate required parameters
    if (!sessionId) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    // Validate session ID format (Stripe session IDs start with 'cs_')
    if (!sessionId.startsWith('cs_')) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    // Fetch order from database using Stripe session ID
    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('stripe_session_id', sessionId)
      .single()

    if (error || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // ✅ AUTHORIZATION: Verify email matches if provided
    // This prevents unauthorized access to orders
    if (email && order.customer_email) {
      if (email.toLowerCase() !== order.customer_email.toLowerCase()) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 })
      }
    }

    return NextResponse.json({ order })
  } catch (error) {
    console.error('[API] Error fetching order by session')
    return NextResponse.json({ error: 'Request failed' }, { status: 500 })
  }
}
