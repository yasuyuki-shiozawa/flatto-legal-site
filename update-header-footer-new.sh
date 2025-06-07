#!/bin/bash

# 新しいヘッダー・フッターテンプレートファイル
HEADER_TEMPLATE="/home/ubuntu/flatto-legal-site/header-template-simple.html"
FOOTER_TEMPLATE="/home/ubuntu/flatto-legal-site/footer-template-detailed.html"

# 対象のHTMLファイル
HTML_FILES=("blog.html" "dictionary.html" "service.html" "flow.html" "knowhow.html" "cases.html" "about.html" "contact.html" "links.html" "index.html")

# 各HTMLファイルのヘッダーとフッターを更新
for file in "${HTML_FILES[@]}"; do
  if [ -f "$file" ] && [ -s "$file" ]; then
    echo "更新中: $file"
    
    # ファイルのバックアップを作成
    cp "$file" "${file}.bak3"
    
    # 一時ファイルを作成
    TMP_FILE="${file}.tmp"
    
    # ヘッダー部分を置換
    awk '
    BEGIN { header_found=0; header_end=0; header_content=""; }
    {
      if (/<header>/ && !header_found) {
        header_found=1;
        system("cat '"$HEADER_TEMPLATE"'");
        next;
      }
      if (header_found && !header_end) {
        if (/<\/header>/) {
          header_end=1;
        }
        next;
      }
      print;
    }' "$file" > "$TMP_FILE"
    
    # 一時ファイルを元のファイルに移動
    mv "$TMP_FILE" "$file"
    
    # フッター部分を置換
    TMP_FILE="${file}.tmp"
    awk '
    BEGIN { footer_found=0; footer_end=0; }
    {
      if (/<footer/ && !footer_found) {
        footer_found=1;
        system("cat '"$FOOTER_TEMPLATE"'");
        next;
      }
      if (footer_found && !footer_end) {
        if (/<\/footer>/) {
          footer_end=1;
        }
        next;
      }
      print;
    }' "$file" > "$TMP_FILE"
    
    # 一時ファイルを元のファイルに移動
    mv "$TMP_FILE" "$file"
    
    echo "$file のヘッダーとフッターを更新しました"
  elif [ -f "$file" ] && [ ! -s "$file" ]; then
    echo "警告: $file は空ファイルです。対応するバックアップから復元が必要です。"
  else
    echo "警告: $file が見つかりません"
  fi
done

echo "すべてのヘッダーとフッター更新が完了しました"
