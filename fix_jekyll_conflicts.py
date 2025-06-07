#!/usr/bin/env python3
# Jekyll競合解消スクリプト
# 作成日: 2025年6月7日

import os
import re
import shutil
import sys

# 設定
JEKYLL_DIR = '/home/ubuntu/flatto-legal-site/jekyll-site'
PAGES_DIR = os.path.join(JEKYLL_DIR, '_pages')
CONFIG_FILE = os.path.join(JEKYLL_DIR, '_config.yml')
BACKUP_DIR = os.path.join(JEKYLL_DIR, '_backup')

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

def fix_front_matter(file_path):
    """Front Matterを修正する"""
    if not os.path.exists(file_path):
        print(f"エラー: {file_path} が存在しません")
        return False
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Front Matterの抽出
    front_matter_match = re.search(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
    if not front_matter_match:
        print(f"警告: {file_path} にFront Matterが見つかりません")
        return False
    
    front_matter = front_matter_match.group(1)
    
    # permalinkの修正
    basename = os.path.splitext(os.path.basename(file_path))[0]
    if basename == 'index':
        new_permalink = '/'
    else:
        new_permalink = f'/{basename}/'
    
    # permalinkの置換または追加
    if re.search(r'^\s*permalink:', front_matter, re.MULTILINE):
        new_front_matter = re.sub(
            r'^\s*permalink:.*$', 
            f'permalink: {new_permalink}', 
            front_matter, 
            flags=re.MULTILINE
        )
    else:
        new_front_matter = front_matter + f'\npermalink: {new_permalink}'
    
    # 修正したFront Matterでコンテンツを更新
    new_content = re.sub(
        r'^---\s*\n.*?\n---\s*\n', 
        f'---\n{new_front_matter}\n---\n', 
        content, 
        flags=re.DOTALL
    )
    
    # ファイルに書き戻す
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Front Matter修正: {file_path} (permalink: {new_permalink})")
    return True

def update_config_file():
    """_config.ymlを更新する"""
    backup_file(CONFIG_FILE)
    
    with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
        config_content = f.read()
    
    # collections設定の修正
    new_config_content = re.sub(
        r'collections:\s*\n\s*pages:\s*\n\s*output:\s*true\s*\n\s*permalink:.*?\n',
        'collections:\n  pages:\n    output: true\n',
        config_content
    )
    
    # includeディレクティブの確認と修正
    if 'include:' not in new_config_content:
        new_config_content += '\n# インクルードディレクトリ\ninclude:\n  - _pages\n'
    elif '_pages' not in new_config_content:
        new_config_content = re.sub(
            r'include:\s*\n',
            'include:\n  - _pages\n',
            new_config_content
        )
    
    # ファイルに書き戻す
    with open(CONFIG_FILE, 'w', encoding='utf-8') as f:
        f.write(new_config_content)
    
    print(f"設定ファイル更新: {CONFIG_FILE}")

def main():
    """メイン処理"""
    print("Jekyll競合解消処理を開始します...")
    
    # 1. 設定ファイルの更新
    update_config_file()
    
    # 2. 各ページのFront Matter修正
    page_files = [f for f in os.listdir(PAGES_DIR) if f.endswith('.md')]
    for page_file in page_files:
        file_path = os.path.join(PAGES_DIR, page_file)
        backup_file(file_path)
        fix_front_matter(file_path)
    
    print("処理が完了しました。")
    print("次のコマンドでJekyllを再ビルドしてください:")
    print("cd /home/ubuntu/flatto-legal-site/jekyll-site && bundle exec jekyll build --trace")

if __name__ == "__main__":
    main()
