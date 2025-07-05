// パフォーマンス最適化
// 遅延読み込み、リソースの最適化、キャッシュ戦略

(function() {
    'use strict';

    // パフォーマンス設定
    const PERF_CONFIG = {
        lazyLoadOffset: 50,
        imageSizes: {
            small: 480,
            medium: 768,
            large: 1024,
            xlarge: 1280
        },
        cacheVersion: 'v1',
        criticalCSS: true,
        prefetchDelay: 2000,
        resourceHints: true
    };

    // パフォーマンスマネージャー
    class PerformanceManager {
        constructor() {
            this.init();
        }

        init() {
            // Critical CSS を最初に適用
            this.applyCriticalCSS();
            
            // DOMContentLoaded後の初期化
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    this.setupLazyLoading();
                    this.optimizeImages();
                    this.setupResourceHints();
                    this.setupServiceWorker();
                    this.deferNonCriticalCSS();
                    this.optimizeJavaScript();
                });
            } else {
                this.setupLazyLoading();
                this.optimizeImages();
                this.setupResourceHints();
                this.setupServiceWorker();
                this.deferNonCriticalCSS();
                this.optimizeJavaScript();
            }

            // アイドル時の処理
            if ('requestIdleCallback' in window) {
                requestIdleCallback(() => {
                    this.prefetchResources();
                    this.cleanupCache();
                });
            } else {
                setTimeout(() => {
                    this.prefetchResources();
                    this.cleanupCache();
                }, PERF_CONFIG.prefetchDelay);
            }
        }

        // Critical CSS の適用
        applyCriticalCSS() {
            if (!PERF_CONFIG.criticalCSS) return;

            // インラインCritical CSSがない場合は、基本的なスタイルを追加
            if (!document.querySelector('style[data-critical]')) {
                const criticalStyles = `
                    /* Critical CSS */
                    :root {
                        --font-family-base: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                        --color-primary-600: #2563eb;
                        --color-bg-primary: #ffffff;
                        --color-text-primary: #1f2937;
                    }
                    
                    *, *::before, *::after {
                        box-sizing: border-box;
                    }
                    
                    body {
                        margin: 0;
                        font-family: var(--font-family-base);
                        color: var(--color-text-primary);
                        background-color: var(--color-bg-primary);
                    }
                    
                    .container {
                        width: 100%;
                        max-width: 1280px;
                        margin: 0 auto;
                        padding: 0 1rem;
                    }
                    
                    /* 非表示要素 */
                    [hidden], .hidden {
                        display: none !important;
                    }
                `;

                const style = document.createElement('style');
                style.setAttribute('data-critical', 'true');
                style.textContent = criticalStyles;
                document.head.insertBefore(style, document.head.firstChild);
            }
        }

        // 画像の遅延読み込み
        setupLazyLoading() {
            const lazyImages = document.querySelectorAll('img[data-src], picture source[data-srcset]');
            
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.loadImage(entry.target);
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    rootMargin: `${PERF_CONFIG.lazyLoadOffset}px`
                });

                lazyImages.forEach(img => imageObserver.observe(img));
            } else {
                // フォールバック
                lazyImages.forEach(img => this.loadImage(img));
            }

            // iframe の遅延読み込み
            const lazyIframes = document.querySelectorAll('iframe[data-src]');
            lazyIframes.forEach(iframe => {
                if ('IntersectionObserver' in window) {
                    const iframeObserver = new IntersectionObserver((entries, observer) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                entry.target.src = entry.target.dataset.src;
                                observer.unobserve(entry.target);
                            }
                        });
                    });
                    iframeObserver.observe(iframe);
                } else {
                    iframe.src = iframe.dataset.src;
                }
            });
        }

        loadImage(element) {
            if (element.tagName === 'IMG') {
                if (element.dataset.src) {
                    element.src = element.dataset.src;
                    element.removeAttribute('data-src');
                }
                if (element.dataset.srcset) {
                    element.srcset = element.dataset.srcset;
                    element.removeAttribute('data-srcset');
                }
            } else if (element.tagName === 'SOURCE') {
                if (element.dataset.srcset) {
                    element.srcset = element.dataset.srcset;
                    element.removeAttribute('data-srcset');
                }
            }

            element.classList.add('loaded');
        }

        // 画像の最適化
        optimizeImages() {
            // WebP サポートチェック
            const supportsWebP = this.checkWebPSupport();

            // レスポンシブ画像の設定
            const images = document.querySelectorAll('img[data-sizes]');
            images.forEach(img => {
                const sizes = JSON.parse(img.dataset.sizes);
                let srcset = [];

                Object.entries(sizes).forEach(([size, src]) => {
                    srcset.push(`${src} ${size}w`);
                });

                img.srcset = srcset.join(', ');
                img.sizes = this.calculateSizes();
            });
        }

        checkWebPSupport() {
            const canvas = document.createElement('canvas');
            canvas.width = 1;
            canvas.height = 1;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
            ctx.fillRect(0, 0, 1, 1);
            
            return canvas.toDataURL('image/webp').indexOf('image/webp') === 0;
        }

        calculateSizes() {
            const breakpoints = [
                '(max-width: 480px) 100vw',
                '(max-width: 768px) 90vw',
                '(max-width: 1024px) 80vw',
                '70vw'
            ];
            return breakpoints.join(', ');
        }

        // リソースヒントの設定
        setupResourceHints() {
            if (!PERF_CONFIG.resourceHints) return;

            // DNS プリフェッチ
            const dnsPrefetch = [
                'https://fonts.googleapis.com',
                'https://fonts.gstatic.com',
                'https://www.google-analytics.com'
            ];

            dnsPrefetch.forEach(url => {
                const link = document.createElement('link');
                link.rel = 'dns-prefetch';
                link.href = url;
                document.head.appendChild(link);
            });

            // プリコネクト
            const preconnect = [
                'https://fonts.googleapis.com',
                'https://fonts.gstatic.com'
            ];

            preconnect.forEach(url => {
                const link = document.createElement('link');
                link.rel = 'preconnect';
                link.href = url;
                link.crossOrigin = 'anonymous';
                document.head.appendChild(link);
            });
        }

        // Service Worker の設定
        setupServiceWorker() {
            if ('serviceWorker' in navigator && location.protocol === 'https:') {
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/sw.js')
                        .then(registration => {
                            console.log('ServiceWorker registered:', registration);
                        })
                        .catch(error => {
                            console.log('ServiceWorker registration failed:', error);
                        });
                });
            }
        }

        // 非クリティカルCSSの遅延読み込み
        deferNonCriticalCSS() {
            const nonCriticalStyles = document.querySelectorAll('link[data-defer]');
            
            nonCriticalStyles.forEach(link => {
                link.media = 'print';
                link.onload = function() {
                    this.media = 'all';
                };
            });
        }

        // JavaScriptの最適化
        optimizeJavaScript() {
            // 非同期スクリプトの動的読み込み
            const asyncScripts = document.querySelectorAll('script[data-async-src]');
            
            asyncScripts.forEach(script => {
                const newScript = document.createElement('script');
                newScript.src = script.dataset.asyncSrc;
                newScript.async = true;
                
                // 属性のコピー
                Array.from(script.attributes).forEach(attr => {
                    if (attr.name !== 'data-async-src') {
                        newScript.setAttribute(attr.name, attr.value);
                    }
                });
                
                script.parentNode.replaceChild(newScript, script);
            });

            // モジュールの遅延読み込み
            this.setupModuleLazyLoading();
        }

        setupModuleLazyLoading() {
            // インタラクション時に読み込むモジュール
            const lazyModules = {
                search: {
                    trigger: '#search-input, .search-toggle',
                    module: '/assets/js/enhanced-search.js',
                    loaded: false
                },
                forms: {
                    trigger: 'form[data-validate]',
                    module: '/assets/js/form-validation.js',
                    loaded: false
                }
            };

            Object.entries(lazyModules).forEach(([name, config]) => {
                const triggers = document.querySelectorAll(config.trigger);
                if (triggers.length === 0) return;

                const loadModule = () => {
                    if (config.loaded) return;
                    
                    const script = document.createElement('script');
                    script.src = config.module;
                    script.async = true;
                    document.body.appendChild(script);
                    config.loaded = true;
                };

                triggers.forEach(trigger => {
                    trigger.addEventListener('focus', loadModule, { once: true });
                    trigger.addEventListener('click', loadModule, { once: true });
                });
            });
        }

        // リソースのプリフェッチ
        prefetchResources() {
            // ナビゲーションリンクのプリフェッチ
            const links = document.querySelectorAll('a[href^="/"]');
            const prefetchedUrls = new Set();

            links.forEach(link => {
                link.addEventListener('mouseenter', () => {
                    const url = link.href;
                    if (!prefetchedUrls.has(url)) {
                        const prefetchLink = document.createElement('link');
                        prefetchLink.rel = 'prefetch';
                        prefetchLink.href = url;
                        document.head.appendChild(prefetchLink);
                        prefetchedUrls.add(url);
                    }
                });
            });
        }

        // キャッシュのクリーンアップ
        cleanupCache() {
            if ('caches' in window) {
                caches.keys().then(names => {
                    names.forEach(name => {
                        if (name !== PERF_CONFIG.cacheVersion) {
                            caches.delete(name);
                        }
                    });
                });
            }

            // LocalStorage のクリーンアップ
            this.cleanupLocalStorage();
        }

        cleanupLocalStorage() {
            const now = Date.now();
            const maxAge = 7 * 24 * 60 * 60 * 1000; // 7日間

            Object.keys(localStorage).forEach(key => {
                try {
                    const item = JSON.parse(localStorage.getItem(key));
                    if (item && item.timestamp && (now - item.timestamp > maxAge)) {
                        localStorage.removeItem(key);
                    }
                } catch (e) {
                    // JSONパースエラーは無視
                }
            });
        }

        // パフォーマンスメトリクスの計測
        measurePerformance() {
            if ('performance' in window) {
                window.addEventListener('load', () => {
                    setTimeout(() => {
                        const perfData = performance.getEntriesByType('navigation')[0];
                        const metrics = {
                            dns: perfData.domainLookupEnd - perfData.domainLookupStart,
                            tcp: perfData.connectEnd - perfData.connectStart,
                            ttfb: perfData.responseStart - perfData.requestStart,
                            download: perfData.responseEnd - perfData.responseStart,
                            domInteractive: perfData.domInteractive - perfData.domLoading,
                            domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                            load: perfData.loadEventEnd - perfData.loadEventStart
                        };

                        // アナリティクスへの送信（例）
                        if (window.gtag) {
                            Object.entries(metrics).forEach(([metric, value]) => {
                                gtag('event', 'timing_complete', {
                                    name: metric,
                                    value: Math.round(value)
                                });
                            });
                        }
                    }, 0);
                });
            }
        }
    }

    // 初期化
    const perfManager = new PerformanceManager();
    perfManager.measurePerformance();

    // グローバルに公開
    window.performanceManager = perfManager;

})();