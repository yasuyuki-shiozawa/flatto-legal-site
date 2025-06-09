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


// ===== フェーズ2: ナビゲーション改善機能 =====

// サイト内検索機能
class SiteSearch {
    constructor() {
        this.searchData = [];
        this.init();
    }

    init() {
        this.createSearchInterface();
        this.loadSearchData();
        this.bindEvents();
    }

    createSearchInterface() {
        const searchHTML = `
            <div class="site-search">
                <div class="search-icon">🔍</div>
                <input type="text" class="search-input" placeholder="サイト内を検索..." autocomplete="off">
                <div class="search-results"></div>
            </div>
        `;
        
        // ヘッダーに検索機能を追加
        const header = document.querySelector('.header');
        if (header) {
            const searchContainer = document.createElement('div');
            searchContainer.innerHTML = searchHTML;
            header.appendChild(searchContainer.firstElementChild);
        }
    }

    loadSearchData() {
        // サイト内のページデータを定義
        this.searchData = [
            {
                title: 'ホーム',
                url: '/',
                excerpt: '行政書士法人ふらっと法務事務所の入札サポート専門サイト',
                keywords: ['ホーム', 'トップ', '入札', 'サポート', '行政書士']
            },
            {
                title: 'サービス紹介',
                url: '/services/',
                excerpt: '入札参加資格取得から落札まで、トータルサポートサービス',
                keywords: ['サービス', '入札参加資格', '落札', 'サポート', '支援']
            },
            {
                title: 'ご利用の流れ',
                url: '/flow/',
                excerpt: '無料相談から契約完了まで、5つのステップで安心サポート',
                keywords: ['流れ', 'ステップ', '無料相談', '契約', '手順']
            },
            {
                title: '入札ノウハウ',
                url: '/knowhow/',
                excerpt: '入札成功への5ステップガイド。1,000+支援実績、95%成功率',
                keywords: ['ノウハウ', '5ステップ', '成功', '実績', 'ガイド', '入札参加資格', '案件探索']
            },
            {
                title: '成功事例',
                url: '/cases/',
                excerpt: '実際の成功事例をご紹介。様々な業種での落札実績',
                keywords: ['成功事例', '実績', '落札', '事例', '業種']
            },
            {
                title: '会社案内',
                url: '/about/',
                excerpt: '塩澤康幸代表の紹介と事務所概要。15年の経験と豊富な実績',
                keywords: ['会社案内', '塩澤康幸', '代表', '事務所', '経験', '実績']
            },
            {
                title: 'お問い合わせ',
                url: '/contact/',
                excerpt: '無料相談受付中。電話・メールでお気軽にご相談ください',
                keywords: ['お問い合わせ', '無料相談', '電話', 'メール', '相談']
            },
            {
                title: 'よくある質問（FAQ）',
                url: '/faq/',
                excerpt: '入札に関するよくある質問と回答。6つのカテゴリで30の質問',
                keywords: ['FAQ', 'よくある質問', '質問', '回答', '入札参加資格', '案件探索', '電子入札']
            },
            {
                title: '用語集',
                url: '/glossary/',
                excerpt: '入札・調達関連用語の詳細解説',
                keywords: ['用語集', '用語', '解説', '入札', '調達']
            },
            {
                title: 'リンク集',
                url: '/links/',
                excerpt: '入札・調達関連の公的機関リンク集。30サイトを厳選',
                keywords: ['リンク集', '公的機関', '入札', '調達', '政府', '自治体']
            }
        ];
    }

    bindEvents() {
        const searchInput = document.querySelector('.search-input');
        const searchResults = document.querySelector('.search-results');

        if (!searchInput || !searchResults) return;

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (query.length < 2) {
                searchResults.classList.remove('active');
                return;
            }

            const results = this.search(query);
            this.displayResults(results, searchResults);
        });

        // 検索結果外をクリックで閉じる
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.site-search')) {
                searchResults.classList.remove('active');
            }
        });
    }

    search(query) {
        const lowerQuery = query.toLowerCase();
        return this.searchData.filter(item => {
            return item.title.toLowerCase().includes(lowerQuery) ||
                   item.excerpt.toLowerCase().includes(lowerQuery) ||
                   item.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery));
        }).slice(0, 5); // 最大5件まで表示
    }

    displayResults(results, container) {
        if (results.length === 0) {
            container.innerHTML = '<div class="search-result-item">該当する結果が見つかりませんでした</div>';
        } else {
            container.innerHTML = results.map(result => `
                <div class="search-result-item" onclick="window.location.href='${result.url}'">
                    <div class="search-result-title">${result.title}</div>
                    <div class="search-result-excerpt">${result.excerpt}</div>
                </div>
            `).join('');
        }
        container.classList.add('active');
    }
}

