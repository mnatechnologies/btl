import Image from 'next/image';
import { getAllProducts } from '@/lib/products';
import StoreGrid from '@/components/StoreGrid';

export default async function Store() {
  // Fetch all products from Supabase
  const products = await getAllProducts();

  // Group items by product
  const productGroups = products.map(product => {
    const uniqueColors = [...new Set(product.variants.map(v => v.color))];
    const items = uniqueColors.map(color => {
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
        <StoreGrid groups={productGroups} />
      </main>
    </div>
  );
}
