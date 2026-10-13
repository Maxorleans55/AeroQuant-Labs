import { NextResponse } from 'next/server'
import { newsitem } from '@/app/types/news'

// Cache the news feed so it refreshes automatically (hourly) without
// re-hitting the upstream API on every page view. On Vercel this is an
// ISR-style revalidation — no rebuild or manual edit needed.
export const revalidate = 3600

// Hacker News front page via Algolia — open source, no API key, and free.
const HN_ENDPOINT =
  'https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=6'

// Keep the Open Graph lookups snappy so the route stays well inside any
// serverless time limit. They only run on cache revalidation anyway.
const OG_TIMEOUT_MS = 3500
const OG_MAX_BYTES = 65536 // the og:image tag always lives in <head>

interface HnHit {
  objectID: string
  title?: string
  url?: string | null
  points?: number
  num_comments?: number
  author?: string
  created_at?: string
}

function sourceFrom(url: string | null): string {
  if (!url) return 'news.ycombinator.com'
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return 'news.ycombinator.com'
  }
}

// Pull the value of the first <meta> tag whose property/name matches one of
// the given keys (handles either attribute order and quote style).
function findMeta(html: string, keys: string[]): string | null {
  const tags = html.match(/<meta\s[^>]*>/gi) || []
  const attr = (tag: string, name: string): string | null => {
    const m = tag.match(new RegExp(name + '\\s*=\\s*["\']([^"\']+)["\']', 'i'))
    return m ? m[1] : null
  }
  for (const tag of tags) {
    const key = (attr(tag, 'property') || attr(tag, 'name') || '').toLowerCase()
    if (keys.includes(key)) {
      const content = attr(tag, 'content')
      if (content) return content.trim()
    }
  }
  return null
}

// Fetch an article's social preview image (og:image / twitter:image) if it
// has one. Returns null on any failure so cards degrade to text-only.
async function extractOgImage(pageUrl: string): Promise<string | null> {
  try {
    const res = await fetch(pageUrl, {
      signal: AbortSignal.timeout(OG_TIMEOUT_MS),
      cache: 'no-store',
      headers: {
        'user-agent':
          'Mozilla/5.0 (compatible; AeroQuantNews/1.0; +https://aeroquant-labs.vercel.app)',
        accept: 'text/html,application/xhtml+xml',
      },
    })
    if (!res.ok) return null
    const type = res.headers.get('content-type') || ''
    if (type && !type.includes('text/html')) return null
    if (!res.body) return null

    // Read only the head of the document — we just need the meta tags.
    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let html = ''
    while (html.length < OG_MAX_BYTES) {
      const { done, value } = await reader.read()
      if (done) break
      html += decoder.decode(value, { stream: true })
      if (html.includes('</head>')) break
    }
    try {
      reader.cancel()
    } catch {
      /* ignore */
    }

    const raw = findMeta(html, [
      'og:image',
      'og:image:secure_url',
      'twitter:image',
      'twitter:image:src',
    ])
    if (!raw) return null

    const abs = new URL(raw, pageUrl).toString()
    // Avoid mixed-content blocking on the https site.
    return abs.replace(/^http:\/\//, 'https://')
  } catch {
    return null
  }
}

export async function GET() {
  try {
    const res = await fetch(HN_ENDPOINT, { next: { revalidate: 3600 } })
    if (!res.ok) throw new Error(`Hacker News fetch failed: ${res.status}`)

    const data = await res.json()
    const hits: HnHit[] = Array.isArray(data?.hits) ? data.hits : []

    // Resolve OG images in parallel; a failure on one never blocks the rest.
    const items: newsitem[] = await Promise.all(
      hits
        .filter((hit) => hit?.title)
        .map(async (hit) => ({
          id: String(hit.objectID),
          title: String(hit.title),
          // Ask/Show HN posts can have no external link — fall back to the
          // discussion thread so every card still leads somewhere useful.
          url:
            hit.url ??
            `https://news.ycombinator.com/item?id=${hit.objectID}`,
          source: sourceFrom(hit.url ?? null),
          points: Number(hit.points ?? 0),
          comments: Number(hit.num_comments ?? 0),
          author: String(hit.author ?? ''),
          createdAt: String(hit.created_at ?? new Date().toISOString()),
          // Only external articles are worth an OG lookup.
          image: hit.url ? await extractOgImage(hit.url) : null,
        }))
    )

    return NextResponse.json({ items })
  } catch (error) {
    console.error('Error fetching tech news:', error)
    // Degrade gracefully — the section renders a friendly empty state.
    return NextResponse.json({ items: [] })
  }
}
