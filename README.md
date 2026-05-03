# 小说阅读网站

一个简洁优雅的小说阅读网站生成器，将 Markdown 格式的小说源文件自动构建为静态 HTML 网站，并通过 GitHub Pages 发布。

## ✨ 特性

- 📚 **Markdown 源文件** - 使用 Markdown 编写小说，简洁高效
- 🎨 **纸墨风格设计** - 优雅的阅读界面，支持浅色/深色模式
- 🔍 **全文搜索** - 支持小说和章节搜索
- 📱 **响应式设计** - 完美适配桌面和移动设备
- 🌙 **深色模式** - 一键切换，保护视力
- � **章节导航** - 上一章/下一章快速跳转
- 📖 **目录侧边栏** - 阅读时快速定位章节
- 🚀 **自动部署** - 推送代码后自动构建并部署到 GitHub Pages

## 📁 项目结构

```
novel-create/
├── .github/workflows/     # GitHub Actions 配置
├── assets/               # 网站静态资源
│   ├── css/style.css    # 样式文件
│   └── js/              # JavaScript 文件
│       ├── search.js    # 搜索功能
│       └── theme.js     # 主题切换
├── scripts/
│   └── build-site.js    # 网站构建脚本
├── templates/           # HTML 模板
│   ├── index.html       # 首页模板
│   ├── novel-index.html # 小说详情页模板
│   └── chapter.html     # 章节阅读页模板
├── 小说/                # 小说源文件（Markdown）
│   └── 都市奇探手记/    # 单部小说目录
│       ├── assets/      # 小说资源（封面等）
│       ├── chapters/    # 章节文件
│       │   ├── 第一卷/
│       │   └── 第二卷/
│       └── outline/     # 大纲和设定
├── .gitignore
├── package.json
└── README.md
```

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 本地构建

```bash
npm run build
```

构建后的网站将生成在 `dist/` 目录。

### 3. 本地预览

```bash
npx serve dist
```

### 4. 部署到 GitHub Pages

1. 在 GitHub 创建仓库
2. 推送代码到 main 分支
3. 在仓库设置中启用 GitHub Pages（选择 gh-pages 分支）
4. GitHub Actions 将自动构建并部署

## 📝 添加新小说

1. 在 `小说/` 目录下创建新文件夹，以小说名称命名
2. 创建 `chapters/` 目录，按卷组织章节
3. 章节文件命名格式：`第001章-章节标题.md`
4. （可选）添加 `assets/cover.html` 或 `assets/cover.png` 作为封面
5. 提交并推送，网站将自动更新

### 章节文件格式

```markdown
# 章节标题

正文内容...

第二段内容...
```

## 🎨 自定义配置

### 修改网站标题

编辑 `scripts/build-site.js` 中的 `generateIndex` 函数：

```javascript
title: '你的小说网站名称'
```

### 自定义样式

编辑 `assets/css/style.css` 修改主题颜色、字体等。

## 🔧 技术栈

- **构建工具**: Node.js
- **Markdown 解析**: marked
- **样式**: 原生 CSS（CSS 变量）
- **部署**: GitHub Actions + GitHub Pages

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
