'use client'
import {useState, useEffect, useRef, startTransition} from "react";
import Image from "next/image";
import {useCart} from "@/context/CartContext";
import {useRouter} from "next/navigation";
import {Product, ProductVariant} from "@/app/types/Product";
import SizeChart from "./SizeChart";

interface ProductShowcaseProps {
    product: Product;
    initialColor?: string;
}

const ProductShowcase = ({product, initialColor}: ProductShowcaseProps) => {
    const {addItem} = useCart();
    const router = useRouter();
    const [selectedColor, setSelectedColor] = useState(() => {
        // Initialize selected color from initialColor or first available color
        const availableColors = [...new Set(product.variants.map(v => v.color))];
        if (initialColor && availableColors.includes(initialColor)) {
            return initialColor;
        }
        return availableColors[0] || "Black";
    });
    const [selectedSize, setSelectedSize] = useState("M");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
    const prevInitialColorRef = useRef<string | undefined>(initialColor);

    // Ensure that when the incoming initialColor changes (e.g., via client nav), the state syncs once
    useEffect(() => {
        if (initialColor && product && initialColor !== prevInitialColorRef.current) {
            const availableColors = [...new Set(product.variants.map(v => v.color))];
            if (availableColors.includes(initialColor) && initialColor !== selectedColor) {
                prevInitialColorRef.current = initialColor;
                startTransition(() => {
                    setSelectedColor(initialColor);
                    setCurrentImageIndex(0);
                });
            }
        }
    }, [initialColor, product, selectedColor]);

    // Get available colors and sizes from product variants
    const availableColors = [...new Set(product.variants.map(v => v.color))];
    const availableSizes = [...new Set(product.variants.filter(v => v.color === selectedColor).map(v => v.size))];
    
    // Get images for selected color
    const getProductImages = () => {
        // Find a variant with the selected color
        const variantWithColor = product.variants.find(v => v.color === selectedColor);
        
        // Use variant images if available, otherwise fall back to product images
        if (variantWithColor?.images && variantWithColor.images.length > 0) {
            return variantWithColor.images;
        }
        
        return product.images || [];
    };

    const currentImages = getProductImages();
    const displayImages = currentImages.slice(0, 5);
    
    // Get the current selected variant
    const getCurrentVariant = (): ProductVariant | undefined => {
        if (!selectedSize) return undefined;
        return product.variants.find(v => v.color === selectedColor && v.size === selectedSize);
    };

    const handleImageClick = () => {
        setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
    };

    const handleColorChange = (colorName: string) => {
        console.log("Color changed to", colorName)
        setSelectedColor(colorName);
        setCurrentImageIndex(0);

        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('color', colorName);
        router.replace(currentUrl.pathname + currentUrl.search);
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

        const variant = getCurrentVariant();
        
        if (!variant) {
            console.log({
                title: "Variant not available",
                description: "This size/color combination is not available.",
                variant: "destructive",
            });
            return;
        }

        // Check inventory
        if (variant.inventory <= 0) {
            console.log({
                title: "Out of stock",
                description: "This item is currently out of stock.",
                variant: "destructive",
            });
            return;
        }

        // Add to cart (price in cents)
        addItem({
            id: variant.id,
            title: `${product.name} — ${selectedColor} / ${selectedSize}`,
            price: Math.round(variant.price * 100),
            image: currentImages[0] || product.images[0],
            quantity: 1,
            sku: variant.sku,
        });

        console.log(
            "Added to cart:",
            `${product.name} — ${selectedColor} / ${selectedSize}`,
            variant.sku
        );
    };

    // Get color display values for UI
    const getColorClass = (color: string) => {
        switch (color.toLowerCase()) {
            case 'black': return 'bg-black';
            case 'white': return 'bg-white border border-border';
            case 'grey':
            case 'light grey': return 'bg-gray-400';
            case 'beige': return 'bg-amber-100 border border-border';
            default: return 'bg-gray-300 border border-border';
        }
    };

    return (
        <section id="shop" className="py-12  ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Product Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div
                            className="aspect-[4/5] relative overflow-hidden brand-shadow rounded-sm cursor-pointer"
                            onClick={handleImageClick}
                        >
                            {currentImages.length > 0 ? (
                                <Image
                                    src={currentImages[currentImageIndex]}
                                    alt={`${product.name} ${selectedColor} - View ${currentImageIndex + 1}`}
                                    fill
                                    className="object-contain object-center hover:scale-120 transition-transform duration-700"
                                    style={{objectPosition: 'center 20%'}}
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full bg-gray-800">
                                    <p className="text-white">No image available</p>
                                </div>
                            )}
                            {/* Click indicator */}
                            {currentImages.length > 1 && (
                                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                                    {currentImageIndex + 1} / {currentImages.length}
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Images */}
                        {displayImages.length > 1 && (
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
                                            alt={`${product.name} ${selectedColor} - Thumbnail ${index + 1}`}
                                            fill
                                            className="object-cover object-center"
                                            style={{objectPosition: 'center 20%'}}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6 fade-up">
                        <div className="space-y-4">
                            {product.featured && (
                                <div className="inline-flex">
                                    <span className="px-4 py-1.5 border border-white  text-white text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-brand-charcoal hover:text-white">
                                        New Release
                                    </span>
                                </div>
                            )}

                            <h2 className="text-4xl font-display font-bold text-white">
                                {product.name}
                            </h2>
                            <h4 className="text-xs font-display font-medium text-white">
                                {getCurrentVariant()?.sku}
                            </h4>
                            <p className="text-2xl font-medium text-white">
                                ${(getCurrentVariant()?.price || product.basePrice).toFixed(2)}
                            </p>
                            <p className="text-brand-grey leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Color Selection */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-white uppercase tracking-wider">
                                Color
                            </h3>
                            <div className="flex gap-3">
                                {availableColors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => handleColorChange(color)}
                                        className={`relative cursor-pointer overflow-hidden group w-12 h-12 rounded-full transition-all ${getColorClass(color)} ${
                                            selectedColor === color ? "ring-2 ring-accent ring-offset-2" : ""
                                        }`}
                                    >
                                        <span className="absolute inset-0 bg-white/20 scale-0 group-active:scale-100 transition-transform duration-300 rounded-full"/>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-white uppercase tracking-wider">
                                Size
                            </h3>
                            <div className="grid grid-cols-6 gap-2">
                                {availableSizes.map((size) => {
                                    const sizeVariant = product.variants.find(v => v.color === selectedColor && v.size === size);
                                    const isOutOfStock = sizeVariant ? sizeVariant.inventory <= 0 : true;
                                    
                                    return (
                                        <button
                                            key={size}
                                            onClick={() => !isOutOfStock && setSelectedSize(size)}
                                            disabled={isOutOfStock}
                                            className={`cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95
                                                px-4 py-2 border ${
                                                selectedSize === size
                                                    ? "bg-brand-charcoal text-white border-brand-charcoal"
                                                    : isOutOfStock
                                                        ? "bg-transparent text-gray-600 border-gray-700 cursor-not-allowed"
                                                        : "bg-transparent text-white border-border hover:border-brand-charcoal"
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <div className="space-y-4 pt-4">
                            <button
                                className=" cursor-pointer w-full py-3 px-6 bg-brand-charcoal border border-white text-white hover:bg-opacity-90 transition-colors hover-lift"
                                onClick={handleAddToCart}
                            >
                                Add to Cart - ${(getCurrentVariant()?.price || product.basePrice).toFixed(2)}
                            </button>
                            <button
                                onClick={() => setIsSizeChartOpen(true)}
                                className="cursor-pointer w-full py-3 px-6 border border-white text-white hover:bg-brand-charcoal hover:text-white transition-colors">
                                Size Guide
                            </button>
                        </div>

                        {/* Product Features */}
                        <div className="space-y-4 pt-8 border-t border-border">
                            <h3 className="text-sm font-medium text-brand-grey uppercase tracking-wider">
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
            <SizeChart isOpen={isSizeChartOpen} onClose={() => setIsSizeChartOpen(false)} />
        </section>
    );
};

export default ProductShowcase;