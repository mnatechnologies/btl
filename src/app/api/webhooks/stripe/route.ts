import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseAdmin } from '@/lib/supabaseServer'
import { sendOrderConfirmationEmail } from '@/lib/ses'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

interface OrderItem {
  id: string
  title: string
  price: number
  quantity: number
  sku?: string
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    if (!webhookSecret) {
      // Log internally but don't expose details to client
      console.error('[WEBHOOK] STRIPE_WEBHOOK_SECRET not configured')
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      // Don't expose signature validation details to potential attacker
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    // ✅ REPLAY PROTECTION: Check if event already processed
    const { data: existingEvent } = await supabaseAdmin
      .from('webhook_events')
      .select('id')
      .eq('event_id', event.id)
      .single()

    if (existingEvent) {
      // Event already processed - prevent replay attack
      return NextResponse.json({ received: true }, { status: 200 })
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const sessionFromWebhook = event.data.object as Stripe.Checkout.Session

      let items: { id: string; sku: string; qty: number; price: number }[] = []
      try {
        if (sessionFromWebhook.metadata?.items) {
          items = JSON.parse(sessionFromWebhook.metadata.items)
        }
      } catch (e) {
        console.error('[WEBHOOK] Failed to parse items from metadata')
      }

      // ✅ ATOMIC INVENTORY DEDUCTION - prevents race conditions
      if (supabaseAdmin && items.length > 0) {
        for (const item of items) {
          const { data, error } = await supabaseAdmin
            .rpc('deduct_inventory', {
              p_sku: item.sku,
              p_quantity: item.qty
            })

          if (error) {
            console.error('[WEBHOOK] Failed to deduct inventory for SKU:', item.sku)
          } else if (data && data.length > 0 && !data[0].success) {
            console.error('[WEBHOOK] Inventory deduction failed:', data[0].message)
          }
        }
      }

      try {
        // ✅ IMPORTANT: Retrieve the full session with expanded data
        // The webhook event doesn't include customer_details or shipping_details by default
        const session = await stripe.checkout.sessions.retrieve(sessionFromWebhook.id, {
          expand: ['customer_details', 'line_items', 'total_details']
        })


        // Extract shipping and customer details
        const shippingDetails = session.shipping_details
        const customerDetails = session.customer_details

        // Prepare update data
        const updateData: Record<string, unknown> = {
          status: 'paid',
          updated_at: new Date().toISOString(),
        }

        // Add customer email
        if (customerDetails?.email) {
          updateData.customer_email = customerDetails.email
        }

        // Add customer name from shipping or customer details
        if (shippingDetails?.name) {
          updateData.shipping_name = shippingDetails.name
        } else if (customerDetails?.name) {
          updateData.shipping_name = customerDetails.name
        }

        // Add phone number
        if (customerDetails?.phone) {
          updateData.shipping_phone = customerDetails.phone
        }

        // Add shipping address if available
        if (shippingDetails?.address) {
          const addr = shippingDetails.address
          updateData.shipping_address_line1 = addr.line1 || null
          updateData.shipping_address_line2 = addr.line2 || null
          updateData.shipping_suburb = addr.city || null
          updateData.shipping_state = addr.state || null
          updateData.shipping_postcode = addr.postal_code || null
          updateData.shipping_country = addr.country || 'AU'
        }

        // Update the order in the database
        const { data: order, error: updateError } = await supabaseAdmin
          .from('orders')
          .update(updateData)
          .eq('stripe_session_id', session.id)
          .select()
          .single()

        if (updateError) {
          console.error('[WEBHOOK] Failed to update order for session:', session.id)
          return NextResponse.json({ error: 'Processing error' }, { status: 500 })
        }

        // Send order confirmation email
        if (customerDetails?.email) {
          try {
            // Parse items - may be stored as JSON string or array
            let items: OrderItem[] = []
            if (typeof order.items === 'string') {
              try {
                items = JSON.parse(order.items)
              } catch {
                console.error('[WEBHOOK] Failed to parse order items JSON')
              }
            } else if (Array.isArray(order.items)) {
              items = order.items as OrderItem[]
            }
            
            const customerName = shippingDetails?.name || customerDetails?.name || 'Customer'
            const shippingAddress = shippingDetails?.address
            
            // Calculate totals from session
            const subtotalCents = session.amount_subtotal || 0
            const totalCents = session.amount_total || 0
            const shippingCents = (session.shipping_cost?.amount_total) || 0
            const discountCents = (session.total_details?.amount_discount) || 0

            await sendOrderConfirmationEmail({
              email: customerDetails.email,
              orderNumber: order.id.toString().padStart(6, '0'),
              orderDate: new Date(order.created_at).toLocaleDateString('en-AU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }),
              customerName,
              items: items.map((item) => {
                // Extract size from SKU if present (e.g., "tshirt-black-L" -> "L")
                const sizePart = item.sku?.split('-').pop()
                const size = sizePart && ['XS', 'S', 'M', 'L', 'XL'].includes(sizePart.toUpperCase())
                  ? sizePart.toUpperCase()
                  : undefined

                return {
                  name: item.title,
                  size,
                  quantity: item.quantity,
                  price_cents: item.price,
                }
              }),
              subtotalCents,
              shippingCents,
              discountCents,
              totalCents,
              shippingAddress: {
                name: customerName,
                line1: shippingAddress?.line1 || '',
                line2: shippingAddress?.line2 || undefined,
                suburb: shippingAddress?.city || '',
                state: shippingAddress?.state || '',
                postcode: shippingAddress?.postal_code || '',
                country: shippingAddress?.country || 'Australia',
              },
            })

          } catch (emailError) {
            console.error('[WEBHOOK] Failed to send order confirmation email')
            // Don't fail the webhook - order is still processed
          }
        }

        // ✅ REPLAY PROTECTION: Mark event as processed
        await supabaseAdmin
          .from('webhook_events')
          .insert({
            event_id: event.id,
            event_type: event.type,
          })

        return NextResponse.json({ received: true })
      } catch (error) {
        console.error('[WEBHOOK] Error processing checkout.session.completed')
        return NextResponse.json({ error: 'Processing error' }, { status: 500 })
      }
    }

    // ✅ REPLAY PROTECTION: Mark other events as processed
    await supabaseAdmin
      .from('webhook_events')
      .insert({
        event_id: event.id,
        event_type: event.type,
      })

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[WEBHOOK] Handler error')
    return NextResponse.json({ error: 'Request error' }, { status: 500 })
  }
}
