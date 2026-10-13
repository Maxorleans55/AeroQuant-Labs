'use client'
import { useEffect, useRef } from 'react'

type MaterializeImageProps = {
  /** path to the image in /public */
  src: string
  alt: string
  /** intrinsic pixel size of the image — keeps layout stable pre-hydration */
  width: number
  height: number
  className?: string
}

/* One-shot hero entrance — it does NOT loop. The illustration "renders"
   in from coarse mosaic blocks with a left-to-right resolution sweep,
   a soft light shine passes over the sharp image, then the canvas
   settles to a static image and the animation loop is cancelled.
   Plays once per mount when it enters the viewport. */

const BANDS = 8
const BAND_DELAY = 60 // ms between bands (left -> right)
const BAND_RAMP = 850 // ms for one band to refine to sharp
const SWEEP_START = 1350 // ms — materialize is done by here
const SWEEP_DUR = 750
const SETTLE = SWEEP_START + SWEEP_DUR + 80
const LEVELS_B = [64, 32, 16, 8, 4] // block size in image px, coarse -> fine

const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t)
const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

const MaterializeImage = ({
  src,
  alt,
  width,
  height,
  className,
}: MaterializeImageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const img = new Image()
    img.src = src

    let cssW = 0
    let cssH = 0
    let mips: HTMLCanvasElement[] = [] // per LEVELS_B entry, coarse -> fine
    let raf = 0
    let start = 0
    let done = false
    let inView = false

    /* Build averaged mosaic levels by successive halving (keeps block
       colors clean instead of aliased). */
    const buildMips = () => {
      if (!img.complete || !img.naturalWidth) return
      const w = img.naturalWidth
      const h = img.naturalHeight
      const coarseW = Math.max(1, Math.ceil(w / LEVELS_B[0]))

      const chain: HTMLCanvasElement[] = []
      let cur = document.createElement('canvas')
      cur.width = w
      cur.height = h
      cur.getContext('2d')?.drawImage(img, 0, 0)
      chain.push(cur)
      while (cur.width > coarseW) {
        const nw = Math.max(coarseW, Math.ceil(cur.width / 2))
        const nh = Math.max(1, Math.ceil(cur.height / 2))
        const next = document.createElement('canvas')
        next.width = nw
        next.height = nh
        next.getContext('2d')?.drawImage(cur, 0, 0, nw, nh)
        chain.push(next)
        cur = next
      }

      // match each requested block size to the closest chain member
      mips = LEVELS_B.map(B => {
        const target = Math.ceil(w / B)
        return chain.reduce((best, c) =>
          Math.abs(c.width - target) < Math.abs(best.width - target) ? c : best
        )
      })
    }

    const drawStatic = () => {
      ctx.globalAlpha = 1
      ctx.imageSmoothingEnabled = true
      ctx.clearRect(0, 0, cssW, cssH)
      ctx.drawImage(img, 0, 0, cssW, cssH)
    }

    const drawMip = (mip: HTMLCanvasElement, alpha: number) => {
      ctx.globalAlpha = alpha
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(mip, 0, 0, mip.width, mip.height, 0, 0, cssW, cssH)
    }

    const drawSharp = (alpha: number) => {
      ctx.globalAlpha = alpha
      ctx.imageSmoothingEnabled = true
      ctx.drawImage(img, 0, 0, cssW, cssH)
    }

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      if (done || !cssW) return
      if (!start) {
        if (!inView || !img.complete || !img.naturalWidth || !mips.length) return
        start = now
      }
      const t = now - start
      ctx.clearRect(0, 0, cssW, cssH)
      ctx.globalAlpha = 1

      /* 1. materialize — bands refine from blocks to sharp, left to right */
      if (t < SWEEP_START) {
        const bw = cssW / BANDS
        for (let i = 0; i < BANDS; i++) {
          const p = clamp01((t - i * BAND_DELAY) / BAND_RAMP)
          if (p <= 0) continue
          const e = easeInOut(p)
          const alphaBand = clamp01(p * 3)
          const x0 = i * bw
          const x1 = i === BANDS - 1 ? cssW : (i + 1) * bw
          const ramp = e * LEVELS_B.length // 0..LEVELS_B.length

          ctx.save()
          ctx.beginPath()
          ctx.rect(x0, 0, x1 - x0, cssH)
          ctx.clip()

          if (ramp < LEVELS_B.length - 1) {
            const li = Math.floor(ramp)
            const f = ramp - li
            drawMip(mips[li], alphaBand * (1 - f))
            if (f > 0) drawMip(mips[li + 1], alphaBand * f)
          } else {
            const f = ramp - (LEVELS_B.length - 1)
            drawMip(mips[LEVELS_B.length - 1], alphaBand * (1 - f))
            if (f > 0) drawSharp(alphaBand * f)
          }
          ctx.restore()
        }
        return
      }

      /* 2. sharp image + one soft light shine across it */
      drawStatic()
      const sp = clamp01((t - SWEEP_START) / SWEEP_DUR)
      const x = -cssW * 0.5 + easeInOut(sp) * cssW * 1.6
      ctx.save()
      ctx.globalCompositeOperation = 'source-atop' // only brighten image pixels
      const g = ctx.createLinearGradient(
        x - cssW * 0.22,
        cssH,
        x + cssW * 0.22,
        0
      )
      g.addColorStop(0, 'rgba(255,255,255,0)')
      g.addColorStop(0.5, 'rgba(255,255,255,0.85)')
      g.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, cssW, cssH)
      ctx.restore()

      /* 3. settle — static image, animation stops for good */
      if (t >= SETTLE) {
        drawStatic()
        done = true
        cancelAnimationFrame(raf)
      }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.clientWidth
      if (!w) return
      cssW = w
      cssH = Math.round(w * (height / width))
      canvas.width = Math.round(cssW * dpr)
      canvas.height = Math.round(cssH * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildMips()
      if (reduced || done) drawStatic()
    }

    const ro = new ResizeObserver(() => resize())
    ro.observe(canvas)

    const io = new IntersectionObserver(entries => {
      inView = entries[0]?.isIntersecting ?? false
      if (reduced && inView) drawStatic()
    })
    io.observe(canvas)

    const onLoad = () => {
      buildMips()
      if (reduced) drawStatic()
    }
    img.addEventListener('load', onLoad)

    if (!reduced) raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      img.removeEventListener('load', onLoad)
    }
  }, [src, width, height])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ aspectRatio: `${width} / ${height}` }}
      role='img'
      aria-label={alt}
    />
  )
}

export default MaterializeImage
