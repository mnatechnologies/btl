'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X, ShoppingBag, Check } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { getProductByHandle } from '@/lib/products'
import { Product, ProductVariant } from '@/types/Product'

interface QuickViewProps {
  isOpen: boolean
  onClose: () => void
  productHandle: string
  selectedColor: string
  productImage: string
}

const SIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']

export default function QuickView({ isOpen, onClose, productHandle, selectedColor, productImage }: QuickViewProps) {
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)

  const fetchProduct = useCallback(async () => {
    if (!productHandle) return
    setLoading(true)
    setSelectedSize(null)
    setAdded(false)
    try {
      const data = await getProductByHandle(productHandle)
      setProduct(data)
    } finally {
      setLoading(false)
    }
  }, [productHandle])

  useEffect(() => {
    if (isOpen) {
      fetchProduct()
    }
  }, [isOpen, fetchProduct])

  if (!isOpen) return null

  // Get variants for selected color
  const colorVariants = product?.variants.filter(v => v.color === selectedColor) || []
  
  // Get available sizes for this color
  const availableSizes = colorVariants.map(v => v.size)
  
  // Get selected variant
  const selectedVariant: ProductVariant | undefined = colorVariants.find(v => v.size === selectedSize)

  const handleAddToCart = () => {
    if (!selectedVariant || !product) return

    addItem({
      id: selectedVariant.id,
      title: `${product.name} — ${selectedColor} / ${selectedSize}`,
      price: Math.round(selectedVariant.price * 100),
      image: productImage,
      quantity: 1,
      sku: selectedVariant.sku,
    })

    setAdded(true)
    setTimeout(() => {
      onClose()
    }, 1000)
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-white dark:bg-neutral-900 rounded-lg shadow-2xl max-w-lg w-full pointer-events-auto overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
            <h2 className="text-lg font-semibold">Quick Add</h2>
            <button
              onClick={onClose}
              className="cursor-pointer p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin w-8 h-8 border-2 border-black dark:border-white border-t-transparent rounded-full" />
              </div>
            ) : product ? (
              <div className="flex gap-4">
                {/* Image */}
                <div className="w-32 h-32 relative flex-shrink-0 bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden">
                  <Image
                    src={productImage}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm">{selectedColor}</p>
                  <p className="font-medium mt-1">
                    ${(selectedVariant?.price || product.basePrice).toFixed(2)}
                  </p>

                  {/* Size Selector */}
                  <div className="mt-3">
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">Select Size</p>
                    <div className="flex flex-wrap gap-2">
                      {SIZES.map((size) => {
                        const isAvailable = availableSizes.includes(size)
                        const isSelected = selectedSize === size

                        return (
                          <button
                            key={size}
                            onClick={() => isAvailable && setSelectedSize(size)}
                            disabled={!isAvailable}
                            className={`px-3 py-1.5 text-sm border rounded transition-all ${
                              isSelected
                                ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white cursor-pointer'
                                : isAvailable
                                  ? 'border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white cursor-pointer'
                                  : 'border-neutral-200 dark:border-neutral-800 text-neutral-300 dark:text-neutral-700 cursor-not-allowed'
                            }`}
                          >
                            {size}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center py-8 text-neutral-500">Product not found</p>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || added}
              className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                added
                  ? 'bg-green-600 text-white cursor-pointer'
                  : selectedSize
                    ? 'bg-black text-white dark:bg-white dark:text-black hover:opacity-90 cursor-pointer'
                    : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  {selectedSize ? `Add to Cart — $${(selectedVariant?.price || 0).toFixed(2)}` : 'Select a Size'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

