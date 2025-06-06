# 画像表示問題の調査結果

## 問題点の特定

1. **ロゴ画像の表示問題**
   - 現状: ヘッダーのロゴ画像が正しく表示されていない
   - 原因: HTMLでは `images/logo.png` を参照しているが、実際のファイルは `images/flatto-logo-color.png` として存在している
   - 対応策: HTMLのパス参照を修正するか、ファイル名を統一する

2. **フッターロゴの表示問題**
   - 現状: フッターのロゴ画像が表示されていない
   - 原因: HTMLでは `images/logo-white.png` を参照しているが、ファイルサイズが大きすぎる（約1MB）
   - 対応策: 画像を最適化するか、より軽量な画像に差し替える

3. **ナビゲーションの重複表示**
   - 現状: ナビゲーションメニューが2重に表示されている
   - 原因: HTMLの構造に問題があり、PCナビとSPナビが同時に表示されている
   - 対応策: CSSの表示制御を修正する

## 画像ファイルの状況

```
/home/ubuntu/flatto-legal-site/images/
├── bid-support-service.jpg
├── cases/
├── flatto-logo-color.png  # 実際のロゴファイル
├── hero-image.jpg
├── icons/
├── japan-map.png
├── logo-white.png  # サイズが大きすぎる（約1MB）
├── logo.png  # サイズが大きすぎる（約1MB）
├── privacy-mark.png
├── testimonial-1.jpg
└── testimonial-2.jpg
```

## 修正方針

1. **フッター情報の更新**
   - 最新の事業者情報（住所・電話番号・メール等）を全ページのフッターに統一して反映

2. **画像パスの修正**
   - HTMLファイル内の画像参照パスを実際のファイル名に合わせて修正
   - 例: `images/logo.png` → `images/flatto-logo-color.png`

3. **画像の最適化**
   - 大きすぎる画像ファイル（logo.png, logo-white.png）を最適化
   - 必要に応じて新しい画像ファイルを作成

4. **ナビゲーション表示の修正**
   - CSSを修正してナビゲーションの重複表示を解消
