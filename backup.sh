#!/bin/bash

# ふらっと法務事務所 入札サポート専門サイト 自動バックアップスクリプト
# 作成日: 2025年6月6日

# バックアップ設定
SITE_DIR="/home/ubuntu/flatto-legal-site"
BACKUP_BASE_DIR="/home/ubuntu/flatto-legal-backups"
DATE=$(date +"%Y-%m-%d_%H-%M-%S")
VERSION="1.0"
BACKUP_DIR="${BACKUP_BASE_DIR}/backup_${DATE}_v${VERSION}"

# バックアップ先ディレクトリが存在しない場合は作成
if [ ! -d "$BACKUP_BASE_DIR" ]; then
  mkdir -p "$BACKUP_BASE_DIR"
  echo "バックアップ用ベースディレクトリを作成しました: $BACKUP_BASE_DIR"
fi

# バックアップディレクトリの作成
mkdir -p "$BACKUP_DIR"
echo "バックアップディレクトリを作成しました: $BACKUP_DIR"

# サイトファイルのバックアップ
echo "サイトファイルのバックアップを開始します..."
cp -r "$SITE_DIR"/* "$BACKUP_DIR"
echo "サイトファイルのバックアップが完了しました"

# Gitリポジトリの状態も保存（最新のコミットハッシュなど）
if [ -d "$SITE_DIR/.git" ]; then
  echo "Gitリポジトリ情報を保存します..."
  cd "$SITE_DIR"
  git log -1 > "$BACKUP_DIR/git_last_commit.txt"
  git status > "$BACKUP_DIR/git_status.txt"
  git branch > "$BACKUP_DIR/git_branches.txt"
  echo "Gitリポジトリ情報の保存が完了しました"
fi

# バックアップ情報ファイルの作成
cat > "$BACKUP_DIR/backup_info.txt" << EOF
バックアップ情報
---------------
日時: $(date)
バックアップ元: $SITE_DIR
バックアップ先: $BACKUP_DIR
バージョン: $VERSION

このバックアップには以下のファイルが含まれています:
$(ls -la "$BACKUP_DIR" | grep -v "backup_info.txt")
EOF

echo "バックアップ情報ファイルを作成しました"

# バックアップの圧縮（オプション）
echo "バックアップを圧縮しています..."
cd "$BACKUP_BASE_DIR"
tar -czf "backup_${DATE}_v${VERSION}.tar.gz" "backup_${DATE}_v${VERSION}"
echo "バックアップの圧縮が完了しました: backup_${DATE}_v${VERSION}.tar.gz"

# 古いバックアップの削除（30日以上前のものを削除）
echo "古いバックアップを確認しています..."
find "$BACKUP_BASE_DIR" -name "backup_*_v*.tar.gz" -type f -mtime +30 -delete
echo "30日以上前の古いバックアップを削除しました"

echo "バックアップ処理が完了しました"
echo "バックアップファイル: ${BACKUP_BASE_DIR}/backup_${DATE}_v${VERSION}.tar.gz"
