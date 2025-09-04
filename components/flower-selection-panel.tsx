"use client"
import { Button } from "@/components/ui/button"

export interface FlowerType {
  id: string
  name: string
  color: string
  size: number
  malayalamName: string
}

const KERALA_FLOWERS: FlowerType[] = [
  { id: "jasmine", name: "Jasmine", color: "#FFFFFF", size: 8, malayalamName: "മല്ലി" },
  { id: "marigold", name: "Marigold", color: "#FFD700", size: 12, malayalamName: "ചെണ്ടുമല്ലി" },
  { id: "rose", name: "Rose", color: "#FF69B4", size: 15, malayalamName: "റോസ്" },
  { id: "hibiscus", name: "Hibiscus", color: "#DC143C", size: 18, malayalamName: "ചെമ്പരത്തി" },
  { id: "lotus", name: "Lotus", color: "#FFB6C1", size: 20, malayalamName: "താമര" },
  { id: "chrysanthemum", name: "Chrysanthemum", color: "#FFFF00", size: 10, malayalamName: "സേവന്തി" },
  { id: "ixora", name: "Ixora", color: "#FF4500", size: 6, malayalamName: "തേച്ചി" },
  { id: "bougainvillea", name: "Bougainvillea", color: "#FF1493", size: 8, malayalamName: "കടലാസ്പൂവ്" },
  { id: "nerium", name: "Nerium", color: "#FFB347", size: 12, malayalamName: "അരളി" },
  { id: "crossandra", name: "Crossandra", color: "#FFA500", size: 7, malayalamName: "അബോളി" },
]

interface FlowerSelectionPanelProps {
  selectedFlower: FlowerType | null
  onFlowerSelect: (flower: FlowerType) => void
}

export default function FlowerSelectionPanel({ selectedFlower, onFlowerSelect }: FlowerSelectionPanelProps) {
  return (
    <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-lg">
      <h3 className="text-lg font-semibold text-orange-700 mb-4 text-center">Choose Your Flowers</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {KERALA_FLOWERS.map((flower) => (
          <Button
            key={flower.id}
            variant={selectedFlower?.id === flower.id ? "default" : "outline"}
            className={`flex flex-col items-center gap-2 h-auto p-3 ${
              selectedFlower?.id === flower.id ? "bg-orange-600 hover:bg-orange-700 text-white" : "hover:bg-orange-50"
            }`}
            onClick={() => onFlowerSelect(flower)}
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
