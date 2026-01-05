# 部署和 SEO 配置完整指南

## 📋 目录

1. [GitHub 部署步骤](#github-部署步骤)
2. [SEO 配置详解](#seo-配置详解)
3. [Vercel 部署步骤](#vercel-部署步骤)
4. [部署后检查清单](#部署后检查清单)

---

## 🚀 GitHub 部署步骤

### 第一步：提交当前更改

```bash
cd your-project-directory

# 添加所有更改
git add .

# 提交更改
git commit -m "feat: 优化标题和副标题，完善SEO配置"
```

### 第二步：创建 GitHub 仓库

1. 访问 https://github.com
2. 点击右上角 **"+"** → **"New repository"**
3. 填写仓库信息：
   - **Repository name**: `MyBlog`（或你喜欢的名字）
   - **Description**: "游戏开发技术笔记 - 记录开发过程中的技术笔记与实践经验"
   - 选择 **Public**（公开）或 **Private**（私有）
   - **不要**勾选 "Initialize this repository with a README"
4. 点击 **"Create repository"**

### 第三步：连接本地仓库到 GitHub

```bash
# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/MyBlog.git

# 如果已经存在 origin，先删除再添加
# git remote remove origin
# git remote add origin https://github.com/YOUR_USERNAME/MyBlog.git

# 推送代码到 GitHub
git branch -M main
git push -u origin main
```

### 第四步：验证推送成功

访问你的 GitHub 仓库页面，确认所有文件都已上传。

---

## 🔍 SEO 配置详解

### 1. 更新网站 URL

部署到 Vercel 后，你会获得一个 URL（例如：`https://my-blog.vercel.app`），需要更新以下文件：

#### 1.1 更新 `app/layout.tsx`

找到以下位置并替换 URL：

```typescript
openGraph: {
  type: 'website',
  locale: 'zh_CN',
  url: 'https://your-actual-domain.vercel.app', // 替换为实际域名
  siteName: '游戏开发技术笔记',
  title: '游戏开发技术笔记',
  description: '记录开发过程中的技术笔记与实践经验',
},
twitter: {
  card: 'summary_large_image',
  title: '游戏开发技术笔记',
  description: '记录开发过程中的技术笔记与实践经验',
},
```

#### 1.2 更新 `app/sitemap.ts`

```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://your-actual-domain.vercel.app' // 替换为实际域名
  // ... 其余代码
}
```

#### 1.3 更新 `app/robots.ts`

```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/export/'],
    },
    sitemap: 'https://your-actual-domain.vercel.app/sitemap.xml', // 替换为实际域名
  }
}
```

### 2. SEO 元数据说明

#### 2.1 基础元数据（`app/layout.tsx`）

- **title**: 页面标题，支持模板（`%s | 游戏开发技术笔记`）
- **description**: 网站描述，用于搜索引擎摘要
- **keywords**: 关键词数组，帮助搜索引擎理解内容
- **authors**: 作者信息

#### 2.2 Open Graph 元数据

用于社交媒体分享（Facebook、LinkedIn 等）：

- **type**: 内容类型（`website` 或 `article`）
- **locale**: 语言区域（`zh_CN`）
- **url**: 页面 URL
- **siteName**: 网站名称
- **title**: 分享时显示的标题
- **description**: 分享时显示的描述
- **image**: 分享时显示的图片（可选，建议添加）

#### 2.3 Twitter Card 元数据

用于 Twitter 分享：

- **card**: 卡片类型（`summary` 或 `summary_large_image`）
- **title**: 分享标题
- **description**: 分享描述
- **image**: 分享图片（可选）

### 3. 文章页面 SEO（`app/posts/[...slug]/page.tsx`）

每篇文章的元数据通过 `generateMetadata` 函数生成：

```typescript
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug
  const post = getPostBySlug(slug)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  }
}
```

### 4. 结构化数据（可选，推荐）

可以添加 JSON-LD 结构化数据，帮助搜索引擎更好地理解内容：

```typescript
// 在文章页面添加
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      author: {
        '@type': 'Person',
        name: '游戏开发技术笔记',
      },
    }),
  }}
/>
```

### 5. 图片优化（如果添加封面图）

如果为文章添加封面图，建议：

1. 使用 Next.js `Image` 组件
2. 添加 `alt` 属性（描述性文字）
3. 图片尺寸建议：1200x630px（Open Graph 推荐尺寸）

---

## 🌐 Vercel 部署步骤

### 第一步：注册 Vercel 账号

1. 访问 https://vercel.com
2. 点击 **"Sign Up"**
3. 选择 **"Continue with GitHub"**（推荐，方便后续自动部署）

### 第二步：导入项目

1. 登录后，点击 **"Add New..."** → **"Project"**
2. 在 **"Import Git Repository"** 中找到你的 `MyBlog` 仓库
3. 点击 **"Import"**

### 第三步：配置项目

Vercel 会自动检测 Next.js 项目，配置如下：

- **Framework Preset**: Next.js（自动检测）
- **Root Directory**: `./`（默认）
- **Build Command**: `npm run build`（自动）
- **Output Directory**: `.next`（自动）
- **Install Command**: `npm install`（自动）

### 第四步：环境变量（可选）

如果需要配置环境变量（如 AdSense ID），点击 **"Environment Variables"**：

- **Name**: `NEXT_PUBLIC_ADSENSE_ID`
- **Value**: 你的 AdSense 发布商 ID

### 第五步：部署

1. 点击 **"Deploy"**
2. 等待构建完成（通常 1-2 分钟）
3. 部署完成后，你会获得一个 URL，例如：`https://my-blog.vercel.app`

### 第六步：更新 SEO 配置

部署完成后，按照 [SEO 配置详解](#seo-配置详解) 中的步骤更新 URL。

### 第七步：自定义域名（可选）

1. 在 Vercel 项目设置中点击 **"Domains"**
2. 添加你的域名
3. 按照提示配置 DNS 记录
4. 等待 DNS 生效（通常几分钟到几小时）

---

## ✅ 部署后检查清单

### SEO 检查

- [ ] 更新 `app/layout.tsx` 中的 URL
- [ ] 更新 `app/sitemap.ts` 中的 `baseUrl`
- [ ] 更新 `app/robots.ts` 中的 sitemap URL
- [ ] 访问 `https://your-domain.vercel.app/sitemap.xml` 确认 sitemap 正常
- [ ] 访问 `https://your-domain.vercel.app/robots.txt` 确认 robots.txt 正常
- [ ] 使用 [Google Search Console](https://search.google.com/search-console) 提交 sitemap
- [ ] 使用 [Google Rich Results Test](https://search.google.com/test/rich-results) 测试结构化数据（如果添加了）

### 功能检查

- [ ] 首页正常显示
- [ ] 文章列表正常显示
- [ ] 文章详情页正常显示
- [ ] 分类页面正常显示
- [ ] 标签页面正常显示
- [ ] 搜索功能正常
- [ ] 明暗模式切换正常
- [ ] 代码复制功能正常
- [ ] Mermaid 图表正常显示
- [ ] 移动端响应式布局正常

### 性能检查

- [ ] 使用 [PageSpeed Insights](https://pagespeed.web.dev/) 测试页面性能
- [ ] 检查图片是否优化
- [ ] 检查字体加载是否正常
- [ ] 检查 JavaScript 包大小

### 链接检查

- [ ] 所有内部链接正常
- [ ] 所有外部链接正常（如有）
- [ ] 404 页面正常显示

---

## 📝 后续优化建议

1. **添加 Google Analytics**：跟踪访问数据
2. **添加 RSS Feed**：方便订阅
3. **添加文章阅读进度条**：提升用户体验
4. **添加相关文章推荐**：增加页面停留时间
5. **优化图片**：使用 WebP 格式，添加懒加载
6. **添加评论系统**：如 Giscus、Utterances 等

---

## 🔗 相关资源

- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [Vercel 部署文档](https://vercel.com/docs)
- [Google Search Console](https://search.google.com/search-console)
- [SEO 最佳实践](https://nextjs.org/learn/seo/introduction-to-seo)
