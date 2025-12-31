import { TrendingUp } from 'lucide-react'

interface TrendingBadgeProps {
  size?: 'large' | 'small'
  variant?: 'overlay' | 'inline'
}

export default function TrendingBadge({ size = 'large', variant = 'overlay' }: TrendingBadgeProps) {
  if (variant === 'inline') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold uppercase tracking-wider">
        <TrendingUp className="w-3 h-3" />
        Trending
      </span>
    )
  }

  // Overlay variant for grid items
  const badgePadding = size === 'large'
    ? 'px-2 py-1 sm:px-3 sm:py-1.5'
    : 'px-1.5 py-0.5 sm:px-2 sm:py-1'

  const iconSize = size === 'large'
    ? 'w-3 h-3 sm:w-4 sm:h-4'
    : 'w-2.5 h-2.5 sm:w-3 sm:h-3'

  const textSize = size === 'large'
    ? 'text-[10px] sm:text-xs'
    : 'text-[8px] sm:text-[10px]'

  return (
    <div className="absolute top-2 left-2 z-20">
      <span className={`flex items-center gap-1 ${badgePadding} bg-emerald-600 text-white font-bold rounded ${textSize}`}>
        <TrendingUp className={iconSize} />
        <span className="hidden sm:inline">TRENDING</span>
      </span>
    </div>
  )
}
