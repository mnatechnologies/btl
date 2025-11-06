'use client'
import { useEffect, useState } from 'react'
import { DatabaseOrder } from '@/app/types/Order'

export default function AdminPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const [authed, setAuthed] = useState(false)
    const [orders, setOrders] = useState<DatabaseOrder[]>([])
    const [loading, setLoading] = useState(false)


    const authenticate = async () => {
        const res = await fetch('/api/admin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        const data = await res.json()
        if (res.ok) {
            setToken(data.token)
            setAuthed(true)
        } else {
            alert(data.error || 'Authentication failed')
        }
    }

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
                <h1 className="text-2xl font-semibold">Admin Login</h1>
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter username"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter password"
                            onKeyDown={(e) => e.key === 'Enter' && authenticate()}
                        />
                    </div>
                </div>
                <button onClick={authenticate} className="w-full rounded bg-black text-white px-4 py-2">Login</button>
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
                  <select defaultValue={o.status || 'created'} id={`st-${o.id}`} className="w-full border rounded px-2 py-1 bg-black text-white">
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
                    className="w-full rounded bg-black text-white py-2 cursor-pointer"
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
