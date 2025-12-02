'use client'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { DatabaseOrder } from '@/types/Order'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [order, setOrder] = useState<DatabaseOrder | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { clear } = useCart()

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID provided')
      setLoading(false)
      return
    }

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/by-session?session_id=${sessionId}`)
        if (!res.ok) {
          throw new Error('Failed to fetch order')
        }
        const data = await res.json()
        setOrder(data.order)

        // Clear cart after successful order
        clear()
      } catch (err) {
        console.error('Error fetching order:', err)
        setError('Unable to load order details. Please check your email for confirmation.')
      } finally {
        setLoading(false)
      }
    }

    void fetchOrder()
  }, [sessionId, clear])

  if (loading) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto"></div>
        </div>
      </main>
    )
  }

  if (error || !order) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center space-y-4">
          <div className="text-5xl">⚠️</div>
          <h1 className="text-2xl font-semibold">Unable to Load Order</h1>
          <p className="text-muted-foreground">{error || 'Order not found'}</p>
          <div className="pt-4">
            <Link href="/account" className="text-blue-600 hover:underline">
              View your orders
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center space-y-4 mb-8">
        <Image
          src='/images/btl-original-white.png'
          width={100}
          height={100}
          alt='logo'
          className='mx-auto'
        />
        <h1 className="text-3xl font-bold">Order Confirmed!</h1>
        <p className="text-lg text-muted-foreground">
          Thank you for your purchase. Your order has been received.
        </p>
      </div>

      <div className="rounded-lg p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-border">
          <div>
            <div className="text-sm text-muted-foreground">Order Number</div>
            <div className="font-medium">#{order.id.toString().padStart(6, '0')}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Order Date</div>
            <div className="font-medium">{new Date(order.created_at).toLocaleDateString()}</div>
          </div>
        </div>

        <div>
          <div className="text-sm text-muted-foreground mb-2">Order Status</div>
          <div className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full text-sm font-medium capitalize">
            {order.status}
          </div>
        </div>

        {order.items && order.items.length > 0 && (
          <div className="pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground mb-3">Order Items</div>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-start py-2">
                  <div className="flex-1">
                    <div className="font-medium">
                      {item.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      SKU: {item.sku}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      ${(item.price / 100).toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {order.customer_email && (
          <div>
            <div className="text-sm text-muted-foreground mb-1">Email</div>
            <div className="font-medium">{order.customer_email}</div>
            <p className="text-xs text-muted-foreground mt-1">
              A confirmation email has been sent to this address
            </p>
          </div>
        )}

        {order.shipping_name && (
          <div>
            <div className="text-sm text-muted-foreground mb-1">Shipping To</div>
            <div className="font-medium">{order.shipping_name}</div>
            {order.shipping_address_line1 && (
              <div className="text-sm text-muted-foreground mt-1">
                {order.shipping_address_line1}
                {order.shipping_address_line2 && <>, {order.shipping_address_line2}</>}
                <br />
                {order.shipping_suburb && `${order.shipping_suburb}, `}
                {order.shipping_state} {order.shipping_postcode}
              </div>
            )}
          </div>
        )}

        <div className="pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold">Total Paid</div>
            <div className="text-2xl font-bold">
              ${(order.total_cents / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4 text-center">
        <p className="text-muted-foreground">
          We&#39;ll send you shipping confirmation with tracking information once your order ships.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/account"
            className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors"
          >
            View Order History
          </Link>
          <Link
            href="/"
            className="px-6 py-3 border border-border rounded hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <main className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto"></div>
        </div>
      </main>
    }>
      <OrderConfirmationContent />
    </Suspense>
  )
}