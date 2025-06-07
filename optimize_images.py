#!/usr/bin/env python3
# 画像最適化スクリプト
# 作成日: 2025年6月7日

import os
import shutil
from PIL import Image
import sys
import re

# 設定
SOURCE_DIR = '/home/ubuntu/flatto-legal-site/images_backup'
TARGET_DIR = '/home/ubuntu/flatto-legal-site/jekyll-site/assets/images'
QUALITY = 85  # JPG圧縮品質
MAX_WIDTH = 1200  # 最大幅

# カテゴリディレクトリの作成
categories = ['logos', 'icons', 'hero', 'services', 'cases', 'staff', 'illustrations']
for category in categories:
    os.makedirs(os.path.join(TARGET_DIR, category), exist_ok=True)

# 画像ファイルの分類ルール
def get_category(filename):
    filename = filename.lower()
    
    if 'logo' in filename:
        return 'logos'
    elif 'icon' in filename:
        return 'icons'
    elif 'hero' in filename or filename.startswith('hero'):
        return 'hero'
    elif any(service in filename for service in ['service', 'support', 'strategy']):
        return 'services'
    elif any(case in filename for case in ['case', 'testimonial']):
        return 'cases'
    elif any(staff in filename for staff in ['staff', 'profile', 'representative', 'office']):
        return 'staff'
    else:
        return 'illustrations'

# 画像の最適化
def optimize_image(source_path, target_path):
    # SVGファイルはそのままコピー
    if source_path.lower().endswith('.svg'):
        shutil.copy2(source_path, target_path)
        return
    
    try:
        with Image.open(source_path) as img:
            # 画像のリサイズ（必要な場合）
            width, height = img.size
            if width > MAX_WIDTH:
                ratio = MAX_WIDTH / width
                new_height = int(height * ratio)
                img = img.resize((MAX_WIDTH, new_height), Image.LANCZOS)
            
            # 画像の保存（最適化）
            if source_path.lower().endswith('.jpg') or source_path.lower().endswith('.jpeg'):
                img.save(target_path, 'JPEG', quality=QUALITY, optimize=True)
            elif source_path.lower().endswith('.png'):
                img.save(target_path, 'PNG', optimize=True)
            else:
                # その他の形式はそのままコピー
                shutil.copy2(source_path, target_path)
    except Exception as e:
        print(f"エラー: {source_path} の処理中に問題が発生しました - {e}")
        # エラーが発生した場合はそのままコピー
        shutil.copy2(source_path, target_path)

# 画像ファイルの処理
def process_images():
    count = 0
    for root, _, files in os.walk(SOURCE_DIR):
        for file in files:
            if file.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.svg')):
                source_path = os.path.join(root, file)
                
                # ファイル名の正規化（小文字化、スペースをハイフンに）
                normalized_name = re.sub(r'\s+', '-', file.lower())
                
                # カテゴリの取得
                category = get_category(normalized_name)
                
                # 保存先パスの設定
                target_path = os.path.join(TARGET_DIR, category, normalized_name)
                
                # 画像の最適化
                optimize_image(source_path, target_path)
                count += 1
                
                # 進捗表示
                if count % 10 == 0:
                    print(f"{count}個の画像を処理しました...")
    
    return count

if __name__ == "__main__":
    print("画像最適化を開始します...")
    total = process_images()
    print(f"完了！合計{total}個の画像を最適化しました。")
    print(f"最適化された画像は {TARGET_DIR} に保存されました。")
