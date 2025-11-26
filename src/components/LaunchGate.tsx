'use client'

import { useState, useEffect } from 'react'
import ComingSoon from './ComingSoon'

// Set your launch date via env var or fallback
const LAUNCH_DATE = new Date(process.env.NEXT_PUBLIC_LAUNCH_DATE || '2025-12-05T00:00:00+11:00')

// Bypass paths - these pages are always accessible
const BYPASS_PATHS = ['/admin']

// Preview secret for testing before launch
const PREVIEW_SECRET = process.env.NEXT_PUBLIC_PREVIEW_SECRET || 'btl-preview-2025'

export default function LaunchGate({ children }: { children: React.ReactNode }) {
  const [isLaunched, setIsLaunched] = useState<boolean | null>(null)
  const [isBypass, setIsBypass] = useState(false)

  useEffect(() => {
    // Check if current path should bypass the gate
    const path = window.location.pathname
    const shouldBypass = BYPASS_PATHS.some(bp => path.startsWith(bp))
    setIsBypass(shouldBypass)

    // Check if we're past launch date
    const launched = new Date() >= LAUNCH_DATE
    setIsLaunched(launched)

    // Check for a secret bypass query param (for testing)
    const params = new URLSearchParams(window.location.search)
    if (params.get('preview') === PREVIEW_SECRET) {
      setIsLaunched(true)
    }
  }, [])

  // Still loading
  if (isLaunched === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-white">Loading...</div>
      </div>
    )
  }

  // Admin and bypass paths always show
  if (isBypass) {
    return <>{children}</>
  }

  // Before launch - show coming soon
  if (!isLaunched) {
    return <ComingSoon />
  }

  // After launch - show the site
  return <>{children}</>
}

