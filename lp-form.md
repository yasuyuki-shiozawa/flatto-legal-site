---
layout: default-simple
title: "無料相談お申込み - 行政書士事務所"
description: "入札参加資格取得後のサポートに関する無料相談を承っております。月額33,000円で事前調査から業務完了まで全工程をサポートいたします。"
permalink: /lp-form/
---

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f8f9fa;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
    }

    /* ヒーローセクション */
    .hero {
        background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
        color: white;
        padding: 80px 0;
        text-align: center;
    }

    .hero h1 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 20px;
        line-height: 1.2;
    }

    .hero .subtitle {
        font-size: 1.2rem;
        margin-bottom: 30px;
        opacity: 0.9;
    }

    .hero .features {
        font-size: 1.1rem;
        margin-bottom: 40px;
    }

    .cta-button {
        display: inline-block;
        background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
        color: white;
        padding: 15px 40px;
        border-radius: 50px;
        text-decoration: none;
        font-weight: 600;
        font-size: 1.1rem;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
        border: none;
        cursor: pointer;
    }

    .cta-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
    }

    /* 問題提起セクション */
    .problems {
        padding: 80px 0;
        background: white;
    }

    .section-title {
        text-align: center;
        font-size: 2.2rem;
        font-weight: 700;
        margin-bottom: 60px;
        color: #2c3e50;
    }

    .problem-item {
        margin-bottom: 60px;
        border-left: 4px solid #ff6b35;
        padding-left: 30px;
    }

    .problem-item h3 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 15px;
        color: #2c3e50;
    }

    .problem-item .problem-text {
        font-size: 1rem;
        color: #666;
        margin-bottom: 20px;
        line-height: 1.8;
    }

    .problem-item .problem-quote {
        font-style: italic;
        color: #888;
        margin-bottom: 20px;
    }

    .solution-box {
        background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
        border-radius: 15px;
        padding: 25px;
        margin-top: 20px;
    }

    .solution-title {
        font-size: 1.2rem;
        font-weight: 600;
        color: #1976d2;
        margin-bottom: 15px;
        text-align: center;
    }

    .solution-text {
        color: #424242;
        line-height: 1.8;
    }

    /* フォームセクション */
    .form-section {
        background: white;
        padding: 80px 0;
    }

    .form-container {
        max-width: 600px;
        margin: 0 auto;
        background: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .form-title {
        text-align: center;
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 30px;
        color: #2c3e50;
    }

    .form-subtitle {
        text-align: center;
        font-size: 1.1rem;
        margin-bottom: 40px;
        color: #666;
    }

    .form-group {
        margin-bottom: 25px;
    }

    .form-label {
        display: block;
        font-weight: 600;
        margin-bottom: 8px;
        color: #2c3e50;
    }

    .required {
        color: #e74c3c;
        margin-left: 4px;
    }

    .form-input,
    .form-select,
    .form-textarea {
        width: 100%;
        padding: 12px 16px;
        border: 2px solid #e1e8ed;
        border-radius: 10px;
        font-size: 1rem;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
        font-family: inherit;
    }

    .form-input:focus,
    .form-select:focus,
    .form-textarea:focus {
        outline: none;
        border-color: #4a90e2;
        box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
    }

    .form-textarea {
        resize: vertical;
        min-height: 120px;
    }

    .char-count {
        text-align: right;
        font-size: 0.9rem;
        color: #666;
        margin-top: 5px;
    }

    .submit-button {
        width: 100%;
        background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
        color: white;
        padding: 15px;
        border: none;
        border-radius: 50px;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
    }

    .submit-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
    }

    .submit-button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }

    .form-note {
        text-align: center;
        font-size: 0.9rem;
        color: #666;
        margin-top: 20px;
    }

    .contact-info {
        text-align: center;
        margin-top: 40px;
        padding-top: 30px;
        border-top: 1px solid #e1e8ed;
    }

    .contact-info h3 {
        font-size: 1.3rem;
        margin-bottom: 15px;
        color: #2c3e50;
    }

    .phone-number {
        font-size: 1.5rem;
        font-weight: 700;
        color: #4a90e2;
        text-decoration: none;
        margin-bottom: 10px;
        display: inline-block;
    }

    .phone-number:hover {
        color: #357abd;
    }

    .business-hours {
        font-size: 0.9rem;
        color: #666;
    }

    /* レスポンシブ対応 */
    @media (max-width: 768px) {
        .hero h1 {
            font-size: 2rem;
        }
        
        .hero .subtitle {
            font-size: 1rem;
        }
        
        .section-title {
            font-size: 1.8rem;
        }
        
        .problem-item {
            padding-left: 20px;
        }
        
        .container {
            padding: 0 15px;
        }

        .form-container {
            padding: 30px 20px;
            margin: 0 15px;
        }

        .form-title {
            font-size: 1.6rem;
        }
    }

    /* 送信完了メッセージ */
    .success-message {
        display: none;
        background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
        color: white;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        margin-bottom: 20px;
    }

    .success-message.show {
        display: block;
    }
