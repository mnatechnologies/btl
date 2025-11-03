'use client'

import Link from 'next/link';
import { GridTileImage } from '@/components/grid/tile';

// Minimal local Product shape for styling/demo purposes only (no integration)
type DemoProduct = {
  handle: string;
  title: string;
  featuredImage: { url: string };
  priceRange: { maxVariantPrice: { amount: string; currencyCode: string } };
  color: 'Black' | 'Off-White' | 'Grey' | 'White';
};

type ProductClick = Pick<DemoProduct, 'handle' | 'title' | 'color'>;

export function Carousel({ onProductClick }: { onProductClick?: (p: ProductClick) => void }) {
  // Static demo products to reproduce the Next.js Commerce carousel styling
  const products: DemoProduct[] = [
    {
      handle: 'placeholder',
      title: 'Placeholder',
      featuredImage: { url: '/images/btl-logo-white.jpg' },
      priceRange: { maxVariantPrice: { amount: '220.00', currencyCode: 'AUD' } },
      color: 'Black'
    },
    {
      handle: 'essential-tee-offwhite',
      title: 'Essential Tee – Off-White',
      featuredImage: { url: '/images/Flat lay retouched/offwhite-shirt.jpg' },
      priceRange: { maxVariantPrice: { amount: '220.00', currencyCode: 'AUD' } },
      color: 'Off-White'
    },
    {
      handle: 'essential-tee-grey',
      title: 'Essential Tee – Grey',
      featuredImage: { url: '/images/Flat lay retouched/grey-shirt-front.jpg' },
      priceRange: { maxVariantPrice: { amount: '220.00', currencyCode: 'AUD' } },
      color: 'Grey'
    },
    {
      handle: 'placeholder2',
      title: 'Placeholder2',
      featuredImage: { url: '/images/btl-logo-white.jpg' },
      priceRange: { maxVariantPrice: { amount: '220.00', currencyCode: 'AUD' } },
      color: 'White'
    },
  ];

  if (!products?.length) return null;

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products, ...products, ...products];

  return (
    <section className="w-full overflow-x-hidden pb-6 ">
        <div className=' mx-auto mt-4 max-w-none w-[95vw] sm:w-[90vw] lg:w-[85vw] xl:w-[80vw] 2xl:w-[75vw] px-4 pb-4 text-left'>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white"
            >PLACERHOLDER TEXT</h2>
        </div>
      <ul className="flex animate-carousel">
        {carouselProducts.map((product, i) => {
          const content = (
            <GridTileImage
              alt={product.title}
              label={{
                title: product.title,
                amount: product.priceRange.maxVariantPrice.amount,
                currencyCode: product.priceRange.maxVariantPrice.currencyCode
              }}
              src={product.featuredImage?.url}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            />
          );

          return (
            <li
              key={`${product.handle}${i}`}
              className="relative aspect-square  w-2/3 max-w-[475px] flex-none md:w-1/3"
            >
              {onProductClick ? (
                <button
                  type="button"
                  className="relative h-full w-full cursor-pointer"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); onProductClick && onProductClick({ handle: product.handle, title: product.title, color: product.color }); }}
                  aria-label={`View ${product.title}`}
                >
                  {content}
                </button>
              ) : (
                <Link
                  href={`/product/${product.handle}?color=${product.color}`}
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
