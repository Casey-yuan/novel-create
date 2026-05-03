# Novel Reading Website

A clean and elegant novel reading website generator that automatically builds static HTML websites from Markdown source files and publishes them via GitHub Pages.

## ✨ Features

- 📚 **Markdown Source Files** - Write novels in Markdown, simple and efficient
- 🎨 **Ink & Paper Design** - Elegant reading interface with light/dark mode support
- 🔍 **Full-text Search** - Search for novels and chapters
- 📱 **Responsive Design** - Perfectly adapted for desktop and mobile devices
- 🌙 **Dark Mode** - One-click switch to protect your eyes
- 🔗 **Chapter Navigation** - Quick jump to previous/next chapter
- 📖 **Table of Contents Sidebar** - Quick chapter定位 while reading
- 🚀 **Auto Deployment** - Automatic build and deploy to GitHub Pages on push

## 📁 Project Structure

```
novel-create/
├── .github/workflows/     # GitHub Actions configuration
├── assets/               # Website static assets
│   ├── css/style.css    # Stylesheet
│   └── js/              # JavaScript files
│       ├── search.js    # Search functionality
│       └── theme.js     # Theme switching
├── scripts/
│   └── build-site.js    # Website build script
├── templates/           # HTML templates
│   ├── index.html       # Homepage template
│   ├── novel-index.html # Novel detail page template
│   └── chapter.html     # Chapter reading page template
├── 小说/                # Novel source files (Markdown)
│   └── 都市奇探手记/    # Single novel directory
│       ├── assets/      # Novel assets (cover, etc.)
│       ├── chapters/    # Chapter files
│       │   ├── 第一卷/
│       │   └── 第二卷/
│       └── outline/     # Outlines and settings
├── .gitignore
├── package.json
└── README.md
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

## 📄 License

MIT License

## 🤝 Contributing

Issues and Pull Requests are welcome!
