#!/usr/bin/env python3
"""
メインコンテンツ復元スクリプト
作成日: 2025年6月7日

このスクリプトは、HTMLファイルのメインコンテンツが消失または破損している場合に、
バックアップからコンテンツを復元するためのものです。
"""

import os
import re
import glob
import shutil
from datetime import datetime

# 作業ディレクトリ
SITE_DIR = '/home/ubuntu/flatto-legal-site'
BACKUP_DIR = '/home/ubuntu/flatto-legal-backup'
TEMP_BACKUP_DIR = os.path.join(SITE_DIR, 'backups', datetime.now().strftime('%Y%m%d_%H%M%S'))

# 対象ページ
TARGET_PAGES = [
    'service.html',
    'flow.html',
    'knowhow.html',
    'cases.html',
    'about.html',
    'contact.html',
    'links.html',
    'dictionary.html',
    'blog.html'
]

def create_backup():
    """現在のファイルをバックアップ"""
    print(f"現在のファイルをバックアップします: {TEMP_BACKUP_DIR}")
    os.makedirs(TEMP_BACKUP_DIR, exist_ok=True)
    
    for page in TARGET_PAGES:
        src_path = os.path.join(SITE_DIR, page)
        if os.path.exists(src_path):
            dst_path = os.path.join(TEMP_BACKUP_DIR, page)
            shutil.copy2(src_path, dst_path)
            print(f"バックアップ作成: {page}")

def analyze_content():
    """各ページのコンテンツを分析"""
    print("\n各ページのコンテンツを分析します...")
    results = {}
    
    for page in TARGET_PAGES:
        current_path = os.path.join(SITE_DIR, page)
        backup_path = os.path.join(BACKUP_DIR, page)
        
        if not os.path.exists(current_path):
            results[page] = {
                "status": "missing",
                "message": "ファイルが存在しません"
            }
            continue
            
        if not os.path.exists(backup_path):
            results[page] = {
                "status": "no_backup",
                "message": "バックアップが存在しません"
            }
            continue
        
        # 現在のファイルを読み込み
        with open(current_path, 'r', encoding='utf-8') as f:
            current_content = f.read()
        
        # バックアップファイルを読み込み
        with open(backup_path, 'r', encoding='utf-8') as f:
            backup_content = f.read()
        
        # メインコンテンツを抽出
        current_main = extract_main_content(current_content)
        backup_main = extract_main_content(backup_content)
        
        if not current_main:
            results[page] = {
                "status": "missing_main",
                "message": "メインコンテンツが見つかりません",
                "backup_available": bool(backup_main)
            }
        elif len(current_main) < 100:  # 短すぎるコンテンツは不完全と判断
            results[page] = {
                "status": "incomplete_main",
                "message": f"メインコンテンツが不完全です (長さ: {len(current_main)}文字)",
                "backup_available": bool(backup_main),
                "backup_length": len(backup_main) if backup_main else 0
            }
        else:
            results[page] = {
                "status": "ok",
                "message": "メインコンテンツは正常です",
                "current_length": len(current_main),
                "backup_length": len(backup_main) if backup_main else 0
            }
    
    return results

def extract_main_content(html_content):
    """HTMLからメインコンテンツを抽出"""
    # mainタグ内のコンテンツを抽出
    main_match = re.search(r'<main[^>]*>(.*?)</main>', html_content, re.DOTALL)
    if main_match:
        return main_match.group(1).strip()
    return ""

