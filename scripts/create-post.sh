#!/bin/bash

if [ -z "$1" ]; then
  echo "用法: ./scripts/create-post.sh \"文章标题\" [分类]"
  exit 1
fi

TITLE=$1
CATEGORY=${2:-notes}
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-\|-$//g')
DATE=$(date +%Y-%m-%d)
FILE="content/posts/$CATEGORY/$SLUG.mdx"

if [ -f "$FILE" ]; then
  echo "错误: 文件已存在 $FILE"
  exit 1
fi

mkdir -p "content/posts/$CATEGORY"

cat > "$FILE" << EOF
---
title: "$TITLE"
date: "$DATE"
category: "$CATEGORY"
tags: []
description: ""
featured: false
---

# $TITLE

## 概述

文章内容...

## 详细内容

EOF

echo "✅ 文章创建成功: $FILE"
echo "📝 使用以下命令编辑: code $FILE"
