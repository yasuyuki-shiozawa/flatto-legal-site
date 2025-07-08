#!/bin/bash

# 自動デプロイスクリプト
# 使い方: ./auto-deploy.sh "コミットメッセージ"

# カラー定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# コミットメッセージの確認
if [ -z "$1" ]; then
    echo -e "${RED}エラー: コミットメッセージが必要です${NC}"
    echo "使い方: ./auto-deploy.sh \"コミットメッセージ\""
    echo "例: ./auto-deploy.sh \"フッターのデザインを改善\""
    exit 1
fi

echo -e "${YELLOW}=== Git デプロイ自動化スクリプト ===${NC}"
echo ""

# 現在のブランチを確認
CURRENT_BRANCH=$(git branch --show-current)
echo -e "現在のブランチ: ${GREEN}$CURRENT_BRANCH${NC}"

if [ "$CURRENT_BRANCH" != "main" ]; then
    echo -e "${YELLOW}警告: mainブランチではありません。続行しますか？ (y/n)${NC}"
    read -r response
    if [ "$response" != "y" ]; then
        echo "中止しました"
        exit 0
    fi
fi

# 変更状況を表示
echo -e "\n${YELLOW}=== 変更されたファイル ===${NC}"
git status --short

# 変更がない場合の確認
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${GREEN}変更はありません${NC}"
    exit 0
fi

# ステージング
echo -e "\n${YELLOW}=== すべての変更をステージング ===${NC}"
git add .

# コミット
echo -e "\n${YELLOW}=== コミット中 ===${NC}"
git commit -m "$1"

if [ $? -ne 0 ]; then
    echo -e "${RED}コミットに失敗しました${NC}"
    exit 1
fi

# プッシュ
echo -e "\n${YELLOW}=== GitHubへプッシュ中 ===${NC}"
git push origin $CURRENT_BRANCH

if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✓ デプロイが正常に開始されました！${NC}"
    echo -e "${GREEN}✓ Netlifyでビルドが開始されます（通常2-3分）${NC}"
    echo ""
    echo "確認URL:"
    echo "- Netlify: https://app.netlify.com/"
    echo "- 本番サイト: https://nyusatsu-map.com/"
else
    echo -e "${RED}プッシュに失敗しました${NC}"
    echo "ネットワーク接続と認証情報を確認してください"
    exit 1
fi