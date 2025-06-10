const { test, expect } = require('@playwright/test');

test.describe('Kindle書籍コレクション サイトテスト', () => {
  
  test.beforeEach(async ({ page }) => {
    // 各テストの前にサイトにアクセス
    await page.goto('http://localhost:3000');
  });

  test('ページのタイトルとヘッダーが正しく表示される', async ({ page }) => {
    // ページタイトルの確認
    await expect(page).toHaveTitle('Kindle書籍コレクション | ビジネス・自己啓発書の紹介');
    
    // メインヘッダーの確認
    await expect(page.locator('h1')).toContainText('Kindle書籍コレクション');
    
    // サブタイトルの確認
    await expect(page.getByText('ビジネス・自己啓発書を中心とした厳選書籍の紹介')).toBeVisible();
  });

  test('統計情報が正しく表示される', async ({ page }) => {
    // 総書籍数の確認
    await expect(page.getByText('89')).toBeVisible();
    await expect(page.getByText('総書籍数')).toBeVisible();
    
    // 総ハイライト数の確認
    await expect(page.getByText('335')).toBeVisible();
    await expect(page.getByText('総ハイライト数')).toBeVisible();
    
    // カテゴリ数の確認
    await expect(page.getByText('6')).toBeVisible();
    await expect(page.getByText('カテゴリ数')).toBeVisible();
    
    // 平均ハイライト数の確認
    await expect(page.getByText('4')).toBeVisible();
    await expect(page.getByText('平均ハイライト数')).toBeVisible();
  });

  test('検索機能のテスト', async ({ page }) => {
    // 検索ボックスが表示されていることを確認
    const searchBox = page.getByPlaceholder('🔍 書籍を検索');
    await expect(searchBox).toBeVisible();
    
    // 検索テストを実行
    await searchBox.fill('マネジメント');
    
    // 検索結果が表示されることを確認
    await page.waitForTimeout(1000); // 検索結果の表示を待つ
    
    // マネジメント関連の書籍が表示されることを確認
    await expect(page.getByText('マネジメント・リーダーシップ')).toBeVisible();
  });

  test('カテゴリフィルターのテスト', async ({ page }) => {
    // カテゴリ選択ボックスが表示されていることを確認
    const categorySelect = page.locator('select').first();
    await expect(categorySelect).toBeVisible();
    
    // 「技術・エンジニア」カテゴリを選択
    await categorySelect.selectOption('技術・エンジニア');
    
    // フィルター結果を待つ
    await page.waitForTimeout(1000);
    
    // 技術・エンジニアカテゴリの書籍が表示されることを確認
    await expect(page.getByText('技術・エンジニア')).toBeVisible();
  });

  test('書籍カードの表示内容をテスト', async ({ page }) => {
    // 最初の書籍カードを取得
    const firstBookCard = page.locator('.grid > div').first();
    
    // 書籍カードが表示されていることを確認
    await expect(firstBookCard).toBeVisible();
    
    // 書籍の各要素が含まれていることを確認
    await expect(firstBookCard.locator('img')).toBeVisible(); // 書籍画像
    await expect(firstBookCard.locator('h3')).toBeVisible(); // 書籍タイトル
    await expect(firstBookCard.getByText('著者:')).toBeVisible(); // 著者情報
    await expect(firstBookCard.getByText('ハイライト')).toBeVisible(); // ハイライト数
    await expect(firstBookCard.getByText('Amazon で見る')).toBeVisible(); // Amazonリンク
  });

  test('Amazonリンクのテスト', async ({ page }) => {
    // 最初のAmazonリンクを確認
    const amazonLink = page.getByRole('link', { name: '🛒 Amazon で見る' }).first();
    await expect(amazonLink).toBeVisible();
    
    // リンクのhref属性を確認（実際にクリックはしない）
    const href = await amazonLink.getAttribute('href');
    expect(href).toContain('amazon.co.jp');
  });

  test('ハイライト表示機能のテスト', async ({ page }) => {
    // 最初の「全て表示」ボタンを見つけてクリック
    const showAllButton = page.getByRole('button', { name: /全て表示/ }).first();
    await expect(showAllButton).toBeVisible();
    
    // ボタンをクリック
    await showAllButton.click();
    
    // ハイライトが表示されることを確認
    await expect(page.locator('blockquote')).toBeVisible();
  });

  test('レスポンシブデザインのテスト', async ({ page }) => {
    // デスクトップサイズでの表示確認
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('h1')).toBeVisible();
    
    // タブレットサイズでの表示確認
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('h1')).toBeVisible();
    
    // モバイルサイズでの表示確認
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1')).toBeVisible();
  });

  test('ページのスクロールテスト', async ({ page }) => {
    // ページの最下部までスクロール
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    
    // フッターが表示されることを確認
    await expect(page.getByText('このサイトはKindleで読んだ書籍の個人的なコレクションです。')).toBeVisible();
    
    // ページトップに戻る
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    
    // ヘッダーが再び表示されることを確認
    await expect(page.locator('h1')).toBeVisible();
  });

  test('エラーハンドリングのテスト', async ({ page }) => {
    // 存在しない検索語でテスト
    const searchBox = page.getByPlaceholder('🔍 書籍を検索');
    await searchBox.fill('xyznotfoundtest123');
    
    await page.waitForTimeout(1000);
    
    // 検索結果が0件の場合の表示確認
    // （実装によっては「見つかりませんでした」などのメッセージが表示される）
  });

  test('パフォーマンステスト', async ({ page }) => {
    // ページの読み込み時間を測定
    const startTime = Date.now();
    await page.goto('http://localhost:3000');
    const loadTime = Date.now() - startTime;
    
    // 5秒以内に読み込まれることを確認
    expect(loadTime).toBeLessThan(5000);
    
    // 画像の読み込み確認
    const images = page.locator('img');
    const imageCount = await images.count();
    expect(imageCount).toBeGreaterThan(0);
  });
}); 