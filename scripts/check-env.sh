#!/bin/bash

echo "🔍 检查开发环境..."
echo ""

# 检查 Node.js
if command -v node &> /dev/null; then
  echo "✅ Node.js: $(node --version)"
else
  echo "❌ Node.js: 未安装"
  echo "   下载: https://nodejs.org/"
fi

# 检查 npm
if command -v npm &> /dev/null; then
  echo "✅ npm: $(npm --version)"
else
  echo "❌ npm: 未安装"
fi

# 检查 Git
if command -v git &> /dev/null; then
  echo "✅ Git: $(git --version)"
else
  echo "❌ Git: 未安装"
  echo "   下载: https://git-scm.com/"
fi

echo ""
echo "检查完成！"
