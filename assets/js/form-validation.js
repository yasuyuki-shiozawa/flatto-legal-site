// フォームバリデーション機能
// リアルタイムバリデーション、入力補助、エラーメッセージの改善

(function() {
    'use strict';

    // バリデーション設定
    const VALIDATION_CONFIG = {
        debounceDelay: 300,
        errorClass: 'field-error',
        successClass: 'field-success',
        errorMessageClass: 'error-message',
        successMessageClass: 'success-message',
        requiredText: '必須',
        patterns: {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            tel: /^[0-9-+\s()]+$/,
            url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
            postal: /^\d{3}-?\d{4}$/
        },
        messages: {
            required: 'このフィールドは必須です',
            email: '有効なメールアドレスを入力してください',
            tel: '有効な電話番号を入力してください',
            url: '有効なURLを入力してください',
            postal: '郵便番号は「123-4567」の形式で入力してください',
            minlength: '最低{min}文字以上入力してください',
            maxlength: '最大{max}文字以内で入力してください',
            pattern: '正しい形式で入力してください',
            match: 'パスワードが一致しません'
        }
    };

    // デバウンス関数
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

    // フォームバリデーションクラス
    class FormValidator {
        constructor(form) {
            this.form = form;
            this.fields = {};
            this.init();
        }

        init() {
            // フィールドの初期化
            const inputs = this.form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                this.initField(input);
            });

            // フォーム送信時のバリデーション
            this.form.addEventListener('submit', (e) => {
                if (!this.validateAll()) {
                    e.preventDefault();
                    this.showFormError();
                }
            });

            // 成功メッセージのアニメーション
            this.form.addEventListener('submit', (e) => {
                if (this.form.hasAttribute('data-ajax-submit')) {
                    e.preventDefault();
                    if (this.validateAll()) {
                        this.submitForm();
                    }
                }
            });
        }

        initField(field) {
            const fieldName = field.name;
            if (!fieldName) return;

            this.fields[fieldName] = {
                element: field,
                validators: this.getValidators(field),
                errorElement: this.createErrorElement(field)
            };

            // リアルタイムバリデーション
            const validateField = debounce(() => {
                this.validateField(fieldName);
            }, VALIDATION_CONFIG.debounceDelay);

            field.addEventListener('input', validateField);
            field.addEventListener('blur', () => {
                this.validateField(fieldName);
            });

            // 入力補助機能
            this.addInputHelpers(field);
        }

        getValidators(field) {
            const validators = [];

            // 必須チェック
            if (field.hasAttribute('required')) {
                validators.push({
                    type: 'required',
                    validate: (value) => value.trim() !== '',
                    message: VALIDATION_CONFIG.messages.required
                });
            }

            // メールアドレス
            if (field.type === 'email') {
                validators.push({
                    type: 'email',
                    validate: (value) => !value || VALIDATION_CONFIG.patterns.email.test(value),
                    message: VALIDATION_CONFIG.messages.email
                });
            }

            // 電話番号
            if (field.type === 'tel') {
                validators.push({
                    type: 'tel',
                    validate: (value) => !value || VALIDATION_CONFIG.patterns.tel.test(value),
                    message: VALIDATION_CONFIG.messages.tel
                });
            }

            // URL
            if (field.type === 'url') {
                validators.push({
                    type: 'url',
                    validate: (value) => !value || VALIDATION_CONFIG.patterns.url.test(value),
                    message: VALIDATION_CONFIG.messages.url
                });
            }

            // 最小文字数
            if (field.hasAttribute('minlength')) {
                const min = parseInt(field.getAttribute('minlength'));
                validators.push({
                    type: 'minlength',
                    validate: (value) => !value || value.length >= min,
                    message: VALIDATION_CONFIG.messages.minlength.replace('{min}', min)
                });
            }

            // 最大文字数
            if (field.hasAttribute('maxlength')) {
                const max = parseInt(field.getAttribute('maxlength'));
                validators.push({
                    type: 'maxlength',
                    validate: (value) => !value || value.length <= max,
                    message: VALIDATION_CONFIG.messages.maxlength.replace('{max}', max)
                });
            }

            // パターン
            if (field.hasAttribute('pattern')) {
                const pattern = new RegExp(field.getAttribute('pattern'));
                validators.push({
                    type: 'pattern',
                    validate: (value) => !value || pattern.test(value),
                    message: field.getAttribute('data-pattern-message') || VALIDATION_CONFIG.messages.pattern
                });
            }

            // パスワード一致確認
            if (field.hasAttribute('data-match')) {
                const matchFieldName = field.getAttribute('data-match');
                validators.push({
                    type: 'match',
                    validate: (value) => {
                        const matchField = this.form.querySelector(`[name="${matchFieldName}"]`);
                        return !matchField || value === matchField.value;
                    },
                    message: VALIDATION_CONFIG.messages.match
                });
            }

            // 郵便番号
            if (field.hasAttribute('data-postal')) {
                validators.push({
                    type: 'postal',
                    validate: (value) => !value || VALIDATION_CONFIG.patterns.postal.test(value),
                    message: VALIDATION_CONFIG.messages.postal
                });
            }

            return validators;
        }

        createErrorElement(field) {
            let errorElement = field.parentElement.querySelector(`.${VALIDATION_CONFIG.errorMessageClass}`);
            if (!errorElement) {
                errorElement = document.createElement('span');
                errorElement.className = VALIDATION_CONFIG.errorMessageClass;
                errorElement.setAttribute('role', 'alert');
                errorElement.setAttribute('aria-live', 'polite');
                field.parentElement.appendChild(errorElement);
            }
            return errorElement;
        }

        validateField(fieldName) {
            const fieldData = this.fields[fieldName];
            if (!fieldData) return true;

            const field = fieldData.element;
            const value = field.value;
            const errors = [];

            // 各バリデーターを実行
            fieldData.validators.forEach(validator => {
                if (!validator.validate(value)) {
                    errors.push(validator.message);
                }
            });

            // エラー表示を更新
            if (errors.length > 0) {
                this.showFieldError(field, errors[0]);
                return false;
            } else {
                this.showFieldSuccess(field);
                return true;
            }
        }

        validateAll() {
            let isValid = true;
            Object.keys(this.fields).forEach(fieldName => {
                if (!this.validateField(fieldName)) {
                    isValid = false;
                }
            });
            return isValid;
        }

        showFieldError(field, message) {
            const fieldData = this.fields[field.name];
            if (!fieldData) return;

            field.classList.add(VALIDATION_CONFIG.errorClass);
            field.classList.remove(VALIDATION_CONFIG.successClass);
            field.setAttribute('aria-invalid', 'true');
            
            fieldData.errorElement.textContent = message;
            fieldData.errorElement.style.display = 'block';

            // エラーアニメーション
            field.classList.add('shake');
            setTimeout(() => field.classList.remove('shake'), 500);
        }

        showFieldSuccess(field) {
            const fieldData = this.fields[field.name];
            if (!fieldData) return;

            field.classList.remove(VALIDATION_CONFIG.errorClass);
            field.classList.add(VALIDATION_CONFIG.successClass);
            field.setAttribute('aria-invalid', 'false');
            
            fieldData.errorElement.textContent = '';
            fieldData.errorElement.style.display = 'none';
        }

        showFormError() {
            // フォーム全体のエラーメッセージ
            let formError = this.form.querySelector('.form-error-message');
            if (!formError) {
                formError = document.createElement('div');
                formError.className = 'form-error-message';
                formError.setAttribute('role', 'alert');
                this.form.insertBefore(formError, this.form.firstChild);
            }
            
            formError.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                <span>入力内容にエラーがあります。確認して修正してください。</span>
            `;
            formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        addInputHelpers(field) {
            // 郵便番号の自動フォーマット
            if (field.hasAttribute('data-postal')) {
                field.addEventListener('input', (e) => {
                    let value = e.target.value.replace(/[^0-9]/g, '');
                    if (value.length > 3) {
                        value = value.slice(0, 3) + '-' + value.slice(3, 7);
                    }
                    e.target.value = value;
                });
            }

            // 電話番号の自動フォーマット
            if (field.type === 'tel' && field.hasAttribute('data-format')) {
                field.addEventListener('input', (e) => {
                    let value = e.target.value.replace(/[^0-9]/g, '');
                    if (value.length > 0) {
                        if (value.length <= 3) {
                            value = value;
                        } else if (value.length <= 7) {
                            value = value.slice(0, 3) + '-' + value.slice(3);
                        } else {
                            value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
                        }
                    }
                    e.target.value = value;
                });
            }

            // パスワード強度インジケーター
            if (field.type === 'password' && field.hasAttribute('data-strength')) {
                this.addPasswordStrength(field);
            }

            // 文字数カウンター
            if (field.hasAttribute('maxlength')) {
                this.addCharacterCounter(field);
            }
        }

        addPasswordStrength(field) {
            const strengthIndicator = document.createElement('div');
            strengthIndicator.className = 'password-strength';
            field.parentElement.appendChild(strengthIndicator);

            field.addEventListener('input', (e) => {
                const strength = this.calculatePasswordStrength(e.target.value);
                strengthIndicator.innerHTML = `
                    <div class="strength-bar">
                        <div class="strength-fill strength-${strength.level}" style="width: ${strength.score}%"></div>
                    </div>
                    <span class="strength-text">${strength.text}</span>
                `;
            });
        }

        calculatePasswordStrength(password) {
            let score = 0;
            const checks = {
                length: password.length >= 8,
                lowercase: /[a-z]/.test(password),
                uppercase: /[A-Z]/.test(password),
                numbers: /[0-9]/.test(password),
                special: /[^A-Za-z0-9]/.test(password)
            };

            Object.values(checks).forEach(passed => {
                if (passed) score += 20;
            });

            let level, text;
            if (score < 40) {
                level = 'weak';
                text = '弱い';
            } else if (score < 60) {
                level = 'fair';
                text = '普通';
            } else if (score < 80) {
                level = 'good';
                text = '良い';
            } else {
                level = 'strong';
                text = '強い';
            }

            return { score, level, text };
        }

        addCharacterCounter(field) {
            const counter = document.createElement('div');
            counter.className = 'character-counter';
            field.parentElement.appendChild(counter);

            const updateCounter = () => {
                const current = field.value.length;
                const max = parseInt(field.getAttribute('maxlength'));
                counter.textContent = `${current} / ${max}`;
                
                if (current >= max * 0.9) {
                    counter.classList.add('warning');
                } else {
                    counter.classList.remove('warning');
                }
            };

            field.addEventListener('input', updateCounter);
            updateCounter();
        }

        submitForm() {
            // Ajax送信の例
            const formData = new FormData(this.form);
            const submitButton = this.form.querySelector('[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';

            // 実際のAjax送信処理（例）
            setTimeout(() => {
                this.showSuccessMessage();
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                this.form.reset();
                this.resetValidation();
            }, 1500);
        }

        showSuccessMessage() {
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>送信が完了しました！</span>
            `;
            
            this.form.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.classList.add('fade-out');
                setTimeout(() => successMessage.remove(), 300);
            }, 3000);
        }

        resetValidation() {
            Object.keys(this.fields).forEach(fieldName => {
                const field = this.fields[fieldName].element;
                field.classList.remove(VALIDATION_CONFIG.errorClass, VALIDATION_CONFIG.successClass);
                this.fields[fieldName].errorElement.style.display = 'none';
            });
        }
    }

    // 初期化
    document.addEventListener('DOMContentLoaded', () => {
        const forms = document.querySelectorAll('[data-validate]');
        forms.forEach(form => {
            new FormValidator(form);
        });
    });

    // グローバルに公開
    window.FormValidator = FormValidator;

})();