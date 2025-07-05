// 計算ツール
// 入札価格、期間計算、コスト分析等の計算機能

(function() {
    'use strict';

    // 計算ツール設定
    const CALC_CONFIG = {
        storageKey: 'nyusatsu-calculations',
        maxHistory: 100,
        calculators: {
            bidPrice: {
                name: '入札価格計算',
                description: '適切な入札価格を算出',
                fields: [
                    { key: 'baseCost', name: '基本工事費', type: 'currency', required: true },
                    { key: 'materialCost', name: '材料費', type: 'currency', required: true },
                    { key: 'laborCost', name: '人件費', type: 'currency', required: true },
                    { key: 'overheadRate', name: '諸経費率', type: 'percentage', required: true },
                    { key: 'profitRate', name: '利益率', type: 'percentage', required: true },
                    { key: 'riskBuffer', name: 'リスクバッファ', type: 'percentage', required: false },
                    { key: 'competitiveAdjust', name: '競争調整', type: 'percentage', required: false }
                ]
            },
            projectPeriod: {
                name: '工期計算',
                description: '最適な工期・スケジュールを計算',
                fields: [
                    { key: 'workVolume', name: '作業量', type: 'number', required: true, unit: '人日' },
                    { key: 'teamSize', name: 'チーム人数', type: 'number', required: true, unit: '人' },
                    { key: 'efficiency', name: '作業効率', type: 'percentage', required: true },
                    { key: 'bufferDays', name: 'バッファ日数', type: 'number', required: false, unit: '日' },
                    { key: 'holidayRate', name: '休日率', type: 'percentage', required: false },
                    { key: 'riskDays', name: 'リスク予備日', type: 'number', required: false, unit: '日' }
                ]
            },
            costAnalysis: {
                name: 'コスト分析',
                description: '詳細なコスト分析と収益性評価',
                fields: [
                    { key: 'revenue', name: '売上高', type: 'currency', required: true },
                    { key: 'directCost', name: '直接費', type: 'currency', required: true },
                    { key: 'indirectCost', name: '間接費', type: 'currency', required: true },
                    { key: 'fixedCost', name: '固定費', type: 'currency', required: true },
                    { key: 'variableCost', name: '変動費', type: 'currency', required: true },
                    { key: 'projectDuration', name: '期間', type: 'number', required: true, unit: 'ヶ月' }
                ]
            },
            roiCalculation: {
                name: 'ROI計算',
                description: '投資回収率と収益性分析',
                fields: [
                    { key: 'initialInvestment', name: '初期投資額', type: 'currency', required: true },
                    { key: 'annualRevenue', name: '年間売上', type: 'currency', required: true },
                    { key: 'annualCost', name: '年間コスト', type: 'currency', required: true },
                    { key: 'projectYears', name: '事業期間', type: 'number', required: true, unit: '年' },
                    { key: 'discountRate', name: '割引率', type: 'percentage', required: false },
                    { key: 'inflationRate', name: 'インフレ率', type: 'percentage', required: false }
                ]
            },
            riskAssessment: {
                name: 'リスク評価',
                description: 'プロジェクトリスクの定量化',
                fields: [
                    { key: 'basePrice', name: '基準価格', type: 'currency', required: true },
                    { key: 'techRisk', name: '技術リスク', type: 'percentage', required: true },
                    { key: 'scheduleRisk', name: 'スケジュールリスク', type: 'percentage', required: true },
                    { key: 'marketRisk', name: '市場リスク', type: 'percentage', required: true },
                    { key: 'financialRisk', name: '財務リスク', type: 'percentage', required: true },
                    { key: 'operationalRisk', name: '運用リスク', type: 'percentage', required: true }
                ]
            }
        },
        taxRate: 0.1, // 消費税率
        defaultValues: {
            overheadRate: 15,
            profitRate: 10,
            efficiency: 80,
            holidayRate: 30,
            discountRate: 5,
            inflationRate: 2
        }
    };

    // 計算ツールマネージャー
    class CalculationToolsManager {
        constructor() {
            this.calculations = this.loadCalculations();
            this.currentCalculator = null;
            this.currentResult = null;
            this.init();
        }

        init() {
            this.setupCalculationInterface();
            this.bindEvents();
        }

        loadCalculations() {
            const saved = localStorage.getItem(CALC_CONFIG.storageKey);
            return saved ? JSON.parse(saved) : [];
        }

        saveCalculations() {
            if (this.calculations.length > CALC_CONFIG.maxHistory) {
                this.calculations = this.calculations.slice(-CALC_CONFIG.maxHistory);
            }
            localStorage.setItem(CALC_CONFIG.storageKey, JSON.stringify(this.calculations));
        }

        setupCalculationInterface() {
            const container = document.querySelector('#calculation-container, .calculation-container');
            if (!container) return;

            container.innerHTML = `
                <div class="calculation-header">
                    <h2>計算ツール</h2>
                    <div class="calculation-controls">
                        <select id="calculator-type" class="form-control">
                            <option value="">計算ツールを選択</option>
                            ${Object.entries(CALC_CONFIG.calculators).map(([key, calc]) => 
                                `<option value="${key}">${calc.name}</option>`
                            ).join('')}
                        </select>
                        <button class="btn btn-secondary" id="calculation-history">
                            <i class="fas fa-history"></i>
                            履歴
                        </button>
                        <button class="btn btn-secondary" id="clear-calculator">
                            <i class="fas fa-eraser"></i>
                            クリア
                        </button>
                    </div>
                </div>
                
                <div class="calculation-content">
                    <div class="calculator-welcome" id="calculator-welcome">
                        <div class="welcome-content">
                            <h3>計算ツールを選択してください</h3>
                            <p>入札・契約に関する様々な計算を効率的に行えます。</p>
                            
                            <div class="calculator-grid">
                                ${Object.entries(CALC_CONFIG.calculators).map(([key, calc]) => `
                                    <div class="calculator-card" data-calc="${key}">
                                        <div class="calc-icon">
                                            <i class="fas ${this.getCalculatorIcon(key)}"></i>
                                        </div>
                                        <h4>${calc.name}</h4>
                                        <p>${calc.description}</p>
                                        <button class="btn btn-outline-primary">計算開始</button>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <div class="calculator-interface" id="calculator-interface" style="display: none;">
                        <div class="calculator-form">
                            <div class="form-header">
                                <h3 id="calculator-title"></h3>
                                <p id="calculator-description"></p>
                            </div>
                            
                            <form id="calculation-form" class="calculation-form">
                                <div class="form-fields" id="form-fields">
                                    <!-- 動的に生成 -->
                                </div>
                                
                                <div class="form-actions">
                                    <button type="submit" class="btn btn-primary btn-lg">
                                        <i class="fas fa-calculator"></i>
                                        計算実行
                                    </button>
                                    <button type="button" class="btn btn-secondary" id="reset-form">
                                        <i class="fas fa-undo"></i>
                                        リセット
                                    </button>
                                </div>
                            </form>
                        </div>
                        
                        <div class="calculation-result" id="calculation-result" style="display: none;">
                            <div class="result-header">
                                <h3>計算結果</h3>
                                <div class="result-actions">
                                    <button class="btn btn-secondary" id="save-calculation">
                                        <i class="fas fa-save"></i>
                                        保存
                                    </button>
                                    <button class="btn btn-secondary" id="export-result">
                                        <i class="fas fa-download"></i>
                                        エクスポート
                                    </button>
                                </div>
                            </div>
                            
                            <div class="result-content" id="result-content">
                                <!-- 計算結果 -->
                            </div>
                            
                            <div class="result-analysis" id="result-analysis">
                                <!-- 分析・アドバイス -->
                            </div>
                        </div>
                    </div>
                    
                    <div class="calculation-history-panel" id="history-panel" style="display: none;">
                        <div class="history-header">
                            <h3>計算履歴</h3>
                            <button class="btn btn-secondary" id="close-history">
                                <i class="fas fa-times"></i>
                                閉じる
                            </button>
                        </div>
                        
                        <div class="history-content">
                            <div class="history-list" id="history-list">
                                <!-- 履歴一覧 -->
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        getCalculatorIcon(type) {
            const icons = {
                bidPrice: 'fa-yen-sign',
                projectPeriod: 'fa-calendar-alt',
                costAnalysis: 'fa-chart-pie',
                roiCalculation: 'fa-chart-line',
                riskAssessment: 'fa-shield-alt'
            };
            return icons[type] || 'fa-calculator';
        }

        bindEvents() {
            const container = document.querySelector('.calculation-container');
            if (!container) return;

            // 計算ツール選択
            const typeSelect = container.querySelector('#calculator-type');
            if (typeSelect) {
                typeSelect.addEventListener('change', (e) => {
                    if (e.target.value) {
                        this.showCalculator(e.target.value);
                    } else {
                        this.showWelcome();
                    }
                });
            }

            // 計算カード選択
            container.addEventListener('click', (e) => {
                const calcCard = e.target.closest('.calculator-card');
                if (calcCard) {
                    const calcType = calcCard.dataset.calc;
                    typeSelect.value = calcType;
                    this.showCalculator(calcType);
                }
            });

            // 計算フォーム送信
            const calcForm = container.querySelector('#calculation-form');
            if (calcForm) {
                calcForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.performCalculation();
                });
            }

            // フォームリセット
            const resetBtn = container.querySelector('#reset-form');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    this.resetForm();
                });
            }

            // 履歴表示
            const historyBtn = container.querySelector('#calculation-history');
            if (historyBtn) {
                historyBtn.addEventListener('click', () => {
                    this.showHistory();
                });
            }

            // 履歴閉じる
            const closeHistoryBtn = container.querySelector('#close-history');
            if (closeHistoryBtn) {
                closeHistoryBtn.addEventListener('click', () => {
                    this.hideHistory();
                });
            }

            // クリアボタン
            const clearBtn = container.querySelector('#clear-calculator');
            if (clearBtn) {
                clearBtn.addEventListener('click', () => {
                    this.clearCalculator();
                });
            }

            // 計算保存
            const saveBtn = container.querySelector('#save-calculation');
            if (saveBtn) {
                saveBtn.addEventListener('click', () => {
                    this.saveCurrentCalculation();
                });
            }

            // 結果エクスポート
            const exportBtn = container.querySelector('#export-result');
            if (exportBtn) {
                exportBtn.addEventListener('click', () => {
                    this.exportResult();
                });
            }

            // 履歴アイテムクリック
            container.addEventListener('click', (e) => {
                const historyItem = e.target.closest('.history-item');
                if (historyItem) {
                    const calcId = historyItem.dataset.calcId;
                    this.loadCalculationFromHistory(calcId);
                }
            });

            // リアルタイム計算（入力時）
            container.addEventListener('input', (e) => {
                if (e.target.matches('.form-field input, .form-field select')) {
                    setTimeout(() => this.updatePreviewCalculation(), 300);
                }
            });
        }

        showWelcome() {
            const welcome = document.querySelector('#calculator-welcome');
            const interface = document.querySelector('#calculator-interface');
            const history = document.querySelector('#history-panel');
            
            if (welcome) welcome.style.display = 'block';
            if (interface) interface.style.display = 'none';
            if (history) history.style.display = 'none';
        }

        showCalculator(type) {
            const welcome = document.querySelector('#calculator-welcome');
            const interface = document.querySelector('#calculator-interface');
            const history = document.querySelector('#history-panel');
            
            if (welcome) welcome.style.display = 'none';
            if (interface) interface.style.display = 'block';
            if (history) history.style.display = 'none';
            
            this.currentCalculator = type;
            this.setupCalculatorForm(type);
        }

        setupCalculatorForm(type) {
            const calculator = CALC_CONFIG.calculators[type];
            if (!calculator) return;

            // タイトルと説明
            const title = document.querySelector('#calculator-title');
            const description = document.querySelector('#calculator-description');
            
            if (title) title.textContent = calculator.name;
            if (description) description.textContent = calculator.description;

            // フォームフィールド生成
            const fieldsContainer = document.querySelector('#form-fields');
            if (fieldsContainer) {
                fieldsContainer.innerHTML = calculator.fields.map(field => this.renderFormField(field)).join('');
            }

            // デフォルト値設定
            this.setDefaultValues(calculator.fields);
        }

        renderFormField(field) {
            const defaultValue = CALC_CONFIG.defaultValues[field.key] || '';
            const requiredAttr = field.required ? 'required' : '';
            const unitText = field.unit ? `<span class="unit">${field.unit}</span>` : '';

            return `
                <div class="form-field">
                    <label for="${field.key}">${field.name}${field.required ? ' *' : ''}</label>
                    <div class="input-group">
                        <input 
                            type="${field.type === 'currency' || field.type === 'number' ? 'number' : 'text'}"
                            id="${field.key}"
                            name="${field.key}"
                            class="form-control"
                            ${requiredAttr}
                            ${field.type === 'currency' ? 'step="1"' : ''}
                            ${field.type === 'percentage' ? 'step="0.1" max="100"' : ''}
                            value="${defaultValue}"
                            placeholder="${this.getFieldPlaceholder(field)}"
                        />
                        ${unitText}
                    </div>
                    ${field.type === 'percentage' ? '<small class="field-help">%で入力してください</small>' : ''}
                </div>
            `;
        }

        getFieldPlaceholder(field) {
            const placeholders = {
                currency: '例: 1000000',
                percentage: '例: 10.5',
                number: '例: 100'
            };
            return placeholders[field.type] || '';
        }

        setDefaultValues(fields) {
            fields.forEach(field => {
                const defaultValue = CALC_CONFIG.defaultValues[field.key];
                if (defaultValue !== undefined) {
                    const input = document.querySelector(`#${field.key}`);
                    if (input && !input.value) {
                        input.value = defaultValue;
                    }
                }
            });
        }

        performCalculation() {
            const formData = this.getFormData();
            if (!this.validateFormData(formData)) return;

            let result;
            try {
                result = this.calculateResult(this.currentCalculator, formData);
                this.displayResult(result);
                this.currentResult = {
                    type: this.currentCalculator,
                    input: formData,
                    output: result,
                    timestamp: Date.now()
                };
            } catch (error) {
                console.error('Calculation error:', error);
                alert('計算中にエラーが発生しました: ' + error.message);
            }
        }

        getFormData() {
            const form = document.querySelector('#calculation-form');
            const formData = new FormData(form);
            const data = {};
            
            for (const [key, value] of formData.entries()) {
                data[key] = value ? parseFloat(value) || value : null;
            }
            
            return data;
        }

        validateFormData(data) {
            const calculator = CALC_CONFIG.calculators[this.currentCalculator];
            const requiredFields = calculator.fields.filter(f => f.required);
            
            for (const field of requiredFields) {
                if (data[field.key] == null || data[field.key] === '') {
                    alert(`${field.name}は必須項目です`);
                    document.querySelector(`#${field.key}`).focus();
                    return false;
                }
            }
            
            return true;
        }

        calculateResult(type, data) {
            switch (type) {
                case 'bidPrice':
                    return this.calculateBidPrice(data);
                case 'projectPeriod':
                    return this.calculateProjectPeriod(data);
                case 'costAnalysis':
                    return this.calculateCostAnalysis(data);
                case 'roiCalculation':
                    return this.calculateROI(data);
                case 'riskAssessment':
                    return this.calculateRiskAssessment(data);
                default:
                    throw new Error('Unknown calculator type');
            }
        }

        calculateBidPrice(data) {
            const baseCost = data.baseCost || 0;
            const materialCost = data.materialCost || 0;
            const laborCost = data.laborCost || 0;
            const overheadRate = (data.overheadRate || 0) / 100;
            const profitRate = (data.profitRate || 0) / 100;
            const riskBuffer = (data.riskBuffer || 0) / 100;
            const competitiveAdjust = (data.competitiveAdjust || 0) / 100;

            const directCost = baseCost + materialCost + laborCost;
            const overhead = directCost * overheadRate;
            const subtotal = directCost + overhead;
            const profit = subtotal * profitRate;
            const beforeTax = subtotal + profit;
            const riskAmount = beforeTax * riskBuffer;
            const competitiveAmount = beforeTax * competitiveAdjust;
            const adjustedPrice = beforeTax + riskAmount + competitiveAmount;
            const tax = adjustedPrice * CALC_CONFIG.taxRate;
            const finalPrice = adjustedPrice + tax;

            return {
                directCost,
                overhead,
                profit,
                riskAmount,
                competitiveAmount,
                beforeTax: adjustedPrice,
                tax,
                finalPrice,
                breakdown: {
                    baseCost,
                    materialCost,
                    laborCost,
                    overhead,
                    profit,
                    riskAmount,
                    competitiveAmount,
                    tax
                },
                analysis: {
                    costRatio: directCost / finalPrice,
                    profitMargin: profit / finalPrice,
                    competitiveness: this.assessBidCompetitiveness(data)
                }
            };
        }

        calculateProjectPeriod(data) {
            const workVolume = data.workVolume || 0;
            const teamSize = data.teamSize || 1;
            const efficiency = (data.efficiency || 80) / 100;
            const bufferDays = data.bufferDays || 0;
            const holidayRate = (data.holidayRate || 30) / 100;
            const riskDays = data.riskDays || 0;

            const effectiveWorkVolume = workVolume / efficiency;
            const basicDays = Math.ceil(effectiveWorkVolume / teamSize);
            const calendarDays = Math.ceil(basicDays / (1 - holidayRate));
            const totalDays = calendarDays + bufferDays + riskDays;
            const weeks = Math.ceil(totalDays / 7);
            const months = Math.ceil(totalDays / 30);

            const startDate = new Date();
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + totalDays);

            return {
                basicDays,
                calendarDays,
                totalDays,
                weeks,
                months,
                startDate: startDate.toISOString().split('T')[0],
                endDate: endDate.toISOString().split('T')[0],
                breakdown: {
                    workVolume,
                    effectiveWorkVolume,
                    teamSize,
                    efficiency: efficiency * 100,
                    bufferDays,
                    riskDays,
                    holidayDays: calendarDays - basicDays
                },
                analysis: {
                    utilizationRate: basicDays / totalDays,
                    riskLevel: this.assessScheduleRisk(data),
                    recommendations: this.getScheduleRecommendations(data)
                }
            };
        }

        calculateCostAnalysis(data) {
            const revenue = data.revenue || 0;
            const directCost = data.directCost || 0;
            const indirectCost = data.indirectCost || 0;
            const fixedCost = data.fixedCost || 0;
            const variableCost = data.variableCost || 0;
            const projectDuration = data.projectDuration || 1;

            const totalCost = directCost + indirectCost + fixedCost + variableCost;
            const grossProfit = revenue - directCost;
            const netProfit = revenue - totalCost;
            const grossMargin = revenue > 0 ? grossProfit / revenue : 0;
            const netMargin = revenue > 0 ? netProfit / revenue : 0;
            const breakEvenPoint = fixedCost > 0 ? fixedCost / (grossMargin || 1) : 0;

            const monthlyRevenue = revenue / projectDuration;
            const monthlyCost = totalCost / projectDuration;
            const monthlyProfit = netProfit / projectDuration;

            return {
                revenue,
                totalCost,
                grossProfit,
                netProfit,
                grossMargin: grossMargin * 100,
                netMargin: netMargin * 100,
                breakEvenPoint,
                monthlyRevenue,
                monthlyCost,
                monthlyProfit,
                breakdown: {
                    directCost,
                    indirectCost,
                    fixedCost,
                    variableCost
                },
                ratios: {
                    directCostRatio: directCost / totalCost,
                    indirectCostRatio: indirectCost / totalCost,
                    fixedCostRatio: fixedCost / totalCost,
                    variableCostRatio: variableCost / totalCost
                },
                analysis: {
                    profitability: this.assessProfitability(netMargin),
                    costStructure: this.analyzeCostStructure(data),
                    recommendations: this.getCostRecommendations(data)
                }
            };
        }

        calculateROI(data) {
            const initialInvestment = data.initialInvestment || 0;
            const annualRevenue = data.annualRevenue || 0;
            const annualCost = data.annualCost || 0;
            const projectYears = data.projectYears || 1;
            const discountRate = (data.discountRate || 5) / 100;
            const inflationRate = (data.inflationRate || 2) / 100;

            const annualProfit = annualRevenue - annualCost;
            const totalProfit = annualProfit * projectYears;
            const simpleROI = initialInvestment > 0 ? (totalProfit / initialInvestment) * 100 : 0;
            const paybackPeriod = annualProfit > 0 ? initialInvestment / annualProfit : 0;

            // NPV計算
            let npv = -initialInvestment;
            for (let year = 1; year <= projectYears; year++) {
                const adjustedProfit = annualProfit * Math.pow(1 + inflationRate, year);
                const presentValue = adjustedProfit / Math.pow(1 + discountRate, year);
                npv += presentValue;
            }

            const irr = this.calculateIRR(initialInvestment, annualProfit, projectYears);

            return {
                initialInvestment,
                annualProfit,
                totalProfit,
                simpleROI,
                paybackPeriod,
                npv,
                irr,
                discountRate: discountRate * 100,
                inflationRate: inflationRate * 100,
                analysis: {
                    viability: npv > 0 ? '実行可能' : '実行困難',
                    riskLevel: this.assessInvestmentRisk(data),
                    recommendation: this.getInvestmentRecommendation(npv, irr, paybackPeriod)
                }
            };
        }

        calculateRiskAssessment(data) {
            const basePrice = data.basePrice || 0;
            const techRisk = (data.techRisk || 0) / 100;
            const scheduleRisk = (data.scheduleRisk || 0) / 100;
            const marketRisk = (data.marketRisk || 0) / 100;
            const financialRisk = (data.financialRisk || 0) / 100;
            const operationalRisk = (data.operationalRisk || 0) / 100;

            const riskFactors = {
                技術リスク: techRisk,
                スケジュールリスク: scheduleRisk,
                市場リスク: marketRisk,
                財務リスク: financialRisk,
                運用リスク: operationalRisk
            };

            const totalRisk = techRisk + scheduleRisk + marketRisk + financialRisk + operationalRisk;
            const avgRisk = totalRisk / 5;
            const riskPremium = basePrice * avgRisk;
            const adjustedPrice = basePrice + riskPremium;

            const riskLevel = this.getRiskLevel(avgRisk);
            const highestRisk = Object.entries(riskFactors).reduce((a, b) => 
                riskFactors[a] > riskFactors[b[0]] ? a : b[0], '技術リスク'
            );

            return {
                basePrice,
                totalRisk: totalRisk * 100,
                avgRisk: avgRisk * 100,
                riskPremium,
                adjustedPrice,
                riskLevel,
                highestRisk,
                riskFactors: Object.fromEntries(
                    Object.entries(riskFactors).map(([key, value]) => [key, value * 100])
                ),
                analysis: {
                    riskDistribution: this.analyzeRiskDistribution(riskFactors),
                    mitigationStrategies: this.getRiskMitigationStrategies(riskFactors),
                    recommendation: this.getRiskRecommendation(avgRisk)
                }
            };
        }

        // ヘルパーメソッド
        assessBidCompetitiveness(data) {
            const profitRate = data.profitRate || 0;
            if (profitRate < 5) return '低収益・高競争力';
            if (profitRate < 10) return '標準的';
            if (profitRate < 15) return '高収益・低競争力';
            return '収益重視';
        }

        assessScheduleRisk(data) {
            const efficiency = data.efficiency || 80;
            const bufferDays = data.bufferDays || 0;
            
            if (efficiency > 90 && bufferDays > 10) return '低リスク';
            if (efficiency > 80 && bufferDays > 5) return '中リスク';
            return '高リスク';
        }

        getScheduleRecommendations(data) {
            const recommendations = [];
            if ((data.efficiency || 80) < 80) {
                recommendations.push('作業効率の改善を検討してください');
            }
            if ((data.bufferDays || 0) < 5) {
                recommendations.push('バッファ日数の追加を推奨します');
            }
            return recommendations;
        }

        assessProfitability(netMargin) {
            if (netMargin < 0) return '赤字';
            if (netMargin < 0.05) return '低収益';
            if (netMargin < 0.15) return '標準的';
            return '高収益';
        }

        analyzeCostStructure(data) {
            const total = (data.directCost || 0) + (data.indirectCost || 0) + (data.fixedCost || 0) + (data.variableCost || 0);
            const fixedRatio = (data.fixedCost || 0) / total;
            
            if (fixedRatio > 0.7) return '固定費型';
            if (fixedRatio > 0.3) return '混合型';
            return '変動費型';
        }

        getCostRecommendations(data) {
            const recommendations = [];
            const revenue = data.revenue || 0;
            const totalCost = (data.directCost || 0) + (data.indirectCost || 0) + (data.fixedCost || 0) + (data.variableCost || 0);
            
            if (totalCost > revenue * 0.8) {
                recommendations.push('コスト削減の検討が必要です');
            }
            if ((data.fixedCost || 0) > totalCost * 0.5) {
                recommendations.push('固定費の最適化を検討してください');
            }
            return recommendations;
        }

        calculateIRR(investment, annualCashFlow, years) {
            // 簡易IRR計算（ニュートン法の近似）
            let rate = 0.1; // 初期値10%
            
            for (let i = 0; i < 100; i++) {
                let npv = -investment;
                let npvDerivative = 0;
                
                for (let year = 1; year <= years; year++) {
                    const factor = Math.pow(1 + rate, year);
                    npv += annualCashFlow / factor;
                    npvDerivative -= year * annualCashFlow / Math.pow(1 + rate, year + 1);
                }
                
                if (Math.abs(npv) < 0.01) break;
                rate = rate - npv / npvDerivative;
            }
            
            return rate * 100;
        }

        assessInvestmentRisk(data) {
            const paybackPeriod = data.initialInvestment / (data.annualRevenue - data.annualCost);
            if (paybackPeriod < 2) return '低リスク';
            if (paybackPeriod < 5) return '中リスク';
            return '高リスク';
        }

        getInvestmentRecommendation(npv, irr, paybackPeriod) {
            if (npv > 0 && irr > 10 && paybackPeriod < 3) return '強く推奨';
            if (npv > 0 && irr > 5) return '推奨';
            if (npv > 0) return '条件付き推奨';
            return '非推奨';
        }

        getRiskLevel(avgRisk) {
            if (avgRisk < 0.1) return '低リスク';
            if (avgRisk < 0.2) return '中リスク';
            if (avgRisk < 0.3) return '高リスク';
            return '非常に高リスク';
        }

        analyzeRiskDistribution(riskFactors) {
            const maxRisk = Math.max(...Object.values(riskFactors));
            const minRisk = Math.min(...Object.values(riskFactors));
            
            if (maxRisk - minRisk < 0.1) return 'バランス型';
            if (maxRisk > 0.3) return '集中型';
            return '分散型';
        }

        getRiskMitigationStrategies(riskFactors) {
            const strategies = [];
            
            if (riskFactors.技術リスク > 0.2) {
                strategies.push('技術検証の強化');
            }
            if (riskFactors.スケジュールリスク > 0.2) {
                strategies.push('工程管理の徹底');
            }
            if (riskFactors.市場リスク > 0.2) {
                strategies.push('市場調査の実施');
            }
            
            return strategies;
        }

        getRiskRecommendation(avgRisk) {
            if (avgRisk < 0.1) return 'リスクは許容範囲内です';
            if (avgRisk < 0.2) return 'リスク対策の検討を推奨します';
            return 'リスク軽減策の実施が必要です';
        }

        displayResult(result) {
            const resultDiv = document.querySelector('#calculation-result');
            const contentDiv = document.querySelector('#result-content');
            const analysisDiv = document.querySelector('#result-analysis');
            
            if (resultDiv) resultDiv.style.display = 'block';
            
            if (contentDiv) {
                contentDiv.innerHTML = this.formatResult(this.currentCalculator, result);
            }
            
            if (analysisDiv) {
                analysisDiv.innerHTML = this.formatAnalysis(this.currentCalculator, result);
            }
        }

        formatResult(type, result) {
            switch (type) {
                case 'bidPrice':
                    return this.formatBidPriceResult(result);
                case 'projectPeriod':
                    return this.formatProjectPeriodResult(result);
                case 'costAnalysis':
                    return this.formatCostAnalysisResult(result);
                case 'roiCalculation':
                    return this.formatROIResult(result);
                case 'riskAssessment':
                    return this.formatRiskAssessmentResult(result);
                default:
                    return '<p>結果の表示でエラーが発生しました</p>';
            }
        }

        formatBidPriceResult(result) {
            return `
                <div class="result-summary">
                    <div class="main-result">
                        <h4>推奨入札価格</h4>
                        <div class="price-display">${this.formatCurrency(result.finalPrice)}</div>
                    </div>
                    
                    <div class="price-breakdown">
                        <h5>価格内訳</h5>
                        <table class="breakdown-table">
                            <tr><td>直接費</td><td>${this.formatCurrency(result.directCost)}</td></tr>
                            <tr><td>諸経費</td><td>${this.formatCurrency(result.breakdown.overhead)}</td></tr>
                            <tr><td>利益</td><td>${this.formatCurrency(result.breakdown.profit)}</td></tr>
                            <tr><td>リスクバッファ</td><td>${this.formatCurrency(result.breakdown.riskAmount)}</td></tr>
                            <tr><td>競争調整</td><td>${this.formatCurrency(result.breakdown.competitiveAmount)}</td></tr>
                            <tr><td>消費税</td><td>${this.formatCurrency(result.breakdown.tax)}</td></tr>
                            <tr class="total"><td>合計</td><td>${this.formatCurrency(result.finalPrice)}</td></tr>
                        </table>
                    </div>
                </div>
            `;
        }

        formatProjectPeriodResult(result) {
            return `
                <div class="result-summary">
                    <div class="main-result">
                        <h4>推奨工期</h4>
                        <div class="period-display">${result.totalDays}日 (${result.months}ヶ月)</div>
                    </div>
                    
                    <div class="period-details">
                        <h5>工期詳細</h5>
                        <table class="breakdown-table">
                            <tr><td>基本作業日数</td><td>${result.basicDays}日</td></tr>
                            <tr><td>カレンダー日数</td><td>${result.calendarDays}日</td></tr>
                            <tr><td>バッファ日数</td><td>${result.breakdown.bufferDays}日</td></tr>
                            <tr><td>リスク予備日</td><td>${result.breakdown.riskDays}日</td></tr>
                            <tr class="total"><td>総工期</td><td>${result.totalDays}日</td></tr>
                        </table>
                        
                        <div class="schedule-info">
                            <p><strong>開始予定日:</strong> ${result.startDate}</p>
                            <p><strong>完了予定日:</strong> ${result.endDate}</p>
                        </div>
                    </div>
                </div>
            `;
        }

        formatCostAnalysisResult(result) {
            return `
                <div class="result-summary">
                    <div class="main-result">
                        <h4>収益性分析</h4>
                        <div class="profit-display">
                            <span class="net-profit">${this.formatCurrency(result.netProfit)}</span>
                            <span class="margin">(利益率: ${result.netMargin.toFixed(1)}%)</span>
                        </div>
                    </div>
                    
                    <div class="cost-breakdown">
                        <h5>コスト内訳</h5>
                        <table class="breakdown-table">
                            <tr><td>売上高</td><td>${this.formatCurrency(result.revenue)}</td></tr>
                            <tr><td>直接費</td><td>${this.formatCurrency(result.breakdown.directCost)}</td></tr>
                            <tr><td>間接費</td><td>${this.formatCurrency(result.breakdown.indirectCost)}</td></tr>
                            <tr><td>固定費</td><td>${this.formatCurrency(result.breakdown.fixedCost)}</td></tr>
                            <tr><td>変動費</td><td>${this.formatCurrency(result.breakdown.variableCost)}</td></tr>
                            <tr class="total"><td>総コスト</td><td>${this.formatCurrency(result.totalCost)}</td></tr>
                        </table>
                        
                        <div class="profitability-metrics">
                            <p><strong>粗利益:</strong> ${this.formatCurrency(result.grossProfit)} (${result.grossMargin.toFixed(1)}%)</p>
                            <p><strong>損益分岐点:</strong> ${this.formatCurrency(result.breakEvenPoint)}</p>
                        </div>
                    </div>
                </div>
            `;
        }

        formatROIResult(result) {
            return `
                <div class="result-summary">
                    <div class="main-result">
                        <h4>投資収益率 (ROI)</h4>
                        <div class="roi-display">
                            <span class="roi-value">${result.simpleROI.toFixed(1)}%</span>
                            <span class="payback">回収期間: ${result.paybackPeriod.toFixed(1)}年</span>
                        </div>
                    </div>
                    
                    <div class="roi-details">
                        <h5>投資分析</h5>
                        <table class="breakdown-table">
                            <tr><td>初期投資額</td><td>${this.formatCurrency(result.initialInvestment)}</td></tr>
                            <tr><td>年間利益</td><td>${this.formatCurrency(result.annualProfit)}</td></tr>
                            <tr><td>総利益</td><td>${this.formatCurrency(result.totalProfit)}</td></tr>
                            <tr><td>NPV</td><td>${this.formatCurrency(result.npv)}</td></tr>
                            <tr><td>IRR</td><td>${result.irr.toFixed(1)}%</td></tr>
                        </table>
                        
                        <div class="investment-metrics">
                            <p><strong>判定:</strong> ${result.analysis.viability}</p>
                            <p><strong>リスクレベル:</strong> ${result.analysis.riskLevel}</p>
                            <p><strong>推奨:</strong> ${result.analysis.recommendation}</p>
                        </div>
                    </div>
                </div>
            `;
        }

        formatRiskAssessmentResult(result) {
            return `
                <div class="result-summary">
                    <div class="main-result">
                        <h4>リスク調整価格</h4>
                        <div class="risk-price-display">
                            <span class="adjusted-price">${this.formatCurrency(result.adjustedPrice)}</span>
                            <span class="risk-premium">リスクプレミアム: ${this.formatCurrency(result.riskPremium)}</span>
                        </div>
                    </div>
                    
                    <div class="risk-breakdown">
                        <h5>リスク分析</h5>
                        <table class="breakdown-table">
                            <tr><td>技術リスク</td><td>${result.riskFactors.技術リスク.toFixed(1)}%</td></tr>
                            <tr><td>スケジュールリスク</td><td>${result.riskFactors.スケジュールリスク.toFixed(1)}%</td></tr>
                            <tr><td>市場リスク</td><td>${result.riskFactors.市場リスク.toFixed(1)}%</td></tr>
                            <tr><td>財務リスク</td><td>${result.riskFactors.財務リスク.toFixed(1)}%</td></tr>
                            <tr><td>運用リスク</td><td>${result.riskFactors.運用リスク.toFixed(1)}%</td></tr>
                            <tr class="total"><td>総合リスク</td><td>${result.totalRisk.toFixed(1)}%</td></tr>
                        </table>
                        
                        <div class="risk-assessment">
                            <p><strong>リスクレベル:</strong> ${result.riskLevel}</p>
                            <p><strong>最大リスク要因:</strong> ${result.highestRisk}</p>
                        </div>
                    </div>
                </div>
            `;
        }

        formatAnalysis(type, result) {
            if (!result.analysis) return '';
            
            const analysis = result.analysis;
            let html = '<div class="analysis-section"><h5>分析・アドバイス</h5>';
            
            // 分析内容の表示
            Object.entries(analysis).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    html += `<div class="analysis-item"><strong>${key}:</strong><ul>`;
                    value.forEach(item => html += `<li>${item}</li>`);
                    html += '</ul></div>';
                } else {
                    html += `<div class="analysis-item"><strong>${key}:</strong> ${value}</div>`;
                }
            });
            
            html += '</div>';
            return html;
        }

        formatCurrency(amount) {
            return new Intl.NumberFormat('ja-JP', {
                style: 'currency',
                currency: 'JPY',
                minimumFractionDigits: 0
            }).format(amount);
        }

        updatePreviewCalculation() {
            // リアルタイムプレビュー機能（簡易版）
            const formData = this.getFormData();
            const calculator = CALC_CONFIG.calculators[this.currentCalculator];
            
            if (!calculator) return;
            
            // 必須フィールドがすべて入力されている場合のみプレビュー表示
            const requiredFields = calculator.fields.filter(f => f.required);
            const hasAllRequired = requiredFields.every(field => 
                formData[field.key] != null && formData[field.key] !== ''
            );
            
            if (hasAllRequired) {
                try {
                    const result = this.calculateResult(this.currentCalculator, formData);
                    this.showPreview(result);
                } catch (error) {
                    this.hidePreview();
                }
            } else {
                this.hidePreview();
            }
        }

        showPreview(result) {
            let previewElement = document.querySelector('.calculation-preview');
            if (!previewElement) {
                previewElement = document.createElement('div');
                previewElement.className = 'calculation-preview';
                const form = document.querySelector('#calculation-form');
                if (form) {
                    form.appendChild(previewElement);
                }
            }
            
            let previewText = '';
            switch (this.currentCalculator) {
                case 'bidPrice':
                    previewText = `予想入札価格: ${this.formatCurrency(result.finalPrice)}`;
                    break;
                case 'projectPeriod':
                    previewText = `予想工期: ${result.totalDays}日`;
                    break;
                case 'costAnalysis':
                    previewText = `予想利益: ${this.formatCurrency(result.netProfit)}`;
                    break;
                case 'roiCalculation':
                    previewText = `ROI: ${result.simpleROI.toFixed(1)}%`;
                    break;
                case 'riskAssessment':
                    previewText = `リスク調整価格: ${this.formatCurrency(result.adjustedPrice)}`;
                    break;
            }
            
            previewElement.innerHTML = `<div class="preview-result">${previewText}</div>`;
        }

        hidePreview() {
            const previewElement = document.querySelector('.calculation-preview');
            if (previewElement) {
                previewElement.remove();
            }
        }

        resetForm() {
            const form = document.querySelector('#calculation-form');
            if (form) {
                form.reset();
                this.setDefaultValues(CALC_CONFIG.calculators[this.currentCalculator].fields);
                this.hidePreview();
            }
            
            const resultDiv = document.querySelector('#calculation-result');
            if (resultDiv) {
                resultDiv.style.display = 'none';
            }
        }

        clearCalculator() {
            const typeSelect = document.querySelector('#calculator-type');
            if (typeSelect) {
                typeSelect.value = '';
            }
            this.showWelcome();
        }

        saveCurrentCalculation() {
            if (!this.currentResult) return;
            
            const calculationData = {
                ...this.currentResult,
                id: 'calc_' + Date.now(),
                name: `${CALC_CONFIG.calculators[this.currentResult.type].name}_${new Date().toLocaleDateString()}`
            };
            
            this.calculations.unshift(calculationData);
            this.saveCalculations();
            this.showMessage('計算結果を保存しました', 'success');
        }

        exportResult() {
            if (!this.currentResult) return;
            
            const calculator = CALC_CONFIG.calculators[this.currentResult.type];
            const csvContent = this.generateResultCSV(this.currentResult, calculator);
            
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `計算結果_${calculator.name}_${Date.now()}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        generateResultCSV(calculation, calculator) {
            const lines = [];
            lines.push(`計算ツール,${calculator.name}`);
            lines.push(`計算日時,${new Date(calculation.timestamp).toLocaleString()}`);
            lines.push('');
            
            // 入力値
            lines.push('入力値');
            calculator.fields.forEach(field => {
                const value = calculation.input[field.key];
                lines.push(`${field.name},${value || ''}`);
            });
            lines.push('');
            
            // 出力値
            lines.push('計算結果');
            Object.entries(calculation.output).forEach(([key, value]) => {
                if (typeof value === 'object') return;
                lines.push(`${key},${value}`);
            });
            
            return lines.join('\n');
        }

        showHistory() {
            const historyPanel = document.querySelector('#history-panel');
            const historyList = document.querySelector('#history-list');
            
            if (historyPanel) historyPanel.style.display = 'block';
            if (historyList) {
                historyList.innerHTML = this.renderHistoryList();
            }
        }

        hideHistory() {
            const historyPanel = document.querySelector('#history-panel');
            if (historyPanel) historyPanel.style.display = 'none';
        }

        renderHistoryList() {
            if (this.calculations.length === 0) {
                return '<div class="no-history">計算履歴がありません</div>';
            }
            
            return this.calculations.map(calc => `
                <div class="history-item" data-calc-id="${calc.id}">
                    <div class="history-header">
                        <h4>${calc.name}</h4>
                        <span class="history-date">${new Date(calc.timestamp).toLocaleDateString()}</span>
                    </div>
                    <div class="history-details">
                        <span class="calc-type">${CALC_CONFIG.calculators[calc.type].name}</span>
                    </div>
                </div>
            `).join('');
        }

        loadCalculationFromHistory(calcId) {
            const calculation = this.calculations.find(c => c.id === calcId);
            if (!calculation) return;
            
            // 計算機を設定
            const typeSelect = document.querySelector('#calculator-type');
            if (typeSelect) {
                typeSelect.value = calculation.type;
            }
            
            this.showCalculator(calculation.type);
            
            // 入力値を復元
            setTimeout(() => {
                Object.entries(calculation.input).forEach(([key, value]) => {
                    const input = document.querySelector(`#${key}`);
                    if (input) {
                        input.value = value;
                    }
                });
                
                // 結果を表示
                this.currentResult = calculation;
                this.displayResult(calculation.output);
                this.hideHistory();
            }, 100);
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
        calculate(type, data) {
            return this.calculateResult(type, data);
        }

        getCalculationHistory() {
            return [...this.calculations];
        }

        clearHistory() {
            this.calculations = [];
            this.saveCalculations();
        }
    }

    // 初期化
    document.addEventListener('DOMContentLoaded', () => {
        // 計算ツールコンテナが存在する場合のみ初期化
        if (document.querySelector('#calculation-container, .calculation-container')) {
            window.calculationTools = new CalculationToolsManager();
        }
    });

})();