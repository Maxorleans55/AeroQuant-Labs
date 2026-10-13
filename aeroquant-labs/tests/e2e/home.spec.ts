import { test, expect, type Page } from '@playwright/test'

// Nav and footer fetch their link data client-side. Wait until the header
// and footer copies of the News link both exist before auditing links.
async function waitForSiteChrome(page: Page) {
  await page.waitForFunction(
    () => document.querySelectorAll('a[href="/#News"]').length >= 2,
    undefined,
    { timeout: 30_000 }
  )
}

test.describe('Home page', () => {
  test('renders title, anchor sections, and no dead links', async ({ page }) => {
    await page.goto('/')
    await waitForSiteChrome(page)

    expect(await page.title()).toContain('AeroQuant Labs')

    const audit = await page.evaluate(() => {
      const hrefs = [...document.querySelectorAll('a[href]')].map((a) =>
        a.getAttribute('href')
      )
      const fragments = [
        ...new Set(
          hrefs
            .filter(
              (h): h is string =>
                !!h && (h.startsWith('/#') || h.startsWith('#')) && h !== '#'
            )
            .map((h) => h.replace(/^\/?#/, ''))
        ),
      ]
      return {
        bareHash: hrefs.filter((h) => h === '#'),
        deadFragments: fragments.filter((id) => !document.getElementById(id)),
        sections: ['About', 'Team', 'FAQ', 'News', 'Join'].map((id) => ({
          id,
          exists: !!document.getElementById(id),
        })),
        heroCta: [...document.querySelectorAll('a')]
          .filter((a) => a.textContent?.trim() === 'Get started')
          .map((a) => a.getAttribute('href')),
      }
    })

    // No '#' placeholders and no anchors pointing at missing ids.
    expect(audit.bareHash).toEqual([])
    expect(audit.deadFragments).toEqual([])
    expect(audit.sections).toEqual(
      audit.sections.map((s) => ({ ...s, exists: true }))
    )
    // Hero CTA leads to the contact page.
    expect(audit.heroCta.length).toBeGreaterThan(0)
    for (const href of audit.heroCta) expect(href).toBe('/contact')
  })

  test('hero assembly runs once and settles on a static image', async ({
    page,
  }) => {
    await page.goto('/')
    await expect(page.locator('canvas[role="img"]')).toBeVisible()

    // Wait until the assembly has actually painted the scene — this absorbs
    // slow first-compile starts that a fixed timeout would race past.
    await page.waitForFunction(
      () => {
        const c = document.querySelector(
          'canvas[role="img"]'
        ) as HTMLCanvasElement | null
        if (!c || c.width === 0 || c.height === 0) return false
        const data = c
          .getContext('2d')!
          .getImageData(0, 0, c.width, c.height).data
        let opaque = 0
        for (let i = 3; i < data.length; i += 40) if (data[i] > 10) opaque++
        return opaque > 500
      },
      undefined,
      { timeout: 30_000 }
    )

    // The ~2s timeline must finish and stop: two frames taken seconds later
    // have to be identical, otherwise the animation is looping.
    await page.waitForTimeout(3_000)
    const first = await page.evaluate(() => {
      const c = document.querySelector(
        'canvas[role="img"]'
      ) as HTMLCanvasElement
      return c.toDataURL()
    })
    await page.waitForTimeout(800)
    const second = await page.evaluate(() => {
      const c = document.querySelector(
        'canvas[role="img"]'
      ) as HTMLCanvasElement
      return c.toDataURL()
    })
    expect(second).toBe(first)
  })

  test('header nav anchors scroll to their sections', async ({ page }) => {
    await page.goto('/')
    await waitForSiteChrome(page)

    await page.locator('a[href="/#Team"]').first().click()
    await expect
      .poll(
        () =>
          page.evaluate(() => {
            const el = document.getElementById('Team')
            return el ? Math.abs(el.getBoundingClientRect().top) : 99_999
          }),
        { timeout: 10_000 }
      )
      .toBeLessThan(400)
    expect(page.url()).toContain('/#Team')
  })

  test('FAQ accordion toggles open and closed', async ({ page }) => {
    await page.goto('/')
    const firstQuestion = page.locator('#FAQ button').first()
    await expect(firstQuestion).toHaveAttribute('aria-expanded', 'false')
    await firstQuestion.click()
    await expect(firstQuestion).toHaveAttribute('aria-expanded', 'true')
    await firstQuestion.click()
    await expect(firstQuestion).toHaveAttribute('aria-expanded', 'false')
  })

  test('Join us form validates and hands off to the email app', async ({
    page,
  }) => {
    await page.goto('/')
    const form = page.locator('#Join form')
    await expect(form).toBeVisible()

    // Empty submit is blocked by required fields.
    await form.locator('button[type="submit"]').click()
    await expect(
      page.getByText('Your email app should open with the details')
    ).toBeHidden()
    expect(
      await form.evaluate((f) => (f as HTMLFormElement).checkValidity())
    ).toBe(false)

    // Valid submit shows the handoff confirmation and stays on the page.
    await form.locator('input[name="name"]').fill('E2E Tester')
    await form.locator('input[name="email"]').fill('e2e@example.com')
    await form.locator('button[type="submit"]').click()
    await expect(
      page.getByText('Your email app should open with the details')
    ).toBeVisible()
    expect(new URL(page.url()).pathname).toBe('/')
  })

  test('team video loads and plays when scrolled into view', async ({
    page,
  }) => {
    await page.goto('/')
    await page.waitForFunction(
      () =>
        [...document.querySelectorAll('video')].some((v) =>
          (v.currentSrc || '').includes('aeroquant-commercial-landscape')
        ),
      undefined,
      { timeout: 30_000 }
    )
    await page.evaluate(() => {
      const v = [...document.querySelectorAll('video')].find((v) =>
        (v.currentSrc || '').includes('aeroquant-commercial-landscape')
      )
      v?.scrollIntoView({ block: 'center' })
    })
    await expect
      .poll(
        () =>
          page.evaluate(() => {
            const v = [...document.querySelectorAll('video')].find((v) =>
              (v.currentSrc || '').includes('aeroquant-commercial-landscape')
            )
            return !!v && !v.paused && v.currentTime > 0.2
          }),
        { timeout: 20_000 }
      )
      .toBe(true)
  })

  test('news section resolves to stories or a graceful empty state', async ({
    page,
  }) => {
    await page.goto('/')
    const state = await page
      .waitForFunction(
        () => {
          const section = document.getElementById('News')
          if (!section) return false
          if (section.querySelector('a[target="_blank"]')) return 'items'
          if (section.textContent?.includes('No stories to show')) return 'empty'
          return false
        },
        undefined,
        { timeout: 45_000 }
      )
      .then((handle) => handle.jsonValue())
    expect(['items', 'empty']).toContain(state)
  })
})