// 目次自動生成機能
class TableOfContents {
    constructor() {
        this.init();
    }

    init() {
        const content = document.querySelector('.content, main, article');
        if (!content) return;

        const headings = content.querySelectorAll('h2, h3, h4');
        if (headings.length < 3) return; // 見出しが少ない場合は目次を作らない

        this.generateTOC(headings);
        this.addSmoothScrolling();
    }

    generateTOC(headings) {
        const tocContainer = document.createElement('div');
        tocContainer.className = 'table-of-contents';
        
        const tocTitle = document.createElement('h3');
        tocTitle.textContent = 'この記事の目次';
        
        const tocList = document.createElement('ul');
        tocList.className = 'toc-list';

        headings.forEach((heading, index) => {
            // アンカーIDを設定
            const id = `heading-${index}`;
            heading.id = id;
            heading.classList.add('anchor-offset');

            // 目次項目を作成
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${id}`;
            link.textContent = heading.textContent;
            link.className = `toc-level-${heading.tagName.toLowerCase().replace('h', '')}`;
            
            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });

        tocContainer.appendChild(tocTitle);
        tocContainer.appendChild(tocList);

        // 最初の見出しの前に挿入
        const firstHeading = headings[0];
        firstHeading.parentNode.insertBefore(tocContainer, firstHeading);
    }

    addSmoothScrolling() {
        document.querySelectorAll('.toc-list a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// ページナビゲーション機能
class PageNavigation {
    constructor() {
        this.init();
    }

    init() {
        this.createPageNav();
        this.highlightCurrentSection();
    }

    createPageNav() {
        const headings = document.querySelectorAll('h2[id], h3[id]');
        if (headings.length < 3) return;

        const navContainer = document.createElement('div');
        navContainer.className = 'page-navigation';
        
        const navTitle = document.createElement('h4');
        navTitle.textContent = 'ページ内ナビ';
        
        const navList = document.createElement('ul');
        navList.className = 'page-nav-list';

        headings.forEach(heading => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${heading.id}`;
            link.textContent = heading.textContent;
            link.dataset.target = heading.id;
            
            listItem.appendChild(link);
            navList.appendChild(listItem);
        });

        navContainer.appendChild(navTitle);
        navContainer.appendChild(navList);

        // サイドバーまたは適切な位置に配置
        const sidebar = document.querySelector('.sidebar');
        const content = document.querySelector('.content, main');
        
        if (sidebar) {
            sidebar.appendChild(navContainer);
        } else if (content) {
            content.appendChild(navContainer);
        }
    }

