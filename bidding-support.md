---
layout: default
title: 入札サポートサービス - 3年後の売り上げの柱を立てる
description: 3年後の売上の種を植えよう。全省庁統一資格申請から入札参加まで完全サポート。事前診断・全額返金保証付きで安心してチャレンジできます。月額33,000円で入札参加の全工程をサポートいたします。
---

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&display=swap" rel="stylesheet">

<style>
/* 入札サポートサービス専用CSS - テストサイトから移植 */

/* 基本設定 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Noto Sans JP', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #fff;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* ヘッダー */
.header {
    background: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
    margin-bottom: 0;
}

.header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
    flex-wrap: wrap;
    gap: 1rem;
}

.logo {
    text-decoration: none;
    color: #333;
}

.logo-text {
    font-size: 1.8rem;
    font-weight: 700;
    color: #2196F3;
}

.nav {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.nav-link {
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: #fff;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.3s ease;
}

.nav-green { background: #4CAF50; }
.nav-blue { background: #2196F3; }
.nav-yellow { background: #FF9800; }
.nav-teal { background: #009688; }
.nav-pink { background: #E91E63; }
.nav-purple { background: #9C27B0; }
.nav-orange { background: #FF5722; }
.nav-emerald { background: #00BCD4; }
.nav-red { background: #F44336; }
.nav-indigo { background: #3F51B5; }

.nav-link:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.header-actions {
    display: flex;
    gap: 1rem;
}

.btn-search, .btn-contact {
    padding: 0.5rem 1rem;
    text-decoration: none;
    border-radius: 20px;
    font-weight: 500;
    transition: all 0.3s ease;
}

.btn-search {
    background: #f5f5f5;
    color: #333;
}

.btn-contact {
    background: #2196F3;
    color: #fff;
}

.btn-search:hover, .btn-contact:hover {
    transform: translateY(-2px);
}

/* ヒーローセクション */
.hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 4rem 0;
    margin: 0 -20px;
    position: relative;
    overflow: hidden;
}

.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="1.5" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="80" r="1" fill="rgba(255,255,255,0.1)"/></svg>');
    animation: float 20s ease-in-out infinite;
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
}

.hero-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
    position: relative;
    z-index: 1;
}

.hero-text {
    padding: 2rem;
}

.hero-badge {
    display: inline-block;
    background: rgba(255, 255, 255, 0.2);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
    backdrop-filter: blur(10px);
}

.hero-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 300;
    margin-bottom: 2rem;
    line-height: 1.2;
}

.highlight {
    background: linear-gradient(45deg, #FFD700, #FFA500);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 700;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin: 2rem 0;
}

.stat-item {
    text-align: center;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    backdrop-filter: blur(10px);
}

.stat-label {
    font-size: 0.8rem;
    opacity: 0.8;
    margin-bottom: 0.5rem;
}

.stat-number {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 0.3rem;
}

.stat-unit {
    font-size: 1rem;
    font-weight: 400;
}

.stat-sub {
    font-size: 0.7rem;
    opacity: 0.7;
}

.btn-cta {
    display: inline-block;
    background: #4CAF50;
    color: white;
    padding: 1rem 2rem;
    text-decoration: none;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    margin-top: 1rem;
}

.btn-cta:hover {
    background: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3);
}

/* ヒーロービジュアル */
.hero-visual {
    padding: 2rem;
}

.screenshot-container {
    perspective: 1000px;
}

.screenshot-frame {
    background: #fff;
    border-radius: 15px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    transform: rotateY(-5deg) rotateX(5deg);
    transition: transform 0.3s ease;
}

.screenshot-frame:hover {
    transform: rotateY(0deg) rotateX(0deg);
}

.screenshot-header {
    background: #f5f5f5;
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border-bottom: 1px solid #e0e0e0;
}

.screenshot-controls {
    display: flex;
    gap: 0.5rem;
}

.control {
    width: 12px;
    height: 12px;
    border-radius: 50%;
}

.control.red { background: #ff5f56; }
.control.yellow { background: #ffbd2e; }
.control.green { background: #27ca3f; }

.screenshot-title {
    font-size: 0.9rem;
    color: #666;
    font-weight: 500;
}

.screenshot-content {
    padding: 1.5rem;
    color: #333;
}

.search-section {
    margin-bottom: 2rem;
}

.search-bar {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.search-bar input {
    flex: 1;
    padding: 0.8rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 0.9rem;
}

.search-btn {
    background: #2196F3;
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
}

.filter-tabs {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.filter-tab {
    padding: 0.5rem 1rem;
    background: #f5f5f5;
    border-radius: 20px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.filter-tab.active {
    background: #2196F3;
    color: white;
}

.results-grid {
    display: grid;
    gap: 1rem;
    margin-bottom: 2rem;
}

.result-card {
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 8px;
    border-left: 4px solid #2196F3;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
}

.org-badge {
    background: #2196F3;
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 12px;
    font-size: 0.7rem;
}

.deadline {
    background: #4CAF50;
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 12px;
    font-size: 0.7rem;
}

.deadline.urgent {
    background: #F44336;
}

.card-title {
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
}

.card-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.8rem;
    color: #666;
}

.analytics-section {
    border-top: 1px solid #e0e0e0;
    padding-top: 1.5rem;
}

.chart-container {
    text-align: center;
}

.chart-title {
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

.chart-bars {
    display: flex;
    align-items: end;
    justify-content: center;
    gap: 0.5rem;
    height: 80px;
    margin-bottom: 0.5rem;
}

.bar {
    width: 20px;
    border-radius: 2px 2px 0 0;
    transition: all 0.3s ease;
}

.chart-labels {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    font-size: 0.7rem;
    color: #666;
}

/* メインコンテンツ */
.main-content {
    padding: 3rem 0;
}

.content-layout {
    display: grid;
    grid-template-columns: 250px 1fr 200px;
    gap: 2rem;
}

/* サイドバー */
.sidebar-left, .sidebar-right {
    padding: 1rem 0;
}

.sidebar-section {
    margin-bottom: 2rem;
}

.sidebar-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #333;
}

.sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.sidebar-link {
    padding: 0.8rem 1rem;
    text-decoration: none;
    color: #fff;
    border-radius: 8px;
    font-size: 0.9rem;
    transition: all 0.3s ease;
}

.sidebar-link-green { background: #4CAF50; }
.sidebar-link-blue { background: #2196F3; }
.sidebar-link-orange { background: #FF9800; }
.sidebar-link-teal { background: #009688; }
.sidebar-link-purple { background: #9C27B0; }
.sidebar-link-pink { background: #E91E63; }
.sidebar-link-violet { background: #673AB7; }

.sidebar-link:hover {
    transform: translateX(5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.sidebar-ad {
    background: #f5f5f5;
    padding: 2rem 1rem;
    border-radius: 8px;
    text-align: center;
    margin-bottom: 1rem;
}

.ad-placeholder {
    color: #999;
    font-size: 0.9rem;
}

/* メインコンテンツエリア */
.main-content-area {
    padding: 0 1rem;
}

.intro-section {
    margin-bottom: 3rem;
}

.intro-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    align-items: center;
}

.section-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #333;
}

.intro-description {
    font-size: 1.1rem;
    color: #666;
    line-height: 1.6;
}

.character-illustration {
    text-align: center;
}

.character-group {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.character {
    font-size: 2rem;
    animation: bounce 2s ease-in-out infinite;
}

.character:nth-child(2) { animation-delay: 0.2s; }
.character:nth-child(3) { animation-delay: 0.4s; }
.character:nth-child(4) { animation-delay: 0.6s; }
.character:nth-child(5) { animation-delay: 0.8s; }

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
}

.character-caption {
    font-size: 0.9rem;
    color: #666;
}

/* 動画セクション */
.video-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 3rem 2rem;
    border-radius: 15px;
    margin: 3rem 0;
    text-align: center;
}

.video-badge {
    display: inline-block;
    background: rgba(255, 255, 255, 0.2);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    margin-bottom: 1rem;
}

.video-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
}

.video-description {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    opacity: 0.9;
}

.video-meta {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 2rem;
    font-size: 0.9rem;
}

.btn-video {
    display: inline-block;
    background: #FF4444;
    color: white;
    padding: 1rem 2rem;
    text-decoration: none;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    margin-bottom: 1rem;
}

.btn-video:hover {
    background: #cc3333;
    transform: translateY(-2px);
}

.video-platform {
    font-size: 0.9rem;
    opacity: 0.8;
    margin-bottom: 2rem;
}

.video-placeholder {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 2rem;
    backdrop-filter: blur(10px);
}

.video-thumbnail {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

.play-button {
    width: 60px;
    height: 60px;
    background: #FF4444;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.play-button:hover {
    transform: scale(1.1);
}

.video-info {
    text-align: left;
}

.video-title-small {
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.video-duration {
    font-size: 0.9rem;
    opacity: 0.8;
}

/* 基礎セクション */
.basics-section {
    margin: 3rem 0;
}

.section-title-with-accent {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #333;
    position: relative;
    padding-left: 1rem;
}

.section-title-with-accent::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: #2196F3;
    border-radius: 2px;
}

.section-description {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 2rem;
}

.action-buttons {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
}

.btn-compliance, .btn-results {
    padding: 0.5rem 1rem;
    text-decoration: none;
    border-radius: 20px;
    font-weight: 500;
    transition: all 0.3s ease;
}

.btn-compliance {
    background: #FF9800;
    color: white;
}

.btn-results {
    background: #4CAF50;
    color: white;
}

.btn-compliance:hover, .btn-results:hover {
    transform: translateY(-2px);
}

.service-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.service-card {
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 15px;
    border-left: 5px solid #2196F3;
    transition: all 0.3s ease;
}

.service-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.card-title {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #333;
}

.card-description {
    color: #666;
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.btn-card {
    display: inline-block;
    padding: 0.8rem 1.5rem;
    text-decoration: none;
    border-radius: 25px;
    font-weight: 500;
    transition: all 0.3s ease;
}

.btn-green {
    background: #4CAF50;
    color: white;
}

.btn-red {
    background: #F44336;
    color: white;
}

.btn-blue {
    background: #2196F3;
    color: white;
}

.btn-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* フッター */
.footer {
    background: #333;
    color: white;
    padding: 3rem 0 1rem 0;
    margin-top: 3rem;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
}

.footer-column {
    padding: 1rem 0;
}

.footer-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #fff;
}

.footer-links {
    list-style: none;
}

.footer-links li {
    margin-bottom: 0.5rem;
}

.footer-links a {
    color: #ccc;
    text-decoration: none;
    transition: color 0.3s ease;
}

.footer-links a:hover {
    color: #fff;
}

.link-badge {
    background: #2196F3;
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 10px;
    font-size: 0.7rem;
    margin-left: 0.5rem;
}

.footer-bottom {
    border-top: 1px solid #555;
    padding-top: 1rem;
    text-align: center;
    color: #ccc;
    font-size: 0.9rem;
}

/* レスポンシブ対応 */
@media (max-width: 1024px) {
    .content-layout {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    
    .sidebar-left, .sidebar-right {
        order: 2;
    }
    
    .main-content-area {
        order: 1;
    }
}

@media (max-width: 768px) {
    .hero-content {
        grid-template-columns: 1fr;
        text-align: center;
    }
    
    .hero-visual {
        order: -1;
    }
    
    .stats-grid {
        grid-template-columns: 1fr;
    }
    
    .intro-content {
        grid-template-columns: 1fr;
        text-align: center;
    }
    
    .nav {
        justify-content: center;
    }
    
    .header-content {
        flex-direction: column;
        text-align: center;
    }
    
    .video-meta {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .action-buttons {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .service-cards {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 480px) {
    .container {
        padding: 0 15px;
    }
    
    .hero {
        margin: 0 -15px;
    }
    
    .hero-title {
        font-size: 2rem;
    }
    
    .section-title {
        font-size: 2rem;
    }
    
    .video-title {
        font-size: 1.5rem;
    }
    
    .screenshot-frame {
        transform: none;
    }
    
    .screenshot-frame:hover {
        transform: none;
    }
}
</style>

<!-- ヒーローセクション -->
<section class="hero">
    <div class="container">
        <div class="hero-content">
            <div class="hero-text">
                <div class="hero-badge">
                    <span class="badge-text">公共調達の総合情報サイト</span>
                </div>
                <h1 class="hero-title">
                    <span class="highlight">3年後の売り上げの柱を</span><br>
                    立てる。<br>
                    入札参加で事業を<br>
                    大きく成長させる。
                </h1>
                
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-label">成功率</div>
                        <div class="stat-number">99.8<span class="stat-unit">%</span></div>
                        <div class="stat-sub">申請成功実績</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">サポート企業</div>
                        <div class="stat-number">2,000<span class="stat-unit">社以上</span></div>
                        <div class="stat-sub">全国対応</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">最短</div>
                        <div class="stat-number">7<span class="stat-unit">日</span></div>
                        <div class="stat-sub">申請完了</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">月額</div>
                        <div class="stat-number">33,000<span class="stat-unit">円</span></div>
                        <div class="stat-sub">完全サポート</div>
                    </div>
                </div>
                
                <a href="tel:046-272-3357" class="btn-cta">無料相談予約</a>
            </div>
            
            <div class="hero-visual">
                <div class="screenshot-container">
                    <div class="screenshot-frame">
                        <div class="screenshot-header">
                            <div class="screenshot-controls">
                                <div class="control red"></div>
                                <div class="control yellow"></div>
                                <div class="control green"></div>
                            </div>
                            <div class="screenshot-title">入札マップ - 案件検索</div>
                        </div>
                        <div class="screenshot-content">
                            <div class="search-section">
                                <div class="search-bar">
                                    <input type="text" placeholder="案件名・企業名・キーワードで検索">
                                    <button class="search-btn">検索</button>
                                </div>
                                <div class="filter-tabs">
                                    <div class="filter-tab active">全案件</div>
                                    <div class="filter-tab">建設工事</div>
                                    <div class="filter-tab">コンサル</div>
                                    <div class="filter-tab">物品・役務</div>
                                </div>
                            </div>
                            
                            <div class="results-grid">
                                <div class="result-card">
                                    <div class="card-header">
                                        <span class="org-badge">国土交通省</span>
                                        <span class="deadline urgent">本日締切</span>
                                    </div>
                                    <div class="card-title">道路維持管理システム構築業務</div>
                                    <div class="card-meta">
                                        <span>予定価格: 2,800万円</span>
                                        <span>公告日: 2025/08/20</span>
                                    </div>
                                </div>
                                
                                <div class="result-card">
                                    <div class="card-header">
                                        <span class="org-badge">厚生労働省</span>
                                        <span class="deadline">3日</span>
                                    </div>
                                    <div class="card-title">医療機器安全性調査業務</div>
                                    <div class="card-meta">
                                        <span>予定価格: 1,500万円</span>
                                        <span>公告日: 2025/08/19</span>
                                    </div>
                                </div>
                                
                                <div class="result-card">
                                    <div class="card-header">
                                        <span class="org-badge">文部科学省</span>
                                        <span class="deadline">7日</span>
                                    </div>
                                    <div class="card-title">教育システム改修業務</div>
                                    <div class="card-meta">
                                        <span>予定価格: 3,200万円</span>
                                        <span>公告日: 2025/08/18</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="analytics-section">
                                <div class="chart-container">
                                    <div class="chart-title">業界別案件分布</div>
                                    <div class="chart-bars">
                                        <div class="bar" style="height: 70%; background: #1565C0;"></div>
                                        <div class="bar" style="height: 50%; background: #2E7D32;"></div>
                                        <div class="bar" style="height: 40%; background: #FF6B35;"></div>
                                        <div class="bar" style="height: 30%; background: #7B1FA2;"></div>
                                        <div class="bar" style="height: 20%; background: #C62828;"></div>
                                    </div>
                                    <div class="chart-labels">
                                        <span>建設</span>
                                        <span>IT</span>
                                        <span>コンサル</span>
                                        <span>物品</span>
                                        <span>その他</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- メインコンテンツ -->
<main class="main-content">
    <div class="container">
        <div class="content-layout">
            <!-- 左サイドバー -->
            <aside class="sidebar-left">
                <div class="sidebar-section">
                    <h3 class="sidebar-title">学習する</h3>
                    <nav class="sidebar-nav">
                        <a href="#" class="sidebar-link sidebar-link-green">入札の基本</a>
                        <a href="#" class="sidebar-link sidebar-link-blue">用語集</a>
                        <a href="#" class="sidebar-link sidebar-link-orange">最新動向</a>
                    </nav>
                </div>
                
                <div class="sidebar-section">
                    <h3 class="sidebar-title">実践する</h3>
                    <nav class="sidebar-nav">
                        <a href="#" class="sidebar-link sidebar-link-teal">ご利用の流れ</a>
                        <a href="#" class="sidebar-link sidebar-link-purple">事例研究</a>
                        <a href="#" class="sidebar-link sidebar-link-pink">よくある質問</a>
                    </nav>
                </div>
                
                <div class="sidebar-section">
                    <h3 class="sidebar-title">サービス</h3>
                    <nav class="sidebar-nav">
                        <a href="#" class="sidebar-link sidebar-link-violet">資格取得支援</a>
                    </nav>
                </div>
            </aside>

            <!-- メインコンテンツエリア -->
            <div class="main-content-area">
                <!-- 紹介セクション -->
                <section class="intro-section">
                    <div class="intro-content">
                        <div class="intro-text">
                            <h2 class="section-title">入札サポートサービス</h2>
                            <p class="intro-description">
                                初心者から経験者まで、入札参加に必要な知識と情報をわかりやすく体系的にお届けします
                            </p>
                        </div>
                        <div class="character-illustration">
                            <div class="character-group">
                                <span class="character">👨‍💼</span>
                                <span class="character">👩‍💼</span>
                                <span class="character">👨‍💻</span>
                                <span class="character">👩‍💻</span>
                                <span class="character">🏢</span>
                            </div>
                            <div class="character-caption">みんなで学ぶ入札の世界</div>
                        </div>
                    </div>
                </section>

                <!-- 動画セクション -->
                <section class="video-section">
                    <div class="video-badge">
                        <span class="badge-label">初心者必見</span>
                    </div>
                    <h3 class="video-title">動画で学ぶ入札の基本</h3>
                    <p class="video-description">
                        「入札は建設工事だけ？」そんな疑問を解決！<br>
                        役務案件と全省庁統一資格について、やさしく解説します。
                    </p>
                    <div class="video-meta">
                        <span>約16分</span>
                        <span>初心者向け</span>
                        <span>スマホ対応</span>
                    </div>
                    <div class="video-cta">
                        <a href="#" class="btn-video">今すぐ動画を見る →</a>
                    </div>
                    <div class="video-platform">YouTubeで無料視聴</div>
                    
                    <div class="video-placeholder">
                        <div class="video-thumbnail">
                            <div class="play-button">▶</div>
                            <div class="video-info">
                                <div class="video-title-small">入札ってなに？やさしく解説するゆるっと入札講座！</div>
                                <div class="video-duration">16:09</div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- 入札の基礎セクション -->
                <section class="basics-section">
                    <h3 class="section-title-with-accent">入札の基礎から学ぶ</h3>
                    <p class="section-description">初心者の方も安心して入札に参加できるよう、ステップごとに解説します</p>
                    
                    <div class="action-buttons">
                        <span>申請でお困りの方は</span>
                        <a href="#" class="btn-compliance">コンプライアンス</a>
                        <span>当事務所の豊富な実績は</span>
                        <a href="#" class="btn-results">実績実例へ</a>
                    </div>
                    
                    <div class="service-cards">
                        <div class="service-card">
                            <h4 class="card-title">初心者でも安心！入札参加の第一歩</h4>
                            <p class="card-description">行政書士が基礎から解説</p>
                            <a href="tel:046-272-3357" class="btn-card btn-green">無料相談を申し込む</a>
                        </div>
                        
                        <div class="service-card">
                            <h4 class="card-title">入札参加完全サポート</h4>
                            <p class="card-description">申請から業務完了まで月額33,000円で全工程サポート</p>
                            <a href="tel:046-272-3357" class="btn-card btn-red">入札参加完全サポートを申し込む</a>
                        </div>
                        
                        <div class="service-card">
                            <h4 class="card-title">入札失格を防ぐ書類チェック術</h4>
                            <p class="card-description">プロが教える見落としがちなポイント</p>
                            <a href="#" class="btn-card btn-blue">サービスの流れを見る</a>
                        </div>
                    </div>
                </section>
            </div>

            <!-- 右サイドバー -->
            <aside class="sidebar-right">
                <div class="sidebar-ad">
                    <div class="ad-placeholder">広告スペース</div>
                </div>
                <div class="sidebar-ad">
                    <div class="ad-placeholder">広告スペース</div>
                </div>
            </aside>
        </div>
    </div>
</main>

<!-- 会社情報 -->
<div class="company-info">
    <h3>行政書士法人ふらっと法務事務所</h3>
    <p>📞 電話: 046-272-3357</p>
    <p>📧 メール: info@flat-portal.com</p>
    <p>🏢 住所: 神奈川県大和市中央林間4-5-9 田園都市建設ビル2F</p>
    <p>⏰ 営業時間: 平日 9:00-18:00</p>
</div>

