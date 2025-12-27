'use client'
import { X } from "lucide-react";
import { useState } from "react";
import { getSaleConfig, getDefaultPromo } from "@/lib/saleConfig";

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const sale = getSaleConfig();
  const promo = getDefaultPromo();

  if (!isVisible) return null;

  if (sale.isActive) {
    return (
      <div className="relative h-10 overflow-hidden bg-brand-charcoal">
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="text-center pr-8">
            <p className="text-white text-xs sm:text-sm font-bold tracking-wide animate-pulse">
              <span className="hidden sm:inline">{sale.bannerText}</span>
              <span className="sm:hidden">{sale.bannerTextMobile}</span>
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            aria-label="Close banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-10 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(/images/banner-texture.jpg)` }}
      >
        <div className="absolute inset-0 bg-brand-charcoal/80"></div>
      </div>
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="text-center pr-8">
          <p className="text-primary-foreground/80 text-xs sm:text-sm">
              <span className="hidden sm:inline">
                {promo.discountPercent}% off with code {promo.code} | Free shipping on orders over $100
              </span>
            <span className="sm:hidden">
                {promo.discountPercent}% off: {promo.code} | Free shipping $100+
              </span>
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
          aria-label="Close banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default TopBanner;