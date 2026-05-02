const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const NOVELS_DIR = path.join(__dirname, '..', '小说');
const DIST_DIR = path.join(__dirname, '..', 'dist');
const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');
const ASSETS_DIR = path.join(__dirname, '..', 'assets');

// GitHub Pages 基础路径（仓库名）
const BASE_PATH = process.env.GITHUB_PAGES_BASE || '';

// 确保目录存在
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// 复制文件
function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

// 复制目录
function copyDir(src, dest) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

// 读取模板
function readTemplate(name) {
  const templatePath = path.join(TEMPLATES_DIR, `${name}.html`);
  if (fs.existsSync(templatePath)) {
    return fs.readFileSync(templatePath, 'utf-8');
  }
  return null;
}

// 渲染模板
function renderTemplate(template, data) {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] !== undefined ? data[key] : match;
  });
}

// 提取章节信息
function extractChapterInfo(content, filename) {
  const lines = content.split('\n');
  let title = '';
  let body = content;

  // 尝试从第一行提取标题
  if (lines[0].startsWith('#')) {
    title = lines[0].replace(/^#+\s*/, '').trim();
    body = lines.slice(1).join('\n');
  } else {
    // 从文件名提取标题
    const match = filename.match(/第\d+章[-_]?(.*?)\.md$/);
    if (match) {
      title = match[1] || filename.replace('.md', '');
    } else {
      title = filename.replace('.md', '');
    }
  }

  return { title, body };
}

// 解析章节号
function parseChapterNumber(filename) {
  const match = filename.match(/第(\d+)章/);
  return match ? parseInt(match[1]) : 0;
}

// 获取所有小说
function getNovels() {
  if (!fs.existsSync(NOVELS_DIR)) {
    return [];
  }

  const novels = [];
  const entries = fs.readdirSync(NOVELS_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const novelPath = path.join(NOVELS_DIR, entry.name);
      const readmePath = path.join(novelPath, 'README.md');
      const outlinePath = path.join(novelPath, 'outline', '全局大纲.md');

      let description = '';
      let cover = '';

      if (fs.existsSync(readmePath)) {
        const readme = fs.readFileSync(readmePath, 'utf-8');
        const lines = readme.split('\n');
        description = lines.slice(1).find(line => line.trim()) || '';
      }

      // 查找封面
      const assetsPath = path.join(novelPath, 'assets');
      if (fs.existsSync(assetsPath)) {
        const coverFiles = ['cover.png', 'cover.jpg', 'cover.jpeg', 'cover.html'];
        for (const coverFile of coverFiles) {
          if (fs.existsSync(path.join(assetsPath, coverFile))) {
            cover = coverFile;
            break;
          }
        }
      }

      novels.push({
        name: entry.name,
        path: novelPath,
        description: description.replace(/^[-\s]+/, ''),
        cover: cover,
        hasOutline: fs.existsSync(outlinePath)
      });
    }
  }

  return novels;
}

// 获取小说的卷和章节
function getNovelChapters(novelPath) {
  const chaptersDir = path.join(novelPath, 'chapters');
  if (!fs.existsSync(chaptersDir)) {
    return [];
  }

  const volumes = [];
  const volumeEntries = fs.readdirSync(chaptersDir, { withFileTypes: true });

  for (const volumeEntry of volumeEntries) {
    if (volumeEntry.isDirectory()) {
      const volumePath = path.join(chaptersDir, volumeEntry.name);
      const chapterFiles = fs.readdirSync(volumePath)
        .filter(f => f.endsWith('.md'))
        .sort((a, b) => {
          const numA = parseChapterNumber(a);
          const numB = parseChapterNumber(b);
          return numA - numB;
        });

      const chapters = chapterFiles.map(filename => {
        const filePath = path.join(volumePath, filename);
        const content = fs.readFileSync(filePath, 'utf-8');
        const info = extractChapterInfo(content, filename);
        const chapterNum = parseChapterNumber(filename);

        return {
          number: chapterNum,
          filename: filename,
          title: info.title,
          content: info.body,
          path: filePath
        };
      });

      volumes.push({
        name: volumeEntry.name,
        chapters: chapters
      });
    }
  }

  // 按卷名排序
  return volumes.sort((a, b) => {
    const numA = parseInt(a.name.match(/(\d+)/)?.[1] || '0');
    const numB = parseInt(b.name.match(/(\d+)/)?.[1] || '0');
    return numA - numB;
  });
}

