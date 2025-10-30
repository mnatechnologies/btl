import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseAdmin } from '@/lib/supabaseServer'

export async function POST(req: NextRequest) {
  try {
    const { items, email } = await req.json()
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items' }, { status: 400 })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((i: any) => ({
      quantity: i.quantity || 1,
      price_data: {
        currency: 'aud',
        unit_amount: i.price, // in cents
        product_data: {
          name: i.title || 'Item',
        },
      },
    }))

    const success_url = `${req.nextUrl.origin}/account?status=success`
    const cancel_url = `${req.nextUrl.origin}/cart?status=cancelled`

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url,
      cancel_url,
      customer_email: email || undefined,
      metadata: {
        items: JSON.stringify(items.map((i: any) => ({ id: i.id, qty: i.quantity, price: i.price }))),
      },
    })

    // Insert provisional order (optional, requires service role and table)
    try {
      if (supabaseAdmin) {
        const total = items.reduce((s: number, i: any) => s + i.price * i.quantity, 0)
        await supabaseAdmin.from('orders').insert({
          stripe_session_id: session.id,
          status: 'created',
          total_cents: total,
          customer_email: email || null,
          items,
        })
      }
    } catch (e) {
      console.warn('Failed to insert provisional order', e)
    }

    return NextResponse.json({ id: session.id, url: session.url })
  } catch (e: any) {
    console.error(e)
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 })
  }
}
