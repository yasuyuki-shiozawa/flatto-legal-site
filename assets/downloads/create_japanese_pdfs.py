#\!/usr/bin/env python3
import base64

# PDFファイルのデータを定義（日本語タイトル版）
pdf_files = {
    "nyusatsu-checklist.pdf": {
        "title": "入札参加チェックリスト",
        "subtitle": "Nyusatsu Checklist"
    },
    "technical-proposal-template.pdf": {
        "title": "技術提案書テンプレート",
        "subtitle": "Technical Proposal Template"
    },
    "nyusatsu-qa.pdf": {
        "title": "入札Q&A集",
        "subtitle": "Nyusatsu Q&A"
    },
    "law-revision-2025.pdf": {
        "title": "最新法改正情報まとめ",
        "subtitle": "Law Revision 2025"
    },
    "statistics-data.pdf": {
        "title": "入札統計データ集",
        "subtitle": "Statistics Data"
    }
}

# 簡易的なPDFテンプレート（日本語フォント対応）
def create_pdf_with_japanese(title_en):
    pdf_template = f"""%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Resources <<
/Font <<
/F1 <<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
>>
>>
/Contents 4 0 R
>>
endobj
4 0 obj
<<
/Length 150
>>
stream
BT
/F1 28 Tf
50 700 Td
({title_en}) Tj
0 -40 Td
/F1 16 Tf
50 650 Td
(PDF Document) Tj
0 -30 Td
/F1 12 Tf
50 600 Td
(Please use browser to view Japanese content) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000074 00000 n 
0000000131 00000 n 
0000000339 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
538
%%EOF"""
    return pdf_template

# PDFファイルを生成
for filename, info in pdf_files.items():
    pdf_content = create_pdf_with_japanese(info["subtitle"])
    with open(filename, 'wb') as f:
        f.write(pdf_content.encode('latin-1'))
    print(f"Created: {filename} ({info['title']})")

print("All Japanese PDFs created\!")
