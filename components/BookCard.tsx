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
  'マネジメント・リーダーシップ': 'bg-blue-100 text-blue-800',
  '技術・エンジニア': 'bg-green-100 text-green-800',
  'お金・投資': 'bg-yellow-100 text-yellow-800',
  'キャリア・働き方': 'bg-purple-100 text-purple-800',
  '組織・職場環境': 'bg-indigo-100 text-indigo-800',
  'その他': 'bg-gray-100 text-gray-800',
};

export default function BookCard({ book }: BookCardProps) {
  const categoryColor = categoryColors[book.category] || categoryColors['その他'];

  return (
    <div className="book-card group overflow-hidden bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
      <div className="relative">
        <div className="relative overflow-hidden">
          <Image
            src={book.bookImageUrl}
            alt={`${book.title}の表紙`}
            width={400}
            height={600}
            className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
            priority={false}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center top'
            }}
          />
          <div className="absolute top-3 right-3">
            <span className={`category-badge ${categoryColor} shadow-sm`}>
              {book.category}
            </span>
          </div>
        </div>
      </div>
      
      <div className="px-4 pt-2 pb-4">
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 leading-tight min-h-[3.5rem] mb-2">
          {book.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-2 truncate">
          著者: {book.author}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <span className="flex items-center">
            📝 <span className="ml-1 font-medium">{book.highlightsCount}</span> ハイライト
          </span>
          <span className="flex items-center">
            📅 <span className="ml-1">{new Date(book.lastAnnotatedDate).toLocaleDateString('ja-JP')}</span>
          </span>
        </div>
        
        {book.highlights && book.highlights.length > 0 && (
          <div className="mb-3">
            <h4 className="text-sm font-medium text-gray-700 mb-1.5 flex items-center">
              💡 主なハイライト
            </h4>
            <div className="space-y-1">
              {book.highlights.slice(0, 1).map((highlight, index) => (
                <blockquote 
                  key={index} 
                  className="text-xs text-gray-600 border-l-2 border-blue-200 pl-2 italic leading-relaxed bg-gray-50 p-2 rounded-r"
                >
                  {highlight.length > 100 
                    ? `${highlight.substring(0, 100)}...` 
                    : highlight
                  }
                </blockquote>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex space-x-2">
          <a
            href={book.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2.5 px-3 rounded-md transition-colors duration-200 text-center flex items-center justify-center shadow-sm hover:shadow-md"
          >
            🛒 Amazon で見る
          </a>
          <button
            onClick={() => {
              navigator.clipboard.writeText(book.amazonUrl);
              alert('リンクをコピーしました！');
            }}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2.5 px-3 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
            title="リンクをコピー"
          >
            🔗
          </button>
        </div>
      </div>
    </div>
  );
} 