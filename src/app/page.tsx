import Hero from "@/components/Hero";
import { ThreeItemGrid } from "@/components/grid/three-items";
import { Carousel } from "@/components/carousel";

export default function Home() {
  return (
    <main>
      <Hero />
      <ThreeItemGrid />
      <Carousel />
    </main>
  );
}
