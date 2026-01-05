'use client'

import AdSense from './AdSense'

interface AdBannerProps {
  slot: string
  format?: 'auto' | 'horizontal' | 'rectangle' | 'vertical'
  className?: string
}

export default function AdBanner({
  slot,
  format = 'auto',
  className = '',
}: AdBannerProps) {
  return (
    <div className={`ad-container ${className}`}>
      <div className="text-center text-xs text-gray-500 dark:text-gray-500 mb-2">
        广告
      </div>
      <AdSense slot={slot} format={format} />
    </div>
  )
}
