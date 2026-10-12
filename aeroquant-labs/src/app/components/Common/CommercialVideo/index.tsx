import React from 'react'

/* The commercial is shot vertically (720x1280), so it plays inside a 16:9
   band with a blurred full-bleed copy behind it — landscape framing with
   nothing cropped and no player controls. */
const CommercialVideo = () => {
  return (
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
  )
}

export default CommercialVideo
