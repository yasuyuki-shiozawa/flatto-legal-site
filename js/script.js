// ふらっと法務事務所 入札サポート専門サイト スクリプト

document.addEventListener('DOMContentLoaded', function() {
    // タッチデバイスの検出
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
    }
    
    // ナビゲーションのスクロール効果
    const header = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 50) {
                header.classList.add('navbar-scrolled');
                
                // モバイルでのヘッダー自動非表示/表示
                if (window.innerWidth <= 768) {
                    if (scrollTop > lastScrollTop && scrollTop > 100) {
                        // 下スクロール時にヘッダーを隠す
                        header.style.transform = 'translateY(-100%)';
                    } else {
                        // 上スクロール時にヘッダーを表示
                        header.style.transform = 'translateY(0)';
                    }
                }
            } else {
                header.classList.remove('navbar-scrolled');
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        }, 10);
    });
    
    // ヘッダーのトランジション設定
    header.style.transition = 'all 0.3s ease';
    
    // モバイルメニューの動作改善
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // メニューの開閉状態を管理
        let isMenuOpen = false;
        
        navbarToggler.addEventListener('click', function(e) {
            e.stopPropagation();
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                document.body.style.overflow = 'hidden'; // スクロール無効化
            } else {
                document.body.style.overflow = ''; // スクロール有効化
            }
        });
        
        // メニュー外タップで閉じる
        document.addEventListener('click', function(e) {
            if (isMenuOpen && !navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                navbarToggler.click();
            }
        });
        
        // メニュー項目クリックで閉じる
        navbarCollapse.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 991 && isMenuOpen) {
                    navbarToggler.click();
                }
            });
        });
    }
    
    // スムーススクロール（改善版）
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // アニメーション効果
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const animateOnScroll = function() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // 初期表示時にも実行
    
    // お問い合わせフォームのバリデーション
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 簡易バリデーション
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            // メールアドレスの形式チェック
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('is-invalid');
                }
            }
            
            if (isValid) {
                // フォーム送信処理（実際の送信処理は別途実装）
                alert('お問い合わせありがとうございます。担当者より連絡いたします。');
                contactForm.reset();
            } else {
                alert('必須項目を入力してください。');
            }
        });
    }
    
    // FAQのアコーディオン
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', function() {
                item.classList.toggle('active');
            });
        });
    }
});