// 生成首页
function generateIndex(novels) {
  const template = readTemplate('index') || getDefaultIndexTemplate();

  const basePath = BASE_PATH || '';
  const novelsHtml = novels.map(novel => {
    const encodedName = encodeURIComponent(novel.name);
    let coverHtml;
    if (novel.cover) {
      if (novel.cover.endsWith('.html')) {
        // HTML 封面使用 iframe 嵌入显示 - 使用相对路径避免 base 标签影响
        coverHtml = `<div class="novel-cover html-cover-container"><iframe src="./${encodedName}/assets/${novel.cover}" frameborder="0" scrolling="no"></iframe></div>`;
      } else {
        coverHtml = `<div class="novel-cover"><img src="./${encodedName}/assets/${novel.cover}" alt="${novel.name}"></div>`;
      }
    } else {
      coverHtml = `<div class="novel-cover placeholder"><span>${novel.name[0]}</span></div>`;
    }

    return `
      <div class="novel-card">
        <a href="${basePath}/${encodedName}/index.html" class="card-link">
          ${coverHtml}
          <div class="novel-info">
            <h3>${novel.name}</h3>
            <p>${novel.description || '暂无简介'}</p>
          </div>
        </a>
      </div>
    `;
  }).join('');

  const html = renderTemplate(template, {
    title: '小说阅读',
    novels: novelsHtml,
    year: new Date().getFullYear(),
    basePath: BASE_PATH ? BASE_PATH + '/' : './'
  });

  fs.writeFileSync(path.join(DIST_DIR, 'index.html'), html);
}

// 生成小说首页
function generateNovelIndex(novel, volumes) {
  const template = readTemplate('novel-index') || getDefaultNovelIndexTemplate();

  const totalChapters = volumes.reduce((sum, v) => sum + v.chapters.length, 0);
  const encodedNovelName = encodeURIComponent(novel.name);

  const volumesHtml = volumes.map(volume => {
    const chaptersHtml = volume.chapters.map(ch => `
      <li>
        <a href="${BASE_PATH}/${encodedNovelName}/chapters/${encodeURIComponent(volume.name)}/${ch.number}.html">
          <span class="chapter-num">第${ch.number}章</span>
          <span class="chapter-title">${ch.title}</span>
        </a>
      </li>
    `).join('');

    return `
      <div class="volume">
        <h3 class="volume-title">${volume.name}</h3>
        <ul class="chapter-list">
          ${chaptersHtml}
        </ul>
      </div>
    `;
  }).join('');

  const html = renderTemplate(template, {
    title: novel.name,
    novelName: novel.name,
    description: novel.description || '暂无简介',
    totalChapters: totalChapters,
    totalVolumes: volumes.length,
    volumes: volumesHtml,
    basePath: BASE_PATH ? BASE_PATH + '/' : '../'
  });

  const novelDir = path.join(DIST_DIR, novel.name);
  ensureDir(novelDir);
  fs.writeFileSync(path.join(novelDir, 'index.html'), html);
}

