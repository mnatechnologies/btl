import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Verify admin token (same as orders API)
function verifyToken(authHeader: string | null): boolean {
  if (!authHeader?.startsWith('Bearer ')) return false
  const token = authHeader.split(' ')[1]
  // Simple token check - in production use JWT
  return token === process.env.ADMIN_TOKEN
}

// GET - Look up variant by SKU
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (!verifyToken(authHeader)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const sku = searchParams.get('sku')

  if (!sku) {
    // Return all variants if no SKU specified
    const { data: variants, error } = await supabase
      .from('product_variants')
      .select('*, products(name)')
      .order('sku')

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ variants })
  }

  // Look up specific SKU
  const { data: variant, error } = await supabase
    .from('product_variants')
    .select('*, products(name)')
    .eq('sku', sku.toUpperCase())
    .single()

  if (error) {
    return NextResponse.json({ error: 'Variant not found', sku }, { status: 404 })
  }

  return NextResponse.json({ variant })
}

// POST - Update inventory for a variant
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (!verifyToken(authHeader)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { sku, inventory, adjustment } = await req.json()

    if (!sku) {
      return NextResponse.json({ error: 'SKU is required' }, { status: 400 })
    }

    // Get current variant
    const { data: variant, error: fetchError } = await supabase
      .from('product_variants')
      .select('*')
      .eq('sku', sku.toUpperCase())
      .single()

    if (fetchError || !variant) {
      return NextResponse.json({ error: 'Variant not found', sku }, { status: 404 })
    }

    // Calculate new inventory
    let newInventory: number
    if (typeof inventory === 'number') {
      // Set absolute value
      newInventory = inventory
    } else if (typeof adjustment === 'number') {
      // Adjust by delta
      newInventory = variant.inventory + adjustment
    } else {
      return NextResponse.json({ error: 'Either inventory or adjustment is required' }, { status: 400 })
    }

    // Ensure non-negative
    newInventory = Math.max(0, newInventory)

    // Update inventory
    const { data: updated, error: updateError } = await supabase
      .from('product_variants')
      .update({ inventory: newInventory, updated_at: new Date().toISOString() })
      .eq('sku', sku.toUpperCase())
      .select('*, products(name)')
      .single()

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      variant: updated,
      previousInventory: variant.inventory,
      newInventory
    })
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}

