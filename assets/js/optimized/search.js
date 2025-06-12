// ふらっと法務事務所 - 検索機能
// サイト内検索機能

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
            }
        } catch (error) {
            console.error('検索システムの初期化に失敗しました:', error);
        }
    }
    
    // 検索インデックスを読み込み
    async loadSearchIndex() {
        try {
            const response = await fetch('/search-index.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.documents = data.documents;
            
            // Lunr.jsで検索インデックスを構築
            if (typeof lunr !== 'undefined') {
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
            }
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
        if (!this.isInitialized) {
            this.clearResults();
            return;
        }
        
        if (!query) {
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

// 検索機能の初期化
document.addEventListener('DOMContentLoaded', function() {
    // 検索オーバーレイが存在する場合のみ初期化
    if (document.getElementById('search-overlay')) {
        // Lunr.jsライブラリの読み込み確認
        if (typeof lunr !== 'undefined') {
            window.siteSearch = new SiteSearch();
        } else {
            console.error('Lunr.jsライブラリが読み込まれていません');
            
            // Lunr.jsの動的読み込み
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/lunr/lunr.min.js';
            script.onload = function() {
                window.siteSearch = new SiteSearch();
            };
            document.head.appendChild(script);
        }
    }
});
