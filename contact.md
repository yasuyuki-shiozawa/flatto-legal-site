---
layout: default
title: お問い合わせ
description: 行政書士法人ふらっと法務事務所へのお問い合わせはこちらから。代表 塩澤康幸への入札に関するご相談、無料相談のお申し込みを承っております。
---

<!-- ページヘッダー -->
<section class="page-header">
    <div class="container">
        <h1 class="page-title">お問い合わせ</h1>
        <p class="page-subtitle">入札に関するご相談、お気軽にお問い合わせください</p>
    </div>
</section>

<!-- お問い合わせ方法 -->
<section class="contact-methods">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">お問い合わせ方法</h2>
            <p class="section-subtitle">
                お客様のご都合に合わせて、様々な方法でお問い合わせいただけます
            </p>
        </div>
        
        <div class="contact-grid">
            <div class="contact-card">
                <div class="contact-icon">
                    <i class="fas fa-phone"></i>
                </div>
                <h3 class="contact-title">お電話でのお問い合わせ</h3>
                <div class="contact-info">
                    <p class="phone-number">046-272-3357</p>
                    <p class="business-hours">
                        <i class="fas fa-clock"></i>
                        営業時間：電話受付 平日9時～17時
                    </p>
                </div>
                <p class="contact-description">
                    お急ぎの場合やご質問がある場合は、お電話が最も迅速です。専門スタッフが丁寧にお答えいたします。
                </p>
            </div>
            
            <div class="contact-card">
                <div class="contact-icon">
                    <i class="fas fa-envelope"></i>
                </div>
                <h3 class="contact-title">メールでのお問い合わせ</h3>
                <div class="contact-info">
                    <p class="email-address">mail@flat-legal.com</p>
                    <p class="response-time">
                        <i class="fas fa-reply"></i>
                        メール24時間受付・迅速回答
                    </p>
                </div>
                <p class="contact-description">
                    詳細な資料をお送りしたい場合や、じっくりとご検討いただきたい場合におすすめです。
                </p>
            </div>
            
            <div class="contact-card">
                <div class="contact-icon">
                    <i class="fas fa-calendar-alt"></i>
                </div>
                <h3 class="contact-title">オンライン相談</h3>
                <div class="contact-info">
                    <p class="online-meeting">Zoom・Teams対応</p>
                    <p class="availability">
                        <i class="fas fa-globe"></i>
                        全国どこからでも参加可能
                    </p>
                </div>
                <p class="contact-description">
                    遠方のお客様や、お忙しい方におすすめ。画面共有で資料を見ながら詳しくご説明いたします。
                </p>
            </div>
        </div>
    </div>
</section>

<!-- お問い合わせフォーム -->
<section class="contact-form-section">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">お問い合わせフォーム</h2>
            <p class="section-subtitle">
                下記フォームにご記入いただき、送信してください
            </p>
        </div>
        
        <div class="form-container">
            <form class="contact-form" action="#" method="POST">
                <div class="form-row">
                    <div class="form-group">
                        <label for="company">会社名 <span class="required">*</span></label>
                        <input type="text" id="company" name="company" required>
                    </div>
                    <div class="form-group">
                        <label for="name">お名前 <span class="required">*</span></label>
                        <input type="text" id="name" name="name" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="email">メールアドレス <span class="required">*</span></label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">電話番号</label>
                        <input type="tel" id="phone" name="phone">
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="business">事業内容 <span class="required">*</span></label>
                    <select id="business" name="business" required>
                        <option value="">選択してください</option>
                        <option value="it">IT・システム開発</option>
                        <option value="construction">建設・土木</option>
                        <option value="cleaning">清掃・メンテナンス</option>
                        <option value="logistics">物流・運送</option>
                        <option value="consulting">設計・コンサルティング</option>
                        <option value="other">その他</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="inquiry-type">お問い合わせ種別 <span class="required">*</span></label>
                    <div class="checkbox-group">
                        <label class="checkbox-label">
                            <input type="checkbox" name="inquiry-type" value="consultation">
                            <span class="checkmark"></span>
                            無料相談の申し込み
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" name="inquiry-type" value="service">
                            <span class="checkmark"></span>
                            サービス内容について
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" name="inquiry-type" value="pricing">
                            <span class="checkmark"></span>
                            料金について
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" name="inquiry-type" value="other">
                            <span class="checkmark"></span>
                            その他
                        </label>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="message">お問い合わせ内容 <span class="required">*</span></label>
                    <textarea id="message" name="message" rows="6" placeholder="入札に関するご質問、ご相談内容をお聞かせください" required></textarea>
                </div>
                
                <div class="form-group">
                    <label for="contact-method">ご希望の連絡方法</label>
                    <div class="radio-group">
                        <label class="radio-label">
                            <input type="radio" name="contact-method" value="email" checked>
                            <span class="radiomark"></span>
                            メール
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="contact-method" value="phone">
                            <span class="radiomark"></span>
                            電話
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="contact-method" value="online">
                            <span class="radiomark"></span>
                            オンライン相談
                        </label>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="checkbox-label privacy-policy">
                        <input type="checkbox" name="privacy" required>
                        <span class="checkmark"></span>
                        <a href="#" target="_blank">プライバシーポリシー</a>に同意します <span class="required">*</span>
                    </label>
                </div>
                
                <div class="form-submit">
                    <button type="submit" class="btn btn-primary btn-large">
                        <i class="fas fa-paper-plane"></i>
                        送信する
                    </button>
                </div>
            </form>
        </div>
    </div>
