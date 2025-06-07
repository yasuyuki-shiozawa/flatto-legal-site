#!/usr/bin/env python3
"""
アイコン画像表示問題の徹底調査と修正スクリプト
作成日: 2025年6月7日
"""

import os
import re
import glob
import shutil
import hashlib
import base64
from PIL import Image, ImageDraw, ImageFont
from datetime import datetime

# 作業ディレクトリ
SITE_DIR = '/home/ubuntu/flatto-legal-site'
IMAGES_DIR = os.path.join(SITE_DIR, 'images')
CSS_DIR = os.path.join(SITE_DIR, 'css')

# 問題のアイコン
PROBLEM_ICONS = [
    "icon-knowledge.png",
    "icon-support.png",
    "icon-achievement.png",
    "industry-construction.png",
    "industry-manufacturing.png",
    "industry-it.png",
    "industry-service.png",
    "industry-transport.png",
    "industry-retail.png",
    "industry-food.png",
    "industry-other.png"
]

def analyze_icon_references():
    """HTMLファイル内のアイコン参照を分析"""
    print("HTMLファイル内のアイコン参照を分析します...")
    
    html_files = glob.glob(os.path.join(SITE_DIR, '*.html'))
    results = {}
    
    for icon_name in PROBLEM_ICONS:
        results[icon_name] = {"references": [], "html_structure": []}
    
    for html_file in html_files:
        try:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            for icon_name in PROBLEM_ICONS:
                # アイコン参照を検索
                pattern = f'<img[^>]*{icon_name}[^>]*>'
                matches = re.findall(pattern, content)
                
                if matches:
                    file_basename = os.path.basename(html_file)
                    results[icon_name]["references"].append(file_basename)
                    results[icon_name]["html_structure"].append(matches[0])
            
        except Exception as e:
            print(f"エラー: {html_file} の分析中にエラーが発生しました - {str(e)}")
    
    # 結果を表示
    print("\n=== アイコン参照分析結果 ===")
    for icon_name, data in results.items():
        print(f"\nアイコン: {icon_name}")
        print(f"  参照ファイル数: {len(data['references'])}")
        if data["references"]:
            print(f"  参照ファイル例: {', '.join(data['references'][:3])}")
        if data["html_structure"]:
            print(f"  HTML構造例: {data['html_structure'][0]}")
    
    return results

