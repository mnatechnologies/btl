'use client'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'

type CartButtonProps = {
  onClick?: () => void
}

export default function CartButton({ onClick }: CartButtonProps) {
  const { count } = useCart()
  return (
    <button 
      onClick={onClick}
      className="relative inline-flex items-center text-white hover:text-brand-grey cursor-pointer transition-colors"
    >
      <ShoppingCart className="h-5 w-5" />
      {(count > 0 && (
        <span className="absolute -top-2 -right-2 bg-brand-charcoal text-white text-[10px] leading-none px-1.5 py-0.5 rounded-full">
          {count}
        </span>
      ))as React.ReactNode }
    </button>
  )
}
