import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kindle書籍コレクション | ビジネス・自己啓発書の紹介',
  description: 'マネジメント、エンジニアリング、キャリアなど、厳選された良書のコレクションを紹介するサイトです。Amazon Kindleで読んだ書籍のハイライトや感想を共有しています。',
  keywords: 'Kindle, 書籍, ビジネス書, 自己啓発, マネジメント, エンジニア, キャリア',
  authors: [{ name: 'Book Curator' }],
  openGraph: {
    title: 'Kindle書籍コレクション',
    description: 'マネジメント、エンジニアリング、キャリアなど、厳選された良書のコレクション',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kindle書籍コレクション',
    description: 'マネジメント、エンジニアリング、キャリアなど、厳選された良書のコレクション',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 min-h-screen font-japanese">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  📚 Kindle書籍コレクション
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  ビジネス・自己啓発書を中心とした厳選書籍の紹介
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">
                  <span className="font-medium">80+</span> 冊を掲載
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        
        <footer className="bg-white border-t mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-600 text-sm">
              <p>このサイトはKindleで読んだ書籍の個人的なコレクションです。</p>
              <p className="mt-2">書籍の詳細情報は各Amazonリンクからご確認ください。</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
} 