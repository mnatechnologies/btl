import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseServer'
import { sendShippingNotificationEmail } from '@/lib/ses'

export async function POST(req: NextRequest) {
  try {
    // Check admin authentication
    const authHeader = req.headers.get('Authorization')
    const token = authHeader?.replace('Bearer ', '')
    if (token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { orderId, trackingNumber } = body

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 })
    }

    if (!trackingNumber) {
      return NextResponse.json({ error: 'Tracking number is required' }, { status: 400 })
    }

    // Fetch the order from database
    const { data: order, error: fetchError } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (fetchError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Update the order with tracking information
    const { data: updatedOrder, error: updateError } = await supabaseAdmin
      .from('orders')
      .update({
        tracking_number: trackingNumber,
        status: 'shipped',
        updated_at: new Date().toISOString(),
      })
      .eq('id', orderId)
      .select()
      .single()

    if (updateError) {
      console.error('Failed to update order:', updateError)
      return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
    }

    // Send shipping notification email to customer
    if (order.customer_email && order.shipping_name) {
      try {
        await sendShippingNotificationEmail({
          email: order.customer_email,
          orderNumber: orderId.toString().padStart(6, '0'),
          customerName: order.shipping_name,
          trackingNumber,
          shippingAddress: {
            name: order.shipping_name,
            line1: order.shipping_address_line1 || '',
            line2: order.shipping_address_line2 || undefined,
            suburb: order.shipping_suburb || '',
            state: order.shipping_state || '',
            postcode: order.shipping_postcode || '',
            country: order.shipping_country || 'Australia',
          },
        })
        console.log('📧 Shipping notification email sent to:', order.customer_email)
      } catch (emailError) {
        console.error('Failed to send shipping notification email:', emailError)
        // Don't fail if email fails
      }
    }

    return NextResponse.json({
      success: true,
      trackingNumber,
      order: updatedOrder
    })

  } catch (error: unknown) {
    const err = error as { message?: string }
    console.error('Add tracking error:', error)
    return NextResponse.json({ 
      error: err.message || 'Failed to add tracking' 
    }, { status: 500 })
  }
}