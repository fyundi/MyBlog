import Link from 'next/link'
import { CategoryInfo } from '@/lib/categories'

interface CategoryListProps {
  categories: CategoryInfo[]
}

export default function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/categories/${category.slug}`}
          className="block p-6 border rounded-lg hover:shadow-lg transition-shadow"
        >
          <div className="text-4xl mb-4">{category.icon}</div>
          <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
          <p className="text-gray-600 mb-4">{category.description}</p>
          <span className="text-sm text-gray-500">{category.count} 篇文章</span>
        </Link>
      ))}
    </div>
  )
}
