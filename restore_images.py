#!/usr/bin/env python3
"""
バックアップから画像を復元し、HTMLパスを修正するスクリプト
作成日: 2025年6月7日
"""

import os
import re
import glob
import shutil
import hashlib
from datetime import datetime

# 作業ディレクトリ
SITE_DIR = '/home/ubuntu/flatto-legal-site'
IMAGES_DIR = os.path.join(SITE_DIR, 'images')
BACKUP_DIR = os.path.join(SITE_DIR, 'images_backup')
BACKUP_FLATTO_DIR = '/home/ubuntu/flatto-legal-backup'

# 重要な画像ファイルのリスト
CRITICAL_IMAGES = [
    'logo.png',
    'logo-white.png',
    'flatto-logo-color.png',
]

# アイコン画像のパターン
ICON_PATTERNS = [
    'icon-*.png',
    'industry-*.png',
]

def generate_file_hash(file_path):
    """ファイルのハッシュ値を生成"""
    if not os.path.exists(file_path):
        return None
    
    hash_md5 = hashlib.md5()
    with open(file_path, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()[:8]

def restore_critical_images():
    """重要な画像ファイルをバックアップから復元"""
    print("重要な画像ファイルの復元を開始します...")
    
    for image_name in CRITICAL_IMAGES:
        # バックアップディレクトリから検索
        backup_path = os.path.join(BACKUP_DIR, image_name)
        if not os.path.exists(backup_path):
            # flatto-legal-backupディレクトリから検索
            backup_path = None
            for root, dirs, files in os.walk(BACKUP_FLATTO_DIR):
                for file in files:
                    if file == image_name:
                        backup_path = os.path.join(root, file)
                        break
                if backup_path:
                    break
        
        if backup_path and os.path.exists(backup_path):
            # 復元先のパス
            dest_path = os.path.join(IMAGES_DIR, image_name)
            
            # ファイルをコピー
            shutil.copy2(backup_path, dest_path)
            print(f"画像を復元しました: {image_name}")
            
            # ファイルサイズを確認
            file_size = os.path.getsize(dest_path)
            print(f"  ファイルサイズ: {file_size/1024:.1f}KB")
        else:
            print(f"警告: {image_name} のバックアップが見つかりませんでした")

def restore_icon_images():
    """アイコン画像をバックアップから復元"""
    print("アイコン画像の復元を開始します...")
    
    restored_count = 0
    
    for pattern in ICON_PATTERNS:
        # バックアップディレクトリから検索
        backup_files = glob.glob(os.path.join(BACKUP_DIR, pattern))
        
        for backup_path in backup_files:
            # 復元先のパス
            image_name = os.path.basename(backup_path)
            dest_path = os.path.join(IMAGES_DIR, image_name)
            
            # ファイルをコピー
            shutil.copy2(backup_path, dest_path)
            restored_count += 1
            
    print(f"{restored_count}個のアイコン画像を復元しました")

def fix_html_image_references():
    """HTMLファイル内の画像参照を修正"""
    print("HTMLファイル内の画像参照を修正します...")
    
    html_files = glob.glob(os.path.join(SITE_DIR, '*.html'))
    
    for html_file in html_files:
        try:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 相対パスを絶対パスに変更
            modified_content = re.sub(
                r'src="images/',
                'src="https://yasuyuki-shiozawa.github.io/flatto-legal-site/images/',
                content
            )
            
            # キャッシュバスティングパラメータをファイルハッシュに更新
            def replace_with_hash(match):
                img_path = match.group(1)
                full_path = os.path.join(SITE_DIR, img_path.replace('https://yasuyuki-shiozawa.github.io/flatto-legal-site/', ''))
                
                # ファイルが存在する場合はハッシュを生成、存在しない場合はタイムスタンプを使用
                if os.path.exists(full_path):
                    file_hash = generate_file_hash(full_path)
                    return f'{img_path}?v={file_hash}"'
                else:
                    timestamp = int(datetime.now().timestamp())
                    return f'{img_path}?v={timestamp}"'
            
            modified_content = re.sub(
                r'(src="[^"]+\.(png|jpg|jpeg|gif|svg))(\?v=[^"]+)?"',
                lambda m: replace_with_hash(m),
                modified_content
            )
            
            # ファイルに書き戻す
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(modified_content)
                
            print(f"画像参照を修正しました: {os.path.basename(html_file)}")
            
        except Exception as e:
            print(f"エラー: {html_file} の処理中にエラーが発生しました - {str(e)}")

def add_font_awesome_fallbacks():
    """Font Awesomeフォールバックを追加するCSSを作成"""
    print("Font Awesomeフォールバックを追加します...")
    
    css_content = """/* Font Awesomeフォールバック */
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

/* 画像読み込みエラー時のフォールバック表示 */
img.error + .image-fallback {
    display: inline-block;
}

img:not(.error) + .image-fallback {
    display: none;
}
"""
    
    # CSSファイルに書き込み
    css_path = os.path.join(SITE_DIR, 'css', 'font-awesome-fallback.css')
    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(css_content)
    
    print(f"Font Awesomeフォールバックを作成しました: {css_path}")
    
    # HTMLファイルにFont Awesomeとフォールバックを追加
    html_files = glob.glob(os.path.join(SITE_DIR, '*.html'))
    
    for html_file in html_files:
        try:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Font Awesome CDNがまだ含まれていない場合は追加
            if 'fontawesome' not in content:
                head_end_tag = '</head>'
                font_awesome_link = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">\n    '
                fallback_css_link = '<link rel="stylesheet" href="css/font-awesome-fallback.css">\n    '
                
                modified_content = content.replace(head_end_tag, font_awesome_link + fallback_css_link + head_end_tag)
            else:
                # すでにFont Awesomeが含まれている場合はフォールバックCSSのみ追加
                head_end_tag = '</head>'
                fallback_css_link = '<link rel="stylesheet" href="css/font-awesome-fallback.css">\n    '
                
                if 'font-awesome-fallback.css' not in content:
                    modified_content = content.replace(head_end_tag, fallback_css_link + head_end_tag)
                else:
                    modified_content = content
            
            # 特定のアイコン画像にフォールバックを追加
            icon_patterns = {
                'icon-knowledge.png': 'icon-knowledge-fallback',
                'icon-support.png': 'icon-support-fallback',
                'icon-achievement.png': 'icon-achievement-fallback',
                'industry-construction.png': 'industry-construction-fallback',
                'industry-manufacturing.png': 'industry-manufacturing-fallback',
                'industry-it.png': 'industry-it-fallback',
                'industry-service.png': 'industry-service-fallback',
                'industry-transport.png': 'industry-transport-fallback',
                'industry-retail.png': 'industry-retail-fallback',
                'industry-food.png': 'industry-food-fallback',
                'industry-other.png': 'industry-other-fallback'
            }
            
            for icon_name, fallback_class in icon_patterns.items():
                # 画像タグの後にフォールバック用のdivを追加
                pattern = f'(<img[^>]*{icon_name}[^>]*>)'
                replacement = f'\\1<div class="image-fallback {fallback_class}"></div>'
                modified_content = re.sub(pattern, replacement, modified_content)
            
            # ファイルに書き戻す
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(modified_content)
                
            print(f"フォールバックを追加しました: {os.path.basename(html_file)}")
            
        except Exception as e:
            print(f"エラー: {html_file} の処理中にエラーが発生しました - {str(e)}")

def main():
    """メイン処理"""
    print("バックアップからの画像復元とHTMLパス修正を開始します...")
    
    # 重要な画像ファイルを復元
    restore_critical_images()
    
    # アイコン画像を復元
    restore_icon_images()
    
    # HTMLファイル内の画像参照を修正
    fix_html_image_references()
    
    # Font Awesomeフォールバックを追加
    add_font_awesome_fallbacks()
    
    print("バックアップからの画像復元とHTMLパス修正が完了しました。")

if __name__ == "__main__":
    main()
