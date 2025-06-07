#!/usr/bin/env python3
"""
画像ファイルの最適化と統一を行うスクリプト
作成日: 2025年6月7日
"""

import os
import re
import glob
import shutil
from PIL import Image, ImageOps
import requests
from io import BytesIO

# 作業ディレクトリ
SITE_DIR = '/home/ubuntu/flatto-legal-site'
IMAGES_DIR = os.path.join(SITE_DIR, 'images')
BACKUP_DIR = os.path.join(SITE_DIR, 'images_backup')

# 画像形式の設定
ICON_FORMAT = 'png'  # アイコン用フォーマット（透過背景対応）
PHOTO_FORMAT = 'jpg'  # 写真用フォーマット（圧縮効率が良い）

# 画像サイズの設定
LOGO_MAX_SIZE = (300, 100)  # ロゴの最大サイズ
ICON_SIZE = (64, 64)        # アイコンのサイズ
PHOTO_MAX_SIZE = (800, 600)  # 写真の最大サイズ

# 画像品質の設定
JPG_QUALITY = 85  # JPG画像の品質（0-100）
PNG_COMPRESSION = 9  # PNG画像の圧縮レベル（0-9）

def backup_images():
    """画像ファイルのバックアップを作成"""
    if os.path.exists(BACKUP_DIR):
        shutil.rmtree(BACKUP_DIR)
    
    shutil.copytree(IMAGES_DIR, BACKUP_DIR)
    print(f"画像ファイルのバックアップを作成しました: {BACKUP_DIR}")

def optimize_logo_images():
    """ロゴ画像を最適化"""
    logo_files = [
        os.path.join(IMAGES_DIR, 'logo.png'),
        os.path.join(IMAGES_DIR, 'logo-white.png'),
        os.path.join(IMAGES_DIR, 'flatto-logo-color.png')
    ]
    
    for logo_file in logo_files:
        if os.path.exists(logo_file):
            try:
                # 画像を開く
                img = Image.open(logo_file)
                
                # 元のサイズを保存
                original_size = img.size
                
                # 透過部分を保持
                if img.mode == 'RGBA':
                    # RGBAモードの場合はそのまま
                    optimized_img = img
                else:
                    # RGB等の場合はRGBAに変換
                    optimized_img = img.convert('RGBA')
                
                # サイズ調整（アスペクト比を保持）
                optimized_img.thumbnail(LOGO_MAX_SIZE, Image.LANCZOS)
                
                # 保存
                optimized_img.save(logo_file, format='PNG', optimize=True, compress_level=PNG_COMPRESSION)
                
                new_size = optimized_img.size
                
                # 元のファイルサイズと新しいファイルサイズを取得
                original_file_size = os.path.getsize(os.path.join(BACKUP_DIR, os.path.basename(logo_file)))
                new_file_size = os.path.getsize(logo_file)
                
                print(f"ロゴ画像を最適化しました: {os.path.basename(logo_file)}")
                print(f"  サイズ変更: {original_size} -> {new_size}")
                print(f"  ファイルサイズ: {original_file_size/1024:.1f}KB -> {new_file_size/1024:.1f}KB")
                
            except Exception as e:
                print(f"エラー: {logo_file} の最適化中にエラーが発生しました - {str(e)}")

def optimize_icon_images():
    """アイコン画像を最適化"""
    # iconsディレクトリ内のアイコン
    icon_files = glob.glob(os.path.join(IMAGES_DIR, 'icons', f'*.{ICON_FORMAT}'))
    
    # ルートimagesディレクトリ内のicon-*ファイル
    icon_files += glob.glob(os.path.join(IMAGES_DIR, f'icon-*.{ICON_FORMAT}'))
    
    # industry-*ファイル
    icon_files += glob.glob(os.path.join(IMAGES_DIR, f'industry-*.{ICON_FORMAT}'))
    
    for icon_file in icon_files:
        try:
            # 画像を開く
            img = Image.open(icon_file)
            
            # 元のサイズを保存
            original_size = img.size
            
            # 透過部分を保持
            if img.mode == 'RGBA':
                # RGBAモードの場合はそのまま
                optimized_img = img
            else:
                # RGB等の場合はRGBAに変換
                optimized_img = img.convert('RGBA')
            
            # サイズ調整（アスペクト比を保持）
            optimized_img.thumbnail(ICON_SIZE, Image.LANCZOS)
            
            # 保存
            optimized_img.save(icon_file, format='PNG', optimize=True, compress_level=PNG_COMPRESSION)
            
            new_size = optimized_img.size
            
            # 元のファイルサイズと新しいファイルサイズを取得
            backup_file = os.path.join(BACKUP_DIR, os.path.relpath(icon_file, IMAGES_DIR))
            if os.path.exists(backup_file):
                original_file_size = os.path.getsize(backup_file)
                new_file_size = os.path.getsize(icon_file)
                
                print(f"アイコン画像を最適化しました: {os.path.basename(icon_file)}")
                print(f"  サイズ変更: {original_size} -> {new_size}")
                print(f"  ファイルサイズ: {original_file_size/1024:.1f}KB -> {new_file_size/1024:.1f}KB")
            
        except Exception as e:
            print(f"エラー: {icon_file} の最適化中にエラーが発生しました - {str(e)}")

