import ProductShowcase from '@/components/ProductShowcase';

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

  return (
    <main className="max-w-(--breakpoint-2xl) mx-auto px-4 brand">
      {/* Simple heading derived from handle for demo purposes */}
      <ProductShowcase initialColor={initialColor} />
    </main>
  );
}
