---
layout: default
title: 入札サイト Netlifyリダイレクト設定 | ドメイン移行・SEO対策 - 行政書士法人ふらっと法務事務所
description: 入札マップサイトのNetlifyリダイレクト設定ドキュメント。カスタムドメイン移行・重複コンテンツ対策・SEO最適化の詳細手順。神奈川県大和市の行政書士法人ふらっと法務事務所。
keywords: 入札サイト Netlifyリダイレクト,ドメイン移行,カスタムドメイン設定,重複コンテンツ対策,SEO リダイレクト,Netlify設定,行政書士 ウェブ技術,神奈川県,大和市
permalink: /netlify-redirect-setup/
sitemap: false
---

# 入札サイト Netlifyリダイレクト設定ドキュメント

## 概要
このドキュメントは、Netlifyサブドメインからカスタムドメインへのリダイレクト設定について、問題の発生から解決までの全過程を記録したものです。

## 問題の背景

### プロジェクトの経緯（GitHubコミット履歴より）
1. **初期段階**: `flatto-legal-site.netlify.app` でサイト構築を開始
2. **2025年7月4日**: リダイレクト設定を実装（コミット `3c72f81`）
   - `_redirects` ファイルに Netlify サブドメインから `nyusatsu-map.com` へのリダイレクト設定を追加
   - コミットメッセージ: "Netlifyデフォルトドメインからメインドメインへのリダイレクト設定追加"
3. **2025年7月5日**: サイトの大幅リニューアル（コミット `4a633b5`）
   - コミットメッセージ: "nyusatsu-map.com サイトの初期コミット（クリーンな環境）"
4. **現在の状況**: リダイレクト設定は存在するが機能していない状態が継続

### 既存のリダイレクト設定（2025年7月4日実装済み）
```
# Netlifyデフォルトドメインからメインドメインへの301リダイレクト  
# SEO対策として重複コンテンツを防ぐ
https://flatto-legal-site.netlify.app/* https://nyusatsu-map.com/:splat 301!
http://flatto-legal-site.netlify.app/* https://nyusatsu-map.com/:splat 301!
```

### 発生した問題
- **検索結果に複数のURLが表示される問題**
  - `https://flatto-legal-site.netlify.app/` （初期ドメイン）
  - `https://nyusatsu-map.com/` （現在の正規ドメイン）
- **SEO上の懸念**: 重複コンテンツとして認識される可能性
- **ユーザー体験の問題**: どちらが正式なサイトか判断できない
- **検索エンジンのインデックス問題**: 初期ドメインが既に検索結果に登録済み

### 技術的背景
1. **Netlifyの仕組み**
   - すべてのNetlifyプロジェクトには必ずサブドメインが付与される
   - サブドメインが「本体」、カスタムドメインは「エイリアス」の関係
   - サブドメインの削除は技術的に不可能

2. **Jekyll + Netlifyの特殊事情**
   - Jekyllは `_site` フォルダにビルド結果を出力
   - Netlifyは `_site` フォルダの内容をデプロイ
   - リダイレクト設定ファイルは**デプロイされるフォルダ内**に配置する必要

## 試行錯誤の過程

### 失敗した方法
1. **プロジェクトルートに_redirectsファイルを配置**
   ```
   /home/ubuntu/flatto-legal-site/_redirects
   ```
   - 結果: リダイレクト機能せず
   - 原因: publish directoryに配置されていない

2. **netlify.tomlファイルでの設定**
   ```toml
   [[redirects]]
     from = "https://flatto-legal-site.netlify.app/*"
     to = "https://nyusatsu-map.com/:splat"
     status = 301
     force = true
   ```
   - 結果: リダイレクト機能せず
   - 原因: 同様にpublish directoryの問題

3. **Netlify管理画面での設定を試行**
   - Domain management画面を確認
   - 適切なリダイレクト設定オプションが見つからず

## 解決方法

### 根本原因の特定
**リダイレクト設定は既に存在していたが、Jekyllの`include`設定が不足していため、`_redirects`ファイルがpublish directory（_siteフォルダ）にコピーされていなかった**

- **設定済み**: `_redirects` ファイルにリダイレクトルールを記述（2025年7月4日）
- **不足していた**: Jekyll の `include` ディレクティブで `_redirects` を指定
- **結果**: Netlifyが `_redirects` ファイルを認識できない状態が約1ヶ月間継続

### 解決策: Jekyll includeディレクティブの使用

#### 実装内容
`_config.yml` の `include` セクションに `_redirects` を追加：

```yaml
# 含めるファイル
include:
  - _pages
  - search-index.json
  - .htaccess
  - _redirects  # ← この行を追加
```