def optimize_photo_images():
    """写真画像を最適化"""
    # 写真と思われるファイルのパターン
    photo_patterns = [
        os.path.join(IMAGES_DIR, '*.jpg'),
        os.path.join(IMAGES_DIR, '*.jpeg'),
        os.path.join(IMAGES_DIR, 'cases', '*.jpg'),
        os.path.join(IMAGES_DIR, 'cases', '*.jpeg'),
        os.path.join(IMAGES_DIR, 'blog', '*.jpg'),
        os.path.join(IMAGES_DIR, 'blog', '*.jpeg')
    ]
    
    photo_files = []
    for pattern in photo_patterns:
        photo_files.extend(glob.glob(pattern))
    
    for photo_file in photo_files:
        try:
            # 画像を開く
            img = Image.open(photo_file)
            
            # 元のサイズを保存
            original_size = img.size
            
            # RGBモードに変換（透過部分は不要）
            optimized_img = img.convert('RGB')
            
            # サイズ調整（アスペクト比を保持）
            optimized_img.thumbnail(PHOTO_MAX_SIZE, Image.LANCZOS)
            
            # 保存
            optimized_img.save(photo_file, format='JPEG', quality=JPG_QUALITY, optimize=True)
            
            new_size = optimized_img.size
            
            # 元のファイルサイズと新しいファイルサイズを取得
            backup_file = os.path.join(BACKUP_DIR, os.path.relpath(photo_file, IMAGES_DIR))
            if os.path.exists(backup_file):
                original_file_size = os.path.getsize(backup_file)
                new_file_size = os.path.getsize(photo_file)
                
                print(f"写真画像を最適化しました: {os.path.basename(photo_file)}")
                print(f"  サイズ変更: {original_size} -> {new_size}")
                print(f"  ファイルサイズ: {original_file_size/1024:.1f}KB -> {new_file_size/1024:.1f}KB")
            
        except Exception as e:
            print(f"エラー: {photo_file} の最適化中にエラーが発生しました - {str(e)}")

def convert_png_to_jpg_for_photos():
    """写真のPNGファイルをJPGに変換"""
    # 写真と思われるPNGファイルのパターン
    photo_png_patterns = [
        os.path.join(IMAGES_DIR, '*-*.png'),  # ハイフンを含むファイル名（アイコン以外）
        os.path.join(IMAGES_DIR, 'cases', '*.png'),
        os.path.join(IMAGES_DIR, 'blog', '*.png')
    ]
    
    # icon-*とindustry-*は除外
    exclude_patterns = ['icon-', 'industry-', 'logo']
    
    photo_png_files = []
    for pattern in photo_png_patterns:
        photo_png_files.extend(glob.glob(pattern))
    
    # 除外パターンに一致するファイルを除外
    photo_png_files = [f for f in photo_png_files if not any(exclude in os.path.basename(f) for exclude in exclude_patterns)]
    
    for png_file in photo_png_files:
        try:
            # 画像を開く
            img = Image.open(png_file)
            
            # RGBモードに変換
            img_rgb = img.convert('RGB')
            
            # JPGファイル名を生成
            jpg_file = os.path.splitext(png_file)[0] + '.jpg'
            
            # JPGとして保存
            img_rgb.save(jpg_file, format='JPEG', quality=JPG_QUALITY, optimize=True)
            
            # 元のPNGファイルを削除
            os.remove(png_file)
            
            print(f"PNG画像をJPGに変換しました: {os.path.basename(png_file)} -> {os.path.basename(jpg_file)}")
            
        except Exception as e:
            print(f"エラー: {png_file} の変換中にエラーが発生しました - {str(e)}")

def update_html_references():
    """HTMLファイル内の画像参照を更新"""
    html_files = glob.glob(os.path.join(SITE_DIR, '*.html'))
    
    for html_file in html_files:
        try:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 絶対パスを相対パスに変更
            modified_content = re.sub(
                r'src="https://yasuyuki-shiozawa\.github\.io/flatto-legal-site/images/',
                'src="images/',
                content
            )
            
            # キャッシュバスティングパラメータを更新
            modified_content = re.sub(
                r'(src="images/[^"]+)\?v=\d+"',
                r'\1?v=' + str(int(os.path.getmtime(html_file))) + '"',
                modified_content
            )
            
            # PNG写真をJPGに更新
            photo_png_patterns = [
                r'(src="images/[^"]*?)(-[^"]*?)\.png(")',  # ハイフンを含むファイル名（アイコン以外）
                r'(src="images/cases/[^"]*?)\.png(")',
                r'(src="images/blog/[^"]*?)\.png(")'
            ]
            
            # 除外パターン
            exclude_patterns = ['icon-', 'industry-', 'logo']
            
            for pattern in photo_png_patterns:
                def replace_png_to_jpg(match):
                    full_match = match.group(0)
                    if any(exclude in full_match for exclude in exclude_patterns):
                        return full_match
                    
                    if len(match.groups()) == 3:
                        return match.group(1) + match.group(2) + '.jpg' + match.group(3)
                    else:
                        return match.group(1) + '.jpg' + match.group(2)
                
                modified_content = re.sub(pattern, replace_png_to_jpg, modified_content)
            
            # ファイルに書き戻す
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(modified_content)
                
            print(f"HTML内の画像参照を更新しました: {os.path.basename(html_file)}")
            
        except Exception as e:
            print(f"エラー: {html_file} の処理中にエラーが発生しました - {str(e)}")

def main():
    """メイン処理"""
    print("画像ファイルの最適化と統一を開始します...")
    
    # 画像ファイルのバックアップを作成
    backup_images()
    
    # ロゴ画像を最適化
    optimize_logo_images()
    
    # アイコン画像を最適化
    optimize_icon_images()
    
    # 写真のPNGファイルをJPGに変換
    convert_png_to_jpg_for_photos()
    
    # 写真画像を最適化
    optimize_photo_images()
    
    # HTMLファイル内の画像参照を更新
    update_html_references()
    
    print("画像ファイルの最適化と統一が完了しました。")

if __name__ == "__main__":
    main()
