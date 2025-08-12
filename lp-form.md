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
        color: #ffffff;
        opacity: 1;
    }

    .hero .features {
        font-size: 1.1rem;
        color: #ffffff;
        opacity: 1;
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

    /* 料金比較セクション */
    .pricing-comparison {
        background: #f8f9fa;
        padding: 80px 0;
    }

    .comparison-title {
        text-align: center;
        font-size: 2.2rem;
        font-weight: 700;
        margin-bottom: 20px;
        color: #2c3e50;
    }

    .comparison-subtitle {
        text-align: center;
        font-size: 1.2rem;
        margin-bottom: 60px;
        color: #666;
    }

    .comparison-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        max-width: 800px;
        margin: 0 auto;
    }

    .comparison-card {
        background: white;
        border-radius: 15px;
        padding: 40px 30px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        position: relative;
    }

    .comparison-card.recommended {
        border: 3px solid #ff6b35;
        transform: scale(1.05);
    }

    .comparison-card.recommended::before {
        content: "おすすめ!";
        position: absolute;
        top: -15px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
        color: white;
        padding: 8px 20px;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 600;
    }

    .comparison-label {
        font-size: 1.3rem;
        font-weight: 600;
        margin-bottom: 20px;
        color: #2c3e50;
    }

    .comparison-price {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 10px;
    }

    .comparison-card:first-child .comparison-price {
        color: #e74c3c;
    }

    .comparison-card.recommended .comparison-price {
        color: #ff6b35;
    }

    .comparison-period {
        font-size: 1rem;
        color: #666;
        margin-bottom: 30px;
    }

    .comparison-features {
        list-style: none;
        padding: 0;
    }

    .comparison-features li {
        padding: 8px 0;
        border-bottom: 1px solid #f0f0f0;
        color: #666;
    }

    .comparison-features li:last-child {
        border-bottom: none;
    }

    /* 最終プッシュセクション */
    .final-push {
        background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
        color: white;
        padding: 80px 0;
        text-align: center;
    }

    .final-push h2 {
        font-size: 2.2rem;
        font-weight: 700;
        margin-bottom: 40px;
    }

    .push-reasons {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 30px;
        max-width: 1000px;
        margin: 0 auto 50px;
    }

    .push-reason {
        background: white;
        border-radius: 15px;
        padding: 30px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .push-reason h3 {
        font-size: 1.3rem;
        font-weight: 600;
        margin-bottom: 15px;
        color: #ff6b35;
    }

    .push-reason p {
        line-height: 1.6;
        color: #333;
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
        background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
        border-radius: 15px;
        padding: 25px;
        margin-top: 20px;
    }

    .solution-title {
        font-size: 1.2rem;
        font-weight: 600;
        color: #ffffff;
        margin-bottom: 15px;
    }

    .solution-text {
        color: #ffffff;
        line-height: 1.6;
        opacity: 0.95;
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
        margin-bottom: 10px;
        color: #2c3e50;
    }

    .form-title-sub {
        text-align: center;
        font-size: 1.1rem;
        margin-bottom: 30px;
        color: #ff6b35;
        font-weight: 600;
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
        position: relative;
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

    .submit-button-sub {
        font-size: 0.9rem;
        opacity: 0.9;
        margin-top: 5px;
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

        .comparison-grid {
            grid-template-columns: 1fr;
            gap: 20px;
        }

        .comparison-card.recommended {
            transform: none;
        }

        .push-reasons {
            grid-template-columns: 1fr;
            gap: 20px;
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
        <p class="subtitle">他社では8-12万円かかる申請が<br><strong>【完全無料】</strong></p>
        <div class="features">
            月額33,000円で事前調査から業務完了まで<br>
            全省庁統一資格申請は無料
        </div>
        <a href="#contact" class="cta-button">無料相談のお申し込み</a>
    </div>
</section>

<!-- 料金比較セクション -->
<section class="pricing-comparison">
    <div class="container">
        <h2 class="comparison-title">他社との料金比較</h2>
        <p class="comparison-subtitle">申請費用だけでこんなに違います</p>
        
        <div class="comparison-grid">
            <div class="comparison-card">
                <div class="comparison-label">一般的な事務所</div>
                <div class="comparison-price">8-12万円</div>
                <div class="comparison-period">申請のみ</div>
                <ul class="comparison-features">
                    <li>申請代行のみ</li>
                    <li>その後のサポートなし</li>
                    <li>案件探しは自分で</li>
                    <li>入札手続きも自分で</li>
                </ul>
            </div>
            
            <div class="comparison-card recommended">
                <div class="comparison-label">当事務所</div>
                <div class="comparison-price">完全無料</div>
                <div class="comparison-period">申請 + 完全サポート</div>
                <ul class="comparison-features">
                    <li>申請代行無料</li>
                    <li>6ヶ月間完全サポート</li>
                    <li>案件探しもお手伝い</li>
                    <li>入札手続きも指導</li>
                </ul>
            </div>
        </div>
    </div>
</section>

<!-- 最終プッシュセクション -->
<section class="final-push">
    <div class="container">
        <h2>⭐ 今すぐ無料相談を申し込む3つの理由</h2>
        
        <div class="push-reasons">
            <div class="push-reason">
                <h3>① 申請費用8-12万円が完全無料</h3>
                <p>他社では高額な申請費用が、当事務所なら完全無料。6ヶ月サポート契約で、申請から入札参加まで全てをサポートします。</p>
            </div>
            
            <div class="push-reason">
                <h3>② 30分で参入可能性を無料診断</h3>
                <p>あなたの業種で本当に入札参加できるのか、競合状況や勝算を含めて詳しく分析。無理な参入はお勧めしません。</p>
            </div>
            
            <div class="push-reason">
                <h3>③ 実際に2,715万円落札の実績</h3>
                <p>理論だけでなく、実際に大型案件を落札した実績があります。現実的で実践的なアドバイスをご提供します。</p>
            </div>
        </div>
        
        <a href="#contact" class="cta-button">今すぐ無料相談を申し込む</a>
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

            <h2 class="form-title">申請費用8-12万円→0円</h2>
            <p class="form-title-sub">まずは無料相談から始めませんか？</p>
            <p class="form-subtitle">
                30分で入札参加の可能性を診断いたします<br>
                お気軽にお問い合わせください
            </p>

            <form id="contactForm" name="bidding-support" method="POST" action="/thanks/" data-netlify="true" data-netlify-honeypot="bot-field">
                <!-- Netlify Forms用の隠しフィールド -->
                <input type="hidden" name="form-name" value="bidding-support" />
                <input type="hidden" name="_to" value="mail@flat-legal.com" />
                <input type="hidden" name="_subject" value="【入札マップ】入札参加完全サポートお申込み" />
                
                <!-- ハニーポット（スパム対策） -->
                <div class="hidden">
                    <label>このフィールドは入力しないでください: <input name="bot-field" /></label>
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
                    <div class="submit-button-sub">申請費用8-12万円が無料</div>
                </button>

                <p class="form-note">
                    ※ 24時間以内にご連絡いたします<br>
                    ※ 無理な営業は一切いたしません
                </p>
            </form>

            <div class="contact-info">
                <h3>お急ぎの方はお電話でも</h3>
                <a href="tel:0120-123-456" class="phone-number">0120-123-456</a>
                <p class="business-hours">平日 9:00-18:00（土日祝除く）</p>
            </div>
        </div>
    </div>
</section>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // 文字数カウント機能
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            charCount.textContent = currentLength;
            
            if (currentLength > 1000) {
                charCount.style.color = '#e74c3c';
            } else {
                charCount.style.color = '#666';
            }
        });
    }

    // フォーム送信処理
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');

    if (form) {
        form.addEventListener('submit', function(e) {
            // 送信ボタンを無効化
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = '送信中...';
            }
        });
    }

    // スムーズスクロール
    const ctaButtons = document.querySelectorAll('a[href="#contact"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.getElementById('contact');
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
</script>

