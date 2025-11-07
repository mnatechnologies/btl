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

    // Try to send email via Resend
    try {
      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'Built To Last <noreply@yourdomain.com>',
          to: process.env.CONTACT_EMAIL || 'info@btlclothing.au',
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `,
          replyTo: email,
        })
      }
    } catch (emailError) {
      console.error('Failed to send email:', emailError)
      // Continue to save to DB even if email fails
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
