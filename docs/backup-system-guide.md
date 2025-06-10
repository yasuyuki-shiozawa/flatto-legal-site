# 入札マップサイト バックアップシステム設定ガイド

## 概要

入札マップサイトの自動バックアップシステムは、サイトの重要なデータを定期的に保護し、必要時に迅速な復元を可能にします。

## システム構成

### 🔄 自動バックアップ（GitHub Actions）

**実行スケジュール:**
- **日次バックアップ**: 毎日午前2時（JST）
- **週次フルバックアップ**: 毎週日曜日午前2時（JST）
- **月次アーカイブ**: 毎月1日（自動）

**バックアップ対象:**
- サイトコンテンツ（Markdownファイル、画像等）
- 設定ファイル（_headers, robots.txt, sitemap.xml等）
- テンプレートファイル（_layouts, _includes, _data）
- スクリプトファイル（scripts/）
- GitHub Actionsワークフロー

**除外対象:**
- .gitディレクトリ（週次フルバックアップ以外）
- node_modules/
- ログファイル（*.log）
- 一時ファイル（*.tmp）

### 🛠️ 手動バックアップスクリプト

**場所:** `scripts/manual-backup.sh`

**使用方法:**
```bash
# クイックバックアップ（基本ファイルのみ）
./scripts/manual-backup.sh quick

# フルバックアップ（.gitディレクトリ含む）
./scripts/manual-backup.sh full

# 設定ファイルのみ
./scripts/manual-backup.sh config-only

# ヘルプ表示
./scripts/manual-backup.sh help
```

### 🔄 復元スクリプト

**場所:** `scripts/restore.sh`

**使用方法:**
```bash
# 最新バックアップの内容をプレビュー
./scripts/restore.sh

# 利用可能なバックアップファイル一覧
./scripts/restore.sh "" list

# 安全な復元（現在の状態をバックアップしてから復元）
./scripts/restore.sh "backups/daily/site-backup-20250610_120000.tar.gz" safe

# 強制復元（現在のファイルを上書き）
./scripts/restore.sh "backups/daily/site-backup-20250610_120000.tar.gz" force

# 設定ファイルのみ復元
./scripts/restore.sh "backups/daily/site-backup-20250610_120000.tar.gz" config-only
```

## バックアップファイルの構成

### ディレクトリ構造
```
backups/
├── daily/          # 日次バックアップ（30日保持）
├── weekly/         # 週次バックアップ（12週保持）
├── monthly/        # 月次アーカイブ（24ヶ月保持）
├── manual/         # 手動バックアップ（30日保持）
├── restore-backup/ # 復元前バックアップ
└── logs/           # バックアップログ
```

### ファイル命名規則
- **日次**: `site-backup-YYYYMMDD_HHMMSS.tar.gz`
- **週次**: `full-backup-YYYY-WWW.tar.gz`
- **月次**: `archive-YYYY-MM.tar.gz`
- **手動**: `[type]-backup-YYYYMMDD_HHMMSS.tar.gz`

## 設定とカスタマイズ

### GitHub Actionsワークフロー設定

**ファイル:** `.github/workflows/backup.yml`

**スケジュール変更:**
```yaml
schedule:
  - cron: '0 17 * * *'  # 日次（UTC 17:00 = JST 02:00）
  - cron: '0 17 * * 0'  # 週次（日曜日）
```

**手動実行:**
GitHub Actionsタブから「自動バックアップシステム」ワークフローを手動実行可能

### 保持期間の調整

**GitHub Actionsワークフロー内:**
```bash
# 30日以上古い日次バックアップを削除
find backups/daily -name "*.tar.gz" -mtime +30 -delete

# 12週以上古い週次バックアップを削除
find backups/weekly -name "*.tar.gz" -mtime +84 -delete
```

**手動バックアップスクリプト内:**
```bash
# 30日以上古い手動バックアップを削除
find "$BACKUP_DIR/manual" -name "*.tar.gz" -mtime +30 -delete
```

