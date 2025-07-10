---
layout: default
title: お問い合わせありがとうございます | 入札マップ
description: お問い合わせを受け付けました。通常1-2営業日以内にご回答いたします。
permalink: /thanks/
sitemap: false
---

<div class="thanks-page">
    <!-- サンクスページ -->
    <section class="thanks-section">
        <div class="container">
            <div class="thanks-content">
                <div class="thanks-icon">✅</div>
                <h1 class="thanks-title">お問い合わせありがとうございます</h1>
                <p class="thanks-message">
                    お問い合わせを受け付けました。<br>
                    通常1-2営業日以内に、ご指定いただいた連絡方法でご連絡いたします。
                </p>
                
                <div class="next-steps">
                    <h2>今後の流れ</h2>
                    <div class="steps-grid">
                        <div class="step-item">
                            <div class="step-number">1</div>
                            <h3>内容確認</h3>
                            <p>いただいたお問い合わせ内容を確認いたします</p>
                        </div>
                        <div class="step-item">
                            <div class="step-number">2</div>
                            <h3>ご連絡</h3>
                            <p>1-2営業日以内にメールまたはお電話でご連絡いたします</p>
                        </div>
                        <div class="step-item">
                            <div class="step-number">3</div>
                            <h3>ご相談</h3>
                            <p>入札・公共調達に関する具体的なアドバイスをいたします</p>
                        </div>
                    </div>
                </div>
                
                <div class="urgent-contact">
                    <h3>お急ぎの場合は</h3>
                    <p>すぐにご相談されたい場合は、お電話でお気軽にお問い合わせください。</p>
                    <a href="tel:046-272-3367" class="phone-button">
                        <i class="fas fa-phone"></i>
                        046-272-3367
                    </a>
                    <p class="contact-hours">受付時間：平日 9:00-17:00</p>
                </div>
                
                <div class="back-to-site">
                    <a href="{{ '/' | relative_url }}" class="back-button">
                        <i class="fas fa-home"></i>
                        トップページに戻る
                    </a>
                </div>
            </div>
        </div>
    </section>
</div>

<style>
/* サンクスページスタイル */
.thanks-page {
    min-height: 60vh;
    display: flex;
    align-items: center;
    padding: 4rem 0;
    background: #f8f9fa;
}

.thanks-section {
    width: 100%;
}

.thanks-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    background: white;
    padding: 3rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.thanks-icon {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    animation: checkmark 0.5s ease-in-out;
}

@keyframes checkmark {
    0% {
        transform: scale(0);
        opacity: 0;
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.thanks-title {
    font-size: 2rem;
    color: #27ae60;
    margin-bottom: 1rem;
    font-weight: 700;
}

.thanks-message {
    font-size: 1.1rem;
    color: #666;
    line-height: 1.8;
    margin-bottom: 3rem;
}

/* ステップ */
.next-steps {
    margin: 3rem 0;
    padding: 2rem;
    background: #f8f9fa;
    border-radius: 8px;
}

.next-steps h2 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 2rem;
}

.steps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.step-item {
    text-align: center;
}

.step-number {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0 auto 1rem;
}

.step-item h3 {
    font-size: 1.1rem;
    color: #333;
    margin-bottom: 0.5rem;
}

.step-item p {
    color: #666;
    font-size: 0.95rem;
    line-height: 1.6;
}

/* 緊急連絡先 */
.urgent-contact {
    margin: 3rem 0;
    padding: 2rem;
    background: #fff3cd;
    border-radius: 8px;
}

.urgent-contact h3 {
    color: #856404;
    margin-bottom: 1rem;
}

.urgent-contact p {
    color: #856404;
    margin-bottom: 1.5rem;
}

.phone-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: #ffc107;
    color: #333;
    padding: 1rem 2rem;
    border-radius: 50px;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: 600;
    transition: all 0.3s ease;
}

.phone-button:hover {
    background: #e0a800;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 193, 7, 0.3);
}

.contact-hours {
    margin-top: 1rem;
    font-size: 0.9rem;
}

/* 戻るボタン */
.back-to-site {
    margin-top: 3rem;
}

.back-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
    padding: 0.75rem 2rem;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
}

.back-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(79, 172, 254, 0.3);
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
    .thanks-content {
        padding: 2rem 1.5rem;
    }
    
    .thanks-icon {
        font-size: 3rem;
    }
    
    .thanks-title {
        font-size: 1.5rem;
    }
    
    .steps-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .phone-button {
        font-size: 1rem;
        padding: 0.875rem 1.5rem;
    }
}

@media (max-width: 480px) {
    .thanks-page {
        padding: 2rem 0;
    }
    
    .thanks-content {
        margin: 0 1rem;
    }
}
</style>

<!-- Google Analytics イベント -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    // フォーム送信成功をトラッキング
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_success', {
            'event_category': 'Contact',
            'event_label': 'Contact Form Success'
        });
    }
});
</script>