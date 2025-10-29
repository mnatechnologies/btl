'use client'
import { useState, useEffect } from "react";
import Image from "next/image";

const Hero = () => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  const colorVariants = [
    { name: "Black", image: "/images/black-tshirt-front-flat.jpg" },
    { name: "White", image: "/images/white-tshirt-front-flat.jpg" },
    { name: "Grey", image: "/images/grey-tshirt-front-flat.jpg" },
    { name: "Off-White", image: "/images/offwhite-tshirt-front-flat-new.jpg" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prev) => (prev + 1) % colorVariants.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [colorVariants.length]);

  const currentVariant = colorVariants[currentColorIndex];

  useEffect(() => {
    console.log("Hero v2 loaded. Current variant:", currentVariant.name);
  }, [currentVariant.name]);

  return (
       <section className="flex items-center relative overflow-hidden">
      {/* Enhanced greyscale gradient background */}
      {/*   bg-gradient-to-br from-white via-blue-50 to-blue-300*/}
        <div className="absolute inset-0 bg-gradient-to-tl from-primary via-secondary to-background  z-0" />
        <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(circle at top right, hsl(0 0% 20% / 0.08), transparent 70%)' }} />
         <div className="absolute top-20 right-10 w-48 h-48 border border-accent/5 rounded-full animate-float" />
         <div className="absolute bottom-32 left-10 w-32 h-32 bg-accent/3 rounded-full blur-3xl animate-pulse-slow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <div className="space-y-4">
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold leading-tight
    bg-gradient-to-br from-brand-charcoal via-accent to-brand-grey bg-clip-text text-transparent animate-fade-in">
                  Built To Last
                </h1>

                <p className="text-xl text-foreground/80 max-w-lg leading-relaxed animate-fade-in [animation-delay:200ms] gra">
                  Premium quality t-shirts designed for those who value craftsmanship and timeless style.
                </p>
              </div>
            </div>

            {/* Product Image with subtle blending */}
            <div className="relative w-full max-w-md mx-auto lg:max-w-none">
              {/* Subtle background glow */}
              <div className="absolute -inset-4 sm:-inset-6 lg:-inset-8 bg-gradient-to-br from-accent/15 via-transparent to-muted/15 rounded-3xl blur-xl opacity-50" />

              {/* Main image container */}
              <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                {/* Multiple image layers for smooth transitions */}
                {colorVariants.map((variant, index) => (
                    <div
                        key={variant.name}
                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                            index === currentColorIndex
                                ? 'opacity-100 scale-100'
                                : 'opacity-0 scale-105'
                        }`}
                    >
                      <Image
                          src={variant.image}
                          alt={`BTL Essential T-Shirt - ${variant.name}`}
                          fill
                          className="object-cover"
                          priority={index === 0}
                      />
                      {/* Very subtle overlay for harmony */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/5 via-transparent to-transparent" />
                    </div>
                ))}

                {/* Minimal edge softening */}
                <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent via-transparent to-background/20 pointer-events-none" />

                {/* Color indicator dots */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 bg-background/70 backdrop-blur-sm rounded-full px-4 py-2">
                  {colorVariants.map((_, index) => (
                      <button
                          key={index}
                          onClick={() => setCurrentColorIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              index === currentColorIndex
                                  ? 'bg-foreground scale-125 shadow-lg'
                                  : 'bg-muted-foreground/60 hover:bg-muted-foreground/80 hover:scale-110'
                          }`}
                      />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      // </section>
  );
};

export default Hero;