def create_inline_base64_icons():
    """インラインBase64エンコードアイコンを作成"""
    print("\nインラインBase64エンコードアイコンを作成します...")
    
    # アイコン画像の設定
    ICON_SIZE = (64, 64)
    ICON_BG_COLOR = "#f8f9fa"
    ICON_TEXT_COLOR = "#1a4b84"
    ICON_BORDER_COLOR = "#dee2e6"
    
    css_content = "/* インラインBase64エンコードアイコン */\n"
    
    for icon_name in PROBLEM_ICONS:
        # アイコン名から表示テキストを抽出
        if "icon-knowledge" in icon_name:
            text = "知識"
        elif "icon-support" in icon_name:
            text = "支援"
        elif "icon-achievement" in icon_name:
            text = "実績"
        elif "industry-construction" in icon_name:
            text = "建設"
        elif "industry-manufacturing" in icon_name:
            text = "製造"
        elif "industry-it" in icon_name:
            text = "IT"
        elif "industry-service" in icon_name:
            text = "サービス"
        elif "industry-transport" in icon_name:
            text = "運送"
        elif "industry-retail" in icon_name:
            text = "小売"
        elif "industry-food" in icon_name:
            text = "飲食"
        elif "industry-other" in icon_name:
            text = "その他"
        else:
            text = "?"
        
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
        text_width, text_height = draw.textsize(text, font=font) if hasattr(draw, 'textsize') else (16, 16)
        position = ((ICON_SIZE[0] - text_width) // 2, (ICON_SIZE[1] - text_height) // 2)
        
        # テキストを描画
        draw.text(position, text, fill=ICON_TEXT_COLOR, font=font)
        
        # Base64エンコード
        import io
        buffer = io.BytesIO()
        img.save(buffer, format="PNG")
        img_str = base64.b64encode(buffer.getvalue()).decode('utf-8')
        
        # CSSクラス名を作成
        css_class = icon_name.replace('.png', '').replace('-', '-')
        
        # CSSルールを追加
        css_content += f"""
.{css_class} {{
    background-image: url('data:image/png;base64,{img_str}');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 64px;
    height: 64px;
    display: inline-block;
}}
"""
    
    # CSSファイルに書き込み
    css_path = os.path.join(CSS_DIR, 'inline-icons.css')
    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(css_content)
    
    print(f"インラインBase64エンコードアイコンを作成しました: {css_path}")
    return css_path

def apply_inline_icons_to_html():
    """HTMLファイルにインラインアイコンを適用"""
    print("\nHTMLファイルにインラインアイコンを適用します...")
    
    # まずCSSリンクをヘッダーに追加
    html_files = glob.glob(os.path.join(SITE_DIR, '*.html'))
    
    for html_file in html_files:
        try:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # CSSリンクがまだ含まれていない場合は追加
            if 'inline-icons.css' not in content:
                head_end_tag = '</head>'
                css_link = '<link rel="stylesheet" href="css/inline-icons.css">\n    '
                
                modified_content = content.replace(head_end_tag, css_link + head_end_tag)
            else:
                modified_content = content
            
            # 問題のアイコン画像をインラインCSSクラスに置き換え
            for icon_name in PROBLEM_ICONS:
                css_class = icon_name.replace('.png', '').replace('-', '-')
                
                # img要素を探して置き換え
                pattern = f'(<img[^>]*{icon_name}[^>]*>)'
                replacement = f'<div class="{css_class}"></div>'
                modified_content = re.sub(pattern, replacement, modified_content)
            
            # ファイルに書き戻す
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(modified_content)
                
            print(f"インラインアイコンを適用しました: {os.path.basename(html_file)}")
            
        except Exception as e:
            print(f"エラー: {html_file} の処理中にエラーが発生しました - {str(e)}")

def create_javascript_fallback():
    """JavaScript画像フォールバックを作成"""
    print("\nJavaScript画像フォールバックを作成します...")
    
    js_content = """// 画像読み込みエラー時のフォールバック処理
document.addEventListener('DOMContentLoaded', function() {
    // すべての画像要素を取得
    var images = document.querySelectorAll('img');
    
    // 各画像に読み込みエラー時の処理を追加
    images.forEach(function(img) {
        img.onerror = function() {
            // エラークラスを追加
            this.classList.add('error');
            
            // 画像のsrc属性からファイル名を抽出
            var src = this.getAttribute('src');
            var filename = src.substring(src.lastIndexOf('/') + 1);
            
            // アイコン画像の場合はFont Awesomeフォールバックを表示
            if (filename.includes('icon-') || filename.includes('industry-')) {
                // 次の要素がフォールバック用divなら表示
                var nextElement = this.nextElementSibling;
                if (nextElement && nextElement.classList.contains('image-fallback')) {
                    nextElement.style.display = 'inline-block';
                }
                // 画像を非表示
                this.style.display = 'none';
            }
        };
    });
});
"""
    
    # JSファイルに書き込み
    js_path = os.path.join(SITE_DIR, 'js')
    os.makedirs(js_path, exist_ok=True)
    
    js_file_path = os.path.join(js_path, 'image-fallback.js')
    with open(js_file_path, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"JavaScript画像フォールバックを作成しました: {js_file_path}")
    
    # HTMLファイルにJavaScriptを追加
    html_files = glob.glob(os.path.join(SITE_DIR, '*.html'))
    
    for html_file in html_files:
        try:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # JavaScriptがまだ含まれていない場合は追加
            if 'image-fallback.js' not in content:
                body_end_tag = '</body>'
                js_tag = '<script src="js/image-fallback.js"></script>\n  '
                
                modified_content = content.replace(body_end_tag, js_tag + body_end_tag)
                
                # ファイルに書き戻す
                with open(html_file, 'w', encoding='utf-8') as f:
                    f.write(modified_content)
                    
                print(f"JavaScriptフォールバックを追加しました: {os.path.basename(html_file)}")
            
        except Exception as e:
            print(f"エラー: {html_file} の処理中にエラーが発生しました - {str(e)}")

def main():
    """メイン処理"""
    print("アイコン画像表示問題の徹底調査と修正を開始します...")
    
    # HTMLファイル内のアイコン参照を分析
    analyze_icon_references()
    
    # インラインBase64エンコードアイコンを作成
    create_inline_base64_icons()
    
    # HTMLファイルにインラインアイコンを適用
    apply_inline_icons_to_html()
    
    # JavaScript画像フォールバックを作成
    create_javascript_fallback()
    
    print("\nアイコン画像表示問題の徹底調査と修正が完了しました。")

if __name__ == "__main__":
    main()
