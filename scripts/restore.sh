#!/bin/bash
# 入札マップサイト 復元スクリプト
# 使用方法: ./scripts/restore.sh [backup_file] [restore_type]

set -e  # エラー時に停止

# 設定
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
BACKUP_DIR="$PROJECT_DIR/backups"
RESTORE_DIR="$PROJECT_DIR/restore"
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

print_question() {
    echo -e "\033[35m[QUESTION]\033[0m $1"
}

# ヘルプ表示
show_help() {
    cat << EOF
入札マップサイト 復元スクリプト

使用方法:
    $0 [backup_file] [restore_type]

復元タイプ:
    preview     - 復元内容をプレビュー（デフォルト）
    safe        - 現在のファイルをバックアップしてから復元
    force       - 強制復元（現在のファイルを上書き）
    config-only - 設定ファイルのみ復元
    help        - このヘルプを表示

例:
    $0                                          # 最新バックアップをプレビュー
    $0 backups/daily/site-backup-20250610.tar.gz preview
    $0 backups/daily/site-backup-20250610.tar.gz safe
    $0 backups/weekly/full-backup-2025-W23.tar.gz force

注意:
    - 復元前に必ず現在の状態をバックアップすることを推奨します
    - 'force' オプションは慎重に使用してください

EOF
}

# 利用可能なバックアップファイルを表示
list_backups() {
    print_info "利用可能なバックアップファイル:"
    echo ""
    
    if [ -d "$BACKUP_DIR" ]; then
        echo "📁 日次バックアップ:"
        find "$BACKUP_DIR/daily" -name "*.tar.gz" -exec ls -lh {} \; 2>/dev/null | head -5 || echo "  なし"
        echo ""
        
        echo "📁 週次バックアップ:"
        find "$BACKUP_DIR/weekly" -name "*.tar.gz" -exec ls -lh {} \; 2>/dev/null | head -5 || echo "  なし"
        echo ""
        
        echo "📁 月次バックアップ:"
        find "$BACKUP_DIR/monthly" -name "*.tar.gz" -exec ls -lh {} \; 2>/dev/null | head -5 || echo "  なし"
        echo ""
        
        echo "📁 手動バックアップ:"
        find "$BACKUP_DIR/manual" -name "*.tar.gz" -exec ls -lh {} \; 2>/dev/null | head -5 || echo "  なし"
    else
        print_warning "バックアップディレクトリが見つかりません: $BACKUP_DIR"
    fi
}

# 最新のバックアップファイルを取得
get_latest_backup() {
    local latest_file=""
    
    # 日次バックアップから最新を検索
    if [ -d "$BACKUP_DIR/daily" ]; then
        latest_file=$(find "$BACKUP_DIR/daily" -name "*.tar.gz" -type f -printf '%T@ %p\n' 2>/dev/null | sort -n | tail -1 | cut -d' ' -f2-)
    fi
    
    # 週次バックアップも確認
    if [ -d "$BACKUP_DIR/weekly" ]; then
        local weekly_latest=$(find "$BACKUP_DIR/weekly" -name "*.tar.gz" -type f -printf '%T@ %p\n' 2>/dev/null | sort -n | tail -1 | cut -d' ' -f2-)
        if [ -n "$weekly_latest" ] && [ "$weekly_latest" -nt "$latest_file" ]; then
            latest_file="$weekly_latest"
        fi
    fi
    
    echo "$latest_file"
}

# バックアップファイルの内容をプレビュー
preview_backup() {
    local backup_file="$1"
    
    if [ ! -f "$backup_file" ]; then
        print_error "バックアップファイルが見つかりません: $backup_file"
        return 1
    fi
    
    print_info "バックアップファイルの内容をプレビュー中..."
    echo "ファイル: $backup_file"
    echo "サイズ: $(ls -lh "$backup_file" | awk '{print $5}')"
    echo "作成日時: $(ls -l "$backup_file" | awk '{print $6, $7, $8}')"
    echo ""
    
    print_info "アーカイブ内容:"
    tar -tzf "$backup_file" | head -20
    
    local total_files=$(tar -tzf "$backup_file" | wc -l)
    if [ "$total_files" -gt 20 ]; then
        echo "... および他 $((total_files - 20)) ファイル"
    fi
    
    echo ""
    print_info "総ファイル数: $total_files"
}

