import { getAllTagInfos } from '@/lib/tags'
import TagList from '@/components/tags/TagList'

export default function TagsPage() {
  const tags = getAllTagInfos()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">所有标签</h1>
      <TagList tags={tags} />
    </div>
  )
}
