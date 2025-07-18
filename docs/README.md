# プロジェクト ドキュメント管理ルール

## 目的
プロジェクトの継続性と透明性を確保するため、すべてのやりとり、決定事項、要件をGitHubリポジトリに体系的に保存する。

## 基本原則

### 1. 全記録の原則
- すべての重要な会話・決定事項を記録
- 技術的な選択理由を明文化
- ユーザー要件・フィードバックを詳細に保存

### 2. 即時記録の原則
- 会話終了後、即座に記録を作成
- 決定事項は決定時点で即座に文書化
- 遅延による情報の欠落を防止

### 3. 構造化の原則
- 定められたディレクトリ構造に従って保存
- 統一されたファイル命名規則を使用
- 検索・参照しやすい形式で記録

## ディレクトリ構造

```
/docs/
├── conversations/          # 会話ログ
├── decisions/             # 決定事項
├── requirements/          # 要件定義
├── progress/             # 進捗管理
├── templates/            # テンプレート
└── README.md            # このルール文書
```

## ファイル命名規則

### 会話ログ
- 形式: `YYYY-MM-DD-session-topic.md`
- 例: `2025-06-09-site-completion-discussion.md`

### 決定事項
- 形式: `category-decisions.md`
- 例: `design-decisions.md`, `technical-decisions.md`

### 要件定義
- 形式: `requirement-type.md`
- 例: `user-requirements.md`, `functional-requirements.md`

### 進捗管理
- 形式: `YYYY-MM-DD-progress-report.md`
- 例: `2025-06-09-progress-report.md`

## 記録すべき内容

### 会話ログ
- 日時・参加者
- 主要な議題・質問
- 決定事項・合意内容
- 次のアクション項目
- 重要な技術的議論

### 決定事項
- 決定内容の詳細
- 決定理由・背景
- 代替案の検討結果
- 影響範囲・リスク
- 決定者・決定日時

### 要件定義
- 機能要件・非機能要件
- ユーザーストーリー
- 制約条件・前提条件
- 優先度・重要度
- 受け入れ基準

### 進捗管理
- 完了したタスク
- 進行中のタスク
- 次のマイルストーン
- 課題・リスク
- スケジュール調整

## 運用ルール

### 1. 記録作成のタイミング
- **会話終了後**: 30分以内に会話ログを作成
- **決定時**: 決定事項を即座に文書化
- **要件変更時**: 要件文書を即座に更新
- **進捗報告時**: 進捗レポートを作成

### 2. レビュー・承認プロセス
- 重要な決定事項はユーザー確認を取る
- 要件変更は必ずユーザー承認を得る
- 技術的決定は理由を明確に記載

### 3. 更新・メンテナンス
- 古い情報は「廃止」マークを付けて保持
- 関連文書間のリンクを維持
- 定期的な文書の整理・統合

### 4. アクセス・共有
- すべての文書はGitHubで管理
- 変更履歴を完全に保持
- 検索しやすいタグ・カテゴリを使用

## テンプレート使用

### 会話ログテンプレート
`/docs/templates/conversation-template.md`を使用

### 決定事項テンプレート
`/docs/templates/decision-template.md`を使用

### 要件定義テンプレート
`/docs/templates/requirement-template.md`を使用

### 進捗レポートテンプレート
`/docs/templates/progress-template.md`を使用

## 品質基準

### 記録の品質
- 第三者が理解できる明確な記述
- 具体的で曖昧さのない表現
- 適切な技術用語の使用
- 図表・コードサンプルの活用

### 文書の構造
- 見出し構造の統一
- 箇条書きの適切な使用
- リンク・参照の明確化
- 日付・バージョン情報の記載

## 継続改善

### 定期レビュー
- 月次でルールの有効性を確認
- 運用上の課題を特定・改善
- ユーザーフィードバックを反映

### ルール更新
- 必要に応じてルールを更新
- 更新時は変更履歴を記録
- 関係者への周知を徹底

---

**策定日**: 2025年6月9日  
**策定者**: Manus AI Agent  
**承認者**: ユーザー  
**次回レビュー予定**: 2025年7月9日

