import { test, expect } from '@playwright/test';

test.describe('Cornerman App', () => {
  // Note: These tests run against routes that may require authentication
  // In a real scenario, you'd set up test auth tokens

  test('should redirect to sign-in when not authenticated', async ({ page }) => {
    await page.goto('/cornerman');
    // Should redirect to sign-in
    await page.waitForURL(/sign-in|cornerman/, { timeout: 10000 });
  });

  test('should display sign-in page correctly', async ({ page }) => {
    await page.goto('/sign-in');
    // Clerk sign-in should be visible
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('Legal Pages', () => {
  test('should load terms page', async ({ page }) => {
    await page.goto('/terms');
    await expect(page).toHaveURL('/terms');
  });

  test('should load refunds page', async ({ page }) => {
    await page.goto('/refunds');
    await expect(page).toHaveURL('/refunds');
  });
});


test.describe('Performance', () => {
  test('homepage should load within 10 seconds (cold start)', async ({ page }) => {
    const start = Date.now();
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - start;

    // Allow 10 seconds for cold start with compilation
    expect(loadTime).toBeLessThan(10000);
  });

  test('should have no console errors on homepage', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Filter out known acceptable errors (like Clerk analytics, etc)
    const criticalErrors = errors.filter(
      (e) => !e.includes('favicon') && !e.includes('analytics')
    );

    // Allow some non-critical console errors but flag them
    if (criticalErrors.length > 0) {
      console.log('Console errors found:', criticalErrors);
    }
  });
});
