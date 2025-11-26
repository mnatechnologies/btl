import { NextRequest, NextResponse } from 'next/server'
import { getPromoCode } from '@/lib/promoCodes'

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json()
    
    if (!code || typeof code !== 'string') {
      return NextResponse.json({ valid: false, error: 'No code provided' }, { status: 400 })
    }

    const promo = getPromoCode(code)

    if (!promo) {
      return NextResponse.json({ valid: false, error: 'Invalid promo code' }, { status: 400 })
    }

    return NextResponse.json({
      valid: true,
      code: code.toUpperCase().trim(),
      discount: promo.discount,
      type: promo.type,
      description: promo.description
    })
  } catch {
    return NextResponse.json({ valid: false, error: 'Server error' }, { status: 500 })
  }
}
