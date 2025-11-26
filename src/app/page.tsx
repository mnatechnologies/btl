import Hero from "@/components/Hero";
import { FourItemGrid } from "@/components/grid/four-items";
import { FourItemGridAlt } from "@/components/grid/four-items-alt";
import { FourItemGridMirror } from "@/components/grid/four-items-mirror";

export default function Home() {
  return (
    <main>
      <section className="bg-black text-white py-6 text-center border-b border-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold tracking-tight">Built To Last</h2>
        </div>
      </section>
      <Hero />
     
      <FourItemGrid />
      <FourItemGridAlt />
      <FourItemGridMirror />
    </main>
  );
}
