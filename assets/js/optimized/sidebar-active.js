// サイドバーのアクティブ状態を動的に設定するJavaScript
document.addEventListener("DOMContentLoaded", function() {
    const body = document.body;
    const pagePath = body.getAttribute("data-page-path");

    if (pagePath) {
        let pageClass = "";
        if (pagePath === "/" || pagePath === "/index.html") {
            pageClass = "page-home";
        } else {
            // /入札の基本/ のようなパスから page-入札の基本 を生成
            // 末尾のスラッシュを削除し、先頭のスラッシュも削除、日本語をそのまま使用
            pageClass = "page-" + pagePath.replace(/^\/|\/$/g, "").replace(/\//g, "-");
        }
        body.classList.add(pageClass);
    }

    // 現在のページに対応するナビゲーションリンクにactiveクラスを追加
    const allLinks = document.querySelectorAll(".left-sidebar a, .right-sidebar a");
    allLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href) {
            const decodedHref = decodeURIComponent(href);
            const normalizedDecodedHref = decodedHref.endsWith("/") && decodedHref.length > 1 ? decodedHref.slice(0, -1) : decodedHref;
            const normalizedPagePath = pagePath.endsWith("/") && pagePath.length > 1 ? pagePath.slice(0, -1) : pagePath;

            // 完全一致でアクティブ状態を判定
            if (normalizedPagePath === normalizedDecodedHref) {
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


