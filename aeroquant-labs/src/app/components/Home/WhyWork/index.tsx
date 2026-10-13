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
            <div
              key={reason.title}
              className='bg-white rounded-3xl p-8 shadow-testimonial flex flex-col'
              data-aos='fade-up'
              data-aos-delay={String(i * 100)}>
              <div className='w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6'>
                <Icon icon={reason.icon} className='text-primary text-2xl' />
              </div>
              <h5 className='mb-3'>{reason.title}</h5>
              <p className='text-black/50 text-base leading-relaxed'>
                {reason.description}
              </p>
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