</style>

<!-- ヒーローセクション -->
<section class="hero">
    <div class="container">
        <h1>「入札参加資格は取れたけど...<br>その後どうすればいいの？」</h1>
        <p class="subtitle">他の事務所では対応できない<br>入札のすべての工程をサポートします</p>
        <div class="features">
            月額33,000円で事前調査から業務完了まで<br>
            全省庁統一資格申請は無料
        </div>
        <a href="#contact" class="cta-button">無料相談のお申し込み</a>
    </div>
</section>

<!-- 問題提起セクション -->
<section class="problems">
    <div class="container">
        <h2 class="section-title">入札に興味があるけれど、こんなお悩みありませんか？</h2>

        <div class="problem-item">
            <h3>資格の取り方がわからない</h3>
            <div class="problem-quote">
                「入札参加資格って何種類もあるみたいだけど...」<br>
                「全省庁統一資格？地方自治体の資格？」<br>
                「どれを取ればいいのか、さっぱりわからない...」
            </div>
            <p class="problem-text">そんなときは当事務所へ</p>
            <div class="solution-box">
                <div class="solution-title">最初は一緒に、徐々に覚えていただきます</div>
                <div class="solution-text">
                    どの資格が必要なのか、お客様と一緒に確認いたします。<br>
                    面倒な算出作業も、最初は丁寧にお手伝いしながら、<br>
                    次回はお客様ご自身でできるよう、しっかりと指導いたします。<br>
                    全省庁統一資格については、無料で申請代行いたします。
                </div>
            </div>
        </div>

        <div class="problem-item">
            <h3>書類準備が面倒くさい</h3>
            <div class="problem-quote">
                「必要書類が多すぎて何から手をつければ...」<br>
                「登記事項証明書？納税証明書？」<br>
                「書類を集めるだけで疲れてしまう」
            </div>
            <p class="problem-text">そんなお悩みありませんか？</p>
            <div class="solution-box">
                <div class="solution-title">書類準備も完全サポート</div>
                <div class="solution-text">
                    必要書類リストの提供から、取得方法の詳細説明まで、<br>
                    書類作成のサポートや不備チェックまで対応いたします。<br>
                    最初は一緒に作業しながら、徐々に覚えていただけるよう<br>
                    丁寧に指導いたします。
                </div>
            </div>
        </div>

        <div class="problem-item">
            <h3>どうやって入札すればいいかわからない</h3>
            <div class="problem-quote">
                「入札の手続きって、どうやってやるの？」<br>
                「電子入札システムって何？」<br>
                「入札書類の書き方がわからない...」
            </div>
            <p class="problem-text">そんなときは当事務所にお任せください</p>
            <div class="solution-box">
                <div class="solution-title">入札手続きを一から丁寧にお教えします</div>
                <div class="solution-text">
                    電子入札システムの使い方から、入札書類の書き方まで、<br>
                    一つひとつ丁寧に説明いたします。<br>
                    最初は一緒に作業しながら、徐々にお客様ご自身でできるよう<br>
                    しっかりとサポートいたします。<br>
                    どうしても難しい場合は、代理で入札手続きも承ります。
                </div>
            </div>
        </div>

        <div class="problem-item">
            <h3>入札案件情報をどうやって手に入れるかわからない</h3>
            <div class="problem-quote">
                「入札の案件って、どこで探せばいいの？」<br>
                「官報？自治体のホームページ？」<br>
                「毎日チェックするなんて、とても無理...」
            </div>
            <p class="problem-text">そんなお悩みありませんか？</p>
            <div class="solution-box">
                <div class="solution-title">入札案件の探し方をレクチャします</div>
                <div class="solution-text">
                    お客様自身で案件チェックができるようになります。<br>
                    効率的な案件情報の収集方法をお教えしますので、<br>
                    無駄な時間をかけることなく、適切な案件を見つけられます。<br>
                    もちろん、最初のうちは一緒に案件探しをいたします。
                </div>
            </div>
        </div>

        <div class="problem-item">
            <h3>本当に利益が出るかわからない</h3>
            <div class="problem-quote">
                「入札に参加しても、本当に儲かるの？」<br>
                「費用ばかりかかって、赤字になったりしない？」<br>
                「リスクが高すぎるんじゃないかと心配...」
            </div>
            <p class="problem-text">そんな不安をお持ちではありませんか？</p>
            <div class="solution-box">
                <div class="solution-title">事前に収益性を詳しく分析します</div>
                <div class="solution-text">
                    お客様の業種や規模に応じて、参入可能性を詳しく調査いたします。<br>
                    競合状況や市場動向も分析して、<br>
                    「本当に利益が出るのか」を事前に診断いたします。<br>
                    無理な参入はお勧めしません。正直にお伝えいたします。
                </div>
            </div>
        </div>

        <div class="problem-item">
            <h3>どこから手をつけていいかわからない</h3>
            <div class="problem-quote">
                「入札に興味はあるけれど...」<br>
                「何から始めればいいの？」<br>
                「全体の流れが全然見えない...」
            </div>
            <p class="problem-text">そんなときは当事務所へご相談ください</p>
            <div class="solution-box">
                <div class="solution-title">最初の一歩から丁寧にサポートします</div>
                <div class="solution-text">
                    お客様の業種や規模をお聞きして、最適なスタート方法をご提案いたします。<br>
                    「まず何をすべきか」から「最終的にどうなるか」まで、<br>
                    全体の流れを分かりやすくご説明いたします。<br>
                    一つひとつ順番に進めていきますので、安心してお任せください。
                </div>
            </div>
        </div>

        <div class="problem-item">
            <h3>自社に合った業務があるかわからない</h3>
            <div class="problem-quote">
                「うちの会社でもできる案件、本当にあるの？」<br>
                「業種や規模で制限があるんじゃない？」<br>
                「競合が多すぎて、とても勝てないのでは...」
            </div>
            <p class="problem-text">そんな心配をされていませんか？</p>
            <div class="solution-box">
                <div class="solution-title">事前調査で参入可能性を無料診断します</div>
                <div class="solution-text">
                    お客様の会社に合った案件が実際にあるかどうか、<br>
                    契約前に無料で調査いたします。<br>
                    競合状況や勝算についても詳しく分析して、<br>
                    「参入する価値があるか」を正直にお伝えします。
                </div>
            </div>
        </div>

        <div class="problem-item">
            <h3>どんな仕事があるかわからない</h3>
            <div class="problem-quote">
                「入札って建設工事だけじゃないの？」<br>
                「IT関係の案件もあるって聞いたけど本当？」<br>
                「具体的にどんな仕事があるのか知りたい...」
            </div>
            <p class="problem-text">そんな疑問をお持ちではありませんか？</p>
            <div class="solution-box">
                <div class="solution-title">幅広い分野の案件をご紹介できます</div>
                <div class="solution-text">
                    建設工事以外にも、IT関連、清掃業務、警備、翻訳、<br>
                    コンサルティングなど、様々な分野の案件があります。<br>
                    お客様の業種に応じて、どのような案件があるか<br>
                    具体例を交えて詳しくご説明いたします。
                </div>
            </div>
        </div>
    </div>
