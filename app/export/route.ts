import { NextRequest, NextResponse } from 'next/server'
import { exportPost, exportAllPosts } from '@/lib/export'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const slug = searchParams.get('slug')
  const all = searchParams.get('all')

  try {
    if (all === 'true') {
      const zipBuffer = await exportAllPosts()
      return new NextResponse(new Uint8Array(zipBuffer), {
        headers: {
          'Content-Type': 'application/zip',
          'Content-Disposition': 'attachment; filename="posts-export.zip"',
        },
      })
    } else if (slug) {
      const content = await exportPost(slug)
      return new NextResponse(content, {
        headers: {
          'Content-Type': 'text/markdown',
          'Content-Disposition': `attachment; filename="${slug}.md"`,
        },
      })
    } else {
      return NextResponse.json(
        { error: 'Missing slug or all parameter' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json(
      { error: 'Export failed' },
      { status: 500 }
    )
  }
}
