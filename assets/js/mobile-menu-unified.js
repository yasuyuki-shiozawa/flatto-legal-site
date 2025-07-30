// 統合モバイルメニューJavaScript - 完全リセット版
// 確実に動作するモバイルメニュー実装

document.addEventListener('DOMContentLoaded', function() {
    
    // 既存のモバイルメニューボタンを確認・修正
    setupMobileMenuButton();
    
    // モバイルメニューの要素を確認・作成
    setupMobileMenuElements();
    
    // イベントリスナーを設定
    setupEventListeners();
    
    // 初期状態を設定
    initializeMenuState();
    
});

// モバイルメニューボタンの設定
function setupMobileMenuButton() {
    const existingBtn = document.querySelector('.mobile-menu-btn');
    
    if (existingBtn) {
        // 既存のボタンがある場合、ハンバーガーアイコンを追加
        if (!existingBtn.querySelector('span')) {
            existingBtn.innerHTML = `
                <span></span>
                <span></span>
                <span></span>
            `;
        }
        existingBtn.setAttribute('aria-label', 'メニューを開く');
        existingBtn.setAttribute('aria-expanded', 'false');
    } else {
        // ボタンが存在しない場合は作成
        const menuBtn = document.createElement('button');
        menuBtn.className = 'mobile-menu-btn';
        menuBtn.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        menuBtn.setAttribute('aria-label', 'メニューを開く');
        menuBtn.setAttribute('aria-expanded', 'false');
        
        // ヘッダーに追加
        const header = document.querySelector('.header-content');
        if (header) {
            header.appendChild(menuBtn);
        } else {
            document.body.appendChild(menuBtn);
        }
    }
}

// モバイルメニューの要素を設定
function setupMobileMenuElements() {
    
    // モバイルメニューオーバーレイを確認・作成
    if (!document.querySelector('.mobile-menu-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        overlay.id = 'mobileMenuOverlay';
        document.body.appendChild(overlay);
    }
    
    // 既存のモバイルメニューを確認
    let mobileMenu = document.querySelector('.mobile-menu');
    
    if (!mobileMenu) {
        // モバイルメニューが存在しない場合は作成
        mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.id = 'mobileMenu';
        mobileMenu.innerHTML = createMenuContent();
        document.body.appendChild(mobileMenu);
    } else {
        // 既存のメニューがある場合、閉じるボタンを追加
        if (!mobileMenu.querySelector('.mobile-menu-close')) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'mobile-menu-close';
            closeBtn.innerHTML = '<i class="fas fa-times"></i>';
            closeBtn.setAttribute('aria-label', 'メニューを閉じる');
            mobileMenu.insertBefore(closeBtn, mobileMenu.firstChild);
        }
    }
}

// メニューコンテンツを作成
function createMenuContent() {
    return `
        <button class="mobile-menu-close" aria-label="メニューを閉じる">
            <i class="fas fa-times"></i>
        </button>
        <div class="mobile-menu-header">
            <h2 class="mobile-menu-title">メニュー</h2>
        </div>
        <div class="mobile-menu-body">
            <ul class="mobile-menu-list">
                <li class="mobile-menu-item">
                    <a href="/" class="mobile-menu-link">
                        <i class="fas fa-home"></i>
                        ホーム
                    </a>
                </li>
                <li class="mobile-menu-item">
                    <a href="/lp1.html" class="mobile-menu-link">
                        <i class="fas fa-certificate"></i>
                        全省庁統一資格
                    </a>
                </li>
                <li class="mobile-menu-item">
                    <a href="/zenshochou-lp.html" class="mobile-menu-link">
                        <i class="fas fa-star"></i>
                        全省庁統一資格LP
                    </a>
                </li>
                <li class="mobile-menu-item">
                    <a href="/blog/" class="mobile-menu-link">
                        <i class="fas fa-blog"></i>
                        ブログ
                    </a>
                </li>
                <li class="mobile-menu-item">
                    <a href="/about/" class="mobile-menu-link">
                        <i class="fas fa-info-circle"></i>
                        事務所について
                    </a>
                </li>
                <li class="mobile-menu-item">
                    <a href="/contact/" class="mobile-menu-link">
                        <i class="fas fa-envelope"></i>
                        お問い合わせ
                    </a>
                </li>
                <li class="mobile-menu-item">
                    <a href="/privacy-policy/" class="mobile-menu-link">
                        <i class="fas fa-shield-alt"></i>
                        プライバシーポリシー
                    </a>
                </li>
            </ul>
        </div>
    `;
}

