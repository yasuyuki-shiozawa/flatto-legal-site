#!/usr/bin/env python3
"""
MarkdownファイルをPDFに変換するスクリプト
"""

import os
import sys

# PDFへの変換方法の説明
print("""
=== MarkdownファイルのPDF変換手順 ===

作成したMarkdownファイルをPDFに変換するには、以下の方法があります：

1. Visual Studio Code + Markdown PDF拡張機能
   - VS Codeで各.mdファイルを開く
   - Ctrl+Shift+P → "Markdown PDF: Export (pdf)"を選択
   - スタイリングも含めて高品質なPDFが生成されます

2. Pandoc + wkhtmltopdf
   - コマンド例：
     pandoc nyusatsu-checklist.md -o nyusatsu-checklist.pdf --pdf-engine=wkhtmltopdf

3. オンラインツール
   - Markdown to PDF Converter等のWebサービスを利用

4. Microsoft Word経由
   - MarkdownをWordに貼り付けて整形
   - PDFとして保存

推奨: VS Code + Markdown PDF拡張機能が最も簡単で高品質です。

作成が必要なPDFファイル：
- nyusatsu-checklist.pdf （入札参加チェックリスト）
- technical-proposal-template.pdf （技術提案書テンプレート）
- nyusatsu-qa.pdf （入札Q&A集）
- law-revision-2025.pdf （最新法改正情報まとめ）
- statistics-data.pdf （入札統計データ集）

各PDFは同じディレクトリ（/assets/downloads/）に保存してください。
""")

# 作成したMarkdownファイルのリスト
md_files = [
    "nyusatsu-checklist.md",
    "technical-proposal-template.md", 
    "nyusatsu-qa.md",
    "law-revision-2025.pdf",
    "statistics-data.md"
]

print("\n作成済みMarkdownファイル：")
for md_file in md_files:
    if os.path.exists(md_file):
        print(f"✓ {md_file}")
    else:
        print(f"✗ {md_file} (not found)")

print("\nPDF変換後、downloads.mdページのリンクを更新してください。")