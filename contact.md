---
layout: default
title: お問い合わせ | 入札マップ
description: 入札・公共調達に関するご相談はこちらから。専門の行政書士が丁寧にお答えいたします。お気軽にお問い合わせください。
keywords: お問い合わせ,入札相談,公共調達相談,行政書士相談,入札サポート
---

<div class="contact-page">
    <!-- ヒーローセクション -->
    <section class="hero-section">
        <div class="container">
            <div class="hero-content">
                <h1 class="hero-title">
                    <span class="icon">📞</span>
                    お問い合わせ
                </h1>
                <p class="hero-description">
                    入札・公共調達に関するご相談はお気軽にどうぞ。<br>
                    専門の行政書士が丁寧にお答えいたします。
                </p>
            </div>
        </div>
    </section>

    <!-- お問い合わせフォーム -->
    <section class="contact-form-section">
        <div class="container">
            <div class="form-wrapper">
                <div class="form-header">
                    <h2>ご相談フォーム</h2>
                    <p>以下のフォームにご記入の上、送信してください。<br>
                    通常1-2営業日以内にご回答いたします。</p>
                </div>

                <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" class="contact-form" id="contactForm">
                    <!-- Netlify Forms用の隠しフィールド -->
                    <input type="hidden" name="form-name" value="contact" />
                    
                    <!-- ハニーポット（スパム対策） -->
                    <div class="hidden">
                        <label>このフィールドは入力しないでください: <input name="bot-field" /></label>
                    </div>

                    <div class="form-grid">
                        <!-- お名前 -->
                        <div class="form-group required">
                            <label for="name" class="form-label">
                                お名前 <span class="required-mark">*</span>
                            </label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                class="form-input" 
                                required 
                                maxlength="50"
                                placeholder="山田太郎"
                            />
                            <div class="error-message" id="nameError"></div>
                        </div>

                        <!-- メールアドレス -->
                        <div class="form-group required">
                            <label for="email" class="form-label">
                                メールアドレス <span class="required-mark">*</span>
                            </label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                class="form-input" 
                                required 
                                maxlength="100"
                                placeholder="example@email.com"
                            />
                            <div class="error-message" id="emailError"></div>
                        </div>

                        <!-- 電話番号 -->
                        <div class="form-group">
                            <label for="phone" class="form-label">
                                電話番号 <span class="optional-mark">（任意）</span>
                            </label>
                            <input 
                                type="tel" 
                                id="phone" 
                                name="phone" 
                                class="form-input" 
                                maxlength="15"
                                placeholder="090-1234-5678"
                            />
                            <div class="error-message" id="phoneError"></div>
                        </div>

                        <!-- 会社名・団体名 -->
                        <div class="form-group">
                            <label for="company" class="form-label">
                                会社名・団体名 <span class="optional-mark">（任意）</span>
                            </label>
                            <input 
                                type="text" 
                                id="company" 
                                name="company" 
                                class="form-input" 
                                maxlength="100"
                                placeholder="株式会社○○○"
                            />
                        </div>

                        <!-- 相談カテゴリ -->
                        <div class="form-group required full-width">
                            <label for="category" class="form-label">
                                相談カテゴリ <span class="required-mark">*</span>
                            </label>
                            <select id="category" name="category" class="form-select" required>
                                <option value="">選択してください</option>
                                <option value="入札制度について">入札制度について</option>
                                <option value="入札参加資格について">入札参加資格について</option>
                                <option value="具体的な案件について">具体的な案件について</option>
                                <option value="書類作成について">書類作成について</option>
                                <option value="その他">その他</option>
                            </select>
                            <div class="error-message" id="categoryError"></div>
                        </div>

                        <!-- 希望連絡方法 -->
                        <div class="form-group required full-width">
                            <label class="form-label">
                                希望連絡方法 <span class="required-mark">*</span>
                            </label>
                            <div class="radio-group">
                                <label class="radio-label">
                                    <input type="radio" name="contact-method" value="メール" required />
                                    <span class="radio-custom"></span>
                                    メール
                                </label>
                                <label class="radio-label">
                                    <input type="radio" name="contact-method" value="電話" required />
                                    <span class="radio-custom"></span>
                                    電話
                                </label>
                                <label class="radio-label">
                                    <input type="radio" name="contact-method" value="どちらでも可" required />
                                    <span class="radio-custom"></span>
                                    どちらでも可
                                </label>
                            </div>
                            <div class="error-message" id="contactMethodError"></div>
                        </div>

                        <!-- 相談内容 -->
                        <div class="form-group required full-width">
                            <label for="message" class="form-label">
                                相談内容 <span class="required-mark">*</span>
                            </label>
                            <textarea 
                                id="message" 
                                name="message" 
                                class="form-textarea" 
                                required 
                                rows="6" 
                                maxlength="2000"
                                placeholder="ご相談内容を具体的にお書きください。&#10;&#10;例：&#10;・建設業の入札参加資格を取得したい&#10;・○○市の案件に応札を検討している&#10;・入札書類の作成方法を知りたい"
                            ></textarea>
                            <div class="char-count">
                                <span id="charCount">0</span>/2000文字
                            </div>
                            <div class="error-message" id="messageError"></div>
                        </div>

                        <!-- プライバシーポリシー同意 -->
                        <div class="form-group required full-width">
                            <label class="checkbox-label">
                                <input type="checkbox" id="privacy" name="privacy" required />
                                <span class="checkbox-custom"></span>
                                <a href="{{ '/privacy-policy/' | relative_url }}" target="_blank" class="privacy-link">プライバシーポリシー</a>に同意します <span class="required-mark">*</span>
                            </label>
                            <div class="error-message" id="privacyError"></div>
                        </div>
                    </div>

                    <!-- 送信ボタン -->
                    <div class="form-submit">
                        <button type="submit" class="submit-btn" id="submitBtn">
                            <span class="btn-text">送信する</span>
                            <span class="btn-loading hidden">送信中...</span>
                        </button>
                    </div>
                </form>

                <!-- 送信完了メッセージ -->
                <div class="success-message hidden" id="successMessage">
                    <div class="success-content">
                        <div class="success-icon">✅</div>
                        <h3>お問い合わせありがとうございます</h3>
                        <p>
                            お問い合わせを受け付けました。<br>
                            通常1-2営業日以内にご回答いたします。<br>
                            しばらくお待ちください。
                        </p>
                        <a href="{{ '/' | relative_url }}" class="back-home-btn">トップページに戻る</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 連絡先情報 -->
    <section class="contact-info-section">
        <div class="container">
            <div class="contact-info-grid">
                <div class="info-card">
                    <div class="info-icon">📧</div>
                    <h3>メールでのお問い合わせ</h3>
                    <p>上記フォームまたは直接メールでお問い合わせください</p>
                    <a href="mailto:info@flatto-legal.com" class="contact-link">info@flatto-legal.com</a>
                </div>

                <div class="info-card">
                    <div class="info-icon">📞</div>
                    <h3>お電話でのお問い合わせ</h3>
                    <p>平日 9:00-18:00</p>
                    <a href="tel:03-1234-5678" class="contact-link">03-1234-5678</a>
                </div>

                <div class="info-card">
                    <div class="info-icon">⏰</div>
                    <h3>営業時間</h3>
                    <p>
                        平日：9:00-18:00<br>
                        土日祝：休業
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- よくある質問への誘導 -->
    <section class="faq-cta-section">
        <div class="container">
            <div class="faq-cta">
                <h3>よくある質問もご確認ください</h3>
                <p>お問い合わせの前に、よくある質問で解決できる場合があります</p>
                <a href="{{ '/faq/' | relative_url }}" class="faq-btn">よくある質問を見る</a>
            </div>
        </div>
    </section>
