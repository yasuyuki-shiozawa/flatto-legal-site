#!/bin/bash
# 入札マップサイト 手動バックアップスクリプト
# 使用方法: ./scripts/manual-backup.sh [backup_type]
# backup_type: quick, full, config-only

set -e  # エラー時に停止

# 設定
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
BACKUP_DIR="$PROJECT_DIR/backups"
DATE=$(date +'%Y-%m-%d')
TIMESTAMP=$(date +'%Y%m%d_%H%M%S')

# 色付きメッセージ関数
print_info() {
    echo -e "\033[34m[INFO]\033[0m $1"
}

print_success() {
    echo -e "\033[32m[SUCCESS]\033[0m $1"
}

print_warning() {
    echo -e "\033[33m[WARNING]\033[0m $1"
}

print_error() {
    echo -e "\033[31m[ERROR]\033[0m $1"
}

# ヘルプ表示
show_help() {
    cat << EOF
入札マップサイト 手動バックアップスクリプト

使用方法:
    $0 [backup_type]

バックアップタイプ:
    quick       - 基本ファイルのみ（デフォルト）
    full        - 全ファイル（.gitディレクトリ含む）
    config-only - 設定ファイルのみ
    help        - このヘルプを表示

例:
    $0 quick
    $0 full
    $0 config-only

EOF
}

# バックアップディレクトリを作成
create_backup_dirs() {
    print_info "バックアップディレクトリを作成中..."
    mkdir -p "$BACKUP_DIR"/{manual,daily,weekly,monthly,logs}
    print_success "バックアップディレクトリを作成しました"
}

# クイックバックアップ（基本ファイルのみ）
quick_backup() {
    print_info "クイックバックアップを開始..."
    
    local backup_file="$BACKUP_DIR/manual/quick-backup-$TIMESTAMP.tar.gz"
    
    cd "$PROJECT_DIR"
    tar -czf "$backup_file" \
        --exclude='.git' \
        --exclude='node_modules' \
        --exclude='backups' \
        --exclude='*.log' \
        --exclude='*.tmp' \
        --exclude='.DS_Store' \
        .
    
    print_success "クイックバックアップ完了: $backup_file"
    ls -lh "$backup_file"
}

# フルバックアップ（全ファイル）
full_backup() {
    print_info "フルバックアップを開始..."
    
    local backup_file="$BACKUP_DIR/manual/full-backup-$TIMESTAMP.tar.gz"
    
    cd "$PROJECT_DIR"
    tar -czf "$backup_file" \
        --exclude='node_modules' \
        --exclude='backups/daily' \
        --exclude='backups/weekly' \
        --exclude='backups/monthly' \
        --exclude='*.log' \
        --exclude='*.tmp' \
        --exclude='.DS_Store' \
        .
    
    print_success "フルバックアップ完了: $backup_file"
    ls -lh "$backup_file"
}

# 設定ファイルのみバックアップ
config_backup() {
    print_info "設定ファイルバックアップを開始..."
    
    local config_dir="$BACKUP_DIR/manual/config-backup-$TIMESTAMP"
    mkdir -p "$config_dir"
    
    cd "$PROJECT_DIR"
    
    # 重要な設定ファイルをコピー
    local files=(
        "_headers"
        "robots.txt"
        "sitemap.xml"
        "_config.yml"
        "netlify.toml"
        "package.json"
        ".github/workflows/backup.yml"
    )
    
    for file in "${files[@]}"; do
        if [ -f "$file" ]; then
            cp "$file" "$config_dir/"
            print_info "コピー: $file"
        else
            print_warning "ファイルが見つかりません: $file"
        fi
    done
    
    # ディレクトリをコピー
    local dirs=(
        "_data"
        "_includes"
        "_layouts"
        "scripts"
    )
    
    for dir in "${dirs[@]}"; do
        if [ -d "$dir" ]; then
            cp -r "$dir" "$config_dir/"
            print_info "コピー: $dir/"
        else
            print_warning "ディレクトリが見つかりません: $dir"
        fi
    done
    
    # アーカイブ化
    local archive_file="$BACKUP_DIR/manual/config-backup-$TIMESTAMP.tar.gz"
    tar -czf "$archive_file" -C "$BACKUP_DIR/manual" "config-backup-$TIMESTAMP"
    rm -rf "$config_dir"
    
    print_success "設定ファイルバックアップ完了: $archive_file"
    ls -lh "$archive_file"
}

