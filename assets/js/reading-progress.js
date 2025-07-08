// 読了時間計算と進捗バー表示
document.addEventListener('DOMContentLoaded', function() {
    // 読了時間の計算
    const articleContent = document.querySelector('.article-content');
    const readingTimeElement = document.querySelector('.reading-time');
    
    if (articleContent && readingTimeElement) {
        // テキストを取得して単語数を計算（日本語対応）
        const text = articleContent.textContent || '';
        const charCount = text.length;
        // 日本語の平均読書速度：400-600文字/分
        const wordsPerMinute = 500;
        const readingTime = Math.ceil(charCount / wordsPerMinute);
        
        readingTimeElement.innerHTML = `<i class="fas fa-clock"></i> ${readingTime}分で読了`;
    }
    
    // 読書進捗バーの作成
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress-bar';
    progressBar.innerHTML = '<div class="reading-progress-fill"></div>';
    document.body.appendChild(progressBar);
    
    // 進捗バーのスタイルを追加
    const style = document.createElement('style');
    style.textContent = `
        .reading-progress-bar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: rgba(0, 0, 0, 0.1);
            z-index: 9999;
            transition: opacity 0.3s ease;
        }
        
        .reading-progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%);
            width: 0%;
            transition: width 0.3s ease;
        }
        
        .reading-progress-bar.hidden {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
    
    // スクロール時の進捗更新
    function updateProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        
        const progressFill = document.querySelector('.reading-progress-fill');
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
        
        // スクロールが最上部の場合は進捗バーを非表示
        if (scrolled <= 50) {
            progressBar.classList.add('hidden');
        } else {
            progressBar.classList.remove('hidden');
        }
    }
    
    // スクロールイベントの最適化
    let scrollTimer;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(updateProgress, 10);
    });
    
    // 初期状態の設定
    updateProgress();
    
    // ウィンドウリサイズ時も更新
    window.addEventListener('resize', updateProgress);
});