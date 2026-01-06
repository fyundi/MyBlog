import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ThemeScript from '@/components/ui/ThemeScript'
import { getAllPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: {
    default: '游戏开发随记',
    template: '%s | 游戏开发随记',
  },
  description: '记录开发过程中的技术笔记与实践经验',
  keywords: ['技术博客', '开发笔记', '游戏开发', 'Unity', 'Cocos', '编程'],
  authors: [{ name: '游戏开发随记' }],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://your-blog.vercel.app',
    siteName: '游戏开发随记',
    title: '游戏开发随记',
    description: '记录开发过程中的技术笔记与实践经验',
  },
  twitter: {
    card: 'summary_large_image',
    title: '游戏开发随记',
    description: '记录开发过程中的技术笔记与实践经验',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 在服务端获取文章数据
  const posts = getAllPosts()

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <ThemeScript />
        <Header posts={posts} />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
