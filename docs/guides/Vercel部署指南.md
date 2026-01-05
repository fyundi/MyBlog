# Vercel 部署完整指南

## 📋 前置条件

✅ **已完成**：
- GitHub 仓库已创建：`https://github.com/fyundi/MyBlog`
- 代码已推送到 GitHub
- 项目使用 Next.js 14+ (App Router)

---

## 🚀 第一步：注册/登录 Vercel

### 1.1 访问 Vercel

1. 打开浏览器，访问：**https://vercel.com**
2. 点击右上角 **"Sign Up"** 或 **"Log In"**

### 1.2 使用 GitHub 登录（推荐）

1. 点击 **"Continue with GitHub"**
2. 授权 Vercel 访问你的 GitHub 账户
   - 这会允许 Vercel 读取你的仓库列表
   - 可以随时在 GitHub 设置中撤销授权

**为什么推荐 GitHub 登录？**
- ✅ 自动同步仓库
- ✅ 自动部署（每次 push 自动更新）
- ✅ 无需手动配置 SSH 密钥
- ✅ 更安全的权限管理

---

## 📦 第二步：导入项目

### 2.1 添加新项目

1. 登录 Vercel 后，在首页点击 **"Add New..."** → **"Project"**
   - 或者直接访问：https://vercel.com/new
   - 你会看到 "Let's build something new" 页面

### 2.2 安装 GitHub 应用（首次使用需要）

如果你看到提示：**"Install the GitHub application for the accounts you wish to Import from to continue"**

1. 在左侧 **"Import Git Repository"** 区域
2. 点击 **"Install"** 按钮（带有 GitHub Octocat 图标）
3. 在 GitHub 授权页面：
   - 选择要授权的账户（`fyundi`）
   - 选择仓库访问权限：
     - ✅ **All repositories**（推荐，方便后续添加项目）
     - 或 **Only select repositories**（只选择 `MyBlog` 仓库）
   - 点击 **"Install"** 完成授权

### 2.3 选择 GitHub 仓库

安装完成后，回到 Vercel 页面：

1. 在 **"Import Git Repository"** 区域
2. 在 **"Select a Git Namespace"** 下拉菜单中选择 `fyundi`
3. 在搜索框中输入 `MyBlog` 或直接找到你的仓库
4. 点击仓库卡片上的 **"Import"** 按钮

**如果看不到仓库**：
- 确保已正确安装 GitHub 应用
- 检查仓库是否为 Public，或已授权访问 Private 仓库
- 刷新页面重试

---

## ⚙️ 第三步：配置项目

### 3.1 项目设置（自动检测）

Vercel 会自动检测 Next.js 项目，配置如下：

| 配置项 | 值 | 说明 |
|--------|-----|------|
| **Framework Preset** | `Next.js` | 自动检测 |
| **Root Directory** | `./` | 项目根目录 |
| **Build Command** | `npm run build` | 自动设置 |
| **Output Directory** | `.next` | Next.js 输出目录 |
| **Install Command** | `npm install` | 自动设置 |
| **Node.js Version** | `18.x` 或 `20.x` | 自动选择 |

**通常不需要修改这些设置**，直接使用默认值即可。

### 3.2 环境变量（可选）

如果你的项目需要环境变量（例如 AdSense ID），可以在这里添加：

1. 展开 **"Environment Variables"** 部分
2. 点击 **"Add"** 添加变量
3. 填写信息：
   - **Name**: `NEXT_PUBLIC_ADSENSE_ID`（示例）
   - **Value**: 你的实际值
   - **Environment**: 选择适用的环境
     - ✅ Production（生产环境）
     - ✅ Preview（预览环境）
     - ✅ Development（开发环境）

**当前项目**：如果没有使用环境变量，可以跳过这一步。

### 3.3 部署设置

1. **Project Name**（项目名称）：
   - 默认：`my-blog`
   - 可以修改为你喜欢的名字（例如：`fyundi-blog`）
   - 这会成为你的 URL 的一部分：`https://your-project-name.vercel.app`

2. **其他设置**：
   - 保持默认即可

---

## 🚀 第四步：部署

### 4.1 开始部署

1. 检查所有配置无误后
2. 点击右下角 **"Deploy"** 按钮
3. 等待部署完成（通常需要 1-3 分钟）

### 4.2 部署过程

你会看到部署日志，包括：
- 📦 Installing dependencies（安装依赖）
- 🔨 Building（构建项目）
- ✅ Deploying（部署中）

**如果构建失败**：
- 查看错误日志
- 检查 `package.json` 中的脚本是否正确
- 确保所有依赖都已正确安装

---

## ✅ 第五步：验证部署

