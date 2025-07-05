---
layout: default
title: サイト分析 | ふらっと法務事務所
description: ウェブサイトのアクセス解析、ユーザー行動分析、パフォーマンス指標を詳細に確認。データドリブンな改善をサポート。
permalink: /analytics/
---

<div class="analytics-dashboard">
    <div class="container">
        <!-- ダッシュボードヘッダー -->
        <div class="analytics-header">
            <h2>サイト分析ダッシュボード</h2>
            <div class="analytics-controls">
                <select class="form-control" id="date-range">
                    <option value="today">今日</option>
                    <option value="yesterday">昨日</option>
                    <option value="last7days" selected>過去7日間</option>
                    <option value="last30days">過去30日間</option>
                    <option value="last90days">過去90日間</option>
                    <option value="custom">カスタム期間</option>
                </select>
                <button class="btn btn-primary" id="refresh-data">
                    <span class="btn-icon">🔄</span>
                    データ更新
                </button>
                <button class="btn btn-outline-primary" id="export-data">
                    <span class="btn-icon">📊</span>
                    エクスポート
                </button>
            </div>
        </div>

        <!-- リアルタイム指標 -->
        <div class="realtime-metrics">
            <div class="realtime-header">
                <div class="realtime-indicator"></div>
                <h4>リアルタイム指標</h4>
            </div>
            <div class="realtime-stats">
                <div class="realtime-stat">
                    <span class="stat-value" id="active-users">-</span>
                    <span class="stat-label">現在のアクティブユーザー</span>
                </div>
                <div class="realtime-stat">
                    <span class="stat-value" id="today-pageviews">-</span>
                    <span class="stat-label">今日のページビュー</span>
                </div>
                <div class="realtime-stat">
                    <span class="stat-value" id="today-sessions">-</span>
                    <span class="stat-label">今日のセッション</span>
                </div>
            </div>
        </div>

        <!-- 指標概要 -->
        <div class="analytics-overview">
            <div class="metrics-grid">
                <div class="metric-card">
                    <h3>ページビュー</h3>
                    <div class="metric-value" id="total-pageviews">-</div>
                    <div class="metric-change" id="pageviews-change">-</div>
                </div>
                <div class="metric-card">
                    <h3>ユニークユーザー</h3>
                    <div class="metric-value" id="unique-users">-</div>
                    <div class="metric-change" id="users-change">-</div>
                </div>
                <div class="metric-card">
                    <h3>セッション</h3>
                    <div class="metric-value" id="total-sessions">-</div>
                    <div class="metric-change" id="sessions-change">-</div>
                </div>
                <div class="metric-card">
                    <h3>平均セッション時間</h3>
                    <div class="metric-value" id="avg-session-duration">-</div>
                    <div class="metric-change" id="duration-change">-</div>
                </div>
                <div class="metric-card">
                    <h3>直帰率</h3>
                    <div class="metric-value" id="bounce-rate">-</div>
                    <div class="metric-change" id="bounce-change">-</div>
                </div>
                <div class="metric-card">
                    <h3>コンバージョン率</h3>
                    <div class="metric-value" id="conversion-rate">-</div>
                    <div class="metric-change" id="conversion-change">-</div>
                </div>
            </div>
        </div>

        <!-- パフォーマンス指標 -->
        <div class="performance-metrics">
            <h3>パフォーマンス指標（Core Web Vitals）</h3>
            <div class="performance-grid">
                <div class="performance-card" id="lcp-card">
                    <div class="performance-value" id="lcp-value">-</div>
                    <div class="performance-label">LCP (Largest Contentful Paint)</div>
                    <div class="performance-description">メインコンテンツの表示速度</div>
                </div>
                <div class="performance-card" id="fid-card">
                    <div class="performance-value" id="fid-value">-</div>
                    <div class="performance-label">FID (First Input Delay)</div>
                    <div class="performance-description">初回入力までの遅延</div>
                </div>
                <div class="performance-card" id="cls-card">
                    <div class="performance-value" id="cls-value">-</div>
                    <div class="performance-label">CLS (Cumulative Layout Shift)</div>
                    <div class="performance-description">レイアウトの安定性</div>
                </div>
            </div>
        </div>

        <!-- チャート表示 -->
        <div class="analytics-charts">
            <div class="chart-container">
                <h3>ページビュー推移</h3>
                <canvas id="pageviews-chart"></canvas>
            </div>
            <div class="chart-container">
                <h3>ユーザー推移</h3>
                <canvas id="users-chart"></canvas>
            </div>
            <div class="chart-container">
                <h3>デバイス別アクセス</h3>
                <canvas id="device-chart"></canvas>
            </div>
            <div class="chart-container">
                <h3>流入元別アクセス</h3>
                <canvas id="referrer-chart"></canvas>
            </div>
        </div>

        <!-- データテーブル -->
        <div class="analytics-tables">
            <div class="table-container">
                <h3>人気ページ</h3>
                <table class="analytics-table" id="popular-pages-table">
                    <thead>
                        <tr>
                            <th>ページ</th>
                            <th>ページビュー</th>
                            <th>ユニークユーザー</th>
                            <th>平均滞在時間</th>
                            <th>直帰率</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- データは動的に生成 -->
                    </tbody>
                </table>
            </div>
            
            <div class="table-container">
                <h3>流入元分析</h3>
                <table class="analytics-table" id="referrer-table">
                    <thead>
                        <tr>
                            <th>流入元</th>
                            <th>セッション</th>
                            <th>新規ユーザー率</th>
                            <th>平均セッション時間</th>
                            <th>コンバージョン率</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- データは動的に生成 -->
                    </tbody>
                </table>
            </div>
        </div>

        <!-- エラー追跡 -->
        <div class="error-tracking">
            <div class="error-header">
                <h3>エラー追跡</h3>
                <span class="error-count" id="error-count">0</span>
            </div>
            <div class="error-list" id="error-list">
                <div class="no-errors">エラーはありません</div>
            </div>
        </div>
    </div>
