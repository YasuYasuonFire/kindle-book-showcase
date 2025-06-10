# Test info

- Name: 100種類の検索単語テスト >> 検索テスト 11: "人材"
- Location: /Users/yasuyasu/Documents/Obsidian Vault/output/kindle-book-showcase/search-100-words.spec.js:45:5

# Error details

```
Error: page.waitForSelector: Target page, context or browser has been closed
Call log:
  - waiting for locator(':text("総書籍数")') to be visible

    at /Users/yasuyasu/Documents/Obsidian Vault/output/kindle-book-showcase/search-100-words.spec.js:41:16
```

# Test source

```ts
   1 | const { test, expect } = require('@playwright/test');
   2 |
   3 | // 100種類の検索単語
   4 | const searchTerms = [
   5 |   // ビジネス・マネジメント関連
   6 |   "マネジメント", "リーダーシップ", "プロジェクト", "戦略", "組織",
   7 |   "コミュニケーション", "チーム", "目標", "成果", "評価",
   8 |   "人材", "採用", "育成", "研修", "スキル", "能力", "成長",
   9 |   "生産性", "効率", "改善",
  10 |   
  11 |   // 技術・エンジニア関連
  12 |   "エンジニア", "開発", "プログラミング", "システム", "データ",
  13 |   "AI", "機械学習", "自動化", "設計", "アーキテクチャ",
  14 |   "コード", "テスト", "品質", "セキュリティ", "インフラ",
  15 |   "クラウド", "DevOps", "アジャイル", "スクラム", "CI/CD",
  16 |   
  17 |   // キャリア・働き方関連
  18 |   "キャリア", "転職", "昇進", "昇格", "出世",
  19 |   "働き方", "ワークライフバランス", "リモートワーク", "在宅勤務",
  20 |   "フリーランス", "副業", "起業", "独立", "スタートアップ",
  21 |   "ベンチャー", "イノベーション", "創造性", "企画", "提案", "プレゼン",
  22 |   
  23 |   // お金・投資関連
  24 |   "投資", "資産", "運用", "株式", "債券", "不動産",
  25 |   "仮想通貨", "暗号資産", "FX", "為替", "金融", "経済",
  26 |   "市場", "分析", "リスク", "リターン", "ポートフォリオ",
  27 |   "分散投資", "長期投資", "短期投資",
  28 |   
  29 |   // その他・一般関連
  30 |   "思考", "判断", "決断", "問題解決", "課題", "解決",
  31 |   "コミュニティ", "ネットワーク", "関係", "信頼", "協力",
  32 |   "学習", "知識", "スキルアップ", "自己啓発", "成長",
  33 |   "時間", "効率", "生産性", "最適化", "改善",
  34 |   "健康", "ストレス", "メンタル", "バランス", "ライフスタイル"
  35 | ];
  36 |
  37 | test.describe('100種類の検索単語テスト', () => {
  38 |   test.beforeEach(async ({ page }) => {
  39 |     await page.goto('http://localhost:3000');
  40 |     // データ読み込み完了を待つ
> 41 |     await page.waitForSelector(':text("総書籍数")', { timeout: 30000 });
     |                ^ Error: page.waitForSelector: Target page, context or browser has been closed
  42 |   });
  43 |
  44 |   searchTerms.forEach((searchTerm, index) => {
  45 |     test(`検索テスト ${index + 1}: "${searchTerm}"`, async ({ page }) => {
  46 |       // 検索フォームをクリアしてから入力
  47 |       const searchInput = page.locator('textbox[aria-label*="書籍を検索"]');
  48 |       await searchInput.clear();
  49 |       await searchInput.fill(searchTerm);
  50 |       
  51 |       // 検索結果が表示されるのを少し待つ
  52 |       await page.waitForTimeout(500);
  53 |       
  54 |       // 結果表示を確認
  55 |       const resultElement = page.locator(':text("冊の書籍が見つかりました")');
  56 |       await expect(resultElement).toBeVisible();
  57 |       
  58 |       // 結果をログに出力
  59 |       const resultText = await resultElement.textContent();
  60 |       console.log(`検索語: "${searchTerm}" - 結果: ${resultText}`);
  61 |     });
  62 |   });
  63 | }); 
```