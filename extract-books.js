const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const kindleDir = path.join(__dirname, '../../kindle');
const outputFile = path.join(__dirname, 'data/books.json');

function enhanceImageUrl(originalUrl) {
  if (!originalUrl) return originalUrl;
  
  // Amazonの画像URLの解像度を高くする
  // _SY160.jpg → _SY400.jpg に変更
  // より高解像度で鮮明な画像を取得
  const highResUrl = originalUrl
    .replace('_SY160.jpg', '_SY400.jpg')
    .replace('_SL160.jpg', '_SL400.jpg')
    .replace('_SX160.jpg', '_SX400.jpg');
    
  return highResUrl;
}

function extractBookData() {
  const books = [];
  
  try {
    const files = fs.readdirSync(kindleDir);
    
    files.forEach(file => {
      if (file.endsWith('.md')) {
        const filePath = path.join(kindleDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // YAML frontmatterを抽出
        const yamlMatch = content.match(/^---\n([\s\S]*?)\n---/);
        if (yamlMatch) {
          try {
            const yamlContent = yaml.load(yamlMatch[1]);
            const kindleSync = yamlContent['kindle-sync'];
            
            if (kindleSync) {
              // ハイライトを抽出
              const highlightMatches = content.match(/## Highlights\n([\s\S]*?)(?=\n---\n|$)/);
              let highlights = [];
              
              if (highlightMatches) {
                const highlightText = highlightMatches[1];
                highlights = highlightText
                  .split('\n---\n')
                  .map(h => h.trim())
                  .filter(h => h.length > 0)
                  .slice(0, 3); // 最初の3つのハイライトのみ
              }
              
              // カテゴリを推測（ファイル名から）
              let category = 'その他';
              const title = kindleSync.title.toLowerCase();
              if (title.includes('マネジ') || title.includes('リーダー') || title.includes('チーム')) {
                category = 'マネジメント・リーダーシップ';
              } else if (title.includes('エンジニア') || title.includes('技術') || title.includes('プログラミング')) {
                category = '技術・エンジニア';
              } else if (title.includes('お金') || title.includes('投資') || title.includes('経済')) {
                category = 'お金・投資';
              } else if (title.includes('仕事') || title.includes('働き方') || title.includes('キャリア')) {
                category = 'キャリア・働き方';
              } else if (title.includes('組織') || title.includes('職場')) {
                category = '組織・職場環境';
              }
              
              const book = {
                id: kindleSync.bookId,
                title: kindleSync.title,
                author: kindleSync.author,
                asin: kindleSync.asin,
                bookImageUrl: enhanceImageUrl(kindleSync.bookImageUrl), // 高解像度画像に変換
                highlightsCount: kindleSync.highlightsCount || 0,
                lastAnnotatedDate: kindleSync.lastAnnotatedDate,
                amazonUrl: `https://www.amazon.co.jp/dp/${kindleSync.asin}`,
                category: category,
                highlights: highlights,
                fileName: file.replace('.md', '')
              };
              
              books.push(book);
            }
          } catch (err) {
            console.warn(`Error parsing YAML in ${file}:`, err.message);
          }
        }
      }
    });
    
    // カテゴリとタイトルでソート
    books.sort((a, b) => {
      if (a.category !== b.category) {
        return a.category.localeCompare(b.category);
      }
      return a.title.localeCompare(b.title);
    });
    
    // outputディレクトリを作成
    const outputDir = path.dirname(outputFile);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(outputFile, JSON.stringify(books, null, 2), 'utf-8');
    console.log(`書籍データを抽出しました: ${books.length}冊`);
    console.log(`ファイル保存先: ${outputFile}`);
    console.log('📸 画像解像度を高解像度版（400px）に向上しました');
    
    // カテゴリ別統計
    const categoryStats = books.reduce((acc, book) => {
      acc[book.category] = (acc[book.category] || 0) + 1;
      return acc;
    }, {});
    
    console.log('\nカテゴリ別統計:');
    Object.entries(categoryStats).forEach(([category, count]) => {
      console.log(`  ${category}: ${count}冊`);
    });
    
  } catch (error) {
    console.error('書籍データの抽出中にエラーが発生しました:', error);
  }
}

// スクリプトが直接実行された場合
if (require.main === module) {
  extractBookData();
}

module.exports = { extractBookData }; 