import type { Metadata } from 'next'
import './globals.css'
import AccessCounter from '@/components/AccessCounter'

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
      <body className="min-h-screen font-inter text-gray-900 antialiased">
        <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <span className="text-2xl">📚</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                    Kindle書籍コレクション
                  </h1>
                  <p className="text-base text-gray-600 mt-1 font-medium">
                    ビジネス・自己啓発書を中心とした厳選書籍の紹介
                  </p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <div className="bg-white/60 backdrop-blur-sm rounded-xl px-4 py-2 shadow-md">
                  <div className="text-sm text-gray-600 font-medium">
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">80+</span>
                    <span className="ml-1">冊を掲載</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {children}
        </main>
        
        <footer className="bg-white/80 backdrop-blur-lg border-t border-white/20 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-lg">📚</span>
                </div>
                <span className="text-lg font-semibold text-gray-800">Kindle書籍コレクション</span>
              </div>
              <div className="text-gray-600 text-sm space-y-2 max-w-md mx-auto">
                <p className="font-medium">このサイトはKindleで読んだ書籍の個人的なコレクションです。</p>
                <p>書籍の詳細情報は各Amazonリンクからご確認ください。</p>
              </div>
              
              {/* フッターにもアクセスカウンター */}
              <div className="mt-8 flex justify-center">
                <AccessCounter className="retro-footer-counter" />
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
} 