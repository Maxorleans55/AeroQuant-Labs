'use client'
import React from 'react'
import Image from 'next/image'

type Spotlight = {
  name: string
  role: string
  quote: string
  story: string
  photo?: string
  initials?: string
}

const members: Spotlight[] = [
  {
    name: 'Maxwell Otsiwa Agyakwa',
    role: 'Frontend Developer & Digital Forensics',
    quote: 'Dedicated to the people who use what we build.',
    story:
      'We stay close to the people who use what we build. That means asking the right questions early, shipping something real fast, and improving it with their feedback — not our assumptions.',
    photo: '/images/dedicated/maxwell.jpg',
  },
  {
    name: 'Joel Annorh',
    role: 'Full Stack Developer',
    quote: 'From the first line of code to the last mile of deployment.',
    story:
      'Joel works across the whole stack — interfaces, APIs, and the infrastructure underneath. When something needs building end to end, he takes it from an idea on the board to a product in people’s hands.',
    photo: '/images/dedicated/joel.jpg',
  },
  {
    name: 'Nana Obeng',
    role: '',
    quote: 'Every strong team keeps growing.',
    story:
      'Nana has joined the build at AeroQuant Labs. His story on the team is only beginning — watch this space.',
    photo: '/images/dedicated/nana.jpg',
  },
]

const Dedicated = () => {
  return (
    <>
      {members.map((m, i) => {
        const flip = i % 2 === 1
        return (
          <section
            key={m.name}
            className={`relative bg-cover bg-center overflow-hidden${
              i === 0 ? '' : ' py-20 lg:py-28'
            }`}
          >
            <div className='container mx-auto max-w-7xl px-4'>
              <div className='grid grid-cols-1 lg:grid-cols-12 gap-5'>
                <Image
                  src='/images/dedicated/spiral.svg'
                  height={347}
                  width={686}
                  alt='spiral-design'
                  className='absolute left-0 top-0 hidden lg:block -z-10'
                />
                {/* Photo Column */}
                <div
                  className={`col-span-12 lg:col-span-6 justify-self-center${
                    flip ? ' lg:order-2' : ''
                  }`}
                  data-aos={flip ? 'fade-left' : 'fade-right'}
                  data-aos-duration='900'
                >
                  {m.photo ? (
                    <div className='relative w-full max-w-[416px] aspect-[416/530] rounded-[30px] overflow-hidden mx-auto md:mx-0'>
                      <Image
                        src={m.photo}
                        alt={`${m.name}${m.role ? `, ${m.role}` : ''} of AeroQuant Labs`}
                        fill
                        sizes='(max-width: 1024px) 100vw, 416px'
                        className='object-cover'
                      />
                    </div>
                  ) : (
                    <div
                      aria-hidden
                      className='w-full max-w-[416px] aspect-[416/530] rounded-[30px] bg-[linear-gradient(180deg,#eef3fb_0%,#dce7f9_100%)] text-primary text-7xl font-semibold flex items-center justify-center select-none mx-auto md:mx-0'
                    >
                      {m.initials}
                    </div>
                  )}
                </div>

                {/* Text Column */}
                <div
                  className={`col-span-12 lg:col-span-6${
                    flip ? ' lg:order-1' : ''
                  }`}
                >
                  <div className='relative'>
                    <Image
                      src='/images/dedicated/comma.svg'
                      alt='comma-image'
                      width={200}
                      height={130}
                      className={`absolute -top-16 hidden lg:block${
                        flip ? ' -right-32 scale-x-[-1]' : ' -left-32'
                      }`}
                      data-aos='zoom-in'
                      data-aos-delay='400'
                    />
                  </div>
                  <h2
                    className='text-center -mr-1 lg:text-start lg:leading-20 leading-14'
                    data-aos={flip ? 'fade-right' : 'fade-left'}
                    data-aos-duration='900'
                  >
                    &ldquo;{m.quote}&rdquo;
                  </h2>
                  <p
                    className='text-xl font-medium text-black/55 mt-5 text-center lg:text-start'
                    data-aos='fade-up'
                    data-aos-delay='150'
                  >
                    {m.story}
                  </p>
                  <h5
                    className='mt-12 lg:pl-32 relative lg:before:block before:hidden before:absolute before:bg-black before:h-0.5 before:w-24 before:left-0 before:bottom-1/2 text-center lg:text-start'
                    data-aos='fade-up'
                    data-aos-delay='300'
                  >
                    {m.name}
                    {m.role ? `, ${m.role}` : ''}
                  </h5>
                </div>
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}
export default Dedicated
