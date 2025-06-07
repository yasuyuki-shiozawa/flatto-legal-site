# Jekyll セットアップ計画

## 概要
ふらっと法務事務所の入札サポート専門サイトを Jekyll を使用して再構築するための詳細計画です。このドキュメントでは、ディレクトリ構造、テンプレート設計、および移行手順について説明します。

## 環境情報
- Ruby バージョン: 3.0.2p107
- Gem バージョン: 3.3.5
- Jekyll バージョン: 4.4.1

## ディレクトリ構造

```
flatto-legal-site/
├── _config.yml           # サイト全体の設定
├── _data/                # サイト共通データ
│   ├── navigation.yml    # ナビゲーションメニュー
│   └── services.yml      # サービス情報
├── _includes/            # 再利用可能なコンポーネント
│   ├── header.html       # ヘッダー
│   ├── footer.html       # フッター
│   └── components/       # その他のコンポーネント
│       ├── service-card.html
│       └── testimonial.html
├── _layouts/             # ページレイアウト
│   ├── default.html      # 基本レイアウト
│   ├── page.html         # 一般ページ
│   └── post.html         # ブログ記事
├── _pages/               # 各ページのコンテンツ
│   ├── index.md          # ホームページ
│   ├── service.md        # サービス紹介
│   ├── flow.md           # ご利用の流れ
│   ├── knowhow.md        # 入札ノウハウ
│   ├── cases.md          # 成功事例
│   ├── about.md          # 会社案内
│   ├── contact.md        # お問い合わせ
│   ├── links.md          # リンク集
│   └── dictionary.md     # 用語集
├── _posts/               # ブログ記事
│   └── 2025-06-07-welcome.md
├── assets/               # 静的アセット
│   ├── css/              # スタイルシート
│   │   ├── main.scss     # メインSCSSファイル
│   │   └── _variables.scss # 変数定義
│   ├── js/               # JavaScript
│   │   └── main.js       # メインJSファイル
│   └── images/           # 画像ファイル
│       ├── logo.png
│       └── icons/
├── _site/                # ビルド出力（gitignore）
├── .gitignore            # Git除外設定
└── Gemfile               # 依存関係
```

## 実装計画

### フェーズ1: 基本構造の構築
1. Jekyll サイトの初期化
2. 基本設定ファイル (_config.yml) の作成
3. 基本レイアウト (default.html) の実装
4. ヘッダーとフッターの作成

### フェーズ2: テンプレートとコンポーネントの開発
1. ページレイアウトの作成
2. 再利用可能なコンポーネントの実装
3. ナビゲーションメニューの設定
4. スタイルシートの基本構造の構築

### フェーズ3: コンテンツ移行
1. 既存HTMLからMarkdownへの変換
2. メタデータ（フロントマター）の追加
3. 画像とアセットの最適化と移行
4. コンテンツの構造化

### フェーズ4: 機能強化
1. 検索機能の実装
2. お問い合わせフォームの連携
3. SEO最適化
4. パフォーマンス向上のための調整

## 自動化計画

### GitHub Actions ワークフロー
```yaml
name: Build and Deploy Jekyll Site

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Ruby
      uses: ruby/setup-ruby@v1
      with:
        ruby-version: '3.0'
        bundler-cache: true
    
    - name: Install dependencies
      run: bundle install
    
    - name: Build site
      run: bundle exec jekyll build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./_site
```

## 移行手順

1. **初期セットアップ**
   - Jekyll サイトの初期化
   - 基本設定とディレクトリ構造の作成
   - Gemfile の設定

2. **テンプレート開発**
   - 基本レイアウトの作成
   - ヘッダー・フッターの実装
   - コンポーネントの開発

3. **コンテンツ移行**
   - 各ページのMarkdown変換
   - メタデータの追加
   - 画像の最適化

4. **テストとデプロイ**
   - ローカルでのテスト
   - GitHub Actions の設定
   - GitHub Pages へのデプロイ

## 次のステップ
1. Jekyll サイトの初期化
2. 基本設定ファイルの作成
3. 基本レイアウトの実装
