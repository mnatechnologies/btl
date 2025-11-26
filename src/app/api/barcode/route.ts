import { NextRequest, NextResponse } from 'next/server'
 // @ts-expect-error - bwip-js has no types
import bwipjs from 'bwip-js'

// GET - Generate barcode image for a SKU
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const sku = searchParams.get('sku')
  const format = searchParams.get('format') || 'png' // png or svg

  if (!sku) {
    return NextResponse.json({ error: 'SKU is required' }, { status: 400 })
  }

  try {
    if (format === 'svg') {
      // Generate SVG
      const svg = bwipjs.toSVG({
        bcid: 'code128',
        text: sku,
        scale: 3,
        height: 12,
        includetext: true,
        textxalign: 'center',
        textsize: 10,
        textyoffset: 1,
      })

      return new NextResponse(svg, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=31536000',
        },
      })
    } else {
      // Generate PNG
      const png = await bwipjs.toBuffer({
        bcid: 'code128',
        text: sku,
        scale: 3,
        height: 12,
        includetext: true,
        textxalign: 'center',
        textsize: 10,
        textyoffset: 1,
      })

      return new NextResponse(png, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=31536000',
        },
      })
    }
  } catch (error) {
    console.error('Barcode generation error:', error)
    return NextResponse.json({ error: 'Failed to generate barcode' }, { status: 500 })
  }
}

