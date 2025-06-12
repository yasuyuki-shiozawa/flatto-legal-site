// ふらっと法務事務所 - 目次機能
// 目次生成とスクロール追従機能

// 目次の自動生成
function generateTableOfContents() {
    const tocContainer = document.getElementById('toc-container');
    if (!tocContainer) return;

    const headings = document.querySelectorAll('.main-content h2, .main-content h3, .main-content h4');
    if (headings.length === 0) {
        tocContainer.innerHTML = '<p class="no-toc">目次がありません</p>';
        return;
    }

    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';

    headings.forEach((heading, index) => {
        // 見出しにIDを設定（既存のIDがない場合）
        if (!heading.id) {
            heading.id = `heading-${index}`;
        }

        const listItem = document.createElement('li');
        const link = document.createElement('a');
        
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        link.className = `toc-${heading.tagName.toLowerCase()}`;
        link.setAttribute('data-target', heading.id);

        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });

    tocContainer.appendChild(tocList);
}

// スクロール追従（現在位置のハイライト）
function setupScrollSpy() {
    const tocLinks = document.querySelectorAll('.toc-container a[data-target]');
    if (tocLinks.length === 0) return;

    const headings = Array.from(document.querySelectorAll('.main-content h2, .main-content h3, .main-content h4'))
        .filter(h => h.id);

    function updateActiveLink() {
        let currentHeading = null;
        const scrollPosition = window.scrollY + 100; // オフセット

        // 現在のスクロール位置に最も近い見出しを見つける
        for (let i = headings.length - 1; i >= 0; i--) {
            const heading = headings[i];
            if (heading.offsetTop <= scrollPosition) {
                currentHeading = heading;
                break;
            }
        }

        // すべてのリンクからactiveクラスを削除
        tocLinks.forEach(link => link.classList.remove('active'));

        // 現在の見出しに対応するリンクにactiveクラスを追加
        if (currentHeading) {
            const activeLink = document.querySelector(`.toc-container a[data-target="${currentHeading.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }

    // スクロールイベントリスナー
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    });

    // 初期状態の設定
    updateActiveLink();
}

// スムーズスクロール
function setupSmoothScrolling() {
    const tocLinks = document.querySelectorAll('.toc-container a[href^="#"]');
    
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const offset = headerHeight + 20; // ヘッダー高さ + 余白
                
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 目次機能の初期化
document.addEventListener('DOMContentLoaded', function() {
    // 目次が必要なページでのみ実行
    if (document.getElementById('toc-container')) {
        generateTableOfContents();
        setupScrollSpy();
        setupSmoothScrolling();
    }
});
