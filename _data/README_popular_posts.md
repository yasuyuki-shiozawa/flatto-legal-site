# 人気記事の管理方法

## 概要
人気記事は `_data/popular_posts.yml` ファイルで一元管理されています。
このファイルを編集することで、サイドバーや関連記事欄に表示される人気記事を簡単に変更できます。

## 編集方法

### 1. 順位の変更
記事の順番を入れ替えるだけで、表示順が変わります。
上から順に1位、2位...となります。

```yaml
posts:
  - post_url: "nyusatsu-shikaku-guide"    # 1位
  - post_url: "zuii-keiyaku-kaisetsu"     # 2位
  - post_url: "chusho-kigyo-nyusatsu"     # 3位
```

### 2. 記事の追加・削除
新しい記事を追加する場合：
```yaml
  - post_url: "新しい記事のスラッグ"
    custom_title: "表示したいタイトル（省略可）"
    custom_excerpt: "説明文（省略可）"
```

### 3. post_urlの確認方法
post_urlは、_postsフォルダ内のファイル名から日付を除いた部分です。

例：
- ファイル名: `2024-03-01-nyusatsu-shikaku-guide.md`
- post_url: `nyusatsu-shikaku-guide`

### 4. カスタムタイトル
元のタイトルが長い場合や、人気記事用に短くしたい場合は `custom_title` を使用できます。
省略した場合は、元の記事のタイトルが使用されます。

## 注意事項
- post_urlは正確に入力してください（存在しない記事は表示されません）
- 最大5記事まで表示されます
- 変更はGitでコミット・プッシュ後に反映されます