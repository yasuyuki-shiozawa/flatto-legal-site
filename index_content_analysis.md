# ふらっと法務事務所サイト - HTMLコンテンツ構造分析

## index.html（トップページ）の構造分析

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
   <div class="page-header section-dark">
       <div class="container">
           <h1>ふらっと法務事務所</h1>
           <p>中小企業の入札参加をトータルサポート</p>
       </div>
   </div>
   ```

2. **ヒーローセクション**
   ```html
   <section class="hero">
     <div class="container">
       <div class="hero-content">
         <h1 class="hero-title">入札って、<br>こんなに身近だったんだ</h1>
         <p class="hero-subtitle">初めての入札でも安心。専門家がしっかりサポートします。</p>
         <div class="hero-buttons">
           <a href="contact.html" class="btn btn-primary btn-large">無料相談はこちら</a>
           <a href="service.html" class="btn btn-secondary btn-large">サービス詳細</a>
         </div>
       </div>
     </div>
   </section>
   ```

3. **入札とは**
   ```html
   <section class="section">
     <div class="container">
       <h2 class="section-title text-center">入札とは</h2>
       <div class="row">
         <div class="col-8 offset-2">
           <p>入札とは、公共機関や民間企業が商品やサービスを調達する際に、複数の業者から見積もりを集め、最も条件の良い業者を選定する方法です。</p>
           <p>多くの中小企業にとって、公共事業の受注は安定した収益源となりますが、複雑な手続きや専門知識が必要なため、参入のハードルが高いと感じられがちです。</p>
           <p>ふらっと法務事務所では、そんな入札の壁を取り払い、あなたのビジネスチャンスを広げるサポートをいたします。</p>
         </div>
       </div>
     </div>
   </section>
   ```

4. **当事務所の特徴**
   - 3つのカードで特徴を紹介（専門知識、丁寧なサポート、実績多数）
   - 各カードにはアイコン画像、タイトル、説明文が含まれる

5. **3ステップで入札をサポート**
   - 3つのステップカードで流れを説明
   - 各ステップにはステップ番号、タイトル、説明文が含まれる

6. **対象業種**
   - 8つの業種アイコンとタイトルを表示
   - 2行4列のグリッドレイアウト

7. **サービス対応範囲**
   - 全国対応の説明と地域情報
   - サービス詳細へのリンクボタン

8. **お客様の声**
   - 2つの顧客の声を表示
   - 各カードには内容と顧客情報が含まれる

### 画像・アセット
- ロゴ画像: `images/logo.png`
- アイコン画像:
  - 特徴セクション: CSS内のインラインアイコンまたはFont Awesome
  - 業種アイコン: CSS内のインラインアイコンまたはFont Awesome

### JavaScript機能
- モバイルメニュートグル
- アコーディオン機能
- タブ機能

## 移行時の注意点
1. インラインアイコンやFont Awesomeアイコンの適切な移行
2. レスポンシブデザインの維持
3. JavaScriptの機能移行
4. 画像パスのJekyll相対URLヘルパーへの変換
