const { test, expect } = require('@playwright/test');

// 100種類の検索単語
const searchTerms = [
  // ビジネス・マネジメント関連
  "マネジメント", "リーダーシップ", "プロジェクト", "戦略", "組織",
  "コミュニケーション", "チーム", "目標", "成果", "評価",
  "人材", "採用", "育成", "研修", "スキル", "能力", "成長",
  "生産性", "効率", "改善",
  
  // 技術・エンジニア関連
  "エンジニア", "開発", "プログラミング", "システム", "データ",
  "AI", "機械学習", "自動化", "設計", "アーキテクチャ",
  "コード", "テスト", "品質", "セキュリティ", "インフラ",
  "クラウド", "DevOps", "アジャイル", "スクラム", "CI/CD",
  
  // キャリア・働き方関連
  "キャリア", "転職", "昇進", "昇格", "出世",
  "働き方", "ワークライフバランス", "リモートワーク", "在宅勤務",
  "フリーランス", "副業", "起業", "独立", "スタートアップ",
  "ベンチャー", "イノベーション", "創造性", "企画", "提案", "プレゼン",
  
  // お金・投資関連
  "投資", "資産", "運用", "株式", "債券", "不動産",
  "仮想通貨", "暗号資産", "FX", "為替", "金融", "経済",
  "市場", "分析", "リスク", "リターン", "ポートフォリオ",
  "分散投資", "長期投資", "短期投資",
  
  // その他・一般関連
  "思考", "判断", "決断", "問題解決", "課題", "解決",
  "コミュニティ", "ネットワーク", "関係", "信頼", "協力",
  "学習", "知識", "スキルアップ", "自己啓発", "成長",
  "時間", "効率", "生産性", "最適化", "改善",
  "健康", "ストレス", "メンタル", "バランス", "ライフスタイル"
];

test.describe('100種類の検索単語テスト', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    // データ読み込み完了を待つ
    await page.waitForSelector(':text("総書籍数")', { timeout: 30000 });
  });

  searchTerms.forEach((searchTerm, index) => {
    test(`検索テスト ${index + 1}: "${searchTerm}"`, async ({ page }) => {
      // 検索フォームをクリアしてから入力
      const searchInput = page.locator('textbox[aria-label*="書籍を検索"]');
      await searchInput.clear();
      await searchInput.fill(searchTerm);
      
      // 検索結果が表示されるのを少し待つ
      await page.waitForTimeout(500);
      
      // 結果表示を確認
      const resultElement = page.locator(':text("冊の書籍が見つかりました")');
      await expect(resultElement).toBeVisible();
      
      // 結果をログに出力
      const resultText = await resultElement.textContent();
      console.log(`検索語: "${searchTerm}" - 結果: ${resultText}`);
    });
  });
}); 