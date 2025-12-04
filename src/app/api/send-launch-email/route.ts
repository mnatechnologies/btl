/**
 * Launch Email API Endpoint
 *
 * Sends launch announcement email to all newsletter subscribers
 *
 * Usage:
 *   POST /api/send-launch-email
 *   Headers: { "Authorization": "Bearer YOUR_ADMIN_TOKEN" }
 *
 * Or via curl:
 *   curl -X POST https://yourdomain.com/api/send-launch-email \
 *     -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
 *
 * Security: Requires ADMIN_TOKEN for authentication
 */

import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseServer'
import { sendEmail } from '@/lib/ses'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://btlclothing.com'

function getLaunchEmailHTML(): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #000; color: #fff;">
      <!-- Header -->
      <div style="padding: 40px 30px; text-align: center;">
        <img src="${SITE_URL}/images/btl-logo-white-email.jpg" alt="Built To Last" style="max-width: 150px; margin-bottom: 30px;">
        <h1 style="font-size: 36px; margin: 0 0 15px; font-weight: bold; letter-spacing: 1px;">WE'RE LIVE!</h1>
        <p style="font-size: 18px; margin: 0; color: #ccc;">Built To Last is officially launched</p>
      </div>

      <!-- Hero Image -->
      <div style="width: 100%; background: #111;">
        <img src="${SITE_URL}/Photos/Products/Legacy/RVN/raven-main.jpg" alt="Built To Last Collection" style="width: 100%; height: auto; display: block;">
      </div>

      <!-- Content -->
      <div style="padding: 40px 30px;">
        <p style="font-size: 16px; line-height: 1.8; margin: 0 0 20px;">
          Thank you for being part of our journey from the very beginning.
        </p>
        <p style="font-size: 16px; line-height: 1.8; margin: 0 0 20px;">
          Today marks the official launch of Built To Last - Luxury Comfortwear designed to transcend trends and stand the test of time.
        </p>
        <p style="font-size: 16px; line-height: 1.8; margin: 0 0 30px;">
          Our debut collection is now available, featuring three signature pieces:
        </p>

        <!-- Products -->
        <div style="background: #111; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #333;">
              <strong style="font-size: 18px;">Legacy Tee</strong>
              <p style="margin: 5px 0 0; color: #ccc; font-size: 14px;">A timeless essential crafted with premium materials</p>
            </li>
            <li style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #333;">
              <strong style="font-size: 18px;">Monolith Tee (Coming Soon)</strong>
              <p style="margin: 5px 0 0; color: #ccc; font-size: 14px;">Designed to transcend trends with enduring quality</p>
            </li>
            <li style="margin-bottom: 0;">
              <strong style="font-size: 18px;">Eternal Tee (Coming Soon)</strong>
              <p style="margin: 5px 0 0; color: #ccc; font-size: 14px;">Bold, iconic, and built to make a statement</p>
            </li>
          </ul>
        </div>

       

        <!-- CTA Button -->
        <div style="text-align: center; margin: 40px 0;">
          <a href="${SITE_URL}/store" style="display: inline-block; background: #fff; color: #000; padding: 18px 50px; text-decoration: none; font-weight: bold; font-size: 16px; border-radius: 4px; letter-spacing: 1px;">
            SHOP THE COLLECTION
          </a>
        </div>

        <!-- Features -->
        <div style="border-top: 1px solid #333; padding-top: 30px; margin-top: 30px;">
          <div style="display: table; width: 100%;">
            <div style="display: table-cell; padding: 15px; text-align: center; border-right: 1px solid #333;">
              <p style="margin: 0; font-size: 14px; color: #ccc;">Free Shipping</p>
              <p style="margin: 5px 0 0; font-size: 12px; color: #888;">Orders over $100</p>
            </div>
            <div style="display: table-cell; padding: 15px; text-align: center; border-right: 1px solid #333;">
              <p style="margin: 0; font-size: 14px; color: #ccc;">Premium Quality</p>
              <p style="margin: 5px 0 0; font-size: 12px; color: #888;">Crafted to last</p>
            </div>
            <div style="display: table-cell; padding: 15px; text-align: center;">
              <p style="margin: 0; font-size: 14px; color: #ccc;">Fast Delivery</p>
              <p style="margin: 5px 0 0; font-size: 12px; color: #888;">2-5 business days</p>
            </div>
          </div>
        </div>

        <!-- Closing -->
        <p style="font-size: 14px; line-height: 1.6; color: #ccc; margin-top: 40px; text-align: center;">
          Thank you for your support. This is just the beginning.
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #0a0a0a; padding: 30px; text-align: center; border-top: 1px solid #222;">
        <p style="margin: 0; font-size: 14px; color: #888;">Built To Last | Luxury Comfortwear</p>
        <p style="margin: 10px 0 0; font-size: 12px; color: #666;">
          <a href="${SITE_URL}" style="color: #666; text-decoration: none;">${SITE_URL.replace('https://', '')}</a>
        </p>
        <p style="margin: 15px 0 0; font-size: 11px; color: #555;">
          You're receiving this email because you subscribed to our newsletter.
        </p>
      </div>
    </div>
  `
}

export async function POST(request: Request) {
  try {
    // Authentication check
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token || token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin token required.' },
        { status: 401 }
      )
    }

    // Check for test mode
    let testEmail: string | null = null
    try {
      const body = await request.json()
      testEmail = body.testEmail || null
    } catch {
      // No body provided, production mode
    }

    // If test mode, send only to test email
    if (testEmail) {
      console.log(`🧪 Test mode: Sending to ${testEmail} only`)
      try {
        await sendEmail({
          to: testEmail,
          subject: "🚀 We're Live! Built To Last Official Launch [TEST]",
          html: getLaunchEmailHTML(),
        })
        return NextResponse.json(
          {
            message: 'Test email sent successfully',
            mode: 'test',
            sent: 1,
            testEmail,
          },
          { status: 200 }
        )
      } catch (error) {
        console.error('Test email failed:', error)
        return NextResponse.json(
          { error: 'Failed to send test email' },
          { status: 500 }
        )
      }
    }

    // Production mode: Fetch all newsletter subscribers
    const { data: subscribers, error: fetchError } = await supabaseAdmin
      .from('newsletter_subscriptions')
      .select('email')
      .order('subscribed_at', { ascending: true })

    if (fetchError) {
      console.error('Error fetching subscribers:', fetchError)
      return NextResponse.json(
        { error: 'Failed to fetch subscribers from database' },
        { status: 500 }
      )
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json(
        {
          message: 'No subscribers found',
          total: 0,
          sent: 0,
          failed: 0
        },
        { status: 200 }
      )
    }

    console.log(`Starting launch email campaign for ${subscribers.length} subscribers...`)

    let successCount = 0
    let failCount = 0
    const failedEmails: string[] = []

    // Send emails with rate limiting
    for (const subscriber of subscribers) {
      try {
        await sendEmail({
          to: subscriber.email,
          subject: "🚀 We're Live! Built To Last Official Launch",
          html: getLaunchEmailHTML(),
        })
        successCount++
        console.log(`✅ Sent to ${subscriber.email}`)
      } catch (error) {
        console.error(`❌ Failed to send to ${subscriber.email}:`, error)
        failCount++
        failedEmails.push(subscriber.email)
      }

      // Rate limiting: 100ms between emails to avoid AWS SES throttling
      // AWS SES sandbox: 1 email/second, Production: up to 14 emails/second
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    console.log(`Campaign complete. Sent: ${successCount}, Failed: ${failCount}`)

    return NextResponse.json(
      {
        message: 'Launch email campaign completed',
        total: subscribers.length,
        sent: successCount,
        failed: failCount,
        failedEmails: failedEmails.length > 0 ? failedEmails : undefined,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Launch email error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