</div>

<style>
/* ===== お問い合わせページ専用スタイル ===== */

.contact-page {
    min-height: 100vh;
}

/* ヒーローセクション */
.hero-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 4rem 0 3rem;
    text-align: center;
}

.hero-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.hero-title .icon {
    font-size: 2rem;
}

.hero-description {
    font-size: 1.1rem;
    opacity: 0.9;
    line-height: 1.6;
}

/* フォームセクション */
.contact-form-section {
    padding: 4rem 0;
    background: #f8f9fa;
}

.form-wrapper {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.form-header {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
    padding: 2rem;
    text-align: center;
}

.form-header h2 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
}

.form-header p {
    opacity: 0.9;
    line-height: 1.6;
}

/* フォームスタイル */
.contact-form {
    padding: 2rem;
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group.full-width {
    grid-column: 1 / -1;
}

.form-label {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #333;
    font-size: 0.95rem;
}

.required-mark {
    color: #e74c3c;
    font-weight: 700;
}

.optional-mark {
    color: #7f8c8d;
    font-size: 0.85rem;
}

.form-input,
.form-select,
.form-textarea {
    padding: 0.75rem;
    border: 2px solid #e1e8ed;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
    font-family: inherit;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
    outline: none;
    border-color: #4facfe;
    box-shadow: 0 0 0 3px rgba(79, 172, 254, 0.1);
}

.form-textarea {
    resize: vertical;
    min-height: 120px;
}

.char-count {
    text-align: right;
    font-size: 0.85rem;
    color: #7f8c8d;
    margin-top: 0.25rem;
}

/* ラジオボタン */
.radio-group {
    display: flex;
    gap: 1.5rem;
    margin-top: 0.5rem;
}

.radio-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.95rem;
}

