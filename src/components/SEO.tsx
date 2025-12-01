import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'product' | 'article'
  price?: number
  currency?: string
  availability?: 'instock' | 'outofstock' | 'preorder'
  brand?: string
  sku?: string
}

export default function SEO({
  title = 'Built To Last | Premium Quality Essentials',
  description = 'Premium quality essentials designed for those who value craftsmanship and timeless style. Australian-made clothing built to last.',
  image = '/images/og-image.jpg',
  url,
  type = 'website',
  price,
  currency = 'AUD',
  availability = 'instock',
  brand = 'Built To Last',
  sku
}: SEOProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://btlclothing.au'
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`

  // Product schema for product pages
  const productSchema = type === 'product' && price ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: title,
    description: description,
    image: fullImage,
    brand: {
      '@type': 'Brand',
      name: brand
    },
    sku: sku,
    offers: {
      '@type': 'Offer',
      url: fullUrl,
      priceCurrency: currency,
      price: price,
      availability: `https://schema.org/${availability === 'instock' ? 'InStock' : 'OutOfStock'}`,
      seller: {
        '@type': 'Organization',
        name: brand
      }
    }
  } : null

  // Organization schema for homepage
  const organizationSchema = type === 'website' ? {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: 'Built To Last',
    description: description,
    url: siteUrl,
    logo: `${siteUrl}/images/btl-logo-black.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'U3, 77 Newton Road',
      addressLocality: 'Wetherill Park',
      addressRegion: 'NSW',
      postalCode: '2164',
      addressCountry: 'AU'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+61-450-588-558',
      contactType: 'Customer Service',
      email: 'info@btlclothing.au',
      areaServed: 'AU',
      availableLanguage: 'English'
    },
    sameAs: [
      'https://instagram.com/btlclothing',
      'https://www.facebook.com/btlclothing'
    ],
    priceRange: '$$',
    currenciesAccepted: 'AUD',
    paymentAccepted: 'Credit Card, Debit Card, Apple Pay, Google Pay'
  } : null

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Built To Last" />
      <meta property="og:locale" content="en_AU" />

      {/* Product specific OG tags */}
      {type === 'product' && price && (
        <>
          <meta property="og:price:amount" content={price.toString()} />
          <meta property="og:price:currency" content={currency} />
          <meta property="product:brand" content={brand} />
          <meta property="product:availability" content={availability} />
          {sku && <meta property="product:retailer_item_id" content={sku} />}
        </>
      )}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImage} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="Built To Last" />
      <meta name="geo.region" content="AU-NSW" />
      <meta name="geo.placename" content="Sydney" />

      {/* Schema.org structured data */}
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      {organizationSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      )}
    </Head>
  )
}