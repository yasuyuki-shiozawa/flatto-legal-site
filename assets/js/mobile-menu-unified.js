// 統合モバイルメニューJavaScript - 完全リセット版
// 確実に動作するモバイルメニュー実装

document.addEventListener('DOMContentLoaded', function() {
    
    // モバイルメニューの要素を作成
    createMobileMenuElements();
    
    // イベントリスナーを設定
    setupEventListeners();
    
    // 初期状態を設定
    initializeMenuState();
    
});

// モバイルメニューの要素を作成
function createMobileMenuElements() {
    
    // モバイルメニューボタンを作成
    if (!document.querySelector('.mobile-menu-btn')) {
        const menuBtn = document.createElement('button');
        menuBtn.className = 'mobile-menu-btn';
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        menuBtn.setAttribute('aria-label', 'メニューを開く');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.appendChild(menuBtn);
    }
    
    // モバイルメニューオーバーレイを作成
    if (!document.querySelector('.mobile-menu-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        document.body.appendChild(overlay);
    }
    
    // モバイルメニュー本体を作成
    if (!document.querySelector('.mobile-menu')) {
        const menu = document.createElement('div');
        menu.className = 'mobile-menu';
        menu.innerHTML = createMenuContent();
        document.body.appendChild(menu);
    }
}

// メニューコンテンツを作成
function createMenuContent() {
    return `
        <button class="mobile-menu-close" aria-label="メニューを閉じる">
            <i class="fas fa-times"></i>
        </button>
        <ul class="mobile-menu-list">
            <li class="mobile-menu-item">
                <a href="/" class="mobile-menu-link">ホーム</a>
            </li>
            <li class="mobile-menu-item">
                <a href="/lp1.html" class="mobile-menu-link">全省庁統一資格</a>
            </li>
            <li class="mobile-menu-item">
                <a href="/zenshochou-lp.html" class="mobile-menu-link">全省庁統一資格LP</a>
            </li>
            <li class="mobile-menu-item">
                <a href="/blog/" class="mobile-menu-link">ブログ</a>
            </li>
            <li class="mobile-menu-item">
                <a href="/about/" class="mobile-menu-link">事務所について</a>
            </li>
            <li class="mobile-menu-item">
                <a href="/contact/" class="mobile-menu-link">お問い合わせ</a>
            </li>
            <li class="mobile-menu-item">
                <a href="/privacy-policy/" class="mobile-menu-link">プライバシーポリシー</a>
            </li>
        </ul>
    `;
}

// イベントリスナーを設定
function setupEventListeners() {
    
    // メニューボタンのクリックイベント
    const menuBtn = document.querySelector('.mobile-menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
        
        // タッチイベントも追加（モバイル対応）
        menuBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
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
        });
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
        });
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
        menuBtn.setAttribute('aria-expanded', 'false');
    }
    
    // ボディのスクロールを有効にする
    document.body.style.overflow = '';
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
        menuBtn.setAttribute('aria-expanded', 'true');
        menuBtn.innerHTML = '<i class="fas fa-times"></i>';
    }
    
    // ボディのスクロールを無効にする
    document.body.style.overflow = 'hidden';
    
    // フォーカスをメニューに移動
    if (menu) {
        menu.focus();
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
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
    
    // ボディのスクロールを有効にする
    document.body.style.overflow = '';
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
}

