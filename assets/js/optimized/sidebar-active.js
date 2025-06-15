// サイドバーのアクティブ状態を動的に設定するJavaScript
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const sidebarLinks = document.querySelectorAll('.left-sidebar a');

    console.log('Current Path:', currentPath);

    sidebarLinks.forEach(link => {
        let linkPath = link.getAttribute('href');

        console.log('Link Path:', linkPath);

        // トップページの場合の特別処理
        if (linkPath === '/' && currentPath === '/') {
            link.classList.add('active');
            console.log('Activated (Home):', linkPath);
            return; // 次のリンクへ
        }

        // トップページ以外のリンクの場合
        // 厳密なパス一致でアクティブにする
        if (linkPath !== '/' && currentPath === linkPath) {
            link.classList.add('active');
            console.log('Activated (Exact Match):', linkPath);
        }
    });
});


