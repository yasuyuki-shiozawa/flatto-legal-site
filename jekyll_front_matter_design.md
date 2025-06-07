# Jekyll Front Matter設計書

## 基本設計方針

Jekyllサイトへの移行にあたり、各ページに適切なFront Matterを設定することで、メタデータの管理、レイアウト制御、SEO対策を効率的に行います。

## 共通Front Matter項目

すべてのページに共通して設定する項目：

```yaml
---
layout: page  # 使用するレイアウトテンプレート（default, page, homeなど）
title: "ページタイトル"  # ページの主要タイトル
description: "ページの説明文"  # メタディスクリプション用
permalink: /path/to/page/  # URLパス
last_modified_at: YYYY-MM-DD  # 最終更新日
---
```

## ページ種別ごとの追加Front Matter

### トップページ（index.md）
```yaml
layout: home  # トップページ専用レイアウト
hero_title: "メインビジュアルタイトル"
hero_subtitle: "サブタイトル"
show_cta: true  # CTAボタン表示フラグ
cta_text: "無料相談のお申し込み"
cta_url: "/contact/"
```

### サービス紹介ページ（service.md）
```yaml
service_categories:
  - name: "入札参加資格取得支援"
    icon: "document-text"
  - name: "入札書類作成支援"
    icon: "pencil"
  # 他のサービスカテゴリ
show_price_table: true  # 料金表示フラグ
```

### ご利用の流れページ（flow.md）
```yaml
steps:
  - step: 1
    title: "無料相談"
    description: "お客様のご状況をヒアリング"
  # 他のステップ
```

### 入札ノウハウページ（knowhow.md）
```yaml
categories: ["入札ノウハウ", "入札戦略"]
show_toc: true  # 目次表示フラグ
```

### 成功事例ページ（cases.md）
```yaml
case_categories: ["一般競争入札", "総合評価方式", "指名競争入札", "プロポーザル方式"]
```

### 案件紹介ページ（blog.md）
```yaml
pagination:
  enabled: true
  per_page: 5
```

### 会社案内ページ（about.md）
```yaml
show_map: true  # Google Map表示フラグ
map_coordinates: "35.4660694,139.4668111"  # 緯度・経度
```

### お問い合わせページ（contact.md）
```yaml
form_id: "contact-form"
show_faq: true  # FAQ表示フラグ
```

### リンク集ページ（links.md）
```yaml
link_categories:
  - name: "官公庁・自治体の入札情報"
    icon: "government"
  # 他のリンクカテゴリ
```

### 入札用語集ページ（dictionary.md）
```yaml
show_index: true  # 索引表示フラグ
index_items: ["あ行", "か行", "さ行", "た行", "な行", "は行", "ま行", "や行", "ら行", "わ行"]
```

## SEO対策用Front Matter

必要に応じて追加するSEO対策用の項目：

```yaml
seo:
  keywords: ["入札サポート", "行政書士", "入札参加資格"]  # メタキーワード
  og_type: "website"  # OGPタイプ
  og_image: "/assets/images/ogp.jpg"  # OGP画像
  twitter_card: "summary_large_image"  # Twitter Card種別
```

## 変換ルール

1. HTMLのtitleタグ内容をFront Matterのtitleに設定
2. metaディスクリプションをFront Matterのdescriptionに設定
3. ページのパス構造をpermalinkに反映
4. ページ種別に応じた追加Front Matterを設定
5. 最終更新日は現在の日付を初期値として設定

## 注意点

1. Front Matterは必ず3つのハイフン `---` で囲む
2. YAMLの構文に従い、インデントは半角スペース2つで統一
3. 文字列に特殊文字（:, {, }, [, ], ,, &, *, #, ?, |, -, <, >, =, !, %, @, \）が含まれる場合はダブルクォーテーションで囲む
4. 日本語などのマルチバイト文字はUTF-8エンコーディングで保存
