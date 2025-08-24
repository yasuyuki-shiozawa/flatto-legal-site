---
layout: default
title: 入札サポートサービス - 3年後の売り上げの柱を立てる
description: 3年後の売上の種を植えよう。全省庁統一資格申請から入札参加まで完全サポート。事前診断・全額返金保証付きで安心してチャレンジできます。月額33,000円で入札参加の全工程をサポートいたします。
---

<style>
/* 入札サポートサービス専用CSS - 軽量版 */

/* 基本リセット */
.bidding-support * {
  box-sizing: border-box;
  writing-mode: horizontal-tb !important;
  text-orientation: mixed !important;
}

/* ヒーローセクション */
.bidding-support .hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 1.5rem;
  text-align: center;
  margin: 1rem 0 2rem 0;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.bidding-support .hero-title {
  font-size: 2.5rem;
  font-weight: 300;
  margin: 0 0 1rem 0;
  line-height: 1.3;
}

.bidding-support .hero-subtitle {
  font-size: 1.1rem;
  margin: 0 0 2rem 0;
  opacity: 0.9;
}

.bidding-support .highlight-text {
  background: linear-gradient(45deg, #FFD700, #FFA500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

.bidding-support .stats-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
}

.bidding-support .stat-box {
  background: rgba(255, 255, 255, 0.15);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  min-width: 150px;
  backdrop-filter: blur(10px);
}

.bidding-support .stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 0.5rem;
}

.bidding-support .stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.bidding-support .stat-unit {
  font-size: 1rem;
}

.bidding-support .stat-desc {
  font-size: 0.8rem;
  opacity: 0.7;
}

.bidding-support .hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.bidding-support .btn-hero {
  padding: 1rem 2rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  display: inline-block;
}

.bidding-support .btn-primary {
  background: #4CAF50;
  color: white;
}

.bidding-support .btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

/* ビジュアルセクション */
.bidding-support .visual-section {
  margin: 2rem 0;
  text-align: center;
}

.bidding-support .screenshot-mockup {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  max-width: 600px;
  margin: 0 auto;
  display: inline-block;
}

.bidding-support .mockup-header {
  background: #f5f5f5;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.bidding-support .mockup-controls {
  display: flex;
  gap: 0.5rem;
}

