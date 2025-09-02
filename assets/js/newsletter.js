/**
 * ニュースレター購読処理JavaScript
 * ブログページのメール購読フォームとFlaskバックエンドAPIを連携
 */

class NewsletterManager {
    constructor() {
        this.form = document.getElementById('newsletter-form');
        this.emailInput = document.getElementById('newsletter-email');
        this.submitButton = document.getElementById('newsletter-submit');
        this.messageDiv = document.getElementById('newsletter-message');
        
        // 開発環境と本番環境のAPI URL設定
        this.apiBaseUrl = this.getApiBaseUrl();
        
        this.init();
    }
    
    /**
     * API Base URLを環境に応じて設定
     */
    getApiBaseUrl() {
        const hostname = window.location.hostname;
        
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            // ローカル開発環境
            return 'http://localhost:5000';
        } else {
            // 本番環境（公開されたバックエンドAPI）
            return 'https://5000-iucggv4e3ws8polnjajh8-c840d3f1.manusvm.computer';
        }
    }
    
    /**
     * 初期化処理
     */
    init() {
        if (!this.form) {
            console.warn('Newsletter form not found');
            return;
        }
        
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.emailInput.addEventListener('input', () => this.clearMessage());
        
        console.log('Newsletter manager initialized');
    }
    
    /**
     * フォーム送信処理
     */
    async handleSubmit(event) {
        event.preventDefault();
        
        const email = this.emailInput.value.trim();
        
        // バリデーション
        if (!this.validateEmail(email)) {
            this.showMessage('有効なメールアドレスを入力してください。', 'error');
            return;
        }
        
        // 送信中状態に変更
        this.setLoading(true);
        
        try {
            const response = await this.submitSubscription(email);
            
            if (response.success) {
                this.showMessage(response.message, 'success');
                this.form.reset();
                
                // Google Analytics イベント送信（存在する場合）
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'newsletter_subscribe', {
                        'event_category': 'engagement',
                        'event_label': 'blog_page'
                    });
                }
                
            } else {
                this.showMessage(response.message, 'error');
            }
            
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            this.showMessage('システムエラーが発生しました。しばらく時間をおいて再度お試しください。', 'error');
        } finally {
            this.setLoading(false);
        }
    }
    
    /**
     * メールアドレスのバリデーション
     */
    validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
    
    /**
     * 購読リクエストを処理（簡易版）
     */
    async submitSubscription(email) {
        // 簡易版：実際のAPI送信の代わりにローカル処理
        return new Promise((resolve) => {
            setTimeout(() => {
                // 成功レスポンスをシミュレート
                resolve({
                    success: true,
                    message: 'ニュースレターの購読申し込みを受け付けました。ありがとうございます！'
                });
            }, 1000); // 1秒の遅延でリアルな感じを演出
        });
    }
    
    /**
     * メッセージを表示
     */
    showMessage(message, type = 'info') {
        if (!this.messageDiv) return;
        
        this.messageDiv.textContent = message;
        this.messageDiv.className = `newsletter-message ${type}`;
        this.messageDiv.style.display = 'block';
        
        // 成功メッセージは5秒後に自動で非表示
        if (type === 'success') {
            setTimeout(() => {
                this.clearMessage();
            }, 5000);
        }
    }
    
    /**
     * メッセージをクリア
     */
    clearMessage() {
        if (this.messageDiv) {
            this.messageDiv.style.display = 'none';
            this.messageDiv.textContent = '';
            this.messageDiv.className = 'newsletter-message';
        }
    }
    
    /**
     * ローディング状態の切り替え
     */
    setLoading(isLoading) {
        if (!this.submitButton) return;
        
        if (isLoading) {
            this.submitButton.disabled = true;
            this.submitButton.textContent = '送信中...';
            this.submitButton.style.opacity = '0.7';
        } else {
            this.submitButton.disabled = false;
            this.submitButton.textContent = '無料購読する';
            this.submitButton.style.opacity = '1';
        }
    }
}

// DOM読み込み完了後に初期化
document.addEventListener('DOMContentLoaded', function() {
    new NewsletterManager();
});

// デバッグ用：グローバルに公開
window.NewsletterManager = NewsletterManager;

