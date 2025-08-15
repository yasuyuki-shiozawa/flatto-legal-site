---
layout: default
title: 入札案件 比較ツール | 最適な入札案件を効率的に選定 - 行政書士法人ふらっと法務事務所
description: 入札案件の詳細比較ツールで最適な入札案件を選定。予定価格・納期・参加資格・評価方式等を一目で比較。事業者や契約条件の比較も可能で、効率的な入札戦略立案を支援。神奈川県大和市から全国対応。
keywords: 入札案件 比較,入札 比較ツール,入札案件 選定,入札戦略,予定価格 比較,入札参加資格 比較,評価方式 比較,入札 効率化,行政書士,神奈川県,大和市
permalink: /comparison/
---

<div class="comparison-page">
    <div class="container">
        <!-- 比較ツールコンテナ -->
        <div id="comparison-container" class="comparison-container">
            <!-- 比較ツールはJavaScriptで動的に生成されます -->
            <div class="comparison-loading">
                <div class="loading-spinner"></div>
                <p>比較ツールを読み込み中...</p>
            </div>
        </div>
    </div>
</div>

<style>
/* 比較ページ専用スタイル */
.comparison-page {
    min-height: 100vh;
    background-color: #f8fafc;
}

.comparison-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    color: #6b7280;
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e5e7eb;
    border-top: 4px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* 使い方ガイド */
.usage-guide {
    background-color: white;
    border-radius: 12px;
    padding: 2rem;
    margin: 2rem 0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.guide-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
}

.step-item {
    text-align: center;
    padding: 1.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    position: relative;
}

.step-item::before {
    content: attr(data-step);
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;
    height: 24px;
    background-color: #3b82f6;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    font-weight: 600;
}

.step-item h4 {
    margin: 1rem 0 0.5rem;
    font-size: 1.125rem;
    font-weight: 600;
    color: #1f2937;
}

.step-item p {
    margin: 0;
    color: #6b7280;
    font-size: 0.875rem;
    line-height: 1.5;
}

/* 比較タイプ例 */
.comparison-examples {
    background-color: white;
    border-radius: 12px;
    padding: 2rem;
    margin: 2rem 0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.example-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin: 1.5rem 0;
}

.example-card {
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
}

.example-card:hover {
    border-color: #3b82f6;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.example-header {
    background-color: #f8fafc;
    padding: 1rem;
    border-bottom: 1px solid #e5e7eb;
}

.example-header h4 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: #1f2937;
}

.example-content {
    padding: 1rem;
}

.comparison-fields {
    list-style: none;
    padding: 0;
    margin: 0;
}

.comparison-fields li {
    padding: 0.25rem 0;
    color: #4b5563;
    font-size: 0.875rem;
    position: relative;
    padding-left: 1rem;
}

.comparison-fields li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #3b82f6;
    font-weight: 600;
}

/* 機能説明 */
.features-section {
    background-color: #f0f9ff;
    border: 1px solid #0ea5e9;
    border-radius: 8px;
    padding: 1.5rem;
    margin: 2rem 0;
}

.features-section h3 {
    margin: 0 0 1rem;
    color: #0369a1;
    font-size: 1.125rem;
    font-weight: 600;
}

.features-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin: 1rem 0;
}

.feature-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #0c4a6e;
}

.feature-item::before {
    content: '✓';
    color: #0ea5e9;
    font-weight: 600;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
    .comparison-page {
        padding: 1rem 0;
    }
    
    .guide-steps {
        grid-template-columns: 1fr;
    }
    
    .example-grid {
        grid-template-columns: 1fr;
    }
    
    .features-list {
        grid-template-columns: 1fr;
    }
    
    .usage-guide,
    .comparison-examples,
    .features-section {
        padding: 1rem;
        margin: 1rem 0;
    }
}
</style>

