@echo off
REM 自動デプロイスクリプト (Windows版)
REM 使い方: auto-deploy.bat "コミットメッセージ"

setlocal enabledelayedexpansion

REM コミットメッセージの確認
if "%~1"=="" (
    echo エラー: コミットメッセージが必要です
    echo 使い方: auto-deploy.bat "コミットメッセージ"
    echo 例: auto-deploy.bat "フッターのデザインを改善"
    exit /b 1
)

echo === Git デプロイ自動化スクリプト ===
echo.

REM 変更状況を表示
echo === 変更されたファイル ===
git status --short
echo.

REM ステージング
echo === すべての変更をステージング ===
git add .
echo.

REM コミット
echo === コミット中 ===
git commit -m "%~1"
if errorlevel 1 (
    echo コミットに失敗しました
    exit /b 1
)
echo.

REM プッシュ
echo === GitHubへプッシュ中 ===
git push origin main
if errorlevel 1 (
    echo プッシュに失敗しました
    echo ネットワーク接続と認証情報を確認してください
    exit /b 1
)

echo.
echo ✓ デプロイが正常に開始されました！
echo ✓ Netlifyでビルドが開始されます（通常2-3分）
echo.
echo 確認URL:
echo - Netlify: https://app.netlify.com/
echo - 本番サイト: https://nyusatsu-map.com/
echo.
pause