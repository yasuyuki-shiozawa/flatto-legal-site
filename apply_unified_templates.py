#!/usr/bin/env python3
"""
統一ヘッダー・フッターテンプレートを全ページに適用するスクリプト
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

# テンプレートファイル
HEADER_TEMPLATE = os.path.join(SITE_DIR, 'header-template-unified.html')
FOOTER_TEMPLATE = os.path.join(SITE_DIR, 'footer-template-unified.html')

# 対象ページ
PAGES = [
    {'file': 'index.html', 'title': 'ホーム', 'heading': 'ふらっと法務事務所', 'description': '中小企業の入札参加をトータルサポート', 'active': 'ACTIVE_HOME'},
    {'file': 'service.html', 'title': 'サービス紹介', 'heading': 'サービス紹介', 'description': '入札参加に必要なサポートをワンストップで提供', 'active': 'ACTIVE_SERVICE'},
    {'file': 'flow.html', 'title': 'ご利用の流れ', 'heading': 'ご利用の流れ', 'description': '初めての方でも安心のステップバイステップガイド', 'active': 'ACTIVE_FLOW'},
    {'file': 'knowhow.html', 'title': '入札ノウハウ', 'heading': '入札ノウハウ', 'description': '入札成功のための専門知識と実践テクニック', 'active': 'ACTIVE_KNOWHOW'},
    {'file': 'cases.html', 'title': '成功事例', 'heading': '成功事例', 'description': 'ふらっと法務事務所が支援した入札成功事例のご紹介', 'active': 'ACTIVE_CASES'},
    {'file': 'blog.html', 'title': '案件紹介', 'heading': '案件紹介', 'description': 'ふらっと法務事務所が手がけた入札案件をご紹介します', 'active': 'ACTIVE_BLOG'},
    {'file': 'about.html', 'title': '会社案内', 'heading': '会社案内', 'description': 'ふらっと法務事務所の概要と入札サポートへの取り組み', 'active': 'ACTIVE_ABOUT'},
    {'file': 'contact.html', 'title': 'お問い合わせ', 'heading': 'お問い合わせ', 'description': '入札に関するご相談・お問い合わせはこちらから', 'active': 'ACTIVE_CONTACT'},
    {'file': 'links.html', 'title': 'リンク集', 'heading': 'リンク集', 'description': '入札に役立つ公式サイトや関連情報へのリンク', 'active': 'ACTIVE_LINKS'},
    {'file': 'dictionary.html', 'title': '入札用語集', 'heading': '入札用語集', 'description': '入札に関する専門用語をわかりやすく解説', 'active': 'ACTIVE_DICTIONARY'},
]

def create_backup_directory():
    """バックアップディレクトリを作成"""
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_dir = os.path.join(BACKUP_DIR, f'backup_{timestamp}')
    os.makedirs(backup_dir, exist_ok=True)
    return backup_dir

def backup_files(backup_dir):
    """HTMLファイルをバックアップ"""
    for page in PAGES:
        src_file = os.path.join(SITE_DIR, page['file'])
        if os.path.exists(src_file):
            dst_file = os.path.join(backup_dir, page['file'])
            shutil.copy2(src_file, dst_file)
            print(f"バックアップ作成: {page['file']}")

def extract_main_content(html_file):
    """HTMLファイルからメインコンテンツを抽出"""
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # ヘッダーとフッターの間のコンテンツを抽出
        # 様々なパターンに対応するため、複数の正規表現を試す
        patterns = [
            r'<main[^>]*>(.*?)</main>',  # <main>タグがある場合
            r'<div\s+class="[^"]*main[^"]*"[^>]*>(.*?)</div>',  # mainというクラス名を含むdivがある場合
            r'<body[^>]*>.*?<header.*?</header>(.*?)<footer',  # ヘッダーとフッターの間
            r'<body[^>]*>(.*?)</body>'  # 最終手段としてbodyの中身全部
        ]
        
        for pattern in patterns:
            match = re.search(pattern, content, re.DOTALL)
            if match:
                return match.group(1).strip()
        
        # どのパターンにもマッチしない場合は、単純にbodyタグの内容を返す
        body_match = re.search(r'<body[^>]*>(.*?)</body>', content, re.DOTALL)
        if body_match:
            return body_match.group(1).strip()
            
        return ""
    except Exception as e:
        print(f"エラー: {html_file} の処理中にエラーが発生しました - {str(e)}")
        return ""

def extract_additional_css(html_file):
    """HTMLファイルから追加のCSSリンクを抽出"""
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # head内のlinkタグを抽出
        head_match = re.search(r'<head[^>]*>(.*?)</head>', content, re.DOTALL)
        if not head_match:
            return ""
            
        head_content = head_match.group(1)
        
        # unified-layout.css以外のCSSリンクを抽出
        css_links = re.findall(r'<link[^>]*rel="stylesheet"[^>]*href="([^"]*\.css)"[^>]*>', head_content)
        additional_css = []
        
        for link in css_links:
            if 'unified-layout.css' not in link and 'font-awesome' not in link and 'googleapis.com' not in link:
                additional_css.append(f'<link rel="stylesheet" href="{link}">')
                
        return '\n    '.join(additional_css)
    except Exception as e:
        print(f"エラー: {html_file} のCSS抽出中にエラーが発生しました - {str(e)}")
        return ""

def extract_additional_scripts(html_file):
    """HTMLファイルから追加のスクリプトを抽出"""
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # scriptタグを抽出
        scripts = re.findall(r'<script[^>]*src="([^"]*)"[^>]*></script>', content)
        additional_scripts = []
        
        for script in scripts:
            additional_scripts.append(f'<script src="{script}"></script>')
            
        # インラインスクリプトも抽出（ただし統一テンプレートのものと重複しないよう注意）
        inline_scripts = re.findall(r'<script[^>]*>(.*?)</script>', content, re.DOTALL)
        for script in inline_scripts:
            # モバイルメニュー、アコーディオン、タブ機能のスクリプトは除外
            if 'mobile-nav-toggle' not in script and 'accordion-header' not in script and 'tab-nav-link' not in script:
                additional_scripts.append(f'<script>{script}</script>')
                
        return '\n    '.join(additional_scripts)
    except Exception as e:
        print(f"エラー: {html_file} のスクリプト抽出中にエラーが発生しました - {str(e)}")
        return ""

def apply_templates():
    """テンプレートを全ページに適用"""
    # ヘッダーテンプレートを読み込む
    with open(HEADER_TEMPLATE, 'r', encoding='utf-8') as f:
        header_template = f.read()
        
    # フッターテンプレートを読み込む
    with open(FOOTER_TEMPLATE, 'r', encoding='utf-8') as f:
        footer_template = f.read()
        
    # バックアップディレクトリを作成
    backup_dir = create_backup_directory()
    backup_files(backup_dir)
    
    # 各ページにテンプレートを適用
    for page in PAGES:
        file_path = os.path.join(SITE_DIR, page['file'])
        if not os.path.exists(file_path):
            print(f"警告: {page['file']} が見つかりません。スキップします。")
            continue
            
        # メインコンテンツを抽出
        main_content = extract_main_content(file_path)
        if not main_content:
            print(f"警告: {page['file']} からメインコンテンツを抽出できませんでした。スキップします。")
            continue
            
        # 追加のCSSとスクリプトを抽出
        additional_css = extract_additional_css(file_path)
        additional_scripts = extract_additional_scripts(file_path)
        
        # アクティブなナビゲーション項目を設定
        active_nav = page['active']
        header_with_active = header_template
        for p in PAGES:
            active_placeholder = p['active']
            if active_placeholder == active_nav:
                header_with_active = header_with_active.replace(f'{{{{{active_placeholder}}}}}', 'active')
            else:
                header_with_active = header_with_active.replace(f'{{{{{active_placeholder}}}}}', '')
                
        # その他のプレースホルダーを置換
        header_with_active = header_with_active.replace('{{PAGE_TITLE}}', page['title'])
        header_with_active = header_with_active.replace('{{PAGE_HEADING}}', page['heading'])
        header_with_active = header_with_active.replace('{{PAGE_DESCRIPTION}}', page['description'])
        header_with_active = header_with_active.replace('{{ADDITIONAL_CSS}}', additional_css)
        
        # フッターのプレースホルダーを置換
        footer_with_scripts = footer_template.replace('{{ADDITIONAL_SCRIPTS}}', additional_scripts)
        
        # 新しいHTMLファイルを作成
        new_html = f"{header_with_active}\n    <div class=\"container section\">\n        {main_content}\n    </div>\n{footer_with_scripts}"
        
        # ファイルに書き込む
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_html)
            
        print(f"テンプレート適用完了: {page['file']}")
        
    print(f"\nすべてのページにテンプレートを適用しました。バックアップは {backup_dir} に保存されています。")

if __name__ == "__main__":
    # バックアップディレクトリが存在しない場合は作成
    if not os.path.exists(BACKUP_DIR):
        os.makedirs(BACKUP_DIR)
        
    apply_templates()
