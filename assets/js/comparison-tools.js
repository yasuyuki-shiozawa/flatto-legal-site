// 比較ツール
// 入札案件、業者、価格等の詳細比較機能

(function() {
    'use strict';

    // 比較ツール設定
    const COMPARISON_CONFIG = {
        storageKey: 'nyusatsu-comparisons',
        maxItems: 10, // 一度に比較できる最大アイテム数
        comparisonTypes: {
            tenders: {
                name: '入札案件比較',
                description: '複数の入札案件を詳細比較',
                fields: [
                    { key: 'title', name: '案件名', type: 'text' },
                    { key: 'organization', name: '発注機関', type: 'text' },
                    { key: 'category', name: 'カテゴリ', type: 'category' },
                    { key: 'budget', name: '予算額', type: 'currency' },
                    { key: 'deadline', name: '応札期限', type: 'date' },
                    { key: 'conditions', name: '参加条件', type: 'text' },
                    { key: 'location', name: '履行場所', type: 'text' },
                    { key: 'period', name: '履行期間', type: 'text' },
                    { key: 'evaluation', name: '評価方式', type: 'text' },
                    { key: 'score', name: '適合度スコア', type: 'score' }
                ]
            },
            vendors: {
                name: '事業者比較',
                description: '競合事業者の実績・能力比較',
                fields: [
                    { key: 'name', name: '事業者名', type: 'text' },
                    { key: 'type', name: '事業者種別', type: 'text' },
                    { key: 'capital', name: '資本金', type: 'currency' },
                    { key: 'employees', name: '従業員数', type: 'number' },
                    { key: 'founded', name: '設立年', type: 'year' },
                    { key: 'experience', name: '実績年数', type: 'number' },
                    { key: 'successRate', name: '落札率', type: 'percentage' },
                    { key: 'avgContract', name: '平均契約額', type: 'currency' },
                    { key: 'specialties', name: '専門分野', type: 'text' },
                    { key: 'competitiveness', name: '競争力指数', type: 'score' }
                ]
            },
            contracts: {
                name: '契約条件比較',
                description: '契約条件・価格の詳細比較',
                fields: [
                    { key: 'contractName', name: '契約名', type: 'text' },
                    { key: 'contractor', name: '契約者', type: 'text' },
                    { key: 'contractValue', name: '契約金額', type: 'currency' },
                    { key: 'duration', name: '契約期間', type: 'text' },
                    { key: 'startDate', name: '開始日', type: 'date' },
                    { key: 'endDate', name: '終了日', type: 'date' },
                    { key: 'penalties', name: '違約金条項', type: 'text' },
                    { key: 'warranty', name: '保証期間', type: 'text' },
                    { key: 'paymentTerms', name: '支払条件', type: 'text' },
                    { key: 'costPerformance', name: 'コストパフォーマンス', type: 'score' }
                ]
            }
        },
        scoreRanges: {
            excellent: { min: 80, max: 100, color: '#10b981', label: '優秀' },
            good: { min: 60, max: 79, color: '#3b82f6', label: '良好' },
            average: { min: 40, max: 59, color: '#f59e0b', label: '平均' },
            poor: { min: 20, max: 39, color: '#ef4444', label: '要改善' },
            critical: { min: 0, max: 19, color: '#dc2626', label: '深刻' }
        }
    };

    // 比較ツールマネージャー
    class ComparisonToolsManager {
        constructor() {
            this.comparisons = this.loadComparisons();
            this.currentComparison = null;
            this.sampleData = this.loadSampleData();
            this.init();
        }

        init() {
            this.setupComparisonInterface();
            this.bindEvents();
        }

        loadComparisons() {
            const saved = localStorage.getItem(COMPARISON_CONFIG.storageKey);
            return saved ? JSON.parse(saved) : [];
        }

        saveComparisons() {
            localStorage.setItem(COMPARISON_CONFIG.storageKey, JSON.stringify(this.comparisons));
        }

        loadSampleData() {
            return {
                tenders: [
                    {
                        id: 'tender1',
                        title: '新庁舎建設工事',
                        organization: '○○市役所',
                        category: '建設工事',
                        budget: 150000000,
                        deadline: '2024-08-15',
                        conditions: '建設業許可（建築一式）、施工実績3件以上',
                        location: '○○市中央区',
                        period: '2024年9月～2025年3月',
                        evaluation: '総合評価方式',
                        score: 85
                    },
                    {
                        id: 'tender2',
                        title: '道路改修工事',
                        organization: '○○県土木事務所',
                        category: '土木工事',
                        budget: 80000000,
                        deadline: '2024-07-30',
                        conditions: '建設業許可（土木一式）、地域要件あり',
                        location: '○○県内一円',
                        period: '2024年8月～2024年12月',
                        evaluation: '価格競争',
                        score: 72
                    },
                    {
                        id: 'tender3',
                        title: 'システム開発業務委託',
                        organization: '○○市情報政策課',
                        category: 'IT関連',
                        budget: 45000000,
                        deadline: '2024-09-10',
                        conditions: 'ISO27001認証、開発実績5件以上',
                        location: '○○市',
                        period: '2024年10月～2025年3月',
                        evaluation: '企画提案方式',
                        score: 90
                    }
                ],
                vendors: [
                    {
                        id: 'vendor1',
                        name: '株式会社A建設',
                        type: '総合建設業',
                        capital: 100000000,
                        employees: 250,
                        founded: 1985,
                        experience: 39,
                        successRate: 28,
                        avgContract: 85000000,
                        specialties: '公共建築、土木工事',
                        competitiveness: 82
                    },
                    {
                        id: 'vendor2',
                        name: 'B工業株式会社',
                        type: '専門工事業',
                        capital: 50000000,
                        employees: 120,
                        founded: 1995,
                        experience: 29,
                        successRate: 35,
                        avgContract: 45000000,
                        specialties: '道路工事、河川工事',
                        competitiveness: 75
                    },
                    {
                        id: 'vendor3',
                        name: 'C情報システム',
                        type: 'システム開発',
                        capital: 30000000,
                        employees: 85,
                        founded: 2005,
                        experience: 19,
                        successRate: 42,
                        avgContract: 25000000,
                        specialties: '自治体システム、Web開発',
                        competitiveness: 88
                    }
                ],
                contracts: [
                    {
                        id: 'contract1',
                        contractName: '庁舎清掃業務委託',
                        contractor: '○○清掃サービス',
                        contractValue: 12000000,
                        duration: '1年間',
                        startDate: '2024-04-01',
                        endDate: '2025-03-31',
                        penalties: '履行遅延：日額0.1%',
                        warranty: '作業完了後30日',
                        paymentTerms: '月末締め翌月払い',
                        costPerformance: 78
                    },
                    {
                        id: 'contract2',
                        contractName: 'ネットワーク保守業務',
                        contractor: 'IT保守センター',
                        contractValue: 8400000,
                        duration: '2年間',
                        startDate: '2024-04-01',
                        endDate: '2026-03-31',
                        penalties: '障害対応遅延：時間単価の200%',
                        warranty: '修理後90日',
                        paymentTerms: '四半期前払い',
                        costPerformance: 85
                    }
                ]
            };
        }

        setupComparisonInterface() {
            const container = document.querySelector('#comparison-container, .comparison-container');
            if (!container) return;

            container.innerHTML = `
                <div class="comparison-header">
                    <h2>比較ツール</h2>
                    <div class="comparison-controls">
                        <select id="comparison-type" class="form-control">
                            <option value="">比較タイプを選択</option>
                            ${Object.entries(COMPARISON_CONFIG.comparisonTypes).map(([key, type]) => 
                                `<option value="${key}">${type.name}</option>`
                            ).join('')}
                        </select>
                        <button class="btn btn-primary" id="new-comparison">
                            <i class="fas fa-plus"></i>
                            新規比較
                        </button>
                        <button class="btn btn-secondary" id="saved-comparisons">
                            <i class="fas fa-folder"></i>
                            保存済み比較
                        </button>
                    </div>
                </div>
                
                <div class="comparison-content">
                    <div class="comparison-builder" id="comparison-builder" style="display: none;">
                        <div class="builder-controls">
                            <div class="item-selector">
                                <h3>比較対象を選択</h3>
                                <div class="available-items" id="available-items">
                                    <!-- 動的に生成 -->
                                </div>
                            </div>
                            <div class="selected-items">
                                <h3>選択済みアイテム <span id="selected-count">0</span>/${COMPARISON_CONFIG.maxItems}</h3>
                                <div class="selected-list" id="selected-list">
                                    <!-- 動的に生成 -->
                                </div>
                            </div>
                        </div>
                        
                        <div class="builder-actions">
                            <button class="btn btn-primary" id="start-comparison" disabled>
                                <i class="fas fa-chart-line"></i>
                                比較開始
                            </button>
                            <button class="btn btn-secondary" id="clear-selection">
                                <i class="fas fa-trash"></i>
                                選択クリア
                            </button>
                        </div>
                    </div>
                    
                    <div class="comparison-viewer" id="comparison-viewer" style="display: none;">
                        <div class="viewer-header">
                            <h3 id="comparison-title"></h3>
                            <div class="viewer-controls">
                                <button class="btn btn-secondary" id="edit-comparison">
                                    <i class="fas fa-edit"></i>
                                    編集
                                </button>
                                <button class="btn btn-secondary" id="save-comparison">
                                    <i class="fas fa-save"></i>
                                    保存
                                </button>
                                <button class="btn btn-secondary" id="export-comparison">
                                    <i class="fas fa-download"></i>
                                    エクスポート
                                </button>
                                <button class="btn btn-secondary" id="close-comparison">
                                    <i class="fas fa-times"></i>
                                    閉じる
                                </button>
                            </div>
                        </div>
                        
                        <div class="comparison-table-container">
                            <table class="comparison-table" id="comparison-table">
                                <!-- 動的に生成 -->
                            </table>
                        </div>
                        
                        <div class="comparison-analysis" id="comparison-analysis">
                            <!-- 分析結果 -->
                        </div>
                    </div>
                    
                    <div class="comparison-welcome" id="comparison-welcome">
                        <div class="welcome-content">
                            <h3>比較ツールへようこそ</h3>
                            <p>複数の入札案件、事業者、契約条件を並べて詳細比較できます。</p>
                            
                            <div class="comparison-types">
                                ${Object.entries(COMPARISON_CONFIG.comparisonTypes).map(([key, type]) => `
                                    <div class="type-card" data-type="${key}">
                                        <h4>${type.name}</h4>
                                        <p>${type.description}</p>
                                        <button class="btn btn-outline-primary">選択</button>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        bindEvents() {
            const container = document.querySelector('.comparison-container');
            if (!container) return;

            // 比較タイプ選択
            const typeSelect = container.querySelector('#comparison-type');
            if (typeSelect) {
                typeSelect.addEventListener('change', (e) => {
                    this.selectComparisonType(e.target.value);
                });
            }

            // 新規比較
            const newBtn = container.querySelector('#new-comparison');
            if (newBtn) {
                newBtn.addEventListener('click', () => {
                    const selectedType = typeSelect.value;
                    if (selectedType) {
                        this.showComparisonBuilder(selectedType);
                    } else {
                        alert('比較タイプを選択してください');
                    }
                });
            }

            // タイプカード選択
            container.addEventListener('click', (e) => {
                const typeCard = e.target.closest('.type-card');
                if (typeCard) {
                    const type = typeCard.dataset.type;
                    typeSelect.value = type;
                    this.showComparisonBuilder(type);
                }
            });

            // アイテム選択
            container.addEventListener('click', (e) => {
                const selectBtn = e.target.closest('.item-select');
                if (selectBtn) {
                    const itemCard = selectBtn.closest('.item-card');
                    const itemId = itemCard.dataset.itemId;
                    const type = itemCard.dataset.type;
                    this.addItemToComparison(type, itemId);
                }
            });

            // アイテム削除
            container.addEventListener('click', (e) => {
                const removeBtn = e.target.closest('.item-remove');
                if (removeBtn) {
                    const selectedItem = removeBtn.closest('.selected-item');
                    const itemId = selectedItem.dataset.itemId;
                    this.removeItemFromComparison(itemId);
                }
            });

            // 比較開始
            const startBtn = container.querySelector('#start-comparison');
            if (startBtn) {
                startBtn.addEventListener('click', () => {
                    this.startComparison();
                });
            }

            // 選択クリア
            const clearBtn = container.querySelector('#clear-selection');
            if (clearBtn) {
                clearBtn.addEventListener('click', () => {
                    this.clearSelection();
                });
            }

            // ビューワー制御
            ['#edit-comparison', '#save-comparison', '#export-comparison', '#close-comparison'].forEach(selector => {
                const btn = container.querySelector(selector);
                if (btn) {
                    btn.addEventListener('click', () => {
                        const action = selector.replace('#', '').replace('-comparison', '');
                        this.handleViewerAction(action);
                    });
                }
            });
        }

        selectComparisonType(type) {
            if (!type) return;
            
            const welcomeDiv = document.querySelector('#comparison-welcome');
            if (welcomeDiv) {
                welcomeDiv.style.display = 'none';
            }
        }

        showComparisonBuilder(type) {
            const builder = document.querySelector('#comparison-builder');
            const welcome = document.querySelector('#comparison-welcome');
            const viewer = document.querySelector('#comparison-viewer');
            
            if (builder) builder.style.display = 'block';
            if (welcome) welcome.style.display = 'none';
            if (viewer) viewer.style.display = 'none';
            
            this.currentComparisonType = type;
            this.selectedItems = [];
            this.renderAvailableItems(type);
            this.updateSelectedItems();
        }

        renderAvailableItems(type) {
            const container = document.querySelector('#available-items');
            if (!container) return;

            const items = this.sampleData[type] || [];
            container.innerHTML = `
                <div class="items-grid">
                    ${items.map(item => this.renderItemCard(item, type)).join('')}
                </div>
            `;
        }

        renderItemCard(item, type) {
            const typeConfig = COMPARISON_CONFIG.comparisonTypes[type];
            const titleField = typeConfig.fields.find(f => f.key === 'title' || f.key === 'name' || f.key === 'contractName');
            const title = item[titleField?.key] || 'アイテム';
            
            return `
                <div class="item-card" data-item-id="${item.id}" data-type="${type}">
                    <div class="item-header">
                        <h4>${title}</h4>
                        <button class="btn btn-sm btn-primary item-select">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div class="item-details">
                        ${this.renderItemPreview(item, typeConfig, 3)}
                    </div>
                </div>
            `;
        }

        renderItemPreview(item, typeConfig, maxFields = 3) {
            return typeConfig.fields.slice(1, maxFields + 1).map(field => {
                const value = this.formatFieldValue(item[field.key], field.type);
                return `<div class="detail-item"><span class="label">${field.name}:</span> ${value}</div>`;
            }).join('');
        }

        addItemToComparison(type, itemId) {
            if (this.selectedItems.length >= COMPARISON_CONFIG.maxItems) {
                alert(`一度に比較できるのは${COMPARISON_CONFIG.maxItems}件までです`);
                return;
            }

            const item = this.sampleData[type].find(i => i.id === itemId);
            if (item && !this.selectedItems.find(i => i.id === itemId)) {
                this.selectedItems.push(item);
                this.updateSelectedItems();
                this.updateStartButton();
            }
        }

        removeItemFromComparison(itemId) {
            this.selectedItems = this.selectedItems.filter(item => item.id !== itemId);
            this.updateSelectedItems();
            this.updateStartButton();
        }

        updateSelectedItems() {
            const container = document.querySelector('#selected-list');
            const counter = document.querySelector('#selected-count');
            
            if (counter) {
                counter.textContent = this.selectedItems.length;
            }
            
            if (!container) return;

            if (this.selectedItems.length === 0) {
                container.innerHTML = '<div class="no-selection">比較するアイテムを選択してください</div>';
                return;
            }

            const typeConfig = COMPARISON_CONFIG.comparisonTypes[this.currentComparisonType];
            const titleField = typeConfig.fields.find(f => f.key === 'title' || f.key === 'name' || f.key === 'contractName');

            container.innerHTML = this.selectedItems.map(item => `
                <div class="selected-item" data-item-id="${item.id}">
                    <span class="item-title">${item[titleField?.key] || 'アイテム'}</span>
                    <button class="btn btn-sm btn-outline-danger item-remove">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join('');
        }

        updateStartButton() {
            const btn = document.querySelector('#start-comparison');
            if (btn) {
                btn.disabled = this.selectedItems.length < 2;
            }
        }

        clearSelection() {
            this.selectedItems = [];
            this.updateSelectedItems();
            this.updateStartButton();
        }

        startComparison() {
            if (this.selectedItems.length < 2) {
                alert('比較するには2つ以上のアイテムを選択してください');
                return;
            }

            this.currentComparison = {
                id: 'comparison_' + Date.now(),
                type: this.currentComparisonType,
                items: [...this.selectedItems],
                created: Date.now()
            };

            this.showComparisonViewer();
        }

        showComparisonViewer() {
            const builder = document.querySelector('#comparison-builder');
            const viewer = document.querySelector('#comparison-viewer');
            
            if (builder) builder.style.display = 'none';
            if (viewer) viewer.style.display = 'block';
            
            this.renderComparisonTable();
            this.renderComparisonAnalysis();
        }

        renderComparisonTable() {
            const titleElement = document.querySelector('#comparison-title');
            const tableElement = document.querySelector('#comparison-table');
            
            if (titleElement) {
                const typeName = COMPARISON_CONFIG.comparisonTypes[this.currentComparison.type].name;
                titleElement.textContent = `${typeName} (${this.currentComparison.items.length}件)`;
            }
            
            if (!tableElement) return;

            const typeConfig = COMPARISON_CONFIG.comparisonTypes[this.currentComparison.type];
            const items = this.currentComparison.items;

            // テーブルヘッダー
            const headerRow = `
                <thead>
                    <tr>
                        <th class="field-header">項目</th>
                        ${items.map((item, index) => {
                            const titleField = typeConfig.fields.find(f => f.key === 'title' || f.key === 'name' || f.key === 'contractName');
                            const title = item[titleField?.key] || `アイテム${index + 1}`;
                            return `<th class="item-header">${title}</th>`;
                        }).join('')}
                    </tr>
                </thead>
            `;

            // テーブルボディ
            const bodyRows = typeConfig.fields.map(field => {
                const rowClass = this.getFieldRowClass(field);
                return `
                    <tr class="${rowClass}">
                        <td class="field-name">${field.name}</td>
                        ${items.map(item => {
                            const value = this.formatFieldValue(item[field.key], field.type);
                            const cellClass = this.getFieldCellClass(item[field.key], field);
                            return `<td class="${cellClass}">${value}</td>`;
                        }).join('')}
                    </tr>
                `;
            }).join('');

            tableElement.innerHTML = `
                ${headerRow}
                <tbody>
                    ${bodyRows}
                </tbody>
            `;
        }

        getFieldRowClass(field) {
            const classes = ['comparison-row'];
            if (field.type === 'score' || field.type === 'percentage') {
                classes.push('highlight-row');
            }
            return classes.join(' ');
        }

        getFieldCellClass(value, field) {
            const classes = ['comparison-cell'];
            
            if (field.type === 'score' && typeof value === 'number') {
                const range = this.getScoreRange(value);
                classes.push(`score-${range.label.toLowerCase()}`);
            }
            
            return classes.join(' ');
        }

        getScoreRange(score) {
            for (const [key, range] of Object.entries(COMPARISON_CONFIG.scoreRanges)) {
                if (score >= range.min && score <= range.max) {
                    return range;
                }
            }
            return COMPARISON_CONFIG.scoreRanges.average;
        }

        formatFieldValue(value, type) {
            if (value == null || value === '') return '-';

            switch (type) {
                case 'currency':
                    return new Intl.NumberFormat('ja-JP', {
                        style: 'currency',
                        currency: 'JPY',
                        minimumFractionDigits: 0
                    }).format(value);
                
                case 'percentage':
                    return `${value}%`;
                
                case 'number':
                    return value.toLocaleString();
                
                case 'date':
                    return new Date(value).toLocaleDateString('ja-JP');
                
                case 'year':
                    return `${value}年`;
                
                case 'score':
                    if (typeof value === 'number') {
                        const range = this.getScoreRange(value);
                        return `<span class="score-badge" style="background-color: ${range.color}20; color: ${range.color}; border: 1px solid ${range.color};">${value} (${range.label})</span>`;
                    }
                    return value;
                
                default:
                    return value;
            }
        }

        renderComparisonAnalysis() {
            const container = document.querySelector('#comparison-analysis');
            if (!container) return;

            const analysis = this.generateAnalysis();
            container.innerHTML = `
                <div class="analysis-header">
                    <h3>比較分析結果</h3>
                </div>
                
                <div class="analysis-content">
                    <div class="analysis-summary">
                        <h4>総合評価</h4>
                        <div class="ranking-list">
                            ${analysis.ranking.map((item, index) => `
                                <div class="ranking-item rank-${index + 1}">
                                    <span class="rank-number">${index + 1}</span>
                                    <span class="item-name">${item.name}</span>
                                    <span class="total-score">${item.score}点</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="analysis-details">
                        <h4>詳細分析</h4>
                        <div class="analysis-sections">
                            ${analysis.insights.map(insight => `
                                <div class="insight-item">
                                    <h5>${insight.title}</h5>
                                    <p>${insight.description}</p>
                                    ${insight.recommendation ? `<div class="recommendation">${insight.recommendation}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="analysis-charts">
                        <h4>グラフ分析</h4>
                        <div class="charts-grid">
                            <div class="chart-container">
                                <canvas id="comparison-radar-chart"></canvas>
                            </div>
                            <div class="chart-container">
                                <canvas id="comparison-bar-chart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // チャート描画
            setTimeout(() => this.renderAnalysisCharts(analysis), 100);
        }

        generateAnalysis() {
            const items = this.currentComparison.items;
            const typeConfig = COMPARISON_CONFIG.comparisonTypes[this.currentComparison.type];
            
            // スコアフィールドを取得
            const scoreFields = typeConfig.fields.filter(f => f.type === 'score' || f.type === 'percentage');
            
            // 各アイテムの総合スコア計算
            const ranking = items.map(item => {
                const titleField = typeConfig.fields.find(f => f.key === 'title' || f.key === 'name' || f.key === 'contractName');
                const scores = scoreFields.map(field => item[field.key] || 0);
                const totalScore = scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
                
                return {
                    name: item[titleField?.key] || 'アイテム',
                    score: Math.round(totalScore),
                    details: item
                };
            }).sort((a, b) => b.score - a.score);

            // インサイト生成
            const insights = this.generateInsights(items, typeConfig, ranking);

            return { ranking, insights };
        }

        generateInsights(items, typeConfig, ranking) {
            const insights = [];
            
            // 価格分析
            const priceField = typeConfig.fields.find(f => f.type === 'currency');
            if (priceField) {
                const prices = items.map(item => item[priceField.key]).filter(p => p != null);
                if (prices.length > 0) {
                    const maxPrice = Math.max(...prices);
                    const minPrice = Math.min(...prices);
                    const avgPrice = prices.reduce((sum, p) => sum + p, 0) / prices.length;
                    
                    insights.push({
                        title: '価格分析',
                        description: `最高額：${this.formatFieldValue(maxPrice, 'currency')}、最低額：${this.formatFieldValue(minPrice, 'currency')}、平均：${this.formatFieldValue(avgPrice, 'currency')}`,
                        recommendation: maxPrice > minPrice * 2 ? '価格差が大きいため、コストパフォーマンスを重視した選択を推奨します。' : null
                    });
                }
            }

            // スコア分析
            const scoreField = typeConfig.fields.find(f => f.type === 'score');
            if (scoreField) {
                const topItem = ranking[0];
                const bottomItem = ranking[ranking.length - 1];
                
                insights.push({
                    title: 'パフォーマンス分析',
                    description: `最高評価：${topItem.name}（${topItem.score}点）、最低評価：${bottomItem.name}（${bottomItem.score}点）`,
                    recommendation: topItem.score - bottomItem.score > 20 ? '評価差が大きいため、上位選択肢を優先検討することを推奨します。' : null
                });
            }

            // 競争分析
            if (this.currentComparison.type === 'vendors') {
                insights.push({
                    title: '競争力分析',
                    description: '実績年数と落札率のバランスが重要な選択要因となっています。',
                    recommendation: '長期的なパートナーシップを考慮し、実績と信頼性を重視した選択を推奨します。'
                });
            }

            return insights;
        }

        renderAnalysisCharts(analysis) {
            if (typeof Chart === 'undefined') return;

            this.renderRadarChart(analysis);
            this.renderBarChart(analysis);
        }

        renderRadarChart(analysis) {
            const canvas = document.querySelector('#comparison-radar-chart');
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            const typeConfig = COMPARISON_CONFIG.comparisonTypes[this.currentComparison.type];
            const scoreFields = typeConfig.fields.filter(f => f.type === 'score' || f.type === 'percentage');
            
            if (scoreFields.length === 0) return;

            const datasets = this.currentComparison.items.map((item, index) => {
                const titleField = typeConfig.fields.find(f => f.key === 'title' || f.key === 'name' || f.key === 'contractName');
                const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];
                const color = colors[index % colors.length];
                
                return {
                    label: item[titleField?.key] || `アイテム${index + 1}`,
                    data: scoreFields.map(field => item[field.key] || 0),
                    borderColor: color,
                    backgroundColor: color + '20',
                    pointBackgroundColor: color
                };
            });

            new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: scoreFields.map(field => field.name),
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'レーダーチャート比較'
                        }
                    },
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }

        renderBarChart(analysis) {
            const canvas = document.querySelector('#comparison-bar-chart');
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: analysis.ranking.map(item => item.name),
                    datasets: [{
                        label: '総合スコア',
                        data: analysis.ranking.map(item => item.score),
                        backgroundColor: analysis.ranking.map((item, index) => {
                            const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];
                            return colors[index % colors.length];
                        })
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: '総合評価ランキング'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }

        handleViewerAction(action) {
            switch (action) {
                case 'edit':
                    this.showComparisonBuilder(this.currentComparison.type);
                    this.selectedItems = [...this.currentComparison.items];
                    this.updateSelectedItems();
                    this.updateStartButton();
                    break;
                
                case 'save':
                    this.saveCurrentComparison();
                    break;
                
                case 'export':
                    this.exportComparison();
                    break;
                
                case 'close':
                    this.closeComparison();
                    break;
            }
        }

        saveCurrentComparison() {
            if (!this.currentComparison) return;

            const existingIndex = this.comparisons.findIndex(c => c.id === this.currentComparison.id);
            if (existingIndex !== -1) {
                this.comparisons[existingIndex] = { ...this.currentComparison, modified: Date.now() };
            } else {
                this.comparisons.unshift(this.currentComparison);
            }

            this.saveComparisons();
            
            // 成功メッセージ
            this.showMessage('比較結果を保存しました', 'success');
        }

        exportComparison() {
            if (!this.currentComparison) return;

            const typeConfig = COMPARISON_CONFIG.comparisonTypes[this.currentComparison.type];
            const csvContent = this.generateCSV(this.currentComparison.items, typeConfig);
            
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `比較結果_${Date.now()}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        generateCSV(items, typeConfig) {
            const header = ['項目', ...items.map((item, index) => {
                const titleField = typeConfig.fields.find(f => f.key === 'title' || f.key === 'name' || f.key === 'contractName');
                return item[titleField?.key] || `アイテム${index + 1}`;
            })];

            const rows = typeConfig.fields.map(field => {
                return [
                    field.name,
                    ...items.map(item => {
                        const value = item[field.key];
                        if (field.type === 'currency' && typeof value === 'number') {
                            return value;
                        }
                        return value || '';
                    })
                ];
            });

            return [header, ...rows].map(row => 
                row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
            ).join('\n');
        }

        closeComparison() {
            const builder = document.querySelector('#comparison-builder');
            const viewer = document.querySelector('#comparison-viewer');
            const welcome = document.querySelector('#comparison-welcome');
            
            if (builder) builder.style.display = 'none';
            if (viewer) viewer.style.display = 'none';
            if (welcome) welcome.style.display = 'block';
            
            this.currentComparison = null;
        }

        showMessage(message, type = 'info') {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message message-${type}`;
            messageDiv.textContent = message;
            messageDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background-color: ${type === 'success' ? '#10b981' : '#3b82f6'};
                color: white;
                padding: 12px 20px;
                border-radius: 6px;
                z-index: 1000;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            `;
            
            document.body.appendChild(messageDiv);
            
            setTimeout(() => {
                messageDiv.remove();
            }, 3000);
        }

        // 公開API
        createComparison(type, items) {
            this.currentComparison = {
                id: 'comparison_' + Date.now(),
                type: type,
                items: items,
                created: Date.now()
            };
            
            this.showComparisonViewer();
            return this.currentComparison;
        }

        getComparison(id) {
            return this.comparisons.find(c => c.id === id);
        }

        deleteComparison(id) {
            this.comparisons = this.comparisons.filter(c => c.id !== id);
            this.saveComparisons();
        }

        getAllComparisons() {
            return [...this.comparisons];
        }
    }

    // 初期化
    document.addEventListener('DOMContentLoaded', () => {
        // 比較ツールコンテナが存在する場合のみ初期化
        if (document.querySelector('#comparison-container, .comparison-container')) {
            window.comparisonTools = new ComparisonToolsManager();
        }
    });

})();