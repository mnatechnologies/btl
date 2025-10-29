
'use client'
import { useState, useEffect } from "react";
import Image from "next/image";

interface ProductShowcaseProps {
  initialColor?: string;
}

const ProductShowcase = ({ initialColor }: ProductShowcaseProps) => {
  const [selectedColor, setSelectedColor] = useState(initialColor || "Black");
  const [selectedSize, setSelectedSize] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Ensure that when the incoming initialColor changes (e.g., via client nav), the state syncs once
  useEffect(() => {
    if (initialColor) {
      setSelectedColor(initialColor);
      setCurrentImageIndex(0);
    }
  }, [initialColor]);

  const colors = [
    { name: "Black", value: "bg-black", available: true },
    { name: "White", value: "bg-white border border-border", available: true },
    { name: "Grey", value: "bg-brand-grey", available: true },
    { name: "Off-White", value: "bg-stone border border-border", available: true },
  ];

  const sizes = ["XXS", "XS", "S", "M", "L", "XL"];

  const getProductImages = () => {
    switch (selectedColor) {
      case "White":
        return [
          "/images/white-tshirt-front-flat.jpg",
          "/images/white-tshirt-back-flat.jpg",
          "/images/white-tshirt-front-flat.jpg",
          "/images/white-tshirt-back-flat.jpg"
        ];
      case "Grey":
        return [
          "/images/grey-tshirt-front-flat.jpg",
          "/images/grey-tshirt-back-full.jpg",
          "/images/grey-tshirt-back-flat.jpg",
          "/images/grey-tshirt-front-flat.jpg"
        ];
      case "Off-White":
        return [
          "/images/offwhite-tshirt-front-flat-new.jpg",
          "/images/offwhite-tshirt-back-flat-photo4.jpg",
          "/images/offwhite-tshirt-back-flat-new.jpg",
          "/images/offwhite-tshirt-detail1.jpg",
          "/images/offwhite-tshirt-detail2.jpg",
          "/images/offwhite-tshirt-detail3.jpg",
          "/images/offwhite-tshirt-detail4.jpg"
        ];
      default: // Black
        return [
          "/images/black-tshirt-front-flat.jpg",
          "/images/black-tshirt-back-flat.jpg",
          "/images/black-tshirt-front-flat.jpg",
          "/images/black-tshirt-back-flat.jpg"
        ];
    }
  };

  const currentImages = getProductImages();
  const displayImages = currentImages.slice(0, 5);

  const handleImageClick = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
  };

  const handleColorChange = (colorName: string) => {
    console.log("Color changed to", colorName)
    setSelectedColor(colorName);
    setCurrentImageIndex(0);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      console.log({
        title: "Please select a size",
        description: "You need to choose a size before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    const product = {
      id: "btl-essential-tee",
      name: "Essential Tee",
      description: "Premium organic cotton t-shirt designed for comfort and durability",
      basePrice: 220.00,
      images: currentImages,
      variants: [],
      category: "T-Shirts",
      tags: ["organic", "cotton", "sustainable"],
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const variant = {
      id: `${product.id}-${selectedColor.toLowerCase()}-${selectedSize.toLowerCase()}`,
      size: selectedSize,
      color: selectedColor,
      sku: `BTL-TEE-${selectedColor.toUpperCase()}-${selectedSize}`,
      price: 220.00,
      inventory: 50,
      images: currentImages,
    };
  };

  return (
      <section id="shop" className="py-12 bg-gradient-to-tr from-primary/50 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div
                  className="aspect-[4/5] relative overflow-hidden brand-shadow rounded-sm cursor-pointer"
                  onClick={handleImageClick}
              >
                <Image
                    src={currentImages[currentImageIndex]}
                    alt={`BTL T-Shirt ${selectedColor} - View ${currentImageIndex + 1}`}
                    fill
                    className="object-contain object-center hover:scale-120 transition-transform duration-700"
                    style={{ objectPosition: 'center 20%' }}
                />
                {/* Click indicator */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  {currentImageIndex + 1} / {currentImages.length}
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-5 gap-2">
                {displayImages.map((image, index) => (
                    <div
                        key={index}
                        className={`aspect-[4/5] relative overflow-hidden brand-shadow rounded-sm cursor-pointer transition-all duration-200 ${
                            currentImageIndex === index ? 'ring-2 ring-brand-charcoal' : 'hover:opacity-80'
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                    >
                      <Image
                          src={currentImages[index]}
                          alt={`BTL T-Shirt ${selectedColor} - Thumbnail ${index + 1}`}
                          fill
                          className="object-cover object-center"
                          style={{ objectPosition: 'center 20%' }}
                      />
                    </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6 fade-up">
              <div className="space-y-4">
                <div className="inline-flex">
                  <span className="px-4 py-1.5 border border-brand-charcoal bg-brand-off-white text-brand-charcoal text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-brand-charcoal hover:text-white">
                    New Release
                  </span>
                </div>

                <h2 className="text-4xl font-display font-bold text-brand-charcoal">
                  Essential Tee
                </h2>
                <p className="text-2xl font-medium text-brand-charcoal">
                  $220.00
                </p>
                <p className="text-brand-grey leading-relaxed">
                  Our signature t-shirt crafted from premium 100% organic cotton.
                  Designed for comfort, built to last. Features the iconic BTL branding
                  with a modern minimalist aesthetic.
                </p>
              </div>

              {/* Color Selection */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-brand-charcoal uppercase tracking-wider">
                  Color
                </h3>
                <div className="flex gap-3">
                  {colors.map((color) => (
                      <button
                          key={color.name}
                          onClick={() => handleColorChange(color.name)}
                          disabled={!color.available}
                          className={`relative cursor-pointer overflow-hidden group w-12 h-12 rounded-full transition-all ${color.value} ${
                              selectedColor === color.name ? "ring-2 ring-accent ring-offset-2" : ""
                          }`}
                      >
                        <span className="absolute inset-0 bg-white/20 scale-0 group-active:scale-100
                              transition-transform duration-300 rounded-full" />
                      </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-brand-charcoal uppercase tracking-wider">
                  Size
                </h3>
                <div className="grid grid-cols-6 gap-2">
                  {sizes.map((size) => (
                      <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95
                          px-4 py-2 border ${
                              selectedSize === size
                                  ? "bg-brand-charcoal text-white border-brand-charcoal"
                                  : "bg-transparent text-brand-charcoal border-border hover:border-brand-charcoal"
                          }`}
                      >
                        {size}
                      </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-4 pt-4">
                <button
                    className="w-full py-3 px-6 bg-brand-charcoal text-white hover:bg-opacity-90 transition-colors hover-lift"
                    onClick={handleAddToCart}
                >
                  Add to Cart - $220.00
                </button>
                <button className="w-full py-3 px-6 border border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-white transition-colors">
                  Size Guide
                </button>
              </div>

              {/* Product Features */}
              <div className="space-y-4 pt-8 border-t border-border">
                <h3 className="text-sm font-medium text-brand-charcoal uppercase tracking-wider">
                  Features
                </h3>
                <ul className="space-y-2 text-brand-grey">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-brand-charcoal rounded-full"></div>
                    100% Organic Cotton
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-brand-charcoal rounded-full"></div>
                    Pre-shrunk & Colorfast
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-brand-charcoal rounded-full"></div>
                    Reinforced Seams
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-brand-charcoal rounded-full"></div>
                    Machine Washable
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default ProductShowcase;