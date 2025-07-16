# Schema.org構造化データ適用方針

## 概要
Schema.org構造化データを適切に実装することで、検索エンジンがコンテンツを正確に理解し、リッチスニペットなどの拡張検索結果を表示できるようになります。ふらっと法務事務所の入札サポート専門サイトでは、以下の方針で構造化データを適用します。

## 全ページ共通の構造化データ

### Organization（組織情報）
```json
{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "ふらっと法務事務所",
  "legalName": "行政書士法人ふらっと法務事務所",
  "url": "https://www.example.com/",
  "logo": "https://www.example.com/images/logo.png",
  "description": "入札サポートを専門とする行政書士法人です。入札参加資格取得から落札までをトータルサポートします。",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "○○区△△町X-X-X",
    "addressLocality": "横浜市",
    "addressRegion": "神奈川県",
    "postalCode": "XXX-XXXX",
    "addressCountry": "JP"
  },
  "telephone": "045-XXX-XXXX",
  "openingHours": "Mo,Tu,We,Th,Fr 09:00-18:00",
  "sameAs": [
    "https://www.facebook.com/flattohoumu",
    "https://twitter.com/flattohoumu"
  ]
}
```

### LocalBusiness（地域ビジネス情報）
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "ふらっと法務事務所",
  "image": "https://www.example.com/images/office.jpg",
  "priceRange": "¥¥",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "○○区△△町X-X-X",
    "addressLocality": "横浜市",
    "addressRegion": "神奈川県",
    "postalCode": "XXX-XXXX",
    "addressCountry": "JP"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "35.XXXXX",
    "longitude": "139.XXXXX"
  },
  "telephone": "045-XXX-XXXX",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  ]
}
```

## トップページ固有の構造化データ

### WebSite（サイト全体情報）
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "ふらっと法務事務所 入札サポート専門サイト",
  "url": "https://www.example.com/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.example.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### Service（サービス概要）
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "入札サポートサービス",
  "provider": {
    "@type": "LegalService",
    "name": "ふらっと法務事務所"
  },
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "35.XXXXX",
      "longitude": "139.XXXXX"
    },
    "geoRadius": "100000"
  },
  "description": "入札参加資格の取得から落札までをトータルサポートするサービスです。",
  "offers": {
    "@type": "Offer",
    "price": "50000",
    "priceCurrency": "JPY"
  }
}
```

## サービス紹介ページ固有の構造化データ

### Service（詳細サービス情報）
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "入札サポートサービス",
  "serviceType": "入札サポート",
  "provider": {
    "@type": "LegalService",
    "name": "ふらっと法務事務所"
  },
  "description": "入札参加資格の取得から落札までをトータルサポートするサービスです。初めての方でも安心して入札に参加できるようサポートします。",
  "offers": [
    {
      "@type": "Offer",
      "name": "ライトプラン",
      "price": "50000",
      "priceCurrency": "JPY",
      "description": "入札参加資格取得と基本的なアドバイスを提供するプランです。"
    },
    {
      "@type": "Offer",
      "name": "スタンダードプラン",
      "price": "100000",
      "priceCurrency": "JPY",
      "description": "資格取得から書類作成サポートまで提供するプランです。"
    },
    {
      "@type": "Offer",
      "name": "フルサポートプラン",
      "price": "200000",
      "priceCurrency": "JPY",
      "description": "入札のすべてのプロセスをサポートする包括的なプランです。"
    }
  ],
  "serviceArea": {
    "@type": "GeoShape",
    "name": "関東エリアを中心に全国対応"
  }
}
```

## お問い合わせページ固有の構造化データ

### ContactPage（問い合わせページ情報）
```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "無料相談・お問い合わせ",
  "description": "入札サポートに関するご相談・お問い合わせはこちらからお願いします。",
  "mainEntity": {
    "@type": "ContactPoint",
    "telephone": "045-XXX-XXXX",
    "contactType": "customer service",
    "areaServed": "JP",
    "availableLanguage": "Japanese",
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  }
}
```

## 将来実装予定のページ向け構造化データ

### FAQ・ノウハウページ
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "入札参加資格を取得するにはどうすればいいですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "入札参加資格を取得するには、各自治体や発注機関ごとに定められた申請書類を提出する必要があります。必要書類は、会社の登記簿謄本、納税証明書、財務諸表、技術者の資格証明書などです。ふらっと法務事務所では、これらの申請手続きを代行しています。"
      }
    },
    {
      "@type": "Question",
      "name": "初めての入札でも落札できる可能性はありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、可能性はあります。入札は基本的に価格競争ですので、適切な価格設定と必要書類の正確な準備ができれば、初めての方でも落札できるチャンスがあります。ふらっと法務事務所では、初めての方向けに入札戦略の立案から書類作成までサポートしています。"
      }
    }
  ]
}
```

### 成功事例ページ
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "清掃関係業代表A様の成功事例",
  "author": {
    "@type": "Organization",
    "name": "ふらっと法務事務所"
  },
  "publisher": {
    "@type": "Organization",
    "name": "ふらっと法務事務所",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.example.com/images/logo.png"
    }
  },
  "datePublished": "2025-05-01",
  "dateModified": "2025-05-30",
  "description": "一年を通して売り上げが安定。閑散期の不安から解放されました。",
  "image": "https://www.example.com/images/success-story1.jpg"
}
```

## 実装方法

1. 各HTMLファイルの`<head>`セクション内に`<script type="application/ld+json">`タグを使用して構造化データを埋め込みます。

2. 例（トップページの場合）:
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ふらっと法務事務所 入札サポート専門サイト</title>
  <!-- その他のメタタグ -->
  
  <!-- Organization構造化データ -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LegalService",
      "name": "ふらっと法務事務所",
      ...
    }
  </script>
  
  <!-- WebSite構造化データ -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      ...
    }
  </script>
  
  <!-- その他の構造化データ -->
</head>
```

## 検証方法

1. Google構造化データテストツール（https://search.google.com/structured-data/testing-tool）を使用して、実装した構造化データが正しく認識されるか確認します。

2. Google Search Consoleを活用して、構造化データの実装状況と問題点を監視します。

## 注意点

1. 実際のサイト情報（住所、電話番号、座標など）が確定したら、それらの情報で構造化データを更新する必要があります。

2. 新しいページが追加された場合は、そのページに適した構造化データも追加します。

3. 構造化データは実際のページコンテンツと一致している必要があります。虚偽の情報を含めないようにします。
