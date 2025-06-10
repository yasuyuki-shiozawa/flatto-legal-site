// 自動目次生成とスクロール追従機能
document.addEventListener('DOMContentLoaded', function() {
    generateTableOfContents();
    setupScrollSpy();
    setupSmoothScrolling();
});

// 目次の自動生成
function generateTableOfContents() {
    const tocContainer = document.getElementById('toc-container');
    if (!tocContainer) return;

    const headings = document.querySelectorAll('.main-content h2, .main-content h3, .main-content h4');
    if (headings.length === 0) {
        tocContainer.innerHTML = '<p class="no-toc">目次がありません</p>';
        return;
    }

    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';

    headings.forEach((heading, index) => {
        // 見出しにIDを設定（既存のIDがない場合）
        if (!heading.id) {
            heading.id = `heading-${index}`;
        }

        const listItem = document.createElement('li');
        const link = document.createElement('a');
        
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        link.className = `toc-${heading.tagName.toLowerCase()}`;
        link.setAttribute('data-target', heading.id);

        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });

    tocContainer.appendChild(tocList);
}

// スクロール追従（現在位置のハイライト）
function setupScrollSpy() {
    const tocLinks = document.querySelectorAll('.toc-container a[data-target]');
    if (tocLinks.length === 0) return;

    const headings = Array.from(document.querySelectorAll('.main-content h2, .main-content h3, .main-content h4'))
        .filter(h => h.id);

    function updateActiveLink() {
        let currentHeading = null;
        const scrollPosition = window.scrollY + 100; // オフセット

        // 現在のスクロール位置に最も近い見出しを見つける
        for (let i = headings.length - 1; i >= 0; i--) {
            const heading = headings[i];
            if (heading.offsetTop <= scrollPosition) {
                currentHeading = heading;
                break;
            }
        }

        // すべてのリンクからactiveクラスを削除
        tocLinks.forEach(link => link.classList.remove('active'));

        // 現在の見出しに対応するリンクにactiveクラスを追加
        if (currentHeading) {
            const activeLink = document.querySelector(`.toc-container a[data-target="${currentHeading.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }

    // スクロールイベントリスナー
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    });

    // 初期状態の設定
    updateActiveLink();
}

// スムーズスクロール
function setupSmoothScrolling() {
    const tocLinks = document.querySelectorAll('.toc-container a[href^="#"]');
    
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const offset = headerHeight + 20; // ヘッダー高さ + 余白
                
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// サイドバー検索機能
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('sidebar-search');
    const searchButton = document.querySelector('.search-button');
    
    if (searchInput && searchButton) {
        // 検索ボタンクリック
        searchButton.addEventListener('click', function() {
            performSearch();
        });
        
        // Enterキー押下
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            // 簡易検索実装（Google Site Search風）
            const searchUrl = `https://www.google.com/search?q=site:${window.location.hostname} ${encodeURIComponent(query)}`;
            window.open(searchUrl, '_blank');
        }
    }
});

// レスポンシブ対応
window.addEventListener('resize', function() {
    // ウィンドウサイズ変更時の処理
    const tocContainer = document.getElementById('toc-container');
    if (tocContainer && window.innerWidth <= 768) {
        // スマホサイズでは目次を非表示
        tocContainer.style.display = 'none';
    } else if (tocContainer) {
        tocContainer.style.display = 'block';
    }
});


// ===== サイト内検索機能 =====

// 検索システムの初期化
class SiteSearch {
    constructor() {
        this.searchIndex = null;
        this.documents = [];
        this.isInitialized = false;
        this.searchInput = null;
        this.searchResults = null;
        this.searchOverlay = null;
        
        this.init();
    }
    
    // 初期化
    async init() {
        try {
            // 検索インデックスを読み込み
            await this.loadSearchIndex();
            
            // DOM要素を取得
            this.searchInput = document.getElementById('search-modal-input');
            this.searchResults = document.getElementById('search-results');
            this.searchOverlay = document.getElementById('search-overlay');
            
            // サイドバーの検索ボックスも取得
            this.sidebarSearchInput = document.querySelector('.right-sidebar input[placeholder*="キーワード"]');
            
            if (this.searchInput) {
                this.setupEventListeners();
                this.isInitialized = true;
                console.log('サイト内検索が初期化されました');
            }
        } catch (error) {
            console.error('検索システムの初期化に失敗しました:', error);
        }
    }
    
    // 検索インデックスを読み込み
    async loadSearchIndex() {
        try {
            const response = await fetch('/search-index.json');
            const data = await response.json();
            this.documents = data.documents;
            
            // Lunr.jsで検索インデックスを構築
            this.searchIndex = lunr(function () {
                this.ref('id');
                this.field('title', { boost: 10 });
                this.field('content', { boost: 1 });
                this.field('excerpt', { boost: 5 });
                this.field('category', { boost: 3 });
                this.field('tags', { boost: 2 });
                
                // 日本語対応
                this.pipeline.remove(lunr.stemmer);
                this.searchPipeline.remove(lunr.stemmer);
                
                data.documents.forEach(function (doc) {
                    this.add(doc);
                }, this);
            });
            
            console.log(`検索インデックスを構築しました (${this.documents.length}件)`);
        } catch (error) {
            console.error('検索インデックスの読み込みに失敗しました:', error);
            throw error;
        }
    }
    
