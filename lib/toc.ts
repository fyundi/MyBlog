export interface TocHeading {
  id: string
  text: string
  level: number
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .replace(/\s+/g, '-') // 空格替换为连字符
    .replace(/-+/g, '-') // 多个连字符合并为一个
    .trim()
}

export function extractHeadings(content: string): TocHeading[] {
  const headings: TocHeading[] = []
  
  // 只匹配二级标题（##）
  const headingRegex = /^##\s+(.+)$/gm
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[1].trim()
    
    // 移除标题中的内联代码标记
    const cleanText = text.replace(/`([^`]+)`/g, '$1')
    
    if (cleanText) {
      headings.push({
        id: slugify(cleanText),
        text: cleanText,
        level: 2,
      })
    }
  }

  return headings
}
