// 章节内容复制功能

function copyChapterContent() {
  const chapterContent = document.getElementById('chapter-content');
  const copyBtn = document.querySelector('.copy-btn');
  
  if (!chapterContent) return;
  
  // 获取纯文本内容
  const textContent = chapterContent.innerText;
  
  // 复制到剪贴板
  navigator.clipboard.writeText(textContent).then(() => {
    // 复制成功反馈
    showCopyFeedback(copyBtn, '已复制');
  }).catch(err => {
    // 降级方案：使用 document.execCommand
    fallbackCopy(textContent, copyBtn);
  });
}

// 降级复制方案
function fallbackCopy(text, btn) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  
  textArea.select();
  textArea.setSelectionRange(0, 99999); // 移动端兼容
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      showCopyFeedback(btn, '已复制');
    } else {
      showCopyFeedback(btn, '复制失败');
    }
  } catch (err) {
    showCopyFeedback(btn, '复制失败');
    console.error('复制失败:', err);
  }
  
  document.body.removeChild(textArea);
}

// 显示复制反馈
function showCopyFeedback(btn, message) {
  if (!btn) return;
  
  const originalHTML = btn.innerHTML;
  btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg><span>${message}</span>`;
  btn.classList.add('copied');
  
  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.classList.remove('copied');
  }, 2000);
}
