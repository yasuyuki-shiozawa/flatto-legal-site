---
layout: default
title: レポート生成 | 入札マップ
description: 入札データの分析レポートを自動生成。概要レポート、詳細分析、競合分析など、豊富なテンプレートから選択可能。
permalink: /reports/
---

<div class="report-page">
    <div class="container">
        <!-- レポート生成コンテナ -->
        <div id="report-container" class="report-container">
            <!-- レポート生成機能はJavaScriptで動的に生成されます -->
            <div class="report-loading">
                <div class="loading-spinner"></div>
                <p>レポート機能を読み込み中...</p>
            </div>
        </div>
    </div>
</div>

<!-- サンプルレポートテンプレート -->
<div class="sample-templates" style="display: none;">
    <div class="template-gallery">
        <h2>レポートテンプレート例</h2>
        
        <div class="template-grid">
            <div class="template-card">
                <div class="template-preview">
                    <img src="/assets/images/report-summary-preview.png" alt="概要レポートプレビュー" />
                </div>
                <div class="template-info">
                    <h3>概要レポート</h3>
                    <p>入札データの基本統計と傾向を要約したレポート。月次・四半期報告に最適。</p>
                    <ul class="template-features">
                        <li>基本統計情報</li>
                        <li>トレンド分析</li>
                        <li>推奨事項</li>
                    </ul>
                </div>
            </div>
            
            <div class="template-card">
                <div class="template-preview">
                    <img src="/assets/images/report-detailed-preview.png" alt="詳細分析レポートプレビュー" />
                </div>
                <div class="template-info">
                    <h3>詳細分析レポート</h3>
                    <p>包括的な入札分析と詳細な比較データを含む、経営判断に役立つレポート。</p>
                    <ul class="template-features">
                        <li>詳細統計分析</li>
                        <li>比較分析</li>
                        <li>成功要因分析</li>
                        <li>戦略的推奨事項</li>
                    </ul>
                </div>
            </div>
            
            <div class="template-card">
                <div class="template-preview">
                    <img src="/assets/images/report-competitive-preview.png" alt="競合分析レポートプレビュー" />
                </div>
                <div class="template-info">
                    <h3>競合分析レポート</h3>
                    <p>競合他社との比較分析に特化したレポート。市場ポジション把握に有効。</p>
                    <ul class="template-features">
                        <li>競合比較分析</li>
                        <li>市場シェア分析</li>
                        <li>価格戦略分析</li>
                        <li>差別化戦略</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
/* レポートページ専用スタイル */
.report-page {
    min-height: 100vh;
    background-color: #f8fafc;
}

.report-loading {
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

/* サンプルテンプレート */
.sample-templates {
    background-color: white;
    border-radius: 12px;
    padding: 2rem;
    margin: 2rem 0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.template-gallery h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 1.875rem;
    font-weight: 700;
    color: #1f2937;
}

.template-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.template-card {
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
    background-color: white;
}

.template-card:hover {
    box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
    border-color: #3b82f6;
    transform: translateY(-2px);
}

.template-preview {
    height: 200px;
    background-color: #f3f4f6;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.template-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.template-info {
    padding: 1.5rem;
}

.template-info h3 {
    margin: 0 0 0.75rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
}

.template-info p {
    margin: 0 0 1rem;
    color: #6b7280;
    line-height: 1.6;
}

.template-features {
    list-style: none;
    padding: 0;
    margin: 0;
}

.template-features li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.5rem;
    color: #4b5563;
    font-size: 0.875rem;
}

.template-features li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #10b981;
    font-weight: 600;
}

/* 使い方ガイド */
.usage-guide {
    background-color: #f0f9ff;
    border: 1px solid #0ea5e9;
    border-radius: 8px;
    padding: 1.5rem;
    margin: 2rem 0;
}

.usage-guide h3 {
    margin: 0 0 1rem;
    color: #0369a1;
    font-size: 1.125rem;
    font-weight: 600;
}

.usage-steps {
    list-style: none;
    padding: 0;
    counter-reset: step-counter;
}

