// おすすめコンテンツエンジン
// パーソナライズされたコンテンツ推薦

(function() {
    'use strict';

    // 推薦設定
    const RECOMMENDATION_CONFIG = {
        storageKey: 'nyusatsu-recommendations',
        contentKey: 'nyusatsu-content-index',
        maxRecommendations: 10,
        refreshInterval: 60000, // 1分
        algorithms: {
            collaborative: 0.4,  // 協調フィルタリング
            content: 0.4,        // コンテンツベース
            popularity: 0.2      // 人気度ベース
        },
        categories: {
            'basic': { weight: 1.0, keywords: ['制度', '基本', '概要', '仕組み'] },
            'qualification': { weight: 1.2, keywords: ['資格', '申請', '条件', '要件'] },
            'procedure': { weight: 1.1, keywords: ['手続き', '流れ', 'プロセス', '方法'] },
            'technical': { weight: 1.3, keywords: ['技術', '提案', '評価', '審査'] },
            'contract': { weight: 1.1, keywords: ['契約', '履行', '管理', '変更'] },
            'electronic': { weight: 1.2, keywords: ['電子', 'システム', 'オンライン'] }
        }
    };

    // コンテンツインデックス（実際の実装ではサーバーから取得）
    const SAMPLE_CONTENT = [
        {
            id: 'guide-001',
            title: '入札制度の基本概要',
            category: 'basic',
            tags: ['制度', '基本', '概要'],
            difficulty: 'beginner',
            readTime: 5,
            popularity: 0.9,
            lastUpdated: Date.now() - 86400000,
            url: '/guides/basic-overview/'
        },
        {
            id: 'guide-002',
            title: '参加資格の取得方法',
            category: 'qualification',
            tags: ['資格', '申請', '手続き'],
            difficulty: 'intermediate',
            readTime: 10,
            popularity: 0.85,
            lastUpdated: Date.now() - 172800000,
            url: '/guides/qualification/'
        },
        {
            id: 'guide-003',
            title: '技術提案書の書き方',
            category: 'technical',
            tags: ['技術', '提案', '書類'],
            difficulty: 'advanced',
            readTime: 15,
            popularity: 0.8,
            lastUpdated: Date.now() - 259200000,
            url: '/guides/technical-proposal/'
        },
        {
            id: 'case-001',
            title: 'IT調達の成功事例',
            category: 'technical',
            tags: ['事例', 'IT', '成功'],
            difficulty: 'intermediate',
            readTime: 8,
            popularity: 0.75,
            lastUpdated: Date.now() - 345600000,
            url: '/cases/it-success/'
        },
        {
            id: 'faq-001',
            title: '電子入札システムの使い方',
            category: 'electronic',
            tags: ['電子', 'システム', 'FAQ'],
            difficulty: 'beginner',
            readTime: 3,
            popularity: 0.95,
            lastUpdated: Date.now() - 432000000,
            url: '/faq/electronic-system/'
        }
    ];

    // 推薦エンジン
    class RecommendationEngine {
        constructor() {
            this.userProfile = null;
            this.contentIndex = this.loadContentIndex();
            this.userInteractions = this.loadUserInteractions();
            this.recommendations = [];
            this.init();
        }

        init() {
            // ユーザープロファイルが利用可能になるまで待つ
            this.waitForUserProfile(() => {
                this.generateRecommendations();
                this.setupRecommendationUI();
                this.startPeriodicUpdate();
            });
        }

        waitForUserProfile(callback) {
            if (window.userProfile) {
                this.userProfile = window.userProfile;
                callback();
            } else {
                setTimeout(() => this.waitForUserProfile(callback), 100);
            }
        }

        loadContentIndex() {
            const saved = localStorage.getItem(RECOMMENDATION_CONFIG.contentKey);
            return saved ? JSON.parse(saved) : SAMPLE_CONTENT;
        }

        loadUserInteractions() {
            const saved = localStorage.getItem(RECOMMENDATION_CONFIG.storageKey);
            return saved ? JSON.parse(saved) : {
                views: {},      // contentId: viewCount
                ratings: {},    // contentId: rating
                bookmarks: [],  // [contentId]
                searches: [],   // [searchTerm]
                clicks: {}      // contentId: clickCount
            };
        }

        saveUserInteractions() {
            localStorage.setItem(RECOMMENDATION_CONFIG.storageKey, JSON.stringify(this.userInteractions));
        }

        // メイン推薦生成
        generateRecommendations() {
            if (!this.userProfile) return;

            const profile = this.userProfile.getProfile();
            const history = this.userProfile.getHistory();
            
            // 各アルゴリズムでスコア計算
            const collaborativeScores = this.calculateCollaborativeScores(profile);
            const contentScores = this.calculateContentBasedScores(profile, history);
            const popularityScores = this.calculatePopularityScores();

            // 重み付き結合
            const finalScores = this.combineScores(collaborativeScores, contentScores, popularityScores);

            // 上位アイテムを選択
            this.recommendations = this.selectTopRecommendations(finalScores);
            
            this.updateRecommendationDisplay();
        }

        // 協調フィルタリング
        calculateCollaborativeScores(profile) {
            const scores = {};
            
            // 簡易的な協調フィルタリング
            // 実際の実装では、類似ユーザーのデータを使用
            this.contentIndex.forEach(content => {
                let score = 0;
                
                // ユーザーの興味分野との一致
                if (profile.interests.includes(content.category)) {
                    score += 0.8;
                }
                
                // 難易度の適合性
                const experienceMap = {
                    'beginner': { 'beginner': 1.0, 'intermediate': 0.3, 'advanced': 0.1 },
                    'intermediate': { 'beginner': 0.5, 'intermediate': 1.0, 'advanced': 0.7 },
                    'advanced': { 'beginner': 0.2, 'intermediate': 0.8, 'advanced': 1.0 },
                    'expert': { 'beginner': 0.1, 'intermediate': 0.6, 'advanced': 1.0 }
                };
                
                score *= experienceMap[profile.experience]?.[content.difficulty] || 0.5;
                
                scores[content.id] = score * RECOMMENDATION_CONFIG.algorithms.collaborative;
            });
            
            return scores;
        }

        // コンテンツベースフィルタリング
        calculateContentBasedScores(profile, history) {
            const scores = {};
            
            // 閲覧履歴からの学習
            const viewedCategories = this.extractCategoriesFromHistory(history);
            const categoryWeights = this.calculateCategoryWeights(viewedCategories);
            
            this.contentIndex.forEach(content => {
                let score = 0;
                
                // カテゴリマッチング
                const categoryWeight = categoryWeights[content.category] || 0;
                score += categoryWeight * RECOMMENDATION_CONFIG.categories[content.category]?.weight || 1;
                
                // タグマッチング
                const tagScore = this.calculateTagScore(content.tags, profile.interests);
                score += tagScore * 0.3;
                
                // 読了時間の適合性
                const timeScore = this.calculateTimeScore(content.readTime);
                score += timeScore * 0.2;
                
                // 既読コンテンツは除外
                if (this.userInteractions.views[content.id]) {
                    score *= 0.1;
                }
                
                scores[content.id] = score * RECOMMENDATION_CONFIG.algorithms.content;
            });
            
            return scores;
        }

        // 人気度ベース
        calculatePopularityScores() {
            const scores = {};
            
            this.contentIndex.forEach(content => {
                let score = content.popularity;
                
                // 新しさの考慮
                const daysSinceUpdate = (Date.now() - content.lastUpdated) / (1000 * 60 * 60 * 24);
                const freshnessScore = Math.max(0, 1 - daysSinceUpdate / 30); // 30日で減衰
                score += freshnessScore * 0.3;
                
                scores[content.id] = score * RECOMMENDATION_CONFIG.algorithms.popularity;
            });
            
            return scores;
        }

        // スコア結合
        combineScores(collaborative, content, popularity) {
            const combined = {};
            
            this.contentIndex.forEach(item => {
                combined[item.id] = 
                    (collaborative[item.id] || 0) +
                    (content[item.id] || 0) +
                    (popularity[item.id] || 0);
            });
            
            return combined;
        }

        // 上位推薦選択
        selectTopRecommendations(scores) {
            const sorted = Object.entries(scores)
                .sort(([,a], [,b]) => b - a)
                .slice(0, RECOMMENDATION_CONFIG.maxRecommendations);
            
            return sorted.map(([contentId, score]) => {
                const content = this.contentIndex.find(item => item.id === contentId);
                return {
                    ...content,
                    score: score,
                    reason: this.generateReasonText(content, score)
                };
            });
        }

        // ヘルパーメソッド
        extractCategoriesFromHistory(history) {
            const categories = {};
            history.forEach(item => {
                item.categories.forEach(cat => {
                    categories[cat] = (categories[cat] || 0) + 1;
                });
            });
            return categories;
        }

        calculateCategoryWeights(categories) {
            const total = Object.values(categories).reduce((sum, count) => sum + count, 0);
            const weights = {};
            
            Object.entries(categories).forEach(([cat, count]) => {
                weights[cat] = count / total;
            });
            
            return weights;
        }

        calculateTagScore(contentTags, userInterests) {
            let score = 0;
            const interestKeywords = userInterests.flatMap(interest => 
                RECOMMENDATION_CONFIG.categories[interest]?.keywords || []
            );
            
            contentTags.forEach(tag => {
                if (interestKeywords.some(keyword => tag.includes(keyword))) {
                    score += 1;
                }
            });
            
            return Math.min(score / contentTags.length, 1);
        }

        calculateTimeScore(readTime) {
            // 5-15分のコンテンツを優遇
            if (readTime >= 5 && readTime <= 15) {
                return 1.0;
            } else if (readTime < 5) {
                return 0.8;
            } else {
                return Math.max(0.3, 1 - (readTime - 15) / 30);
            }
        }

        generateReasonText(content, score) {
            const reasons = [];
            
            if (this.userProfile) {
                const profile = this.userProfile.getProfile();
                
                if (profile.interests.includes(content.category)) {
                    reasons.push('興味分野に一致');
                }
                
                if (content.popularity > 0.8) {
                    reasons.push('人気コンテンツ');
                }
                
                if (content.difficulty === profile.experience) {
                    reasons.push('難易度が適切');
                }
            }
            
            return reasons.length > 0 ? reasons.join(', ') : 'おすすめ';
        }

        // UI 関連
        setupRecommendationUI() {
            this.createRecommendationWidget();
            this.createRecommendationPage();
        }

        createRecommendationWidget() {
            // サイドバーウィジェット
            const widget = document.createElement('div');
            widget.className = 'recommendation-widget';
            widget.innerHTML = `
                <div class="widget-header">
                    <h3>おすすめコンテンツ</h3>
                    <button class="widget-refresh" aria-label="更新">
                        <i class="fas fa-sync"></i>
                    </button>
                </div>
                <div class="widget-content">
                    <div class="loading">読み込み中...</div>
                </div>
                <div class="widget-footer">
                    <a href="/recommendations/" class="view-all">すべて見る</a>
                </div>
            `;

            // サイドバーまたはフッターに挿入
            const sidebar = document.querySelector('.sidebar, aside');
            const target = sidebar || document.querySelector('footer');
            
            if (target) {
                target.appendChild(widget);
            }

            // 更新ボタン
            widget.querySelector('.widget-refresh').addEventListener('click', () => {
                this.generateRecommendations();
            });
        }

        createRecommendationPage() {
            // 推薦ページ用のコンテナを作成（既存ページに挿入される場合）
            const container = document.querySelector('#recommendations-container');
            if (container) {
                this.updateRecommendationPage(container);
            }
        }

        updateRecommendationDisplay() {
            this.updateWidget();
            this.updatePage();
        }

        updateWidget() {
            const widget = document.querySelector('.recommendation-widget .widget-content');
            if (!widget) return;

            const topRecommendations = this.recommendations.slice(0, 5);
            
            widget.innerHTML = topRecommendations.length > 0 ? `
                <div class="recommendation-list">
                    ${topRecommendations.map(item => `
                        <div class="recommendation-item" data-id="${item.id}">
                            <h4><a href="${item.url}">${item.title}</a></h4>
                            <div class="recommendation-meta">
                                <span class="category">${RECOMMENDATION_CONFIG.categories[item.category]?.keywords[0] || item.category}</span>
                                <span class="read-time">${item.readTime}分</span>
                                <span class="difficulty difficulty-${item.difficulty}">${this.translateDifficulty(item.difficulty)}</span>
                            </div>
                            <div class="recommendation-reason">${item.reason}</div>
                        </div>
                    `).join('')}
                </div>
            ` : '<div class="no-recommendations">推薦コンテンツがありません</div>';

            // クリック追跡
            widget.querySelectorAll('.recommendation-item a').forEach(link => {
                link.addEventListener('click', (e) => {
                    const item = e.target.closest('.recommendation-item');
                    this.trackClick(item.dataset.id);
                });
            });
        }

        updatePage() {
            const container = document.querySelector('#recommendations-container');
            if (!container) return;

            this.updateRecommendationPage(container);
        }

        updateRecommendationPage(container) {
            container.innerHTML = `
                <div class="recommendations-header">
                    <h2>あなたへのおすすめ</h2>
                    <div class="recommendations-filters">
                        <select id="rec-category-filter">
                            <option value="">すべてのカテゴリ</option>
                            ${Object.entries(RECOMMENDATION_CONFIG.categories).map(([key, value]) => 
                                `<option value="${key}">${value.keywords[0]}</option>`
                            ).join('')}
                        </select>
                        <select id="rec-difficulty-filter">
                            <option value="">すべての難易度</option>
                            <option value="beginner">初心者</option>
                            <option value="intermediate">中級者</option>
                            <option value="advanced">上級者</option>
                        </select>
                    </div>
                </div>
                
                <div class="recommendations-grid">
                    ${this.recommendations.map(item => `
                        <div class="recommendation-card" data-id="${item.id}">
                            <div class="card-header">
                                <span class="category-badge category-${item.category}">
                                    ${RECOMMENDATION_CONFIG.categories[item.category]?.keywords[0] || item.category}
                                </span>
                                <span class="difficulty-badge difficulty-${item.difficulty}">
                                    ${this.translateDifficulty(item.difficulty)}
                                </span>
                            </div>
                            
                            <h3><a href="${item.url}">${item.title}</a></h3>
                            
                            <div class="card-meta">
                                <span class="read-time">
                                    <i class="fas fa-clock"></i>
                                    ${item.readTime}分
                                </span>
                                <span class="popularity">
                                    <i class="fas fa-star"></i>
                                    ${Math.round(item.popularity * 100)}%
                                </span>
                            </div>
                            
                            <div class="recommendation-reason">
                                <i class="fas fa-lightbulb"></i>
                                ${item.reason}
                            </div>
                            
                            <div class="card-actions">
                                <button class="btn-bookmark" data-id="${item.id}">
                                    <i class="fas fa-bookmark"></i>
                                </button>
                                <a href="${item.url}" class="btn btn-primary">読む</a>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;

            this.attachPageEvents(container);
        }

        attachPageEvents(container) {
            // フィルター
            const categoryFilter = container.querySelector('#rec-category-filter');
            const difficultyFilter = container.querySelector('#rec-difficulty-filter');
            
            [categoryFilter, difficultyFilter].forEach(filter => {
                filter.addEventListener('change', () => {
                    this.applyFilters(container, categoryFilter.value, difficultyFilter.value);
                });
            });

            // ブックマーク
            container.querySelectorAll('.btn-bookmark').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleBookmark(btn.dataset.id);
                    btn.classList.toggle('bookmarked');
                });
            });

            // クリック追跡
            container.querySelectorAll('.recommendation-card a').forEach(link => {
                link.addEventListener('click', (e) => {
                    const card = e.target.closest('.recommendation-card');
                    this.trackClick(card.dataset.id);
                });
            });
        }

        applyFilters(container, category, difficulty) {
            const cards = container.querySelectorAll('.recommendation-card');
            
            cards.forEach(card => {
                const item = this.recommendations.find(r => r.id === card.dataset.id);
                if (!item) return;
                
                const categoryMatch = !category || item.category === category;
                const difficultyMatch = !difficulty || item.difficulty === difficulty;
                
                card.style.display = categoryMatch && difficultyMatch ? 'block' : 'none';
            });
        }

        // インタラクション追跡
        trackView(contentId) {
            this.userInteractions.views[contentId] = (this.userInteractions.views[contentId] || 0) + 1;
            this.saveUserInteractions();
        }

        trackClick(contentId) {
            this.userInteractions.clicks[contentId] = (this.userInteractions.clicks[contentId] || 0) + 1;
            this.saveUserInteractions();
        }

        trackRating(contentId, rating) {
            this.userInteractions.ratings[contentId] = rating;
            this.saveUserInteractions();
            
            // 評価後に推薦を更新
            setTimeout(() => this.generateRecommendations(), 1000);
        }

        toggleBookmark(contentId) {
            const index = this.userInteractions.bookmarks.indexOf(contentId);
            if (index > -1) {
                this.userInteractions.bookmarks.splice(index, 1);
            } else {
                this.userInteractions.bookmarks.push(contentId);
            }
            this.saveUserInteractions();
        }

        // 定期更新
        startPeriodicUpdate() {
            setInterval(() => {
                this.generateRecommendations();
            }, RECOMMENDATION_CONFIG.refreshInterval);
        }

        // ユーティリティ
        translateDifficulty(difficulty) {
            const map = {
                'beginner': '初心者',
                'intermediate': '中級者',
                'advanced': '上級者',
                'expert': '専門家'
            };
            return map[difficulty] || difficulty;
        }

        // 公開API
        getRecommendations() {
            return [...this.recommendations];
        }

        refreshRecommendations() {
            this.generateRecommendations();
        }

        addUserInteraction(type, contentId, data = null) {
            switch(type) {
                case 'view':
                    this.trackView(contentId);
                    break;
                case 'click':
                    this.trackClick(contentId);
                    break;
                case 'rating':
                    this.trackRating(contentId, data);
                    break;
                case 'bookmark':
                    this.toggleBookmark(contentId);
                    break;
            }
        }
    }

    // 初期化
    document.addEventListener('DOMContentLoaded', () => {
        window.recommendationEngine = new RecommendationEngine();
        
        // ページビュー追跡
        if (window.userProfile) {
            const contentId = document.querySelector('meta[name="content-id"]')?.content;
            if (contentId) {
                window.recommendationEngine.trackView(contentId);
            }
        }
    });

})();