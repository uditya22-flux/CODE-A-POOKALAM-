"use client"

import { useEffect, useState } from "react"

interface Flower {
  id: number
  left: number
  animationDelay: number
  animationDuration: number
  type: "marigold" | "jasmine" | "hibiscus" | "rose"
}

const flowerColors = {
  marigold: "#FFA500",
  jasmine: "#FFFAF0",
  hibiscus: "#DC143C",
  rose: "#FFB6C1",
}

const flowerTypes: Array<keyof typeof flowerColors> = ["marigold", "jasmine", "hibiscus", "rose"]

export default function FallingFlowers() {
  const [flowers, setFlowers] = useState<Flower[]>([])

  useEffect(() => {
    const generateFlowers = () => {
      const newFlowers: Flower[] = []
      for (let i = 0; i < 15; i++) {
        newFlowers.push({
          id: i,
          left: Math.random() * 100,
          animationDelay: Math.random() * 10,
          animationDuration: 8 + Math.random() * 6,
          type: flowerTypes[Math.floor(Math.random() * flowerTypes.length)],
        })
      }
      setFlowers(newFlowers)
    }

    generateFlowers()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {flowers.map((flower) => (
        <div
          key={flower.id}
          className="absolute animate-fall opacity-60"
          style={{
            left: `${flower.left}%`,
            animationDelay: `${flower.animationDelay}s`,
            animationDuration: `${flower.animationDuration}s`,
            animationIterationCount: "infinite",
            animationTimingFunction: "linear",
          }}
        >
          <div
            className="w-4 h-4 rounded-full shadow-sm"
            style={{
              backgroundColor: flowerColors[flower.type],
              boxShadow: `0 0 8px ${flowerColors[flower.type]}40`,
            }}
          >
            {/* Flower petals */}
            <div className="relative w-full h-full">
              <div
                className="absolute inset-0 rounded-full opacity-80"
                style={{ backgroundColor: flowerColors[flower.type] }}
              />
              <div
                className="absolute top-0.5 left-0.5 w-3 h-3 rounded-full opacity-60"
                style={{ backgroundColor: "#FFFFFF" }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