## 運用手順

### 日常運用

1. **自動バックアップの確認**
   - GitHub Actionsタブでワークフロー実行状況を確認
   - エラーがある場合はログを確認

2. **手動バックアップの実行**
   - 重要な変更前に手動バックアップを実行
   - `./scripts/manual-backup.sh quick`

### 復元手順

1. **復元前の準備**
   ```bash
   # 現在の状態を確認
   git status
   
   # 利用可能なバックアップを確認
   ./scripts/restore.sh "" list
   ```

2. **復元の実行**
   ```bash
   # プレビューで内容確認
   ./scripts/restore.sh "backups/daily/site-backup-20250610_120000.tar.gz"
   
   # 安全な復元（推奨）
   ./scripts/restore.sh "backups/daily/site-backup-20250610_120000.tar.gz" safe
   ```

3. **復元後の確認**
   ```bash
   # 変更内容を確認
   git status
   git diff
   
   # サイトの動作確認
   # 必要に応じてコミット
   git add .
   git commit -m "バックアップから復元: [復元理由]"
   ```

### 緊急時の対応

1. **完全なサイト復元**
   ```bash
   # 最新の週次フルバックアップから復元
   ./scripts/restore.sh "backups/weekly/full-backup-2025-W23.tar.gz" force
   ```

2. **設定ファイルのみ復元**
   ```bash
   # 設定ファイルが破損した場合
   ./scripts/restore.sh "backups/daily/site-backup-20250610_120000.tar.gz" config-only
   ```

## トラブルシューティング

### よくある問題

**Q: GitHub Actionsでバックアップが失敗する**
A: 
- リポジトリの権限設定を確認
- ワークフローファイルの構文エラーをチェック
- GitHub Actionsのログを詳細確認

**Q: 復元スクリプトでエラーが発生する**
A:
- バックアップファイルの破損チェック: `tar -tzf [ファイル名]`
- 権限の確認: `ls -la scripts/restore.sh`
- ディスク容量の確認: `df -h`

**Q: バックアップファイルが大きすぎる**
A:
- 除外パターンの見直し
- 不要なファイルの削除
- 圧縮レベルの調整

### ログの確認

**バックアップログ:**
```bash
# 最新のバックアップログを確認
ls -la backups/logs/
cat backups/logs/backup-[最新のタイムスタンプ].log
```

**GitHub Actionsログ:**
- GitHubリポジトリの「Actions」タブ
- 「自動バックアップシステム」ワークフロー
- 各実行の詳細ログを確認

## セキュリティ考慮事項

### アクセス制御
- バックアップファイルはプライベートリポジトリに保存
- GitHub Actionsの実行権限は最小限に制限
- 機密情報は環境変数で管理

### データ保護
- バックアップファイルは暗号化圧縮（tar.gz）
- 複数世代のバックアップを保持
- 定期的な復元テストの実施

## メンテナンス

### 定期メンテナンス（月次）

1. **バックアップファイルの整理**
   ```bash
   # 古いバックアップの手動削除
   find backups/ -name "*.tar.gz" -mtime +90 -ls
   ```

2. **復元テスト**
   ```bash
   # テスト環境での復元確認
   ./scripts/restore.sh "backups/weekly/[最新ファイル]" preview
   ```

3. **ログの確認**
   ```bash
   # エラーログの確認
   grep -i error backups/logs/*.log
   ```

### 年次メンテナンス

1. **バックアップ戦略の見直し**
2. **保持期間の調整**
3. **スクリプトの更新**
4. **災害復旧計画の確認**

## 連絡先・サポート

バックアップシステムに関する問題や改善提案は、GitHubのIssuesで報告してください。

---

**最終更新:** 2025年6月10日  
**バージョン:** 1.0  
**作成者:** 入札マップ開発チーム

