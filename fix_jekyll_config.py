#!/usr/bin/env python3
# Jekyll設定修正スクリプト - includeを空配列に設定
# 作成日: 2025年6月7日

import os
import re
import shutil
import sys

# 設定
JEKYLL_DIR = '/home/ubuntu/flatto-legal-site/jekyll-site'
CONFIG_FILE = os.path.join(JEKYLL_DIR, '_config.yml')
BACKUP_DIR = os.path.join(JEKYLL_DIR, '_backup_config_fix')

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

def fix_config():
    """_config.ymlのincludeを空配列に修正する"""
    backup_file(CONFIG_FILE)
    
    with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
        config_content = f.read()
    
    # includeディレクティブを空配列に修正
    if 'include:' in config_content:
        new_config_content = re.sub(
            r'include:\s*\n',
            'include: []\n',
            config_content
        )
    else:
        # includeディレクティブがない場合は追加
        new_config_content = config_content + '\n# インクルードディレクトリ\ninclude: []\n'
    
    # ファイルに書き戻す
    with open(CONFIG_FILE, 'w', encoding='utf-8') as f:
        f.write(new_config_content)
    
    print(f"設定ファイル修正: {CONFIG_FILE}")

def main():
    """メイン処理"""
    print("Jekyll設定修正を開始します...")
    
    # _config.ymlのincludeを空配列に修正
    fix_config()
    
    print("設定修正が完了しました。")
    print("次のコマンドでJekyllを再ビルドしてください:")
    print("cd /home/ubuntu/flatto-legal-site/jekyll-site && bundle exec jekyll build --trace")

if __name__ == "__main__":
    main()
