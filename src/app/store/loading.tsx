import Image from 'next/image'

export default function Loading() {
  return (
    <div className="min-h-screen">
      <main className="min-h-screen pb-8">
        <section className="relative w-full aspect-[3/2] max-h-[80vh] overflow-hidden bg-black">
          <Image
            src="/images/BTL-66.jpg"
            alt="Built To Last Store"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-8 left-4 sm:left-6 lg:left-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white">
              Our Store
            </h1>
          </div>
        </section>

        <div className="mx-auto mt-4 max-w-none w-[95vw] sm:w-[90vw] lg:w-[85vw] xl:w-[80vw] 2xl:w-[75vw] px-4 pb-4">
          <div className="py-6">
            <div className="h-12 bg-neutral-200 dark:bg-neutral-800 rounded w-64 animate-pulse mb-8"></div>
          </div>
          <div className="grid gap-4 grid-cols-[2fr_0.5fr_1fr] grid-rows-3">
            <div className="col-span-1 row-span-3 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
            <div className="row-span-3"></div>
            <div className="aspect-square bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
            <div className="aspect-square bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
            <div className="aspect-square bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
          </div>
        </div>
      </main>
    </div>
  )
}
