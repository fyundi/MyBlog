# Markdown 文档格式规范指南

## 概述

本文档定义了本项目中所有 Markdown 文档的格式规范，确保文档风格统一、可读性强、格式正确。所有博客文章和技术文档都应遵循本规范。

## 基本原则

### 1. 格式一致性
- 所有文档应保持统一的格式风格
- 代码块、列表、表格等元素的使用应保持一致
- 避免混合使用不同的格式表达相同的内容

### 2. 可读性优先
- 优先考虑文档的可读性和流畅性
- 避免过度使用代码块和内联代码
- 保持文本的自然流畅

### 3. 简洁明了
- 说明性文字应简洁明了
- 避免冗余的格式标记
- 代码块中的注释应精炼有用

## Frontmatter 规范

### 博客文章（MDX 格式）

所有博客文章必须包含以下 frontmatter：

```yaml
---
title: "文章标题"
date: "YYYY-MM-DD"
category: "分类名称"
tags: ["标签1", "标签2", "标签3"]
description: "文章描述，用于SEO和摘要显示"
featured: true  # 可选，是否在首页推荐
---
```

**规范要求**：
- `title`：使用中文双引号包裹
- `date`：格式为 `YYYY-MM-DD`
- `category`：使用小写，与目录结构对应
- `tags`：数组格式，每个标签使用双引号
- `description`：简洁描述，50-150 字为宜

## 标题规范

### 标题层级

```markdown
# 一级标题（文章主标题，每个文档只有一个）

## 二级标题（主要章节）

### 三级标题（子章节）

#### 四级标题（细分内容，尽量少用）
```

**规范要求**：
- 标题层级应连续，不要跳级（如不要从 `##` 直接跳到 `####`）
- 标题前后应留空行
- 标题后不要使用标点符号

### 标题示例

```markdown
## 概述

## 安装和配置

### 第一步：下载安装包

### 第二步：配置环境变量
```

## 代码块规范

### 代码块格式

```markdown
# 基础代码块
```bash
git clone <repository-url>
```

# 带注释的代码块
```bash
# 设置本地用户名
git config --local user.name "username"
```

# 多行代码块
```bash
# 提交更改
git add .
git commit -m "feat: 添加新功能"
git push origin main
```
```

### 代码块使用规范

**✅ 正确做法**：

1. **说明性文字放在代码块注释中**
   ```markdown
   ```bash
   # 使用 --local 参数只影响当前仓库，不会覆盖全局配置
   git config --local user.name "username"
   ```
   ```

2. **代码块前后留空行**
   ```markdown
   执行以下命令：

   ```bash
   git status
   ```

   命令执行后会显示当前状态。
   ```

3. **代码块中注释应精炼**
   ```markdown
   ```bash
   # 设置用户名和邮箱
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```
   ```

**❌ 错误做法**：

1. **不要在代码块外单独列出配置说明**
   ```markdown
   ```bash
   git config --local user.name "username"
   ```
   
   **说明**：使用 `--local` 参数只影响当前仓库。
   ```
   应该改为：
   ```markdown
   ```bash
   # 使用 --local 参数只影响当前仓库，不会覆盖全局配置
   git config --local user.name "username"
   ```
   ```

2. **避免过度使用内联代码**
   ```markdown
   保存并退出（`Ctrl + X`，然后 `Y`，然后 `Enter`）。
   ```
   应该改为：
   ```markdown
   保存并退出编辑器（nano 编辑器：按 Ctrl + X，然后按 Y，最后按 Enter）。
   ```

3. **不要在列表项中使用内联代码块**
   ```markdown
   - **Note**: `个人项目访问令牌`（可自定义）
   ```
   应该改为：
   ```markdown
   - **Note**: 个人项目访问令牌（可自定义）
   ```

### 代码块语言标识

根据代码类型使用正确的语言标识：