#### 動作原理
1. Jekyllビルド時に `_redirects` ファイルが `_site` フォルダにコピーされる
2. Netlifyが `_site` フォルダをデプロイ
3. `_site/_redirects` ファイルがNetlifyに認識される
4. リダイレクト機能が有効化

## _redirectsファイルの内容

```
# Netlifyサブドメインから正規ドメインへの301リダイレクト
https://flatto-legal-site.netlify.app/* https://nyusatsu-map.com/:splat 301!

# wwwありからwwwなしへのリダイレクト（既存）
https://www.nyusatsu-map.com/* https://nyusatsu-map.com/:splat 301!
```

### リダイレクトルールの説明
- `*`: ワイルドカード（すべてのパスにマッチ）
- `:splat`: マッチしたパスを転送先に引き継ぐ
- `301`: 永続的リダイレクト（SEO評価を転送）
- `!`: 強制リダイレクト（既存ファイルより優先）

## 実装手順

### 1. 事前確認
- `_redirects` ファイルがプロジェクトルートに存在することを確認
- `_config.yml` ファイルの現在の `include` セクションを確認

### 2. 設定変更
```bash
# _config.ymlを編集
vim _config.yml

# includeセクションに_redirectsを追加
include:
  - _pages
  - search-index.json
  - .htaccess
  - _redirects
```

### 3. デプロイ
```bash
git add _config.yml
git commit -m "Add _redirects to include list for Netlify redirect functionality"
git push origin main
```

### 4. 確認
- Netlifyの自動デプロイ完了を待つ（2-3分）
- `https://flatto-legal-site.netlify.app/` にアクセス
- `https://nyusatsu-map.com/` にリダイレクトされることを確認

## 期待される効果

### 即座の効果
- Netlifyサブドメインから正規ドメインへの自動リダイレクト
- ユーザーが意識することなく統一されたURL体験

### 長期的効果（1-2週間後）
- 検索結果に正規URL（nyusatsu-map.com）のみ表示
- SEO評価の統一化
- 重複コンテンツ問題の解決

## トラブルシューティング

### よくある問題

1. **リダイレクトが機能しない**
   - `_site/_redirects` ファイルが存在するか確認
   - Jekyllビルドが正常に完了しているか確認
   - ブラウザキャッシュをクリア

2. **一部のページでリダイレクトされない**
   - Service Workerがキャッシュしている可能性
   - ブラウザの開発者ツールでService Workerを無効化

3. **リダイレクトループが発生**
   - `_redirects` ファイルの記述を確認
   - 循環参照がないかチェック

### デバッグ方法

#### curlコマンドでのテスト
```bash
curl -svo /dev/null https://flatto-legal-site.netlify.app/ 2>&1 | grep -i "location\|http"
```

期待される出力:
```
< HTTP/2 301
< location: https://nyusatsu-map.com/
```

#### ブラウザでのテスト
1. 新しいシークレットウィンドウを開く
2. `https://flatto-legal-site.netlify.app/` にアクセス
3. URLバーが `https://nyusatsu-map.com/` に変わることを確認

## 重要な注意点

### Jekyll特有の考慮事項
- `_redirects` ファイルは必ず `include` ディレクティブで指定する
- アンダースコアで始まるファイルはデフォルトで除外される
- `exclude` リストに `_redirects` が含まれていないことを確認

### Netlify特有の考慮事項
- リダイレクトファイルは publish directory に配置する必要がある
- 管理画面での設定よりファイルベースの設定が推奨される
- 301リダイレクトはSEO評価を転送する

## 参考資料

### 公式ドキュメント
- [Netlify Redirects Documentation](https://docs.netlify.com/routing/redirects/)
- [Jekyll Include Documentation](https://jekyllrb.com/docs/configuration/options/#global-configuration)

### 関連する技術記事
- [Setting up redirects on Netlify](https://www.netlify.com/blog/2021/12/13/setting-up-redirects-on-netlify/)
- [Jekyll Configuration Options](https://jekyllrb.com/docs/configuration/)

## 作業履歴

### 2025年7月31日
- **問題発見**: 検索結果に複数URLが表示される問題を確認
- **原因調査**: _redirectsファイルの配置場所が原因と特定
- **解決実装**: _config.ymlのincludeセクションに_redirectsを追加
- **デプロイ完了**: GitHubプッシュ完了、Netlify自動デプロイ開始

### 実装者
- AI Agent (Manus)
- 作業依頼者: ユーザー（行政書士法人ふらっと法務事務所）

---

**このドキュメントは将来の開発者やAIエージェントが同様の問題に遭遇した際の参考資料として作成されました。**