.bidding-support .control-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.bidding-support .control-red { background: #ff5f56; }
.bidding-support .control-yellow { background: #ffbd2e; }
.bidding-support .control-green { background: #27ca3f; }

.bidding-support .mockup-title {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.bidding-support .mockup-content {
  padding: 1.5rem;
  color: #333;
  text-align: left;
}

.bidding-support .search-demo {
  margin-bottom: 1.5rem;
}

.bidding-support .search-input {
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.bidding-support .filter-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.bidding-support .filter-btn {
  padding: 0.5rem 1rem;
  background: #f5f5f5;
  border-radius: 20px;
  font-size: 0.8rem;
  border: none;
  cursor: pointer;
}

.bidding-support .filter-btn.active {
  background: #2196F3;
  color: white;
}

.bidding-support .demo-results {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.bidding-support .demo-card {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #2196F3;
}

.bidding-support .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.bidding-support .org-tag {
  background: #2196F3;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
}

.bidding-support .deadline-tag {
  background: #4CAF50;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
}

.bidding-support .card-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.bidding-support .card-info {
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
  color: #666;
}

/* 特典セクション */
.bidding-support .benefits-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2.5rem 1.5rem;
  margin: 2rem 0;
  text-align: center;
  border-radius: 12px;
}

.bidding-support .benefits-title {
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 700;
}

.bidding-support .benefits-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
}

.bidding-support .benefit-item {
  background: rgba(255, 255, 255, 0.15);
  padding: 1.5rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  max-width: 300px;
  flex: 1;
  min-width: 250px;
}

.bidding-support .benefit-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.bidding-support .benefit-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.bidding-support .benefit-desc {
  font-size: 0.95rem;
  opacity: 0.9;
  line-height: 1.5;
}

.bidding-support .price-tag {
  background: #FF4444;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 700;
  display: inline-block;
  margin-top: 1rem;
}

/* サービスカード */
.bidding-support .services-section {
  margin: 2rem 0;
}

.bidding-support .services-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

.bidding-support .service-item {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 5px solid #2196F3;
  max-width: 350px;
  flex: 1;
  min-width: 280px;
}

.bidding-support .service-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
}

.bidding-support .service-desc {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.bidding-support .btn-service {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  text-decoration: none;
  border-radius: 20px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.bidding-support .btn-green {
  background: #4CAF50;
  color: white;
}

.bidding-support .btn-red {
  background: #F44336;
  color: white;
}

.bidding-support .btn-blue {
  background: #2196F3;
  color: white;
}

/* 会社情報 */
.bidding-support .company-section {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  margin: 2rem 0;
  border-left: 5px solid #2196F3;
}

.bidding-support .company-section h3 {
  color: #333;
  margin-bottom: 1rem;
}

.bidding-support .company-section p {
  color: #666;
  margin-bottom: 0.5rem;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .bidding-support .hero-title {
    font-size: 2rem;
  }
  
  .bidding-support .stats-container {
    flex-direction: column;
    align-items: center;
  }
  
  .bidding-support .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .bidding-support .benefits-grid,
  .bidding-support .services-grid {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .bidding-support .hero-section {
    padding: 2rem 1rem;
  }
  
  .bidding-support .benefits-section {
    padding: 2rem 1rem;
  }
}
</style>

<div class="bidding-support">

<!-- ヒーローセクション -->
<section class="hero-section">
  <h1 class="hero-title">
    <span class="highlight-text">3年後の売り上げの柱を</span><br>
    立てる。<br>
    入札参加で事業を<br>
    大きく成長させる。
  </h1>
  <p class="hero-subtitle">入札参加で安定した売上基盤を構築</p>
  
  <div class="stats-container">
    <div class="stat-box">
      <div class="stat-label">成功率</div>
      <div class="stat-value">99.8<span class="stat-unit">%</span></div>
      <div class="stat-desc">申請成功実績</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">サポート企業</div>
      <div class="stat-value">2,000<span class="stat-unit">社以上</span></div>
      <div class="stat-desc">全国対応</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">最短</div>
      <div class="stat-value">7<span class="stat-unit">日</span></div>
      <div class="stat-desc">申請完了</div>
    </div>
    <div class="stat-box">
      <div class="stat-label">月額</div>
      <div class="stat-value">33,000<span class="stat-unit">円</span></div>
      <div class="stat-desc">完全サポート</div>
    </div>
  </div>
  
  <div class="hero-buttons">
    <a href="tel:046-272-3357" class="btn-hero btn-primary">無料相談予約</a>
    <a href="#details" class="btn-hero btn-secondary">資料請求</a>
  </div>
</section>

<!-- ビジュアルセクション -->
<div class="visual-section">
  <div class="screenshot-mockup">
    <div class="mockup-header">
      <div class="mockup-controls">
        <div class="control-dot control-red"></div>
        <div class="control-dot control-yellow"></div>
        <div class="control-dot control-green"></div>
      </div>
      <div class="mockup-title">入札マップ - 案件検索</div>
    </div>
    <div class="mockup-content">
      <div class="search-demo">
        <input type="text" class="search-input" placeholder="案件名・企業名・キーワードで検索" readonly>
        <div class="filter-buttons">
          <button class="filter-btn active">全案件</button>
          <button class="filter-btn">建設工事</button>
          <button class="filter-btn">コンサル</button>
          <button class="filter-btn">物品・役務</button>
        </div>
      </div>
      
      <div class="demo-results">
        <div class="demo-card">
          <div class="card-header">
            <span class="org-tag">国土交通省</span>
            <span class="deadline-tag">本日締切</span>
          </div>
          <div class="card-title">道路維持管理システム構築業務</div>
          <div class="card-info">
            <span>予定価格: 2,800万円</span>
            <span>公告日: 2025/08/20</span>
          </div>
        </div>
        
        <div class="demo-card">
          <div class="card-header">
            <span class="org-tag">厚生労働省</span>
            <span class="deadline-tag">3日</span>
          </div>
          <div class="card-title">医療機器安全性調査業務</div>
          <div class="card-info">
            <span>予定価格: 1,500万円</span>
            <span>公告日: 2025/08/19</span>
          </div>
        </div>
        
        <div class="demo-card">
          <div class="card-header">
            <span class="org-tag">文部科学省</span>
            <span class="deadline-tag">7日</span>
          </div>
          <div class="card-title">教育システム改修業務</div>
          <div class="card-info">
            <span>予定価格: 3,200万円</span>
            <span>公告日: 2025/08/18</span>
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
    <div class="benefit-item">
      <div class="benefit-icon">🎁</div>
      <h3 class="benefit-title">全省庁統一資格申請が無料！</h3>
      <p class="benefit-desc">通常15万円の申請費用が完全無料。サポート申し込みと同時に資格取得をスタートできます。</p>
      <div class="price-tag">通常15万円 → 0円</div>
    </div>
    <div class="benefit-item">
      <div class="benefit-icon">🔍</div>
      <h3 class="benefit-title">事前診断で可能性を確認</h3>
      <p class="benefit-desc">お客様の事業内容を詳しくヒアリングし、入札参加の可能性を事前に診断。無理な営業は一切いたしません。</p>
    </div>
    <div class="benefit-item">
      <div class="benefit-icon">💯</div>
      <h3 class="benefit-title">全額返金保証</h3>
      <p class="benefit-desc">万一、資格取得ができなかった場合には全額返金。リスクゼロで入札の世界にチャレンジできます。</p>
    </div>
  </div>
</section>

<!-- サービス内容 -->
<section class="services-section">
  <h2>入札参加完全サポートサービス</h2>
  <p>初心者の方も安心して入札に参加できるよう、ステップごとに解説します</p>
  
  <div class="services-grid">
    <div class="service-item">
      <h4 class="service-title">初心者でも安心！入札参加の第一歩</h4>
      <p class="service-desc">行政書士が基礎から解説</p>
      <a href="tel:046-272-3357" class="btn-service btn-green">無料相談を申し込む</a>
    </div>
    
    <div class="service-item">
      <h4 class="service-title">入札参加完全サポート</h4>
      <p class="service-desc">申請から業務完了まで月額33,000円で全工程サポート</p>
      <a href="tel:046-272-3357" class="btn-service btn-red">入札参加完全サポートを申し込む</a>
    </div>
    
    <div class="service-item">
      <h4 class="service-title">入札失格を防ぐ書類チェック術</h4>
      <p class="service-desc">プロが教える見落としがちなポイント</p>
      <a href="#" class="btn-service btn-blue">サービスの流れを見る</a>
    </div>
  </div>
</section>

<!-- 会社情報 -->
<div class="company-section">
  <h3>行政書士法人ふらっと法務事務所</h3>
  <p>📞 電話: 046-272-3357</p>
  <p>📧 メール: info@flat-portal.com</p>
  <p>🏢 住所: 神奈川県大和市中央林間4-5-9 田園都市建設ビル2F</p>
  <p>⏰ 営業時間: 平日 9:00-18:00</p>
</div>

</div>

## 入札参加資格について

### 入札参加資格とは

入札参加資格は、国や地方自治体が実施する**競争入札**に参加するために必要な資格です。**建設工事**、**測量・コンサルタント**、**物品・役務**の3つの分野があり、それぞれ別々に申請が必要です。

国の入札には全省庁統一資格が必要で、地方自治体については各自治体独自の資格制度があります。これらの資格には通常2〜3年の有効期限が設定されており、期限前の更新手続きが必要となります。

#### 入札参加資格の種類

*   **建設工事**：土木工事、建築工事、電気工事、管工事など
*   **測量・コンサルタント**：測量業務、建設コンサルタント業務など
*   **物品・役務**：物品購入、清掃業務、警備業務、システム開発など

### 入札制度の種類

公共調達には様々な入札方式があり、それぞれに特徴があります。

**一般競争入札**は最も基本的な入札方式で、条件を満たす全ての事業者が参加できます。**指名競争入札**では発注者が入札参加者を指名し、**随意契約**は競争によらない契約方式です。近年増加している**総合評価落札方式**では価格と技術力を総合的に評価し、**企画競争（プロポーザル）**では提案内容によって選定が行われます。

### 対応地域

当事務所は**神奈川県大和市**を拠点に、**全国どこからでもZoom対応**で入札サポートを提供しております。

オンライン相談により、北海道から沖縄まで全国の事業者様にご利用いただけます。神奈川県・東京都はもちろん、関東全域、関西、中部、九州、四国など、地域を問わず**全省庁統一資格申請**や**地方自治体の入札参加資格申請**を完全サポートいたします。Zoomを使った無料相談で、まずはお気軽にご相談ください。

### 入札参加資格申請の流れ（初心者向け完全ガイド）

入札参加資格の申請は、初心者の方には複雑に感じられるかもしれませんが、適切な手順を踏めば確実に取得できます。以下、ステップごとに詳しく解説いたします。

#### 1. 申請する資格の種類を決定

まず、自社の事業内容に応じて申請する資格の種類を決定します。建設業であれば建設工事、システム開発であれば物品・役務など、事業内容と資格種別を正確に対応させることが重要です。

**ポイント：**複数の分野で事業を行っている場合は、すべての該当分野で申請することをお勧めします。

#### 2. 必要書類の準備

申請に必要な書類は多岐にわたります。法人の場合は登記事項証明書、財務諸表、納税証明書、建設業許可証（建設工事の場合）などが必要です。個人事業主の場合は確定申告書、所得証明書などが必要となります。

**注意：**書類には有効期限があるものが多いため、申請直前に取得することをお勧めします。

#### 3. 申請書の作成・提出

必要書類が揃ったら、申請書を作成します。全省庁統一資格の場合は電子申請システムを使用し、地方自治体の場合は各自治体の指定する方法で申請します。記入漏れや添付書類の不備がないよう、十分にチェックしてから提出しましょう。

**重要：**申請期間は限定されているため、余裕を持って準備することが大切です。

#### 4. 審査・資格決定

申請後、発注機関による審査が行われます。審査期間は通常1〜3ヶ月程度で、審査結果は郵送または電子システムで通知されます。資格が認定されると、有効期間内は入札に参加することができます。

**アフターフォロー：**資格取得後も、変更事項があった場合の変更届出や、有効期限前の更新手続きが必要です。

### よくある失敗事例と対策

入札参加資格申請でよくある失敗事例をご紹介し、それぞれの対策をお伝えします。これらの事例を参考に、スムーズな申請を目指しましょう。

#### ❌ 申請期間を過ぎてしまった

**事例：**申請期間の確認を怠り、締切日を過ぎてから申請しようとして受付けてもらえなかった。

**対策：**申請期間は年に1〜2回と限定されています。各機関のホームページで申請期間を事前に確認し、カレンダーに記録しておきましょう。

#### ❌ 必要書類の不備で申請が受理されない

**事例：**財務諸表の一部が欠けていた、納税証明書の種類が間違っていたなどで申請が受理されなかった。

**対策：**申請要領を詳細に確認し、チェックリストを作成して書類の準備を行いましょう。不明な点は事前に問い合わせることが重要です。

#### ❌ 希望する等級・業種で認定されない

**事例：**過去の実績や財務状況が基準に満たず、希望する等級や業種で認定されなかった。

**対策：**申請前に自社の実績と財務状況を客観的に分析し、現実的な等級・業種で申請することが大切です。段階的にランクアップを目指しましょう。

### 入札関連キーワード

入札参加資格申請 電子入札 入札保証金 競争参加資格 格付け（ランク） 経営事項審査 建設業許可 実績要件 財務諸表 納税証明書 総合評価落札方式 最低制限価格 予定価格 入札説明書 仕様書 契約保証金 履行保証保険 前払金保証 瑕疵担保責任 品質確保

