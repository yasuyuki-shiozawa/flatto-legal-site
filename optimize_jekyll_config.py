#!/usr/bin/env python3
# Jekyll構成最適化スクリプト
# 作成日: 2025年6月7日

import os
import re
import shutil
import sys

# 設定
JEKYLL_DIR = '/home/ubuntu/flatto-legal-site/jekyll-site'
CONFIG_FILE = os.path.join(JEKYLL_DIR, '_config.yml')
PAGES_DIR = os.path.join(JEKYLL_DIR, '_pages')
BACKUP_DIR = os.path.join(JEKYLL_DIR, '_backup_final')

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

def optimize_config():
    """_config.ymlを最適化する"""
    backup_file(CONFIG_FILE)
    
    with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
        config_content = f.read()
    
    # collections設定を削除
    new_config_content = re.sub(
        r'# コレクション設定\s*\ncollections:.*?permalink:.*?\n\n',
        '',
        config_content,
        flags=re.DOTALL
    )
    
    # collections関連のdefaults設定を削除
    new_config_content = re.sub(
        r'  - scope:\s*\n\s*path: "_pages"\s*\n\s*type: "pages"\s*\n\s*values:.*?\n',
        '',
        new_config_content,
        flags=re.DOTALL
    )
    
    # includeディレクティブは維持
    if 'include:' not in new_config_content:
        new_config_content += '\n# インクルードディレクトリ\ninclude:\n  - _pages\n'
    
    # ファイルに書き戻す
    with open(CONFIG_FILE, 'w', encoding='utf-8') as f:
        f.write(new_config_content)
    
    print(f"設定ファイル最適化: {CONFIG_FILE}")

def standardize_front_matter():
    """各ページのFront Matterを標準化する"""
    page_files = [f for f in os.listdir(PAGES_DIR) if f.endswith('.md')]
    
    for page_file in page_files:
        file_path = os.path.join(PAGES_DIR, page_file)
        backup_file(file_path)
        
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Front Matterの抽出
        front_matter_match = re.search(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
        if not front_matter_match:
            print(f"警告: {file_path} にFront Matterが見つかりません")
            continue
        
        front_matter = front_matter_match.group(1)
        
        # レイアウト指定の確認と統一
        if 'layout:' not in front_matter:
            if page_file == 'index.md':
                front_matter += '\nlayout: home'
            else:
                front_matter += '\nlayout: page'
        
        # permalinkの確認と統一
        basename = os.path.splitext(page_file)[0]
        if basename == 'index':
            permalink = '/'
        else:
            permalink = f'/{basename}/'
        
        if 'permalink:' in front_matter:
            front_matter = re.sub(
                r'permalink:.*',
                f'permalink: {permalink}',
                front_matter
            )
        else:
            front_matter += f'\npermalink: {permalink}'
        
        # 修正したFront Matterでコンテンツを更新
        new_content = re.sub(
            r'^---\s*\n.*?\n---\s*\n',
            f'---\n{front_matter}\n---\n',
            content,
            flags=re.DOTALL
        )
        
        # ファイルに書き戻す
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"Front Matter標準化: {file_path}")

def main():
    """メイン処理"""
    print("Jekyll構成最適化を開始します...")
    
    # 1. 設定ファイルの最適化
    optimize_config()
    
    # 2. Front Matterの標準化
    standardize_front_matter()
    
    print("最適化が完了しました。")
    print("次のコマンドでJekyllを再ビルドしてください:")
    print("cd /home/ubuntu/flatto-legal-site/jekyll-site && bundle exec jekyll build --trace")

if __name__ == "__main__":
    main()
