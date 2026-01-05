import Link from 'next/link'
import { TagInfo } from '@/lib/tags'

interface TagListProps {
  tags: TagInfo[]
}

export default function TagList({ tags }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {tags.map((tag) => (
        <Link
          key={tag.name}
          href={`/tags/${tag.name}`}
          className="px-4 py-2 border rounded-lg hover:shadow-lg transition-shadow"
        >
          <span className="font-semibold">{tag.name}</span>
          <span className="text-gray-500 ml-2">({tag.count})</span>
        </Link>
      ))}
    </div>
  )
}
