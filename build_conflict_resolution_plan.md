# ビルド競合解消計画

## 問題の概要
Jekyllサイトのビルド時に出力先競合の警告が発生しています。これは_pagesディレクトリ内のファイルと同じパスを生成する重複ファイルが存在するためです。

## 競合の原因
1. _pagesディレクトリ内のMarkdownファイルと同じパスを生成する別のファイルが存在
2. 同じパーマリンクを持つ複数のファイルが存在
3. _config.ymlの設定とページのFront Matterの不整合

## 解決手順

### 1. 重複ファイルの特定と削除
- ルートディレクトリのindex.md（すでに削除済み）
- _pagesディレクトリ外の他のMarkdownファイル
- 同じパスを生成する可能性のあるHTMLファイル

### 2. _config.ymlの最終調整
- collections設定の確認と修正
- defaults設定の確認と修正
- パーマリンク設定の最適化

### 3. Front Matterの最終確認
- 各ページのパーマリンク設定の一意性確認
- レイアウト指定の正確性確認

### 4. ビルド検証
- 競合警告のないクリーンビルドの実現
- 生成されたサイトの構造確認

## 実行計画
1. _pagesディレクトリ外の重複ファイルを特定・削除
2. _config.ymlの設定を最適化
3. 再ビルドして競合警告の解消を確認
4. 最終品質検証の実施
