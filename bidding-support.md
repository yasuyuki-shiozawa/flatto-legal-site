---
layout: default
title: 入札サポートサービス
description: 3年後の売上の種を植えよう。全省庁統一資格申請から入札参加まで完全サポート。事前診断・全額返金保証付きで安心してチャレンジできます。月額33,000円で入札参加の全工程をサポートいたします。
---

<style>
/* 入札サポートサービス専用CSS */

/* ヒーローセクション */
.bidding-hero {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  margin: -2rem -2rem 3rem -2rem;
  position: relative;
  overflow: hidden;
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

.hero-cta {
  display: inline-flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  z-index: 1;
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

/* 特典セクション */
.benefits-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 2rem;
  margin: 3rem -2rem;
  text-align: center;
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

/* 悩みセクション */
.problems-section {
  padding: 4rem 2rem;
  background: #f8f9fa;
  margin: 3rem -2rem;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #333;
}

.problems-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.problem-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.problem-card:hover {
  transform: translateY(-5px);
}

.problem-category {
  color: #666;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
}

.problem-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
}

.problem-list {
  list-style: none;
  padding: 0;
}

.problem-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  color: #666;
}

.problem-list li:last-child {
  border-bottom: none;
}

/* 解決フローセクション */
.solution-section {
  padding: 4rem 2rem;
  background: white;
}

.solution-flow {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.solution-step {
  text-align: center;
  padding: 2rem;
  border-radius: 15px;
  background: #f8f9fa;
  position: relative;
}

.step-number {
  background: #2196F3;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 auto 1rem auto;
}

.step-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
}

.step-description {
  color: #666;
  line-height: 1.6;
}

/* サポートフローセクション */
.support-flow-section {
  padding: 4rem 2rem;
  background: #f8f9fa;
  margin: 3rem -2rem;
}

.support-steps {
  max-width: 800px;
  margin: 0 auto;
}

.support-step {
  background: white;
  padding: 2rem;
  margin-bottom: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  position: relative;
}

.support-step-number {
  background: #2196F3;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  position: absolute;
  top: -25px;
  left: 2rem;
}

.support-step-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 1rem 0 1rem 4rem;
  color: #333;
}

.support-step-content {
  margin-left: 4rem;
  color: #666;
  line-height: 1.6;
}

.special-offer {
  background: #FF9800;
  color: white;
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
  font-weight: 600;
}

/* 安心サポートセクション */
.assurance-section {
  padding: 4rem 2rem;
  background: white;
}

.assurance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.assurance-card {
  text-align: center;
  padding: 2rem;
  border-radius: 15px;
  background: #f8f9fa;
  border: 3px solid #e0e0e0;
  transition: all 0.3s ease;
}

.assurance-card:hover {
  border-color: #2196F3;
  transform: translateY(-5px);
}

.assurance-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.assurance-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
}

.assurance-description {
  color: #666;
  line-height: 1.6;
}

/* 料金セクション */
.pricing-section {
  padding: 4rem 2rem;
  background: #f8f9fa;
  margin: 3rem -2rem;
  text-align: center;
}

.pricing-card {
  background: white;
  padding: 3rem 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
  border: 3px solid #4CAF50;
}

.pricing-badge {
  background: #4CAF50;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 2rem;
}

.pricing-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
}

.pricing-amount {
  font-size: 3rem;
  font-weight: 700;
  color: #4CAF50;
  margin-bottom: 0.5rem;
}

.pricing-period {
  color: #666;
  margin-bottom: 2rem;
}

.pricing-features {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.pricing-features li {
  padding: 0.8rem 0;
  border-bottom: 1px solid #eee;
  color: #333;
}

.pricing-features li:last-child {
  border-bottom: none;
}

/* CTAセクション */
.cta-section {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  text-align: center;
  margin: 3rem -2rem -2rem -2rem;
}

.cta-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.cta-subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-cta {
  padding: 1.2rem 2.5rem;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-cta-primary {
  background: #4CAF50;
  color: white;
}

.btn-cta-primary:hover {
  background: #45a049;
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(76, 175, 80, 0.3);
}

.btn-cta-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn-cta-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-3px);
}

/* 会社情報セクション */
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
  .problems-grid,
  .solution-flow,
  .assurance-grid {
    grid-template-columns: 1fr;
  }
  
  .hero-cta,
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .support-step-title,
  .support-step-content {
    margin-left: 0;
    margin-top: 2rem;
  }
  
  .support-step-number {
    position: relative;
    top: 0;
    left: 0;
    margin: 0 auto 1rem auto;
  }
}
</style>