    // イベントリスナーを設定
    setupEventListeners() {
        // 検索入力イベント（モーダル内）
        this.searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            this.handleSearch(query);
        });
        
        // サイドバーの検索ボックスクリックでモーダルを開く
        if (this.sidebarSearchInput) {
            this.sidebarSearchInput.addEventListener('click', () => {
                this.showSearchOverlay();
                // フォーカスをモーダル内の検索ボックスに移動
                setTimeout(() => {
                    if (this.searchInput) {
                        this.searchInput.focus();
                    }
                }, 100);
            });
            
            this.sidebarSearchInput.addEventListener('focus', () => {
                this.showSearchOverlay();
                setTimeout(() => {
                    if (this.searchInput) {
                        this.searchInput.focus();
                    }
                }, 100);
            });
        }
        
        // フォーカス・ブラーイベント
        this.searchInput.addEventListener('focus', () => {
            this.showSearchOverlay();
        });
        
        // ESCキーで検索を閉じる
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideSearchOverlay();
            }
        });
        
        // オーバーレイクリックで閉じる
        if (this.searchOverlay) {
            this.searchOverlay.addEventListener('click', (e) => {
                if (e.target === this.searchOverlay) {
                    this.hideSearchOverlay();
                }
            });
        }
    }
    
    // 検索実行
    handleSearch(query) {
        if (!this.isInitialized || !query) {
            this.clearResults();
            return;
        }
        
        try {
            // 検索実行
            const results = this.searchIndex.search(query);
            
            // 結果を表示
            this.displayResults(results, query);
            
            // 検索統計を更新
            this.updateSearchStats(results.length, query);
            
        } catch (error) {
            console.error('検索エラー:', error);
            this.showError('検索中にエラーが発生しました');
        }
    }
    
    // 検索結果を表示
    displayResults(results, query) {
        if (!this.searchResults) return;
        
        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div class="search-no-results">
                    <i class="fas fa-search"></i>
                    <p>「${this.escapeHtml(query)}」に関する結果が見つかりませんでした</p>
                    <div class="search-suggestions">
                        <p>検索のヒント:</p>
                        <ul>
                            <li>キーワードを変更してみてください</li>
                            <li>より一般的な用語を使用してください</li>
                            <li>スペースで区切って複数のキーワードを試してください</li>
                        </ul>
                    </div>
                </div>
            `;
            return;
        }
        
        // 結果をHTMLに変換
        const resultsHtml = results.slice(0, 10).map(result => {
            const doc = this.documents.find(d => d.id === result.ref);
            if (!doc) return '';
            
            return `
                <div class="search-result-item" data-score="${result.score.toFixed(2)}">
                    <div class="search-result-header">
                        <h3 class="search-result-title">
                            <a href="${doc.url}">${this.highlightText(doc.title, query)}</a>
                        </h3>
                        <span class="search-result-category">${doc.category}</span>
                    </div>
                    <p class="search-result-excerpt">
                        ${this.highlightText(doc.excerpt, query)}
                    </p>
                    <div class="search-result-meta">
                        <span class="search-result-url">${doc.url}</span>
                        <span class="search-result-score">関連度: ${(result.score * 100).toFixed(0)}%</span>
                    </div>
                </div>
            `;
        }).join('');
        
        this.searchResults.innerHTML = `
            <div class="search-results-header">
                <h3>検索結果 (${results.length}件)</h3>
                <button class="search-close-btn" onclick="siteSearch.hideSearchOverlay()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="search-results-list">
                ${resultsHtml}
            </div>
        `;
    }
    
    // テキストをハイライト
    highlightText(text, query) {
        if (!query) return this.escapeHtml(text);
        
        const escapedText = this.escapeHtml(text);
        const escapedQuery = this.escapeHtml(query);
        const regex = new RegExp(`(${escapedQuery})`, 'gi');
        
        return escapedText.replace(regex, '<mark class="search-highlight">$1</mark>');
    }
    
    // HTMLエスケープ
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // 検索オーバーレイを表示
    showSearchOverlay() {
        if (this.searchOverlay) {
            this.searchOverlay.classList.add('active');
            document.body.classList.add('search-active');
        }
    }
    
    // 検索オーバーレイを非表示
    hideSearchOverlay() {
        if (this.searchOverlay) {
            this.searchOverlay.classList.remove('active');
            document.body.classList.remove('search-active');
        }
        this.clearResults();
        if (this.searchInput) {
            this.searchInput.value = '';
            this.searchInput.blur();
        }
    }
    
    // 結果をクリア
    clearResults() {
        if (this.searchResults) {
            this.searchResults.innerHTML = '';
        }
    }
    
    // エラー表示
    showError(message) {
        if (this.searchResults) {
            this.searchResults.innerHTML = `
                <div class="search-error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>${this.escapeHtml(message)}</p>
                </div>
            `;
        }
    }
    
    // 検索統計を更新
    updateSearchStats(resultCount, query) {
        // Google Analytics等に送信する場合
        if (typeof gtag !== 'undefined') {
            gtag('event', 'search', {
                search_term: query,
                result_count: resultCount
            });
        }
    }
}

// Lunr.jsライブラリの読み込み確認と初期化
function initializeSearch() {
    if (typeof lunr !== 'undefined') {
        window.siteSearch = new SiteSearch();
    } else {
        console.error('Lunr.jsライブラリが読み込まれていません');
    }
}

// DOMContentLoaded後に初期化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSearch);
} else {
    initializeSearch();
}