</div>

<!-- Cookie同意バナー -->
<div class="cookie-consent-banner" id="cookie-consent" style="display: none;">
    <div class="cookie-consent-content">
        <p>
            このサイトでは、サイト分析とユーザーエクスペリエンス向上のためにCookieを使用しています。
            継続してご利用いただくことで、Cookieの使用に同意したものとみなされます。
        </p>
        <div class="cookie-consent-actions">
            <button class="btn btn-primary" id="accept-cookies">同意する</button>
            <button class="btn btn-outline-secondary" id="decline-cookies">拒否する</button>
            <a href="/privacy-policy/" class="btn btn-link">詳細を見る</a>
        </div>
    </div>
</div>

<!-- Chart.js ライブラリ -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<!-- サイト分析スクリプト -->
<script src="{{ '/assets/js/site-analytics.js' | relative_url }}"></script>

<script>
// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    // 分析ダッシュボードの初期化
    if (typeof SiteAnalyticsManager !== 'undefined') {
        // Analytics manager インスタンスにアクセス
        window.analyticsManager = new SiteAnalyticsManager();
        
        // ダッシュボード専用の初期化
        initializeAnalyticsDashboard();
    }
    
    // Google Analytics 4 の初期化（GA_MEASUREMENT_IDが設定されている場合）
    if (typeof gtag !== 'undefined') {
        // GA4の追加設定
        gtag('config', 'G-B9ZDWJ2ZEP', {
            custom_map: {
                custom_dimension_1: 'page_category',
                custom_dimension_2: 'user_type'
            },
            // カスタムパラメータ
            page_title: document.title,
            page_location: window.location.href,
            // コンバージョン設定
            send_page_view: true,
            // デバッグモード（本番では false）
            debug_mode: false
        });
        
        // カスタムイベントの設定
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname
        });
    }
});

function initializeAnalyticsDashboard() {
    // ダッシュボード固有の初期化処理
    setupDateRangeControl();
    setupExportFunction();
    setupRealtimeUpdates();
    loadInitialData();
}

function setupDateRangeControl() {
    const dateRange = document.getElementById('date-range');
    if (dateRange) {
        dateRange.addEventListener('change', function() {
            updateAnalyticsData(this.value);
        });
    }
}

function setupExportFunction() {
    const exportBtn = document.getElementById('export-data');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            if (window.analyticsManager) {
                window.analyticsManager.exportData();
            }
        });
    }
}

function setupRealtimeUpdates() {
    // リアルタイムデータの更新（30秒ごと）
    setInterval(updateRealtimeMetrics, 30000);
}

function updateRealtimeMetrics() {
    if (window.analyticsManager) {
        const realtimeData = window.analyticsManager.getRealtimeData();
        
        // リアルタイム指標の更新
        updateElement('active-users', realtimeData.activeUsers || '0');
        updateElement('today-pageviews', realtimeData.todayPageviews || '0');
        updateElement('today-sessions', realtimeData.todaySessions || '0');
    }
}

function updateAnalyticsData(period) {
    if (window.analyticsManager) {
        const data = window.analyticsManager.getAnalyticsData(period);
        updateDashboardMetrics(data);
        updateCharts(data);
        updateTables(data);
    }
}

