import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/posts'

export async function GET() {
  try {
    const posts = getAllPosts()
    // 移除 content 以减少响应大小（搜索页面不需要完整内容）
    const postsWithoutContent = posts.map(({ content, ...rest }) => rest)
    return NextResponse.json(postsWithoutContent)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}
