#!/usr/bin/env python3
"""
サービスページコンテンツ復元スクリプト
作成日: 2025年6月7日

このスクリプトは、サービスページのメインコンテンツを完全に復元するためのものです。
バックアップからコンテンツを取得し、HTML構造を修正します。
"""

import os
import re
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

def force_restore_service_page():
    """サービスページを強制的に復元"""
    print("\nサービスページを強制的に復元します...")
    
    service_backup = os.path.join(BACKUP_DIR, 'service.html')
    service_current = os.path.join(SITE_DIR, 'service.html')
    
    if not os.path.exists(service_backup):
        print("エラー: サービスページのバックアップが見つかりません")
        return False
    
    # バックアップからHTMLを読み込み
    with open(service_backup, 'r', encoding='utf-8') as f:
        backup_content = f.read()
    
    # 現在のファイルを読み込み
    with open(service_current, 'r', encoding='utf-8') as f:
        current_content = f.read()
    
    # ヘッダーとフッターを保持
    header_match = re.search(r'(<!DOCTYPE.*?<main[^>]*>)', current_content, re.DOTALL)
    footer_match = re.search(r'(</main>.*?</html>)', current_content, re.DOTALL)
    
    if not header_match or not footer_match:
        print("警告: ヘッダーまたはフッターが見つかりません。バックアップを完全にコピーします。")
        shutil.copy2(service_backup, service_current)
        print("サービスページを完全に復元しました")
        return True
    
    # バックアップからメインコンテンツを抽出
    main_match = re.search(r'<main[^>]*>(.*?)</main>', backup_content, re.DOTALL)
    if not main_match:
        print("エラー: バックアップからメインコンテンツを抽出できません")
        return False
    
    main_content = main_match.group(1)
    
    # 新しいHTMLを構築
    new_content = header_match.group(1) + main_content + footer_match.group(1)
    
    # 必要なCSSとJSリンクを追加
    if '<link rel="stylesheet" href="css/unified-layout.css">' not in new_content:
        new_content = new_content.replace('</head>', '<link rel="stylesheet" href="css/unified-layout.css">\n    </head>')
    
    if '<link rel="stylesheet" href="css/inline-icons.css">' not in new_content:
        new_content = new_content.replace('</head>', '<link rel="stylesheet" href="css/inline-icons.css">\n    </head>')
    
    if '<script src="js/image-fallback.js"></script>' not in new_content:
        new_content = new_content.replace('</body>', '<script src="js/image-fallback.js"></script>\n  </body>')
    
    # 書き込み
    with open(service_current, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("サービスページを復元しました")
    return True

def create_minimal_service_page():
    """最小限のサービスページを作成"""
    print("\n最小限のサービスページを作成します...")
    
    service_minimal = os.path.join(SITE_DIR, 'service-minimal.html')
    
    # 最小限のHTMLを作成
    minimal_html = """<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>サービス紹介（最小版） | ふらっと法務事務所</title>
    <link rel="stylesheet" href="css/unified-layout.css">
    <link rel="stylesheet" href="css/inline-icons.css">
    <style>
        body {
            font-family: 'Noto Sans JP', sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .service-card {
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 20px;
            margin-bottom: 20px;
            background-color: #fff;
        }
        .service-title {
            color: #1a4b84;
            margin-top: 0;
        }
        .service-price {
            font-weight: bold;
            color: #e63946;
        }
        .service-description {
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <h1>ふらっと法務事務所</h1>
            <nav>
                <ul>
                    <li><a href="index.html">ホーム</a></li>
                    <li><a href="service.html" class="active">サービス</a></li>
                    <li><a href="flow.html">ご利用の流れ</a></li>
                </ul>
            </nav>
        </div>
    </header>
    
    <main>
        <div class="container">
            <h2>サービス紹介（最小版）</h2>
            <p>入札参加に必要なサポートをワンストップで提供します。</p>
            
            <div class="service-card">
                <h3 class="service-title">入札参加資格取得支援</h3>
                <p class="service-price">30,000円〜</p>
                <p class="service-description">
                    入札に参加するために必要な資格取得をサポートします。必要書類の作成から申請手続きまで、
                    専門家がトータルでサポートいたします。
                </p>
            </div>
            
            <div class="service-card">
                <h3 class="service-title">入札書類作成支援</h3>
                <p class="service-price">50,000円〜</p>
                <p class="service-description">
                    入札に必要な各種書類の作成をサポートします。仕様書の読み解きから、
                    提案書・見積書の作成まで、あなたの入札を成功に導きます。
                </p>
            </div>
            
            <div class="service-card">
                <h3 class="service-title">入札戦略立案</h3>
                <p class="service-price">100,000円〜</p>
                <p class="service-description">
                    過去の落札データ分析や市場調査に基づき、最適な入札戦略を立案します。
                    価格設定から提案内容まで、勝つための戦略をご提案します。
                </p>
            </div>
        </div>
    </main>
    
    <footer>
        <div class="container">
            <p>&copy; 2025 ふらっと法務事務所 All Rights Reserved.</p>
        </div>
    </footer>
    
    <script src="js/image-fallback.js"></script>
</body>
</html>
"""
    
    # 書き込み
    with open(service_minimal, 'w', encoding='utf-8') as f:
        f.write(minimal_html)
    
    print(f"最小限のサービスページを作成しました: {service_minimal}")
    return True

def main():
    """メイン処理"""
    print("サービスページコンテンツ復元スクリプトを開始します...")
    
    # 現在のファイルをバックアップ
    create_backup()
    
    # サービスページを強制的に復元
    force_restore_service_page()
    
    # 最小限のサービスページを作成
    create_minimal_service_page()
    
    print("\nサービスページコンテンツ復元スクリプトが完了しました。")
    print("以下のファイルを確認してください:")
    print(f"1. 復元したサービスページ: {os.path.join(SITE_DIR, 'service.html')}")
    print(f"2. 最小限のサービスページ: {os.path.join(SITE_DIR, 'service-minimal.html')}")

if __name__ == "__main__":
    main()