# 現在の状態をバックアップ
backup_current_state() {
    print_info "現在の状態をバックアップ中..."
    
    local current_backup="$BACKUP_DIR/restore-backup/before-restore-$TIMESTAMP.tar.gz"
    mkdir -p "$(dirname "$current_backup")"
    
    cd "$PROJECT_DIR"
    tar -czf "$current_backup" \
        --exclude='.git' \
        --exclude='node_modules' \
        --exclude='backups' \
        --exclude='restore' \
        --exclude='*.log' \
        --exclude='*.tmp' \
        .
    
    print_success "現在の状態をバックアップしました: $current_backup"
    return 0
}

# ファイルを復元
restore_files() {
    local backup_file="$1"
    local restore_type="$2"
    
    if [ ! -f "$backup_file" ]; then
        print_error "バックアップファイルが見つかりません: $backup_file"
        return 1
    fi
    
    # 復元ディレクトリを作成
    mkdir -p "$RESTORE_DIR"
    
    print_info "バックアップファイルを展開中..."
    cd "$RESTORE_DIR"
    tar -xzf "$backup_file"
    
    # 復元対象ディレクトリを特定
    local source_dir="$RESTORE_DIR"
    if [ -d "$RESTORE_DIR/$(basename "$backup_file" .tar.gz)" ]; then
        source_dir="$RESTORE_DIR/$(basename "$backup_file" .tar.gz)"
    fi
    
    case "$restore_type" in
        "config-only")
            restore_config_only "$source_dir"
            ;;
        "safe"|"force")
            restore_all_files "$source_dir" "$restore_type"
            ;;
        *)
            print_error "不正な復元タイプ: $restore_type"
            return 1
            ;;
    esac
}

# 設定ファイルのみ復元
restore_config_only() {
    local source_dir="$1"
    
    print_info "設定ファイルのみを復元中..."
    
    local config_files=(
        "_headers"
        "robots.txt"
        "sitemap.xml"
        "_config.yml"
        "netlify.toml"
        "package.json"
    )
    
    local config_dirs=(
        "_data"
        "_includes"
        "_layouts"
        "scripts"
        ".github"
    )
    
    cd "$PROJECT_DIR"
    
    # ファイルを復元
    for file in "${config_files[@]}"; do
        if [ -f "$source_dir/$file" ]; then
            cp "$source_dir/$file" "$PROJECT_DIR/"
            print_success "復元: $file"
        else
            print_warning "ファイルが見つかりません: $file"
        fi
    done
    
    # ディレクトリを復元
    for dir in "${config_dirs[@]}"; do
        if [ -d "$source_dir/$dir" ]; then
            rm -rf "$PROJECT_DIR/$dir"
            cp -r "$source_dir/$dir" "$PROJECT_DIR/"
            print_success "復元: $dir/"
        else
            print_warning "ディレクトリが見つかりません: $dir"
        fi
    done
}

# 全ファイルを復元
restore_all_files() {
    local source_dir="$1"
    local restore_type="$2"
    
    print_info "全ファイルを復元中..."
    
    cd "$PROJECT_DIR"
    
    # 除外するファイル・ディレクトリ
    local exclude_patterns=(
        ".git"
        "node_modules"
        "backups"
        "restore"
        "*.log"
        "*.tmp"
    )
    
    # rsyncで復元（より安全）
    local rsync_opts="-av --progress"
    
    for pattern in "${exclude_patterns[@]}"; do
        rsync_opts="$rsync_opts --exclude=$pattern"
    done
    
    if command -v rsync >/dev/null 2>&1; then
        rsync $rsync_opts "$source_dir/" "$PROJECT_DIR/"
    else
        # rsyncがない場合はcpを使用
        print_warning "rsyncが見つかりません。cpを使用します。"
        cp -r "$source_dir/"* "$PROJECT_DIR/" 2>/dev/null || true
    fi
    
    print_success "ファイル復元完了"
}

