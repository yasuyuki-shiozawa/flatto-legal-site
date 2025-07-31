/**
 * モバイル版サイドメニュー無効化スクリプト（軽量版）
 * 最小限の処理でサイドメニューを無効化
 */

(function() {
    'use strict';
    
    // モバイル判定
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // サイドメニューを無効化
    function disableSideMenu() {
        if (!isMobile()) return;
        
        // サイドメニュー要素を取得
        const menuBtn = document.getElementById('mobileMenuBtn');
        const menu = document.getElementById('mobileMenu');
        const overlay = document.getElementById('mobileMenuOverlay');
        
        // ボタンを無効化
        if (menuBtn) {
            menuBtn.style.display = 'none';
            menuBtn.disabled = true;
        }
        
        // メニューを無効化
        if (menu) {
            menu.style.display = 'none';
        }
        
        // オーバーレイを無効化
        if (overlay) {
            overlay.style.display = 'none';
        }
    }
    
    // DOM読み込み完了後に実行
    document.addEventListener('DOMContentLoaded', disableSideMenu);
    
    // リサイズ時に実行
    window.addEventListener('resize', disableSideMenu);
    
})();

