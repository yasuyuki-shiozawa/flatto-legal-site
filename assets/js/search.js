// サイト内検索機能
class SiteSearch {
    constructor() {
        this.searchData = [];
        this.currentResults = [];
        this.currentFilter = 'all';
        this.searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
        
        this.initializeElements();
        this.loadSearchData();
        this.bindEvents();
        this.updatePopularSearches();
    }
    
    initializeElements() {
        this.searchInput = document.getElementById('searchInput');
        this.searchButton = document.getElementById('searchButton');
        this.searchClear = document.getElementById('searchClear');
        this.searchSuggestions = document.getElementById('searchSuggestions');
        this.suggestionsList = document.getElementById('suggestionsList');
        this.popularSearches = document.getElementById('popularSearches');
        this.searchResults = document.getElementById('searchResults');
        this.resultsList = document.getElementById('resultsList');
        this.resultsTitle = document.getElementById('resultsTitle');
        this.resultsCount = document.getElementById('resultsCount');
        this.noResults = document.getElementById('noResults');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.popularTags = document.querySelectorAll('.popular-tag');
    }
    
    async loadSearchData() {
        // 検索対象データの定義
        this.searchData = [
            {
                title: "入札のやり方完全ガイド",
                url: "/knowhow/",
                excerpt: "入札の始め方を初心者にも分かりやすく完全解説。入札のやり方・参加方法・必要な手続きを行政書士が基本から実践まで詳しく解説。",
                category: "ガイド",
                type: "guides",
                keywords: ["入札", "始め方", "やり方", "初心者", "参加方法", "手続き"]
            },
            {
                title: "入札参加資格の取得方法",
                url: "/qualification/",
                excerpt: "入札参加資格の申請代行を初心者にも分かりやすく完全サポート。全省庁統一資格・地方自治体資格の取得方法から必要書類まで詳しく解説。",
                category: "申請・手続き",
                type: "pages",
                keywords: ["入札参加資格", "申請", "代行", "全省庁統一資格", "地方自治体", "必要書類"]
            },
            {
                title: "専門サポートサービス",
                url: "/service/",
                excerpt: "入札参加資格の代行サービスなら実績豊富な行政書士にお任せ。全省庁統一資格・地方自治体資格の申請代行から入札参加サポートまで。",
                category: "サービス",
                type: "pages",
                keywords: ["代行サービス", "行政書士", "サポート", "申請代行", "入札支援"]
            },
            {
                title: "電子入札システムの活用方法",
                url: "/denshi-nyusatsu/",
                excerpt: "電子入札システムの使い方を初心者向けに完全解説。登録方法から入札手続きまで、行政書士が分かりやすく説明します。",
                category: "システム・手続き",
                type: "guides",
                keywords: ["電子入札", "システム", "使い方", "登録方法", "手続き"]
            },
            {
                title: "随意契約の活用方法",
                url: "/zuii-keiyaku/",
                excerpt: "随意契約の基本から活用方法まで、行政書士が詳しく解説。一般競争入札との違いや適用条件について分かりやすく説明。",
                category: "契約・制度",
                type: "guides",
                keywords: ["随意契約", "活用方法", "一般競争入札", "適用条件", "制度"]
            },
            {
                title: "最新動向・トレンド",
                url: "/trends/",
                excerpt: "入札・公共調達の最新動向とトレンドを定期更新。制度変更や新しい取り組みについて、専門家の視点で解説します。",
                category: "情報・動向",
                type: "articles",
                keywords: ["最新動向", "トレンド", "制度変更", "公共調達", "専門家"]
            },
            {
                title: "事例研究・ケーススタディ",
                url: "/case-studies/",
                excerpt: "実際の入札事例を詳しく分析。成功事例から学ぶポイントや失敗を避けるための注意点を具体的に解説します。",
                category: "事例・分析",
                type: "articles",
                keywords: ["事例研究", "ケーススタディ", "成功事例", "失敗", "分析"]
            },
            {
                title: "用語集・辞典",
                url: "/dictionary/",
                excerpt: "入札・公共調達に関する専門用語を分かりやすく解説。初心者から専門家まで役立つ包括的な用語集です。",
                category: "参考資料",
                type: "pages",
                keywords: ["用語集", "辞典", "専門用語", "解説", "参考資料"]
            },
            {
                title: "よくある質問（FAQ）",
                url: "/faq/",
                excerpt: "入札参加資格や申請手続きに関するよくある質問と回答をまとめました。疑問解決にお役立てください。",
                category: "サポート",
                type: "pages",
                keywords: ["FAQ", "よくある質問", "疑問", "回答", "サポート"]
            },
            {
                title: "動画解説・講座",
                url: "/videos/",
                excerpt: "入札の基本から実践まで、動画で分かりやすく解説。視覚的に学べる充実のコンテンツをご用意しています。",
                category: "学習コンテンツ",
                type: "articles",
                keywords: ["動画", "解説", "講座", "学習", "視覚的"]
            }
        ];
    }
    
