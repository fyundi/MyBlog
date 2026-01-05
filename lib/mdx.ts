import { compile } from '@mdx-js/mdx'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { codeToHtml } from 'shiki'

export async function processMDX(source: string) {
  const code = await compile(source, {
    outputFormat: 'function-body',
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
  })

  return code
}

export async function highlightCode(code: string, lang: string = 'text') {
  try {
    const html = await codeToHtml(code, {
      lang,
      theme: 'github-dark',
    })
    return html
  } catch (error) {
    console.error('Code highlighting error:', error)
    return `<pre><code>${code}</code></pre>`
  }
}
