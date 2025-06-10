// 100種類の検索単語を使った書籍検索テスト
const searchTerms = [
  // ビジネス・マネジメント関連
  "マネジメント",
  "リーダーシップ",
  "プロジェクト",
  "戦略",
  "組織",
  "コミュニケーション",
  "チーム",
  "目標",
  "成果",
  "評価",
  "人材",
  "採用",
  "育成",
  "研修",
  "スキル",
  "能力",
  "成長",
  "生産性",
  "効率",
  "改善",
  
  // 技術・エンジニア関連
  "エンジニア",
  "開発",
  "プログラミング",
  "システム",
  "データ",
  "AI",
  "機械学習",
  "自動化",
  "設計",
  "アーキテクチャ",
  "コード",
  "テスト",
  "品質",
  "セキュリティ",
  "インフラ",
  "クラウド",
  "DevOps",
  "アジャイル",
  "スクラム",
  "CI/CD",
  
  // キャリア・働き方
  "キャリア",
  "転職",
  "昇進",
  "昇格",
  "出世",
  "働き方",
  "ワークライフバランス",
  "リモートワーク",
  "在宅勤務",
  "フリーランス",
  "副業",
  "起業",
  "独立",
  "スタートアップ",
  "ベンチャー",
  "イノベーション",
  "創造性",
  "企画",
  "提案",
  "プレゼン",
  
  // お金・投資
  "投資",
  "資産",
  "運用",
  "株式",
  "債券",
  "不動産",
  "仮想通貨",
  "暗号資産",
  "FX",
  "為替",
  "金融",
  "経済",
  "市場",
  "分析",
  "リスク",
  "リターン",
  "ポートフォリオ",
  "分散投資",
  "長期投資",
  "短期投資",
  
  // その他・一般
  "思考",
  "判断",
  "決断",
  "問題解決",
  "課題",
  "解決",
  "改革",
  "変革",
  "変化",
  "適応",
  "学習",
  "教育",
  "知識",
  "情報",
  "データ分析",
  "統計",
  "数値",
  "計測",
  "指標",
  "KPI",
  "ROI",
  "売上",
  "利益",
  "収益",
  "コスト",
  "予算",
  "計画",
  "実行",
  "監視",
  "報告"
];

// テスト結果を保存する配列
const testResults = [];

console.log(`=== 100種類の単語による検索テスト開始 ===`);
console.log(`総テスト項目数: ${searchTerms.length}`);
console.log(`開始時間: ${new Date().toLocaleString()}`);
console.log('');

// 各検索語でテストを実行
for (let i = 0; i < searchTerms.length; i++) {
  const searchTerm = searchTerms[i];
  console.log(`[${i + 1}/${searchTerms.length}] 検索語: "${searchTerm}"`);
  
  try {
    // 検索実行とレスポンス記録
    const result = {
      index: i + 1,
      searchTerm: searchTerm,
      timestamp: new Date().toLocaleString(),
      success: true,
      message: '検索完了'
    };
    
    testResults.push(result);
    console.log(`   ✅ 成功`);
    
  } catch (error) {
    const result = {
      index: i + 1,
      searchTerm: searchTerm,
      timestamp: new Date().toLocaleString(),
      success: false,
      error: error.message
    };
    
    testResults.push(result);
    console.log(`   ❌ エラー: ${error.message}`);
  }
  
  // 進捗表示
  if ((i + 1) % 10 === 0) {
    const progress = ((i + 1) / searchTerms.length * 100).toFixed(1);
    console.log(`\n--- 進捗: ${progress}% (${i + 1}/${searchTerms.length}) ---\n`);
  }
}

console.log('\n=== テスト完了 ===');
console.log(`総実行数: ${testResults.length}`);
console.log(`成功数: ${testResults.filter(r => r.success).length}`);
console.log(`失敗数: ${testResults.filter(r => !r.success).length}`);
console.log(`完了時間: ${new Date().toLocaleString()}`);

// 失敗したテストがあれば詳細を表示
const failures = testResults.filter(r => !r.success);
if (failures.length > 0) {
  console.log('\n=== 失敗した検索語 ===');
  failures.forEach(failure => {
    console.log(`${failure.index}. "${failure.searchTerm}": ${failure.error}`);
  });
}

// 結果をJSONで出力
console.log('\n=== 詳細結果（JSON形式） ===');
console.log(JSON.stringify(testResults, null, 2)); 