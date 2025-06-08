import React, { useState } from 'react';
import Image from 'next/image';

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

interface BookCardProps {
  book: Book;
}

// グリーンベースの色合いに変更
const categoryColors: { [key: string]: string } = {
  'マネジメント・リーダーシップ': 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg',
  '技術・エンジニア': 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg',
  'お金・投資': 'bg-gradient-to-r from-lime-500 to-green-500 text-white shadow-lg',
  'キャリア・働き方': 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg',
  '組織・職場環境': 'bg-gradient-to-r from-teal-500 to-green-600 text-white shadow-lg',
  'その他': 'bg-gradient-to-r from-slate-500 to-green-500 text-white shadow-lg',
};

export default function BookCard({ book }: BookCardProps) {
  const [showAllHighlights, setShowAllHighlights] = useState(false);
  const categoryColor = categoryColors[book.category] || categoryColors['その他'];

  const handleToggleHighlights = () => {
    setShowAllHighlights(!showAllHighlights);
  };

  return (
    <div className="book-card group overflow-hidden transition-all duration-200 hover:scale-[1.01] border border-green-100 hover:border-green-300">
      <div className="relative">
        <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 rounded-t-2xl">
          <Image
            src={book.bookImageUrl}
            alt={`${book.title}の表紙`}
            width={600}
            height={900}
            className="w-full h-80 object-contain group-hover:scale-105 transition-transform duration-300 ease-out"
            unoptimized
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            style={{
              objectFit: 'contain',
              objectPosition: 'center'
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="w-full h-72 bg-gradient-to-br from-green-200 to-emerald-300 flex items-center justify-center">
                    <div class="text-center text-green-600">
                      <div class="text-4xl mb-2">📚</div>
                      <div class="text-sm font-medium">画像を読み込めません</div>
                    </div>
                  </div>
                `;
              }
            }}
          />
          <div className="absolute top-4 right-4">
            <span className={`category-badge ${categoryColor} transform -rotate-3 hover:rotate-0 transition-transform duration-300`}>
              {book.category}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
      
      <div className="px-6 pt-4 pb-6">
        <h3 className="font-bold text-xl text-gray-900 line-clamp-2 leading-tight min-h-[3.5rem] mb-3 group-hover:text-green-700 transition-colors duration-300">
          {book.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 truncate font-medium">
          <span className="text-gray-500">著者:</span> {book.author}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span className="flex items-center bg-green-50 px-3 py-1 rounded-full border border-green-200">
            <span className="text-green-500 mr-1">📝</span>
            <span className="font-semibold text-green-700">{book.highlights?.length || 0}</span>
            <span className="ml-1 text-green-600">ハイライト</span>
          </span>
          <span className="flex items-center bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <span className="text-emerald-500 mr-1">📅</span>
            <span className="font-medium text-emerald-700">{new Date(book.lastAnnotatedDate).toLocaleDateString('ja-JP')}</span>
          </span>
        </div>
        
        {book.highlights && book.highlights.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-gray-700 flex items-center">
                <span className="text-green-500 mr-2">💡</span>
                ハイライト一覧 ({book.highlights?.length || 0}個)
              </h4>
              {(book.highlights?.length || 0) > 1 && (
                <button
                  onClick={handleToggleHighlights}
                  className="text-xs font-medium text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-100 px-3 py-1 rounded-full transition-all duration-200 border border-green-200 hover:border-green-300"
                >
                  {showAllHighlights ? `折りたたむ` : `全て表示 (${book.highlights?.length || 0})`}
                </button>
              )}
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {(showAllHighlights ? book.highlights : book.highlights.slice(0, 1)).map((highlight, index) => (
                <div 
                  key={index}
                  className={`transform transition-all duration-300 ${
                    showAllHighlights && index > 0 ? 'animate-fade-in' : ''
                  }`}
                >
                  <blockquote 
                    className="text-xs text-gray-700 border-l-4 border-green-400 pl-4 py-2 italic leading-relaxed bg-gradient-to-r from-green-50 to-emerald-50 rounded-r-lg hover:from-green-100 hover:to-emerald-100 transition-colors duration-200"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-green-600 font-medium text-xs">#{index + 1}</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(highlight);
                          // 簡単なフィードバック
                          const button = document.activeElement as HTMLButtonElement;
                          if (button) {
                            const originalText = button.textContent;
                            button.textContent = '✓';
                            button.className = button.className.replace('text-green-500', 'text-green-600');
                            setTimeout(() => {
                              button.textContent = originalText;
                              button.className = button.className.replace('text-green-600', 'text-green-500');
                            }, 1000);
                          }
                        }}
                        className="text-green-500 hover:text-green-700 text-xs transition-colors duration-200"
                        title="ハイライトをコピー"
                      >
                        📋
                      </button>
                    </div>
                    <div className="text-gray-800 leading-relaxed">
                      {highlight.length > 150 && !showAllHighlights
                        ? `${highlight.substring(0, 150)}...` 
                        : highlight
                      }
                    </div>
                  </blockquote>
                </div>
              ))}
            </div>
            {showAllHighlights && (book.highlights?.length || 0) > 3 && (
              <div className="mt-3 text-center">
                <button
                  onClick={() => setShowAllHighlights(false)}
                  className="text-xs font-medium text-green-600 hover:text-green-800 bg-green-50 hover:bg-green-100 px-4 py-2 rounded-full transition-all duration-200 border border-green-200 hover:border-green-300"
                >
                  ↑ 折りたたむ
                </button>
              </div>
            )}
          </div>
        )}
        
        <div className="flex space-x-3">
          <a
            href={book.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-sm font-semibold py-3 px-4 rounded-xl transition-all duration-300 text-center flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span className="mr-2">🛒</span>
            Amazon で見る
          </a>
          <button
            onClick={() => {
              navigator.clipboard.writeText(book.amazonUrl);
              alert('リンクをコピーしました！');
            }}
            className="bg-gradient-to-r from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 text-green-700 text-sm font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 border border-green-200 hover:border-green-300"
            title="リンクをコピー"
          >
            🔗
          </button>
        </div>
      </div>
    </div>
  );
} 