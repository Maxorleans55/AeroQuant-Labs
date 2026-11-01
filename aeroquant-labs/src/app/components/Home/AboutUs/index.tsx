'use client'
import { useEffect, useState } from 'react'
import { aboutdata } from '@/app/types/aboutdata'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import AboutSkeleton from '../../Skeleton/AboutUs'

const Aboutus = () => {
  // fetch about data
  const [about, setAbout] = useState<aboutdata[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setAbout(data.Aboutdata)
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <section id='About' className=' bg-cover bg-center overflow-hidden'>
      <div className='container mx-auto max-w-7xl px-4 relative z-1'>
        <div className='p-12 bg-grey rounded-3xl'>
          <Image
            src='/images/aboutus/dots.svg'
            width={100}
            height={80}
            alt='dots-image'
            className='absolute bottom-1 -left-20'
          />
          <p className='text-center text-primary text-lg tracking-widest uppercase mt-10'>
            about us
          </p>
          <h2 className='text-center pb-12'>Know more about us.</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mt-10'>
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <AboutSkeleton key={index} />
                ))
              : about.map((item, i) => (
                  // Outer element carries the AOS scroll-in entrance (staggered);
                  // the inner card owns hover motion — AOS sets `transform: none`
                  // on the animated node, which would otherwise beat Tailwind
                  // hover lifts.
                  <div
                    key={i}
                    className='h-full'
                    data-aos='fade-up'
                    data-aos-delay={String(i * 120)}>
                    <div className='group h-full rounded-3xl bg-white p-8 shadow-xl transition-all duration-300 ease-out hover:-translate-y-2 hover:bg-darkmode hover:shadow-[0_24px_50px_-20px_rgba(0,34,74,0.45)]'>
                      <h5 className='mb-5 transition-colors duration-300 group-hover:text-white'>
                        {item.heading}
                      </h5>
                      <Image
                        src={item.imgSrc}
                        alt={item.imgSrc}
                        width={100}
                        height={100}
                        className='mb-5 transition-transform duration-300 ease-out group-hover:scale-110'
                      />
                      <p className='text-lg font-normal text-black transition-colors duration-300 group-hover:text-white mb-5'>
                        {item.paragraph}
                      </p>
                      <Link
                        href={item.href}
                        className='text-18 font-semibold text-primary hover-underline flex items-center'>
                        {item.link}
                        <Icon
                          icon='tabler:chevron-right'
                          width='20'
                          height='20'
                          className='transition-transform duration-300 ease-out group-hover:translate-x-1'
                        />
                      </Link>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Aboutus
