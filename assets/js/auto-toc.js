// 自動目次生成スクリプト
document.addEventListener('DOMContentLoaded', function() {
    // 目次を生成する要素を取得
    const tocContainer = document.getElementById('auto-toc');
    const tocMobileContainer = document.getElementById('auto-toc-mobile');
    const articleContent = document.querySelector('.article-content');
    
    if (!articleContent) return;
    
    // 記事内の見出しを取得（h2, h3, h4）
    const headings = articleContent.querySelectorAll('h2, h3, h4');
    
    if (headings.length === 0) {
        // 見出しがない場合は目次を非表示
        if (tocContainer) {
            tocContainer.parentElement.style.display = 'none';
        }
        return;
    }
    
    // 目次のHTMLを構築
    let tocHTML = '<ul class="toc-list">';
    let currentLevel = 0;
    
    headings.forEach(function(heading, index) {
        const level = parseInt(heading.tagName.substring(1));
        const id = 'heading-' + index;
        const text = heading.textContent;
        
        // 見出しにIDを設定
        heading.id = id;
        
        // レベルの調整
        if (level > currentLevel) {
            for (let i = currentLevel; i < level - 1; i++) {
                tocHTML += '<ul>';
            }
        } else if (level < currentLevel) {
            for (let i = level; i < currentLevel; i++) {
                tocHTML += '</ul></li>';
            }
        } else if (currentLevel !== 0) {
            tocHTML += '</li>';
        }
        
        // リストアイテムを追加
        tocHTML += '<li><a href="#' + id + '" class="toc-link">' + text + '</a>';
        currentLevel = level;
    });
    
    // 閉じタグを追加
    for (let i = 2; i <= currentLevel; i++) {
        tocHTML += '</li></ul>';
    }
    tocHTML += '</li></ul>';
    
    // 目次を挿入
    if (tocContainer) {
        // 既存のタイトルを保持
        const tocTitle = tocContainer.querySelector('.toc-title');
        if (tocTitle) {
            tocContainer.innerHTML = tocTitle.outerHTML + tocHTML;
        } else {
            tocContainer.innerHTML = '<h3 class="toc-title">目次</h3>' + tocHTML;
        }
    }
    
    if (tocMobileContainer) {
        tocMobileContainer.innerHTML = '<h3 class="toc-title">目次</h3>' + tocHTML;
    }
    
    // スムーススクロール機能
    const tocLinks = document.querySelectorAll('.toc-link');
    tocLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offset = 80; // ヘッダーの高さ分のオフセット
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // モバイル目次を閉じる
                const mobileContent = document.querySelector('.toc-mobile-content');
                if (mobileContent && mobileContent.classList.contains('show')) {
                    mobileContent.classList.remove('show');
                }
            }
        });
    });
    
    // 現在表示中のセクションをハイライト
    function highlightCurrentSection() {
        const scrollPosition = window.scrollY + 100;
        
        headings.forEach(function(heading, index) {
            const id = 'heading-' + index;
            const link = document.querySelector('.toc-link[href="#' + id + '"]');
            
            if (link) {
                const headingPosition = heading.offsetTop;
                const nextHeading = headings[index + 1];
                const nextHeadingPosition = nextHeading ? nextHeading.offsetTop : document.body.scrollHeight;
                
                if (scrollPosition >= headingPosition && scrollPosition < nextHeadingPosition) {
                    // 既存のアクティブクラスを削除
                    document.querySelectorAll('.toc-link.active').forEach(function(activeLink) {
                        activeLink.classList.remove('active');
                    });
                    // 現在のリンクにアクティブクラスを追加
                    link.classList.add('active');
                }
            }
        });
    }
    
    // スクロールイベントでハイライトを更新
    let scrollTimer;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(highlightCurrentSection, 10);
    });
    
    // 初期ハイライト
    highlightCurrentSection();
});

// モバイル目次トグル機能
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.querySelector('.toc-mobile-toggle');
    const mobileContent = document.querySelector('.toc-mobile-content');
    
    if (toggleButton && mobileContent) {
        toggleButton.addEventListener('click', function() {
            mobileContent.classList.toggle('show');
        });
        
        // 外側をクリックしたら閉じる
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.toc-mobile')) {
                mobileContent.classList.remove('show');
            }
        });
    }
});