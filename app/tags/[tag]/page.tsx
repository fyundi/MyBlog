import { getPostsByTag } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

interface TagPageProps {
  params: {
    tag: string
  }
}

export default function TagPage({ params }: TagPageProps) {
  const posts = getPostsByTag(params.tag)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">标签: {params.tag}</h1>
        <p className="text-gray-500">{posts.length} 篇文章</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
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
            <div className="mt-4 flex gap-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                {post.category}
              </span>
              {post.tags
                .filter((t) => t !== params.tag)
                .slice(0, 2)
                .map((tag) => (
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
  )
}
