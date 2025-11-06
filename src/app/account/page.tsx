'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { DatabaseOrder } from '@/app/types/Order'

export default function AccountPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [orders, setOrders] = useState<DatabaseOrder[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return
      const e = data.user?.email ?? null
      setUserEmail(e)
      if (e) fetchOrders(e)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const e = session?.user?.email ?? null
      setUserEmail(e)
      if (e) fetchOrders(e)
    })
    return () => {
      mounted = false
      sub.subscription.unsubscribe()
    }
  }, [])

  const fetchOrders = async (email: string) => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_email', email)
        .order('created_at', { ascending: false })
      if (error) throw error
      setOrders(data || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const sendMagicLink = async () => {
    if (!email) return
    setSending(true)
    try {
      const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.href } })
      if (error) throw error
      setSent(true)
    } catch (e) {
      console.error(e)
      alert('Failed to send magic link. Check your email and try again.')
    } finally {
      setSending(false)
    }
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    void sendMagicLink()
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUserEmail(null)
    setOrders([])
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Your Account</h1>

      {!userEmail ? (
        <form onSubmit={onSubmit} className="space-y-4 max-w-md">
          <p>Sign in with your email to view orders and tracking.</p>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
          <button type="submit" disabled={sending} className="rounded bg-black text-white px-4 py-2 disabled:opacity-60">
            {sending ? 'Sending…' : 'Send magic link'}
          </button>
          {sent && !sending && <p className="text-sm text-green-600">Magic link sent. Check your inbox.</p>}
        </form>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Signed in as</div>
              <div className="text-sm text-muted-foreground">{userEmail}</div>
            </div>
            <button onClick={signOut} className="text-sm underline">Sign out</button>
          </div>

          <section>
            <h2 className="text-xl font-semibold mb-3">Orders</h2>
            {loading ? (
              <p>Loading…</p>
            ) : orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <ul className="space-y-3">
                {orders.map((o) => (
                  <li key={o.id} className="p-4 border rounded">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Order #{o.id}</div>
                        <div className="text-sm text-muted-foreground">{new Date(o.created_at).toLocaleString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium capitalize">{o.status}</div>
                        {o.tracking_number && (
                          <a className="text-sm underline" href={`https://track.global/?code=${o.tracking_number}`} target="_blank" rel="noreferrer">Track shipment</a>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 text-sm">Total: ${(o.total_cents/100).toFixed(2)}</div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </main>
  )
}
