---
layout: default
title: 入札サポートサービス
description: 3年後の売上の種を植えよう。全省庁統一資格申請から入札参加まで完全サポート。事前診断・全額返金保証付きで安心してチャレンジできます。月額33,000円で入札参加の全工程をサポートいたします。
---

<style>
/* ヒーローセクション */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
  margin: -2rem -2rem 3rem -2rem;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  margin: 0 0 1rem 0;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin: 0 0 2rem 0;
  opacity: 0.9;
}

.hero-cta {
  display: inline-flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.cta-button {
  background: white;
  color: #667eea;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  text-decoration: none;
  color: #667eea;
}

.cta-button.secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.cta-button.secondary:hover {
  background: white;
  color: #667eea;
}

/* 特典セクション */
.benefits-section {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 3rem 0;
  margin: 3rem -2rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.benefit-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-5px);
}

.benefit-card.highlight {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.benefit-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 0 1rem 0;
}

.benefit-price {
  font-size: 2rem;
  font-weight: bold;
  color: #f39c12;
  margin: 0.5rem 0;
}

.benefit-card.highlight .benefit-price {
  color: #ffd700;
}

/* 悩みセクション */
.problems-section {
  padding: 3rem 0;
}

.problems-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.problem-card {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
  border-left: 4px solid #667eea;
}

.problem-title {
  font-weight: bold;
  color: #333;
  margin: 0 0 1rem 0;
}

/* 解決フローセクション */
.solution-section {
  background: #f8f9fa;
  padding: 3rem 0;
  margin: 3rem -2rem;
}

.solution-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.solution-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  text-align: center;
}

.step-label {
  background: #667eea;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  display: inline-block;
  margin-bottom: 1rem;
}

.solution-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0 0 1rem 0;
  color: #333;
}

/* サポートフローセクション */
.support-section {
  padding: 3rem 0;
}

.support-grid {
  display: grid;
  gap: 2rem;
  margin: 2rem 0;
}

.support-step {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  border-left: 5px solid #667eea;
}

.support-step.highlight {
  border-left-color: #f39c12;
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
}

.step-number {
  background: #667eea;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 1rem;
}

.support-step.highlight .step-number {
  background: #f39c12;
}

.step-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin: 0 0 1rem 0;
  color: #333;
}

.free-badge {
  background: #e74c3c;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
  margin-left: 1rem;
}

/* 安心サポートセクション */
.assurance-section {
  background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
  color: white;
  padding: 3rem 0;
  margin: 3rem -2rem;
}

.assurance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.assurance-card {
  background: rgba(255,255,255,0.1);
  padding: 2rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  text-align: center;
}

.assurance-label {
  background: rgba(255,255,255,0.2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  display: inline-block;
  margin-bottom: 1rem;
}

.assurance-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin: 0 0 1rem 0;
}

/* 実績セクション */
.results-section {
  background: linear-gradient(135deg, #2d3436 0%, #636e72 100%);
  color: white;
  padding: 3rem 0;
  margin: 3rem -2rem;
  text-align: center;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 2rem auto 0;
  padding: 0 2rem;
}

.result-item {
  text-align: center;
}

.result-title {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
}

.result-description {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* お客様の声セクション */
.testimonials-section {
  padding: 3rem 0;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.testimonial-card {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
  border-left: 4px solid #667eea;
}

.testimonial-text {
  font-style: italic;
  margin: 0 0 1rem 0;
  line-height: 1.6;
}

.testimonial-author {
  font-weight: bold;
  color: #667eea;
}

/* 料金セクション */
.pricing-section {
  background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%);
  color: white;
  padding: 3rem 0;
  margin: 3rem -2rem;
  text-align: center;
}

.pricing-card {
  background: rgba(255,255,255,0.1);
  padding: 3rem 2rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  max-width: 500px;
  margin: 2rem auto;
}

.pricing-title {
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0 1rem 0;
}

.pricing-price {
  font-size: 3rem;
  font-weight: bold;
  margin: 1rem 0;
}

.pricing-features {
  text-align: left;
  margin: 2rem 0;
}

.pricing-features li {
  margin: 0.5rem 0;
  padding-left: 1rem;
  position: relative;
}

.pricing-features li:before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #00b894;
  font-weight: bold;
}

/* FAQセクション */
.faq-section {
  padding: 3rem 0;
}

.faq-item {
  background: white;
  margin: 1rem 0;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: hidden;
}

.faq-question {
  background: #667eea;
  color: white;
  padding: 1.5rem;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.faq-question:hover {
  background: #5a6fd8;
}

.faq-answer {
  padding: 1.5rem;
  background: #f8f9fa;
  line-height: 1.6;
}

/* 最終CTAセクション */
.final-cta-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  margin: 3rem -2rem -2rem -2rem;
  text-align: center;
}

.final-cta-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0 0 1rem 0;
}

