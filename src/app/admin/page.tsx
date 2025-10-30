'use client'
import { useEffect, useState } from 'react'

export default function AdminPage() {
  const [token, setToken] = useState('')
  const [authed, setAuthed] = useState(false)
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const authenticate = () => setAuthed(Boolean(token))

  useEffect(() => {
    if (!authed) return
    ;(async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/orders/list', { headers: { Authorization: `Bearer ${token}` } })
        const data = await res.json()
        if (res.ok) setOrders(data.orders || [])
        else alert(data.error || 'Failed to fetch orders')
      } finally {
        setLoading(false)
      }
    })()
  }, [authed, token])

  const updateTracking = async (id: string, tracking_number: string, status?: string) => {
    const res = await fetch('/api/orders/update-tracking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, tracking_number, status })
    })
    const data = await res.json()
    if (!res.ok) return alert(data.error || 'Update failed')
    setOrders((prev) => prev.map((o) => (o.id === id ? data.order : o)))
  }

  if (!authed) {
    return (
      <main className="max-w-md mx-auto px-4 py-8 space-y-4">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <p className="text-sm text-muted-foreground">Enter your admin token to view orders.</p>
        <input value={token} onChange={(e) => setToken(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Admin token" />
        <button onClick={authenticate} className="rounded bg-black text-white px-4 py-2">Continue</button>
      </main>
    )
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <button onClick={() => setAuthed(false)} className="text-sm underline">Sign out</button>
      </div>
      {loading ? (
        <p>Loading…</p>
      ) : orders.length === 0 ? (
        <p>No orders.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="p-4 border rounded">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Order #{o.id}</div>
                  <div className="text-sm text-muted-foreground">{o.customer_email || 'No email'} • ${(o.total_cents/100).toFixed(2)}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm">{new Date(o.created_at).toLocaleString()}</div>
                  <div className="font-medium capitalize">{o.status}</div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                <div>
                  <label className="block text-xs text-muted-foreground">Tracking number</label>
                  <input defaultValue={o.tracking_number || ''} id={`tn-${o.id}`} className="w-full border rounded px-2 py-1" />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground">Status</label>
                  <select defaultValue={o.status || 'created'} id={`st-${o.id}`} className="w-full border rounded px-2 py-1">
                    <option value="created">created</option>
                    <option value="paid">paid</option>
                    <option value="fulfilled">fulfilled</option>
                    <option value="shipped">shipped</option>
                    <option value="cancelled">cancelled</option>
                  </select>
                </div>
                <div>
                  <button
                    onClick={() => {
                      const tn = (document.getElementById(`tn-${o.id}`) as HTMLInputElement)?.value
                      const st = (document.getElementById(`st-${o.id}`) as HTMLSelectElement)?.value
                      updateTracking(o.id, tn, st)
                    }}
                    className="w-full rounded bg-black text-white py-2"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
