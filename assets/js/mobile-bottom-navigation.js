/**
 * モバイルボトムナビゲーション機能
 * アクティブ状態の管理とアナリティクス追跡
 */

(function() {
    'use strict';
    
    // DOM読み込み完了後に実行
    document.addEventListener('DOMContentLoaded', function() {
        initMobileBottomNavigation();
    });
    
    /**
     * ボトムナビゲーションの初期化
     */
    function initMobileBottomNavigation() {
        const navItems = document.querySelectorAll('.mobile-nav-item');
        const currentPath = window.location.pathname;
        
        // 現在のページに対応するナビゲーションアイテムをアクティブ化
        setActiveNavItem(navItems, currentPath);
        
        // クリックイベントの設定
        setupClickEvents(navItems);
        
        // スクロール時の表示/非表示制御
        setupScrollBehavior();
        
        console.log('Mobile bottom navigation initialized');
    }
    
    /**
     * アクティブなナビゲーションアイテムを設定
     */
    function setActiveNavItem(navItems, currentPath) {
        navItems.forEach(item => {
            const href = item.getAttribute('href');
            
            // 現在のパスと一致するアイテムをアクティブ化
            if (href === currentPath || 
                (currentPath === '/' && href === '/') ||
                (currentPath.startsWith(href) && href !== '/')) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    /**
     * クリックイベントの設定
     */
    function setupClickEvents(navItems) {
        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                const label = this.querySelector('span')?.textContent || 'Unknown';
                
                // アナリティクス追跡
                trackNavigation(label, href);
                
                // 外部リンクや電話番号の場合は通常の動作
                if (href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http')) {
                    return;
                }
                
                // 内部リンクの場合、アクティブ状態を即座に更新
                navItems.forEach(navItem => navItem.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    /**
     * スクロール時の表示/非表示制御
     */
    function setupScrollBehavior() {
        let lastScrollTop = 0;
        let scrollTimeout;
        const bottomNav = document.querySelector('.mobile-bottom-nav');
        
        if (!bottomNav) return;
        
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // 下にスクロール時は非表示、上にスクロール時は表示
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    // 下にスクロール - ナビゲーションを隠す
                    bottomNav.style.transform = 'translateY(100%)';
                } else {
                    // 上にスクロール - ナビゲーションを表示
                    bottomNav.style.transform = 'translateY(0)';
                }
                
                lastScrollTop = scrollTop;
            }, 10);
        });
    }
    
    /**
     * アナリティクス追跡
     */
    function trackNavigation(label, href) {
        // Google Analytics 4 (GA4) イベント追跡
        if (typeof gtag !== 'undefined') {
            gtag('event', 'mobile_navigation_click', {
                'event_category': 'Mobile Navigation',
                'event_label': label,
                'value': href
            });
        }
        
        // コンソールログ（デバッグ用）
        console.log('Mobile navigation clicked:', label, href);
    }
    
    /**
     * ページ変更時のアクティブ状態更新
     * SPAやAjaxナビゲーション対応
     */
    function updateActiveState() {
        const navItems = document.querySelectorAll('.mobile-nav-item');
        const currentPath = window.location.pathname;
        setActiveNavItem(navItems, currentPath);
    }
    
    // ページ変更時のイベントリスナー（History API対応）
    window.addEventListener('popstate', updateActiveState);
    
    // 外部からアクセス可能な関数をグローバルに公開
    window.MobileBottomNav = {
        updateActiveState: updateActiveState,
        trackNavigation: trackNavigation
    };
    
})();

