// 画像読み込みエラー時のフォールバック処理
document.addEventListener('DOMContentLoaded', function() {
    // すべての画像要素を取得
    var images = document.querySelectorAll('img');
    
    // 各画像に読み込みエラー時の処理を追加
    images.forEach(function(img) {
        img.onerror = function() {
            // エラークラスを追加
            this.classList.add('error');
            
            // 画像のsrc属性からファイル名を抽出
            var src = this.getAttribute('src');
            var filename = src.substring(src.lastIndexOf('/') + 1);
            
            // アイコン画像の場合はFont Awesomeフォールバックを表示
            if (filename.includes('icon-') || filename.includes('industry-')) {
                // 次の要素がフォールバック用divなら表示
                var nextElement = this.nextElementSibling;
                if (nextElement && nextElement.classList.contains('image-fallback')) {
                    nextElement.style.display = 'inline-block';
                }
                // 画像を非表示
                this.style.display = 'none';
            }
        };
    });
});
