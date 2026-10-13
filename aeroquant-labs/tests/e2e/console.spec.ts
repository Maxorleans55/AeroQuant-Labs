import { test, expect, type Page } from '@playwright/test'

test.describe('Console & network health', () => {
  test('home and contact render without JS errors or local 4xx/5xx', async ({
    page,
  }) => {
    const consoleErrors: string[] = []
    const pageErrors: string[] = []
    const localFailures: string[] = []

    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text())
    })
    page.on('pageerror', (err) => pageErrors.push(err.message))
    page.on('response', (res) => {
      try {
        const url = new URL(res.url())
        const local =
          url.hostname === 'localhost' || url.hostname === '127.0.0.1'
        if (local && res.status() >= 400) {
          localFailures.push(`${res.status()} ${res.url()}`)
        }
      } catch {
        /* unparseable URL — ignore */
      }
    })

    await page.goto('/')
    await waitForHomeToSettle(page)
    await page.goto('/contact')
    await page.waitForTimeout(2_500)

    // Uncaught exceptions never happen on a healthy page.
    expect(pageErrors).toEqual([])

    // No request to our own server may fail (external 404s such as third-
    // party favicons are deliberately out of scope).
    expect(localFailures).toEqual([])

    // "Failed to load resource" entries are already attributed by URL above;
    // anything left here is a real JavaScript error.
    const realErrors = consoleErrors.filter(
      (text) => !text.startsWith('Failed to load resource')
    )
    expect(realErrors).toEqual([])
  })
})

// Wait for client data + the news feed to finish rendering so late errors
// are captured before assertions run.
async function waitForHomeToSettle(page: Page) {
  await page.waitForFunction(
    () => document.querySelectorAll('a[href="/#News"]').length >= 2,
    undefined,
    { timeout: 30_000 }
  )
  await page
    .waitForFunction(
      () => {
        const section = document.getElementById('News')
        if (!section) return false
        return (
          !!section.querySelector('a[target="_blank"]') ||
          section.textContent?.includes('No stories to show')
        )
      },
      undefined,
      { timeout: 45_000 }
    )
    .catch(() => undefined) // feed may be slow; not fatal for this test
  await page.waitForTimeout(1_500)
}
