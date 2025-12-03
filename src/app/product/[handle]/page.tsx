import ProductShowcase from '@/components/ProductShowcase';
import { getProductByHandle } from '@/lib/products';
import Link from 'next/link'

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
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-6xl">🔍</div>
          <h1 className="text-3xl font-bold">Product Not Found</h1>
          <p className="text-muted-foreground">
            The product you&#39;re looking for doesn&#39;t exist or has been removed.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Link
              href="/store"
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors font-medium"
            >
              Browse Store
            </Link>
            <Link
              href="/"
              className="px-6 py-3 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
            >
              Go Home
            </Link>
          </div>
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
