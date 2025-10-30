'use client'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function CartButton() {
  const { count } = useCart()
  return (
    <Link href="/cart" className="relative inline-flex items-center text-white hover:text-brand-grey">
      <ShoppingCart className="h-5 w-5" />
      {(count > 0 && (
        <span className="absolute -top-2 -right-2 bg-brand-charcoal text-white text-[10px] leading-none px-1.5 py-0.5 rounded-full">
          {count}
        </span>
      ))as React.ReactNode }
    </Link>
  )
}
