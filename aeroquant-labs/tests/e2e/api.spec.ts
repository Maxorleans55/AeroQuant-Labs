import { test, expect } from '@playwright/test'

test.describe('API routes', () => {
  test('/api/data serves the full content payload', async ({ request }) => {
    const response = await request.get('/api/data')
    expect(response.ok()).toBeTruthy()

    const body = (await response.json()) as {
      headerData: unknown
      Aboutdata: { heading: string; href?: string }[]
      WorkData: unknown
      EngagementData: unknown
      WhyWorkData: unknown
      FooterLinksData: { section: string; links: { label: string; href: string }[] }[]
      ContactMethodsData: unknown
      InquiryTypes: { value: string }[]
      HeardAboutOptions: unknown
      CountryOptions: { value: string }[]
    }

    // Every payload the client components depend on is present.
    expect(Object.keys(body)).toEqual(
      expect.arrayContaining([
        'headerData',
        'Aboutdata',
        'WorkData',
        'EngagementData',
        'WhyWorkData',
        'FooterLinksData',
        'ContactMethodsData',
        'InquiryTypes',
        'HeardAboutOptions',
        'CountryOptions',
      ])
    )

    // Footer stays curated: only the Menu and Legal sections, no template
    // junk, and no link pointing at bare '/'.
    expect(body.FooterLinksData.map((s) => s.section)).toEqual([
      'Menu',
      'Legal',
    ])
    const footerHrefs = body.FooterLinksData.flatMap((s) =>
      s.links.map((l) => l.href)
    )
    expect(footerHrefs).not.toContain('/')

    // Every About card links somewhere real.
    expect(body.Aboutdata.length).toBeGreaterThan(0)
    for (const item of body.Aboutdata) {
      expect(item.href).toBeTruthy()
    }

    // Forms have options to choose from.
    expect(body.InquiryTypes.length).toBeGreaterThan(1)
    expect(body.CountryOptions.length).toBeGreaterThan(1)
  })

  test('/api/news returns the news envelope even when upstream fails', async ({
    request,
  }) => {
    const response = await request.get('/api/news', { timeout: 60_000 })
    expect(response.ok()).toBeTruthy()
    const body = (await response.json()) as { items: unknown[] }
    expect(Array.isArray(body.items)).toBe(true)
    // Graceful degradation: upstream failures return { items: [] } instead
    // of an error, so a bad Hacker News day never breaks the page.
  })
})
