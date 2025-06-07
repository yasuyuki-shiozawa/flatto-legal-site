#!/usr/bin/env python3
"""
アイコン画像のフォールバック強化スクリプト
作成日: 2025年6月7日
"""

import os
import re
import glob
import shutil
from PIL import Image, ImageDraw, ImageFont
import hashlib
from datetime import datetime

# 作業ディレクトリ
SITE_DIR = '/home/ubuntu/flatto-legal-site'
IMAGES_DIR = os.path.join(SITE_DIR, 'images')
CSS_DIR = os.path.join(SITE_DIR, 'css')

# アイコン画像の設定
ICON_SIZE = (64, 64)
ICON_BG_COLOR = "#f8f9fa"
ICON_TEXT_COLOR = "#1a4b84"
ICON_BORDER_COLOR = "#dee2e6"

def generate_icon_images():
    """アイコン画像を生成"""
    print("アイコン画像の生成を開始します...")
    
    # 生成するアイコンのリスト
    icons_to_generate = [
        {"name": "icon-knowledge.png", "text": "知識"},
        {"name": "icon-support.png", "text": "サポート"},
        {"name": "icon-achievement.png", "text": "実績"},
        {"name": "industry-construction.png", "text": "建設"},
        {"name": "industry-manufacturing.png", "text": "製造"},
        {"name": "industry-it.png", "text": "IT"},
        {"name": "industry-service.png", "text": "サービス"},
        {"name": "industry-transport.png", "text": "運送"},
        {"name": "industry-retail.png", "text": "小売"},
        {"name": "industry-food.png", "text": "飲食"},
        {"name": "industry-other.png", "text": "その他"}
    ]
    
    for icon in icons_to_generate:
        icon_path = os.path.join(IMAGES_DIR, icon["name"])
        
        # 画像を生成
        img = Image.new('RGBA', ICON_SIZE, ICON_BG_COLOR)
        draw = ImageDraw.Draw(img)
        
        # 円を描画
        draw.ellipse([(2, 2), (ICON_SIZE[0]-2, ICON_SIZE[1]-2)], outline=ICON_BORDER_COLOR, width=1)
        
        # テキストを描画
        try:
            # フォントが利用可能な場合
            font = ImageFont.truetype("DejaVuSans.ttf", 16)
        except IOError:
            # フォントが利用できない場合はデフォルトフォント
            font = ImageFont.load_default()
        
        # テキストの位置を計算（中央揃え）
        text = icon["text"]
        text_width, text_height = draw.textsize(text, font=font) if hasattr(draw, 'textsize') else (16, 16)
        position = ((ICON_SIZE[0] - text_width) // 2, (ICON_SIZE[1] - text_height) // 2)
        
        # テキストを描画
        draw.text(position, text, fill=ICON_TEXT_COLOR, font=font)
        
        # 画像を保存
        img.save(icon_path, format='PNG')
        
        print(f"アイコン画像を生成しました: {icon['name']}")

def enhance_font_awesome_fallbacks():
    """Font Awesomeフォールバックを強化"""
    print("Font Awesomeフォールバックを強化します...")
    
    css_path = os.path.join(CSS_DIR, 'font-awesome-fallback.css')
    
    # 既存のCSSファイルを読み込み
    with open(css_path, 'r', encoding='utf-8') as f:
        css_content = f.read()
    
    # フォールバック表示の強化
    enhanced_css = """/* Font Awesomeフォールバック強化 */
.image-fallback {
    display: inline-block;
    text-align: center;
    font-size: 2rem;
    width: 64px;
    height: 64px;
    line-height: 64px;
    color: #1a4b84;
    background-color: #f8f9fa;
    border-radius: 50%;
    margin-bottom: 1rem;
    border: 1px solid #dee2e6;
}

/* 特定のアイコンのフォールバック */
.icon-knowledge-fallback::before {
    content: "\\f02d"; /* 本のアイコン */
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
}

.icon-support-fallback::before {
    content: "\\f4c4"; /* サポートアイコン */
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
}

.icon-achievement-fallback::before {
    content: "\\f091"; /* トロフィーアイコン */
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
}

/* 業種アイコンのフォールバック */
.industry-construction-fallback::before {
    content: "\\f1ad"; /* 建物アイコン */
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
}

.industry-manufacturing-fallback::before {
    content: "\\f0e7"; /* 工場アイコン */
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
}

.industry-it-fallback::before {
    content: "\\f109"; /* パソコンアイコン */
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
}

.industry-service-fallback::before {
    content: "\\f2b5"; /* サービスアイコン */
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
}

.industry-transport-fallback::before {
    content: "\\f207"; /* トラックアイコン */
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
}

.industry-retail-fallback::before {
    content: "\\f290"; /* ショッピングバッグアイコン */
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
}

.industry-food-fallback::before {
    content: "\\f2e7"; /* 食事アイコン */
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
}

.industry-other-fallback::before {
    content: "\\f0c8"; /* その他アイコン */
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
}

/* 画像読み込みエラー時のフォールバック表示 - 強化版 */
img.error + .image-fallback {
    display: inline-block !important;
}

img:not(.error) + .image-fallback {
    display: none !important;
}

/* アイコンプレースホルダーのスタイル */
.icon-placeholder {
    display: inline-block;
    width: 64px;
    height: 64px;
    background-color: #f8f9fa;
    border-radius: 50%;
    text-align: center;
    line-height: 64px;
    color: #1a4b84;
    font-weight: bold;
    border: 1px solid #dee2e6;
    margin-bottom: 1rem;
}

/* 特徴セクションのアイコン強制表示 */
.feature-icon {
    display: block !important;
    margin: 0 auto 1rem auto;
    width: 64px;
    height: 64px;
}

/* 業種アイコンの強制表示 */
.industry-icon {
    display: block !important;
    margin: 0 auto 1rem auto;
    width: 64px;
    height: 64px;
}
"""
    
    # CSSファイルに書き込み
    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(enhanced_css)
    
    print(f"Font Awesomeフォールバックを強化しました: {css_path}")

def update_html_with_enhanced_fallbacks():
    """HTMLファイルにフォールバック強化を適用"""
    print("HTMLファイルにフォールバック強化を適用します...")
    
    html_files = glob.glob(os.path.join(SITE_DIR, '*.html'))
    
    for html_file in html_files:
        try:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 特徴セクションのアイコンにクラスを追加
            content = re.sub(
                r'(<img[^>]*icon-(knowledge|support|achievement)\.png[^>]*>)',
                r'\1<div class="image-fallback icon-\2-fallback"></div>',
                content
            )
            
            # 業種アイコンにクラスを追加
            content = re.sub(
                r'(<img[^>]*industry-(construction|manufacturing|it|service|transport|retail|food|other)\.png[^>]*>)',
                r'\1<div class="image-fallback industry-\2-fallback"></div>',
                content
            )
            
            # ファイルに書き戻す
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(content)
                
            print(f"フォールバック強化を適用しました: {os.path.basename(html_file)}")
            
        except Exception as e:
            print(f"エラー: {html_file} の処理中にエラーが発生しました - {str(e)}")

def main():
    """メイン処理"""
    print("アイコン画像のフォールバック強化を開始します...")
    
    # アイコン画像を生成
    generate_icon_images()
    
    # Font Awesomeフォールバックを強化
    enhance_font_awesome_fallbacks()
    
    # HTMLファイルにフォールバック強化を適用
    update_html_with_enhanced_fallbacks()
    
    print("アイコン画像のフォールバック強化が完了しました。")

if __name__ == "__main__":
    main()
