import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// 确保这些 Node.js 模块只在服务端使用
if (typeof window !== 'undefined') {
  throw new Error('posts.ts can only be used on the server side')
}

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface Post {
  slug: string
  title: string
  date: string
  category: string
  tags: string[]
  description: string
  content: string
  readingTime: number
  featured?: boolean
}

function getReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

function getAllPostSlugs(): string[] {
  const slugs: string[] = []
  
  function traverseDir(dir: string, basePath: string = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      const relativePath = path.join(basePath, entry.name)
      
      if (entry.isDirectory()) {
        traverseDir(fullPath, relativePath)
      } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
        const slug = relativePath.replace(/\.mdx$/, '')
        slugs.push(slug)
      }
    }
  }
  
  if (fs.existsSync(postsDirectory)) {
    traverseDir(postsDirectory)
  }
  
  return slugs
}

export function getAllPosts(): Post[] {
  const slugs = getAllPostSlugs()
  const posts = slugs
    .map((slug) => {
      return getPostBySlug(slug)
    })
    .filter((post): post is Post => post !== null)
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

  return posts
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      category: data.category || 'notes',
      tags: data.tags || [],
      description: data.description || '',
      content,
      readingTime: getReadingTime(content),
      featured: data.featured || false,
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((post) => post.category === category)
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) => post.tags.includes(tag))
}

export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const categories = new Set(posts.map((post) => post.category))
  return Array.from(categories).sort()
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set(posts.flatMap((post) => post.tags))
  return Array.from(tags).sort()
}