    highlightCurrentSection() {
        const navLinks = document.querySelectorAll('.page-nav-list a');
        const headings = document.querySelectorAll('h2[id], h3[id]');

        if (navLinks.length === 0 || headings.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`[data-target="${entry.target.id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, {
            rootMargin: '-20% 0px -70% 0px'
        });

        headings.forEach(heading => observer.observe(heading));
    }
}

// パンくずナビゲーション
class Breadcrumb {
    constructor() {
        this.init();
    }

    init() {
        this.createBreadcrumb();
    }

    createBreadcrumb() {
        const path = window.location.pathname;
        const breadcrumbData = this.getBreadcrumbData(path);
        
        if (breadcrumbData.length <= 1) return; // ホームページのみの場合は表示しない

        const breadcrumbContainer = document.createElement('nav');
        breadcrumbContainer.className = 'breadcrumb';
        breadcrumbContainer.setAttribute('aria-label', 'パンくずナビゲーション');
        
        const breadcrumbList = document.createElement('ul');
        breadcrumbList.className = 'breadcrumb-list';

        breadcrumbData.forEach((item, index) => {
            const listItem = document.createElement('li');
            
            if (index === breadcrumbData.length - 1) {
                // 現在のページ
                const span = document.createElement('span');
                span.className = 'current';
                span.textContent = item.title;
                listItem.appendChild(span);
            } else {
                // リンク
                const link = document.createElement('a');
                link.href = item.url;
                link.textContent = item.title;
                listItem.appendChild(link);
            }
            
            breadcrumbList.appendChild(listItem);
        });

        breadcrumbContainer.appendChild(breadcrumbList);

        // ヘッダーの下に挿入
        const header = document.querySelector('.header');
        const main = document.querySelector('main, .content');
        
        if (header && main) {
            header.parentNode.insertBefore(breadcrumbContainer, main);
        }
    }

    getBreadcrumbData(path) {
        const pathMap = {
            '/': { title: 'ホーム', url: '/' },
            '/services/': { title: 'サービス紹介', url: '/services/' },
            '/flow/': { title: 'ご利用の流れ', url: '/flow/' },
            '/knowhow/': { title: '入札ノウハウ', url: '/knowhow/' },
            '/cases/': { title: '成功事例', url: '/cases/' },
            '/about/': { title: '会社案内', url: '/about/' },
            '/contact/': { title: 'お問い合わせ', url: '/contact/' },
            '/faq/': { title: 'よくある質問', url: '/faq/' },
            '/glossary/': { title: '用語集', url: '/glossary/' },
            '/links/': { title: 'リンク集', url: '/links/' }
        };

        const breadcrumb = [{ title: 'ホーム', url: '/' }];
        
        if (path !== '/' && pathMap[path]) {
            breadcrumb.push(pathMap[path]);
        }

        return breadcrumb;
    }
}

// 関連ページ誘導機能
class RelatedPages {
    constructor() {
        this.init();
    }

    init() {
        this.addRelatedPages();
    }

    addRelatedPages() {
        const path = window.location.pathname;
        const relatedData = this.getRelatedPages(path);
        
        if (relatedData.length === 0) return;

        const relatedContainer = document.createElement('div');
        relatedContainer.className = 'related-pages';
        
        const title = document.createElement('h3');
        title.textContent = 'さらに詳しい情報';
        
        const linksContainer = document.createElement('div');
        linksContainer.className = 'related-links';

        relatedData.forEach(item => {
            const link = document.createElement('a');
            link.href = item.url;
            link.className = 'related-link';
            
            const linkTitle = document.createElement('div');
            linkTitle.className = 'related-link-title';
            linkTitle.textContent = item.title;
            
            const linkDesc = document.createElement('div');
            linkDesc.className = 'related-link-desc';
            linkDesc.textContent = item.description;
            
            link.appendChild(linkTitle);
            link.appendChild(linkDesc);
            linksContainer.appendChild(link);
        });

        relatedContainer.appendChild(title);
        relatedContainer.appendChild(linksContainer);

        // ページの最後に追加
        const main = document.querySelector('main, .content');
        if (main) {
            main.appendChild(relatedContainer);
        }
    }

    getRelatedPages(path) {
        const relatedMap = {
            '/': [
                { title: '入札ノウハウ', url: '/knowhow/', description: '5ステップで学ぶ入札成功法' },
                { title: 'サービス紹介', url: '/services/', description: 'トータルサポートサービス' },
                { title: 'よくある質問', url: '/faq/', description: '入札に関する疑問を解決' }
            ],
            '/knowhow/': [
                { title: 'よくある質問', url: '/faq/', description: '入札に関する疑問を解決' },
                { title: 'サービス紹介', url: '/services/', description: '専門家によるサポート' },
                { title: '成功事例', url: '/cases/', description: '実際の落札事例をご紹介' }
            ],
            '/faq/': [
                { title: '入札ノウハウ', url: '/knowhow/', description: '詳細な手順とコツ' },
                { title: 'お問い合わせ', url: '/contact/', description: '無料相談受付中' },
                { title: '用語集', url: '/glossary/', description: '入札関連用語の解説' }
            ],
            '/services/': [
                { title: 'ご利用の流れ', url: '/flow/', description: '5つのステップで安心サポート' },
                { title: '入札ノウハウ', url: '/knowhow/', description: '成功のための知識' },
                { title: '成功事例', url: '/cases/', description: '豊富な実績をご紹介' }
            ]
        };

        return relatedMap[path] || [];
    }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    new SiteSearch();
    new TableOfContents();
    new PageNavigation();
    new Breadcrumb();
    new RelatedPages();
});

