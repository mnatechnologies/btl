import Link from 'next/link';
import { GridTileImage } from '@/components/grid/tile';
import { getAllProducts } from '@/lib/products';

type StoreItem = {
  handle: string;
  title: string;
  image: string;
  price: number;
  color: string;
};

export default async function Store() {
  // Fetch all products from Supabase
  const products = await getAllProducts();

  // Create store items from products - one item per color variant
  const storeItems: StoreItem[] = [];
  
  for (const product of products) {
    // Get unique colors from variants
    const uniqueColors = [...new Set(product.variants.map(v => v.color))];
    
    for (const color of uniqueColors) {
      // Get the first variant of this color to use its image and price
      const variantWithColor = product.variants.find(v => v.color === color);
      const image = variantWithColor?.images?.[0] || product.images?.[0] || '/images/btl-logo-white.jpg';
      
      storeItems.push({
        handle: product.name.toLowerCase().replace(/\s+/g, '-'),
        title: `${product.name} – ${color}`,
        image,
        price: variantWithColor?.price || product.basePrice,
        color
      });
    }
  }

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
          {storeItems.length === 0 ? (
            <div className="flex justify-center items-center py-12">
              <p className="text-white">No products available.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-6">
              {storeItems.map((item) => {
                const content = (
                  <GridTileImage
                    src={item.image}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    alt={item.title}
                    label={{
                      position: 'bottom',
                      title: item.title,
                      amount: item.price.toString(),
                      currencyCode: 'AUD'
                    }}
                  />
                );

                const href = `/product/${item.handle}?color=${item.color}`;

                return (
                  <div key={`${item.handle}-${item.color}`} className="md:col-span-2 md:row-span-1">
                    <Link className="relative block aspect-square h-full w-full" href={href} prefetch={true}>
                      {content}
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}