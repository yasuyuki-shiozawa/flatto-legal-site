---
layout: default
title: マイダッシュボード | 入札マップ
description: 入札マップのパーソナライズダッシュボード。入札学習進捗、おすすめ記事、保存した案件、ブックマークコンテンツを一元管理。あなたの入札ビジネスに必要な情報を効率的にアクセスできます。
permalink: /dashboard/
---

<div class="dashboard-page">
    <div class="container">
        <!-- ダッシュボードコンテナ -->
        <div id="dashboard-container" class="dashboard-container">
            <!-- ダッシュボードはJavaScriptで動的に生成されます -->
            <div class="dashboard-loading">
                <div class="loading-spinner"></div>
                <p>ダッシュボードを読み込み中...</p>
            </div>
        </div>
        
        <!-- 初回利用者向けガイド -->
        <div class="dashboard-guide" id="dashboard-guide" style="display: none;">
            <div class="guide-content">
                <h2>ダッシュボードへようこそ！</h2>
                <p>ここはあなた専用のパーソナルスペースです。以下の機能をご利用いただけます：</p>
                
                <div class="guide-features">
                    <div class="feature-item">
                        <i class="fas fa-chart-line"></i>
                        <h3>学習進捗</h3>
                        <p>閲覧した記事数や学習時間を可視化</p>
                    </div>
                    
                    <div class="feature-item">
                        <i class="fas fa-lightbulb"></i>
                        <h3>おすすめコンテンツ</h3>
                        <p>あなたの興味に合わせたコンテンツを提案</p>
                    </div>
                    
                    <div class="feature-item">
                        <i class="fas fa-bookmark"></i>
                        <h3>ブックマーク</h3>
                        <p>保存した記事への素早いアクセス</p>
                    </div>
                    
                    <div class="feature-item">
                        <i class="fas fa-history"></i>
                        <h3>閲覧履歴</h3>
                        <p>最近見た記事の履歴を確認</p>
                    </div>
                    
                    <div class="feature-item">
                        <i class="fas fa-calendar"></i>
                        <h3>学習カレンダー</h3>
                        <p>毎日の学習活動を一目で確認</p>
                    </div>
                    
                    <div class="feature-item">
                        <i class="fas fa-cog"></i>
                        <h3>カスタマイズ</h3>
                        <p>ウィジェットの配置や表示をカスタマイズ</p>
                    </div>
                </div>
                
                <div class="guide-actions">
                    <button class="btn btn-primary" id="start-tutorial">チュートリアルを開始</button>
                    <button class="btn btn-secondary" id="skip-guide">スキップ</button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- ウィジェット追加モーダル -->
