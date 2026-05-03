# Novel Reading Website

A clean and elegant novel reading website generator that automatically builds static HTML websites from Markdown source files and publishes them via GitHub Pages.

The novel content in this project is assisted by the **Fiction Crafter** AI novel writing skill.

## ✨ Features

- 📚 **Markdown Source Files** - Write novels in Markdown, simple and efficient
- 🎨 **Ink & Paper Design** - Elegant reading interface with light/dark mode support
- 🔍 **Full-text Search** - Search for novels and chapters
- 📱 **Responsive Design** - Perfectly adapted for desktop and mobile devices
- 🌙 **Dark Mode** - One-click switch to protect your eyes
- 🔗 **Chapter Navigation** - Quick jump to previous/next chapter
- 📖 **Table of Contents Sidebar** - Quick chapter positioning while reading
- 📌 **Reading Progress** - Auto-save reading progress, continue across devices
- 🚀 **Auto Deployment** - Automatic build and deploy to GitHub Pages on push

## 🤖 Fiction Crafter Skill

This project integrates **Fiction Crafter** - a professional AI novel writing skill using the **Planner → Writer → Auditor → Reviser → Gatekeeper** multi-Agent collaboration architecture.

### Skill Features

- **Six Agent Collaboration**: Planner, Writer, Auditor, Reviser, Critique, Gatekeeper
- **Multi-genre Support**: Fantasy, Xianxia, Urban, Sci-Fi, Mystery, Romance, Historical, etc.
- **Special Writing Modes**: Standard, Continuation, Imitation, Side Stories, Fan Fiction
- **Intelligent Audit**: 18-dimension deep audit including values audit and historical accuracy audit
- **Promotion Material Generation**: Auto-generate HTML covers and promotional tweets
- **Human Gatekeeping**: Pause at key decision points to ensure expected creative direction

### Skill File Structure

```
.trae/skills/fiction-crafter/
├── agents/              # Agent definitions
│   ├── PLANNER.md      # Planner
│   ├── WRITER.md       # Writer
│   ├── AUDITOR.md      # Auditor
│   ├── REVISER.md      # Reviser
│   ├── CRITIQUE.md     # Critique
│   └── GATEKEEPER.md   # Gatekeeper
├── assets/             # Template files
├── config/             # Configuration files
├── features/           # Feature modules
│   ├── fanfic.md       # Side stories/Fan fiction
│   ├── market-radar.md # Market radar
│   ├── html-generator.md # HTML generator
│   └── content-guidelines.md # Content guidelines
└── .learnings/         # Memory storage
```

### Writing Workflow

1. **Planner Planning** - Analyze genre, build world view, design characters, create outline
2. **Gatekeeper Confirmation** - Outline confirmation, volume planning confirmation
3. **Writer Creation** - Create chapters according to plan (2000-3000 words/chapter)
4. **Auditor Review** - Multi-dimensional quality audit
5. **Reviser Modification** - Fix issues found in audit
6. **Publish** - Save as Markdown file after audit approval

## 📁 Project Structure

```
novel-create/
├── .github/workflows/     # GitHub Actions configuration
├── .trae/
│   └── skills/
│       └── fiction-crafter/  # AI novel writing skill
├── assets/               # Website static assets
│   ├── css/style.css    # Stylesheet
│   └── js/              # JavaScript files
│       ├── search.js    # Search functionality
│       ├── theme.js     # Theme switching
│       └── reading-progress.js # Reading progress
├── scripts/
│   └── build-site.js    # Website build script
├── templates/           # HTML templates
│   ├── index.html       # Homepage template
│   ├── novel-index.html # Novel detail page template
│   └── chapter.html     # Chapter reading page template
├── 小说/                # Novel source files (Markdown)
│   └── 都市奇探手记/    # Single novel directory
│       ├── assets/      # Novel assets (cover, tweets, etc.)
│       ├── chapters/    # Chapter files
│       │   ├── 第一卷/
│       │   └── 第二卷/
│       └── outline/     # Outlines and settings
├── .gitignore
├── package.json
├── README.md            # Chinese introduction
└── README_EN.md         # English introduction
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Local Build

```bash
npm run build
```

The built website will be generated in the `dist/` directory.

### 3. Local Preview

```bash
npx serve dist
```

### 4. Deploy to GitHub Pages

1. Create a repository on GitHub
2. Push code to the main branch
3. Enable GitHub Pages in repository settings (select gh-pages branch)
4. GitHub Actions will automatically build and deploy

## 📝 Adding New Novels

### Method 1: Using Fiction Crafter Skill

1. Invoke the fiction-crafter skill in Trae IDE
2. Follow the Planner → Writer → Auditor → Reviser workflow
3. Chapters are automatically saved to `小说/[Book Name]/chapters/` directory
4. Commit and push, the website will update automatically

### Method 2: Manual Addition

1. Create a new folder in the `小说/` directory, named after the novel
2. Create a `chapters/` directory to organize chapters by volume
3. Chapter file naming format: `第001章-ChapterTitle.md`
4. (Optional) Add `assets/cover.html` or `assets/cover.png` as cover
5. Commit and push, the website will update automatically

### Chapter File Format

```markdown
# Chapter Title

Body content...

Second paragraph...
```

## 🎨 Customization

### Change Website Title

Edit the `generateIndex` function in `scripts/build-site.js`:

```javascript
title: 'Your Novel Website Name'
```

### Customize Styles

Edit `assets/css/style.css` to modify theme colors, fonts, etc.

## 🔧 Tech Stack

- **Build Tool**: Node.js
- **Markdown Parser**: marked
- **Styling**: Native CSS (CSS Variables)
- **Deployment**: GitHub Actions + GitHub Pages
- **AI Writing**: Fiction Crafter skill (based on multi-Agent architecture)

## 📄 License

MIT License

## 🤝 Contributing

Issues and Pull Requests are welcome!

## 🙏 Acknowledgments

- Novel content assisted by [Fiction Crafter](.trae/skills/fiction-crafter/) AI skill
- Architecture design inspired by InkOS Agent collaboration approach
