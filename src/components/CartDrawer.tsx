// 'use client'
// import { useCart } from '@/context/CartContext'
// import { useMemo, useState } from 'react'
// import { X, Tag, Check } from 'lucide-react'
//
// type CartDrawerProps = {
//   isOpen: boolean
//   onClose: () => void
// }
//
// export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
//   const { items, removeItem, updateQty, total, clear } = useCart()
//   const [email, setEmail] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [promoCode, setPromoCode] = useState('')
//   const [promoStatus, setPromoStatus] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle')
//   const [promoDiscount, setPromoDiscount] = useState(0)
//   const [promoDescription, setPromoDescription] = useState('')
//   const hasItems = items.length > 0
//
//   const totalFormatted = useMemo(() => (total / 100).toFixed(2), [total])
//   const discountedTotal = useMemo(() => Math.max(0, total - promoDiscount), [total, promoDiscount])
//   const discountedTotalFormatted = useMemo(() => (discountedTotal / 100).toFixed(2), [discountedTotal])
//
//   const validatePromoCode = async () => {
//     if (!promoCode.trim()) return
//     setPromoStatus('validating')
//     try {
//       const res = await fetch('/api/validate-promo', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ code: promoCode })
//       })
//       const data = await res.json()
//       if (data.valid) {
//         setPromoStatus('valid')
//         setPromoDiscount(data.discount)
//         setPromoDescription(data.description)
//       } else {
//         setPromoStatus('invalid')
//         setPromoDiscount(0)
//         setPromoDescription('')
//       }
//     } catch {
//       setPromoStatus('invalid')
//       setPromoDiscount(0)
//     }
//   }
//
//   const clearPromo = () => {
//     setPromoCode('')
//     setPromoStatus('idle')
//     setPromoDiscount(0)
//     setPromoDescription('')
//   }
//
//   const checkout = async () => {
//     if (!hasItems) return
//     setLoading(true)
//     try {
//       const res = await fetch('/api/create-checkout-session', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           items,
//           email,
//           promoCode: promoStatus === 'valid' ? promoCode : undefined
//         })
//       })
//       if (!res.ok) throw new Error('Failed to create checkout session')
//       const data = await res.json()
//       if (data.url) {
//         window.location.href = data.url
//       } else {
//         throw new Error('No checkout URL returned')
//       }
//     } catch (e) {
//       console.error(e)
//       alert('Unable to start checkout. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }
//
//   return (
//     <>
//       {/* Backdrop */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-50 transition-opacity "
//           onClick={onClose}
//         />
//       )}
//
//       {/* Drawer */}
//       <div
//         className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-neutral-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
//           isOpen ? 'translate-x-0' : 'translate-x-full'
//         }`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
//             <h2 className="text-xl font-semibold">Your Cart</h2>
//             <button
//               onClick={onClose}
//               className="cursor-pointer text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
//             >
//               <X className="h-6 w-6" />
//             </button>
//           </div>
//
//           {/* Content */}
//           <div className="flex-1 overflow-y-auto p-4">
//             {!hasItems ? (
//               <p className="text-center text-neutral-500 dark:text-neutral-400 mt-8">Your cart is empty.</p>
//             ) : (
//               <div className="space-y-6">
//                 <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
//                   {items.map((item) => (
//                     <li key={item.id} className="py-4 flex items-center gap-4">
//                       {item.image && (
//                         // eslint-disable-next-line @next/next/no-img-element
//                         <img src={item.image} alt="" className="h-16 w-16 object-cover rounded" />
//                       )}
//                       <div className="flex-1 min-w-0">
//                         <div className="font-medium truncate">{item.title}</div>
//                         <div className="text-sm text-neutral-500 dark:text-neutral-400">${(item.price / 100).toFixed(2)}</div>
//                       </div>
//                       <div className="flex flex-col items-end gap-2">
//                         <input
//                           type="number"
//                           min={1}
//                           value={item.quantity}
//                           onChange={(e) => updateQty(item.id, parseInt(e.target.value || '1'))}
//                           className="w-16 border border-neutral-300 dark:border-neutral-700 rounded px-2 py-1 bg-white dark:bg-neutral-800"
//                         />
//                         <button
//                           onClick={() => removeItem(item.id)}
//                           className=" cursor-pointer text-xs text-red-600 hover:underline"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//
//                 {/* Promo Code Section */}
//                 <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
//                   <div className="flex items-center gap-2 mb-2">
//                     <Tag className="w-4 h-4 text-neutral-500" />
//                     <span className="text-sm font-medium">Promo Code</span>
//                   </div>
//                   {promoStatus === 'valid' ? (
//                     <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
//                       <div className="flex items-center gap-2">
//                         <Check className="w-4 h-4 text-green-600" />
//                         <div>
//                           <p className="text-sm font-medium text-green-700 dark:text-green-400">{promoCode.toUpperCase()}</p>
//                           <p className="text-xs text-green-600 dark:text-green-500">{promoDescription}</p>
//                         </div>
//                       </div>
//                       <button
//                         onClick={clearPromo}
//                         className="text-xs text-green-600 hover:underline"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="flex gap-2">
//                       <input
//                         type="text"
//                         placeholder="Enter code"
//                         value={promoCode}
//                         onChange={(e) => {
//                           setPromoCode(e.target.value.toUpperCase())
//                           if (promoStatus === 'invalid') setPromoStatus('idle')
//                         }}
//                         onKeyDown={(e) => e.key === 'Enter' && validatePromoCode()}
//                         className={`flex-1 border rounded px-3 py-2 text-sm uppercase bg-white dark:bg-neutral-800 ${
//                           promoStatus === 'invalid' ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-700'
//                         }`}
//                       />
//                       <button
//                         onClick={validatePromoCode}
//                         disabled={promoStatus === 'validating' || !promoCode.trim()}
//                         className="px-3 py-2 bg-black dark:bg-white text-white dark:text-black text-sm rounded disabled:opacity-50 cursor-pointer"
//                       >
//                         {promoStatus === 'validating' ? '...' : 'Apply'}
//                       </button>
//                     </div>
//                   )}
//                   {promoStatus === 'invalid' && (
//                     <p className="text-xs text-red-500 mt-1">Invalid promo code</p>
//                   )}
//                 </div>
//
//                 <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
//                   <button
//                     onClick={clear}
//                     className="text-sm cursor-pointer text-neutral-500 dark:text-neutral-400 hover:underline"
//                   >
//                     Clear cart
//                   </button>
//                   <div className="text-right">
//                     {promoDiscount > 0 && (
//                       <div className="text-sm text-neutral-500 line-through">${totalFormatted}</div>
//                     )}
//                     <div className="text-lg font-semibold">
//                       Total: ${discountedTotalFormatted}
//                       {promoDiscount > 0 && (
//                         <span className="text-green-600 text-xs ml-1">(-${(promoDiscount / 100).toFixed(2)})</span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//
//           {/* Footer with checkout */}
//           {hasItems && (
//             <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
//               <div className="space-y-2">
//                 <label className="block text-sm text-neutral-500 dark:text-neutral-400">
//                   Email for receipt and order updates
//                 </label>
//                 <input
//                   type="email"
//                   placeholder="you@example.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full border border-neutral-300 dark:border-neutral-700 rounded px-3 py-2 bg-white dark:bg-neutral-800"
//                 />
//               </div>
//
//               <button
//                 onClick={checkout}
//                 disabled={!hasItems || loading}
//                 className="w-full cursor-pointer rounded bg-black dark:bg-white text-white dark:text-black py-3 disabled:opacity-60 font-medium"
//               >
//                 {loading ? 'Preparing checkout…' : 'Checkout'}
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   )
// }

