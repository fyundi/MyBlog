# 游戏开发技术笔记

基于 Next.js + TypeScript + MDX 构建的多分类技术博客系统。

## 功能特性

- ✅ 多分类内容管理（Unity、Cocos、杂记等）
- ✅ 标签系统
- ✅ 搜索功能
- ✅ 代码高亮
- ✅ Markdown 导出
- ✅ 响应式设计
- ✅ SEO 优化
- ✅ 广告位预留

## 快速开始

### 1. 检查环境

```bash
./scripts/check-env.sh
```

确保已安装 Node.js v18+、npm 和 Git。

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

### 4. 创建第一篇文章

```bash
./scripts/create-post.sh "我的第一篇文章" unity
```

编辑 `content/posts/unity/我的第一篇文章.mdx`，然后刷新浏览器即可看到新文章。

### 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
MyBlog/
├── app/              # Next.js App Router
├── content/          # 博客内容（Markdown 文件）
├── components/       # React 组件
├── lib/              # 工具函数
└── scripts/          # 自动化脚本
```

## 创建新文章

使用脚本创建新文章：

```bash
./scripts/create-post.sh "文章标题" unity
```

## 部署

推荐使用 Vercel 进行部署，详见 [项目计划书.md](./项目计划书.md)。

## 文档

- 📖 **[使用指南.md](./使用指南.md)** - 详细的使用说明（**推荐先看这个**）
- 📋 [项目计划书.md](./项目计划书.md) - 技术文档和实施计划
- ✅ [实施总结.md](./实施总结.md) - 已完成功能列表

## 快速参考

### 创建文章
```bash
./scripts/create-post.sh "文章标题" 分类
```

### 导出文章
- 单篇：访问 `/export?slug=分类/文章名`
- 批量：访问 `/export?all=true`

### 部署
1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 自动部署完成

更多详细信息请查看 [使用指南.md](./使用指南.md)。