// イベントリスナーを設定
function setupEventListeners() {
    
    // メニューボタンのクリックイベント
    const menuBtn = document.querySelector('.mobile-menu-btn');
    if (menuBtn) {
        // 既存のイベントリスナーを削除
        menuBtn.replaceWith(menuBtn.cloneNode(true));
        const newMenuBtn = document.querySelector('.mobile-menu-btn');
        
        newMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
        
        // タッチイベントも追加（モバイル対応）
        newMenuBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        }, { passive: false });
    }
    
    // メニュー閉じるボタンのクリックイベント
    const closeBtn = document.querySelector('.mobile-menu-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeMenu();
        });
        
        closeBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeMenu();
        }, { passive: false });
    }
    
    // オーバーレイのクリックイベント
    const overlay = document.querySelector('.mobile-menu-overlay');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeMenu();
        });
        
        overlay.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeMenu();
        }, { passive: false });
    }
    
    // メニューリンクのクリックイベント
    const menuLinks = document.querySelectorAll('.mobile-menu-link');
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
    
    // ESCキーでメニューを閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
    
    // ウィンドウリサイズ時の処理
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}

// 初期状態を設定
function initializeMenuState() {
    const menu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (menu) {
        menu.classList.remove('active');
        menu.style.display = 'none';
        menu.style.visibility = 'hidden';
        menu.style.opacity = '0';
        menu.style.left = '-100%';
    }
    
    if (overlay) {
        overlay.classList.remove('active');
        overlay.style.display = 'none';
        overlay.style.visibility = 'hidden';
        overlay.style.opacity = '0';
    }
    
    if (menuBtn) {
        menuBtn.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
    }
    
    // ボディのスクロールを有効にする
    document.body.style.overflow = '';
    document.body.classList.remove('menu-open');
}

// メニューを開く
function openMenu() {
    const menu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (menu) {
        menu.style.display = 'block';
        menu.style.visibility = 'visible';
        menu.style.opacity = '1';
        
        // アニメーション用のタイムアウト
        setTimeout(function() {
            menu.classList.add('active');
            menu.style.left = '0';
        }, 10);
    }
    
    if (overlay) {
        overlay.style.display = 'block';
        overlay.style.visibility = 'visible';
        overlay.style.opacity = '1';
        overlay.classList.add('active');
    }
    
    if (menuBtn) {
        menuBtn.classList.add('active');
        menuBtn.setAttribute('aria-expanded', 'true');
    }
    
    // ボディのスクロールを無効にする
    document.body.style.overflow = 'hidden';
    document.body.classList.add('menu-open');
    
    // フォーカスをメニューに移動
    if (menu) {
        const firstLink = menu.querySelector('.mobile-menu-link');
        if (firstLink) {
            firstLink.focus();
        }
    }
}

// メニューを閉じる
function closeMenu() {
    const menu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (menu) {
        menu.classList.remove('active');
        menu.style.left = '-100%';
        
        // アニメーション完了後に非表示にする
        setTimeout(function() {
            menu.style.display = 'none';
            menu.style.visibility = 'hidden';
            menu.style.opacity = '0';
        }, 300);
    }
    
    if (overlay) {
        overlay.classList.remove('active');
        overlay.style.opacity = '0';
        
        setTimeout(function() {
            overlay.style.display = 'none';
            overlay.style.visibility = 'hidden';
        }, 300);
    }
    
    if (menuBtn) {
        menuBtn.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
    }
    
    // ボディのスクロールを有効にする
    document.body.style.overflow = '';
    document.body.classList.remove('menu-open');
}

// メニューの開閉を切り替え
function toggleMenu() {
    const menu = document.querySelector('.mobile-menu');
    
    if (menu && menu.classList.contains('active')) {
        closeMenu();
    } else {
        openMenu();
    }
}

// エラーハンドリング
window.addEventListener('error', function(e) {
    console.error('モバイルメニューエラー:', e.error);
    
    // エラー時は強制的にメニューを閉じる
    closeMenu();
});

// タッチイベントの最適化
document.addEventListener('touchstart', function() {
    // タッチイベントの初期化（iOS Safari対応）
}, { passive: true });

// デバッグ用（本番では削除）
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('モバイルメニュー統合版が読み込まれました');
    
    // デバッグ情報
    setTimeout(function() {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const menu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.mobile-menu-overlay');
        
        console.log('メニューボタン:', menuBtn ? '存在' : '不存在');
        console.log('メニュー:', menu ? '存在' : '不存在');
        console.log('オーバーレイ:', overlay ? '存在' : '不存在');
    }, 1000);
}

