'use client'

import { useState, useMemo, useEffect } from 'react'
import { Post, searchPosts } from '@/lib/posts-client'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

interface SearchBarProps {
  posts: Post[]
}

export default function SearchBar({ posts }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const filteredPosts = useMemo(() => {
    return searchPosts(posts, query)
  }, [query, posts])

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="搜索文章..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isOpen && query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          {filteredPosts.length > 0 ? (
            <div className="divide-y">
              {filteredPosts.slice(0, 10).map((post) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="block p-4 hover:bg-gray-50"
                >
                  <h3 className="font-semibold mb-1">{post.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{formatDate(post.date)}</span>
                    <span>•</span>
                    <span>{post.category}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              没有找到相关文章
            </div>
          )}
        </div>
      )}
    </div>
  )
}
