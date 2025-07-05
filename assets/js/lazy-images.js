// 画像の遅延読み込み
document.addEventListener('DOMContentLoaded', function() {
    // IntersectionObserverのオプション
    const imageObserverOptions = {
        rootMargin: '50px 0px', // 画像が表示される50px前に読み込み開始
        threshold: 0.01 // 1%でも表示されたら読み込み開始
    };

    // 画像の遅延読み込み処理
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // data-srcがある場合は遅延読み込み対象
                if (img.dataset.src) {
                    // プリロード
                    const imageLoader = new Image();
                    imageLoader.onload = function() {
                        // 画像の読み込みが完了したら実際の画像を設定
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        
                        // コンテナがある場合はロード完了クラスを追加
                        const container = img.closest('.image-container');
                        if (container) {
                            container.classList.remove('is-loading');
                            container.classList.add('is-loaded');
                        }
                        
                        // srcsetがある場合も処理
                        if (img.dataset.srcset) {
                            img.srcset = img.dataset.srcset;
                        }
                    };
                    
                    imageLoader.src = img.dataset.src;
                }
                
                // 観察を停止
                observer.unobserve(img);
            }
        });
    }, imageObserverOptions);

    // 遅延読み込み対象の画像を取得
    const lazyImages = document.querySelectorAll('.lazy-image, img[data-src]');
    lazyImages.forEach(function(img) {
        // ローディング状態を追加
        const container = img.closest('.image-container');
        if (container) {
            container.classList.add('is-loading');
        }
        
        // 観察を開始
        imageObserver.observe(img);
    });

    // ピクチャー要素の遅延読み込み
    const lazyPictures = document.querySelectorAll('picture[data-lazy]');
    lazyPictures.forEach(function(picture) {
        const sources = picture.querySelectorAll('source');
        const img = picture.querySelector('img');
        
        const pictureObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    // sourceタグのsrcsetを設定
                    sources.forEach(function(source) {
                        if (source.dataset.srcset) {
                            source.srcset = source.dataset.srcset;
                        }
                    });
                    
                    // imgタグのsrcを設定
                    if (img && img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, imageObserverOptions);
        
        pictureObserver.observe(picture);
    });

    // WebP対応チェック
    function checkWebPSupport(callback) {
        const webP = new Image();
        webP.onload = webP.onerror = function() {
            callback(webP.height === 2);
        };
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    }

    // WebPサポートを確認してクラスを追加
    checkWebPSupport(function(supported) {
        if (supported) {
            document.documentElement.classList.add('webp');
        } else {
            document.documentElement.classList.add('no-webp');
        }
    });

    // プリロード用のリンクタグを動的に追加
    function preloadImage(url, as = 'image') {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = as;
        link.href = url;
        document.head.appendChild(link);
    }

    // 重要な画像をプリロード（ヒーロー画像など）
    const criticalImages = document.querySelectorAll('[data-preload]');
    criticalImages.forEach(function(img) {
        if (img.dataset.src) {
            preloadImage(img.dataset.src);
        }
    });
});

// 画像ズーム機能
document.addEventListener('DOMContentLoaded', function() {
    const zoomImages = document.querySelectorAll('.image-zoom');
    
    zoomImages.forEach(function(container) {
        const img = container.querySelector('img');
        let isZoomed = false;
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let currentY = 0;
        
        // ダブルタップでズーム
        let lastTap = 0;
        container.addEventListener('touchend', function(e) {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            
            if (tapLength < 500 && tapLength > 0) {
                e.preventDefault();
                toggleZoom();
            }
            lastTap = currentTime;
        });
        
        // PCでのダブルクリック
        container.addEventListener('dblclick', function(e) {
            e.preventDefault();
            toggleZoom();
        });
        
        function toggleZoom() {
            isZoomed = !isZoomed;
            container.classList.toggle('zoomed');
            
            if (!isZoomed) {
                // ズーム解除時は位置をリセット
                img.style.transform = 'scale(1)';
            }
        }
        
        // ズーム時のパン機能
        let isPanning = false;
        
        container.addEventListener('mousedown', startPan);
        container.addEventListener('touchstart', startPan);
        
        function startPan(e) {
            if (!isZoomed) return;
            
            isPanning = true;
            startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            startY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
            
            const transform = window.getComputedStyle(img).transform;
            const matrix = transform.match(/matrix.*\((.+)\)/);
            
            if (matrix) {
                const values = matrix[1].split(', ');
                currentX = parseFloat(values[4]) || 0;
                currentY = parseFloat(values[5]) || 0;
            }
        }
        
        document.addEventListener('mousemove', pan);
        document.addEventListener('touchmove', pan);
        
        function pan(e) {
            if (!isPanning || !isZoomed) return;
            
            e.preventDefault();
            
            const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
            
            const deltaX = clientX - startX;
            const deltaY = clientY - startY;
            
            img.style.transform = `scale(2) translate(${currentX + deltaX}px, ${currentY + deltaY}px)`;
        }
        
        document.addEventListener('mouseup', endPan);
        document.addEventListener('touchend', endPan);
        
        function endPan() {
            isPanning = false;
        }
    });
});