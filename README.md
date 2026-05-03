# 小说阅读网站

一个简洁优雅的小说阅读网站生成器，将 Markdown 格式的小说源文件自动构建为静态 HTML 网站，并通过 GitHub Pages 发布。

本项目小说内容由 **Fiction Crafter** AI 小说创作技能辅助生成。

## ✨ 特性

- 📚 **Markdown 源文件** - 使用 Markdown 编写小说，简洁高效
- 🎨 **纸墨风格设计** - 优雅的阅读界面，支持浅色/深色模式
- 🔍 **全文搜索** - 支持小说和章节搜索
- 📱 **响应式设计** - 完美适配桌面和移动设备
- 🌙 **深色模式** - 一键切换，保护视力
- 🔗 **章节导航** - 上一章/下一章快速跳转
- 📖 **目录侧边栏** - 阅读时快速定位章节
- � **阅读进度** - 自动保存阅读进度，支持跨设备继续阅读
- �🚀 **自动部署** - 推送代码后自动构建并部署到 GitHub Pages

## 🤖 Fiction Crafter 技能

本项目集成了 **Fiction Crafter** - 专业级 AI 小说创作技能，采用 **Planner → Writer → Auditor → Reviser → Gatekeeper** 多 Agent 协作架构。

### 技能特性

- **六 Agent 协作**: Planner（规划）、Writer（写作）、Auditor（审核）、Reviser（修改）、Critique（批评）、Gatekeeper（门控）
- **多题材支持**: 玄幻、修仙、都市、科幻、悬疑、言情、历史等
- **特殊创作模式**: 标准创作、续写、仿写、番外、同人
- **智能审核**: 18 维度深度审核，包括价值观审核、历史规范性审核
- **推广素材生成**: 自动生成 HTML 封面和推文
- **人工门控**: 关键决策点暂停，确保创作方向符合预期

### 技能文件结构

```
.trae/skills/fiction-crafter/
├── agents/              # Agent 定义
│   ├── PLANNER.md      # 规划师
│   ├── WRITER.md       # 写作专员
│   ├── AUDITOR.md      # 审核专员
│   ├── REVISER.md      # 修改专员
│   ├── CRITIQUE.md     # 批评家
│   └── GATEKEEPER.md   # 门控官
├── assets/             # 模板文件
├── config/             # 配置文件
├── features/           # 功能模块
│   ├── fanfic.md       # 番外/同人/仿写
│   ├── market-radar.md # 市场雷达
│   ├── html-generator.md # HTML 生成器
│   └── content-guidelines.md # 内容规范
└── .learnings/         # 记忆存储
```

### 创作流程

1. **Planner 规划** - 分析题材、构建世界观、设计人物、制定大纲
2. **Gatekeeper 确认** - 大纲确认、卷级规划确认
3. **Writer 创作** - 按规划创作章节（2000-3000字/章）
4. **Auditor 审核** - 多维度质量审核
5. **Reviser 修改** - 修复审核发现的问题
6. **发布** - 审核通过后保存为 Markdown 文件

## 📁 项目结构

```
novel-create/
├── .github/workflows/     # GitHub Actions 配置
├── .trae/
│   └── skills/
│       └── fiction-crafter/  # AI 小说创作技能
├── assets/               # 网站静态资源
│   ├── css/style.css    # 样式文件
│   └── js/              # JavaScript 文件
│       ├── search.js    # 搜索功能
│       ├── theme.js     # 主题切换
│       └── reading-progress.js # 阅读进度
├── scripts/
│   └── build-site.js    # 网站构建脚本
├── templates/           # HTML 模板
│   ├── index.html       # 首页模板
│   ├── novel-index.html # 小说详情页模板
│   └── chapter.html     # 章节阅读页模板
├── 小说/                # 小说源文件（Markdown）
│   └── 都市奇探手记/    # 单部小说目录
│       ├── assets/      # 小说资源（封面、推文等）
│       ├── chapters/    # 章节文件
│       │   ├── 第一卷/
│       │   └── 第二卷/
│       └── outline/     # 大纲和设定
├── .gitignore
├── package.json
├── README.md            # 中文介绍
└── README_EN.md         # 英文介绍
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

### 方式一：使用 Fiction Crafter 技能创作

1. 在 Trae IDE 中调用 fiction-crafter 技能
2. 按照 Planner → Writer → Auditor → Reviser 流程创作
3. 章节自动保存到 `小说/[书名]/chapters/` 目录
4. 提交并推送，网站自动更新

### 方式二：手动添加

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
- **AI 创作**: Fiction Crafter 技能（基于多 Agent 架构）

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 🙏 致谢

- 小说内容由 [Fiction Crafter](.trae/skills/fiction-crafter/) AI 技能辅助创作
- 架构设计参考 InkOS 的 Agent 协作思路
