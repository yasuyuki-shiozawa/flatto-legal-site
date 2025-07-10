#!/usr/bin/env python3
"""
入札マップ ブログ記事エクスポートスクリプト
Jekyllの_postsディレクトリから記事データを抽出してJSON形式で出力
"""

import os
import re
import json
import yaml
from datetime import datetime
from pathlib import Path

class BlogExporter:
    def __init__(self, posts_dir="_posts"):
        self.posts_dir = posts_dir
        self.posts_data = []
        
    def parse_frontmatter(self, content):
        """フロントマターとコンテンツを分離"""
        if content.startswith('---'):
            try:
                parts = content.split('---', 2)
                if len(parts) >= 3:
                    frontmatter = yaml.safe_load(parts[1])
                    body = parts[2].strip()
                    return frontmatter, body
            except yaml.YAMLError as e:
                print(f"YAML parse error: {e}")
        return {}, content
    
    def extract_post_data(self, filepath):
        """記事ファイルからデータを抽出"""
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        frontmatter, body = self.parse_frontmatter(content)
        
        # ファイル名から日付とスラッグを抽出
        filename = os.path.basename(filepath)
        match = re.match(r'(\d{4}-\d{2}-\d{2})-(.+)\.md', filename)
        
        if match:
            date_str = match.group(1)
            slug = match.group(2)
        else:
            date_str = datetime.now().strftime('%Y-%m-%d')
            slug = filename.replace('.md', '')
        
        # コンテンツの最初の部分を抽出（プレビュー用）
        content_preview = body[:500] + "..." if len(body) > 500 else body
        
        return {
            'filename': filename,
            'slug': slug,
            'title': frontmatter.get('title', ''),
            'date': frontmatter.get('date', date_str),
            'categories': frontmatter.get('categories', []),
            'tags': frontmatter.get('tags', []),
            'author': frontmatter.get('author', ''),
            'excerpt': frontmatter.get('excerpt', ''),
            'description': frontmatter.get('description', ''),
            'content_preview': content_preview,
            'full_content': body,
            'word_count': len(body)
        }
    
    def export_posts(self):
        """すべての記事をエクスポート"""
        posts_path = Path(self.posts_dir)
        
        if not posts_path.exists():
            print(f"Error: {self.posts_dir} directory not found")
            return
        
        # すべてのマークダウンファイルを処理
        for post_file in sorted(posts_path.glob('*.md')):
            print(f"Processing: {post_file.name}")
            post_data = self.extract_post_data(post_file)
            self.posts_data.append(post_data)
        
        # メタデータの集計
        metadata = self.generate_metadata()
        
        # 結果を出力
        export_data = {
            'blog_posts': self.posts_data,
            'metadata': metadata,
            'export_date': datetime.now().isoformat()
        }
        
        return export_data
    
    def generate_metadata(self):
        """メタデータの生成"""
        categories_count = {}
        tags_count = {}
        authors_count = {}
        
        for post in self.posts_data:
            # カテゴリ集計
            for category in post['categories']:
                categories_count[category] = categories_count.get(category, 0) + 1
            
            # タグ集計
            for tag in post['tags']:
                tags_count[tag] = tags_count.get(tag, 0) + 1
            
            # 著者集計
            author = post['author']
            if author:
                authors_count[author] = authors_count.get(author, 0) + 1
        
        return {
            'total_posts': len(self.posts_data),
            'categories_count': categories_count,
            'tags_count': tags_count,
            'authors_count': authors_count,
            'date_range': {
                'oldest': min(p['date'] for p in self.posts_data) if self.posts_data else None,
                'newest': max(p['date'] for p in self.posts_data) if self.posts_data else None
            }
        }
    
    def save_to_json(self, output_file='blog_export.json'):
        """JSONファイルに保存"""
        export_data = self.export_posts()
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(export_data, f, ensure_ascii=False, indent=2)
        
        print(f"\nExport completed: {output_file}")
        print(f"Total posts exported: {len(self.posts_data)}")
        
        return output_file

# 使用例
if __name__ == "__main__":
    exporter = BlogExporter()
    exporter.save_to_json('nyusatsu_blog_export.json')