'use client'
import { useCart } from '@/context/CartContext'
import { useMemo, useState, useEffect } from 'react'
import { X, Tag, Check, Shield, Lock, Loader2 } from 'lucide-react'
import TrustBadges from './TrustBadges'
import { showErrorToast, showSuccessToast } from './ErrorBoundary'
import { calculateGST } from '@/lib/gst'

type CartDrawerProps = {
  isOpen: boolean
  onClose: () => void
}

export default function EnhancedCartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQty, total, clear } = useCart()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [promoStatus, setPromoStatus] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle')
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [promoDescription, setPromoDescription] = useState('')
  const [emailError, setEmailError] = useState('')
  const hasItems = items.length > 0

  const totalFormatted = useMemo(() => (total / 100).toFixed(2), [total])
  const discountedTotal = useMemo(() => Math.max(0, total - promoDiscount), [total, promoDiscount])
  const discountedTotalFormatted = useMemo(() => (discountedTotal / 100).toFixed(2), [discountedTotal])

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Recalculate promo discount when cart total changes
  useEffect(() => {
    if (promoStatus === 'valid' && promoCode) {
      // Re-validate the promo code with the new total
      const recalculateDiscount = async () => {
        try {
          const res = await fetch('/api/validate-promo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: promoCode, totalCents: total })
          })
          const data = await res.json()
          if (data.valid) {
            setPromoDiscount(data.discount)
            setPromoDescription(data.description)
          }
        } catch (error) {
          console.error('Failed to recalculate promo discount:', error)
        }
      }
      recalculateDiscount()
    }
  }, [total, promoStatus, promoCode])

  const validatePromoCode = async () => {
    if (!promoCode.trim()) return
    setPromoStatus('validating')
    try {
      const res = await fetch('/api/validate-promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoCode, totalCents: total })
      })
      const data = await res.json()
      if (data.valid) {
        setPromoStatus('valid')
        setPromoDiscount(data.discount)
        setPromoDescription(data.description)
        showSuccessToast('Promo code applied!')
      } else {
        setPromoStatus('invalid')
        setPromoDiscount(0)
        setPromoDescription('')
        showErrorToast('Invalid promo code')
      }
    } catch (error) {
      setPromoStatus('invalid')
      setPromoDiscount(0)
      showErrorToast('Failed to validate promo code')
      console.error('Promo validation error:', error)
    }
  }

  const clearPromo = () => {
    setPromoCode('')
    setPromoStatus('idle')
    setPromoDiscount(0)
    setPromoDescription('')
  }

  const checkout = async () => {
    if (!hasItems) {
      showErrorToast('Your cart is empty')
      return
    }

  // Validate email is required
   if (!email || !email.trim()) {
      setEmailError('Email is required')
      showErrorToast('Please enter your email address')
      return
    }

   // Validate email format
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address')
      showErrorToast('Please enter a valid email address')
      return
  }
    setEmailError('')

    setLoading(true)

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          email,
          promoCode: promoStatus === 'valid' ? promoCode : undefined
        })
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create checkout session')
      }

      const data = await res.json()
      if (data.url) {
        // Success - redirect to Stripe
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      const message = error instanceof Error ? error.message : 'Unable to start checkout. Please try again.'
      showErrorToast(message)
    } finally {
      setLoading(false)
    }
  }


  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
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
            <h2 className="text-xl font-semibold">Your Cart ({items.length})</h2>
            <button
              onClick={onClose}
              className="cursor-pointer text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
              aria-label="Close cart"
            >
              <X className="h-6 w-6" />
            </button>
          </div>



          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {!hasItems ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-24 h-24 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <p className="text-neutral-500 dark:text-neutral-400 mb-4">Your cart is empty</p>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Cart Items */}
                <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {items.map((item) => (
                    <li key={item.id} className="py-4 flex items-center gap-4">
                      {item.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.image} alt={item.title} className="h-20 w-20 object-cover rounded-lg" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate text-sm">{item.title}</div>
                        <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                          ${(item.price / 100).toFixed(2)}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <select
                          value={item.quantity}
                          onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
                          className="w-16 border border-neutral-300 dark:border-neutral-700 rounded px-2 py-1 text-sm bg-white dark:bg-neutral-800 cursor-pointer"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="cursor-pointer text-xs text-red-600 hover:text-red-700 dark:hover:text-red-500 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Promo Code Section */}
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-4 h-4 text-neutral-500" />
                    <span className="text-sm font-medium">Promo Code</span>
                  </div>
                  {promoStatus === 'valid' ? (
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-green-700 dark:text-green-400">{promoCode.toUpperCase()}</p>
                          <p className="text-xs text-green-600 dark:text-green-500">{promoDescription}</p>
                        </div>
                      </div>
                      <button
                        onClick={clearPromo}
                        className="text-xs text-green-600 hover:text-green-700 dark:hover:text-green-500 underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter code"
                          value={promoCode}
                          onChange={(e) => {
                            setPromoCode(e.target.value.toUpperCase())
                            if (promoStatus === 'invalid') setPromoStatus('idle')
                          }}
                          onKeyDown={(e) => e.key === 'Enter' && validatePromoCode()}
                          className={`flex-1 border rounded-lg px-3 py-2 text-sm uppercase bg-white dark:bg-neutral-800 ${
                            promoStatus === 'invalid' ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-700'
                          }`}
                        />
                        <button
                          onClick={validatePromoCode}
                          disabled={promoStatus === 'validating' || !promoCode.trim()}
                          className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm rounded-lg disabled:opacity-50 cursor-pointer hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center gap-2"
                        >
                          {promoStatus === 'validating' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Apply'}
                        </button>
                      </div>
                      {promoStatus === 'invalid' && (
                        <p className="text-xs text-red-500">Invalid promo code</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Totals with GST Breakdown */}
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">Subtotal (ex GST)</span>
                    <span className="font-medium">${(calculateGST(total).totalExGst / 100).toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">GST (10%)</span>
                    <span className="font-medium">${(calculateGST(total).gstAmount / 100).toFixed(2)}</span>
                  </div>

                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-${(promoDiscount / 100).toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between pt-2 border-t border-neutral-200 dark:border-neutral-800">
                    <span className="text-lg font-semibold">Total (inc GST)</span>
                    <span className="text-lg font-semibold">${discountedTotalFormatted}</span>
                  </div>
                </div>

                {/* Trust Badges - Now in scrollable area */}
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  <TrustBadges variant='checkout' />
                </div>
              </div>
            )}
          </div>

          {/* Footer with checkout */}
          {hasItems && (
            <div className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
              {/* Email Input */}
              <div className="p-4 space-y-2">
                <label className="block text-sm text-neutral-600 dark:text-neutral-400">
                  Email for receipt
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (emailError) setEmailError('Please enter an email1')
                    }}
                    className={`w-full border rounded-lg px-3 py-2 text-sm bg-white dark:bg-neutral-800 ${
                      emailError ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-700'
                    }`}
                  />
                  {emailError && (
                    <p className="text-xs text-red-500 mt-1">{emailError}</p>
                  )}
                </div>
              </div>

              {/* Checkout Button */}
              <div className="px-4 pb-4">
                <button
                  onClick={checkout}
                  disabled={loading}
                  className="w-full cursor-pointer rounded-lg bg-black dark:bg-white text-white dark:text-black py-4 font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Preparing checkout...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Secure Checkout — ${discountedTotalFormatted}
                    </>
                  )}
                </button>
              </div>

              {/* Clear Cart Link */}
              <div className="px-4 pb-4 text-center">
                <button
                  onClick={clear}
                  className="text-sm cursor-pointer text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 underline"
                >
                  Clear cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}