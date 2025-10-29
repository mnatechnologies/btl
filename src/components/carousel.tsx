import Link from 'next/link';
import { GridTileImage } from '@/components/grid/tile';

// Minimal local Product shape for styling/demo purposes only (no integration)
type DemoProduct = {
  handle: string;
  title: string;
  featuredImage: { url: string };
  priceRange: { maxVariantPrice: { amount: string; currencyCode: string } };
};

export function Carousel() {
  // Static demo products to reproduce the Next.js Commerce carousel styling
  const products: DemoProduct[] = [
    {
      handle: 'essential-tee-black',
      title: 'Essential Tee – Black',
      featuredImage: { url: '/images/black-tshirt-front-flat.jpg' },
      priceRange: { maxVariantPrice: { amount: '220.00', currencyCode: 'USD' } }
    },
    {
      handle: 'essential-tee-offwhite',
      title: 'Essential Tee – Off-White',
      featuredImage: { url: '/images/offwhite-tshirt-front-flat-new.jpg' },
      priceRange: { maxVariantPrice: { amount: '220.00', currencyCode: 'USD' } }
    },
    {
      handle: 'essential-tee-grey',
      title: 'Essential Tee – Grey',
      featuredImage: { url: '/images/grey-tshirt-front-flat.jpg' },
      priceRange: { maxVariantPrice: { amount: '220.00', currencyCode: 'USD' } }
    }
  ];

  if (!products?.length) return null;

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products, ...products, ...products];

  return (
    <div className="w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.handle}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link href={`/product/${product.handle}`} className="relative h-full w-full">
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
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
