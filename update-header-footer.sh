#!/bin/bash

# ヘッダーとフッターのテンプレートファイル
HEADER_TEMPLATE="header-template.html"
FOOTER_TEMPLATE="footer-template.html"

# 更新対象のHTMLファイル（メインページ）
HTML_FILES=("index.html" "blog.html" "dictionary.html" "service.html" "flow.html" "knowhow.html" "cases.html" "about.html" "contact.html" "links.html")

# 各HTMLファイルのヘッダーとフッターを更新
for file in "${HTML_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "更新中: $file"
    
    # ファイルのバックアップを作成
    cp "$file" "${file}.bak"
    
    # ヘッダー部分を一時ファイルに保存
    HEADER_CONTENT=$(cat "$HEADER_TEMPLATE")
    
    # フッター部分を一時ファイルに保存
    FOOTER_CONTENT=$(cat "$FOOTER_TEMPLATE")
    
    # 一時ファイルを作成
    TMP_FILE="${file}.tmp"
    
    # ヘッダー部分を置換
    # <header>タグから</header>タグまでを置換
    sed -e '/<header>/,/<\/header>/c\'"$HEADER_CONTENT" "$file" > "$TMP_FILE"
    
    # 一時ファイルを元のファイルに移動
    mv "$TMP_FILE" "$file"
    
    # フッター部分を置換
    # <footer class="footer">タグから</footer>タグまでを置換
    sed -e '/<footer class="footer">/,/<\/footer>/c\'"$FOOTER_CONTENT" "$file" > "$TMP_FILE"
    
    # 一時ファイルを元のファイルに移動
    mv "$TMP_FILE" "$file"
    
    echo "$file のヘッダーとフッターを更新しました"
  else
    echo "警告: $file が見つかりません"
  fi
done

echo "すべてのヘッダーとフッターの更新が完了しました"
