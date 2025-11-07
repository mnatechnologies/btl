import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/supabaseServer'

const resend = new Resend(process.env.RESEND_API_KEY)

function isValidEmail(email: string) {
  return /.+@.+\..+/.test(email)
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }
    const { email } = body as { email?: string }

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const discountCode = 'WELCOME10'


    try {
      const { error: insertError } = await supabaseAdmin.from('newsletter_subscriptions').insert({
        email,
        discount_code: discountCode,
        subscribed_at: new Date().toISOString()
      })
      if (insertError) throw insertError
    } catch (e) {
      const error = e as { code?: string; message?: string }
      // If email already exists, still return success
      if (error?.code === '23505') {
        return NextResponse.json({ message: 'You are already subscribed. Check your email for your discount code!' }, { status: 200 })
      }
      return NextResponse.json({ error: error?.message || 'Unable to process subscription.' }, { status: 500 })
    }

    // Try to send welcome email via Resend
    try {
      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'Built To Last <noreply@yourdomain.com>',
          to: email,
          subject: 'Welcome to Built To Last - Your Discount Code',
          html: `
            <h2>Welcome to Built To Last!</h2>
            <p>Thank you for subscribing to our newsletter.</p>
            <p>Use code <strong>${discountCode}</strong> at checkout to get 10% off your first order.</p>
            <p>Happy shopping!</p>
            <p>- The Built To Last Team</p>
          `,
        })
      }
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError)
      // Still return success even if email fails - subscription is saved
    }

    return NextResponse.json({ message: 'Subscription successful. Check your email for your discount code!' }, { status: 200 })
  } catch (e) {
    const error = e as { message?: string }
    return NextResponse.json({ error: error?.message || 'Unexpected error.' }, { status: 500 })
  }
}

