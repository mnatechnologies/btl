'use client'

import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { X, Camera, ScanLine } from 'lucide-react'

interface BarcodeScannerProps {
  onScan: (code: string) => void
  onClose: () => void
}

export default function BarcodeScanner({ onScan, onClose }: BarcodeScannerProps) {
  const [error, setError] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const startScanner = async () => {
      try {
        const scanner = new Html5Qrcode('barcode-reader')
        scannerRef.current = scanner

        await scanner.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 250, height: 150 },
            aspectRatio: 1.7777778
          },
          (decodedText) => {
            // Success callback
            onScan(decodedText)
            scanner.stop().catch(console.error)
          },
          () => {
            // Error callback (ignore scan errors, just keep trying)
          }
        )
        setIsScanning(true)
      } catch (err) {
        console.error('Scanner error:', err)
        setError('Unable to access camera. Please ensure camera permissions are granted.')
      }
    }

    startScanner()

    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch(console.error)
      }
    }
  }, [onScan])

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 text-white">
        <div className="flex items-center gap-2">
          <ScanLine className="w-5 h-5" />
          <span className="font-medium">Scan Barcode</span>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Scanner Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {error ? (
          <div className="text-center text-white">
            <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white text-black rounded-lg"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div
              ref={containerRef}
              id="barcode-reader"
              className="w-full max-w-md rounded-lg overflow-hidden"
            />
            {isScanning && (
              <p className="text-white/70 mt-4 text-center text-sm">
                Position the barcode within the frame
              </p>
            )}
          </>
        )}
      </div>

      {/* Manual Entry Option */}
      <div className="p-4">
        <p className="text-white/50 text-center text-sm">
          Or enter SKU manually in the search field
        </p>
      </div>
    </div>
  )
}

