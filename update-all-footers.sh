#!/bin/bash

# 更新対象のHTMLファイル一覧
HTML_FILES=(
  "index.html"
  "about.html"
  "service.html"
  "flow.html"
  "knowhow.html"
  "cases.html"
  "links.html"
  "contact.html"
)

# 古いフッター部分のパターン（正規表現）
OLD_FOOTER_PATTERN='<footer class="footer">.*</footer>'

# 新しいフッター内容
NEW_FOOTER='<footer class="footer">
    <div class="container">
        <div class="row">
            <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
                <div class="footer-info">
                    <img src="images/flatto-logo-color.png" alt="ふらっと法務事務所" class="footer-logo">
                    <p>〒242-0006<br>神奈川県大和市南林間6丁目4番26号</p>
                    <p>TEL: 046-272-3357<br>Email: mail@flat-legal.com</p>
                </div>
            </div>
            <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
                <div class="footer-links">
                    <h3>サイトマップ</h3>
                    <ul>
                        <li><a href="index.html">ホーム</a></li>
                        <li><a href="service.html">サービス</a></li>
                        <li><a href="flow.html">ご利用の流れ</a></li>
                        <li><a href="knowhow.html">入札ノウハウ</a></li>
                        <li><a href="cases.html">成功事例</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
                <div class="footer-links">
                    <h3>コンテンツ</h3>
                    <ul>
                        <li><a href="blog.html">案件紹介</a></li>
                        <li><a href="dictionary.html">用語集</a></li>
                        <li><a href="links.html">リンク集</a></li>
                        <li><a href="about.html">事務所概要</a></li>
                        <li><a href="contact.html">お問い合わせ</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-4 col-md-6">
                <div class="footer-links">
                    <h3>営業時間</h3>
                    <ul>
                        <li>電話受付: 平日9時～17時</li>
                        <li>メール: 24時間受付</li>
                        <li>ご来所・訪問: 予約制</li>
                        <li>（お客様のご都合に合わせ、曜日・時間応相談）</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row footer-bottom">
            <div class="col-md-6">
                <p class="footer-copyright">© 2025 行政書士法人ふらっと法務事務所 All Rights Reserved.</p>
            </div>
            <div class="col-md-6">
                <div class="footer-policy-links">
                    <a href="privacy.html">プライバシーポリシー</a>
                    <span class="separator">|</span>
                    <a href="terms.html">利用規約</a>
                </div>
            </div>
        </div>
    </div>
</footer>'

# 各HTMLファイルを処理
for file in "${HTML_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "処理中: $file"
    
    # バックアップを作成
    cp "$file" "${file}.bak"
    
    # ヘッダーのロゴ画像パスも修正
    sed -i 's|images/logo.png|images/flatto-logo-color.png|g' "$file"
    
    # フッター部分を置換（sedでは改行を含む置換が難しいため、一時ファイルを使用）
    awk -v footer="$NEW_FOOTER" '{
      if ($0 ~ /<footer class="footer">/) {
        in_footer = 1
        print footer
      } else if (in_footer && $0 ~ /<\/footer>/) {
        in_footer = 0
      } else if (!in_footer) {
        print $0
      }
    }' "${file}.bak" > "$file"
    
    echo "完了: $file"
  else
    echo "ファイルが見つかりません: $file"
  fi
done

echo "全ファイルの更新が完了しました"
