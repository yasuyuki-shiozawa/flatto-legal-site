#!/bin/bash

# フッターテンプレートファイル
FOOTER_TEMPLATE="footer-template.html"

# 更新対象のHTMLファイル（メインページ）
HTML_FILES=("index.html" "blog.html" "dictionary.html" "service.html" "flow.html" "knowhow.html" "cases.html" "about.html" "contact.html" "links.html")

# 各HTMLファイルのフッターを更新
for file in "${HTML_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "更新中: $file"
    
    # フッター部分を一時ファイルに保存
    FOOTER_CONTENT=$(cat "$FOOTER_TEMPLATE")
    
    # sedコマンドでフッター部分を置換
    # フッター開始タグから終了タグまでを置換
    sed -i '/<footer class="footer">/,/<\/footer>/c\'"$FOOTER_CONTENT" "$file"
    
    echo "$file のフッターを更新しました"
  else
    echo "警告: $file が見つかりません"
  fi
done

echo "すべてのフッターの更新が完了しました"
