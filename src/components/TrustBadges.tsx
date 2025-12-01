'use client'
import { Shield, Lock, PackageCheck, CreditCard, RefreshCcw, Truck } from 'lucide-react'

type TrustBadgesProps = {
  variant?: 'checkout' | 'product' | 'footer'
  className?: string
}

export default function TrustBadges({ variant = 'checkout', className = '' }: TrustBadgesProps) {
  if (variant === 'checkout') {
    return (
      <div className={`space-y-4 ${className}`}>
        {/* Security Header */}
        <div className="flex items-center gap-2 justify-center">
          <Lock className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Secure Checkout
          </span>
        </div>

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
            <div className="bg-white border border-neutral-200 rounded px-3 py-2 flex items-center justify-center h-8 w-14">
              <svg viewBox="0 0 48 32" className="h-full w-full">
                <rect width="48" height="32" fill="#fff"/>
                <path d="M19.8 21.6l2.4-13.2h3.6l-2.4 13.2h-3.6zm16.8-12.9c-.7-.3-1.8-.6-3.2-.6-3.5 0-6 1.8-6 4.4 0 1.9 1.7 3 3 3.6 1.3.7 1.8 1.1 1.8 1.7 0 .9-1.1 1.3-2.1 1.3-1.4 0-2.2-.2-3.3-.7l-.5-.2-.5 2.8c.8.4 2.3.7 3.9.7 3.7 0 6.1-1.8 6.1-4.6 0-1.5-.9-2.6-2.9-3.5-1.2-.6-1.9-1-1.9-1.6 0-.5.6-1.1 1.8-1.1 1 0 1.8.2 2.3.4l.3.1.5-2.7zm5.8-1.3h-2.8c-.9 0-1.5.2-1.9 1.1l-5.4 12.1h3.7l.7-2h4.5c.1.5.4 2 .4 2h3.3l-2.9-13.2h.4zm-4.7 8.5c.3-.7 1.4-3.7 1.4-3.7s.3-.7.5-1.2l.2 1.2s.7 3.1.8 3.7h-2.9zM15.7 8.4L12.1 18l-.4-1.8c-.7-2.1-2.8-4.4-5.1-5.5l3.2 11.9h3.7l5.6-13.2h-3.4z" fill="#1434CB"/>
                <path d="M9.6 8.4H3.2l-.1.4c4.4 1.1 7.3 3.7 8.5 6.9l-1.2-6.1c-.2-.9-.8-1.1-1.8-1.2" fill="#F7B600"/>
              </svg>
            </div>

            {/* Mastercard */}
            <div className="bg-white border border-neutral-200 rounded px-3 py-2 flex items-center justify-center h-8 w-14">
              <svg viewBox="0 0 48 32" className="h-full w-full">
                <rect width="48" height="32" fill="#fff"/>
                <circle cx="18" cy="16" r="10" fill="#EB001B"/>
                <circle cx="30" cy="16" r="10" fill="#F79E1B"/>
                <path d="M24 9.6c-1.7 1.4-2.8 3.5-2.8 5.9s1.1 4.5 2.8 5.9c1.7-1.4 2.8-3.5 2.8-5.9s-1.1-4.5-2.8-5.9" fill="#FF5F00"/>
              </svg>
            </div>

            {/* Amex */}
            <div className="bg-white border border-neutral-200 rounded px-3 py-2 flex items-center justify-center h-8 w-14">
              <svg viewBox="0 0 48 32" className="h-full w-full">
                <rect width="48" height="32" fill="#006FCF"/>
                <path d="M6 12h4l1 2.5L12 12h4v8H13v-5l-2 3h-1l-2-3v5H6v-8zm12 0h8v2h-6v1h6v2h-6v1h6v2h-8v-8zm10 0h4l1 2.5 1-2.5h4l-3 4 3 4h-4l-1-2.5-1 2.5h-4l3-4-3-4z" fill="#fff"/>
              </svg>
            </div>

            {/* Apple Pay */}
            <div className="bg-black rounded px-3 py-2 flex items-center justify-center h-8 w-14">
              <svg viewBox="0 0 48 32" className="h-full w-full">
                <path d="M11.5 7c-.8 1-2.1 1.8-3.4 1.7-.2-1.3.4-2.6 1.1-3.4.8-1 2.2-1.7 3.3-1.8.2 1.3-.3 2.6-1 3.5zm1 1.6c-1.8-.1-3.4 1-4.2 1-.9 0-2.2-1-3.6-1-1.9 0-3.6 1.1-4.5 2.7-2 3.7-.5 9.2 1.4 12.2 1 1.5 2.1 3.1 3.6 3 1.4-.1 2-.9 3.6-.9s2.2.9 3.6.9c1.5 0 2.5-1.5 3.5-3 1.1-1.7 1.5-3.4 1.6-3.5 0 0-3-.1-3-4.6 0-3.8 3.1-5.6 3.2-5.6-1.7-2.6-4.4-2.9-5.2-3z" fill="#fff"/>
                <text x="22" y="20" fill="#fff" fontSize="8" fontWeight="500">Pay</text>
              </svg>
            </div>

            {/* Google Pay */}
            <div className="bg-white border border-neutral-200 rounded px-3 py-2 flex items-center justify-center h-8 w-14">
              <svg viewBox="0 0 48 32" className="h-full w-full">
                <path d="M23 15.5v3.3h-2.7c-.2-.6-.7-1-1.3-1-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5c.6 0 1.1-.4 1.3-1H23v3.2c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v.5zm3 3.8v-3.8c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v3.8c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2zm2-.5h2v-2.8h-2v2.8z" fill="#5F6368"/>
                <path d="M11 15c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" fill="#EA4335"/>
                <path d="M13 15c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" fill="#FBBC04"/>
                <path d="M15 15c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" fill="#34A853"/>
                <path d="M17 15c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" fill="#4285F4"/>
              </svg>
            </div>
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