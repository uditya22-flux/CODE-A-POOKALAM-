"use client"

import { useEffect, useRef } from "react"

/**
 * Swirling Pookalam design inspired by traditional Kerala patterns
 */
export default function PookalamCanvas({
  size = 520,
  onClick,
}: {
  size?: number
  onClick?: () => void
}) {
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

    const deepMaroon = "#800020"
    const brightRed = "#DC143C"
    const vibrantOrange = "#FF4500"
    const goldenYellow = "#FFD700"
    const pureWhite = "#FFFFFF"
    const leafGreen = "#228B22"
    const darkGreen = "#006400"

    // Enhanced drop shadow
    ctx.beginPath()
    ctx.arc(cx, cy, outerR + 8, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(0,0,0,0.25)"
    ctx.fill()

    const outerRings = [
      { color: deepMaroon, thickness: 0.05 },
      { color: vibrantOrange, thickness: 0.05 },
      { color: goldenYellow, thickness: 0.05 },
      { color: pureWhite, thickness: 0.05 },
      { color: brightRed, thickness: 0.05 },
      { color: vibrantOrange, thickness: 0.05 },
      { color: goldenYellow, thickness: 0.05 },
      { color: pureWhite, thickness: 0.05 },
    ]

    let currentRadius = outerR

    // Draw outer concentric rings
    outerRings.forEach((ring) => {
      const ringThickness = outerR * ring.thickness
      ctx.beginPath()
      ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2)
      ctx.arc(cx, cy, currentRadius - ringThickness, 0, Math.PI * 2, true)
      ctx.fillStyle = ring.color
      ctx.fill()
      currentRadius -= ringThickness
    })

    const centerRadius = currentRadius * 0.95

    // Background for center swirl
    ctx.beginPath()
    ctx.arc(cx, cy, centerRadius, 0, Math.PI * 2)
    ctx.fillStyle = pureWhite
    ctx.fill()

    // Create the flowing swirl pattern
    const numSwirls = 8
    const swirlColors = [
      deepMaroon,
      vibrantOrange,
      goldenYellow,
      pureWhite,
      leafGreen,
      brightRed,
      vibrantOrange,
      goldenYellow,
    ]

    for (let i = 0; i < numSwirls; i++) {
      const baseAngle = (i * Math.PI * 2) / numSwirls
      const color = swirlColors[i % swirlColors.length]

      // Create curved swirl segments that flow from center outward
      ctx.beginPath()
      ctx.moveTo(cx, cy)

      const segments = 12
      for (let j = 0; j <= segments; j++) {
        const t = j / segments
        const angle = baseAngle + t * Math.PI * 1.8 // Spiral curve
        const radius = t * centerRadius * 0.85
        const x = cx + Math.cos(angle) * radius
        const y = cy + Math.sin(angle) * radius

        if (j === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      // Create the swirl width
      for (let j = segments; j >= 0; j--) {
        const t = j / segments
        const angle = baseAngle + t * Math.PI * 1.8
        const radius = t * centerRadius * 0.85
        const offsetAngle = angle + Math.PI / (numSwirls * 2)
        const offsetRadius = Math.min(radius + centerRadius * 0.08, centerRadius * 0.85)
        const x = cx + Math.cos(offsetAngle) * offsetRadius
        const y = cy + Math.sin(offsetAngle) * offsetRadius
        ctx.lineTo(x, y)
      }

      ctx.closePath()
      ctx.fillStyle = color
      ctx.fill()
    }

    for (let i = 0; i < numSwirls; i++) {
      const angle = (i * Math.PI * 2) / numSwirls + Math.PI / (numSwirls * 2)

      ctx.beginPath()
      ctx.moveTo(cx + Math.cos(angle) * centerRadius * 0.1, cy + Math.sin(angle) * centerRadius * 0.1)
      ctx.lineTo(cx + Math.cos(angle) * centerRadius * 0.8, cy + Math.sin(angle) * centerRadius * 0.8)
      ctx.lineWidth = 3
      ctx.strokeStyle = leafGreen
      ctx.stroke()
    }

    // Central decorative dot
    ctx.beginPath()
    ctx.arc(cx, cy, centerRadius * 0.08, 0, Math.PI * 2)
    ctx.fillStyle = deepMaroon
    ctx.fill()

    ctx.beginPath()
    ctx.arc(cx, cy, outerR + 2, 0, Math.PI * 2)
    ctx.lineWidth = 4
    ctx.strokeStyle = deepMaroon
    ctx.stroke()
  }, [size])

  return (
    <canvas
      ref={ref}
      className="rounded-full shadow-xl cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105"
      aria-label="Traditional swirling Pookalam design"
      onClick={onClick}
    />
  )
}
