---
layout: default
title: お問い合わせ
description: 入札・公共調達に関するご質問、ご相談はこちらからお気軽にどうぞ
permalink: /contact-enhanced/
---

<div class="contact-page">
    <div class="container">
        <h1 class="page-title text-center mb-8">
            <i class="fas fa-envelope"></i>
            お問い合わせ
        </h1>
        
        <p class="text-center text-lg text-muted mb-8">
            入札・公共調達に関するご質問やご相談を承っております。<br>
            お気軽にお問い合わせください。
        </p>
        
        <!-- 問い合わせ方法の選択 -->
        <div class="contact-methods mb-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="method-card active" data-method="form">
                    <i class="fas fa-laptop"></i>
                    <h3>フォーム</h3>
                    <p>こちらのフォームから<br>お問い合わせください</p>
                </div>
                
                <div class="method-card" data-method="email">
                    <i class="fas fa-envelope"></i>
                    <h3>メール</h3>
                    <p>直接メールで<br>お問い合わせいただけます</p>
                </div>
                
                <div class="method-card" data-method="phone">
                    <i class="fas fa-phone"></i>
                    <h3>お電話</h3>
                    <p>お急ぎの場合は<br>お電話でどうぞ</p>
                </div>
            </div>
        </div>
        
        <!-- フォーム -->
        <div class="contact-content" id="form-content">
            <form class="contact-form" data-validate data-ajax-submit>
                <div class="form-row">
                    <div class="form-group">
                        <label for="name">
                            お名前 <span class="required-mark">*</span>
                        </label>
                        <input type="text" id="name" name="name" required 
                               maxlength="50" placeholder="山田 太郎">
                        <div class="form-help">
                            <i class="fas fa-info-circle"></i>
                            姓名をご入力ください
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="company">
                            会社名・団体名
                        </label>
                        <input type="text" id="company" name="company" 
                               maxlength="100" placeholder="株式会社○○">
                        <div class="form-help">
                            <i class="fas fa-info-circle"></i>
                            法人の場合はご入力ください
                        </div>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="email">
                            メールアドレス <span class="required-mark">*</span>
                        </label>
                        <div class="input-group">
                            <i class="fas fa-envelope input-icon"></i>
                            <input type="email" id="email" name="email" required 
                                   class="input-with-icon"
                                   placeholder="example@example.com">
                            <div class="input-feedback"></div>
                        </div>
                        <div class="form-help">
                            <i class="fas fa-info-circle"></i>
                            回答送信用のメールアドレスです
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="phone">
                            電話番号
                        </label>
                        <div class="input-group">
                            <i class="fas fa-phone input-icon"></i>
                            <input type="tel" id="phone" name="phone" 
                                   class="input-with-icon" data-format
                                   placeholder="090-1234-5678">
                        </div>
                        <div class="form-help">
                            <i class="fas fa-info-circle"></i>
                            お急ぎの場合の連絡先（任意）
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="category">
                        お問い合わせ種別 <span class="required-mark">*</span>
                    </label>
                    <select id="category" name="category" required>
                        <option value="">選択してください</option>
                        <option value="general">一般的な質問</option>
                        <option value="bidding">入札手続きについて</option>
                        <option value="qualification">参加資格について</option>
                        <option value="document">書類作成について</option>
                        <option value="system">電子入札システムについて</option>
                        <option value="consultation">個別相談</option>
                        <option value="other">その他</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="subject">
                        件名 <span class="required-mark">*</span>
                    </label>
                    <input type="text" id="subject" name="subject" required 
                           maxlength="100" 
                           placeholder="例：総合評価落札方式の技術提案について">
                    <div class="form-help">
                        <i class="fas fa-info-circle"></i>
                        お問い合わせ内容を簡潔にお書きください
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="message">
                        お問い合わせ内容 <span class="required-mark">*</span>
                    </label>
                    <textarea id="message" name="message" required 
                              maxlength="2000" 
                              placeholder="詳しい内容をお書きください。具体的な状況や疑問点があれば、できるだけ詳しくお聞かせください。"></textarea>
                    <div class="form-help">
                        <i class="fas fa-info-circle"></i>
                        できるだけ具体的にお書きください（2000文字以内）
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="urgency">
                        緊急度
                    </label>
                    <select id="urgency" name="urgency">
                        <option value="normal">通常（1週間以内の回答）</option>
                        <option value="urgent">急ぎ（3営業日以内の回答）</option>
                        <option value="emergency">緊急（当日回答希望）</option>
                    </select>
                    <div class="form-help">
                        <i class="fas fa-info-circle"></i>
                        緊急の場合はお電話でのお問い合わせをお勧めします
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="checkbox-label">
                        <input type="checkbox" id="privacy" name="privacy" required>
                        <span class="checkmark"></span>
                        <a href="/privacy/" target="_blank">個人情報保護方針</a>に同意する <span class="required-mark">*</span>
                    </label>
                </div>
                
                <div class="form-group">
                    <label class="checkbox-label">
                        <input type="checkbox" id="newsletter" name="newsletter">
                        <span class="checkmark"></span>
                        入札情報のメール配信を希望する
                    </label>
                </div>
                
                <div class="form-actions">
                    <button type="reset" class="btn btn-secondary">
                        <i class="fas fa-redo"></i>
                        リセット
                    </button>
                    <button type="submit" class="btn btn-primary btn-submit">
                        <i class="fas fa-paper-plane"></i>
                        送信する
                    </button>
                </div>
            </form>
        </div>
        
        <!-- メール情報 -->
        <div class="contact-content" id="email-content" style="display: none;">
            <div class="contact-info">
                <div class="info-card">
                    <i class="fas fa-envelope"></i>
                    <h3>メールアドレス</h3>
                    <p class="email">
                        <a href="mailto:info@nyusatsu-map.com">info@nyusatsu-map.com</a>
                    </p>
                    <p class="note">
                        24時間受付しております。<br>
                        通常1～2営業日以内にご回答いたします。
                    </p>
                </div>
                
                <div class="info-card">
                    <i class="fas fa-clock"></i>
                    <h3>回答時間の目安</h3>
                    <ul>
                        <li><strong>一般的なご質問：</strong> 1～2営業日</li>
                        <li><strong>専門的なご相談：</strong> 3～5営業日</li>
                        <li><strong>緊急のご質問：</strong> 当日～翌営業日</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <!-- 電話情報 -->
        <div class="contact-content" id="phone-content" style="display: none;">
            <div class="contact-info">
                <div class="info-card">
                    <i class="fas fa-phone"></i>
                    <h3>お電話でのお問い合わせ</h3>
                    <p class="phone">
                        <a href="tel:03-1234-5678">03-1234-5678</a>
                    </p>
                    <p class="hours">
                        <strong>受付時間：</strong><br>
                        平日 9:00～18:00<br>
                        （土日祝日を除く）
                    </p>
                </div>
                
                <div class="info-card">
                    <i class="fas fa-info-circle"></i>
                    <h3>お電話での相談について</h3>
                    <ul>
                        <li>簡単なご質問は電話で即答可能です</li>
                        <li>複雑な内容は後日メールでご回答します</li>
                        <li>個別相談をご希望の場合は事前予約をお勧めします</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <!-- よくある質問 -->
        <div class="faq-section mt-12">
            <h2 class="text-xl font-bold mb-6 text-center">
                よくある質問
            </h2>
            <div class="faq-grid grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="faq-quick-item">
                    <h3>
                        <i class="fas fa-question-circle"></i>
                        入札参加資格の取得方法は？
                    </h3>
                    <p>各自治体の入札参加資格申請手続きについてご説明します。</p>
                    <a href="/faq/#qualification" class="link">詳しく見る</a>
                </div>
                
                <div class="faq-quick-item">
                    <h3>
                        <i class="fas fa-question-circle"></i>
                        電子入札システムの使い方は？
                    </h3>
                    <p>電子入札システムの操作方法をステップごとに解説します。</p>
                    <a href="/faq/#system" class="link">詳しく見る</a>
                </div>
                
                <div class="faq-quick-item">
                    <h3>
                        <i class="fas fa-question-circle"></i>
                        提案書の書き方は？
                    </h3>
                    <p>技術提案書の効果的な作成方法をご案内します。</p>
                    <a href="/faq/#proposal" class="link">詳しく見る</a>
                </div>
                
                <div class="faq-quick-item">
                    <h3>
                        <i class="fas fa-question-circle"></i>
                        入札の流れを知りたい
                    </h3>
                    <p>入札の一般的な流れと注意点をまとめています。</p>
                    <a href="/faq/#process" class="link">詳しく見る</a>
                </div>
            </div>
            
            <div class="text-center mt-6">
                <a href="/faq/" class="btn btn-outline">
                    すべてのFAQを見る
                </a>
            </div>
        </div>
    </div>
