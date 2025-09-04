"use client"

import { useEffect, useRef } from "react"

/**
 * Coded Pookalam on <canvas>, inspired by the provided reference.
 * Uses concentric wedge rings in warm hues and a simple central Kerala scene.
 */
export default function PookalamCanvas({ size = 520 }: { size?: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`

    const ctx = canvas.getContext("2d")!
    ctx.scale(dpr, dpr)

    const cx = size / 2
    const cy = size / 2
    const outerR = size * 0.48

    // Palette (UI colors kept simple; drawing uses these solids)
    const red = "#7F1D1D"
    const orange = "#EA580C"
    const yellow = "#F59E0B"
    const white = "#FFFFFF"
    const black = "#111827"

    // soft drop
    ctx.beginPath()
    ctx.arc(cx, cy, outerR, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(0,0,0,0.06)"
    ctx.fill()

    const ringCount = 5
    const petals = 24
    const angleStep = (Math.PI * 2) / petals
    const ringThickness = outerR * 0.11 // even thickness for each ring
    const gap = ringThickness * 0.06 // tiny gap to avoid anti-aliased overlaps

    const schemes: ReadonlyArray<[string, string]> = [
      [red, orange],
      [yellow, white],
      [orange, yellow],
      [white, orange],
      [orange, red],
    ]

    for (let i = 0; i < ringCount; i++) {
      const rOuter = outerR - i * ringThickness
      const rInner = rOuter - ringThickness + gap
      const offset = (i % 2 === 1 ? 0.5 : 0) * angleStep // alternate offset for cleaner tessellation
      const [cA, cB] = schemes[i % schemes.length]

      for (let j = 0; j < petals; j++) {
        const a0 = j * angleStep + offset
        const a1 = a0 + angleStep
        ctx.beginPath()
        ctx.arc(cx, cy, rOuter, a0, a1)
        ctx.arc(cx, cy, rInner, a1, a0, true)
        ctx.closePath()
        ctx.fillStyle = j % 2 === 0 ? cA : cB
        ctx.fill()
        ctx.strokeStyle = "rgba(255,255,255,0.08)"
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }

    // center disc sized from inner-most ring for consistent spacing
    const innerMost = outerR - ringCount * ringThickness
    const centerR = innerMost * 0.9
    const grad = ctx.createRadialGradient(cx, cy, centerR * 0.1, cx, cy, centerR)
    grad.addColorStop(0, "#FDBA74")
    grad.addColorStop(1, "#EA580C")
    ctx.beginPath()
    ctx.arc(cx, cy, centerR, 0, Math.PI * 2)
    ctx.fillStyle = grad
    ctx.fill()

    // land
    const green = "#2F8F46"
    ctx.beginPath()
    ctx.moveTo(cx - centerR * 0.95, cy + centerR * 0.15)
    ctx.quadraticCurveTo(cx, cy + centerR * 0.55, cx + centerR * 0.95, cy + centerR * 0.15)
    ctx.lineTo(cx + centerR * 0.95, cy + centerR * 0.5)
    ctx.lineTo(cx - centerR * 0.95, cy + centerR * 0.5)
    ctx.closePath()
    ctx.fillStyle = green
    ctx.fill()

    // boat silhouette
    ctx.beginPath()
    ctx.moveTo(cx - centerR * 0.9, cy + centerR * 0.1)
    ctx.quadraticCurveTo(cx, cy + centerR * 0.3, cx + centerR * 0.9, cy + centerR * 0.05)
    ctx.lineTo(cx + centerR * 0.9, cy + centerR * 0.16)
    ctx.quadraticCurveTo(cx, cy + centerR * 0.36, cx - centerR * 0.9, cy + centerR * 0.2)
    ctx.closePath()
    ctx.fillStyle = black
    ctx.fill()

    // palms
    const palm = (x: number, h: number) => {
      ctx.beginPath()
      ctx.moveTo(x, cy - h * 0.1)
      ctx.quadraticCurveTo(x - h * 0.05, cy - h * 0.4, x, cy - h)
      ctx.lineWidth = Math.max(1.5, centerR * 0.03)
      ctx.strokeStyle = black
      ctx.stroke()
      for (let j = 0; j < 6; j++) {
        const a = -Math.PI / 2 + (j - 2.5) * 0.35
        ctx.beginPath()
        ctx.moveTo(x, cy - h)
        ctx.lineTo(x + Math.cos(a) * centerR * 0.35, cy - h + Math.sin(a) * centerR * 0.35)
        ctx.stroke()
      }
    }
    palm(cx - centerR * 0.25, centerR * 0.8)
    palm(cx - centerR * 0.05, centerR * 0.65)

    // inner border ring
    ctx.beginPath()
    ctx.arc(cx, cy, centerR * 1.05, 0, Math.PI * 2)
    ctx.lineWidth = 4
    ctx.strokeStyle = white
    ctx.stroke()
  }, [size])

  return <canvas ref={ref} className="rounded-full shadow-md" aria-label="Pookalam design" />
}
