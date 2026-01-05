'use client'

import { useEffect, useRef, useState } from 'react'

interface MermaidProps {
  chart: string
}

export default function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!ref.current) return

    let isMounted = true

    // 动态导入 mermaid
    import('mermaid').then((mermaidModule) => {
      if (!isMounted) return

      const mermaid = mermaidModule.default

      // 初始化 mermaid
      mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose',
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true,
        },
      })

      // 清除之前的内容
      if (ref.current) {
        ref.current.innerHTML = ''

        // 生成唯一 ID
        const id = `mermaid-${Math.random().toString(36).substring(2, 11)}`

        try {
          // 渲染图表
          mermaid.render(id, chart).then((result) => {
            if (isMounted && ref.current) {
              ref.current.innerHTML = result.svg
              setError(null)
            }
          }).catch((err) => {
            if (isMounted) {
              console.error('Mermaid render error:', err)
              setError('图表渲染失败')
              if (ref.current) {
                ref.current.innerHTML = `<pre class="text-red-500 p-4 bg-red-50 dark:bg-red-900/20 rounded">Mermaid 图表渲染错误: ${err.message}</pre>`
              }
            }
          })
        } catch (err: any) {
          if (isMounted) {
            console.error('Mermaid error:', err)
            setError(err.message || '未知错误')
            if (ref.current) {
              ref.current.innerHTML = `<pre class="text-red-500 p-4 bg-red-50 dark:bg-red-900/20 rounded">Mermaid 图表错误: ${err.message || '未知错误'}</pre>`
            }
          }
        }
      }
    }).catch((err) => {
      if (isMounted) {
        console.error('Failed to load mermaid:', err)
        setError('无法加载 Mermaid 库')
        if (ref.current) {
          ref.current.innerHTML = '<p class="text-red-500">无法加载 Mermaid 图表库，请确保已安装 mermaid 包</p>'
        }
      }
    })

    return () => {
      isMounted = false
    }
  }, [chart])

  if (error) {
    return (
      <div className="my-8 p-4 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    )
  }

  return <div ref={ref} className="my-8 flex justify-center" />
}
