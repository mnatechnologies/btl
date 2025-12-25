import { NextRequest, NextResponse } from 'next/server'
import { getPromoCode } from '@/lib/promoCodes'
import { isSaleActive } from '@/lib/saleConfig'

export async function POST(req: NextRequest) {
  try {
    const { code, totalCents } = await req.json()

    if (isSaleActive()) {
      return NextResponse.json({
        valid: false,
        error: 'Promo codes cannot be combined with Boxing Day sale'
      })
    }

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ valid: false, error: 'No code provided' }, { status: 400 })
    }

    const promo = getPromoCode(code)

    if (!promo) {
      return NextResponse.json({ valid: false, error: 'Invalid promo code' }, { status: 400 })
    }

    // Calculate discount amount
    let discountAmount = promo.discount

    if (promo.type === 'percentage' && totalCents && typeof totalCents === 'number') {
      // Calculate percentage discount based on cart total
      discountAmount = Math.round((totalCents * promo.discount) / 100)
    }

    return NextResponse.json({
      valid: true,
      code: code.toUpperCase().trim(),
      discount: discountAmount, // in cents
      type: promo.type,
      description: promo.description,
      percentage: promo.type === 'percentage' ? promo.discount : undefined
    })
  } catch {
    return NextResponse.json({ valid: false, error: 'Server error' }, { status: 500 })
  }
}
