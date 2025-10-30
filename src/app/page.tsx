// import Hero from "../components/Hero";
// import ProductShowcase from "@/components/ProductShowcase";
// import About from "@/app/about/page";
'use client'

import { useCallback, useEffect, useState } from 'react';
import { ThreeItemGrid } from "@/components/grid/three-items";
import { Carousel } from "@/components/carousel";
import AboutSection from "@/components/AboutSection";
import ProductShowcase from "@/components/ProductShowcase";

type ProductColor = 'Black' | 'Off-White' | 'Grey' | 'White';

type ClickedProduct = {
  handle: string;
  title: string;
  color: ProductColor;
};

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [clickedProduct, setClickedProduct] = useState<ClickedProduct | null>(null);

  const openModal = useCallback((product: ClickedProduct) => {
    setClickedProduct(product);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    // keep clickedProduct so color persists if reopened soon; clear after close animation
    setTimeout(() => setClickedProduct(null), 200);
  }, []);

  // Close on ESC
  useEffect(() => {
    if (!modalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [modalOpen, closeModal]);

  return (
    <main>
      <ThreeItemGrid onProductClick={openModal} />
      <Carousel onProductClick={openModal} />
      <AboutSection />

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeModal}
          />

          {/* Modal content */}
          <div className="relative z-10 max-w-none w-[95vw] sm:w-[90vw] lg:w-[85vw] xl:w-[80vw] 2xl:w-[75vw] max-h-[90vh] overflow-y-auto rounded-lg bg-neutral-900 p-4 sm:p-6 lg:p-8 shadow-xl">
            <div className="flex justify-end bg-neutral-900 ">
              <button
                aria-label="Close"
                className="rounded p-2 text-foreground/70 hover:text-foreground"
                onClick={closeModal}
              >
                ✕
              </button>
            </div>
            <ProductShowcase initialColor={clickedProduct?.color} />
          </div>
        </div>
      )}
    </main>
  );
}
