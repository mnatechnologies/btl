'use client'
import { useState, useEffect } from 'react'
import { X, Shield, Cookie } from 'lucide-react'
import Link from 'next/link'

const COOKIE_CONSENT_KEY = 'btl_cookie_consent'
const COOKIE_CONSENT_VERSION = '1.0'

type ConsentPreferences = {
  necessary: boolean // Always true, can't be disabled
  analytics: boolean
  version: string
  timestamp: string
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true,
    analytics: false,
    version: COOKIE_CONSENT_VERSION,
    timestamp: new Date().toISOString()
  })



  const applyConsent = (prefs: ConsentPreferences) => {
    // Apply analytics consent
    if (prefs.analytics) {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('consent', 'update', {
          analytics_storage: 'granted'
        })
      }
    }
  }

  const saveConsent = (prefs: ConsentPreferences) => {
    try {
      const consentData = {
        ...prefs,
        version: COOKIE_CONSENT_VERSION,
        timestamp: new Date().toISOString()
      }
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData))
      applyConsent(consentData)
      setIsVisible(false)
    } catch (err) {
      console.error('Error saving cookie consent:', err)
    }
  }

  const acceptAll = () => {
    const allConsent: ConsentPreferences = {
      necessary: true,
      analytics: true,
      version: COOKIE_CONSENT_VERSION,
      timestamp: new Date().toISOString()
    }
    saveConsent(allConsent)
  }

  const acceptNecessary = () => {
    saveConsent({ ...preferences, analytics: false })
  }

  const acceptCustom = () => {
    saveConsent(preferences)
  }

  useEffect(() => {
    try {
      const saved = localStorage.getItem(COOKIE_CONSENT_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as ConsentPreferences
        if (parsed.version === COOKIE_CONSENT_VERSION) {
          setPreferences(parsed)
          applyConsent(parsed)
          return
        }
      }
      // Show banner after 2 seconds
      setTimeout(() => setIsVisible(true), 2000)
    } catch (err) {
      console.error('Error loading cookie consent:', err)
      setIsVisible(true)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 z-40 pointer-events-none" />

      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 shadow-2xl">
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Cookie className="w-5 h-5 text-neutral-600 dark:text-neutral-400 flex-shrink-0" />
              <h3 className="font-semibold text-lg">We Value Your Privacy</h3>
            </div>
            <button
              onClick={acceptNecessary}
              className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
              aria-label="Close and accept necessary cookies only"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
            We use cookies to improve your experience on our site. By clicking &#34;Accept All&#34;, you consent to our use of cookies in accordance with the Australian Privacy Act 1988.
            Read our{' '}
            <Link href="/privacy" className="underline hover:text-neutral-900 dark:hover:text-neutral-100">
              Privacy Policy
            </Link>{' '}
            for details.
          </p>

          {/* Detailed Settings */}
          {showDetails && (
            <div className="mb-4 space-y-3 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              {/* Necessary Cookies */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-sm">Essential Cookies</span>
                    <span className="text-xs text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded">Always Active</span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    Required for the website to function. These enable core features like security, authentication, and your shopping cart.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="mt-1 cursor-not-allowed"
                />
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <span className="font-medium text-sm block mb-1">Analytics Cookies</span>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    Help us understand how you use our website so we can improve your experience. All data is anonymized.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="mt-1 cursor-pointer w-4 h-4"
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="px-4 py-2 text-sm border border-neutral-300 dark:border-neutral-700 rounded hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              {showDetails ? 'Hide Details' : 'Customize'}
            </button>

            {showDetails && (
              <button
                onClick={acceptCustom}
                className="px-4 py-2 text-sm bg-neutral-800 dark:bg-neutral-200 text-white dark:text-black rounded hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors"
              >
                Save Preferences
              </button>
            )}

            <button
              onClick={acceptNecessary}
              className="px-4 py-2 text-sm border border-neutral-300 dark:border-neutral-700 rounded hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              Essential Only
            </button>

            <button
              onClick={acceptAll}
              className="px-4 py-2 text-sm bg-black dark:bg-white text-white dark:text-black rounded hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </>
  )
}