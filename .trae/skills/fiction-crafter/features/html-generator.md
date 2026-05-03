# HTML 生成器

用于生成小说封面和推广素材的 HTML 页面，方便用户下载和展示。

---

## 封面图 HTML 生成

### 生成要求
- **必须**生成与小说内容**紧密相关**的封面设计，视觉元素要体现小说核心主题
- 使用 HTML + CSS 实现，便于下载和自定义
- **必须**询问用户作者名，**禁止**使用"AI创作"等默认作者名
- 包含小说标题、作者、视觉元素
- 响应式设计，支持不同尺寸
- **禁止**显示下载按钮，用户可自行截图保存

### 封面设计原则

#### 1. 视觉吸引力
- 使用醒目的配色方案，符合题材风格
- 标题字体要大且有冲击力
- 添加符合主题的视觉符号或装饰元素
- 整体布局要平衡，有层次感

#### 2. 紧贴小说主题
- **视觉元素必须与小说核心设定相关**
  - 修仙：飞剑、丹药、符文、灵气、山脉
  - 玄幻：龙、魔法阵、神器、异兽
  - 都市：摩天大楼、霓虹灯、现代符号
  - 科幻：飞船、星球、科技元素、未来感
  - 历史：古代建筑、兵器、服饰元素
- 配色要符合小说基调（热血/暗黑/轻松/悬疑）
- 可以添加与主角能力或关键道具相关的符号

#### 3. 信息层次
- 主标题：最醒目，字体最大
- 副标题/卖点：一句话概括小说亮点
- 作者名：询问用户后填入，**禁止默认"AI创作"**
- 题材标签：3-5个关键词标签

