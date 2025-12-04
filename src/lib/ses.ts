import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
import  escapeHtml  from 'escape-html'
import { calculateGST } from './gst'

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  throw new Error('AWS credentials are required: AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY')
}

const sesClient = new SESClient({
  region: process.env.AWS_SES_REGION || 'ap-southeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://btlclothing.com'
const FROM_EMAIL = process.env.SES_FROM_EMAIL!
const CONTACT_EMAIL = process.env.CONTACT_EMAIL!

if (!FROM_EMAIL) {
  throw new Error('SES_FROM_EMAIL is required')
}
if (!CONTACT_EMAIL) {
  throw new Error('CONTACT_EMAIL is required')
}



interface SendEmailParams {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
}

export async function sendEmail({ to, subject, html, replyTo }: SendEmailParams) {
  const toAddresses = Array.isArray(to) ? to : [to]

  const command = new SendEmailCommand({
    Source: FROM_EMAIL,
    Destination: {
      ToAddresses: toAddresses,
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: 'UTF-8',
      },
      Body: {
        Html: {
          Data: html,
          Charset: 'UTF-8',
        },
      },
    },
    ReplyToAddresses: replyTo ? [replyTo] : undefined,
  })

  return sesClient.send(command)
}

// Contact form - sends to store owner
export async function sendContactEmail({
  name,
  email,
  message,
}: {
  name: string
  email: string
  message: string
}) {
  // ✅ XSS PROTECTION: Escape all user input
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeMessage = escapeHtml(message)

  return sendEmail({
    to: CONTACT_EMAIL,
    subject: `New Contact Form Submission from ${safeName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #000;">New Contact Form Submission</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${safeMessage}</p>
        </div>
      </div>
    `,
    replyTo: email,
  })
}

// Newsletter subscription welcome email
export async function sendWelcomeEmail({
                                         email,
                                       }: {
  email: string
}) {
  return sendEmail({
    to: email,
    subject: 'Welcome to Built To Last',
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #000; color: #fff; padding: 40px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="${SITE_URL}/images/btl-logo-white.jpg" alt="Built To Last" style="max-width: 120px;">
          </div>
          <h1 style="text-align: center; font-size: 28px; margin-bottom: 20px;">Welcome to Built To Last!</h1>
          <p style="font-size: 16px; line-height: 1.6; text-align: center;">
            Thank you for subscribing to our newsletter. You'll be the first to know about new drops, exclusive offers, and more.
          </p>
          <div style="text-align: center; margin-top: 30px;">
            <a href="${SITE_URL}/store" style="display: inline-block; background: #fff; color: #000; padding: 15px 40px; text-decoration: none; font-weight: bold; border-radius: 4px;">
              Shop Now
            </a>
          </div>
          <p style="text-align: center; font-size: 12px; color: #888; margin-top: 40px;">
            Built To Last | Premium Streetwear
          </p>
        </div>
      `,
  })
}


interface OrderItem {
  name: string
  size?: string
  quantity: number
  price_cents: number
}

interface OrderConfirmationParams {
  email: string
  orderNumber: string
  orderDate: string
  customerName: string
  items: OrderItem[]
  subtotalCents: number
  shippingCents: number
  discountCents?: number
  totalCents: number
  shippingAddress: {
    name: string
    line1: string
    line2?: string
    suburb: string
    state: string
    postcode: string
    country?: string
  }
}

// Order confirmation email
export async function sendOrderConfirmationEmail({
  email,
  orderNumber,
  orderDate,
  customerName,
  items,
  subtotalCents,
  shippingCents,
  discountCents = 0,
  totalCents,
  shippingAddress,
}: OrderConfirmationParams) {
  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`

  const subtotalGST = calculateGST(subtotalCents)
  const totalGST = calculateGST(totalCents)

  // ✅ XSS PROTECTION: Escape all user-provided data
  const safeCustomerName = escapeHtml(customerName)
  const safeOrderNumber = escapeHtml(orderNumber)
  const safeOrderDate = escapeHtml(orderDate)

  const itemsHtml = items
    .map(
      (item) => `
        <tr>
          <td style="padding: 15px 0; border-bottom: 1px solid #eee;">
            <strong>${escapeHtml(item.name)}</strong>
            ${item.size ? `<br><span style="color: #666; font-size: 14px;">Size: ${escapeHtml(item.size)}</span>` : ''}
          </td>
          <td style="padding: 15px 0; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
          <td style="padding: 15px 0; border-bottom: 1px solid #eee; text-align: right;">${formatPrice(item.price_cents * item.quantity)}</td>
        </tr>
      `
    )
    .join('')

  // Extract first name safely
  const firstName = escapeHtml(safeCustomerName.split(' ')[0])

  // ✅ XSS PROTECTION: Escape shipping address fields
  const safeShippingName = escapeHtml(shippingAddress.name)
  const safeShippingLine1 = escapeHtml(shippingAddress.line1)
  const safeShippingLine2 = shippingAddress.line2 ? escapeHtml(shippingAddress.line2) : ''
  const safeShippingSuburb = escapeHtml(shippingAddress.suburb)
  const safeShippingState = escapeHtml(shippingAddress.state)
  const safeShippingPostcode = escapeHtml(shippingAddress.postcode)
  const safeShippingCountry = shippingAddress.country ? escapeHtml(shippingAddress.country) : 'Australia'

  return sendEmail({
    to: email,
    subject: `Order Confirmed - #${safeOrderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fff; color: #000;">
        <!-- Header -->
        <div style="background: #000; color: #fff; padding: 30px; text-align: center;">
          <img src="${SITE_URL}/images/btl-logo-black.jpg" alt="Built To Last" style="max-width: 120px;">
          <h1 style="margin: 0; font-size: 24px;">Order Confirmed!</h1>
        </div>

        <!-- Content -->
        <div style="padding: 30px;">
          <p style="font-size: 16px; line-height: 1.6;">
            Hey ${firstName},
          </p>
          <p style="font-size: 16px; line-height: 1.6;">
            Thanks for your order! We've received it and are getting it ready for you.
          </p>

          <!-- Order Details -->
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
              <div>
                <p style="margin: 0; color: #666; font-size: 14px;">Order Number</p>
                <p style="margin: 5px 0 0; font-weight: bold; font-size: 18px;">#${safeOrderNumber}</p>
              </div>
              <div style="text-align: right;">
                <p style="margin: 0; color: #666; font-size: 14px;">Order Date</p>
                <p style="margin: 5px 0 0; font-size: 16px;">${safeOrderDate}</p>
              </div>
            </div>
          </div>
          
          <!-- Items -->
          <h3 style="margin-bottom: 15px;">Items Ordered</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="border-bottom: 2px solid #000;">
                <th style="text-align: left; padding: 10px 0;">Item</th>
                <th style="text-align: center; padding: 10px 0;">Qty</th>
                <th style="text-align: right; padding: 10px 0;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          
          <!-- Totals -->
          <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #000;">
            <table style="width: 100%;">
              <tr>
               <td style="padding: 5px 0; color: #666;">Subtotal (ex GST)</td>
               <td style="text-align: right; padding: 5px 0;">${formatPrice(subtotalGST.totalExGst)}</td>
              </tr>
              <tr>
               <td style="padding: 5px 0; color: #666;">GST (10%)</td>
               <td style="text-align: right; padding: 5px 0;">${formatPrice(subtotalGST.gstAmount)}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0;">Subtotal (inc GST)</td>
                <td style="text-align: right; padding: 5px 0;">${formatPrice(subtotalCents)}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0;">Shipping</td>
                <td style="text-align: right; padding: 5px 0;">${shippingCents === 0 ? 'FREE' : formatPrice(shippingCents)}</td>
              </tr>
              ${
                discountCents > 0
                ? `<tr>
                      <td style="padding: 5px 0; color: #16a34a;">Discount</td>
                      <td style="text-align: right; padding: 5px 0; color: #16a34a;">-${formatPrice(discountCents)}</td>
                  </tr>`
                : ''
              }
                <tr style="border-top: 2px solid #000;">
                  <td style="padding: 10px 0; font-weight: bold; font-size: 18px;">Total (inc GST)</td>
                  <td style="text-align: right; padding: 10px 0; font-weight: bold; font-size: 18px;">${formatPrice(totalCents)}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; font-size: 12px; color: #666;">Includes GST of</td>
                  <td style="text-align: right; padding: 5px 0; font-size: 12px; color: #666;">${formatPrice(totalGST.gstAmount)}</td>
                </tr>
              </table>
           </div>


          
          <!-- Shipping Address -->
          <div style="margin-top: 30px; padding: 20px; background: #f9f9f9; border-radius: 8px;">
            <h3 style="margin: 0 0 15px;">Shipping To</h3>
            <p style="margin: 0; line-height: 1.6;">
              ${safeShippingName}<br>
              ${safeShippingLine1}<br>
              ${safeShippingLine2 ? `${safeShippingLine2}<br>` : ''}
              ${safeShippingSuburb}, ${safeShippingState} ${safeShippingPostcode}<br>
              ${safeShippingCountry}
            </p>
          </div>
          
          <!-- Track Order Button -->
          <div style="text-align: center; margin-top: 30px;">
            <a href="${SITE_URL}/account" style="display: inline-block; background: #000; color: #fff; padding: 15px 40px; text-decoration: none; font-weight: bold; border-radius: 4px;">
              Track Your Order
            </a>
          </div>
          
          <!-- Footer Note -->
          <p style="margin-top: 30px; font-size: 14px; color: #666; line-height: 1.6;">
            We'll send you another email with tracking info once your order ships. 
            If you have any questions, just reply to this email or <a href="${SITE_URL}/contact" style="color: #000;">contact us</a>.
          </p>
        </div>
        
        <!-- Footer -->
        <div style="background: #000; color: #fff; padding: 25px; text-align: center;">
          <p style="margin: 0; font-size: 14px;">Built To Last | Premium Streetwear</p>
          <p style="margin: 10px 0 0; font-size: 12px; color: #888;">
            <a href="${SITE_URL}" style="color: #888;">${SITE_URL.replace('https://', '')}</a>
          </p>
        </div>
      </div>
    `,
  })
}

interface ShippingNotificationParams {
  email: string
  orderNumber: string
  customerName: string
  trackingNumber: string
  shippingAddress: {
    name: string
    line1: string
    line2?: string
    suburb: string
    state: string
    postcode: string
    country?: string
  }
}

// Shipping notification email
export async function sendShippingNotificationEmail({
  email,
  orderNumber,
  customerName,
  trackingNumber,
  shippingAddress,
}: ShippingNotificationParams) {
  const trackingUrl = `https://auspost.com.au/mypost/track/#/details/${trackingNumber}`

  return sendEmail({
    to: email,
    subject: `Your Order #${orderNumber} Has Shipped!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fff; color: #000;">
        <!-- Header -->
        <div style="background: #000; color: #fff; padding: 30px; text-align: center;">
          <img src="${SITE_URL}/images/btl-logo-black.jpg" alt="Built To Last" style="max-width: 120px;">
          <h1 style="margin: 0; font-size: 24px;">Your Order Is On Its Way!</h1>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px;">
          <p style="font-size: 16px; line-height: 1.6;">
            Hey ${customerName.split(' ')[0]},
          </p>
          <p style="font-size: 16px; line-height: 1.6;">
            Great news! Your order <strong>#${orderNumber}</strong> has been shipped and is on its way to you.
          </p>
          
          <!-- Tracking Info -->
          <div style="background: #f9f9f9; padding: 25px; border-radius: 8px; margin: 25px 0; text-align: center;">
            <p style="margin: 0 0 10px; color: #666; font-size: 14px;">Your Tracking Number</p>
            <p style="font-size: 24px; font-weight: bold; letter-spacing: 2px; margin: 0 0 20px;">${trackingNumber}</p>
            <a href="${trackingUrl}" style="display: inline-block; background: #000; color: #fff; padding: 15px 40px; text-decoration: none; font-weight: bold; border-radius: 4px;">
              Track Package
            </a>
          </div>
          
          <!-- Shipping Details -->
          <div style="margin-top: 30px; padding: 20px; background: #f9f9f9; border-radius: 8px;">
            <h3 style="margin: 0 0 15px;">Shipping To</h3>
            <p style="margin: 0; line-height: 1.6;">
              ${shippingAddress.name}<br>
              ${shippingAddress.line1}<br>
              ${shippingAddress.line2 ? `${shippingAddress.line2}<br>` : ''}
              ${shippingAddress.suburb}, ${shippingAddress.state} ${shippingAddress.postcode}<br>
              ${shippingAddress.country || 'Australia'}
            </p>
          </div>
          
          <!-- Delivery Estimate -->
          <div style="margin-top: 25px; padding: 20px; border: 2px solid #000; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #666;">Estimated Delivery</p>
            <p style="margin: 5px 0 0; font-size: 18px; font-weight: bold;">2-5 Business Days</p>
            <p style="margin: 10px 0 0; font-size: 13px; color: #666;">
              Delivery times may vary based on your location. Track your package for real-time updates.
            </p>
          </div>
          
          <!-- Footer Note -->
          <p style="margin-top: 30px; font-size: 14px; color: #666; line-height: 1.6;">
            If you have any questions about your delivery, feel free to <a href="${SITE_URL}/contact" style="color: #000;">contact us</a> or track your package using the link above.
          </p>
        </div>
        
        <!-- Footer -->
        <div style="background: #000; color: #fff; padding: 25px; text-align: center;">
          <p style="margin: 0; font-size: 14px;">Built To Last | Premium Streetwear</p>
          <p style="margin: 10px 0 0; font-size: 12px; color: #888;">
            <a href="${SITE_URL}" style="color: #888;">${SITE_URL.replace('https://', '')}</a>
          </p>
        </div>
      </div>
    `,
  })
}
