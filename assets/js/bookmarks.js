// ブックマーク・お気に入り機能
// ページの保存、タグ付け、フォルダ管理

(function() {
    'use strict';

    // ブックマーク設定
    const BOOKMARK_CONFIG = {
        storageKey: 'nyusatsu-bookmarks',
        foldersKey: 'nyusatsu-bookmark-folders',
        maxBookmarks: 500,
        maxFolders: 50,
        defaultFolder: 'default',
        exportFormat: 'json',
        syncInterval: 300000, // 5分
        presetTags: [
            '重要', '参考', '手続き', '事例', 'FAQ', 
            '技術', '制度', '資格', '契約', '電子入札'
        ]
    };

    // ブックマークマネージャー
    class BookmarkManager {
        constructor() {
            this.bookmarks = this.loadBookmarks();
            this.folders = this.loadFolders();
            this.currentPage = this.getCurrentPageInfo();
            this.init();
        }

        init() {
            this.setupBookmarkButton();
            this.setupBookmarkModal();
            this.createBookmarkInterface();
            this.bindEvents();
            this.updateBookmarkButton();
        }

        loadBookmarks() {
            const saved = localStorage.getItem(BOOKMARK_CONFIG.storageKey);
            return saved ? JSON.parse(saved) : [];
        }

        loadFolders() {
            const saved = localStorage.getItem(BOOKMARK_CONFIG.foldersKey);
            return saved ? JSON.parse(saved) : [
                {
                    id: 'default',
                    name: '未分類',
                    color: '#6b7280',
                    created: Date.now()
                },
                {
                    id: 'important',
                    name: '重要',
                    color: '#ef4444',
                    created: Date.now()
                },
                {
                    id: 'reference',
                    name: '参考資料',
                    color: '#3b82f6',
                    created: Date.now()
                }
            ];
        }

        saveBookmarks() {
            localStorage.setItem(BOOKMARK_CONFIG.storageKey, JSON.stringify(this.bookmarks));
        }

        saveFolders() {
            localStorage.setItem(BOOKMARK_CONFIG.foldersKey, JSON.stringify(this.folders));
        }

        getCurrentPageInfo() {
            return {
                url: window.location.href,
                pathname: window.location.pathname,
                title: document.title,
                description: this.getPageDescription(),
                keywords: this.getPageKeywords(),
                category: this.getPageCategory(),
                lastModified: this.getLastModified()
            };
        }

        getPageDescription() {
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) return metaDesc.content;
            
            const firstP = document.querySelector('main p, article p, .content p');
            if (firstP) return firstP.textContent.slice(0, 200) + '...';
            
            return '';
        }

        getPageKeywords() {
            const metaKeywords = document.querySelector('meta[name="keywords"]');
            if (metaKeywords) return metaKeywords.content.split(',').map(k => k.trim());
            
            return [];
        }

        getPageCategory() {
            const pathname = window.location.pathname;
            if (pathname.includes('/guides/')) return 'ガイド';
            if (pathname.includes('/cases/')) return '事例';
            if (pathname.includes('/faq/')) return 'FAQ';
            if (pathname.includes('/news/')) return 'ニュース';
            return 'その他';
        }

        getLastModified() {
            const lastMod = document.querySelector('meta[name="last-modified"]');
            return lastMod ? new Date(lastMod.content).getTime() : Date.now();
        }

        // ブックマークボタンの設定
        setupBookmarkButton() {
            const button = document.createElement('button');
            button.className = 'bookmark-button';
            button.innerHTML = `
                <i class="fas fa-bookmark"></i>
                <span class="bookmark-text">ブックマーク</span>
            `;
            button.setAttribute('aria-label', 'ページをブックマーク');
            button.setAttribute('title', 'このページをブックマーク');

            // ヘッダーまたは記事内に配置
            const target = document.querySelector('.article-actions, .page-actions, header .actions') ||
                          document.querySelector('main, article');
            
            if (target) {
                target.appendChild(button);
            }

            button.addEventListener('click', () => {
                if (this.isBookmarked(this.currentPage.pathname)) {
                    this.removeBookmark(this.currentPage.pathname);
                } else {
                    this.showBookmarkModal();
                }
            });
        }

        updateBookmarkButton() {
            const button = document.querySelector('.bookmark-button');
            if (!button) return;

            const isBookmarked = this.isBookmarked(this.currentPage.pathname);
            
            button.classList.toggle('bookmarked', isBookmarked);
            button.querySelector('i').className = isBookmarked ? 'fas fa-bookmark' : 'far fa-bookmark';
            button.querySelector('.bookmark-text').textContent = isBookmarked ? 'ブックマーク済み' : 'ブックマーク';
            button.setAttribute('title', isBookmarked ? 'ブックマークを削除' : 'このページをブックマーク');
        }

        // ブックマーク追加モーダル
        setupBookmarkModal() {
            const modal = document.createElement('div');
            modal.className = 'bookmark-modal';
            modal.innerHTML = `
                <div class="bookmark-modal-overlay"></div>
                <div class="bookmark-modal-content">
                    <div class="bookmark-modal-header">
                        <h3>ブックマークに追加</h3>
                        <button class="bookmark-modal-close" aria-label="閉じる">&times;</button>
                    </div>
                    
                    <form class="bookmark-form">
                        <div class="form-group">
                            <label for="bookmark-title">タイトル</label>
                            <input type="text" id="bookmark-title" value="${this.currentPage.title}" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="bookmark-description">説明（任意）</label>
                            <textarea id="bookmark-description" placeholder="このブックマークの説明や覚書き">${this.currentPage.description}</textarea>
                        </div>
                        
                        <div class="form-group">
                            <label for="bookmark-folder">フォルダ</label>
                            <select id="bookmark-folder">
                                ${this.folders.map(folder => `
                                    <option value="${folder.id}">${folder.name}</option>
                                `).join('')}
                            </select>
                            <button type="button" class="btn-add-folder">新しいフォルダ</button>
                        </div>
                        
                        <div class="form-group">
                            <label>タグ</label>
                            <div class="tag-input-container">
                                <input type="text" id="bookmark-tags" placeholder="タグを入力してEnterキーを押す">
                                <div class="tag-suggestions">
                                    ${BOOKMARK_CONFIG.presetTags.map(tag => `
                                        <button type="button" class="tag-suggestion" data-tag="${tag}">${tag}</button>
                                    `).join('')}
                                </div>
                                <div class="selected-tags"></div>
                            </div>
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary bookmark-cancel">キャンセル</button>
                            <button type="submit" class="btn btn-primary">ブックマークに追加</button>
                        </div>
                    </form>
                </div>
            `;

            document.body.appendChild(modal);
            this.attachModalEvents(modal);
        }

        showBookmarkModal() {
            const modal = document.querySelector('.bookmark-modal');
            if (modal) {
                modal.style.display = 'block';
                setTimeout(() => modal.classList.add('show'), 10);
                
                // フォーカス管理
                modal.querySelector('#bookmark-title').focus();
                modal.querySelector('#bookmark-title').select();
            }
        }

        hideBookmarkModal() {
            const modal = document.querySelector('.bookmark-modal');
            if (modal) {
                modal.classList.remove('show');
                setTimeout(() => modal.style.display = 'none', 300);
            }
        }

        attachModalEvents(modal) {
            // 閉じるボタン
            const closeBtn = modal.querySelector('.bookmark-modal-close');
            const cancelBtn = modal.querySelector('.bookmark-cancel');
            const overlay = modal.querySelector('.bookmark-modal-overlay');
            
            [closeBtn, cancelBtn, overlay].forEach(el => {
                el.addEventListener('click', () => {
                    this.hideBookmarkModal();
                });
            });

            // フォーム送信
            const form = modal.querySelector('.bookmark-form');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveBookmarkFromForm(form);
            });

            // タグ入力
            this.setupTagInput(modal);

            // フォルダ追加
            modal.querySelector('.btn-add-folder').addEventListener('click', () => {
                this.showAddFolderDialog();
            });
        }

        setupTagInput(modal) {
            const tagInput = modal.querySelector('#bookmark-tags');
            const suggestions = modal.querySelector('.tag-suggestions');
            const selectedTags = modal.querySelector('.selected-tags');
            let currentTags = [];

            // タグ入力
            tagInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault();
                    const tag = tagInput.value.trim();
                    if (tag && !currentTags.includes(tag)) {
                        this.addTag(tag, selectedTags, currentTags);
                        tagInput.value = '';
                    }
                }
            });

            // 提案タグクリック
            suggestions.addEventListener('click', (e) => {
                if (e.target.classList.contains('tag-suggestion')) {
                    const tag = e.target.dataset.tag;
                    if (!currentTags.includes(tag)) {
                        this.addTag(tag, selectedTags, currentTags);
                    }
                }
            });

            // 既存タグがある場合は表示
            if (this.currentPage.keywords.length > 0) {
                this.currentPage.keywords.forEach(keyword => {
                    if (!currentTags.includes(keyword)) {
                        this.addTag(keyword, selectedTags, currentTags);
                    }
                });
            }
        }

        addTag(tag, container, tagArray) {
            tagArray.push(tag);
            
            const tagElement = document.createElement('span');
            tagElement.className = 'selected-tag';
            tagElement.innerHTML = `
                ${tag}
                <button type="button" class="tag-remove" data-tag="${tag}">&times;</button>
            `;
            
            container.appendChild(tagElement);

            // 削除ボタン
            tagElement.querySelector('.tag-remove').addEventListener('click', () => {
                const index = tagArray.indexOf(tag);
                if (index > -1) {
                    tagArray.splice(index, 1);
                    tagElement.remove();
                }
            });
        }

        saveBookmarkFromForm(form) {
            const formData = new FormData(form);
            const selectedTags = Array.from(form.querySelectorAll('.selected-tag'))
                .map(tag => tag.textContent.trim());

            const bookmark = {
                id: this.generateBookmarkId(),
                url: this.currentPage.url,
                pathname: this.currentPage.pathname,
                title: formData.get('bookmark-title') || this.currentPage.title,
                description: formData.get('bookmark-description') || '',
                folder: formData.get('bookmark-folder') || BOOKMARK_CONFIG.defaultFolder,
                tags: selectedTags,
                category: this.currentPage.category,
                created: Date.now(),
                lastAccessed: Date.now(),
                accessCount: 0,
                rating: 0,
                notes: ''
            };

            this.addBookmark(bookmark);
            this.hideBookmarkModal();
            this.showNotification('ブックマークに追加しました', 'success');
        }

        generateBookmarkId() {
            return 'bookmark_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        }

        // ブックマーク管理
        addBookmark(bookmark) {
            // 重複チェック
            const existing = this.bookmarks.find(b => b.pathname === bookmark.pathname);
            if (existing) {
                // 既存ブックマークを更新
                Object.assign(existing, bookmark);
            } else {
                this.bookmarks.push(bookmark);
            }

            this.saveBookmarks();
            this.updateBookmarkButton();
            this.updateBookmarkInterface();
        }

        removeBookmark(pathname) {
            const index = this.bookmarks.findIndex(b => b.pathname === pathname);
            if (index > -1) {
                this.bookmarks.splice(index, 1);
                this.saveBookmarks();
                this.updateBookmarkButton();
                this.updateBookmarkInterface();
                this.showNotification('ブックマークを削除しました', 'info');
            }
        }

        isBookmarked(pathname) {
            return this.bookmarks.some(b => b.pathname === pathname);
        }

        getBookmark(pathname) {
            return this.bookmarks.find(b => b.pathname === pathname);
        }

        updateBookmarkAccess(pathname) {
            const bookmark = this.getBookmark(pathname);
            if (bookmark) {
                bookmark.lastAccessed = Date.now();
                bookmark.accessCount = (bookmark.accessCount || 0) + 1;
                this.saveBookmarks();
            }
        }

        // フォルダ管理
        createFolder(name, color = '#6b7280') {
            const folder = {
                id: 'folder_' + Date.now(),
                name: name,
                color: color,
                created: Date.now()
            };
            
            this.folders.push(folder);
            this.saveFolders();
            return folder;
        }

        deleteFolder(folderId) {
            // デフォルトフォルダは削除不可
            if (folderId === BOOKMARK_CONFIG.defaultFolder) return false;

            // フォルダ内のブックマークをデフォルトフォルダに移動
            this.bookmarks.forEach(bookmark => {
                if (bookmark.folder === folderId) {
                    bookmark.folder = BOOKMARK_CONFIG.defaultFolder;
                }
            });

            // フォルダを削除
            const index = this.folders.findIndex(f => f.id === folderId);
            if (index > -1) {
                this.folders.splice(index, 1);
                this.saveFolders();
                this.saveBookmarks();
                return true;
            }
            return false;
        }

        showAddFolderDialog() {
            const dialog = document.createElement('div');
            dialog.className = 'folder-dialog';
            dialog.innerHTML = `
                <div class="dialog-overlay"></div>
                <div class="dialog-content">
                    <h4>新しいフォルダ</h4>
                    <form class="folder-form">
                        <div class="form-group">
                            <label for="folder-name">フォルダ名</label>
                            <input type="text" id="folder-name" required placeholder="フォルダ名を入力">
                        </div>
                        <div class="form-group">
                            <label for="folder-color">色</label>
                            <input type="color" id="folder-color" value="#3b82f6">
                        </div>
                        <div class="dialog-actions">
                            <button type="button" class="btn btn-secondary dialog-cancel">キャンセル</button>
                            <button type="submit" class="btn btn-primary">作成</button>
                        </div>
                    </form>
                </div>
            `;

            document.body.appendChild(dialog);

            // イベント
            dialog.querySelector('.dialog-cancel').addEventListener('click', () => {
                dialog.remove();
            });

            dialog.querySelector('.folder-form').addEventListener('submit', (e) => {
                e.preventDefault();
                const name = dialog.querySelector('#folder-name').value;
                const color = dialog.querySelector('#folder-color').value;
                
                const newFolder = this.createFolder(name, color);
                
                // モーダルのフォルダ選択を更新
                const select = document.querySelector('#bookmark-folder');
                if (select) {
                    const option = document.createElement('option');
                    option.value = newFolder.id;
                    option.textContent = newFolder.name;
                    option.selected = true;
                    select.appendChild(option);
                }
                
                dialog.remove();
                this.showNotification('フォルダを作成しました', 'success');
            });

            dialog.querySelector('#folder-name').focus();
        }

        // ブックマーク一覧インターフェース
        createBookmarkInterface() {
            // ページにブックマーク一覧が表示される場合
            const container = document.querySelector('#bookmarks-container, .bookmarks-container');
            if (container) {
                this.renderBookmarkList(container);
            }
        }

        renderBookmarkList(container) {
            container.innerHTML = `
                <div class="bookmarks-header">
                    <h2>ブックマーク</h2>
                    <div class="bookmarks-controls">
                        <input type="text" class="bookmark-search" placeholder="ブックマークを検索...">
                        <select class="bookmark-filter-folder">
                            <option value="">すべてのフォルダ</option>
                            ${this.folders.map(folder => `
                                <option value="${folder.id}">${folder.name}</option>
                            `).join('')}
                        </select>
                        <select class="bookmark-sort">
                            <option value="created">作成日順</option>
                            <option value="accessed">アクセス順</option>
                            <option value="title">タイトル順</option>
                            <option value="rating">評価順</option>
                        </select>
                    </div>
                </div>
                
                <div class="bookmarks-grid">
                    ${this.renderBookmarks(this.bookmarks)}
                </div>
            `;

            this.attachListEvents(container);
        }

        renderBookmarks(bookmarks) {
            if (bookmarks.length === 0) {
                return '<div class="no-bookmarks">ブックマークがありません</div>';
            }

            return bookmarks.map(bookmark => {
                const folder = this.folders.find(f => f.id === bookmark.folder);
                return `
                    <div class="bookmark-card" data-id="${bookmark.id}">
                        <div class="bookmark-header">
                            <span class="bookmark-folder" style="background-color: ${folder?.color || '#6b7280'}">
                                ${folder?.name || '未分類'}
                            </span>
                            <div class="bookmark-actions">
                                <button class="btn-edit" data-id="${bookmark.id}" title="編集">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn-delete" data-id="${bookmark.id}" title="削除">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        
                        <h3><a href="${bookmark.url}">${bookmark.title}</a></h3>
                        
                        ${bookmark.description ? `<p class="bookmark-description">${bookmark.description}</p>` : ''}
                        
                        <div class="bookmark-tags">
                            ${bookmark.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        
                        <div class="bookmark-meta">
                            <span class="bookmark-date">${this.formatDate(bookmark.created)}</span>
                            <span class="bookmark-access">閲覧 ${bookmark.accessCount || 0}回</span>
                            ${bookmark.rating > 0 ? `<span class="bookmark-rating">${'★'.repeat(bookmark.rating)}</span>` : ''}
                        </div>
                    </div>
                `;
            }).join('');
        }

        attachListEvents(container) {
            // 検索
            const searchInput = container.querySelector('.bookmark-search');
            searchInput.addEventListener('input', (e) => {
                this.filterBookmarks(container, {
                    search: e.target.value,
                    folder: container.querySelector('.bookmark-filter-folder').value
                });
            });

            // フォルダフィルター
            const folderFilter = container.querySelector('.bookmark-filter-folder');
            folderFilter.addEventListener('change', (e) => {
                this.filterBookmarks(container, {
                    search: searchInput.value,
                    folder: e.target.value
                });
            });

            // ソート
            const sortSelect = container.querySelector('.bookmark-sort');
            sortSelect.addEventListener('change', (e) => {
                this.sortBookmarks(container, e.target.value);
            });

            // ブックマーク削除
            container.addEventListener('click', (e) => {
                if (e.target.closest('.btn-delete')) {
                    const id = e.target.closest('.btn-delete').dataset.id;
                    if (confirm('このブックマークを削除しますか？')) {
                        this.deleteBookmarkById(id);
                        this.updateBookmarkInterface();
                    }
                }
            });

            // リンククリック追跡
            container.addEventListener('click', (e) => {
                const link = e.target.closest('.bookmark-card a');
                if (link) {
                    const card = link.closest('.bookmark-card');
                    const bookmark = this.bookmarks.find(b => b.id === card.dataset.id);
                    if (bookmark) {
                        this.updateBookmarkAccess(bookmark.pathname);
                    }
                }
            });
        }

        filterBookmarks(container, filters) {
            let filtered = this.bookmarks;

            if (filters.search) {
                const search = filters.search.toLowerCase();
                filtered = filtered.filter(bookmark => 
                    bookmark.title.toLowerCase().includes(search) ||
                    bookmark.description.toLowerCase().includes(search) ||
                    bookmark.tags.some(tag => tag.toLowerCase().includes(search))
                );
            }

            if (filters.folder) {
                filtered = filtered.filter(bookmark => bookmark.folder === filters.folder);
            }

            const grid = container.querySelector('.bookmarks-grid');
            grid.innerHTML = this.renderBookmarks(filtered);
        }

        sortBookmarks(container, sortBy) {
            const sorted = [...this.bookmarks];
            
            switch(sortBy) {
                case 'title':
                    sorted.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                case 'accessed':
                    sorted.sort((a, b) => (b.lastAccessed || 0) - (a.lastAccessed || 0));
                    break;
                case 'rating':
                    sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                    break;
                default: // created
                    sorted.sort((a, b) => b.created - a.created);
            }

            const grid = container.querySelector('.bookmarks-grid');
            grid.innerHTML = this.renderBookmarks(sorted);
        }

        deleteBookmarkById(id) {
            const index = this.bookmarks.findIndex(b => b.id === id);
            if (index > -1) {
                this.bookmarks.splice(index, 1);
                this.saveBookmarks();
            }
        }

        updateBookmarkInterface() {
            const container = document.querySelector('#bookmarks-container, .bookmarks-container');
            if (container) {
                this.renderBookmarkList(container);
            }
        }

        // ユーティリティ
        formatDate(timestamp) {
            return new Date(timestamp).toLocaleDateString('ja-JP');
        }

        showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `bookmark-notification notification-${type}`;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => notification.classList.add('show'), 100);
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }

        // エクスポート・インポート
        exportBookmarks() {
            const data = {
                bookmarks: this.bookmarks,
                folders: this.folders,
                exported: Date.now(),
                version: '1.0'
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `bookmarks-${Date.now()}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }

        importBookmarks(file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    if (data.bookmarks && data.folders) {
                        this.bookmarks = [...this.bookmarks, ...data.bookmarks];
                        this.folders = [...this.folders, ...data.folders.filter(f => 
                            !this.folders.some(existing => existing.id === f.id)
                        )];
                        
                        this.saveBookmarks();
                        this.saveFolders();
                        this.updateBookmarkInterface();
                        this.showNotification('ブックマークをインポートしました', 'success');
                    }
                } catch (error) {
                    this.showNotification('インポートに失敗しました', 'error');
                }
            };
            reader.readAsText(file);
        }

        // 公開API
        getBookmarks() {
            return [...this.bookmarks];
        }

        getFolders() {
            return [...this.folders];
        }

        getBookmarksByFolder(folderId) {
            return this.bookmarks.filter(b => b.folder === folderId);
        }

        getBookmarksByTag(tag) {
            return this.bookmarks.filter(b => b.tags.includes(tag));
        }

        searchBookmarks(query) {
            const search = query.toLowerCase();
            return this.bookmarks.filter(bookmark => 
                bookmark.title.toLowerCase().includes(search) ||
                bookmark.description.toLowerCase().includes(search) ||
                bookmark.tags.some(tag => tag.toLowerCase().includes(search))
            );
        }

        bindEvents() {
            // ページ読み込み時のアクセス記録
            if (this.isBookmarked(this.currentPage.pathname)) {
                this.updateBookmarkAccess(this.currentPage.pathname);
            }
        }
    }

    // 初期化
    document.addEventListener('DOMContentLoaded', () => {
        window.bookmarkManager = new BookmarkManager();
    });

})();