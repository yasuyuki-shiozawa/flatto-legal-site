#!/usr/bin/env python3
# Jekyll最小構成テストスクリプト
# 作成日: 2025年6月7日

import os
import shutil
import sys

# 設定
JEKYLL_DIR = '/home/ubuntu/flatto-legal-site/jekyll-site'
TEST_DIR = '/home/ubuntu/flatto-legal-site/jekyll-test'
PAGES_DIR = os.path.join(TEST_DIR, '_pages')

def create_minimal_structure():
    """最小構成のJekyllサイトを作成する"""
    # テストディレクトリの作成（既存の場合は削除して再作成）
    if os.path.exists(TEST_DIR):
        shutil.rmtree(TEST_DIR)
    os.makedirs(TEST_DIR)
    os.makedirs(PAGES_DIR)
    
    # 最小限の_config.ymlを作成
    config_content = """# 最小構成テスト用設定
title: テストサイト
baseurl: ""
url: ""

# ビルド設定
markdown: kramdown
permalink: pretty

# インクルードディレクトリ
include:
  - _pages
"""
    with open(os.path.join(TEST_DIR, '_config.yml'), 'w', encoding='utf-8') as f:
        f.write(config_content)
    
    # 最小限のGemfileを作成
    gemfile_content = """source "https://rubygems.org"
gem "jekyll", "~> 4.4.1"
"""
    with open(os.path.join(TEST_DIR, 'Gemfile'), 'w', encoding='utf-8') as f:
        f.write(gemfile_content)
    
    # テスト用のページを作成
    index_content = """---
layout: default
title: ホームページ
permalink: /
---
# テストホームページ
これはテスト用のホームページです。
"""
    with open(os.path.join(PAGES_DIR, 'index.md'), 'w', encoding='utf-8') as f:
        f.write(index_content)
    
    about_content = """---
layout: default
title: 会社概要
permalink: /about/
---
# 会社概要
これはテスト用の会社概要ページです。
"""
    with open(os.path.join(PAGES_DIR, 'about.md'), 'w', encoding='utf-8') as f:
        f.write(about_content)
    
    # 最小限のレイアウトを作成
    os.makedirs(os.path.join(TEST_DIR, '_layouts'))
    default_layout = """<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>{{ page.title }}</title>
</head>
<body>
  <header>
    <h1>{{ site.title }}</h1>
    <nav>
      <a href="/">ホーム</a>
      <a href="/about/">会社概要</a>
    </nav>
  </header>
  <main>
    {{ content }}
  </main>
  <footer>
    <p>&copy; 2025 テストサイト</p>
  </footer>
</body>
</html>
"""
    with open(os.path.join(TEST_DIR, '_layouts', 'default.html'), 'w', encoding='utf-8') as f:
        f.write(default_layout)
    
    print("最小構成のJekyllサイトを作成しました。")

def build_test_site():
    """テストサイトをビルドする"""
    os.chdir(TEST_DIR)
    print("テストサイトのビルドを開始します...")
    os.system('bundle install')
    os.system('bundle exec jekyll build --trace')
    print("テストサイトのビルドが完了しました。")

def main():
    """メイン処理"""
    print("Jekyll最小構成テストを開始します...")
    create_minimal_structure()
    build_test_site()
    print("テスト完了。")
    print("テストサイトは次の場所にあります: " + TEST_DIR)
    print("ビルド結果は次の場所にあります: " + os.path.join(TEST_DIR, '_site'))

if __name__ == "__main__":
    main()