</section>

<!-- アクセス情報 -->
<section class="access-info">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">アクセス情報</h2>
        </div>
        
        <div class="access-grid">
            <div class="access-details">
                <h3 class="office-name">行政書士法人ふらっと法務事務所</h3>
                <div class="office-info">
                    <div class="info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <div>
                            <strong>住所</strong>
                            <p>〒242-0006<br>神奈川県大和市南林間6丁目4番26号 1F</p>
                        </div>
                    </div>
                    
                    <div class="info-item">
                        <i class="fas fa-phone"></i>
                        <div>
                            <strong>電話番号</strong>
                            <p>046-272-3357</p>
                        </div>
                    </div>
                    
                    <div class="info-item">
                        <i class="fas fa-envelope"></i>
                        <div>
                            <strong>メールアドレス</strong>
                            <p>mail@flat-legal.com</p>
                        </div>
                    </div>
                    
                    <div class="info-item">
                        <i class="fas fa-clock"></i>
                        <div>
                            <strong>営業時間</strong>
                            <p>電話受付 平日9時～17時<br>メール24時間受付</p>
                        </div>
                    </div>
                    
                    <div class="info-item">
                        <i class="fas fa-train"></i>
                        <div>
                            <strong>最寄り駅</strong>
                            <p>小田急線南林間駅徒歩7分</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="access-map">
                <div class="map-placeholder">
                    <i class="fas fa-map"></i>
                    <p>地図</p>
                    <small>※実際のサイトでは、Google Mapsが表示されます</small>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- よくある質問 -->
<section class="contact-faq">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">お問い合わせに関するよくある質問</h2>
        </div>
        
        <div class="faq-list">
            <div class="faq-item">
                <div class="faq-question">
                    <h3>相談は本当に無料ですか？</h3>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer">
                    <p>はい、初回相談は完全無料です。お客様の状況をお聞きし、最適なサポート方法をご提案いたします。費用が発生する場合は、事前に詳しくご説明いたします。</p>
                </div>
            </div>
            
            <div class="faq-item">
                <div class="faq-question">
                    <h3>どのくらいで回答いただけますか？</h3>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer">
                    <p>メールでのお問い合わせは24時間以内、お電話でのお問い合わせは営業時間内に即座に対応いたします。緊急の場合は、営業時間外でも対応可能です。</p>
                </div>
            </div>
            
            <div class="faq-item">
                <div class="faq-question">
                    <h3>遠方からでも相談できますか？</h3>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer">
                    <p>はい、オンライン相談を実施しておりますので、全国どこからでもご相談いただけます。ZoomやTeamsを使用し、画面共有で資料を見ながら詳しくご説明いたします。</p>
                </div>
            </div>
            
            <div class="faq-item">
                <div class="faq-question">
                    <h3>秘密は守られますか？</h3>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer">
                    <p>はい、お客様の企業情報や相談内容は厳重に管理いたします。必要に応じて秘密保持契約を締結し、安全性を確保いたします。</p>
                </div>
            </div>
        </div>
    </div>
</section>

