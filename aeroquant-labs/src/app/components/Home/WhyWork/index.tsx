'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react/dist/iconify.js'
import { whywork } from '@/app/types/whywork'

const WhyWork = () => {
  const [reasons, setReasons] = useState<whywork[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setReasons(data.WhyWorkData)
      } catch (error) {
        console.error('Error fetching reasons:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <section id='why-section' className='bg-grey/40 overflow-hidden'>
      <div className='container mx-auto max-w-7xl px-4'>
        <div className='text-center'>
          <p
            className='text-primary font-semibold tracking-wide mb-4'
            data-aos='fade-up'>
            Why AeroQuant Labs
          </p>
          <h2 data-aos='fade-up' data-aos-delay='100'>
            Why work with us.
          </h2>
          <p
            className='text-black/50 max-w-2xl mx-auto mt-6'
            data-aos='fade-up'
            data-aos-delay='150'>
            We are a young team — and we think that is a reason to talk to us,
            not a reason to skip us. Here is what you actually get.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16'>
          {reasons.map((reason, i) => (
            // Outer element carries the AOS scroll-in entrance; the inner
            // element owns hover motion (AOS sets `transform: none` on the
            // animated node, which would otherwise beat Tailwind hover lifts).
            <div
              key={reason.title}
              className='h-full'
              data-aos='fade-up'
              data-aos-delay={String(i * 120)}>
              <div className='group relative flex h-full flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-white p-8 shadow-testimonial transition-all duration-300 ease-out hover:-translate-y-2 hover:border-primary/25 hover:shadow-[0_24px_50px_-20px_rgba(0,102,255,0.35)]'>
                {/* soft brand glow revealed on hover */}
                <span
                  aria-hidden='true'
                  className='pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-gradient-to-br from-[#2b93ff] to-[#0066ff] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-[0.18]'
                />
                <div className='relative'>
                  <div className='mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2b93ff] to-[#0066ff] text-white shadow-[0_10px_24px_-8px_rgba(0,102,255,0.6)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110'>
                    <Icon icon={reason.icon} className='text-[26px]' />
                  </div>
                  <h5 className='mb-3 transition-colors duration-300 group-hover:text-primary'>
                    {reason.title}
                  </h5>
                  <p className='text-base leading-relaxed text-black/50'>
                    {reason.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Founding-client invitation — honest about having no customers yet */}
        <div
          className='mt-16 rounded-3xl px-8 py-12 md:px-14 md:py-16 text-center'
          style={{
            backgroundImage:
              'radial-gradient(110% 110% at 12% 8%, #2b93ff 0%, #0066ff 38%, #0047c2 68%, #00225f 100%)',
          }}
          data-aos='fade-up'>
          <p className='text-white/70 font-semibold tracking-wide mb-4'>
            Founding clients
          </p>
          <h3 className='text-white text-3xl md:text-4xl'>
            Be the first team we build for.
          </h3>
          <p className='text-white/80 max-w-2xl mx-auto mt-6'>
            We have not shipped for a paying customer yet — so we are keeping
            our first engagements close and our standards high. If you take a
            chance on us, you get the founders&rsquo; full attention, honest
            pricing, and a product we will put our name on.
          </p>
          <div className='mt-8'>
            <Link
              href='/contact'
              className='inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition'>
              Start a conversation
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyWork
