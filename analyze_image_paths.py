#!/usr/bin/env python3
"""
画像パスの不一致を分析するスクリプト
作成日: 2025年6月6日
"""

import os
import re
import glob
import json
from collections import defaultdict

# 作業ディレクトリ
SITE_DIR = '/home/ubuntu/flatto-legal-site'
IMAGES_DIR = os.path.join(SITE_DIR, 'images')

# GitHub Pagesのベースパス
GITHUB_BASE_URL = 'https://yasuyuki-shiozawa.github.io/flatto-legal-site'

def extract_image_paths_from_html():
    """HTMLファイルから画像参照パスを抽出"""
    image_references = defaultdict(list)
    html_files = glob.glob(os.path.join(SITE_DIR, '*.html'))
    
    for html_file in html_files:
        filename = os.path.basename(html_file)
        try:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # 画像パスを抽出
            # 絶対パスの場合
            abs_matches = re.findall(r'src="(https://[^"]+?/images/[^"]+)"', content)
            for match in abs_matches:
                # リポジトリ名以降のパスを抽出
                path_parts = match.split('/images/')
                if len(path_parts) > 1:
                    image_path = 'images/' + path_parts[1]
                    image_references[image_path].append({
                        'file': filename,
                        'path_type': 'absolute',
                        'original_path': match
                    })
            
            # 相対パスの場合
            rel_matches = re.findall(r'src="(images/[^"]+)"', content)
            for match in rel_matches:
                image_references[match].append({
                    'file': filename,
                    'path_type': 'relative',
                    'original_path': match
                })
                
        except Exception as e:
            print(f"エラー: {html_file} の処理中にエラーが発生しました - {str(e)}")
    
    return image_references

def get_actual_image_files():
    """実際の画像ファイルのリストを取得"""
    actual_images = []
    
    for root, _, files in os.walk(IMAGES_DIR):
        for file in files:
            rel_path = os.path.relpath(os.path.join(root, file), SITE_DIR)
            actual_images.append(rel_path)
    
    return actual_images

def analyze_path_discrepancies(image_references, actual_images):
    """パスの不一致を分析"""
    analysis = {
        'missing_files': [],
        'case_sensitivity_issues': [],
        'path_structure_issues': [],
        'summary': {
            'total_references': 0,
            'total_unique_references': 0,
            'total_actual_files': len(actual_images),
            'total_issues': 0
        }
    }
    
    # 参照パスの総数をカウント
    for path, references in image_references.items():
        analysis['summary']['total_references'] += len(references)
    
    analysis['summary']['total_unique_references'] = len(image_references)
    
    # 実際のファイルパスを小文字に変換したマップを作成
    actual_images_lower = {img.lower(): img for img in actual_images}
    
    # 各参照パスについて分析
    for ref_path, references in image_references.items():
        # 完全一致するファイルがあるか
        if ref_path in actual_images:
            continue
        
        # 大文字小文字の違いだけか
        if ref_path.lower() in actual_images_lower:
            analysis['case_sensitivity_issues'].append({
                'reference_path': ref_path,
                'actual_path': actual_images_lower[ref_path.lower()],
                'files': [ref['file'] for ref in references]
            })
            continue
        
        # パス構造の問題か（例: images/icons/icon.png vs images/icon.png）
        path_parts = ref_path.split('/')
        if len(path_parts) >= 3:  # images/subdirectory/filename.ext
            # サブディレクトリなしのパスをチェック
            simplified_path = 'images/' + path_parts[-1]
            if simplified_path in actual_images or simplified_path.lower() in actual_images_lower:
                actual_path = simplified_path if simplified_path in actual_images else actual_images_lower[simplified_path.lower()]
                analysis['path_structure_issues'].append({
                    'reference_path': ref_path,
                    'actual_path': actual_path,
                    'issue_type': 'extra_subdirectory',
                    'files': [ref['file'] for ref in references]
                })
                continue
        else:  # images/filename.ext
            # サブディレクトリありのパスをチェック
            filename = path_parts[-1]
            for actual_path in actual_images:
                if actual_path.endswith('/' + filename) or actual_path.lower().endswith('/' + filename.lower()):
                    analysis['path_structure_issues'].append({
                        'reference_path': ref_path,
                        'actual_path': actual_path,
                        'issue_type': 'missing_subdirectory',
                        'files': [ref['file'] for ref in references]
                    })
                    break
            else:  # forループがbreakせずに終了した場合
                # 完全に見つからないファイル
                analysis['missing_files'].append({
                    'reference_path': ref_path,
                    'files': [ref['file'] for ref in references]
                })
    
    # 総問題数を計算
    analysis['summary']['total_issues'] = (
        len(analysis['missing_files']) + 
        len(analysis['case_sensitivity_issues']) + 
        len(analysis['path_structure_issues'])
    )
    
    return analysis

