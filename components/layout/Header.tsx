import Link from 'next/link'
import SearchBar from '../search/SearchBar'
import ThemeToggle from '../ui/ThemeToggle'
import { getAllPosts } from '@/lib/posts'
import { Post } from '@/lib/posts-client'

interface HeaderProps {
  posts?: Post[]
}

export default function Header({ posts }: HeaderProps = {}) {
  // 如果没有传入 posts，在服务端获取
  const allPosts = posts || getAllPosts()
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-40 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold gradient-text cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
            游戏开发技术笔记
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/posts"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded font-medium"
            >
              文章
            </Link>
            <Link
              href="/categories"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded font-medium"
            >
              分类
            </Link>
            <Link
              href="/tags"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded font-medium"
            >
              标签
            </Link>
            <Link
              href="/search"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded font-medium"
            >
              搜索
            </Link>
            <ThemeToggle />
          </nav>
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <SearchBar posts={allPosts} />
          </div>
        </div>
        <div className="mt-4 hidden md:block">
          <SearchBar posts={allPosts} />
        </div>
      </div>
    </header>
  )
}
