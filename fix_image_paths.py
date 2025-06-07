#!/usr/bin/env python3
"""
画像パスを絶対パスに修正し、レイアウト問題を修正するスクリプト
作成日: 2025年6月6日
"""

import os
import re
import glob
import shutil
from datetime import datetime

# 作業ディレクトリ
SITE_DIR = '/home/ubuntu/flatto-legal-site'
BACKUP_DIR = '/home/ubuntu/flatto-legal-site/backups'

# GitHub Pagesのベースパス
GITHUB_BASE_URL = 'https://yasuyuki-shiozawa.github.io/flatto-legal-site'

def create_backup_directory():
    """バックアップディレクトリを作成"""
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_dir = os.path.join(BACKUP_DIR, f'backup_fix_{timestamp}')
    os.makedirs(backup_dir, exist_ok=True)
    return backup_dir

def backup_files(backup_dir):
    """HTMLファイルをバックアップ"""
    html_files = glob.glob(os.path.join(SITE_DIR, '*.html'))
    for src_file in html_files:
        if os.path.exists(src_file):
            dst_file = os.path.join(backup_dir, os.path.basename(src_file))
            shutil.copy2(src_file, dst_file)
            print(f"バックアップ作成: {os.path.basename(src_file)}")

def fix_image_paths(html_file):
    """HTMLファイル内の画像パスを絶対パスに修正"""
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # 画像パスを絶対パスに変更
        # 相対パス "images/xxx.jpg" を "https://yasuyuki-shiozawa.github.io/flatto-legal-site/images/xxx.jpg" に変更
        modified_content = re.sub(
            r'(src=")images/([^"]+)"', 
            rf'\1{GITHUB_BASE_URL}/images/\2"', 
            content
        )
        
        # CSSファイルへの参照を追加
        if '<link rel="stylesheet" href="css/image-fix.css">' not in modified_content:
            modified_content = modified_content.replace(
                '</head>',
                '<link rel="stylesheet" href="css/image-fix.css">\n</head>'
            )
        
        # ファイルに書き戻す
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(modified_content)
            
        print(f"画像パス修正完了: {os.path.basename(html_file)}")
        return True
    except Exception as e:
        print(f"エラー: {html_file} の処理中にエラーが発生しました - {str(e)}")
        return False

def fix_layout_issues(html_file):
    """HTMLファイル内のレイアウト問題を修正"""
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # セクション間の余白を調整するためのクラス追加
        modified_content = content
        
        # 見出しと本文の間隔を調整
        modified_content = re.sub(
            r'(<h[2-6][^>]*>)(.*?)(</h[2-6]>)',
            r'\1\2\3\n',
            modified_content
        )
        
        # テーブルのレスポンシブ対応
        modified_content = re.sub(
            r'(<table[^>]*>)',
            r'<div class="table-responsive">\n\1',
            modified_content
        )
        modified_content = re.sub(
            r'(</table>)',
            r'\1\n</div>',
            modified_content
        )
        
        # ファイルに書き戻す
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(modified_content)
            
        print(f"レイアウト修正完了: {os.path.basename(html_file)}")
        return True
    except Exception as e:
        print(f"エラー: {html_file} のレイアウト修正中にエラーが発生しました - {str(e)}")
        return False

def apply_fixes():
    """すべてのHTMLファイルに修正を適用"""
    # バックアップディレクトリを作成
    backup_dir = create_backup_directory()
    backup_files(backup_dir)
    
    # HTMLファイルを取得
    html_files = glob.glob(os.path.join(SITE_DIR, '*.html'))
    
    # 各ファイルに修正を適用
    for html_file in html_files:
        fix_image_paths(html_file)
        fix_layout_issues(html_file)
        
    print(f"\nすべてのファイルの修正が完了しました。バックアップは {backup_dir} に保存されています。")

if __name__ == "__main__":
    # バックアップディレクトリが存在しない場合は作成
    if not os.path.exists(BACKUP_DIR):
        os.makedirs(BACKUP_DIR)
        
    apply_fixes()
