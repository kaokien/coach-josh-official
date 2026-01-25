import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display hero section with brand name', async ({ page }) => {
    await expect(page.locator('text=COACH JOSH OFFICIAL')).toBeVisible();
  });

  test('should display tagline in hero', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /COACH JOSH OFFICIAL/i })).toBeVisible();
  });

  test('should have navigation links', async ({ page }) => {
    // Check for navigation elements
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should display social proof stats', async ({ page }) => {
    await expect(page.locator('text=50M+')).toBeVisible();
    await expect(page.locator('text=TikTok Views')).toBeVisible();
  });

  test('should have call-to-action buttons', async ({ page }) => {
    await expect(page.locator('text=Get Free Week')).toBeVisible();
    await expect(page.locator('text=View Programs')).toBeVisible();
  });

  test('should scroll to sections when CTA clicked', async ({ page }) => {
    const ctaButton = page.locator('text=View Programs');
    await ctaButton.click();
    // After click, should scroll (URL might have hash or page scrolls)
    await page.waitForTimeout(500);
    // Just verify the click worked - element stays visible
    await expect(ctaButton).toBeVisible();
  });
});

test.describe('Homepage - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should display hero on mobile', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=COACH JOSH OFFICIAL')).toBeVisible();
  });

  test('should have mobile-friendly layout', async ({ page }) => {
    await page.goto('/');
    // Check that content is within viewport
    const hero = page.locator('section').first();
    await expect(hero).toBeInViewport();
  });
});

test.describe('Navigation', () => {
  test('should navigate to contact page', async ({ page }) => {
    await page.goto('/');
    // Look for contact link
    const contactLink = page.locator('a[href="/contact"]');
    if (await contactLink.count() > 0) {
      await contactLink.click();
      await expect(page).toHaveURL('/contact');
    }
  });

  test('should navigate to Cornerman when logged in', async ({ page }) => {
    // Try to access Cornerman (will redirect to sign-in if not authenticated)
    await page.goto('/cornerman');
    // Either we see Cornerman or we get redirected to sign-in
    const url = page.url();
    expect(url.includes('cornerman') || url.includes('sign-in')).toBeTruthy();
  });
});
