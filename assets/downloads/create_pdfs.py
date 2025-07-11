#!/usr/bin/env python3
"""
Create PDF files for download resources
Uses HTML to PDF conversion concept
"""

import os
import base64

def create_html_for_pdf(title, content, filename):
    """Create HTML that can be converted to PDF"""
    
    html_content = f"""<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <style>
        @page {{
            size: A4;
            margin: 20mm;
        }}
        body {{
            font-family: "Noto Sans CJK JP", "Yu Gothic", "Hiragino Sans", sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 100%;
            margin: 0;
            padding: 0;
        }}
        h1 {{
            color: #2c3e50;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
            margin-bottom: 30px;
            font-size: 24px;
        }}
        h2 {{
            color: #2c3e50;
            border-bottom: 1px solid #3498db;
            padding-bottom: 5px;
            margin-top: 30px;
            margin-bottom: 15px;
            font-size: 18px;
        }}
        h3 {{
            color: #34495e;
            margin-top: 20px;
            margin-bottom: 10px;
            font-size: 16px;
        }}
        .checkbox-list {{
            list-style: none;
            padding-left: 0;
        }}
        .checkbox-list li {{
            margin: 8px 0;
            padding-left: 25px;
            position: relative;
        }}
        .checkbox-list li:before {{
            content: "☐";
            position: absolute;
            left: 0;
            color: #3498db;
            font-weight: bold;
        }}
        .important {{
            background: #fff3cd;
            padding: 15px;
            border-left: 4px solid #ffc107;
            margin: 20px 0;
            border-radius: 4px;
        }}
        .footer {{
            margin-top: 40px;
            text-align: right;
            border-top: 1px solid #ddd;
            padding-top: 20px;
            color: #666;
        }}
        .section {{
            margin: 20px 0;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 5px;
        }}
        @media print {{
            body {{ margin: 0; }}
            .no-print {{ display: none; }}
        }}
    </style>
</head>
<body>
    {content}
    
    <div class="footer">
        <strong>行政書士法人ふらっと法務事務所</strong><br>
        TEL: 046-272-3357<br>
        Email: mail@flat-legal.com
    </div>
</body>
</html>"""
    
    # HTMLファイルとして保存
    with open(f"{filename}.html", "w", encoding="utf-8") as f:
        f.write(html_content)
    
    return html_content

def create_checklist_content():
    """入札参加チェックリストのコンテンツを生成"""
    return """
    <h1>入札参加チェックリスト</h1>
    
    <div class="important">
        <strong>重要：</strong>このチェックリストを使って、入札参加前に必要な準備が整っているか確認しましょう。
    </div>

    <h2>1. 入札参加資格の確認</h2>
    <div class="section">
        <h3>基本的な参加資格</h3>
        <ul class="checkbox-list">
            <li>入札参加資格を取得済みである</li>
            <li>資格の有効期限内である（通常2～3年）</li>
            <li>必要な等級（ランク）を満たしている</li>
            <li>地域要件を満たしている（本店・支店・営業所の所在地）</li>
            <li>業種区分が適合している</li>
        </ul>
        
        <h3>資格更新・変更</h3>
        <ul class="checkbox-list">
            <li>次回更新時期を把握している</li>
            <li>代表者・所在地等の変更がある場合、変更届を提出済みである</li>
            <li>財務諸表等の定期提出を完了している</li>
        </ul>
    </div>

    <h2>2. 必要書類の準備状況</h2>
    <div class="section">
        <h3>証明書類（申請前3ヶ月以内のもの）</h3>
        <ul class="checkbox-list">
            <li>納税証明書（国税・地方税）</li>
            <li>登記事項証明書（履歴事項全部証明書）</li>
            <li>印鑑証明書</li>
            <li>社会保険料納入証明書</li>
        </ul>
        
        <h3>財務関係書類</h3>
        <ul class="checkbox-list">
            <li>財務諸表（直近3年分）</li>
            <li>決算書類一式</li>
            <li>会社概要書・パンフレット</li>
        </ul>
        
        <h3>建設業関係（建設工事の場合）</h3>
        <ul class="checkbox-list">
            <li>建設業許可証の写し</li>
            <li>経営事項審査結果通知書</li>
            <li>技術者名簿</li>
            <li>工事経歴書</li>
        </ul>
    </div>

    <h2>3. 技術者・体制の確認</h2>
    <div class="section">
        <ul class="checkbox-list">
            <li>必要な資格を持つ技術者を配置できる</li>
            <li>主任技術者・監理技術者を専任で配置できる</li>
            <li>現場代理人を配置できる</li>
            <li>安全管理者を配置できる</li>
            <li>品質管理責任者を配置できる</li>
        </ul>
    </div>

    <h2>4. 財務・経営状況の確認</h2>
    <div class="section">
        <ul class="checkbox-list">
            <li>自己資本比率が基準を満たしている</li>
            <li>流動比率が適正である</li>
            <li>営業年数が要件を満たしている</li>
            <li>年間完成工事高が十分である</li>
            <li>手持ち工事量に余裕がある</li>
        </ul>
    </div>

    <h2>5. 入札手続きの確認</h2>
    <div class="section">
        <ul class="checkbox-list">
            <li>入札説明書を熟読している</li>
            <li>現場説明会の参加予定を確認している</li>
            <li>質問事項がある場合、期限内に提出予定である</li>
            <li>入札書提出期限を確認している</li>
            <li>開札日時・場所を確認している</li>
            <li>電子入札の場合、ICカード等の準備ができている</li>
        </ul>
    </div>

    <h2>6. 価格・積算の確認</h2>
    <div class="section">
        <ul class="checkbox-list">
            <li>設計図書を十分に検討している</li>
            <li>現場条件を把握している</li>
            <li>積算内容が適正である</li>
            <li>最低制限価格制度を確認している</li>
            <li>低入札価格調査制度を確認している</li>
            <li>入札価格が適正利益を確保できる水準である</li>
        </ul>
    </div>

    <h2>7. リスク管理</h2>
    <div class="section">
        <ul class="checkbox-list">
            <li>契約条件に問題がないか確認している</li>
            <li>工期が実現可能である</li>
            <li>技術的に実施可能である</li>
            <li>下請業者の確保ができる</li>
            <li>材料・資材の調達に問題がない</li>
            <li>保険関係の準備ができている</li>
        </ul>
    </div>

    <h2>8. 最終確認事項</h2>
    <div class="section">
        <ul class="checkbox-list">
            <li>提出書類に不備がない</li>
            <li>提出期限を守れる</li>
            <li>入札保証金の準備ができている（必要な場合）</li>
            <li>契約保証金の準備ができる（落札時）</li>
            <li>前払金保証事業会社との契約ができる（必要な場合）</li>
        </ul>
    </div>
    """

# メイン実行部分
if __name__ == "__main__":
    print("Creating HTML files for PDF conversion...")
    
    # 入札参加チェックリスト
    checklist_content = create_checklist_content()
    create_html_for_pdf("入札参加チェックリスト", checklist_content, "nyusatsu-checklist")
    
    print("✓ nyusatsu-checklist.html created")
    print("\\nTo convert to PDF:")
    print("1. Open the HTML file in a browser")
    print("2. Print -> Save as PDF")
    print("3. Rename to .pdf and place in downloads folder")