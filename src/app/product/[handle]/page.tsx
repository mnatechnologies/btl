import ProductShowcase from '@/components/ProductShowcase';
import { getProductByHandle } from '@/lib/products';

export default async function ProductPage({
  params,
  searchParams
}: {
  params:  Promise<{ handle: string }>;
  searchParams: Promise<{ color?: string }>;
}) {

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const { handle } = resolvedParams;
  const initialColor = typeof resolvedSearchParams?.color === 'string'
    ? resolvedSearchParams.color
    : undefined;

  // Fetch the product by handle
  const product = await getProductByHandle(handle);

  if (!product) {
    return (
      <main className="max-w-(--breakpoint-2xl) mx-auto px-4 brand">
        <div className="flex justify-center items-center py-24">
          <p className="text-white text-xl">Product not found</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-(--breakpoint-2xl) mx-auto px-4 brand">
      <ProductShowcase product={product} initialColor={initialColor} />
    </main>
  );
}
