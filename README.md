# 小说阅读站点

这是一个基于 GitHub Pages 的小说阅读站点，支持将 Markdown 格式的小说源文件自动构建为静态 HTML 网站。

## 特性

- 📚 **多小说支持** - 自动扫描 `小说/` 目录下的所有小说
- 🎨 **精美界面** - 响应式设计，支持桌面和移动设备
- 📖 **阅读友好** - 目录导航、章节切换、阅读进度记忆
- 🔒 **源文件保护** - Markdown 源文件不会暴露在 GitHub Pages 上
- 🚀 **自动部署** - 推送更新后自动构建并部署

## 项目结构

```
.
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions 自动部署配置
├── scripts/
│   └── build-site.js       # 网站构建脚本
├── templates/
│   ├── index.html          # 首页模板
│   ├── novel-index.html    # 小说详情页模板
│   └── chapter.html        # 章节阅读页模板
├── assets/
│   └── css/
│       └── style.css       # 网站样式
├── 小说/                    # 小说源文件目录
│   └── 都市奇探手记/         # 单部小说目录
│       ├── README.md       # 小说简介
│       ├── outline/        # 大纲文件
│       ├── chapters/       # 章节文件
│       │   ├── 第一卷/
│       │   │   ├── 第001章-xxx.md
│       │   │   └── ...
│       │   └── 第二卷/
│       └── assets/         # 小说资源（封面等）
└── README.md               # 本文件
```

## 部署步骤

### 1. 创建 GitHub 仓库

1. 在 GitHub 上创建一个新的 **私有仓库**（Private Repository）
2. 将本地代码推送到该仓库

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

### 2. 启用 GitHub Pages

1. 进入仓库的 **Settings** 页面
2. 点击左侧的 **Pages** 选项
3. 在 **Source** 部分选择 **GitHub Actions**

### 3. 安装依赖

项目使用 `marked` 库来解析 Markdown，需要创建 `package.json`：

```bash
npm init -y
npm install marked
```

### 4. 自动部署

完成上述配置后，每次推送代码到 `main` 分支时，GitHub Actions 会自动：
1. 运行 `scripts/build-site.js` 构建网站
2. 将生成的静态文件部署到 GitHub Pages

## 添加新小说

1. 在 `小说/` 目录下创建新的小说文件夹
2. 按照以下结构组织文件：

```
小说/新小说名/
├── README.md              # 小说简介（第一行作为标题，第二行作为描述）
├── chapters/              # 章节目录
│   ├── 第一卷/
│   │   ├── 第001章-标题.md
│   │   ├── 第002章-标题.md
│   │   └── ...
│   └── 第二卷/
│       └── ...
└── assets/                # 可选：小说资源
    └── cover.png          # 可选：小说封面
```

3. 推送代码，网站会自动更新

## 本地预览

在本地构建并预览网站：

```bash
# 安装依赖
npm install

# 构建网站
node scripts/build-site.js

# 启动本地服务器预览
cd dist
npx serve
```

## 自定义配置

### 修改网站标题

编辑 `templates/index.html` 中的 `{{title}}` 占位符对应的默认值。

### 修改样式

编辑 `assets/css/style.css` 文件。

### 修改模板

编辑 `templates/` 目录下的 HTML 模板文件。

## 注意事项

1. **仓库必须是私有的** - 这样才能保护 Markdown 源文件不被公开访问
2. **GitHub Pages 是公开的** - 生成的 HTML 网站是公开的，任何人都可以访问
3. **不要提交 `dist/` 目录** - 该目录是自动生成的，已添加到 `.gitignore`
4. **章节文件名格式** - 建议使用 `第XXX章-标题.md` 的格式

## 技术栈

- [GitHub Pages](https://pages.github.com/) - 静态网站托管
- [GitHub Actions](https://github.com/features/actions) - 自动构建和部署
- [Node.js](https://nodejs.org/) - 构建脚本运行环境
- [Marked](https://marked.js.org/) - Markdown 解析器

## License

MIT
