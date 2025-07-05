// モバイルメニューの実装
(function() {
  'use strict';
  
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('mobileMenuOverlay');
  const body = document.body;
  
  if (!menuBtn || !mobileMenu) return;
  
  let isOpen = false;
  
  // メニューの開閉
  function toggleMenu() {
    isOpen = !isOpen;
    
    if (isOpen) {
      openMenu();
    } else {
      closeMenu();
    }
  }
  
  // メニューを開く
  function openMenu() {
    menuBtn.classList.add('active');
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.setAttribute('aria-label', 'メニューを閉じる');
    
    mobileMenu.classList.add('active');
    if (overlay) {
      overlay.classList.add('active');
    }
    
    body.classList.add('mobile-menu-open');
    
    // フォーカストラップの設定
    setFocusTrap();
    
    // ESCキーでメニューを閉じる
    document.addEventListener('keydown', handleEscKey);
  }
  
  // メニューを閉じる
  function closeMenu() {
    menuBtn.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'メニューを開く');
    
    mobileMenu.classList.remove('active');
    if (overlay) {
      overlay.classList.remove('active');
    }
    
    body.classList.remove('mobile-menu-open');
    
    // フォーカストラップの解除
    removeFocusTrap();
    
    // ESCキーのリスナーを削除
    document.removeEventListener('keydown', handleEscKey);
  }
  
  // ESCキーのハンドラー
  function handleEscKey(e) {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
    }
  }
  
  // フォーカストラップ
  function setFocusTrap() {
    const focusableElements = mobileMenu.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    // 最初の要素にフォーカス
    firstFocusableElement.focus();
    
    mobileMenu.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else {
          // Tab
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }
      }
    });
  }
  
  function removeFocusTrap() {
    // フォーカストラップのイベントリスナーを削除
    const newMenu = mobileMenu.cloneNode(true);
    mobileMenu.parentNode.replaceChild(newMenu, mobileMenu);
  }
  
  // スワイプジェスチャー対応
  let touchStartX = 0;
  let touchEndX = 0;
  
  mobileMenu.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  mobileMenu.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      // 左にスワイプ
      closeMenu();
    }
  }
  
  // イベントリスナー
  menuBtn.addEventListener('click', toggleMenu);
  
  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }
  
  // メニュー内のリンクをクリックしたら閉じる
  const menuLinks = mobileMenu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  // ウィンドウリサイズ時の処理
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (window.innerWidth >= 1024 && isOpen) {
        closeMenu();
      }
    }, 250);
  });
})();