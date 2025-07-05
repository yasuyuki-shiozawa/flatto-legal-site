// ユーザープロファイル管理
// 設定保存、閲覧履歴、興味分野、個人設定

(function() {
    'use strict';

    // プロファイル設定
    const PROFILE_CONFIG = {
        storageKey: 'nyusatsu-user-profile',
        historyKey: 'nyusatsu-history',
        preferencesKey: 'nyusatsu-preferences',
        maxHistoryItems: 50,
        categories: {
            'basic': '基本制度',
            'qualification': '参加資格',
            'procedure': '手続き',
            'technical': '技術提案',
            'contract': '契約・履行',
            'electronic': '電子入札',
            'construction': '建設工事',
            'services': '業務委託',
            'goods': '物品調達'
        },
        regions: {
            'national': '国',
            'tokyo': '東京都',
            'osaka': '大阪府',
            'aichi': '愛知県',
            'kanagawa': '神奈川県',
            'saitama': '埼玉県',
            'chiba': '千葉県',
            'other': 'その他'
        },
        companyTypes: {
            'individual': '個人事業主',
            'small': '中小企業',
            'medium': '中堅企業',
            'large': '大企業',
            'nonprofit': '非営利団体',
            'consultant': 'コンサルタント'
        }
    };

    // ユーザープロファイルマネージャー
    class UserProfileManager {
        constructor() {
            this.profile = this.loadProfile();
            this.history = this.loadHistory();
            this.preferences = this.loadPreferences();
            this.init();
        }

        init() {
            this.trackPageViews();
            this.setupProfileUI();
            this.applyUserPreferences();
            this.startRecommendationEngine();
        }

        loadProfile() {
            const saved = localStorage.getItem(PROFILE_CONFIG.storageKey);
            return saved ? JSON.parse(saved) : {
                id: this.generateUserId(),
                name: '',
                email: '',
                company: '',
                companyType: '',
                interests: [],
                regions: [],
                experience: 'beginner',
                notifications: true,
                newsletter: false,
                created: Date.now(),
                lastActive: Date.now()
            };
        }

        loadHistory() {
            const saved = localStorage.getItem(PROFILE_CONFIG.historyKey);
            return saved ? JSON.parse(saved) : [];
        }

        loadPreferences() {
            const saved = localStorage.getItem(PROFILE_CONFIG.preferencesKey);
            return saved ? JSON.parse(saved) : {
                theme: 'auto',
                language: 'ja',
                dateFormat: 'YYYY/MM/DD',
                timezone: 'Asia/Tokyo',
                displayDensity: 'normal',
                autoSave: true,
                showTips: true,
                contentFilter: 'all'
            };
        }

        saveProfile() {
            this.profile.lastActive = Date.now();
            localStorage.setItem(PROFILE_CONFIG.storageKey, JSON.stringify(this.profile));
        }

        saveHistory() {
            localStorage.setItem(PROFILE_CONFIG.historyKey, JSON.stringify(this.history));
        }

        savePreferences() {
            localStorage.setItem(PROFILE_CONFIG.preferencesKey, JSON.stringify(this.preferences));
            this.applyUserPreferences();
        }

        generateUserId() {
            return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        }

        // ページビューの追跡
        trackPageViews() {
            const currentPage = {
                url: window.location.pathname,
                title: document.title,
                timestamp: Date.now(),
                categories: this.extractPageCategories(),
                timeSpent: 0
            };

            // 前のページの滞在時間を計算
            if (this.history.length > 0) {
                const lastPage = this.history[this.history.length - 1];
                if (!lastPage.timeSpent) {
                    lastPage.timeSpent = Date.now() - lastPage.timestamp;
                }
            }

            // 履歴に追加
            this.addToHistory(currentPage);

            // ページ離脱時の処理
            window.addEventListener('beforeunload', () => {
                currentPage.timeSpent = Date.now() - currentPage.timestamp;
                this.updateHistoryItem(currentPage);
            });

            // フォーカス管理
            this.trackPageFocus(currentPage);
        }

        extractPageCategories() {
            const categories = [];
            const pathname = window.location.pathname.toLowerCase();
            const content = document.body.textContent.toLowerCase();

            // URLから推測
            Object.entries(PROFILE_CONFIG.categories).forEach(([key, value]) => {
                if (pathname.includes(key) || content.includes(value)) {
                    categories.push(key);
                }
            });

            // メタタグから取得
            const keywords = document.querySelector('meta[name="keywords"]');
            if (keywords) {
                const metaKeywords = keywords.content.toLowerCase();
                Object.keys(PROFILE_CONFIG.categories).forEach(key => {
                    if (metaKeywords.includes(key)) {
                        categories.push(key);
                    }
                });
            }

            return [...new Set(categories)];
        }

        trackPageFocus(currentPage) {
            let isVisible = true;
            let focusTime = Date.now();

            const handleVisibilityChange = () => {
                if (document.hidden) {
                    if (isVisible) {
                        currentPage.timeSpent += Date.now() - focusTime;
                        isVisible = false;
                    }
                } else {
                    if (!isVisible) {
                        focusTime = Date.now();
                        isVisible = true;
                    }
                }
            };

            document.addEventListener('visibilitychange', handleVisibilityChange);
        }

        addToHistory(pageData) {
            // 同じページの連続アクセスは無視
            if (this.history.length > 0 && this.history[this.history.length - 1].url === pageData.url) {
                return;
            }

            this.history.push(pageData);

            // 履歴の上限管理
            if (this.history.length > PROFILE_CONFIG.maxHistoryItems) {
                this.history = this.history.slice(-PROFILE_CONFIG.maxHistoryItems);
            }

            this.saveHistory();
            this.updateInterests(pageData.categories);
        }

        updateHistoryItem(pageData) {
            const lastIndex = this.history.length - 1;
            if (lastIndex >= 0 && this.history[lastIndex].url === pageData.url) {
                this.history[lastIndex] = { ...this.history[lastIndex], ...pageData };
                this.saveHistory();
            }
        }

        updateInterests(categories) {
            categories.forEach(category => {
                if (!this.profile.interests.includes(category)) {
                    this.profile.interests.push(category);
                }
            });
            this.saveProfile();
        }

        // プロファイルUIの設定
        setupProfileUI() {
            this.createProfileButton();
            this.createProfileModal();
        }

        createProfileButton() {
            const button = document.createElement('button');
            button.className = 'profile-button';
            button.innerHTML = '<i class="fas fa-user-circle"></i>';
            button.setAttribute('aria-label', 'ユーザープロファイル');
            button.setAttribute('title', 'プロファイル設定');
            
            button.addEventListener('click', () => {
                this.showProfileModal();
            });

            // ヘッダーに追加
            const header = document.querySelector('header, .header');
            if (header) {
                header.appendChild(button);
            } else {
                document.body.appendChild(button);
            }
        }

        createProfileModal() {
            const modal = document.createElement('div');
            modal.className = 'profile-modal';
            modal.innerHTML = `
                <div class="profile-modal-overlay"></div>
                <div class="profile-modal-content">
                    <div class="profile-modal-header">
                        <h2>ユーザープロファイル</h2>
                        <button class="profile-modal-close" aria-label="閉じる">&times;</button>
                    </div>
                    
                    <div class="profile-tabs">
                        <button class="profile-tab active" data-tab="basic">基本情報</button>
                        <button class="profile-tab" data-tab="interests">興味分野</button>
                        <button class="profile-tab" data-tab="preferences">設定</button>
                        <button class="profile-tab" data-tab="history">履歴</button>
                    </div>
                    
                    <div class="profile-tab-content">
                        ${this.generateBasicTab()}
                        ${this.generateInterestsTab()}
                        ${this.generatePreferencesTab()}
                        ${this.generateHistoryTab()}
                    </div>
                    
                    <div class="profile-modal-actions">
                        <button class="btn btn-secondary" id="profile-export">データエクスポート</button>
                        <button class="btn btn-danger" id="profile-reset">リセット</button>
                        <button class="btn btn-primary" id="profile-save">保存</button>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
            this.attachProfileEvents(modal);
        }

        generateBasicTab() {
            return `
                <div class="profile-tab-panel" data-panel="basic">
                    <form class="profile-form">
                        <div class="form-group">
                            <label for="profile-name">お名前</label>
                            <input type="text" id="profile-name" value="${this.profile.name}">
                        </div>
                        
                        <div class="form-group">
                            <label for="profile-email">メールアドレス</label>
                            <input type="email" id="profile-email" value="${this.profile.email}">
                        </div>
                        
                        <div class="form-group">
                            <label for="profile-company">会社名・団体名</label>
                            <input type="text" id="profile-company" value="${this.profile.company}">
                        </div>
                        
                        <div class="form-group">
                            <label for="profile-company-type">事業者種別</label>
                            <select id="profile-company-type">
                                <option value="">選択してください</option>
                                ${Object.entries(PROFILE_CONFIG.companyTypes)
                                    .map(([key, value]) => 
                                        `<option value="${key}" ${this.profile.companyType === key ? 'selected' : ''}>${value}</option>`
                                    ).join('')}
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="profile-experience">入札経験</label>
                            <select id="profile-experience">
                                <option value="beginner" ${this.profile.experience === 'beginner' ? 'selected' : ''}>初心者</option>
                                <option value="intermediate" ${this.profile.experience === 'intermediate' ? 'selected' : ''}>中級者</option>
                                <option value="advanced" ${this.profile.experience === 'advanced' ? 'selected' : ''}>上級者</option>
                                <option value="expert" ${this.profile.experience === 'expert' ? 'selected' : ''}>専門家</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>通知設定</label>
                            <div class="checkbox-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="profile-notifications" ${this.profile.notifications ? 'checked' : ''}>
                                    <span>重要な更新の通知</span>
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" id="profile-newsletter" ${this.profile.newsletter ? 'checked' : ''}>
                                    <span>メールマガジンの受信</span>
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
            `;
        }

        generateInterestsTab() {
            return `
                <div class="profile-tab-panel" data-panel="interests" style="display: none;">
                    <h3>興味のある分野</h3>
                    <p>関心のある分野を選択してください。おすすめコンテンツの表示に利用されます。</p>
                    
                    <div class="interests-grid">
                        ${Object.entries(PROFILE_CONFIG.categories)
                            .map(([key, value]) => `
                                <label class="interest-item">
                                    <input type="checkbox" value="${key}" ${this.profile.interests.includes(key) ? 'checked' : ''}>
                                    <span class="interest-label">${value}</span>
                                </label>
                            `).join('')}
                    </div>
                    
                    <h3>対象地域</h3>
                    <p>主に関心のある地域を選択してください。</p>
                    
                    <div class="regions-grid">
                        ${Object.entries(PROFILE_CONFIG.regions)
                            .map(([key, value]) => `
                                <label class="region-item">
                                    <input type="checkbox" value="${key}" ${this.profile.regions.includes(key) ? 'checked' : ''}>
                                    <span class="region-label">${value}</span>
                                </label>
                            `).join('')}
                    </div>
                </div>
            `;
        }

        generatePreferencesTab() {
            return `
                <div class="profile-tab-panel" data-panel="preferences" style="display: none;">
                    <form class="preferences-form">
                        <div class="form-group">
                            <label for="pref-theme">テーマ</label>
                            <select id="pref-theme">
                                <option value="auto" ${this.preferences.theme === 'auto' ? 'selected' : ''}>自動</option>
                                <option value="light" ${this.preferences.theme === 'light' ? 'selected' : ''}>ライト</option>
                                <option value="dark" ${this.preferences.theme === 'dark' ? 'selected' : ''}>ダーク</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="pref-density">表示密度</label>
                            <select id="pref-density">
                                <option value="compact" ${this.preferences.displayDensity === 'compact' ? 'selected' : ''}>コンパクト</option>
                                <option value="normal" ${this.preferences.displayDensity === 'normal' ? 'selected' : ''}>標準</option>
                                <option value="comfortable" ${this.preferences.displayDensity === 'comfortable' ? 'selected' : ''}>ゆったり</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="pref-content-filter">コンテンツフィルター</label>
                            <select id="pref-content-filter">
                                <option value="all" ${this.preferences.contentFilter === 'all' ? 'selected' : ''}>すべて表示</option>
                                <option value="relevant" ${this.preferences.contentFilter === 'relevant' ? 'selected' : ''}>関連性の高いもの</option>
                                <option value="bookmarked" ${this.preferences.contentFilter === 'bookmarked' ? 'selected' : ''}>ブックマーク済み</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>オプション</label>
                            <div class="checkbox-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="pref-auto-save" ${this.preferences.autoSave ? 'checked' : ''}>
                                    <span>自動保存</span>
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" id="pref-show-tips" ${this.preferences.showTips ? 'checked' : ''}>
                                    <span>ヒントを表示</span>
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
            `;
        }

        generateHistoryTab() {
            const recentHistory = this.history.slice(-10).reverse();
            return `
                <div class="profile-tab-panel" data-panel="history" style="display: none;">
                    <h3>最近の閲覧履歴</h3>
                    
                    <div class="history-list">
                        ${recentHistory.length > 0 ? 
                            recentHistory.map(item => `
                                <div class="history-item">
                                    <h4><a href="${item.url}">${item.title}</a></h4>
                                    <div class="history-meta">
                                        <span class="history-date">${this.formatDate(item.timestamp)}</span>
                                        ${item.timeSpent ? `<span class="history-time">${this.formatDuration(item.timeSpent)}</span>` : ''}
                                        ${item.categories.length > 0 ? `<span class="history-categories">${item.categories.map(cat => PROFILE_CONFIG.categories[cat] || cat).join(', ')}</span>` : ''}
                                    </div>
                                </div>
                            `).join('') : 
                            '<p class="no-history">まだ閲覧履歴がありません。</p>'
                        }
                    </div>
                    
                    <div class="history-actions">
                        <button class="btn btn-secondary" id="clear-history">履歴をクリア</button>
                        <button class="btn btn-primary" id="export-history">履歴をエクスポート</button>
                    </div>
                </div>
            `;
        }

        attachProfileEvents(modal) {
            // タブ切り替え
            const tabs = modal.querySelectorAll('.profile-tab');
            const panels = modal.querySelectorAll('.profile-tab-panel');
            
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    tabs.forEach(t => t.classList.remove('active'));
                    panels.forEach(p => p.style.display = 'none');
                    
                    tab.classList.add('active');
                    const panel = modal.querySelector(`[data-panel="${tab.dataset.tab}"]`);
                    if (panel) panel.style.display = 'block';
                });
            });

            // モーダル閉じる
            const closeBtn = modal.querySelector('.profile-modal-close');
            const overlay = modal.querySelector('.profile-modal-overlay');
            
            [closeBtn, overlay].forEach(el => {
                el.addEventListener('click', () => {
                    modal.remove();
                });
            });

            // 保存ボタン
            modal.querySelector('#profile-save').addEventListener('click', () => {
                this.saveProfileFromModal(modal);
                modal.remove();
            });

            // エクスポートボタン
            modal.querySelector('#profile-export').addEventListener('click', () => {
                this.exportUserData();
            });

            // リセットボタン
            modal.querySelector('#profile-reset').addEventListener('click', () => {
                if (confirm('すべてのデータをリセットしますか？この操作は元に戻せません。')) {
                    this.resetUserData();
                    modal.remove();
                }
            });

            // 履歴関連
            const clearHistoryBtn = modal.querySelector('#clear-history');
            if (clearHistoryBtn) {
                clearHistoryBtn.addEventListener('click', () => {
                    if (confirm('閲覧履歴をすべて削除しますか？')) {
                        this.clearHistory();
                        modal.remove();
                        this.showProfileModal(); // 再表示
                    }
                });
            }
        }

        showProfileModal() {
            // 既存のモーダルを削除
            const existing = document.querySelector('.profile-modal');
            if (existing) existing.remove();
            
            this.createProfileModal();
        }

        saveProfileFromModal(modal) {
            // 基本情報
            this.profile.name = modal.querySelector('#profile-name').value;
            this.profile.email = modal.querySelector('#profile-email').value;
            this.profile.company = modal.querySelector('#profile-company').value;
            this.profile.companyType = modal.querySelector('#profile-company-type').value;
            this.profile.experience = modal.querySelector('#profile-experience').value;
            this.profile.notifications = modal.querySelector('#profile-notifications').checked;
            this.profile.newsletter = modal.querySelector('#profile-newsletter').checked;

            // 興味分野
            const interests = Array.from(modal.querySelectorAll('.interest-item input:checked'))
                .map(cb => cb.value);
            this.profile.interests = interests;

            // 地域
            const regions = Array.from(modal.querySelectorAll('.region-item input:checked'))
                .map(cb => cb.value);
            this.profile.regions = regions;

            // 設定
            this.preferences.theme = modal.querySelector('#pref-theme').value;
            this.preferences.displayDensity = modal.querySelector('#pref-density').value;
            this.preferences.contentFilter = modal.querySelector('#pref-content-filter').value;
            this.preferences.autoSave = modal.querySelector('#pref-auto-save').checked;
            this.preferences.showTips = modal.querySelector('#pref-show-tips').checked;

            // 保存
            this.saveProfile();
            this.savePreferences();

            // 通知
            this.showNotification('プロファイルを保存しました', 'success');
        }

        // ユーザー設定の適用
        applyUserPreferences() {
            // テーマ適用
            document.body.classList.remove('theme-light', 'theme-dark');
            if (this.preferences.theme !== 'auto') {
                document.body.classList.add(`theme-${this.preferences.theme}`);
            }

            // 表示密度
            document.body.classList.remove('density-compact', 'density-comfortable');
            if (this.preferences.displayDensity !== 'normal') {
                document.body.classList.add(`density-${this.preferences.displayDensity}`);
            }
        }

        // レコメンデーションエンジン
        startRecommendationEngine() {
            // 興味に基づいた推奨
            this.generateRecommendations();
            
            // 定期的な更新
            setInterval(() => {
                this.generateRecommendations();
            }, 30000); // 30秒ごと
        }

        generateRecommendations() {
            const recommendations = [];
            
            // 興味分野に基づく推奨
            this.profile.interests.forEach(interest => {
                // 実際の実装では、サーバーから関連コンテンツを取得
                recommendations.push({
                    type: 'interest',
                    category: interest,
                    score: 0.8
                });
            });

            // 閲覧履歴に基づく推奨
            const recentCategories = this.getRecentCategories();
            recentCategories.forEach(category => {
                recommendations.push({
                    type: 'history',
                    category: category,
                    score: 0.6
                });
            });

            this.updateRecommendationUI(recommendations);
        }

        getRecentCategories() {
            const recent = this.history.slice(-10);
            const categories = {};
            
            recent.forEach(item => {
                item.categories.forEach(cat => {
                    categories[cat] = (categories[cat] || 0) + 1;
                });
            });

            return Object.entries(categories)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 5)
                .map(([cat]) => cat);
        }

        updateRecommendationUI(recommendations) {
            // レコメンデーション表示エリアを更新
            const container = document.querySelector('.recommendations-container');
            if (container && recommendations.length > 0) {
                container.innerHTML = this.generateRecommendationHTML(recommendations);
            }
        }

        generateRecommendationHTML(recommendations) {
            return `
                <h3>おすすめコンテンツ</h3>
                <div class="recommendation-list">
                    ${recommendations.slice(0, 5).map(rec => `
                        <div class="recommendation-item" data-category="${rec.category}">
                            <span class="recommendation-category">${PROFILE_CONFIG.categories[rec.category] || rec.category}</span>
                            <span class="recommendation-score">${Math.round(rec.score * 100)}%</span>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // ユーティリティメソッド
        formatDate(timestamp) {
            return new Date(timestamp).toLocaleDateString('ja-JP');
        }

        formatDuration(ms) {
            const seconds = Math.floor(ms / 1000);
            const minutes = Math.floor(seconds / 60);
            if (minutes > 0) {
                return `${minutes}分${seconds % 60}秒`;
            }
            return `${seconds}秒`;
        }

        exportUserData() {
            const data = {
                profile: this.profile,
                history: this.history,
                preferences: this.preferences,
                exported: Date.now()
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `nyusatsu-profile-${Date.now()}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }

        resetUserData() {
            localStorage.removeItem(PROFILE_CONFIG.storageKey);
            localStorage.removeItem(PROFILE_CONFIG.historyKey);
            localStorage.removeItem(PROFILE_CONFIG.preferencesKey);
            
            this.profile = this.loadProfile();
            this.history = [];
            this.preferences = this.loadPreferences();
            
            this.applyUserPreferences();
            this.showNotification('データをリセットしました', 'info');
        }

        clearHistory() {
            this.history = [];
            this.saveHistory();
            this.showNotification('履歴をクリアしました', 'info');
        }

        showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 100);
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 300);
            }, 3000);
        }

        // 公開API
        getProfile() {
            return { ...this.profile };
        }

        getHistory() {
            return [...this.history];
        }

        getPreferences() {
            return { ...this.preferences };
        }

        updateProfile(updates) {
            this.profile = { ...this.profile, ...updates };
            this.saveProfile();
        }

        addInterest(category) {
            if (!this.profile.interests.includes(category)) {
                this.profile.interests.push(category);
                this.saveProfile();
            }
        }

        removeInterest(category) {
            this.profile.interests = this.profile.interests.filter(i => i !== category);
            this.saveProfile();
        }
    }

    // 初期化
    document.addEventListener('DOMContentLoaded', () => {
        window.userProfile = new UserProfileManager();
    });

})();