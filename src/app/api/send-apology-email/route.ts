/**
 * Apology Email - Early Launch Announcement
 */

import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseServer'
import { sendEmail } from '@/lib/ses'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://btlclothing.com'

function getApologyEmailHTML(): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #000; color: #fff;">
      <!-- Header -->
      <div style="padding: 40px 30px; text-align: center;">
        <img src="${SITE_URL}/images/btl-logo-white-email.jpg" alt="Built To Last" style="max-width: 150px; margin-bottom: 30px;">
        <h1 style="font-size: 32px; margin: 0 0 15px; font-weight: bold; letter-spacing: 1px;">Our Apologies</h1>
        <p style="font-size: 16px; margin: 0; color: #ccc;">A message from the Built To Last team</p>
      </div>

      <!-- Content -->
      <div style="padding: 40px 30px;">
        <p style="font-size: 16px; line-height: 1.8; margin: 0 0 20px;">
          Hey there,
        </p>
        <p style="font-size: 16px; line-height: 1.8; margin: 0 0 20px;">
          We got a little too excited and sent you our launch email a bit early. We're still putting the finishing touches on everything before we officially go live.
        </p>
        <p style="font-size: 16px; line-height: 1.8; margin: 0 0 30px;">
          We'll send you another email when we're truly ready to launch. Thank you for your patience and for being part of our journey from day one.
        </p>

        <!-- Message Box -->
        <div style="background: #111; padding: 25px; border-radius: 8px; border-left: 4px solid #667eea; margin-bottom: 30px;">
          <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #ccc;">
            <strong style="color: #fff;">Launch Time:</strong> We'll be going live very soon. Stay tuned for the real announcement!
          </p>
        </div>

        <!-- Closing -->
        <p style="font-size: 14px; line-height: 1.6; color: #ccc; margin-top: 30px;">
          Thanks for understanding,<br>
          <strong style="color: #fff;">The Built To Last Team</strong>
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #0a0a0a; padding: 30px; text-align: center; border-top: 1px solid #222;">
        <p style="margin: 0; font-size: 14px; color: #888;">Built To Last | Luxury Comfortwear</p>
        <p style="margin: 10px 0 0; font-size: 12px; color: #666;">
          <a href="${SITE_URL}" style="color: #666; text-decoration: none;">${SITE_URL.replace('https://', '')}</a>
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

    // Fetch all newsletter subscribers
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

    console.log(`Sending apology email to ${subscribers.length} subscribers...`)

    let successCount = 0
    let failCount = 0
    const failedEmails: string[] = []

    // Send emails with rate limiting
    for (const subscriber of subscribers) {
      try {
        await sendEmail({
          to: subscriber.email,
          subject: "Quick Update - Built To Last Launch",
          html: getApologyEmailHTML(),
        })
        successCount++
        console.log(`✅ Sent to ${subscriber.email}`)
      } catch (error) {
        console.error(`❌ Failed to send to ${subscriber.email}:`, error)
        failCount++
        failedEmails.push(subscriber.email)
      }

      // Rate limiting: 100ms between emails
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    console.log(`Apology campaign complete. Sent: ${successCount}, Failed: ${failCount}`)

    return NextResponse.json(
      {
        message: 'Apology email campaign completed',
        total: subscribers.length,
        sent: successCount,
        failed: failCount,
        failedEmails: failedEmails.length > 0 ? failedEmails : undefined,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Apology email error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
