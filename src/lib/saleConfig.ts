export type SaleConfig = {
    isActive: boolean
    discountPercent: number
    saleName: string
    saleMessage: string
    bannerText: string
    bannerTextMobile: string
    modalHeader: string
    modalSubtitle: string
    modalNote: string
    startDate: Date | null
    endDate: Date | null
}

export type DefaultPromo = {
    code: string
    discountPercent: number
}

const SALE_CONFIG = {
    discountPercent: Number(process.env.NEXT_PUBLIC_SALE_DISCOUNT_PERCENT) || 0,
    saleName: process.env.NEXT_PUBLIC_SALE_NAME || '',
    saleMessage: process.env.NEXT_PUBLIC_SALE_MESSAGE || '',
    bannerText: process.env.NEXT_PUBLIC_SALE_BANNER_TEXT || '',
    bannerTextMobile: process.env.NEXT_PUBLIC_SALE_BANNER_TEXT_MOBILE || '',
    modalHeader: process.env.NEXT_PUBLIC_SALE_MODAL_HEADER || '',
    modalSubtitle: process.env.NEXT_PUBLIC_SALE_MODAL_SUBTITLE || '',
    modalNote: process.env.NEXT_PUBLIC_SALE_MODAL_NOTE || '',
    startDate: process.env.NEXT_PUBLIC_SALE_START_DATE
      ? new Date(process.env.NEXT_PUBLIC_SALE_START_DATE)
      : null,
    endDate: process.env.NEXT_PUBLIC_SALE_END_DATE
      ? new Date(process.env.NEXT_PUBLIC_SALE_END_DATE)
      : null,
}

const DEFAULT_PROMO: DefaultPromo = {
    code: process.env.NEXT_PUBLIC_DEFAULT_PROMO_CODE || 'BTL15',
    discountPercent: Number(process.env.NEXT_PUBLIC_DEFAULT_PROMO_PERCENT) || 15,
}

export function isSaleActive(): boolean {
    if (!SALE_CONFIG.startDate || !SALE_CONFIG.endDate) return false
    const now = Date.now()
    return now >= SALE_CONFIG.startDate.getTime() && now <= SALE_CONFIG.endDate.getTime()
}

export function getSaleConfig(): SaleConfig {
    return {
        ...SALE_CONFIG,
        isActive: isSaleActive(),
    }
}

export function getDefaultPromo(): DefaultPromo {
    return DEFAULT_PROMO
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

export function getSaleName(): string {
    return isSaleActive() ? SALE_CONFIG.saleName : ''
}
