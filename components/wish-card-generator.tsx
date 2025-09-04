"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import NextImage from "next/image"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

/**
 * Floating icon → prompt for name → generate PNG wish card
 * Card style references the provided Kerala boat artwork.
 */
export default function WishCardGenerator() {
  const [name, setName] = useState("")
  const [cardUrl, setCardUrl] = useState("")
  const [open, setOpen] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [hasDownloaded, setHasDownloaded] = useState(false)

  // preload boat art (using provided Source URL as requested)
  const boat = useMemo(() => {
    if (typeof window === "undefined") return null as unknown as HTMLImageElement
    const img = new window.Image()
    img.crossOrigin = "anonymous"
    img.src =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9ddabbb5cbc0bd1fbab42614b4255f41.jpg-vHXPSjVfzJtDJlIILybbW5UJcbaDHb.jpeg"
    return img
  }, [])

  useEffect(() => {
    if (!open || !name) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    const width = 1080
    const height = 1350
    canvas.width = width
    canvas.height = height

    // background panel (aesthetic cream + gold border)
    const bg = ctx.createLinearGradient(0, 0, 0, height)
    bg.addColorStop(0, "#FAF7F2")
    bg.addColorStop(1, "#F5E9D8")
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, width, height)

    // gold frame
    const rrect = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath()
      ctx.moveTo(x + r, y)
      ctx.arcTo(x + w, y, x + w, y + h, r)
      ctx.arcTo(x + w, y + h, x, y + h, r)
      ctx.arcTo(x, y + h, x, y, r)
      ctx.arcTo(x, y, x + w, y, r)
      ctx.closePath()
    }
    ctx.fillStyle = "#E8B13E"
    rrect(40, 40, width - 80, height - 80, 48)
    ctx.fill()

    ctx.fillStyle = "#FFF8EE"
    rrect(60, 60, width - 120, height - 120, 36)
    ctx.fill()

    // title
    ctx.fillStyle = "#7F1D1D"
    ctx.font = "700 84px ui-sans-serif, system-ui"
    ctx.textAlign = "center"
    ctx.fillText("Happy Onam", width / 2, 200)

    const draw = () => {
      const iw = 900
      const ih = (boat.height / boat.width) * iw || 520
      ctx.save()
      ctx.globalAlpha = 0.98
      ctx.drawImage(boat as HTMLImageElement, (width - iw) / 2, 260, iw, ih)
      ctx.restore()

      // name in elegant script (use next/font variable; fallback to cursive)
      ctx.fillStyle = "#111827"
      ctx.textAlign = "center"
      ctx.shadowColor = "rgba(0,0,0,0.2)"
      ctx.shadowBlur = 8
      ctx.font = "normal 400 96px var(--font-great-vibes), cursive"
      ctx.fillText(name, width / 2, 980)

      ctx.shadowBlur = 0
      ctx.fillStyle = "#6B7280"
      ctx.font = "500 36px ui-sans-serif, system-ui"
      ctx.fillText("Wishing you prosperity, joy, and togetherness.", width / 2, 1050)

      // Safely export to PNG (handles possible CORS-tainted canvas)
      try {
        const url = canvas.toDataURL("image/png")
        setCardUrl(url)
      } catch (err) {
        console.log("[v0] toDataURL failed, likely due to CORS:", err)
        setCardUrl("")
      }
    }

    if (boat && (boat as HTMLImageElement).complete) draw()
    else if (boat) (boat as HTMLImageElement).onload = draw
  }, [open, name, boat])

  useEffect(() => {
    if (open && cardUrl && !hasDownloaded) {
      download()
      setHasDownloaded(true)
    }
  }, [open, cardUrl, hasDownloaded])

  const promptName = () => {
    const n = window.prompt("Enter your name for the Onam wish card:")
    if (!n) return
    setHasDownloaded(false) // reset guard for a new card
    setName(n.trim())
    setOpen(true)
  }

  const download = () => {
    if (!cardUrl) return
    const a = document.createElement("a")
    a.href = cardUrl
    a.download = `happy-onam-${name || "friend"}.png`
    a.click()
  }

  const handleShare = async () => {
    if (!cardUrl) return
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "Happy Onam", url: cardUrl })
      } catch (_err) {
        // user canceled share or not allowed; no-op
      }
    } else {
      download()
    }
  }

  return (
    <>
      <button
        aria-label="Create wish card"
        onClick={promptName}
        className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-orange-600 text-white shadow-lg hover:bg-orange-700 transition-colors"
      >
        <Sparkles className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white p-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Your Onam Wish Card</h2>
              <Button
                variant="ghost"
                onClick={() => {
                  setOpen(false)
                  setHasDownloaded(false)
                }}
              >
                Close
              </Button>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border bg-muted/20 p-2">
                <canvas ref={canvasRef} className="h-auto w-full rounded-md" />
              </div>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Download and share your personalized Happy Onam card.</p>
                {cardUrl && (
                  <>
                    {/* Use NextImage alias for UI rendering */}
                    <NextImage
                      src={cardUrl || "/placeholder.svg"}
                      alt="Generated Onam wish card"
                      width={600}
                      height={750}
                      className="rounded border"
                    />
                    <div className="flex gap-2">
                      <Button onClick={download} className="bg-orange-600 hover:bg-orange-700">
                        Download PNG
                      </Button>
                      <Button variant="outline" onClick={handleShare}>
                        Share
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
