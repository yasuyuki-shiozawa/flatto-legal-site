---
layout: default
title: 入札ブログ | 公共調達の最新情報とノウハウ
description: 入札・公共調達に関する最新情報、実践的なノウハウ、法改正の動向、成功事例などを専門家が解説。あなたのビジネスを加速させるための情報が満載です。
permalink: /blog/
---

<!-- ページヘッダー -->
<section class="page-header">
    <div class="container">
        <h1 class="page-title">入札ブログ</h1>
        <p class="page-subtitle">入札・公共調達の最新情報とノウハウをお届け</p>
    </div>
</section>

<!-- カテゴリーフィルター -->
<section class="blog-filter">
    <div class="container">
        <div class="filter-tabs">
            <button class="filter-tab active" data-category="all">すべて</button>
            <button class="filter-tab" data-category="入門ガイド">入門ガイド</button>
            <button class="filter-tab" data-category="制度解説">制度解説</button>
            <button class="filter-tab" data-category="実務ガイド">実務ガイド</button>
            <button class="filter-tab" data-category="戦略ガイド">戦略ガイド</button>
            <button class="filter-tab" data-category="最新動向">最新動向</button>
        </div>
    </div>
</section>

<!-- ブログ記事一覧 -->
<section class="blog-posts">
    <div class="container">
        <div class="posts-grid">
            {% for post in site.posts %}
            <article class="post-card" data-category="{{ post.categories | join: ' ' }}">
                <div class="post-image">
                    {% if post.image %}
                    <img src="{{ post.image | relative_url }}" alt="{{ post.title }}">
                    {% else %}
                    <img src="{{ '/assets/images/blog/default-blog-image.jpg' | relative_url }}" alt="{{ post.title }}">
                    {% endif %}
                    <div class="post-category">{{ post.categories | first }}</div>
                </div>
                <div class="post-content">
                    <div class="post-meta">
                        <time class="post-date">{{ post.date | date: "%Y年%-m月%-d日" }}</time>
                        <span class="post-author">{{ post.author }}</span>
                    </div>
                    <h2 class="post-title">
                        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                    </h2>
                    <p class="post-excerpt">
                        {{ post.excerpt | strip_html | truncate: 100 }}
                    </p>
                    <div class="post-tags">
                        {% for tag in post.tags %}
                        <span class="tag">{{ tag }}</span>
                        {% endfor %}
                    </div>
                    <a href="{{ post.url | relative_url }}" class="read-more">
                        続きを読む <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </article>
            {% endfor %}
        </div>
    </div>
</section>

<!-- サイドバー付きレイアウト -->
<section class="blog-sidebar-section">
    <div class="container">
        <div class="blog-layout">
            <aside class="blog-sidebar">
                <!-- 人気記事 -->
                <div class="sidebar-widget">
                    <h3 class="widget-title">
                        <i class="fas fa-fire"></i>
                        人気記事 TOP10
                    </h3>
                    <div class="popular-posts">
                        {% assign sorted_posts = site.posts | sort: 'date' | reverse %}
                        {% for post in sorted_posts limit:10 %}
                        <div class="popular-post-item">
                            <div class="popular-post-rank">{{ forloop.index }}</div>
                            <div class="popular-post-thumbnail">
                                {% if post.image %}
                                <img src="{{ post.image | relative_url }}" alt="{{ post.title }}">
                                {% else %}
                                <img src="{{ '/assets/images/blog/default-blog-image.jpg' | relative_url }}" alt="{{ post.title }}">
                                {% endif %}
                            </div>
                            <div class="popular-post-content">
                                <h4 class="popular-post-title">
                                    <a href="{{ post.url | relative_url }}">{{ post.title | truncate: 40 }}</a>
                                </h4>
                                <div class="popular-post-meta">
                                    <span class="post-views"><i class="fas fa-eye"></i> 2,345回</span>
                                    <time>{{ post.date | date: "%Y.%m.%d" }}</time>
                                </div>
                            </div>
                        </div>
                        {% endfor %}
                    </div>
                </div>

                <!-- カテゴリー -->
                <div class="sidebar-widget">
                    <h3 class="widget-title">
                        <i class="fas fa-folder"></i>
                        カテゴリー
                    </h3>
                    <ul class="category-list">
                        {% assign categories = site.posts | map: 'categories' | join: ',' | split: ',' | uniq %}
                        {% for category in categories %}
                        <li>
                            <a href="#" class="category-link" data-category="{{ category }}">
                                {{ category }}
                                <span class="category-count">
                                    {% assign count = 0 %}
                                    {% for post in site.posts %}
                                        {% if post.categories contains category %}
                                            {% assign count = count | plus: 1 %}
                                        {% endif %}
                                    {% endfor %}
                                    ({{ count }})
                                </span>
                            </a>
                        </li>
                        {% endfor %}
                    </ul>
                </div>

                <!-- タグクラウド -->
                <div class="sidebar-widget">
                    <h3 class="widget-title">
                        <i class="fas fa-tags"></i>
                        タグ
                    </h3>
                    <div class="tag-cloud">
                        {% assign tags = site.posts | map: 'tags' | join: ',' | split: ',' | uniq %}
                        {% for tag in tags %}
                        <a href="#" class="tag-cloud-item">{{ tag }}</a>
                        {% endfor %}
                    </div>
                </div>
            </aside>
        </div>
    </div>
</section>

<script>
// カテゴリーフィルター機能
document.addEventListener('DOMContentLoaded', function() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const postCards = document.querySelectorAll('.post-card');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // タブのアクティブ状態を更新
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 記事をフィルタリング
            postCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category').includes(category)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // カテゴリーリンクのクリックイベント
    const categoryLinks = document.querySelectorAll('.category-link');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            const tab = document.querySelector(`.filter-tab[data-category="${category}"]`);
            if (tab) {
                tab.click();
                window.scrollTo(0, document.querySelector('.blog-filter').offsetTop - 100);
            }
        });
    });
});
</script>