</section>

<!-- お問い合わせフォームセクション -->
<section id="contact" class="form-section">
    <div class="container">
        <div class="form-container">
            <div id="successMessage" class="success-message">
                <h3>お申し込みありがとうございます！</h3>
                <p>24時間以内にご連絡いたします。しばらくお待ちください。</p>
            </div>

            <h2 class="form-title">まずは無料相談から始めませんか？</h2>
            <p class="form-subtitle">
                30分で入札参加の可能性を診断いたします<br>
                お気軽にお問い合わせください
            </p>

            <form id="contactForm" name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
                <input type="hidden" name="form-name" value="contact" />
                <div style="display: none;">
                    <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                </div>
                <div class="form-group">
                    <label for="name" class="form-label">お名前<span class="required">*</span></label>
                    <input type="text" id="name" name="name" class="form-input" required>
                </div>

                <div class="form-group">
                    <label for="company" class="form-label">会社名・団体名</label>
                    <input type="text" id="company" name="company" class="form-input">
                </div>

                <div class="form-group">
                    <label for="email" class="form-label">メールアドレス<span class="required">*</span></label>
                    <input type="email" id="email" name="email" class="form-input" required>
                </div>

                <div class="form-group">
                    <label for="phone" class="form-label">電話番号</label>
                    <input type="tel" id="phone" name="phone" class="form-input">
                </div>

                <div class="form-group">
                    <label for="industry" class="form-label">業種</label>
                    <select id="industry" name="industry" class="form-select">
                        <option value="">選択してください</option>
                        <option value="construction">建設業</option>
                        <option value="it">IT・システム開発</option>
                        <option value="consulting">コンサルティング</option>
                        <option value="cleaning">清掃業</option>
                        <option value="security">警備業</option>
                        <option value="translation">翻訳・通訳</option>
                        <option value="design">デザイン・広告</option>
                        <option value="logistics">物流・運送</option>
                        <option value="manufacturing">製造業</option>
                        <option value="retail">小売業</option>
                        <option value="other">その他</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="message" class="form-label">ご相談内容・ご質問など</label>
                    <textarea id="message" name="message" class="form-textarea" placeholder="入札参加についてのご質問や、現在の状況などをお聞かせください。" maxlength="1000"></textarea>
                    <div class="char-count">
                        <span id="charCount">0</span>/1000文字
                    </div>
                </div>

                <button type="submit" class="submit-button" id="submitBtn">
                    無料相談を申し込む
                </button>

                <p class="form-note">
                    ※ まずは無料相談から。具体的な契約は相談後にご検討いただけます
                </p>
            </form>

            <div class="contact-info">
                <h3>お急ぎの方は今すぐお電話を</h3>
                <a href="tel:046-272-3357" class="phone-number">046-272-3357</a>
                <div class="business-hours">
                    平日 9:00-17:00 | 土日祝も緊急時は対応可能<br>
                    ※ 電話でも無料相談を承っております
                </div>
            </div>
        </div>
    </div>
