'use client'

import { GridTileImage } from '@/components/grid/tile';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getFeaturedProducts, isProductComingSoon, isProductOutOfStock } from '@/lib/products';
import { Product } from '@/types/Product';
import QuickView from '@/components/QuickView';
import { Plus } from 'lucide-react';

type ProductItem = {
  handle: string;
  title: string;
  image: string;
  price: number;
  color: string;
};

type ProductClick = Pick<ProductItem, 'handle' | 'title' | 'color'>;

function QuickAddButton({ onClick }: { onClick: (e: React.MouseEvent) => void }) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer absolute bottom-14 right-3 z-20 bg-black/80 hover:bg-black text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105"
    >
      <Plus className="w-3 h-3" />
      Quick Add
    </button>
  );
}

function MirrorGridItem({
  item,
  size,
  onProductClick,
  onQuickAdd
}: {
  item: ProductItem;
  size: 'large' | 'small';
  priority?: boolean;
  onProductClick?: (p: ProductClick) => void;
  onQuickAdd?: (handle: string, color: string, image: string) => void;
}) {
  const isComingSoon = isProductComingSoon(item.title)
  const isOutOfStock = isProductOutOfStock(item.title)

  const content = (
    <GridTileImage
      src={item.image}
      fill
      sizes={size === 'large' ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 100vw'}
      priority={false}
      alt={item.title}
      showPrice={size === 'large' && !isComingSoon && !isOutOfStock}
      label={{
        position: 'bottom',
        title: item.title as string,
        amount: item.price.toString(),
        currencyCode: 'AUD'
      }}
    />
  );

  const spanClass = size === 'large' ? 'col-span-1 row-span-3 col-start-3 row-start-1' : 'col-span-1 row-span-1 col-start-1';
  const aspectClass = size === 'large' ? 'h-full w-full min-h-full' : 'aspect-square h-full w-full';

  const badgePadding = size === 'large'
    ? 'px-3 py-1.5 sm:px-4 sm:py-2'
    : 'px-2 py-1 sm:px-3 sm:py-1.5';

  const badgeText = size === 'large'
    ? 'text-xs sm:text-sm'
    : 'text-[10px] sm:text-xs';

  const subText = size === 'large'
    ? 'text-xs sm:text-sm'
    : 'text-[10px] sm:text-xs';

  const marginBottom = size === 'large'
    ? 'mb-1 sm:mb-2'
    : 'mb-0.5 sm:mb-1';

  return (
    <div className={`${spanClass} ${size === 'large' ? 'min-h-full' : ''} group relative`}>
      {isComingSoon ? (
        // Non-interactive version for coming soon
        <div className={`relative block ${aspectClass} cursor-not-allowed`}>
          {content}
          {/* Coming Soon Overlay */}
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-30">
            <div className="text-center">
            <span className={`inline-block ${badgePadding} bg-yellow-500 text-black font-bold rounded ${marginBottom} ${badgeText}`}>
              COMING SOON
            </span>
              <p className={`text-white ${subText}`}>Available Soon</p>
            </div>
          </div>
        </div>
      ) : isOutOfStock ? (
        // Non-interactive version for out of stock
        <div className={`relative block ${aspectClass} cursor-not-allowed`}>
          {content}
          {/* Out of Stock Overlay */}
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-30">
            <div className="text-center">
            <span className={`inline-block ${badgePadding} bg-red-600 text-white font-bold rounded ${marginBottom} ${badgeText}`}>
              OUT OF STOCK
            </span>
              <p className={`text-white ${subText}`}>Check Back Soon</p>
            </div>
          </div>
        </div>
      ) : (
        // Interactive version for available products
        <>
          {onProductClick ? (
            <button
              type="button"
              className={`relative block ${aspectClass}`}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onProductClick({ handle: item.handle, title: item.title, color: item.color }); }}
              aria-label={`View ${item.title}`}
            >
              {content}
            </button>
          ) : (
            <Link
              className={`relative block ${aspectClass}`}
              href={`/product/${item.handle}?color=${item.color}`}
              prefetch={false}
            >
              {content}
            </Link>
          )}
          {onQuickAdd && (
            <QuickAddButton
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickAdd(item.handle, item.color, item.image);
              }}
            />
          )}
        </>
      )}
    </div>
  );
}

export function FourItemGridMirror({
   onProductClick,
   productIndex = 0
}: {
  onProductClick?: (p: ProductClick) => void;
  productIndex?: number;
}){
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ handle: string; color: string; image: string } | null>(null);

  const openQuickView = (handle: string, color: string, image: string) => {
    setSelectedProduct({ handle, color, image });
    setQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setQuickViewOpen(false);
    setSelectedProduct(null);
  };

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
            Curated Selection
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
            Curated Selection
          </h2>
        </div>
        <div className="flex justify-center items-center py-12">
          <p className="text-white">No featured products available.</p>
        </div>
      </section>
    );
  }

  // Use third product (index 2) and get all its color variants
  const product = products[productIndex]
  if (!product) return null;
  
  const uniqueColors = [...new Set(product.variants.map(v => v.color))];

  const gridItems: ProductItem[] = uniqueColors.slice(0, 4).map((color,index) => {
    const variantWithColor = product.variants.find(v => v.color === color);
    const imageIndex = index === 0 ? 0 : 1;
    // Use first image (index 0) for consistent perspective
    const image = variantWithColor?.images?.[imageIndex] || product.images?.[imageIndex] || variantWithColor?.images?.[0] || product.images?.[0] || '/images/btl-logo-white.jpg';

    return {
      handle: product.name.toLowerCase().replace(/\s+/g, '-'),
      title: `${product.name} – ${color}`,
      image,
      price: variantWithColor?.price || product.basePrice,
      color
    };
  });

  const [largeProduct, ...smallProducts] = gridItems;

  return (
    <section className="mx-auto mt-4 max-w-none w-[95vw] sm:w-[90vw] lg:w-[85vw] xl:w-[80vw] 2xl:w-[75vw] px-4 pb-4 flex-shrink-0">
      {/* Heading */}
      <div className="py-6 text-left">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white">
          {product.name}
        </h2>
      </div>
      
      {/* Grid: 3 small stacked on left, 1 large on right */}
      <div className="grid gap-4 grid-cols-[1fr_0.5fr_2fr] grid-rows-3 ">
        {smallProducts.map((item, idx) => (
          <MirrorGridItem key={idx} size="small" item={item} onProductClick={onProductClick} onQuickAdd={openQuickView} />
        ))}

        {/* Empty spacer column */}
        <div className="row-span-3" />

        <MirrorGridItem size="large" item={largeProduct} onProductClick={onProductClick} onQuickAdd={openQuickView} />
      </div>

      {/* QuickView Modal */}
      {selectedProduct && (
        <QuickView
          isOpen={quickViewOpen}
          onClose={closeQuickView}
          productHandle={selectedProduct.handle}
          selectedColor={selectedProduct.color}
          productImage={selectedProduct.image}
        />
      )}
    </section>
  );
}