.usage-steps li {
    position: relative;
    padding-left: 2.5rem;
    margin-bottom: 1rem;
    counter-increment: step-counter;
}

.usage-steps li::before {
    content: counter(step-counter);
    position: absolute;
    left: 0;
    top: 0;
    width: 1.5rem;
    height: 1.5rem;
    background-color: #0ea5e9;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 600;
}

/* エクスポート形式の説明 */
.export-formats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
}

.format-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background-color: #f8fafc;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
}

.format-icon {
    width: 2rem;
    height: 2rem;
    background-color: #3b82f6;
    color: white;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.75rem;
}

.format-info h4 {
    margin: 0 0 0.25rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #1f2937;
}

.format-info p {
    margin: 0;
    font-size: 0.75rem;
    color: #6b7280;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
    .template-grid {
        grid-template-columns: 1fr;
    }
    
    .export-formats {
        grid-template-columns: 1fr;
    }
    
    .sample-templates {
        padding: 1rem;
        margin: 1rem 0;
    }
}
</style>

<!-- 使い方ガイド -->
<div class="container">
    <div class="usage-guide">
        <h3>レポート生成の使い方</h3>
        <ol class="usage-steps">
            <li>「新規レポート作成」ボタンをクリックしてレポートビルダーを開く</li>
            <li>レポートタイプを選択（概要、詳細分析、競合分析など）</li>
            <li>分析対象期間とカテゴリフィルターを設定</li>
            <li>含めるセクションを選択してカスタマイズ</li>
            <li>「レポート生成」ボタンでレポートを作成</li>
            <li>プレビューで内容を確認後、必要に応じてPDF、Excel等で出力</li>
        </ol>
    </div>
    
    <div class="export-formats">
        <div class="format-item">
            <div class="format-icon">PDF</div>
            <div class="format-info">
                <h4>PDF形式</h4>
                <p>印刷・配布に最適</p>
            </div>
        </div>
        <div class="format-item">
            <div class="format-icon">XLS</div>
            <div class="format-info">
                <h4>Excel形式</h4>
                <p>データ分析・編集可能</p>
            </div>
        </div>
        <div class="format-item">
            <div class="format-icon">DOC</div>
            <div class="format-info">
                <h4>Word形式</h4>
                <p>文書編集・カスタマイズ</p>
            </div>
        </div>
        <div class="format-item">
            <div class="format-icon">HTML</div>
            <div class="format-info">
                <h4>HTML形式</h4>
                <p>Web共有・オンライン表示</p>
            </div>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // レポート機能のチュートリアル
    const showTutorial = localStorage.getItem('report-tutorial-shown') !== 'true';
    
    if (showTutorial) {
        setTimeout(() => {
            const tutorial = document.createElement('div');
            tutorial.className = 'tutorial-overlay';
            tutorial.innerHTML = `
                <div class="tutorial-modal">
                    <div class="tutorial-header">
                        <h3>レポート生成機能へようこそ！</h3>
                        <button class="tutorial-close">&times;</button>
                    </div>
                    <div class="tutorial-content">
                        <p>このツールを使用すると、入札データから詳細な分析レポートを自動生成できます。</p>
                        <h4>主な機能：</h4>
                        <ul>
                            <li>5種類のレポートテンプレート</li>
                            <li>カスタマイズ可能なセクション</li>
                            <li>多様な出力形式（PDF、Excel、Word、HTML）</li>
                            <li>保存・再利用可能なテンプレート</li>
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
                localStorage.setItem('report-tutorial-shown', 'true');
            });
            
            tutorial.querySelector('.tutorial-start').addEventListener('click', () => {
                tutorial.remove();
                localStorage.setItem('report-tutorial-shown', 'true');
                // 新規レポート作成ボタンをクリック
                const createBtn = document.querySelector('#create-report');
                if (createBtn) createBtn.click();
            });
            
            tutorial.querySelector('.tutorial-skip').addEventListener('click', () => {
                tutorial.remove();
                localStorage.setItem('report-tutorial-shown', 'true');
            });
        }, 2000);
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
    max-width: 500px;
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