### 5.1 访问网站

部署成功后，你会看到：

1. **部署成功页面**：
   - 显示你的网站 URL（例如：`https://my-blog.vercel.app`）
   - 点击 **"Visit"** 或直接访问 URL

2. **检查网站**：
   - ✅ 首页是否正常显示
   - ✅ 文章列表是否加载
   - ✅ 导航是否工作
   - ✅ 样式是否正确

### 5.2 检查部署信息

在 Vercel 项目页面，你可以看到：
- 📊 **Deployments**：所有部署记录
- ⚙️ **Settings**：项目设置
- 📈 **Analytics**：访问统计（需要升级）
- 🔗 **Domains**：域名管理

---

## 🔄 自动部署

### 工作原理

配置完成后，Vercel 会自动：
1. 监听 GitHub 仓库的 `main` 分支
2. 每次你 `git push` 代码时
3. 自动触发新的部署
4. 部署完成后更新网站

### 验证自动部署

1. 在本地修改一个文件（例如：`README.md`）
2. 提交并推送：
   ```bash
   git add .
   git commit -m "test: 测试自动部署"
   git push
   ```
3. 在 Vercel 项目页面查看新的部署

---

## 🌐 第六步：自定义域名（可选）

### 6.1 添加自定义域名

1. 在 Vercel 项目页面，点击 **"Settings"**
2. 选择 **"Domains"**
3. 输入你的域名（例如：`blog.yourdomain.com`）
4. 按照提示配置 DNS 记录

### 6.2 DNS 配置

根据 Vercel 的提示，添加以下 DNS 记录：

**CNAME 记录**：
- **Name**: `blog`（或 `@` 用于根域名）
- **Value**: `cname.vercel-dns.com`

**或 A 记录**：
- **Name**: `@`
- **Value**: Vercel 提供的 IP 地址

配置完成后，等待 DNS 生效（通常几分钟到几小时）。

---

## 🔧 常见问题

### Q1: 构建失败怎么办？

**检查清单**：
1. ✅ 检查 `package.json` 中的 `build` 脚本
2. ✅ 查看构建日志中的具体错误
3. ✅ 确保所有依赖都已正确安装
4. ✅ 检查 Node.js 版本是否兼容

**常见错误**：
- `Module not found`：检查依赖是否完整
- `TypeScript errors`：修复类型错误
- `Build timeout`：项目太大，考虑优化

### Q2: 如何回滚到之前的版本？

1. 在 Vercel 项目页面，点击 **"Deployments"**
2. 找到之前的部署记录
3. 点击 **"..."** → **"Promote to Production"**

### Q3: 如何查看部署日志？

1. 在 **"Deployments"** 页面
2. 点击任意部署记录
3. 查看 **"Build Logs"** 和 **"Function Logs"**

### Q4: 如何配置环境变量？

1. 在项目页面，点击 **"Settings"**
2. 选择 **"Environment Variables"**
3. 添加变量并选择适用的环境
4. 重新部署使变量生效

### Q5: 如何更新 SEO 配置？

部署后，需要更新实际 URL：

1. **更新 `app/layout.tsx`**：
   ```typescript
   openGraph: {
     url: 'https://your-project-name.vercel.app',
     // ...
   }
   ```

2. **更新 `app/sitemap.ts`**：
   ```typescript
   const baseUrl = 'https://your-project-name.vercel.app'
   ```

3. **提交并推送**：
   ```bash
   git add .
   git commit -m "chore: 更新SEO配置"
   git push
   ```

---

## 📊 部署后检查清单

部署完成后，请检查：

- [ ] 网站可以正常访问
- [ ] 首页显示正常
- [ ] 文章列表加载正常
- [ ] 文章详情页显示正常
- [ ] 分类和标签页面工作正常
- [ ] 搜索功能正常
- [ ] 移动端显示正常
- [ ] SEO 元数据正确（检查页面源代码）
- [ ] sitemap 可访问：`https://your-domain.vercel.app/sitemap.xml`
- [ ] robots.txt 可访问：`https://your-domain.vercel.app/robots.txt`

---

## 🎉 完成！

恭喜！你的博客已经成功部署到 Vercel。

**你的网站地址**：`https://your-project-name.vercel.app`

**后续操作**：
1. 更新 SEO 配置中的实际 URL
2. 配置自定义域名（可选）
3. 添加 Google Analytics（可选）
4. 配置 AdSense（可选）

---

## 📚 相关文档

- [Vercel 官方文档](https://vercel.com/docs)
- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [部署和SEO配置指南](./部署和SEO配置指南.md)
- [广告集成示例](./广告集成示例.md)
