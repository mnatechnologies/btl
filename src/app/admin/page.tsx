'use client'
import {useEffect, useState, useCallback} from 'react'
import dynamic from 'next/dynamic'
import {DatabaseOrder, CartOrderItem} from '@/types/Order'
import {ScanLine, Package, Truck, Plus, Minus, Barcode, Printer, Mail, ChevronDown, ChevronUp} from 'lucide-react'


// Dynamic import for barcode scanner (camera access needs client-side only)
const BarcodeScanner = dynamic(() => import('@/components/BarcodeScanner'), {ssr: false})

interface ProductVariant {
  id: string
  sku: string
  size: string
  color: string
  price: number
  inventory: number
  products?: { name: string }
}

interface ShippingLabelData {
  orderId: string
  orderDate: string
  senderName: string
  senderLine1: string
  senderLine2: string
  senderSuburb: string
  senderState: string
  senderPostcode: string
  senderPhone: string
  senderEmail: string
  recipientName: string
  recipientLine1: string
  recipientLine2: string
  recipientSuburb: string
  recipientState: string
  recipientPostcode: string
  recipientPhone: string
  recipientEmail: string
  itemDescription: string
  weight: string
}

export default function AdminPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [authed, setAuthed] = useState(false)
  const [orders, setOrders] = useState<DatabaseOrder[]>([])
  const [loading, setLoading] = useState(false)
  const [showAddressForm, setShowAddressForm] = useState<number | null>(null)
  const [expandedOrders, setExpandedOrders] = useState<Set<number>>(new Set())



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
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password})
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
      ;
    (async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/orders/list', {headers: {Authorization: `Bearer ${token}`}})
        const data = await res.json()
        if (res.ok) setOrders(data.orders || [])
        else alert(data.error || 'Failed to fetch orders')
      } finally {
        setLoading(false)
      }
    })()
  }, [authed, token])

  const toggleOrderExpansion = (orderId: number) => {
    setExpandedOrders(prev => {
      const next = new Set(prev)
      if (next.has(orderId)) {
        next.delete(orderId)
      } else {
        next.add(orderId)
      }
      return next
    })
  }

  const updateTracking = async (id: number, tracking_number: string | null, status?: string | undefined) => {
    const res = await fetch('/api/orders/update-tracking', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
      body: JSON.stringify({id, tracking_number, status})
    })
    const data = await res.json()
    if (!res.ok) return alert(data.error || 'Update failed')
    setOrders((prev) => prev.map((o) => (o.id === id ? data.order : o)))
  }

  const addTrackingAndNotify = async (id: number) => {
    const tracking = (document.getElementById(`tn-${id}`) as HTMLInputElement)?.value
    if (!tracking?.trim()) {
      alert('Please enter a tracking number')
      return
    }

    const res = await fetch('/api/orders/add-tracking', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
      body: JSON.stringify({orderId: id, trackingNumber: tracking.trim()})
    })
    const data = await res.json()
    if (!res.ok) return alert(data.error || 'Failed to add tracking')

    setOrders((prev) => prev.map((o) => (o.id === id ? data.order : o)))
    alert('Tracking added and shipping notification sent!')
  }

  // Fetch all variants for barcode tab
  const fetchAllVariants = useCallback(async () => {
    setBarcodesLoading(true)
    try {
      const res = await fetch('/api/inventory', {
        headers: {Authorization: `Bearer ${token}`}
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

  // Load variants when switching to barcodes or inventory tab
  useEffect(() => {
    if ((activeTab === 'barcodes' || activeTab === 'inventory') && authed && allVariants.length === 0) {
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
        headers: {Authorization: `Bearer ${token}`}
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
        ? {sku: scannedVariant.sku, inventory: value}
        : {sku: scannedVariant.sku, adjustment: value}

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

  const generateLabel = (orderId: number) => {
    const customerName = (document.getElementById(`name-${orderId}`) as HTMLInputElement)?.value
    const line1 = (document.getElementById(`addr1-${orderId}`) as HTMLInputElement)?.value
    const line2 = (document.getElementById(`addr2-${orderId}`) as HTMLInputElement)?.value
    const suburb = (document.getElementById(`suburb-${orderId}`) as HTMLInputElement)?.value
    const state = (document.getElementById(`state-${orderId}`) as HTMLInputElement)?.value
    const postcode = (document.getElementById(`postcode-${orderId}`) as HTMLInputElement)?.value
    const country = (document.getElementById(`country-${orderId}`) as HTMLInputElement)?.value || 'AU'
    const phone = (document.getElementById(`phone-${orderId}`) as HTMLInputElement)?.value
    const email = (document.getElementById(`email-${orderId}`) as HTMLInputElement)?.value
    const weight = (document.getElementById(`weight-${orderId}`) as HTMLInputElement)?.value || '0.5'

    if (!customerName || !line1 || !suburb || !state || !postcode) {
      alert('Please fill in all required address fields (Name, Address, Suburb, State, Postcode)')
      return
    }

    // Get order details for item description
    const order = orders.find(o => o.id === orderId)
    const itemDescription = order ? 'Clothing Items' : 'General Merchandise'

    // Prepare label data
    const data: ShippingLabelData = {
      orderId: orderId.toString().padStart(6, '0'),
      orderDate: new Date().toISOString().split('T')[0],

      senderName: 'Built To Last',
      senderLine1: 'P.O Box 175',
      senderLine2: '',
      senderSuburb: 'Bonnyrigg',
      senderState: 'NSW',
      senderPostcode: '2177',
      senderPhone: '0490 188 603',
      senderEmail: 'info@btlclothing.com',
      // Recipient details
      recipientName: customerName,
      recipientLine1: line1,
      recipientLine2: line2 || '',
      recipientSuburb: suburb,
      recipientState: state,
      recipientPostcode: postcode,
      recipientPhone: phone || '',
      recipientEmail: email || order?.customer_email || '',
      itemDescription: itemDescription,
      weight: weight
    }

    setShowAddressForm(null)
    printLabel(data)
  }

  const printLabel = (data: ShippingLabelData) => {


    const printWindow = window.open('', '_blank')
    if (!printWindow) {
      alert('Please allow pop-ups to print the label')
      return
    }

    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Shipping Label - Order #${data.orderId}</title>
        <style>
          @page { 
            size: A4;
            margin: 10mm;
          }
          body { 
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 10px;
          }
          .label-container {
            width: 794px;
            height: 1123px;
            margin: 0 auto;
            border: 2px solid #ccc;
            padding: 40px;
            box-sizing: border-box;
          }
          .header {
            border-bottom: 4px solid #2563eb;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }
          .header h1 {
            margin: 0;
            font-size: 36px;
            color: #1f2937;
          }
          .header p {
            margin: 5px 0 0 0;
            color: #6b7280;
            font-size: 14px;
          }
          .address-box {
            border: 2px solid #d1d5db;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 20px;
          }
          .address-box.recipient {
            border: 4px solid #1f2937;
            padding: 35px;
          }
          .address-label {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 15px;
            font-weight: bold;
          }
          .address-label.sender {
            font-size: 18px;
            color: #1f2937;
          }
          .address-label.recipient {
            font-size: 24px;
            color: #1f2937;
          }
          .address-content {
            line-height: 1.6;
          }
          .sender .address-content {
            font-size: 16px;
          }
          .recipient .address-content {
            font-size: 20px;
          }
          .recipient .name {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 8px;
          }
          .recipient .address-line {
            font-weight: 600;
          }
          .recipient .locality {
            font-size: 24px;
            font-weight: bold;
            margin-top: 12px;
            text-transform: uppercase;
          }
          .contact-info {
            font-size: 14px;
            color: #4b5563;
            margin-top: 10px;
          }
          .details-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 30px;
          }
          .detail-box {
            border: 1px solid #d1d5db;
            border-radius: 6px;
            padding: 15px;
          }
          .detail-label {
            font-size: 12px;
            color: #6b7280;
            font-weight: 600;
            margin-bottom: 5px;
          }
          .detail-value {
            font-size: 18px;
            font-weight: 600;
          }
          .barcode-area {
            border: 2px dashed #d1d5db;
            border-radius: 8px;
            padding: 25px;
            text-align: center;
            margin-bottom: 20px;
          }
          .barcode-label {
            font-size: 12px;
            color: #6b7280;
            margin-bottom: 10px;
          }
          .barcode-value {
            font-family: monospace;
            font-size: 28px;
            font-weight: bold;
            letter-spacing: 3px;
          }
          .barcode-visual {
            margin-top: 15px;
            display: flex;
            justify-content: center;
            gap: 2px;
          }
          .bar {
            width: 3px;
            height: 60px;
            background: #000;
          }
          .bar.wide {
            width: 6px;
          }
          .footer {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #d1d5db;
            font-size: 11px;
            color: #6b7280;
          }
          @media print {
            body {
              padding: 0;
            }
            .label-container {
              border: none;
            }
            .no-print {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <script>
          window.onload = function() {
            window.print();
          }
        </script>
        
        <div class="label-container">
          <!-- Header -->
          <div class="header">
            <h1>SHIPPING LABEL</h1>
            <p>Order #${data.orderId} • ${data.orderDate}</p>
          </div>

          <!-- From Section -->
          <div class="address-box sender">
            <div class="address-label sender">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              FROM
            </div>
            <div class="address-content">
              <div style="font-weight: 600; font-size: 18px;">${data.senderName}</div>
              <div>${data.senderLine1}</div>
              ${data.senderLine2 ? `<div>${data.senderLine2}</div>` : ''}
              <div style="font-weight: 600; margin-top: 8px;">
                ${data.senderSuburb} ${data.senderState} ${data.senderPostcode}
              </div>
              <div class="contact-info">
                Ph: ${data.senderPhone}
              </div>
              ${data.senderEmail ? `<div class="contact-info">Email: ${data.senderEmail}</div>` : ''}
            </div>
          </div>

          <!-- To Section -->
          <div class="address-box recipient">
            <div class="address-label recipient">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
              TO (RECIPIENT)
            </div>
            <div class="address-content">
              <div class="name">${data.recipientName}</div>
              <div class="address-line">${data.recipientLine1}</div>
              ${data.recipientLine2 ? `<div class="address-line">${data.recipientLine2}</div>` : ''}
              <div class="locality">
                ${data.recipientSuburb} ${data.recipientState} ${data.recipientPostcode}
              </div>
              ${data.recipientPhone ? `<div class="contact-info">Ph: ${data.recipientPhone}</div>` : ''}
              ${data.recipientEmail ? `<div class="contact-info">Email: ${data.recipientEmail}</div>` : ''}
            </div>
          </div>

          <!-- Package Details -->
          <div class="details-grid">
            <div class="detail-box">
              <div class="detail-label">CONTENTS</div>
              <div class="detail-value">${data.itemDescription}</div>
            </div>
            <div class="detail-box">
              <div class="detail-label">WEIGHT</div>
              <div class="detail-value">${data.weight} kg</div>
            </div>
          </div>

          <!-- Barcode Area -->
          <div class="barcode-area">
            <div class="barcode-label">INTERNAL REFERENCE</div>
            <div class="barcode-value">${data.orderId}</div>
            <div class="barcode-visual">
              ${[...Array(30)].map((_, i) =>
      `<div class="bar ${Math.random() > 0.5 ? 'wide' : ''}"></div>`
    ).join('')}
            </div>
          </div>

          <!-- Footer -->
          <div class="footer">
            <p>• This label must be securely attached to the outside of the parcel.</p>
            <p>• Ensure all address details are clearly visible and not covered by tape.</p>
            <p>• For delivery issues, contact sender at ${data.senderPhone}</p>
          </div>
        </div>
      </body>
    </html>
  `

    printWindow.document.write(html)
    printWindow.document.close()
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
      <div className="flex gap-2 mb-6 border-b-2 border-gray-200">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-6 py-3 font-bold transition-all ${
            activeTab === 'orders'
              ? 'border-b-4 border-black text-black bg-gray-50 -mb-0.5 text-lg'
              : 'text-gray-500 hover:text-gray-700 border-b-4 border-transparent -mb-0.5 cursor-pointer'
          }`}
        >
          <Truck className={activeTab === 'orders' ? 'w-6 h-6' : 'w-5 h-5'}/>
          Orders
        </button>
        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex items-center gap-2 px-6 py-3 font-bold transition-all ${
            activeTab === 'inventory'
              ? 'border-b-4 border-black text-black bg-gray-50 -mb-0.5 text-lg'
              : 'text-gray-500 hover:text-gray-700 border-b-4 border-transparent -mb-0.5 cursor-pointer'
          }`}
        >
          <Package className={activeTab === 'inventory' ? 'w-6 h-6' : 'w-5 h-5'}/>
          Inventory
        </button>
        <button
          onClick={() => setActiveTab('barcodes')}
          className={`flex items-center gap-2 px-6 py-3 font-bold transition-all ${
            activeTab === 'barcodes'
              ? 'border-b-4 border-black text-black bg-gray-50 -mb-0.5 text-lg'
              : 'text-gray-500 hover:text-gray-700 border-b-4 border-transparent -mb-0.5 cursor-pointer'
          }`}
        >
          <Barcode className={activeTab === 'barcodes' ? 'w-6 h-6' : 'w-5 h-5'}/>
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
                <ScanLine className="w-5 h-5"/>
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
              {/* Back Button */}
              <button
                onClick={() => {
                  setScannedVariant(null)
                  setSkuSearch('')
                  setAdjustmentAmount(0)
                }}
                className="mb-4 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Inventory List
              </button>

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
                    <Minus className="w-4 h-4"/> 1
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
                  <div className="w-px bg-gray-300 mx-2"/>
                  <button
                    onClick={() => updateInventory('adjust', 1)}
                    className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                  >
                    <Plus className="w-4 h-4"/> 1
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

          {/* All Inventory List - only show when no variant is selected */}
          {!scannedVariant && (
            <div className="border-t pt-6 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">All Inventory</h3>
                <button
                  onClick={fetchAllVariants}
                  className="px-3 py-2 text-sm border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {barcodesLoading ? 'Loading...' : 'Refresh List'}
                </button>
              </div>

              {barcodesLoading ? (
                <p className="text-center py-8 text-gray-500">Loading inventory...</p>
              ) : allVariants.length === 0 ? (
                <p className="text-center py-8 text-gray-500">No inventory data loaded. Click Refresh List.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                    <tr className="border-b border-gray-300 dark:border-gray-700">
                      <th className="text-left p-3 text-sm font-medium">Product</th>
                      <th className="text-left p-3 text-sm font-medium">SKU</th>
                      <th className="text-left p-3 text-sm font-medium">Color</th>
                      <th className="text-left p-3 text-sm font-medium">Size</th>
                      <th className="text-right p-3 text-sm font-medium">Stock</th>
                      <th className="text-right p-3 text-sm font-medium">Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {allVariants.map((variant) => (
                      <tr
                        key={variant.sku}
                        className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer"
                        onClick={() => {
                          setSkuSearch(variant.sku)
                          lookupSku(variant.sku)
                        }}
                      >
                        <td className="p-3 text-sm">{variant.products?.name || 'Unknown'}</td>
                        <td className="p-3 text-sm font-mono">{variant.sku}</td>
                        <td className="p-3 text-sm">{variant.color}</td>
                        <td className="p-3 text-sm">{variant.size}</td>
                        <td className={`p-3 text-sm text-right font-medium ${
                          variant.inventory <= 0 ? 'text-red-600' :
                            variant.inventory < 10 ? 'text-orange-600' :
                              'text-green-600'
                        }`}>
                          {variant.inventory}
                        </td>
                        <td className="p-3 text-sm text-right">${variant.price.toFixed(2)}</td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              )}
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
                <Printer className="w-4 h-4"/>
                Print Selected ({selectedSkus.size})
              </button>
              <button
                onClick={() => printBarcodes(allVariants.map(v => v.sku))}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Printer className="w-4 h-4"/>
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
                      <Printer className="w-4 h-4"/>
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
        <div className="space-y-4">
          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <p>No orders found</p>
          ) : (
            orders.map((order) => {
              const isExpanded = expandedOrders.has(order.id)
              let items = order.items
              if (typeof items === 'string') {
                try {
                  items = JSON.parse(items)
                } catch {
                  items = []
                }
              }

              return (
                <div key={order.id} className="border rounded-lg p-4 space-y-3">
                  {/* Order Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleOrderExpansion(order.id)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5"/>
                        ) : (
                          <ChevronDown className="w-5 h-5"/>
                        )}
                      </button>
                      <div>
                        <div className="font-medium">Order #{order.id}</div>
                        <div className="text-sm text-gray-600">
                          {order.customer_email}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        ${((order.total_cents || 0) / 100).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(order.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Items Section */}
                  {isExpanded && Array.isArray(items) && items.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <h4 className="text-sm font-medium mb-2">Order Items:</h4>
                      <div className="space-y-2">
                        {items.map((item: CartOrderItem, idx: number) => (
                          <div key={idx} className="flex items-center gap-3 text-sm bg-black p-2 rounded">
                            <div className="flex-1">
                              <div className="font-medium">
                                {item.title}
                              </div>
                              <div className="text-gray-600 text-xs">
                                SKU: {item.sku}
                              </div>
                            </div>
                            <div className="text-gray-600">
                              Qty: {item.quantity}
                            </div>
                            <div className="font-medium">
                              ${((item.price || 0) / 100).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Status and Tracking Section */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">Status:</span>
                    <span className="inline-block px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-sm font-medium capitalize">
                      {order.status}
                    </span>

                    {/* Show Fulfill button only if status is 'paid' */}
                    {order.status === 'paid' && (
                      <button
                        onClick={() => updateTracking(order.id, order.tracking_number, 'fulfilled')}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors cursor-pointer"
                      >
                        Mark as Fulfilled
                      </button>
                    )}
                  </div>

                  {/* Tracking Number Section */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">Tracking:</span>
                    <input
                      id={`tn-${order.id}`}
                      type="text"
                      defaultValue={order.tracking_number || ''}
                      placeholder="Enter tracking number"
                      disabled={order.status !== 'fulfilled'}
                      className="flex-1 border rounded px-3 py-1 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                    <button
                      onClick={() => addTrackingAndNotify(order.id)}
                      disabled={order.status !== 'fulfilled'}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Mail className="w-4 h-4"/>
                      Add & Notify
                    </button>
                  </div>

                  {/* Generate Label Button */}
                  <button
                    onClick={() => setShowAddressForm(order.id)}
                    className="flex items-center gap-2 px-3 py-1 bg-black text-white rounded text-sm hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <Printer className="w-4 h-4"/>
                    Generate Shipping Label
                  </button>

                  {/* Address Form (shown when Generate Label is clicked) */}
                  {showAddressForm === order.id && (
                    <div className="mt-3 p-4 border rounded-lg bg-black space-y-3">
                      <h4 className="font-medium">Shipping Address</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          id={`name-${order.id}`}
                          type="text"
                          placeholder="Customer Name *"
                          defaultValue={order.shipping_name || ''}
                          className="border rounded px-3 py-2 text-sm"
                        />
                        <input
                          id={`phone-${order.id}`}
                          type="text"
                          placeholder="Phone"
                          defaultValue={order.shipping_phone || ''}
                          className="border rounded px-3 py-2 text-sm"
                        />
                        <input
                          id={`addr1-${order.id}`}
                          type="text"
                          placeholder="Address Line 1 *"
                          defaultValue={order.shipping_address_line1 || ''}
                          className="col-span-2 border rounded px-3 py-2 text-sm"
                        />
                        <input
                          id={`addr2-${order.id}`}
                          type="text"
                          placeholder="Address Line 2"
                          defaultValue={order.shipping_address_line2 || ''}
                          className="col-span-2 border rounded px-3 py-2 text-sm"
                        />
                        <input
                          id={`suburb-${order.id}`}
                          type="text"
                          placeholder="Suburb *"
                          defaultValue={order.shipping_suburb || ''}
                          className="border rounded px-3 py-2 text-sm"
                        />
                        <input
                          id={`state-${order.id}`}
                          type="text"
                          placeholder="State *"
                          defaultValue={order.shipping_state || ''}
                          className="border rounded px-3 py-2 text-sm"
                        />
                        <input
                          id={`postcode-${order.id}`}
                          type="text"
                          placeholder="Postcode *"
                          defaultValue={order.shipping_postcode || ''}
                          className="border rounded px-3 py-2 text-sm"
                        />
                        <input
                          id={`country-${order.id}`}
                          type="text"
                          placeholder="Country"
                          defaultValue={order.shipping_country || 'AU'}
                          className="border rounded px-3 py-2 text-sm"
                        />
                        <input
                          id={`email-${order.id}`}
                          type="email"
                          placeholder="Email"
                          defaultValue={order.customer_email || ''}
                          className="border rounded px-3 py-2 text-sm"
                        />
                        <input
                          id={`weight-${order.id}`}
                          type="text"
                          placeholder="Weight (kg)"
                          defaultValue="0.5"
                          className="border rounded px-3 py-2 text-sm"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => generateLabel(order.id)}
                          className="px-4 py-2 bg-black text-white rounded text-sm hover:bg-gray-800 transition-colors"
                        >
                          Print Label
                        </button>
                        <button
                          onClick={() => setShowAddressForm(null)}
                          className="px-4 py-2 border rounded text-sm hover:bg-gray-100 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      )}


    </main>
  )
}
