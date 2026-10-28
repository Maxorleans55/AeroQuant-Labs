import { test, expect, type Page } from '@playwright/test'

const SUCCESS_TEXT = 'Your email app should be opening'

// The inquiry/country selects are populated client-side from /api/data.
async function waitForContactData(page: Page) {
  await page.waitForFunction(
    () => {
      const s = document.querySelector(
        'select[name="country"]'
      ) as HTMLSelectElement | null
      return !!s && s.options.length > 1
    },
    undefined,
    { timeout: 30_000 }
  )
}

test.describe('Contact page', () => {
  test('renders the form, methods, and map embed', async ({ page }) => {
    await page.goto('/contact')
    await waitForContactData(page)

    // All required fields are present.
    for (const name of [
      'firstName',
      'lastName',
      'email',
      'inquiryType',
      'country',
      'message',
    ]) {
      await expect(page.locator(`[name="${name}"]`)).toHaveCount(1)
    }

    // Direct email handoff link and the OpenStreetMap embed.
    await expect(
      page.locator('a[href="mailto:AeroQuantLabs55@gmail.com"]:visible').first()
    ).toBeVisible()
    await expect(page.locator('iframe[src*="openstreetmap"]')).toHaveCount(1)
  })

  test('blocks an empty submit, then succeeds with a mailto handoff', async ({
    page,
  }) => {
    await page.goto('/contact')
    await waitForContactData(page)

    // Empty submit stays blocked by native validation — no confirmation.
    await page.locator('button[type="submit"]').click()
    await expect(page.getByText(SUCCESS_TEXT)).toBeHidden()
    const invalid = await page.evaluate(
      () => document.querySelectorAll('form :invalid').length
    )
    expect(invalid).toBeGreaterThan(0)

    // Fill every required field and submit.
    await page.fill('input[name="firstName"]', 'E2E')
    await page.fill('input[name="lastName"]', 'Tester')
    await page.fill('input[name="email"]', 'e2e@example.com')
    await page.selectOption('select[name="inquiryType"]', { index: 1 })
    await page.selectOption('select[name="country"]', { index: 1 })
    await page.fill(
      'textarea[name="message"]',
      'Automated end-to-end verification message.'
    )
    await page.locator('button[type="submit"]').click()

    await expect(page.getByText(SUCCESS_TEXT)).toBeVisible()
    // The handoff never navigates the visitor away from the site.
    expect(new URL(page.url()).pathname).toBe('/contact')
  })

  test('commercial video plays when scrolled into view', async ({ page }) => {
    await page.goto('/contact')
    await page.waitForFunction(
      () =>
        [...document.querySelectorAll('video')].some((v) =>
          (v.currentSrc || '').includes('contact-commercial')
        ),
      undefined,
      { timeout: 30_000 }
    )
    await page.evaluate(() => {
      const v = [...document.querySelectorAll('video')].find((v) =>
        (v.currentSrc || '').includes('contact-commercial')
      )
      v?.scrollIntoView({ block: 'center' })
    })
    await expect
      .poll(
        () =>
          page.evaluate(() => {
            const v = [...document.querySelectorAll('video')].find((v) =>
              (v.currentSrc || '').includes('contact-commercial')
            )
            return !!v && !v.paused && v.currentTime > 0.2
          }),
        { timeout: 20_000 }
      )
      .toBe(true)
  })
})