<!-- ヒーローセクション -->
<section class="bidding-hero">
  <h1 class="hero-title">3年後の売上の種を植えよう。</h1>
  <p class="hero-subtitle">入札参加で安定した売上基盤を構築</p>
  <div class="hero-cta">
    <a href="#contact" class="btn-hero btn-primary">無料相談を申し込む</a>
    <a href="#details" class="btn-hero btn-secondary">資料請求</a>
  </div>
</section>

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

<!-- お客様の悩みセクション -->
<section class="problems-section">
  <h2 class="section-title">こんなお悩みありませんか？</h2>
  <div class="problems-grid">
    <div class="problem-card">
      <div class="problem-category">売上・経営の悩み</div>
      <h3 class="problem-title">事業の将来に不安を感じている</h3>
      <ul class="problem-list">
        <li>既存事業だけでは成長に限界を感じる</li>
        <li>新しい収益源を確保したい</li>
        <li>安定した売上基盤を築きたい</li>
        <li>競合他社との差別化が難しい</li>
      </ul>
    </div>
    <div class="problem-card">
      <div class="problem-category">入札手続きの悩み</div>
      <h3 class="problem-title">入札参加の方法がわからない</h3>
      <ul class="problem-list">
        <li>全省庁統一資格って何？</li>
        <li>申請書類の書き方がわからない</li>
        <li>どんな案件に参加できるの？</li>
        <li>手続きが複雑で挫折しそう</li>
      </ul>
    </div>
    <div class="problem-card">
      <div class="problem-category">失敗・挫折の悩み</div>
      <h3 class="problem-title">過去に失敗した経験がある</h3>
      <ul class="problem-list">
        <li>書類不備で失格になった</li>
        <li>入札価格の設定を間違えた</li>
        <li>案件選びで失敗した</li>
        <li>もう一度チャレンジしたい</li>
      </ul>
    </div>
    <div class="problem-card">
      <div class="problem-category">時間・リソースの悩み</div>
      <h3 class="problem-title">本業が忙しくて手が回らない</h3>
      <ul class="problem-list">
        <li>申請手続きに時間を割けない</li>
        <li>案件情報を調べる余裕がない</li>
        <li>専門知識を学ぶ時間がない</li>
        <li>効率的に進めたい</li>
      </ul>
    </div>
  </div>
</section>

<!-- 解決フローセクション -->
<section class="solution-section">
  <h2 class="section-title">私たちがすべて解決します</h2>
  <div class="solution-flow">
    <div class="solution-step">
      <div class="step-number">1</div>
      <h3 class="step-title">悩みの根本原因を特定</h3>
      <p class="step-description">専門コンサルタントがお客様の現状を詳しく分析し、入札参加における課題を明確化します。</p>
    </div>
    <div class="solution-step">
      <div class="step-number">2</div>
      <h3 class="step-title">知識・スキルの不足を解消</h3>
      <p class="step-description">複雑な申請手続きは完全代行。同時に入札の基礎知識もしっかりとお教えします。</p>
    </div>
    <div class="solution-step">
      <div class="step-number">3</div>
      <h3 class="step-title">失敗パターンを徹底排除</h3>
      <p class="step-description">過去の失敗事例を分析し、書類チェックから入札戦略まで、プロの視点でサポートします。</p>
    </div>
    <div class="solution-step">
      <div class="step-number">4</div>
      <h3 class="step-title">時間・リソース不足を解決</h3>
      <p class="step-description">面倒な手続きはすべて外注化。お客様は本業に集中しながら入札参加が可能です。</p>
    </div>
  </div>
</section>

