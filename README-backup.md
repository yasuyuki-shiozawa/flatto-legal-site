# 入札マップサイト バックアップシステム

## 🔄 自動バックアップシステム

入札マップサイトの重要なデータを定期的に保護し、迅速な復元を可能にするバックアップシステムです。

### 📋 システム概要

- **自動実行**: GitHub Actionsによる定期バックアップ
- **手動実行**: スクリプトによる即座のバックアップ
- **復元機能**: 簡単な復元スクリプト
- **多世代管理**: 日次・週次・月次の階層バックアップ

### ⚙️ 実行スケジュール

| タイプ | 頻度 | 実行時刻 | 保持期間 |
|--------|------|----------|----------|
| 日次バックアップ | 毎日 | 午前2時（JST） | 30日 |
| 週次フルバックアップ | 毎週日曜日 | 午前2時（JST） | 12週 |
| 月次アーカイブ | 毎月1日 | 自動 | 24ヶ月 |

## 🛠️ 使用方法

### 手動バックアップ

```bash
# クイックバックアップ（推奨）
./scripts/manual-backup.sh quick

# フルバックアップ
./scripts/manual-backup.sh full

# 設定ファイルのみ
./scripts/manual-backup.sh config-only
```

### 復元

```bash
# 最新バックアップをプレビュー
./scripts/restore.sh

# 安全な復元（推奨）
./scripts/restore.sh "バックアップファイル" safe

# 設定ファイルのみ復元
./scripts/restore.sh "バックアップファイル" config-only
```

## 📁 バックアップ対象

### 含まれるファイル
- ✅ サイトコンテンツ（.md, .html）
- ✅ 設定ファイル（_headers, robots.txt等）
- ✅ テンプレート（_layouts, _includes）
- ✅ スクリプト（scripts/）
- ✅ データファイル（_data/）

### 除外されるファイル
- ❌ .gitディレクトリ（日次バックアップ）
- ❌ node_modules/
- ❌ ログファイル（*.log）
- ❌ 一時ファイル（*.tmp）

## 🔧 設定ファイル

| ファイル | 説明 |
|----------|------|
| `.github/workflows/backup.yml` | GitHub Actions自動バックアップ |
| `scripts/manual-backup.sh` | 手動バックアップスクリプト |
| `scripts/restore.sh` | 復元スクリプト |
| `docs/backup-system-guide.md` | 詳細設定ガイド |

## 📊 バックアップ状況の確認

### GitHub Actions
1. GitHubリポジトリの「Actions」タブを開く
2. 「自動バックアップシステム」ワークフローを確認
3. 実行ログでバックアップ状況を確認

### ローカル確認
```bash
# バックアップファイル一覧
ls -la backups/daily/
ls -la backups/weekly/

# 最新バックアップログ
cat backups/logs/backup-*.log | tail -50
```

## 🚨 緊急時の対応

### サイト全体の復元
```bash
# 最新の週次フルバックアップから復元
./scripts/restore.sh "backups/weekly/full-backup-2025-W23.tar.gz" safe
```

### 設定ファイルの復元
```bash
# 設定ファイルが破損した場合
./scripts/restore.sh "backups/daily/site-backup-20250610_120000.tar.gz" config-only
```

## 📞 サポート

問題や改善提案は、GitHubのIssuesで報告してください。

---

**詳細な設定・運用ガイド**: [docs/backup-system-guide.md](docs/backup-system-guide.md)

