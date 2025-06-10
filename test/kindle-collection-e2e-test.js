const { test, expect } = require('@playwright/test');

test.describe('Kindle書籍コレクション E2Eテスト', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    // データの読み込み完了を待つ
    await page.waitForSelector('text=総書籍数', { timeout: 10000 });
  });

  test('ページの基本構造と統計情報が正しく表示される', async ({ page }) => {
    // ページタイトルの確認
    await expect(page).toHaveTitle('Kindle書籍コレクション | ビジネス・自己啓発書の紹介');
    
    // メインヘッダーの確認
    await expect(page.locator('h1')).toContainText('Kindle書籍コレクション');
    
    // サブタイトルの確認
    await expect(page.getByText('ビジネス・自己啓発書を中心とした厳選書籍の紹介')).toBeVisible();
    
    // ヘッダーの統計情報
    await expect(page.getByText('80+')).toBeVisible();
    await expect(page.getByText('冊を掲載')).toBeVisible();
    
    // 統計カードの確認
    await expect(page.getByText('89')).toBeVisible();
    await expect(page.getByText('総書籍数')).toBeVisible();
    await expect(page.getByText('335')).toBeVisible();
    await expect(page.getByText('総ハイライト数')).toBeVisible();
    await expect(page.getByText('6')).toBeVisible();
    await expect(page.getByText('カテゴリ数')).toBeVisible();
    await expect(page.getByText('4')).toBeVisible();
    await expect(page.getByText('平均ハイライト数')).toBeVisible();
  });

  test('検索機能が正常に動作する', async ({ page }) => {
    // 検索ボックスの確認
    const searchBox = page.getByPlaceholder('書籍を検索');
    await expect(searchBox).toBeVisible();
    
    // 初期状態では89冊表示されることを確認
    await expect(page.getByText('89冊の書籍が見つかりました')).toBeVisible();
    
    // 「マネジメント」で検索
    await searchBox.fill('マネジメント');
    await page.waitForTimeout(500); // デバウンス待ち
    
    // 検索結果の確認
    await expect(page.getByText('8冊の書籍が見つかりました')).toBeVisible();
    
    // 検索結果に該当書籍が表示されることを確認
    await expect(page.getByText('マネジメント［エッセンシャル版］')).toBeVisible();
    await expect(page.getByText('HIGH OUTPUT MANAGEMENT')).toBeVisible();
    
    // 検索をクリア
    await searchBox.clear();
    await page.waitForTimeout(500);
    
    // 全書籍が再表示されることを確認
    await expect(page.getByText('89冊の書籍が見つかりました')).toBeVisible();
  });

  test('カテゴリ選択機能が正常に動作する', async ({ page }) => {
    // カテゴリセレクトボックスの確認
    const categorySelect = page.getByLabel('📋 カテゴリ');
    await expect(categorySelect).toBeVisible();
    
    // 「マネジメント・リーダーシップ」カテゴリを選択
    await categorySelect.selectOption('マネジメント・リーダーシップ');
    await page.waitForTimeout(500);
    
    // 該当する書籍のみが表示されることを確認
    const resultText = await page.locator('text=/\\d+冊の書籍が見つかりました/').textContent();
    expect(parseInt(resultText)).toBeGreaterThan(20); // マネジメント系書籍が20冊以上あることを確認
    
    // 表示された書籍がマネジメント・リーダーシップカテゴリであることを確認
    await expect(page.getByText('マネジメント・リーダーシップ').first()).toBeVisible();
    
    // 「技術・エンジニア」カテゴリを選択
    await categorySelect.selectOption('技術・エンジニア');
    await page.waitForTimeout(500);
    
    // 技術系書籍が表示されることを確認
    await expect(page.getByText('技術・エンジニア').first()).toBeVisible();
    
    // 「すべて」に戻す
    await categorySelect.selectOption('すべて');
    await page.waitForTimeout(500);
    
    // 全書籍が表示されることを確認
    await expect(page.getByText('89冊の書籍が見つかりました')).toBeVisible();
  });

  test('複合フィルター機能が正常に動作する', async ({ page }) => {
    // 検索とカテゴリを同時に適用
    await page.getByPlaceholder('書籍を検索').fill('マネジメント');
    await page.getByLabel('📋 カテゴリ').selectOption('技術・エンジニア');
    await page.waitForTimeout(500);
    
    // 結果が0冊になることを確認（マネジメント関連は技術・エンジニアカテゴリにない）
    await expect(page.getByText('0冊の書籍が見つかりました')).toBeVisible();
    await expect(page.getByText('書籍が見つかりません')).toBeVisible();
    
    // フィルターリセットボタンの確認
    const resetButton = page.getByRole('button', { name: 'フィルターをリセット' });
    await expect(resetButton).toBeVisible();
    
    // フィルターをリセット
    await resetButton.click();
    await page.waitForTimeout(500);
    
    // 全書籍が表示され、フィルターがクリアされることを確認
    await expect(page.getByText('89冊の書籍が見つかりました')).toBeVisible();
    await expect(page.getByPlaceholder('書籍を検索')).toHaveValue('');
    
    // カテゴリが「すべて」に戻ることを確認
    const categorySelect = page.getByLabel('📋 カテゴリ');
    await expect(categorySelect).toHaveValue('すべて');
  });

  test('書籍カード詳細情報が正しく表示される', async ({ page }) => {
    // 最初の書籍カードを確認
    const firstBookCard = page.locator('.book-card').first();
    
    // 書籍画像の確認
    await expect(firstBookCard.locator('img')).toBeVisible();
    
    // カテゴリラベルの確認
    await expect(firstBookCard.locator('text=/マネジメント・リーダーシップ|技術・エンジニア|キャリア・働き方|組織・職場環境|その他|お金・投資/')).toBeVisible();
    
    // 書籍タイトルの確認
    await expect(firstBookCard.locator('h3')).toBeVisible();
    
    // 著者情報の確認
    await expect(firstBookCard.locator('text=/著者:/')).toBeVisible();
    
    // ハイライト数の確認
    await expect(firstBookCard.locator('text=/\\d+ハイライト/')).toBeVisible();
    
    // 読了日の確認
    await expect(firstBookCard.locator('text=/20\\d{2}/')).toBeVisible();
    
    // Amazonリンクの確認
    const amazonLink = firstBookCard.getByRole('link', { name: /Amazon で見る/ });
    await expect(amazonLink).toBeVisible();
    await expect(amazonLink).toHaveAttribute('href', /amazon\.co\.jp/);
    await expect(amazonLink).toHaveAttribute('target', '_blank');
  });

  test('ハイライト表示機能が正常に動作する', async ({ page }) => {
    // 最初の書籍のハイライトを確認
    const firstBookCard = page.locator('.book-card').first();
    
    // ハイライトセクションが表示されることを確認
    await expect(firstBookCard.locator('text=/💡 ハイライト一覧/')).toBeVisible();
    
    // 最初のハイライトが表示されることを確認
    await expect(firstBookCard.locator('blockquote').first()).toBeVisible();
    
    // ハイライト番号が表示されることを確認
    await expect(firstBookCard.locator('text=#1')).toBeVisible();
    
    // コピーボタンが表示されることを確認
    await expect(firstBookCard.locator('button[aria-label*="コピー"], button:has-text("📋")').first()).toBeVisible();
    
    // 「全て表示」ボタンがある場合の確認
    const showAllButton = firstBookCard.locator('button:has-text("全て表示")');
    if (await showAllButton.count() > 0) {
      await expect(showAllButton).toBeVisible();
    }
  });

  test('レスポンシブ表示が正常に動作する', async ({ page }) => {
    // デスクトップサイズで開始
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('h1')).toBeVisible();
    
    // タブレットサイズ
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(100);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByPlaceholder('書籍を検索')).toBeVisible();
    
    // モバイルサイズ
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(100);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByPlaceholder('書籍を検索')).toBeVisible();
    
    // 検索機能がモバイルでも動作することを確認
    await page.getByPlaceholder('書籍を検索').fill('AI');
    await page.waitForTimeout(500);
    await expect(page.locator('text=/\\d+冊の書籍が見つかりました/')).toBeVisible();
  });

  test('フッター情報が正しく表示される', async ({ page }) => {
    // フッターまでスクロール
    await page.locator('footer').scrollIntoViewIfNeeded();
    
    // フッターの基本情報を確認
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('footer').getByText('📚')).toBeVisible();
    await expect(page.locator('footer').getByText('Kindle書籍コレクション')).toBeVisible();
    
    // フッターの説明文を確認
    await expect(page.getByText('このサイトはKindleで読んだ書籍の個人的なコレクションです。')).toBeVisible();
    await expect(page.getByText('書籍の詳細情報は各Amazonリンクからご確認ください。')).toBeVisible();
  });

  test('パフォーマンスと読み込み速度を確認', async ({ page }) => {
    const startTime = Date.now();
    
    // ページの初期読み込み
    await page.goto('http://localhost:3000');
    await page.waitForSelector('text=総書籍数');
    
    const loadTime = Date.now() - startTime;
    
    // 読み込み時間が10秒以内であることを確認
    expect(loadTime).toBeLessThan(10000);
    
    // 全ての書籍カードが読み込まれることを確認
    const bookCards = page.locator('.book-card, [data-testid="book-card"]');
    const cardCount = await bookCards.count();
    expect(cardCount).toBeGreaterThan(80); // 最低80冊は表示される
    
    console.log(`ページ読み込み時間: ${loadTime}ms`);
    console.log(`書籍カード数: ${cardCount}`);
  });
}); 