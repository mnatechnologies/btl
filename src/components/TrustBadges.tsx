'use client'
import { Shield, Lock, PackageCheck, CreditCard, RefreshCcw, Truck } from 'lucide-react'
import {SiApplepay, SiGooglepay, SiMastercard, SiVisa} from '@icons-pack/react-simple-icons'

type TrustBadgesProps = {
  variant?: 'checkout' | 'product' | 'footer'
  className?: string
}

export default function TrustBadges({ variant = 'checkout', className = '' }: TrustBadgesProps) {
  if (variant === 'checkout') {
    return (
      <div className={`space-y-2 sm:space-y-4 ${className}`}>
        {/* Security Header */}

        {/* Trust Icons - More compact on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          <div className="flex flex-col items-center text-center p-2 sm:p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
            <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-green-600 mb-1 sm:mb-2" />
            <span className="text-[10px] sm:text-xs font-medium text-neutral-700 dark:text-neutral-300">SSL Secured</span>
            <span className="text-[9px] sm:text-xs text-neutral-500 hidden sm:block">256-bit encryption</span>
          </div>

          <div className="flex flex-col items-center text-center p-2 sm:p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
            <CreditCard className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600 mb-1 sm:mb-2" />
            <span className="text-[10px] sm:text-xs font-medium text-neutral-700 dark:text-neutral-300">Secure Payment</span>
            <span className="text-[9px] sm:text-xs text-neutral-500 hidden sm:block">PCI DSS compliant</span>
          </div>

          <div className="flex flex-col items-center text-center p-2 sm:p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
            <PackageCheck className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600 mb-1 sm:mb-2" />
            <span className="text-[10px] sm:text-xs font-medium text-neutral-700 dark:text-neutral-300">Order Protection</span>
            <span className="text-[9px] sm:text-xs text-neutral-500 hidden sm:block">Guaranteed delivery</span>
          </div>

          <div className="flex flex-col items-center text-center p-2 sm:p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
            <RefreshCcw className="w-4 h-4 sm:w-6 sm:h-6 text-orange-600 mb-1 sm:mb-2" />
            <span className="text-[10px] sm:text-xs font-medium text-neutral-700 dark:text-neutral-300">Easy Returns</span>
            <span className="text-[9px] sm:text-xs text-neutral-500 hidden sm:block">14-day policy</span>
          </div>
        </div>

        {/* Payment Methods - More compact on mobile */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-2 sm:pt-4">
          <p className="text-[10px] sm:text-xs text-neutral-500 text-center mb-2 sm:mb-3">Accepted Payment Methods</p>
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">

            {/* Visa */}
            <SiVisa className="w-6 h-6 sm:w-8 sm:h-8" />
            {/* Mastercard */}
            <SiMastercard className="w-6 h-6 sm:w-8 sm:h-8" />
            {/* Apple Pay */}
            <SiApplepay className="w-6 h-6 sm:w-8 sm:h-8" />
            {/* Google Pay */}
            <SiGooglepay className="w-6 h-6 sm:w-8 sm:h-8" />

          </div>
        </div>

        {/* Australian Consumer Law - Hidden on mobile to save space */}
        <div className="text-center text-[9px] sm:text-xs text-neutral-500 pt-1 sm:pt-2 hidden sm:block">
          <p>Protected under Australian Consumer Law</p>
        </div>
      </div>
    )
  }

  if (variant === 'product') {
    return (
      <div className={`flex justify-evenly gap-4 flex-wrap ${className}`}>
        <div className="flex items-center gap-2 text-sm">
          <Shield className="w-4 h-4 text-green-600" />
          <span className="text-neutral-700 dark:text-neutral-300">Secure Checkout</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Truck className="w-4 h-4 text-blue-600" />
          <span className="text-neutral-700 dark:text-neutral-300">Free Shipping </span>
        </div>
      </div>
    )
  }

  // Footer variant
  return (
    <div className={`flex items-center justify-center gap-6 flex-wrap ${className}`}>
      <div className="flex items-center gap-2">
        <Lock className="w-4 h-4 text-green-600" />
        <span className="text-xs text-neutral-500">Secure Payment</span>
      </div>
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4 text-blue-600" />
        <span className="text-xs text-neutral-500">Australian Business</span>
      </div>
      <div className="flex items-center gap-2">
        <PackageCheck className="w-4 h-4 text-purple-600" />
        <span className="text-xs text-neutral-500">Quality Guaranteed</span>
      </div>
    </div>
  )
}