.final-cta-subtitle {
  font-size: 1.2rem;
  margin: 0 0 2rem 0;
  opacity: 0.9;
}

.contact-info {
  margin: 2rem 0;
  font-size: 1.1rem;
}

.phone-number {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffd700;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .hero-section {
    padding: 2rem 0;
    margin: -1rem -1rem 2rem -1rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .benefits-section,
  .solution-section,
  .assurance-section,
  .results-section,
  .pricing-section,
  .final-cta-section {
    margin-left: -1rem;
    margin-right: -1rem;
  }
  
  .benefits-grid,
  .solution-grid,
  .assurance-grid,
  .results-grid {
    padding: 0 1rem;
  }
  
  .hero-cta {
    flex-direction: column;
    align-items: center;
  }
  
  .final-cta-title {
    font-size: 2rem;
  }
}
</style>

<!-- ヒーローセクション -->
<div class="hero-section">
  <div class="container">
    <h1 class="hero-title">3年後の売上の種を植えよう。</h1>
    <p class="hero-subtitle">入札参加で安定した売上基盤を構築</p>
    <div class="hero-cta">
      <a href="/contact/" class="cta-button">無料相談を申し込む</a>
      <a href="#pricing" class="cta-button secondary">資料請求</a>
    </div>
  </div>
</div>

<!-- 特典セクション -->
<div class="benefits-section">
  <div class="container">
    <h2 style="text-align: center; margin-bottom: 2rem; color: #2d3436;">今なら特別特典</h2>
    <div class="benefits-grid">
      <div class="benefit-card highlight">
        <h3 class="benefit-title">全省庁統一資格申請が無料！</h3>
        <div class="benefit-price">通常15万円 → 0円</div>
        <p>サポート申し込みで全省庁統一資格申請を無料で代行いたします。</p>
      </div>
      <div class="benefit-card">
        <h3 class="benefit-title">事前診断で可能性を確認</h3>
        <p>可能性がない場合は受注いたしません。事前に案件の有無や資格取得の可能性をご案内します。</p>
      </div>
      <div class="benefit-card">
        <h3 class="benefit-title">全額返金保証</h3>
        <p>万一、資格取得ができなかった場合には全額返金いたします。リスクゼロでチャレンジできます。</p>
      </div>
    </div>
  </div>
</div>

<!-- お客様の悩みセクション -->
<div class="problems-section">
  <div class="container">
    <h2 style="text-align: center; margin-bottom: 2rem;">こんなお悩みはありませんか？</h2>
    <div class="problems-grid">
      <div class="problem-card">
        <h3 class="problem-title">売上・経営の悩み</h3>
        <ul>
          <li>売上が不安定で将来が不安</li>
          <li>新規開拓がうまくいかない</li>
          <li>競合他社との差別化ができない</li>
          <li>安定した収入源が欲しい</li>
        </ul>
      </div>
      <div class="problem-card">
        <h3 class="problem-title">入札手続きの悩み</h3>
        <ul>
          <li>入札の仕組みがよく分からない</li>
          <li>資格取得の手続きが複雑</li>
          <li>書類作成に時間がかかりすぎる</li>
          <li>どの案件に応募すべきか分からない</li>
        </ul>
      </div>
      <div class="problem-card">
        <h3 class="problem-title">失敗・挫折の悩み</h3>
        <ul>
          <li>過去に入札で失敗した経験がある</li>
          <li>一度挑戦したが途中で諦めた</li>
          <li>書類不備で失格になったことがある</li>
          <li>競合に負け続けている</li>
        </ul>
      </div>
      <div class="problem-card">
        <h3 class="problem-title">時間・リソースの悩み</h3>
        <ul>
          <li>本業が忙しくて手が回らない</li>
          <li>専門知識を持つスタッフがいない</li>
          <li>情報収集に時間がかかりすぎる</li>
          <li>効率的な進め方が分からない</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- 解決フローセクション -->
<div class="solution-section">
  <div class="container">
    <h2 style="text-align: center; margin-bottom: 2rem; color: #2d3436;">4つのステップで解決</h2>
    <div class="solution-grid">
      <div class="solution-card">
        <div class="step-label">STEP 1</div>
        <h3 class="solution-title">悩みの根本原因を特定</h3>
        <div style="background: #667eea; color: white; padding: 1rem; border-radius: 5px; margin: 1rem 0;">
          <strong>専門コンサルタントによる現状分析</strong>
        </div>
        <ul style="text-align: left;">
          <li>現在の事業状況の詳細ヒアリング</li>
          <li>入札参加の可能性診断</li>
          <li>最適な戦略の立案</li>
        </ul>
      </div>
      <div class="solution-card">
        <div class="step-label">STEP 2</div>
        <h3 class="solution-title">知識・スキルの不足を解消</h3>
        <div style="background: #667eea; color: white; padding: 1rem; border-radius: 5px; margin: 1rem 0;">
          <strong>完全代行＋教育サポート</strong>
        </div>
        <ul style="text-align: left;">
          <li>資格取得手続きの完全代行</li>
          <li>入札制度の分かりやすい説明</li>
          <li>必要書類の作成サポート</li>
        </ul>
      </div>
      <div class="solution-card">
        <div class="step-label">STEP 3</div>
        <h3 class="solution-title">失敗パターンを徹底排除</h3>
        <div style="background: #667eea; color: white; padding: 1rem; border-radius: 5px; margin: 1rem 0;">
          <strong>プロによる書類チェック＋戦略指導</strong>
        </div>
        <ul style="text-align: left;">
          <li>書類不備の事前チェック</li>
          <li>過去の失敗事例の分析と対策</li>
          <li>勝率を上げる戦略的アドバイス</li>
        </ul>
      </div>
      <div class="solution-card">
        <div class="step-label">STEP 4</div>
        <h3 class="solution-title">時間・リソース不足を解決</h3>
        <div style="background: #667eea; color: white; padding: 1rem; border-radius: 5px; margin: 1rem 0;">
          <strong>全工程外注化で本業に集中</strong>
        </div>
        <ul style="text-align: left;">
          <li>案件情報の自動収集・提供</li>
          <li>応札書類の作成代行</li>
          <li>入札参加の全工程サポート</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- サポートフローセクション -->
<div class="support-section">
  <div class="container">
    <h2 style="text-align: center; margin-bottom: 2rem;">入札参加完全サポートの流れ</h2>
    <div class="support-grid">
      <div class="support-step">
        <div class="step-number">1</div>
        <h3 class="step-title">初回相談・ヒアリング（無料）</h3>
        <ul>
          <li>現在の事業状況の詳細確認</li>
          <li>入札参加の目的・目標の設定</li>
          <li>最適なサポートプランのご提案</li>
        </ul>
      </div>
      <div class="support-step highlight">
        <div class="step-number">2</div>
        <h3 class="step-title">全省庁統一資格申請（無料特典）<span class="free-badge">通常15万円→サポート申し込みで無料！</span></h3>
        <ul>
          <li>申請書類の作成・提出代行</li>
          <li>必要書類の収集サポート</li>
          <li>審査状況のフォローアップ</li>
        </ul>
      </div>
      <div class="support-step">
        <div class="step-number">3</div>
        <h3 class="step-title">入札案件情報の提供</h3>
        <ul>
          <li>お客様の業種・規模に適した案件の選定</li>
          <li>スプレッドシートでの案件データ共有</li>
          <li>応札可能性の事前評価</li>
        </ul>
      </div>
      <div class="support-step">
        <div class="step-number">4</div>
        <h3 class="step-title">応札書類作成サポート</h3>
        <ul>
          <li>入札説明書の詳細分析</li>
          <li>技術提案書の作成支援</li>
          <li>価格設定のアドバイス</li>
        </ul>
      </div>
      <div class="support-step">
        <div class="step-number">5</div>
        <h3 class="step-title">入札参加・結果フォロー</h3>
        <ul>
          <li>入札書類の最終チェック</li>
          <li>入札参加の立会い（必要に応じて）</li>
          <li>結果分析と次回への改善提案</li>
        </ul>
      </div>
      <div class="support-step">
        <div class="step-number">6</div>
        <h3 class="step-title">契約・業務遂行サポート</h3>
        <ul>
          <li>契約書の内容確認</li>
          <li>業務遂行上の注意点のアドバイス</li>
          <li>次回入札に向けた実績作りのサポート</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- 安心・確実なサポート体制セクション -->
<div class="assurance-section">
  <div class="container">
    <h2 style="text-align: center; margin-bottom: 2rem;">安心・確実なサポート体制</h2>
    <div class="assurance-grid">
      <div class="assurance-card">
        <div class="assurance-label">事前診断</div>
        <h3 class="assurance-title">事前診断による確実性</h3>
        <p>可能性がない場合は受注いたしません。事前に案件の有無や資格取得の可能性をご案内し、確実性の高いサポートを提供します。</p>
      </div>
      <div class="assurance-card">
        <div class="assurance-label">返金保証</div>
        <h3 class="assurance-title">全額返金保証</h3>
        <p>万一、資格取得ができなかった場合には全額返金いたします。リスクゼロで入札参加にチャレンジしていただけます。</p>
      </div>
      <div class="assurance-card">
        <div class="assurance-label">独自システム</div>
        <h3 class="assurance-title">独自システムによる透明性の高いサポート</h3>
        <p>中央官庁案件については社内でシステムを構築済み。お客様とはスプレッドシートで案件データを共有しながらサポートを進めます。</p>
      </div>
    </div>
  </div>
</div>

<!-- 実績セクション -->
<div class="results-section">
  <div class="container">
    <h2 style="margin-bottom: 2rem;">行政書士法人による専門サポート</h2>
    <div class="results-grid">
      <div class="result-item">
        <h3 class="result-title">行政書士法人監修</h3>
        <p class="result-description">国家資格者による専門サポート</p>
      </div>
      <div class="result-item">
        <h3 class="result-title">入札手続き専門</h3>
        <p class="result-description">複雑な申請書類も完全代行</p>
      </div>
      <div class="result-item">
        <h3 class="result-title">最短7日</h3>
        <p class="result-description">資格取得期間</p>
      </div>
      <div class="result-item">
        <h3 class="result-title">月額33,000円</h3>
        <p class="result-description">全工程サポート</p>
      </div>
    </div>
  </div>
</div>

<!-- お客様の声セクション -->
<div class="testimonials-section">
  <div class="container">
    <h2 style="text-align: center; margin-bottom: 2rem;">お客様の声</h2>
    <div class="testimonials-grid">
      <div class="testimonial-card">
        <p class="testimonial-text">「入札参加により、一年を通して売り上げが安定するようになりました。以前は季節による売上の波が激しかったのですが、公共事業の受注により安定した収益基盤を構築できました。」</p>
        <p class="testimonial-author">清掃関係会社代表 A様</p>
      </div>
      <div class="testimonial-card">
        <p class="testimonial-text">「サポートのおかげで安心してスタッフを雇えるようになりました。継続的な案件受注により事業計画が立てやすくなり、従業員の雇用も安定させることができています。」</p>
        <p class="testimonial-author">Webデザイン会社代表 Y様</p>
      </div>
    </div>
  </div>
</div>

<!-- 料金・プランセクション -->
<div class="pricing-section" id="pricing">
  <div class="container">
    <h2 style="margin-bottom: 2rem;">料金・プラン</h2>
    <div class="pricing-card">
      <h3 class="pricing-title">入札参加完全サポート</h3>
      <div class="pricing-price">月額33,000円</div>
      <p style="margin-bottom: 2rem;">（税込）</p>
      <ul class="pricing-features">
        <li>全省庁統一資格申請代行（通常15万円→無料）</li>
        <li>入札案件情報の提供</li>
        <li>応札書類作成サポート</li>
        <li>入札参加の全工程サポート</li>
        <li>契約・業務遂行サポート</li>
        <li>事前診断・全額返金保証付き</li>
      </ul>
      <a href="/contact/" class="cta-button" style="margin-top: 2rem;">今すぐ申し込む</a>
    </div>
  </div>
</div>

<!-- FAQセクション -->
<div class="faq-section">
  <div class="container">
    <h2 style="text-align: center; margin-bottom: 2rem;">よくある質問</h2>
    <div class="faq-item">
      <div class="faq-question">Q. 入札参加に必要な資格取得にはどのくらい時間がかかりますか？</div>
      <div class="faq-answer">A. 全省庁統一資格の場合、書類準備から取得まで通常1-2週間程度です。お客様の状況により異なりますが、最短7日での取得実績もございます。</div>
    </div>
    <div class="faq-item">
      <div class="faq-question">Q. どのような業種でも入札参加は可能ですか？</div>
      <div class="faq-answer">A. 清掃、警備、システム開発、コンサルティングなど様々な業種で入札参加が可能です。事前診断にて、お客様の業種での案件の有無を確認いたします。</div>
    </div>
    <div class="faq-item">
      <div class="faq-question">Q. 月額料金以外に追加費用はかかりますか？</div>
      <div class="faq-answer">A. 基本的なサポート内容については月額料金に含まれております。ただし、特殊な許認可取得や大規模案件の場合は別途ご相談させていただく場合があります。</div>
    </div>
    <div class="faq-item">
      <div class="faq-question">Q. 契約期間の縛りはありますか？</div>
      <div class="faq-answer">A. 最低契約期間は6ヶ月となっております。入札参加から受注まで一定の期間が必要なため、継続的なサポートが重要と考えております。</div>
    </div>
  </div>
</div>

<!-- 最終CTAセクション -->
<div class="final-cta-section">
  <div class="container">
    <h2 class="final-cta-title">今すぐ3年後の売上の種を植えませんか？</h2>
    <p class="final-cta-subtitle">事前診断は無料です。まずはお気軽にご相談ください。</p>
    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin: 2rem 0;">
      <a href="/contact/" class="cta-button">無料相談を申し込む</a>
      <a href="#pricing" class="cta-button secondary">資料請求</a>
    </div>
    <div class="contact-info">
      <p>お電話でのご相談: <span class="phone-number">046-272-3357</span></p>
      <p>受付時間: 平日9:00-17:00</p>
    </div>
  </div>
</div>

