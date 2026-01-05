'use client'

import { useEffect } from 'react'

interface AdSenseProps {
  slot: string
  style?: React.CSSProperties
  format?: string
}

export default function AdSense({
  slot,
  style = { display: 'block' },
  format = 'auto',
}: AdSenseProps) {
  useEffect(() => {
    // 加载 AdSense 脚本（如果还没有加载）
    if (!document.querySelector('script[src*="adsbygoogle"]')) {
      const script = document.createElement('script')
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`
      script.async = true
      script.crossOrigin = 'anonymous'
      document.head.appendChild(script)
    }

    // 初始化广告
    try {
      // @ts-ignore
      if (window.adsbygoogle && !window.adsbygoogle.loaded) {
        // @ts-ignore
        window.adsbygoogle = window.adsbygoogle || []
        // @ts-ignore
        window.adsbygoogle.push({})
      }
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [])

  // 如果没有配置 AdSense ID，显示占位符
  if (!process.env.NEXT_PUBLIC_ADSENSE_ID) {
    return (
      <div className="ad-container" style={{ minHeight: '100px' }}>
        <div className="text-center text-gray-500 text-sm">
          广告位（配置 AdSense ID 后显示）
        </div>
      </div>
    )
  }

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  )
}
