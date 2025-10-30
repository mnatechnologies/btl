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
      featuredImage: { url: '/images/offwhite-tshirt-front-flat-new.jpg' },
      priceRange: { maxVariantPrice: { amount: '220.00', currencyCode: 'AUD' } },
      color: 'Off-White'
    },
    {
      handle: 'essential-tee-grey',
      title: 'Essential Tee – Grey',
      featuredImage: { url: '/images/grey-tshirt-front-flat.jpg' },
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
    <div className="w-full overflow-x-hidden pb-6 pt-1 brand-gradient-dark">
      <ul className="flex animate-carousel gap-4">
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
                  href={{ pathname: `/product/${product.handle}`, query: { color: product.color } }}
                  className="relative h-full w-full"
                >
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
