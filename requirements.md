# ふらっと法務事務所 入札サポート専門サイト 詳細要件

## 全体方針

### デザイン方向性
- プロフェッショナルかつ温かみのあるデザイン
- メインカラー：深みのあるブルーやネイビー（信頼感・プロフェッショナル）
- アクセントカラー：温かみのあるオレンジやゴールド（親しみやすさ）
- 背景：明るい白やベージュ（読みやすさ・清潔感）
- 角の丸いボタンやカード、適度な余白、人物写真の活用
- 見出し：やや太めの明朝体、本文：読みやすいゴシック体

### 技術スタック
- HTML5/CSS3/JavaScript
- レスポンシブデザイン（モバイル対応）
- Bootstrap 5フレームワーク活用
- Netlifyでのホスティング

### ターゲット顧客
- 売上向上を目指す中小企業やスタートアップ
- 従業員を抱え、ITや事務手続きに不慣れな事業者
- 入札参加資格は持つものの手続きに迷う事業者

## トップページ（/）詳細要件

### ヘッダー部分
- ロゴ（仮のロゴを作成）
- ナビゲーションメニュー（レスポンシブ対応）
- 問い合わせボタン（目立つデザイン）

### ヒーローセクション
- キャッチコピー：「入札って、こんなに身近だったんだ」
- サブコピー：初めての入札でも安心感を与える文言
- CTAボタン：「無料相談はこちら」
- 背景：オフィスや書類作業のイメージ画像（温かみのある色調）

### 導入説明セクション
- 「入札とは」の簡潔な説明（初心者向け）
- 当事務所の特徴（3〜4点のポイント）
- アイコンや図解を活用した視覚的説明

### 3ステップ支援フローセクション
- 図解による支援の流れ（横並びカード3枚）
  1. ヒアリング・課題整理
  2. 入札準備・書類作成
  3. 入札実施・フォローアップ
- 各ステップの簡潔な説明文
- ステップ間の矢印や接続要素

### 対象業種・サービス範囲セクション
- 対象業種のリスト（アイコン付き）
- サービス対応範囲の地図または一覧
- 「詳しくはこちら」リンク（サービス紹介ページへ）

### CTAセクション
- 「まずは無料相談から」などの誘導文
- 大きめのCTAボタン
- 「よくある質問はこちら」のリンク

### フッター
- 会社情報（所在地、連絡先）
- サイトマップ
- プライバシーポリシー・特商法リンク
- SNSアイコン（設定予定がある場合）

## サービス紹介ページ（/service）詳細要件

### ヘッダー部分
- トップページと共通

### ページタイトルセクション
- 「入札サポートサービス」などのタイトル
- サブタイトル：「初めての方にも安心のサポート体制」など

### 入札サポート概要セクション
- 「入札サポートとは何か」の説明（初学者向け）
- イラストや図解による視覚的説明
- 入札参加のメリット

### サービス内容一覧セクション
- カード形式での表示
  1. 入札参加資格の取得支援
  2. 経審・許可申請
  3. 案件調査
  4. 入札戦略設計
  5. 書類作成代行
  6. 契約後サポート
- 各サービスの詳細説明
- アイコンや画像による視覚的補助

### 対象地域・対応業種セクション
- 地域別の対応状況（地図または一覧）
- 業種別の対応状況（アイコンまたは一覧）
- SEO対策のための地域・業種キーワード活用

### 料金体系・サポートプランセクション
- プラン比較表（ライト／スタンダード／フル）
- 各プランの特徴と料金目安
- 「詳しくはお問い合わせください」などの注釈

### CTAセクション
- トップページと同様の構成

### フッター
- トップページと共通

## お問い合わせページ（/contact）詳細要件

### ヘッダー部分
- トップページと共通

### ページタイトルセクション
- 「無料相談・お問い合わせ」などのタイトル
- サブタイトル：「まずはお気軽にご相談ください」など

### フォームセクション
- ステップ形式のフォーム
  - Step1：業種選択（プルダウン）
  - Step2：課題選択（チェックボックス）
  - Step3：連絡先情報（テキスト入力）
- 必須項目の明示
- プライバシーポリシー同意チェックボックス
- 送信ボタン（目立つデザイン）

### 資料請求セクション
- 「資料をダウンロード」または「資料を自動送付」の案内
- 資料の概要説明
- ダウンロードボタンまたはメールアドレス入力欄

### お問い合わせ後の流れセクション
- 問い合わせ後の対応フロー説明
- 回答までの目安時間
- よくある質問へのリンク

### 連絡先情報セクション
- 電話番号
- メールアドレス
- 営業時間
- 所在地（地図埋め込み）

### フッター
- トップページと共通

## Schema.org構造化データ適用方針

### 全ページ共通
- Organization（組織情報）
- LocalBusiness（地域ビジネス情報）

### トップページ
- WebSite（サイト全体情報）
- Service（サービス概要）

### サービス紹介ページ
- Service（詳細サービス情報）
- Offer（料金プラン情報）

### お問い合わせページ
- ContactPage（問い合わせページ情報）

### FAQ・ノウハウページ（将来実装）
- FAQPage（よくある質問）
- HowTo（手順説明）
- Article（記事情報）
