# HTML→Markdown変換ルール

## 基本変換ルール

HTMLからMarkdownへの変換にあたり、以下のルールを適用します。

### 見出し

```html
<h1>見出し1</h1>
<h2>見出し2</h2>
<h3>見出し3</h3>
```

↓

```markdown
# 見出し1
## 見出し2
### 見出し3
```

### 段落

```html
<p>段落テキスト</p>
```

↓

```markdown
段落テキスト
```

### 強調

```html
<strong>太字</strong>
<em>斜体</em>
```

↓

```markdown
**太字**
*斜体*
```

### リスト

```html
<ul>
  <li>項目1</li>
  <li>項目2</li>
</ul>

<ol>
  <li>番号付き項目1</li>
  <li>番号付き項目2</li>
</ol>
```

↓

```markdown
- 項目1
- 項目2

1. 番号付き項目1
2. 番号付き項目2
```

### リンク

```html
<a href="/path/to/page">リンクテキスト</a>
```

↓

```markdown
[リンクテキスト](/path/to/page)
```

### 画像

```html
<img src="/path/to/image.jpg" alt="代替テキスト">
```

↓

```markdown
![代替テキスト](/path/to/image.jpg)
```

Jekyllでは、以下のように相対パスを使用：

```markdown
![代替テキスト]({{ "/assets/images/image.jpg" | relative_url }})
```

### テーブル

```html
<table>
  <tr>
    <th>ヘッダー1</th>
    <th>ヘッダー2</th>
  </tr>
  <tr>
    <td>データ1</td>
    <td>データ2</td>
  </tr>
</table>
```

↓

```markdown
| ヘッダー1 | ヘッダー2 |
|----------|----------|
| データ1   | データ2   |
```

### 水平線

```html
<hr>
```

↓

```markdown
---
```

## Jekyll固有の変換ルール

### Front Matter

各Markdownファイルの先頭に、以下のようなFront Matterを追加：

```markdown
---
layout: page
title: "ページタイトル"
description: "ページの説明文"
permalink: /path/to/page/
last_modified_at: 2025-06-07
---
```

### インクルード

HTMLの共通部品をJekyllのインクルードに変換：

```html
<!-- 共通ヘッダー -->
<header>...</header>
```

↓

```markdown
{% include header.html %}
```

### 条件分岐

特定の条件に基づいて表示を切り替える場合：

```markdown
{% if page.show_cta %}
[無料相談のお申し込み](/contact/)
{% endif %}
```

### 変数の使用

Front Matterで定義した変数を本文中で使用：

```markdown
# {{ page.title }}

{{ page.description }}
```

## 特殊要素の変換

### CTAボタン

```html
<div class="cta">
  <h2>入札でお悩みですか？</h2>
  <p>ふらっと法務事務所の専門家が、あなたの入札成功をサポートします。</p>
  <a href="/contact/" class="btn">無料相談のお申し込み</a>
</div>
```

↓

```markdown
<div class="cta">
  <h2>入札でお悩みですか？</h2>
  <p>ふらっと法務事務所の専門家が、あなたの入札成功をサポートします。</p>
  <a href="{{ "/contact/" | relative_url }}" class="btn">無料相談のお申し込み</a>
</div>
```

または、インクルードファイルとして切り出す：

```markdown
{% include cta.html 
   title="入札でお悩みですか？" 
   description="ふらっと法務事務所の専門家が、あなたの入札成功をサポートします。" 
   button_text="無料相談のお申し込み" 
   button_url="/contact/" 
%}
```

### フォーム

フォームはHTMLのまま記述し、必要に応じてJekyllの変数を使用：

```markdown
<form action="{{ "/contact/submit/" | relative_url }}" method="post">
  <div class="form-group">
    <label for="name">お名前 <span class="required">必須</span></label>
    <input type="text" id="name" name="name" required>
  </div>
  <!-- 他のフォーム要素 -->
  <button type="submit">送信する</button>
</form>
```

## 注意点

1. インデントは半角スペース2つで統一
2. 空行の扱いに注意（Markdownでは段落を分けるために空行が必要）
3. HTMLタグを含むMarkdownは、正しく処理されるよう注意
4. 特殊文字（*, _, #, +, -, ., !, [, ], (, ), {, }, <, >）はバックスラッシュでエスケープ
5. 画像パスは相対URLヘルパーを使用
6. 内部リンクも相対URLヘルパーを使用
