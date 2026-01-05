'use client'

import { useState, useMemo, useEffect } from 'react'
import { Post, searchPosts } from '@/lib/posts-client'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 从 API 获取文章数据
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching posts:', error)
        setLoading(false)
      })
  }, [])

  const filteredPosts = useMemo(() => {
    return searchPosts(posts, query)
  }, [query, posts])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">搜索</h1>
      <div className="mb-8">
        <input
          type="text"
          placeholder="搜索文章标题、内容、标签..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />
      </div>

      {query && (
        <div>
          <p className="text-gray-600 mb-4">
            找到 {filteredPosts.length} 篇文章
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="block p-6 border rounded-lg hover:shadow-lg transition-shadow"
              >
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{formatDate(post.date)}</span>
                  <span>{post.readingTime} 分钟阅读</span>
                </div>
                <div className="mt-4 flex gap-2 flex-wrap">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    {post.category}
                  </span>
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {!query && (
        <div className="text-center text-gray-500 py-12">
          <p className="text-lg">请输入搜索关键词</p>
        </div>
      )}

      {loading && (
        <div className="text-center text-gray-500 py-12">
          <p className="text-lg">加载中...</p>
        </div>
      )}
    </div>
  )
}
