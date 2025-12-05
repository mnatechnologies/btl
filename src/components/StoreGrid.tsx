'use client'

import ProductGrid from '@/components/ProductGrid'

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

export default function StoreGrid({ groups }: { groups: ProductGroup[] }) {
  if (groups.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-white">No products available.</p>
      </div>
    )
  }

  return (
    <>
      {groups.map((group, index) => (
        <ProductGrid
          key={group.handle}
          groups={[group]}
          layout={index % 2 === 0 ? 'left-large' : 'right-large'}
        />
      ))}
    </>
  )
}
