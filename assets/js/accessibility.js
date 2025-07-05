// アクセシビリティ強化機能
// キーボードナビゲーション、スクリーンリーダー対応、高コントラストモード、フォントサイズ調整

(function() {
    'use strict';

    // アクセシビリティ設定
    const A11Y_CONFIG = {
        storageKey: 'nyusatsu-a11y-settings',
        focusClass: 'focus-visible',
        skipLinkClass: 'skip-link',
        fontSizes: {
            small: 14,
            medium: 16,
            large: 18,
            xlarge: 20
        },
        keyboardShortcuts: {
            search: 'alt+s',
            menu: 'alt+m',
            home: 'alt+h',
            help: 'alt+?'
        }
    };

    // アクセシビリティマネージャークラス
    class AccessibilityManager {
        constructor() {
            this.settings = this.loadSettings();
            this.init();
        }

        init() {
            this.setupSkipLinks();
            this.setupKeyboardNavigation();
            this.setupFocusManagement();
            this.setupARIALiveRegions();
            this.setupAccessibilityPanel();
            this.applySettings();
            this.setupKeyboardShortcuts();
        }

        loadSettings() {
            const saved = localStorage.getItem(A11Y_CONFIG.storageKey);
            return saved ? JSON.parse(saved) : {
                fontSize: 'medium',
                highContrast: false,
                reduceMotion: false,
                keyboardFocus: true,
                screenReaderMode: false
            };
        }

        saveSettings() {
            localStorage.setItem(A11Y_CONFIG.storageKey, JSON.stringify(this.settings));
            this.applySettings();
        }

        // スキップリンクの設定
        setupSkipLinks() {
            const skipLinks = `
                <div class="skip-links" role="navigation" aria-label="スキップリンク">
                    <a href="#main-content" class="skip-link">メインコンテンツへスキップ</a>
                    <a href="#main-nav" class="skip-link">メインナビゲーションへスキップ</a>
                    <a href="#search" class="skip-link">検索へスキップ</a>
                    <a href="#footer" class="skip-link">フッターへスキップ</a>
                </div>
            `;
            document.body.insertAdjacentHTML('afterbegin', skipLinks);
        }

        // キーボードナビゲーションの強化
        setupKeyboardNavigation() {
            // Tabキーでのフォーカス移動を視覚的に強調
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    document.body.classList.add('keyboard-navigation');
                }
            });

            document.addEventListener('mousedown', () => {
                document.body.classList.remove('keyboard-navigation');
            });

            // Escapeキーでモーダルやドロップダウンを閉じる
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeActiveElements();
                }
            });

            // 矢印キーでのナビゲーション
            this.setupArrowKeyNavigation();
        }

        setupArrowKeyNavigation() {
            // メニュー内での矢印キーナビゲーション
            const menus = document.querySelectorAll('[role="menu"], [role="menubar"]');
            menus.forEach(menu => {
                const items = menu.querySelectorAll('[role="menuitem"]');
                
                menu.addEventListener('keydown', (e) => {
                    const currentIndex = Array.from(items).indexOf(document.activeElement);
                    let nextIndex;

                    switch(e.key) {
                        case 'ArrowDown':
                        case 'ArrowRight':
                            e.preventDefault();
                            nextIndex = (currentIndex + 1) % items.length;
                            items[nextIndex].focus();
                            break;
                        case 'ArrowUp':
                        case 'ArrowLeft':
                            e.preventDefault();
                            nextIndex = currentIndex - 1;
                            if (nextIndex < 0) nextIndex = items.length - 1;
                            items[nextIndex].focus();
                            break;
                        case 'Home':
                            e.preventDefault();
                            items[0].focus();
                            break;
                        case 'End':
                            e.preventDefault();
                            items[items.length - 1].focus();
                            break;
                    }
                });
            });
        }

        // フォーカス管理
        setupFocusManagement() {
            // フォーカストラップ
            this.focusTrap = {
                element: null,
                previousFocus: null,
                
                activate(element) {
                    this.element = element;
                    this.previousFocus = document.activeElement;
                    
                    const focusableElements = element.querySelectorAll(
                        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
                    );
                    
                    const firstFocusable = focusableElements[0];
                    const lastFocusable = focusableElements[focusableElements.length - 1];
                    
                    firstFocusable.focus();
                    
                    element.addEventListener('keydown', (e) => {
                        if (e.key === 'Tab') {
                            if (e.shiftKey) {
                                if (document.activeElement === firstFocusable) {
                                    e.preventDefault();
                                    lastFocusable.focus();
                                }
                            } else {
                                if (document.activeElement === lastFocusable) {
                                    e.preventDefault();
                                    firstFocusable.focus();
                                }
                            }
                        }
                    });
                },
                
                deactivate() {
                    if (this.previousFocus) {
                        this.previousFocus.focus();
                    }
                    this.element = null;
                    this.previousFocus = null;
                }
            };

            // フォーカス可視化の改善
            if (this.settings.keyboardFocus) {
                document.body.classList.add('focus-visible-enabled');
            }
        }

        // ARIAライブリージョンの設定
        setupARIALiveRegions() {
            // 通知用のライブリージョン
            const liveRegion = document.createElement('div');
            liveRegion.setAttribute('role', 'status');
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.className = 'sr-only';
            liveRegion.id = 'live-region';
            document.body.appendChild(liveRegion);

            // アラート用のライブリージョン
            const alertRegion = document.createElement('div');
            alertRegion.setAttribute('role', 'alert');
            alertRegion.setAttribute('aria-live', 'assertive');
            alertRegion.setAttribute('aria-atomic', 'true');
            alertRegion.className = 'sr-only';
            alertRegion.id = 'alert-region';
            document.body.appendChild(alertRegion);
        }

        // アクセシビリティ設定パネル
        setupAccessibilityPanel() {
            const panel = document.createElement('div');
            panel.className = 'a11y-panel';
            panel.innerHTML = `
                <button class="a11y-toggle" aria-label="アクセシビリティ設定を開く" aria-expanded="false">
                    <i class="fas fa-universal-access"></i>
                </button>
                <div class="a11y-panel-content" hidden>
                    <h2>アクセシビリティ設定</h2>
                    
                    <div class="a11y-option">
                        <label for="font-size">文字サイズ</label>
                        <select id="font-size" aria-label="文字サイズを選択">
                            <option value="small">小</option>
                            <option value="medium">標準</option>
                            <option value="large">大</option>
                            <option value="xlarge">特大</option>
                        </select>
                    </div>
                    
                    <div class="a11y-option">
                        <label for="high-contrast">
                            <input type="checkbox" id="high-contrast" ${this.settings.highContrast ? 'checked' : ''}>
                            高コントラストモード
                        </label>
                    </div>
                    
                    <div class="a11y-option">
                        <label for="reduce-motion">
                            <input type="checkbox" id="reduce-motion" ${this.settings.reduceMotion ? 'checked' : ''}>
                            アニメーションを減らす
                        </label>
                    </div>
                    
                    <div class="a11y-option">
                        <label for="keyboard-focus">
                            <input type="checkbox" id="keyboard-focus" ${this.settings.keyboardFocus ? 'checked' : ''}>
                            キーボードフォーカスを強調
                        </label>
                    </div>
                    
                    <div class="a11y-option">
                        <label for="screen-reader-mode">
                            <input type="checkbox" id="screen-reader-mode" ${this.settings.screenReaderMode ? 'checked' : ''}>
                            スクリーンリーダーモード
                        </label>
                    </div>
                    
                    <div class="a11y-shortcuts">
                        <h3>キーボードショートカット</h3>
                        <ul>
                            <li><kbd>Alt</kbd> + <kbd>S</kbd>: 検索</li>
                            <li><kbd>Alt</kbd> + <kbd>M</kbd>: メニュー</li>
                            <li><kbd>Alt</kbd> + <kbd>H</kbd>: ホーム</li>
                            <li><kbd>Alt</kbd> + <kbd>?</kbd>: ヘルプ</li>
                        </ul>
                    </div>
                    
                    <button class="btn btn-primary" id="save-a11y-settings">設定を保存</button>
                </div>
            `;
            
            document.body.appendChild(panel);
            
            // イベントリスナー
            const toggle = panel.querySelector('.a11y-toggle');
            const content = panel.querySelector('.a11y-panel-content');
            
            toggle.addEventListener('click', () => {
                const isOpen = toggle.getAttribute('aria-expanded') === 'true';
                toggle.setAttribute('aria-expanded', !isOpen);
                content.hidden = isOpen;
                
                if (!isOpen) {
                    this.focusTrap.activate(content);
                } else {
                    this.focusTrap.deactivate();
                }
            });
            
            // 設定変更
            panel.querySelector('#font-size').value = this.settings.fontSize;
            panel.querySelector('#font-size').addEventListener('change', (e) => {
                this.settings.fontSize = e.target.value;
            });
            
            panel.querySelector('#high-contrast').addEventListener('change', (e) => {
                this.settings.highContrast = e.target.checked;
            });
            
            panel.querySelector('#reduce-motion').addEventListener('change', (e) => {
                this.settings.reduceMotion = e.target.checked;
            });
            
            panel.querySelector('#keyboard-focus').addEventListener('change', (e) => {
                this.settings.keyboardFocus = e.target.checked;
            });
            
            panel.querySelector('#screen-reader-mode').addEventListener('change', (e) => {
                this.settings.screenReaderMode = e.target.checked;
            });
            
            panel.querySelector('#save-a11y-settings').addEventListener('click', () => {
                this.saveSettings();
                this.announceToScreenReader('アクセシビリティ設定を保存しました');
                toggle.click(); // パネルを閉じる
            });
        }

        // 設定の適用
        applySettings() {
            // 文字サイズ
            document.documentElement.style.fontSize = A11Y_CONFIG.fontSizes[this.settings.fontSize] + 'px';
            
            // 高コントラストモード
            document.body.classList.toggle('high-contrast', this.settings.highContrast);
            
            // アニメーション削減
            document.body.classList.toggle('reduce-motion', this.settings.reduceMotion);
            
            // キーボードフォーカス
            document.body.classList.toggle('focus-visible-enabled', this.settings.keyboardFocus);
            
            // スクリーンリーダーモード
            document.body.classList.toggle('screen-reader-mode', this.settings.screenReaderMode);
        }

        // キーボードショートカット
        setupKeyboardShortcuts() {
            document.addEventListener('keydown', (e) => {
                if (e.altKey) {
                    switch(e.key.toLowerCase()) {
                        case 's':
                            e.preventDefault();
                            this.focusSearch();
                            break;
                        case 'm':
                            e.preventDefault();
                            this.focusMenu();
                            break;
                        case 'h':
                            e.preventDefault();
                            window.location.href = '/';
                            break;
                        case '?':
                            e.preventDefault();
                            this.showHelp();
                            break;
                    }
                }
            });
        }

        focusSearch() {
            const searchInput = document.querySelector('#site-search, #search-input, input[type="search"]');
            if (searchInput) {
                searchInput.focus();
                this.announceToScreenReader('検索フィールドに移動しました');
            }
        }

        focusMenu() {
            const mainNav = document.querySelector('#main-nav, .main-navigation, nav[role="navigation"]');
            if (mainNav) {
                const firstLink = mainNav.querySelector('a');
                if (firstLink) {
                    firstLink.focus();
                    this.announceToScreenReader('メインナビゲーションに移動しました');
                }
            }
        }

        showHelp() {
            // ヘルプモーダルを表示
            const helpModal = document.createElement('div');
            helpModal.className = 'help-modal';
            helpModal.setAttribute('role', 'dialog');
            helpModal.setAttribute('aria-label', 'ヘルプ');
            helpModal.innerHTML = `
                <div class="help-modal-content">
                    <button class="close-help" aria-label="ヘルプを閉じる">&times;</button>
                    <h2>サイトの使い方</h2>
                    <p>このサイトは、キーボードのみで操作できるよう設計されています。</p>
                    <h3>主な操作方法</h3>
                    <ul>
                        <li><kbd>Tab</kbd>: 次の要素へ移動</li>
                        <li><kbd>Shift</kbd> + <kbd>Tab</kbd>: 前の要素へ移動</li>
                        <li><kbd>Enter</kbd>: リンクやボタンを実行</li>
                        <li><kbd>Space</kbd>: チェックボックスの切り替え</li>
                        <li><kbd>Esc</kbd>: モーダルやメニューを閉じる</li>
                    </ul>
                </div>
            `;
            
            document.body.appendChild(helpModal);
            this.focusTrap.activate(helpModal);
            
            helpModal.querySelector('.close-help').addEventListener('click', () => {
                helpModal.remove();
                this.focusTrap.deactivate();
            });
        }

        closeActiveElements() {
            // 開いているドロップダウン、モーダル、メニューを閉じる
            const openElements = document.querySelectorAll('[aria-expanded="true"]');
            openElements.forEach(element => {
                element.setAttribute('aria-expanded', 'false');
            });
            
            // モーダルを閉じる
            const modals = document.querySelectorAll('.modal.show, .help-modal');
            modals.forEach(modal => modal.remove());
        }

        // スクリーンリーダーへのアナウンス
        announceToScreenReader(message, isAlert = false) {
            const regionId = isAlert ? 'alert-region' : 'live-region';
            const region = document.getElementById(regionId);
            if (region) {
                region.textContent = message;
                // メッセージをクリアする
                setTimeout(() => {
                    region.textContent = '';
                }, 1000);
            }
        }
    }

    // ページ読み込み完了後に初期化
    document.addEventListener('DOMContentLoaded', () => {
        window.a11yManager = new AccessibilityManager();
    });

})();