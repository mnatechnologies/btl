import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseServer'

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization') || ''
  const token = auth.replace('Bearer ', '')
  if (!token || token !== (process.env.ADMIN_TOKEN || '')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id, tracking_number, status } = await req.json() as { id?: string; tracking_number?: string; status?: string }
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const updates: { tracking_number?: string; status?: string } = {}
    if (typeof tracking_number === 'string') updates.tracking_number = tracking_number
    if (typeof status === 'string') updates.status = status

    const { data, error } = await supabaseAdmin
      .from('orders')
      .update(updates)
      .eq('id', id)
      .select('*')
      .single()

    if (error) throw error
    return NextResponse.json({ order: data })
  } catch (e) {
    const error = e as { message?: string }
    console.error(e)
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 })
  }
}
