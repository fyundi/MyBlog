import { getAllPosts } from '@/lib/posts'
import { getAllCategoryInfos } from '@/lib/categories'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export default function Home() {
  const posts = getAllPosts().slice(0, 6)
  const categories = getAllCategoryInfos()

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <section className="mb-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
          游戏开发随记
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          记录开发过程中的技术笔记与实践经验
        </p>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-gray-100">
          分类
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="block p-8 border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-white dark:bg-gray-800 card-hover"
            >
              <div className="text-5xl mb-4">{category.icon}</div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                {category.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {category.description}
              </p>
              <span className="text-sm text-gray-500 dark:text-gray-500 font-medium">
                {category.count} 篇文章
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            最新文章
          </h2>
          <Link
            href="/posts"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded font-medium flex items-center gap-1"
          >
            查看全部
            <span>→</span>
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="block p-6 border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-white dark:bg-gray-800 card-hover"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 line-clamp-2">
                {post.title}
              </h3>
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
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
