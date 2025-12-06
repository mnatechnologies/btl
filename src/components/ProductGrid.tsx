'use client'

import { GridTileImage } from '@/components/grid/tile'
import Link from 'next/link'
import { useState } from 'react'
import QuickView from '@/components/QuickView'
import { Plus } from 'lucide-react'
import { isProductComingSoon } from '@/lib/products'
import ComingSoonOverlay from '@/components/ComingSoonOverlay'

type ProductItem = {
  handle: string
  title: string
  image: string
  price: number
  color: string
}

type ProductGroup = {
  name: string
  handle: string
  items: ProductItem[]
}

type GridLayout = 'left-large' | 'right-large'

type ProductGridProps = {
  groups: ProductGroup[]
  layout?: GridLayout
  onProductClick?: (p: Pick<ProductItem, 'handle' | 'title' | 'color'>) => void
}

function QuickAddButton({ onClick, size }: { onClick: (e: React.MouseEvent) => void; size: 'large' | 'small' }) {
  const bottomClass = size === 'large'
    ? 'bottom-[6%] sm:bottom-[13%] md:bottom-[1%]'
    : 'bottom-[1%]';

  const rightClass = size === 'large' ? 'right-3' : 'right-1';

  return (
    <button
      onClick={onClick}
      className={`cursor-pointer absolute ${bottomClass} ${rightClass} z-20 bg-black/80 hover:bg-black text-white rounded-full font-medium flex items-center gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 hover:scale-105 p-2 lg:px-3 lg:py-1.5`}
    >
      <Plus className="w-2 h-2" />
      <span className="hidden lg:inline text-xs">Quick Add</span>
    </button>
  )
}


function GridItem({
  item,
  size,
  layout,
  onProductClick,
  onQuickAdd,
  comingSoon
}: {
  item: ProductItem
  size: 'large' | 'small'
  layout: GridLayout
  onProductClick?: (p: Pick<ProductItem, 'handle' | 'title' | 'color'>) => void
  onQuickAdd?: (handle: string, color: string, image: string) => void
  comingSoon?: boolean
}) {
  const content = (
    <GridTileImage
      src={item.image}
      fill
      sizes={size === 'large' ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 100vw'}
      priority={false}
      alt={item.title}
      showPrice={size === 'large' && !comingSoon}
      size={size}
      label={{
        position: 'bottom',
        title: item.title,
        amount: item.price.toString(),
        currencyCode: 'AUD'
      }}
    />
  )

  // Determine grid classes based on layout and size
  let spanClass = ''
  let aspectClass = ''

  if (layout === 'left-large') {
    spanClass = size === 'large' ? 'col-span-1 row-span-3' : 'col-span-1 row-span-1'
    aspectClass = size === 'large' ? 'h-full w-full' : 'aspect-square h-full w-full'
  } else if (layout === 'right-large') {
    spanClass = size === 'large' ? 'col-span-1 row-span-3 col-start-2 md:col-start-3 row-start-1' : 'col-span-1 row-span-1 col-start-1'
    aspectClass = size === 'large' ? 'h-full w-full min-h-full' : 'aspect-square h-full w-full'
  }


  return (
    <div className={`${spanClass} ${size === 'large' && layout === 'right-large' ? 'min-h-full' : ''} group relative`}>
      {comingSoon ? (
        <div className={`relative block ${aspectClass} cursor-not-allowed`}>
          {content}
          <ComingSoonOverlay size={size} />
        </div>
      ) : (
        <>
          {onProductClick ? (
            <button
              type="button"
              className={`relative block ${aspectClass}`}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onProductClick({ handle: item.handle, title: item.title, color: item.color })
              }}
              aria-label={`View ${item.title}`}
            >
              {content}
            </button>
          ) : (
            <Link
              className={`relative block ${aspectClass}`}
              href={`/product/${item.handle}?color=${item.color}`}
              prefetch={false}
            >
              {content}
              {size === 'large' && (
                <div className="absolute inset-0 bg-black/15" />
              )}

            </Link>
          )}
          {onQuickAdd && (
            <QuickAddButton
              size={size}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onQuickAdd(item.handle, item.color, item.image)
              }}
            />
          )}
        </>
      )}
    </div>
  )
}

export default function ProductGrid({ groups, layout = 'left-large', onProductClick }: ProductGridProps) {
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

  // Grid layout classes based on layout type
  const getGridClass = () => {
    switch (layout) {
      case 'left-large':
        // Mobile: no spacer (2 columns), Desktop: with spacer (3 columns)
        return 'grid gap-2 grid-cols-[2fr_1fr] md:gap-4 md:grid-cols-[2fr_0.5fr_1fr] grid-rows-3'
      case 'right-large':
        return 'grid gap-2 grid-cols-[1fr_2fr] md:gap-4 md:grid-cols-[1fr_0.5fr_2fr] grid-rows-3'
      default:
        return 'grid gap-2 grid-cols-[2fr_1fr] md:gap-4 md:grid-cols-[2fr_0.5fr_1fr] grid-rows-3'
    }
  }


  return (
    <>
      {groups.map((group) => {
        const [firstItem, ...restItems] = group.items
        const comingSoon = isProductComingSoon(group.name)

        return (
          <section key={group.handle} className="mx-auto mt-4 max-w-none w-[95vw] sm:w-[90vw] lg:w-[85vw] xl:w-[80vw] 2xl:w-[75vw] px-4 pb-4">
            {/* Product Name */}
            <div className="py-6 text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-black dark:text-white">
                {group.name}
              </h2>
              {comingSoon && (
                <span className="px-3 py-1 bg-yellow-500 text-black text-sm font-semibold rounded">
                  Coming Soon
                </span>
              )}
            </div>

            {/* Grid */}
            <div className={getGridClass()}>
              {layout === 'right-large' ? (
                <>
                  {/* Small items on left */}
                  {restItems.map((item) => (
                    <GridItem
                      key={item.color}
                      item={item}
                      size="small"
                      layout={layout}
                      onProductClick={onProductClick}
                      onQuickAdd={openQuickView}
                      comingSoon={comingSoon}
                    />
                  ))}
                  {/* Empty spacer column */}
                  <div className="hidden md:block row-span-3" />
                  {/* Large item on right */}
                  <GridItem
                    item={firstItem}
                    size="large"
                    layout={layout}
                    onProductClick={onProductClick}
                    onQuickAdd={openQuickView}
                    comingSoon={comingSoon}
                  />
                </>
              ) : (
                <>
                  {/* Large item on left */}
                  <GridItem
                    item={firstItem}
                    size="large"
                    layout={layout}
                    onProductClick={onProductClick}
                    onQuickAdd={openQuickView}
                    comingSoon={comingSoon}
                  />
                  {/* Empty spacer column */}
                  <div className="hidden md:block row-span-3" />
                  {/* Small items on right */}
                  {restItems.map((item) => (
                    <GridItem
                      key={item.color}
                      item={item}
                      size="small"
                      layout={layout}
                      onProductClick={onProductClick}
                      onQuickAdd={openQuickView}
                      comingSoon={comingSoon}
                    />
                  ))}
                </>
              )}
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
