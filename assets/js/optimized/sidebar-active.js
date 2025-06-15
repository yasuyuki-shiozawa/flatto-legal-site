// サイドバーのアクティブ状態を動的に設定するJavaScript
// 現在のページのURLに基づいて、サイドバーの対応するリンクにactiveクラスを付与します。

document.addEventListener("DOMContentLoaded", function() {
    const currentPath = window.location.pathname;
    console.log("現在のパス: ", currentPath);

    const sidebarLinks = document.querySelectorAll(".left-sidebar a");

    sidebarLinks.forEach(link => {
        const linkHref = link.getAttribute("href");
        console.log("リンクのhref: ", linkHref);

        // トップページ("/")の厳密な一致判定
        if (linkHref === "/") {
            if (currentPath === "/") {
                link.classList.add("active");
                console.log("Active (Top Page Exact Match): ", linkHref);
            } else {
                link.classList.remove("active");
            }
        } else {
            // その他のページの判定
            // linkHrefがcurrentPathのプレフィックスであり、かつ
            // currentPathがlinkHrefの長さと一致するか、または
            // currentPathのlinkHrefの次の文字が'/'である場合にactiveにする
            if (currentPath.startsWith(linkHref) && linkHref !== "/") {
                if (currentPath.length === linkHref.length || currentPath.charAt(linkHref.length) === '/') {
                    link.classList.add("active");
                    console.log("Active (Starts With and Valid Path): ", linkHref);
                } else {
                    link.classList.remove("active");
                }
            } else {
                link.classList.remove("active");
            }
        }
    });
});


