---
layout: default
title: "サイト内検索 | 入札・公共調達情報を素早く検索"
description: "入札参加資格、申請方法、電子入札システムなど、サイト内の情報を素早く検索できます。キーワードやカテゴリーで絞り込んで、必要な情報を効率的に見つけましょう。"
keywords: "サイト内検索,入札情報検索,申請方法検索,電子入札,随意契約,行政書士,公共調達"
permalink: /search/
breadcrumb_parent: "サイト機能"
breadcrumb_parent_url: "/"
---

<div class="search-page">
    <div class="container">
        <!-- ページヘッダー -->
        <div class="search-page-header">
            <h1>サイト内検索</h1>
            <p>入札・公共調達に関する情報を素早く検索できます</p>
        </div>
        
        <!-- 検索コンポーネント -->
        {% include search-component.html %}
        
        <!-- 検索のヒント -->
        <div class="search-tips">
            <h2>検索のコツ</h2>
            <div class="tips-grid">
                <div class="tip-card">
                    <div class="tip-icon">
                        <i class="fas fa-lightbulb"></i>
                    </div>
                    <h3>キーワードを組み合わせる</h3>
                    <p>「入札参加資格 申請方法」のように、複数のキーワードを組み合わせると、より具体的な情報が見つかります。</p>
                </div>
                
                <div class="tip-card">
                    <div class="tip-icon">
                        <i class="fas fa-filter"></i>
                    </div>
                    <h3>カテゴリーで絞り込む</h3>
                    <p>検索結果をページ、記事、ガイドなどのカテゴリーで絞り込むことで、目的の情報により早くアクセスできます。</p>
                </div>
                
                <div class="tip-card">
                    <div class="tip-icon">
                        <i class="fas fa-tags"></i>
                    </div>
                    <h3>人気キーワードを活用</h3>
                    <p>よく検索されるキーワードから選ぶことで、重要な情報に素早くアクセスできます。</p>
                </div>
            </div>
        </div>
        
        <!-- カテゴリー別ナビゲーション -->
        <div class="category-navigation">
            <h2>カテゴリー別に探す</h2>
            <div class="category-grid">
                <a href="/knowhow/" class="category-card">
                    <div class="category-icon">
                        <i class="fas fa-graduation-cap"></i>
                    </div>
                    <h3>入札の基本</h3>
                    <p>初心者向けの入札ガイド</p>
                </a>
                
                <a href="/qualification/" class="category-card">
                    <div class="category-icon">
                        <i class="fas fa-id-card"></i>
                    </div>
                    <h3>資格申請</h3>
                    <p>入札参加資格の取得方法</p>
                </a>
                
                <a href="/denshi-nyusatsu/" class="category-card">
                    <div class="category-icon">
                        <i class="fas fa-laptop"></i>
                    </div>
                    <h3>電子入札</h3>
                    <p>電子入札システムの使い方</p>
                </a>
                
                <a href="/zuii-keiyaku/" class="category-card">
                    <div class="category-icon">
                        <i class="fas fa-handshake"></i>
                    </div>
                    <h3>随意契約</h3>
                    <p>随意契約の活用方法</p>
                </a>
                
                <a href="/case-studies/" class="category-card">
                    <div class="category-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <h3>事例研究</h3>
                    <p>成功事例とケーススタディ</p>
                </a>
                
                <a href="/service/" class="category-card">
                    <div class="category-icon">
                        <i class="fas fa-user-tie"></i>
                    </div>
                    <h3>専門サポート</h3>
                    <p>行政書士による代行サービス</p>
                </a>
            </div>
        </div>
    </div>
</div>

<style>
.search-page {
    padding: 2rem 0;
    min-height: 60vh;
}

.search-page-header {
    text-align: center;
    margin-bottom: 3rem;
}

.search-page-header h1 {
    font-size: 2.5rem;
    color: #1f2937;
    margin-bottom: 1rem;
}

.search-page-header p {
    font-size: 1.2rem;
    color: #6b7280;
    max-width: 600px;
    margin: 0 auto;
}

.search-tips {
    margin: 4rem 0;
    padding: 2rem;
    background: #f9fafb;
    border-radius: 12px;
}

.search-tips h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: #1f2937;
}

.tips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.tip-card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.tip-icon {
    width: 60px;
    height: 60px;
    background: #3b82f6;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
}

.tip-icon i {
    font-size: 24px;
    color: white;
}

.tip-card h3 {
    margin-bottom: 1rem;
    color: #1f2937;
}

.tip-card p {
    color: #6b7280;
    line-height: 1.6;
}

.category-navigation {
    margin: 4rem 0;
}

.category-navigation h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: #1f2937;
}

.category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

.category-card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
    text-align: center;
}

.category-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.category-icon {
    width: 50px;
    height: 50px;
    background: #e5e7eb;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    transition: all 0.3s ease;
}

.category-card:hover .category-icon {
    background: #3b82f6;
    color: white;
}

.category-icon i {
    font-size: 20px;
    color: #6b7280;
    transition: color 0.3s ease;
}

.category-card:hover .category-icon i {
    color: white;
}

.category-card h3 {
    margin-bottom: 0.5rem;
    color: #1f2937;
    font-size: 1.1rem;
}

.category-card p {
    color: #6b7280;
    font-size: 0.9rem;
    margin: 0;
}

/* モバイル対応 */
@media (max-width: 768px) {
    .search-page {
        padding: 1rem 0;
    }
    
    .search-page-header h1 {
        font-size: 2rem;
    }
    
    .search-page-header p {
        font-size: 1rem;
    }
    
    .tips-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .tip-card {
        padding: 1.5rem;
    }
    
    .category-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
    }
    
    .category-card {
        padding: 1.5rem;
    }
}

/* ダークモード対応 */
@media (prefers-color-scheme: dark) {
    .search-tips {
        background: #111827;
    }
    
    .tip-card, .category-card {
        background: #1f2937;
    }
    
    .search-page-header h1,
    .search-tips h2,
    .category-navigation h2,
    .tip-card h3,
    .category-card h3 {
        color: #f9fafb;
    }
    
    .search-page-header p,
    .tip-card p,
    .category-card p {
        color: #d1d5db;
    }
    
    .category-icon {
        background: #374151;
    }
    
    .category-icon i {
        color: #9ca3af;
    }
}
</style>

<!-- 検索機能のJavaScript読み込み -->
<script src="/assets/js/search.js"></script>

