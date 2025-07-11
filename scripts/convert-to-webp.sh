#!/bin/bash

# WebP画像変換スクリプト
# 既存の画像ファイルをWebP形式に変換します

echo "WebP画像変換スクリプトを開始します..."

# 変換対象のディレクトリ
IMAGE_DIR="../assets/images"

# cwebpコマンドの存在確認
if ! command -v cwebp &> /dev/null; then
    echo "エラー: cwebpコマンドが見つかりません。"
    echo "以下のコマンドでインストールしてください:"
    echo "  Ubuntu/Debian: sudo apt-get install webp"
    echo "  macOS: brew install webp"
    echo "  Windows: https://developers.google.com/speed/webp/download"
    exit 1
fi

# 画像ファイルの変換
convert_image() {
    local input_file="$1"
    local output_file="${input_file%.*}.webp"
    
    # すでにWebPファイルが存在する場合はスキップ
    if [ -f "$output_file" ]; then
        echo "スキップ: $output_file は既に存在します"
        return
    fi
    
    echo "変換中: $input_file -> $output_file"
    
    # ファイル拡張子によって最適な設定を使用
    case "${input_file##*.}" in
        jpg|jpeg)
            cwebp -q 85 "$input_file" -o "$output_file"
            ;;
        png)
            cwebp -q 90 -alpha_q 100 "$input_file" -o "$output_file"
            ;;
        *)
            echo "警告: サポートされていない形式: $input_file"
            ;;
    esac
}

# 画像ディレクトリ内のすべての画像を処理
find "$IMAGE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r file; do
    convert_image "$file"
done

echo "WebP変換が完了しました。"

# 変換結果のサマリー
echo ""
echo "変換結果サマリー:"
echo "JPG/JPEG files: $(find "$IMAGE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) | wc -l)"
echo "PNG files: $(find "$IMAGE_DIR" -type f -iname "*.png" | wc -l)"
echo "WebP files: $(find "$IMAGE_DIR" -type f -iname "*.webp" | wc -l)"