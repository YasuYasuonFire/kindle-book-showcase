#!/bin/bash

echo "📚 Kindle書籍コレクション - ビルドを開始します..."

# 書籍データを抽出
echo "📖 書籍データを抽出中..."
npm run extract-books

# publicフォルダにデータをコピー
echo "📁 データをpublicフォルダにコピー中..."
mkdir -p public/data
cp data/books.json public/data/

# Next.jsアプリケーションをビルド
echo "🔨 Next.jsアプリケーションをビルド中..."
npm run build

echo "✅ ビルドが完了しました！" 