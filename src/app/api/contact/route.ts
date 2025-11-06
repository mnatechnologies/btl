import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseServer'

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

  
    try {
      if (supabaseAdmin) {
        const { data, error } = await supabaseAdmin.functions.invoke('send-contact-email', {
          body: { name, email, message }
        })
        if (!error) {
          return NextResponse.json({ message: data?.message || 'Message sent successfully.' }, { status: 200 })
        }
      }
    } catch {
      // fall through to DB capture
    }

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
