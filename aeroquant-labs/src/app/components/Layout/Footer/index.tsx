'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { footerlinks } from '@/app/types/footerlinks'

const footer = () => {
  // fetch data

  const [footerlinks, setFooterLinks] = useState<footerlinks[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setFooterLinks(data.FooterLinksData)
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='bg-black' id='contact'>
      <div className='container mx-auto max-w-2xl pt-48 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
        <div className='grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 lg:grid-cols-12 xl:gap-x-8'>
          {/* COLUMN-1 */}
          <div className='col-span-4'>
            <h4 className='text-white text-3xl leading-9 mb-4 lg:mb-20'>
              Aero<span className='text-primary'>Quant</span> Labs
            </h4>
            <div className='flex items-center gap-4'>
              <div className='footer-icons'>
                <Link href='https://facebook.com'>
                  <Image
                    src={'/images/footer/vec.svg'}
                    alt='facebook'
                    width={15}
                    height={27}
                  />
                </Link>
              </div>
              <div className='footer-icons'>
                <Link href='https://twitter.com'>
                  <Image
                    src={'/images/footer/twitter.svg'}
                    alt='twitter'
                    width={25}
                    height={22}
                  />
                </Link>
              </div>
              <div className='footer-icons'>
                <Link href='https://instagram.com'>
                  <Image
                    src={'/images/footer/instagram.svg'}
                    alt='instagram'
                    width={25}
                    height={25}
                  />
                </Link>
              </div>
              <div className='footer-icons'>
                <Link href='https://whatsapp.com/channel/0029VbEEybm9Gv7VzgvwOg0Y'>
                  <Image
                    src={'/images/footer/whatsapp.svg'}
                    alt='whatsapp'
                    width={25}
                    height={25}
                  />
                </Link>
              </div>
            </div>
          </div>
          {/* CLOUMN-2/3 */}
          {footerlinks.map((item, i) => (
            <div key={i} className='group relative col-span-2'>
              <p className='text-white text-xl font-extrabold mb-9'>
                {item.section}
              </p>
              <ul>
                {item.links.map((item, i) => (
                  <li key={i} className='mb-5'>
                    <Link
                      href={`${item.href}`}
                      className='text-white text-lg font-normal mb-6 space-links hover:text-white/60 hover:underline'>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* All Rights Reserved */}
      <div className='mx-auto max-w-2xl lg:max-w-7xl'>
        <div className='pt-5 pb-5 px-4 sm:px-6 lg:px-4 border-t border-white/30'>
          <div className='mt-4 grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 xl:gap-x-8'>
            <div>
              <p className='text-center md:text-start text-white text-lg'>
                ©2026 AeroQuant Labs. All rights reserved.
              </p>
            </div>
            <div className='flex justify-center md:justify-end'>
              <Link href='/privacy'>
                <p className='text-base text-white pr-6 hover:text-white/60 hover:underline'>
                  Privacy policy
                </p>
              </Link>
              <Link href='/terms'>
                <p className='text-base text-white pl-6 border-solid border-l border-footer hover:text-white/60 hover:underline'>
                  Terms & conditions
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default footer
