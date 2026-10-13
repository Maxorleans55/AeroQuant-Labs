'use client'
import { useEffect, useRef } from 'react'

type AssembleImageProps = {
  /** path to the image in /public */
  src: string
  alt: string
  /** intrinsic pixel size of the image — keeps layout stable pre-hydration */
  width: number
  height: number
  className?: string
}

/* One-shot hero entrance — it does NOT loop.
   The illustration is partitioned into 7 edge-adjacent regions (plant
   top, plant base, top-centre loop + head + laptop, lamp cluster,
   desk/chair/legs, floor, right edge). Each region flies into place
   from its own direction with a staggered spring, so the scene reads as
   an assembly of individual components. A soft light shine passes over
   the settled image, then the canvas draws the static original and the
   animation loop is cancelled for good. */

type Piece = {
  sx: number // source rect in image px
  sy: number
  sw: number
  sh: number
  fx: number // entrance offset (image px) — comes IN from this direction
  fy: number
  delay: number // ms
}

const PIECES: Piece[] = [
  { sx: 0, sy: 0, sw: 270, sh: 330, fx: -70, fy: 0, delay: 0 }, // swoosh tail + upper plant
  { sx: 0, sy: 330, sw: 270, sh: 360, fx: -60, fy: 0, delay: 130 }, // lower plant + pot
  { sx: 270, sy: 0, sw: 275, sh: 300, fx: 0, fy: -60, delay: 60 }, // loop, hearts, head/chest, laptop
  { sx: 545, sy: 0, sw: 155, sh: 300, fx: 45, fy: -55, delay: 210 }, // lamp, bird, notes, mug
  { sx: 270, sy: 300, sw: 430, sh: 270, fx: 0, fy: 60, delay: 160 }, // desk, chair, legs
  { sx: 270, sy: 570, sw: 430, sh: 120, fx: 0, fy: 50, delay: 330 }, // floor strip
  { sx: 700, sy: 0, sw: 92, sh: 690, fx: 65, fy: 0, delay: 270 }, // right edge + pink streak
]

const PIECE_DUR = 750
const ASSEMBLED = Math.max(...PIECES.map(p => p.delay)) + PIECE_DUR // 1080
const SHINE_START = ASSEMBLED + 70
const SHINE_DUR = 750
const SETTLE = SHINE_START + SHINE_DUR + 80

const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t)
/* springy landing — overshoots slightly past the resting position */
const easeOutBack = (t: number) => {
  const c1 = 1.35
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}
const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

const AssembleImage = ({
  src,
  alt,
  width,
  height,
  className,
}: AssembleImageProps) => {
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
    let scale = 1
    let raf = 0
    let start = 0
    let done = false
    let inView = false

    const drawStatic = () => {
      ctx.globalAlpha = 1
      ctx.imageSmoothingEnabled = true
      ctx.clearRect(0, 0, cssW, cssH)
      ctx.drawImage(img, 0, 0, cssW, cssH)
    }

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      if (done || !cssW) return
      if (!start) {
        if (!inView || !img.complete || !img.naturalWidth) return
        start = now
      }
      const t = now - start
      ctx.clearRect(0, 0, cssW, cssH)
      ctx.globalAlpha = 1

      /* 1. assemble — each region springs in from its own direction */
      if (t < SHINE_START) {
        ctx.imageSmoothingEnabled = true
        for (const piece of PIECES) {
          const p = clamp01((t - piece.delay) / PIECE_DUR)
          if (p <= 0) continue
          const o = 1 - easeOutBack(p) // 1 -> 0 with slight overshoot
          const dx = (piece.sx + o * piece.fx) * scale
          const dy = (piece.sy + o * piece.fy) * scale
          const dw = piece.sw * scale
          const dh = piece.sh * scale
          const s = 1 + Math.max(0, o) * 0.05
          const cx = dx + dw / 2
          const cy = dy + dh / 2
          ctx.save()
          ctx.globalAlpha = clamp01(p * 1.6)
          ctx.translate(cx, cy)
          ctx.scale(s, s)
          ctx.translate(-cx, -cy)
          ctx.drawImage(img, piece.sx, piece.sy, piece.sw, piece.sh, dx, dy, dw, dh)
          ctx.restore()
        }
        return
      }

      /* 2. sharp image + one soft light shine across it */
      drawStatic()
      const sp = clamp01((t - SHINE_START) / SHINE_DUR)
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

      /* 3. settle — static original, animation stops for good */
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
      scale = cssW / width
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

export default AssembleImage
