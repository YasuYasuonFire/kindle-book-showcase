'use client';

import React from 'react';
import BookCard from './BookCard';

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

interface RecentArticlesProps {
  books: Book[];
}

export default function RecentArticles({ books }: RecentArticlesProps) {
  // Sort books by lastAnnotatedDate (most recent first) and take top 5
  const recentBooks = books
    .sort((a, b) => new Date(b.lastAnnotatedDate).getTime() - new Date(a.lastAnnotatedDate).getTime())
    .slice(0, 5);

  if (recentBooks.length === 0) {
    return null;
  }

  return (
    <div className="recent-articles-section mb-12">
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100 shadow-lg">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
            <span className="text-2xl">✨</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">最近の新着</h2>
            <p className="text-gray-600">最新の5冊のハイライト</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {recentBooks.map((book, index) => (
            <div 
              key={book.id} 
              className="fade-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}