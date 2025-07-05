// Service Worker
// キャッシュ戦略とオフライン対応

const CACHE_VERSION = 'nyusatsu-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;

// キャッシュする静的リソース
const STATIC_ASSETS = [
    '/',
    '/assets/css/main.css',
    '/assets/js/main.js',
    '/offline.html',
    '/manifest.json'
];

// キャッシュ戦略の設定
const CACHE_STRATEGIES = {
    static: {
        name: STATIC_CACHE,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7日間
    },
    dynamic: {
        name: DYNAMIC_CACHE,
        maxAge: 24 * 60 * 60 * 1000, // 1日間
        maxItems: 50
    },
    images: {
        name: IMAGE_CACHE,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30日間
        maxItems: 100
    }
};

// インストール時
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// アクティベート時
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(cacheName => {
                            return cacheName.startsWith('nyusatsu-') && 
                                   !Object.values(CACHE_STRATEGIES).some(strategy => strategy.name === cacheName);
                        })
                        .map(cacheName => caches.delete(cacheName))
                );
            })
            .then(() => self.clients.claim())
    );
});

// フェッチイベント
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // 同一オリジンのリクエストのみ処理
    if (url.origin !== location.origin) {
        return;
    }

    // リクエストの種類に応じて戦略を選択
    if (request.method === 'GET') {
        let responsePromise;

        if (isStaticAsset(url.pathname)) {
            responsePromise = cacheFirst(request, CACHE_STRATEGIES.static);
        } else if (isImage(url.pathname)) {
            responsePromise = cacheFirst(request, CACHE_STRATEGIES.images);
        } else if (isAPI(url.pathname)) {
            responsePromise = networkFirst(request, CACHE_STRATEGIES.dynamic);
        } else {
            responsePromise = staleWhileRevalidate(request, CACHE_STRATEGIES.dynamic);
        }

        event.respondWith(responsePromise);
    }
});

// キャッシュファースト戦略
async function cacheFirst(request, strategy) {
    const cache = await caches.open(strategy.name);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
        // キャッシュの有効期限をチェック
        const cachedDate = new Date(cachedResponse.headers.get('date'));
        if (Date.now() - cachedDate.getTime() < strategy.maxAge) {
            return cachedResponse;
        }
    }

    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        if (cachedResponse) {
            return cachedResponse;
        }
        return caches.match('/offline.html');
    }
}

// ネットワークファースト戦略
async function networkFirst(request, strategy) {
    const cache = await caches.open(strategy.name);

    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
            // キャッシュサイズ管理
            trimCache(strategy.name, strategy.maxItems);
        }
        return networkResponse;
    } catch (error) {
        const cachedResponse = await cache.match(request);
        return cachedResponse || caches.match('/offline.html');
    }
}

// Stale While Revalidate戦略
async function staleWhileRevalidate(request, strategy) {
    const cache = await caches.open(strategy.name);
    const cachedResponse = await cache.match(request);

    const fetchPromise = fetch(request).then(networkResponse => {
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
            trimCache(strategy.name, strategy.maxItems);
        }
        return networkResponse;
    });

    return cachedResponse || fetchPromise;
}

// ヘルパー関数
function isStaticAsset(pathname) {
    return /\.(css|js|woff2?|ttf|otf|eot)$/.test(pathname);
}

function isImage(pathname) {
    return /\.(jpg|jpeg|png|gif|svg|webp|ico)$/.test(pathname);
}

function isAPI(pathname) {
    return pathname.startsWith('/api/');
}

// キャッシュサイズ管理
async function trimCache(cacheName, maxItems) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    
    if (keys.length > maxItems) {
        const keysToDelete = keys.slice(0, keys.length - maxItems);
        await Promise.all(keysToDelete.map(key => cache.delete(key)));
    }
}

// バックグラウンド同期
self.addEventListener('sync', event => {
    if (event.tag === 'sync-forms') {
        event.waitUntil(syncFormData());
    }
});

async function syncFormData() {
    // IndexedDBからペンディングのフォームデータを取得して送信
    const pendingData = await getPendingFormData();
    
    return Promise.all(
        pendingData.map(async data => {
            try {
                const response = await fetch(data.url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data.formData)
                });
                
                if (response.ok) {
                    await removePendingFormData(data.id);
                }
            } catch (error) {
                console.error('Sync failed:', error);
            }
        })
    );
}

// プッシュ通知（オプション）
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : '新しい更新があります',
        icon: '/assets/images/icon-192.png',
        badge: '/assets/images/badge-72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('入札マップ', options)
    );
});

// 通知クリック
self.addEventListener('notificationclick', event => {
    event.notification.close();

    event.waitUntil(
        clients.openWindow('/')
    );
});

// メッセージハンドリング
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => caches.delete(cacheName))
                );
            })
        );
    }
});