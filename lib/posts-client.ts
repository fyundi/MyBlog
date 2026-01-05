// 客户端版本的文章数据接口
// 这个文件不包含 fs 操作，只定义类型和工具函数

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

// 客户端搜索函数
export function searchPosts(posts: Post[], query: string): Post[] {
  if (!query.trim()) {
    return []
  }

  const lowerQuery = query.toLowerCase()
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.description.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  )
}
