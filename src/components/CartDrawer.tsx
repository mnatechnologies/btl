'use client'
import { useCart } from '@/context/CartContext'
import { useMemo, useState } from 'react'
import { X } from 'lucide-react'

type CartDrawerProps = {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQty, total, clear } = useCart()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const hasItems = items.length > 0

  const totalFormatted = useMemo(() => (total / 100).toFixed(2), [total])

  const checkout = async () => {
    if (!hasItems) return
    setLoading(true)
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, email })
      })
      if (!res.ok) throw new Error('Failed to create checkout session')
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (e) {
      console.error(e)
      alert('Unable to start checkout. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 transition-opacity "
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-neutral-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <button
              onClick={onClose}
              className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {!hasItems ? (
              <p className="text-center text-neutral-500 dark:text-neutral-400 mt-8">Your cart is empty.</p>
            ) : (
              <div className="space-y-6">
                <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {items.map((item) => (
                    <li key={item.id} className="py-4 flex items-center gap-4">
                      {item.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.image} alt="" className="h-16 w-16 object-cover rounded" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{item.title}</div>
                        <div className="text-sm text-neutral-500 dark:text-neutral-400">${(item.price / 100).toFixed(2)}</div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) => updateQty(item.id, parseInt(e.target.value || '1'))}
                          className="w-16 border border-neutral-300 dark:border-neutral-700 rounded px-2 py-1 bg-white dark:bg-neutral-800"
                        />
                        <button 
                          onClick={() => removeItem(item.id)} 
                          className="text-xs text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  <button 
                    onClick={clear} 
                    className="text-sm text-neutral-500 dark:text-neutral-400 hover:underline"
                  >
                    Clear cart
                  </button>
                  <div className="text-lg font-semibold">Total: ${totalFormatted}</div>
                </div>
              </div>
            )}
          </div>

          {/* Footer with checkout */}
          {hasItems && (
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
              <div className="space-y-2">
                <label className="block text-sm text-neutral-500 dark:text-neutral-400">
                  Email for receipt and order updates
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-neutral-300 dark:border-neutral-700 rounded px-3 py-2 bg-white dark:bg-neutral-800"
                />
              </div>

              <button
                onClick={checkout}
                disabled={!hasItems || loading}
                className="w-full rounded bg-black dark:bg-white text-white dark:text-black py-3 disabled:opacity-60 font-medium"
              >
                {loading ? 'Preparing checkout…' : 'Checkout'}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
