---
layout: default
title: 動画で学ぶ入札・官公需
description: フラット法務事務所の入札・官公需に関する動画コンテンツをご覧いただけます。実践的なノウハウから基礎知識まで、わかりやすく解説しています。
keywords: 入札, 官公需, 動画, 解説, ノウハウ, 実践, 基礎知識
permalink: /videos/
---

<div class="videos-page">
  <div class="container">
    <!-- ページヘッダー -->
    <div class="page-header">
      <h1 class="page-title">
        <i class="fas fa-play-circle"></i>
        動画で学ぶ入札・官公需
      </h1>
      <p class="page-description">
        入札・官公需の実践的なノウハウから基礎知識まで、動画でわかりやすく解説しています。<br>
        実際の事例を交えながら、中小企業の皆様が官公需に参入するためのポイントをお伝えします。
      </p>
    </div>

    <!-- 最新動画セクション -->
    <section class="latest-video-section">
      <h2 class="section-title">最新動画</h2>
      <div class="video-container featured-video">
        <div class="video-wrapper">
          <!-- 動画URLは後で更新予定 -->
          <iframe 
            src="https://www.youtube.com/embed/PLACEHOLDER_VIDEO_ID" 
            title="最新の入札・官公需解説動画" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen
            loading="lazy">
          </iframe>
        </div>
        <div class="video-info">
          <h3 class="video-title">動画タイトル（後で更新）</h3>
          <p class="video-description">
            動画の説明文がここに入ります。内容の概要や学べるポイントなどを記載します。
          </p>
          <div class="video-meta">
            <span class="video-date">公開日: 2025年1月</span>
            <span class="video-duration">再生時間: 約10分</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 動画一覧セクション -->
    <section class="video-list-section">
      <h2 class="section-title">動画一覧</h2>
      <div class="video-grid">
        <!-- 動画カード1 -->
        <div class="video-card">
          <div class="video-thumbnail">
            <div class="video-wrapper">
              <iframe 
                src="https://www.youtube.com/embed/PLACEHOLDER_VIDEO_ID" 
                title="入札・官公需解説動画" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen
                loading="lazy">
              </iframe>
            </div>
          </div>
          <div class="video-card-content">
            <h3 class="video-card-title">動画タイトル</h3>
            <p class="video-card-description">動画の概要説明</p>
            <div class="video-card-meta">
              <span class="video-date">2025年1月</span>
              <span class="video-duration">10分</span>
            </div>
          </div>
        </div>

        <!-- 今後の動画用のプレースホルダー -->
        <div class="video-card coming-soon">
          <div class="video-thumbnail">
            <div class="coming-soon-placeholder">
              <i class="fas fa-video"></i>
              <p>新しい動画を<br>準備中です</p>
            </div>
          </div>
          <div class="video-card-content">
            <h3 class="video-card-title">次回動画をお楽しみに</h3>
            <p class="video-card-description">入札・官公需に関する新しい動画を制作中です。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA セクション -->
    <section class="video-cta-section">
      <div class="cta-content">
        <h2>動画で疑問が解決しませんでしたか？</h2>
        <p>入札・官公需に関するご質問やご相談は、お気軽にお問い合わせください。<br>
        全国どこからでもZoomでのオンライン相談が可能です。</p>
        <div class="cta-buttons">
          <a href="/contact/" class="btn btn-primary">
            <i class="fas fa-comments"></i>
            無料相談のお申し込み
          </a>
          <a href="/knowhow/" class="btn btn-secondary">
            <i class="fas fa-book"></i>
            入札の基礎知識を読む
          </a>
        </div>
      </div>
    </section>

    <!-- YouTube チャンネル紹介 -->
    <section class="youtube-channel-section">
      <div class="channel-info">
        <h2>YouTubeチャンネル</h2>
        <p>フラット法務事務所の公式YouTubeチャンネルでは、入札・官公需に関する最新情報や実践的なノウハウを定期的に配信しています。</p>
        <a href="https://youtube.com/@flatto-legal" class="btn btn-youtube" target="_blank" rel="noopener">
          <i class="fab fa-youtube"></i>
          チャンネル登録する
        </a>
      </div>
    </section>
  </div>
</div>

<!-- 動画ページ用のスタイル -->
<style>
.videos-page {
  padding: 2rem 0;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.page-title i {
  color: #e74c3c;
  margin-right: 0.5rem;
}

.page-description {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
}

.section-title {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  border-bottom: 3px solid #3498db;
  padding-bottom: 0.5rem;
}

/* 動画コンテナ */
.video-container {
  margin-bottom: 3rem;
}

.video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

/* 最新動画セクション */
.featured-video {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 3rem;
}

.video-info {
  margin-top: 1.5rem;
}

.video-title {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.video-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.video-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #888;
}

/* 動画グリッド */
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.video-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.video-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
}

.video-card-content {
  padding: 1.5rem;
}

.video-card-title {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.video-card-description {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.video-card-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #888;
}

/* Coming Soon カード */
.coming-soon .video-thumbnail {
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
}

.coming-soon-placeholder {
  text-align: center;
  color: #bdc3c7;
}

.coming-soon-placeholder i {
  font-size: 3rem;
  margin-bottom: 1rem;
}

/* CTA セクション */
.video-cta-section {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  padding: 3rem 2rem;
  border-radius: 12px;
  text-align: center;
  margin: 3rem 0;
}

.cta-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #e74c3c;
  color: white;
}

.btn-primary:hover {
  background: #c0392b;
  transform: translateY(-2px);
}

.btn-secondary {
  background: white;
  color: #3498db;
}

.btn-secondary:hover {
  background: #ecf0f1;
  transform: translateY(-2px);
}

.btn-youtube {
  background: #ff0000;
  color: white;
}

.btn-youtube:hover {
  background: #cc0000;
  transform: translateY(-2px);
}

/* YouTube チャンネルセクション */
.youtube-channel-section {
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
}

.channel-info h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.channel-info p {
  color: #666;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .featured-video {
    padding: 1rem;
  }
  
  .video-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
  }
}
</style>

