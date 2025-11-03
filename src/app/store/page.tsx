import Link from 'next/link';
import { GridTileImage } from '@/components/grid/tile';

// Minimal local Product shape for styling/demo purposes only (no integration)
// Mirrors the structure used on the home page grid
type DemoProduct = {
  handle: string;
  title: string;
  featuredImage: { url: string };
  priceRange: { maxVariantPrice: { amount: string; currencyCode: string } };
  color: 'Black' | 'Off-White' | 'Grey' | 'White';
};

const products: DemoProduct[] = [
  {
    handle: 'essential-tee-black',
    title: 'Essential Tee – Black',
    featuredImage: { url: '/images/Flat lay retouched/black-shirt-front.jpg' },
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
    handle: 'essential-tee-white',
    title: 'Essential Tee – White',
    featuredImage: { url: '/images/Flat lay retouched/white-shirt-front.jpg' },
    priceRange: { maxVariantPrice: { amount: '220.00', currencyCode: 'AUD' } },
    color: 'White'
  },
  // Placeholders to fill the grid similar to the home three-grid tile
  {
    handle: 'coming-soon-1',
    title: 'Placeholder',
    featuredImage: { url: '/images/btl-logo-white.jpg' },
    priceRange: { maxVariantPrice: { amount: '220.00', currencyCode: 'AUD' } },
    color: 'Grey'
  },
  {
    handle: 'coming-soon-2',
    title: 'Placeholder',
    featuredImage: { url: '/images/btl-logo-white.jpg' },
    priceRange: { maxVariantPrice: { amount: '220.00', currencyCode: 'AUD' } },
    color: 'Grey'
  },
  {
    handle: 'coming-soon-3',
    title: 'Placeholder',
    featuredImage: { url: '/images/btl-logo-white.jpg' },
    priceRange: { maxVariantPrice: { amount: '220.00', currencyCode: 'AUD' } },
    color: 'Grey'
  },
  {
    handle: 'coming-soon-4',
    title: 'Placeholder',
    featuredImage: { url: '/images/btl-logo-white.jpg' },
    priceRange: { maxVariantPrice: { amount: '220.00', currencyCode: 'AUD' } },
    color: 'Grey'
  }
];

const Store = () => {
  return (
    <div className="min-h-screen">
      <main className="min-h-screen pb-8">
        {/* Page Heading */}
        <div className="py-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white">
            Our Store
          </h1>
          <p className="mt-3 text-base sm:text-lg text-white/80 max-w-2xl mx-auto px-4">
            Discover our carefully curated collection of premium clothing designed for those who value quality and timeless style.
          </p>
        </div>

        {/* Grid section styled like home page */}
        <section className="mx-auto mt-2 max-w-none w-[95vw] sm:w-[90vw] lg:w-[85vw] xl:w-[80vw] 2xl:w-[75vw] px-4 pb-8">
          <div className="grid gap-4 md:grid-cols-6">
            {products.map((item) => {
              const content = (
                <GridTileImage
                  src={item.featuredImage.url}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  alt={item.title}
                  label={{
                    position: 'bottom',
                    title: item.title,
                    amount: item.priceRange.maxVariantPrice.amount,
                    currencyCode: item.priceRange.maxVariantPrice.currencyCode
                  }}
                />
              );

              const href = item.handle.startsWith('coming-soon')
                ? { pathname: '/store' }
                : { pathname: `/product/${item.handle}`, query: { color: item.color } };

              return (
                <div key={item.handle} className="md:col-span-2 md:row-span-1">
                  <Link className="relative block aspect-square h-full w-full" href={href as any} prefetch={true}>
                    {content}
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Store;