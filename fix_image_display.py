#!/usr/bin/env python3
"""
GitHub Pagesのキャッシュ問題を解決するためのスクリプト
作成日: 2025年6月6日
"""

import os
import re
import glob
import time
import random
import string

# 作業ディレクトリ
SITE_DIR = '/home/ubuntu/flatto-legal-site'

def add_cache_busting_parameter():
    """
    画像URLにキャッシュバスティングパラメータを追加
    """
    html_files = glob.glob(os.path.join(SITE_DIR, '*.html'))
    timestamp = int(time.time())
    
    for html_file in html_files:
        try:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 画像URLにタイムスタンプパラメータを追加
            modified_content = re.sub(
                r'(src="https://yasuyuki-shiozawa\.github\.io/flatto-legal-site/images/[^"]+)"',
                rf'\1?v={timestamp}"',
                content
            )
            
            # ファイルに書き戻す
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(modified_content)
                
            print(f"キャッシュバスティングパラメータを追加: {os.path.basename(html_file)}")
            
        except Exception as e:
            print(f"エラー: {html_file} の処理中にエラーが発生しました - {str(e)}")

def add_image_onload_handler():
    """
    画像の読み込みエラーを検出するためのonloadハンドラを追加
    """
    html_files = glob.glob(os.path.join(SITE_DIR, '*.html'))
    
    for html_file in html_files:
        try:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 画像にonloadとonerrorハンドラを追加
            modified_content = re.sub(
                r'(<img[^>]*src="https://yasuyuki-shiozawa\.github\.io/flatto-legal-site/images/[^"]+)"([^>]*>)',
                r'\1" onload="this.classList.add(\'loaded\')" onerror="this.classList.add(\'error\'); console.error(\'Image failed to load: \' + this.src)"\2',
                content
            )
            
            # ファイルに書き戻す
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(modified_content)
                
            print(f"画像読み込みハンドラを追加: {os.path.basename(html_file)}")
            
        except Exception as e:
            print(f"エラー: {html_file} の処理中にエラーが発生しました - {str(e)}")

def add_css_fallback():
    """
    画像が読み込めない場合のCSSフォールバックを追加
    """
    css_content = """
/* 画像読み込みエラー時のフォールバック */
img.error {
  position: relative;
  min-height: 100px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
}

img.error::after {
  content: attr(alt);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  color: #6c757d;
}

/* アイコン画像のフォールバック */
.feature-icon img.error,
.service-icon img.error,
.step-icon img.error {
  min-height: 80px;
  min-width: 80px;
  border-radius: 50%;
  background-color: #e9ecef;
}

/* 画像読み込み完了時のアニメーション */
img.loaded {
  animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
"""
    
    css_file = os.path.join(SITE_DIR, 'css', 'image-fallback.css')
    
    # CSSファイルを作成
    os.makedirs(os.path.dirname(css_file), exist_ok=True)
    with open(css_file, 'w', encoding='utf-8') as f:
        f.write(css_content)
    
    # すべてのHTMLファイルにCSSを追加
    html_files = glob.glob(os.path.join(SITE_DIR, '*.html'))
    
    for html_file in html_files:
        try:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # CSSリンクがまだ追加されていない場合のみ追加
            if '<link rel="stylesheet" href="css/image-fallback.css">' not in content:
                modified_content = content.replace(
                    '</head>',
                    '<link rel="stylesheet" href="css/image-fallback.css">\n</head>'
                )
                
                # ファイルに書き戻す
                with open(html_file, 'w', encoding='utf-8') as f:
                    f.write(modified_content)
                    
                print(f"フォールバックCSSを追加: {os.path.basename(html_file)}")
            
        except Exception as e:
            print(f"エラー: {html_file} の処理中にエラーが発生しました - {str(e)}")

def add_font_awesome():
    """
    Font Awesomeを追加し、一部のアイコンをFont Awesomeに置き換え
    """
    # すべてのHTMLファイルにFont Awesomeを追加
    html_files = glob.glob(os.path.join(SITE_DIR, '*.html'))
    
    for html_file in html_files:
        try:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Font Awesomeがまだ追加されていない場合のみ追加
            if 'fontawesome' not in content:
                modified_content = content.replace(
                    '</head>',
                    '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">\n</head>'
                )
                
                # ファイルに書き戻す
                with open(html_file, 'w', encoding='utf-8') as f:
                    f.write(modified_content)
                    
                print(f"Font Awesomeを追加: {os.path.basename(html_file)}")
            
        except Exception as e:
            print(f"エラー: {html_file} の処理中にエラーが発生しました - {str(e)}")

def main():
    """メイン処理"""
    print("画像表示問題の修正を開始します...")
    
    # キャッシュバスティングパラメータを追加
    add_cache_busting_parameter()
    
    # 画像の読み込みエラーを検出するためのonloadハンドラを追加
    add_image_onload_handler()
    
    # 画像が読み込めない場合のCSSフォールバックを追加
    add_css_fallback()
    
    # Font Awesomeを追加
    add_font_awesome()
    
    print("修正が完了しました。")

if __name__ == "__main__":
    main()
