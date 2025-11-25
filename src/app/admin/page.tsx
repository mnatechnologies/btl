'use client'
import { useEffect, useState } from 'react'
import { DatabaseOrder } from '@/app/types/Order'

interface ShippingAddress {
  line1: string
  line2?: string
  suburb: string
  state: string
  postcode: string
  country?: string
}

export default function AdminPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const [authed, setAuthed] = useState(false)
    const [orders, setOrders] = useState<DatabaseOrder[]>([])
    const [loading, setLoading] = useState(false)
  const [generatingLabel, setGeneratingLabel] = useState<number | null>(null)
  const [showAddressForm, setShowAddressForm] = useState<number | null>(null)


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

  const updateTracking = async (id: number, tracking_number: string | undefined, status?: string | undefined) => {
    const res = await fetch('/api/orders/update-tracking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, tracking_number, status })
    })
    const data = await res.json()
    if (!res.ok) return alert(data.error || 'Update failed')
    setOrders((prev) => prev.map((o) => (o.id === id ? data.order : o)))
  }

  const generateLabel = async (orderId: number) => {
    const customerName = (document.getElementById(`name-${orderId}`) as HTMLInputElement)?.value
    const line1 = (document.getElementById(`addr1-${orderId}`) as HTMLInputElement)?.value
    const line2 = (document.getElementById(`addr2-${orderId}`) as HTMLInputElement)?.value
    const suburb = (document.getElementById(`suburb-${orderId}`) as HTMLInputElement)?.value
    const state = (document.getElementById(`state-${orderId}`) as HTMLInputElement)?.value
    const postcode = (document.getElementById(`postcode-${orderId}`) as HTMLInputElement)?.value
    const country = (document.getElementById(`country-${orderId}`) as HTMLInputElement)?.value || 'AU'
    const phone = (document.getElementById(`phone-${orderId}`) as HTMLInputElement)?.value

    if (!customerName || !line1 || !suburb || !state || !postcode) {
      alert('Please fill in all required address fields (Name, Address, Suburb, State, Postcode)')
      return
    }

    setGeneratingLabel(orderId)
    try {
      const res = await fetch('/api/orders/generate-label', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          orderId,
          customerName,
          customerPhone: phone,
          shippingAddress: { line1, line2, suburb, state, postcode, country }
        })
      })
      const data = await res.json()
      if (!res.ok) {
        alert(data.error || 'Failed to generate label')
        return
      }

      // Update order in state
      if (data.order) {
        setOrders((prev) => prev.map((o) => (o.id === orderId ? data.order : o)))
      }

      // Download the label PDF
      const linkSource = `data:application/pdf;base64,${data.labelPdf}`
      const downloadLink = document.createElement('a')
      downloadLink.href = linkSource
      downloadLink.download = `auspost-label-${orderId}.pdf`
      downloadLink.click()

      alert(`Label generated successfully! Tracking: ${data.trackingId}`)
      setShowAddressForm(null)
    } catch (error) {
      console.error('Label generation error:', error)
      alert('Failed to generate label')
    } finally {
      setGeneratingLabel(null)
    }
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
                  <div className="font-medium">Order #{o.id.toString().padStart(6, '0')}</div>                  <div className="text-sm text-muted-foreground">{o.customer_email || 'No email'} • ${(o.total_cents/100).toFixed(2)}</div>
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

              {/* AusPost Label Generation */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Australia Post Label</h3>
                  <button
                    onClick={() => setShowAddressForm(showAddressForm === o.id ? null : o.id)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {showAddressForm === o.id ? 'Hide Form' : 'Generate Label'}
                  </button>
                </div>

                {showAddressForm === o.id && (
                  <div className="mt-3 space-y-3 p-3 bg-gray-50 dark:bg-gray-900 rounded">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Customer Name *</label>
                        <input
                          id={`name-${o.id}`}
                          defaultValue={o.shipping_name || ''}
                          placeholder="John Smith"
                          className="w-full border rounded px-2 py-1 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Phone</label>
                        <input
                          id={`phone-${o.id}`}
                          defaultValue={o.shipping_phone || ''}
                          placeholder="0400000000"
                          className="w-full border rounded px-2 py-1 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Address Line 1 *</label>
                      <input
                        id={`addr1-${o.id}`}
                        defaultValue={o.shipping_address_line1 || ''}
                        placeholder="123 Main Street"
                        className="w-full border rounded px-2 py-1 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Address Line 2</label>
                      <input
                        id={`addr2-${o.id}`}
                        defaultValue={o.shipping_address_line2 || ''}
                        placeholder="Apt 4B"
                        className="w-full border rounded px-2 py-1 text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Suburb *</label>
                        <input
                          id={`suburb-${o.id}`}
                          defaultValue={o.shipping_suburb || ''}
                          placeholder="Sydney"
                          className="w-full border rounded px-2 py-1 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">State *</label>
                        <select
                          id={`state-${o.id}`}
                          defaultValue={o.shipping_state || ''}
                          className="w-full border rounded px-2 py-1 text-sm bg-white dark:bg-black"
                        >
                          <option value="">Select</option>
                          <option value="NSW">NSW</option>
                          <option value="VIC">VIC</option>
                          <option value="QLD">QLD</option>
                          <option value="SA">SA</option>
                          <option value="WA">WA</option>
                          <option value="TAS">TAS</option>
                          <option value="NT">NT</option>
                          <option value="ACT">ACT</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Postcode *</label>
                        <input
                          id={`postcode-${o.id}`}
                          defaultValue={o.shipping_postcode || ''}
                          placeholder="2000"
                          className="w-full border rounded px-2 py-1 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Country</label>
                        <input
                          id={`country-${o.id}`}
                          defaultValue={o.shipping_country || 'AU'}
                          className="w-full border rounded px-2 py-1 text-sm"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => generateLabel(o.id)}
                      disabled={generatingLabel === o.id}
                      className="w-full rounded bg-blue-600 text-white py-2 cursor-pointer hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {generatingLabel === o.id ? 'Generating Label...' : 'Generate AusPost Label'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
