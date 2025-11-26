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

function FourItemGridItem({
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
      sizes={size === 'large' ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 100vw'}
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

  const spanClass = size === 'large' ? 'col-span-3 row-span-3' : 'col-span-1 row-span-1';
  const aspectClass = size === 'large' ? 'h-full w-full' : 'aspect-square h-full w-full';

  return (
    <div className={spanClass}>
      {onProductClick ? (
        <button
          type="button"
          className={`relative block ${aspectClass}`}
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
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

export function FourItemGrid({ onProductClick }: { onProductClick?: (p: ProductClick) => void }) {
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
            Featured Collection
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
            Featured Collection
          </h2>
        </div>
        <div className="flex justify-center items-center py-12">
          <p className="text-white">No featured products available.</p>
        </div>
      </section>
    );
  }

  // Use first product (index 0) and get all its color variants
  const product = products[0];
  const uniqueColors = [...new Set(product.variants.map(v => v.color))];
  
  const gridItems: ProductItem[] = uniqueColors.slice(0, 4).map(color => {
    const variantWithColor = product.variants.find(v => v.color === color);
    // Use first image (index 0) for consistent perspective
    const image = variantWithColor?.images?.[0] || product.images?.[0] || '/images/btl-logo-white.jpg';
    
    return {
      handle: product.name.toLowerCase().replace(/\s+/g, '-'),
      title: `${product.name} – ${color}`,
      image,
      price: variantWithColor?.price || product.basePrice,
      color
    };
  });

  const [firstProduct, ...rest] = gridItems;

  return (
    <section className="mx-auto mt-4 max-w-none w-[95vw] sm:w-[90vw] lg:w-[85vw] xl:w-[80vw] 2xl:w-[75vw] px-4 pb-4">
      {/* Heading */}
      <div className="py-6 text-left">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white">
          {product.name}
        </h2>
      </div>
      
      {/* Grid: 1 large item on left, 3 small stacked on right */}
      <div className="grid gap-4 grid-cols-4 grid-rows-3">
        <FourItemGridItem size="large" item={firstProduct} onProductClick={onProductClick} />
        {rest.map((item, idx) => (
          <FourItemGridItem key={idx} size="small" item={item} onProductClick={onProductClick} />
        ))}
      </div>
    </section>
  );
}
