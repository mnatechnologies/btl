'use client'
import { useCart } from '@/context/CartContext'
import { useMemo, useState } from 'react'

export default function CartPage() {
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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    void checkout()
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>
      {!hasItems ? (
        <p>Your cart is empty.</p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-6">
          <ul className="divide-y divide-border rounded-md border border-border">
            {items.map((item) => (
              <li key={item.id} className="p-4 flex items-center gap-4">
                {item.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.image} alt="" className="h-16 w-16 object-cover rounded" />
                )}
                <div className="flex-1">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-muted-foreground">${(item.price / 100).toFixed(2)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateQty(item.id, parseInt(e.target.value || '1'))}
                    className=" cursor-pointer w-16 border rounded px-2 py-1"
                  />
                  <button type="button" onClick={() => removeItem(item.id)} className=" cursor-pointer text-red-600 hover:underline">Remove</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between">
            <button type="button" onClick={clear} className="text-sm cursor-pointer text-muted-foreground hover:underline">Clear cart</button>
            <div className="text-lg font-semibold">Total: ${totalFormatted}</div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-muted-foreground">Email for receipt and order updates</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!hasItems || loading}
            className=" cursor-pointer w-full rounded bg-black text-white py-3 disabled:opacity-60"
          >
            {loading ? 'Preparing checkout…' : 'Checkout'}
          </button>
        </form>
      )}
    </main>
  )
}
