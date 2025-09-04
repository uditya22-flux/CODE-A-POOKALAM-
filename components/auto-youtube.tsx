"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from "lucide-react"

/**
 * Autoplays YouTube with simple play/pause control.
 */
export default function AutoYouTube({ videoId = "dUs4mAHzw74" }: { videoId?: string }) {
  const [muted, setMuted] = useState(false) // Start unmuted to attempt autoplay with sound
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  const base = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0`

  useEffect(() => {
    if (!iframeRef.current) return
    iframeRef.current.src = `${base}&mute=${muted ? 1 : 0}`
  }, [muted, base])

  useEffect(() => {
    // Try to play unmuted after a short delay
    const timer = setTimeout(() => {
      if (iframeRef.current && !muted) {
        // Reload iframe to ensure autoplay with sound
        iframeRef.current.src = `${base}&mute=0&autoplay=1`
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [base, muted])

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <iframe
        ref={iframeRef}
        title="Onam Music"
        allow="autoplay; encrypted-media"
        className="h-0 w-0 opacity-0"
        src={`${base}&mute=${muted ? 1 : 0}&autoplay=1`}
      />

      <Button
        onClick={() => setMuted((m) => !m)}
        variant="outline"
        size="sm"
        className="bg-white/90 backdrop-blur hover:bg-white/100 transition-all shadow-lg flex items-center gap-2"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        <span className="text-sm font-medium">{muted ? "Play Song" : "Freeze Song"}</span>
      </Button>
    </div>
  )
}
