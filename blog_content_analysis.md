# ふらっと法務事務所サイト - HTMLコンテンツ構造分析

## blog.html（案件紹介ページ）の構造分析

### 共通要素
- **ヘッダー部分**
  - メタタグ、タイトル、CSS読み込み
  - サイトロゴ、ナビゲーションメニュー
  - モバイルメニュートグル機能

- **フッター部分**
  - 会社情報（住所、連絡先等）
  - サービスメニュー
  - サイトマップ
  - 関連情報リンク
  - コピーライト

### 個別コンテンツ領域
1. **ページヘッダー**
   ```html
   <section>
     <div>
       <h>案件紹介</h1>
       <p>ふらっと法務事務所が手がけた入札案件をご紹介します</p>
     </div>
   </section>
   ```

2. **案件紹介一覧**
   - 5つの案件記事をブログ形式で紹介
   - 各記事には日付、タイトル、画像、本文、タグが含まれる
   - 案件:
     1. 某市役所の清掃業務委託入札に成功（2025年5月15日）
     2. 国土交通省発注のシステム開発案件を受注（2025年4月28日）
     3. 県立高校の給食調理業務を受注（2025年3月10日）
     4. 市営住宅の管理業務を継続受注（2025年2月15日）
     5. 県の観光PR業務を受注（2025年1月20日）

3. **ページネーション**
   - 複数ページにわたる記事へのナビゲーション
   - 現在のページと他ページへのリンク

4. **関連コンテンツ**
   - 成功事例ページへのリンク
   - 入札ノウハウページへのリンク
   - 各リンクには簡単な説明文が付随

5. **CTA（Call to Action）セクション**
   ```html
   <section>
     <div>
       <div>
         <div>
           <h>入札でお悩みですか？</h2>
           <p>ふらっと法務事務所の専門家が、あなたの入札成功をサポートします。まずは無料相談からお気軽にどうぞ。</p>
           <div>
             <a>無料相談のお申し込み</a>
           </div>
         </div>
       </div>
     </div>
   </section>
   ```

### 画像・アセット
- 案件紹介の画像（5枚）
- アイコン: Font Awesomeを使用

### JavaScript機能
- モバイルメニュートグル
- アコーディオン機能
- タブ機能
- 画像フォールバック機能

## 移行時の注意点
1. ブログ記事形式のレイアウト維持
2. ページネーション機能の実装
3. タグ機能の実装
4. 画像パスのJekyll相対URLヘルパーへの変換
5. 日付フォーマットのJekyll形式への変換
