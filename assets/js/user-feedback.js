// ユーザーフィードバック機能
// 記事評価、フィードバックウィジェット、問い合わせフォーム改善

(function() {
    'use strict';

    // フィードバック設定
    const FEEDBACK_CONFIG = {
        storageKey: 'nyusatsu-feedback',
        ratingsKey: 'nyusatsu-ratings',
        apiEndpoint: '/api/feedback',
        showDelay: 5000, // 5秒後に表示
        minimumTime: 30000, // 30秒以上滞在で表示
        ratingLevels: {
            1: { emoji: '😞', text: 'とても悪い' },
            2: { emoji: '😕', text: '悪い' },
            3: { emoji: '😐', text: '普通' },
            4: { emoji: '🙂', text: '良い' },
            5: { emoji: '😊', text: 'とても良い' }
        }
    };

    // フィードバックマネージャー
    class FeedbackManager {
        constructor() {
            this.startTime = Date.now();
            this.feedbackData = this.loadFeedbackData();
            this.ratings = this.loadRatings();
            this.init();
        }

        init() {
            this.setupArticleRating();
            this.setupFeedbackWidget();
            this.setupPageAnalytics();
            this.scheduleWidgetDisplay();
        }

        loadFeedbackData() {
            const saved = localStorage.getItem(FEEDBACK_CONFIG.storageKey);
            return saved ? JSON.parse(saved) : {
                submittedUrls: [],
                preferences: {}
            };
        }

        loadRatings() {
            const saved = localStorage.getItem(FEEDBACK_CONFIG.ratingsKey);
            return saved ? JSON.parse(saved) : {};
        }

        saveFeedbackData() {
            localStorage.setItem(FEEDBACK_CONFIG.storageKey, JSON.stringify(this.feedbackData));
        }

        saveRatings() {
            localStorage.setItem(FEEDBACK_CONFIG.ratingsKey, JSON.stringify(this.ratings));
        }

        // 記事評価機能
        setupArticleRating() {
            const articleContent = document.querySelector('.article-content, .main-content, article');
            if (!articleContent) return;

            const currentUrl = window.location.pathname;
            const ratingContainer = document.createElement('div');
            ratingContainer.className = 'article-rating';
            
            ratingContainer.innerHTML = `
                <div class="rating-header">
                    <h3>この記事は役に立ちましたか？</h3>
                    <p>評価をお聞かせください</p>
                </div>
                <div class="rating-stars">
                    ${this.generateRatingStars()}
                </div>
                <div class="rating-feedback" style="display: none;">
                    <textarea placeholder="詳しいご意見があればお聞かせください（任意）" class="feedback-text"></textarea>
                    <div class="rating-actions">
                        <button class="btn btn-secondary cancel-rating">キャンセル</button>
                        <button class="btn btn-primary submit-rating">送信</button>
                    </div>
                </div>
                <div class="rating-thanks" style="display: none;">
                    <i class="fas fa-check-circle"></i>
                    <span>評価をありがとうございました！</span>
                </div>
            `;

            // 既存の評価があるかチェック
            if (this.ratings[currentUrl]) {
                this.showExistingRating(ratingContainer, this.ratings[currentUrl]);
            }

            articleContent.appendChild(ratingContainer);
            this.attachRatingEvents(ratingContainer);
        }

        generateRatingStars() {
            return Object.entries(FEEDBACK_CONFIG.ratingLevels)
                .map(([value, config]) => `
                    <button class="rating-star" data-value="${value}" aria-label="${config.text}">
                        <span class="star-emoji">${config.emoji}</span>
                        <span class="star-text">${config.text}</span>
                    </button>
                `).join('');
        }

        attachRatingEvents(container) {
            const stars = container.querySelectorAll('.rating-star');
            const feedbackSection = container.querySelector('.rating-feedback');
            const thanksSection = container.querySelector('.rating-thanks');
            const submitBtn = container.querySelector('.submit-rating');
            const cancelBtn = container.querySelector('.cancel-rating');
            const textArea = container.querySelector('.feedback-text');

            stars.forEach(star => {
                star.addEventListener('click', () => {
                    const value = parseInt(star.dataset.value);
                    this.selectRating(stars, value);
                    feedbackSection.style.display = 'block';
                });
            });

            submitBtn.addEventListener('click', () => {
                const rating = container.querySelector('.rating-star.selected')?.dataset.value;
                const feedback = textArea.value.trim();
                
                if (rating) {
                    this.submitRating(rating, feedback);
                    feedbackSection.style.display = 'none';
                    thanksSection.style.display = 'block';
                }
            });

            cancelBtn.addEventListener('click', () => {
                feedbackSection.style.display = 'none';
                container.querySelector('.rating-star.selected')?.classList.remove('selected');
            });
        }

        selectRating(stars, value) {
            stars.forEach(star => star.classList.remove('selected'));
            stars[value - 1].classList.add('selected');
        }

        submitRating(rating, feedback) {
            const currentUrl = window.location.pathname;
            const ratingData = {
                url: currentUrl,
                rating: parseInt(rating),
                feedback: feedback,
                timestamp: Date.now(),
                userAgent: navigator.userAgent,
                screenSize: `${screen.width}x${screen.height}`,
                referrer: document.referrer
            };

            // ローカルに保存
            this.ratings[currentUrl] = ratingData;
            this.saveRatings();

            // サーバーに送信（例）
            this.sendToServer('rating', ratingData);
        }

        showExistingRating(container, ratingData) {
            const thanksSection = container.querySelector('.rating-thanks');
            thanksSection.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>評価済み: ${FEEDBACK_CONFIG.ratingLevels[ratingData.rating].emoji} ${FEEDBACK_CONFIG.ratingLevels[ratingData.rating].text}</span>
            `;
            thanksSection.style.display = 'block';
            container.querySelector('.rating-header').style.display = 'none';
            container.querySelector('.rating-stars').style.display = 'none';
        }

        // フィードバックウィジェット
        setupFeedbackWidget() {
            const widget = document.createElement('div');
            widget.className = 'feedback-widget';
            widget.innerHTML = `
                <button class="feedback-toggle" aria-label="フィードバックを送る" title="フィードバックを送る">
                    <i class="fas fa-comment"></i>
                </button>
                <div class="feedback-form" style="display: none;">
                    <div class="feedback-header">
                        <h3>フィードバック</h3>
                        <button class="close-feedback" aria-label="閉じる">&times;</button>
                    </div>
                    <form class="feedback-form-content">
                        <div class="feedback-type">
                            <label>フィードバックの種類:</label>
                            <select name="type" required>
                                <option value="">選択してください</option>
                                <option value="bug">バグ報告</option>
                                <option value="suggestion">改善提案</option>
                                <option value="question">質問</option>
                                <option value="praise">感想・賞賛</option>
                                <option value="other">その他</option>
                            </select>
                        </div>
                        <div class="feedback-message">
                            <label for="feedback-text">詳細:</label>
                            <textarea name="message" id="feedback-text" required 
                                      placeholder="具体的なご意見をお聞かせください"></textarea>
                        </div>
                        <div class="feedback-contact">
                            <label for="feedback-email">メールアドレス（任意）:</label>
                            <input type="email" name="email" id="feedback-email" 
                                   placeholder="回答が必要な場合はご入力ください">
                        </div>
                        <div class="feedback-actions">
                            <button type="button" class="btn btn-secondary cancel-feedback">キャンセル</button>
                            <button type="submit" class="btn btn-primary">送信</button>
                        </div>
                    </form>
                    <div class="feedback-success" style="display: none;">
                        <i class="fas fa-check-circle"></i>
                        <h3>送信完了</h3>
                        <p>フィードバックをありがとうございました！</p>
                    </div>
                </div>
            `;

            document.body.appendChild(widget);
            this.attachWidgetEvents(widget);
        }

        attachWidgetEvents(widget) {
            const toggle = widget.querySelector('.feedback-toggle');
            const form = widget.querySelector('.feedback-form');
            const closeBtn = widget.querySelector('.close-feedback');
            const cancelBtn = widget.querySelector('.cancel-feedback');
            const formContent = widget.querySelector('.feedback-form-content');
            const successMessage = widget.querySelector('.feedback-success');

            toggle.addEventListener('click', () => {
                form.style.display = form.style.display === 'none' ? 'block' : 'none';
                if (form.style.display === 'block') {
                    widget.querySelector('select[name="type"]').focus();
                }
            });

            closeBtn.addEventListener('click', () => {
                form.style.display = 'none';
            });

            cancelBtn.addEventListener('click', () => {
                formContent.reset();
                form.style.display = 'none';
            });

            formContent.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitFeedback(formContent, successMessage);
            });
        }

        submitFeedback(form, successMessage) {
            const formData = new FormData(form);
            const feedbackData = {
                type: formData.get('type'),
                message: formData.get('message'),
                email: formData.get('email'),
                url: window.location.href,
                timestamp: Date.now(),
                userAgent: navigator.userAgent
            };

            // サーバーに送信
            this.sendToServer('feedback', feedbackData);

            // 成功メッセージを表示
            form.style.display = 'none';
            successMessage.style.display = 'block';

            setTimeout(() => {
                successMessage.style.display = 'none';
                form.parentElement.style.display = 'none';
                form.style.display = 'block';
                form.reset();
            }, 3000);
        }

        // ページ分析
        setupPageAnalytics() {
            // スクロール深度の追跡
            this.trackScrollDepth();
            
            // クリック追跡
            this.trackClicks();
            
            // 滞在時間追跡
            this.trackTimeOnPage();
        }

        trackScrollDepth() {
            let maxScroll = 0;
            const milestones = [25, 50, 75, 90, 100];
            const triggeredMilestones = new Set();

            const handleScroll = () => {
                const scrollTop = window.pageYOffset;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = Math.round((scrollTop / docHeight) * 100);

                if (scrollPercent > maxScroll) {
                    maxScroll = scrollPercent;
                }

                milestones.forEach(milestone => {
                    if (scrollPercent >= milestone && !triggeredMilestones.has(milestone)) {
                        triggeredMilestones.add(milestone);
                        this.sendAnalyticsEvent('scroll_depth', { percent: milestone });
                    }
                });
            };

            window.addEventListener('scroll', this.throttle(handleScroll, 500));
        }

        trackClicks() {
            document.addEventListener('click', (e) => {
                const element = e.target.closest('a, button');
                if (!element) return;

                const data = {
                    element: element.tagName.toLowerCase(),
                    text: element.textContent.trim().substring(0, 50),
                    href: element.href || null,
                    class: element.className
                };

                this.sendAnalyticsEvent('click', data);
            });
        }

        trackTimeOnPage() {
            window.addEventListener('beforeunload', () => {
                const timeSpent = Date.now() - this.startTime;
                this.sendAnalyticsEvent('time_on_page', { 
                    duration: timeSpent,
                    url: window.location.pathname
                });
            });
        }

        // ウィジェット表示スケジュール
        scheduleWidgetDisplay() {
            if (this.feedbackData.submittedUrls.includes(window.location.pathname)) {
                return; // 既にフィードバック済み
            }

            setTimeout(() => {
                if (Date.now() - this.startTime >= FEEDBACK_CONFIG.minimumTime) {
                    this.showFeedbackPrompt();
                }
            }, FEEDBACK_CONFIG.showDelay);
        }

        showFeedbackPrompt() {
            // 控えめなプロンプトを表示
            const prompt = document.createElement('div');
            prompt.className = 'feedback-prompt';
            prompt.innerHTML = `
                <div class="prompt-content">
                    <span>このページは役に立ちましたか？</span>
                    <button class="btn-prompt yes">はい</button>
                    <button class="btn-prompt no">いいえ</button>
                    <button class="btn-prompt close">&times;</button>
                </div>
            `;

            document.body.appendChild(prompt);

            // イベントリスナー
            prompt.querySelector('.yes').addEventListener('click', () => {
                this.sendAnalyticsEvent('quick_feedback', { helpful: true });
                prompt.remove();
            });

            prompt.querySelector('.no').addEventListener('click', () => {
                this.sendAnalyticsEvent('quick_feedback', { helpful: false });
                // フィードバックフォームを開く
                document.querySelector('.feedback-toggle').click();
                prompt.remove();
            });

            prompt.querySelector('.close').addEventListener('click', () => {
                prompt.remove();
            });

            // 10秒後に自動で消す
            setTimeout(() => {
                if (prompt.parentElement) {
                    prompt.remove();
                }
            }, 10000);
        }

        // データ送信
        sendToServer(type, data) {
            // 実際の実装では適切なAPIエンドポイントに送信
            fetch(FEEDBACK_CONFIG.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ type, data })
            }).catch(error => {
                console.log('Feedback submission failed:', error);
                // オフライン時はIndexedDBに保存
                this.storeOfflineData(type, data);
            });
        }

        sendAnalyticsEvent(event, data) {
            // Google Analytics（例）
            if (window.gtag) {
                gtag('event', event, data);
            }

            // カスタム分析
            this.sendToServer('analytics', { event, data });
        }

        storeOfflineData(type, data) {
            // IndexedDBに保存（Service Workerと連携）
            if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({
                    command: 'store-offline-data',
                    type,
                    data
                });
            }
        }

        // ユーティリティ
        throttle(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            }
        }
    }

    // 初期化
    document.addEventListener('DOMContentLoaded', () => {
        window.feedbackManager = new FeedbackManager();
    });

})();