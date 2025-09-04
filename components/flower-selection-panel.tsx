"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export interface FlowerType {
  id: string
  name: string
  color: string
  size: number
  malayalamName: string
  description: string
  significance: string
}

const KERALA_FLOWERS: FlowerType[] = [
  {
    id: "jasmine",
    name: "Jasmine",
    color: "#FFFFFF",
    size: 8,
    malayalamName: "മല്ലി",
    description: "Small, fragrant white flowers that bloom at night",
    significance: "Symbol of purity and divine love in Kerala culture",
  },
  {
    id: "marigold",
    name: "Marigold",
    color: "#FFD700",
    size: 12,
    malayalamName: "ചെണ്ടുമല്ലി",
    description: "Bright golden flowers used extensively in festivals",
    significance: "Represents prosperity and good fortune",
  },
  {
    id: "rose",
    name: "Rose",
    color: "#FF69B4",
    size: 15,
    malayalamName: "റോസ്",
    description: "Classic fragrant flower in various colors",
    significance: "Symbol of love and beauty",
  },
  {
    id: "hibiscus",
    name: "Hibiscus",
    color: "#DC143C",
    size: 18,
    malayalamName: "ചെമ്പരത്തി",
    description: "Large red flowers, Kerala's state flower",
    significance: "Sacred to Goddess Kali, represents divine feminine power",
  },
  {
    id: "lotus",
    name: "Lotus",
    color: "#FFB6C1",
    size: 20,
    malayalamName: "താമര",
    description: "Sacred flower that rises from muddy water",
    significance: "Symbol of spiritual enlightenment and purity",
  },
  {
    id: "chrysanthemum",
    name: "Chrysanthemum",
    color: "#FFFF00",
    size: 10,
    malayalamName: "സേവന്തി",
    description: "Bright yellow flowers that bloom in clusters",
    significance: "Represents longevity and joy",
  },
  {
    id: "ixora",
    name: "Ixora",
    color: "#FF4500",
    size: 6,
    malayalamName: "തേച്ചി",
    description: "Small orange-red flowers in dense clusters",
    significance: "Used in temple offerings and traditional medicine",
  },
  {
    id: "bougainvillea",
    name: "Bougainvillea",
    color: "#FF1493",
    size: 8,
    malayalamName: "കടലാസ്പൂവ്",
    description: "Colorful bracts that look like paper flowers",
    significance: "Represents passion and vibrant life",
  },
  {
    id: "nerium",
    name: "Nerium",
    color: "#FFB347",
    size: 12,
    malayalamName: "അരളി",
    description: "Fragrant flowers in pink, white, and yellow",
    significance: "Associated with beauty and resilience",
  },
  {
    id: "crossandra",
    name: "Crossandra",
    color: "#FFA500",
    size: 7,
    malayalamName: "അബോളി",
    description: "Bright orange flowers with delicate petals",
    significance: "Symbol of unfolding and new beginnings",
  },
]

interface FlowerSelectionPanelProps {
  selectedFlower: FlowerType | null
  onFlowerSelect: (flower: FlowerType) => void
}

export default function FlowerSelectionPanel({ selectedFlower, onFlowerSelect }: FlowerSelectionPanelProps) {
  const [showDetails, setShowDetails] = useState<string | null>(null)

  return (
    <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-orange-700">Choose Your Flowers</h3>
        <p className="text-xs text-orange-600">Click flowers to know details</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {KERALA_FLOWERS.map((flower) => (
          <div key={flower.id} className="relative">
            <Button
              variant={selectedFlower?.id === flower.id ? "default" : "outline"}
              className={`flex flex-col items-center gap-2 h-auto p-3 w-full ${
                selectedFlower?.id === flower.id ? "bg-orange-600 hover:bg-orange-700 text-white" : "hover:bg-orange-50"
              }`}
              onClick={() => onFlowerSelect(flower)}
              onDoubleClick={() => setShowDetails(showDetails === flower.id ? null : flower.id)}
            >
              {/* Flower visual representation */}
              <div
                className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center"
                style={{ backgroundColor: flower.color }}
              >
                <div
                  className="w-6 h-6 rounded-full"
                  style={{
                    backgroundColor: flower.color,
                    boxShadow: `inset 0 0 ${flower.size}px rgba(0,0,0,0.2)`,
                  }}
                />
              </div>
              <div className="text-center">
                <div className="text-xs font-medium">{flower.name}</div>
                <div className="text-xs opacity-70">{flower.malayalamName}</div>
              </div>
            </Button>

            {showDetails === flower.id && (
              <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-white rounded-lg shadow-xl border z-50 text-xs">
                <h4 className="font-semibold text-orange-700 mb-1">{flower.name}</h4>
                <p className="text-gray-600 mb-2">{flower.description}</p>
                <p className="text-orange-600 font-medium">{flower.significance}</p>
                <button onClick={() => setShowDetails(null)} className="mt-2 text-xs text-gray-500 hover:text-gray-700">
                  Close
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedFlower && (
        <div className="mt-4 p-3 bg-orange-50 rounded-lg text-center">
          <p className="text-sm text-orange-800">
            Selected: <span className="font-semibold">{selectedFlower.name}</span> ({selectedFlower.malayalamName})
          </p>
        </div>
      )}
    </div>
  )
}
