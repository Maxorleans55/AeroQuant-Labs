import React from 'react'
import CommercialVideo from '@/app/components/Common/CommercialVideo'

const Team = () => {
  return (
    <section className='overflow-x-hidden'>
      <div className='container mx-auto max-w-7xl px-4 relative'>
        <h2 className='text-center max-w-5xl mx-auto'>
          Engineering solutions for all.
        </h2>
        <h5 className='font-medium text-center pt-10 text-black/50 max-w-3xl mx-auto'>
          Custom software, websites and apps, cloud hosting and DevOps, and
          automation — a quick look at what we build, ready to launch.
        </h5>
        <div className='grid grid-cols-1 mt-16'>
          <CommercialVideo />
        </div>
      </div>
    </section>
  )
}

export default Team
