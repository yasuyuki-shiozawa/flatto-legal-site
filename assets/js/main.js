// モバイルメニューの制御
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            // ボタンのアニメーション
            mobileMenuBtn.classList.toggle('active');
            
            // メニューの表示/非表示
            mobileMenu.classList.toggle('active');
            
            // アクセシビリティ
            const isExpanded = mobileMenu.classList.contains('active');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
            mobileMenuBtn.setAttribute('aria-label', isExpanded ? 'メニューを閉じる' : 'メニューを開く');
        });
        
        // メニュー外クリックで閉じる
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.setAttribute('aria-label', 'メニューを開く');
            }
        });
        
        // ESCキーで閉じる
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.setAttribute('aria-label', 'メニューを開く');
            }
        });
    }
});

// スムーススクロール
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// フォームバリデーション（将来のお問い合わせフォーム用）
function validateForm(formElement) {
    const requiredFields = formElement.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        const errorElement = field.parentNode.querySelector('.error-message');
        
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            
            if (errorElement) {
                errorElement.textContent = 'この項目は必須です';
                errorElement.style.display = 'block';
            }
        } else {
            field.classList.remove('error');
            
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        }
        
        // メールアドレスの形式チェック
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                field.classList.add('error');
                
                if (errorElement) {
                    errorElement.textContent = '正しいメールアドレスを入力してください';
                    errorElement.style.display = 'block';
                }
            }
        }
    });
    
    return isValid;
}

// ページトップへ戻るボタン（将来実装）
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-chevron-up"></i>';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'ページトップへ戻る');
    button.style.display = 'none';
    
    document.body.appendChild(button);
    
    // スクロール監視
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
    
    // クリックイベント
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    // 必要に応じて機能を有効化
    // createBackToTopButton();
    
    console.log('ふらっと法務事務所サイト - JavaScript初期化完了');
});


// ===== フェーズ3: 高度なインタラクション機能 =====

// スクロールアニメーション（Intersection Observer）
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }
    
    init() {
        this.createObserver();
        this.observeElements();
    }
    
    createObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // 一度アニメーションしたら監視を停止
                    this.observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);
    }
    
    observeElements() {
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        animateElements.forEach(el => {
            this.observer.observe(el);
        });
    }
}

// パララックス効果
class ParallaxEffect {
    constructor() {
        this.elements = document.querySelectorAll('.parallax-element');
        this.init();
    }
    
    init() {
        if (this.elements.length > 0) {
            this.bindEvents();
        }
    }
    
    bindEvents() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    updateParallax() {
        const scrolled = window.pageYOffset;
        
        this.elements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    }
}

// マイクロインタラクション
class MicroInteractions {
    constructor() {
        this.init();
    }
    
    init() {
        this.initButtonRipple();
        this.initFormAnimations();
        this.initCardHover();
    }
    
    initButtonRipple() {
        const buttons = document.querySelectorAll('.btn-micro');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    initFormAnimations() {
        const inputs = document.querySelectorAll('.form-input-micro');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentNode.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentNode.classList.remove('focused');
                }
            });
            
            // 初期値がある場合
            if (input.value) {
                input.parentNode.classList.add('focused');
            }
        });
    }
    
    initCardHover() {
        const cards = document.querySelectorAll('.card-3d');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                const inner = card.querySelector('.card-3d-inner');
                if (inner) {
                    inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const inner = card.querySelector('.card-3d-inner');
                if (inner) {
                    inner.style.transform = 'rotateX(0deg) rotateY(0deg)';
                }
            });
        });
    }
}

// パーティクルシステム
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.particleCount = 20;
        this.init();
    }
    
    init() {
        this.createParticles();
        this.animate();
    }
    
    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // ランダムな位置とサイズ
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            
            this.container.appendChild(particle);
            this.particles.push(particle);
        }
    }
    
    animate() {
        // パーティクルの動的な動きを制御
        setInterval(() => {
            this.particles.forEach(particle => {
                const currentLeft = parseFloat(particle.style.left);
                const currentTop = parseFloat(particle.style.top);
                
                // 境界チェックと位置リセット
                if (currentLeft > 100 || currentTop > 100) {
                    particle.style.left = Math.random() * 100 + '%';
                    particle.style.top = Math.random() * 100 + '%';
                }
            });
        }, 6000);
    }
}

// ローディングアニメーション
class LoadingAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.createPageLoader();
        this.initLazyLoading();
    }
    
    createPageLoader() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loading-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        
        document.body.appendChild(loader);
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.remove();
                }, 300);
            }, 500);
        });
    }
    
    initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// スムーズスクロール強化
class EnhancedScroll {
    constructor() {
        this.init();
    }
    
    init() {
        this.createScrollIndicator();
        this.initSectionHighlight();
    }
    
    createScrollIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        indicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-blue), var(--soft-green));
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        
        document.body.appendChild(indicator);
        
        window.addEventListener('scroll', () => {
            const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            indicator.style.width = scrolled + '%';
        });
    }
    
    initSectionHighlight() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    // ナビゲーションリンクのアクティブ状態を更新
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.3
        });
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
}

// パフォーマンス最適化
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        this.optimizeAnimations();
        this.initIntersectionObserver();
    }
    
    optimizeAnimations() {
        // Reduced motionの設定を確認
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.body.classList.add('reduce-motion');
        }
        
        prefersReducedMotion.addEventListener('change', () => {
            if (prefersReducedMotion.matches) {
                document.body.classList.add('reduce-motion');
            } else {
                document.body.classList.remove('reduce-motion');
            }
        });
    }
    
    initIntersectionObserver() {
        // GPU加速の最適化
        const heavyElements = document.querySelectorAll('.card-3d, .parallax-element, .particle-container');
        
        const performanceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('gpu-accelerated');
                } else {
                    entry.target.classList.remove('gpu-accelerated');
                }
            });
        });
        
        heavyElements.forEach(element => {
            performanceObserver.observe(element);
        });
    }
}

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    // 基本機能の初期化
    new ScrollAnimations();
    new MicroInteractions();
    new EnhancedScroll();
    new PerformanceOptimizer();
    
    // 条件付き初期化
    if (document.querySelector('.parallax-element')) {
        new ParallaxEffect();
    }
    
    if (document.querySelector('.particle-container')) {
        document.querySelectorAll('.particle-container').forEach(container => {
            new ParticleSystem(container);
        });
    }
    
    // ローディングアニメーション（開発環境でのみ）
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        new LoadingAnimations();
    }
    
    console.log('フェーズ3: 高度なインタラクション機能 - 初期化完了');
});

// エラーハンドリング
window.addEventListener('error', function(e) {
    console.warn('JavaScript Error:', e.error);
    // 本番環境では適切なエラー報告システムに送信
});

// リサイズ最適化
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // リサイズ後の処理
        window.dispatchEvent(new Event('optimizedResize'));
    }, 250);
});

