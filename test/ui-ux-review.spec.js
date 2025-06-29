const { test, expect } = require('@playwright/test');

test.describe('UI/UX Review', () => {
  test('Page browsing test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle(/Kindle Book Showcase/);
  });
});