<!-- 使い方ガイド -->
<div class="container">
    <div class="usage-guide">
        <h3>比較ツールの使い方</h3>
        <div class="guide-steps">
            <div class="step-item" data-step="1">
                <h4>比較タイプ選択</h4>
                <p>入札案件、事業者、契約条件の中から比較したい種類を選択します</p>
            </div>
            <div class="step-item" data-step="2">
                <h4>対象アイテム選択</h4>
                <p>比較したいアイテムを2〜10件まで選択します</p>
            </div>
            <div class="step-item" data-step="3">
                <h4>比較テーブル表示</h4>
                <p>選択したアイテムが並べて表示され、項目ごとに比較できます</p>
            </div>
            <div class="step-item" data-step="4">
                <h4>分析結果確認</h4>
                <p>自動生成される分析結果とランキングを確認します</p>
            </div>
        </div>
    </div>
    
    <div class="comparison-examples">
        <h3>比較タイプ例</h3>
        <div class="example-grid">
            <div class="example-card">
                <div class="example-header">
                    <h4>入札案件比較</h4>
                </div>
                <div class="example-content">
                    <p>複数の入札案件を詳細比較し、参加すべき案件を効率的に選択</p>
                    <ul class="comparison-fields">
                        <li>予算額・応札期限</li>
                        <li>参加条件・評価方式</li>
                        <li>履行場所・期間</li>
                        <li>適合度スコア</li>
                    </ul>
                </div>
            </div>
            
            <div class="example-card">
                <div class="example-header">
                    <h4>事業者比較</h4>
                </div>
                <div class="example-content">
                    <p>競合事業者の実績・能力を比較し、自社の競争力を分析</p>
                    <ul class="comparison-fields">
                        <li>資本金・従業員数</li>
                        <li>実績年数・落札率</li>
                        <li>専門分野・平均契約額</li>
                        <li>競争力指数</li>
                    </ul>
                </div>
            </div>
            
            <div class="example-card">
                <div class="example-header">
                    <h4>契約条件比較</h4>
                </div>
                <div class="example-content">
                    <p>契約条件・価格を詳細比較し、最適な契約を選択</p>
                    <ul class="comparison-fields">
                        <li>契約金額・期間</li>
                        <li>支払条件・保証期間</li>
                        <li>違約金条項</li>
                        <li>コストパフォーマンス</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    
    <div class="features-section">
        <h3>主な機能</h3>
        <div class="features-list">
            <div class="feature-item">最大10件まで同時比較</div>
            <div class="feature-item">視覚的な比較テーブル</div>
            <div class="feature-item">自動スコア計算</div>
            <div class="feature-item">ランキング表示</div>
            <div class="feature-item">詳細分析レポート</div>
            <div class="feature-item">チャート・グラフ表示</div>
            <div class="feature-item">比較結果の保存</div>
            <div class="feature-item">CSV形式でエクスポート</div>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // 比較ツールのチュートリアル
    const showTutorial = localStorage.getItem('comparison-tutorial-shown') !== 'true';
    
    if (showTutorial) {
        setTimeout(() => {
            const tutorial = document.createElement('div');
            tutorial.className = 'tutorial-overlay';
            tutorial.innerHTML = `
                <div class="tutorial-modal">
                    <div class="tutorial-header">
                        <h3>比較ツールへようこそ！</h3>
                        <button class="tutorial-close">&times;</button>
                    </div>
                    <div class="tutorial-content">
                        <p>このツールを使用すると、複数のアイテムを並べて詳細比較できます。</p>
                        <h4>比較できる項目：</h4>
                        <ul>
                            <li><strong>入札案件</strong> - 予算額、条件、適合度などを比較</li>
                            <li><strong>事業者</strong> - 実績、能力、競争力を比較</li>
                            <li><strong>契約条件</strong> - 金額、期間、条件を比較</li>
                        </ul>
                        <h4>分析機能：</h4>
                        <ul>
                            <li>自動ランキング生成</li>
                            <li>詳細分析レポート</li>
                            <li>チャート・グラフ表示</li>
                            <li>比較結果の保存・エクスポート</li>
                        </ul>
                    </div>
                    <div class="tutorial-actions">
                        <button class="btn btn-primary tutorial-start">始める</button>
                        <button class="btn btn-secondary tutorial-skip">スキップ</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(tutorial);
            
            // チュートリアルイベント
            tutorial.querySelector('.tutorial-close').addEventListener('click', () => {
                tutorial.remove();
                localStorage.setItem('comparison-tutorial-shown', 'true');
            });
            
            tutorial.querySelector('.tutorial-start').addEventListener('click', () => {
                tutorial.remove();
                localStorage.setItem('comparison-tutorial-shown', 'true');
                // 入札案件比較を選択
                const typeSelect = document.querySelector('#comparison-type');
                if (typeSelect) {
                    typeSelect.value = 'tenders';
                    typeSelect.dispatchEvent(new Event('change'));
                }
            });
            
            tutorial.querySelector('.tutorial-skip').addEventListener('click', () => {
                tutorial.remove();
                localStorage.setItem('comparison-tutorial-shown', 'true');
            });
        }, 2000);
    }
    
    // サンプルデータの説明
    const showDataInfo = localStorage.getItem('comparison-data-info-shown') !== 'true';
    
    if (showDataInfo) {
        setTimeout(() => {
            const info = document.createElement('div');
            info.className = 'data-info-banner';
            info.innerHTML = `
                <div class="info-content">
                    <span class="info-icon">ℹ️</span>
                    <span class="info-text">このデモではサンプルデータを使用しています。実際の利用時は実データと連携します。</span>
                    <button class="info-close">&times;</button>
                </div>
            `;
            
            info.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background-color: #3b82f6;
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                z-index: 1000;
                max-width: 90%;
                min-width: 300px;
            `;
            
            info.querySelector('.info-content').style.cssText = `
                display: flex;
                align-items: center;
                gap: 10px;
            `;
            
            info.querySelector('.info-close').style.cssText = `
                background: none;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
                padding: 0;
                margin-left: auto;
            `;
            
            document.body.appendChild(info);
            
            info.querySelector('.info-close').addEventListener('click', () => {
                info.remove();
                localStorage.setItem('comparison-data-info-shown', 'true');
            });
            
            // 10秒後に自動削除
            setTimeout(() => {
                if (document.body.contains(info)) {
                    info.remove();
                    localStorage.setItem('comparison-data-info-shown', 'true');
                }
            }, 10000);
        }, 5000);
    }
});
</script>

<style>
/* チュートリアル用スタイル */
.tutorial-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.tutorial-modal {
    background-color: white;
    border-radius: 12px;
    padding: 0;
    width: 90%;
    max-width: 600px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.tutorial-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
}

.tutorial-header h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
}

.tutorial-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #6b7280;
    width: 32px;
    height: 32px;
    border-radius: 4px;
}

.tutorial-close:hover {
    background-color: #f3f4f6;
    color: #374151;
}

.tutorial-content {
    padding: 1.5rem;
}

.tutorial-content h4 {
    margin: 1rem 0 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: #1f2937;
}

.tutorial-content ul {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
}

.tutorial-content li {
    margin: 0.25rem 0;
    color: #4b5563;
}

.tutorial-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 1.5rem;
    border-top: 1px solid #e5e7eb;
}
</style>