'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

// Set your launch date here
const LAUNCH_DATE = new Date('2025-12-05T10:00:00+11:00') // Launch date: Dec 5, 2025

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(): TimeLeft {
  const now = new Date()
  const difference = LAUNCH_DATE.getTime() - now.getTime()

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

export function isLaunched(): boolean {
  return new Date() >= LAUNCH_DATE
}

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      if (res.ok) {
        setSubscribed(true)
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false)
    }
  }

  const photos = [
    '/Photos/Products/Legacy/RVN/BTLFlatlayBlackBackground19.jpg',
    '/Photos/Products/Monolith/RVN/BTLFlatlayBlackBackground22.jpg',
    '/Photos/Products/Eternal/RVN/BTLFlatlayBlackBackground43.jpg',
    '/Photos/Products/Legacy/ALB/BTLFlatlayBlackBackground15.jpg',
  ]

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative z-10">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/images/btl-logo-white.jpg"
            alt="Built To Last"
            width={200}
            height={200}
            className="h-16 w-auto"
          />
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-center mb-4 tracking-tight">
          Coming Soon
        </h1>
        
        <p className="text-lg sm:text-xl text-white/70 text-center max-w-xl mb-12">
          Premium essentials designed to last. Built with exceptional craftsmanship and timeless style.
        </p>

        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-4 sm:gap-6 mb-12">
          {[
            { value: timeLeft.days, label: 'Days' },
            { value: timeLeft.hours, label: 'Hours' },
            { value: timeLeft.minutes, label: 'Minutes' },
            { value: timeLeft.seconds, label: 'Seconds' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 sm:p-6 min-w-[70px] sm:min-w-[90px]">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tabular-nums">
                  {value.toString().padStart(2, '0')}
                </div>
              </div>
              <div className="text-xs sm:text-sm text-white/50 mt-2 uppercase tracking-wider">
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Product Preview Images */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mb-12 w-full">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg bg-white/5 border border-white/10 w-full"
              style={{ paddingBottom: '100%' }}
            >
              <Image
                src={photo}
                alt={`Preview ${index + 1}`}
                sizes="(max-width: 640px) 50vw, 25vw"
                fill
                className="absolute inset-0 object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-500"
                onError={(e) => {
                  console.error(`Failed to load image: ${photo}`)
                }}
              />
            </div>
          ))}
        </div>

        {/* Email Signup */}
        <div className="w-full max-w-md">
          {subscribed ? (
            <div className="text-center p-4 bg-white/5 border border-white/20 rounded-lg">
              <p className="text-lg font-medium">You&apos;re on the list!</p>
              <p className="text-sm text-white/60 mt-1">We&apos;ll notify you when we launch.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50"
              >
                {loading ? 'Joining...' : 'Notify Me'}
              </button>
            </form>
          )}
          <p className="text-xs text-white/40 text-center mt-3">
            Be the first to know. Subscribe for Releases and Updates.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-white/30 text-sm relative z-10">
        <p>© {new Date().getFullYear()} Built To Last. All rights reserved.</p>
      </footer>
    </div>
  )
}