function updateDashboardMetrics(data) {
    // 指標カードの更新
    updateElement('total-pageviews', formatNumber(data.pageviews || 0));
    updateElement('unique-users', formatNumber(data.uniqueUsers || 0));
    updateElement('total-sessions', formatNumber(data.sessions || 0));
    updateElement('avg-session-duration', formatDuration(data.avgSessionDuration || 0));
    updateElement('bounce-rate', formatPercentage(data.bounceRate || 0));
    updateElement('conversion-rate', formatPercentage(data.conversionRate || 0));
    
    // 変化率の更新
    updateChangeMetric('pageviews-change', data.pageviewsChange);
    updateChangeMetric('users-change', data.usersChange);
    updateChangeMetric('sessions-change', data.sessionsChange);
    updateChangeMetric('duration-change', data.durationChange);
    updateChangeMetric('bounce-change', data.bounceChange);
    updateChangeMetric('conversion-change', data.conversionChange);
    
    // パフォーマンス指標の更新
    updatePerformanceMetric('lcp', data.performance?.lcp);
    updatePerformanceMetric('fid', data.performance?.fid);
    updatePerformanceMetric('cls', data.performance?.cls);
}

function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

function updateChangeMetric(id, change) {
    const element = document.getElementById(id);
    if (element && change !== undefined) {
        const value = Math.abs(change);
        const sign = change >= 0 ? '+' : '-';
        element.textContent = `${sign}${formatPercentage(value)} 前期比`;
        element.className = `metric-change ${change >= 0 ? 'positive' : 'negative'}`;
    }
}

function updatePerformanceMetric(metric, value) {
    const valueElement = document.getElementById(`${metric}-value`);
    const cardElement = document.getElementById(`${metric}-card`);
    
    if (valueElement && value !== undefined) {
        let formattedValue, rating;
        
        switch (metric) {
            case 'lcp':
                formattedValue = `${(value / 1000).toFixed(1)}s`;
                rating = value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
                break;
            case 'fid':
                formattedValue = `${value.toFixed(0)}ms`;
                rating = value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
                break;
            case 'cls':
                formattedValue = value.toFixed(3);
                rating = value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
                break;
        }
        
        valueElement.textContent = formattedValue;
        valueElement.className = `performance-value ${rating}`;
        if (cardElement) {
            cardElement.className = `performance-card ${rating}`;
        }
    }
}

function loadInitialData() {
    // 初期データの読み込み
    updateAnalyticsData('last7days');
    updateRealtimeMetrics();
}

// ユーティリティ関数
function formatNumber(num) {
    return new Intl.NumberFormat('ja-JP').format(num);
}

function formatPercentage(num) {
    return `${num.toFixed(1)}%`;
}

function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
</script>

<style>
/* ダッシュボード専用の追加スタイル */
.analytics-dashboard {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding-top: 2rem;
}

.analytics-dashboard .container > * {
    position: relative;
    z-index: 1;
}

.analytics-dashboard::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 300px;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
    z-index: 0;
}

/* データ読み込み中の表示 */
.metric-value:empty::after,
.performance-value:empty::after {
    content: '読み込み中...';
    color: #6b7280;
    font-size: 0.875rem;
    font-weight: normal;
}

/* エラー状態の表示 */
.metric-card.error {
    border-left: 4px solid #ef4444;
}

.metric-card.error .metric-value {
    color: #ef4444;
}

.metric-card.error .metric-value::after {
    content: 'エラー';
}

/* チャートコンテナの追加スタイル */
.chart-container canvas {
    background-color: white;
    border-radius: 8px;
}

/* テーブルの追加機能 */
.analytics-table tbody tr.highlight {
    background-color: #fef3cd;
    border-left: 3px solid #f59e0b;
}

.analytics-table .page-info .page-title {
    cursor: pointer;
    transition: color 0.2s ease;
}

.analytics-table .page-info .page-title:hover {
    color: #3b82f6;
    text-decoration: underline;
}

/* レスポンシブ対応の強化 */
@media (max-width: 480px) {
    .analytics-dashboard {
        padding-top: 1rem;
    }
    
    .realtime-stats {
        flex-direction: column;
        text-align: center;
    }
    
    .analytics-controls {
        position: relative;
    }
    
    .analytics-controls select,
    .analytics-controls button {
        width: 100%;
        margin-bottom: 0.5rem;
    }
}

/* 印刷対応 */
@media print {
    .analytics-dashboard::before {
        display: none;
    }
    
    .analytics-controls,
    .cookie-consent-banner {
        display: none !important;
    }
    
    .chart-container {
        page-break-inside: avoid;
    }
}
</style>