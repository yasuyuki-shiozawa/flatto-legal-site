# Jekyll最終構造レポート

## 概要

ふらっと法務事務所の入札サポート専門サイトをJekyllを使用した静的サイトジェネレーターに移行する作業を完了しました。本レポートでは、最終的なサイト構造と設定について詳細に説明します。

## 最終ディレクトリ構造

```
jekyll-site/
├── _config.yml        # サイト全体の設定ファイル
├── Gemfile            # 依存関係の管理
├── _layouts/          # レイアウトテンプレート
│   ├── default.html   # 基本レイアウト
│   ├── home.html      # トップページ用レイアウト
│   ├── page.html      # 一般ページ用レイアウト
│   ├── post.html      # ブログ記事用レイアウト
│   ├── service.html   # サービス紹介用レイアウト
│   ├── faq.html       # FAQ用レイアウト
│   ├── dictionary.html # 用語集用レイアウト
│   └── links.html     # リンク集用レイアウト
├── _includes/         # 共通コンポーネント
│   ├── header.html    # ヘッダー
│   ├── footer.html    # フッター
│   └── cta.html       # コールトゥアクション
├── assets/            # 静的アセット
│   ├── css/           # スタイルシート
│   ├── js/            # JavaScript
│   └── images/        # 画像ファイル
├── index.md           # トップページ
├── service.md         # サービス紹介ページ
├── flow.md            # ご利用の流れページ
├── knowhow.md         # 入札ノウハウページ
├── cases.md           # 成功事例ページ
├── blog.md            # 案件紹介ページ
├── about.md           # 会社案内ページ
├── contact.md         # お問い合わせページ
├── links.md           # リンク集ページ
└── dictionary.md      # 入札用語集ページ
```

## 最終設定

### _config.yml

```yaml
# ふらっと法務事務所 入札サポート専門サイト - Jekyll設定

# サイト情報
title: ふらっと法務事務所 入札サポート専門サイト
email: mail@flat-legal.com
description: >-
  ふらっと法務事務所の入札サポート専門サイトです。入札参加のノウハウや成功事例、
  サービス内容などをご紹介しています。
baseurl: "/flatto-legal-site" # GitHub Pagesのサブディレクトリ
url: "https://yasuyuki-shiozawa.github.io" # サイトのベースURL
logo: /assets/images/logo.png

# 会社情報
company:
  name: 行政書士法人ふらっと法務事務所
  address: 〒242-0006 神奈川県大和市南林間6丁目4番26号
  tel: 046-272-3357
  hours: 平日 9:00〜18:00

# ビルド設定
markdown: kramdown
permalink: pretty
sass:
  style: compressed

# デフォルト設定
defaults:
  - scope:
      path: ""
    values:
      layout: "default"
  - scope:
      path: ""
      type: "posts"
    values:
      layout: "post"

# プラグイン
plugins:
  - jekyll-seo-tag
  - jekyll-sitemap

# 除外ファイル
exclude:
  - Gemfile
  - Gemfile.lock
  - node_modules
  - vendor
  - .sass-cache
  - .jekyll-cache
  - gemfiles
  - README.md

# インクルードディレクトリ
include: []

# 言語設定
lang: ja
```

### Front Matter標準形式

各Markdownファイルには以下の標準化されたFront Matterを使用しています：

```yaml
---
layout: [適切なレイアウト]
title: "ページタイトル"
description: "ページの説明文"
permalink: /[パス]/
last_modified_at: 2025-06-07
seo:
  keywords: ["キーワード1", "キーワード2", ...]
  og_type: "website"
  og_image: "/assets/images/ogp.jpg"
---
```

## 最適化の成果

1. **ディレクトリ構造の最適化**
   - _pagesディレクトリを廃止し、Markdownファイルをプロジェクトルートに配置
   - 不要な入れ子構造や重複を排除

2. **設定の最適化**
   - collections設定を削除し、標準的なJekyllページ処理に依存
   - includeを空配列として明示的に設定

3. **Front Matterの統一**
   - すべてのページで一貫したFront Matter形式を使用
   - permalinkを明示的に指定し、ファイル名やディレクトリ構造に依存しない

4. **パス参照の統一**
   - すべてのリンクやアセット参照で一貫したパス指定方法を使用
   - Jekyll標準の相対パス生成関数を活用

## ビルド検証結果

最終構成でのJekyllビルドは、警告やエラーなく正常に完了しました。これにより、高品質で一貫性のある静的サイトが生成されています。

## 今後の運用について

1. **コンテンツ更新**
   - Markdownファイルを直接編集することで、各ページのコンテンツを更新できます
   - Front Matterの形式を維持し、必要に応じてメタデータを更新してください

2. **新規ページの追加**
   - 既存のMarkdownファイルをテンプレートとして、新しいページを作成できます
   - プロジェクトルートに新しいMarkdownファイルを配置し、適切なFront Matterを設定してください

3. **デザイン変更**
   - _layouts/および_includes/ディレクトリ内のHTMLファイルを編集することで、サイト全体のデザインを変更できます
   - assets/css/ディレクトリ内のCSSファイルを編集することで、スタイルを調整できます
