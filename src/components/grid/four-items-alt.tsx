'use client'

import { GridTileImage } from '@/components/grid/tile';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getFeaturedProducts } from '@/lib/products';
import { Product } from '@/app/types/Product';

type ProductItem = {
  handle: string;
  title: string;
  image: string;
  price: number;
  color: string;
};

type ProductClick = Pick<ProductItem, 'handle' | 'title' | 'color'>;

function AltGridItem({
  item,
  size,
  onProductClick
}: {
  item: ProductItem;
  size: 'large' | 'small';
  priority?: boolean;
  onProductClick?: (p: ProductClick) => void;
}) {
  const content = (
    <GridTileImage
      src={item.image}
      fill
      sizes={size === 'large' ? '(min-width: 768px) 100vw, 100vw' : '(min-width: 768px) 33vw, 100vw'}
      priority={false}
      alt={item.title}
      label={{
        position: 'bottom',
        title: item.title as string,
        amount: item.price.toString(),
        currencyCode: 'AUD'
      }}
    />
  );

  const spanClass = size === 'large' ? 'md:col-span-3 md:row-span-2' : 'md:col-span-1 md:row-span-1';
  const aspectClass = size === 'large' ? 'h-full w-full' : 'aspect-square h-full w-full';

  return (
    <div className={spanClass}>
      {onProductClick ? (
        <button
          type="button"
          className={`relative block ${aspectClass}`}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onProductClick && onProductClick({ handle: item.handle, title: item.title, color: item.color }); }}
          aria-label={`View ${item.title}`}
        >
          {content}
        </button>
      ) : (
        <Link
          className={`relative block ${aspectClass}`}
          href={`/product/${item.handle}?color=${item.color}`}
          prefetch={true}
        >
          {content}
        </Link>
      )}
    </div>
  );
}

export function FourItemGridAlt({ onProductClick }: { onProductClick?: (p: ProductClick) => void }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts = await getFeaturedProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="mx-auto mt-4 max-w-none w-[95vw] sm:w-[90vw] lg:w-[85vw] xl:w-[80vw] 2xl:w-[75vw] px-4 pb-4">
        <div className="py-6 text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white">
            New Arrivals
          </h2>
        </div>
        <div className="flex justify-center items-center py-12">
          <p className="text-white">Loading products...</p>
        </div>
      </section>
    );
  }

  if (!products?.length) {
    return (
      <section className="mx-auto mt-4 max-w-none w-[95vw] sm:w-[90vw] lg:w-[85vw] xl:w-[80vw] 2xl:w-[75vw] px-4 pb-4">
        <div className="py-6 text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white">
            New Arrivals
          </h2>
        </div>
        <div className="flex justify-center items-center py-12">
          <p className="text-white">No products available.</p>
        </div>
      </section>
    );
  }

  // Create grid items - first 4 from products, then placeholders
  const gridItems: ProductItem[] = [];
  
  for (const product of products) {
    if (gridItems.length >= 4) break;
    
    // Get unique colors from variants
    const uniqueColors = [...new Set(product.variants.map(v => v.color))];
    
    for (const color of uniqueColors) {
      if (gridItems.length >= 4) break;
      
      // Get the first variant of this color to use its image
      const variantWithColor = product.variants.find(v => v.color === color);
      const image = variantWithColor?.images?.[0] || product.images?.[0] || '/images/btl-logo-white.jpg';
      
      gridItems.push({
        handle: product.name.toLowerCase().replace(/\s+/g, '-'),
        title: `${product.name} – ${color}`,
        image,
        price: variantWithColor?.price || product.basePrice,
        color
      });
    }
  }

  // Add placeholder items
  while (gridItems.length < 4) {
    gridItems.push({
      handle: `d${gridItems.length}`,
      title: `D${gridItems.length}`,
      image: '/images/btl-logo-white.jpg',
      price: 0,
      color: 'default'
    });
  }

  const [firstProduct, secondProduct, thirdProduct, fourthProduct] = gridItems;

  return (
    <section className="mx-auto mt-4 max-w-none w-[95vw] sm:w-[90vw] lg:w-[85vw] xl:w-[80vw] 2xl:w-[75vw] px-4 pb-4">
      {/* Heading */}
      <div className="py-6 text-left">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white">
          New Arrivals
        </h2>
      </div>
      
      {/* Grid: large on top, 3 small in row below */}
      <div className="grid gap-4 md:grid-cols-3 md:auto-rows-fr" style={{ gridAutoRows: '1fr' }}>
        <AltGridItem size="large" item={firstProduct} onProductClick={onProductClick} />
        <AltGridItem size="small" item={secondProduct} onProductClick={onProductClick} />
        <AltGridItem size="small" item={thirdProduct} onProductClick={onProductClick} />
        <AltGridItem size="small" item={fourthProduct} onProductClick={onProductClick} />
      </div>
    </section>
  );
}