</section>

<script>
    // 文字数カウント
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');

    messageTextarea.addEventListener('input', function() {
        const currentLength = this.value.length;
        charCount.textContent = currentLength;
        
        if (currentLength > 1000) {
            charCount.style.color = '#e74c3c';
        } else {
            charCount.style.color = '#666';
        }
    });

    // フォーム送信処理
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // ボタンを無効化
        submitBtn.disabled = true;
        submitBtn.textContent = '送信中...';
        
        // フォームデータを収集
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            company: formData.get('company'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            industry: formData.get('industry'),
            message: formData.get('message')
        };
        
        // Netlify Forms を使用してメール送信
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                'form-name': 'contact',
                ...data
            }).toString()
        })
        .then(response => {
            if (response.ok) {
                // 成功メッセージを表示
                successMessage.classList.add('show');
                
                // フォームをリセット
                contactForm.reset();
                charCount.textContent = '0';
                
                // 成功メッセージまでスクロール
                successMessage.scrollIntoView({ behavior: 'smooth' });
            } else {
                throw new Error('送信に失敗しました');
            }
        })
        .catch(error => {
            alert('送信に失敗しました。しばらく時間をおいて再度お試しください。');
            console.error('Error:', error);
        })
        .finally(() => {
            // ボタンを元に戻す
            submitBtn.disabled = false;
            submitBtn.textContent = '無料相談を申し込む';
        });
    });

    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
</script>

