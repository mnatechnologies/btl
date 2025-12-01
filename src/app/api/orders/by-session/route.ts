import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseServer'

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 })
    }

    // Fetch order from database using Stripe session ID
    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('stripe_session_id', sessionId)
      .single()

    if (error || !order) {
      console.error('Order not found:', error)
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }
    console.log(order)
    return NextResponse.json({ order })
  } catch (error) {
    console.error('Error fetching order:', error)
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 })
  }
}