<!-- サポート内容フローセクション -->
<section class="support-flow-section">
  <h2 class="section-title">サポート内容の流れ</h2>
  <div class="support-steps">
    <div class="support-step">
      <div class="support-step-number">1</div>
      <h3 class="support-step-title">初回相談・ヒアリング（無料）</h3>
      <div class="support-step-content">
        <p>お客様の事業内容、入札参加の目的、現在の状況を詳しくお聞きします。入札参加の可能性を事前に診断し、最適なプランをご提案いたします。</p>
      </div>
    </div>
    
    <div class="support-step">
      <div class="support-step-number">2</div>
      <h3 class="support-step-title">全省庁統一資格申請（無料特典）</h3>
      <div class="support-step-content">
        <p>入札参加に必要な全省庁統一資格の申請を完全代行いたします。</p>
        <div class="special-offer">
          通常15万円 → サポート申し込みで無料！
        </div>
      </div>
    </div>
    
    <div class="support-step">
      <div class="support-step-number">3</div>
      <h3 class="support-step-title">入札案件情報の提供</h3>
      <div class="support-step-content">
        <p>お客様の事業に適した入札案件を独自システムで検索・抽出。スプレッドシートで案件データを共有し、参加可能な案件をご提案します。</p>
      </div>
    </div>
    
    <div class="support-step">
      <div class="support-step-number">4</div>
      <h3 class="support-step-title">入札書類作成サポート</h3>
      <div class="support-step-content">
        <p>技術提案書、見積書、その他必要書類の作成をサポート。プロの視点で書類をチェックし、失格リスクを最小限に抑えます。</p>
      </div>
    </div>
    
    <div class="support-step">
      <div class="support-step-number">5</div>
      <h3 class="support-step-title">入札戦略の立案</h3>
      <div class="support-step-content">
        <p>過去の落札データを分析し、最適な入札価格と戦略をアドバイス。勝率を高めるための具体的な提案を行います。</p>
      </div>
    </div>
    
    <div class="support-step">
      <div class="support-step-number">6</div>
      <h3 class="support-step-title">継続的なフォローアップ</h3>
      <div class="support-step-content">
        <p>入札結果の分析、次回案件への改善提案、契約手続きのサポートまで、継続的にフォローいたします。</p>
      </div>
    </div>
  </div>
</section>

<!-- 安心・確実なサポート体制セクション -->
<section class="assurance-section">
  <h2 class="section-title">安心・確実なサポート体制</h2>
  <div class="assurance-grid">
    <div class="assurance-card">
      <div class="assurance-icon">🔍</div>
      <h3 class="assurance-title">事前診断による確実性</h3>
      <p class="assurance-description">可能性がない場合は受注いたしません。事前に案件の有無や資格取得の可能性をしっかりとご案内し、確実性の高いサポートを提供します。</p>
    </div>
    <div class="assurance-card">
      <div class="assurance-icon">💯</div>
      <h3 class="assurance-title">全額返金保証</h3>
      <p class="assurance-description">万一、資格取得ができなかった場合には全額返金いたします。リスクゼロで入札の世界にチャレンジしていただけます。</p>
    </div>
    <div class="assurance-card">
      <div class="assurance-icon">📊</div>
      <h3 class="assurance-title">独自システムによる透明性</h3>
      <p class="assurance-description">中央官庁案件の社内システムを構築済み。スプレッドシートで案件データを共有し、透明性の高いサポートを実現しています。</p>
    </div>
  </div>
</section>

<!-- 料金・プランセクション -->
<section class="pricing-section">
  <h2 class="section-title">料金・プラン</h2>
  <div class="pricing-card">
    <div class="pricing-badge">おすすめプラン</div>
    <h3 class="pricing-title">入札参加完全サポート</h3>
    <div class="pricing-amount">33,000円</div>
    <div class="pricing-period">月額（税込）</div>
    <ul class="pricing-features">
      <li>✅ 全省庁統一資格申請（通常15万円→無料）</li>
      <li>✅ 入札案件情報の提供</li>
      <li>✅ 入札書類作成サポート</li>
      <li>✅ 入札戦略の立案</li>
      <li>✅ 継続的なフォローアップ</li>
      <li>✅ 事前診断・相談（無料）</li>
      <li>✅ 全額返金保証</li>
    </ul>
  </div>
</section>

<!-- 最終CTAセクション -->
<section class="cta-section">
  <h2 class="cta-title">3年後の売上の種を植えませんか？</h2>
  <p class="cta-subtitle">入札参加で安定した売上基盤を構築し、事業を大きく成長させましょう</p>
  <div class="cta-buttons">
    <a href="tel:046-272-3357" class="btn-cta btn-cta-primary">今すぐ無料相談（046-272-3357）</a>
    <a href="/contact/" class="btn-cta btn-cta-secondary">メールで問い合わせ</a>
  </div>
</section>

<!-- 会社情報 -->
<div class="company-info">
  <h3>運営会社</h3>
  <p><strong>行政書士法人ふらっと法務事務所</strong></p>
  <p>📍 神奈川県厚木市中町4-14-3 雅光園ビル7階A号室</p>
  <p>📞 046-272-3357</p>
  <p>🕒 平日9:00-17:00</p>
  <p>✉️ <a href="/contact/">お問い合わせフォーム</a></p>
</div>

