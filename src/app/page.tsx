// import Hero from "../components/Hero";
// import ProductShowcase from "@/components/ProductShowcase";
// import About from "@/app/about/page";
import {ThreeItemGrid} from "@/components/grid/three-items";
import {Carousel} from "@/components/carousel";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/footer";
import ProductShowcase from "@/components/ProductShowcase";

export default function Home() {
  return (
    <main>
        <ThreeItemGrid />
        <Carousel />
        <AboutSection />
        <ProductShowcase />
    </main>
  );
}
