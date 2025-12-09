// Promo codes configuration
// Set via env var: PROMO_CODES=WELCOME10:1000,LAUNCH15:15%,BTL10:1000
// Format: CODE:AMOUNT_IN_CENTS or CODE:PERCENTAGE% (comma separated)
// Examples:
//   WELCOME10:1000 = $10 off (fixed)
//   LAUNCH15:15% = 15% off (percentage)

type PromoCode = {
  discount: number      // in cents for fixed, or percentage (0-100) for percentage
  type: 'fixed' | 'percentage'
  description: string
  currency: string
}

function parsePromoCodes(): Record<string, PromoCode> {
  const envCodes = process.env.PROMO_CODES || ''

  if (!envCodes.trim()) {
    return {}
  }

  const codes: Record<string, PromoCode> = {}

  envCodes.split(',').forEach(entry => {
    const [code, valueStr] = entry.trim().split(':')
    if (code && valueStr) {
      // Check if it's a percentage discount (ends with %)
      if (valueStr.endsWith('%')) {
        const percentage = parseFloat(valueStr.slice(0, -1))
        if (!isNaN(percentage) && percentage > 0 && percentage <= 100) {
          codes[code.toUpperCase()] = {
            discount: percentage,
            type: 'percentage',
            description: `${percentage}% off your order`,
            currency: 'aud'
          }
        }
      } else {
        // Fixed amount in cents
        const amount = parseInt(valueStr, 10)
        if (!isNaN(amount) && amount > 0) {
          codes[code.toUpperCase()] = {
            discount: amount,
            type: 'fixed',
            description: `$${(amount / 100).toFixed(0)} off your order`,
            currency: 'aud'
          }
        }
      }
    }
  })

  return codes
}

// Cache the parsed codes
let cachedCodes: Record<string, PromoCode> | null = null

export function getPromoCodes(): Record<string, PromoCode> {
  if (!cachedCodes) {
    cachedCodes = parsePromoCodes()
  }
  return cachedCodes
}

export function getPromoCode(code: string): PromoCode | null {
  const codes = getPromoCodes()
  return codes[code.toUpperCase().trim()] || null
}

export function isValidPromoCode(code: string): boolean {
  return getPromoCode(code) !== null
}

