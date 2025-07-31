/**
 * モバイル版サイドメニュー無効化スクリプト（強化版）
 * 768px以下でサイドメニューの全機能を確実に無効化
 */

(function() {
    'use strict';
    
    // 即座に実行
    disableMobileSideMenuImmediate();
    
    // DOM読み込み完了後に実行
    document.addEventListener('DOMContentLoaded', function() {
        disableMobileSideMenu();
        setupMutationObserver();
    });
    
    // ウィンドウリサイズ時にも実行
    window.addEventListener('resize', function() {
        disableMobileSideMenu();
    });
    
    // ページ読み込み完了後にも実行
    window.addEventListener('load', function() {
        disableMobileSideMenu();
    });
    
    /**
     * 即座にサイドメニューを無効化（DOM読み込み前）
     */
    function disableMobileSideMenuImmediate() {
        if (window.innerWidth <= 768) {
            // スタイルタグを即座に追加
            const style = document.createElement('style');
            style.textContent = `
                @media screen and (max-width: 768px) {
                    .mobile-menu-btn,
                    #mobileMenuBtn,
                    .mobile-menu,
                    #mobileMenu,
                    .mobile-menu-overlay,
                    #mobileMenuOverlay {
                        display: none !important;
                        visibility: hidden !important;
                        opacity: 0 !important;
                        pointer-events: none !important;
                        position: absolute !important;
                        left: -9999px !important;
                        top: -9999px !important;
                        width: 0 !important;
                        height: 0 !important;
                        z-index: -9999 !important;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    /**
     * モバイル版でサイドメニューを完全無効化
     */
    function disableMobileSideMenu() {
        // モバイル判定（768px以下）
        if (window.innerWidth <= 768) {
            
            // サイドメニュー関連要素を取得（複数の方法で）
            const selectors = [
                '#mobileMenuBtn',
                '.mobile-menu-btn',
                'button.mobile-menu-btn',
                '[aria-label="メニューを開く"]',
                '#mobileMenu',
                '.mobile-menu',
                'div.mobile-menu',
                '#mobileMenuOverlay',
                '.mobile-menu-overlay',
                'div.mobile-menu-overlay'
            ];
            
            selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    if (element) {
                        // 完全に非表示
                        element.style.display = 'none';
                        element.style.visibility = 'hidden';
                        element.style.opacity = '0';
                        element.style.pointerEvents = 'none';
                        element.style.position = 'absolute';
                        element.style.left = '-9999px';
                        element.style.top = '-9999px';
                        element.style.width = '0';
                        element.style.height = '0';
                        element.style.zIndex = '-9999';
                        element.style.transform = 'scale(0)';
                        element.setAttribute('disabled', 'true');
                        element.setAttribute('aria-hidden', 'true');
                        element.classList.add('force-hidden');
                        
                        // イベントリスナーを削除
                        const newElement = element.cloneNode(true);
                        if (element.parentNode) {
                            element.parentNode.replaceChild(newElement, element);
                        }
                    }
                });
            });
            
            // body要素からメニュー関連のクラスを削除
            document.body.classList.remove('mobile-menu-open', 'menu-open', 'nav-open');
            
            // スクロールを有効化
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            
            console.log('Mobile side menu forcefully disabled for mobile view');
        }
    }
    
    /**
     * DOM変更を監視してサイドメニューの復活を防ぐ
     */
    function setupMutationObserver() {
        if (window.innerWidth <= 768) {
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList' || mutation.type === 'attributes') {
                        // サイドメニューが復活していないかチェック
                        setTimeout(disableMobileSideMenu, 10);
                    }
                });
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style', 'class']
            });
        }
    }
    
    /**
     * 既存のモバイルメニュー関連のグローバル関数を無効化
     */
    function disableGlobalMenuFunctions() {
        const functionNames = [
            'toggleMobileMenu',
            'openMobileMenu',
            'closeMobileMenu',
            'showMobileMenu',
            'hideMobileMenu',
            'mobileMenuToggle',
            'mobileMenuOpen',
            'mobileMenuClose'
        ];
        
        functionNames.forEach(funcName => {
            if (typeof window[funcName] === 'function') {
                window[funcName] = function() {
                    console.log(`Mobile menu function ${funcName} disabled on mobile`);
                    return false;
                };
            }
        });
    }
    
    // グローバル関数の無効化を実行
    disableGlobalMenuFunctions();
    
    // タッチイベントとクリックイベントを無効化
    document.addEventListener('touchstart', preventMobileMenuEvents, { passive: false, capture: true });
    document.addEventListener('touchend', preventMobileMenuEvents, { passive: false, capture: true });
    document.addEventListener('click', preventMobileMenuEvents, { passive: false, capture: true });
    document.addEventListener('mousedown', preventMobileMenuEvents, { passive: false, capture: true });
    
    function preventMobileMenuEvents(e) {
        if (window.innerWidth <= 768) {
            const target = e.target;
            if (target && (
                target.classList.contains('mobile-menu-btn') ||
                target.closest('.mobile-menu-btn') ||
                target.classList.contains('mobile-menu') ||
                target.closest('.mobile-menu') ||
                target.id === 'mobileMenuBtn' ||
                target.id === 'mobileMenu' ||
                target.id === 'mobileMenuOverlay'
            )) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                return false;
            }
        }
    }
    
    // CSS強制適用
    function forceApplyCSS() {
        if (window.innerWidth <= 768) {
            const forceStyle = document.createElement('style');
            forceStyle.id = 'force-mobile-nav-disable';
            forceStyle.textContent = `
                @media screen and (max-width: 768px) {
                    .mobile-menu-btn,
                    #mobileMenuBtn,
                    .mobile-menu,
                    #mobileMenu,
                    .mobile-menu-overlay,
                    #mobileMenuOverlay,
                    .force-hidden {
                        display: none !important;
                        visibility: hidden !important;
                        opacity: 0 !important;
                        pointer-events: none !important;
                        position: absolute !important;
                        left: -9999px !important;
                        top: -9999px !important;
                        width: 0 !important;
                        height: 0 !important;
                        z-index: -9999 !important;
                        transform: scale(0) !important;
                    }
                }
            `;
            
            // 既存の強制スタイルを削除
            const existingForceStyle = document.getElementById('force-mobile-nav-disable');
            if (existingForceStyle) {
                existingForceStyle.remove();
            }
            
            document.head.appendChild(forceStyle);
        }
    }
    
    // CSS強制適用を実行
    forceApplyCSS();
    
    // 定期的にチェック
    setInterval(function() {
        if (window.innerWidth <= 768) {
            disableMobileSideMenu();
            forceApplyCSS();
        }
    }, 1000);
    
})();

