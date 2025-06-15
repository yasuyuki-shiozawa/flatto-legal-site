// サイドバーのアクティブ状態を動的に設定するJavaScript
// 現在のページのURLに基づいて、サイドバーの対応するリンクにactiveクラスを付与します。

document.addEventListener("DOMContentLoaded", function() {
    const currentPath = window.location.pathname;
    console.log("現在のパス: ", currentPath);

    const sidebarLinks = document.querySelectorAll(".left-sidebar a");

    sidebarLinks.forEach(link => {
        const linkHref = link.getAttribute("href");
        console.log("リンクのhref: ", linkHref);

        // トップページ("/")は厳密に一致する場合のみactiveにする
        if (linkHref === "/") {
            if (currentPath === "/") {
                link.classList.add("active");
                console.log("Active (Top Page Exact Match): ", linkHref);
            } else {
                link.classList.remove("active");
            }
        } else {
            // その他のページは、現在のパスがリンクのhrefで始まる場合にactiveにする
            // ただし、トップページ以外のリンクが"/"で始まる場合も考慮
            if (currentPath.startsWith(linkHref) && linkHref !== "/") {
                link.classList.add("active");
                console.log("Active (Starts With): ", linkHref);
            } else {
                link.classList.remove("active");
            }
        }
    });
});


