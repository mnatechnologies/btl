import { NextRequest } from 'next/server'

/**
 * Simple CSRF protection via origin validation
 * Validates that requests come from the same origin
 */
export function validateOrigin(req: NextRequest): boolean {
  // Skip validation for GET and HEAD requests (they should be safe)
  const method = req.method.toUpperCase()
  if (method === 'GET' || method === 'HEAD') {
    return true
  }

  // Get allowed origins from environment
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const allowedOrigins = [
    siteUrl,
    'http://localhost:3000',
    'http://localhost:3001',
  ]

  // Check Origin header first (most reliable)
  const origin = req.headers.get('origin')
  if (origin) {
    return allowedOrigins.includes(origin)
  }

  // Fallback to Referer header
  const referer = req.headers.get('referer')
  if (referer) {
    try {
      const refererUrl = new URL(referer)
      const refererOrigin = `${refererUrl.protocol}//${refererUrl.host}`
      return allowedOrigins.includes(refererOrigin)
    } catch {
      return false
    }
  }

  // If neither header is present, reject the request
  // (legitimate browser requests will always have one of these)
  return false
}

/**
 * Check if request origin is valid
 * Returns error response if invalid, null if valid
 */
export function checkCSRF(req: NextRequest) {
  if (!validateOrigin(req)) {
    return {
      error: 'Invalid request origin',
      status: 403
    }
  }
  return null
}
