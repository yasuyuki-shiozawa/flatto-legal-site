#!/usr/bin/env python3
# CSS・JavaScript最適化スクリプト
# 作成日: 2025年6月7日

import os
import shutil
import re
import csscompressor

# 設定
SOURCE_DIR = '/home/ubuntu/flatto-legal-site'
TARGET_CSS_DIR = '/home/ubuntu/flatto-legal-site/jekyll-site/assets/css'
TARGET_JS_DIR = '/home/ubuntu/flatto-legal-site/jekyll-site/assets/js'

# ディレクトリの作成
os.makedirs(TARGET_CSS_DIR, exist_ok=True)
os.makedirs(TARGET_JS_DIR, exist_ok=True)

# CSSファイルの最適化
def optimize_css(source_path, target_path):
    try:
        with open(source_path, 'r', encoding='utf-8') as f:
            css_content = f.read()
        
        # 相対パスの修正（画像パスをJekyll形式に）
        css_content = re.sub(
            r'url\([\'"]?(?:\.\.\/)?images\/([^\'"]+)[\'"]?\)',
            r'url("{{ "/assets/images/\1" | relative_url }}")',
            css_content
        )
        
        # CSSの圧縮
        try:
            compressed_css = csscompressor.compress(css_content)
        except:
            # csscompressorがインストールされていない場合は圧縮せずに保存
            compressed_css = css_content
        
        with open(target_path, 'w', encoding='utf-8') as f:
            f.write(compressed_css)
            
        print(f"CSSファイル最適化: {os.path.basename(source_path)} -> {os.path.basename(target_path)}")
    except Exception as e:
        print(f"エラー: {source_path} の処理中に問題が発生しました - {e}")
        # エラーが発生した場合はそのままコピー
        shutil.copy2(source_path, target_path)

# JavaScriptファイルの最適化
def optimize_js(source_path, target_path):
    try:
        with open(source_path, 'r', encoding='utf-8') as f:
            js_content = f.read()
        
        # コメント削除（複数行コメント）
        js_content = re.sub(r'/\*[\s\S]*?\*/', '', js_content)
        # コメント削除（単一行コメント、ただし正規表現内は除外）
        js_content = re.sub(r'(?<!:)//.*$', '', js_content, flags=re.MULTILINE)
        # 連続する空白の削除
        js_content = re.sub(r'\s{2,}', ' ', js_content)
        # 行頭・行末の空白削除
        js_content = re.sub(r'^\s+|\s+$', '', js_content, flags=re.MULTILINE)
        # 空行の削除
        js_content = re.sub(r'\n\s*\n', '\n', js_content)
        
        with open(target_path, 'w', encoding='utf-8') as f:
            f.write(js_content)
            
        print(f"JSファイル最適化: {os.path.basename(source_path)} -> {os.path.basename(target_path)}")
    except Exception as e:
        print(f"エラー: {source_path} の処理中に問題が発生しました - {e}")
        # エラーが発生した場合はそのままコピー
        shutil.copy2(source_path, target_path)

# CSSファイルの収集と最適化
def process_css_files():
    css_files = []
    
    # CSSファイルの検索
    for root, _, files in os.walk(SOURCE_DIR):
        for file in files:
            if file.lower().endswith('.css') and 'jekyll-site' not in root:
                source_path = os.path.join(root, file)
                css_files.append(source_path)
    
    # CSSファイルの最適化
    for source_path in css_files:
        file_name = os.path.basename(source_path)
        target_path = os.path.join(TARGET_CSS_DIR, file_name)
        optimize_css(source_path, target_path)
    
    return len(css_files)

# JavaScriptファイルの収集と最適化
def process_js_files():
    js_files = []
    
    # JSファイルの検索
    for root, _, files in os.walk(SOURCE_DIR):
        for file in files:
            if file.lower().endswith('.js') and 'jekyll-site' not in root:
                source_path = os.path.join(root, file)
                js_files.append(source_path)
    
    # JSファイルの最適化
    for source_path in js_files:
        file_name = os.path.basename(source_path)
        target_path = os.path.join(TARGET_JS_DIR, file_name)
        optimize_js(source_path, target_path)
    
    return len(js_files)

# メインスクリプト
if __name__ == "__main__":
    print("CSS・JavaScript最適化を開始します...")
    
    css_count = process_css_files()
    js_count = process_js_files()
    
    print(f"完了！合計{css_count}個のCSSファイルと{js_count}個のJavaScriptファイルを最適化しました。")
    print(f"最適化されたCSSファイルは {TARGET_CSS_DIR} に保存されました。")
    print(f"最適化されたJavaScriptファイルは {TARGET_JS_DIR} に保存されました。")