</div>

<script>
// お問い合わせ方法の切り替え
document.addEventListener('DOMContentLoaded', function() {
    const methodCards = document.querySelectorAll('.method-card');
    const contentSections = document.querySelectorAll('.contact-content');
    
    methodCards.forEach(card => {
        card.addEventListener('click', function() {
            // アクティブ状態の切り替え
            methodCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // コンテンツの切り替え
            const method = this.dataset.method;
            contentSections.forEach(section => {
                section.style.display = 'none';
            });
            
            const targetContent = document.getElementById(method + '-content');
            if (targetContent) {
                targetContent.style.display = 'block';
            }
        });
    });
    
    // フォームリセットの確認
    const resetButton = document.querySelector('button[type="reset"]');
    if (resetButton) {
        resetButton.addEventListener('click', function(e) {
            if (!confirm('入力内容をすべてクリアしますか？')) {
                e.preventDefault();
            }
        });
    }
});
</script>

<style>
.contact-methods .method-card {
    padding: 1.5rem;
    border: 2px solid #e5e7eb;
    border-radius: 0.75rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
}

.contact-methods .method-card:hover {
    border-color: #3b82f6;
    background-color: #eff6ff;
}

.contact-methods .method-card.active {
    border-color: #2563eb;
    background-color: #dbeafe;
}

.contact-methods .method-card i {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #3b82f6;
}

.contact-methods .method-card h3 {
    margin: 0 0 0.5rem;
    font-size: 1.125rem;
    font-weight: 600;
}

.contact-methods .method-card p {
    margin: 0;
    color: #6b7280;
}

.contact-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.info-card {
    padding: 2rem;
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    text-align: center;
}

.info-card i {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #3b82f6;
}

.info-card h3 {
    margin: 0 0 1rem;
    font-size: 1.25rem;
    font-weight: 600;
}

.info-card .email a,
.info-card .phone a {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2563eb;
    text-decoration: none;
}

.info-card .email a:hover,
.info-card .phone a:hover {
    text-decoration: underline;
}

.faq-quick-item {
    padding: 1.5rem;
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
}

.faq-quick-item h3 {
    margin: 0 0 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.faq-quick-item h3 i {
    color: #3b82f6;
}

.faq-quick-item p {
    margin: 0 0 0.75rem;
    color: #6b7280;
    font-size: 0.875rem;
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    font-size: 0.875rem;
}

.checkbox-label input[type="checkbox"] {
    width: auto;
    margin: 0;
}
</style>