def generate_fix_recommendations(analysis):
    """修正の推奨事項を生成"""
    recommendations = []
    
    # 大文字小文字の問題
    if analysis['case_sensitivity_issues']:
        recommendations.append({
            'issue_type': 'case_sensitivity',
            'description': 'ファイル名の大文字小文字の不一致',
            'recommendation': 'HTMLでの参照パスを実際のファイル名の大文字小文字に合わせる',
            'affected_files': list(set([issue['files'][0] for issue in analysis['case_sensitivity_issues']]))
        })
    
    # パス構造の問題
    if analysis['path_structure_issues']:
        extra_subdirectory_files = [
            issue['files'][0] for issue in analysis['path_structure_issues'] 
            if issue['issue_type'] == 'extra_subdirectory'
        ]
        
        missing_subdirectory_files = [
            issue['files'][0] for issue in analysis['path_structure_issues'] 
            if issue['issue_type'] == 'missing_subdirectory'
        ]
        
        if extra_subdirectory_files:
            recommendations.append({
                'issue_type': 'extra_subdirectory',
                'description': '余分なサブディレクトリが指定されている',
                'recommendation': 'HTMLでの参照パスから余分なサブディレクトリを削除する',
                'affected_files': list(set(extra_subdirectory_files))
            })
        
        if missing_subdirectory_files:
            recommendations.append({
                'issue_type': 'missing_subdirectory',
                'description': '必要なサブディレクトリが指定されていない',
                'recommendation': 'HTMLでの参照パスに必要なサブディレクトリを追加する',
                'affected_files': list(set(missing_subdirectory_files))
            })
    
    # 見つからないファイル
    if analysis['missing_files']:
        recommendations.append({
            'issue_type': 'missing_files',
            'description': '参照されているが存在しないファイル',
            'recommendation': '不足している画像ファイルを作成するか、HTMLでの参照を修正する',
            'affected_files': list(set([issue['files'][0] for issue in analysis['missing_files']]))
        })
    
    return recommendations

def main():
    """メイン処理"""
    print("画像パスの分析を開始します...")
    
    # HTMLファイルから画像参照パスを抽出
    image_references = extract_image_paths_from_html()
    print(f"HTMLファイルから {len(image_references)} 個のユニークな画像参照を抽出しました")
    
    # 実際の画像ファイルのリストを取得
    actual_images = get_actual_image_files()
    print(f"実際のファイルシステムから {len(actual_images)} 個の画像ファイルを検出しました")
    
    # パスの不一致を分析
    analysis = analyze_path_discrepancies(image_references, actual_images)
    print(f"分析結果: {analysis['summary']['total_issues']} 個の問題を検出しました")
    print(f"- 見つからないファイル: {len(analysis['missing_files'])} 個")
    print(f"- 大文字小文字の不一致: {len(analysis['case_sensitivity_issues'])} 個")
    print(f"- パス構造の問題: {len(analysis['path_structure_issues'])} 個")
    
    # 修正の推奨事項を生成
    recommendations = generate_fix_recommendations(analysis)
    print(f"{len(recommendations)} 個の修正推奨事項を生成しました")
    
    # 結果をJSONファイルに保存
    result = {
        'analysis': analysis,
        'recommendations': recommendations
    }
    
    with open(os.path.join(SITE_DIR, 'image_path_analysis_result.json'), 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    
    # 人間が読みやすいレポートを生成
    generate_human_readable_report(analysis, recommendations)
    
    print("分析が完了しました。詳細は image_path_analysis_result.json と image_path_analysis_report.md を参照してください。")

def generate_human_readable_report(analysis, recommendations):
    """人間が読みやすいレポートを生成"""
    report = """# 画像パス分析レポート

## 概要

- 参照されている画像: {total_references}個 (ユニーク: {total_unique_references}個)
- 実際に存在する画像ファイル: {total_actual_files}個
- 検出された問題: {total_issues}個

## 問題の詳細

### 1. 見つからないファイル ({missing_files_count}個)

参照されているが実際には存在しない画像ファイル:

""".format(
        total_references=analysis['summary']['total_references'],
        total_unique_references=analysis['summary']['total_unique_references'],
        total_actual_files=analysis['summary']['total_actual_files'],
        total_issues=analysis['summary']['total_issues'],
        missing_files_count=len(analysis['missing_files'])
    )
    
    # 見つからないファイル
    if analysis['missing_files']:
        for issue in analysis['missing_files']:
            report += f"- `{issue['reference_path']}` (参照元: {', '.join(issue['files'])})\n"
    else:
        report += "なし\n"
    
    # 大文字小文字の不一致
    report += f"\n### 2. 大文字小文字の不一致 ({len(analysis['case_sensitivity_issues'])}個)\n\n"
    report += "ファイル名の大文字小文字が一致していない参照:\n\n"
    
    if analysis['case_sensitivity_issues']:
        for issue in analysis['case_sensitivity_issues']:
            report += f"- 参照: `{issue['reference_path']}`, 実際: `{issue['actual_path']}` (参照元: {', '.join(issue['files'])})\n"
    else:
        report += "なし\n"
    
    # パス構造の問題
    report += f"\n### 3. パス構造の問題 ({len(analysis['path_structure_issues'])}個)\n\n"
    report += "ディレクトリ構造が一致していない参照:\n\n"
    
    if analysis['path_structure_issues']:
        for issue in analysis['path_structure_issues']:
            issue_type = "余分なサブディレクトリ" if issue['issue_type'] == 'extra_subdirectory' else "不足しているサブディレクトリ"
            report += f"- 参照: `{issue['reference_path']}`, 実際: `{issue['actual_path']}` ({issue_type}, 参照元: {', '.join(issue['files'])})\n"
    else:
        report += "なし\n"
    
    # 修正の推奨事項
    report += "\n## 修正の推奨事項\n\n"
    
    if recommendations:
        for i, rec in enumerate(recommendations, 1):
            report += f"### 推奨事項 {i}: {rec['description']}\n\n"
            report += f"**推奨される対応**: {rec['recommendation']}\n\n"
            report += "**影響を受けるファイル**:\n\n"
            for file in rec['affected_files']:
                report += f"- {file}\n"
            report += "\n"
    else:
        report += "修正が必要な問題は検出されませんでした。\n"
    
    # レポートをファイルに保存
    with open(os.path.join(SITE_DIR, 'image_path_analysis_report.md'), 'w', encoding='utf-8') as f:
        f.write(report)

if __name__ == "__main__":
    main()
