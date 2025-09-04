"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import FlowerSelectionPanel, { type FlowerType } from "./flower-selection-panel"
import InteractivePookalamCanvas from "./interactive-pookalam-canvas"

interface PookalamBuilderPortalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PookalamBuilderPortal({ isOpen, onClose }: PookalamBuilderPortalProps) {
  const [selectedFlower, setSelectedFlower] = useState<FlowerType | null>(null)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border-4 border-gradient-to-r from-orange-300 to-yellow-300 relative">
        {/* Decorative Onam elements */}
        <div className="absolute top-4 left-4 w-16 h-16 opacity-20">
          <img src="/kerala-coconut-palm-tree-silhouette.jpg" alt="Palm" className="w-full h-full" />
        </div>
        <div className="absolute top-4 right-20 w-12 h-12 opacity-20">
          <img src="/traditional-kerala-lamp-diya.jpg" alt="Lamp" className="w-full h-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-orange-200 bg-gradient-to-r from-orange-100 to-yellow-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12">
              <img src="/colorful-pookalam-flower-pattern.jpg" alt="Pookalam" className="w-full h-full rounded-full" />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-700 to-red-600 bg-clip-text text-transparent">
                Create Your Own Pookalam
              </h2>
              <p className="text-orange-600 mt-1 font-medium">
                Design a beautiful floral arrangement with Kerala flowers
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-orange-700 hover:bg-orange-200 rounded-full"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Instructions with Onam imagery */}
          <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl p-6 text-center border-2 border-orange-200 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9ddabbb5cbc0bd1fbab42614b4255f41.jpg-vHXPSjVfzJtDJlIILybbW5UJcbaDHb.jpeg"
                alt="Kerala boat"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-4">
                <img src="/kerala-traditional-flower-marigold.jpg" alt="Flower" className="w-10 h-10 mr-3" />
                <h3 className="text-xl font-bold text-orange-800">How to Create Your Pookalam</h3>
                <img src="/kerala-traditional-flower-jasmine.jpg" alt="Flower" className="w-10 h-10 ml-3" />
              </div>
              <div className="text-sm text-orange-700 space-y-2 bg-white/80 rounded-lg p-4">
                <p className="font-semibold">🌸 Choose a flower from the selection below</p>
                <p className="font-semibold">🎯 Select a ring (1-4) where you want to place flowers</p>
                <p className="font-semibold">✨ Click on the ring boundary to place flowers</p>
                <p className="font-semibold">🎨 Mix different flowers and rings to create your unique design!</p>
              </div>
            </div>
          </div>

          {/* Flower Selection */}
          <FlowerSelectionPanel selectedFlower={selectedFlower} onFlowerSelect={setSelectedFlower} />

          {/* Interactive Canvas with decorative frame */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-300 via-yellow-300 to-red-300 rounded-full opacity-30 blur-lg"></div>
              <div className="relative bg-white rounded-full p-4 shadow-2xl border-4 border-orange-200">
                <InteractivePookalamCanvas selectedFlower={selectedFlower} size={450} />
              </div>
            </div>
          </div>

          {/* Tips with Kerala cultural elements */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-200 relative overflow-hidden">
            <div className="absolute top-2 right-2 w-16 h-16 opacity-20">
              <img src="/kerala-traditional-elephant-silhouette.jpg" alt="Elephant" className="w-full h-full" />
            </div>
            <div className="relative z-10">
              <h4 className="text-lg font-bold text-yellow-800 mb-3 flex items-center">
                <img src="/traditional-kerala-oil-lamp.jpg" alt="Lamp" className="w-6 h-6 mr-2" />
                Traditional Pookalam Wisdom
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="text-sm text-yellow-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">🌺</span>
                    <span>Start from the outer rings and work your way inward</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">🎨</span>
                    <span>Use contrasting colors for a vibrant look</span>
                  </li>
                </ul>
                <ul className="text-sm text-yellow-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">⚪</span>
                    <span>Traditional Pookalams often use white flowers in the center</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">🔄</span>
                    <span>Try alternating flower types for interesting patterns</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center p-6 border-t-2 border-orange-200 bg-gradient-to-r from-orange-100 to-yellow-100">
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-12 py-3 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition-all"
          >
            🌸 Done Creating 🌸
          </Button>
        </div>
      </div>
    </div>
  )
}
