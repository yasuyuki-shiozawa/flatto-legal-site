// 読み進み状況インジケーター
(function() {
    'use strict';
    
    // 設定
    const PROGRESS_CONFIG = {
        progressBarSelector: '#reading-progress-bar',
        backToTopSelector: '#back-to-top',
        articleSelector: '.article-content, .main-content',
        showBackToTopThreshold: 300,
        smoothScrollDuration: 500,
        readingTimeSelector: '.reading-time',
        wordsPerMinute: 400 // 日本語の平均読書速度
    };
    
    let progressBar;
    let backToTopBtn;
    let article;
    
    // 初期化
    function init() {
        // 要素の取得
        progressBar = document.querySelector(PROGRESS_CONFIG.progressBarSelector);
        backToTopBtn = document.querySelector(PROGRESS_CONFIG.backToTopSelector);
        article = document.querySelector(PROGRESS_CONFIG.articleSelector);
        
        if (!article) return;
        
        // プログレスバーの作成
        createProgressBar();
        
        // トップへ戻るボタンの作成
        createBackToTopButton();
        
        // 読了時間の計算と表示
        calculateReadingTime();
        
        // イベントリスナーの設定
        setupEventListeners();
        
        // 初期状態の更新
        updateProgress();
        updateBackToTopVisibility();
    }
    
    // プログレスバーの作成
    function createProgressBar() {
        if (progressBar) return;
        
        const progressContainer = document.createElement('div');
        progressContainer.className = 'reading-progress-container';
        progressContainer.innerHTML = `
            <div id="reading-progress-bar" class="reading-progress-bar">
                <div class="reading-progress-fill"></div>
                <div class="reading-progress-percentage">0%</div>
            </div>
        `;
        
        document.body.insertBefore(progressContainer, document.body.firstChild);
        progressBar = progressContainer.querySelector('#reading-progress-bar');
    }
    
    // トップへ戻るボタンの作成
    function createBackToTopButton() {
        if (backToTopBtn) return;
        
        backToTopBtn = document.createElement('button');
        backToTopBtn.id = 'back-to-top';
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = `
            <i class="fas fa-arrow-up"></i>
            <span class="back-to-top-text">トップへ</span>
            <svg class="back-to-top-progress" viewBox="0 0 36 36">
                <path class="back-to-top-progress-bg"
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path class="back-to-top-progress-fill"
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
            </svg>
        `;
        backToTopBtn.setAttribute('aria-label', 'ページトップへ戻る');
        
        document.body.appendChild(backToTopBtn);
    }
    
    // 読了時間の計算
    function calculateReadingTime() {
        const readingTimeElement = document.querySelector(PROGRESS_CONFIG.readingTimeSelector);
        if (!readingTimeElement || !article) return;
        
        // テキストの文字数を計算
        const text = article.textContent || '';
        const charCount = text.trim().length;
        
        // 読了時間を計算（分）
        const readingTime = Math.ceil(charCount / PROGRESS_CONFIG.wordsPerMinute);
        
        // 表示を更新
        readingTimeElement.innerHTML = `
            <i class="fas fa-clock"></i>
            <span>約${readingTime}分で読めます</span>
        `;
    }
    
    // イベントリスナーの設定
    function setupEventListeners() {
        // スクロールイベント
        let scrollTimer;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                updateProgress();
                updateBackToTopVisibility();
            }, 10);
        }, { passive: true });
        
        // リサイズイベント
        window.addEventListener('resize', debounce(() => {
            updateProgress();
        }, 250));
        
        // トップへ戻るボタンのクリック
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', scrollToTop);
        }
    }
    
    // プログレスの更新
    function updateProgress() {
        if (!article || !progressBar) return;
        
        const articleRect = article.getBoundingClientRect();
        const articleTop = articleRect.top + window.scrollY;
        const articleHeight = articleRect.height;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        
        // 記事の開始位置からの進捗を計算
        const scrolled = Math.max(0, scrollY - articleTop + windowHeight);
        const total = articleHeight;
        const progress = Math.min(100, (scrolled / total) * 100);
        
        // プログレスバーを更新
        const progressFill = progressBar.querySelector('.reading-progress-fill');
        const progressPercentage = progressBar.querySelector('.reading-progress-percentage');
        
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        
        if (progressPercentage) {
            progressPercentage.textContent = `${Math.round(progress)}%`;
            progressPercentage.style.opacity = progress > 5 ? '1' : '0';
        }
        
        // トップへ戻るボタンのプログレスも更新
        updateBackToTopProgress(progress);
        
        // 読了の通知
        if (progress >= 100 && !progressBar.classList.contains('completed')) {
            progressBar.classList.add('completed');
            showCompletionMessage();
        }
    }
    
    // トップへ戻るボタンの表示/非表示
    function updateBackToTopVisibility() {
        if (!backToTopBtn) return;
        
        const shouldShow = window.scrollY > PROGRESS_CONFIG.showBackToTopThreshold;
        backToTopBtn.classList.toggle('visible', shouldShow);
    }
    
    // トップへ戻るボタンのプログレス更新
    function updateBackToTopProgress(progress) {
        if (!backToTopBtn) return;
        
        const progressFill = backToTopBtn.querySelector('.back-to-top-progress-fill');
        if (!progressFill) return;
        
        const circumference = 2 * Math.PI * 15.9155;
        const offset = circumference - (progress / 100) * circumference;
        
        progressFill.style.strokeDasharray = `${circumference} ${circumference}`;
        progressFill.style.strokeDashoffset = offset;
    }
    
    // ページトップへスクロール
    function scrollToTop() {
        const duration = PROGRESS_CONFIG.smoothScrollDuration;
        const start = window.scrollY;
        const startTime = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = easeInOutCubic(progress);
            
            window.scrollTo(0, start * (1 - easeProgress));
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // 読了メッセージの表示
    function showCompletionMessage() {
        const message = document.createElement('div');
        message.className = 'reading-completion-message';
        message.innerHTML = `
            <div class="completion-content">
                <i class="fas fa-check-circle"></i>
                <span>記事を最後まで読んでいただき、ありがとうございました！</span>
            </div>
        `;
        
        document.body.appendChild(message);
        
        // アニメーション後に要素を削除
        setTimeout(() => {
            message.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => {
                message.remove();
            }, 300);
        }, 3000);
    }
    
    // スクロール位置の保存と復元
    function saveScrollPosition() {
        const articleId = article.dataset.articleId || window.location.pathname;
        const scrollPosition = window.scrollY;
        
        try {
            sessionStorage.setItem(`scroll-position-${articleId}`, scrollPosition);
        } catch (e) {
            console.error('Failed to save scroll position:', e);
        }
    }
    
    function restoreScrollPosition() {
        const articleId = article.dataset.articleId || window.location.pathname;
        
        try {
            const savedPosition = sessionStorage.getItem(`scroll-position-${articleId}`);
            if (savedPosition) {
                window.scrollTo(0, parseInt(savedPosition, 10));
            }
        } catch (e) {
            console.error('Failed to restore scroll position:', e);
        }
    }
    
    // ユーティリティ関数
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // ページ離脱時にスクロール位置を保存
    window.addEventListener('beforeunload', saveScrollPosition);
    
    // 初期化
    document.addEventListener('DOMContentLoaded', () => {
        init();
        
        // スクロール位置の復元
        setTimeout(restoreScrollPosition, 100);
    });
    
    // エクスポート
    window.ReadingProgress = {
        update: updateProgress,
        reset: () => {
            if (progressBar) {
                const progressFill = progressBar.querySelector('.reading-progress-fill');
                if (progressFill) {
                    progressFill.style.width = '0%';
                }
                progressBar.classList.remove('completed');
            }
        }
    };
})();