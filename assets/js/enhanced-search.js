// 強化された検索機能
(function() {
    'use strict';
    
    // 検索設定
    const SEARCH_CONFIG = {
        minSearchLength: 2,
        debounceDelay: 300,
        maxSuggestions: 10,
        maxResults: 20,
        highlightClass: 'search-highlight',
        searchHistoryKey: 'nyusatsu-search-history',
        maxHistoryItems: 10
    };
    
    // 検索インデックス（実際の実装では動的に生成）
    let searchIndex = [];
    let searchHistory = [];
    
    // DOM要素
    let searchInput;
    let searchSuggestions;
    let searchResults;
    let searchFilters;
    
    // 初期化
    function init() {
        // DOM要素の取得
        searchInput = document.getElementById('enhanced-search-input');
        searchSuggestions = document.getElementById('search-suggestions');
        searchResults = document.getElementById('search-results');
        searchFilters = document.getElementById('search-filters');
        
        if (!searchInput) return;
        
        // 検索履歴の読み込み
        loadSearchHistory();
        
        // 検索インデックスの構築
        buildSearchIndex();
        
        // イベントリスナーの設定
        setupEventListeners();
        
        // 検索フィルターの初期化
        initializeFilters();
    }
    
    // 検索インデックスの構築
    function buildSearchIndex() {
        // ページからコンテンツを収集（実際の実装では別途JSONファイルから読み込み）
        const pages = document.querySelectorAll('[data-searchable]');
        
        searchIndex = Array.from(pages).map(page => ({
            title: page.dataset.title || '',
            content: page.textContent || '',
            url: page.dataset.url || '',
            category: page.dataset.category || '',
            tags: (page.dataset.tags || '').split(','),
            date: page.dataset.date || '',
            excerpt: page.dataset.excerpt || ''
        }));
    }
    
    // イベントリスナーの設定
    function setupEventListeners() {
        // 検索入力のイベント
        searchInput.addEventListener('input', debounce(handleSearchInput, SEARCH_CONFIG.debounceDelay));
        searchInput.addEventListener('focus', showSearchHistory);
        searchInput.addEventListener('keydown', handleKeyNavigation);
        
        // クリックイベントで検索候補を閉じる
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                hideSuggestions();
            }
        });
        
        // フィルターのイベント
        if (searchFilters) {
            searchFilters.addEventListener('change', performSearch);
        }
    }
    
    // 検索入力の処理
    function handleSearchInput(e) {
        const query = e.target.value.trim();
        
        if (query.length < SEARCH_CONFIG.minSearchLength) {
            hideSuggestions();
            clearResults();
            return;
        }
        
        // サジェストの表示
        showSuggestions(query);
        
        // 検索実行
        performSearch();
    }
    
    // サジェストの表示
    function showSuggestions(query) {
        const suggestions = generateSuggestions(query);
        
        if (suggestions.length === 0) {
            hideSuggestions();
            return;
        }
        
        const html = suggestions.map((suggestion, index) => `
            <li class="search-suggestion-item" data-index="${index}">
                <i class="fas fa-search"></i>
                <span class="suggestion-text">${highlightMatch(suggestion.text, query)}</span>
                <span class="suggestion-type">${suggestion.type}</span>
            </li>
        `).join('');
        
        searchSuggestions.innerHTML = `<ul class="search-suggestions-list">${html}</ul>`;
        searchSuggestions.style.display = 'block';
        
        // サジェストアイテムのクリックイベント
        searchSuggestions.querySelectorAll('.search-suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                searchInput.value = item.querySelector('.suggestion-text').textContent;
                performSearch();
                hideSuggestions();
            });
        });
    }
    
    // サジェストの生成
    function generateSuggestions(query) {
        const suggestions = [];
        const lowerQuery = query.toLowerCase();
        
        // 検索履歴から
        searchHistory.forEach(historyItem => {
            if (historyItem.toLowerCase().includes(lowerQuery)) {
                suggestions.push({
                    text: historyItem,
                    type: '履歴'
                });
            }
        });
        
        // タイトルから
        searchIndex.forEach(item => {
            if (item.title.toLowerCase().includes(lowerQuery)) {
                suggestions.push({
                    text: item.title,
                    type: 'ページ'
                });
            }
        });
        
        // タグから
        const tagSuggestions = new Set();
        searchIndex.forEach(item => {
            item.tags.forEach(tag => {
                if (tag.toLowerCase().includes(lowerQuery)) {
                    tagSuggestions.add(tag);
                }
            });
        });
        
        tagSuggestions.forEach(tag => {
            suggestions.push({
                text: tag,
                type: 'タグ'
            });
        });
        
        // 重複を除去して上限数まで返す
        const uniqueSuggestions = suggestions.filter((item, index, self) =>
            index === self.findIndex(t => t.text === item.text)
        );
        
        return uniqueSuggestions.slice(0, SEARCH_CONFIG.maxSuggestions);
    }
    
    // 検索実行
    function performSearch() {
        const query = searchInput.value.trim();
        
        if (query.length < SEARCH_CONFIG.minSearchLength) {
            clearResults();
            return;
        }
        
        // 検索履歴に追加
        addToSearchHistory(query);
        
        // フィルターの取得
        const filters = getActiveFilters();
        
        // 検索実行
        const results = searchInIndex(query, filters);
        
        // 結果表示
        displayResults(results, query);
    }
    
    // インデックス内検索
    function searchInIndex(query, filters) {
        const lowerQuery = query.toLowerCase();
        const words = lowerQuery.split(/\s+/);
        
        return searchIndex
            .filter(item => {
                // フィルター適用
                if (filters.category && item.category !== filters.category) {
                    return false;
                }
                
                if (filters.dateFrom && item.date < filters.dateFrom) {
                    return false;
                }
                
                if (filters.dateTo && item.date > filters.dateTo) {
                    return false;
                }
                
                if (filters.tags && filters.tags.length > 0) {
                    const hasTag = filters.tags.some(tag => item.tags.includes(tag));
                    if (!hasTag) return false;
                }
                
                // キーワード検索
                const searchableText = `${item.title} ${item.content} ${item.tags.join(' ')}`.toLowerCase();
                return words.every(word => searchableText.includes(word));
            })
            .map(item => {
                // スコア計算
                let score = 0;
                words.forEach(word => {
                    if (item.title.toLowerCase().includes(word)) score += 3;
                    if (item.excerpt.toLowerCase().includes(word)) score += 2;
                    if (item.content.toLowerCase().includes(word)) score += 1;
                });
                
                return { ...item, score };
            })
            .sort((a, b) => b.score - a.score)
            .slice(0, SEARCH_CONFIG.maxResults);
    }
    
    // 結果表示
    function displayResults(results, query) {
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="search-no-results">
                    <i class="fas fa-search"></i>
                    <p>「${escapeHtml(query)}」に一致する結果が見つかりませんでした。</p>
                    <ul class="search-tips">
                        <li>キーワードを変更してみてください</li>
                        <li>フィルターを解除してみてください</li>
                        <li>より一般的な用語で検索してみてください</li>
                    </ul>
                </div>
            `;
            return;
        }
        
        const html = `
            <div class="search-results-header">
                <h3>検索結果: ${results.length}件</h3>
                <button class="btn btn-sm btn-ghost" onclick="clearSearch()">
                    <i class="fas fa-times"></i>
                    クリア
                </button>
            </div>
            <ul class="search-results-list">
                ${results.map(result => `
                    <li class="search-result-item">
                        <a href="${result.url}" class="search-result-link">
                            <h4 class="search-result-title">
                                ${highlightMatch(result.title, query)}
                            </h4>
                            <p class="search-result-excerpt">
                                ${highlightMatch(result.excerpt || result.content.substring(0, 150) + '...', query)}
                            </p>
                            <div class="search-result-meta">
                                <span class="search-result-category">
                                    <i class="fas fa-folder"></i>
                                    ${result.category}
                                </span>
                                ${result.date ? `
                                    <span class="search-result-date">
                                        <i class="fas fa-calendar"></i>
                                        ${formatDate(result.date)}
                                    </span>
                                ` : ''}
                                ${result.tags.length > 0 ? `
                                    <span class="search-result-tags">
                                        <i class="fas fa-tags"></i>
                                        ${result.tags.slice(0, 3).join(', ')}
                                    </span>
                                ` : ''}
                            </div>
                        </a>
                    </li>
                `).join('')}
            </ul>
        `;
        
        searchResults.innerHTML = html;
        searchResults.style.display = 'block';
    }
    
    // マッチ部分のハイライト
    function highlightMatch(text, query) {
        const words = query.split(/\s+/).filter(w => w.length > 0);
        let highlightedText = text;
        
        words.forEach(word => {
            const regex = new RegExp(`(${escapeRegex(word)})`, 'gi');
            highlightedText = highlightedText.replace(regex, `<mark class="${SEARCH_CONFIG.highlightClass}">$1</mark>`);
        });
        
        return highlightedText;
    }
    
    // 検索履歴の管理
    function loadSearchHistory() {
        try {
            const saved = localStorage.getItem(SEARCH_CONFIG.searchHistoryKey);
            searchHistory = saved ? JSON.parse(saved) : [];
        } catch (e) {
            searchHistory = [];
        }
    }
    
    function addToSearchHistory(query) {
        // 重複を削除
        searchHistory = searchHistory.filter(item => item !== query);
        
        // 先頭に追加
        searchHistory.unshift(query);
        
        // 上限を超えたら削除
        if (searchHistory.length > SEARCH_CONFIG.maxHistoryItems) {
            searchHistory = searchHistory.slice(0, SEARCH_CONFIG.maxHistoryItems);
        }
        
        // 保存
        try {
            localStorage.setItem(SEARCH_CONFIG.searchHistoryKey, JSON.stringify(searchHistory));
        } catch (e) {
            console.error('Failed to save search history:', e);
        }
    }
    
    function showSearchHistory() {
        if (searchInput.value.trim().length > 0) return;
        
        if (searchHistory.length === 0) return;
        
        const html = `
            <div class="search-history">
                <div class="search-history-header">
                    <span>最近の検索</span>
                    <button class="btn-link" onclick="clearSearchHistory()">クリア</button>
                </div>
                <ul class="search-suggestions-list">
                    ${searchHistory.map((item, index) => `
                        <li class="search-suggestion-item" data-history-index="${index}">
                            <i class="fas fa-history"></i>
                            <span class="suggestion-text">${escapeHtml(item)}</span>
                            <button class="btn-remove" onclick="removeFromHistory(${index})">
                                <i class="fas fa-times"></i>
                            </button>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
        
        searchSuggestions.innerHTML = html;
        searchSuggestions.style.display = 'block';
    }
    
    // フィルター機能
    function initializeFilters() {
        if (!searchFilters) return;
        
        // カテゴリフィルター
        const categories = [...new Set(searchIndex.map(item => item.category))];
        const categorySelect = searchFilters.querySelector('#filter-category');
        
        if (categorySelect) {
            categorySelect.innerHTML = `
                <option value="">すべてのカテゴリ</option>
                ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
            `;
        }
        
        // タグフィルター
        const allTags = [...new Set(searchIndex.flatMap(item => item.tags))];
        const tagContainer = searchFilters.querySelector('#filter-tags');
        
        if (tagContainer) {
            tagContainer.innerHTML = allTags.map(tag => `
                <label class="filter-tag">
                    <input type="checkbox" name="tag" value="${tag}">
                    <span>${tag}</span>
                </label>
            `).join('');
        }
    }
    
    function getActiveFilters() {
        if (!searchFilters) return {};
        
        const filters = {};
        
        // カテゴリ
        const categorySelect = searchFilters.querySelector('#filter-category');
        if (categorySelect && categorySelect.value) {
            filters.category = categorySelect.value;
        }
        
        // 日付範囲
        const dateFrom = searchFilters.querySelector('#filter-date-from');
        const dateTo = searchFilters.querySelector('#filter-date-to');
        
        if (dateFrom && dateFrom.value) {
            filters.dateFrom = dateFrom.value;
        }
        
        if (dateTo && dateTo.value) {
            filters.dateTo = dateTo.value;
        }
        
        // タグ
        const checkedTags = searchFilters.querySelectorAll('input[name="tag"]:checked');
        if (checkedTags.length > 0) {
            filters.tags = Array.from(checkedTags).map(input => input.value);
        }
        
        return filters;
    }
    
    // キーボードナビゲーション
    function handleKeyNavigation(e) {
        const suggestions = searchSuggestions.querySelectorAll('.search-suggestion-item');
        if (suggestions.length === 0) return;
        
        let currentIndex = Array.from(suggestions).findIndex(item => item.classList.contains('active'));
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                currentIndex = currentIndex < suggestions.length - 1 ? currentIndex + 1 : 0;
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                currentIndex = currentIndex > 0 ? currentIndex - 1 : suggestions.length - 1;
                break;
                
            case 'Enter':
                e.preventDefault();
                if (currentIndex >= 0) {
                    suggestions[currentIndex].click();
                } else {
                    performSearch();
                }
                break;
                
            case 'Escape':
                hideSuggestions();
                searchInput.blur();
                break;
                
            default:
                return;
        }
        
        // アクティブな項目を更新
        suggestions.forEach((item, index) => {
            item.classList.toggle('active', index === currentIndex);
        });
    }
    
    // ユーティリティ関数
    function hideSuggestions() {
        if (searchSuggestions) {
            searchSuggestions.style.display = 'none';
        }
    }
    
    function clearResults() {
        if (searchResults) {
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
        }
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    function escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ja-JP');
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
    
    // グローバル関数
    window.clearSearch = function() {
        searchInput.value = '';
        clearResults();
        hideSuggestions();
    };
    
    window.clearSearchHistory = function() {
        searchHistory = [];
        localStorage.removeItem(SEARCH_CONFIG.searchHistoryKey);
        hideSuggestions();
    };
    
    window.removeFromHistory = function(index) {
        searchHistory.splice(index, 1);
        localStorage.setItem(SEARCH_CONFIG.searchHistoryKey, JSON.stringify(searchHistory));
        showSearchHistory();
    };
    
    // 初期化
    document.addEventListener('DOMContentLoaded', init);
})();