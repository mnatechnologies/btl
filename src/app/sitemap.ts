import { MetadataRoute } from 'next'
import { getAllProducts } from '@/lib/products'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://btlclothing.au'

    // Static pages
    const routes = [
    '',
    '/store',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/returns'
    ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8
    }))

    // Product pages
    const products = await getAllProducts()
    const productRoutes = products.map((product) => ({
    url: `${baseUrl}/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'daily' as const,
    priority: 0.9
    }))

    return [...routes, ...productRoutes]
}