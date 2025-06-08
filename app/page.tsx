'use client';

import React, { useState, useEffect } from 'react';
import BookCard from '@/components/BookCard';

interface Book {
  id: string;
  title: string;
  author: string;
  asin: string;
  bookImageUrl: string;
  highlightsCount: number;
  lastAnnotatedDate: string;
  amazonUrl: string;
  category: string;
  highlights: string[];
  fileName: string;
}

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 実際の書籍データを読み込み
    async function loadBooks() {
      try {
        const response = await fetch('/data/books.json');
        if (response.ok) {
          const booksData = await response.json();
          setBooks(booksData);
          setFilteredBooks(booksData);
        } else {
          console.error('書籍データの読み込みに失敗しました');
          // フォールバック: サンプルデータを使用
          const sampleBooks: Book[] = [
            {
              id: '12098',
              title: 'マネジャーの最も大切な仕事――95％の人が見過ごす「小さな進捗」の力',
              author: 'テレサ・アマビール、スティーブン・クレイマー、中竹竜二、樋口武志',
              asin: 'B01MTBX22U',
              bookImageUrl: 'https://m.media-amazon.com/images/I/71hZkJEKSEL._SY160.jpg',
              highlightsCount: 7,
              lastAnnotatedDate: '2025-03-31',
              amazonUrl: 'https://www.amazon.co.jp/dp/B01MTBX22U',
              category: 'マネジメント・リーダーシップ',
              highlights: [
                'インナーワークライフに影響を与えるすべてのポジティブな出来事のなかで、最も強力なのが やりがいのある仕事が進捗すること である。',
                '進捗を手助けすることこそ、マネジャーにとってインナーワークライフによい影響を与える最も効果的な方法なのだ。'
              ],
              fileName: 'テレサ・アマビール、スティーブン・クレイマー、中竹竜二、樋口武志-マネジャーの最も大切な仕事――95％の人が見過ごす「小さな進捗」の力'
            }
          ];
          setBooks(sampleBooks);
          setFilteredBooks(sampleBooks);
        }
      } catch (error) {
        console.error('書籍データの読み込み中にエラーが発生しました:', error);
        setBooks([]);
        setFilteredBooks([]);
      } finally {
        setLoading(false);
      }
    }
    
    loadBooks();
  }, []);

  useEffect(() => {
    let filtered = books;

    // カテゴリフィルター
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(book => book.category === selectedCategory);
    }

    // 検索フィルター
    if (searchTerm) {
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  }, [books, selectedCategory, searchTerm]);

  const categories = ['all', ...Array.from(new Set(books.map(book => book.category)))];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">書籍データを読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 統計情報 */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{books.length}</div>
            <div className="text-sm text-gray-600">総書籍数</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {books.reduce((sum, book) => sum + book.highlightsCount, 0)}
            </div>
            <div className="text-sm text-gray-600">総ハイライト数</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{categories.length - 1}</div>
            <div className="text-sm text-gray-600">カテゴリ数</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {books.length > 0 ? Math.round(books.reduce((sum, book) => sum + book.highlightsCount, 0) / books.length) : 0}
            </div>
            <div className="text-sm text-gray-600">平均ハイライト数</div>
          </div>
        </div>
      </div>

      {/* フィルターとサーチ */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              🔍 書籍を検索
            </label>
            <input
              type="text"
              id="search"
              placeholder="タイトルや著者名で検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              📂 カテゴリ
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">すべて</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          {filteredBooks.length} 冊の書籍が見つかりました
        </div>
      </div>

      {/* 書籍グリッド */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">📚</div>
          <p className="text-gray-600 mt-2">検索条件に一致する書籍が見つかりませんでした。</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            フィルターをリセット
          </button>
        </div>
      )}
    </div>
  );
} 