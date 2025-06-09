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

