import Link from 'next/link'
import { Post } from '@/lib/posts-client'
import { formatDate } from '@/lib/utils'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="block p-6 border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-white dark:bg-gray-800 card-hover"
    >
      <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 line-clamp-2">
        {post.title}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 text-sm">
        {post.description}
      </p>
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 mb-4">
        <span>{formatDate(post.date)}</span>
        <span>{post.readingTime} 分钟阅读</span>
      </div>
      <div className="flex gap-2 flex-wrap">
        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
          {post.category}
        </span>
        {post.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  )
}