# バックアップログを作成
create_backup_log() {
    local backup_type="$1"
    local log_file="$BACKUP_DIR/logs/manual-backup-$TIMESTAMP.log"
    
    cat > "$log_file" << EOF
手動バックアップログ
==================

実行日時: $(date)
バックアップタイプ: $backup_type
実行ユーザー: $(whoami)
実行ディレクトリ: $PROJECT_DIR

システム情報:
- OS: $(uname -s)
- カーネル: $(uname -r)
- アーキテクチャ: $(uname -m)

プロジェクト情報:
- ファイル数: $(find "$PROJECT_DIR" -type f -not -path '*/.*' -not -path '*/node_modules/*' -not -path '*/backups/*' | wc -l)
- 総サイズ: $(du -sh "$PROJECT_DIR" | cut -f1)

Git情報:
- ブランチ: $(git -C "$PROJECT_DIR" branch --show-current 2>/dev/null || echo "不明")
- 最新コミット: $(git -C "$PROJECT_DIR" log -1 --oneline 2>/dev/null || echo "不明")

バックアップファイル:
$(ls -la "$BACKUP_DIR/manual/"*backup-$TIMESTAMP* 2>/dev/null || echo "バックアップファイルなし")

EOF
    
    print_success "バックアップログ作成: $log_file"
}

# 古いバックアップを削除
cleanup_old_backups() {
    print_info "古いバックアップファイルをクリーンアップ中..."
    
    # 30日以上古い手動バックアップを削除
    find "$BACKUP_DIR/manual" -name "*.tar.gz" -mtime +30 -delete 2>/dev/null || true
    
    # 90日以上古いログを削除
    find "$BACKUP_DIR/logs" -name "manual-backup-*.log" -mtime +90 -delete 2>/dev/null || true
    
    print_success "クリーンアップ完了"
}

# バックアップ結果を表示
show_backup_summary() {
    print_info "バックアップサマリー"
    echo "===================="
    echo "実行日時: $(date)"
    echo "バックアップディレクトリ: $BACKUP_DIR"
    echo ""
    echo "最新のバックアップファイル:"
    ls -lt "$BACKUP_DIR/manual/"*backup-$TIMESTAMP* 2>/dev/null || echo "バックアップファイルなし"
    echo ""
    echo "ディスク使用量:"
    du -sh "$BACKUP_DIR" 2>/dev/null || echo "不明"
}

# メイン処理
main() {
    local backup_type="${1:-quick}"
    
    case "$backup_type" in
        "help"|"-h"|"--help")
            show_help
            exit 0
            ;;
        "quick")
            print_info "クイックバックアップを実行します"
            ;;
        "full")
            print_info "フルバックアップを実行します"
            ;;
        "config-only")
            print_info "設定ファイルバックアップを実行します"
            ;;
        *)
            print_error "不正なバックアップタイプ: $backup_type"
            show_help
            exit 1
            ;;
    esac
    
    # プロジェクトディレクトリの確認
    if [ ! -d "$PROJECT_DIR" ]; then
        print_error "プロジェクトディレクトリが見つかりません: $PROJECT_DIR"
        exit 1
    fi
    
    print_info "プロジェクトディレクトリ: $PROJECT_DIR"
    
    # バックアップ実行
    create_backup_dirs
    
    case "$backup_type" in
        "quick")
            quick_backup
            ;;
        "full")
            full_backup
            ;;
        "config-only")
            config_backup
            ;;
    esac
    
    create_backup_log "$backup_type"
    cleanup_old_backups
    show_backup_summary
    
    print_success "バックアップ処理が完了しました！"
}

# スクリプト実行
main "$@"

