#!/bin/bash

# crontabに自動バックアップを設定するスクリプト
# 作成日: 2025年6月6日

# バックアップスクリプトのパス
BACKUP_SCRIPT="/home/ubuntu/flatto-legal-site/backup.sh"

# 実行権限の確認と付与
if [ ! -x "$BACKUP_SCRIPT" ]; then
  chmod +x "$BACKUP_SCRIPT"
  echo "バックアップスクリプトに実行権限を付与しました"
fi

# 現在のcrontabを取得
CURRENT_CRONTAB=$(crontab -l 2>/dev/null)

# バックアップスクリプトのcron設定が既に存在するか確認
if echo "$CURRENT_CRONTAB" | grep -q "$BACKUP_SCRIPT"; then
  echo "バックアップスクリプトは既にcrontabに設定されています"
else
  # 毎週日曜日の午前3時に実行するcron設定を追加
  NEW_CRONTAB="${CURRENT_CRONTAB}
# 毎週日曜日の午前3時にサイトのバックアップを実行
0 3 * * 0 $BACKUP_SCRIPT >> /home/ubuntu/flatto-legal-backups/backup.log 2>&1
"
  # 新しいcrontabを設定
  echo "$NEW_CRONTAB" | crontab -
  echo "バックアップスクリプトをcrontabに追加しました（毎週日曜日の午前3時に実行）"
fi

echo "自動バックアップの設定が完了しました"
