// Promo codes configuration
// Set via env var: PROMO_CODES=WELCOME10:1000,LAUNCH10:1000,BTL10:1000
// Format: CODE:AMOUNT_IN_CENTS (comma separated)

type PromoCode = {
  discount: number      // in cents
  type: 'fixed'         // currently only fixed supported
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
    const [code, amountStr] = entry.trim().split(':')
    if (code && amountStr) {
      const amount = parseInt(amountStr, 10)
      if (!isNaN(amount) && amount > 0) {
        codes[code.toUpperCase()] = {
          discount: amount,
          type: 'fixed',
          description: `$${(amount / 100).toFixed(0)} off your order`,
          currency: 'aud'
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

