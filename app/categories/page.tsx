import { getAllCategoryInfos } from '@/lib/categories'
import CategoryList from '@/components/categories/CategoryList'

export default function CategoriesPage() {
  const categories = getAllCategoryInfos()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">所有分类</h1>
      <CategoryList categories={categories} />
    </div>
  )
}
