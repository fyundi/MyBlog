#!/bin/bash

OUTPUT_DIR="exports/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$OUTPUT_DIR"

# 导出所有文章
find content/posts -name "*.mdx" | while read file; do
  # 提取分类和文件名
  category=$(echo "$file" | cut -d'/' -f3)
  filename=$(basename "$file")
  
  # 创建分类目录
  mkdir -p "$OUTPUT_DIR/$category"
  
  # 去除 Frontmatter，保留内容
  sed '/^---$/,/^---$/d' "$file" > "$OUTPUT_DIR/$category/$filename"
done

echo "✅ 导出完成: $OUTPUT_DIR"