.radio-label input[type="radio"] {
    display: none;
}

.radio-custom {
    width: 18px;
    height: 18px;
    border: 2px solid #ddd;
    border-radius: 50%;
    position: relative;
    transition: all 0.3s ease;
}

.radio-label input[type="radio"]:checked + .radio-custom {
    border-color: #4facfe;
    background: #4facfe;
}

.radio-label input[type="radio"]:checked + .radio-custom::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
}

/* チェックボックス */
.checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.95rem;
    line-height: 1.5;
}

.checkbox-label input[type="checkbox"] {
    display: none;
}

.checkbox-custom {
    width: 18px;
    height: 18px;
    border: 2px solid #ddd;
    border-radius: 4px;
    position: relative;
    transition: all 0.3s ease;
    flex-shrink: 0;
    margin-top: 2px;
}

.checkbox-label input[type="checkbox"]:checked + .checkbox-custom {
    border-color: #4facfe;
    background: #4facfe;
}

.checkbox-label input[type="checkbox"]:checked + .checkbox-custom::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 12px;
    font-weight: bold;
}

.privacy-link {
    color: #4facfe;
    text-decoration: underline;
}

.privacy-link:hover {
    color: #357abd;
}

/* エラーメッセージ */
.error-message {
    color: #e74c3c;
    font-size: 0.85rem;
    margin-top: 0.25rem;
    min-height: 1.2rem;
}

.form-input.error,
.form-select.error,
.form-textarea.error {
    border-color: #e74c3c;
    box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}

/* 送信ボタン */
.form-submit {
    text-align: center;
    margin-top: 2rem;
}

.submit-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 1rem 3rem;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    min-width: 200px;
}

.submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.btn-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

/* 成功メッセージ */
.success-message {
    text-align: center;
    padding: 3rem 2rem;
}

.success-content {
    max-width: 400px;
    margin: 0 auto;
}

.success-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.success-content h3 {
    color: #27ae60;
    margin-bottom: 1rem;
    font-size: 1.5rem;
}

.success-content p {
    color: #666;
    line-height: 1.6;
    margin-bottom: 2rem;
}

.back-home-btn {
    display: inline-block;
    background: #4facfe;
    color: white;
    padding: 0.75rem 2rem;
    border-radius: 25px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
}

.back-home-btn:hover {
    background: #357abd;
    transform: translateY(-2px);
}

/* 連絡先情報セクション */
.contact-info-section {
    padding: 4rem 0;
    background: white;
}

.contact-info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    max-width: 900px;
    margin: 0 auto;
}

.info-card {
    text-align: center;
    padding: 2rem;
    border-radius: 12px;
    background: #f8f9fa;
    transition: all 0.3s ease;
}

.info-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.info-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.info-card h3 {
    color: #333;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
}

.info-card p {
    color: #666;
    margin-bottom: 1rem;
    line-height: 1.6;
}

.contact-link {
    color: #4facfe;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
}

.contact-link:hover {
    color: #357abd;
    text-decoration: underline;
}

/* FAQ誘導セクション */
.faq-cta-section {
    padding: 3rem 0;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
}

.faq-cta {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
}

.faq-cta h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.faq-cta p {
    opacity: 0.9;
    margin-bottom: 2rem;
    line-height: 1.6;
}

.faq-btn {
    display: inline-block;
    background: white;
    color: #f5576c;
    padding: 0.75rem 2rem;
    border-radius: 25px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
}

.faq-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
}

/* ユーティリティクラス */
.hidden {
    display: none !important;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
    .hero-title {
        font-size: 2rem;
    }
    
    .form-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .form-group.full-width {
        grid-column: 1;
    }
    
    .radio-group {
        flex-direction: column;
        gap: 1rem;
    }
    
    .contact-info-grid {
        grid-template-columns: 1fr;
    }
    
    .form-wrapper {
        margin: 0 1rem;
    }
    
    .contact-form {
        padding: 1.5rem;
    }
    
    .form-header {
        padding: 1.5rem;
    }
}