def restore_content(analysis_results):
    """バックアップからコンテンツを復元"""
    print("\nコンテンツを復元します...")
    restored_pages = []
    
    for page, result in analysis_results.items():
        if result["status"] in ["missing", "missing_main", "incomplete_main"] and result.get("backup_available", False):
            current_path = os.path.join(SITE_DIR, page)
            backup_path = os.path.join(BACKUP_DIR, page)
            
            # バックアップファイルを読み込み
            with open(backup_path, 'r', encoding='utf-8') as f:
                backup_content = f.read()
            
            backup_main = extract_main_content(backup_content)
            
            if not backup_main:
                print(f"警告: {page} のバックアップにもメインコンテンツがありません")
                continue
            
            if os.path.exists(current_path):
                # 現在のファイルを読み込み
                with open(current_path, 'r', encoding='utf-8') as f:
                    current_content = f.read()
                
                # メインコンテンツを置換
                if '<main' in current_content and '</main>' in current_content:
                    new_content = re.sub(
                        r'<main[^>]*>.*?</main>',
                        f'<main>{backup_main}</main>',
                        current_content,
                        flags=re.DOTALL
                    )
                else:
                    # mainタグがない場合は、bodyタグの直後に挿入
                    new_content = re.sub(
                        r'(<body[^>]*>)',
                        r'\1\n    <main>\n        ' + backup_main + '\n    </main>',
                        current_content
                    )
            else:
                # ファイルが存在しない場合はバックアップをコピー
                new_content = backup_content
            
            # 修正したコンテンツを書き込み
            with open(current_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            print(f"復元完了: {page}")
            restored_pages.append(page)
    
    return restored_pages

def fix_html_structure():
    """HTMLの構造を修正"""
    print("\nHTMLの構造を修正します...")
    
    for page in TARGET_PAGES:
        file_path = os.path.join(SITE_DIR, page)
        if not os.path.exists(file_path):
            continue
        
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 閉じタグの修正
        content = re.sub(r'<([a-z]+)[^>]*>([^<]*)', r'<\1>\2', content)
        
        # 不要なdivの閉じタグを修正
        content = re.sub(r'(<div[^>]*>)([^<]*)(</div>){2,}', r'\1\2</div>', content)
        
        # mainタグの修正
        if '<main>' in content and '</main>' not in content:
            content = content.replace('<main>', '<main></main>')
        
        # 書き込み
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"構造修正: {page}")

def ensure_css_links():
    """必要なCSSリンクが含まれていることを確認"""
    print("\n必要なCSSリンクを確認します...")
    
    required_css = [
        '<link rel="stylesheet" href="css/unified-layout.css">',
        '<link rel="stylesheet" href="css/inline-icons.css">',
        '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">'
    ]
    
    for page in TARGET_PAGES:
        file_path = os.path.join(SITE_DIR, page)
        if not os.path.exists(file_path):
            continue
        
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        modified = False
        
        # headタグを探す
        head_match = re.search(r'<head[^>]*>(.*?)</head>', content, re.DOTALL)
        if head_match:
            head_content = head_match.group(1)
            new_head_content = head_content
            
            for css in required_css:
                if css not in head_content:
                    new_head_content += f'\n    {css}'
                    modified = True
            
            if modified:
                content = content.replace(head_content, new_head_content)
                
                # 書き込み
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                print(f"CSSリンク追加: {page}")

def ensure_js_links():
    """必要なJSリンクが含まれていることを確認"""
    print("\n必要なJSリンクを確認します...")
    
    required_js = [
        '<script src="js/image-fallback.js"></script>'
    ]
    
    for page in TARGET_PAGES:
        file_path = os.path.join(SITE_DIR, page)
        if not os.path.exists(file_path):
            continue
        
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        modified = False
        
        # bodyの閉じタグを探す
        body_end_match = re.search(r'</body>', content)
        if body_end_match:
            for js in required_js:
                if js not in content:
                    # bodyの閉じタグの前にJSを挿入
                    content = content.replace('</body>', f'  {js}\n  </body>')
                    modified = True
            
            if modified:
                # 書き込み
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                print(f"JSリンク追加: {page}")

def main():
    """メイン処理"""
    print("メインコンテンツ復元スクリプトを開始します...")
    
    # 現在のファイルをバックアップ
    create_backup()
    
    # コンテンツを分析
    analysis_results = analyze_content()
    
    # 分析結果を表示
    print("\n=== コンテンツ分析結果 ===")
    for page, result in analysis_results.items():
        print(f"{page}: {result['status']} - {result['message']}")
    
    # コンテンツを復元
    restored_pages = restore_content(analysis_results)
    
    # HTMLの構造を修正
    fix_html_structure()
    
    # 必要なCSSリンクを確認
    ensure_css_links()
    
    # 必要なJSリンクを確認
    ensure_js_links()
    
    print("\nメインコンテンツ復元スクリプトが完了しました。")
    if restored_pages:
        print(f"復元したページ: {', '.join(restored_pages)}")
    else:
        print("復元が必要なページはありませんでした。")

if __name__ == "__main__":
    main()
