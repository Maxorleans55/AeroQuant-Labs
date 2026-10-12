import React from 'react'

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
          {/* Landscape frame: the commercial is shot vertically, so a blurred
              full-bleed copy fills the 16:9 band while the sharp frame plays
              uncropped in the centre. */}
          <div className='relative z-1 w-full aspect-video rounded-3xl overflow-hidden bg-black'>
            <video
              src='/videos/aeroquant-commercial.mp4'
              className='absolute inset-0 h-full w-full object-cover blur-2xl scale-110 brightness-75'
              autoPlay
              muted
              loop
              playsInline
              aria-hidden='true'
              tabIndex={-1}
            />
            <video
              src='/videos/aeroquant-commercial.mp4'
              poster='/videos/poster.jpg'
              aria-label='The AeroQuant Labs commercial'
              className='absolute inset-0 h-full w-full object-contain'
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Team
