#!/usr/bin/env python3
# Jekyll構造変更スクリプト - _pagesディレクトリ廃止
# 作成日: 2025年6月7日

import os
import re
import shutil
import sys

# 設定
JEKYLL_DIR = '/home/ubuntu/flatto-legal-site/jekyll-site'
PAGES_DIR = os.path.join(JEKYLL_DIR, '_pages')
CONFIG_FILE = os.path.join(JEKYLL_DIR, '_config.yml')
BACKUP_DIR = os.path.join(JEKYLL_DIR, '_backup_restructure')

# バックアップディレクトリの作成
os.makedirs(BACKUP_DIR, exist_ok=True)

def backup_file(file_path):
    """ファイルをバックアップする"""
    if os.path.exists(file_path):
        backup_path = os.path.join(BACKUP_DIR, os.path.basename(file_path))
        shutil.copy2(file_path, backup_path)
        print(f"バックアップ作成: {file_path} -> {backup_path}")
    else:
        print(f"警告: {file_path} が存在しません")

def move_pages_to_root():
    """_pagesディレクトリのファイルをルートに移動する"""
    if not os.path.exists(PAGES_DIR):
        print(f"エラー: {PAGES_DIR} が存在しません")
        return False
    
    page_files = [f for f in os.listdir(PAGES_DIR) if f.endswith('.md')]
    
    for page_file in page_files:
        source_path = os.path.join(PAGES_DIR, page_file)
        target_path = os.path.join(JEKYLL_DIR, page_file)
        
        # 既存ファイルのバックアップ
        if os.path.exists(target_path):
            backup_file(target_path)
        
        # ファイルの移動
        shutil.copy2(source_path, target_path)
        print(f"ファイル移動: {source_path} -> {target_path}")
    
    return True

def update_config():
    """_config.ymlを更新する"""
    backup_file(CONFIG_FILE)
    
    with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
        config_content = f.read()
    
    # includeディレクティブから_pagesを削除
    new_config_content = re.sub(
        r'include:\s*\n\s*-\s*_pages\s*\n',
        'include:\n',
        config_content
    )
    
    # ファイルに書き戻す
    with open(CONFIG_FILE, 'w', encoding='utf-8') as f:
        f.write(new_config_content)
    
    print(f"設定ファイル更新: {CONFIG_FILE}")

def main():
    """メイン処理"""
    print("Jekyll構造変更を開始します...")
    
    # 1. _pagesディレクトリのファイルをルートに移動
    if move_pages_to_root():
        # 2. 設定ファイルの更新
        update_config()
    
    print("構造変更が完了しました。")
    print("次のコマンドでJekyllを再ビルドしてください:")
    print("cd /home/ubuntu/flatto-legal-site/jekyll-site && bundle exec jekyll build --trace")

if __name__ == "__main__":
    main()
