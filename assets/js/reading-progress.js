// 阅读进度追踪功能
(function() {
  const STORAGE_KEY = 'novel-reading-progress';

  // 获取当前页面信息
  function getCurrentPageInfo() {
    const path = window.location.pathname;
    const match = path.match(/\/([^/]+)\/chapters\/([^/]+)\/(\d+)\.html$/);
    if (!match) return null;

    return {
      novelName: decodeURIComponent(match[1]),
      volumeName: decodeURIComponent(match[2]),
      chapterNumber: parseInt(match[3]),
      url: window.location.href,
      title: document.querySelector('.chapter-header-title')?.textContent || ''
    };
  }

  // 保存阅读进度
  function saveProgress() {
    const info = getCurrentPageInfo();
    if (!info) return;

    const progress = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    progress[info.novelName] = {
      novelName: info.novelName,
      volumeName: info.volumeName,
      chapterNumber: info.chapterNumber,
      url: info.url,
      title: info.title,
      timestamp: Date.now()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }

  // 获取阅读进度
  function getProgress(novelName) {
    const progress = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return progress[novelName] || null;
  }

  // 获取所有阅读进度
  function getAllProgress() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  }

  // 在首页显示继续阅读按钮
  function showContinueReading() {
    const novelsGrid = document.getElementById('novelsGrid');
    if (!novelsGrid) return;

    const progress = getAllProgress();
    const progressEntries = Object.entries(progress)
      .sort((a, b) => b[1].timestamp - a[1].timestamp)
      .slice(0, 3); // 只显示最近阅读的3本

    if (progressEntries.length === 0) return;

    // 创建继续阅读区域
    const continueSection = document.createElement('div');
    continueSection.className = 'continue-reading-section';
    continueSection.innerHTML = `
      <h2 class="section-title">继续阅读</h2>
      <div class="continue-reading-list">
        ${progressEntries.map(([novelName, data]) => `
          <a href="${data.url}" class="continue-reading-item">
            <span class="novel-name">${novelName}</span>
            <span class="chapter-info">${data.title || `第${data.chapterNumber}章`}</span>
            <span class="continue-btn">继续阅读 →</span>
          </a>
        `).join('')}
      </div>
    `;

    // 插入到搜索区域之后
    const searchSection = document.querySelector('.search-section');
    if (searchSection) {
      searchSection.insertAdjacentElement('afterend', continueSection);
    }
  }

  // 在小说详情页显示阅读进度
  function showNovelProgress() {
    const path = window.location.pathname;
    const match = path.match(/\/([^/]+)\/index\.html$/);
    if (!match) return;

    const novelName = decodeURIComponent(match[1]);
    const progress = getProgress(novelName);
    if (!progress) return;

    const novelHeader = document.querySelector('.novel-detail-header');
    if (!novelHeader) return;

    const progressBanner = document.createElement('div');
    progressBanner.className = 'reading-progress-banner';
    progressBanner.innerHTML = `
      <div class="progress-info">
        <span class="progress-label">上次读到：</span>
        <span class="progress-chapter">${progress.title || `第${progress.chapterNumber}章`}</span>
      </div>
      <a href="${progress.url}" class="continue-btn">继续阅读</a>
    `;

    novelHeader.insertAdjacentElement('afterend', progressBanner);
  }

  // 初始化
  function init() {
    // 章节页面：保存进度
    if (document.querySelector('.chapter-reading')) {
      saveProgress();
      // 滚动时也保存进度
      let scrollTimer;
      window.addEventListener('scroll', () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(saveProgress, 1000);
      });
    }

    // 首页：显示继续阅读
    if (document.getElementById('novelsGrid')) {
      showContinueReading();
    }

    // 小说详情页：显示阅读进度
    if (document.querySelector('.novel-detail-header')) {
      showNovelProgress();
    }
  }

  // DOM 加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
