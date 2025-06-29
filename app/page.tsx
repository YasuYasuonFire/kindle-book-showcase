'use client';

import React, { useState, useEffect } from 'react';
import BookCard from '@/components/BookCard';
import RecentArticles from '@/components/RecentArticles';

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
              highlightsCount: 5,
              lastAnnotatedDate: '2025-03-31',
              amazonUrl: 'https://www.amazon.co.jp/dp/B01MTBX22U',
              category: 'マネジメント・リーダーシップ',
              highlights: [
                'インナーワークライフに影響を与えるすべてのポジティブな出来事のなかで、最も強力なのが やりがいのある仕事が進捗すること である。',
                '進捗を手助けすることこそ、マネジャーにとってインナーワークライフによい影響を与える最も効果的な方法なのだ。',
                'マネジャーの行動が部下の感情、認知、内発的動機に与える影響は絶大である。',
                '小さな勝利を積み重ねることで、チーム全体の士気と生産性が向上する。',
                '明確な目標設定と定期的なフィードバックが、継続的な進捗を生み出す鍵となる。'
              ],
              fileName: 'テレサ・アマビール、スティーブン・クレイマー、中竹竜二、樋口武志-マネジャーの最も大切な仕事――95％の人が見過ごす「小さな進捗」の力'
            },
            {
              id: '9431',
              title: '1兆ドルコーチ――シリコンバレーのレジェンド　ビル・キャンベルの成功の教え',
              author: 'エリック・シュミット、ジョナサン・ローゼンバーグ、アラン・イーグル、櫻井 祐子',
              asin: 'B07ZCY5BXF',
              bookImageUrl: 'https://m.media-amazon.com/images/I/81iZ0slcqvL._SY160.jpg',
              highlightsCount: 4,
              lastAnnotatedDate: '2025-04-10',
              amazonUrl: 'https://www.amazon.co.jp/dp/B07ZCY5BXF',
              category: 'マネジメント・リーダーシップ',
              highlights: [
                'ほどよい緊張を保ちつつ、チームをコミュニティに育て上げるには、コーチが欠かせない。',
                'チームの成功は個人の成功の総和以上のものである。',
                '信頼は一度失うと取り戻すのが困難だが、毎日の小さな行動で築くことができる。',
                'リーダーの最も重要な仕事は、人々が最高の仕事ができる環境を作ることである。'
              ],
              fileName: '祐子-1兆ドルコーチ――シリコンバレーのレジェンド　ビル・キャンベルの成功の教え'
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
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 mx-auto"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent mx-auto absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <p className="mt-6 text-lg font-medium text-gray-700">書籍データを読み込み中...</p>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 最近の新着 */}
      <RecentArticles books={books} />
      
      {/* 統計情報 */}
      <div className="stats-grid">
        <div className="stat-card group">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
              <span className="text-2xl">📚</span>
            </div>
            <div className="stat-number">{books.length}</div>
          </div>
          <div className="stat-label">総書籍数</div>
        </div>
        <div className="stat-card group">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
              <span className="text-2xl">📝</span>
            </div>
            <div className="stat-number">
              {books.reduce((sum, book) => sum + book.highlightsCount, 0)}
            </div>
          </div>
          <div className="stat-label">総ハイライト数</div>
        </div>
        <div className="stat-card group">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-green-500 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
              <span className="text-2xl">📋</span>
            </div>
            <div className="stat-number">{categories.length - 1}</div>
          </div>
          <div className="stat-label">カテゴリ数</div>
        </div>
        <div className="stat-card group">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-lime-500 to-green-500 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
              <span className="text-2xl">📊</span>
            </div>
            <div className="stat-number">
              {books.length > 0 ? Math.round(books.reduce((sum, book) => sum + book.highlightsCount, 0) / books.length) : 0}
            </div>
          </div>
          <div className="stat-label">平均ハイライト数</div>
        </div>
      </div>

      {/* フィルターとサーチ */}
      <div className="search-container">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-sm">🔍</span>
              </span>
              書籍を検索
            </label>
            <input
              type="text"
              id="search"
              placeholder="タイトルや著者名で検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="lg:w-64">
            <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white text-sm">📋</span>
              </span>
              カテゴリ
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-white/90 backdrop-blur-sm"
            >
              <option value="all">すべて</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm font-medium text-gray-700 bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full border border-green-200">
            <span className="text-green-700">{filteredBooks.length}</span> 冊の書籍が見つかりました
          </div>
          {(searchTerm || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="text-sm font-medium text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-100 px-4 py-2 rounded-full transition-colors duration-200 border border-green-200 hover:border-green-300"
            >
              フィルターをリセット
            </button>
          )}
        </div>
      </div>

      {/* 書籍グリッド */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredBooks.map((book, index) => (
            <div 
              key={book.id} 
              className="fade-in" 
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <BookCard book={book} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl text-green-600">📚</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">書籍が見つかりません</h3>
            <p className="text-gray-600 max-w-md mx-auto">検索条件に一致する書籍がありません。別のキーワードやカテゴリでお試しください。</p>
          </div>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            すべての書籍を表示
          </button>
        </div>
      )}
    </div>
  );
} 