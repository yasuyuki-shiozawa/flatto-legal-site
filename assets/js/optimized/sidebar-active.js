// サイドバーのアクティブ状態を動的に設定するJavaScript
document.addEventListener("DOMContentLoaded", function() {
    const body = document.body;
    const pagePath = body.getAttribute("data-page-path");

    console.log("Current pagePath from data-page-path:", pagePath);

    if (pagePath) {
        let pageClass = "";
        if (pagePath === "/" || pagePath === "/index.html") {
            pageClass = "page-home";
        } else {
            pageClass = "page-" + pagePath.replace(/^\/|\/$/g, "").replace(/\//g, "-");
        }
        body.classList.add(pageClass);
        console.log("Added body class:", pageClass);
    }

    const allLinks = document.querySelectorAll(".left-sidebar a, .right-sidebar a");
    allLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href) {
            const decodedHref = decodeURIComponent(href);
            const normalizedDecodedHref = decodedHref.endsWith("/") && decodedHref.length > 1 ? decodedHref.slice(0, -1) : decodedHref;
            const normalizedPagePath = pagePath && pagePath.endsWith("/") && pagePath.length > 1 ? pagePath.slice(0, -1) : pagePath;

            console.log("Comparing:", normalizedPagePath, "with", normalizedDecodedHref);

            if (normalizedPagePath === normalizedDecodedHref) {
                link.classList.add("active");
                console.log("Added active class to:", link.textContent.trim());
            } else {
                link.classList.remove("active");
            }
        }
    });
    
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


