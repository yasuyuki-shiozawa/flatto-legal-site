#!/usr/bin/env python3
"""
不足している画像ファイルを作成・配置するスクリプト
作成日: 2025年6月6日
"""

import os
import shutil
import re
import glob
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO
import requests

# 作業ディレクトリ
SITE_DIR = '/home/ubuntu/flatto-legal-site'
IMAGES_DIR = os.path.join(SITE_DIR, 'images')
ICONS_DIR = os.path.join(IMAGES_DIR, 'icons')
CASES_DIR = os.path.join(IMAGES_DIR, 'cases')
BLOG_DIR = os.path.join(IMAGES_DIR, 'blog')

# 必要なディレクトリを作成
def create_directories():
    """必要なディレクトリを作成"""
    os.makedirs(ICONS_DIR, exist_ok=True)
    os.makedirs(CASES_DIR, exist_ok=True)
    os.makedirs(BLOG_DIR, exist_ok=True)
    print("必要なディレクトリを作成しました")

# HTMLファイルから参照されている画像パスを抽出
def extract_image_paths():
    """HTMLファイルから参照されている画像パスを抽出"""
    image_paths = set()
    html_files = glob.glob(os.path.join(SITE_DIR, '*.html'))
    
    for html_file in html_files:
        try:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # 画像パスを抽出（絶対パスから相対パスに変換）
            matches = re.findall(r'src="[^"]*?/images/([^"]+)"', content)
            for match in matches:
                image_paths.add(match)
                
        except Exception as e:
            print(f"エラー: {html_file} の処理中にエラーが発生しました - {str(e)}")
    
    return image_paths

# 存在する画像ファイルのリストを取得
def get_existing_images():
    """存在する画像ファイルのリストを取得"""
    existing_images = set()
    
    for root, _, files in os.walk(IMAGES_DIR):
        for file in files:
            rel_path = os.path.relpath(os.path.join(root, file), IMAGES_DIR)
            existing_images.add(rel_path)
    
    return existing_images

# 不足している画像を特定
def identify_missing_images(referenced_images, existing_images):
    """不足している画像を特定"""
    missing_images = referenced_images - existing_images
    return missing_images

# プレースホルダー画像を生成
def create_placeholder_image(image_path, text=None):
    """プレースホルダー画像を生成"""
    # 画像サイズ
    width, height = 200, 200
    
    # 画像の種類に応じてサイズを調整
    if 'icon' in image_path.lower():
        width, height = 128, 128
    elif 'logo' in image_path.lower():
        width, height = 300, 100
    elif 'case' in image_path.lower() or 'blog' in image_path.lower():
        width, height = 400, 300
    
    # 画像の種類からテキストを生成（指定がない場合）
    if text is None:
        base_name = os.path.basename(image_path)
        name_without_ext = os.path.splitext(base_name)[0]
        text = name_without_ext.replace('-', ' ').title()
    
    # 画像を生成
    image = Image.new('RGB', (width, height), color=(240, 240, 240))
    draw = ImageDraw.Draw(image)
    
    # 枠線を描画
    draw.rectangle([(0, 0), (width-1, height-1)], outline=(200, 200, 200), width=2)
    
    # テキストを描画
    try:
        # フォントサイズを調整
        font_size = min(24, width // (len(text) // 2 + 1))
        font = ImageFont.truetype("DejaVuSans.ttf", font_size)
    except IOError:
        # フォントが見つからない場合はデフォルトフォントを使用
        font = ImageFont.load_default()
    
    # テキストの位置を計算
    text_width, text_height = draw.textsize(text, font=font) if hasattr(draw, 'textsize') else (width//2, height//2)
    position = ((width - text_width) // 2, (height - text_height) // 2)
    
    # テキストを描画
    draw.text(position, text, fill=(100, 100, 100), font=font)
    
    # 保存先のパスを作成
    save_path = os.path.join(IMAGES_DIR, image_path)
    os.makedirs(os.path.dirname(save_path), exist_ok=True)
    
    # 画像を保存
    image.save(save_path)
    print(f"プレースホルダー画像を作成: {image_path}")

# 主要なアイコン画像を生成
def create_main_icons():
    """主要なアイコン画像を生成"""
    icons = [
        "icon-consultation.png",
        "icon-plan.png",
        "icon-contract.png",
        "icon-qualification.png",
        "icon-search.png",
        "icon-document.png",
        "icon-support.png",
        "icon-research.png",
        "icon-price.png",
        "icon-network.png",
        "icon-follow.png"
    ]
    
    for icon in icons:
        create_placeholder_image(os.path.join("icons", icon))

# 事例画像を生成
def create_case_images():
    """事例画像を生成"""
    cases = [
        "case-cleaning.jpg",
        "case-system.jpg",
        "case-construction.jpg",
        "case-consulting.jpg"
    ]
    
    for case in cases:
        create_placeholder_image(os.path.join("cases", case))

# ブログ画像を生成
def create_blog_images():
    """ブログ画像を生成"""
    blog_images = [
        "cleaning.jpg",
        "system.jpg",
        "catering.jpg",
        "housing.jpg",
        "tourism.jpg"
    ]
    
    for image in blog_images:
        create_placeholder_image(os.path.join("blog", image))

# スタッフ画像を生成
def create_staff_images():
    """スタッフ画像を生成"""
    staff_images = [
        "representative.jpg",
        "staff-1.jpg",
        "staff-2.jpg",
        "staff-3.jpg",
        "office.jpg"
    ]
    
    for image in staff_images:
        create_placeholder_image(image)

# メイン処理
def main():
    """メイン処理"""
    # 必要なディレクトリを作成
    create_directories()
    
    # 参照されている画像パスを抽出
    referenced_images = extract_image_paths()
    print(f"参照されている画像: {len(referenced_images)}個")
    
    # 存在する画像ファイルのリストを取得
    existing_images = get_existing_images()
    print(f"存在する画像: {len(existing_images)}個")
    
    # 不足している画像を特定
    missing_images = identify_missing_images(referenced_images, existing_images)
    print(f"不足している画像: {len(missing_images)}個")
    
    # 不足している画像を生成
    for image_path in missing_images:
        create_placeholder_image(image_path)
    
    # 主要なアイコン画像を生成
    create_main_icons()
    
    # 事例画像を生成
    create_case_images()
    
    # ブログ画像を生成
    create_blog_images()
    
    # スタッフ画像を生成
    create_staff_images()
    
    print("画像生成が完了しました")

if __name__ == "__main__":
    main()
