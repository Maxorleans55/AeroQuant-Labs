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
    <section id='Blog' className='relative bg-grey overflow-hidden'>
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
                  className='group relative flex h-full flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-white p-6 shadow-testimonial transition-all duration-300 ease-out hover:-translate-y-2 hover:border-primary/25 hover:shadow-[0_24px_50px_-20px_rgba(0,102,255,0.35)]'>
                  <span className='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2b93ff] to-[#0047c2]' />
                  <div className='flex items-center justify-between gap-2 mb-4'>
                    <span className='inline-flex max-w-[75%] items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary'>
                      <Icon icon='tabler:world' className='shrink-0 text-sm' />
                      <span className='truncate'>{item.source}</span>
                    </span>
                    <Icon
                      icon='tabler:external-link'
                      className='shrink-0 text-black/25 transition-colors duration-300 group-hover:text-primary'
                    />
                  </div>
                  <h5 className='mb-4 flex-1 font-bold leading-snug transition-colors duration-300 group-hover:text-primary'>
                    {item.title}
                  </h5>
                  <div className='flex items-center gap-4 border-t border-black/5 pt-4 text-sm text-black/50'>
                    <span className='inline-flex items-center gap-1.5'>
                      <Icon
                        icon='tabler:arrow-big-up'
                        className='text-base text-primary'
                      />
                      {item.points}
                    </span>
                    <span className='inline-flex items-center gap-1.5'>
                      <Icon icon='tabler:message' className='text-base' />
                      {item.comments}
                    </span>
                    <span className='ml-auto inline-flex items-center gap-1.5'>
                      <Icon icon='tabler:clock' className='text-base' />
                      {timeAgo(item.createdAt)}
                    </span>
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
