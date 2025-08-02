// 統合メインJavaScriptファイル
// すべてのJavaScript機能を一つのファイルに統合

(function() {
    'use strict';

    // DOM読み込み完了を待つ
    document.addEventListener('DOMContentLoaded', function() {
        // レイアウトの安定性を確保
        ensureLayoutStability();
        
        initMobileMenu();
        initMobileSidebarToggle();
        initSidebarActive();
        initSmoothScroll();
        initLazyLoading();
        initAccessibility();
        initFormValidation();
        initImageErrorHandling();
        initFloatingCharacter();
        initStickyCTA();
    });
    
    // 全てのリソースが読み込まれた後にも実行
    window.addEventListener('load', function() {
        ensureLayoutStability();
    });
    
    // ページ表示時（キャッシュからの復帰も含む）にも実行
    window.addEventListener('pageshow', function(event) {
        ensureLayoutStability();
    });
    
    // レイアウトの安定性を確保（必要に応じて保持）
    function ensureLayoutStability() {
        // 現在はcore-layout.scssで処理されているため、特別な処理は不要
        // 将来的なレイアウト調整のためにフック関数として保持
    }

    // モバイルメニュー機能
    function initMobileMenu() {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.mobile-menu-overlay');
        const body = document.body;

        if (!menuToggle || !mobileMenu) return;

        menuToggle.addEventListener('click', function() {
            const isOpen = mobileMenu.classList.contains('open');
            
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        if (overlay) {
            overlay.addEventListener('click', closeMobileMenu);
        }

        // ESCキーで閉じる
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
                closeMobileMenu();
            }
        });

        function openMobileMenu() {
            mobileMenu.classList.add('open');
            if (overlay) overlay.classList.add('active');
            body.style.overflow = 'hidden';
            menuToggle.setAttribute('aria-expanded', 'true');
        }

        function closeMobileMenu() {
            mobileMenu.classList.remove('open');
            if (overlay) overlay.classList.remove('active');
            body.style.overflow = '';
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }

    // モバイルサイドバートグル機能
    function initMobileSidebarToggle() {
        const navToggle = document.querySelector('.mobile-nav-toggle');
        const leftSidebar = document.querySelector('.left-sidebar');
        
        if (!navToggle || !leftSidebar) return;
        
        // トグルボタンを作成（存在しない場合）
        if (!document.querySelector('.mobile-nav-toggle')) {
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'mobile-nav-toggle';
            toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
            toggleBtn.setAttribute('aria-label', 'サイドバーメニューを開く');
            document.body.appendChild(toggleBtn);
        }
        
        navToggle.addEventListener('click', function() {
            const isVisible = leftSidebar.classList.contains('mobile-visible');
            
            if (isVisible) {
                leftSidebar.classList.remove('mobile-visible');
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                navToggle.setAttribute('aria-label', 'サイドバーメニューを開く');
                document.body.style.overflow = '';
            } else {
                leftSidebar.classList.add('mobile-visible');
                navToggle.innerHTML = '<i class="fas fa-times"></i>';
                navToggle.setAttribute('aria-label', 'サイドバーメニューを閉じる');
                document.body.style.overflow = 'hidden';
            }
        });
        
        // 閉じるボタンを追加
        const closeBtn = document.createElement('button');
        closeBtn.className = 'sidebar-close-btn';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.setAttribute('aria-label', 'サイドバーを閉じる');
        closeBtn.style.cssText = 'position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; cursor: pointer;';
        
        if (leftSidebar.querySelector('.left-sidebar-content')) {
            leftSidebar.querySelector('.left-sidebar-content').prepend(closeBtn);
        }
        
        closeBtn.addEventListener('click', function() {
            leftSidebar.classList.remove('mobile-visible');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            navToggle.setAttribute('aria-label', 'サイドバーメニューを開く');
            document.body.style.overflow = '';
        });
    }

    // サイドバーアクティブ状態
    function initSidebarActive() {
        const currentPath = window.location.pathname;
        const sidebarLinks = document.querySelectorAll('.sidebar-nav-link');
        
        sidebarLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && currentPath.includes(href) && href !== '/') {
                link.classList.add('active');
            }
        });
    }

    // スムーススクロール
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (!target) return;
                
                e.preventDefault();
                
                const offset = 80; // ヘッダーの高さ
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    // 画像の遅延読み込み（改善版）
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"], img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        // data-src属性がある場合
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        
                        // 読み込み完了時にクラスを追加
                        img.addEventListener('load', function() {
                            img.classList.add('loaded');
                        });
                        
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px', // 50px手前から読み込み開始
                threshold: 0.01
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            lazyImages.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                img.classList.add('loaded');
            });
        }
        
        // WebP対応チェック
        checkWebPSupport();
        
        // 画像エラーハンドリング
        handleImageErrors();
    }
    
    // WebP対応チェック
    function checkWebPSupport() {
        const webP = new Image();
        webP.onload = webP.onerror = function() {
            const isSupported = webP.height === 2;
            if (!isSupported) {
                document.documentElement.classList.add('no-webp');
            }
        };
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    }
    
    // 画像エラーハンドリング
    function handleImageErrors() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('error', function() {
                this.classList.add('error');
                // デフォルト画像の設定
                if (this.src.includes('default-post.jpg') || this.src.includes('default-thumb.jpg')) {
                    this.src = '/assets/images/blog/default-blog-image.jpg';
                }
            });
        });
    }

    // アクセシビリティ機能
    function initAccessibility() {
        // フォーカストラップ
        const modals = document.querySelectorAll('[role="dialog"]');
        modals.forEach(modal => {
            const focusableElements = modal.querySelectorAll(
                'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
            );
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];

            modal.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusable) {
                            lastFocusable.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastFocusable) {
                            firstFocusable.focus();
                            e.preventDefault();
                        }
                    }
                }
            });
        });

        // スキップリンク
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.tabIndex = -1;
                    target.focus();
                }
            });
        }
    }

    // フォームバリデーション
    function initFormValidation() {
        const forms = document.querySelectorAll('form[data-validate]');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                const inputs = form.querySelectorAll('[required]');
                let isValid = true;
                
                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.classList.add('error');
                        showError(input, '必須項目です');
                    } else {
                        input.classList.remove('error');
                        removeError(input);
                    }
                    
                    // メールアドレスのバリデーション
                    if (input.type === 'email' && input.value) {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(input.value)) {
                            isValid = false;
                            input.classList.add('error');
                            showError(input, '正しいメールアドレスを入力してください');
                        }
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                }
            });
        });
        
        function showError(input, message) {
            removeError(input);
            const error = document.createElement('span');
            error.className = 'error-message';
            error.textContent = message;
            input.parentElement.appendChild(error);
        }
        
        function removeError(input) {
            const error = input.parentElement.querySelector('.error-message');
            if (error) {
                error.remove();
            }
        }
    }
    
    // 画像エラーハンドリング
    function initImageErrorHandling() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.addEventListener('error', function() {
                // エラークラスを追加
                this.classList.add('error');
                
                // デフォルト画像があれば設定
                const defaultSrc = this.dataset.defaultSrc || '/assets/images/default-image.svg';
                
                // 無限ループを防ぐため、既にデフォルト画像の場合はスキップ
                if (this.src !== window.location.origin + defaultSrc) {
                    this.src = defaultSrc;
                }
                
                // alt属性がない場合は設定
                if (!this.alt) {
                    this.alt = '画像を読み込めませんでした';
                }
            });
            
            // 既に読み込みエラーが発生している画像の処理
            if (img.complete && img.naturalHeight === 0) {
                img.dispatchEvent(new Event('error'));
            }
        });
    }
    
    // フローティングキャラクターの初期化
    function initFloatingCharacter() {
        const character = document.getElementById('floatingCharacter');
        if (!character) return;
        
        // クリックで相談ページへ
        character.addEventListener('click', function() {
            window.location.href = '/contact/';
        });
        
        // スクロールに応じて表示/非表示
        let lastScrollTop = 0;
        let hideTimeout;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // 下スクロール時は非表示
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                character.style.transform = 'translateX(100px)';
            } else {
                character.style.transform = 'translateX(0)';
            }
            
            lastScrollTop = scrollTop;
            
            // スクロール停止後3秒で再表示
            clearTimeout(hideTimeout);
            hideTimeout = setTimeout(function() {
                character.style.transform = 'translateX(0)';
            }, 3000);
        });
        
        // ページ下部付近では上に移動
        function adjustCharacterPosition() {
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollPosition = window.innerHeight + window.pageYOffset;
            const footerHeight = 200; // フッターの推定高さ
            
            if (scrollHeight - scrollPosition < footerHeight) {
                const offset = footerHeight - (scrollHeight - scrollPosition);
                character.style.bottom = (20 + offset) + 'px';
            } else {
                character.style.bottom = '20px';
            }
        }
        
        window.addEventListener('scroll', adjustCharacterPosition);
        window.addEventListener('resize', adjustCharacterPosition);
    }
    
    // スティッキーCTAバーの初期化
    function initStickyCTA() {
        const stickyCTA = document.getElementById('stickyCTA');
        if (!stickyCTA) return;
        
        let hasShown = false;
        const showThreshold = 0.3; // ページの30%スクロール後に表示
        
        function checkScroll() {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPosition = window.pageYOffset;
            const scrollPercentage = scrollPosition / scrollHeight;
            
            // 一定スクロール後に表示
            if (scrollPercentage > showThreshold && !hasShown) {
                stickyCTA.classList.add('show');
                hasShown = true;
            }
            
            // ページ最下部付近では非表示
            if (scrollHeight - scrollPosition < 200) {
                stickyCTA.classList.remove('show');
            } else if (hasShown && scrollPercentage > showThreshold) {
                stickyCTA.classList.add('show');
            }
        }
        
        // スクロールイベントの最適化
        let ticking = false;
        function requestTick() {
            if (!ticking) {
                window.requestAnimationFrame(checkScroll);
                ticking = true;
                setTimeout(() => { ticking = false; }, 100);
            }
        }
        
        window.addEventListener('scroll', requestTick);
        
        // 閉じるボタン機能（オプション）
        const closeBtn = stickyCTA.querySelector('.sticky-cta-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                stickyCTA.classList.remove('show');
                // セッション中は再表示しない
                sessionStorage.setItem('hideStickyCtA', 'true');
            });
        }
        
        // セッションストレージチェック
        if (sessionStorage.getItem('hideStickyCtA')) {
            stickyCTA.style.display = 'none';
        }
    }

})();// Force JS update: Sat Aug  2 13:26:27 EDT 2025
