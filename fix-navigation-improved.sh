#!/bin/bash

# ナビゲーション修正スクリプト（改良版）
# 重複したヘッダー・フッターの修正と統一テンプレートの再適用

# 対象のHTMLファイル
HTML_FILES=("index.html" "blog.html" "dictionary.html" "service.html" "flow.html" "about.html" "cases.html" "contact.html" "knowhow.html" "links.html")

echo "ナビゲーション修正を開始します..."

for file in "${HTML_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "処理中: $file"
        
        # ファイルのバックアップを作成
        cp "$file" "${file}.bak"
        
        # 一時ファイルを作成
        temp_file="${file}.temp"
        
        # ヘッダーとフッターを置換
        sed -e '/<body>/,/<main>/c\
<body>\
    <!-- ヘッダー -->\
    <header>\
        <div class="header-container">\
            <div class="logo">\
                <a href="index.html">\
                    <img src="images/logo.png" alt="ふらっと法務事務所ロゴ">\
                </a>\
            </div>\
            <nav class="pc-nav">\
                <ul>\
                    <li><a href="index.html">ホーム</a></li>\
                    <li><a href="service.html">サービス</a></li>\
                    <li><a href="flow.html">ご利用の流れ</a></li>\
                    <li><a href="knowhow.html">入札ノウハウ</a></li>\
                    <li><a href="cases.html">成功事例</a></li>\
                    <li><a href="blog.html">案件紹介</a></li>\
                    <li><a href="contact.html">お問い合わせ</a></li>\
                </ul>\
            </nav>\
            <div class="menu-btn">\
                <span></span>\
                <span></span>\
                <span></span>\
            </div>\
        </div>\
        <nav class="sp-nav">\
            <ul>\
                <li><a href="index.html">ホーム</a></li>\
                <li><a href="service.html">サービス</a></li>\
                <li><a href="flow.html">ご利用の流れ</a></li>\
                <li><a href="knowhow.html">入札ノウハウ</a></li>\
                <li><a href="cases.html">成功事例</a></li>\
                <li><a href="blog.html">案件紹介</a></li>\
                <li><a href="contact.html">お問い合わせ</a></li>\
            </ul>\
        </nav>\
    </header>\
\
    <!-- メインコンテンツ -->\
    <main>' \
        -e '/<\/main>/,/<script/c\
    </main>\
\
    <!-- フッター -->\
    <footer class="footer">\
        <div class="container">\
            <div class="row">\
                <div class="col-lg-4 col-md-6 mb-4 mb-md-0">\
                    <div class="footer-info">\
                        <img src="images/logo-white.png" alt="ふらっと法務事務所" class="footer-logo">\
                        <p>〒242-0006<br>神奈川県大和市南林間6丁目4番26号</p>\
                        <p>TEL: 046-272-3357<br>Email: mail@flat-legal.com</p>\
                    </div>\
                </div>\
                <div class="col-lg-2 col-md-6 mb-4 mb-md-0">\
                    <div class="footer-links">\
                        <h3>主要ページ</h3>\
                        <ul>\
                            <li><a href="index.html">ホーム</a></li>\
                            <li><a href="service.html">サービス</a></li>\
                            <li><a href="flow.html">ご利用の流れ</a></li>\
                            <li><a href="knowhow.html">入札ノウハウ</a></li>\
                            <li><a href="cases.html">成功事例</a></li>\
                            <li><a href="blog.html">案件紹介</a></li>\
                        </ul>\
                    </div>\
                </div>\
                <div class="col-lg-2 col-md-6 mb-4 mb-md-0">\
                    <div class="footer-links">\
                        <h3>サポートページ</h3>\
                        <ul>\
                            <li><a href="dictionary.html">用語集</a></li>\
                            <li><a href="links.html">リンク集</a></li>\
                            <li><a href="about.html">事務所概要</a></li>\
                            <li><a href="contact.html">お問い合わせ</a></li>\
                        </ul>\
                    </div>\
                </div>\
                <div class="col-lg-4 col-md-6">\
                    <div class="footer-links">\
                        <h3>最新情報</h3>\
                        <ul>\
                            <li><a href="#">入札制度の最新動向</a></li>\
                            <li><a href="#">官公庁入札情報まとめ</a></li>\
                            <li><a href="#">入札参加資格申請のポイント</a></li>\
                            <li><a href="#">自治体別入札情報リンク集</a></li>\
                        </ul>\
                    </div>\
                </div>\
            </div>\
            <div class="row footer-bottom">\
                <div class="col-md-6">\
                    <p class="footer-copyright">© 2025 行政書士法人ふらっと法務事務所 All Rights Reserved.</p>\
                </div>\
                <div class="col-md-6">\
                    <div class="footer-policy-links">\
                        <a href="privacy.html">プライバシーポリシー</a>\
                        <span class="separator">|</span>\
                        <a href="terms.html">利用規約</a>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </footer>\
\
    <!-- JavaScript -->\
    <script' "$file" > "$temp_file"
        
        # 一時ファイルを元のファイルに移動
        mv "$temp_file" "$file"
        
        echo "$file の修正が完了しました"
    else
        echo "警告: $file が見つかりません"
    fi
done

echo "すべてのファイルの修正が完了しました"
