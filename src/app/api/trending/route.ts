import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseServer'

interface OrderItem {
  sku: string
  quantity: number
}

interface TrendingVariant {
  handle: string
  color: string
}

export async function GET() {
  try {
    // Calculate 24 hours ago
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

    // Fetch paid orders from last 24 hours
    const { data: orders, error: ordersError } = await supabaseAdmin
      .from('orders')
      .select('items')
      .eq('status', 'paid')
      .gte('created_at', twentyFourHoursAgo)

    if (ordersError) throw ordersError

    // Aggregate sales by SKU prefix (product-color)
    const salesByPrefix: Record<string, number> = {}

    for (const order of orders || []) {
      // Handle items that might be stored as string or array
      let items: OrderItem[] = order.items
      if (typeof items === 'string') {
        try {
          items = JSON.parse(items)
        } catch {
          continue
        }
      }

      if (!Array.isArray(items)) continue

      for (const item of items) {
        if (!item.sku) continue

        // Extract prefix: "LEG-RVN-M" -> "LEG-RVN"
        const parts = item.sku.split('-')
        if (parts.length >= 2) {
          const prefix = `${parts[0]}-${parts[1]}`
          salesByPrefix[prefix] = (salesByPrefix[prefix] || 0) + (item.quantity || 1)
        }
      }
    }

    // Filter to trending (> 3 units sold)
    const trendingPrefixes = Object.entries(salesByPrefix)
      .filter(([, qty]) => qty > 3)
      .map(([prefix]) => prefix)

    if (trendingPrefixes.length === 0) {
      return NextResponse.json({ trending: [] })
    }

    // Get product and color info for trending prefixes
    // Query product_variants to map SKU prefixes back to product handles and colors
    const { data: variants, error: variantsError } = await supabaseAdmin
      .from('product_variants')
      .select('sku, color, product_id, products(name)')

    if (variantsError) throw variantsError

    // Build a map of prefix -> { handle, color }
    const prefixToVariant: Record<string, TrendingVariant> = {}

    for (const variant of variants || []) {
      if (!variant.sku) continue

      const parts = variant.sku.split('-')
      if (parts.length >= 2) {
        const prefix = `${parts[0]}-${parts[1]}`

        if (trendingPrefixes.includes(prefix) && !prefixToVariant[prefix]) {
          // Get product name and convert to handle
          // Handle both array and single object cases from Supabase
          const productData = variant.products as { name: string } | { name: string }[] | null
          let productName = ''
          if (Array.isArray(productData) && productData.length > 0) {
            productName = productData[0].name || ''
          } else if (productData && !Array.isArray(productData)) {
            productName = productData.name || ''
          }
          const handle = productName.toLowerCase().replace(/\s+/g, '-')

          prefixToVariant[prefix] = {
            handle,
            color: variant.color
          }
        }
      }
    }

    const trending = Object.values(prefixToVariant)

    return NextResponse.json({ trending })
  } catch (e) {
    console.error('Error fetching trending data:', e)
    return NextResponse.json({ trending: [] })
  }
}
