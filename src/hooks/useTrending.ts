'use client'

import { useState, useEffect, useCallback } from 'react'

interface TrendingVariant {
  handle: string
  color: string
}

interface TrendingData {
  trending: TrendingVariant[]
  isLoading: boolean
  error: Error | null
  isTrending: (handle: string, color: string) => boolean
}

export function useTrending(): TrendingData {
  const [trending, setTrending] = useState<TrendingVariant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchTrending() {
      try {
        const response = await fetch('/api/trending')
        if (!response.ok) throw new Error('Failed to fetch trending data')
        const data = await response.json()
        setTrending(data.trending || [])
      } catch (e) {
        setError(e as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrending()
  }, [])

  const isTrending = useCallback((handle: string, color: string): boolean => {
    return trending.some(
      t => t.handle.toLowerCase() === handle.toLowerCase() &&
           t.color.toLowerCase() === color.toLowerCase()
    )
  }, [trending])

  return { trending, isLoading, error, isTrending }
}
