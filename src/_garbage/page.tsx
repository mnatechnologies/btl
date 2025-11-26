'use client'
import { useCart } from '@/context/CartContext'
import { useMemo, useState } from 'react'
import { Tag, Check, X } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQty, total, clear } = useCart()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [promoStatus, setPromoStatus] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle')
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [promoDescription, setPromoDescription] = useState('')
  const hasItems = items.length > 0

  const totalFormatted = useMemo(() => (total / 100).toFixed(2), [total])
  const discountedTotal = useMemo(() => Math.max(0, total - promoDiscount), [total, promoDiscount])
  const discountedTotalFormatted = useMemo(() => (discountedTotal / 100).toFixed(2), [discountedTotal])

  const validatePromoCode = async () => {
    if (!promoCode.trim()) return
    setPromoStatus('validating')
    try {
      const res = await fetch('/api/validate-promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoCode })
      })
      const data = await res.json()
      if (data.valid) {
        setPromoStatus('valid')
        setPromoDiscount(data.discount)
        setPromoDescription(data.description)
      } else {
        setPromoStatus('invalid')
        setPromoDiscount(0)
        setPromoDescription('')
      }
    } catch {
      setPromoStatus('invalid')
      setPromoDiscount(0)
    }
  }

  const clearPromo = () => {
    setPromoCode('')
    setPromoStatus('idle')
    setPromoDiscount(0)
    setPromoDescription('')
  }

  const checkout = async () => {
    if (!hasItems) return
    setLoading(true)
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          items, 
          email, 
          name, 
          phone,
          promoCode: promoStatus === 'valid' ? promoCode : undefined
        })
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

          {/* Promo Code Section */}
          <div className="p-4 border border-border rounded-lg bg-gray-50 dark:bg-gray-900">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-4 h-4" />
              <span className="text-sm font-medium">Promo Code</span>
            </div>
            {promoStatus === 'valid' ? (
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-700 dark:text-green-400">{promoCode.toUpperCase()}</p>
                    <p className="text-sm text-green-600 dark:text-green-500">{promoDescription}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={clearPromo}
                  className="p-1 hover:bg-green-100 dark:hover:bg-green-800 rounded"
                >
                  <X className="w-4 h-4 text-green-600" />
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value.toUpperCase())
                    if (promoStatus === 'invalid') setPromoStatus('idle')
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), validatePromoCode())}
                  className={`flex-1 border rounded px-3 py-2 uppercase ${
                    promoStatus === 'invalid' ? 'border-red-500' : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={validatePromoCode}
                  disabled={promoStatus === 'validating' || !promoCode.trim()}
                  className="px-4 py-2 bg-black text-white rounded disabled:opacity-50 cursor-pointer"
                >
                  {promoStatus === 'validating' ? 'Checking...' : 'Apply'}
                </button>
              </div>
            )}
            {promoStatus === 'invalid' && (
              <p className="text-sm text-red-500 mt-2">Invalid promo code</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button type="button" onClick={clear} className="text-sm cursor-pointer text-muted-foreground hover:underline">Clear cart</button>
            <div className="text-right">
              {promoDiscount > 0 && (
                <div className="text-sm text-muted-foreground line-through">
                  ${totalFormatted}
                </div>
              )}
              <div className="text-lg font-semibold">
                Total: ${discountedTotalFormatted}
                {promoDiscount > 0 && (
                  <span className="text-green-600 text-sm ml-2">(-${(promoDiscount / 100).toFixed(2)})</span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Full Name *</label>
              <input
                type="text"
                placeholder="John Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-1">Email *</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="0400 000 000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
              <p className="text-xs text-muted-foreground mt-1">Optional - helps with delivery</p>
            </div>
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
