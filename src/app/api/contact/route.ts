import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseServer'
import { sendContactEmail } from '@/lib/ses'
import { checkCSRF } from '@/lib/csrf'

/**
 * ✅ RFC 5322 compliant email validation
 * Validates proper email format
 */
function isValidEmail(email: string) {
  // More robust email validation regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

  return emailRegex.test(email) &&
         email.length <= 254 && // RFC 5321 limit
         email.includes('@') &&
         email.split('@')[1].includes('.')
}

export async function POST(req: NextRequest) {
  // ✅ CSRF PROTECTION: Validate request origin
  const csrfError = checkCSRF(req)
  if (csrfError) {
    return NextResponse.json({ error: csrfError.error }, { status: csrfError.status })
  }

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
