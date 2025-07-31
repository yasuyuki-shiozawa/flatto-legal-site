/**
 * モバイル版サイドメニュー無効化スクリプト
 * 768px以下でサイドメニューの全機能を無効化
 */

(function() {
    'use strict';
    
    // DOM読み込み完了後に実行
    document.addEventListener('DOMContentLoaded', function() {
        disableMobileSideMenu();
    });
    
    // ウィンドウリサイズ時にも実行
    window.addEventListener('resize', function() {
        disableMobileSideMenu();
    });
    
    /**
     * モバイル版でサイドメニューを完全無効化
     */
    function disableMobileSideMenu() {
        // モバイル判定（768px以下）
        if (window.innerWidth <= 768) {
            
            // サイドメニュー関連要素を取得
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const mobileMenu = document.getElementById('mobileMenu');
            const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
            
            // ボタンのイベントリスナーを削除
            if (mobileMenuBtn) {
                // 新しいボタン要素を作成して置き換え（全イベントリスナーを削除）
                const newBtn = mobileMenuBtn.cloneNode(true);
                mobileMenuBtn.parentNode.replaceChild(newBtn, mobileMenuBtn);
                
                // 完全に非表示
                newBtn.style.display = 'none';
                newBtn.style.visibility = 'hidden';
                newBtn.style.opacity = '0';
                newBtn.style.pointerEvents = 'none';
                newBtn.setAttribute('disabled', 'true');
                newBtn.setAttribute('aria-hidden', 'true');
            }
            
            // メニュー本体を無効化
            if (mobileMenu) {
                mobileMenu.style.display = 'none';
                mobileMenu.style.visibility = 'hidden';
                mobileMenu.style.opacity = '0';
                mobileMenu.style.pointerEvents = 'none';
                mobileMenu.setAttribute('aria-hidden', 'true');
                mobileMenu.classList.remove('active');
            }
            
            // オーバーレイを無効化
            if (mobileMenuOverlay) {
                mobileMenuOverlay.style.display = 'none';
                mobileMenuOverlay.style.visibility = 'hidden';
                mobileMenuOverlay.style.opacity = '0';
                mobileMenuOverlay.style.pointerEvents = 'none';
                mobileMenuOverlay.setAttribute('aria-hidden', 'true');
                mobileMenuOverlay.classList.remove('active');
            }
            
            // body要素からメニュー関連のクラスを削除
            document.body.classList.remove('mobile-menu-open');
            
            // スクロールを有効化
            document.body.style.overflow = '';
            
            console.log('Mobile side menu disabled for mobile view');
        }
    }
    
    /**
     * 既存のモバイルメニュー関連のグローバル関数を無効化
     */
    function disableGlobalMenuFunctions() {
        // よくある関数名を無効化
        if (typeof window.toggleMobileMenu === 'function') {
            window.toggleMobileMenu = function() {
                console.log('Mobile menu function disabled on mobile');
                return false;
            };
        }
        
        if (typeof window.openMobileMenu === 'function') {
            window.openMobileMenu = function() {
                console.log('Mobile menu function disabled on mobile');
                return false;
            };
        }
        
        if (typeof window.closeMobileMenu === 'function') {
            window.closeMobileMenu = function() {
                console.log('Mobile menu function disabled on mobile');
                return false;
            };
        }
    }
    
    // グローバル関数の無効化を実行
    disableGlobalMenuFunctions();
    
    // タッチイベントも無効化
    document.addEventListener('touchstart', function(e) {
        if (window.innerWidth <= 768) {
            const target = e.target;
            if (target && (
                target.classList.contains('mobile-menu-btn') ||
                target.closest('.mobile-menu-btn') ||
                target.classList.contains('mobile-menu') ||
                target.closest('.mobile-menu')
            )) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }
    }, { passive: false });
    
})();

