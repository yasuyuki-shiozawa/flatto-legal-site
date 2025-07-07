// サイドバーのアクティブ状態を動的に設定するJavaScript
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const sidebarLinks = document.querySelectorAll('.left-sidebar a');

    console.log('Current Path:', currentPath);

    sidebarLinks.forEach(link => {
        let linkPath = link.getAttribute('href');

        // リンクパスの末尾のスラッシュを削除（トップページ以外）
        if (linkPath.endsWith('/') && linkPath.length > 1) {
            linkPath = linkPath.slice(0, -1);
        }

        console.log('Processed Link Path:', linkPath);

        // 現在のパスの末尾のスラッシュを削除（トップページ以外）
        let processedCurrentPath = currentPath;
        if (processedCurrentPath.endsWith('/') && processedCurrentPath.length > 1) {
            processedCurrentPath = processedCurrentPath.slice(0, -1);
        }

        console.log('Processed Current Path:', processedCurrentPath);

        // トップページの場合の特別処理
        if (linkPath === '/' && processedCurrentPath === '/') {
            link.classList.add('active');
            console.log('Activated (Home):', linkPath);
            return; // 次のリンクへ
        }

        // トップページ以外のリンクの場合
        // 現在のパスがリンクパスで始まる場合にアクティブにする
        if (linkPath !== '/' && processedCurrentPath.startsWith(linkPath)) {
            link.classList.add('active');
            console.log('Activated (Starts With):', linkPath);
        }
    });
});


