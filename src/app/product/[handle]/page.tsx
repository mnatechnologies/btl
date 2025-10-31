import ProductShowcase from '@/components/ProductShowcase';

export default async function ProductPage({
  params,
  searchParams
}: {
  params:  { handle: string };
  searchParams: { color?: string };
}) {
  const { handle } = params;
  const initialColor = await typeof searchParams?.color === 'string' ? searchParams.color : undefined;
  const title = await typeof handle === 'string' ? handle.replace(/-/g, ' ') : 'Product';

  return (
    <main className="max-w-(--breakpoint-2xl) mx-auto px-4 brand">
      {/* Simple heading derived from handle for demo purposes */}
      <ProductShowcase initialColor={initialColor} />
    </main>
  );
}
