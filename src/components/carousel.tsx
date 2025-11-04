'use client'

import Link from 'next/link';
import { GridTileImage } from '@/components/grid/tile';
import { useEffect, useState } from 'react';
import { getAllProducts } from '@/lib/products';
import { Product } from '@/app/types/Product';

type ProductClick = { handle: string; title: string; color: string };

export function Carousel({ onProductClick }: { onProductClick?: (p: ProductClick) => void }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts = await getAllProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="w-full overflow-x-hidden pb-6">
        <div className='mx-auto mt-4 max-w-none w-[95vw] sm:w-[90vw] lg:w-[85vw] xl:w-[80vw] 2xl:w-[75vw] px-4 pb-4 text-left'>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white">Featured Products</h2>
        </div>
        <div className="flex justify-center items-center py-12">
          <p className="text-white">Loading products...</p>
        </div>
      </section>
    );
  }

  if (!products?.length) return null;

  // Create carousel items from products - one item per color variant
  const carouselItems = products.flatMap(product => {
    // Get unique colors from variants
    const uniqueColors = [...new Set(product.variants.map(v => v.color))];
    
    return uniqueColors.map(color => {
      // Get the first variant of this color to use its image
      const variantWithColor = product.variants.find(v => v.color === color);
      const image = variantWithColor?.images?.[0] || product.images?.[0] || '/images/btl-logo-white.jpg';
      
      return {
        id: `${product.id}-${color}`,
        productId: product.id,
        handle: product.name.toLowerCase().replace(/\s+/g, '-'),
        title: `${product.name} – ${color}`,
        image,
        price: variantWithColor?.price || product.basePrice,
        color
      };
    });
  });

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...carouselItems, ...carouselItems, ...carouselItems];

  return (
    <section className="w-full overflow-x-hidden pb-6 ">
        <div className=' mx-auto mt-4 max-w-none w-[95vw] sm:w-[90vw] lg:w-[85vw] xl:w-[80vw] 2xl:w-[75vw] px-4 pb-4 text-left'>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white"
            >Featured Products</h2>
        </div>
      <ul className="flex animate-carousel">
        {carouselProducts.map((item, i) => {
          const content = (
            <GridTileImage
              alt={item.title}
              label={{
                title: item.title,
                amount: item.price.toString(),
                currencyCode: 'AUD'
              }}
              src={item.image}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            />
          );

          return (
            <li
              key={`${item.id}${i}`}
              className="relative aspect-square  w-2/3 max-w-[475px] flex-none md:w-1/3"
            >
              {onProductClick ? (
                <button
                  type="button"
                  className="relative h-full w-full cursor-pointer"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); onProductClick && onProductClick({ handle: item.handle, title: item.title, color: item.color }); }}
                  aria-label={`View ${item.title}`}
                >
                  {content}
                </button>
              ) : (
                <Link
                  href={`/product/${item.handle}?color=${item.color}`}
                  className="relative h-full w-full"
                >
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
