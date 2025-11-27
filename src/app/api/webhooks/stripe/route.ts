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
      return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET is not configured')
      return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      const error = err as { message?: string }
      console.error('Webhook signature verification failed:', error.message)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const sessionFromWebhook = event.data.object as Stripe.Checkout.Session

      try {
        // ✅ IMPORTANT: Retrieve the full session with expanded data
        // The webhook event doesn't include customer_details or shipping_details by default
        const session = await stripe.checkout.sessions.retrieve(sessionFromWebhook.id, {
          expand: ['customer_details', 'line_items', 'total_details']
        })

        console.log('📧 Customer Email:', session.customer_details?.email)
        console.log('👤 Customer Name:', session.customer_details?.name)
        console.log('📱 Customer Phone:', session.customer_details?.phone)
        console.log('📦 Shipping Details:', session.shipping_details)

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

        console.log('💾 Updating order with data:', updateData)

        // Update the order in the database
        const { data: order, error: updateError } = await supabaseAdmin
          .from('orders')
          .update(updateData)
          .eq('stripe_session_id', session.id)
          .select()
          .single()

        if (updateError) {
          console.error('❌ Failed to update order:', updateError)
          return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
        }

        console.log('✅ Order updated successfully:', order.id)

        // Send order confirmation email
        if (customerDetails?.email) {
          try {
            // Parse items - may be stored as JSON string or array
            let items: OrderItem[] = []
            if (typeof order.items === 'string') {
              try {
                items = JSON.parse(order.items)
              } catch {
                console.error('Failed to parse order items JSON')
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
                const size = sizePart && ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'].includes(sizePart.toUpperCase())
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
            console.log('📧 Order confirmation email sent to:', customerDetails.email)
          } catch (emailError) {
            console.error('❌ Failed to send order confirmation email:', emailError)
            // Don't fail the webhook - order is still processed
          }
        }

        return NextResponse.json({ received: true, orderId: order.id })
      } catch (error) {
        console.error('❌ Error processing webhook:', error)
        return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
      }
    }

    // Handle other event types if needed
    console.log('Unhandled event type:', event.type)
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
