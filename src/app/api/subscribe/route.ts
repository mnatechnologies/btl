import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseServer'
import { sendWelcomeEmail } from '@/lib/ses'

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

    try {
      const { error: insertError } = await supabaseAdmin.from('newsletter_subscriptions').insert({
        email,
        subscribed_at: new Date().toISOString()
      })
      if (insertError) throw insertError
    } catch (e) {
      const error = e as { code?: string; message?: string }
      // If email already exists, return success but don't send email
      if (error?.code === '23505') {
        return NextResponse.json({ message: 'You are already subscribed!' }, { status: 200 })
      }
      return NextResponse.json({ error: error?.message || 'Unable to process subscription.' }, { status: 500 })
    }

    // Send welcome email via SES (only for new subscribers)
    try {
      await sendWelcomeEmail({ email })
    } catch (emailError) {
      console.error('Failed to send welcome email via SES:', emailError)
      // Still return success - subscription is saved
    }

    return NextResponse.json({ message: 'Subscription successful. Check your email!' }, { status: 200 })
  } catch (e) {
    const error = e as { message?: string }
    return NextResponse.json({ error: error?.message || 'Unexpected error.' }, { status: 500 })
  }
}
