import React from 'react'

/* The commercial is delivered as a native 16:9 landscape file
   (aeroquant-commercial-landscape.mp4), produced from the 720x1280 source
   with FFmpeg: the portrait content is scaled to full height and the sides
   are filled with a darkened, blurred copy of the content. Nothing is
   cropped, and it plays edge-to-edge at full quality with no CSS blur
   layer needed. */
const CommercialVideo = () => {
  return (
    <div className='relative z-1 w-full aspect-video rounded-3xl overflow-hidden bg-black'>
      <video
        src='/videos/aeroquant-commercial-landscape.mp4'
        poster='/videos/poster.jpg'
        aria-label='The AeroQuant Labs commercial'
        className='h-full w-full object-cover'
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  )
}

export default CommercialVideo
