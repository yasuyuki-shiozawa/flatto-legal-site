# nyusatsu-map.com ファイル整理レポート

## 問題の概要
古いファイルと新しいファイルが混在し、以下の問題が発生しています：
- 重複ファイル（-fixed版）
- 不要なディレクトリ
- リンク切れ
- 関係ないファイルの混入

## 整理対象

### 1. 削除すべきファイル・ディレクトリ
```
削除対象：
- fixed_files/ （ディレクトリ全体）
- flatto-legal-site-fixed/ （ディレクトリ全体）
- index-fixed.html
- flow-fixed.html
- knowhow-fixed.html
- footer-template.html
- css/mobile-fixes.css （updated版があるため）
- trigger.txt
```

### 2. 作成が必要なファイル
```
必要なページ：
- privacy.html （プライバシーポリシー）
- terms.html （特定商取引法に基づく表記）
- faq.html （よくある質問）
```

### 3. 別プロジェクトのファイル
以下は入札サイトと無関係なので、別フォルダに移動すべき：
- *.vba, *.bas, *.txt ファイル
- *.xlsx, *.xls, *.csv ファイル
- *.pdf ファイル（サイト用以外）
- *.docx, *.doc ファイル
- *.zip ファイル
- transcription-system/ ディレクトリ
- proposal-system/ ディレクトリ
- claude-organization-archive/ ディレクトリ
- Gmail/ ディレクトリ
- その他の業務ファイル

## 実行計画

### Phase 1: バックアップ
1. 現在の状態を別フォルダにバックアップ

### Phase 2: クリーンアップ
1. 重複ファイルの削除
2. 不要ディレクトリの削除
3. 関係ないファイルを別フォルダに移動

### Phase 3: 必要ファイルの作成
1. privacy.html
2. terms.html
3. faq.html

### Phase 4: リンクの修正
1. 削除したファイルへのリンクを修正
2. 完全URLを相対パスに変更

このクリーンアップを実行してよろしいですか？