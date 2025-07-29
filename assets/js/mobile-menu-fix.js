// モバイルメニュー緊急修正JavaScript
// メニューボタンの機能不全を修正

(function() {
    'use strict';

    // DOM読み込み完了を待つ
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenuFix();
    });

    function initMobileMenuFix() {
        console.log('モバイルメニュー修正スクリプト開始');
        
        // 既存のメニューボタンを取得または作成
        let menuBtn = document.getElementById('mobileMenuBtn');
        let mobileMenu = document.getElementById('mobileMenu');
        let overlay = document.getElementById('mobileMenuOverlay');
        
        // メニューボタンが存在しない場合は作成
        if (!menuBtn) {
            menuBtn = createMobileMenuButton();
        }
        
        // モバイルメニューが存在しない場合は作成
        if (!mobileMenu) {
            mobileMenu = createMobileMenu();
        }
        
        // オーバーレイが存在しない場合は作成
        if (!overlay) {
            overlay = createOverlay();
        }
        
        // イベントリスナーを設定
        setupEventListeners(menuBtn, mobileMenu, overlay);
        
        // CSSスタイルを強制適用
        applyMobileMenuStyles();
        
        console.log('モバイルメニュー修正完了');
    }
    
    function createMobileMenuButton() {
        console.log('メニューボタンを作成');
        
        const button = document.createElement('button');
        button.id = 'mobileMenuBtn';
        button.className = 'mobile-menu-btn';
        button.setAttribute('aria-label', 'メニューを開く');
        button.setAttribute('aria-expanded', 'false');
        button.innerHTML = `
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
        `;
        
        // ヘッダーに追加
        const header = document.querySelector('header .header-content');
        if (header) {
            header.appendChild(button);
        } else {
            document.body.appendChild(button);
        }
        
        return button;
    }
    
    function createMobileMenu() {
        console.log('モバイルメニューを作成');
        
        const menu = document.createElement('div');
        menu.id = 'mobileMenu';
        menu.className = 'mobile-menu';
        menu.innerHTML = `
            <div class="mobile-menu-header">
                <h2 class="mobile-menu-title">メニュー</h2>
                <button class="mobile-menu-close" aria-label="メニューを閉じる">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="mobile-menu-body">
                <nav class="mobile-nav">
                    <ul class="mobile-nav-list">
                        <li><a href="/"><i class="fas fa-home"></i> ホーム</a></li>
                        <li><a href="/knowhow/"><i class="fas fa-graduation-cap"></i> 入札の基本</a></li>
                        <li><a href="/dictionary/"><i class="fas fa-book"></i> 用語集</a></li>
                        <li><a href="/news/"><i class="fas fa-newspaper"></i> 最新動向</a></li>
                        <li><a href="/case-study/"><i class="fas fa-chart-line"></i> 事例研究</a></li>
                        <li><a href="/faq/"><i class="fas fa-question-circle"></i> よくある質問</a></li>
                        <li><a href="/blog/"><i class="fas fa-blog"></i> ブログ</a></li>
                        <li><a href="/contact/" class="mobile-cta"><i class="fas fa-envelope"></i> お問い合わせ</a></li>
                    </ul>
                </nav>
            </div>
        `;
        
        document.body.appendChild(menu);
        return menu;
    }
    
    function createOverlay() {
        console.log('オーバーレイを作成');
        
        const overlay = document.createElement('div');
        overlay.id = 'mobileMenuOverlay';
        overlay.className = 'mobile-menu-overlay';
        
        document.body.appendChild(overlay);
        return overlay;
    }
    
    function setupEventListeners(menuBtn, mobileMenu, overlay) {
        console.log('イベントリスナーを設定');
        
        // メニューボタンのクリック
        menuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu(menuBtn, mobileMenu, overlay);
        });
        
        // オーバーレイのクリック
        overlay.addEventListener('click', function() {
            closeMenu(menuBtn, mobileMenu, overlay);
        });
        
        // 閉じるボタンのクリック
        const closeBtn = mobileMenu.querySelector('.mobile-menu-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                closeMenu(menuBtn, mobileMenu, overlay);
            });
        }
        
        // ESCキーで閉じる
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMenu(menuBtn, mobileMenu, overlay);
            }
        });
        
        // メニューリンクのクリックで閉じる
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMenu(menuBtn, mobileMenu, overlay);
            });
        });
        
        // ウィンドウリサイズ時の処理
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
                closeMenu(menuBtn, mobileMenu, overlay);
            }
        });
    }
    
    function toggleMenu(menuBtn, mobileMenu, overlay) {
        const isOpen = mobileMenu.classList.contains('active');
        
        if (isOpen) {
            closeMenu(menuBtn, mobileMenu, overlay);
        } else {
            openMenu(menuBtn, mobileMenu, overlay);
        }
    }
    
    function openMenu(menuBtn, mobileMenu, overlay) {
        console.log('メニューを開く');
        
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('menu-open');
        
        menuBtn.classList.add('active');
        menuBtn.setAttribute('aria-expanded', 'true');
        menuBtn.setAttribute('aria-label', 'メニューを閉じる');
        
        // フォーカスをメニューに移動
        const firstLink = mobileMenu.querySelector('a');
        if (firstLink) {
            firstLink.focus();
        }
    }
    
    function closeMenu(menuBtn, mobileMenu, overlay) {
        console.log('メニューを閉じる');
        
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        menuBtn.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'メニューを開く');
        
        // フォーカスをメニューボタンに戻す
        menuBtn.focus();
    }
    
    function applyMobileMenuStyles() {
        console.log('モバイルメニューのスタイルを適用');
        
        // 動的にスタイルを追加
        const style = document.createElement('style');
        style.textContent = `
            /* モバイルメニューボタンの修正 */
            .mobile-menu-btn {
                display: none !important;
                position: fixed !important;
                top: 1rem !important;
                right: 1rem !important;
                z-index: 9999 !important;
                background: #3182ce !important;
                border: none !important;
                border-radius: 6px !important;
                padding: 0.75rem !important;
                cursor: pointer !important;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
                transition: all 0.3s ease !important;
            }
            
            @media (max-width: 768px) {
                .mobile-menu-btn {
                    display: flex !important;
                    flex-direction: column !important;
                    justify-content: center !important;
                    align-items: center !important;
                    width: 48px !important;
                    height: 48px !important;
                }
            }
            
            .hamburger-line {
                display: block !important;
                width: 20px !important;
                height: 2px !important;
                background: #ffffff !important;
                margin: 2px 0 !important;
                transition: all 0.3s ease !important;
            }
            
            .mobile-menu-btn.active .hamburger-line:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px) !important;
            }
            
            .mobile-menu-btn.active .hamburger-line:nth-child(2) {
                opacity: 0 !important;
            }
            
            .mobile-menu-btn.active .hamburger-line:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px) !important;
            }
            
            /* モバイルメニューの修正 */
            .mobile-menu {
                position: fixed !important;
                top: 0 !important;
                right: -100% !important;
                width: 280px !important;
                height: 100vh !important;
                background: #ffffff !important;
                z-index: 9998 !important;
                transition: right 0.3s ease !important;
                box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1) !important;
                overflow-y: auto !important;
            }
            
            .mobile-menu.active {
                right: 0 !important;
            }
            
            .mobile-menu-header {
                padding: 1.5rem !important;
                border-bottom: 1px solid #e2e8f0 !important;
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
                background: #f8fafc !important;
            }
            
            .mobile-menu-title {
                font-size: 1.25rem !important;
                font-weight: 600 !important;
                color: #2d3748 !important;
                margin: 0 !important;
            }
            
            .mobile-menu-close {
                background: none !important;
                border: none !important;
                font-size: 1.5rem !important;
                color: #4a5568 !important;
                cursor: pointer !important;
                padding: 0.5rem !important;
                border-radius: 4px !important;
            }
            
            .mobile-menu-close:hover {
                background: #e2e8f0 !important;
            }
            
            .mobile-menu-body {
                padding: 1rem 0 !important;
            }
            
            .mobile-nav-list {
                list-style: none !important;
                padding: 0 !important;
                margin: 0 !important;
            }
            
            .mobile-nav-list li {
                margin: 0 !important;
            }
            
            .mobile-nav-list a {
                display: flex !important;
                align-items: center !important;
                padding: 1rem 1.5rem !important;
                color: #2d3748 !important;
                text-decoration: none !important;
                font-size: 1rem !important;
                font-weight: 500 !important;
                border-bottom: 1px solid #f1f5f9 !important;
                transition: all 0.2s ease !important;
            }
            
            .mobile-nav-list a:hover {
                background: #f8fafc !important;
                color: #3182ce !important;
            }
            
            .mobile-nav-list a i {
                margin-right: 0.75rem !important;
                width: 20px !important;
                color: #4a5568 !important;
            }
            
            .mobile-nav-list a.mobile-cta {
                background: #3182ce !important;
                color: #ffffff !important;
                margin: 1rem !important;
                border-radius: 6px !important;
                border: none !important;
            }
            
            .mobile-nav-list a.mobile-cta:hover {
                background: #2c5aa0 !important;
                color: #ffffff !important;
            }
            
            .mobile-nav-list a.mobile-cta i {
                color: #ffffff !important;
            }
            
            /* オーバーレイの修正 */
            .mobile-menu-overlay {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                height: 100% !important;
                background: rgba(0, 0, 0, 0.5) !important;
                z-index: 9997 !important;
                opacity: 0 !important;
                visibility: hidden !important;
                transition: all 0.3s ease !important;
            }
            
            .mobile-menu-overlay.active {
                opacity: 1 !important;
                visibility: visible !important;
            }
            
            /* ボディのスクロール制御 */
            body.menu-open {
                overflow: hidden !important;
            }
            
            /* デスクトップでは非表示 */
            @media (min-width: 769px) {
                .mobile-menu-btn,
                .mobile-menu,
                .mobile-menu-overlay {
                    display: none !important;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
})();