<div class="widget-modal" id="widget-modal" style="display: none;">
    <div class="modal-overlay"></div>
    <div class="modal-content">
        <div class="modal-header">
            <h3>ウィジェットを追加</h3>
            <button class="modal-close" aria-label="閉じる">&times;</button>
        </div>
        
        <div class="widget-gallery">
            <div class="widget-category">
                <h4>情報ウィジェット</h4>
                <div class="widget-grid">
                    <div class="widget-option" data-widget="welcome">
                        <div class="widget-preview">
                            <i class="fas fa-home"></i>
                        </div>
                        <h5>ようこそ</h5>
                        <p>挨拶と基本統計</p>
                        <button class="btn btn-sm btn-primary">追加</button>
                    </div>
                    
                    <div class="widget-option" data-widget="activity">
                        <div class="widget-preview">
                            <i class="fas fa-clock"></i>
                        </div>
                        <h5>最近の活動</h5>
                        <p>閲覧履歴の表示</p>
                        <button class="btn btn-sm btn-primary">追加</button>
                    </div>
                    
                    <div class="widget-option" data-widget="stats">
                        <div class="widget-preview">
                            <i class="fas fa-chart-bar"></i>
                        </div>
                        <h5>統計情報</h5>
                        <p>詳細な利用統計</p>
                        <button class="btn btn-sm btn-primary">追加</button>
                    </div>
                </div>
            </div>
            
            <div class="widget-category">
                <h4>コンテンツウィジェット</h4>
                <div class="widget-grid">
                    <div class="widget-option" data-widget="recommendations">
                        <div class="widget-preview">
                            <i class="fas fa-lightbulb"></i>
                        </div>
                        <h5>おすすめコンテンツ</h5>
                        <p>パーソナライズされた推薦</p>
                        <button class="btn btn-sm btn-primary">追加</button>
                    </div>
                    
                    <div class="widget-option" data-widget="bookmarks">
                        <div class="widget-preview">
                            <i class="fas fa-bookmark"></i>
                        </div>
                        <h5>ブックマーク</h5>
                        <p>保存したコンテンツ</p>
                        <button class="btn btn-sm btn-primary">追加</button>
                    </div>
                </div>
            </div>
            
            <div class="widget-category">
                <h4>ツールウィジェット</h4>
                <div class="widget-grid">
                    <div class="widget-option" data-widget="calendar">
                        <div class="widget-preview">
                            <i class="fas fa-calendar"></i>
                        </div>
                        <h5>カレンダー</h5>
                        <p>学習活動の記録</p>
                        <button class="btn btn-sm btn-primary">追加</button>
                    </div>
                    
                    <div class="widget-option" data-widget="progress">
                        <div class="widget-preview">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <h5>学習進捗</h5>
                        <p>進捗の可視化</p>
                        <button class="btn btn-sm btn-primary">追加</button>
                    </div>
                </div>
            </div>
            
            <div class="widget-category">
                <h4>分析ツール</h4>
                <div class="widget-grid">
                    <div class="widget-option" data-widget="site-analytics">
                        <div class="widget-preview">
                            <i class="fas fa-chart-bar"></i>
                        </div>
                        <h5>サイト分析</h5>
                        <p>アクセス解析とパフォーマンス</p>
                        <a href="/analytics/" class="btn btn-sm btn-primary">分析画面へ</a>
                    </div>
                    
                    <div class="widget-option" data-widget="comparison-tools">
                        <div class="widget-preview">
                            <i class="fas fa-balance-scale"></i>
                        </div>
                        <h5>比較ツール</h5>
                        <p>入札案件・事業者比較</p>
                        <a href="/comparison/" class="btn btn-sm btn-primary">比較画面へ</a>
                    </div>
                    
                    <div class="widget-option" data-widget="data-visualization">
                        <div class="widget-preview">
                            <i class="fas fa-chart-pie"></i>
                        </div>
                        <h5>データ可視化</h5>
                        <p>チャートとグラフ生成</p>
                        <button class="btn btn-sm btn-primary">追加</button>
                    </div>
                    
                    <div class="widget-option" data-widget="report-generator">
                        <div class="widget-preview">
                            <i class="fas fa-file-alt"></i>
                        </div>
                        <h5>レポート生成</h5>
                        <p>分析レポート作成</p>
                        <button class="btn btn-sm btn-primary">追加</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
/* ダッシュボード専用スタイル */
.dashboard-page {
    min-height: 100vh;
    background-color: #f8fafc;
}

.dashboard-loading {
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

/* ガイド */
.dashboard-guide {
    background-color: white;
    border-radius: 12px;
    padding: 2rem;
    margin: 2rem 0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.guide-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
}

.feature-item {
    text-align: center;
    padding: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.feature-item:hover {
    border-color: #3b82f6;
    background-color: #f8fafc;
}

.feature-item i {
    font-size: 2rem;
    color: #3b82f6;
    margin-bottom: 0.5rem;
}

.feature-item h3 {
    margin: 0.5rem 0;
    font-size: 1.125rem;
    font-weight: 600;
}

.feature-item p {
    margin: 0;
    color: #6b7280;
    font-size: 0.875rem;
}

.guide-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
}

/* ウィジェットモーダル */
.widget-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
}

