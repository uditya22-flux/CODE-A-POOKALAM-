"use client"
import { useRef, useEffect, useState, useCallback } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import type { FlowerType } from "./flower-selection-panel"

interface PlacedFlower {
  x: number
  y: number
  flower: FlowerType
  ring: number
}

interface InteractivePookalamCanvasProps {
  selectedFlower: FlowerType | null
  size?: number
}

export default function InteractivePookalamCanvas({ selectedFlower, size = 400 }: InteractivePookalamCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [placedFlowers, setPlacedFlowers] = useState<PlacedFlower[]>([])
  const [currentRing, setCurrentRing] = useState(1)
  const [isDrawing, setIsDrawing] = useState(false)

  const rings = [
    { ring: 1, radius: 60, color: "#FFF3E0" },
    { ring: 2, radius: 100, color: "#FFE0B2" },
    { ring: 3, radius: 140, color: "#FFCC80" },
    { ring: 4, radius: 180, color: "#FFB74D" },
  ]

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = size / 2
    const centerY = size / 2

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    // Draw ring guides
    rings.forEach(({ radius, color }) => {
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
      ctx.stroke()
    })

    // Highlight current ring
    const currentRingData = rings.find((r) => r.ring === currentRing)
    if (currentRingData) {
      ctx.strokeStyle = "#FF6B35"
      ctx.lineWidth = 3
      ctx.setLineDash([])
      ctx.beginPath()
      ctx.arc(centerX, centerY, currentRingData.radius, 0, 2 * Math.PI)
      ctx.stroke()
    }

    // Draw placed flowers
    placedFlowers.forEach(({ x, y, flower }) => {
      ctx.fillStyle = flower.color
      ctx.beginPath()
      ctx.arc(x, y, flower.size, 0, 2 * Math.PI)
      ctx.fill()

      // Add flower center
      ctx.fillStyle = "#333"
      ctx.beginPath()
      ctx.arc(x, y, 2, 0, 2 * Math.PI)
      ctx.fill()
    })

    // Draw center circle
    ctx.fillStyle = "#8BC34A"
    ctx.beginPath()
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI)
    ctx.fill()

    ctx.fillStyle = "#4CAF50"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Center", centerX, centerY + 4)
  }, [size, placedFlowers, currentRing])

  useEffect(() => {
    drawCanvas()
  }, [drawCanvas])

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!selectedFlower) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const centerX = size / 2
    const centerY = size / 2
    const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)

    // Check if click is within current ring bounds
    const currentRingData = rings.find((r) => r.ring === currentRing)
    if (!currentRingData) return

    const tolerance = 20
    if (distance >= currentRingData.radius - tolerance && distance <= currentRingData.radius + tolerance) {
      const newFlower: PlacedFlower = {
        x,
        y,
        flower: selectedFlower,
        ring: currentRing,
      }
      setPlacedFlowers((prev) => [...prev, newFlower])
    }
  }

  const clearRing = (ringNumber: number) => {
    setPlacedFlowers((prev) => prev.filter((flower) => flower.ring !== ringNumber))
  }

  const clearAll = () => {
    setPlacedFlowers([])
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Ring Selection */}
      <div className="flex gap-2 flex-wrap justify-center">
        {rings.map(({ ring }) => (
          <Button
            key={ring}
            variant={currentRing === ring ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentRing(ring)}
            className={currentRing === ring ? "bg-orange-600 hover:bg-orange-700" : ""}
          >
            Ring {ring}
          </Button>
        ))}
      </div>

      {/* Canvas */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          onClick={handleCanvasClick}
          className="border-2 border-orange-200 rounded-lg cursor-crosshair bg-white shadow-lg"
          style={{ maxWidth: "100%", height: "auto" }}
        />

        {!selectedFlower && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
            <p className="text-white font-medium text-center px-4">Select a flower to start creating your Pookalam</p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-2 flex-wrap justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => clearRing(currentRing)}
          disabled={!placedFlowers.some((f) => f.ring === currentRing)}
        >
          Clear Ring {currentRing}
        </Button>
        <Button variant="destructive" size="sm" onClick={clearAll} disabled={placedFlowers.length === 0}>
          Clear All
        </Button>
      </div>

      {selectedFlower && (
        <p className="text-sm text-orange-700 text-center">
          Click on Ring {currentRing} to place {selectedFlower.name} flowers
        </p>
      )}
    </div>
  )
}
