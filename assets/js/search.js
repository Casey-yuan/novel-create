// 搜索功能
(function() {
  // 搜索索引数据（由构建脚本生成）
  let searchIndex = [];
  
  // 加载搜索索引
  async function loadSearchIndex() {
    try {
      const response = await fetch('./search-index.json');
      if (response.ok) {
        searchIndex = await response.json();
      }
    } catch (e) {
      console.log('搜索索引加载失败，使用页面内搜索');
      // 如果无法加载索引，从页面提取小说信息
      extractNovelsFromPage();
    }
  }
  
  // 从页面提取小说信息
  function extractNovelsFromPage() {
    const novelCards = document.querySelectorAll('.novel-card');
    searchIndex = Array.from(novelCards).map(card => {
      const link = card.querySelector('a');
      const title = card.querySelector('h3')?.textContent || '';
      const description = card.querySelector('p')?.textContent || '';
      return {
        type: 'novel',
        title: title,
        description: description,
        url: link?.getAttribute('href') || ''
      };
    });
  }
  
  // 执行搜索
  function performSearch(query) {
    if (!query.trim()) {
      showNovelsGrid();
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    const results = searchIndex.filter(item => {
      return item.title.toLowerCase().includes(lowerQuery) ||
             (item.description && item.description.toLowerCase().includes(lowerQuery)) ||
             (item.content && item.content.toLowerCase().includes(lowerQuery));
    });
    
    displayResults(results, query);
  }
  
  // 显示搜索结果
  function displayResults(results, query) {
    const novelsGrid = document.getElementById('novelsGrid');
    const searchResults = document.getElementById('searchResults');
    const resultsList = document.getElementById('resultsList');
    
    if (results.length === 0) {
      resultsList.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 40px;">未找到相关结果</p>';
    } else {
      resultsList.innerHTML = results.map(item => {
        const snippet = item.content 
          ? highlightText(item.content.substring(0, 150), query) + '...'
          : item.description;
        
        return `
          <div class="result-item">
            <a href="${item.url}">
              <div class="result-title">${highlightText(item.title, query)}</div>
              <div class="result-meta">${item.type === 'chapter' ? '章节' : '小说'} · ${item.novelName || ''}</div>
              ${snippet ? `<div class="result-snippet">${snippet}</div>` : ''}
            </a>
          </div>
        `;
      }).join('');
    }
    
    novelsGrid.style.display = 'none';
    searchResults.style.display = 'block';
  }
  
  // 高亮搜索词
  function highlightText(text, query) {
    if (!text) return '';
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return text.replace(regex, '<mark style="background: rgba(74, 144, 217, 0.3); padding: 2px 4px; border-radius: 3px;">$1</mark>');
  }
  
  // 转义正则特殊字符
  function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  // 显示小说网格
  function showNovelsGrid() {
    const novelsGrid = document.getElementById('novelsGrid');
    const searchResults = document.getElementById('searchResults');
    
    novelsGrid.style.display = 'grid';
    searchResults.style.display = 'none';
  }
  
  // 初始化
  document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
      // 加载搜索索引
      loadSearchIndex();
      
      // 监听输入
      let debounceTimer;
      searchInput.addEventListener('input', function(e) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          performSearch(e.target.value);
        }, 300);
      });
      
      // 监听回车
      searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          performSearch(e.target.value);
        }
      });
    }
  });
})();
