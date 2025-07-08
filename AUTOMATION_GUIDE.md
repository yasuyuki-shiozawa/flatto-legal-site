# 自動化ガイド - Git操作とデプロイ

このドキュメントは、プロジェクトの自動化された作業フローを記録したものです。

## 重要な情報

### Gitリポジトリ情報
- **リポジトリURL**: https://github.com/yasuyuki-shiozawa/flatto-legal-site.git
- **デフォルトブランチ**: main
- **ホスティング**: Netlify（GitHubと連携して自動デプロイ）

### 自動デプロイの仕組み
1. ローカルで変更を行う
2. `git add .` で変更をステージング
3. `git commit -m "メッセージ"` でコミット
4. `git push origin main` でGitHubにプッシュ
5. Netlifyが自動的にビルド・デプロイを実行

## 基本的なGitコマンド

### 状態確認
```bash
git status
```

### 変更の追加・コミット・プッシュ
```bash
# すべての変更を追加
git add .

# 特定のファイルのみ追加
git add ファイル名

# コミット
git commit -m "変更内容の説明"

# GitHubにプッシュ
git push origin main
```

### よく使うコミットメッセージの例
```bash
# 機能追加
git commit -m "機能追加: 新しい○○機能を実装"

# バグ修正
git commit -m "バグ修正: ○○の表示問題を修正"

# スタイル変更
git commit -m "スタイル: ○○のデザインを改善"

# リファクタリング
git commit -m "リファクタリング: ○○のコードを整理"

# ドキュメント
git commit -m "ドキュメント: ○○の説明を追加"
```

## 便利なスクリプト

### 自動コミット・プッシュスクリプト
ファイル名: `auto-deploy.sh`

```bash
#!/bin/bash

# 使い方: ./auto-deploy.sh "コミットメッセージ"

if [ -z "$1" ]; then
    echo "エラー: コミットメッセージが必要です"
    echo "使い方: ./auto-deploy.sh \"コミットメッセージ\""
    exit 1
fi

echo "=== Git Status ==="
git status

echo -e "\n=== Staging all changes ==="
git add .

echo -e "\n=== Committing ==="
git commit -m "$1"

echo -e "\n=== Pushing to GitHub ==="
git push origin main

echo -e "\n=== 完了！Netlifyでのデプロイを確認してください ==="
```

### スクリプトの設定方法
```bash
# 実行権限を付与
chmod +x auto-deploy.sh

# 使用例
./auto-deploy.sh "フッターのデザインを改善"
```

## 別のターミナルでの設定

### 初回セットアップ
```bash
# リポジトリをクローン
git clone https://github.com/yasuyuki-shiozawa/flatto-legal-site.git
cd flatto-legal-site

# Gitの基本設定（初回のみ）
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 依存関係のインストール（Jekyll環境の場合）
bundle install
```

### SSH認証の設定（推奨）
```bash
# SSHキーの生成（既にある場合はスキップ）
ssh-keygen -t ed25519 -C "your.email@example.com"

# SSHキーをGitHubに登録
cat ~/.ssh/id_ed25519.pub
# 表示された内容をGitHubの Settings > SSH and GPG keys に追加

# SSH接続のテスト
ssh -T git@github.com
```

## トラブルシューティング

### プッシュ時に認証エラーが出る場合

1. **HTTPSを使用している場合**
```bash
# Personal Access Tokenを使用
# GitHub > Settings > Developer settings > Personal access tokens で生成
git push origin main
# Username: あなたのGitHubユーザー名
# Password: 生成したトークン
```

2. **SSHに切り替える場合**
```bash
# リモートURLをSSHに変更
git remote set-url origin git@github.com:yasuyuki-shiozawa/flatto-legal-site.git
```

### コンフリクトが発生した場合
```bash
# 最新の変更を取得
git pull origin main

# コンフリクトを解決後
git add .
git commit -m "コンフリクトを解決"
git push origin main
```

## Netlifyビルド設定

### netlify.toml の重要な設定
```toml
[build]
  command = "bundle install && bundle exec jekyll build"
  publish = "_site"

[build.environment]
  JEKYLL_ENV = "production"
```

### ビルドエラーが発生した場合
1. Netlify管理画面 > Deploys > Failed deployをクリック
2. Deploy logでエラー内容を確認
3. 多くの場合、Gemfileの依存関係かSCSSのコンパイルエラー

## 環境変数とシークレット

重要: 以下のファイルは`.gitignore`に含まれているため、Gitにコミットされません：
- `.env`
- `_site/`
- `.sass-cache/`
- `.jekyll-cache/`

## 定期メンテナンス

### 依存関係の更新
```bash
# Gemfileの更新
bundle update

# 更新後は必ずテスト
bundle exec jekyll serve
```

### キャッシュのクリア
```bash
# Jekyllキャッシュ
rm -rf .jekyll-cache/

# Netlifyでキャッシュクリア
# Netlify管理画面 > Deploys > Trigger deploy > Clear cache and deploy site
```

## 連絡先・リソース

- **Netlify管理画面**: https://app.netlify.com/
- **GitHub リポジトリ**: https://github.com/yasuyuki-shiozawa/flatto-legal-site
- **本番サイト**: https://nyusatsu-map.com/

---

最終更新: 2024年7月8日
作成者: Claude (AI Assistant)