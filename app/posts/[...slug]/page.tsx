import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'
import MarkdownContent from '@/components/posts/MarkdownContent'
import TableOfContents from '@/components/posts/TableOfContents'
import { extractHeadings } from '@/lib/toc'

interface PostPageProps {
  params: {
    slug: string[]
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug.split('/'),
  }))
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug
  const post = getPostBySlug(slug)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const headings = extractHeadings(post.content)

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12">
      <div className="max-w-3xl mx-auto relative xl:mr-80">
        <article>
          <header className="mb-16 pb-10 border-b border-gray-200 dark:border-gray-800">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-gray-100 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-8 text-sm">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>•</span>
              <span>{post.readingTime} 分钟阅读</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                {post.category}
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>
          <div className="markdown-wrapper mt-12">
            <MarkdownContent content={post.content} />
          </div>
        </article>
        <TableOfContents headings={headings} />
      </div>
    </div>
  )
}