@media (max-width: 480px) {
    .hero-section {
        padding: 2rem 0;
    }
    
    .hero-title {
        font-size: 1.8rem;
    }
    
    .submit-btn {
        padding: 0.875rem 2rem;
        font-size: 1rem;
        min-width: 180px;
    }
}
</style>

<script>
// お問い合わせフォームのJavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const successMessage = document.getElementById('successMessage');
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');

    // 文字数カウント
    messageTextarea.addEventListener('input', function() {
        const count = this.value.length;
        charCount.textContent = count;
        
        if (count > 2000) {
            charCount.style.color = '#e74c3c';
        } else if (count > 1800) {
            charCount.style.color = '#f39c12';
        } else {
            charCount.style.color = '#7f8c8d';
        }
    });

    // フォームバリデーション
    function validateForm() {
        let isValid = true;
        
        // 名前のバリデーション
        const name = document.getElementById('name');
        const nameError = document.getElementById('nameError');
        if (!name.value.trim()) {
            showError(name, nameError, 'お名前を入力してください');
            isValid = false;
        } else if (name.value.trim().length < 2) {
            showError(name, nameError, 'お名前は2文字以上で入力してください');
            isValid = false;
        } else {
            clearError(name, nameError);
        }

        // メールアドレスのバリデーション
        const email = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError(email, emailError, 'メールアドレスを入力してください');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError(email, emailError, '正しいメールアドレスを入力してください');
            isValid = false;
        } else {
            clearError(email, emailError);
        }

        // 電話番号のバリデーション（任意項目）
        const phone = document.getElementById('phone');
        const phoneError = document.getElementById('phoneError');
        if (phone.value.trim()) {
            const phoneRegex = /^[\d\-\(\)\+\s]+$/;
            if (!phoneRegex.test(phone.value)) {
                showError(phone, phoneError, '正しい電話番号を入力してください');
                isValid = false;
            } else {
                clearError(phone, phoneError);
            }
        } else {
            clearError(phone, phoneError);
        }

        // 相談カテゴリのバリデーション
        const category = document.getElementById('category');
        const categoryError = document.getElementById('categoryError');
        if (!category.value) {
            showError(category, categoryError, '相談カテゴリを選択してください');
            isValid = false;
        } else {
            clearError(category, categoryError);
        }

        // 希望連絡方法のバリデーション
        const contactMethod = document.querySelector('input[name="contact-method"]:checked');
        const contactMethodError = document.getElementById('contactMethodError');
        if (!contactMethod) {
            contactMethodError.textContent = '希望連絡方法を選択してください';
            isValid = false;
        } else {
            contactMethodError.textContent = '';
        }

        // 相談内容のバリデーション
        const message = document.getElementById('message');
        const messageError = document.getElementById('messageError');
        if (!message.value.trim()) {
            showError(message, messageError, '相談内容を入力してください');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError(message, messageError, '相談内容は10文字以上で入力してください');
            isValid = false;
        } else if (message.value.length > 2000) {
            showError(message, messageError, '相談内容は2000文字以内で入力してください');
            isValid = false;
        } else {
            clearError(message, messageError);
        }

        // プライバシーポリシー同意のバリデーション
        const privacy = document.getElementById('privacy');
        const privacyError = document.getElementById('privacyError');
        if (!privacy.checked) {
            privacyError.textContent = 'プライバシーポリシーに同意してください';
            isValid = false;
        } else {
            privacyError.textContent = '';
        }

        return isValid;
    }

    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
    }

    function clearError(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
    }

    // フォーム送信処理
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        // 送信中の状態に変更
        submitBtn.disabled = true;
        btnText.classList.add('hidden');
        btnLoading.classList.remove('hidden');

        // Netlify Formsに送信
        const formData = new FormData(form);
        
        fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        })
        .then(() => {
            // 成功時の処理
            form.style.display = 'none';
            successMessage.classList.remove('hidden');
            
            // Google Analytics イベント送信（もしあれば）
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'event_category': 'Contact',
                    'event_label': 'Contact Form'
                });
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('送信中にエラーが発生しました。しばらく時間をおいて再度お試しください。');
            
            // ボタンを元の状態に戻す
            submitBtn.disabled = false;
            btnText.classList.remove('hidden');
            btnLoading.classList.add('hidden');
        });
    });

    // リアルタイムバリデーション
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') || this.value.trim()) {
                validateForm();
            }
        });
    });
});
</script>

