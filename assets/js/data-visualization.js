// データ可視化ツール
// チャート、グラフ、統計データの可視化

(function() {
    'use strict';

    // 可視化設定
    const VIZ_CONFIG = {
        storageKey: 'nyusatsu-viz-data',
        defaultColors: [
            '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
            '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6b7280'
        ],
        chartTypes: {
            line: '折れ線グラフ',
            bar: '棒グラフ',
            pie: '円グラフ',
            doughnut: 'ドーナツグラフ',
            area: 'エリアグラフ',
            scatter: '散布図'
        },
        animations: {
            duration: 800,
            easing: 'easeInOutQuart'
        }
    };

    // データ可視化エンジン
    class DataVisualizationEngine {
        constructor() {
            this.charts = new Map();
            this.datasets = new Map();
            this.init();
        }

        init() {
            this.loadSampleData();
            this.setupVisualizationInterface();
            this.bindEvents();
        }

        loadSampleData() {
            // サンプルデータの作成（実際の実装では外部データソースから取得）
            const sampleData = {
                bidTrends: {
                    name: '入札動向',
                    type: 'line',
                    data: {
                        labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
                        datasets: [{
                            label: '入札件数',
                            data: [120, 135, 142, 158, 163, 171],
                            borderColor: VIZ_CONFIG.defaultColors[0],
                            backgroundColor: this.hexToRgba(VIZ_CONFIG.defaultColors[0], 0.1),
                            tension: 0.3
                        }, {
                            label: '平均競争率',
                            data: [3.2, 3.5, 3.1, 3.8, 4.2, 3.9],
                            borderColor: VIZ_CONFIG.defaultColors[1],
                            backgroundColor: this.hexToRgba(VIZ_CONFIG.defaultColors[1], 0.1),
                            tension: 0.3,
                            yAxisID: 'y1'
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: '月別入札動向'
                            },
                            legend: {
                                position: 'top',
                            }
                        },
                        scales: {
                            y: {
                                type: 'linear',
                                display: true,
                                position: 'left',
                                title: {
                                    display: true,
                                    text: '入札件数'
                                }
                            },
                            y1: {
                                type: 'linear',
                                display: true,
                                position: 'right',
                                title: {
                                    display: true,
                                    text: '競争率'
                                },
                                grid: {
                                    drawOnChartArea: false,
                                }
                            }
                        }
                    }
                },
                categoryDistribution: {
                    name: 'カテゴリ別分布',
                    type: 'doughnut',
                    data: {
                        labels: ['建設工事', '業務委託', '物品調達', '清掃・保守', 'IT関連', 'その他'],
                        datasets: [{
                            data: [35, 25, 15, 10, 10, 5],
                            backgroundColor: VIZ_CONFIG.defaultColors.slice(0, 6),
                            borderWidth: 2,
                            borderColor: '#ffffff'
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: '入札カテゴリ別分布'
                            },
                            legend: {
                                position: 'right',
                            }
                        }
                    }
                },
                budgetAnalysis: {
                    name: '予算規模分析',
                    type: 'bar',
                    data: {
                        labels: ['100万未満', '100-500万', '500-1000万', '1000-5000万', '5000万以上'],
                        datasets: [{
                            label: '案件数',
                            data: [45, 32, 28, 15, 8],
                            backgroundColor: VIZ_CONFIG.defaultColors[2],
                            borderColor: VIZ_CONFIG.defaultColors[2],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: '予算規模別案件数'
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: '案件数'
                                }
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: '予算規模'
                                }
                            }
                        }
                    }
                },
                successRate: {
                    name: '落札率推移',
                    type: 'area',
                    data: {
                        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                        datasets: [{
                            label: '自社落札率',
                            data: [12, 15, 18, 22],
                            fill: true,
                            backgroundColor: this.hexToRgba(VIZ_CONFIG.defaultColors[4], 0.3),
                            borderColor: VIZ_CONFIG.defaultColors[4],
                            tension: 0.3
                        }, {
                            label: '業界平均',
                            data: [15, 16, 17, 18],
                            fill: true,
                            backgroundColor: this.hexToRgba(VIZ_CONFIG.defaultColors[5], 0.2),
                            borderColor: VIZ_CONFIG.defaultColors[5],
                            tension: 0.3
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: '四半期別落札率推移'
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 30,
                                title: {
                                    display: true,
                                    text: '落札率 (%)'
                                }
                            }
                        }
                    }
                },
                competitorAnalysis: {
                    name: '競合分析',
                    type: 'scatter',
                    data: {
                        datasets: [{
                            label: '競合A',
                            data: [
                                {x: 85, y: 12},
                                {x: 92, y: 15},
                                {x: 78, y: 8},
                                {x: 88, y: 18}
                            ],
                            backgroundColor: VIZ_CONFIG.defaultColors[0]
                        }, {
                            label: '競合B',
                            data: [
                                {x: 79, y: 10},
                                {x: 84, y: 14},
                                {x: 81, y: 12},
                                {x: 86, y: 16}
                            ],
                            backgroundColor: VIZ_CONFIG.defaultColors[1]
                        }, {
                            label: '自社',
                            data: [
                                {x: 90, y: 20},
                                {x: 95, y: 22},
                                {x: 87, y: 18},
                                {x: 93, y: 24}
                            ],
                            backgroundColor: VIZ_CONFIG.defaultColors[2]
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: '競合分析（技術評価 vs 落札率）'
                            }
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: '技術評価点'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: '落札率 (%)'
                                }
                            }
                        }
                    }
                }
            };

            Object.entries(sampleData).forEach(([key, data]) => {
                this.datasets.set(key, data);
            });
        }

        setupVisualizationInterface() {
            const container = document.querySelector('#visualization-container, .visualization-container');
            if (!container) return;

            container.innerHTML = `
                <div class="visualization-header">
                    <h2>データ可視化ツール</h2>
                    <div class="visualization-controls">
                        <select id="chart-selector" class="chart-selector">
                            <option value="">チャートを選択</option>
                            ${Array.from(this.datasets.entries()).map(([key, data]) => 
                                `<option value="${key}">${data.name}</option>`
                            ).join('')}
                        </select>
                        <button class="btn btn-secondary" id="export-chart">
                            <i class="fas fa-download"></i>
                            エクスポート
                        </button>
                        <button class="btn btn-primary" id="create-chart">
                            <i class="fas fa-plus"></i>
                            カスタムチャート
                        </button>
                    </div>
                </div>
                
                <div class="visualization-content">
                    <div class="chart-grid">
                        ${this.generateChartGrid()}
                    </div>
                </div>
                
                <div class="chart-details" id="chart-details" style="display: none;">
                    <div class="details-header">
                        <h3>チャート詳細</h3>
                        <button class="btn-close" id="close-details">&times;</button>
                    </div>
                    <div class="details-content">
                        <canvas id="detail-chart"></canvas>
                        <div class="chart-info">
                            <h4>統計情報</h4>
                            <div id="chart-stats"></div>
                        </div>
                    </div>
                </div>
            `;

            this.renderAllCharts();
        }

        generateChartGrid() {
            return Array.from(this.datasets.entries()).map(([key, data]) => `
                <div class="chart-card" data-chart="${key}">
                    <div class="chart-header">
                        <h3>${data.name}</h3>
                        <div class="chart-actions">
                            <button class="btn-chart-action" data-action="fullscreen" title="拡大表示">
                                <i class="fas fa-expand"></i>
                            </button>
                            <button class="btn-chart-action" data-action="download" title="ダウンロード">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                    </div>
                    <div class="chart-container">
                        <canvas id="chart-${key}"></canvas>
                    </div>
                    <div class="chart-summary">
                        ${this.generateChartSummary(data)}
                    </div>
                </div>
            `).join('');
        }

        generateChartSummary(data) {
            // データセットから基本統計を生成
            const dataset = data.data.datasets[0];
            if (!dataset || !dataset.data) return '';

            let summary = '';
            if (Array.isArray(dataset.data)) {
                const values = dataset.data.filter(v => typeof v === 'number');
                if (values.length > 0) {
                    const max = Math.max(...values);
                    const min = Math.min(...values);
                    const avg = values.reduce((a, b) => a + b, 0) / values.length;
                    
                    summary = `
                        <div class="stats-row">
                            <span class="stat-item">最大: ${max.toLocaleString()}</span>
                            <span class="stat-item">最小: ${min.toLocaleString()}</span>
                            <span class="stat-item">平均: ${avg.toFixed(1)}</span>
                        </div>
                    `;
                }
            }

            return summary;
        }

        renderAllCharts() {
            this.datasets.forEach((data, key) => {
                this.renderChart(key, data);
            });
        }

        renderChart(key, data) {
            const canvas = document.getElementById(`chart-${key}`);
            if (!canvas) return;

            // 既存のチャートを破棄
            if (this.charts.has(key)) {
                this.charts.get(key).destroy();
            }

            const ctx = canvas.getContext('2d');
            
            // チャートタイプに応じた設定調整
            const config = {
                type: this.mapChartType(data.type),
                data: data.data,
                options: {
                    ...data.options,
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: VIZ_CONFIG.animations,
                    plugins: {
                        ...data.options?.plugins,
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: 'white',
                            bodyColor: 'white',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            borderWidth: 1
                        }
                    }
                }
            };

            const chart = new Chart(ctx, config);
            this.charts.set(key, chart);
        }

        mapChartType(type) {
            // カスタムタイプをChart.jsタイプにマッピング
            const typeMap = {
                area: 'line',
                doughnut: 'doughnut'
            };
            return typeMap[type] || type;
        }

        bindEvents() {
            const container = document.querySelector('.visualization-container');
            if (!container) return;

            // チャート選択
            const selector = container.querySelector('#chart-selector');
            if (selector) {
                selector.addEventListener('change', (e) => {
                    if (e.target.value) {
                        this.showChartDetails(e.target.value);
                    }
                });
            }

            // チャートアクション
            container.addEventListener('click', (e) => {
                const action = e.target.closest('[data-action]');
                if (action) {
                    const chartCard = action.closest('.chart-card');
                    const chartKey = chartCard.dataset.chart;
                    
                    switch (action.dataset.action) {
                        case 'fullscreen':
                            this.showChartDetails(chartKey);
                            break;
                        case 'download':
                            this.downloadChart(chartKey);
                            break;
                    }
                }
            });

            // 詳細画面を閉じる
            const closeBtn = container.querySelector('#close-details');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    this.hideChartDetails();
                });
            }

            // エクスポート
            const exportBtn = container.querySelector('#export-chart');
            if (exportBtn) {
                exportBtn.addEventListener('click', () => {
                    this.exportAllCharts();
                });
            }

            // カスタムチャート作成
            const createBtn = container.querySelector('#create-chart');
            if (createBtn) {
                createBtn.addEventListener('click', () => {
                    this.showChartBuilder();
                });
            }
        }

        showChartDetails(chartKey) {
            const data = this.datasets.get(chartKey);
            if (!data) return;

            const detailsPanel = document.getElementById('chart-details');
            const detailCanvas = document.getElementById('detail-chart');
            const statsDiv = document.getElementById('chart-stats');

            if (!detailsPanel || !detailCanvas) return;

            // 詳細チャートを描画
            const ctx = detailCanvas.getContext('2d');
            
            // 既存の詳細チャートを破棄
            if (this.detailChart) {
                this.detailChart.destroy();
            }

            const config = {
                type: this.mapChartType(data.type),
                data: data.data,
                options: {
                    ...data.options,
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        ...data.options?.plugins,
                        legend: {
                            ...data.options?.plugins?.legend,
                            position: 'top'
                        }
                    }
                }
            };

            this.detailChart = new Chart(ctx, config);

            // 統計情報を生成
            statsDiv.innerHTML = this.generateDetailedStats(data);

            // パネルを表示
            detailsPanel.style.display = 'block';
            setTimeout(() => detailsPanel.classList.add('show'), 10);
        }

        hideChartDetails() {
            const detailsPanel = document.getElementById('chart-details');
            if (detailsPanel) {
                detailsPanel.classList.remove('show');
                setTimeout(() => {
                    detailsPanel.style.display = 'none';
                }, 300);
            }
        }

        generateDetailedStats(data) {
            const datasets = data.data.datasets;
            if (!datasets || datasets.length === 0) return '';

            let stats = '<div class="detailed-stats">';
            
            datasets.forEach((dataset, index) => {
                if (!dataset.data) return;
                
                let values = dataset.data;
                if (typeof values[0] === 'object') {
                    // 散布図などのオブジェクト形式
                    values = values.map(point => point.y || point.value || 0);
                }
                
                const numValues = values.filter(v => typeof v === 'number');
                if (numValues.length === 0) return;

                const max = Math.max(...numValues);
                const min = Math.min(...numValues);
                const sum = numValues.reduce((a, b) => a + b, 0);
                const avg = sum / numValues.length;
                const median = this.calculateMedian(numValues);
                const stdDev = this.calculateStandardDeviation(numValues, avg);

                stats += `
                    <div class="dataset-stats">
                        <h5>${dataset.label || `データセット ${index + 1}`}</h5>
                        <div class="stats-grid">
                            <div class="stat-item">
                                <span class="stat-label">合計</span>
                                <span class="stat-value">${sum.toLocaleString()}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">平均</span>
                                <span class="stat-value">${avg.toFixed(2)}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">中央値</span>
                                <span class="stat-value">${median.toFixed(2)}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">最大値</span>
                                <span class="stat-value">${max.toLocaleString()}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">最小値</span>
                                <span class="stat-value">${min.toLocaleString()}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">標準偏差</span>
                                <span class="stat-value">${stdDev.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                `;
            });

            stats += '</div>';
            return stats;
        }

        calculateMedian(values) {
            const sorted = [...values].sort((a, b) => a - b);
            const middle = Math.floor(sorted.length / 2);
            
            if (sorted.length % 2 === 0) {
                return (sorted[middle - 1] + sorted[middle]) / 2;
            }
            return sorted[middle];
        }

        calculateStandardDeviation(values, mean) {
            const squaredDiffs = values.map(value => Math.pow(value - mean, 2));
            const avgSquaredDiff = squaredDiffs.reduce((a, b) => a + b, 0) / values.length;
            return Math.sqrt(avgSquaredDiff);
        }

        downloadChart(chartKey) {
            const chart = this.charts.get(chartKey);
            if (!chart) return;

            const canvas = chart.canvas;
            const url = canvas.toDataURL('image/png');
            
            const link = document.createElement('a');
            link.download = `chart-${chartKey}-${Date.now()}.png`;
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        exportAllCharts() {
            const exportData = {
                charts: {},
                exportDate: new Date().toISOString(),
                version: '1.0'
            };

            this.datasets.forEach((data, key) => {
                exportData.charts[key] = {
                    name: data.name,
                    type: data.type,
                    data: data.data,
                    options: data.options
                };
            });

            const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
                type: 'application/json' 
            });
            
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `charts-export-${Date.now()}.json`;
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }

        showChartBuilder() {
            // チャートビルダーモーダルを表示
            const modal = document.createElement('div');
            modal.className = 'chart-builder-modal';
            modal.innerHTML = `
                <div class="modal-overlay"></div>
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>カスタムチャート作成</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="chart-builder-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label>チャートタイプ</label>
                                <select id="builder-chart-type">
                                    ${Object.entries(VIZ_CONFIG.chartTypes).map(([key, value]) => 
                                        `<option value="${key}">${value}</option>`
                                    ).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>チャート名</label>
                                <input type="text" id="builder-chart-name" placeholder="チャート名を入力">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>データ（CSV形式）</label>
                            <textarea id="builder-data" placeholder="ラベル1,値1&#10;ラベル2,値2&#10;..." rows="6"></textarea>
                        </div>
                        <div class="form-actions">
                            <button class="btn btn-secondary" id="builder-cancel">キャンセル</button>
                            <button class="btn btn-primary" id="builder-create">作成</button>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            // モーダルイベント
            modal.querySelector('.modal-close').addEventListener('click', () => {
                modal.remove();
            });

            modal.querySelector('#builder-cancel').addEventListener('click', () => {
                modal.remove();
            });

            modal.querySelector('#builder-create').addEventListener('click', () => {
                this.createCustomChart(modal);
            });
        }

        createCustomChart(modal) {
            const chartType = modal.querySelector('#builder-chart-type').value;
            const chartName = modal.querySelector('#builder-chart-name').value;
            const csvData = modal.querySelector('#builder-data').value;

            if (!chartName || !csvData) {
                alert('チャート名とデータを入力してください');
                return;
            }

            try {
                const parsedData = this.parseCSVData(csvData, chartType);
                const chartConfig = {
                    name: chartName,
                    type: chartType,
                    data: parsedData,
                    options: this.getDefaultChartOptions(chartType, chartName)
                };

                // カスタムチャートを追加
                const customKey = `custom-${Date.now()}`;
                this.datasets.set(customKey, chartConfig);

                // UIを更新
                this.updateChartGrid();
                modal.remove();

            } catch (error) {
                alert('データの形式が正しくありません: ' + error.message);
            }
        }

        parseCSVData(csvData, chartType) {
            const lines = csvData.trim().split('\n');
            const labels = [];
            const values = [];

            lines.forEach(line => {
                const [label, value] = line.split(',').map(s => s.trim());
                if (label && value && !isNaN(parseFloat(value))) {
                    labels.push(label);
                    values.push(parseFloat(value));
                }
            });

            if (labels.length === 0) {
                throw new Error('有効なデータが見つかりません');
            }

            return {
                labels: labels,
                datasets: [{
                    label: 'データ',
                    data: values,
                    backgroundColor: chartType === 'pie' || chartType === 'doughnut' 
                        ? VIZ_CONFIG.defaultColors.slice(0, values.length)
                        : VIZ_CONFIG.defaultColors[0],
                    borderColor: VIZ_CONFIG.defaultColors[0],
                    borderWidth: 2
                }]
            };
        }

        getDefaultChartOptions(chartType, title) {
            return {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: title
                    },
                    legend: {
                        position: chartType === 'pie' || chartType === 'doughnut' ? 'right' : 'top'
                    }
                },
                scales: chartType === 'pie' || chartType === 'doughnut' ? {} : {
                    y: {
                        beginAtZero: true
                    }
                }
            };
        }

        updateChartGrid() {
            const container = document.querySelector('.chart-grid');
            if (container) {
                container.innerHTML = this.generateChartGrid();
                this.renderAllCharts();
            }
        }

        // ユーティリティメソッド
        hexToRgba(hex, alpha) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }

        // 公開API
        addDataset(key, data) {
            this.datasets.set(key, data);
            this.updateChartGrid();
        }

        removeDataset(key) {
            if (this.charts.has(key)) {
                this.charts.get(key).destroy();
                this.charts.delete(key);
            }
            this.datasets.delete(key);
            this.updateChartGrid();
        }

        updateDataset(key, newData) {
            if (this.datasets.has(key)) {
                this.datasets.set(key, { ...this.datasets.get(key), ...newData });
                this.renderChart(key, this.datasets.get(key));
            }
        }

        getChart(key) {
            return this.charts.get(key);
        }

        getAllCharts() {
            return Array.from(this.charts.entries());
        }
    }

    // Chart.jsの動的読み込み
    function loadChartJS() {
        return new Promise((resolve, reject) => {
            if (window.Chart) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // 初期化
    document.addEventListener('DOMContentLoaded', async () => {
        // 可視化コンテナが存在する場合のみ初期化
        if (document.querySelector('#visualization-container, .visualization-container')) {
            try {
                await loadChartJS();
                window.dataVisualization = new DataVisualizationEngine();
            } catch (error) {
                console.error('Chart.js loading failed:', error);
            }
        }
    });

})();