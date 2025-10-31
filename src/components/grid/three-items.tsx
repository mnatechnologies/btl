'use client'

import { GridTileImage } from '@/components/grid/tile';
import Link from 'next/link';

// Minimal local Product shape for styling/demo purposes only (no integration)
// Matches the fields used below
type DemoProduct = {
  handle: string;
  title: string;
  featuredImage: { url: string };
  priceRange: { maxVariantPrice: { amount: string; currencyCode: string } };
  color: 'Black' | 'Off-White' | 'Grey' | 'White';
};

type ProductClick = Pick<DemoProduct, 'handle' | 'title' | 'color'>;

function ThreeItemGridItem({
  item,
  size,
  priority,
  onProductClick
}: {
  item: DemoProduct;
  size: 'full' | 'half';
  priority?: boolean;
  onProductClick?: (p: ProductClick) => void;
}) {
  const content = (
    <GridTileImage
      src={item.featuredImage.url}
      fill
      sizes={size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'}
      priority={priority}
      alt={item.title}
      label={{
        position: size === 'full' ? 'center' : 'bottom',
        title: item.title as string,
        amount: item.priceRange.maxVariantPrice.amount,
        currencyCode: item.priceRange.maxVariantPrice.currencyCode
      }}
    />
  );

  return (
    <div className={size === 'full' ? 'md:col-span-4 md:row-span-2 ' : 'md:col-span-2 md:row-span-1'}>
      {onProductClick ? (
        <button
          type="button"
          className="relative block aspect-square h-full w-full"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onProductClick && onProductClick({ handle: item.handle, title: item.title, color: item.color }); }}
          aria-label={`View ${item.title}`}
        >
          {content}
        </button>
      ) : (
        <Link
          className="relative block aspect-square h-full w-full  "
          href={{ pathname: `/product/${item.handle}`, query: { color: item.color } }}
          prefetch={true}
        >
          {content}
        </Link>
      )}
    </div>
  );
}

export function ThreeItemGrid({ onProductClick }: { onProductClick?: (p: ProductClick) => void }) {
  // Static demo products to reproduce the Next.js Commerce styling without any integration
  const homepageItems: DemoProduct[] = [
    {
      handle: 'essential-tee-black',
      title: 'Essential Tee – Black',
      featuredImage: { url: '/images/black-tshirt-front-flat.jpg' },
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
      handle: 'coming soon',
      title: 'Placeholder',
      featuredImage: { url: '/images/btl-logo-white.jpg' },
      priceRange: { maxVariantPrice: { amount: '220.00', currencyCode: 'AUD' } },
      color: 'Grey'
    }
  ];

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="mx-auto mt-4 max-w-none w-[95vw] sm:w-[90vw] lg:w-[85vw] xl:w-[80vw] 2xl:w-[75vw] px-4 pb-4">
      {/* Heading */}
      <div className="py-6 text-left">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white">
          Our Favourites
        </h2>
      </div>
      
      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-6">
        <ThreeItemGridItem size="full" item={firstProduct} priority={true} onProductClick={onProductClick} />
        <ThreeItemGridItem size="half" item={secondProduct} priority={true} onProductClick={onProductClick} />
        <ThreeItemGridItem size="half" item={thirdProduct} onProductClick={onProductClick} />
      </div>
    </section>
  );
}
