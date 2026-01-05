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
    description: 'Unity 游戏开发相关经验',
    icon: '🎮',
  },
  cocos: {
    slug: 'cocos',
    name: 'Cocos 开发',
    description: 'Cocos Creator 开发相关经验',
    icon: '🎯',
  },
  notes: {
    slug: 'notes',
    name: '个人杂记',
    description: '日常开发中的思考和总结',
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
