// サイドバーのアクティブ状態を動的に設定するJavaScript
document.addEventListener("DOMContentLoaded", function() {
    // 現在のページのパスを取得
    const currentPath = window.location.pathname;
    
    // ページに応じてbodyにクラスを追加
    // パスの末尾のスラッシュを削除して比較することで、/path/ と /path の両方に対応
    const normalizedCurrentPath = currentPath.endsWith('/') && currentPath.length > 1 ? currentPath.slice(0, -1) : currentPath;

    if (normalizedCurrentPath === "" || normalizedCurrentPath === "/index.html") { // トップページ
        document.body.classList.add("page-home");
    } else if (normalizedCurrentPath.includes("/入札の基本")) { // 入札の基本
        document.body.classList.add("page-knowhow");
    } else if (normalizedCurrentPath.includes("/制度ガイド")) { // 制度ガイド
        document.body.classList.add("page-system");
    } else if (normalizedCurrentPath.includes("/事例研究")) { // 事例研究
        document.body.classList.add("page-case-study");
    } else if (normalizedCurrentPath.includes("/用語集")) { // 用語集
        document.body.classList.add("page-glossary");
    } else if (normalizedCurrentPath.includes("/最新動向")) { // 最新動向
        document.body.classList.add("page-latest-trends");
    } else if (normalizedCurrentPath.includes("/相談したい")) { // 相談したい
        document.body.classList.add("page-contact");
    }
    
    // 現在のページに対応するナビゲーションリンクにactiveクラスを追加
    const allLinks = document.querySelectorAll(".left-sidebar a, .right-sidebar a");
    allLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href) {
            const decodedHref = decodeURIComponent(href);
            const normalizedDecodedHref = decodedHref.endsWith('/') && decodedHref.length > 1 ? decodedHref.slice(0, -1) : decodedHref;

            // 完全一致でアクティブ状態を判定
            if (normalizedCurrentPath === normalizedDecodedHref) {
                link.classList.add("active");
            } else {
                link.classList.remove("active"); // 意図しないアクティブ状態を解除
            }
        }
    });
    
    // ホバーエフェクトの強化
    allLinks.forEach(link => {
        link.addEventListener("mouseenter", function() {
            if (!this.classList.contains("active")) {
                this.style.transform = "translateX(4px)";
            }
        });
        
        link.addEventListener("mouseleave", function() {
            if (!this.classList.contains("active")) {
                this.style.transform = "translateX(0)";
            }
        });
    });
});


