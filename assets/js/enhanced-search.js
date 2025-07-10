/**
 * 強化された検索機能
 * サイト内のページとブログ記事を検索
 */

class EnhancedSearch {
    constructor() {
        this.searchInput = document.getElementById('enhanced-search-input');
        this.searchResults = document.getElementById('search-results');
        this.searchSuggestions = document.getElementById('search-suggestions');
        this.searchFilters = document.getElementById('search-filters');
        this.clearButton = document.querySelector('.search-clear');
        
        // フィルター要素
        this.categoryFilter = document.getElementById('filter-category');
        this.dateFromFilter = document.getElementById('filter-date-from');
        this.dateToFilter = document.getElementById('filter-date-to');
        this.tagsFilter = document.getElementById('filter-tags');
        
        // 検索データ（enhanced-search.htmlで定義される）
        this.searchablePages = window.searchablePages || [];
        
        // 検索状態
        this.currentQuery = '';
        this.currentFilters = {
            category: '',
            dateFrom: '',
            dateTo: '',
            tags: []
        };
        
        this.init();
    }
    
    init() {
        if (!this.searchInput) return;
        
        // イベントリスナーの設定
        this.searchInput.addEventListener('input', this.handleSearch.bind(this));
        this.searchInput.addEventListener('focus', this.showSuggestions.bind(this));
        this.searchInput.addEventListener('keydown', this.handleKeydown.bind(this));
        
        if (this.clearButton) {
            this.clearButton.addEventListener('click', this.clearSearch.bind(this));
        }
        
        // フィルターの初期化
        this.initializeFilters();
        
        // クリック外でサジェストを閉じる
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                this.hideSuggestions();
            }
        });
        
        // URLパラメータから検索クエリを取得
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        if (query) {
            this.searchInput.value = query;
            this.performSearch(query);
        }
    }
    
    initializeFilters() {
        // カテゴリの収集と設定
        const categories = [...new Set(this.searchablePages.map(page => page.category))];
        if (this.categoryFilter) {
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                this.categoryFilter.appendChild(option);
            });
            
            this.categoryFilter.addEventListener('change', this.applyFilters.bind(this));
        }
        
        // タグの収集と設定
        const allTags = this.searchablePages.reduce((tags, page) => {
            return tags.concat(page.tags || []);
        }, []);
        const uniqueTags = [...new Set(allTags)];
        
        if (this.tagsFilter) {
            uniqueTags.forEach(tag => {
                const label = document.createElement('label');
                label.className = 'tag-filter';
                label.innerHTML = `
                    <input type="checkbox" name="tag" value="${tag}">
                    <span>${tag}</span>
                `;
                this.tagsFilter.appendChild(label);
            });
            
            this.tagsFilter.addEventListener('change', this.applyFilters.bind(this));
        }
        
        // 日付フィルターのイベント
        if (this.dateFromFilter) {
            this.dateFromFilter.addEventListener('change', this.applyFilters.bind(this));
        }
        if (this.dateToFilter) {
            this.dateToFilter.addEventListener('change', this.applyFilters.bind(this));
        }
    }
    
    handleSearch(e) {
        const query = e.target.value.trim();
        this.currentQuery = query;
        
        if (query.length > 0) {
            this.clearButton.style.display = 'block';
            this.showSuggestions();
            this.performSearch(query);
        } else {
            this.clearSearch();
        }
    }
    
    performSearch(query) {
        const results = this.searchPages(query);
        this.displayResults(results);
        
        // フィルターを表示
        if (this.searchFilters && results.length > 0) {
            this.searchFilters.style.display = 'block';
        }
    }
    
    searchPages(query) {
        const searchTerms = query.toLowerCase().split(/\s+/);
        
        let results = this.searchablePages.filter(page => {
            const searchableText = `${page.title} ${page.excerpt} ${page.content}`.toLowerCase();
            return searchTerms.every(term => searchableText.includes(term));
        });
        
        // スコアリング
        results = results.map(page => {
            let score = 0;
            const titleLower = page.title.toLowerCase();
            const excerptLower = (page.excerpt || '').toLowerCase();
            
            searchTerms.forEach(term => {
                // タイトルに含まれる場合は高スコア
                if (titleLower.includes(term)) score += 10;
                // 抜粋に含まれる場合は中スコア
                if (excerptLower.includes(term)) score += 5;
                // タグに含まれる場合
                if (page.tags && page.tags.some(tag => tag.toLowerCase().includes(term))) score += 3;
            });
            
            return { ...page, score };
        });
        
        // スコアでソート
        results.sort((a, b) => b.score - a.score);
        
        // フィルターを適用
        return this.applyFiltersToResults(results);
    }
    
    applyFiltersToResults(results) {
        return results.filter(page => {
            // カテゴリフィルター
            if (this.currentFilters.category && page.category !== this.currentFilters.category) {
                return false;
            }
            
            // 日付フィルター
            if (this.currentFilters.dateFrom && page.date < this.currentFilters.dateFrom) {
                return false;
            }
            if (this.currentFilters.dateTo && page.date > this.currentFilters.dateTo) {
                return false;
            }
            
            // タグフィルター
            if (this.currentFilters.tags.length > 0) {
                const pageTags = page.tags || [];
                if (!this.currentFilters.tags.some(tag => pageTags.includes(tag))) {
                    return false;
                }
            }
            
            return true;
        });
    }
    
    displayResults(results) {
        if (!this.searchResults) return;
        
        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>「${this.escapeHtml(this.currentQuery)}」に一致する結果が見つかりませんでした。</p>
                    <p class="text-sm text-muted">別のキーワードで検索してみてください。</p>
                </div>
            `;
            return;
        }
        
        const resultsHtml = `
            <div class="results-header">
                <h3>検索結果: ${results.length}件</h3>
            </div>
            <div class="results-list">
                ${results.map(page => this.createResultItem(page)).join('')}
            </div>
        `;
        
        this.searchResults.innerHTML = resultsHtml;
    }
    
    createResultItem(page) {
        const highlightedTitle = this.highlightSearchTerms(page.title, this.currentQuery);
        const highlightedExcerpt = this.highlightSearchTerms(page.excerpt || '', this.currentQuery);
        
        return `
            <article class="result-item">
                <h4 class="result-title">
                    <a href="${page.url}">${highlightedTitle}</a>
                </h4>
                ${page.category ? `<span class="result-category">${page.category}</span>` : ''}
                ${page.excerpt ? `<p class="result-excerpt">${highlightedExcerpt}</p>` : ''}
                <div class="result-meta">
                    ${page.date ? `<span class="result-date"><i class="fas fa-calendar"></i> ${this.formatDate(page.date)}</span>` : ''}
                    ${page.tags && page.tags.length > 0 ? `
                        <div class="result-tags">
                            ${page.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            </article>
        `;
    }
    
    showSuggestions() {
        if (!this.searchSuggestions || !this.currentQuery) return;
        
        const suggestions = this.getSuggestions(this.currentQuery);
        if (suggestions.length === 0) {
            this.hideSuggestions();
            return;
        }
        
        const suggestionsHtml = suggestions.map((suggestion, index) => `
            <div class="suggestion-item" data-index="${index}" role="option">
                <i class="fas fa-search"></i>
                <span>${this.highlightSearchTerms(suggestion.title, this.currentQuery)}</span>
            </div>
        `).join('');
        
        this.searchSuggestions.innerHTML = suggestionsHtml;
        this.searchSuggestions.style.display = 'block';
        
        // サジェストのクリックイベント
        this.searchSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const index = parseInt(item.dataset.index);
                window.location.href = suggestions[index].url;
            });
        });
    }
    
    hideSuggestions() {
        if (this.searchSuggestions) {
            this.searchSuggestions.style.display = 'none';
        }
    }
    
    getSuggestions(query) {
        const results = this.searchPages(query);
        return results.slice(0, 5); // 最大5件
    }
    
    handleKeydown(e) {
        // Enterキーで検索実行
        if (e.key === 'Enter') {
            e.preventDefault();
            this.hideSuggestions();
            // 検索結果ページへ遷移する場合
            // window.location.href = `/search/?q=${encodeURIComponent(this.currentQuery)}`;
        }
    }
    
    clearSearch() {
        this.searchInput.value = '';
        this.currentQuery = '';
        this.clearButton.style.display = 'none';
        this.hideSuggestions();
        if (this.searchResults) {
            this.searchResults.innerHTML = '';
        }
        if (this.searchFilters) {
            this.searchFilters.style.display = 'none';
        }
    }
    
    applyFilters() {
        // フィルター値を取得
        this.currentFilters.category = this.categoryFilter ? this.categoryFilter.value : '';
        this.currentFilters.dateFrom = this.dateFromFilter ? this.dateFromFilter.value : '';
        this.currentFilters.dateTo = this.dateToFilter ? this.dateToFilter.value : '';
        
        // タグフィルター
        const checkedTags = this.tagsFilter ? 
            Array.from(this.tagsFilter.querySelectorAll('input[name="tag"]:checked'))
                .map(input => input.value) : [];
        this.currentFilters.tags = checkedTags;
        
        // 再検索
        if (this.currentQuery) {
            this.performSearch(this.currentQuery);
        }
    }
    
    highlightSearchTerms(text, query) {
        if (!text || !query) return text;
        
        const searchTerms = query.split(/\s+/);
        let highlightedText = this.escapeHtml(text);
        
        searchTerms.forEach(term => {
            const regex = new RegExp(`(${this.escapeRegex(term)})`, 'gi');
            highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
        });
        
        return highlightedText;
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', () => {
    new EnhancedSearch();
});

// 検索ページのヘルパー関数
window.searchKeyword = function(keyword) {
    const searchInput = document.getElementById('enhanced-search-input');
    if (searchInput) {
        searchInput.value = keyword;
        searchInput.dispatchEvent(new Event('input'));
    }
};

window.resetFilters = function() {
    const search = window.enhancedSearchInstance;
    if (search) {
        // フィルターをリセット
        if (search.categoryFilter) search.categoryFilter.value = '';
        if (search.dateFromFilter) search.dateFromFilter.value = '';
        if (search.dateToFilter) search.dateToFilter.value = '';
        
        // タグのチェックを外す
        const tagCheckboxes = search.tagsFilter ? 
            search.tagsFilter.querySelectorAll('input[type="checkbox"]') : [];
        tagCheckboxes.forEach(checkbox => checkbox.checked = false);
        
        // フィルターを適用
        search.applyFilters();
    }
};

// グローバルインスタンスを保持
window.enhancedSearchInstance = new EnhancedSearch();