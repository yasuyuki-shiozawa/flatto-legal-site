---
layout: default
title: 入札 ニュースレター | 公共調達の最新情報を定期配信 - 行政書士法人ふらっと法務事務所
description: 入札・公共調達のニュースレター登録。法改正情報・実践的なノウハウ・最新動向を行政書士が定期的に配信。入札参加資格・全省庁統一資格の最新情報をお届け。神奈川県大和市から全国対応。
keywords: 入札 ニュースレター,入札情報 メール配信,公共調達 ニュースレター,入札 最新情報,法改正情報,入札動向,全省庁統一資格 情報,行政書士 ニュースレター,神奈川県,大和市
---

<div class="newsletter-page">
    <!-- ヒーローセクション -->
    <section class="hero-section">
        <div class="container">
            <div class="hero-content">
                <h1 class="hero-title">
                    <span class="icon">📧</span>
                    入札 ニュースレター登録
                </h1>
                <p class="hero-description">
                    入札・公共調達の最新情報を<br>
                    行政書士が定期的にお届けします
                </p>
            </div>
        </div>
    </section>

    <!-- 配信内容紹介 -->
    <section class="content-intro-section">
        <div class="container">
            <div class="intro-grid">
                <div class="intro-card">
                    <div class="intro-icon">📋</div>
                    <h3>制度改正情報</h3>
                    <p>入札制度や公共調達に関する法改正、新制度の導入情報をいち早くお届けします。</p>
                </div>
                
                <div class="intro-card">
                    <div class="intro-icon">💡</div>
                    <h3>実践的ノウハウ</h3>
                    <p>入札参加から契約まで、実務に役立つ具体的なノウハウや注意点を解説します。</p>
                </div>
                
                <div class="intro-card">
                    <div class="intro-icon">📊</div>
                    <h3>事例・統計情報</h3>
                    <p>最新の入札事例や統計データ、業界動向を分析してお伝えします。</p>
                </div>
                
                <div class="intro-card">
                    <div class="intro-icon">🎯</div>
                    <h3>専門家のアドバイス</h3>
                    <p>行政書士による専門的な視点からのアドバイスや解説をお届けします。</p>
                </div>
            </div>
        </div>
    </section>

    <!-- 登録フォーム -->
    <section class="newsletter-form-section">
        <div class="container">
            <div class="form-wrapper">
                <div class="form-header">
                    <h2>無料ニュースレター登録</h2>
                    <p>メールアドレスを入力するだけで簡単に登録できます。<br>
                    配信停止はいつでも可能です。</p>
                </div>

                <form name="newsletter" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" class="newsletter-form" id="newsletterForm">
                    <!-- Netlify Forms用の隠しフィールド -->
                    <input type="hidden" name="form-name" value="newsletter" />
                    
                    <!-- ハニーポット（スパム対策） -->
                    <div class="hidden">
                        <label>このフィールドは入力しないでください: <input name="bot-field" /></label>
                    </div>

                    <div class="form-grid">
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

                        <!-- お名前（任意） -->
                        <div class="form-group">
                            <label for="name" class="form-label">
                                お名前 <span class="optional-mark">（任意）</span>
                            </label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                class="form-input" 
                                maxlength="50"
                                placeholder="山田太郎"
                            />
                        </div>

                        <!-- 配信頻度の希望 -->
                        <div class="form-group full-width">
                            <label class="form-label">
                                配信頻度の希望 <span class="optional-mark">（任意）</span>
                            </label>
                            <div class="radio-group">
                                <label class="radio-label">
                                    <input type="radio" name="frequency" value="週1回程度" />
                                    <span class="radio-custom"></span>
                                    週1回程度
                                </label>
                                <label class="radio-label">
                                    <input type="radio" name="frequency" value="月2-3回程度" checked />
                                    <span class="radio-custom"></span>
                                    月2-3回程度（推奨）
                                </label>
                                <label class="radio-label">
                                    <input type="radio" name="frequency" value="月1回程度" />
                                    <span class="radio-custom"></span>
                                    月1回程度
                                </label>
                            </div>
                        </div>

                        <!-- 興味のある分野 -->
                        <div class="form-group full-width">
                            <label class="form-label">
                                特に興味のある分野 <span class="optional-mark">（複数選択可・任意）</span>
                            </label>
                            <div class="checkbox-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" name="interests" value="建設工事" />
                                    <span class="checkbox-custom"></span>
                                    建設工事
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" name="interests" value="物品調達" />
                                    <span class="checkbox-custom"></span>
                                    物品調達
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" name="interests" value="業務委託" />
                                    <span class="checkbox-custom"></span>
                                    業務委託
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" name="interests" value="IT・システム" />
                                    <span class="checkbox-custom"></span>
                                    IT・システム
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" name="interests" value="コンサルティング" />
                                    <span class="checkbox-custom"></span>
                                    コンサルティング
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" name="interests" value="その他" />
                                    <span class="checkbox-custom"></span>
                                    その他
                                </label>
                            </div>
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
                            <span class="btn-text">ニュースレターに登録する</span>
                            <span class="btn-loading hidden">登録中...</span>
                        </button>
                    </div>
                </form>

                <!-- 登録完了メッセージ -->
                <div class="success-message hidden" id="successMessage">
                    <div class="success-content">
                        <div class="success-icon">✅</div>
                        <h3>ニュースレター登録完了</h3>
                        <p>
                            ニュースレターの登録が完了しました。<br>
                            入札・公共調達の最新情報を定期的にお届けいたします。<br>
                            配信停止はメール内のリンクからいつでも可能です。
                        </p>
                        <a href="{{ '/' | relative_url }}" class="back-home-btn">トップページに戻る</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 配信停止 -->
    <section class="unsubscribe-section">
        <div class="container">
            <div class="unsubscribe-info">
                <h3>配信停止について</h3>
                <p>
                    ニュースレターの配信停止をご希望の場合は、配信メール内の「配信停止」リンクをクリックするか、
                    <a href="{{ '/booking/' | relative_url }}">お問い合わせフォーム</a>からご連絡ください。
                </p>
            </div>
        </div>
    </section>

    <!-- 過去の配信例 -->
    <section class="sample-section">
        <div class="container">
            <h2>過去の配信例</h2>
            <div class="sample-grid">
                <div class="sample-card">
                    <div class="sample-date">2025年5月</div>
                    <h4>令和7年度 入札制度改正のポイント</h4>
                    <p>デジタル化推進に伴う電子入札システムの変更点と対応方法について詳しく解説しました。</p>
                </div>
                
                <div class="sample-card">
                    <div class="sample-date">2025年4月</div>
                    <h4>建設業界の入札動向分析</h4>
                    <p>第1四半期の入札統計データと今後の市場予測、注目すべき案件情報をお届けしました。</p>
                </div>
                
                <div class="sample-card">
                    <div class="sample-date">2025年3月</div>
                    <h4>新年度に向けた入札準備チェックリスト</h4>
                    <p>年度替わりに必要な手続きや書類の更新、新制度への対応準備について解説しました。</p>
                </div>
            </div>
        </div>
    </section>
