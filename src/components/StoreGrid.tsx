'use client'

import { useState } from 'react'
import Link from 'next/link'
import { GridTileImage } from '@/components/grid/tile'
import QuickView from '@/components/QuickView'
import { Plus } from 'lucide-react'

type StoreItem = {
  handle: string
  title: string
  image: string
  price: number
  color: string
}

type ProductGroup = {
  name: string
  handle: string
  items: StoreItem[]
}

function QuickAddButton({ onClick }: { onClick: (e: React.MouseEvent) => void }) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer absolute bottom-14 right-3 z-20 bg-black/80 hover:bg-black text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105"
    >
      <Plus className="w-3 h-3" />
      Quick Add
    </button>
  )
}

export default function StoreGrid({ groups }: { groups: ProductGroup[] }) {
  const [quickViewOpen, setQuickViewOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<{ handle: string; color: string; image: string } | null>(null)

  const openQuickView = (handle: string, color: string, image: string) => {
    setSelectedProduct({ handle, color, image })
    setQuickViewOpen(true)
  }

  const closeQuickView = () => {
    setQuickViewOpen(false)
    setSelectedProduct(null)
  }

  if (groups.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-white">No products available.</p>
      </div>
    )
  }

  return (
    <>
      {groups.map((group) => {
        const [firstItem, ...restItems] = group.items

        return (
          <section key={group.handle} className="mx-auto mt-4 max-w-none w-[95vw] sm:w-[90vw] lg:w-[85vw] xl:w-[80vw] 2xl:w-[75vw] px-4 pb-4">
            {/* Product Name */}
            <div className="py-6 text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white">
                {group.name}
              </h2>
            </div>

            {/* Grid: 1 large on left, smaller trailing on right */}
            <div className="grid gap-4 grid-cols-4 grid-rows-3">
              {/* Large item */}
              <div className="col-span-3 row-span-3 group relative">
                <Link
                  className="relative block h-full w-full"
                  href={`/product/${firstItem.handle}?color=${firstItem.color}`}
                  prefetch={false}
                >
                  <GridTileImage
                    src={firstItem.image}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    alt={`${group.name} - ${firstItem.color}`}
                    label={{
                      position: 'bottom',
                      title: firstItem.title,
                      amount: firstItem.price.toString(),
                      currencyCode: 'AUD'
                    }}
                  />
                </Link>
                <QuickAddButton 
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    openQuickView(firstItem.handle, firstItem.color, firstItem.image)
                  }} 
                />
              </div>

              {/* Smaller trailing items */}
              {restItems.map((item) => (
                <div key={item.color} className="col-span-1 row-span-1 group relative">
                  <Link
                    className="relative block aspect-square h-full w-full"
                    href={`/product/${item.handle}?color=${item.color}`}
                    prefetch={false}
                  >
                    <GridTileImage
                      src={item.image}
                      fill
                      sizes="(min-width: 768px) 25vw, 100vw"
                      alt={`${group.name} - ${item.color}`}
                      label={{
                        position: 'bottom',
                        title: item.title,
                        amount: item.price.toString(),
                        currencyCode: 'AUD'
                      }}
                    />
                  </Link>
                  <QuickAddButton 
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      openQuickView(item.handle, item.color, item.image)
                    }} 
                  />
                </div>
              ))}
            </div>
          </section>
        )
      })}

      {/* QuickView Modal */}
      {selectedProduct && (
        <QuickView
          isOpen={quickViewOpen}
          onClose={closeQuickView}
          productHandle={selectedProduct.handle}
          selectedColor={selectedProduct.color}
          productImage={selectedProduct.image}
        />
      )}
    </>
  )
}

