'use client'
import React, { useEffect, useRef } from 'react'

/* Native 16:9 landscape sources, produced with FFmpeg so they play
   edge-to-edge with no CSS tricks:
   - aeroquant-commercial-landscape.mp4 — the home Team commercial,
     upconverted from 720x1280 portrait (content full height, sides
     filled with a darkened blurred copy; nothing cropped)
   - contact-commercial.mp4 — the contact page tour, already landscape
     (1280x720), remuxed with faststart for immediate streaming
   Both default to the home commercial; pass src/poster/label to show a
   different cut. */
const CommercialVideo = ({
  src = '/videos/aeroquant-commercial-landscape.mp4',
  poster = '/videos/poster.jpg',
  label = 'The AeroQuant Labs commercial',
}: {
  src?: string
  poster?: string
  label?: string
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  /* Browsers defer autoplay in tabs/sections that aren't visible yet, which
     can leave the video stuck on its first frame. Start (or resume)
     playback the moment the video scrolls into view. */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const io = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting && video.paused) {
          video.play().catch(() => {})
        }
      },
      { threshold: 0.25 }
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])

  return (
    <div className='relative z-1 w-full aspect-video rounded-3xl overflow-hidden bg-black'>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        aria-label={label}
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
