'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { engagement } from '@/app/types/engagement'
import PlansSkeleton from '../../Skeleton/Plans'

const highlights = [
  'Free discovery call',
  'Weekly demos throughout',
  'You own the source code',
]

const Manage = () => {
  const [engagements, setEngagements] = useState<engagement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setEngagements(data.EngagementData)
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <section id='services-section'>
      <div className='container mx-auto max-w-7xl px-4'>
        <h2 className='text-center'>
          Simple ways to work with us.
        </h2>

        <div className='flex sm:block'>
          <div className='flex flex-col sm:flex-row gap-5 md:justify-evenly mt-20 items-start mx-auto'>
            {highlights.map((item, i) => (
              <div
                key={i}
                className='flex gap-5 items-center justify-center md:justify-start'>
                <Image
                  src='/images/manage/right.svg'
                  alt='check-icon'
                  width={21}
                  height={16}
                />
                <p className='text-lg font-semibold'>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 gap-14 manage'>
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <PlansSkeleton key={i} />)
            : engagements.map((items, i) => (
                <div
                  className='shadow-manage-shadow border border-border text-center p-10 rounded-3xl'
                  key={i}>
                  <h5 className='mb-3'>{items.heading}</h5>
                  <p className='text-4xl font-extrabold mb-3 whitespace-nowrap'>
                    {items.duration}
                  </p>
                  <p className='text-sm font-medium mb-6 text-darkgrey'>
                    {items.label}
                  </p>
                  <Link href='#Join'>
                    <button className='text-sm font-bold text-primary bg-transparent hover:bg-primary hover:text-white border-2 border-primary rounded-full py-4 px-12 mb-6 hover:cursor-pointer'>
                      Start a conversation
                    </button>
                  </Link>
                  {items.features.map((feature, index) => (
                    <p
                      className='text-sm font-medium text-darkgrey mb-3'
                      key={index}>
                      {feature}
                    </p>
                  ))}
                </div>
              ))}
        </div>
      </div>
    </section>
  )
}

export default Manage
