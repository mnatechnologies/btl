export type SaleConfig = {
    isActive: boolean
    discountPercent: number
    saleName: string
    saleMessage: string
    startDate: Date
    endDate: Date
}

const BOXING_DAY_START = new Date('2025-12-26T00:00:00+11:00')
const BOXING_DAY_END = new Date('2025-12-27T00:00:00+11:00')

const SALE_CONFIG = {
    discountPercent: 50,
    saleName: 'Boxing Day Sale',
    saleMessage: '50% off our whole range',
    startDate: BOXING_DAY_START,
    endDate: BOXING_DAY_END
}

export function isSaleActive(): boolean {
    const now = Date.now()
    return now >= SALE_CONFIG.startDate.getTime() && now <= SALE_CONFIG.endDate.getTime()
}

export function getSaleConfig(): SaleConfig {
    return {
        ...SALE_CONFIG,
        isActive: isSaleActive(),

    }
}

export function getSalePrice(priceInCents: number): number {
    if (!isSaleActive()) return priceInCents
    return Math.round(priceInCents * (1 - SALE_CONFIG.discountPercent / 100))
}

export function getSalePriceFromDollars(priceInDollars: number): number {
    if (!isSaleActive()) return priceInDollars
    return priceInDollars * (1 - SALE_CONFIG.discountPercent / 100)
}

export function getDiscountPercent(): number {
    return isSaleActive() ? SALE_CONFIG.discountPercent : 0
}