import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseAdmin } from '@/lib/supabaseServer'
import { CartItem } from '@/context/CartContext'

export async function POST(req: NextRequest) {
  try {
    const { items, email, name, phone } = await req.json() as {
      items?: CartItem[]
      email?: string
      name?: string
      phone?: string
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items' }, { status: 400 })
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((i) => ({
      quantity: i.quantity || 1,
      price_data: {
        currency: 'aud',
        unit_amount: i.price, // in cents
        product_data: {
          name: i.title || 'Item',
        },
      },
    }))

    //const success_url = `${req.nextUrl.origin}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`
    const success_url = `https://unrainy-obstreperously-ayden.ngrok-free.dev/order-confirmation?session_id={CHECKOUT_SESSION_ID}`
    const cancel_url = 'https://unrainy-obstreperously-ayden.ngrok-free.dev/cart?status=cancelled'
    //const cancel_url = `${req.nextUrl.origin}/cart?status=cancelled`

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url,
      cancel_url,
      customer_email: email || undefined,
      shipping_address_collection: {
        allowed_countries: ['AU'],
      },
      phone_number_collection: {
        enabled: true,
      },
      metadata: {
        items: JSON.stringify(items.map((i) => ({ id: i.id, qty: i.quantity, price: i.price }))),
        customer_name: name || '',
        customer_phone: phone || '',
      },
    })

    // Insert provisional order (optional, requires service role and table)
    try {
      if (supabaseAdmin) {
        const total = items.reduce((s, i) => s + i.price * i.quantity, 0)
        await supabaseAdmin.from('orders').insert({
          stripe_session_id: session.id,
          status: 'created',
          total_cents: total,
          customer_email: email || null,
          shipping_name: name || null,
          shipping_phone: phone || null,
          items,
        })
      }
    } catch (e) {
      console.warn('Failed to insert provisional order', e)
    }

    return NextResponse.json({ id: session.id, url: session.url })
  } catch (e) {
    const error = e as { message?: string }
    console.error(e)
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 })
  }
}
