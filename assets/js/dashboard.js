// パーソナルダッシュボード
// ユーザーの活動状況、統計、カスタマイズ可能なウィジェット

(function() {
    'use strict';

    // ダッシュボード設定
    const DASHBOARD_CONFIG = {
        storageKey: 'nyusatsu-dashboard',
        layoutKey: 'nyusatsu-dashboard-layout',
        updateInterval: 30000, // 30秒
        maxWidgets: 12,
        defaultLayout: [
            { id: 'welcome', position: { x: 0, y: 0, w: 6, h: 2 } },
            { id: 'activity', position: { x: 6, y: 0, w: 6, h: 3 } },
            { id: 'recommendations', position: { x: 0, y: 2, w: 6, h: 4 } },
            { id: 'bookmarks', position: { x: 6, y: 3, w: 6, h: 3 } },
            { id: 'progress', position: { x: 0, y: 6, w: 4, h: 2 } },
            { id: 'calendar', position: { x: 4, y: 6, w: 4, h: 2 } },
            { id: 'stats', position: { x: 8, y: 6, w: 4, h: 2 } }
        ],
        widgets: {
            welcome: {
                title: 'ようこそ',
                type: 'static',
                refreshable: false,
                configurable: false
            },
            activity: {
                title: '最近の活動',
                type: 'dynamic',
                refreshable: true,
                configurable: true
            },
            recommendations: {
                title: 'おすすめコンテンツ',
                type: 'dynamic',
                refreshable: true,
                configurable: true
            },
            bookmarks: {
                title: '最近のブックマーク',
                type: 'dynamic',
                refreshable: true,
                configurable: true
            },
            progress: {
                title: '学習進捗',
                type: 'dynamic',
                refreshable: true,
                configurable: true
            },
            calendar: {
                title: 'カレンダー',
                type: 'static',
                refreshable: false,
                configurable: true
            },
            stats: {
                title: '統計情報',
                type: 'dynamic',
                refreshable: true,
                configurable: false
            }
        }
    };

    // ダッシュボードマネージャー
    class DashboardManager {
        constructor() {
            this.layout = this.loadLayout();
            this.widgets = new Map();
            this.userProfile = null;
            this.isEditMode = false;
            this.init();
        }

        init() {
            this.waitForDependencies(() => {
                this.setupDashboard();
                this.loadWidgets();
                this.startAutoUpdate();
                this.bindEvents();
            });
        }

        waitForDependencies(callback) {
            const checkDependencies = () => {
                if (window.userProfile && window.recommendationEngine && window.bookmarkManager) {
                    this.userProfile = window.userProfile;
                    callback();
                } else {
                    setTimeout(checkDependencies, 100);
                }
            };
            checkDependencies();
        }

        loadLayout() {
            const saved = localStorage.getItem(DASHBOARD_CONFIG.layoutKey);
            return saved ? JSON.parse(saved) : DASHBOARD_CONFIG.defaultLayout;
        }

        saveLayout() {
            localStorage.setItem(DASHBOARD_CONFIG.layoutKey, JSON.stringify(this.layout));
        }

        setupDashboard() {
            const container = document.querySelector('#dashboard-container, .dashboard-container');
            if (!container) return;

            container.innerHTML = `
                <div class="dashboard-header">
                    <h1 class="dashboard-title">マイダッシュボード</h1>
                    <div class="dashboard-controls">
                        <button class="btn btn-secondary" id="dashboard-refresh">
                            <i class="fas fa-sync"></i>
                            更新
                        </button>
                        <button class="btn btn-secondary" id="dashboard-edit">
                            <i class="fas fa-edit"></i>
                            編集
                        </button>
                        <button class="btn btn-secondary" id="dashboard-add-widget">
                            <i class="fas fa-plus"></i>
                            ウィジェット追加
                        </button>
                    </div>
                </div>
                
                <div class="dashboard-grid" id="dashboard-grid">
                    ${this.renderWidgets()}
                </div>
                
                <div class="dashboard-edit-panel" id="edit-panel" style="display: none;">
                    <h3>ダッシュボード編集</h3>
                    <div class="edit-actions">
                        <button class="btn btn-secondary" id="reset-layout">レイアウトをリセット</button>
                        <button class="btn btn-primary" id="save-layout">保存</button>
                        <button class="btn btn-secondary" id="cancel-edit">キャンセル</button>
                    </div>
                </div>
            `;

            this.dashboardContainer = container;
            this.gridContainer = container.querySelector('#dashboard-grid');
        }

        renderWidgets() {
            return this.layout.map(item => {
                const widget = DASHBOARD_CONFIG.widgets[item.id];
                if (!widget) return '';

                return `
                    <div class="dashboard-widget" 
                         data-widget-id="${item.id}"
                         data-position='${JSON.stringify(item.position)}'>
                        <div class="widget-header">
                            <h3 class="widget-title">${widget.title}</h3>
                            <div class="widget-controls">
                                ${widget.refreshable ? '<button class="widget-refresh" title="更新"><i class="fas fa-sync"></i></button>' : ''}
                                ${widget.configurable ? '<button class="widget-config" title="設定"><i class="fas fa-cog"></i></button>' : ''}
                                <button class="widget-remove" title="削除"><i class="fas fa-times"></i></button>
                            </div>
                        </div>
                        <div class="widget-content" id="widget-${item.id}">
                            <div class="widget-loading">読み込み中...</div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        loadWidgets() {
            this.layout.forEach(item => {
                this.loadWidget(item.id);
            });
        }

        async loadWidget(widgetId) {
            const widgetElement = document.querySelector(`#widget-${widgetId}`);
            if (!widgetElement) return;

            try {
                const content = await this.generateWidgetContent(widgetId);
                widgetElement.innerHTML = content;
                this.widgets.set(widgetId, { loaded: true, lastUpdate: Date.now() });
            } catch (error) {
                console.error(`Widget ${widgetId} load error:`, error);
                widgetElement.innerHTML = '<div class="widget-error">読み込みに失敗しました</div>';
            }
        }

        async generateWidgetContent(widgetId) {
            switch (widgetId) {
                case 'welcome':
                    return this.generateWelcomeWidget();
                case 'activity':
                    return this.generateActivityWidget();
                case 'recommendations':
                    return this.generateRecommendationsWidget();
                case 'bookmarks':
                    return this.generateBookmarksWidget();
                case 'progress':
                    return this.generateProgressWidget();
                case 'calendar':
                    return this.generateCalendarWidget();
                case 'stats':
                    return this.generateStatsWidget();
                default:
                    return '<div class="widget-error">未知のウィジェットです</div>';
            }
        }

        generateWelcomeWidget() {
            const profile = this.userProfile.getProfile();
            const currentHour = new Date().getHours();
            let greeting;
            
            if (currentHour < 12) {
                greeting = 'おはようございます';
            } else if (currentHour < 18) {
                greeting = 'こんにちは';
            } else {
                greeting = 'こんばんは';
            }

            return `
                <div class="welcome-widget">
                    <div class="greeting">
                        <h2>${greeting}${profile.name ? '、' + profile.name + 'さん' : ''}！</h2>
                        <p class="welcome-message">今日も入札・公共調達の学習を頑張りましょう。</p>
                    </div>
                    
                    <div class="quick-stats">
                        <div class="stat-item">
                            <span class="stat-number">${this.userProfile.getHistory().length}</span>
                            <span class="stat-label">閲覧記事</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${window.bookmarkManager?.getBookmarks().length || 0}</span>
                            <span class="stat-label">ブックマーク</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${this.calculateStreak()}</span>
                            <span class="stat-label">連続日数</span>
                        </div>
                    </div>
                    
                    <div class="quick-actions">
                        <a href="/search/" class="quick-action">
                            <i class="fas fa-search"></i>
                            検索
                        </a>
                        <a href="/bookmarks/" class="quick-action">
                            <i class="fas fa-bookmark"></i>
                            ブックマーク
                        </a>
                        <a href="/guides/" class="quick-action">
                            <i class="fas fa-book"></i>
                            ガイド
                        </a>
                    </div>
                </div>
            `;
        }

        generateActivityWidget() {
            const history = this.userProfile.getHistory().slice(-5).reverse();
            
            return `
                <div class="activity-widget">
                    <div class="activity-list">
                        ${history.map(item => `
                            <div class="activity-item">
                                <div class="activity-icon">
                                    <i class="fas fa-eye"></i>
                                </div>
                                <div class="activity-content">
                                    <h4><a href="${item.url}">${item.title}</a></h4>
                                    <div class="activity-meta">
                                        <span class="activity-time">${this.formatRelativeTime(item.timestamp)}</span>
                                        ${item.timeSpent ? `<span class="activity-duration">${this.formatDuration(item.timeSpent)}</span>` : ''}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    ${history.length === 0 ? '<div class="no-activity">まだ活動がありません</div>' : ''}
                    
                    <div class="activity-footer">
                        <a href="/history/" class="view-all">すべての履歴を見る</a>
                    </div>
                </div>
            `;
        }

        generateRecommendationsWidget() {
            const recommendations = window.recommendationEngine?.getRecommendations().slice(0, 3) || [];
            
            return `
                <div class="recommendations-widget">
                    <div class="recommendation-list">
                        ${recommendations.map(item => `
                            <div class="recommendation-item">
                                <h4><a href="${item.url}">${item.title}</a></h4>
                                <div class="recommendation-meta">
                                    <span class="category">${item.category}</span>
                                    <span class="read-time">${item.readTime}分</span>
                                </div>
                                <div class="recommendation-reason">${item.reason}</div>
                            </div>
                        `).join('')}
                    </div>
                    
                    ${recommendations.length === 0 ? '<div class="no-recommendations">まだ推薦がありません</div>' : ''}
                    
                    <div class="widget-footer">
                        <a href="/recommendations/" class="view-all">すべて見る</a>
                    </div>
                </div>
            `;
        }

        generateBookmarksWidget() {
            const bookmarks = window.bookmarkManager?.getBookmarks()
                .sort((a, b) => b.created - a.created)
                .slice(0, 3) || [];
            
            return `
                <div class="bookmarks-widget">
                    <div class="bookmark-list">
                        ${bookmarks.map(bookmark => `
                            <div class="bookmark-item">
                                <h4><a href="${bookmark.url}">${bookmark.title}</a></h4>
                                <div class="bookmark-meta">
                                    <span class="bookmark-date">${this.formatDate(bookmark.created)}</span>
                                    ${bookmark.tags.length > 0 ? `<span class="bookmark-tags">${bookmark.tags.slice(0, 2).join(', ')}</span>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    ${bookmarks.length === 0 ? '<div class="no-bookmarks">まだブックマークがありません</div>' : ''}
                    
                    <div class="widget-footer">
                        <a href="/bookmarks/" class="view-all">すべて見る</a>
                    </div>
                </div>
            `;
        }

        generateProgressWidget() {
            const profile = this.userProfile.getProfile();
            const history = this.userProfile.getHistory();
            const categories = this.calculateCategoryProgress(history);
            
            return `
                <div class="progress-widget">
                    <div class="progress-overview">
                        <div class="progress-circle">
                            <div class="circle-progress" data-progress="${this.calculateOverallProgress()}">
                                <span class="progress-text">${this.calculateOverallProgress()}%</span>
                            </div>
                        </div>
                        <div class="progress-info">
                            <h4>学習進捗</h4>
                            <p>レベル: ${this.translateExperience(profile.experience)}</p>
                        </div>
                    </div>
                    
                    <div class="category-progress">
                        ${Object.entries(categories).slice(0, 3).map(([category, progress]) => `
                            <div class="category-item">
                                <span class="category-name">${category}</span>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${progress}%"></div>
                                </div>
                                <span class="progress-value">${progress}%</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        generateCalendarWidget() {
            const today = new Date();
            const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            
            return `
                <div class="calendar-widget">
                    <div class="calendar-header">
                        <h4>${today.getFullYear()}年${today.getMonth() + 1}月</h4>
                    </div>
                    
                    <div class="calendar-grid">
                        <div class="calendar-day-header">日</div>
                        <div class="calendar-day-header">月</div>
                        <div class="calendar-day-header">火</div>
                        <div class="calendar-day-header">水</div>
                        <div class="calendar-day-header">木</div>
                        <div class="calendar-day-header">金</div>
                        <div class="calendar-day-header">土</div>
                        
                        ${this.generateCalendarDays(startOfMonth, endOfMonth, today)}
                    </div>
                    
                    <div class="calendar-legend">
                        <div class="legend-item">
                            <span class="legend-color activity"></span>
                            <span>閲覧日</span>
                        </div>
                    </div>
                </div>
            `;
        }

        generateStatsWidget() {
            const history = this.userProfile.getHistory();
            const bookmarks = window.bookmarkManager?.getBookmarks() || [];
            
            const stats = {
                totalViews: history.length,
                totalBookmarks: bookmarks.length,
                averageTimeSpent: this.calculateAverageTimeSpent(history),
                mostViewedCategory: this.getMostViewedCategory(history),
                thisWeekViews: this.getThisWeekViews(history),
                streak: this.calculateStreak()
            };
            
            return `
                <div class="stats-widget">
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-eye"></i>
                            </div>
                            <div class="stat-info">
                                <span class="stat-number">${stats.totalViews}</span>
                                <span class="stat-label">総閲覧数</span>
                            </div>
                        </div>
                        
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-clock"></i>
                            </div>
                            <div class="stat-info">
                                <span class="stat-number">${Math.round(stats.averageTimeSpent / 60)}分</span>
                                <span class="stat-label">平均時間</span>
                            </div>
                        </div>
                        
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-fire"></i>
                            </div>
                            <div class="stat-info">
                                <span class="stat-number">${stats.streak}</span>
                                <span class="stat-label">連続日数</span>
                            </div>
                        </div>
                        
                        <div class="stat-card">
                            <div class="stat-icon">
                                <i class="fas fa-calendar-week"></i>
                            </div>
                            <div class="stat-info">
                                <span class="stat-number">${stats.thisWeekViews}</span>
                                <span class="stat-label">今週</span>
                            </div>
                        </div>
                    </div>
                    
                    ${stats.mostViewedCategory ? `
                        <div class="featured-category">
                            <strong>最も閲覧: </strong>${stats.mostViewedCategory}
                        </div>
                    ` : ''}
                </div>
            `;
        }

        // ユーティリティメソッド
        calculateStreak() {
            const history = this.userProfile.getHistory();
            if (history.length === 0) return 0;

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            let streak = 0;
            let currentDate = new Date(today);
            
            for (let i = 0; i < 365; i++) { // 最大365日まで
                const dayStart = currentDate.getTime();
                const dayEnd = dayStart + 24 * 60 * 60 * 1000;
                
                const hasActivity = history.some(item => 
                    item.timestamp >= dayStart && item.timestamp < dayEnd
                );
                
                if (hasActivity) {
                    streak++;
                    currentDate.setDate(currentDate.getDate() - 1);
                } else if (i === 0) {
                    // 今日の活動がない場合は昨日から開始
                    currentDate.setDate(currentDate.getDate() - 1);
                } else {
                    break;
                }
            }
            
            return streak;
        }

        calculateCategoryProgress(history) {
            const categories = {};
            const maxPerCategory = 10; // 各カテゴリで10記事読むと100%
            
            history.forEach(item => {
                item.categories.forEach(cat => {
                    categories[cat] = (categories[cat] || 0) + 1;
                });
            });
            
            Object.keys(categories).forEach(cat => {
                categories[cat] = Math.min(100, Math.round((categories[cat] / maxPerCategory) * 100));
            });
            
            return categories;
        }

        calculateOverallProgress() {
            const profile = this.userProfile.getProfile();
            const history = this.userProfile.getHistory();
            
            // 経験レベルと閲覧数から進捗を計算
            const experiencePoints = {
                'beginner': 25,
                'intermediate': 50,
                'advanced': 75,
                'expert': 100
            };
            
            const baseProgress = experiencePoints[profile.experience] || 0;
            const viewsBonus = Math.min(25, history.length); // 最大25%のボーナス
            
            return Math.min(100, baseProgress + viewsBonus);
        }

        calculateAverageTimeSpent(history) {
            if (history.length === 0) return 0;
            
            const totalTime = history.reduce((sum, item) => sum + (item.timeSpent || 0), 0);
            return totalTime / history.length;
        }

        getMostViewedCategory(history) {
            const categories = {};
            
            history.forEach(item => {
                item.categories.forEach(cat => {
                    categories[cat] = (categories[cat] || 0) + 1;
                });
            });
            
            const sorted = Object.entries(categories).sort(([,a], [,b]) => b - a);
            return sorted.length > 0 ? sorted[0][0] : null;
        }

        getThisWeekViews(history) {
            const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
            return history.filter(item => item.timestamp >= weekAgo).length;
        }

        generateCalendarDays(startOfMonth, endOfMonth, today) {
            const days = [];
            const startDay = startOfMonth.getDay();
            const daysInMonth = endOfMonth.getDate();
            
            // 前月の空白日
            for (let i = 0; i < startDay; i++) {
                days.push('<div class="calendar-day empty"></div>');
            }
            
            // 今月の日付
            for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth(), day);
                const isToday = date.toDateString() === today.toDateString();
                const hasActivity = this.hasActivityOnDate(date);
                
                const classes = [
                    'calendar-day',
                    isToday ? 'today' : '',
                    hasActivity ? 'has-activity' : ''
                ].filter(Boolean).join(' ');
                
                days.push(`<div class="${classes}">${day}</div>`);
            }
            
            return days.join('');
        }

        hasActivityOnDate(date) {
            const history = this.userProfile.getHistory();
            const dayStart = new Date(date).setHours(0, 0, 0, 0);
            const dayEnd = dayStart + 24 * 60 * 60 * 1000;
            
            return history.some(item => 
                item.timestamp >= dayStart && item.timestamp < dayEnd
            );
        }

        translateExperience(experience) {
            const map = {
                'beginner': '初心者',
                'intermediate': '中級者',
                'advanced': '上級者',
                'expert': '専門家'
            };
            return map[experience] || experience;
        }

        formatRelativeTime(timestamp) {
            const now = Date.now();
            const diff = now - timestamp;
            
            const minutes = Math.floor(diff / (1000 * 60));
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            
            if (minutes < 60) {
                return `${minutes}分前`;
            } else if (hours < 24) {
                return `${hours}時間前`;
            } else {
                return `${days}日前`;
            }
        }

        formatDuration(ms) {
            const seconds = Math.floor(ms / 1000);
            const minutes = Math.floor(seconds / 60);
            if (minutes > 0) {
                return `${minutes}分`;
            }
            return `${seconds}秒`;
        }

        formatDate(timestamp) {
            return new Date(timestamp).toLocaleDateString('ja-JP', {
                month: 'short',
                day: 'numeric'
            });
        }

        // イベント管理
        bindEvents() {
            if (!this.dashboardContainer) return;

            // 更新ボタン
            const refreshBtn = this.dashboardContainer.querySelector('#dashboard-refresh');
            if (refreshBtn) {
                refreshBtn.addEventListener('click', () => {
                    this.refreshAllWidgets();
                });
            }

            // 編集ボタン
            const editBtn = this.dashboardContainer.querySelector('#dashboard-edit');
            if (editBtn) {
                editBtn.addEventListener('click', () => {
                    this.toggleEditMode();
                });
            }

            // ウィジェット個別の更新
            this.dashboardContainer.addEventListener('click', (e) => {
                if (e.target.closest('.widget-refresh')) {
                    const widget = e.target.closest('.dashboard-widget');
                    const widgetId = widget.dataset.widgetId;
                    this.loadWidget(widgetId);
                }
            });

            // ウィジェット削除
            this.dashboardContainer.addEventListener('click', (e) => {
                if (e.target.closest('.widget-remove')) {
                    const widget = e.target.closest('.dashboard-widget');
                    const widgetId = widget.dataset.widgetId;
                    if (confirm('このウィジェットを削除しますか？')) {
                        this.removeWidget(widgetId);
                    }
                }
            });
        }

        refreshAllWidgets() {
            this.layout.forEach(item => {
                this.loadWidget(item.id);
            });
        }

        toggleEditMode() {
            this.isEditMode = !this.isEditMode;
            const editPanel = this.dashboardContainer.querySelector('#edit-panel');
            const editBtn = this.dashboardContainer.querySelector('#dashboard-edit');
            
            if (this.isEditMode) {
                editPanel.style.display = 'block';
                editBtn.textContent = '編集終了';
                this.dashboardContainer.classList.add('edit-mode');
            } else {
                editPanel.style.display = 'none';
                editBtn.innerHTML = '<i class="fas fa-edit"></i> 編集';
                this.dashboardContainer.classList.remove('edit-mode');
            }
        }

        removeWidget(widgetId) {
            this.layout = this.layout.filter(item => item.id !== widgetId);
            this.saveLayout();
            this.refreshDashboard();
        }

        refreshDashboard() {
            this.gridContainer.innerHTML = this.renderWidgets();
            this.loadWidgets();
        }

        startAutoUpdate() {
            setInterval(() => {
                if (!this.isEditMode) {
                    this.refreshAllWidgets();
                }
            }, DASHBOARD_CONFIG.updateInterval);
        }

        // 公開API
        addWidget(widgetId, position) {
            if (this.layout.length >= DASHBOARD_CONFIG.maxWidgets) {
                alert('ウィジェットの上限に達しています');
                return false;
            }
            
            const widget = DASHBOARD_CONFIG.widgets[widgetId];
            if (!widget) {
                console.error('Unknown widget:', widgetId);
                return false;
            }
            
            this.layout.push({
                id: widgetId,
                position: position || { x: 0, y: 0, w: 4, h: 2 }
            });
            
            this.saveLayout();
            this.refreshDashboard();
            return true;
        }

        getWidgetData(widgetId) {
            return this.widgets.get(widgetId);
        }

        updateWidget(widgetId) {
            this.loadWidget(widgetId);
        }
    }

    // 初期化
    document.addEventListener('DOMContentLoaded', () => {
        // ダッシュボードページでのみ初期化
        if (document.querySelector('#dashboard-container, .dashboard-container')) {
            window.dashboard = new DashboardManager();
        }
    });

})();