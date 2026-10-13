/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import { newsitem } from '@/app/types/news'
import TechNewsSkeleton from '../../Skeleton/TechNews'

function timeAgo(iso: string): string {
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return ''
  const mins = Math.max(0, Math.floor((Date.now() - then) / 60000))
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

const faviconFor = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
    domain
  )}&sz=64`

const TechNews = () => {
  const [items, setItems] = useState<newsitem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/news')
        if (!res.ok) throw new Error('Failed to fetch news')
        const data = await res.json()
        setItems(data.items ?? [])
      } catch (error) {
        console.error('Error fetching tech news:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <section id='News' className='relative bg-grey overflow-hidden'>
      <div className='container mx-auto max-w-7xl px-4 relative'>
        <div className='text-center'>
          <p className='text-primary text-xl font-normal tracking-widest'>
            TECH NEWS
          </p>
          <h2>Today in tech.</h2>
          <p className='text-black/50 max-w-2xl mx-auto mt-4'>
            A live feed of what the software world is reading — pulled from the
            front page of Hacker News and refreshed automatically.
          </p>
        </div>

        {loading ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12'>
            {Array.from({ length: 6 }).map((_, i) => (
              <TechNewsSkeleton key={i} />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className='mt-14 text-center text-black/50'>
            <Icon
              icon='tabler:news'
              className='text-4xl text-primary mx-auto mb-4'
            />
            <p>No stories to show right now — check back soon.</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12'>
            {items.map((item, i) => (
              // Outer node carries the scroll-in entrance; the inner <a>
              // owns hover motion (AOS sets `transform: none` on the animated
              // node, which would otherwise beat Tailwind hover transforms).
              <div
                key={item.id}
                className='h-full'
                data-aos='fade-up'
                data-aos-delay={String(i * 80)}>
                <a
                  href={item.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group relative flex h-full flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-testimonial transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-[0_24px_50px_-20px_rgba(0,102,255,0.35)]'>
                  {item.image ? (
                    <div className='relative aspect-[16/9] w-full overflow-hidden bg-grey'>
                      <img
                        src={item.image}
                        alt=''
                        loading='lazy'
                        referrerPolicy='no-referrer'
                        className='h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]'
                        onError={(e) => {
                          // If the preview image is unavailable, drop the whole
                          // image block so the card falls back to text-only.
                          const wrapper = e.currentTarget.parentElement
                          if (wrapper) wrapper.style.display = 'none'
                        }}
                      />
                      <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent' />
                    </div>
                  ) : null}

                  <div className='flex flex-1 flex-col p-5 sm:p-6'>
                    <div className='mb-3 flex items-center gap-2'>
                      <img
                        src={faviconFor(item.source)}
                        alt=''
                        loading='lazy'
                        className='h-[18px] w-[18px] shrink-0 rounded-[4px]'
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                      <span className='truncate text-xs font-medium text-black/60'>
                        {item.source}
                      </span>
                      <span className='text-xs text-black/30'>·</span>
                      <span className='shrink-0 text-xs text-black/45'>
                        {timeAgo(item.createdAt)}
                      </span>
                      <Icon
                        icon='tabler:external-link'
                        className='ml-auto h-4 w-4 shrink-0 text-black/20 transition-colors duration-300 group-hover:text-primary'
                      />
                    </div>

                    <h5 className='mb-4 line-clamp-3 flex-1 font-semibold leading-snug tracking-tight text-[17px] text-black/90 transition-colors duration-300 group-hover:text-primary'>
                      {item.title}
                    </h5>

                    <div className='flex items-center gap-5 border-t border-black/[0.06] pt-4 text-xs'>
                      <span className='inline-flex items-center gap-1.5'>
                        <Icon
                          icon='tabler:arrow-big-up'
                          className='text-[15px] text-primary'
                        />
                        <span className='font-medium text-black/60'>
                          {item.points}
                        </span>
                      </span>
                      <span className='inline-flex items-center gap-1.5'>
                        <Icon
                          icon='tabler:message'
                          className='text-[15px] text-black/40'
                        />
                        <span className='font-medium text-black/60'>
                          {item.comments}
                        </span>
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default TechNews