- `bash` / `sh`：Shell 命令
- `javascript` / `js`：JavaScript 代码
- `typescript` / `ts`：TypeScript 代码
- `json`：JSON 配置
- `yaml` / `yml`：YAML 配置
- `ssh`：SSH 配置文件
- `git`：Git 配置文件
- `markdown` / `md`：Markdown 示例
- `mermaid`：Mermaid 图表

## 列表规范

### 有序列表

```markdown
1. 第一步操作
2. 第二步操作
3. 第三步操作
```

### 无序列表

```markdown
- 功能点一
- 功能点二
- 功能点三
```

### 嵌套列表

```markdown
1. 主要步骤
   - 子步骤一
   - 子步骤二
2. 下一步骤
```

### 列表使用规范

**✅ 正确做法**：

1. **列表前后留空行**
   ```markdown
   配置步骤：
   
   - 第一步
   - 第二步
   - 第三步
   
   配置完成后即可使用。
   ```

2. **列表项中使用粗体强调关键词**
   ```markdown
   - **Note**: 个人项目访问令牌（可自定义）
   - **Expiration**: 选择过期时间
   - **Scopes**: 勾选 repo（完整仓库权限）
   ```

**❌ 错误做法**：

1. **避免在列表项中使用内联代码块**
   ```markdown
   - **Note**: `个人项目访问令牌`（可自定义）
   ```
   应该改为普通文本，除非是必须强调的命令或代码

2. **避免过度嵌套**
   ```markdown
   - 第一层
     - 第二层
       - 第三层
         - 第四层（不推荐）
   ```

## 表格规范

### 表格格式

```markdown
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 数据1 | 数据2 | 数据3 |
| 数据4 | 数据5 | 数据6 |
```

### 表格使用规范

**✅ 正确做法**：

1. **表格前后留空行**
   ```markdown
   以下是配置参数：
   
   | 参数 | 说明 | 示例 |
   |------|------|------|
   | Host | 主机别名 | github-personal |
   | User | Git 用户名 | git |
   
   配置完成后保存文件。
   ```

2. **表格内容简洁明了**
   ```markdown
   | 类型 | 说明 | 示例 |
   |------|------|------|
   | feat | 新功能 | feat: 添加用户登录功能 |
   | fix | 修复bug | fix: 修复登录验证问题 |
   ```

**❌ 错误做法**：

1. **避免在表格中嵌套代码块**
   ```markdown
   | 命令 | 说明 |
   |------|------|
   | `git clone` | 克隆仓库 |
   ```
   应该使用普通文本，必要时使用粗体

## 文本格式规范

### 强调和加粗

```markdown
**重要提示**：这是重要内容。

*斜体文本*用于强调。

`内联代码`用于命令、文件名、配置项等。
```

### 文本格式使用规范

**✅ 正确做法**：

1. **使用粗体强调重要信息**
   ```markdown
   **注意**：推送时，Git 会提示输入用户名和密码。
   ```

2. **内联代码用于命令、文件名、配置项**
   ```markdown
   运行 `git status` 查看当前状态。
   编辑 `~/.ssh/config` 文件。
   ```

3. **保持文本自然流畅**
   ```markdown
   保存并退出编辑器（nano 编辑器：按 Ctrl + X，然后按 Y，最后按 Enter）。
   ```

**❌ 错误做法**：

1. **避免过度使用内联代码**
   ```markdown
   保存并退出（`Ctrl + X`，然后 `Y`，然后 `Enter`）。
   ```
   应该改为自然文本描述

2. **避免在列表项中过度使用内联代码**
   ```markdown
   - **Note**: `个人项目访问令牌`
   ```
   应该改为普通文本

## 段落和空行规范

### 空行使用

```markdown
## 章节标题

段落内容。

另一个段落。

### 子章节

子章节内容。
```

**规范要求**：
- 标题前后必须留空行
- 段落之间必须留空行
- 代码块前后必须留空行
- 列表前后必须留空行
- 表格前后必须留空行

