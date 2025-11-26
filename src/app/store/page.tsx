import Link from 'next/link';
import Image from 'next/image';
import { GridTileImage } from '@/components/grid/tile';
import { getAllProducts } from '@/lib/products';

type StoreItem = {
  handle: string;
  title: string;
  image: string;
  price: number;
  color: string;
};

type ProductGroup = {
  name: string;
  handle: string;
  items: StoreItem[];
};

export default async function Store() {
  // Fetch all products from Supabase
  const products = await getAllProducts();

  // Group items by product
  const productGroups: ProductGroup[] = products.map(product => {
    const uniqueColors = [...new Set(product.variants.map(v => v.color))];
    const items: StoreItem[] = uniqueColors.map(color => {
      const variantWithColor = product.variants.find(v => v.color === color);
      // Use first image (index 0) for consistent perspective
      const image = variantWithColor?.images?.[0] || product.images?.[0] || '/images/btl-logo-white.jpg';
      
      return {
        handle: product.name.toLowerCase().replace(/\s+/g, '-'),
        title: color,
        image,
        price: variantWithColor?.price || product.basePrice,
        color
      };
    });

    return {
      name: product.name,
      handle: product.name.toLowerCase().replace(/\s+/g, '-'),
      items
    };
  });

  return (
    <div className="min-h-screen">
      <main className="min-h-screen pb-8">
        {/* Hero Image */}
        <section className="relative w-full h-[45vh] sm:h-[50vh] lg:h-[55vh] overflow-hidden bg-black">
          <Image
            src="/images/BTL-66.jpg"
            alt="Built To Last Store"
            fill
            className="object-cover"
            style={{ objectPosition: 'center center' }}
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-8 left-4 sm:left-6 lg:left-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white">
              Our Store
            </h1>
          </div>
        </section>

        {/* Product Sections */}
        {productGroups.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <p className="text-white">No products available.</p>
          </div>
        ) : (
          productGroups.map((group) => {
            const [firstItem, ...restItems] = group.items;
            
            return (
              <section key={group.handle} className="mx-auto mt-4 max-w-none w-[95vw] sm:w-[90vw] lg:w-[85vw] xl:w-[80vw] 2xl:w-[75vw] px-4 pb-4">
                {/* Product Name */}
                <div className="py-6 text-left">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white">
                    {group.name}
                  </h2>
                </div>
                
                {/* Grid: 1 large on left, smaller trailing on right */}
                <div className="grid gap-4 grid-cols-4 grid-rows-3">
                  {/* Large item */}
                  <div className="col-span-3 row-span-3">
                    <Link
                      className="relative block h-full w-full"
                      href={`/product/${firstItem.handle}?color=${firstItem.color}`}
                      prefetch={true}
                    >
                      <GridTileImage
                        src={firstItem.image}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        alt={`${group.name} - ${firstItem.color}`}
                        label={{
                          position: 'bottom',
                          title: firstItem.title,
                          amount: firstItem.price.toString(),
                          currencyCode: 'AUD'
                        }}
                      />
                    </Link>
                  </div>
                  
                  {/* Smaller trailing items */}
                  {restItems.map((item) => (
                    <div key={item.color} className="col-span-1 row-span-1">
                      <Link
                        className="relative block aspect-square h-full w-full"
                        href={`/product/${item.handle}?color=${item.color}`}
                        prefetch={true}
                      >
                        <GridTileImage
                          src={item.image}
                          fill
                          sizes="(min-width: 768px) 25vw, 100vw"
                          alt={`${group.name} - ${item.color}`}
                          label={{
                            position: 'bottom',
                            title: item.title,
                            amount: item.price.toString(),
                            currencyCode: 'AUD'
                          }}
                        />
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            );
          })
        )}
      </main>
    </div>
  );
}