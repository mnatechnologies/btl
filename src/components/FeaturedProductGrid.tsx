'use client'

import { useEffect, useState } from 'react'
import { getFeaturedProducts } from '@/lib/products'
import { Product } from '@/types/Product'
import ProductGrid from '@/components/ProductGrid'

type GridLayout = 'left-large' | 'right-large'

type FeaturedProductGridProps = {
  productIndex: number
  layout?: GridLayout
  title?: string
}

export default function FeaturedProductGrid({
  productIndex,
  layout = 'left-large',
  title
}: FeaturedProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts = await getFeaturedProducts()
        setProducts(fetchedProducts)
      } catch (error) {
        console.error('Error fetching featured products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) {
    return (
      <section className="mx-auto mt-4 max-w-none w-[95vw] sm:w-[90vw] lg:w-[85vw] xl:w-[80vw] 2xl:w-[75vw] px-4 pb-4">
        <div className="py-6 text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white">
            {title || 'Featured Collection'}
          </h2>
        </div>
        <div className="flex justify-center items-center py-12">
          <p className="text-white">Loading products...</p>
        </div>
      </section>
    )
  }

  if (!products?.length || !products[productIndex]) {
    return (
      <section className="mx-auto mt-4 max-w-none w-[95vw] sm:w-[90vw] lg:w-[85vw] xl:w-[80vw] 2xl:w-[75vw] px-4 pb-4">
        <div className="py-6 text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white">
            {title || 'Featured Collection'}
          </h2>
        </div>
        <div className="flex justify-center items-center py-12">
          <p className="text-white">No products available.</p>
        </div>
      </section>
    )
  }

  const product = products[productIndex]
  const uniqueColors = [...new Set(product.variants.map(v => v.color))]

  const gridItems = uniqueColors.slice(0, 4).map((color, index) => {
    const variantWithColor = product.variants.find(v => v.color === color)

    let image: string

    if (index === 0) {
      // Large item: try to find image with "-main" in the color name, or use first image
      const mainImage = variantWithColor?.images?.find(img => img.includes(`${color.toLowerCase()}-main`))
      image = mainImage || variantWithColor?.images?.[0] || product.images?.[0] || '/images/btl-logo-white.jpg'
    } else {
      // Small items: use second image (index 1)
      image = variantWithColor?.images?.[1] || product.images?.[1] || variantWithColor?.images?.[0] || product.images?.[0] || '/images/btl-logo-white.jpg'
    }

    return {
      handle: product.name.toLowerCase().replace(/\s+/g, '-'),
      title: `${product.name} – ${color}`,
      image,
      price: variantWithColor?.price || product.basePrice,
      color
    }
  })

  const productGroup = {
    name: product.name,
    handle: product.name.toLowerCase().replace(/\s+/g, '-'),
    items: gridItems
  }

  return <ProductGrid groups={[productGroup]} layout={layout} />
}