## 链接规范

### 链接格式

```markdown
[链接文本](https://example.com)

[GitHub 官方文档](https://docs.github.com)
```

### 链接使用规范

**✅ 正确做法**：

1. **使用描述性的链接文本**
   ```markdown
   访问 [GitHub Token 设置页面](https://github.com/settings/tokens)
   ```

2. **链接前后保持自然**
   ```markdown
   详细配置请参考 [Git 官方文档](https://git-scm.com/doc)。
   ```

## 特殊内容规范

### Mermaid 图表

```markdown
```mermaid
graph TD
    A[开始] --> B[处理]
    B --> C[结束]
```
```

**规范要求**：
- Mermaid 代码块前后留空行
- 图表应简洁清晰
- 节点描述使用中文

### 引用块

```markdown
> 这是引用内容。
> 
> 可以多行引用。
```

### 水平分割线

```markdown
---

用于分隔不同章节。
```

## 常见问题格式

### 问题格式

```markdown
### Q1: 问题标题

问题解答内容。

如果涉及代码，使用代码块：

```bash
git status
```

更多说明文字。
```

### 问题格式规范

**✅ 正确做法**：

1. **问题标题清晰**
   ```markdown
   ### Q1: 推送时提示权限被拒绝
   ```

2. **解答内容流畅**
   ```markdown
   **HTTPS 方案**：检查 token 是否过期，确认 token 有 repo 权限。
   
   **SSH 方案**：运行以下命令测试连接：
   
   ```bash
   ssh -T git@github-personal
   ```
   ```

3. **代码块独立显示**
   ```markdown
   如果连接失败，检查私钥文件权限：
   
   ```bash
   chmod 600 ~/.ssh/id_rsa_personal
   ```
   ```

## 总结部分规范

### 总结格式

```markdown
## 总结

通过本文介绍的方法，你可以轻松完成配置。关键是要遵循正确的步骤，并注意安全事项。

掌握这些方法后，你就可以在实际项目中灵活运用。
```

**规范要求**：
- 总结使用段落格式，不使用列表
- 总结应简洁明了
- 可以包含关键要点，但以段落形式呈现

## 参考资料规范

### 参考资料格式

```markdown
## 参考资料

- [Git 官方文档](https://git-scm.com/doc)
- [GitHub 文档 - Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [约定式提交规范](https://www.conventionalcommits.org/zh-hans/)
```

**规范要求**：
- 使用无序列表
- 链接文本应描述性
- 按重要性或相关性排序

## 检查清单

在提交文档前，请检查以下项目：

- [ ] Frontmatter 格式正确
- [ ] 标题层级连续，前后有空行
- [ ] 代码块前后有空行，注释精炼
- [ ] 列表前后有空行
- [ ] 表格前后有空行
- [ ] 避免过度使用内联代码
- [ ] 文本自然流畅
- [ ] 段落之间有空行
- [ ] 链接文本描述性
- [ ] 总结使用段落格式
- [ ] 参考资料格式正确

## 示例对比

### ❌ 错误示例

```markdown
## 配置说明

```bash
git config --local user.name "username"
```

**说明**：
- `--local`：只影响当前仓库
- `--global`：影响所有仓库

保存并退出（`Ctrl + X`，然后 `Y`，然后 `Enter`）。
```

### ✅ 正确示例

```markdown
## 配置说明

```bash
# 使用 --local 参数只影响当前仓库，不会覆盖全局配置
git config --local user.name "username"
git config --local user.email "your-email@example.com"
```

保存并退出编辑器（nano 编辑器：按 Ctrl + X，然后按 Y，最后按 Enter）。
```

## 总结

遵循本规范可以确保文档格式统一、可读性强、易于维护。在编写或修改文档时，请始终参考本规范，确保格式正确。

如有疑问或需要补充，请及时更新本规范文档。
