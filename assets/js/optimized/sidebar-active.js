// サイドバーのアクティブ状態を動的に設定するJavaScript
document.addEventListener('DOMContentLoaded', function() {
    // 現在のページのパスを取得
    const currentPath = window.location.pathname;
    
    // ページに応じてbodyにクラスを追加
    if (currentPath === '/' || currentPath === '/index.html') {
        document.body.classList.add('page-home');
    } else if (currentPath.includes('knowhow')) {
        document.body.classList.add('page-knowhow');
    } else if (currentPath.includes('service')) {
        document.body.classList.add('page-service');
    } else if (currentPath.includes('latest-trends')) {
        document.body.classList.add('page-latest-trends');
    }
    
    // 現在のページに対応するナビゲーションリンクにactiveクラスを追加
    const allLinks = document.querySelectorAll('.left-sidebar a, .right-sidebar a');
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            // 完全一致または部分一致でアクティブ状態を判定
            if ((currentPath === '/' && href === '/') ||
                (currentPath !== '/' && href !== '/' && currentPath.includes(href.replace('/', '')))) {
                link.classList.add('active');
            }
        }
    });
    
    // ホバーエフェクトの強化
    allLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateX(4px)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateX(0)';
            }
        });
    });
});

