---
layout: default
title: よくある質問（FAQ）
description: 入札・公共調達に関するよくある質問と回答をまとめました
permalink: /faq-enhanced/
---

<div class="faq-page">
    <div class="container">
        <h1 class="page-title text-center mb-8">
            <i class="fas fa-question-circle"></i>
            よくある質問（FAQ）
        </h1>
        
        <p class="text-center text-lg text-muted mb-8">
            入札・公共調達に関してよく寄せられる質問をまとめました。<br>
            お探しの情報が見つからない場合は、<a href="/contact/">お問い合わせ</a>ください。
        </p>
        
        {% include faq-accordion.html 
            id="main-faq"
            items=site.data.faq_items
            categories=site.data.faq_categories
            show_filter=true
            show_search=true
            close_others=true
        %}
        
        <!-- 関連リンク -->
        <div class="related-links mt-12">
            <h2 class="text-xl font-bold mb-4">関連情報</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="/glossary/" class="card card-hover">
                    <div class="card-body">
                        <h3 class="font-medium mb-2">
                            <i class="fas fa-spell-check"></i>
                            用語集
                        </h3>
                        <p class="text-sm text-muted">専門用語の解説</p>
                    </div>
                </a>
                
                <a href="/knowhow/" class="card card-hover">
                    <div class="card-body">
                        <h3 class="font-medium mb-2">
                            <i class="fas fa-book"></i>
                            入札の基礎知識
                        </h3>
                        <p class="text-sm text-muted">制度の詳しい解説</p>
                    </div>
                </a>
                
                <a href="/contact/" class="card card-hover">
                    <div class="card-body">
                        <h3 class="font-medium mb-2">
                            <i class="fas fa-envelope"></i>
                            お問い合わせ
                        </h3>
                        <p class="text-sm text-muted">個別のご相談</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
</div>