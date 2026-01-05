'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import Mermaid from '@/components/ui/Mermaid'
import CopyButton from '@/components/ui/CopyButton'

interface MarkdownContentProps {
  content: string
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  if (!content) {
    return <div className="text-gray-500">内容加载中...</div>
  }

  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '')
            const language = match ? match[1] : ''
            
            // 处理 Mermaid 图表
            if (language === 'mermaid' && !inline) {
              const codeString = String(children).replace(/\n$/, '')
              return <Mermaid chart={codeString} />
            }

            // 处理普通代码块
            if (!inline) {
              const codeString = String(children).replace(/\n$/, '')
              
              // 处理代码高亮（注释、警告等）
              const processCodeLines = (text: string) => {
                return text.split('\n').map((line, index, lines) => {
                  const trimmed = line.trim()
                  let lineClass = 'text-gray-800 dark:text-gray-100'
                  
                  if (trimmed.startsWith('#')) {
                    if (trimmed.includes('⚠️') || trimmed.includes('注意') || trimmed.includes('警告')) {
                      lineClass = 'text-yellow-600 dark:text-yellow-300'
                    } else {
                      lineClass = 'text-green-600 dark:text-green-400'
                    }
                  }
                  
                  return (
                    <span key={index} className={lineClass}>
                      {line}
                      {index < lines.length - 1 ? '\n' : ''}
                    </span>
                  )
                })
              }
              
              return (
                <div className="relative my-6 group">
                  <pre className="bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-lg p-5 pr-12 overflow-x-auto shadow-sm dark:shadow-lg">
                    <code className={`${className || ''} text-sm font-mono leading-relaxed block whitespace-pre`} {...props}>
                      {processCodeLines(codeString)}
                    </code>
                  </pre>
                  <CopyButton text={codeString} />
                </div>
              )
            }

            // 处理行内代码
            return (
              <code className="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm font-mono text-gray-900 dark:text-gray-100" {...props}>
                {children}
              </code>
            )
          },
        h1: ({ children }) => (
          <h1 className="text-4xl font-bold mt-12 mb-8 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-4 leading-tight">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-3xl font-semibold mt-10 mb-6 text-gray-900 dark:text-gray-100 leading-tight">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100 leading-tight">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-gray-100 leading-tight">
            {children}
          </h4>
        ),
        p: ({ children }) => (
          <p className="mb-6 text-gray-800 dark:text-gray-200 leading-8 text-lg">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-outside mb-6 ml-6 space-y-3 text-gray-800 dark:text-gray-200">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-outside mb-6 ml-6 space-y-3 text-gray-800 dark:text-gray-200">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="mb-2 leading-8 text-gray-800 dark:text-gray-200">{children}</li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 text-gray-800 dark:text-gray-200 bg-blue-50 dark:bg-blue-900/30 py-2 rounded-r">
            {children}
          </blockquote>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        hr: () => (
          <hr className="my-8 border-gray-200 dark:border-gray-700" />
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-gray-900 dark:text-gray-100">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic">{children}</em>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-gray-50 dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700">{children}</thead>
        ),
        tbody: ({ children }) => <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">{children}</tbody>,
        tr: ({ children }) => (
          <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">{children}</tr>
        ),
        th: ({ children }) => (
          <th className="border-r border-gray-200 dark:border-gray-700 px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 last:border-r-0">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border-r border-gray-200 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300 last:border-r-0">
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
    </div>
  )
}
