import { test, expect } from '@playwright/test'

test.describe('Pages & cross-navigation', () => {
  test('privacy page renders with real content', async ({ page }) => {
    await page.goto('/privacy')
    await expect(
      page.getByRole('heading', { level: 1, name: /Privacy policy/ })
    ).toBeVisible()
    await expect(page.getByText('12 October 2026')).toBeVisible()
    await expect(
      page.locator('a[href="mailto:AeroQuantLabs55@gmail.com"]').first()
    ).toBeVisible()
    // Site chrome wraps the standalone page (logo in header and footer).
    await expect(
      page.locator('a[aria-label="AeroQuant Labs — home"]').first()
    ).toBeVisible()
  })

  test('terms page renders with real content', async ({ page }) => {
    await page.goto('/terms')
    await expect(
      page.getByRole('heading', { level: 1, name: /Terms/ })
    ).toBeVisible()
    await expect(page.getByText('Republic of Ghana').first()).toBeVisible()
    await expect(page.getByText('12 October 2026')).toBeVisible()
  })

  test('footer legal links navigate between pages and home', async ({
    page,
  }) => {
    await page.goto('/')
    // Footer menu links come from /api/data — wait for them to load.
    await page.waitForFunction(
      () => document.querySelectorAll('a[href="/privacy"]').length >= 2,
      undefined,
      { timeout: 30_000 }
    )

    await page.locator('a[href="/privacy"]').last().click()
    await expect(page).toHaveURL(/\/privacy$/)
    await expect(
      page.getByRole('heading', { level: 1, name: /Privacy policy/ })
    ).toBeVisible()

    await page.locator('a[href="/terms"]').last().click()
    await expect(page).toHaveURL(/\/terms$/)
    await expect(
      page.getByRole('heading', { level: 1, name: /Terms/ })
    ).toBeVisible()

    // Logo takes you back home.
    await page
      .locator('a[aria-label="AeroQuant Labs — home"]')
      .first()
      .click()
    await expect(page).toHaveURL('http://localhost:3000/')
  })

  test('unknown routes return a branded 404', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist')
    expect(response?.status()).toBe(404)
    await expect(page.getByText(/We Can't Seem to Find/)).toBeVisible()
    await expect(
      page.locator('a[aria-label="AeroQuant Labs — home"]').first()
    ).toBeVisible()
  })
})