</div>

<style>
/* ===== ニュースレターページ専用スタイル ===== */

.newsletter-page {
    min-height: 100vh;
}

/* ヒーローセクション */
.hero-section {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
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
    font-size: 1.2rem;
    opacity: 0.9;
    line-height: 1.6;
}

/* 配信内容紹介セクション */
.content-intro-section {
    padding: 4rem 0;
    background: #f8f9fa;
}

.intro-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    max-width: 1000px;
    margin: 0 auto;
}

.intro-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.intro-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.intro-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.intro-card h3 {
    color: #2c3e50;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    font-weight: 600;
}

.intro-card p {
    color: #666;
    line-height: 1.6;
    font-size: 0.95rem;
}

/* フォームセクション */
.newsletter-form-section {
    padding: 4rem 0;
    background: white;
}

.form-wrapper {
    max-width: 600px;
    margin: 0 auto;
    background: #f8f9fa;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.form-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
.newsletter-form {
    padding: 2rem;
    background: white;
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

.form-input {
    padding: 0.75rem;
    border: 2px solid #e1e8ed;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
    font-family: inherit;
}

.form-input:focus {
    outline: none;
    border-color: #4facfe;
    box-shadow: 0 0 0 3px rgba(79, 172, 254, 0.1);
}

/* ラジオボタン */
.radio-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
.checkbox-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 0.5rem;
}

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

.form-input.error {
    border-color: #e74c3c;
    box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}

/* 送信ボタン */
.form-submit {
    text-align: center;
    margin-top: 2rem;
}

.submit-btn {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
    border: none;
    padding: 1rem 3rem;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    min-width: 250px;
}

.submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(79, 172, 254, 0.3);
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

/* 配信停止セクション */
.unsubscribe-section {
    padding: 2rem 0;
    background: #f8f9fa;
    text-align: center;
}

.unsubscribe-info h3 {
    color: #2c3e50;
    margin-bottom: 1rem;
}

.unsubscribe-info p {
    color: #666;
    line-height: 1.6;
}

.unsubscribe-info a {
    color: #4facfe;
    text-decoration: none;
}

.unsubscribe-info a:hover {
    text-decoration: underline;
}

/* 配信例セクション */
.sample-section {
    padding: 4rem 0;
    background: white;
}

.sample-section h2 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 3rem;
    font-size: 2rem;
}

.sample-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1000px;
    margin: 0 auto;
}

.sample-card {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    border-left: 4px solid #4facfe;
}

.sample-date {
    color: #4facfe;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.sample-card h4 {
    color: #2c3e50;
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
}

.sample-card p {
    color: #666;
    line-height: 1.6;
    font-size: 0.9rem;
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
        gap: 0.75rem;
    }
    
    .checkbox-group {
        grid-template-columns: 1fr;
        gap: 0.75rem;
    }
    
    .intro-grid {
        grid-template-columns: 1fr;
    }
    
    .sample-grid {
        grid-template-columns: 1fr;
    }
    
    .form-wrapper {
        margin: 0 1rem;
    }
    
    .newsletter-form {
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
        min-width: 200px;
    }
    
    .intro-card {
        padding: 1.5rem;
    }
}
</style>

<script>
// ニュースレター登録フォームのJavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('newsletterForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const successMessage = document.getElementById('successMessage');

    // フォームバリデーション
    function validateForm() {
        let isValid = true;
        
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

        // 興味のある分野を配列から文字列に変換
        const interests = Array.from(document.querySelectorAll('input[name="interests"]:checked'))
            .map(cb => cb.value)
            .join(', ');

        // フォームデータを準備
        const formData = new FormData(form);
        if (interests) {
            formData.set('interests', interests);
        }
        
        // Netlify Formsに送信
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
                gtag('event', 'newsletter_signup', {
                    'event_category': 'Newsletter',
                    'event_label': 'Newsletter Signup'
                });
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('登録中にエラーが発生しました。しばらく時間をおいて再度お試しください。');
            
            // ボタンを元の状態に戻す
            submitBtn.disabled = false;
            btnText.classList.remove('hidden');
            btnLoading.classList.add('hidden');
        });
    });

    // リアルタイムバリデーション
    const email = document.getElementById('email');
    email.addEventListener('blur', function() {
        if (this.value.trim()) {
            validateForm();
        }
    });
});
</script>

