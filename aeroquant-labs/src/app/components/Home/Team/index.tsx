import React from 'react'
import Image from 'next/image'

const Team = () => {
  return (
    <section className='overflow-x-hidden'>
      <div className='container mx-auto max-w-7xl px-4 relative'>
        <h2 className='text-center max-w-5xl mx-auto'>
          The people behind AeroQuant Labs.
        </h2>
        <h5 className='font-medium text-center pt-10 text-black/50 max-w-3xl mx-auto'>
          A small, focused team of developers who design, build and ship
          software together — and care about the problems our tools solve.
        </h5>
        <div className='grid grid-cols-1 mt-16'>
          {/* PLACEHOLDER: we don't have a real team photo yet, so this branded
              panel stands in for it. When we have one, replace this div with:

              <Image
                src='/images/team/team-photo.jpg'
                alt='The AeroQuant Labs team'
                width={1296}
                height={684}
                className='relative z-1 rounded-3xl'
              />
          */}
          <div className='relative z-1 rounded-3xl overflow-hidden aspect-[1296/460] bg-[linear-gradient(180deg,#eef3fb_0%,#dce7f9_100%)]'>
            <div className='absolute inset-0 bg-[radial-gradient(#0066ff2e_1.5px,transparent_1.5px)] [background-size:26px_26px]' />
            <div className='absolute -left-24 -top-28 w-96 h-96 rounded-full bg-white/70 blur-3xl' />
            <div className='absolute -right-20 -bottom-32 w-[26rem] h-[26rem] rounded-full bg-[#0066ff]/10 blur-3xl' />
            <div className='absolute inset-0 flex items-center justify-center'>
              <Image
                src='/images/team/badge.png'
                alt='AeroQuant Labs'
                width={150}
                height={150}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Team
