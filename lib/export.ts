import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import JSZip from 'jszip'
import { getAllPosts } from './posts'

export async function exportPost(slug: string): Promise<string> {
  const postsDirectory = path.join(process.cwd(), 'content/posts')
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${slug}`)
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { content } = matter(fileContents)

  return content.trim()
}

export async function exportAllPosts(): Promise<Buffer> {
  const posts = getAllPosts()
  const zip = new JSZip()

  // 按分类组织文件
  const postsByCategory: Record<string, typeof posts> = {}
  
  for (const post of posts) {
    if (!postsByCategory[post.category]) {
      postsByCategory[post.category] = []
    }
    postsByCategory[post.category].push(post)
  }

  // 导出每篇文章
  for (const [category, categoryPosts] of Object.entries(postsByCategory)) {
    for (const post of categoryPosts) {
      try {
        const content = await exportPost(post.slug)
        const filename = `${post.slug.split('/').pop()}.md`
        zip.file(`${category}/${filename}`, content)
      } catch (error) {
        console.error(`Error exporting post ${post.slug}:`, error)
      }
    }
  }

  return await zip.generateAsync({ type: 'nodebuffer' })
}
