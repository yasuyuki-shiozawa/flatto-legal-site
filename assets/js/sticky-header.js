// スティッキーヘッダーの実装
(function() {
  'use strict';
  
  const header = document.querySelector('.header');
  if (!header) return;
  
  let lastScrollTop = 0;
  let ticking = false;
  
  function updateHeader() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // スクロール量に応じてクラスを追加/削除
    if (scrollTop > 100) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    
    // スクロール方向に応じて表示/非表示
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // 下にスクロール
      header.classList.add('header--hidden');
    } else {
      // 上にスクロール
      header.classList.remove('header--hidden');
    }
    
    lastScrollTop = scrollTop;
    ticking = false;
  }
  
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }
  
  // スクロールイベントのリスナー
  window.addEventListener('scroll', onScroll, { passive: true });
})();