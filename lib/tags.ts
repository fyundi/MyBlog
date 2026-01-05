import { getAllTags, getAllPosts } from './posts'

export interface TagInfo {
  name: string
  count: number
}

export function getTagInfo(tag: string): TagInfo | null {
  const posts = getAllPosts()
  const count = posts.filter((post) => post.tags.includes(tag)).length

  if (count === 0) {
    return null
  }

  return {
    name: tag,
    count,
  }
}

export function getAllTagInfos(): TagInfo[] {
  const tags = getAllTags()
  return tags
    .map((tag) => getTagInfo(tag))
    .filter((info): info is TagInfo => info !== null)
    .sort((a, b) => b.count - a.count)
}
