// ホームページ用アニメーション
document.addEventListener('DOMContentLoaded', function() {
    // 数値カウントアップアニメーション
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // アニメーション速度
    
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-count');
        const inc = target / speed;
        
        const updateCount = () => {
            const count = +counter.innerText;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
                // 小数点がある場合の処理
                if (target % 1 !== 0) {
                    counter.innerText = target.toFixed(1);
                }
                // サフィックスを追加
                if (target === 95) {
                    counter.innerText += '%';
                } else if (target === 24) {
                    counter.innerText += '時間';
                } else if (target === 500) {
                    counter.innerText += '+';
                }
            }
        };
        
        updateCount();
    };
    
    // Intersection Observerで可視になったらアニメーション開始
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
    
    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});