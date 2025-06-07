#!/usr/bin/env python3
# _pagesディレクトリ完全削除スクリプト
# 作成日: 2025年6月7日

import os
import shutil
import sys

# 設定
JEKYLL_DIR = '/home/ubuntu/flatto-legal-site/jekyll-site'
PAGES_DIR = os.path.join(JEKYLL_DIR, '_pages')
BACKUP_DIR = os.path.join(JEKYLL_DIR, '_backup_pages_removal')

# バックアップディレクトリの作成
os.makedirs(BACKUP_DIR, exist_ok=True)

def backup_pages_dir():
    """_pagesディレクトリをバックアップする"""
    if os.path.exists(PAGES_DIR):
        backup_path = os.path.join(BACKUP_DIR, '_pages')
        if os.path.exists(backup_path):
            shutil.rmtree(backup_path)
        shutil.copytree(PAGES_DIR, backup_path)
        print(f"ディレクトリバックアップ作成: {PAGES_DIR} -> {backup_path}")
    else:
        print(f"警告: {PAGES_DIR} が存在しません")

def remove_pages_dir():
    """_pagesディレクトリを削除する"""
    if os.path.exists(PAGES_DIR):
        shutil.rmtree(PAGES_DIR)
        print(f"ディレクトリ削除: {PAGES_DIR}")
    else:
        print(f"警告: {PAGES_DIR} が既に存在しません")

def main():
    """メイン処理"""
    print("_pagesディレクトリ完全削除を開始します...")
    
    # 1. _pagesディレクトリをバックアップ
    backup_pages_dir()
    
    # 2. _pagesディレクトリを削除
    remove_pages_dir()
    
    print("_pagesディレクトリの削除が完了しました。")
    print("次のコマンドでJekyllを再ビルドしてください:")
    print("cd /home/ubuntu/flatto-legal-site/jekyll-site && bundle exec jekyll build --trace")

if __name__ == "__main__":
    main()
