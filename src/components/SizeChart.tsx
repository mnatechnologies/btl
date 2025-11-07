'use client'
import { X } from 'lucide-react'

type SizeChartProps = {
  isOpen: boolean
  onClose: () => void
}

const sizeData = [
  { measurement: 'length', XXS: 67.2, XS: 69.7, S: 72.2, M: 74.7, L: 77.2, XL: 79.7, '2XL': 82.2 },
  { measurement: 'shoulder', XXS: 48.9, XS: 51.5, S: 54.1, M: 56.7, L: 59.3, XL: 61.9, '2XL': 64.5 },
  { measurement: 'chest/2', XXS: 48, XS: 52, S: 56, M: 60, L: 64, XL: 68, '2XL': 72 },
  { measurement: 'hem/2', XXS: 48, XS: 52, S: 56, M: 60, L: 64, XL: 68, '2XL': 72 },
  { measurement: 'sleeve', XXS: 19.8, XS: 20.4, S: 21, M: 21.6, L: 22.2, XL: 22.8, '2XL': 23.4 },
  { measurement: 'cuff/2', XXS: 17.7, XS: 18.3, S: 18.9, M: 19.5, L: 20.1, XL: 20.7, '2XL': 21.3 },
]

const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', '2XL']

export default function SizeChart({ isOpen, onClose }: SizeChartProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 z-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-neutral-900 shadow-2xl z-50 w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-display font-bold text-black dark:text-white">BTL T-shirt Size Chart</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
            aria-label="Close size chart"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid lg:grid-cols-[1fr_auto] gap-6">
            {/* Size Chart Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 p-3 text-left text-sm font-semibold text-brand-charcoal dark:text-white">CM</th>
                    {sizes.map((size) => (
                      <th 
                        key={size}
                        className="border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 p-3 text-center text-sm font-semibold text-black dark:text-white"
                      >
                        {size}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizeData.map((row, idx) => (
                    <tr key={row.measurement} className={idx % 2 === 0 ? 'bg-white dark:bg-neutral-900' : 'bg-neutral-50/50 dark:bg-neutral-800/50'}>
                      <td className="border border-neutral-300 dark:border-neutral-700 p-3 text-sm font-medium text-black dark:text-white capitalize">
                        {row.measurement}
                      </td>
                      {sizes.map((size) => (
                        <td 
                          key={size}
                          className="border border-neutral-300 dark:border-neutral-700 p-3 text-center text-sm text-black dark:text-white"
                        >
                          {row[size as keyof typeof row]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

