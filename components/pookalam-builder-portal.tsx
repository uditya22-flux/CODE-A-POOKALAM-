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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-orange-200">
          <div>
            <h2 className="text-2xl font-bold text-orange-800">Create Your Own Pookalam</h2>
            <p className="text-orange-600 mt-1">Design a beautiful floral arrangement with Kerala flowers</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-orange-700 hover:bg-orange-100">
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Instructions */}
          <div className="bg-orange-100 rounded-lg p-4 text-center">
            <h3 className="font-semibold text-orange-800 mb-2">How to Create Your Pookalam</h3>
            <div className="text-sm text-orange-700 space-y-1">
              <p>1. Choose a flower from the selection below</p>
              <p>2. Select a ring (1-4) where you want to place flowers</p>
              <p>3. Click on the ring boundary to place flowers</p>
              <p>4. Mix different flowers and rings to create your unique design!</p>
            </div>
          </div>

          {/* Flower Selection */}
          <FlowerSelectionPanel selectedFlower={selectedFlower} onFlowerSelect={setSelectedFlower} />

          {/* Interactive Canvas */}
          <div className="flex justify-center">
            <InteractivePookalamCanvas selectedFlower={selectedFlower} size={450} />
          </div>

          {/* Tips */}
          <div className="bg-yellow-50 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">💡 Pro Tips:</h4>
            <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
              <li>Start from the outer rings and work your way inward</li>
              <li>Use contrasting colors for a vibrant look</li>
              <li>Traditional Pookalams often use white flowers in the center</li>
              <li>Try alternating flower types for interesting patterns</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center p-6 border-t border-orange-200">
          <Button onClick={onClose} className="bg-orange-600 hover:bg-orange-700 text-white px-8">
            Done Creating
          </Button>
        </div>
      </div>
    </div>
  )
}
