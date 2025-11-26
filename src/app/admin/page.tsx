'use client'
import { useEffect, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { DatabaseOrder } from '@/app/types/Order'
import { ScanLine, Package, Truck, Plus, Minus, Barcode, Printer } from 'lucide-react'

// Dynamic import for barcode scanner (camera access needs client-side only)
const BarcodeScanner = dynamic(() => import('@/components/BarcodeScanner'), { ssr: false })

interface ProductVariant {
  id: string
  sku: string
  size: string
  color: string
  price: number
  inventory: number
  products?: { name: string }
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
  
  // Inventory management state
  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'barcodes'>('orders')
  const [showScanner, setShowScanner] = useState(false)
  const [skuSearch, setSkuSearch] = useState('')
  const [scannedVariant, setScannedVariant] = useState<ProductVariant | null>(null)
  const [inventoryLoading, setInventoryLoading] = useState(false)
  const [adjustmentAmount, setAdjustmentAmount] = useState(0)
  
  // Barcode management state
  const [allVariants, setAllVariants] = useState<ProductVariant[]>([])
  const [barcodesLoading, setBarcodesLoading] = useState(false)
  const [selectedSkus, setSelectedSkus] = useState<Set<string>>(new Set())


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

  // Fetch all variants for barcode tab
  const fetchAllVariants = useCallback(async () => {
    setBarcodesLoading(true)
    try {
      const res = await fetch('/api/inventory', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (res.ok && data.variants) {
        setAllVariants(data.variants)
      }
    } catch {
      console.error('Failed to fetch variants')
    } finally {
      setBarcodesLoading(false)
    }
  }, [token])

  // Load variants when switching to barcodes tab
  useEffect(() => {
    if (activeTab === 'barcodes' && authed && allVariants.length === 0) {
      fetchAllVariants()
    }
  }, [activeTab, authed, allVariants.length, fetchAllVariants])

  const toggleSkuSelection = (sku: string) => {
    setSelectedSkus(prev => {
      const next = new Set(prev)
      if (next.has(sku)) {
        next.delete(sku)
      } else {
        next.add(sku)
      }
      return next
    })
  }

  const selectAllSkus = () => {
    if (selectedSkus.size === allVariants.length) {
      setSelectedSkus(new Set())
    } else {
      setSelectedSkus(new Set(allVariants.map(v => v.sku)))
    }
  }

  const printBarcodes = (skus: string[]) => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Barcode Labels</title>
          <style>
            @page { margin: 10mm; }
            body { font-family: Arial, sans-serif; }
            .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
            .label { 
              border: 1px solid #ccc; 
              padding: 10px; 
              text-align: center;
              page-break-inside: avoid;
            }
            .label img { max-width: 100%; height: auto; }
            .sku { font-size: 12px; margin-top: 5px; font-weight: bold; }
            @media print {
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="no-print" style="margin-bottom: 20px;">
            <button onclick="window.print()" style="padding: 10px 20px; font-size: 16px; cursor: pointer;">
              Print Labels
            </button>
            <span style="margin-left: 10px;">${skus.length} label(s)</span>
          </div>
          <div class="grid">
            ${skus.map(sku => `
              <div class="label">
                <img src="/api/barcode?sku=${encodeURIComponent(sku)}" alt="${sku}" />
                <div class="sku">${sku}</div>
              </div>
            `).join('')}
          </div>
        </body>
      </html>
    `
    printWindow.document.write(html)
    printWindow.document.close()
  }

  // Inventory functions
  const lookupSku = async (sku: string) => {
    if (!sku.trim()) return
    setInventoryLoading(true)
    setScannedVariant(null)
    try {
      const res = await fetch(`/api/inventory?sku=${encodeURIComponent(sku)}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (res.ok && data.variant) {
        setScannedVariant(data.variant)
        setAdjustmentAmount(0)
      } else {
        alert(data.error || 'Variant not found')
      }
    } catch {
      alert('Failed to lookup SKU')
    } finally {
      setInventoryLoading(false)
    }
  }

  const handleBarcodeScan = (code: string) => {
    setShowScanner(false)
    setSkuSearch(code)
    lookupSku(code)
  }

  const updateInventory = async (mode: 'set' | 'adjust', value: number) => {
    if (!scannedVariant) return
    setInventoryLoading(true)
    try {
      const body = mode === 'set' 
        ? { sku: scannedVariant.sku, inventory: value }
        : { sku: scannedVariant.sku, adjustment: value }
      
      const res = await fetch('/api/inventory', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(body)
      })
      const data = await res.json()
      if (res.ok && data.variant) {
        setScannedVariant(data.variant)
        setAdjustmentAmount(0)
        alert(`Inventory updated: ${data.previousInventory} → ${data.newInventory}`)
      } else {
        alert(data.error || 'Failed to update inventory')
      }
    } catch {
      alert('Failed to update inventory')
    } finally {
      setInventoryLoading(false)
    }
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
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Admin Panel</h1>
        <button onClick={() => setAuthed(false)} className="text-sm underline">Sign out</button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 border-b">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors ${
            activeTab === 'orders' 
              ? 'border-b-2 border-black text-black' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Truck className="w-4 h-4" />
          Orders
        </button>
        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors ${
            activeTab === 'inventory' 
              ? 'border-b-2 border-black text-black' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Package className="w-4 h-4" />
          Inventory
        </button>
        <button
          onClick={() => setActiveTab('barcodes')}
          className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors ${
            activeTab === 'barcodes' 
              ? 'border-b-2 border-black text-black' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Barcode className="w-4 h-4" />
          Barcodes
        </button>
      </div>

      {/* Barcode Scanner Modal */}
      {showScanner && (
        <BarcodeScanner
          onScan={handleBarcodeScan}
          onClose={() => setShowScanner(false)}
        />
      )}

      {/* Inventory Tab */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          {/* Search/Scan Section */}
          <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
            <h2 className="text-lg font-medium mb-4">Scan or Search SKU</h2>
            <div className="flex gap-3">
              <button
                onClick={() => setShowScanner(true)}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <ScanLine className="w-5 h-5" />
                Scan Barcode
              </button>
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={skuSearch}
                  onChange={(e) => setSkuSearch(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === 'Enter' && lookupSku(skuSearch)}
                  placeholder="Enter SKU (e.g., LEG-RVN-M)"
                  className="flex-1 border rounded-lg px-3 py-2"
                />
                <button
                  onClick={() => lookupSku(skuSearch)}
                  disabled={inventoryLoading}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  {inventoryLoading ? 'Loading...' : 'Search'}
                </button>
              </div>
            </div>
          </div>

          {/* Scanned Variant Display */}
          {scannedVariant && (
            <div className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{scannedVariant.products?.name}</h3>
                  <p className="text-gray-600">{scannedVariant.color} / {scannedVariant.size}</p>
                  <p className="text-sm text-gray-500 font-mono">{scannedVariant.sku}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Current Stock</p>
                  <p className="text-3xl font-bold">{scannedVariant.inventory}</p>
                </div>
              </div>

              {/* Quick Adjust Buttons */}
              <div className="border-t pt-4 mt-4">
                <h4 className="text-sm font-medium text-gray-500 mb-3">Quick Adjust</h4>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => updateInventory('adjust', -1)}
                    className="flex items-center gap-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                  >
                    <Minus className="w-4 h-4" /> 1
                  </button>
                  <button
                    onClick={() => updateInventory('adjust', -5)}
                    className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                  >
                    -5
                  </button>
                  <button
                    onClick={() => updateInventory('adjust', -10)}
                    className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                  >
                    -10
                  </button>
                  <div className="w-px bg-gray-300 mx-2" />
                  <button
                    onClick={() => updateInventory('adjust', 1)}
                    className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                  >
                    <Plus className="w-4 h-4" /> 1
                  </button>
                  <button
                    onClick={() => updateInventory('adjust', 5)}
                    className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                  >
                    +5
                  </button>
                  <button
                    onClick={() => updateInventory('adjust', 10)}
                    className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                  >
                    +10
                  </button>
                </div>
              </div>

              {/* Custom Adjustment */}
              <div className="border-t pt-4 mt-4">
                <h4 className="text-sm font-medium text-gray-500 mb-3">Custom Adjustment</h4>
                <div className="flex gap-3 items-center">
                  <input
                    type="number"
                    value={adjustmentAmount}
                    onChange={(e) => setAdjustmentAmount(parseInt(e.target.value) || 0)}
                    className="w-24 border rounded-lg px-3 py-2 text-center"
                  />
                  <button
                    onClick={() => updateInventory('adjust', adjustmentAmount)}
                    disabled={adjustmentAmount === 0}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    Apply Adjustment
                  </button>
                  <span className="text-gray-500">or</span>
                  <button
                    onClick={() => {
                      const newVal = prompt('Set absolute inventory value:', String(scannedVariant.inventory))
                      if (newVal !== null) {
                        const val = parseInt(newVal)
                        if (!isNaN(val) && val >= 0) {
                          updateInventory('set', val)
                        }
                      }
                    }}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                  >
                    Set Absolute Value
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Barcodes Tab */}
      {activeTab === 'barcodes' && (
        <div className="space-y-6">
          {/* Actions Bar */}
          <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
            <div className="flex items-center gap-4">
              <button
                onClick={selectAllSkus}
                className="px-3 py-2 text-sm border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {selectedSkus.size === allVariants.length ? 'Deselect All' : 'Select All'}
              </button>
              <span className="text-sm text-gray-500">
                {selectedSkus.size} selected
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => printBarcodes(Array.from(selectedSkus))}
                disabled={selectedSkus.size === 0}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Printer className="w-4 h-4" />
                Print Selected ({selectedSkus.size})
              </button>
              <button
                onClick={() => printBarcodes(allVariants.map(v => v.sku))}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Printer className="w-4 h-4" />
                Print All
              </button>
            </div>
          </div>

          {/* Variants Grid */}
          {barcodesLoading ? (
            <p className="text-center py-8">Loading variants...</p>
          ) : allVariants.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No variants found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {allVariants.map((variant) => (
                <div
                  key={variant.sku}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedSkus.has(variant.sku) 
                      ? 'border-black bg-gray-50 dark:bg-gray-900' 
                      : 'hover:border-gray-400'
                  }`}
                  onClick={() => toggleSkuSelection(variant.sku)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium">{variant.products?.name}</p>
                      <p className="text-sm text-gray-500">{variant.color} / {variant.size}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedSkus.has(variant.sku)}
                      onChange={() => toggleSkuSelection(variant.sku)}
                      className="w-5 h-5"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  
                  {/* Barcode Preview */}
                  <div className="bg-white p-3 rounded border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/api/barcode?sku=${encodeURIComponent(variant.sku)}`}
                      alt={variant.sku}
                      className="w-full h-auto"
                    />
                  </div>
                  
                  <div className="mt-2 flex items-center justify-between">
                    <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {variant.sku}
                    </code>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        printBarcodes([variant.sku])
                      }}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                      title="Print this barcode"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <>
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
        </>
      )}
    </main>
  )
}
