source "https://rubygems.org"

# Jekyll本体
gem "jekyll", "~> 4.3.0"

# 必須の依存関係
gem "rake", "~> 13.0"
gem "bundler", "~> 2.4"
gem "csv"
gem "base64"
gem "logger"

# Jekyll関連のプラグイン
gem "jekyll-feed", "~> 0.12"
gem "jekyll-sitemap", "~> 1.4"
gem "jekyll-seo-tag", "~> 2.8"

# 開発環境用
group :development do
  gem "webrick", "~> 1.7"
end

# Windows用（必要に応じて）
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# パフォーマンス向上用
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# JRuby用
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]


# パフォーマンス最適化プラグイン
# HTML圧縮は_config.ymlのcompress_html設定を使用