### 封面 HTML 模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>《[小说名]》封面</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            font-family: 'Microsoft YaHei', 'SimHei', sans-serif;
        }
        
        .cover-container {
            width: 600px;
            height: 800px;
            background: linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px;
        }
        
        /* 背景装饰元素 */
        .cover-container::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: pulse 4s ease-in-out infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.8; }
        }
        
        /* 装饰线条 */
        .decoration-line {
            position: absolute;
            width: 80%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #e94560, transparent);
        }
        
        .decoration-line.top {
            top: 100px;
        }
        
        .decoration-line.bottom {
            bottom: 100px;
        }
        
        /* 主标题 */
        .title {
            font-size: 56px;
            font-weight: bold;
            color: #fff;
            text-align: center;
            text-shadow: 0 4px 20px rgba(233, 69, 96, 0.5);
            margin-bottom: 20px;
            z-index: 1;
            letter-spacing: 8px;
        }
        
        /* 副标题 */
        .subtitle {
            font-size: 24px;
            color: #e94560;
            text-align: center;
            margin-bottom: 40px;
            z-index: 1;
            font-style: italic;
        }
        
        /* 视觉元素区域 */
        .visual-element {
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(233, 69, 96, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 30px 0;
            z-index: 1;
            position: relative;
        }
        
        .visual-element::before {
            content: '[视觉符号]';
            font-size: 80px;
            opacity: 0.8;
        }
        
        /* 作者信息 - 必须询问用户 */
        .author {
            font-size: 24px;
            color: #ffd700;
            text-align: center;
            z-index: 1;
            margin-top: 40px;
            font-weight: bold;
            text-shadow: 0 2px 10px rgba(255, 215, 0, 0.3);
        }
        
        .author-label {
            font-size: 14px;
            color: #888;
            margin-bottom: 8px;
            letter-spacing: 4px;
        }
        
        /* 标签 */
        .tags {
            display: flex;
            gap: 10px;
            margin-top: 20px;
            z-index: 1;
        }
        
        .tag {
            padding: 5px 15px;
            background: rgba(233, 69, 96, 0.2);
            border: 1px solid #e94560;
            border-radius: 20px;
            font-size: 14px;
            color: #e94560;
        }
        
        /* 打印样式 */
        @media print {
            body {
                background: white;
            }
        }
    </style>
</head>
<body>
    <div class="cover-container">
        <div class="decoration-line top"></div>
        
        <h1 class="title">[小说名]</h1>
        <p class="subtitle">[副标题/一句话卖点]</p>
        
        <div class="visual-element"></div>
        
        <div class="author">
            <div class="author-label">作者</div>
            <div>[询问用户后填入]</div>
        </div>
        
        <div class="tags">
            <span class="tag">[标签1]</span>
            <span class="tag">[标签2]</span>
            <span class="tag">[标签3]</span>
        </div>
        
        <div class="decoration-line bottom"></div>
    </div>
</body>
</html>
```

### 题材专属封面设计

#### 玄幻风格
```css
.cover-container {
    background: linear-gradient(180deg, #0c0c1d 0%, #1a1a3e 50%, #2d1b4e 100%);
}
.visual-element::before {
    content: '⚔️';
    font-size: 120px;
}
.title {
    color: #ffd700;
    text-shadow: 0 4px 20px rgba(255, 215, 0, 0.5);
}
```

#### 修仙风格
```css
.cover-container {
    background: linear-gradient(180deg, #0a1628 0%, #1a3a52 50%, #2d5a6b 100%);
}
.visual-element::before {
    content: '☯️';
    font-size: 120px;
}
.title {
    color: #87ceeb;
    text-shadow: 0 4px 20px rgba(135, 206, 235, 0.5);
}
```

#### 都市风格
```css
.cover-container {
    background: linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
}
.visual-element::before {
    content: '🏙️';
    font-size: 120px;
}
.title {
    color: #e94560;
    text-shadow: 0 4px 20px rgba(233, 69, 96, 0.5);
}
```

#### 科幻风格
```css
.cover-container {
    background: linear-gradient(180deg, #000428 0%, #004e92 100%);
}
.visual-element::before {
    content: '🚀';
    font-size: 120px;
}
.title {
    color: #00d4ff;
    text-shadow: 0 4px 20px rgba(0, 212, 255, 0.5);
}
```

#### 悬疑风格
```css
.cover-container {
    background: linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #2d2d2d 100%);
}
.visual-element::before {
    content: '🔍';
    font-size: 120px;
}
.title {
    color: #ff6b6b;
    text-shadow: 0 4px 20px rgba(255, 107, 107, 0.5);
}
```

#### 言情风格
```css
.cover-container {
    background: linear-gradient(180deg, #2d1b4e 0%, #1a1a3e 50%, #0f0f23 100%);
}
.visual-element::before {
    content: '💕';
    font-size: 120px;
}
.title {
    color: #ff69b4;
    text-shadow: 0 4px 20px rgba(255, 105, 180, 0.5);
}
```

### 封面生成流程

```
大纲确认后
    ↓
【必须】询问用户作者名
    → "请提供作者名（用于封面展示）："
    → 【禁止】使用"AI创作"等默认名
    ↓
分析小说核心主题
    → 主角能力/关键道具/核心冲突
    → 确定视觉元素（如：飞剑、系统面板、神兽等）
    ↓
选择题材配色方案
    → 修仙：青蓝+金色
    → 玄幻：紫黑+金色
    → 都市：深蓝+霓虹粉
    → 科幻：深空蓝+科技青
    ↓
生成封面 HTML
    → 600x800px 标准尺寸
    → 主题相关的视觉符号
    → 醒目的标题设计
    → 用户提供的作者名
    → 【禁止】下载按钮
    ↓
保存到 assets/cover.html
    ↓
展示给用户
    → 用户可自行截图保存
```

---

## 推广推文 HTML 生成

### 推文生成要求

#### 1. 结合整体小说大纲
- **必须**阅读 `outline/全局大纲.md` 和 `outline/全卷规划总览.md`
- 推文内容要体现小说的**核心卖点**和**主线剧情**
- 突出**主角特色**（能力、性格、成长轨迹）
- 体现**核心冲突**（主要矛盾、对手、目标）
- 展示**独特设定**（金手指、世界观、创新点）

#### 2. 推文吸引力原则
- **悬念型**：设置悬念，引发好奇（"当XXX发生时，所有人都惊呆了..."）
- **爽点型**：直接展示爽点（"开局XXX，直接无敌！"）
- **情感型**：触动情感共鸣（"从废物到巅峰，他只用了XXX天..."）
- **设定型**：突出独特设定（"这是一个XXX的世界，主角却..."）
- **对比型**：强烈反差（"别人XXX，他却XXX"）

#### 3. 推文内容规范
- 每条推文 50-150 字，适合社交媒体传播
- 包含 3-5 个相关话题标签（#XXX #XXX）
- 语言简洁有力，避免冗长
- 突出小说最吸引人的点
- **禁止**脱离小说实际内容，禁止夸大或虚假宣传

#### 4. 推文类型分配
- 1条 **悬念型** - 设置核心悬念
- 1条 **爽点型** - 展示核心爽点
- 1条 **设定型** - 介绍独特设定
- 1条 **情感型** - 触动读者情感
- 1条 **综合型** - 综合展示亮点

### 推文生成流程

```
大纲确认后
    ↓
读取全局大纲
    → 核心卖点
    → 主线剧情
    → 主角特色
    → 核心冲突
    → 独特设定
    ↓
读取全卷规划总览
    → 主角成长线
    → 关键剧情节点
    → 爽点分布
    ↓
生成5条推文
    → 悬念型（结合核心冲突）
    → 爽点型（结合主角能力）
    → 设定型（结合世界观）
    → 情感型（结合成长轨迹）
    → 综合型（综合亮点）
    ↓
检查推文质量
    → 是否贴合大纲？
    → 是否有吸引力？
    → 是否脱离主题？
    ↓
保存到 assets/tweets.html
    ↓
展示给用户
```

### 推文展示页面

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>《[小说名]》推广推文</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Microsoft YaHei', 'SimHei', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 40px 20px;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        
        h1 {
            text-align: center;
            color: white;
            font-size: 36px;
            margin-bottom: 40px;
            text-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }
        
        .tweet-card {
            background: white;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            transition: transform 0.3s;
        }
        
        .tweet-card:hover {
            transform: translateY(-5px);
        }
        
        .tweet-header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .tweet-type {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 14px;
            margin-right: 15px;
        }
        
        .tweet-title {
            font-size: 20px;
            font-weight: bold;
            color: #333;
        }
        
        .tweet-content {
            font-size: 18px;
            line-height: 1.8;
            color: #555;
            margin-bottom: 20px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #667eea;
        }
        
        .tweet-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .tweet-tag {
            background: #e3e3e3;
            padding: 5px 12px;
            border-radius: 15px;
            font-size: 14px;
            color: #666;
        }
        
        .tweet-platforms {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        
        .platform {
            padding: 5px 15px;
            border-radius: 5px;
            font-size: 13px;
            color: white;
        }
        
        .platform.weibo { background: #e6162d; }
        .platform.xiaohongshu { background: #ff2442; }
        .platform.douyin { background: #000; }
        .platform.zhihu { background: #0084ff; }
        
        .copy-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            font-size: 16px;
            cursor: pointer;
            margin-top: 15px;
            transition: all 0.3s;
        }
        
        .copy-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
        }
        
        .download-all {
            text-align: center;
            margin-top: 40px;
        }
        
        .download-btn {
            background: white;
            color: #667eea;
            border: none;
            padding: 15px 40px;
            border-radius: 30px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            transition: all 0.3s;
        }
        
        .download-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 30px rgba(0,0,0,0.3);
        }
        
        .toast {
            position: fixed;
            bottom: 50px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 15px 30px;
            border-radius: 30px;
            display: none;
            z-index: 1000;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>《[小说名]》推广推文</h1>
        
        <!-- 推文1 -->
        <div class="tweet-card">
            <div class="tweet-header">
                <span class="tweet-type">悬念型</span>
                <span class="tweet-title">引发好奇</span>
            </div>
            <div class="tweet-content" id="tweet1">
                [悬念型推文内容，100-200字]
            </div>
            <div class="tweet-tags">
                <span class="tweet-tag">#[标签1]</span>
                <span class="tweet-tag">#[标签2]</span>
                <span class="tweet-tag">#[标签3]</span>
            </div>
            <div class="tweet-platforms">
                <span class="platform weibo">微博</span>
                <span class="platform douyin">抖音</span>
            </div>
            <button class="copy-btn" onclick="copyTweet('tweet1')">复制推文</button>
        </div>
        
        <!-- 推文2 -->
        <div class="tweet-card">
            <div class="tweet-header">
                <span class="tweet-type">爽点型</span>
                <span class="tweet-title">突出爽文</span>
            </div>
            <div class="tweet-content" id="tweet2">
                [爽点型推文内容，100-200字]
            </div>
            <div class="tweet-tags">
                <span class="tweet-tag">#[标签1]</span>
                <span class="tweet-tag">#[标签2]</span>
            </div>
            <div class="tweet-platforms">
                <span class="platform xiaohongshu">小红书</span>
                <span class="platform douyin">抖音</span>
            </div>
            <button class="copy-btn" onclick="copyTweet('tweet2')">复制推文</button>
        </div>
        
        <!-- 推文3 -->
        <div class="tweet-card">
            <div class="tweet-header">
                <span class="tweet-type">情感型</span>
                <span class="tweet-title">引发共鸣</span>
            </div>
            <div class="tweet-content" id="tweet3">
                [情感型推文内容，100-200字]
            </div>
            <div class="tweet-tags">
                <span class="tweet-tag">#[标签1]</span>
                <span class="tweet-tag">#[标签2]</span>
            </div>
            <div class="tweet-platforms">
                <span class="platform zhihu">知乎</span>
                <span class="platform weibo">微博</span>
            </div>
            <button class="copy-btn" onclick="copyTweet('tweet3')">复制推文</button>
        </div>
        
        <div class="download-all">
            <button class="download-btn" onclick="downloadAll()">下载全部推文 (Markdown)</button>
        </div>
    </div>
    
    <div class="toast" id="toast">已复制到剪贴板！</div>
    
    <script>
        function copyTweet(id) {
            const content = document.getElementById(id).innerText;
            navigator.clipboard.writeText(content).then(() => {
                showToast();
            });
        }
        
        function showToast() {
            const toast = document.getElementById('toast');
            toast.style.display = 'block';
            setTimeout(() => {
                toast.style.display = 'none';
            }, 2000);
        }
        
        function downloadAll() {
            const tweets = [];
            for (let i = 1; i <= 3; i++) {
                tweets.push(document.getElementById('tweet' + i).innerText);
            }
            
            const markdown = `# 《[小说名]》推广推文\n\n## 推文1：悬念型\n${tweets[0]}\n\n## 推文2：爽点型\n${tweets[1]}\n\n## 推文3：情感型\n${tweets[2]}\n`;
            
            const blob = new Blob([markdown], { type: 'text/markdown' });
            const link = document.createElement('a');
            link.download = '[小说名]_推广推文.md';
            link.href = URL.createObjectURL(blob);
            link.click();
        }
    </script>
</body>
</html>
```

---

## 使用说明

### 在 Skill 中的实现

当大纲确认后，自动生成 HTML 文件：

```
【规则3】生成推广素材
    → 生成封面图 HTML → assets/cover.html
    → 生成推文 HTML → assets/tweets.html
    → 打开 HTML 文件展示给用户
    → 用户可以直接在浏览器中查看和下载
```

### 文件保存位置

```
[小说名]/
└── assets/
    ├── cover.html          # 封面图 HTML
    ├── cover.png           # 下载后的封面图（可选）
    ├── tweets.html         # 推文展示 HTML
    └── 推文/
        └── 推文.md         # Markdown 格式备份
```

### 用户操作流程

1. **查看封面**：打开 `cover.html`，预览封面效果
2. **下载封面**：点击"下载封面"按钮，保存为 PNG
3. **查看推文**：打开 `tweets.html`，查看所有推文
4. **复制推文**：点击"复制推文"按钮，直接复制内容
5. **下载全部**：点击"下载全部推文"，保存为 Markdown

---

## 封面设计规范

### 尺寸规范
- **标准尺寸**：600x800px（3:4 比例）
- **高清尺寸**：1200x1600px（用于高清展示）
- **下载尺寸**：用户可选择下载尺寸

### 内容规范
1. **书名**：醒目、易读、居中
2. **副标题**：一句话卖点，简洁有力
3. **视觉元素**：符合题材风格，有辨识度
4. **作者名**：清晰可见
5. **标签**：3-5个关键词标签

### 设计原则
- **色彩对比**：文字与背景有足够对比度
- **层次分明**：标题、副标题、视觉元素层次分明
- **风格统一**：与小说类型和风格保持一致
- **视觉冲击**：在缩略图尺寸下仍有吸引力

---

## 推文设计规范

### 推文类型
1. **悬念型**：引发好奇，适合悬疑、玄幻
2. **爽点型**：突出爽文元素，适合爽文、系统流
3. **情感型**：引发共鸣，适合言情、虐文
4. **设定型**：突出世界观，适合科幻、奇幻

### 推文结构
- **开头**：抓人眼球的第一句
- **中间**：核心内容，100-150字
- **结尾**：引导行动（点击阅读/追更）
- **标签**：3-5个相关标签

### 平台适配
- **微博**：适合悬念型、情感型
- **小红书**：适合爽点型、情感型
- **抖音**：适合悬念型、爽点型
- **知乎**：适合设定型、情感型

---

*HTML 生成器 v1.0*
*让推广素材更易用、更美观*
