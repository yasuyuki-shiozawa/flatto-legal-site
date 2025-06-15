// サイドバーのアクティブ状態を動的に設定するJavaScript
// 現在のページのURLに基づいて、サイドバーの対応するリンクにactiveクラスを付与します。

document.addEventListener("DOMContentLoaded", function() {
    const currentPath = window.location.pathname;
    console.log("現在のパス: ", currentPath);

    const sidebarLinks = document.querySelectorAll(".left-sidebar a");

    sidebarLinks.forEach(link => {
        const linkHref = link.getAttribute("href");
        console.log("リンクのhref: ", linkHref);

        // リンクのhrefが現在のパスと一致するか、または現在のパスがリンクのhrefで始まる場合にactiveクラスを付与
        // トップページ("/")は厳密に一致する場合のみactiveにする
        if (linkHref === "/" && currentPath === "/") {
            link.classList.add("active");
            console.log("Active (Exact Match): ", linkHref);
        } else if (linkHref !== "/" && currentPath.startsWith(linkHref)) {
            link.classList.add("active");
            console.log("Active (Starts With): ", linkHref);
        } else {
            link.classList.remove("active");
        }
    });
});


