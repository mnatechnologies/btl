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
      <div className={`space-y-4 ${className}`}>
        {/* Security Header */}

        {/* Trust Icons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex flex-col items-center text-center p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
            <Shield className="w-6 h-6 text-green-600 mb-2" />
            <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">SSL Secured</span>
            <span className="text-xs text-neutral-500">256-bit encryption</span>
          </div>

          <div className="flex flex-col items-center text-center p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
            <CreditCard className="w-6 h-6 text-blue-600 mb-2" />
            <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Secure Payment</span>
            <span className="text-xs text-neutral-500">PCI DSS compliant</span>
          </div>

          <div className="flex flex-col items-center text-center p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
            <PackageCheck className="w-6 h-6 text-purple-600 mb-2" />
            <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Order Protection</span>
            <span className="text-xs text-neutral-500">Guaranteed delivery</span>
          </div>

          <div className="flex flex-col items-center text-center p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
            <RefreshCcw className="w-6 h-6 text-orange-600 mb-2" />
            <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Easy Returns</span>
            <span className="text-xs text-neutral-500">14-day policy</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4">
          <p className="text-xs text-neutral-500 text-center mb-3">Accepted Payment Methods</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">

            {/* Visa */}
            <SiVisa />
            {/* Mastercard */}
            <SiMastercard />
            {/* Apple Pay */}
            <SiApplepay />
            {/* Google Pay */}
            <SiGooglepay />

          </div>
        </div>

        {/* Australian Consumer Law */}
        <div className="text-center text-xs text-neutral-500 pt-2">
          <p>Protected under Australian Consumer Law</p>
        </div>
      </div>
    )
  }

  if (variant === 'product') {
    return (
      <div className={`flex items-center gap-4 flex-wrap ${className}`}>
        <div className="flex items-center gap-2 text-sm">
          <Shield className="w-4 h-4 text-green-600" />
          <span className="text-neutral-700 dark:text-neutral-300">Secure Checkout</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Truck className="w-4 h-4 text-blue-600" />
          <span className="text-neutral-700 dark:text-neutral-300">Free Shipping Over $100</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <RefreshCcw className="w-4 h-4 text-orange-600" />
          <span className="text-neutral-700 dark:text-neutral-300">14-Day Returns</span>
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