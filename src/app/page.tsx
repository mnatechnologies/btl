import Hero from "@/components/Hero";
import { ThreeItemGrid } from "@/components/grid/three-items";
import { FourItemGrid } from "@/components/grid/four-items";
import { FourItemGridAlt } from "@/components/grid/four-items-alt";
import { FourItemGridMirror } from "@/components/grid/four-items-mirror";

export default function Home() {
  return (
    <main>
      <section className="bg-black text-white py-8 text-center border-b border-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-display font-bold">Built To Last</h2>
          <p className="mt-2 text-neutral-300 text-sm sm:text-base">Premium quality essentials designed for those who value craftsmanship and timeless style.</p>
        </div>
      </section>
      <Hero />
      <ThreeItemGrid />
      <FourItemGrid />
      <FourItemGridAlt />
      <FourItemGridMirror />
    </main>
  );
}
