#!/bin/bash

# 対象のHTMLファイル
HTML_FILES=("blog.html" "dictionary.html" "service.html" "flow.html" "knowhow.html" "cases.html" "about.html" "contact.html" "links.html")

# 各HTMLファイルの重複メニューを修正
for file in "${HTML_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "修正中: $file"
    
    # ファイルのバックアップを作成
    cp "$file" "${file}.bak2"
    
    # 重複メニューの削除（リスト形式のメニュー）
    sed -i '/<ul>/,/<\/ul>/s/^.*<li><a href=".*">.*<\/a><\/li>.*$//' "$file"
    
    # 空の<ul></ul>タグを削除
    sed -i 's/<ul>[ \t]*<\/ul>//g' "$file"
    
    echo "$file の重複メニューを修正しました"
  else
    echo "警告: $file が見つかりません"
  fi
done

echo "すべての重複メニュー修正が完了しました"