.widget-modal .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.widget-modal .modal-content {
    position: relative;
    background-color: white;
    border-radius: 12px;
    padding: 1.5rem;
    width: 90%;
    max-width: 800px;
    max-height: 80vh;
    overflow-y: auto;
}

.widget-modal .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e5e7eb;
}

.widget-modal .modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #6b7280;
    width: 32px;
    height: 32px;
    border-radius: 4px;
}

.widget-modal .modal-close:hover {
    background-color: #f3f4f6;
    color: #374151;
}

.widget-category {
    margin-bottom: 2rem;
}

.widget-category h4 {
    margin: 0 0 1rem;
    font-size: 1.125rem;
    font-weight: 600;
    color: #374151;
}

.widget-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}

.widget-option {
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
    transition: all 0.3s ease;
}

.widget-option:hover {
    border-color: #3b82f6;
    background-color: #f8fafc;
}

.widget-preview {
    width: 60px;
    height: 60px;
    margin: 0 auto 0.75rem;
    background-color: #f3f4f6;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: #6b7280;
}

.widget-option h5 {
    margin: 0 0 0.5rem;
    font-size: 1rem;
    font-weight: 600;
}

.widget-option p {
    margin: 0 0 1rem;
    font-size: 0.875rem;
    color: #6b7280;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
    .dashboard-page {
        padding: 1rem 0;
    }
    
    .guide-features {
        grid-template-columns: 1fr;
    }
    
    .guide-actions {
        flex-direction: column;
    }
    
    .widget-grid {
        grid-template-columns: 1fr;
    }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // 初回利用者向けガイドの表示制御
    const hasVisitedDashboard = localStorage.getItem('dashboard-visited');
    const guideElement = document.getElementById('dashboard-guide');
    const dashboardContainer = document.getElementById('dashboard-container');
    
    if (!hasVisitedDashboard && guideElement) {
        setTimeout(() => {
            guideElement.style.display = 'block';
            dashboardContainer.style.display = 'none';
        }, 1000);
    }
    
    // ガイドのボタンイベント
    const startTutorialBtn = document.getElementById('start-tutorial');
    const skipGuideBtn = document.getElementById('skip-guide');
    
    if (startTutorialBtn) {
        startTutorialBtn.addEventListener('click', function() {
            localStorage.setItem('dashboard-visited', 'true');
            guideElement.style.display = 'none';
            dashboardContainer.style.display = 'block';
            // チュートリアル開始のロジックをここに追加
        });
    }
    
    if (skipGuideBtn) {
        skipGuideBtn.addEventListener('click', function() {
            localStorage.setItem('dashboard-visited', 'true');
            guideElement.style.display = 'none';
            dashboardContainer.style.display = 'block';
        });
    }
    
    // ウィジェット追加モーダル
    const widgetModal = document.getElementById('widget-modal');
    const addWidgetBtn = document.getElementById('dashboard-add-widget');
    
    if (addWidgetBtn) {
        addWidgetBtn.addEventListener('click', function() {
            widgetModal.style.display = 'flex';
        });
    }
    
    // モーダルを閉じる
    const modalClose = widgetModal?.querySelector('.modal-close');
    const modalOverlay = widgetModal?.querySelector('.modal-overlay');
    
    [modalClose, modalOverlay].forEach(element => {
        if (element) {
            element.addEventListener('click', function() {
                widgetModal.style.display = 'none';
            });
        }
    });
    
    // ウィジェット追加
    const widgetOptions = widgetModal?.querySelectorAll('.widget-option button');
    widgetOptions?.forEach(button => {
        button.addEventListener('click', function() {
            const widgetOption = button.closest('.widget-option');
            const widgetId = widgetOption.dataset.widget;
            
            if (window.dashboard) {
                const success = window.dashboard.addWidget(widgetId);
                if (success) {
                    widgetModal.style.display = 'none';
                }
            }
        });
    });
});
</script>