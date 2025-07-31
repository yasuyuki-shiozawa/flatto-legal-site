/**
 * モバイルボトムナビゲーション修正版
 * 既存のul/li構造に対応
 */

(function() {
    'use strict';
    
    // DOM読み込み完了後に実行
    document.addEventListener('DOMContentLoaded', function() {
        initMobileBottomNavigationFix();
    });
    
    /**
     * ボトムナビゲーション修正の初期化
     */
    function initMobileBottomNavigationFix() {
        const bottomNav = document.querySelector('.mobile-bottom-nav');
        
        if (!bottomNav) {
            console.log('Bottom navigation not found');
            return;
        }
        
        // 強制的に表示
        forceShowBottomNav(bottomNav);
        
        // ナビゲーションアイテムの設定
        setupNavigationItems(bottomNav);
        
        // アクティブ状態の設定
        setActiveNavItem();
        
        // スクロール制御の無効化（常に表示）
        disableScrollHiding(bottomNav);
        
        // フローティングCTAボタンの追加
        addFloatingCTA();
        
        console.log('Mobile bottom navigation fix initialized');
    }
    
    /**
     * ボトムナビゲーションを強制的に表示
     */
    function forceShowBottomNav(bottomNav) {
        // インラインスタイルで強制表示
        bottomNav.style.display = 'block';
        bottomNav.style.position = 'fixed';
        bottomNav.style.bottom = '0';
        bottomNav.style.left = '0';
        bottomNav.style.right = '0';
        bottomNav.style.zIndex = '1000';
        bottomNav.style.backgroundColor = '#ffffff';
        bottomNav.style.borderTop = '1px solid #e2e8f0';
        bottomNav.style.boxShadow = '0 -2px 10px rgba(0, 0, 0, 0.1)';
        bottomNav.style.transform = 'translateY(0)';
        bottomNav.style.visibility = 'visible';
        bottomNav.style.opacity = '1';
        bottomNav.style.padding = '8px 0';
        
        // 重要度を最高にする
        bottomNav.style.setProperty('display', 'block', 'important');
        bottomNav.style.setProperty('transform', 'translateY(0)', 'important');
        bottomNav.style.setProperty('visibility', 'visible', 'important');
        bottomNav.style.setProperty('opacity', '1', 'important');
    }
    
    /**
     * ナビゲーションアイテムの設定
     */
    function setupNavigationItems(bottomNav) {
        const navItems = bottomNav.querySelectorAll('a');
        const currentPath = window.location.pathname;
        
        navItems.forEach(item => {
            // クリックイベントの設定
            item.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                const label = this.querySelector('span')?.textContent || 'Unknown';
                
                // アナリティクス追跡
                trackNavigation(label, href);
                
                // 外部リンクや電話番号の場合は通常の動作
                if (href && (href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http'))) {
                    return;
                }
                
                // 内部リンクの場合、アクティブ状態を即座に更新
                navItems.forEach(navItem => navItem.classList.remove('active'));
                this.classList.add('active');
            });
            
            // スタイルの強制適用
            item.style.display = 'flex';
            item.style.flexDirection = 'column';
            item.style.alignItems = 'center';
            item.style.justifyContent = 'center';
            item.style.textDecoration = 'none';
            item.style.padding = '8px 4px';
            item.style.borderRadius = '8px';
            item.style.minWidth = '44px';
            item.style.minHeight = '44px';
            item.style.width = '100%';
        });
    }
    
    /**
     * アクティブなナビゲーションアイテムを設定
     */
    function setActiveNavItem() {
        const navItems = document.querySelectorAll('.mobile-bottom-nav a');
        const currentPath = window.location.pathname;
        
        navItems.forEach(item => {
            const href = item.getAttribute('href');
            
            // 現在のパスと一致するアイテムをアクティブ化
            if (href === currentPath || 
                (currentPath === '/' && href === '/') ||
                (currentPath.startsWith(href) && href !== '/')) {
                item.classList.add('active');
                item.style.color = '#3182ce';
                item.style.backgroundColor = '#ebf8ff';
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    /**
     * スクロール時の非表示機能を無効化
     */
    function disableScrollHiding(bottomNav) {
        // 既存のスクロールイベントリスナーを無効化
        const newBottomNav = bottomNav.cloneNode(true);
        bottomNav.parentNode.replaceChild(newBottomNav, bottomNav);
        
        // 常に表示状態を維持
        setInterval(function() {
            if (newBottomNav.style.transform !== 'translateY(0)') {
                forceShowBottomNav(newBottomNav);
            }
        }, 100);
    }
    
    /**
     * フローティングCTAボタンの追加
     */
    function addFloatingCTA() {
        // 既存のフローティングCTAがあれば削除
        const existingCTA = document.querySelector('.floating-cta-mobile');
        if (existingCTA) {
            existingCTA.remove();
        }
        
        // 新しいフローティングCTAを作成
        const floatingCTA = document.createElement('a');
        floatingCTA.href = 'tel:046-272-3357';
        floatingCTA.className = 'floating-cta-mobile';
        floatingCTA.setAttribute('aria-label', '電話で無料相談');
        floatingCTA.setAttribute('title', '電話で無料相談');
        floatingCTA.innerHTML = '<i class="fas fa-phone"></i>';
        
        // スタイルを直接適用
        floatingCTA.style.position = 'fixed';
        floatingCTA.style.bottom = '80px';
        floatingCTA.style.right = '16px';
        floatingCTA.style.width = '56px';
        floatingCTA.style.height = '56px';
        floatingCTA.style.backgroundColor = '#10b981';
        floatingCTA.style.color = '#ffffff';
        floatingCTA.style.borderRadius = '50%';
        floatingCTA.style.display = 'flex';
        floatingCTA.style.alignItems = 'center';
        floatingCTA.style.justifyContent = 'center';
        floatingCTA.style.textDecoration = 'none';
        floatingCTA.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4)';
        floatingCTA.style.zIndex = '999';
        floatingCTA.style.fontSize = '24px';
        
        // ページに追加
        document.body.appendChild(floatingCTA);
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
     */
    function updateActiveState() {
        setActiveNavItem();
    }
    
    // ページ変更時のイベントリスナー（History API対応）
    window.addEventListener('popstate', updateActiveState);
    
    // 外部からアクセス可能な関数をグローバルに公開
    window.MobileBottomNavFix = {
        updateActiveState: updateActiveState,
        trackNavigation: trackNavigation,
        forceShow: function() {
            const bottomNav = document.querySelector('.mobile-bottom-nav');
            if (bottomNav) {
                forceShowBottomNav(bottomNav);
            }
        }
    };
    
    // 定期的に表示状態をチェック
    setInterval(function() {
        const bottomNav = document.querySelector('.mobile-bottom-nav');
        if (bottomNav && getComputedStyle(bottomNav).display === 'none') {
            forceShowBottomNav(bottomNav);
        }
    }, 1000);
    
})();

