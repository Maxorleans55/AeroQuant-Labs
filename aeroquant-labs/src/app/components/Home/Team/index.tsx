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
          <Image
            src='/images/team/team.webp'
            alt='office-image'
            height={684}
            width={1296}
            className='relative z-1 rounded-3xl'
          />
        </div>
      </div>
    </section>
  )
}

export default Team
