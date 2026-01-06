import { getAllCategories, getAllPosts } from './posts'

export interface CategoryInfo {
  slug: string
  name: string
  description: string
  icon: string
  count: number
}

export const CATEGORIES: Record<string, Omit<CategoryInfo, 'count'>> = {
  unity: {
    slug: 'unity',
    name: 'Unity 开发',
    description: 'Unity 游戏引擎开发经验与技巧',
    icon: '🎮',
  },
  cocos: {
    slug: 'cocos',
    name: 'Cocos 开发',
    description: 'Cocos Creator 游戏引擎开发经验',
    icon: '🎯',
  },
  tools: {
    slug: 'tools',
    name: '开发工具',
    description: 'Git、版本控制等开发工具的使用技巧',
    icon: '🛠️',
  },
  languages: {
    slug: 'languages',
    name: '编程语言',
    description: 'TypeScript、JavaScript 等编程语言学习笔记',
    icon: '💻',
  },
  notes: {
    slug: 'notes',
    name: '技术笔记',
    description: '日常开发中的技术思考与总结',
    icon: '📝',
  },
}

export function getCategoryInfo(slug: string): CategoryInfo | null {
  const category = CATEGORIES[slug]
  if (!category) {
    return null
  }

  const posts = getAllPosts()
  const count = posts.filter((post) => post.category === slug).length

  return {
    ...category,
    count,
  }
}

export function getAllCategoryInfos(): CategoryInfo[] {
  const categories = getAllCategories()
  return categories
    .map((slug) => getCategoryInfo(slug))
    .filter((info): info is CategoryInfo => info !== null)
    .sort((a, b) => b.count - a.count)
}
