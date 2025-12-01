export const seoConfig = {
  defaultTitle: 'Built To Last | Premium Quality Essentials',
  titleTemplate: '%s | Built To Last',
  defaultDescription: 'Premium quality essentials designed for those who value craftsmanship and timeless style. Australian-made clothing built to last.',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://btlclothing.au',
  siteName: 'Built To Last',
  twitterHandle: '@btlclothing',

  // Product page defaults
  productDefaults: {
    brand: 'Built To Last',
    currency: 'AUD',
    availability: 'instock' as const
  },

  // Generate product title and description
  generateProductMeta: (productName: string, color: string, price: number) => ({
    title: `${productName} - ${color} | Built To Last`,
    description: `Shop the ${productName} in ${color}. Premium quality streetwear built to last. $${price.toFixed(2)} AUD. Free shipping over $100. 14-day returns.`
  }),

  // Generate collection title and description
  generateCollectionMeta: (collectionName: string, itemCount: number) => ({
    title: `${collectionName} | Built To Last`,
    description: `Shop our ${collectionName} collection. ${itemCount} premium quality items. Australian-made streetwear built to last. Free shipping over $100.`
  })
}
