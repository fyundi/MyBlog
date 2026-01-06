# GitHub 多账户配置指南

## 📋 使用场景

当你需要在同一台电脑上使用多个 GitHub 账户时（例如：工作账户和个人账户），可以通过以下方式配置，让不同项目使用不同的账户。

## 🎯 方案选择

### 方案一：使用 HTTPS + Personal Access Token（推荐，简单）

**优点**：
- 配置简单，不需要管理多个 SSH 密钥
- 适合偶尔推送个人项目

**步骤**：
1. 为项目设置本地 Git 配置（个人账户）
2. 使用 HTTPS URL 添加远程仓库
3. 推送时使用 Personal Access Token 作为密码

### 方案二：使用 SSH + 多账户配置（适合频繁使用）

**优点**：
- 一次配置，长期使用
- 不需要每次输入密码

**步骤**：
1. 检查或生成个人账户的 SSH 密钥
2. 配置 SSH config 区分不同账户
3. 为项目设置本地 Git 配置
4. 使用 SSH URL 添加远程仓库

---

## 🚀 方案一：HTTPS + Personal Access Token（推荐）

### 第一步：设置项目本地 Git 配置

```bash
cd /path/to/your/project

# 设置本地用户名（替换为你的个人 GitHub 用户名）
git config --local user.name "你的个人GitHub用户名"

# 设置本地邮箱（替换为你的个人 GitHub 邮箱）
git config --local user.email "你的个人GitHub邮箱"
```

### 第二步：创建 GitHub Personal Access Token

1. 访问 https://github.com/settings/tokens
2. 点击 **"Generate new token"** → **"Generate new token (classic)"**
3. 填写信息：
   - **Note**: `MyBlog 个人项目`
   - **Expiration**: 选择过期时间（建议 90 天或 No expiration）
   - **Scopes**: 勾选 `repo`（完整仓库权限）
4. 点击 **"Generate token"**
5. **重要**：复制生成的 token（只显示一次）

### 第三步：创建 GitHub 仓库

1. 访问 https://github.com/new
2. 填写信息：
   - **Repository name**: `MyBlog`
   - **Description**: `游戏开发随记 - 记录开发过程中的技术笔记与实践经验`
   - 选择 **Public** 或 **Private**
   - **不要**勾选 "Initialize this repository with a README"
3. 点击 **"Create repository"**

### 第四步：添加远程仓库并推送

```bash
cd /path/to/your/project

# 添加远程仓库（替换 YOUR_USERNAME 为你的个人 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/MyBlog.git

# 提交所有更改
git add .
git commit -m "feat: 初始化博客项目，优化标题和SEO配置"

# 推送到 GitHub（用户名输入你的 GitHub 用户名，密码输入刚才生成的 token）
git push -u origin main
```

---

## 🔐 方案二：SSH + 多账户配置

### 第一步：检查或生成个人账户 SSH 密钥

```bash
# 检查是否已有个人账户的 SSH 密钥
ls -la ~/.ssh/id_rsa_personal* 2>/dev/null || echo "未找到个人账户密钥"

# 如果没有，生成新的 SSH 密钥（替换为你的个人 GitHub 邮箱）
ssh-keygen -t ed25519 -C "你的个人GitHub邮箱" -f ~/.ssh/id_rsa_personal

# 按提示操作（可以直接回车使用默认设置，或设置密码保护）
```

### 第二步：将公钥添加到 GitHub

```bash
# 显示公钥内容
cat ~/.ssh/id_rsa_personal.pub

# 复制输出的内容
```

然后：
1. 访问 https://github.com/settings/keys
2. 点击 **"New SSH key"**
3. 填写信息：
   - **Title**: `MacBook - 个人账户`
   - **Key**: 粘贴刚才复制的公钥内容
4. 点击 **"Add SSH key"**

### 第三步：配置 SSH config

```bash
# 编辑 SSH config 文件
nano ~/.ssh/config
```

添加以下配置（在现有配置之后）：

```ssh
# 个人 GitHub 账户
Host github-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa_personal
    IdentitiesOnly yes

# 工作 GitHub 账户（如果已有，保持不变）
Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa
    IdentitiesOnly yes

# 默认 GitHub（使用个人账户）
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa_personal
    IdentitiesOnly yes
```

保存并退出（`Ctrl + X`，然后 `Y`，然后 `Enter`）

### 第四步：测试 SSH 连接

```bash
# 测试个人账户连接
ssh -T git@github-personal

# 应该看到：Hi YOUR_USERNAME! You've successfully authenticated...
```

### 第五步：设置项目本地 Git 配置

```bash
cd /path/to/your/project

# 设置本地用户名
git config --local user.name "你的个人GitHub用户名"

# 设置本地邮箱
git config --local user.email "你的个人GitHub邮箱"
```

### 第六步：添加远程仓库并推送

```bash
cd /path/to/your/project

# 使用 SSH URL（替换 YOUR_USERNAME）
git remote add origin git@github-personal:YOUR_USERNAME/MyBlog.git

# 或者如果使用默认配置
git remote add origin git@github.com:YOUR_USERNAME/MyBlog.git

# 提交并推送
git add .
git commit -m "feat: 初始化博客项目，优化标题和SEO配置"
git push -u origin main
```

---

## ✅ 验证配置

### 检查 Git 配置

```bash
cd /path/to/your/project

# 查看本地配置
git config --local --list | grep user

# 应该显示：
# user.name=你的个人GitHub用户名
# user.email=你的个人GitHub邮箱
```

### 检查远程仓库

```bash
git remote -v

# 应该显示：
# origin  https://github.com/YOUR_USERNAME/MyBlog.git (fetch)
# origin  https://github.com/YOUR_USERNAME/MyBlog.git (push)
```

---

## 🔄 后续使用

### 使用 HTTPS 方案

每次推送时，如果 token 过期，需要重新生成 token 并更新。

### 使用 SSH 方案

配置完成后，可以直接使用 `git push`，无需输入密码。

---

## 📝 注意事项

1. **不要提交敏感信息**：确保 `.env`、`.env.local` 等文件已在 `.gitignore` 中
2. **Personal Access Token 安全**：不要将 token 提交到代码仓库
3. **SSH 密钥安全**：如果设置了密钥密码，每次使用需要输入密码
4. **多账户切换**：如果需要在不同项目间切换账户，使用 `git config --local` 设置每个项目的配置

---

## 🆘 常见问题

### Q1: 推送时提示权限被拒绝

**HTTPS 方案**：
- 检查 token 是否过期
- 确认 token 有 `repo` 权限

**SSH 方案**：
- 运行 `ssh -T git@github-personal` 测试连接
- 检查 SSH config 配置是否正确
- 确认公钥已添加到 GitHub

### Q2: 如何切换回工作账户？

```bash
# 在工作项目中使用
git config --local user.name "工作用户名"
git config --local user.email "工作邮箱"
git remote set-url origin git@github-work:工作账户/仓库名.git
```

### Q3: 如何查看当前使用的账户？

```bash
# 查看全局配置
git config --global user.name
git config --global user.email

# 查看本地配置（优先级更高）
git config --local user.name
git config --local user.email
```
