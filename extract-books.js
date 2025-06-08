const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const kindleDir = path.join(__dirname, '../../kindle');
const outputFile = path.join(__dirname, 'data/books.json');

function enhanceImageUrl(originalUrl) {
  if (!originalUrl) return originalUrl;
  
  // Amazonの画像URLの解像度を最大化する
  // 様々なサイズパターンに対応し、可能な限り高解像度版を取得
  let highResUrl = originalUrl
    // 標準的なサイズを高解像度に変換
    .replace(/_SY160\./g, '_SY600.')
    .replace(/_SL160\./g, '_SL600.')
    .replace(/_SX160\./g, '_SX600.')
    .replace(/_SY200\./g, '_SY600.')
    .replace(/_SL200\./g, '_SL600.')
    .replace(/_SX200\./g, '_SX600.')
    .replace(/_SY300\./g, '_SY600.')
    .replace(/_SL300\./g, '_SL600.')
    .replace(/_SX300\./g, '_SX600.')
    .replace(/_SY400\./g, '_SY600.')
    .replace(/_SL400\./g, '_SL600.')
    .replace(/_SX400\./g, '_SX600.');
  
  // サイズ指定がない場合は高解像度を追加
  if (!highResUrl.includes('_S[YLX]')) {
    highResUrl = highResUrl.replace(/\.jpg$/i, '_SY600.jpg');
  }
    
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
              const highlightMatches = content.match(/## Highlights\n([\s\S]*?)$/);
              let highlights = [];
              
              if (highlightMatches) {
                const highlightText = highlightMatches[1];
                // 最後の空の --- を除去してから分割
                const cleanHighlightText = highlightText.replace(/\n---\s*$/, '');
                highlights = cleanHighlightText
                  .split('\n---\n')
                  .map(h => h.trim())
                  .filter(h => h.length > 0); // すべてのハイライトを取得
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
    
    // カテゴリの表示順を定義（リーダーシップ・マネジメント系を上に、投資系を下に）
    const categoryOrder = {
      'マネジメント・リーダーシップ': 1,
      '技術・エンジニア': 2,
      'キャリア・働き方': 3,
      '組織・職場環境': 4,
      'その他': 5,
      'お金・投資': 6
    };

    // カテゴリの優先順位とタイトルでソート
    books.sort((a, b) => {
      if (a.category !== b.category) {
        const orderA = categoryOrder[a.category] || 999;
        const orderB = categoryOrder[b.category] || 999;
        return orderA - orderB;
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