import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseServer'
import { createLabelForOrder } from '@/lib/auspost'
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
    const { orderId, shippingAddress, customerName, customerPhone } = body

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 })
    }

    if (!shippingAddress || !shippingAddress.line1 || !shippingAddress.suburb || 
        !shippingAddress.state || !shippingAddress.postcode) {
      return NextResponse.json({ 
        error: 'Complete shipping address is required (line1, suburb, state, postcode)' 
      }, { status: 400 })
    }

    if (!customerName) {
      return NextResponse.json({ error: 'Customer name is required' }, { status: 400 })
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

    // Parse items if they're stored as JSON
    let items = order.items
    if (typeof items === 'string') {
      try {
        items = JSON.parse(items)
      } catch (e) {
        console.error('Failed to parse order items:', e)
      }
    }

    // Format items for AusPost API
    const orderItems = Array.isArray(items) 
      ? items.map((item: { title?: string; name?: string; quantity?: number; qty?: number }) => ({
          description: item.title || item.name || 'Product',
          quantity: item.quantity || item.qty || 1
        }))
      : [{ description: 'Order Items', quantity: 1 }]

    // Generate the label using AusPost API
    const labelResult = await createLabelForOrder(orderId, {
      customerName,
      customerEmail: order.customer_email || '',
      customerPhone,
      shippingAddress: {
        line1: shippingAddress.line1,
        line2: shippingAddress.line2,
        suburb: shippingAddress.suburb,
        state: shippingAddress.state,
        postcode: shippingAddress.postcode,
        country: shippingAddress.country || 'AU'
      },
      items: orderItems
    })

    // Store the label PDF in a temporary location or return as base64
    const labelBase64 = labelResult.labelPdf.toString('base64')

    // Update the order with tracking information and shipping address
    const { data: updatedOrder, error: updateError } = await supabaseAdmin
      .from('orders')
      .update({
        tracking_number: labelResult.trackingId,
        status: 'fulfilled',
        updated_at: new Date().toISOString(),
        // Store AusPost shipment data
        auspost_shipment_id: labelResult.shipmentId,
        auspost_consignment_id: labelResult.consignmentId,
        // Store shipping address
        shipping_name: customerName,
        shipping_phone: customerPhone,
        shipping_address_line1: shippingAddress.line1,
        shipping_address_line2: shippingAddress.line2,
        shipping_suburb: shippingAddress.suburb,
        shipping_state: shippingAddress.state,
        shipping_postcode: shippingAddress.postcode,
        shipping_country: shippingAddress.country || 'AU'
      })
      .eq('id', orderId)
      .select()
      .single()

    if (updateError) {
      console.error('Failed to update order:', updateError)
      // Even if update fails, we still return the label
    }

    // Send shipping notification email to customer
    if (order.customer_email && labelResult.trackingId) {
      try {
        await sendShippingNotificationEmail({
          email: order.customer_email,
          orderNumber: orderId.toString().padStart(6, '0'),
          customerName,
          trackingNumber: labelResult.trackingId,
          shippingAddress: {
            name: customerName,
            line1: shippingAddress.line1,
            line2: shippingAddress.line2,
            suburb: shippingAddress.suburb,
            state: shippingAddress.state,
            postcode: shippingAddress.postcode,
            country: shippingAddress.country || 'Australia',
          },
        })
        console.log('📧 Shipping notification email sent to:', order.customer_email)
      } catch (emailError) {
        console.error('Failed to send shipping notification email:', emailError)
        // Don't fail the label generation if email fails
      }
    }

    return NextResponse.json({
      success: true,
      trackingId: labelResult.trackingId,
      shipmentId: labelResult.shipmentId,
      consignmentId: labelResult.consignmentId,
      labelPdf: labelBase64,
      order: updatedOrder || order
    })

  } catch (error: unknown) {
    const err = error as { message?: string }
    console.error('Label generation error:', error)
    return NextResponse.json({ 
      error: err.message || 'Failed to generate label' 
    }, { status: 500 })
  }
}
