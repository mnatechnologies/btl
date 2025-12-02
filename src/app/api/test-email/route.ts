import { sendEmail } from '@/lib/ses'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await sendEmail({
      to: 'mark@mnatechnologies.com.au', // Use a verified email
      subject: 'Test Email',
      html: '<h1>Test</h1>',
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