// 生成章节页面
function generateChapterPage(novel, volume, chapter, allVolumes, prevChapter, nextChapter) {
  const template = readTemplate('chapter') || getDefaultChapterTemplate();
  const encodedNovelName = encodeURIComponent(novel.name);
  const basePath = BASE_PATH || '';

  // 构建目录导航
  const tocHtml = allVolumes.map(v => {
    return v.chapters.map(ch => {
      const active = v.name === volume.name && ch.number === chapter.number ? 'active' : '';
      return `<li><a href="${basePath}/${encodedNovelName}/chapters/${encodeURIComponent(v.name)}/${ch.number}.html" class="${active}">第${ch.number}章 ${ch.title}</a></li>`;
    }).join('');
  }).join('');

  // 转换 Markdown 为 HTML
  const contentHtml = marked.parse(chapter.content);

  // 导航链接
  const prevLink = prevChapter
    ? `<a href="${basePath}/${encodedNovelName}/chapters/${encodeURIComponent(prevChapter.volumeName || volume.name)}/${prevChapter.number}.html" class="prev">上一章</a>`
    : '<span class="prev disabled">上一章</span>';

  const nextLink = nextChapter
    ? `<a href="${basePath}/${encodedNovelName}/chapters/${encodeURIComponent(nextChapter.volumeName || volume.name)}/${nextChapter.number}.html" class="next">下一章</a>`
    : '<span class="next disabled">下一章</span>';

  const html = renderTemplate(template, {
    title: `${chapter.title} - ${novel.name}`,
    novelName: novel.name,
    novelLink: `${basePath}/${encodedNovelName}/index.html`,
    volumeName: volume.name,
    chapterTitle: chapter.title,
    chapterNumber: chapter.number,
    content: contentHtml,
    toc: tocHtml,
    prevLink: prevLink,
    nextLink: nextLink,
    basePath: BASE_PATH ? BASE_PATH + '/' : '../../../'
  });

  const chapterDir = path.join(DIST_DIR, novel.name, 'chapters', volume.name);
  ensureDir(chapterDir);
  fs.writeFileSync(path.join(chapterDir, `${chapter.number}.html`), html);
}

// 复制小说资源
function copyNovelAssets(novel) {
  const srcAssets = path.join(novel.path, 'assets');
  const destAssets = path.join(DIST_DIR, novel.name, 'assets');

  if (fs.existsSync(srcAssets)) {
    copyDir(srcAssets, destAssets);
  }
}

// 默认模板
function getDefaultIndexTemplate() {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{title}}</title>
  <link rel="stylesheet" href="./assets/css/style.css">
</head>
<body>
  <header class="site-header">
    <div class="container">
      <h1>{{title}}</h1>
    </div>
  </header>

  <main class="container">
    <div class="novels-grid">
      {{novels}}
    </div>
  </main>

  <footer class="site-footer">
    <div class="container">
      <p>&copy; {{year}} 小说阅读. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>`;
}

function getDefaultNovelIndexTemplate() {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{title}}</title>
  <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
  <header class="site-header">
    <div class="container">
      <a href="../index.html" class="back-link">← 返回首页</a>
      <h1>{{novelName}}</h1>
    </div>
  </header>

  <main class="container">
    <div class="novel-info-card">
      <h2>{{novelName}}</h2>
      <p class="description">{{description}}</p>
      <div class="stats">
        <span>共 {{totalVolumes}} 卷</span>
        <span>共 {{totalChapters}} 章</span>
      </div>
    </div>

    <div class="volumes-container">
      {{volumes}}
    </div>
  </main>

  <footer class="site-footer">
    <div class="container">
      <p>&copy; 小说阅读</p>
    </div>
  </footer>
</body>
</html>`;
}

function getDefaultChapterTemplate() {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{title}}</title>
  <link rel="stylesheet" href="../../../assets/css/style.css">
</head>
<body class="reading-mode">
  <header class="chapter-header">
    <div class="container">
      <nav class="breadcrumb">
        <a href="{{novelLink}}">{{novelName}}</a>
        <span>/</span>
        <span>{{volumeName}}</span>
      </nav>
      <h1>第{{chapterNumber}}章 {{chapterTitle}}</h1>
    </div>
  </header>

  <div class="reading-container">
    <aside class="toc-sidebar">
      <div class="toc-header">
        <h3>目录</h3>
        <button class="toc-toggle" onclick="toggleToc()">☰</button>
      </div>
      <div class="toc-content">
        {{toc}}
      </div>
    </aside>

    <main class="chapter-content">
      <article>
        {{content}}
      </article>

      <nav class="chapter-nav">
        {{prevLink}}
        <a href="{{novelLink}}" class="toc">目录</a>
        {{nextLink}}
      </nav>
    </main>
  </div>

  <footer class="site-footer">
    <div class="container">
      <p>&copy; 小说阅读</p>
    </div>
  </footer>

  <script>
    function toggleToc() {
      document.querySelector('.toc-sidebar').classList.toggle('collapsed');
    }
  </script>
