import React from 'react';
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

const categoryColors: { [key: string]: string } = {
  'マネジメント・リーダーシップ': 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg',
  '技術・エンジニア': 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg',
  'お金・投資': 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-lg',
  'キャリア・働き方': 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg',
  '組織・職場環境': 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg',
  'その他': 'bg-gradient-to-r from-gray-500 to-slate-500 text-white shadow-lg',
};

export default function BookCard({ book }: BookCardProps) {
  const categoryColor = categoryColors[book.category] || categoryColors['その他'];

  return (
    <div className="book-card group overflow-hidden transition-all duration-500 hover:scale-[1.02]">
      <div className="relative">
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-2xl">
          <Image
            src={book.bookImageUrl}
            alt={`${book.title}の表紙`}
            width={600}
            height={900}
            className="w-full h-80 object-contain group-hover:scale-110 transition-all duration-700 ease-out"
            unoptimized
            priority={false}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            style={{
              objectFit: 'contain',
              objectPosition: 'center',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="w-full h-72 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <div class="text-center text-gray-500">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
      
      <div className="px-6 pt-4 pb-6">
        <h3 className="font-bold text-xl text-gray-900 line-clamp-2 leading-tight min-h-[3.5rem] mb-3 group-hover:text-purple-700 transition-colors duration-300">
          {book.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 truncate font-medium">
          <span className="text-gray-500">著者:</span> {book.author}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
            <span className="text-blue-500 mr-1">📝</span>
            <span className="font-semibold text-blue-700">{book.highlightsCount}</span>
            <span className="ml-1 text-blue-600">ハイライト</span>
          </span>
          <span className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
            <span className="text-gray-500 mr-1">📅</span>
            <span className="font-medium">{new Date(book.lastAnnotatedDate).toLocaleDateString('ja-JP')}</span>
          </span>
        </div>
        
        {book.highlights && book.highlights.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <span className="text-yellow-500 mr-2">💡</span>
              主なハイライト
            </h4>
            <div className="space-y-2">
              {book.highlights.slice(0, 1).map((highlight, index) => (
                <blockquote 
                  key={index} 
                  className="text-xs text-gray-700 border-l-4 border-gradient-to-b from-purple-400 to-pink-400 pl-3 italic leading-relaxed bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-r-lg"
                  style={{
                    borderImage: 'linear-gradient(to bottom, #a855f7, #ec4899) 1'
                  }}
                >
                  {highlight.length > 120 
                    ? `${highlight.substring(0, 120)}...` 
                    : highlight
                  }
                </blockquote>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex space-x-3">
          <a
            href={book.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-sm font-semibold py-3 px-4 rounded-xl transition-all duration-300 text-center flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span className="mr-2">🛒</span>
            Amazon で見る
          </a>
          <button
            onClick={() => {
              navigator.clipboard.writeText(book.amazonUrl);
              alert('リンクをコピーしました！');
            }}
            className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 text-sm font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            title="リンクをコピー"
          >
            🔗
          </button>
        </div>
      </div>
    </div>
  );
} 