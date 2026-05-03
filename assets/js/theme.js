// 主题切换功能
(function() {
  const STORAGE_KEY = 'novel-theme';
  const DARK_THEME = 'dark';
  const LIGHT_THEME = 'light';

  // 获取保存的主题或系统偏好
  function getSavedTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;

    // 检测系统偏好
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return DARK_THEME;
    }
    return LIGHT_THEME;
  }

  // 应用主题
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateToggleButton(theme);
  }

  // 更新按钮图标
  function updateToggleButton(theme) {
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      toggle.textContent = theme === DARK_THEME ? '☀️' : '🌙';
      toggle.title = theme === DARK_THEME ? '切换到浅色模式' : '切换到深色模式';
    }
  }

  // 切换主题
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  // 初始化
  function init() {
    const savedTheme = getSavedTheme();
    applyTheme(savedTheme);

    // 绑定按钮事件
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', toggleTheme);
    }
  }

  // DOM 加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
