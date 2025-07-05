// サイト分析ツール
// ページビュー、ユーザー行動、パフォーマンス分析

(function() {
    'use strict';

    // 分析設定
    const ANALYTICS_CONFIG = {
        storageKey: 'site-analytics-data',
        sessionKey: 'site-analytics-session',
        maxEvents: 1000,
        batchSize: 50,
        sendInterval: 30000, // 30秒
        trackingEnabled: true,
        anonymizeIP: true,
        cookieConsent: false,
        
        // イベントタイプ
        eventTypes: {
            pageview: 'ページビュー',
            click: 'クリック',
            scroll: 'スクロール',
            download: 'ダウンロード',
            form: 'フォーム送信',
            search: '検索',
            video: '動画再生',
            error: 'エラー',
            performance: 'パフォーマンス'
        },
        
        // 収集データ項目
        dataPoints: {
            page: ['url', 'title', 'referrer', 'loadTime'],
            user: ['userAgent', 'language', 'timezone', 'screenSize'],
            session: ['sessionId', 'sessionStart', 'sessionDuration', 'pageCount'],
            interaction: ['eventType', 'element', 'value', 'timestamp']
        }
    };

    // サイト分析マネージャー
    class SiteAnalyticsManager {
        constructor() {
            this.sessionId = this.generateSessionId();
            this.sessionStart = Date.now();
            this.pageLoadTime = Date.now();
            this.events = this.loadEvents();
            this.currentPage = this.getCurrentPageData();
            this.userProfile = this.getUserProfile();
            this.isTracking = ANALYTICS_CONFIG.trackingEnabled;
            
            this.init();
        }

        init() {
            if (!this.isTracking) return;
            
            this.setupEventTracking();
            this.trackPageView();
            this.startPerformanceMonitoring();
            this.setupDataCollection();
            this.bindAnalyticsInterface();
            
            // 定期的なデータ送信
            setInterval(() => this.processBatch(), ANALYTICS_CONFIG.sendInterval);
            
            // ページ離脱時の処理
            window.addEventListener('beforeunload', () => this.handlePageUnload());
        }

        generateSessionId() {
            return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        }

        getCurrentPageData() {
            return {
                url: window.location.href,
                path: window.location.pathname,
                title: document.title,
                referrer: document.referrer,
                loadTime: Date.now() - this.pageLoadTime,
                timestamp: Date.now()
            };
        }

        getUserProfile() {
            return {
                userAgent: navigator.userAgent,
                language: navigator.language,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                screenSize: `${screen.width}x${screen.height}`,
                viewportSize: `${window.innerWidth}x${window.innerHeight}`,
                platform: navigator.platform,
                cookieEnabled: navigator.cookieEnabled
            };
        }

        loadEvents() {
            try {
                const saved = localStorage.getItem(ANALYTICS_CONFIG.storageKey);
                return saved ? JSON.parse(saved) : [];
            } catch (error) {
                console.warn('Analytics: Failed to load events', error);
                return [];
            }
        }

        saveEvents() {
            try {
                // 最大イベント数を超えた場合は古いものから削除
                if (this.events.length > ANALYTICS_CONFIG.maxEvents) {
                    this.events = this.events.slice(-ANALYTICS_CONFIG.maxEvents);
                }
                localStorage.setItem(ANALYTICS_CONFIG.storageKey, JSON.stringify(this.events));
            } catch (error) {
                console.warn('Analytics: Failed to save events', error);
            }
        }

        trackEvent(eventType, data = {}) {
            if (!this.isTracking) return;

            const event = {
                id: this.generateEventId(),
                type: eventType,
                sessionId: this.sessionId,
                timestamp: Date.now(),
                page: this.currentPage,
                user: this.userProfile,
                data: data
            };

            this.events.push(event);
            this.saveEvents();
            
            // リアルタイム処理が必要なイベント
            if (eventType === 'error' || eventType === 'performance') {
                this.processEvent(event);
            }
        }

        generateEventId() {
            return 'event_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        }

        setupEventTracking() {
            // ページビューは既にtrackPageView()で処理

            // クリック追跡
            document.addEventListener('click', (e) => {
                this.trackClick(e);
            });

            // スクロール追跡
            let scrollTimeout;
            window.addEventListener('scroll', () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    this.trackScroll();
                }, 150);
            });

            // フォーム送信追跡
            document.addEventListener('submit', (e) => {
                this.trackFormSubmit(e);
            });

            // ダウンロード追跡
            document.addEventListener('click', (e) => {
                if (e.target.matches('a[href*=".pdf"], a[href*=".doc"], a[href*=".xls"], a[href*=".zip"]')) {
                    this.trackDownload(e);
                }
            });

            // 検索追跡
            document.addEventListener('submit', (e) => {
                if (e.target.matches('form[role="search"], .search-form')) {
                    this.trackSearch(e);
                }
            });

            // エラー追跡
            window.addEventListener('error', (e) => {
                this.trackError(e);
            });

            // Promise rejection追跡
            window.addEventListener('unhandledrejection', (e) => {
                this.trackError(e, 'promise_rejection');
            });
        }

        trackPageView() {
            this.trackEvent('pageview', {
                url: this.currentPage.url,
                title: this.currentPage.title,
                referrer: this.currentPage.referrer,
                loadTime: this.currentPage.loadTime
            });
        }

        trackClick(event) {
            const element = event.target;
            const elementInfo = this.getElementInfo(element);
            
            this.trackEvent('click', {
                element: elementInfo,
                coordinates: { x: event.clientX, y: event.clientY },
                button: event.button
            });
        }

        trackScroll() {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            
            this.trackEvent('scroll', {
                scrollY: window.scrollY,
                scrollPercent: scrollPercent,
                documentHeight: document.documentElement.scrollHeight,
                viewportHeight: window.innerHeight
            });
        }

        trackFormSubmit(event) {
            const form = event.target;
            const formData = new FormData(form);
            const fields = {};
            
            for (const [key, value] of formData.entries()) {
                // 機密情報は記録しない
                if (!key.toLowerCase().includes('password') && 
                    !key.toLowerCase().includes('email') &&
                    !key.toLowerCase().includes('phone')) {
                    fields[key] = typeof value === 'string' ? value.substring(0, 100) : value;
                }
            }
            
            this.trackEvent('form', {
                formId: form.id,
                formClass: form.className,
                action: form.action,
                method: form.method,
                fieldCount: Object.keys(fields).length,
                fields: fields
            });
        }

        trackDownload(event) {
            const link = event.target;
            const href = link.href;
            const fileName = href.split('/').pop();
            const fileType = fileName.split('.').pop().toLowerCase();
            
            this.trackEvent('download', {
                fileName: fileName,
                fileType: fileType,
                url: href,
                linkText: link.textContent.trim()
            });
        }

        trackSearch(event) {
            const form = event.target;
            const formData = new FormData(form);
            const query = formData.get('q') || formData.get('query') || formData.get('search');
            
            this.trackEvent('search', {
                query: query ? query.substring(0, 100) : '',
                resultsCount: this.getSearchResultsCount()
            });
        }

        trackError(event, type = 'javascript') {
            const errorData = {
                type: type,
                message: event.message || event.reason,
                filename: event.filename,
                line: event.lineno,
                column: event.colno,
                stack: event.error ? event.error.stack : null,
                userAgent: navigator.userAgent
            };
            
            this.trackEvent('error', errorData);
        }

        trackPerformance(metrics) {
            this.trackEvent('performance', metrics);
        }

        getElementInfo(element) {
            return {
                tagName: element.tagName,
                id: element.id,
                className: element.className,
                text: element.textContent ? element.textContent.substring(0, 100) : '',
                href: element.href,
                type: element.type,
                name: element.name
            };
        }

        getSearchResultsCount() {
            const resultsContainer = document.querySelector('.search-results, .results');
            if (resultsContainer) {
                const results = resultsContainer.querySelectorAll('.result-item, .search-result');
                return results.length;
            }
            return 0;
        }

        startPerformanceMonitoring() {
            // ページ読み込み完了時にパフォーマンス測定
            window.addEventListener('load', () => {
                setTimeout(() => {
                    this.collectPerformanceMetrics();
                }, 1000);
            });

            // Core Web Vitals 測定
            this.measureWebVitals();
        }

        collectPerformanceMetrics() {
            if ('performance' in window) {
                const navigation = performance.getEntriesByType('navigation')[0];
                const paint = performance.getEntriesByType('paint');
                
                const metrics = {
                    // Navigation Timing
                    domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart : 0,
                    loadComplete: navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0,
                    dnsLookup: navigation ? navigation.domainLookupEnd - navigation.domainLookupStart : 0,
                    tcpConnect: navigation ? navigation.connectEnd - navigation.connectStart : 0,
                    serverResponse: navigation ? navigation.responseEnd - navigation.requestStart : 0,
                    
                    // Paint Timing
                    firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
                    firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
                    
                    // Resource Timing
                    resourceCount: performance.getEntriesByType('resource').length,
                    
                    // Memory (Chrome)
                    memoryUsed: performance.memory ? performance.memory.usedJSHeapSize : 0,
                    memoryTotal: performance.memory ? performance.memory.totalJSHeapSize : 0
                };
                
                this.trackPerformance(metrics);
            }
        }

        measureWebVitals() {
            // Largest Contentful Paint (LCP)
            if ('PerformanceObserver' in window) {
                try {
                    const lcpObserver = new PerformanceObserver((list) => {
                        const entries = list.getEntries();
                        const lastEntry = entries[entries.length - 1];
                        
                        this.trackEvent('performance', {
                            metric: 'LCP',
                            value: lastEntry.startTime,
                            rating: lastEntry.startTime < 2500 ? 'good' : lastEntry.startTime < 4000 ? 'needs-improvement' : 'poor'
                        });
                    });
                    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
                } catch (error) {
                    console.warn('LCP measurement not supported', error);
                }

                // First Input Delay (FID)
                try {
                    const fidObserver = new PerformanceObserver((list) => {
                        const entries = list.getEntries();
                        entries.forEach((entry) => {
                            this.trackEvent('performance', {
                                metric: 'FID',
                                value: entry.processingStart - entry.startTime,
                                rating: entry.processingStart - entry.startTime < 100 ? 'good' : 
                                       entry.processingStart - entry.startTime < 300 ? 'needs-improvement' : 'poor'
                            });
                        });
                    });
                    fidObserver.observe({ entryTypes: ['first-input'] });
                } catch (error) {
                    console.warn('FID measurement not supported', error);
                }

                // Cumulative Layout Shift (CLS)
                try {
                    let clsScore = 0;
                    const clsObserver = new PerformanceObserver((list) => {
                        const entries = list.getEntries();
                        entries.forEach((entry) => {
                            if (!entry.hadRecentInput) {
                                clsScore += entry.value;
                            }
                        });
                        
                        this.trackEvent('performance', {
                            metric: 'CLS',
                            value: clsScore,
                            rating: clsScore < 0.1 ? 'good' : clsScore < 0.25 ? 'needs-improvement' : 'poor'
                        });
                    });
                    clsObserver.observe({ entryTypes: ['layout-shift'] });
                } catch (error) {
                    console.warn('CLS measurement not supported', error);
                }
            }
        }

        setupDataCollection() {
            // ユーザーの滞在時間を追跡
            this.startTime = Date.now();
            
            // 定期的にセッション情報を更新
            setInterval(() => {
                this.updateSessionData();
            }, 10000); // 10秒ごと
        }

        updateSessionData() {
            const sessionData = {
                sessionId: this.sessionId,
                duration: Date.now() - this.sessionStart,
                pageViews: this.events.filter(e => e.type === 'pageview').length,
                interactions: this.events.filter(e => e.type === 'click').length,
                lastActivity: Date.now()
            };
            
            sessionStorage.setItem(ANALYTICS_CONFIG.sessionKey, JSON.stringify(sessionData));
        }

        processBatch() {
            // 未処理のイベントを処理
            const unprocessedEvents = this.events.filter(e => !e.processed);
            
            if (unprocessedEvents.length >= ANALYTICS_CONFIG.batchSize) {
                const batch = unprocessedEvents.slice(0, ANALYTICS_CONFIG.batchSize);
                this.sendAnalyticsData(batch);
                
                // 処理済みとしてマーク
                batch.forEach(event => {
                    event.processed = true;
                });
                
                this.saveEvents();
            }
        }

        sendAnalyticsData(events) {
            // 実際の実装では、分析サーバーにデータを送信
            // ここではコンソールログとローカルストレージに保存
            
            console.log('Analytics: Sending batch of', events.length, 'events');
            
            // Google Analytics 4 (GA4) への送信例
            if (window.gtag) {
                events.forEach(event => {
                    window.gtag('event', event.type, {
                        event_category: this.getEventCategory(event.type),
                        event_label: event.data?.element?.text || event.data?.url,
                        value: event.data?.value,
                        custom_parameter_1: event.sessionId
                    });
                });
            }
            
            // カスタム分析サーバーへの送信例
            if (this.analyticsEndpoint) {
                fetch(this.analyticsEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        events: events,
                        session: this.getSessionData(),
                        page: this.currentPage,
                        user: this.userProfile
                    })
                }).catch(error => {
                    console.warn('Analytics: Failed to send data', error);
                });
            }
        }

        getEventCategory(eventType) {
            const categories = {
                pageview: 'Navigation',
                click: 'Engagement',
                scroll: 'Engagement',
                download: 'File',
                form: 'Form',
                search: 'Search',
                video: 'Media',
                error: 'Error',
                performance: 'Performance'
            };
            return categories[eventType] || 'Other';
        }

        getSessionData() {
            return {
                sessionId: this.sessionId,
                sessionStart: this.sessionStart,
                sessionDuration: Date.now() - this.sessionStart,
                pageCount: this.events.filter(e => e.type === 'pageview').length
            };
        }

        handlePageUnload() {
            // ページ離脱時の最終処理
            this.trackEvent('pageview_end', {
                timeOnPage: Date.now() - this.pageLoadTime,
                scrollDepth: Math.round(
                    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
                )
            });
            
            // 残りのイベントを送信
            const unprocessedEvents = this.events.filter(e => !e.processed);
            if (unprocessedEvents.length > 0) {
                this.sendAnalyticsData(unprocessedEvents);
            }
        }

        bindAnalyticsInterface() {
            // 分析画面のイベントハンドリング
            const analyticsContainer = document.querySelector('#analytics-container, .analytics-container');
            if (!analyticsContainer) return;

            this.setupAnalyticsInterface();
        }

        setupAnalyticsInterface() {
            const container = document.querySelector('#analytics-container, .analytics-container');
            if (!container) return;

            container.innerHTML = `
                <div class="analytics-dashboard">
                    <div class="analytics-header">
                        <h2>サイト分析ダッシュボード</h2>
                        <div class="analytics-controls">
                            <select id="analytics-period" class="form-control">
                                <option value="today">今日</option>
                                <option value="week">過去7日</option>
                                <option value="month" selected>過去30日</option>
                                <option value="quarter">過去3ヶ月</option>
                            </select>
                            <button class="btn btn-secondary" id="export-analytics">
                                <i class="fas fa-download"></i>
                                エクスポート
                            </button>
                            <button class="btn btn-secondary" id="clear-analytics">
                                <i class="fas fa-trash"></i>
                                データクリア
                            </button>
                        </div>
                    </div>
                    
                    <div class="analytics-overview">
                        <div class="metrics-grid">
                            <div class="metric-card">
                                <h3>ページビュー</h3>
                                <div class="metric-value" id="pageviews-count">0</div>
                                <div class="metric-change">+0% vs 前期間</div>
                            </div>
                            <div class="metric-card">
                                <h3>ユニークユーザー</h3>
                                <div class="metric-value" id="unique-users-count">0</div>
                                <div class="metric-change">+0% vs 前期間</div>
                            </div>
                            <div class="metric-card">
                                <h3>平均滞在時間</h3>
                                <div class="metric-value" id="avg-session-duration">0:00</div>
                                <div class="metric-change">+0% vs 前期間</div>
                            </div>
                            <div class="metric-card">
                                <h3>直帰率</h3>
                                <div class="metric-value" id="bounce-rate">0%</div>
                                <div class="metric-change">+0% vs 前期間</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analytics-charts">
                        <div class="chart-container">
                            <h3>ページビュー推移</h3>
                            <canvas id="pageviews-chart"></canvas>
                        </div>
                        <div class="chart-container">
                            <h3>人気ページ</h3>
                            <canvas id="popular-pages-chart"></canvas>
                        </div>
                    </div>
                    
                    <div class="analytics-tables">
                        <div class="table-container">
                            <h3>ページ別統計</h3>
                            <table class="analytics-table" id="pages-table">
                                <thead>
                                    <tr>
                                        <th>ページ</th>
                                        <th>ページビュー</th>
                                        <th>平均滞在時間</th>
                                        <th>直帰率</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                        
                        <div class="table-container">
                            <h3>イベント統計</h3>
                            <table class="analytics-table" id="events-table">
                                <thead>
                                    <tr>
                                        <th>イベント</th>
                                        <th>発生回数</th>
                                        <th>ユニークユーザー</th>
                                        <th>変換率</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;

            this.renderAnalyticsDashboard();
            this.bindAnalyticsEvents();
        }

        renderAnalyticsDashboard() {
            const period = document.querySelector('#analytics-period')?.value || 'month';
            const analyticsData = this.generateAnalyticsData(period);
            
            this.updateMetricsCards(analyticsData);
            this.renderAnalyticsCharts(analyticsData);
            this.renderAnalyticsTables(analyticsData);
        }

        generateAnalyticsData(period) {
            const now = Date.now();
            const periodMs = this.getPeriodMs(period);
            const startTime = now - periodMs;
            
            const filteredEvents = this.events.filter(e => e.timestamp >= startTime);
            
            return {
                pageviews: filteredEvents.filter(e => e.type === 'pageview'),
                sessions: this.groupEventsBySessions(filteredEvents),
                clicks: filteredEvents.filter(e => e.type === 'click'),
                errors: filteredEvents.filter(e => e.type === 'error'),
                performance: filteredEvents.filter(e => e.type === 'performance'),
                period: period,
                startTime: startTime,
                endTime: now
            };
        }

        getPeriodMs(period) {
            const periods = {
                today: 24 * 60 * 60 * 1000,
                week: 7 * 24 * 60 * 60 * 1000,
                month: 30 * 24 * 60 * 60 * 1000,
                quarter: 90 * 24 * 60 * 60 * 1000
            };
            return periods[period] || periods.month;
        }

        groupEventsBySessions(events) {
            const sessions = {};
            events.forEach(event => {
                if (!sessions[event.sessionId]) {
                    sessions[event.sessionId] = [];
                }
                sessions[event.sessionId].push(event);
            });
            return sessions;
        }

        updateMetricsCards(data) {
            const pageviewsElement = document.querySelector('#pageviews-count');
            const usersElement = document.querySelector('#unique-users-count');
            const durationElement = document.querySelector('#avg-session-duration');
            const bounceElement = document.querySelector('#bounce-rate');
            
            if (pageviewsElement) {
                pageviewsElement.textContent = data.pageviews.length.toLocaleString();
            }
            
            if (usersElement) {
                const uniqueUsers = new Set(Object.keys(data.sessions)).size;
                usersElement.textContent = uniqueUsers.toLocaleString();
            }
            
            if (durationElement) {
                const avgDuration = this.calculateAverageSessionDuration(data.sessions);
                durationElement.textContent = this.formatDuration(avgDuration);
            }
            
            if (bounceElement) {
                const bounceRate = this.calculateBounceRate(data.sessions);
                bounceElement.textContent = bounceRate.toFixed(1) + '%';
            }
        }

        calculateAverageSessionDuration(sessions) {
            const durations = Object.values(sessions).map(events => {
                if (events.length < 2) return 0;
                const start = Math.min(...events.map(e => e.timestamp));
                const end = Math.max(...events.map(e => e.timestamp));
                return end - start;
            });
            
            return durations.length > 0 ? durations.reduce((a, b) => a + b, 0) / durations.length : 0;
        }

        calculateBounceRate(sessions) {
            const singlePageSessions = Object.values(sessions).filter(events => 
                events.filter(e => e.type === 'pageview').length <= 1
            ).length;
            
            const totalSessions = Object.keys(sessions).length;
            return totalSessions > 0 ? (singlePageSessions / totalSessions) * 100 : 0;
        }

        formatDuration(ms) {
            const minutes = Math.floor(ms / 60000);
            const seconds = Math.floor((ms % 60000) / 1000);
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }

        renderAnalyticsCharts(data) {
            this.renderPageviewsChart(data);
            this.renderPopularPagesChart(data);
        }

        renderPageviewsChart(data) {
            const canvas = document.querySelector('#pageviews-chart');
            if (!canvas || typeof Chart === 'undefined') return;

            const ctx = canvas.getContext('2d');
            
            // 日別のページビューデータを生成
            const dailyData = this.groupPageviewsByDay(data.pageviews, data.startTime, data.endTime);
            
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dailyData.labels,
                    datasets: [{
                        label: 'ページビュー',
                        data: dailyData.values,
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.3
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'ページビュー推移'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        renderPopularPagesChart(data) {
            const canvas = document.querySelector('#popular-pages-chart');
            if (!canvas || typeof Chart === 'undefined') return;

            const ctx = canvas.getContext('2d');
            
            // ページ別のページビュー数を集計
            const pageStats = this.getPageStatistics(data.pageviews);
            const topPages = pageStats.slice(0, 10);
            
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: topPages.map(p => p.title.substring(0, 30) + (p.title.length > 30 ? '...' : '')),
                    datasets: [{
                        label: 'ページビュー',
                        data: topPages.map(p => p.views),
                        backgroundColor: '#10b981'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: '人気ページ Top 10'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        groupPageviewsByDay(pageviews, startTime, endTime) {
            const days = Math.ceil((endTime - startTime) / (24 * 60 * 60 * 1000));
            const labels = [];
            const values = [];
            
            for (let i = 0; i < days; i++) {
                const dayStart = startTime + (i * 24 * 60 * 60 * 1000);
                const dayEnd = dayStart + (24 * 60 * 60 * 1000);
                const dayViews = pageviews.filter(pv => 
                    pv.timestamp >= dayStart && pv.timestamp < dayEnd
                ).length;
                
                labels.push(new Date(dayStart).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' }));
                values.push(dayViews);
            }
            
            return { labels, values };
        }

        getPageStatistics(pageviews) {
            const pageStats = {};
            
            pageviews.forEach(pv => {
                const url = pv.data.url;
                const title = pv.data.title;
                
                if (!pageStats[url]) {
                    pageStats[url] = {
                        url: url,
                        title: title,
                        views: 0
                    };
                }
                pageStats[url].views++;
            });
            
            return Object.values(pageStats).sort((a, b) => b.views - a.views);
        }

        renderAnalyticsTables(data) {
            this.renderPagesTable(data);
            this.renderEventsTable(data);
        }

        renderPagesTable(data) {
            const tbody = document.querySelector('#pages-table tbody');
            if (!tbody) return;

            const pageStats = this.getPageStatistics(data.pageviews);
            
            tbody.innerHTML = pageStats.slice(0, 20).map(page => `
                <tr>
                    <td>
                        <div class="page-info">
                            <div class="page-title">${page.title}</div>
                            <div class="page-url">${page.url}</div>
                        </div>
                    </td>
                    <td>${page.views.toLocaleString()}</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
            `).join('');
        }

        renderEventsTable(data) {
            const tbody = document.querySelector('#events-table tbody');
            if (!tbody) return;

            const eventStats = {};
            
            [...data.clicks, ...data.errors].forEach(event => {
                const eventType = event.type;
                if (!eventStats[eventType]) {
                    eventStats[eventType] = {
                        type: eventType,
                        count: 0,
                        sessions: new Set()
                    };
                }
                eventStats[eventType].count++;
                eventStats[eventType].sessions.add(event.sessionId);
            });
            
            tbody.innerHTML = Object.values(eventStats).map(stat => `
                <tr>
                    <td>${ANALYTICS_CONFIG.eventTypes[stat.type] || stat.type}</td>
                    <td>${stat.count.toLocaleString()}</td>
                    <td>${stat.sessions.size.toLocaleString()}</td>
                    <td>-</td>
                </tr>
            `).join('');
        }

        bindAnalyticsEvents() {
            const container = document.querySelector('.analytics-dashboard');
            if (!container) return;

            // 期間変更
            const periodSelect = container.querySelector('#analytics-period');
            if (periodSelect) {
                periodSelect.addEventListener('change', () => {
                    this.renderAnalyticsDashboard();
                });
            }

            // エクスポート
            const exportBtn = container.querySelector('#export-analytics');
            if (exportBtn) {
                exportBtn.addEventListener('click', () => {
                    this.exportAnalyticsData();
                });
            }

            // データクリア
            const clearBtn = container.querySelector('#clear-analytics');
            if (clearBtn) {
                clearBtn.addEventListener('click', () => {
                    if (confirm('すべての分析データを削除しますか？この操作は取り消せません。')) {
                        this.clearAnalyticsData();
                    }
                });
            }
        }

        exportAnalyticsData() {
            const period = document.querySelector('#analytics-period')?.value || 'month';
            const data = this.generateAnalyticsData(period);
            
            const exportData = {
                period: period,
                exported: new Date().toISOString(),
                summary: {
                    pageviews: data.pageviews.length,
                    sessions: Object.keys(data.sessions).length,
                    clicks: data.clicks.length,
                    errors: data.errors.length
                },
                events: this.events
            };
            
            const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
                type: 'application/json' 
            });
            
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `analytics-data-${period}-${Date.now()}.json`;
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }

        clearAnalyticsData() {
            this.events = [];
            this.saveEvents();
            sessionStorage.removeItem(ANALYTICS_CONFIG.sessionKey);
            this.renderAnalyticsDashboard();
        }

        // 公開API
        track(eventType, data) {
            this.trackEvent(eventType, data);
        }

        getAnalyticsData(period = 'month') {
            return this.generateAnalyticsData(period);
        }

        enableTracking() {
            this.isTracking = true;
        }

        disableTracking() {
            this.isTracking = false;
        }
    }

    // Google Analytics 4 (GA4) 統合
    function initializeGA4(measurementId) {
        if (!measurementId) return;

        // gtag.js を動的に読み込み
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        document.head.appendChild(script);

        script.onload = function() {
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            
            gtag('js', new Date());
            gtag('config', measurementId, {
                anonymize_ip: ANALYTICS_CONFIG.anonymizeIP,
                cookie_flags: 'SameSite=None;Secure'
            });
        };
    }

    // 初期化
    document.addEventListener('DOMContentLoaded', () => {
        // 分析機能を初期化
        window.siteAnalytics = new SiteAnalyticsManager();

        // GA4 測定IDが設定されている場合は初期化
        const ga4MeasurementId = document.querySelector('meta[name="ga4-measurement-id"]')?.content;
        if (ga4MeasurementId) {
            initializeGA4(ga4MeasurementId);
        }

        // Cookie consent の処理
        const cookieConsent = localStorage.getItem('cookie-consent');
        if (cookieConsent === 'accepted') {
            ANALYTICS_CONFIG.cookieConsent = true;
        } else if (cookieConsent === null) {
            // Cookie consent バナーを表示
            showCookieConsentBanner();
        }
    });

    function showCookieConsentBanner() {
        const banner = document.createElement('div');
        banner.className = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="cookie-consent-content">
                <p>このサイトでは、サイト分析とユーザーエクスペリエンス向上のためにCookieを使用しています。</p>
                <div class="cookie-consent-actions">
                    <button class="btn btn-primary" id="accept-cookies">同意する</button>
                    <button class="btn btn-secondary" id="decline-cookies">拒否する</button>
                </div>
            </div>
        `;
        
        banner.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: #1f2937;
            color: white;
            padding: 1rem;
            z-index: 1000;
            box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
        `;
        
        document.body.appendChild(banner);

        // イベントハンドラ
        banner.querySelector('#accept-cookies').addEventListener('click', () => {
            localStorage.setItem('cookie-consent', 'accepted');
            ANALYTICS_CONFIG.cookieConsent = true;
            banner.remove();
        });

        banner.querySelector('#decline-cookies').addEventListener('click', () => {
            localStorage.setItem('cookie-consent', 'declined');
            ANALYTICS_CONFIG.cookieConsent = false;
            window.siteAnalytics.disableTracking();
            banner.remove();
        });
    }

})();