// レポート生成ツール
// 入札データの分析レポートを自動生成

(function() {
    'use strict';

    // レポート設定
    const REPORT_CONFIG = {
        storageKey: 'nyusatsu-reports',
        templateKey: 'nyusatsu-report-templates',
        maxReports: 50,
        exportFormats: ['pdf', 'excel', 'word', 'html'],
        reportTypes: {
            summary: {
                name: '概要レポート',
                description: '入札データの基本統計と傾向',
                sections: ['overview', 'trends', 'statistics', 'recommendations']
            },
            detailed: {
                name: '詳細分析レポート',
                description: '詳細な入札分析と比較',
                sections: ['overview', 'trends', 'statistics', 'analysis', 'comparisons', 'recommendations']
            },
            competitive: {
                name: '競合分析レポート',
                description: '競合他社との比較分析',
                sections: ['competitors', 'market-share', 'pricing', 'strategies', 'recommendations']
            },
            performance: {
                name: '実績レポート',
                description: '過去の実績と成功要因の分析',
                sections: ['performance', 'success-factors', 'roi', 'timeline', 'lessons']
            },
            forecast: {
                name: '予測レポート',
                description: '将来の入札機会予測',
                sections: ['forecast', 'opportunities', 'risks', 'preparations', 'strategies']
            }
        },
        chartTypes: {
            line: '折れ線グラフ',
            bar: '棒グラフ',
            pie: '円グラフ',
            scatter: '散布図',
            area: 'エリアグラフ'
        }
    };

    // レポート生成エンジン
    class ReportGenerator {
        constructor() {
            this.reports = this.loadReports();
            this.templates = this.loadTemplates();
            this.currentReport = null;
            this.init();
        }

        init() {
            this.setupReportInterface();
            this.bindEvents();
            this.loadSampleData();
        }

        loadReports() {
            const saved = localStorage.getItem(REPORT_CONFIG.storageKey);
            return saved ? JSON.parse(saved) : [];
        }

        saveReports() {
            // 最大数を超えた場合は古いものから削除
            if (this.reports.length > REPORT_CONFIG.maxReports) {
                this.reports = this.reports.slice(-REPORT_CONFIG.maxReports);
            }
            localStorage.setItem(REPORT_CONFIG.storageKey, JSON.stringify(this.reports));
        }

        loadTemplates() {
            const saved = localStorage.getItem(REPORT_CONFIG.templateKey);
            if (saved) {
                return JSON.parse(saved);
            }

            // デフォルトテンプレート
            return {
                summary: {
                    title: '入札概要レポート',
                    sections: {
                        overview: { enabled: true, title: '概要' },
                        trends: { enabled: true, title: '動向分析' },
                        statistics: { enabled: true, title: '統計情報' },
                        recommendations: { enabled: true, title: '推奨事項' }
                    }
                },
                detailed: {
                    title: '詳細分析レポート',
                    sections: {
                        overview: { enabled: true, title: '概要' },
                        trends: { enabled: true, title: '動向分析' },
                        statistics: { enabled: true, title: '統計情報' },
                        analysis: { enabled: true, title: '詳細分析' },
                        comparisons: { enabled: true, title: '比較分析' },
                        recommendations: { enabled: true, title: '推奨事項' }
                    }
                }
            };
        }

        loadSampleData() {
            // サンプルの入札データ（実際の実装では外部データソースから取得）
            this.sampleData = {
                bidData: [
                    { date: '2024-01', category: '建設工事', count: 25, avgPrice: 15000000, successRate: 18 },
                    { date: '2024-02', category: '建設工事', count: 32, avgPrice: 18000000, successRate: 22 },
                    { date: '2024-03', category: '建設工事', count: 28, avgPrice: 16500000, successRate: 20 },
                    { date: '2024-04', category: '建設工事', count: 35, avgPrice: 19000000, successRate: 25 },
                    { date: '2024-05', category: '建設工事', count: 40, avgPrice: 21000000, successRate: 28 },
                    { date: '2024-06', category: '建設工事', count: 38, avgPrice: 20000000, successRate: 26 }
                ],
                competitors: [
                    { name: '競合A', marketShare: 25, avgSuccessRate: 30, avgBidPrice: 18500000 },
                    { name: '競合B', marketShare: 20, avgSuccessRate: 25, avgBidPrice: 19200000 },
                    { name: '競合C', marketShare: 15, avgSuccessRate: 22, avgBidPrice: 20100000 },
                    { name: '自社', marketShare: 18, avgSuccessRate: 24, avgBidPrice: 19500000 }
                ],
                categories: [
                    { name: '建設工事', count: 198, totalValue: 3780000000 },
                    { name: '業務委託', count: 156, totalValue: 890000000 },
                    { name: '物品調達', count: 89, totalValue: 340000000 },
                    { name: 'IT関連', count: 67, totalValue: 560000000 }
                ]
            };
        }

        setupReportInterface() {
            const container = document.querySelector('#report-container, .report-container');
            if (!container) return;

            container.innerHTML = `
                <div class="report-header">
                    <h2>レポート生成</h2>
                    <div class="report-controls">
                        <button class="btn btn-primary" id="create-report">
                            <i class="fas fa-plus"></i>
                            新規レポート作成
                        </button>
                        <button class="btn btn-secondary" id="load-report">
                            <i class="fas fa-folder-open"></i>
                            保存済みレポート
                        </button>
                        <button class="btn btn-secondary" id="templates-manager">
                            <i class="fas fa-file-alt"></i>
                            テンプレート管理
                        </button>
                    </div>
                </div>
                
                <div class="report-content">
                    <div class="report-builder" id="report-builder" style="display: none;">
                        <div class="builder-sidebar">
                            <div class="builder-section">
                                <h3>レポートタイプ</h3>
                                <select id="report-type" class="form-control">
                                    <option value="">選択してください</option>
                                    ${Object.entries(REPORT_CONFIG.reportTypes).map(([key, type]) => 
                                        `<option value="${key}">${type.name}</option>`
                                    ).join('')}
                                </select>
                            </div>
                            
                            <div class="builder-section">
                                <h3>データ期間</h3>
                                <div class="date-range">
                                    <input type="date" id="start-date" class="form-control" />
                                    <span class="date-separator">～</span>
                                    <input type="date" id="end-date" class="form-control" />
                                </div>
                            </div>
                            
                            <div class="builder-section">
                                <h3>カテゴリフィルター</h3>
                                <div class="checkbox-group" id="category-filters">
                                    <label><input type="checkbox" value="construction" checked> 建設工事</label>
                                    <label><input type="checkbox" value="services" checked> 業務委託</label>
                                    <label><input type="checkbox" value="goods" checked> 物品調達</label>
                                    <label><input type="checkbox" value="it" checked> IT関連</label>
                                </div>
                            </div>
                            
                            <div class="builder-section">
                                <h3>セクション設定</h3>
                                <div class="sections-config" id="sections-config">
                                    <!-- 動的に生成 -->
                                </div>
                            </div>
                            
                            <div class="builder-actions">
                                <button class="btn btn-primary btn-block" id="generate-report">
                                    <i class="fas fa-chart-line"></i>
                                    レポート生成
                                </button>
                                <button class="btn btn-secondary btn-block" id="save-template">
                                    <i class="fas fa-save"></i>
                                    テンプレート保存
                                </button>
                            </div>
                        </div>
                        
                        <div class="builder-preview">
                            <div class="preview-header">
                                <h3>プレビュー</h3>
                                <div class="preview-controls">
                                    <button class="btn btn-sm btn-secondary" id="preview-refresh">
                                        <i class="fas fa-sync"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="preview-content" id="preview-content">
                                <div class="preview-placeholder">
                                    レポートタイプを選択してください
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="report-viewer" id="report-viewer" style="display: none;">
                        <div class="viewer-header">
                            <h3 id="report-title"></h3>
                            <div class="viewer-controls">
                                <button class="btn btn-secondary" id="edit-report">
                                    <i class="fas fa-edit"></i>
                                    編集
                                </button>
                                <div class="dropdown">
                                    <button class="btn btn-primary dropdown-toggle" id="export-dropdown">
                                        <i class="fas fa-download"></i>
                                        エクスポート
                                    </button>
                                    <div class="dropdown-menu">
                                        <a href="#" class="dropdown-item" data-format="pdf">PDF</a>
                                        <a href="#" class="dropdown-item" data-format="excel">Excel</a>
                                        <a href="#" class="dropdown-item" data-format="word">Word</a>
                                        <a href="#" class="dropdown-item" data-format="html">HTML</a>
                                    </div>
                                </div>
                                <button class="btn btn-secondary" id="close-viewer">
                                    <i class="fas fa-times"></i>
                                    閉じる
                                </button>
                            </div>
                        </div>
                        <div class="viewer-content" id="viewer-content">
                            <!-- レポート内容 -->
                        </div>
                    </div>
                    
                    <div class="report-list" id="report-list">
                        <div class="list-header">
                            <h3>保存済みレポート</h3>
                        </div>
                        <div class="reports-grid">
                            ${this.renderReportsList()}
                        </div>
                    </div>
                </div>
            `;
        }

        renderReportsList() {
            if (this.reports.length === 0) {
                return '<div class="no-reports">まだレポートがありません</div>';
            }

            return this.reports.map(report => `
                <div class="report-card" data-report-id="${report.id}">
                    <div class="report-card-header">
                        <h4>${report.title}</h4>
                        <div class="report-actions">
                            <button class="btn-action" data-action="view" title="表示">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn-action" data-action="edit" title="編集">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-action" data-action="delete" title="削除">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div class="report-card-body">
                        <p class="report-type">${REPORT_CONFIG.reportTypes[report.type]?.name || report.type}</p>
                        <p class="report-date">作成日: ${this.formatDate(report.created)}</p>
                        <p class="report-period">期間: ${report.config.startDate} ～ ${report.config.endDate}</p>
                    </div>
                </div>
            `).join('');
        }

        bindEvents() {
            const container = document.querySelector('.report-container');
            if (!container) return;

            // 新規レポート作成
            const createBtn = container.querySelector('#create-report');
            if (createBtn) {
                createBtn.addEventListener('click', () => {
                    this.showReportBuilder();
                });
            }

            // レポートタイプ変更
            const typeSelect = container.querySelector('#report-type');
            if (typeSelect) {
                typeSelect.addEventListener('change', (e) => {
                    this.updateSectionsConfig(e.target.value);
                    this.updatePreview();
                });
            }

            // 設定変更時のプレビュー更新
            ['#start-date', '#end-date'].forEach(selector => {
                const input = container.querySelector(selector);
                if (input) {
                    input.addEventListener('change', () => this.updatePreview());
                }
            });

            // カテゴリフィルター
            const categoryFilters = container.querySelector('#category-filters');
            if (categoryFilters) {
                categoryFilters.addEventListener('change', () => this.updatePreview());
            }

            // レポート生成
            const generateBtn = container.querySelector('#generate-report');
            if (generateBtn) {
                generateBtn.addEventListener('click', () => {
                    this.generateReport();
                });
            }

            // プレビュー更新
            const refreshBtn = container.querySelector('#preview-refresh');
            if (refreshBtn) {
                refreshBtn.addEventListener('click', () => this.updatePreview());
            }

            // レポートアクション
            container.addEventListener('click', (e) => {
                const action = e.target.closest('[data-action]');
                if (action) {
                    const reportCard = action.closest('.report-card');
                    const reportId = reportCard.dataset.reportId;
                    const actionType = action.dataset.action;
                    
                    switch (actionType) {
                        case 'view':
                            this.viewReport(reportId);
                            break;
                        case 'edit':
                            this.editReport(reportId);
                            break;
                        case 'delete':
                            this.deleteReport(reportId);
                            break;
                    }
                }
            });

            // エクスポート
            container.addEventListener('click', (e) => {
                const formatItem = e.target.closest('[data-format]');
                if (formatItem && this.currentReport) {
                    const format = formatItem.dataset.format;
                    this.exportReport(this.currentReport, format);
                }
            });

            // ビューワー制御
            const closeViewer = container.querySelector('#close-viewer');
            if (closeViewer) {
                closeViewer.addEventListener('click', () => {
                    this.hideReportViewer();
                });
            }
        }

        showReportBuilder() {
            const builder = document.querySelector('#report-builder');
            const list = document.querySelector('#report-list');
            
            if (builder && list) {
                builder.style.display = 'flex';
                list.style.display = 'none';
                
                // 初期設定
                this.setDefaultDates();
            }
        }

        hideReportBuilder() {
            const builder = document.querySelector('#report-builder');
            const list = document.querySelector('#report-list');
            
            if (builder && list) {
                builder.style.display = 'none';
                list.style.display = 'block';
            }
        }

        showReportViewer() {
            const viewer = document.querySelector('#report-viewer');
            const list = document.querySelector('#report-list');
            
            if (viewer && list) {
                viewer.style.display = 'block';
                list.style.display = 'none';
            }
        }

        hideReportViewer() {
            const viewer = document.querySelector('#report-viewer');
            const list = document.querySelector('#report-list');
            
            if (viewer && list) {
                viewer.style.display = 'none';
                list.style.display = 'block';
            }
        }

        setDefaultDates() {
            const endDate = new Date();
            const startDate = new Date();
            startDate.setMonth(startDate.getMonth() - 6); // 6ヶ月前

            const startInput = document.querySelector('#start-date');
            const endInput = document.querySelector('#end-date');
            
            if (startInput) startInput.value = this.formatDateInput(startDate);
            if (endInput) endInput.value = this.formatDateInput(endDate);
        }

        updateSectionsConfig(reportType) {
            const container = document.querySelector('#sections-config');
            if (!container || !reportType) return;

            const type = REPORT_CONFIG.reportTypes[reportType];
            if (!type) return;

            const template = this.templates[reportType] || { sections: {} };

            container.innerHTML = type.sections.map(sectionKey => {
                const sectionConfig = template.sections[sectionKey] || { enabled: true, title: sectionKey };
                return `
                    <label class="section-item">
                        <input type="checkbox" value="${sectionKey}" ${sectionConfig.enabled ? 'checked' : ''}>
                        <span>${sectionConfig.title}</span>
                    </label>
                `;
            }).join('');
        }

        updatePreview() {
            const previewContent = document.querySelector('#preview-content');
            if (!previewContent) return;

            const config = this.getReportConfig();
            if (!config.type) {
                previewContent.innerHTML = '<div class="preview-placeholder">レポートタイプを選択してください</div>';
                return;
            }

            previewContent.innerHTML = this.generateReportHTML(config, true);
        }

        getReportConfig() {
            return {
                type: document.querySelector('#report-type')?.value || '',
                startDate: document.querySelector('#start-date')?.value || '',
                endDate: document.querySelector('#end-date')?.value || '',
                categories: Array.from(document.querySelectorAll('#category-filters input:checked')).map(cb => cb.value),
                sections: Array.from(document.querySelectorAll('#sections-config input:checked')).map(cb => cb.value)
            };
        }

        generateReport() {
            const config = this.getReportConfig();
            
            if (!config.type || !config.startDate || !config.endDate) {
                alert('必要な設定項目を入力してください');
                return;
            }

            const reportId = 'report_' + Date.now();
            const report = {
                id: reportId,
                title: `${REPORT_CONFIG.reportTypes[config.type].name} - ${config.startDate}～${config.endDate}`,
                type: config.type,
                config: config,
                content: this.generateReportHTML(config),
                created: Date.now(),
                modified: Date.now()
            };

            this.reports.unshift(report);
            this.saveReports();
            this.currentReport = report;
            
            // ビューワーで表示
            this.showReportInViewer(report);
        }

        generateReportHTML(config, isPreview = false) {
            const typeConfig = REPORT_CONFIG.reportTypes[config.type];
            if (!typeConfig) return '';

            const sections = config.sections || typeConfig.sections;
            let html = `
                <div class="report-document ${isPreview ? 'preview' : ''}">
                    <div class="report-header-section">
                        <h1>${typeConfig.name}</h1>
                        <div class="report-meta">
                            <p>期間: ${config.startDate} ～ ${config.endDate}</p>
                            <p>作成日: ${new Date().toLocaleDateString('ja-JP')}</p>
                        </div>
                    </div>
            `;

            sections.forEach(sectionKey => {
                html += this.generateReportSection(sectionKey, config, isPreview);
            });

            html += '</div>';
            return html;
        }

        generateReportSection(sectionKey, config, isPreview) {
            switch (sectionKey) {
                case 'overview':
                    return this.generateOverviewSection(config, isPreview);
                case 'trends':
                    return this.generateTrendsSection(config, isPreview);
                case 'statistics':
                    return this.generateStatisticsSection(config, isPreview);
                case 'analysis':
                    return this.generateAnalysisSection(config, isPreview);
                case 'comparisons':
                    return this.generateComparisonsSection(config, isPreview);
                case 'competitors':
                    return this.generateCompetitorsSection(config, isPreview);
                case 'recommendations':
                    return this.generateRecommendationsSection(config, isPreview);
                default:
                    return `<div class="report-section"><h2>${sectionKey}</h2><p>このセクションの内容を生成中...</p></div>`;
            }
        }

        generateOverviewSection(config, isPreview) {
            const data = this.filterDataByConfig(config);
            const totalBids = data.bidData.reduce((sum, item) => sum + item.count, 0);
            const avgSuccessRate = data.bidData.reduce((sum, item) => sum + item.successRate, 0) / data.bidData.length;
            const totalValue = data.categories.reduce((sum, item) => sum + item.totalValue, 0);

            return `
                <div class="report-section">
                    <h2>概要</h2>
                    <div class="overview-stats">
                        <div class="stat-card">
                            <h3>総入札件数</h3>
                            <p class="stat-number">${totalBids.toLocaleString()}</p>
                        </div>
                        <div class="stat-card">
                            <h3>平均落札率</h3>
                            <p class="stat-number">${avgSuccessRate.toFixed(1)}%</p>
                        </div>
                        <div class="stat-card">
                            <h3>総契約金額</h3>
                            <p class="stat-number">${(totalValue / 100000000).toFixed(1)}億円</p>
                        </div>
                    </div>
                    <div class="overview-summary">
                        <p>期間中の入札活動は活発で、特に建設工事分野での案件数が増加傾向にあります。
                        落札率は業界平均を上回る水準を維持しており、競争力のある価格設定ができています。</p>
                    </div>
                </div>
            `;
        }

        generateTrendsSection(config, isPreview) {
            return `
                <div class="report-section">
                    <h2>動向分析</h2>
                    <div class="chart-container">
                        <canvas id="trends-chart" width="600" height="300"></canvas>
                    </div>
                    <div class="trends-analysis">
                        <h3>主要トレンド</h3>
                        <ul>
                            <li>入札件数は前年同期比15%増加</li>
                            <li>平均契約金額は大型案件の影響で20%上昇</li>
                            <li>IT関連案件の需要が急増（前年比40%増）</li>
                            <li>環境配慮型案件の比率が拡大</li>
                        </ul>
                    </div>
                </div>
            `;
        }

        generateStatisticsSection(config, isPreview) {
            return `
                <div class="report-section">
                    <h2>統計情報</h2>
                    <div class="statistics-grid">
                        <div class="stat-group">
                            <h3>カテゴリ別分布</h3>
                            <div class="chart-container">
                                <canvas id="category-chart" width="400" height="300"></canvas>
                            </div>
                        </div>
                        <div class="stat-group">
                            <h3>月別推移</h3>
                            <table class="stats-table">
                                <thead>
                                    <tr>
                                        <th>月</th>
                                        <th>件数</th>
                                        <th>平均金額</th>
                                        <th>落札率</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${this.sampleData.bidData.map(item => `
                                        <tr>
                                            <td>${item.date}</td>
                                            <td>${item.count}</td>
                                            <td>${(item.avgPrice / 10000).toLocaleString()}万円</td>
                                            <td>${item.successRate}%</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
        }

        generateAnalysisSection(config, isPreview) {
            return `
                <div class="report-section">
                    <h2>詳細分析</h2>
                    <div class="analysis-content">
                        <div class="analysis-item">
                            <h3>価格戦略分析</h3>
                            <p>入札価格の分析により、競合他社との価格差は平均5-8%の範囲内にあることが判明。
                            価格競争力を維持しつつ、技術評価での差別化が重要な要素となっています。</p>
                        </div>
                        <div class="analysis-item">
                            <h3>成功要因分析</h3>
                            <ul>
                                <li>技術提案の充実度: 落札率との相関係数0.7</li>
                                <li>過去実績の活用: 同種案件での実績が評価向上に寄与</li>
                                <li>地域性の考慮: 地元企業との連携が効果的</li>
                            </ul>
                        </div>
                        <div class="analysis-item">
                            <h3>リスク要因</h3>
                            <p>人材不足による工期遅延リスクや、資材価格高騰による収益圧迫が主要なリスク要因として特定されました。</p>
                        </div>
                    </div>
                </div>
            `;
        }

        generateComparisonsSection(config, isPreview) {
            return `
                <div class="report-section">
                    <h2>比較分析</h2>
                    <div class="comparison-content">
                        <div class="comparison-chart">
                            <h3>競合比較</h3>
                            <div class="chart-container">
                                <canvas id="competitor-chart" width="600" height="300"></canvas>
                            </div>
                        </div>
                        <div class="comparison-table">
                            <h3>主要指標比較</h3>
                            <table class="comparison-stats">
                                <thead>
                                    <tr>
                                        <th>企業</th>
                                        <th>市場シェア</th>
                                        <th>落札率</th>
                                        <th>平均入札価格</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${this.sampleData.competitors.map(comp => `
                                        <tr ${comp.name === '自社' ? 'class="highlight"' : ''}>
                                            <td>${comp.name}</td>
                                            <td>${comp.marketShare}%</td>
                                            <td>${comp.avgSuccessRate}%</td>
                                            <td>${(comp.avgBidPrice / 10000).toLocaleString()}万円</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
        }

        generateCompetitorsSection(config, isPreview) {
            return `
                <div class="report-section">
                    <h2>競合分析</h2>
                    <div class="competitors-analysis">
                        ${this.sampleData.competitors.filter(c => c.name !== '自社').map(competitor => `
                            <div class="competitor-profile">
                                <h3>${competitor.name}</h3>
                                <div class="competitor-stats">
                                    <span class="stat">シェア: ${competitor.marketShare}%</span>
                                    <span class="stat">落札率: ${competitor.avgSuccessRate}%</span>
                                </div>
                                <div class="competitor-analysis">
                                    <h4>強み・特徴</h4>
                                    <p>技術力の高さと豊富な実績を背景に、大型案件での優位性を確立。特に官公庁案件での信頼度が高い。</p>
                                    <h4>対策</h4>
                                    <p>技術提案の差別化と価格競争力の向上により、競争優位性の確保が必要。</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        generateRecommendationsSection(config, isPreview) {
            return `
                <div class="report-section">
                    <h2>推奨事項</h2>
                    <div class="recommendations-content">
                        <div class="recommendation-category">
                            <h3>戦略的推奨事項</h3>
                            <ul class="recommendations-list">
                                <li>成長分野（IT・環境関連）への参入強化</li>
                                <li>技術力向上による差別化戦略の推進</li>
                                <li>地域パートナーシップの拡充</li>
                                <li>デジタル化による業務効率化の推進</li>
                            </ul>
                        </div>
                        <div class="recommendation-category">
                            <h3>運用面での改善点</h3>
                            <ul class="recommendations-list">
                                <li>入札情報収集システムの強化</li>
                                <li>提案書作成プロセスの標準化</li>
                                <li>価格設定ロジックの精緻化</li>
                                <li>アフターフォロー体制の充実</li>
                            </ul>
                        </div>
                        <div class="recommendation-category">
                            <h3>短期アクションプラン</h3>
                            <ol class="action-plan">
                                <li>競合分析レポートの月次作成体制構築（1ヶ月以内）</li>
                                <li>技術者スキル向上研修の実施（3ヶ月以内）</li>
                                <li>新規分野参入のための市場調査開始（2ヶ月以内）</li>
                                <li>顧客満足度向上のための施策実行（継続）</li>
                            </ol>
                        </div>
                    </div>
                </div>
            `;
        }

        filterDataByConfig(config) {
            // 実際の実装では、config に基づいてデータをフィルタリング
            return this.sampleData;
        }

        showReportInViewer(report) {
            const title = document.querySelector('#report-title');
            const content = document.querySelector('#viewer-content');
            
            if (title) title.textContent = report.title;
            if (content) content.innerHTML = report.content;
            
            this.showReportViewer();
            
            // チャートがある場合は描画
            setTimeout(() => this.renderReportCharts(report), 100);
        }

        renderReportCharts(report) {
            // Chart.jsが利用可能な場合のみチャート描画
            if (typeof Chart === 'undefined') return;

            // トレンドチャート
            const trendsCanvas = document.querySelector('#trends-chart');
            if (trendsCanvas) {
                const ctx = trendsCanvas.getContext('2d');
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: this.sampleData.bidData.map(item => item.date),
                        datasets: [{
                            label: '入札件数',
                            data: this.sampleData.bidData.map(item => item.count),
                            borderColor: '#3b82f6',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            tension: 0.3
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }

            // カテゴリチャート
            const categoryCanvas = document.querySelector('#category-chart');
            if (categoryCanvas) {
                const ctx = categoryCanvas.getContext('2d');
                new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: this.sampleData.categories.map(item => item.name),
                        datasets: [{
                            data: this.sampleData.categories.map(item => item.count),
                            backgroundColor: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b']
                        }]
                    },
                    options: {
                        responsive: true
                    }
                });
            }
        }

        viewReport(reportId) {
            const report = this.reports.find(r => r.id === reportId);
            if (report) {
                this.currentReport = report;
                this.showReportInViewer(report);
            }
        }

        editReport(reportId) {
            const report = this.reports.find(r => r.id === reportId);
            if (report) {
                this.currentReport = report;
                this.loadReportToBuilder(report);
                this.showReportBuilder();
            }
        }

        deleteReport(reportId) {
            if (confirm('このレポートを削除しますか？')) {
                this.reports = this.reports.filter(r => r.id !== reportId);
                this.saveReports();
                this.refreshReportsList();
            }
        }

        loadReportToBuilder(report) {
            const config = report.config;
            
            document.querySelector('#report-type').value = config.type || '';
            document.querySelector('#start-date').value = config.startDate || '';
            document.querySelector('#end-date').value = config.endDate || '';
            
            // カテゴリフィルターの設定
            document.querySelectorAll('#category-filters input').forEach(cb => {
                cb.checked = config.categories.includes(cb.value);
            });
            
            this.updateSectionsConfig(config.type);
            
            // セクション設定
            setTimeout(() => {
                document.querySelectorAll('#sections-config input').forEach(cb => {
                    cb.checked = config.sections.includes(cb.value);
                });
            }, 100);
        }

        refreshReportsList() {
            const grid = document.querySelector('.reports-grid');
            if (grid) {
                grid.innerHTML = this.renderReportsList();
            }
        }

        exportReport(report, format) {
            switch (format) {
                case 'pdf':
                    this.exportToPDF(report);
                    break;
                case 'excel':
                    this.exportToExcel(report);
                    break;
                case 'word':
                    this.exportToWord(report);
                    break;
                case 'html':
                    this.exportToHTML(report);
                    break;
            }
        }

        exportToPDF(report) {
            // PDF出力の実装（html2pdfライブラリを使用）
            const element = document.querySelector('#viewer-content');
            if (element && window.html2pdf) {
                const opt = {
                    margin: 10,
                    filename: `${report.title}.pdf`,
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                };
                window.html2pdf().set(opt).from(element).save();
            } else {
                alert('PDF出力機能は現在利用できません');
            }
        }

        exportToExcel(report) {
            // Excel出力の実装
            alert('Excel出力機能は準備中です');
        }

        exportToWord(report) {
            // Word出力の実装
            alert('Word出力機能は準備中です');
        }

        exportToHTML(report) {
            const htmlContent = `
                <!DOCTYPE html>
                <html lang="ja">
                <head>
                    <meta charset="UTF-8">
                    <title>${report.title}</title>
                    <style>
                        body { font-family: 'Noto Sans JP', sans-serif; margin: 40px; }
                        .report-document { max-width: 800px; margin: 0 auto; }
                        .report-section { margin-bottom: 2rem; }
                        h1, h2, h3 { color: #333; }
                        table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f5f5f5; }
                    </style>
                </head>
                <body>
                    ${report.content}
                </body>
                </html>
            `;
            
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `${report.title}.html`;
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }

        // ユーティリティメソッド
        formatDate(timestamp) {
            return new Date(timestamp).toLocaleDateString('ja-JP');
        }

        formatDateInput(date) {
            return date.toISOString().split('T')[0];
        }

        // 公開API
        createReport(config) {
            const reportId = 'report_' + Date.now();
            const report = {
                id: reportId,
                title: `${REPORT_CONFIG.reportTypes[config.type].name} - ${config.startDate}～${config.endDate}`,
                type: config.type,
                config: config,
                content: this.generateReportHTML(config),
                created: Date.now(),
                modified: Date.now()
            };

            this.reports.unshift(report);
            this.saveReports();
            return report;
        }

        getReport(reportId) {
            return this.reports.find(r => r.id === reportId);
        }

        updateReport(reportId, updates) {
            const reportIndex = this.reports.findIndex(r => r.id === reportId);
            if (reportIndex !== -1) {
                this.reports[reportIndex] = { ...this.reports[reportIndex], ...updates, modified: Date.now() };
                this.saveReports();
                return this.reports[reportIndex];
            }
            return null;
        }

        getAllReports() {
            return [...this.reports];
        }
    }

    // 初期化
    document.addEventListener('DOMContentLoaded', () => {
        // レポートコンテナが存在する場合のみ初期化
        if (document.querySelector('#report-container, .report-container')) {
            window.reportGenerator = new ReportGenerator();
        }
    });

})();