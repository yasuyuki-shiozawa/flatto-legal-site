// 目次の自動生成機能
(function() {
    'use strict';
    
    // 設定
    const TOC_CONFIG = {
        containerSelector: '.article-content',
        tocSelector: '#auto-toc',
        headingSelectors: 'h2, h3, h4',
        minHeadings: 3,
        scrollOffset: 100,
        activeClass: 'toc-active',
        smoothScroll: true,
        scrollDuration: 300,
        stickyOffset: 20
    };
    
    // 目次の生成
    function generateTOC() {
        const container = document.querySelector(TOC_CONFIG.containerSelector);
        const tocContainer = document.querySelector(TOC_CONFIG.tocSelector);
        
        if (!container || !tocContainer) return;
        
        const headings = container.querySelectorAll(TOC_CONFIG.headingSelectors);
        
        // 最小見出し数チェック
        if (headings.length < TOC_CONFIG.minHeadings) {
            tocContainer.style.display = 'none';
            return;
        }
        
        // 見出しにIDを付与
        headings.forEach((heading, index) => {
            if (!heading.id) {
                const text = heading.textContent.trim();
                const id = generateId(text, index);
                heading.id = id;
            }
        });
        
        // 目次の構造を構築
        const tocStructure = buildTOCStructure(headings);
        
        // HTMLを生成
        const tocHTML = generateTOCHTML(tocStructure);
        
        // 目次を挿入
        tocContainer.innerHTML = `
            <div class="toc-wrapper">
                <div class="toc-header">
                    <h3 class="toc-title">
                        <i class="fas fa-list-ul"></i>
                        目次
                    </h3>
                    <button class="toc-toggle" aria-label="目次を折りたたむ">
                        <i class="fas fa-chevron-up"></i>
                    </button>
                </div>
                <nav class="toc-content" aria-label="目次">
                    ${tocHTML}
                </nav>
                <div class="toc-progress">
                    <div class="toc-progress-bar"></div>
                </div>
            </div>
        `;
        
        // イベントリスナーの設定
        setupEventListeners();
        
        // スティッキー位置の設定
        setupStickyPosition();
        
        // 初期状態の設定
        updateActiveItem();
        updateReadingProgress();
    }
    
    // IDの生成
    function generateId(text, index) {
        const baseId = text
            .toLowerCase()
            .replace(/[^\w\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf\s-]/g, '')
            .replace(/\s+/g, '-')
            .trim();
        
        return baseId || `heading-${index}`;
    }
    
    // 目次構造の構築
    function buildTOCStructure(headings) {
        const structure = [];
        const stack = [];
        
        headings.forEach(heading => {
            const level = parseInt(heading.tagName.charAt(1));
            const item = {
                id: heading.id,
                text: heading.textContent.trim(),
                level: level,
                children: []
            };
            
            // スタックを調整
            while (stack.length > 0 && stack[stack.length - 1].level >= level) {
                stack.pop();
            }
            
            // 親要素に追加
            if (stack.length === 0) {
                structure.push(item);
            } else {
                stack[stack.length - 1].children.push(item);
            }
            
            stack.push(item);
        });
        
        return structure;
    }
    
    // 目次HTMLの生成
    function generateTOCHTML(structure) {
        function generateList(items, isRoot = true) {
            const listClass = isRoot ? 'toc-list toc-root' : 'toc-list toc-nested';
            let html = `<ul class="${listClass}">`;
            
            items.forEach(item => {
                const hasChildren = item.children.length > 0;
                const itemClass = `toc-item toc-level-${item.level}`;
                
                html += `
                    <li class="${itemClass}">
                        <a href="#${item.id}" class="toc-link" data-target="${item.id}">
                            <span class="toc-number"></span>
                            <span class="toc-text">${escapeHtml(item.text)}</span>
                        </a>
                        ${hasChildren ? generateList(item.children, false) : ''}
                    </li>
                `;
            });
            
            html += '</ul>';
            return html;
        }
        
        return generateList(structure);
    }
    
    // イベントリスナーの設定
    function setupEventListeners() {
        const tocContainer = document.querySelector(TOC_CONFIG.tocSelector);
        
        // 目次リンクのクリック
        tocContainer.addEventListener('click', (e) => {
            const link = e.target.closest('.toc-link');
            if (!link) return;
            
            e.preventDefault();
            const targetId = link.dataset.target;
            scrollToHeading(targetId);
        });
        
        // 折りたたみボタン
        const toggleBtn = tocContainer.querySelector('.toc-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', toggleTOC);
        }
        
        // スクロールイベント
        let scrollTimer;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                updateActiveItem();
                updateReadingProgress();
            }, 10);
        });
        
        // リサイズイベント
        window.addEventListener('resize', debounce(setupStickyPosition, 250));
    }
    
    // スティッキー位置の設定
    function setupStickyPosition() {
        const tocContainer = document.querySelector(TOC_CONFIG.tocSelector);
        const tocWrapper = tocContainer.querySelector('.toc-wrapper');
        
        if (!tocWrapper) return;
        
        // ビューポートの高さチェック
        if (window.innerHeight < 600) {
            tocWrapper.style.position = 'relative';
            return;
        }
        
        // スティッキー設定
        tocWrapper.style.position = 'sticky';
        tocWrapper.style.top = `${TOC_CONFIG.stickyOffset}px`;
        
        // 最大高さの設定
        const maxHeight = window.innerHeight - TOC_CONFIG.stickyOffset - 40;
        tocWrapper.style.maxHeight = `${maxHeight}px`;
    }
    
    // 見出しへのスクロール
    function scrollToHeading(headingId) {
        const heading = document.getElementById(headingId);
        if (!heading) return;
        
        const top = heading.getBoundingClientRect().top + window.scrollY - TOC_CONFIG.scrollOffset;
        
        if (TOC_CONFIG.smoothScroll) {
            smoothScrollTo(top, TOC_CONFIG.scrollDuration);
        } else {
            window.scrollTo(0, top);
        }
        
        // URLハッシュを更新
        history.pushState(null, null, `#${headingId}`);
    }
    
    // スムーズスクロール
    function smoothScrollTo(targetY, duration) {
        const startY = window.scrollY;
        const distance = targetY - startY;
        const startTime = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = easeInOutCubic(progress);
            
            window.scrollTo(0, startY + distance * easeProgress);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // イージング関数
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    // アクティブな項目の更新
    function updateActiveItem() {
        const headings = document.querySelectorAll(`${TOC_CONFIG.containerSelector} ${TOC_CONFIG.headingSelectors}`);
        const tocLinks = document.querySelectorAll('.toc-link');
        
        // 現在のスクロール位置を取得
        const scrollY = window.scrollY + TOC_CONFIG.scrollOffset + 10;
        
        // 表示されている見出しを特定
        let activeHeading = null;
        
        for (let i = headings.length - 1; i >= 0; i--) {
            const heading = headings[i];
            const top = heading.getBoundingClientRect().top + window.scrollY;
            
            if (scrollY >= top) {
                activeHeading = heading;
                break;
            }
        }
        
        // アクティブクラスを更新
        tocLinks.forEach(link => {
            const isActive = activeHeading && link.dataset.target === activeHeading.id;
            link.classList.toggle(TOC_CONFIG.activeClass, isActive);
            
            // 親要素もアクティブにする
            if (isActive) {
                let parent = link.closest('.toc-nested');
                while (parent) {
                    const parentItem = parent.closest('.toc-item');
                    if (parentItem) {
                        const parentLink = parentItem.querySelector('.toc-link');
                        if (parentLink) {
                            parentLink.classList.add('toc-parent-active');
                        }
                    }
                    parent = parentItem ? parentItem.closest('.toc-nested') : null;
                }
            } else {
                link.classList.remove('toc-parent-active');
            }
        });
    }
    
    // 読み進み状況の更新
    function updateReadingProgress() {
        const article = document.querySelector(TOC_CONFIG.containerSelector);
        const progressBar = document.querySelector('.toc-progress-bar');
        
        if (!article || !progressBar) return;
        
        const articleRect = article.getBoundingClientRect();
        const articleHeight = articleRect.height;
        const viewportHeight = window.innerHeight;
        const scrolled = window.scrollY - articleRect.top - window.scrollY;
        
        const progress = Math.max(0, Math.min(1, (scrolled + viewportHeight) / articleHeight));
        progressBar.style.width = `${progress * 100}%`;
    }
    
    // 目次の折りたたみ
    function toggleTOC() {
        const tocWrapper = document.querySelector('.toc-wrapper');
        const toggleBtn = document.querySelector('.toc-toggle');
        const toggleIcon = toggleBtn.querySelector('i');
        
        tocWrapper.classList.toggle('toc-collapsed');
        
        if (tocWrapper.classList.contains('toc-collapsed')) {
            toggleIcon.className = 'fas fa-chevron-down';
            toggleBtn.setAttribute('aria-label', '目次を展開する');
        } else {
            toggleIcon.className = 'fas fa-chevron-up';
            toggleBtn.setAttribute('aria-label', '目次を折りたたむ');
        }
    }
    
    // ユーティリティ関数
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // 番号付けの追加
    function addNumbering() {
        const tocItems = document.querySelectorAll('.toc-root > .toc-item');
        let counters = [0, 0, 0];
        
        function numberItems(items, level = 0) {
            items.forEach((item, index) => {
                counters[level] = index + 1;
                
                // 番号を生成
                const number = counters.slice(0, level + 1).join('.');
                const numberSpan = item.querySelector('.toc-number');
                if (numberSpan) {
                    numberSpan.textContent = number + '.';
                }
                
                // 子要素を処理
                const nestedList = item.querySelector('.toc-nested');
                if (nestedList) {
                    const nestedItems = nestedList.querySelectorAll(':scope > .toc-item');
                    numberItems(nestedItems, level + 1);
                }
            });
            
            // カウンターをリセット
            if (level < counters.length - 1) {
                counters[level + 1] = 0;
            }
        }
        
        numberItems(tocItems);
    }
    
    // 初期化
    document.addEventListener('DOMContentLoaded', () => {
        generateTOC();
        
        // 番号付けを追加
        setTimeout(addNumbering, 100);
        
        // URLハッシュがある場合はスクロール
        if (window.location.hash) {
            const targetId = window.location.hash.substring(1);
            setTimeout(() => scrollToHeading(targetId), 500);
        }
    });
    
    // エクスポート（必要に応じて）
    window.AutoTOC = {
        generate: generateTOC,
        refresh: () => {
            generateTOC();
            addNumbering();
        }
    };
})();