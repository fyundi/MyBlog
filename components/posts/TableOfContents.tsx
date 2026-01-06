'use client'

import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  headings: Heading[]
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [isVisible, setIsVisible] = useState(false)
  const [actualHeadings, setActualHeadings] = useState<Heading[]>([])

  // 从 DOM 中读取实际的标题 ID
  useEffect(() => {
    if (headings.length === 0) {
      setIsVisible(false)
      return
    }

    // 等待 DOM 渲染完成
    const timer = setTimeout(() => {
      const markdownContent = document.querySelector('.markdown-content')
      if (!markdownContent) {
        setIsVisible(false)
        return
      }

      const h2Elements = markdownContent.querySelectorAll('h2')
      const actual: Heading[] = []

      h2Elements.forEach((el) => {
        const id = el.id
        const text = el.textContent || ''
        if (id && text) {
          actual.push({
            id: id,
            text: text.trim(),
            level: 2,
          })
        }
      })

      if (actual.length > 0) {
        setActualHeadings(actual)
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [headings])

  useEffect(() => {
    if (actualHeadings.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0,
      }
    )

    const headingElements = actualHeadings.map((heading) =>
      document.getElementById(heading.id)
    ).filter(Boolean) as HTMLElement[]

    headingElements.forEach((el) => observer.observe(el))

    return () => {
      headingElements.forEach((el) => observer.unobserve(el))
    }
  }, [actualHeadings])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // 考虑固定头部的高度
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  if (!isVisible || actualHeadings.length === 0) {
    return null
  }

  return (
    <div className="hidden xl:block fixed top-24 right-8 w-64 max-h-[calc(100vh-8rem)] overflow-y-auto z-10">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-lg">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-wide">
          目录
        </h2>
        <nav className="space-y-1">
          {actualHeadings.map((heading) => {
            const isActive = activeId === heading.id

            return (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToHeading(heading.id)
                }}
                className={`
                  block py-1.5 px-2 text-sm rounded-md transition-colors duration-200 truncate cursor-pointer
                  ${isActive
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
                title={heading.text}
              >
                {heading.text}
              </a>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
