// サイドバーのアクティブ状態を動的に設定するJavaScript
document.addEventListener("DOMContentLoaded", function() {
    // 現在のページのパスを取得
    const currentPath = window.location.pathname;
    
    // ページに応じてbodyにクラスを追加
    if (currentPath === "/" || currentPath === "/index.html") {
        document.body.classList.add("page-home");
    } else if (currentPath.includes("/入札の基本/")) {
        document.body.classList.add("page-knowhow");
    } else if (currentPath.includes("/制度ガイド/")) {
        document.body.classList.add("page-system");
    } else if (currentPath.includes("/事例研究/")) {
        document.body.classList.add("page-case-study");
    } else if (currentPath.includes("/用語集/")) {
        document.body.classList.add("page-glossary");
    } else if (currentPath.includes("/最新動向/")) {
        document.body.classList.add("page-latest-trends");
    } else if (currentPath.includes("/相談したい/")) {
        document.body.classList.add("page-contact");
    }
    
    // 現在のページに対応するナビゲーションリンクにactiveクラスを追加
    const allLinks = document.querySelectorAll(".left-sidebar a, .right-sidebar a");
    allLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href) {
            // 完全一致または部分一致でアクティブ状態を判定
            // 日本語パスに対応するため、decodeURIComponentを使用
            const decodedHref = decodeURIComponent(href);
            if ((currentPath === "/" && decodedHref === "/") ||
                (currentPath !== "/" && decodedHref !== "/" && currentPath.includes(decodedHref))) {
                link.classList.add("active");
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


