---
layout: default
title: 入札サポートサービス - 3年後の売り上げの柱を立てる
description: 3年後の売上の種を植えよう。全省庁統一資格申請から入札参加まで完全サポート。事前診断・全額返金保証付きで安心してチャレンジできます。月額33,000円で入札参加の全工程をサポートいたします。
---

<style>
/* 入札サポートサービス専用CSS - Jekyll互換版 */

/* ヒーローセクション */
.bidding-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  margin: 2rem -2rem 3rem -2rem;
  position: relative;
  overflow: hidden;
  border-radius: 15px;
}

.bidding-hero::before {
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

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  margin: 0 0 1rem 0;
  line-height: 1.2;
  position: relative;
  z-index: 1;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin: 0 0 2rem 0;
  opacity: 0.9;
  position: relative;
  z-index: 1;
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem auto;
  max-width: 800px;
  position: relative;
  z-index: 1;
}

.stat-item {
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 0.5rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.stat-unit {
  font-size: 1.2rem;
  font-weight: 400;
}

.stat-sub {
  font-size: 0.8rem;
  opacity: 0.7;
}

.hero-cta {
  display: inline-flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  z-index: 1;
  margin-top: 2rem;
}

.btn-hero {
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-primary {
  background: #4CAF50;
  color: white;
}

.btn-primary:hover {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* ビジュアルセクション */
.hero-visual {
  margin: 3rem 0;
  text-align: center;
}

.screenshot-container {
  perspective: 1000px;
  display: inline-block;
}

.screenshot-frame {
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transform: rotateY(-5deg) rotateX(5deg);
  transition: transform 0.3s ease;
  max-width: 600px;
  margin: 0 auto;
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

/* 特典セクション */
.benefits-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 2rem;
  margin: 3rem -2rem;
  text-align: center;
  border-radius: 15px;
}

.benefits-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: 700;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.benefit-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-5px);
}

.benefit-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.benefit-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.benefit-description {
  font-size: 1rem;
  opacity: 0.9;
  line-height: 1.6;
}

.price-highlight {
  background: #FF4444;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-weight: 700;
  display: inline-block;
  margin-top: 1rem;
}

/* サービスカード */
.service-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
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

.service-card-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
}

.service-card-description {
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

/* 会社情報 */
.company-info {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 15px;
  margin: 2rem 0;
  border-left: 5px solid #2196F3;
}

.company-info h3 {
  color: #333;
  margin-bottom: 1rem;
}

.company-info p {
  color: #666;
  margin-bottom: 0.5rem;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .benefits-grid,
  .service-cards {
    grid-template-columns: 1fr;
  }
  
  .hero-cta {
    flex-direction: column;
    align-items: center;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .screenshot-frame {
    transform: none;
  }
  
  .screenshot-frame:hover {
    transform: none;
  }
}

@media (max-width: 480px) {
  .bidding-hero {
    margin: 1rem -1rem 2rem -1rem;
    padding: 2rem 1rem;
  }
  
  .benefits-section {
    margin: 2rem -1rem;
    padding: 2rem 1rem;
  }
}
</style>

<!-- ヒーローセクション -->
<section class="bidding-hero">
  <h1 class="hero-title">
    <span class="highlight">3年後の売り上げの柱を</span><br>
    立てる。<br>
    入札参加で事業を<br>
    大きく成長させる。
  </h1>
  <p class="hero-subtitle">入札参加で安定した売上基盤を構築</p>
  
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
  
  <div class="hero-cta">
    <a href="tel:046-272-3357" class="btn-hero btn-primary">無料相談予約</a>
    <a href="#details" class="btn-hero btn-secondary">資料請求</a>
  </div>
</section>

<!-- ビジュアルセクション -->
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

<!-- 特典セクション -->
<section class="benefits-section">
  <h2 class="benefits-title">今なら特別特典</h2>
  <div class="benefits-grid">
    <div class="benefit-card">
      <div class="benefit-icon">🎁</div>
      <h3 class="benefit-title">全省庁統一資格申請が無料！</h3>
      <p class="benefit-description">通常15万円の申請費用が完全無料。サポート申し込みと同時に資格取得をスタートできます。</p>
      <div class="price-highlight">通常15万円 → 0円</div>
    </div>
    <div class="benefit-card">
      <div class="benefit-icon">🔍</div>
      <h3 class="benefit-title">事前診断で可能性を確認</h3>
      <p class="benefit-description">お客様の事業内容を詳しくヒアリングし、入札参加の可能性を事前に診断。無理な営業は一切いたしません。</p>
    </div>
    <div class="benefit-card">
      <div class="benefit-icon">💯</div>
      <h3 class="benefit-title">全額返金保証</h3>
      <p class="benefit-description">万一、資格取得ができなかった場合には全額返金。リスクゼロで入札の世界にチャレンジできます。</p>
    </div>
  </div>
</section>

<!-- サービス内容 -->
<section>
  <h2>入札参加完全サポートサービス</h2>
  <p>初心者の方も安心して入札に参加できるよう、ステップごとに解説します</p>
  
  <div class="service-cards">
    <div class="service-card">
      <h4 class="service-card-title">初心者でも安心！入札参加の第一歩</h4>
      <p class="service-card-description">行政書士が基礎から解説</p>
      <a href="tel:046-272-3357" class="btn-card btn-green">無料相談を申し込む</a>
    </div>
    
    <div class="service-card">
      <h4 class="service-card-title">入札参加完全サポート</h4>
      <p class="service-card-description">申請から業務完了まで月額33,000円で全工程サポート</p>
      <a href="tel:046-272-3357" class="btn-card btn-red">入札参加完全サポートを申し込む</a>
    </div>
    
    <div class="service-card">
      <h4 class="service-card-title">入札失格を防ぐ書類チェック術</h4>
      <p class="service-card-description">プロが教える見落としがちなポイント</p>
      <a href="#" class="btn-card btn-blue">サービスの流れを見る</a>
    </div>
  </div>
</section>

<!-- 会社情報 -->
<div class="company-info">
  <h3>行政書士法人ふらっと法務事務所</h3>
  <p>📞 電話: 046-272-3357</p>
  <p>📧 メール: info@flat-portal.com</p>
  <p>🏢 住所: 神奈川県大和市中央林間4-5-9 田園都市建設ビル2F</p>
  <p>⏰ 営業時間: 平日 9:00-18:00</p>
</div>