    bindEvents() {
        // 検索入力イベント
        this.searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            this.handleSearchInput(query);
        });
        
        // 検索ボタンクリック
        this.searchButton.addEventListener('click', () => {
            this.performSearch();
        });
        
        // Enterキー押下
        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.performSearch();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateSuggestions('down');
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateSuggestions('up');
            } else if (e.key === 'Escape') {
                this.hideSuggestions();
            }
        });
        
        // クリアボタン
        this.searchClear.addEventListener('click', () => {
            this.clearSearch();
        });
        
        // フィルターボタン
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });
        
        // 人気タグクリック
        this.popularTags.forEach(tag => {
            tag.addEventListener('click', (e) => {
                const searchTerm = e.target.dataset.search;
                this.searchInput.value = searchTerm;
                this.performSearch();
            });
        });
        
        // 外部クリックで候補を非表示
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-component')) {
                this.hideSuggestions();
            }
        });
        
        // フォーカス時に人気検索を表示
        this.searchInput.addEventListener('focus', () => {
            if (!this.searchInput.value.trim()) {
                this.showPopularSearches();
            }
        });
    }
    
    handleSearchInput(query) {
        if (query.length === 0) {
            this.searchClear.style.display = 'none';
            this.showPopularSearches();
            return;
        }
        
        this.searchClear.style.display = 'block';
        
        if (query.length >= 2) {
            this.showSuggestions(query);
        } else {
            this.hideSuggestions();
        }
    }
    
    showSuggestions(query) {
        const suggestions = this.generateSuggestions(query);
        
        if (suggestions.length === 0) {
            this.hideSuggestions();
            return;
        }
        
        this.suggestionsList.innerHTML = '';
        
        suggestions.forEach((suggestion, index) => {
            const li = document.createElement('li');
            li.className = 'suggestion-item';
            li.innerHTML = `
                <i class="fas fa-search"></i>
                <span>${this.highlightMatch(suggestion, query)}</span>
            `;
            
            li.addEventListener('click', () => {
                this.searchInput.value = suggestion;
                this.performSearch();
            });
            
            this.suggestionsList.appendChild(li);
        });
        
        this.searchSuggestions.style.display = 'block';
        this.popularSearches.style.display = 'none';
    }
    
    generateSuggestions(query) {
        const suggestions = new Set();
        const queryLower = query.toLowerCase();
        
        // タイトルからの候補
        this.searchData.forEach(item => {
            if (item.title.toLowerCase().includes(queryLower)) {
                suggestions.add(item.title);
            }
        });
        
        // キーワードからの候補
        this.searchData.forEach(item => {
            item.keywords.forEach(keyword => {
                if (keyword.toLowerCase().includes(queryLower)) {
                    suggestions.add(keyword);
                }
            });
        });
        
        // 検索履歴からの候補
        this.searchHistory.forEach(term => {
            if (term.toLowerCase().includes(queryLower)) {
                suggestions.add(term);
            }
        });
        
        return Array.from(suggestions).slice(0, 8);
    }
    
    highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<strong>$1</strong>');
    }
    
    hideSuggestions() {
        this.searchSuggestions.style.display = 'none';
        this.popularSearches.style.display = 'block';
    }
    
    showPopularSearches() {
        this.hideSuggestions();
        this.popularSearches.style.display = 'block';
    }
    
    navigateSuggestions(direction) {
        const items = this.suggestionsList.querySelectorAll('.suggestion-item');
        if (items.length === 0) return;
        
        const current = this.suggestionsList.querySelector('.suggestion-item.active');
        let index = current ? Array.from(items).indexOf(current) : -1;
        
        if (current) {
            current.classList.remove('active');
        }
        
        if (direction === 'down') {
            index = (index + 1) % items.length;
        } else {
            index = index <= 0 ? items.length - 1 : index - 1;
        }
        
        items[index].classList.add('active');
        this.searchInput.value = items[index].textContent.trim();
    }
    
    performSearch() {
        const query = this.searchInput.value.trim();
        if (!query) return;
        
        this.addToSearchHistory(query);
        this.hideSuggestions();
        
        const results = this.searchContent(query);
        this.displayResults(results, query);
        
        // 分析用のイベント送信
        if (typeof gtag !== 'undefined') {
            gtag('event', 'search', {
                search_term: query,
                results_count: results.length
            });
        }
    }
    
    searchContent(query) {
        const queryLower = query.toLowerCase();
        const results = [];
        
        this.searchData.forEach(item => {
            let score = 0;
            let matchedText = '';
            
            // タイトルマッチ（高スコア）
            if (item.title.toLowerCase().includes(queryLower)) {
                score += 10;
                matchedText = item.title;
            }
            
            // キーワードマッチ（中スコア）
            item.keywords.forEach(keyword => {
                if (keyword.toLowerCase().includes(queryLower)) {
                    score += 5;
                }
            });
            
            // 本文マッチ（低スコア）
            if (item.excerpt.toLowerCase().includes(queryLower)) {
                score += 2;
                if (!matchedText) {
                    matchedText = item.excerpt;
                }
            }
            
            if (score > 0) {
                results.push({
                    ...item,
                    score,
                    matchedText: matchedText || item.excerpt
                });
            }
        });
        
        // スコア順でソート
        return results.sort((a, b) => b.score - a.score);
    }
    
    displayResults(results, query) {
        this.currentResults = results;
        
        if (results.length === 0) {
            this.showNoResults(query);
            return;
        }
        
        this.resultsTitle.textContent = `"${query}" の検索結果`;
        this.resultsCount.textContent = `${results.length}件見つかりました`;
        
        this.renderResults(results);
        this.searchResults.style.display = 'block';
        this.noResults.style.display = 'none';
        
        // 結果までスクロール
        this.searchResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    renderResults(results) {
        const filteredResults = this.currentFilter === 'all' 
            ? results 
            : results.filter(item => item.type === this.currentFilter);
        
        this.resultsList.innerHTML = '';
        
        filteredResults.forEach(item => {
            const resultDiv = document.createElement('div');
            resultDiv.className = 'result-item';
            resultDiv.innerHTML = `
                <a href="${item.url}" class="result-title">${item.title}</a>
                <p class="result-excerpt">${this.highlightMatch(item.matchedText, this.searchInput.value)}</p>
                <div class="result-meta">
                    <span class="result-category">${item.category}</span>
                    <span class="result-url">${item.url}</span>
                </div>
            `;
            
            this.resultsList.appendChild(resultDiv);
        });
        
        // フィルター数を更新
        this.updateFilterCounts(results);
    }
    
    updateFilterCounts(results) {
        const counts = {
            all: results.length,
            pages: results.filter(r => r.type === 'pages').length,
            articles: results.filter(r => r.type === 'articles').length,
            guides: results.filter(r => r.type === 'guides').length
        };
        
        this.filterBtns.forEach(btn => {
            const filter = btn.dataset.filter;
            const count = counts[filter] || 0;
            btn.textContent = `${this.getFilterLabel(filter)} (${count})`;
        });
    }
    
    getFilterLabel(filter) {
        const labels = {
            all: 'すべて',
            pages: 'ページ',
            articles: '記事',
            guides: 'ガイド'
        };
        return labels[filter] || filter;
    }
    
    showNoResults(query) {
        this.searchResults.style.display = 'block';
        this.noResults.style.display = 'block';
        this.resultsList.style.display = 'none';
        this.resultsTitle.textContent = `"${query}" の検索結果`;
        this.resultsCount.textContent = '0件';
    }
    
    setFilter(filter) {
        this.currentFilter = filter;
        
        // アクティブ状態を更新
        this.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        // 結果を再描画
        if (this.currentResults.length > 0) {
            this.renderResults(this.currentResults);
        }
    }
    
    clearSearch() {
        this.searchInput.value = '';
        this.searchClear.style.display = 'none';
        this.searchResults.style.display = 'none';
        this.hideSuggestions();
        this.showPopularSearches();
        this.searchInput.focus();
    }
    
    addToSearchHistory(query) {
        // 重複を削除
        this.searchHistory = this.searchHistory.filter(term => term !== query);
        // 先頭に追加
        this.searchHistory.unshift(query);
        // 最大10件まで保持
        this.searchHistory = this.searchHistory.slice(0, 10);
        // ローカルストレージに保存
        localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
    }
    
    updatePopularSearches() {
        // 検索履歴に基づいて人気検索を動的更新（将来の拡張用）
        // 現在は静的なタグを使用
    }
}

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('searchComponent')) {
        new SiteSearch();
    }
});

// エクスポート（モジュール使用時）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SiteSearch;
}

