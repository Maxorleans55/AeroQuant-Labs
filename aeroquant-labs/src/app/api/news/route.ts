import { NextResponse } from 'next/server'
import { newsitem } from '@/app/types/news'

// Cache the news feed so it refreshes automatically (hourly) without
// re-hitting the upstream API on every page view. On Vercel this is an
// ISR-style revalidation — no rebuild or manual edit needed.
export const revalidate = 3600

// Hacker News front page via Algolia — open source, no API key, and free.
const HN_ENDPOINT =
  'https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=6'

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

export async function GET() {
  try {
    const res = await fetch(HN_ENDPOINT, { next: { revalidate: 3600 } })
    if (!res.ok) throw new Error(`Hacker News fetch failed: ${res.status}`)

    const data = await res.json()
    const hits: HnHit[] = Array.isArray(data?.hits) ? data.hits : []

    const items: newsitem[] = hits
      .filter((hit) => hit?.title)
      .map((hit) => ({
        id: String(hit.objectID),
        title: String(hit.title),
        // Ask/Show HN posts can have no external link — fall back to the
        // discussion thread so every card still leads somewhere useful.
        url: hit.url ?? `https://news.ycombinator.com/item?id=${hit.objectID}`,
        source: sourceFrom(hit.url ?? null),
        points: Number(hit.points ?? 0),
        comments: Number(hit.num_comments ?? 0),
        author: String(hit.author ?? ''),
        createdAt: String(hit.created_at ?? new Date().toISOString()),
      }))

    return NextResponse.json({ items })
  } catch (error) {
    console.error('Error fetching tech news:', error)
    // Degrade gracefully — the section renders a friendly empty state.
    return NextResponse.json({ items: [] })
  }
}
