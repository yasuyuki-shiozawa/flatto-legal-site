# ふらっと法務事務所 Jekyll移行プロジェクト - 運用ガイド

## はじめに

このガイドでは、Jekyllを使用した静的サイトジェネレーターで構築された「ふらっと法務事務所 入札サポート専門サイト」の運用方法について説明します。

## 基本情報

- **サイト名**: ふらっと法務事務所 入札サポート専門サイト
- **使用技術**: Jekyll 4.4.1（静的サイトジェネレーター）
- **リポジトリ**: GitHub Pages（`https://yasuyuki-shiozawa.github.io/flatto-legal-site/`）

## 日常的な更新作業

### コンテンツの更新

1. 対象のMarkdownファイルを開く
   - 例: `service.md`（サービス紹介ページ）
   - 例: `flow.md`（ご利用の流れページ）

2. Front Matter（ファイル先頭の`---`で囲まれた部分）を確認
   ```yaml
   ---
   layout: page
   title: "ページタイトル"
   description: "ページの説明文"
   permalink: /path/
   last_modified_at: 2025-06-07
   ---
   ```

3. 必要に応じてFront Matterを更新
   - `title`: ページのタイトル
   - `description`: ページの説明（SEO対策用）
   - `last_modified_at`: 更新日

4. Markdownコンテンツを編集
   - 見出しは `#`、`##`、`###` などで表現
   - リストは `-` または `1.` で表現
   - リンクは `[リンクテキスト](URL)` で表現
   - 画像は `![代替テキスト](/assets/images/ファイル名)` で表現

5. 変更をコミットしてプッシュ
   ```bash
   git add .
   git commit -m "コンテンツ更新: ページ名"
   git push origin main
   ```

### 新規ページの追加

1. 新しいMarkdownファイルを作成
   - ファイル名は英数字とハイフンを使用（例: `new-page.md`）

2. Front Matterを設定
   ```yaml
   ---
   layout: page
   title: "新規ページタイトル"
   description: "新規ページの説明文"
   permalink: /new-page/
   last_modified_at: 2025-06-07
   ---
   ```

3. Markdownコンテンツを作成

4. 変更をコミットしてプッシュ

### 画像の追加・更新

1. 画像ファイルを `assets/images/` ディレクトリに配置

2. Markdownファイル内で画像を参照
   ```markdown
   ![代替テキスト](/assets/images/ファイル名)
   ```

3. 変更をコミットしてプッシュ

## レイアウトとデザインの変更

### テンプレートの編集

1. `_layouts/` ディレクトリ内のHTMLファイルを編集
   - `default.html`: 基本レイアウト
   - `page.html`: 一般ページ用レイアウト
   - `home.html`: トップページ用レイアウト
   - その他専用レイアウト

2. `_includes/` ディレクトリ内のコンポーネントを編集
   - `header.html`: ヘッダー
   - `footer.html`: フッター
   - `cta.html`: コールトゥアクション

### スタイルの編集

1. `assets/css/` ディレクトリ内のCSSファイルを編集
   - `main.scss`: メインスタイルシート

2. 変更をコミットしてプッシュ

## ローカル環境での開発

### 環境構築

1. Rubyとjekyllのインストール
   ```bash
   # Rubyのインストール（システムによって異なる）
   # 例: Ubuntu
   sudo apt-get install ruby-full build-essential

   # Jekyllのインストール
   gem install jekyll bundler
   ```

2. 依存関係のインストール
   ```bash
   cd /path/to/flatto-legal-site
   bundle install
   ```

### ローカルサーバーの起動

1. ローカルサーバーを起動
   ```bash
   bundle exec jekyll serve
   ```

2. ブラウザで `http://localhost:4000` にアクセス

3. 変更を加えると自動的に再ビルドされる

## デプロイ

### GitHub Pagesへのデプロイ

1. 変更をコミットしてプッシュ
   ```bash
   git add .
   git commit -m "変更内容の説明"
   git push origin main
   ```

2. GitHub Actionsによって自動的にビルドとデプロイが行われる

3. 数分後に `https://yasuyuki-shiozawa.github.io/flatto-legal-site/` で変更が反映される

## トラブルシューティング

### ビルドエラーが発生した場合

1. エラーメッセージを確認

2. 一般的な問題と解決策
   - Front Matterの形式が正しくない → YAMLの構文を確認
   - 参照しているファイルが存在しない → パスを確認
   - Liquidタグの構文エラー → 構文を確認

3. ローカルでビルドして詳細なエラーを確認
   ```bash
   bundle exec jekyll build --trace
   ```

### 変更が反映されない場合

1. キャッシュをクリアしてブラウザを再読み込み

2. ビルドログを確認して正常にビルドされているか確認

3. 必要に応じてローカルでビルドして問題を特定

## サポートとリソース

- Jekyll公式ドキュメント: https://jekyllrb.com/docs/
- Markdown記法ガイド: https://www.markdownguide.org/
- GitHub Pagesドキュメント: https://docs.github.com/ja/pages

## 連絡先

技術的な問題や質問がある場合は、以下の連絡先までお問い合わせください。

- メール: support@example.com
- 電話: 03-1234-5678（平日 9:00-18:00）
