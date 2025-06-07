# 既存HTMLファイル分析

## 主要HTMLファイル一覧

### メインページ（最新版）
- `/home/ubuntu/flatto-legal-site/index.html` - トップページ
- `/home/ubuntu/flatto-legal-site/service.html` - サービス紹介ページ
- `/home/ubuntu/flatto-legal-site/flow.html` - ご利用の流れページ
- `/home/ubuntu/flatto-legal-site/knowhow.html` - 入札ノウハウページ
- `/home/ubuntu/flatto-legal-site/cases.html` - 成功事例ページ
- `/home/ubuntu/flatto-legal-site/blog.html` - 案件紹介ページ
- `/home/ubuntu/flatto-legal-site/about.html` - 会社案内ページ
- `/home/ubuntu/flatto-legal-site/contact.html` - お問い合わせページ
- `/home/ubuntu/flatto-legal-site/links.html` - リンク集ページ
- `/home/ubuntu/flatto-legal-site/dictionary.html` - 用語集ページ

### バリエーション/修正版
- `*-new.html` - 新バージョン
- `*-fixed.html` - 修正版
- `*-direct.html` - 直接編集版
- `*-simplified.html` - 簡略化版
- `*-enhanced.html` - 拡張版
- `*-minimal.html` - 最小版

## 移行方針

1. 最新の正式版HTMLファイル（接尾辞なし）を基本として移行
2. 各ページの主要コンテンツ領域を特定し、Markdown形式に変換
3. 共通要素（ヘッダー・フッター）はJekyllの_includesで既に実装済みのものを使用
4. 各ページ固有のコンテンツ構造を保持しつつ、フロントマターでメタデータを管理
5. 画像・アセットのパスを相対パスからJekyllの相対URLヘルパーに変換

## 次のステップ

1. 各ページの主要コンテンツ領域を特定
2. 共通要素と個別コンテンツの分離
3. 画像・アセットの整理とパス確認