</body>
</html>`;
}

// 生成搜索索引
function generateSearchIndex(novels) {
  const index = [];
  const basePath = BASE_PATH || '';
  
  for (const novel of novels) {
    const encodedNovelName = encodeURIComponent(novel.name);
    // 添加小说信息
    index.push({
      type: 'novel',
      title: novel.name,
      description: novel.description,
      url: `${basePath}/${encodedNovelName}/index.html`,
      novelName: novel.name
    });
    
    // 获取章节信息
    const volumes = getNovelChapters(novel.path);
    for (const volume of volumes) {
      for (const chapter of volume.chapters) {
        index.push({
          type: 'chapter',
          title: chapter.title,
          novelName: novel.name,
          volumeName: volume.name,
          chapterNumber: chapter.number,
          url: `${basePath}/${encodedNovelName}/chapters/${encodeURIComponent(volume.name)}/${chapter.number}.html`,
          content: chapter.content.substring(0, 200) // 前200字作为预览
        });
      }
    }
  }
  
  fs.writeFileSync(
    path.join(DIST_DIR, 'search-index.json'),
    JSON.stringify(index, null, 2)
  );
  console.log('已生成搜索索引');
}

// 主函数
function main() {
  console.log('开始构建小说网站...');

  // 清理并创建输出目录
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true });
  }
  ensureDir(DIST_DIR);

  // 复制静态资源
  if (fs.existsSync(ASSETS_DIR)) {
    copyDir(ASSETS_DIR, path.join(DIST_DIR, 'assets'));
  }

  // 获取所有小说
  const novels = getNovels();
  console.log(`发现 ${novels.length} 部小说`);

  // 生成首页
  generateIndex(novels);
  console.log('已生成首页');

  // 为每部小说生成页面
  for (const novel of novels) {
    console.log(`\n处理小说: ${novel.name}`);

    const volumes = getNovelChapters(novel.path);
    console.log(`  - 发现 ${volumes.length} 卷`);

    // 复制资源文件
    copyNovelAssets(novel);

    // 生成小说首页
    generateNovelIndex(novel, volumes);

    // 生成所有章节页面
    let allChapters = [];
    volumes.forEach(v => allChapters.push(...v.chapters.map(c => ({ ...c, volume: v }))));

    for (let i = 0; i < volumes.length; i++) {
      const volume = volumes[i];
      console.log(`  - ${volume.name}: ${volume.chapters.length} 章`);

      for (let j = 0; j < volume.chapters.length; j++) {
        const chapter = volume.chapters[j];
        
        // 获取上一章（可能是上一卷的最后一个章节）
        let prevChapter = null;
        if (j > 0) {
          prevChapter = { ...volume.chapters[j - 1], volumeName: volume.name };
        } else if (i > 0) {
          const prevVolume = volumes[i - 1];
          prevChapter = { ...prevVolume.chapters[prevVolume.chapters.length - 1], volumeName: prevVolume.name };
        }
        
        // 获取下一章（可能是下一卷的第一个章节）
        let nextChapter = null;
        if (j < volume.chapters.length - 1) {
          nextChapter = { ...volume.chapters[j + 1], volumeName: volume.name };
        } else if (i < volumes.length - 1) {
          const nextVolume = volumes[i + 1];
          nextChapter = { ...nextVolume.chapters[0], volumeName: nextVolume.name };
        }

        generateChapterPage(novel, volume, chapter, volumes, prevChapter, nextChapter);
      }
    }

    console.log(`  ✓ ${novel.name} 处理完成`);
  }
  
  // 生成搜索索引
  generateSearchIndex(novels);

  console.log('\n✅ 网站构建完成!');
  console.log(`输出目录: ${DIST_DIR}`);
}

main();