# 復元後の検証
verify_restoration() {
    print_info "復元後の検証を実行中..."
    
    # 重要なファイルの存在確認
    local important_files=(
        "_headers"
        "robots.txt"
        "sitemap.xml"
        "_config.yml"
        "index.md"
    )
    
    local missing_files=()
    
    for file in "${important_files[@]}"; do
        if [ ! -f "$PROJECT_DIR/$file" ]; then
            missing_files+=("$file")
        fi
    done
    
    if [ ${#missing_files[@]} -eq 0 ]; then
        print_success "重要なファイルがすべて存在します"
    else
        print_warning "以下のファイルが見つかりません:"
        for file in "${missing_files[@]}"; do
            echo "  - $file"
        done
    fi
    
    # ファイル数の確認
    local file_count=$(find "$PROJECT_DIR" -type f -not -path '*/.*' -not -path '*/node_modules/*' -not -path '*/backups/*' -not -path '*/restore/*' | wc -l)
    print_info "復元後のファイル数: $file_count"
}

# 復元ログを作成
create_restore_log() {
    local backup_file="$1"
    local restore_type="$2"
    local log_file="$BACKUP_DIR/logs/restore-$TIMESTAMP.log"
    
    mkdir -p "$(dirname "$log_file")"
    
    cat > "$log_file" << EOF
復元ログ
========

実行日時: $(date)
復元タイプ: $restore_type
バックアップファイル: $backup_file
実行ユーザー: $(whoami)
実行ディレクトリ: $PROJECT_DIR

システム情報:
- OS: $(uname -s)
- カーネル: $(uname -r)

復元前の状態:
- ファイル数: $(find "$PROJECT_DIR" -type f -not -path '*/.*' -not -path '*/node_modules/*' -not -path '*/backups/*' -not -path '*/restore/*' | wc -l)

復元後の状態:
- ファイル数: $(find "$PROJECT_DIR" -type f -not -path '*/.*' -not -path '*/node_modules/*' -not -path '*/backups/*' -not -path '*/restore/*' | wc -l)
- 総サイズ: $(du -sh "$PROJECT_DIR" | cut -f1)

Git情報:
- ブランチ: $(git -C "$PROJECT_DIR" branch --show-current 2>/dev/null || echo "不明")
- 最新コミット: $(git -C "$PROJECT_DIR" log -1 --oneline 2>/dev/null || echo "不明")

EOF
    
    print_success "復元ログ作成: $log_file"
}

# ユーザー確認
confirm_action() {
    local message="$1"
    print_question "$message (y/N): "
    read -r response
    case "$response" in
        [yY]|[yY][eE][sS])
            return 0
            ;;
        *)
            return 1
            ;;
    esac
}

# クリーンアップ
cleanup() {
    if [ -d "$RESTORE_DIR" ]; then
        print_info "一時ファイルをクリーンアップ中..."
        rm -rf "$RESTORE_DIR"
        print_success "クリーンアップ完了"
    fi
}

# メイン処理
main() {
    local backup_file="$1"
    local restore_type="${2:-preview}"
    
    case "$restore_type" in
        "help"|"-h"|"--help")
            show_help
            exit 0
            ;;
        "list")
            list_backups
            exit 0
            ;;
    esac
    
    # バックアップファイルが指定されていない場合は最新を使用
    if [ -z "$backup_file" ]; then
        backup_file=$(get_latest_backup)
        if [ -z "$backup_file" ]; then
            print_error "バックアップファイルが見つかりません"
            list_backups
            exit 1
        fi
        print_info "最新のバックアップファイルを使用: $backup_file"
    fi
    
    # バックアップファイルの存在確認
    if [ ! -f "$backup_file" ]; then
        print_error "バックアップファイルが見つかりません: $backup_file"
        list_backups
        exit 1
    fi
    
    # プレビューモード
    if [ "$restore_type" = "preview" ]; then
        preview_backup "$backup_file"
        echo ""
        print_info "復元を実行するには以下のコマンドを使用してください:"
        echo "  $0 \"$backup_file\" safe    # 安全な復元（現在の状態をバックアップ）"
        echo "  $0 \"$backup_file\" force   # 強制復元"
        echo "  $0 \"$backup_file\" config-only  # 設定ファイルのみ復元"
        exit 0
    fi
    
    # 復元実行の確認
    echo ""
    preview_backup "$backup_file"
    echo ""
    
    if ! confirm_action "このバックアップから復元を実行しますか？"; then
        print_info "復元をキャンセルしました"
        exit 0
    fi
    
    # 安全な復元の場合は現在の状態をバックアップ
    if [ "$restore_type" = "safe" ]; then
        backup_current_state
    fi
    
    # 復元実行
    restore_files "$backup_file" "$restore_type"
    verify_restoration
    create_restore_log "$backup_file" "$restore_type"
    cleanup
    
    print_success "復元処理が完了しました！"
    
    # Git状態の確認を推奨
    echo ""
    print_info "復元後の推奨作業:"
    echo "1. git status で変更を確認"
    echo "2. サイトの動作確認"
    echo "3. 必要に応じて git commit"
}

# トラップでクリーンアップ
trap cleanup EXIT

# スクリプト実行
main "$@"

