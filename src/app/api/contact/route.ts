import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseServer'
import { sendContactEmail } from '@/lib/ses'

function isValidEmail(email: string) {
  return /.+@.+\..+/.test(email)
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }
    const { name, email, message } = body as { name?: string; email?: string; message?: string }

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 })
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }
    if (String(message).trim().length < 5) {
      return NextResponse.json({ error: 'Message is too short.' }, { status: 400 })
    }

    // Send email via SES
    try {
      await sendContactEmail({ name, email, message })
    } catch (emailError) {
      console.error('Failed to send email via SES:', emailError)
      // Continue - we'll still save to DB
    }

    // Save to database
    try {
      const { error: insertError } = await supabaseAdmin.from('contact_messages').insert({
        name,
        email,
        message
      })
      if (insertError) throw insertError
      return NextResponse.json({ message: 'Message received. We will reply shortly.' }, { status: 200 })
    } catch (e) {
      const error = e as { message?: string }
      return NextResponse.json({ error: error?.message || 'Unable to process your message.' }, { status: 500 })
    }
  } catch (e) {
    const error = e as { message?: string }
    return NextResponse.json({ error: error?.message || 'Unexpected error.' }, { status: 500 })
  }
}
