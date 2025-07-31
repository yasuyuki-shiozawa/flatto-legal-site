/**
 * モバイル用ボトムナビゲーション
 * アクティブ状態の管理とスムーズスクロール
 */

document.addEventListener('DOMContentLoaded', function() {
    // ボトムナビゲーションの初期化
    initMobileBottomNav();
    
    // アクティブ状態の更新
    updateActiveNavItem();
    
    // スクロール時の処理
    handleScrollBehavior();
});

/**
 * ボトムナビゲーションの初期化
 */
function initMobileBottomNav() {
    // ボトムナビゲーションのHTML要素を作成
    const bottomNav = createBottomNavHTML();
    
    // body要素に追加
    document.body.appendChild(bottomNav);
    
    // フローティングCTAボタンを作成
    const floatingCTA = createFloatingCTAHTML();
    document.body.appendChild(floatingCTA);
    
    // クリックイベントの設定
    setupClickEvents();
}

/**
 * ボトムナビゲーションのHTML要素を作成
 */
function createBottomNavHTML() {
    const nav = document.createElement('nav');
    nav.className = 'mobile-bottom-nav';
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'モバイルメインナビゲーション');
    
    nav.innerHTML = `
        <ul>
            <li>
                <a href="/" aria-label="ホーム">
                    <i class="fas fa-home"></i>
                    <span>ホーム</span>
                </a>
            </li>
            <li>
                <a href="/basics/" aria-label="入札の基本">
                    <i class="fas fa-book"></i>
                    <span>基本</span>
                </a>
            </li>
            <li>
                <a href="/glossary/" aria-label="用語集">
                    <i class="fas fa-list"></i>
                    <span>用語集</span>
                </a>
            </li>
            <li class="cta-item">
                <a href="/contact/" aria-label="お問い合わせ">
                    <i class="fas fa-phone"></i>
                    <span>相談</span>
                </a>
            </li>
            <li>
                <a href="/menu/" aria-label="その他メニュー" class="menu-toggle">
                    <i class="fas fa-ellipsis-h"></i>
                    <span>その他</span>
                </a>
            </li>
        </ul>
    `;
    
    return nav;
}

/**
 * フローティングCTAボタンのHTML要素を作成
 */
function createFloatingCTAHTML() {
    const floatingCTA = document.createElement('div');
    floatingCTA.className = 'floating-cta';
    
    floatingCTA.innerHTML = `
        <a href="/contact/" class="floating-cta-btn" aria-label="無料相談を申し込む">
            <i class="fas fa-comments"></i>
            <span>無料相談</span>
        </a>
    `;
    
    return floatingCTA;
}

/**
 * クリックイベントの設定
 */
function setupClickEvents() {
    // ナビゲーションリンクのクリックイベント
    const navLinks = document.querySelectorAll('.mobile-bottom-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // アクティブ状態を更新
            updateActiveState(this);
            
            // アナリティクス追跡（必要に応じて）
            trackNavigation(this.getAttribute('aria-label'));
        });
    });
    
    // フローティングCTAのクリックイベント
    const floatingCTA = document.querySelector('.floating-cta-btn');
    if (floatingCTA) {
        floatingCTA.addEventListener('click', function(e) {
            // アナリティクス追跡
            trackCTAClick('floating_cta');
        });
    }
}

/**
 * アクティブ状態の更新
 */
function updateActiveNavItem() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.mobile-bottom-nav a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const linkPath = link.getAttribute('href');
        if (currentPath === linkPath || 
            (currentPath.startsWith(linkPath) && linkPath !== '/')) {
            link.classList.add('active');
        }
    });
}

/**
 * アクティブ状態を手動で更新
 */
function updateActiveState(activeLink) {
    const navLinks = document.querySelectorAll('.mobile-bottom-nav a');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

/**
 * スクロール時の処理
 */
function handleScrollBehavior() {
    let lastScrollTop = 0;
    let isScrolling = false;
    
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const bottomNav = document.querySelector('.mobile-bottom-nav');
                const floatingCTA = document.querySelector('.floating-cta');
                
                if (!bottomNav) return;
                
                // スクロール方向に応じてナビゲーションの表示/非表示
                if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
                    // 下スクロール時は非表示
                    bottomNav.style.transform = 'translateY(100%)';
                    if (floatingCTA) floatingCTA.style.transform = 'translateY(100%)';
                } else {
                    // 上スクロール時は表示
                    bottomNav.style.transform = 'translateY(0)';
                    if (floatingCTA) floatingCTA.style.transform = 'translateY(0)';
                }
                
                lastScrollTop = currentScrollTop;
                isScrolling = false;
            });
        }
        isScrolling = true;
    });
}

/**
 * ナビゲーション追跡（アナリティクス）
 */
function trackNavigation(label) {
    // Google Analytics 4の場合
    if (typeof gtag !== 'undefined') {
        gtag('event', 'navigation_click', {
            'event_category': 'mobile_bottom_nav',
            'event_label': label
        });
    }
    
    // その他のアナリティクスツールの追跡コードをここに追加
}

/**
 * CTAクリック追跡
 */
function trackCTAClick(type) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_click', {
            'event_category': 'mobile_cta',
            'event_label': type
        });
    }
}

/**
 * ページ遷移時のアクティブ状態更新
 */
window.addEventListener('popstate', function() {
    updateActiveNavItem();
});

// SPAの場合の対応（History APIを使用している場合）
const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;

history.pushState = function() {
    originalPushState.apply(history, arguments);
    setTimeout(updateActiveNavItem, 0);
};

history.replaceState = function() {
    originalReplaceState.apply(history, arguments);
    setTimeout(updateActiveNavItem, 0);
};

