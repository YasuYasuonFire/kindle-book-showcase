'use client';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  highlights: string[];
  lastAnnotatedDate: string;
  highlightsCount: number;
}

interface HighlightInsightsProps {
  books: Book[];
}

interface KeywordData {
  word: string;
  count: number;
  percentage: number;
}

interface CategoryData {
  category: string;
  count: number;
  percentage: number;
  avgHighlights: number;
}

export default function HighlightInsights({ books }: HighlightInsightsProps) {
  // キーワード分析
  const getTopKeywords = (): KeywordData[] => {
    const wordCount = new Map<string, number>();
    const stopWords = new Set(['ある', 'いる', 'する', 'なる', 'もの', 'こと', 'とき', 'ところ', 'それ', 'これ', 'その', 'この', 'そして', 'また', 'しかし', 'では', 'から', 'まで', 'として', 'について', 'における', 'によって', 'に対して', 'という', 'といった', 'である', 'です', 'ます', 'だ', 'の', 'に', 'を', 'が', 'は', 'で', 'と', 'も', 'か', 'や']);

    books.forEach(book => {
      book.highlights.forEach(highlight => {
        // 日本語の単語を抽出
        const words = highlight
          .replace(/[^\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u3400-\u4DBF]/g, ' ')
          .split(/\s+/)
          .filter(word => word.length >= 2 && !stopWords.has(word));

        words.forEach(word => {
          wordCount.set(word, (wordCount.get(word) || 0) + 1);
        });
      });
    });

    const totalWords = Array.from(wordCount.values()).reduce((sum, count) => sum + count, 0);
    
    return Array.from(wordCount.entries())
      .filter(([_, count]) => count >= 3)
      .map(([word, count]) => ({
        word,
        count,
        percentage: Math.round((count / totalWords) * 100 * 100) / 100
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  };

  // カテゴリ別分析
  const getCategoryData = (): CategoryData[] => {
    const categoryMap = new Map<string, { count: number; totalHighlights: number }>();

    books.forEach(book => {
      const current = categoryMap.get(book.category) || { count: 0, totalHighlights: 0 };
      current.count += 1;
      current.totalHighlights += book.highlightsCount;
      categoryMap.set(book.category, current);
    });

    return Array.from(categoryMap.entries())
      .map(([category, data]) => ({
        category,
        count: data.count,
        percentage: Math.round((data.count / books.length) * 100),
        avgHighlights: Math.round(data.totalHighlights / data.count)
      }))
      .sort((a, b) => b.count - a.count);
  };

  // 基本統計
  const totalHighlights = books.reduce((sum, book) => sum + book.highlightsCount, 0);
  const avgHighlights = Math.round(totalHighlights / books.length);
  const topKeywords = getTopKeywords();
  const categoryData = getCategoryData();

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white">
        <h2 className="text-2xl font-bold flex items-center">
          <span className="text-3xl mr-3">📈</span>
          ハイライト インサイト
        </h2>
        <p className="mt-2 opacity-90">あなたの読書データから見える傾向と洞察</p>
      </div>

      <div className="p-6 space-y-8">
        {/* 基本統計 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📊</span>
            基本統計
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
              <div className="text-3xl font-bold text-green-600">{totalHighlights}</div>
              <div className="text-sm text-gray-600">総ハイライト数</div>
            </div>
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-4 border border-emerald-200">
              <div className="text-3xl font-bold text-emerald-600">{books.length}</div>
              <div className="text-sm text-gray-600">総書籍数</div>
            </div>
            <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-lg p-4 border border-teal-200">
              <div className="text-3xl font-bold text-teal-600">{avgHighlights}</div>
              <div className="text-sm text-gray-600">平均ハイライト数/冊</div>
            </div>
          </div>
        </div>

        {/* キーワード分析 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">💭</span>
            よく使われるキーワード Top 10
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {topKeywords.map((item, index) => (
              <div
                key={item.word}
                className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-green-800">#{index + 1}</span>
                  <span className="bg-green-600 text-white px-2 py-1 rounded-full text-sm">
                    {item.count}回
                  </span>
                </div>
                <div className="text-lg font-bold text-gray-800">{item.word}</div>
                <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${Math.min((item.count / topKeywords[0]?.count) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* カテゴリ別分析 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📋</span>
            カテゴリ別分析
          </h3>
          <div className="space-y-3">
            {categoryData.map((category, index) => (
              <div
                key={category.category}
                className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-green-800">{category.category}</h4>
                  <div className="flex space-x-2">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                      {category.count}冊
                    </span>
                    <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm">
                      平均{category.avgHighlights}ハイライト
                    </span>
                  </div>
                </div>
                <div className="w-full bg-green-200 rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  全書籍の{category.percentage}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 読書傾向の提案 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">💡</span>
            読書傾向の洞察
          </h3>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <h4 className="font-semibold text-gray-800">最も興味のあるカテゴリ</h4>
                  <p className="text-gray-600">
                    「{categoryData[0]?.category}」に最も多く読書している（{categoryData[0]?.count}冊、{categoryData[0]?.percentage}%）
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📝</span>
                <div>
                  <h4 className="font-semibold text-gray-800">ハイライト習慣</h4>
                  <p className="text-gray-600">
                    1冊あたり平均{avgHighlights}個のハイライトを作成している
                    {avgHighlights > 10 ? '（積極的な読書習慣）' : avgHighlights > 5 ? '（標準的な読書習慣）' : '（さらっと読む習慣）'}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🔑</span>
                <div>
                  <h4 className="font-semibold text-gray-800">関心キーワード</h4>
                  <p className="text-gray-600">
                    「{topKeywords[0]?.word}」「{topKeywords[1]?.word}」「{topKeywords[2]?.word}」などに特に関心を持っている
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}