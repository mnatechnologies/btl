import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseAdmin } from '@/lib/supabaseServer'
import { CartItem } from '@/context/CartContext'
import { getPromoCode } from '@/lib/promoCodes'
import { checkCSRF } from '@/lib/csrf'
import { isSaleActive, getSalePrice, getDiscountPercent } from '@/lib/saleConfig'


// Get or create a Stripe coupon for the promo code
async function getOrCreateCoupon(stripe: Stripe, code: string): Promise<string | null> {
  const promo = getPromoCode(code)
  if (!promo) return null

  const couponId = `PROMO_${code.toUpperCase()}`

  try {
    // Try to retrieve existing coupon
    await stripe.coupons.retrieve(couponId)
    return couponId
  } catch {
    // Coupon doesn't exist, create it
    try {
      const couponParams: Stripe.CouponCreateParams = {
        id: couponId,
        duration: 'once',
        name: `${code} - ${promo.description}`,
      }

      if (promo.type === 'percentage') {
        // Percentage-based discount
        couponParams.percent_off = promo.discount
      } else {
        // Fixed amount discount
        couponParams.amount_off = promo.discount
        couponParams.currency = promo.currency
      }

      await stripe.coupons.create(couponParams)
      return couponId
    } catch (createError) {
      console.error('Failed to create coupon:', createError)
      return null
    }
  }
}

export async function POST(req: NextRequest) {
  // ✅ CSRF PROTECTION: Validate request origin
  const csrfError = checkCSRF(req)
  if (csrfError) {
    return NextResponse.json({ error: csrfError.error }, { status: csrfError.status })
  }

  try {
    const { items, email, name, phone, promoCode } = await req.json() as {
      items?: CartItem[]
      email?: string
      name?: string
      phone?: string
      promoCode?: string
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items' }, { status: 400 })
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
    }

    if (supabaseAdmin) {
      for (const item of items) {
        const { data: variant, error } = await supabaseAdmin
          .from('product_variants')
          .select('inventory, sku')
          .eq('sku', item.sku)
          .single()

        if (error || !variant) {
          return NextResponse.json(
            { error: `Product ${item.sku} not found` },
            { status: 400 }
          )
        }

        if (variant.inventory < item.quantity) {
          return NextResponse.json(
            { error: `Insufficient stock for ${item.sku}. Only ${variant.inventory} available.` },
            { status: 400 }
          )
        }
      }
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const saleActive = isSaleActive()
    const discountPercent = getDiscountPercent()
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((i) => {
      const unitAmount = saleActive ? getSalePrice(i.price) : i.price

      return {
        quantity: i.quantity || 1,
        price_data: {
          currency: 'aud',
          unit_amount: unitAmount, // Apply sale discount
          product_data: {
            name: saleActive
              ? `${i.title || 'Item'} (${discountPercent}% OFF)`
              : (i.title || 'Item'),
            // Optionally show original price in description
            ...(saleActive && {
              description: `Original price: $${(i.price / 100).toFixed(2)}`
            })
          },
        },
      }
    })

    // Get coupon ID if promo code is valid
    let couponId: string | null = null
    if (promoCode) {
      const upperCode = promoCode.toUpperCase().trim()
      couponId = await getOrCreateCoupon(stripe, upperCode)
    }

    //const success_url = `${req.nextUrl.origin}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin
    const success_url = `${baseUrl}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`
    const cancel_url = `${baseUrl}/?status=cancelled`
    //const cancel_url = `${req.nextUrl.origin}/cart?status=cancelled`

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
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
        items: JSON.stringify(items.map((i) => ({ id: i.id, sku:i.sku, qty: i.quantity, price: i.price }))),
        customer_name: name || '',
        customer_phone: phone || '',
        promo_code: promoCode || '',
      },
    }

    // Apply discount coupon if valid
    if (couponId) {
      sessionParams.discounts = [{ coupon: couponId }]
    }

    const session = await stripe.checkout.sessions.create(sessionParams)


    // Insert provisional order (optional, requires service role and table)
    try {
      if (supabaseAdmin) {
        const rawTotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
        const total = saleActive
          ? items.reduce((s, i) => s + getSalePrice(i.price) * i.quantity, 0)
          : rawTotal

        await supabaseAdmin.from('orders').insert({
          stripe_session_id: session.id,
          status: 'created',
          total_cents: total,
          customer_email: email || null,
          shipping_name: name || null,
          shipping_phone: phone || null,
          items,
          // Optional: track sale info
          metadata: saleActive ? {
            sale_applied: true,
            discount_percent: discountPercent,
            original_total_cents: rawTotal
          } : null
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
